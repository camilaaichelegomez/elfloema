/* Los datos de la sección de hábitos.

   Todo vive en el navegador de cada persona (localStorage), igual que en el
   Ritual de yoga: no hay cuenta, no hay servidor, nadie ve lo de nadie. Lo
   que se guarda es poco y liviano, así que cabe de sobra.

   El modelo tiene cuatro piezas y una regla que las une:

   · OBJETIVO — lo que quieres lograr, a largo o a corto plazo.
   · HÁBITO   — lo que haces seguido para llegar allá.
   · TAREA    — algo puntual, que se hace una vez y se termina.
   · PASO     — un trozo de una tarea grande.

   La regla: los hábitos y las tareas pueden colgar de un objetivo. Eso es lo
   que después permite mostrar «tu objetivo de este año avanzó tanto», en vez
   de una lista suelta de cosas hechas. */

export type Plazo = "largo" | "corto";

export type Objetivo = {
  id: string;
  titulo: string;
  plazo: Plazo;
  /** Por qué importa. Se relee en los días en que no dan ganas. */
  porque?: string;
  /** «Quiero ser una persona que…». La identidad, no solo el resultado. */
  identidad?: string;
  /** Fecha en que te gustaría haber llegado (YYYY-MM-DD). */
  fecha?: string;
  logrado?: boolean;
  creado: string;
};

/** Días de la semana, 0 = domingo, como en JavaScript. */
export type Dia = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Habito = {
  id: string;
  nombre: string;
  objetivoId?: string;
  /** El plan si–entonces: «después de dejar la taza del desayuno». */
  cuando?: string;
  /** En qué días toca. Vacío = todos los días. */
  dias: Dia[];
  /** Para que sea fácil de cumplir el peor día: la versión mínima. */
  minimo?: string;
  color?: string;
  archivado?: boolean;
  creado: string;
};

export type Paso = { id: string; titulo: string; hecho: boolean };

export type Tarea = {
  id: string;
  titulo: string;
  objetivoId?: string;
  /** Día en que toca (YYYY-MM-DD). Sin fecha, queda en «algún día». */
  fecha?: string;
  hecha: boolean;
  /** Cuándo se marcó como hecha, para los gráficos. */
  hechaEl?: string;
  pasos: Paso[];
  creado: string;
};

export type Pausa = { fecha: string; minutos: number };

export type PreferenciasHabitos = {
  /** Avisos dentro de la app mientras está abierta. */
  recordatorios: boolean;
  /** Cada cuántos minutos aparece el recordatorio de estar presente. */
  cadaMinutos: number;
  /** Hora a la que se propone la revisión del día (HH:MM). */
  horaRevision: string;
  musica: "relajar" | "activar" | "no";
  volumenMusica: number;
};

export const PREFERENCIAS_POR_DEFECTO: PreferenciasHabitos = {
  recordatorios: true,
  cadaMinutos: 90,
  horaRevision: "21:00",
  musica: "relajar",
  volumenMusica: 0.5,
};

export type Datos = {
  objetivos: Objetivo[];
  habitos: Habito[];
  tareas: Tarea[];
  /** Qué hábitos se cumplieron cada día: { "2026-09-26": ["id1", "id2"] } */
  hechos: Record<string, string[]>;
  pausas: Pausa[];
  prefs: PreferenciasHabitos;
};

export const DATOS_VACIOS: Datos = {
  objetivos: [],
  habitos: [],
  tareas: [],
  hechos: {},
  pausas: [],
  prefs: PREFERENCIAS_POR_DEFECTO,
};

const CLAVE = "floema-habitos";

export function leerDatos(): Datos {
  try {
    const raw = localStorage.getItem(CLAVE);
    if (!raw) return DATOS_VACIOS;
    const d = JSON.parse(raw) as Partial<Datos>;
    // Mezclado con los valores vacíos: si mañana agrego un campo, lo guardado
    // antes no se rompe.
    return {
      ...DATOS_VACIOS,
      ...d,
      prefs: { ...PREFERENCIAS_POR_DEFECTO, ...(d.prefs ?? {}) },
      objetivos: d.objetivos ?? [],
      habitos: d.habitos ?? [],
      tareas: d.tareas ?? [],
      hechos: d.hechos ?? {},
      pausas: d.pausas ?? [],
    };
  } catch {
    return DATOS_VACIOS;
  }
}

export function guardarDatos(d: Datos) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(d));
  } catch {
    /* Modo privado o almacenamiento lleno: la app sigue funcionando en esta
       sesión, pero no recordará nada la próxima vez. */
  }
}

/* ── Fechas ────────────────────────────────────────────────
   Siempre en hora local, nunca UTC: con UTC, a las nueve de la noche en
   Chile el día ya cambió y un hábito cumplido hoy se anotaba mañana. */

export function aTexto(d: Date) {
  const mes = `${d.getMonth() + 1}`.padStart(2, "0");
  const dia = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

export const hoy = () => aTexto(new Date());

export function sumarDias(fecha: string, dias: number) {
  const [a, m, d] = fecha.split("-").map(Number);
  const f = new Date(a, m - 1, d);
  f.setDate(f.getDate() + dias);
  return aTexto(f);
}

export function diaSemana(fecha: string): Dia {
  const [a, m, d] = fecha.split("-").map(Number);
  return new Date(a, m - 1, d).getDay() as Dia;
}

export const NOMBRE_DIA = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
export const NOMBRE_MES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** Cómo se lee una fecha en una frase: «jueves 26 de septiembre». */
export function fechaLarga(fecha: string) {
  const [a, m, d] = fecha.split("-").map(Number);
  const f = new Date(a, m - 1, d);
  const dias = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  return `${dias[f.getDay()]} ${d} de ${NOMBRE_MES[m - 1]}`;
}

/* ── Preguntas que hace la app sobre los datos ─────────────── */

/** ¿Este hábito toca hoy? Sin días marcados, toca todos. */
export function tocaHoy(h: Habito, fecha: string) {
  if (h.archivado) return false;
  return h.dias.length === 0 || h.dias.includes(diaSemana(fecha));
}

export function estaHecho(d: Datos, habitoId: string, fecha: string) {
  return (d.hechos[fecha] ?? []).includes(habitoId);
}

/** Días seguidos cumpliendo un hábito, contando solo los días que le tocan. */
export function racha(d: Datos, h: Habito, desde = hoy()) {
  let fecha = desde;
  let dias = 0;
  // Si hoy le toca y aún no está hecho, la racha se mide desde ayer: el día
  // no ha terminado y no tiene por qué contarse como roto.
  if (tocaHoy(h, fecha) && !estaHecho(d, h.id, fecha)) fecha = sumarDias(fecha, -1);
  for (let i = 0; i < 400; i++) {
    if (!tocaHoy(h, fecha)) {
      fecha = sumarDias(fecha, -1);
      continue;
    }
    if (!estaHecho(d, h.id, fecha)) break;
    dias++;
    fecha = sumarDias(fecha, -1);
  }
  return dias;
}

/** De los últimos N días que le tocaban, cuántos se cumplieron. */
export function cumplimiento(d: Datos, h: Habito, dias = 30, desde = hoy()) {
  let tocaron = 0;
  let hechos = 0;
  for (let i = 0; i < dias; i++) {
    const fecha = sumarDias(desde, -i);
    if (!tocaHoy(h, fecha)) continue;
    // El día de hoy no se cuenta en contra: todavía puede cumplirse.
    if (fecha === desde && !estaHecho(d, h.id, fecha)) continue;
    tocaron++;
    if (estaHecho(d, h.id, fecha)) hechos++;
  }
  return { tocaron, hechos, porcentaje: tocaron === 0 ? 0 : Math.round((hechos / tocaron) * 100) };
}

/** Los hábitos que tocan en una fecha, en el orden en que se crearon. */
export function habitosDe(d: Datos, fecha: string) {
  return d.habitos.filter((h) => tocaHoy(h, fecha));
}

/** Las tareas de un día: las de ese día y las atrasadas, si el día es hoy. */
export function tareasDe(d: Datos, fecha: string) {
  const pendientes = d.tareas.filter((t) => !t.hecha);
  const delDia = pendientes.filter((t) => t.fecha === fecha);
  const atrasadas =
    fecha === hoy() ? pendientes.filter((t) => t.fecha && t.fecha < fecha) : [];
  const hechasHoy = d.tareas.filter((t) => t.hecha && t.hechaEl === fecha);
  return { delDia, atrasadas, hechasHoy };
}

/** Cuánto avanzó un objetivo: sus tareas hechas y el cumplimiento de sus hábitos. */
export function avanceDeObjetivo(d: Datos, objetivoId: string) {
  const tareas = d.tareas.filter((t) => t.objetivoId === objetivoId);
  const hechas = tareas.filter((t) => t.hecha).length;
  const habitos = d.habitos.filter((h) => h.objetivoId === objetivoId && !h.archivado);
  const porcentajes = habitos.map((h) => cumplimiento(d, h, 30).porcentaje);
  const constancia =
    porcentajes.length === 0
      ? null
      : Math.round(porcentajes.reduce((a, b) => a + b, 0) / porcentajes.length);
  return { tareas: tareas.length, hechas, habitos: habitos.length, constancia };
}

export function nuevoId() {
  return Math.random().toString(36).slice(2, 10);
}

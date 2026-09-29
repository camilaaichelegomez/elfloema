/* Fuerza: los tipos y lo que se guarda.

   La sección es para mujeres adultas que quieren ganar masa muscular con el
   propio cuerpo. Se guarda poco a propósito: el nivel de cada patrón de
   movimiento, lo que se hizo cada día, y las preferencias. Con eso alcanza
   para que la rutina suba sola, que es lo único que de verdad hace falta. */

/* Los patrones de movimiento. Una rutina completa no es una lista de músculos:
   es un empuje, una tracción, algo de rodilla, algo de cadera, algo de core.
   Si están los seis, está entrenado el cuerpo entero. */
export type Patron =
  | "empuje-horizontal"
  | "empuje-vertical"
  | "traccion-horizontal"
  | "traccion-vertical"
  | "sentadilla"
  | "bisagra"
  | "zancada"
  | "core-antiextension"
  | "core-lateral"
  | "escapulas"
  | "pantorrilla";

export const NOMBRE_PATRON: Record<Patron, string> = {
  "empuje-horizontal": "Empuje hacia adelante",
  "empuje-vertical": "Empuje hacia arriba",
  "traccion-horizontal": "Tirar hacia el cuerpo",
  "traccion-vertical": "Tirar hacia abajo",
  sentadilla: "Sentadilla",
  bisagra: "Cadera y glúteo",
  zancada: "Una pierna",
  "core-antiextension": "Centro: no arquearse",
  "core-lateral": "Centro: costados",
  escapulas: "Hombros sanos",
  pantorrilla: "Pantorrillas",
};

/** Qué músculos toca cada patrón, dicho como se dice. */
export const MUSCULOS_PATRON: Record<Patron, string> = {
  "empuje-horizontal": "pecho, hombro de adelante y tríceps",
  "empuje-vertical": "hombros y tríceps",
  "traccion-horizontal": "espalda media, bíceps y la parte de atrás del hombro",
  "traccion-vertical": "dorsales y bíceps",
  sentadilla: "cuádriceps y glúteos",
  bisagra: "glúteos, isquiotibiales y espalda baja",
  zancada: "cada pierna por separado, y el equilibrio",
  "core-antiextension": "abdomen profundo y todo lo que sostiene la columna",
  "core-lateral": "oblicuos y glúteo medio",
  escapulas: "lo que sostiene el omóplato: la postura y el hombro sin dolor",
  pantorrilla: "gemelos y sóleo",
};

export type Equipo =
  | "nada"
  | "silla"
  | "mesa"
  | "banda"
  | "mochila"
  | "barra"
  | "escalon";

export const NOMBRE_EQUIPO: Record<Equipo, string> = {
  nada: "Nada, solo el suelo",
  silla: "Una silla o el sofá",
  mesa: "Una mesa firme o una encimera",
  banda: "Una banda elástica",
  mochila: "Una mochila con peso",
  barra: "Una barra de dominadas",
  escalon: "Un escalón o un cajón",
};

export type Ejercicio = {
  id: string;
  nombre: string;
  tambien?: string;
  patron: Patron;
  /** Dentro de su patrón: 1 es el primer peldaño, y de ahí sube. */
  nivel: number;
  /** Todo lo que hace falta. Si está vacío, no hace falta nada. */
  equipo: Equipo[];
  que: string;
  pasos: string[];
  errores: string[];
  /** Series y repeticiones sugeridas. Si es por tiempo, van segundos. */
  series: number;
  repes: [number, number];
  porTiempo?: boolean;
  /** Qué hay que lograr para pasar al siguiente peldaño. */
  criterio?: string;
  cuidado?: string;
  /** Nombre del archivo de imagen, cuando exista: /fuerza/<figura>.webp */
  figura?: string;
};

export type Objetivo = "masa" | "fuerza" | "empezar" | "mantener";

export const OBJETIVOS: { id: Objetivo; label: string; linea: string }[] = [
  { id: "empezar", label: "Empezar de cero", linea: "Nunca he entrenado fuerza, o hace años que no." },
  { id: "masa", label: "Ganar masa muscular", linea: "Lo que más importa a partir de los treinta." },
  { id: "fuerza", label: "Ser más fuerte", linea: "Levantar, cargar, subir escaleras sin pensarlo." },
  { id: "mantener", label: "Mantener lo que tengo", linea: "Poco rato, pero que no se pierda." },
];

export type Cuidado =
  | "munecas"
  | "rodillas"
  | "hombros"
  | "espalda"
  | "suelo-pelvico"
  | "posparto"
  | "embarazo";

export const CUIDADOS: { id: Cuidado; label: string }[] = [
  { id: "munecas", label: "Muñecas" },
  { id: "rodillas", label: "Rodillas" },
  { id: "hombros", label: "Hombros" },
  { id: "espalda", label: "Espalda baja" },
  { id: "suelo-pelvico", label: "Suelo pélvico" },
  { id: "posparto", label: "Posparto" },
  { id: "embarazo", label: "Embarazo" },
];

export type Preferencias = {
  objetivo: Objetivo;
  /** Sesiones por semana. Dos ya sirven; tres es el punto dulce. */
  dias: 2 | 3 | 4;
  /** Minutos por sesión. */
  minutos: 15 | 25 | 35 | 45;
  equipo: Equipo[];
  cuidados: Cuidado[];
  /** El descanso entre series, en segundos. */
  descanso: number;
  aviso: boolean;
};

export const PREFERENCIAS_POR_DEFECTO: Preferencias = {
  objetivo: "empezar",
  dias: 3,
  minutos: 25,
  equipo: ["nada", "silla"],
  cuidados: [],
  descanso: 90,
  aviso: true,
};

/** Una serie hecha: cuántas repeticiones salieron y con cuánto esfuerzo. */
export type SerieHecha = { repes: number; duro?: boolean };

export type SesionHecha = {
  dia: string;
  minutos: number;
  /** Por ejercicio, lo que se hizo. */
  hecho: Record<string, SerieHecha[]>;
};

export type Guardado = {
  prefs: Preferencias;
  /** El peldaño en el que va cada patrón. */
  niveles: Partial<Record<Patron, number>>;
  historial: SesionHecha[];
  /** Cuál de las sesiones de la semana toca (A, B, C…). */
  vuelta: number;
};

export const GUARDADO_VACIO: Guardado = {
  prefs: PREFERENCIAS_POR_DEFECTO,
  niveles: {},
  historial: [],
  vuelta: 0,
};

const CLAVE = "floema-fuerza";

export function leerFuerza(): Guardado {
  try {
    const raw = localStorage.getItem(CLAVE);
    if (!raw) return GUARDADO_VACIO;
    const g = JSON.parse(raw) as Partial<Guardado>;
    return {
      ...GUARDADO_VACIO,
      ...g,
      prefs: { ...PREFERENCIAS_POR_DEFECTO, ...(g.prefs ?? {}) },
      niveles: g.niveles ?? {},
      historial: g.historial ?? [],
      vuelta: g.vuelta ?? 0,
    };
  } catch {
    return GUARDADO_VACIO;
  }
}

export function guardarFuerza(g: Guardado) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(g));
  } catch {
    /* Modo privado o almacenamiento lleno: la sesión corre igual, pero no se
       va a acordar la próxima vez. */
  }
}

/* ── Fechas, en hora local ─────────────────────────────── */

export function aTexto(d: Date) {
  const m = `${d.getMonth() + 1}`.padStart(2, "0");
  const dia = `${d.getDate()}`.padStart(2, "0");
  return `${d.getFullYear()}-${m}-${dia}`;
}

export const hoy = () => aTexto(new Date());

export function diasDesde(fecha: string) {
  const [a, m, d] = fecha.split("-").map(Number);
  const ese = new Date(a, m - 1, d);
  const ahora = new Date();
  ahora.setHours(0, 0, 0, 0);
  return Math.round((ahora.getTime() - ese.getTime()) / 86400000);
}

/** Cuántas sesiones hubo en los últimos N días. */
export function sesionesRecientes(historial: SesionHecha[], dias = 7) {
  return historial.filter((s) => diasDesde(s.dia) < dias).length;
}

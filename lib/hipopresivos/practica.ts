/* Hipopresivos: las posturas, los niveles y cómo se arma una sesión.

   El esquema de cada repetición es el de los ensayos: tres respiraciones
   lentas, botar todo el aire, la pausa con las costillas abiertas, y soltar.
   Tres repeticiones por postura. La pausa parte en unos 8 segundos y sube
   con el nivel, hasta 20; los programas publicados llegan a 25 después de
   varias semanas. */

export type Nivel = "inicio" | "medio" | "avanzado";

export const NIVELES: { id: Nivel; label: string; linea: string; pausa: number }[] = [
  { id: "inicio", label: "Empezando", linea: "Aprender la técnica. Posturas acostada, sentada y de pie.", pausa: 8 },
  { id: "medio", label: "Ya me sale", linea: "La costilla se abre bien. Suman cuadrupedia y de rodillas.", pausa: 14 },
  { id: "avanzado", label: "Con práctica", linea: "Pausas más largas y posturas que piden más equilibrio.", pausa: 20 },
];

export type Postura = {
  id: string;
  nombre: string;
  /** Desde qué nivel aparece. */
  nivel: Nivel;
  /** Cómo se arma, en pasos cortos para leer de un vistazo. */
  pasos: string[];
  /** El error de siempre en esta postura. */
  ojo: string;
  /** Imagen en public/hipopresivos/<figura>.webp, cuando exista. */
  figura: string;
};

/* Lo que vale para todas las posturas: se dice una vez al empezar. */
export const PAUTAS_COMUNES = [
  "Crece desde la coronilla, como si te tiraran de un hilo.",
  "Mentón un poco hacia adentro, nuca larga.",
  "Hombros lejos de las orejas.",
  "Codos abiertos hacia los lados, sin tensión en las manos.",
];

export const POSTURAS: Postura[] = [
  {
    id: "acostada",
    nombre: "Acostada boca arriba",
    nivel: "inicio",
    pasos: [
      "Boca arriba, rodillas dobladas y pies apoyados a lo ancho de las caderas.",
      "Brazos al costado del cuerpo, un poco separados, palmas hacia arriba.",
      "Empuja suave la coronilla lejos de los pies, como alargándote.",
    ],
    ojo: "No despegues la espalda baja ni levantes el mentón. La nuca queda larga.",
    figura: "acostada",
  },
  {
    id: "sentada",
    nombre: "Sentada",
    nivel: "inicio",
    pasos: [
      "Sentada en el borde de una silla o en el suelo con las piernas cruzadas.",
      "Espalda derecha y larga, sin apoyarte en el respaldo.",
      "Manos sobre los muslos, codos abiertos hacia los lados.",
    ],
    ojo: "No te encorves al botar el aire: la espalda sigue larga durante la pausa.",
    figura: "sentada",
  },
  {
    /* Venus: una de las posturas básicas del método, de pie con los brazos
       extendidos a lo largo del cuerpo. El detalle fino lo da el dibujo, que
       Camila genera desde una foto de referencia. */
    id: "venus",
    nombre: "De pie, brazos a lo largo (Venus)",
    nivel: "inicio",
    pasos: [
      "De pie, pies paralelos a lo ancho de las caderas, rodillas sueltas.",
      "Brazos extendidos a lo largo del cuerpo, un poco separados de los costados.",
      "Crece desde la coronilla y lleva el peso suave hacia la punta de los pies.",
    ],
    ojo: "Los hombros no suben ni se van hacia adelante: quedan lejos de las orejas.",
    figura: "venus",
  },
  {
    id: "de_pie",
    nombre: "De pie",
    nivel: "inicio",
    pasos: [
      "Pies paralelos a lo ancho de las caderas, rodillas sueltas, un poco dobladas.",
      "Lleva el peso hacia la punta de los pies, sin despegar los talones.",
      "Brazos al costado, codos un poco doblados y abiertos, manos a la altura de las caderas.",
    ],
    ojo: "Que el peso hacia adelante no te arquee la espalda: el cuerpo se inclina entero, como una tabla.",
    figura: "de_pie",
  },
  {
    id: "de_pie_brazos",
    nombre: "De pie, brazos adelante",
    nivel: "medio",
    pasos: [
      "Como la postura de pie, con el peso hacia la punta de los pies.",
      "Brazos adelante a la altura del ombligo, codos abiertos, dedos apuntándose entre sí.",
      "Empuja suave las palmas hacia adelante, como alejando algo.",
    ],
    ojo: "Los hombros no suben con los brazos. Si suben, baja los brazos un poco.",
    figura: "de_pie_brazos",
  },
  {
    /* La Deméter con elevación de pelvis: la acostada, con la cadera en el
       aire. Pide más control que la acostada, por eso aparece en el nivel
       medio. */
    id: "acostada_cadera_arriba",
    nombre: "Acostada, cadera arriba",
    nivel: "medio",
    pasos: [
      "Boca arriba, rodillas dobladas y pies apoyados a lo ancho de las caderas.",
      "Despega la pelvis del suelo hasta que rodillas, cadera y hombros queden en una línea.",
      "Brazos al costado del cuerpo, apoyados en el suelo; el peso va en los pies y en los omóplatos.",
    ],
    ojo: "Sube la cadera sin arquear la espalda baja ni apretar los glúteos al máximo: la línea es recta, no un arco.",
    figura: "acostada_cadera_arriba",
  },
  {
    id: "cuadrupedia",
    nombre: "En cuatro apoyos",
    nivel: "medio",
    pasos: [
      "Manos bajo los hombros, rodillas bajo las caderas.",
      "Espalda plana, de la coronilla al coxis en una línea.",
      "Codos un poco doblados y abiertos, empuja el suelo con las manos.",
    ],
    ojo: "No dejes caer la guata ni la cabeza: la espalda queda plana, como una mesa.",
    figura: "cuadrupedia",
  },
  {
    id: "de_rodillas",
    nombre: "De rodillas",
    nivel: "medio",
    pasos: [
      "De rodillas sobre la colchoneta, rodillas a lo ancho de las caderas.",
      "Inclina el tronco entero un poco hacia adelante, sin doblar la cadera.",
      "Brazos a los costados, codos abiertos, manos a la altura de la cintura.",
    ],
    ojo: "La inclinación sale de las rodillas, no de la cintura. Si te duelen las rodillas, pon una toalla doblada.",
    figura: "de_rodillas",
  },
  {
    id: "inclinada",
    nombre: "De pie, inclinada",
    nivel: "avanzado",
    pasos: [
      "De pie, rodillas dobladas, inclina el tronco hacia adelante doblando la cadera.",
      "Espalda recta y larga, manos apoyadas sobre los muslos, arriba de las rodillas.",
      "Codos abiertos hacia los lados.",
    ],
    ojo: "La espalda no se redondea. Si se redondea, dobla más las rodillas y sube un poco el tronco.",
    figura: "inclinada",
  },
  {
    id: "semisentadilla",
    nombre: "Media sentadilla",
    nivel: "avanzado",
    pasos: [
      "Pies a lo ancho de las caderas, baja como para sentarte en una silla alta.",
      "Tronco inclinado hacia adelante, espalda larga.",
      "Brazos adelante a la altura del pecho, codos abiertos.",
    ],
    ojo: "Rodillas en la dirección de los pies, sin juntarse hacia adentro.",
    figura: "semisentadilla",
  },
];

const ORDEN: Nivel[] = ["inicio", "medio", "avanzado"];

export function posturasHasta(nivel: Nivel) {
  const tope = ORDEN.indexOf(nivel);
  return POSTURAS.filter((p) => ORDEN.indexOf(p.nivel) <= tope);
}

/* ── La repetición, segundo a segundo ─────────────────────── */

export type Fase = "inhala" | "exhala" | "vacia" | "pausa" | "suelta";

export const TEXTO_FASE: Record<Fase, string> = {
  inhala: "Toma aire a las costillas",
  exhala: "Bota el aire lento",
  vacia: "Bota todo, hasta el final",
  pausa: "Sin aire: abre las costillas",
  suelta: "Suelta y respira tranquila",
};

export const INHALA = 3;
export const EXHALA = 5;
export const VACIA = 5;
export const SUELTA = 12;
export const RESPIRACIONES = 3;
export const REPETICIONES = 3;
/** Tiempo para acomodarse en la postura antes de empezar las respiraciones. */
export const ACOMODARSE = 10;

export type Tramo = { fase: Fase; segundos: number; respiracion?: number };

/** Los tramos de una repetición. Sin pausa, la «pausa» se cambia por
    una exhalación larga, que es lo que se hace en el embarazo o con presión
    alta: postura y respiración, sin aguantar el aire. */
export function tramosDeRepeticion(pausa: number, sinPausa: boolean): Tramo[] {
  const t: Tramo[] = [];
  for (let r = 1; r <= RESPIRACIONES; r++) {
    t.push({ fase: "inhala", segundos: INHALA, respiracion: r });
    t.push({ fase: r === RESPIRACIONES ? "vacia" : "exhala", segundos: r === RESPIRACIONES ? VACIA : EXHALA, respiracion: r });
  }
  if (!sinPausa) t.push({ fase: "pausa", segundos: pausa });
  t.push({ fase: "suelta", segundos: SUELTA });
  return t;
}

export function segundosPorPostura(pausa: number, sinPausa: boolean) {
  const rep = tramosDeRepeticion(pausa, sinPausa).reduce((s, t) => s + t.segundos, 0);
  return ACOMODARSE + rep * REPETICIONES;
}

/* ── Guardado ───────────────────────────────────────────────── */

export type Preferencias = {
  nivel: Nivel;
  minutos: 5 | 10 | 15 | 20;
  voz: boolean;
  campana: boolean;
};

export type Seguridad = {
  /** Se respondió el chequeo del inicio. */
  respondida: boolean;
  /** Algo de lo marcado pide hacerlos sin la pausa sin aire. */
  sinPausa: boolean;
  /** Algo de lo marcado pide esperar o consultar antes. */
  esperar: boolean;
  marcadas: string[];
};

export type Guardado = {
  prefs: Preferencias;
  seguridad: Seguridad;
  /** Para variar las posturas de una sesión a otra. */
  vuelta: number;
  historial: { dia: string; minutos: number; nivel: Nivel }[];
};

export const PREFERENCIAS_POR_DEFECTO: Preferencias = { nivel: "inicio", minutos: 10, voz: true, campana: true };

const VACIO: Guardado = {
  prefs: PREFERENCIAS_POR_DEFECTO,
  seguridad: { respondida: false, sinPausa: false, esperar: false, marcadas: [] },
  vuelta: 0,
  historial: [],
};

const CLAVE = "floema-hipopresivos";

export function leerHipopresivos(): Guardado {
  try {
    const raw = localStorage.getItem(CLAVE);
    if (!raw) return VACIO;
    const g = JSON.parse(raw) as Partial<Guardado>;
    return {
      ...VACIO,
      ...g,
      prefs: { ...PREFERENCIAS_POR_DEFECTO, ...(g.prefs ?? {}) },
      seguridad: { ...VACIO.seguridad, ...(g.seguridad ?? {}) },
      historial: g.historial ?? [],
    };
  } catch {
    return VACIO;
  }
}

export function guardarHipopresivos(g: Guardado) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(g));
  } catch {
    /* modo privado: la sesión corre igual, solo no se recuerda */
  }
}

/** Fecha local YYYY-MM-DD. */
export function hoy() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/* ── El chequeo de seguridad del inicio ─────────────────────── */

export type Condicion = { id: string; texto: string; efecto: "sinPausa" | "esperar" };

export const CONDICIONES: Condicion[] = [
  { id: "embarazo", texto: "Estoy embarazada", efecto: "sinPausa" },
  { id: "presion", texto: "Tengo presión alta (aunque esté controlada) o algo del corazón", efecto: "sinPausa" },
  { id: "parto", texto: "Tuve un parto o cesárea hace menos de seis semanas", efecto: "esperar" },
  { id: "cirugia", texto: "Me operaron del abdomen o la pelvis en los últimos tres meses", efecto: "esperar" },
  { id: "hernia", texto: "Tengo una hernia (abdominal o hiatal) o una enfermedad inflamatoria del intestino activa", efecto: "esperar" },
  { id: "prolapso", texto: "Siento peso o una «bolita» en la vagina, o tengo escapes que me complican el día", efecto: "esperar" },
];

export function evaluar(marcadas: string[]): Seguridad {
  const c = CONDICIONES.filter((x) => marcadas.includes(x.id));
  return {
    respondida: true,
    sinPausa: c.some((x) => x.efecto === "sinPausa"),
    esperar: c.some((x) => x.efecto === "esperar"),
    marcadas,
  };
}

/* ── La sesión del día ──────────────────────────────────────── */

export type Sesion = { posturas: Postura[]; pausa: number; sinPausa: boolean; minutos: number };

/** Arma la sesión: cuántas posturas caben en el rato elegido, rotando
    entre las del nivel para que no sea siempre lo mismo. En el nivel de
    inicio, la primera postura es siempre acostada: es donde mejor se aprende
    a abrir las costillas. */
export function armarSesion(g: Guardado): Sesion {
  const { nivel, minutos } = g.prefs;
  const pausa = NIVELES.find((n) => n.id === nivel)!.pausa;
  const sinPausa = g.seguridad.sinPausa;
  const cuantas = Math.max(1, Math.floor((minutos * 60) / segundosPorPostura(pausa, sinPausa)));

  const disponibles = posturasHasta(nivel);
  const elegidas: Postura[] = [];
  if (nivel === "inicio") elegidas.push(disponibles[0]);
  for (let i = 0; elegidas.length < Math.min(cuantas, disponibles.length); i++) {
    const p = disponibles[(g.vuelta + i) % disponibles.length];
    if (!elegidas.includes(p)) elegidas.push(p);
  }
  // Si el rato alcanza para más posturas que las que hay, se repiten desde el inicio.
  while (elegidas.length < cuantas) elegidas.push(elegidas[elegidas.length % disponibles.length]);

  return { posturas: elegidas, pausa, sinPausa, minutos };
}

/** Sesiones en los últimos siete días. */
export function sesionesSemana(g: Guardado) {
  const hace7 = new Date();
  hace7.setDate(hace7.getDate() - 6);
  const desde = `${hace7.getFullYear()}-${String(hace7.getMonth() + 1).padStart(2, "0")}-${String(hace7.getDate()).padStart(2, "0")}`;
  return g.historial.filter((h) => h.dia >= desde).length;
}

/** Después de ocho sesiones en un nivel se propone subir: es lo que duran
    los primeros tramos de los programas publicados. */
export function propondriaSubir(g: Guardado): Nivel | null {
  const i = ORDEN.indexOf(g.prefs.nivel);
  if (i >= ORDEN.length - 1) return null;
  const enEsteNivel = g.historial.filter((h) => h.nivel === g.prefs.nivel).length;
  return enEsteNivel >= 8 ? ORDEN[i + 1] : null;
}

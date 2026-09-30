/* Hipopresivos: las posturas, los niveles y cómo se arma una sesión.

   El esquema de cada repetición es el de los ensayos: tres respiraciones
   lentas, botar todo el aire, la pausa con las costillas abiertas, y soltar.
   Tres repeticiones por postura. La pausa parte en unos 8 segundos y sube
   con el nivel, hasta 20; los programas publicados llegan a 25 después de
   varias semanas. */

export type Nivel = "inicio" | "medio" | "avanzado";

export const NIVELES: { id: Nivel; label: string; linea: string; pausa: number }[] = [
  { id: "inicio", label: "Empezando", linea: "Aprender la técnica con las ocho básicas, de Venus a Deméter.", pausa: 8 },
  { id: "medio", label: "Ya me sale", linea: "La costilla se abre bien. Suman Freya, Perséfone, Isis y Selene.", pausa: 14 },
  { id: "avanzado", label: "Con práctica", linea: "Pausas más largas y Afrodita, con la cadera en el aire.", pausa: 20 },
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
  /** Lo que cambia en la pausa sin aire, si algo cambia (p. ej. subir los
      brazos). Se dice y se muestra justo en ese momento. */
  enPausa?: string;
  /** Imagen en public/hipopresivos/<figura> (webp, png o jpg), cuando exista. */
  figura: string;
};

/* Lo que vale para todas las posturas: se dice una vez al empezar. */
export const PAUTAS_COMUNES = [
  "Crece desde la coronilla, como si te tiraran de un hilo.",
  "Mentón un poco hacia adentro, nuca larga.",
  "Hombros lejos de las orejas.",
  "Codos abiertos hacia los lados, sin tensión en las manos.",
];

/* Las posturas del método, con sus nombres, tal como vienen en la lámina de
   posturas hipopresivas que trajo Camila (la de Low Pressure Fitness). El
   orden es el de la lámina: la secuencia básica va de pie a acostada, que es
   también como la describen los ensayos. La descripción de cada una sale de
   lo que muestra la lámina; el detalle fino lo da el dibujo, que Camila
   genera recortando cada figura de esa misma lámina. */
export const POSTURAS: Postura[] = [
  {
    id: "venus",
    nombre: "Venus",
    nivel: "inicio",
    pasos: [
      "De pie, pies cerca uno del otro, rodillas sueltas.",
      "Brazos separados del cuerpo, hacia abajo y un poco hacia los lados, codos casi estirados.",
      "Muñecas dobladas: las palmas miran hacia el suelo, las manos a la altura de las caderas.",
    ],
    ojo: "Los hombros no suben con los brazos: quedan lejos de las orejas.",
    figura: "venus",
  },
  {
    id: "atenea",
    nombre: "Atenea",
    nivel: "inicio",
    pasos: [
      "De pie, pies a lo ancho de las caderas, rodillas un poco dobladas.",
      "Partes con los brazos abajo, a los costados del cuerpo.",
      "En la pausa sin aire, subes los brazos estirados al frente, hasta la altura de los hombros.",
    ],
    ojo: "El peso va un poco hacia la punta de los pies, sin arquear la espalda baja.",
    enPausa: "Sube los brazos al frente, hasta los hombros.",
    figura: "atenea",
  },
  {
    id: "artemisa",
    nombre: "Artemisa",
    nivel: "inicio",
    pasos: [
      "De pie, rodillas sueltas.",
      "Te doblas hacia adelante desde la cadera, con la espalda larga y la cabeza hacia las rodillas.",
      "Brazos colgando hacia el suelo, manos hacia los tobillos.",
    ],
    ojo: "Si tiran mucho las piernas por detrás, dobla más las rodillas en vez de redondear la espalda.",
    figura: "artemisa",
  },
  {
    id: "aura",
    nombre: "Aura",
    nivel: "inicio",
    pasos: [
      "De rodillas, rodillas a lo ancho de las caderas, sin sentarte en los talones.",
      "Tronco largo, un poco inclinado hacia adelante.",
      "Brazos estirados al frente a la altura de los hombros, muñecas dobladas: las palmas empujan hacia adelante.",
    ],
    ojo: "Los hombros bajos aunque los brazos estén arriba. Si te duelen las rodillas, pon una toalla doblada.",
    figura: "aura",
  },
  {
    id: "maya",
    nombre: "Maya",
    nivel: "inicio",
    pasos: [
      "En cuatro apoyos: manos en el suelo un poco por delante de los hombros, rodillas bajo las caderas.",
      "Codos un poco doblados y abiertos hacia los lados.",
      "Espalda larga, de la coronilla al coxis.",
    ],
    ojo: "No dejes caer la guata ni hundir la espalda: queda larga, como una mesa.",
    figura: "maya",
  },
  {
    id: "gaia",
    nombre: "Gaia",
    nivel: "inicio",
    pasos: [
      "En cuatro apoyos, con las manos en el suelo.",
      "Empuja el suelo y redondea la espalda hacia el techo, como un gato.",
      "Cabeza suelta hacia el suelo, entre los brazos.",
    ],
    ojo: "Empuja con las manos para que los hombros no se hundan hacia el suelo.",
    figura: "gaia",
  },
  {
    id: "hestia",
    nombre: "Hestia",
    nivel: "inicio",
    pasos: [
      "Sentada en el suelo, piernas estiradas al frente.",
      "Espalda derecha y larga, sin echarte hacia atrás.",
      "Brazos estirados al frente a la altura de los hombros.",
    ],
    ojo: "Si la espalda se redondea, dobla un poco las rodillas o siéntate sobre un cojín.",
    figura: "hestia",
  },
  {
    id: "demeter",
    nombre: "Deméter",
    nivel: "inicio",
    pasos: [
      "Acostada boca arriba, piernas estiradas.",
      "Brazos por encima de la cabeza, codos doblados y abiertos.",
      "Nuca larga, mentón un poco hacia adentro.",
    ],
    ojo: "La espalda baja se queda apoyada: no la arquees al abrir las costillas.",
    figura: "demeter",
  },
  {
    id: "freya",
    nombre: "Freya",
    nivel: "medio",
    pasos: [
      "De pie, rodillas sueltas, el peso un poco hacia adelante.",
      "Brazos levantados por encima de los hombros, codos doblados y abiertos.",
      "Crece desde la coronilla.",
    ],
    ojo: "Que los brazos arriba no te hagan arquear la espalda ni subir los hombros.",
    figura: "freya",
  },
  {
    id: "persefone",
    nombre: "Perséfone",
    nivel: "medio",
    pasos: [
      "Estocada: una pierna adelante con la rodilla doblada, la otra atrás con la rodilla cerca del suelo.",
      "Tronco derecho y largo.",
      "Brazos a los costados, codos un poco abiertos.",
    ],
    ojo: "La rodilla de adelante queda sobre el tobillo, no se va hacia adentro. Repite con la otra pierna.",
    figura: "persefone",
  },
  {
    id: "isis",
    nombre: "Isis",
    nivel: "medio",
    pasos: [
      "De rodillas, te inclinas hacia adelante hasta apoyar las manos en el suelo, lejos, delante de ti.",
      "Brazos estirados, frente hacia el suelo.",
      "Caderas altas, sobre las rodillas o un poco más atrás.",
    ],
    ojo: "Empuja suave el suelo con las manos para alargar la espalda.",
    figura: "isis",
  },
  {
    id: "selene",
    nombre: "Selene",
    nivel: "medio",
    pasos: [
      "Acostada, el cuerpo largo sobre la colchoneta.",
      "Brazos estirados por encima de la cabeza.",
      "Te alargas desde las manos hasta los pies.",
    ],
    ojo: "Si la espalda baja se despega mucho, dobla un poco las rodillas.",
    figura: "selene",
  },
  {
    id: "afrodita",
    nombre: "Afrodita",
    nivel: "avanzado",
    pasos: [
      "Acostada boca arriba, rodillas dobladas y pies apoyados.",
      "Levanta la cadera del suelo hasta que rodillas, cadera y hombros queden en una línea.",
      "Brazos estirados por encima de la cabeza, en el suelo.",
    ],
    ojo: "Sube la cadera sin arquear la espalda baja: la línea es recta, no un arco.",
    figura: "afrodita",
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
    entre las del nivel para que no sea siempre lo mismo, y siempre en el
    orden de la lámina (de pie primero, acostada al final). */
export function armarSesion(g: Guardado): Sesion {
  const { nivel, minutos } = g.prefs;
  const pausa = NIVELES.find((n) => n.id === nivel)!.pausa;
  const sinPausa = g.seguridad.sinPausa;
  const cuantas = Math.max(1, Math.floor((minutos * 60) / segundosPorPostura(pausa, sinPausa)));

  const disponibles = posturasHasta(nivel);
  const elegidas: Postura[] = [];
  const paso = Math.max(1, Math.min(cuantas, disponibles.length));
  for (let i = 0; elegidas.length < paso; i++) {
    const p = disponibles[(g.vuelta * paso + i) % disponibles.length];
    if (!elegidas.includes(p)) elegidas.push(p);
  }
  elegidas.sort((a, b) => POSTURAS.indexOf(a) - POSTURAS.indexOf(b));
  // Si el rato alcanza para más posturas que las que hay, se repite la secuencia.
  while (elegidas.length < cuantas) elegidas.push(elegidas[elegidas.length % paso]);

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

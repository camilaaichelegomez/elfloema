/* Hipopresivos: las posturas, los niveles y cómo se arma una sesión.

   El esquema de cada repetición es el de los ensayos: tres respiraciones
   lentas, botar todo el aire, la pausa con las costillas abiertas, y soltar.
   Tres repeticiones por postura. La pausa parte en unos 8 segundos y sube
   con el nivel, hasta 20; los programas publicados llegan a 25 después de
   varias semanas. */

export type Nivel = "inicio" | "medio" | "avanzado";

export const NIVELES: { id: Nivel; label: string; linea: string; pausa: number }[] = [
  { id: "inicio", label: "Empezando", linea: "Aprender la técnica con las posturas básicas y pausas cortas.", pausa: 8 },
  { id: "medio", label: "Ya me sale", linea: "La costilla se abre bien: pausas más largas y posturas nuevas.", pausa: 14 },
  { id: "avanzado", label: "Con práctica", linea: "Pausas largas, para cuando la técnica ya sale sola.", pausa: 20 },
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
   lo que muestra la lámina y de cómo Camila las practica; el detalle fino
   lo da el dibujo.

   En la app solo aparecen las que ya tienen dibujo (CON_DIBUJO, al final):
   una postura sin imagen se entiende mal. Cuando llega un dibujo nuevo, se
   agrega su figura a esa lista y la postura aparece. */
const TODAS_LAS_POSTURAS: Postura[] = [
  {
    id: "venus",
    nombre: "Venus",
    nivel: "inicio",
    pasos: [
      "Pies: juntos o separados apenas un puño, bien apoyados, el peso repartido entre talón y punta.",
      "Piernas: rodillas sueltas, sin bloquearlas hacia atrás.",
      "Tronco: derecho y largo, como si un hilo te tirara hacia arriba desde la coronilla.",
      "Brazos: hacia abajo, un poco separados del cuerpo, codos casi estirados. Manos abiertas, un palmo al lado de las caderas.",
      "Cabeza: mirada al frente, mentón un poco hacia adentro.",
    ],
    ojo: "Los hombros no suben con los brazos: quedan lejos de las orejas.",
    figura: "venus",
  },
  {
    id: "atenea",
    nombre: "Atenea",
    nivel: "inicio",
    pasos: [
      "Pies: a lo ancho de las caderas, bien apoyados.",
      "Piernas: rodillas un poco dobladas.",
      "Tronco: largo, con el peso llevado apenas hacia la punta de los pies.",
      "Brazos: partes con los brazos abajo, a los costados del cuerpo.",
      "En la pausa sin aire: subes los brazos estirados al frente, hasta la altura de los hombros, y los mantienes ahí hasta soltar.",
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
      "Pies: a lo ancho de las caderas, talones bien apoyados.",
      "Piernas: rodillas un poco dobladas.",
      "Tronco: te inclinas hacia adelante desde la cadera, con la espalda larga, hasta quedar casi horizontal.",
      "Brazos: manos apoyadas sobre los muslos, justo encima de las rodillas, codos abiertos hacia los lados.",
      "Cabeza: suelta, mirando hacia las rodillas.",
    ],
    ojo: "Si tiran mucho las piernas por detrás, dobla más las rodillas. Los talones no se despegan del suelo.",
    figura: "artemisa",
  },
  {
    id: "aura",
    nombre: "Aura",
    nivel: "inicio",
    pasos: [
      "Piernas: de rodillas, rodillas a lo ancho de las caderas, empeines o dedos de los pies apoyados atrás.",
      "Cadera: justo encima de las rodillas, sin sentarte en los talones: los muslos quedan derechos.",
      "Tronco: derecho y largo, creciendo desde la coronilla.",
      "Brazos: estirados al frente a la altura de los hombros, paralelos al suelo, palmas mirando hacia adelante.",
      "Cabeza: mirada al frente, mentón un poco hacia adentro.",
    ],
    ojo: "Los hombros bajos aunque los brazos estén arriba. Si te duelen las rodillas, pon una toalla doblada.",
    figura: "aura",
  },
  {
    id: "maya",
    nombre: "Maya",
    nivel: "inicio",
    pasos: [
      "Piernas: de rodillas en la colchoneta, rodillas justo debajo de las caderas, dedos de los pies doblados y apoyados.",
      "Brazos: codos doblados, antebrazos y manos apoyados en el suelo delante de ti, a lo ancho de los hombros.",
      "Tronco: la espalda larga y recta, de la coronilla al coxis, como una mesa inclinada.",
      "Cabeza: suelta, mirando al suelo entre las manos.",
    ],
    ojo: "No dejes caer la guata ni hundir la espalda: queda larga, como una mesa.",
    figura: "maya",
  },
  {
    id: "gaia",
    nombre: "Gaia",
    nivel: "inicio",
    pasos: [
      "Piernas: de rodillas, rodillas debajo de las caderas, dedos de los pies doblados y apoyados.",
      "Brazos: manos en el suelo, un poco más abiertas que los hombros, codos un poco doblados y abiertos hacia los lados.",
      "Tronco: empujas el suelo con las manos y redondeas toda la espalda hacia el techo, como un gato.",
      "Cabeza: suelta hacia el suelo, entre los brazos.",
    ],
    ojo: "Empuja con las manos para que los hombros no se hundan hacia el suelo.",
    figura: "gaia",
  },
  {
    id: "hestia",
    nombre: "Hestia",
    nivel: "inicio",
    pasos: [
      "Piernas: sentada en el suelo, piernas al frente con las rodillas un poco dobladas.",
      "Pies: talones apoyados en el suelo, puntas de los pies hacia el techo.",
      "Tronco: espalda derecha y larga, sin echarte hacia atrás.",
      "Brazos: al frente a la altura de los hombros, codos un poco doblados, palmas mirando hacia adelante.",
      "Cabeza: mirada al frente, nuca larga.",
    ],
    ojo: "Si la espalda se redondea, acerca un poco los talones o siéntate sobre un cojín.",
    figura: "hestia",
  },
  {
    id: "demeter",
    nombre: "Deméter",
    nivel: "inicio",
    pasos: [
      "Tronco: acostada boca arriba, la espalda apoyada en la colchoneta.",
      "Piernas: rodillas dobladas, a lo ancho de las caderas.",
      "Pies: solo los talones apoyados en el suelo, las puntas de los pies hacia el techo.",
      "Brazos: estirados hacia el techo, justo sobre los hombros, las manos cerca una de otra.",
      "Cabeza: apoyada, nuca larga, mentón un poco hacia adentro.",
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
      "Estocada baja: una pierna adelante con la rodilla doblada en ángulo recto; la otra atrás, con la rodilla apoyada en el suelo y los dedos del pie doblados.",
      "Tronco derecho y largo, sobre la cadera.",
      "Manos en la cintura, codos hacia atrás.",
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
      "Acostada de lado, el cuerpo en una línea larga, piernas estiradas una sobre la otra.",
      "Brazos estirados por encima de la cabeza: el de abajo sobre el suelo, el de arriba en arco, hasta que las manos se encuentren.",
      "Te alargas desde las manos hasta los pies.",
    ],
    ojo: "La cabeza descansa sobre el brazo de abajo. Repite del otro lado.",
    figura: "selene",
  },
  {
    /* Otra versión de Afrodita, la que Camila practica y dibujó: la cadera
       arriba como la de la lámina, con los brazos como muestra su dibujo.
       Usa el nombre de archivo que ya tenía. */
    id: "afrodita_variante",
    nombre: "Afrodita, variante",
    nivel: "medio",
    pasos: [
      "Tronco: acostada boca arriba, hombros y cabeza apoyados en la colchoneta.",
      "Piernas: rodillas dobladas, pies apoyados a lo ancho de las caderas.",
      "Cadera: la levantas del suelo, sin arquear la espalda baja.",
      "Brazos: hacia el techo, por encima de la cara, codos un poco doblados, las manos cerca una de otra.",
    ],
    ojo: "Sube la cadera sin arquear la espalda baja: la línea es recta, no un arco.",
    figura: "acostada_cadera_arriba",
  },
  {
    id: "afrodita",
    nombre: "Afrodita",
    nivel: "avanzado",
    pasos: [
      "Tronco: acostada boca arriba, hombros y cabeza apoyados en la colchoneta.",
      "Piernas y pies: rodillas dobladas, pies a lo ancho de las caderas, con los talones bien apoyados en el suelo.",
      "Cadera: la levantas del suelo hasta que rodillas, cadera y hombros queden en una línea.",
      "Brazos: estirados por encima de la cabeza, apoyados en el suelo.",
    ],
    ojo: "Sube la cadera sin arquear la espalda baja: la línea es recta, no un arco.",
    figura: "afrodita",
  },
];

/* Las figuras que ya tienen dibujo en public/hipopresivos/. */
const CON_DIBUJO = new Set([
  "venus", "atenea", "artemisa", "aura", "maya", "gaia", "hestia", "demeter",
  "acostada_cadera_arriba", "afrodita",
]);

export const POSTURAS = TODAS_LAS_POSTURAS.filter((p) => CON_DIBUJO.has(p.figura));

const ORDEN: Nivel[] = ["inicio", "medio", "avanzado"];

export function posturasHasta(nivel: Nivel) {
  const tope = ORDEN.indexOf(nivel);
  return POSTURAS.filter((p) => ORDEN.indexOf(p.nivel) <= tope);
}

/* ── La repetición, segundo a segundo ─────────────────────── */

export type Fase = "inhala" | "exhala" | "vacia" | "pausa" | "suelta";

export const TEXTO_FASE: Record<Fase, string> = {
  inhala: "Toma aire profundo por la nariz",
  exhala: "Bótalo todo por la boca, con fuerza",
  vacia: "Bota todo el aire, hasta el final",
  pausa: "Sin aire: hunde el estómago y abre las costillas",
  suelta: "Respira normal",
};

export const INHALA = 4;
export const EXHALA = 5;
export const VACIA = 6;
export const RESPIRACIONES = 3;
export const REPETICIONES = 3;

/* La apnea y la vuelta a respirar, juntas, no bajan de treinta segundos: es
   el rato que pidió Camila para que quepa aguantar lo que se aguante y
   después recuperar el aire con calma, sin que la app apure. */
export const MINIMO_APNEA_Y_VUELTA = 30;
export const SUELTA_MINIMA = 12;

export function segundosDeSoltar(pausa: number) {
  return Math.max(SUELTA_MINIMA, MINIMO_APNEA_Y_VUELTA - pausa);
}

/** Mínimo para acomodarse, cuando la postura casi no tiene instrucción. */
export const ACOMODARSE = 10;

/* Lo que tarda una voz en leer un texto: unas dos palabras por segundo, más
   un respiro en cada punto. La misma cuenta del Ritual de yoga. Sin esto, el
   tramo para acomodarse se acababa antes de que la voz terminara de explicar
   la postura, y la instrucción se cortaba a la mitad. */
export function segundosDeVoz(texto: string) {
  const palabras = texto.trim().split(/\s+/).filter(Boolean).length;
  const pausas = (texto.match(/[.,;:]/g) ?? []).length;
  return palabras / 1.85 + pausas * 0.3;
}

/** Lo que se dice al entrar en una postura. */
export function guionDeLaPostura(p: { nombre: string; pasos: string[] }) {
  return `${p.nombre}. ${p.pasos.join(" ")}`;
}

/** Cuánto dura el tramo de acomodarse: lo que tarde en decirse la postura
    entera, más un respiro para colocarse. */
export function segundosParaAcomodarse(p: { nombre: string; pasos: string[] }) {
  return Math.max(ACOMODARSE, Math.ceil(segundosDeVoz(guionDeLaPostura(p)) + 4));
}

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
  t.push({ fase: "suelta", segundos: sinPausa ? SUELTA_MINIMA : segundosDeSoltar(pausa) });
  return t;
}

export function segundosPorPostura(pausa: number, sinPausa: boolean, postura?: { nombre: string; pasos: string[] }) {
  const rep = tramosDeRepeticion(pausa, sinPausa).reduce((s, t) => s + t.segundos, 0);
  const acomodarse = postura ? segundosParaAcomodarse(postura) : ACOMODARSE + 14;
  return acomodarse + rep * REPETICIONES;
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
  const disponibles = posturasHasta(nivel);

  /* Cuántas caben en el rato elegido. Se cuenta postura por postura y no con
     un promedio, porque lo que tarda cada una depende de lo larga que sea su
     instrucción: Venus se explica en cuarenta segundos y Maya en veinte. */
  const tope = minutos * 60;
  let gastado = 0;
  let cuantas = 0;
  for (let i = 0; i < 40; i++) {
    const p = disponibles[(g.vuelta + i) % disponibles.length];
    const c = segundosPorPostura(pausa, sinPausa, p);
    if (cuantas > 0 && gastado + c > tope) break;
    gastado += c;
    cuantas++;
  }
  cuantas = Math.max(1, cuantas);

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

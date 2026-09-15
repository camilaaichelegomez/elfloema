/* Ritual de yoga: tipos y catálogos de opciones.

   Todo lo que se pregunta antes de armar la rutina vive acá, con su texto de
   ayuda. La regla es la misma que en el Ritual facial: cada opción tiene que
   CAMBIAR la rutina de verdad. Si marcar algo no saca ni pone posturas, no se
   pregunta.

   Las contraindicaciones no son adorno legal: hay posturas que en glaucoma,
   en hipertensión sin tratar, en osteoporosis o en embarazo avanzado no se
   hacen, y el armado las quita solo. La referencia de cada una queda escrita
   en el campo `fuente` de la postura. */

// ── Estilos ──────────────────────────────────────────────────

export type Estilo =
  | "hatha"
  | "vinyasa"
  | "ashtanga"
  | "iyengar"
  | "yin"
  | "restaurativo"
  | "kundalini"
  | "nidra"
  | "silla"
  | "somatico";

export const ESTILOS: {
  id: Estilo;
  label: string;
  detalle: string;
  /** Cómo se siente en el cuerpo, en una línea. */
  sensacion: string;
  /** 1 muy suave · 3 exigente. Orienta el armado. */
  carga: 1 | 2 | 3;
}[] = [
  {
    id: "hatha",
    label: "Hatha",
    detalle: "Posturas sostenidas, una por una, con pausa entre medio",
    sensacion: "Clásico y tranquilo. Te da tiempo de entender cada postura.",
    carga: 2,
  },
  {
    id: "vinyasa",
    label: "Vinyasa (flow)",
    detalle: "Las posturas se encadenan con la respiración",
    sensacion: "Movido y continuo. Sube el pulso y calienta.",
    carga: 3,
  },
  {
    id: "ashtanga",
    label: "Ashtanga",
    detalle: "Serie fija, siempre el mismo orden, exigente",
    sensacion: "Fuerza y disciplina. Se repite igual cada vez.",
    carga: 3,
  },
  {
    id: "iyengar",
    label: "Iyengar",
    detalle: "Alineación precisa con bloques, cinturón y pared",
    sensacion: "Detallista. Menos posturas, mejor hechas.",
    carga: 2,
  },
  {
    id: "yin",
    label: "Yin",
    detalle: "Pocas posturas en el suelo, sostenidas de 2 a 5 minutos",
    sensacion: "Quieto e intenso por dentro. Trabaja tejido profundo.",
    carga: 1,
  },
  {
    id: "restaurativo",
    label: "Restaurativo",
    detalle: "Todo apoyado en cojines y mantas, sin esfuerzo",
    sensacion: "Descanso activo. El cuerpo no sostiene nada.",
    carga: 1,
  },
  {
    id: "kundalini",
    label: "Kundalini",
    detalle: "Movimiento repetido, respiración de fuego, mantra",
    sensacion: "Intenso y raro al principio. Mueve mucha energía.",
    carga: 2,
  },
  {
    id: "nidra",
    label: "Yoga nidra",
    detalle: "Acostada, sin moverse: recorrido guiado por el cuerpo",
    sensacion: "Entre dormida y despierta. No es una siesta.",
    carga: 1,
  },
  {
    id: "silla",
    label: "En silla",
    detalle: "Todo sentada o con la silla de apoyo, sin bajar al suelo",
    sensacion: "Accesible. Sirve en la oficina y con movilidad reducida.",
    carga: 1,
  },
  {
    id: "somatico",
    label: "Somático",
    detalle: "Movimientos chicos y lentos, sin forma final",
    sensacion: "Exploratorio. Importa lo que sientes, no cómo se ve.",
    carga: 1,
  },
];

/* Bikram y el yoga caliente quedan fuera del armado a propósito: necesitan una
   sala a 40 °C, así que no se pueden hacer en casa con esta app. Se explican en
   la biblioteca. */

// ── Objetivos ────────────────────────────────────────────────

export type Objetivo =
  | "energia"
  | "calma"
  | "dormir"
  | "espalda"
  | "cuello_hombros"
  | "caderas"
  | "flexibilidad"
  | "fuerza"
  | "equilibrio"
  | "digestion"
  | "menstrual"
  | "embarazo"
  | "foco"
  | "postura"
  | "piernas"
  | "pecho";

export const OBJETIVOS: { id: Objetivo; label: string; detalle: string }[] = [
  { id: "energia", label: "Despertar el cuerpo", detalle: "Partir el día con movimiento" },
  { id: "calma", label: "Bajar la ansiedad", detalle: "Cuerpo acelerado, cabeza llena" },
  { id: "dormir", label: "Dormir mejor", detalle: "Para hacer antes de acostarse" },
  { id: "espalda", label: "Espalda baja", detalle: "Lumbares cargadas, dolor al estar de pie" },
  { id: "cuello_hombros", label: "Cuello y hombros", detalle: "Tensión de pantalla y de cargar" },
  { id: "caderas", label: "Abrir caderas", detalle: "Caderas duras de estar sentada" },
  { id: "flexibilidad", label: "Ganar flexibilidad", detalle: "Estirar de verdad, con tiempo" },
  { id: "fuerza", label: "Ganar fuerza", detalle: "Sostener el propio peso" },
  { id: "equilibrio", label: "Equilibrio", detalle: "Estabilidad, tobillos, propiocepción" },
  { id: "digestion", label: "Digestión", detalle: "Hinchazón, tránsito lento" },
  { id: "menstrual", label: "Dolor menstrual", detalle: "Cólicos, días de regla" },
  { id: "embarazo", label: "Embarazo", detalle: "Práctica adaptada al embarazo" },
  { id: "foco", label: "Concentración", detalle: "Antes de trabajar o estudiar" },
  { id: "postura", label: "Postura", detalle: "Espalda encorvada de estar sentada" },
  { id: "piernas", label: "Piernas cansadas", detalle: "Mucho de pie, piernas pesadas" },
  { id: "pecho", label: "Abrir el pecho", detalle: "Respirar más amplio, abrir el esternón" },
];

// ── Cuánto y cuándo ──────────────────────────────────────────

export const MINUTOS = [10, 20, 30, 45, 60] as const;
export type Minutos = (typeof MINUTOS)[number];

export type Momento = "manana" | "dia" | "noche";

export const MOMENTOS: { id: Momento; label: string; detalle: string }[] = [
  { id: "manana", label: "En la mañana", detalle: "Más movimiento y apertura" },
  { id: "dia", label: "A media jornada", detalle: "Soltar lo que se acumuló sentada" },
  { id: "noche", label: "En la noche", detalle: "Todo va bajando hacia el suelo" },
];

export type Nivel = "primera" | "poco" | "regular" | "avanzada";

export const NIVELES: { id: Nivel; label: string; detalle: string }[] = [
  { id: "primera", label: "Nunca he hecho", detalle: "Te explico cada postura desde cero" },
  { id: "poco", label: "Algo he hecho", detalle: "Conozco lo básico, sin práctica seguida" },
  { id: "regular", label: "Practico seguido", detalle: "Varias veces por semana" },
  { id: "avanzada", label: "Hace años", detalle: "Incluye posturas exigentes" },
];

export type Intensidad = "suave" | "media" | "fuerte";

export const INTENSIDADES: { id: Intensidad; label: string; detalle: string }[] = [
  { id: "suave", label: "Suave", detalle: "Sin sudar, mucho suelo y apoyo" },
  { id: "media", label: "Media", detalle: "Se siente el esfuerzo, se puede respirar" },
  { id: "fuerte", label: "Fuerte", detalle: "Sudar, sostener, trabajar fuerza" },
];

// ── Con qué cuentas ──────────────────────────────────────────

export type Prop = "mat" | "bloque" | "cinturon" | "bolster" | "manta" | "silla" | "pared";

export const PROPS: { id: Prop; label: string; detalle: string; casero: string }[] = [
  { id: "mat", label: "Mat", detalle: "Colchoneta de yoga", casero: "Una toalla gruesa sobre alfombra" },
  { id: "bloque", label: "Bloque", detalle: "Para acercar el suelo a las manos", casero: "Un libro grueso o una guía telefónica" },
  { id: "cinturon", label: "Cinturón", detalle: "Para alcanzar los pies sin tironear", casero: "Una correa, una toalla larga, una pashmina" },
  { id: "bolster", label: "Cojín largo", detalle: "El que sostiene todo en restaurativo", casero: "Dos almohadas o una frazada enrollada apretada" },
  { id: "manta", label: "Manta", detalle: "Debajo de rodillas, cadera o cabeza", casero: "Cualquier frazada doblada en cuatro" },
  { id: "silla", label: "Silla", detalle: "Apoyo o práctica entera sentada", casero: "Una silla firme sin ruedas" },
  { id: "pared", label: "Pared", detalle: "Piernas arriba, equilibrio sin miedo", casero: "Cualquier pared despejada" },
];

// ── Cuidados (lo que saca posturas de la rutina) ─────────────

export type Cuidado =
  | "rodillas"
  | "munecas"
  | "hombros"
  | "cuello"
  | "lumbar"
  | "ciatica"
  | "hipertension"
  | "glaucoma"
  | "embarazo"
  | "menstruacion"
  | "osteoporosis"
  | "vertigo"
  | "cirugia"
  | "hipermovilidad";

export const CUIDADOS: {
  id: Cuidado;
  label: string;
  detalle: string;
  /** Qué hace el armado cuando está marcado. Se muestra tal cual. */
  quita: string;
}[] = [
  {
    id: "rodillas",
    label: "Rodillas",
    detalle: "Dolor, menisco, artrosis",
    quita: "Saco arrodillarse sin manta, la flexión profunda y el loto.",
  },
  {
    id: "munecas",
    label: "Muñecas",
    detalle: "Túnel carpiano, dolor al apoyar",
    quita: "Saco todo lo que carga peso en la mano: plancha, perro, cuadrupedia.",
  },
  {
    id: "hombros",
    label: "Hombros",
    detalle: "Manguito rotador, pinzamiento",
    quita: "Saco el peso en los brazos y los brazos sobre la cabeza sostenidos.",
  },
  {
    id: "cuello",
    label: "Cuello",
    detalle: "Cervicales, hernia, latigazo",
    quita: "Saco cualquier peso en la cabeza y las extensiones con la nuca colgando.",
  },
  {
    id: "lumbar",
    label: "Espalda baja o hernia",
    detalle: "Hernia, protrusión, dolor lumbar",
    quita: "Saco la flexión hacia delante con piernas rectas y las torsiones forzadas.",
  },
  {
    id: "ciatica",
    label: "Ciática",
    detalle: "Dolor que baja por la pierna",
    quita: "Saco el estiramiento profundo de glúteo y la pinza sentada.",
  },
  {
    id: "hipertension",
    label: "Presión alta",
    detalle: "Hipertensión, sobre todo sin tratar",
    quita: "Saco invertidas, cabeza bajo el corazón sostenida y la respiración de fuego.",
  },
  {
    id: "glaucoma",
    label: "Glaucoma o presión ocular",
    detalle: "También desprendimiento de retina",
    quita: "Saco toda postura con la cabeza abajo: sube la presión dentro del ojo.",
  },
  {
    id: "embarazo",
    label: "Embarazo",
    detalle: "Cualquier trimestre",
    quita: "Saco boca abajo, torsiones cerradas, abdominales y estar mucho de espaldas.",
  },
  {
    id: "menstruacion",
    label: "Estoy con la regla",
    detalle: "Días de sangrado",
    quita: "Bajo la intensidad y priorizo apoyo. Las invertidas quedan a tu criterio.",
  },
  {
    id: "osteoporosis",
    label: "Osteoporosis",
    detalle: "También osteopenia marcada",
    quita: "Saco la flexión de columna hacia delante y las torsiones fuertes.",
  },
  {
    id: "vertigo",
    label: "Vértigo o mareo",
    detalle: "Se marea al cambiar de posición",
    quita: "Saco cambios rápidos de altura y las posturas con la cabeza abajo.",
  },
  {
    id: "cirugia",
    label: "Cirugía reciente",
    detalle: "Menos de tres meses",
    quita: "Dejo solo respiración, movilidad mínima y descanso. Pide el alta primero.",
  },
  {
    id: "hipermovilidad",
    label: "Hipermovilidad",
    detalle: "Articulaciones que se pasan de rango",
    quita: "Saco los estiramientos pasivos largos y agrego aviso de no bloquear codos ni rodillas.",
  },
];

// ── Fases de la práctica ─────────────────────────────────────

/* EL ORDEN DE ESTE ARRAY ES EL ORDEN DE LA CLASE. No se reordena: es el arco
   de una práctica completa — llegar, respirar, calentar, trabajar de pie,
   bajar al suelo, abrir, invertir suave, enfriar y descansar. */
export type Fase =
  | "centrado"
  | "respiracion"
  | "calentamiento"
  | "saludos"
  | "de_pie"
  | "equilibrio"
  | "suelo"
  | "extensiones"
  | "torsiones"
  | "invertidas"
  | "enfriamiento"
  | "respiracion_final"
  | "savasana"
  | "meditacion";

export const FASES: Fase[] = [
  "centrado",
  "respiracion",
  "calentamiento",
  "saludos",
  "de_pie",
  "equilibrio",
  "suelo",
  "extensiones",
  "torsiones",
  "invertidas",
  "enfriamiento",
  "respiracion_final",
  "savasana",
  "meditacion",
];

export const ETIQUETA_FASE: Record<Fase, string> = {
  centrado: "Llegar",
  respiracion: "Respiración",
  calentamiento: "Calentar",
  saludos: "Saludo al sol",
  de_pie: "De pie",
  equilibrio: "Equilibrio",
  suelo: "Suelo y caderas",
  extensiones: "Abrir el pecho",
  torsiones: "Torsiones",
  invertidas: "Piernas arriba",
  enfriamiento: "Bajar",
  respiracion_final: "Respiración final",
  savasana: "Savasana",
  meditacion: "Meditación",
};

// ── Una postura, una respiración o una meditación ────────────

export type Familia =
  | "de_pie"
  | "sentada"
  | "cuadrupedia"
  | "boca_abajo"
  | "supina"
  | "invertida"
  | "respiracion"
  | "quietud";

export type Paso = {
  id: string;
  fase: Fase;
  /** Nombre en español, el que se lee grande en el modo guiado. */
  nombre: string;
  /** Nombre en sánscrito, cuando existe. */
  sanscrito?: string;
  familia: Familia;
  /** Duración de referencia en segundos. El armado la ajusta dentro de min y max. */
  segundos: number;
  minimo?: number;
  maximo?: number;
  /** Se hace a un lado y al otro: el tiempo se cuenta dos veces. */
  porLado?: boolean;
  /** 1 accesible · 2 intermedia · 3 exigente. */
  nivel: 1 | 2 | 3;
  /** Cuánto cuesta: 1 descanso · 3 fuerte. */
  carga: 1 | 2 | 3;
  /** Estilos donde esta postura es de casa. Vacío = común a todos. */
  estilos: Estilo[];
  objetivos: Objetivo[];
  /** Qué hace en el cuerpo. Una o dos frases, sin promesas. */
  trabaja: string;
  /** Instrucciones, de a una frase. Se leen solas en el modo guiado. */
  como: string[];
  /** Qué NO hacer. Aparece en naranjo. */
  cuidado?: string;
  /** Cómo respirar durante la postura. */
  respirar?: string;
  /** Props que necesita de verdad. Sin ellos no entra. */
  necesita?: Prop[];
  /** Props que la mejoran pero no son obligatorios. */
  mejoraCon?: Prop[];
  /** Cuidados que la dejan fuera. */
  evita?: Cuidado[];
  /** Al revés: solo entra si está marcado alguno de estos cuidados. Sirve para
      las variantes de embarazo y de regla, que reemplazan a la versión normal. */
  soloCuidados?: Cuidado[];
  /** Cómo hacerla más fácil. */
  masFacil?: string;
  /** Cómo pedirle más. */
  masExigente?: string;
  /** Entra siempre, sin importar lo que se elija. */
  base?: boolean;
  /** Solo la primera vez: enseña algo. */
  soloPrimeraVez?: boolean;
  /** Solo para quien lleva años: posturas que no se aprenden solas desde
      una pantalla, como la vela sobre los hombros. */
  soloAvanzada?: boolean;
  /** Solo a esta hora del día. */
  soloMomento?: Momento[];
  /** Menor número, entra antes cuando el tiempo no alcanza. */
  prioridad: number;
  /** Clave del dibujo en FiguraYoga. */
  figura: string;
  /** De dónde sale lo que dice `trabaja` o el cuidado. */
  fuente?: string;
};

export type Preferencias = {
  objetivos: Objetivo[];
  minutos: number;
  momento: Momento;
  nivel: Nivel;
  intensidad: Intensidad;
  estilos: Estilo[];
  cuidados: Cuidado[];
  props: Prop[];
  /** Incluir pranayama al principio y al final. */
  respiracion: boolean;
  /** Cerrar con meditación guiada. */
  meditacion: boolean;
  /** Avisos sonoros al cambiar de postura. */
  sonido: boolean;
  /** Segundos extra o de menos sobre lo calculado, por si va muy rápido. */
  ritmo: "pausado" | "normal" | "ligero";
};

export const PREFERENCIAS_POR_DEFECTO: Preferencias = {
  objetivos: [],
  minutos: 20,
  momento: "manana",
  nivel: "primera",
  intensidad: "suave",
  estilos: [],
  cuidados: [],
  props: ["mat"],
  respiracion: true,
  meditacion: false,
  sonido: true,
  ritmo: "normal",
};

export function mmss(segundos: number) {
  const m = Math.floor(segundos / 60);
  const s = Math.round(segundos % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

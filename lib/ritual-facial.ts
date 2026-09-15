/* Ritual facial: catálogo de maniobras y armado de la rutina.

   El drenaje NO está inventado. La secuencia, el orden, la presión y las
   repeticiones salen del manual de la biblioteca (Archiprete, Ciucci, Ferreira
   y Marcovecchio, «Drenaje Linfático Manual»), más el material de apoyo de
   Maryi Maldonado. Cada paso guarda su referencia en `fuente` para poder
   revisarlo.

   Tres reglas del manual que el armado respeta siempre:
   1. Proximal antes que distal: el cuello se vacía primero, porque es la zona
      terminal del sistema. El rostro tiene al cuello como «zona de apertura».
   2. Presión de 30 a 40 mmHg (unos 55 g). En los párpados, la mitad.
   3. Cada maniobra se repite de 5 a 7 veces; la fase de presión dura más que
      la de relajación. No debe aparecer enrojecimiento ni dolor.
*/

export type Fase = "preparacion" | "drenaje" | "ejercicios" | "cierre";

export type Necesidad =
  | "hinchazon"
  | "ojeras"
  | "mandibula"
  | "frente"
  | "ovalo"
  | "labios"
  | "cuello";

export type Momento = "manana" | "noche";
export type Nivel = "primera" | "practico";

/* Cómo está la piel hoy. Cambia la rutina de verdad, no es decorativo: el
   manual indica el DLM en acné y rosácea, pero la cosmetología de la
   biblioteca deja fuera la masofilaxia (el masaje facial) en esas dos pieles.
   Así que en acné o rosácea se drena, pero no se amasa. */
export type EstadoPiel = "normal" | "acne" | "rosacea" | "deshidratada" | "cicatriz" | "postop";

export const ESTADOS_PIEL: { id: EstadoPiel; label: string; detalle: string }[] = [
  { id: "normal", label: "Sin novedad", detalle: "Piel tranquila hoy" },
  { id: "deshidratada", label: "Apagada y sin tono", detalle: "Tirante, sin luz" },
  { id: "acne", label: "Con acné activo", detalle: "Granitos, zonas inflamadas" },
  { id: "rosacea", label: "Rosácea o muy reactiva", detalle: "Se enrojece con todo" },
  { id: "cicatriz", label: "Con una cicatriz", detalle: "Mientras más reciente, mejor responde" },
  { id: "postop", label: "Después de una cirugía", detalle: "Solo con permiso de tu cirujano" },
];

export const NECESIDADES: { id: Necesidad; label: string; detalle: string }[] = [
  { id: "hinchazon", label: "Cara hinchada", detalle: "Sobre todo al despertar" },
  { id: "ojeras", label: "Ojeras y bolsas", detalle: "Párpado inferior cargado" },
  { id: "mandibula", label: "Mandíbula apretada", detalle: "Bruxismo, tensión al masticar" },
  { id: "frente", label: "Frente y entrecejo", detalle: "Líneas de expresión" },
  { id: "ovalo", label: "Óvalo y mejillas", detalle: "Contorno menos definido" },
  { id: "labios", label: "Contorno de labios", detalle: "Comisuras y líneas finas" },
  { id: "cuello", label: "Cuello y papada", detalle: "Piel del cuello, doble mentón" },
];

export const MINUTOS = [5, 10, 15] as const;

export type Paso = {
  id: string;
  fase: Fase;
  nombre: string;
  zona: string;
  /** Duración estimada en segundos. */
  segundos: number;
  /** Qué hacer, en frases cortas. Se leen de a una en el modo guiado. */
  como: string[];
  /** Repeticiones según el manual. */
  repeticiones?: string;
  /** Entra siempre en la rutina, sin importar lo que se elija. */
  base?: boolean;
  /** Solo si es la primera vez (enseña la técnica). */
  soloPrimeraVez?: boolean;
  /** Solo de noche / solo de mañana. */
  soloMomento?: Momento;
  /** A qué necesidades responde. Vacío = general. */
  necesidades: Necesidad[];
  /** Menor número, entra antes cuando hay que recortar. */
  prioridad: number;
  /** Presión a la mitad (párpados). */
  mediaPresion?: boolean;
  /** Es masofilaxia (masaje), no drenaje: fuera en acné y rosácea. */
  esMasaje?: boolean;
  fuente?: string;
};

/* El ORDEN DE ESTE ARRAY ES EL ORDEN DE LA RUTINA. No se reordena nunca:
   es la secuencia anatómica del manual. Lo único que hace el armado es
   quitar pasos que no vienen al caso. */
export const CATALOGO: Paso[] = [
  // ── Preparación ──────────────────────────────────────────────
  {
    id: "prep-limpieza",
    fase: "preparacion",
    nombre: "Manos y cara limpias",
    zona: "Antes de empezar",
    segundos: 25,
    como: [
      "Lávate las manos y retira el maquillaje.",
      "Recógete el pelo y suéltate la ropa del cuello.",
    ],
    base: true,
    necesidades: [],
    prioridad: 0,
  },
  {
    id: "prep-deslizante",
    fase: "preparacion",
    nombre: "Unas gotas de aceite",
    zona: "Antes de empezar",
    segundos: 20,
    como: [
      "Reparte unas gotas de aceite o sérum por cara y cuello.",
      "Los dedos tienen que resbalar. Si tironean la piel, falta deslizante.",
    ],
    base: true,
    necesidades: [],
    prioridad: 0,
  },
  {
    id: "prep-presion",
    fase: "preparacion",
    nombre: "Calibra la presión",
    zona: "Aprender el tacto",
    segundos: 35,
    como: [
      "Apoya dos dedos en tu antebrazo y húndelos apenas, lo justo para mover la piel.",
      "Esa es toda la fuerza: unos 55 gramos, el peso de un huevo.",
      "En los párpados, la mitad.",
      "Si la piel queda roja o algo duele, estás apretando de más.",
    ],
    base: true,
    soloPrimeraVez: true,
    necesidades: [],
    prioridad: 0,
    fuente: "Bases fundamentales: 30–40 mmHg; en párpados se reduce a la mitad",
  },

  // ── Drenaje: cuello (zona terminal, se vacía primero) ─────────
  {
    id: "prep-circulo",
    fase: "preparacion",
    nombre: "Qué es un círculo fijo",
    zona: "La maniobra base",
    segundos: 40,
    como: [
      "Casi todo el drenaje es esto, así que vale la pena entenderlo una vez.",
      "Apoya dos dedos en la mejilla y muévelos en círculo SIN que resbalen: la piel gira con los dedos, los dedos no pasean por encima.",
      "El círculo gira hacia el meñique, o sea hacia afuera y hacia abajo.",
      "Aprieta despacio en la primera mitad del círculo y suelta en la segunda.",
    ],
    base: true,
    soloPrimeraVez: true,
    necesidades: [],
    prioridad: 0,
    fuente: "Bases fundamentales: los círculos van dirigidos hacia el meñique; la fase de presión dura más que la de relajación",
  },
  {
    id: "dre-respirar",
    fase: "drenaje",
    nombre: "Baja el ritmo",
    zona: "Respiración",
    segundos: 30,
    como: [
      "Cinco respiraciones lentas, soltando los hombros.",
      "No mueve linfa por sí sola: sirve para que no apures las maniobras ni aprietes de más.",
    ],
    base: true,
    necesidades: [],
    prioridad: 0,
  },
  {
    id: "dre-apertura",
    fase: "drenaje",
    nombre: "Abrir el cuello",
    zona: "Esternón y clavícula",
    segundos: 35,
    como: [
      "Apoya los dos pulgares en el centro del pecho, justo debajo del hueco del cuello.",
      "Desliza en abanico hacia los hombros, tan liviano como si barrieras polvo.",
      "Cinco veces. El último roce va por encima de la clavícula.",
      "El cuello es la única zona que no necesita apertura previa: es la salida de todo.",
    ],
    repeticiones: "5 movimientos en abanico",
    base: true,
    necesidades: [],
    prioridad: 0,
    fuente: "DLM del cuello, maniobra 1 (effleurage)",
  },
  {
    id: "dre-cadena-cuello",
    fase: "drenaje",
    nombre: "Vaciar la cadena del cuello",
    zona: "Mandíbula → clavícula",
    segundos: 45,
    como: [
      "Los dedos índice y medio planos, justo debajo de la oreja.",
      "Cinco círculos fijos ahí mismo, girando hacia el meñique.",
      "Baja el ancho de dos dedos y otros cinco. Así hasta encima de la clavícula.",
      "Las dos manos a la vez, una a cada lado del cuello.",
    ],
    repeticiones: "5 círculos en cada punto",
    base: true,
    necesidades: [],
    prioridad: 0,
    fuente: "DLM del cuello, maniobra 2",
  },
  {
    id: "dre-nuca",
    fase: "drenaje",
    nombre: "Desde la nuca",
    zona: "Occipital → clavícula",
    segundos: 35,
    como: [
      "Los cuatro dedos de cada mano en la base del cráneo, donde termina el pelo.",
      "Cinco círculos fijos ahí.",
      "Baja por el costado de las cervicales, de a dos dedos, hasta la clavícula.",
    ],
    repeticiones: "5 círculos en cada punto",
    necesidades: ["mandibula", "cuello"],
    prioridad: 3,
    fuente: "DLM del cuello, maniobra 3",
  },
  {
    id: "dre-menton",
    fase: "drenaje",
    nombre: "Mentón hacia la mandíbula",
    zona: "Submentoniano → submaxilar",
    segundos: 40,
    como: [
      "Los dedos índice y medio en el hueco blando de debajo del mentón.",
      "Cinco círculos fijos y avanza por el borde de la mandíbula hacia la oreja, de a dos dedos.",
      "Al llegar a la oreja, baja por el costado del cuello hasta la clavícula.",
    ],
    repeticiones: "5 círculos en cada punto",
    necesidades: ["ovalo", "mandibula", "cuello"],
    prioridad: 2,
    fuente: "DLM del cuello, maniobra 4",
  },
  {
    id: "dre-orejas",
    fase: "drenaje",
    nombre: "Delante y detrás de la oreja",
    zona: "Preauricular → retroauricular",
    segundos: 35,
    como: [
      "Dos dedos delante de la oreja y dos detrás, las dos manos a la vez.",
      "Cinco círculos fijos en los dos puntos al mismo tiempo.",
      "Después baja por el costado del cuello hasta la clavícula.",
    ],
    repeticiones: "5 círculos en cada punto",
    necesidades: ["mandibula", "ovalo", "hinchazon"],
    prioridad: 3,
    fuente: "DLM del cuello, maniobra 5",
  },
  {
    id: "dre-hombros",
    fase: "drenaje",
    nombre: "Hombros",
    zona: "Acromion → clavícula",
    segundos: 30,
    como: [
      "Cruza la mano: los cuatro dedos sobre la punta del hombro del lado contrario.",
      "Círculos fijos avanzando por el borde del hombro hacia el cuello.",
      "Termina encima de la clavícula. Después cambia de lado.",
    ],
    repeticiones: "5 círculos en cada punto",
    necesidades: ["cuello", "mandibula"],
    prioridad: 5,
    fuente: "DLM del cuello, maniobras 6 y 7",
  },

  // ── Drenaje: rostro (ya con el cuello abierto) ────────────────
  {
    id: "dre-roce-rostro",
    fase: "drenaje",
    nombre: "Roce de entrada al rostro",
    zona: "Toda la cara",
    segundos: 25,
    como: [
      "Los dedos planos y muy livianos, casi sin apoyar.",
      "Roces paralelos hacia afuera, en este orden: labio de abajo, labio de arriba, nariz, mejillas y frente.",
      "Una pasada por zona. Es saludar la piel, no vaciarla todavía.",
    ],
    base: true,
    necesidades: [],
    prioridad: 0,
    fuente: "DLM del rostro, maniobra 1 (effleurage)",
  },
  {
    id: "dre-labios",
    fase: "drenaje",
    nombre: "Labios hacia la mandíbula",
    zona: "Labios → supramandibulares",
    segundos: 40,
    como: [
      "Los dedos índice y medio en el centro del labio de abajo.",
      "Cinco círculos fijos y avanza hacia el ganglio que está sobre la mandíbula, de a dos dedos.",
      "Repite igual, pero saliendo del centro del labio de arriba.",
      "Al terminar, una sola espiral que baje hasta encima de la clavícula.",
    ],
    repeticiones: "5 círculos en cada punto",
    necesidades: ["labios", "ovalo"],
    prioridad: 4,
    fuente: "DLM del rostro, maniobras 2 y 3",
  },
  {
    id: "dre-nariz",
    fase: "drenaje",
    nombre: "Los lados de la nariz",
    zona: "Dorso nasal y surcos",
    segundos: 30,
    como: [
      "Los dedos índices a los lados de la nariz, uno a cada lado.",
      "Tres círculos fijos en cada altura: primero junto a la punta, después a la mitad, después en la raíz (entre los ojos).",
      "Para terminar, presiona muy suave los surcos que bajan de la nariz a las comisuras de la boca.",
    ],
    repeticiones: "3 veces en cada altura",
    necesidades: ["hinchazon"],
    prioridad: 4,
    fuente: "DLM del rostro, maniobra 4",
  },
  {
    id: "dre-viaje-largo",
    fase: "drenaje",
    nombre: "El viaje largo",
    zona: "Bajo los ojos → clavícula",
    segundos: 50,
    como: [
      "Los dedos índice y medio debajo del ojo, apoyados en el hueso.",
      "Ve bombeando en espiral hacia abajo: presionas, sueltas, avanzas un poco.",
      "Pasa por la comisura de la boca, sigue al mentón, de ahí al ganglio de la mandíbula y de ahí a la clavícula.",
      "Hazlo entero sin levantar los dedos: es un solo viaje, no cuatro pasos sueltos.",
    ],
    necesidades: ["hinchazon", "ojeras", "ovalo"],
    prioridad: 1,
    fuente: "DLM del rostro, maniobra 5 (largo viaje)",
  },
  {
    id: "dre-ojos",
    fase: "drenaje",
    nombre: "Alrededor de los ojos",
    zona: "Párpados y lagrimal",
    segundos: 40,
    como: [
      "Solo el dedo anular, porque es el que menos fuerza tiene.",
      "Empieza en el lagrimal, junto a la nariz, siempre apoyado en el borde del hueso.",
      "Cinco círculos fijos y avanza por debajo de la ceja hasta la sien. Nunca sobre el ojo.",
      "Aquí la presión es la mitad que en el resto de la cara: si el párpado se estira, es demasiado.",
    ],
    repeticiones: "5 círculos en cada punto",
    mediaPresion: true,
    necesidades: ["ojeras", "hinchazon"],
    prioridad: 1,
    fuente: "DLM del rostro, maniobra 6; presión a la mitad en párpados",
  },
  {
    id: "dre-cejas",
    fase: "drenaje",
    nombre: "Arco de las cejas y entrecejo",
    zona: "Cejas y glabela",
    segundos: 35,
    como: [
      "Toma la ceja entre el pulgar y el índice, como una pinza blanda.",
      "Recórrela de adentro hacia afuera apretando y soltando, sin tirar de la piel.",
      "Después, con los pulgares, empuja el entrecejo hacia arriba y rueda sobre el arco de la ceja.",
    ],
    repeticiones: "5 círculos en cada punto",
    necesidades: ["frente"],
    prioridad: 3,
    fuente: "DLM del rostro, maniobras 6C, 6D y 7",
  },
  {
    id: "dre-frente",
    fase: "drenaje",
    nombre: "Frente hacia las orejas",
    zona: "Frente → preauriculares",
    segundos: 35,
    como: [
      "Los cuatro dedos planos apoyados en el centro de la frente.",
      "Cinco círculos fijos y avanza hacia la sien, de a dos dedos.",
      "Termina justo delante de la oreja, que es adonde va a salir.",
    ],
    repeticiones: "5 círculos en cada punto",
    necesidades: ["frente", "hinchazon"],
    prioridad: 3,
    fuente: "DLM del rostro, maniobra 8",
  },
  {
    id: "dre-cierre",
    fase: "drenaje",
    nombre: "Cerrar el circuito",
    zona: "Oreja → mandíbula → clavícula",
    segundos: 35,
    como: [
      "Dos dedos justo delante de la oreja.",
      "Círculos fijos bajando hasta el ganglio de la mandíbula, y de ahí por el cuello a la clavícula.",
      "Este paso no se salta nunca: es la puerta de salida de todo lo que moviste.",
    ],
    repeticiones: "5 círculos en cada punto",
    base: true,
    necesidades: [],
    prioridad: 0,
    fuente: "DLM del rostro, maniobra 9",
  },
  {
    id: "dre-roce-final",
    fase: "drenaje",
    nombre: "Roce final",
    zona: "Cara y cuello",
    segundos: 15,
    como: [
      "Con las yemas de los pulgares, tres roces desde el entrecejo hasta delante de la oreja.",
      "Lo mismo en las mejillas, hacia los lados.",
      "Termina apoyando las dos manos abiertas sobre la cara, sin presionar, y respira una vez.",
    ],
    base: true,
    necesidades: [],
    prioridad: 0,
    fuente: "DLM del rostro, maniobra 10 (effleurage final)",
  },

  // ── Ejercicios faciales ──────────────────────────────────────
  {
    id: "ej-pomulos",
    fase: "ejercicios",
    nombre: "Pómulos con resistencia",
    zona: "Mejillas",
    segundos: 45,
    como: [
      "Sonríe con los labios cerrados, sin mostrar dientes.",
      "Apoya los dedos sobre los pómulos y empuja apenas hacia abajo.",
      "Sostén 10 segundos sintiendo el músculo trabajar. Suelta.",
    ],
    repeticiones: "3 veces",
    necesidades: ["ovalo"],
    prioridad: 1,
  },
  {
    id: "ej-pez",
    fase: "ejercicios",
    nombre: "El pez",
    zona: "Mejillas",
    segundos: 30,
    como: [
      "Succiona las mejillas hacia dentro, como si chuparas algo espeso.",
      "Sostén 10 segundos. Suelta despacio.",
    ],
    repeticiones: "3 veces",
    necesidades: ["ovalo"],
    prioridad: 4,
  },
  {
    id: "ej-frente",
    fase: "ejercicios",
    nombre: "Frente contra resistencia",
    zona: "Frente",
    segundos: 40,
    como: [
      "Apoya los índices justo encima de las cejas.",
      "Intenta levantar las cejas mientras los dedos lo impiden.",
      "Diez veces, sin arrugar la frente.",
    ],
    repeticiones: "10 veces",
    necesidades: ["frente"],
    prioridad: 1,
  },
  {
    id: "ej-entrecejo",
    fase: "ejercicios",
    nombre: "Soltar el entrecejo",
    zona: "Glabela",
    segundos: 35,
    como: [
      "Un dedo a cada lado del entrecejo, separándolo suavemente.",
      "Intenta frunzir el ceño mientras los dedos lo impiden.",
      "Sostén 3 segundos y suelta del todo.",
    ],
    repeticiones: "8 veces",
    necesidades: ["frente"],
    prioridad: 3,
  },
  {
    id: "ej-ojos",
    fase: "ejercicios",
    nombre: "Párpado inferior",
    zona: "Contorno de ojos",
    segundos: 40,
    como: [
      "Un dedo apoyado en el ángulo externo del ojo y otro en el interno, sin apretar.",
      "Mira hacia arriba y entrecierra solo el párpado de abajo.",
      "Diez veces. Después cierra fuerte 10 segundos y suelta.",
    ],
    repeticiones: "10 veces",
    necesidades: ["ojeras"],
    prioridad: 2,
  },
  {
    id: "ej-o-sonrisa",
    fase: "ejercicios",
    nombre: "O y sonrisa alternadas",
    zona: "Boca y mejillas",
    segundos: 40,
    como: [
      "Boca en O bien exagerada, 5 segundos.",
      "Después sonrisa ancha con los labios juntos, 5 segundos.",
      "Cuatro rondas, sin prisa.",
    ],
    repeticiones: "4 rondas",
    necesidades: ["labios", "ovalo"],
    prioridad: 2,
  },
  {
    id: "ej-labios-dentro",
    fase: "ejercicios",
    nombre: "Labios hacia dentro",
    zona: "Contorno de labios",
    segundos: 30,
    como: [
      "Mete los labios hacia dentro, sobre los dientes.",
      "Sostén 5 segundos y suelta lento.",
    ],
    repeticiones: "6 veces",
    necesidades: ["labios"],
    prioridad: 3,
  },
  {
    id: "ej-lengua",
    fase: "ejercicios",
    nombre: "Lengua al paladar",
    zona: "Suelo de la boca",
    segundos: 40,
    como: [
      "Presiona toda la lengua contra el paladar, de la punta al fondo.",
      "Sostén 10 segundos respirando por la nariz.",
      "Es el ejercicio del doble mentón que no se ve desde fuera.",
    ],
    repeticiones: "3 veces",
    necesidades: ["ovalo", "cuello"],
    prioridad: 2,
  },
  {
    id: "ej-beso-techo",
    fase: "ejercicios",
    nombre: "Beso al techo",
    zona: "Cuello",
    segundos: 35,
    como: [
      "Mira hacia arriba sin forzar la nuca y manda un beso largo al techo.",
      "Siente el estiramiento en la parte de adelante del cuello.",
      "Si la nuca molesta, baja el mentón.",
    ],
    repeticiones: "5 veces",
    necesidades: ["cuello"],
    prioridad: 2,
  },
  {
    id: "ej-platisma",
    fase: "ejercicios",
    nombre: "Tensar el cuello",
    zona: "Platisma",
    segundos: 35,
    como: [
      "Mentón un poco adelante. Baja el labio inferior mostrando los dientes de abajo.",
      "Se marcan las cuerdas del cuello. Sostén 5 segundos.",
    ],
    repeticiones: "5 veces",
    necesidades: ["cuello"],
    prioridad: 4,
  },
  {
    id: "ej-masetero",
    fase: "ejercicios",
    nombre: "Amasar el masetero",
    zona: "Mandíbula",
    segundos: 45,
    como: [
      "Aprieta los dientes: el músculo que se abulta delante de la oreja es el masetero.",
      "Suelta la mandíbula y amásalo con los nudillos, círculos lentos.",
      "Treinta segundos por lado. Aquí sí puedes apretar más: es músculo, no linfa.",
    ],
    necesidades: ["mandibula"],
    prioridad: 1,
    esMasaje: true,
  },
  {
    id: "ej-abrir-cerrar",
    fase: "ejercicios",
    nombre: "Abrir sin apretar",
    zona: "Articulación",
    segundos: 30,
    como: [
      "Abre la boca despacio hasta donde no moleste.",
      "Cierra sin que los dientes lleguen a tocarse.",
      "Ocho veces, lento.",
    ],
    repeticiones: "8 veces",
    necesidades: ["mandibula"],
    prioridad: 3,
  },

  // ── Cierre ───────────────────────────────────────────────────
  {
    id: "cie-percusion",
    fase: "cierre",
    nombre: "Percusión suave",
    zona: "Toda la cara",
    segundos: 30,
    como: [
      "Golpecitos rápidos y livianos con las puntas de los dedos.",
      "Del centro hacia fuera, incluyendo el cuello.",
    ],
    base: true,
    necesidades: [],
    prioridad: 0,
    esMasaje: true,
  },
  {
    id: "cie-mandibula",
    fase: "cierre",
    nombre: "Mandíbula colgando",
    zona: "Relajación",
    segundos: 40,
    como: [
      "Boca entreabierta, dientes separados, lengua suelta en el piso de la boca.",
      "Quédate así, sin hacer nada, hasta que suene.",
      "Si aprietas de noche, este es el paso que más te sirve.",
    ],
    base: true,
    soloMomento: "noche",
    necesidades: [],
    prioridad: 0,
  },
  {
    id: "cie-agua",
    fase: "cierre",
    nombre: "Un vaso de agua",
    zona: "Después",
    segundos: 15,
    como: [
      "Tómate un vaso de agua.",
      "No «elimina toxinas», pero la hidratación es parte de lo básico y la biblioteca lo pone como complemento del tratamiento.",
    ],
    base: true,
    necesidades: [],
    prioridad: 0,
  },
];

export type Rutina = {
  pasos: Paso[];
  segundos: number;
  necesidades: Necesidad[];
  minutos: number;
  momento: Momento;
  nivel: Nivel;
  estadoPiel: EstadoPiel;
};

export type Opciones = {
  necesidades: Necesidad[];
  minutos: number;
  momento: Momento;
  nivel: Nivel;
  estadoPiel: EstadoPiel;
};

const indice = new Map(CATALOGO.map((p, i) => [p.id, i]));

function aplica(p: Paso, o: Opciones) {
  if (p.soloPrimeraVez && o.nivel !== "primera") return false;
  if (p.soloMomento && p.soloMomento !== o.momento) return false;
  // Masofilaxia fuera en acné y rosácea (cosmetología integral de la biblioteca).
  if (p.esMasaje && (o.estadoPiel === "acne" || o.estadoPiel === "rosacea")) return false;
  return true;
}

/** Cuántas necesidades elegidas cubre el paso. Más cobertura, entra antes. */
function cobertura(p: Paso, necesidades: Necesidad[]) {
  return p.necesidades.filter((n) => necesidades.includes(n)).length;
}

export function armarRutina(o: Opciones): Rutina {
  const disponibles = CATALOGO.filter((p) => aplica(p, o));

  const base = disponibles.filter((p) => p.base);
  const usados = new Set(base.map((p) => p.id));
  const segundosBase = base.reduce((a, p) => a + p.segundos, 0);

  const objetivo = o.minutos * 60;
  let libre = Math.max(0, objetivo - segundosBase);

  /* De mañana pesa más el drenaje (la cara amanece hinchada); de noche pesan
     más los ejercicios y la relajación. El reparto es del tiempo libre, no del
     total: la base ya está dentro. */
  const repartoDrenaje = o.momento === "manana" ? 0.65 : 0.45;
  let cupoDrenaje = Math.round(libre * repartoDrenaje);
  let cupoEjercicios = libre - cupoDrenaje;

  /* La primera vez conviene menos ejercicio y más drenaje: la técnica del
     drenaje es lo que hay que aprender, y los ejercicios mal hechos cansan. */
  if (o.nivel === "primera") {
    const traspaso = Math.round(cupoEjercicios * 0.4);
    cupoEjercicios -= traspaso;
    cupoDrenaje += traspaso;
  }

  const candidatos = disponibles
    .filter((p) => !p.base && cobertura(p, o.necesidades) > 0)
    .sort((a, b) => {
      const dif = cobertura(b, o.necesidades) - cobertura(a, o.necesidades);
      if (dif !== 0) return dif;
      if (a.prioridad !== b.prioridad) return a.prioridad - b.prioridad;
      return (indice.get(a.id) ?? 0) - (indice.get(b.id) ?? 0);
    });

  for (const p of candidatos) {
    const cupo = p.fase === "drenaje" ? cupoDrenaje : cupoEjercicios;
    if (p.segundos > cupo) continue;
    usados.add(p.id);
    if (p.fase === "drenaje") cupoDrenaje -= p.segundos;
    else cupoEjercicios -= p.segundos;
  }

  /* Si sobró tiempo en un cupo y falta en el otro, se aprovecha: más vale una
     rutina completa que dos cupos a medio llenar. */
  const sobra = cupoDrenaje + cupoEjercicios;
  if (sobra > 0) {
    for (const p of candidatos) {
      if (usados.has(p.id)) continue;
      if (p.segundos > cupoDrenaje + cupoEjercicios) continue;
      usados.add(p.id);
      if (p.fase === "drenaje") cupoDrenaje -= p.segundos;
      else cupoEjercicios -= p.segundos;
    }
  }

  const pasos = disponibles.filter((p) => usados.has(p.id));

  return {
    pasos,
    segundos: pasos.reduce((a, p) => a + p.segundos, 0),
    necesidades: o.necesidades,
    minutos: o.minutos,
    momento: o.momento,
    nivel: o.nivel,
    estadoPiel: o.estadoPiel,
  };
}

export const ETIQUETA_FASE: Record<Fase, string> = {
  preparacion: "Preparación",
  drenaje: "Drenaje linfático",
  ejercicios: "Ejercicios faciales",
  cierre: "Cierre",
};

export function mmss(segundos: number) {
  const m = Math.floor(segundos / 60);
  const s = segundos % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}


/* ── Asesoría ────────────────────────────────────────────────
   Lo que hay que saber antes de tocarse la cara. Todo lo que dice "el manual"
   sale de Archiprete/Ciucci/Ferreira/Marcovecchio; lo de la masofilaxia, de la
   cosmetología integral de la biblioteca; lo de las 20 semanas, del estudio de
   JAMA Dermatology de 2018. */

export type Aviso = { tono: "cuidado" | "nota"; texto: string };

export const AVISOS_PIEL: Record<EstadoPiel, Aviso[]> = {
  normal: [],
  deshidratada: [
    {
      tono: "nota",
      texto:
        "El masaje facial es justamente lo indicado para una piel deshidratada y sin tono. Tómate el cierre con calma, es la parte que más te sirve.",
    },
  ],
  acne: [
    {
      tono: "cuidado",
      texto:
        "Te saqué el amasado y la percusión: el masaje facial no va en acné. El drenaje sí está indicado, y mejora cómo responde la piel a los demás tratamientos.",
    },
    {
      tono: "nota",
      texto:
        "Hazlo con la cara ya limpia, y nunca encima de lesiones que estés manipulando.",
    },
    {
      tono: "nota",
      texto:
        "Si tienes pústulas, no drenes directo sobre la piel: pon una compresa fría con manzanilla o aloe y trabaja sobre ella.",
    },
    {
      tono: "nota",
      texto:
        "Cuando hay inflamación, el manual concentra el trabajo en las zonas terminales: cuello, nuca y debajo del mentón.",
    },
    {
      tono: "nota",
      texto:
        "Después queda bien una mascarilla antiinflamatoria o de arcilla, mientras no lleve nada irritante ni que estimule la circulación.",
    },
  ],
  rosacea: [
    {
      tono: "cuidado",
      texto:
        "Sin amasado ni percusión: el masaje facial no va en rosácea. El drenaje sí, como refuerzo del tratamiento médico.",
    },
    {
      tono: "nota",
      texto:
        "Con pústulas, drena sobre una compresa fría con manzanilla o aloe, no directo sobre la piel.",
    },
    { tono: "nota", texto: "La pauta del manual es de al menos 2 veces por semana." },
    {
      tono: "cuidado",
      texto: "La rosácea necesita tratamiento médico. Esto lo acompaña, no lo reemplaza.",
    },
  ],
  cicatriz: [
    {
      tono: "nota",
      texto:
        "El drenaje influye en cómo se forma la cicatriz, sobre todo si es reciente. También se obtienen resultados en cicatrices que ya no lo son.",
    },
    {
      tono: "cuidado",
      texto: "Nunca sobre una herida abierta o con puntos, salvo que te lo autorice tu médica.",
    },
  ],
  postop: [
    {
      tono: "cuidado",
      texto:
        "Solo con indicación de tu cirujano. Después de un lifting, el manual recién empieza a la semana de la operación.",
    },
    {
      tono: "nota",
      texto:
        "Pauta del manual: 2 veces por semana durante 4 semanas, y después 1 vez por semana durante 2 semanas más.",
    },
  ],
};

export const CONSEJOS: Record<Necesidad, { pasa: string; esperar: string; cada: string }> = {
  hinchazon: {
    pasa: "La linfa no tiene una bomba propia como el corazón: se mueve con la respiración y el movimiento. Al dormir acostada, el líquido se queda en la cara.",
    esperar: "Se nota el mismo día, a los minutos. Es el efecto más inmediato de todos, y también el más pasajero.",
    cada: "Todas las mañanas si quieres. El drenaje suave no cansa la piel.",
  },
  ojeras: {
    pasa: "El párpado es de los tejidos más laxos que tenemos, y en los sitios laxos es donde el líquido se acumula primero.",
    esperar: "La hinchazón baja el mismo día. Si tu ojera es de pigmento o es la sombra del hueso, el drenaje no la va a cambiar.",
    cada: "A diario, siempre a media presión y con el dedo anular.",
  },
  mandibula: {
    pasa: "El masetero es un músculo muy potente para su tamaño. Apretar los dientes de noche lo mantiene contraído y con el tiempo lo engrosa.",
    esperar: "El alivio de la tensión se siente en la misma sesión. Que baje el volumen es cosa de semanas.",
    cada: "De noche, todos los días. Es el que más rápido se agradece.",
  },
  frente: {
    pasa: "Las líneas de la frente vienen de músculos que se contraen todo el día sin que te des cuenta, muchas veces por la vista o la concentración.",
    esperar: "Lo primero que cambia es que te das cuenta de cuándo frunces. Lo demás es de meses.",
    cada: "Día por medio alcanza.",
  },
  ovalo: {
    pasa: "El contorno depende del músculo y de la grasa que hay debajo, no solo de la piel. Eso es lo que los ejercicios pueden trabajar.",
    esperar: "Es el que más tarda. En el estudio de 2018 los cambios se vieron a las 20 semanas, y lo que más mejoró fue el volumen de las mejillas.",
    cada: "Diario las primeras 8 semanas y después día por medio: es el protocolo del estudio.",
  },
  labios: {
    pasa: "Alrededor de la boca hay un músculo en anillo. Los ejercicios buscan que recupere tono, igual que cualquier otro músculo.",
    esperar: "Semanas. Y ojo: fruncir mucho para ejercitar puede marcar más las líneas. Por eso aquí los gestos son amplios, no apretados.",
    cada: "Diario. Son ejercicios cortos.",
  },
  cuello: {
    pasa: "El platisma es una lámina muscular delgada que va del pecho a la mandíbula, justo debajo de la piel. Por eso su tono se nota tanto desde fuera.",
    esperar: "Semanas para el tono. La postura frente al teléfono influye más de lo que parece.",
    cada: "Diario, junto con el drenaje del cuello.",
  },
};

export const PAUTAS: { caso: string; frecuencia: string; fuente: string }[] = [
  {
    caso: "Hinchazón de todos los días",
    frecuencia: "A diario, si te hace bien",
    fuente: "El manual no fija pauta cosmética; el drenaje suave no tiene por qué cansar la piel",
  },
  {
    caso: "Rosácea, acompañando el tratamiento médico",
    frecuencia: "Al menos 2 veces por semana",
    fuente: "Manual de DLM",
  },
  {
    caso: "Después de una cirugía estética",
    frecuencia: "2 veces por semana durante 4 semanas, después 1 vez por semana durante 2 semanas",
    fuente: "Manual de DLM, siempre con indicación del cirujano",
  },
  {
    caso: "Ejercicios faciales, por tono",
    frecuencia: "30 minutos diarios durante 8 semanas, después día por medio",
    fuente: "Protocolo del estudio de JAMA Dermatology, 2018",
  },
  {
    caso: "Linfedema",
    frecuencia: "1 a 2 veces al día durante 3 o 4 semanas",
    fuente: "Manual de DLM. Es tratamiento médico, no cosmético",
  },
];

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

/* En qué se carga la sesión. Antes lo decidía sola la hora del día, y no
   siempre coincide con lo que una quiere trabajar ese rato.

   «Más ejercicios» llega hasta 70/30, no hasta 100: el drenaje mínimo se
   mantiene siempre porque abrir el cuello y cerrar el circuito son la entrada
   y la salida de todo lo que se mueva. Sin eso, lo movido no tiene por dónde
   irse. */
/* Lo que se puede agregar a la rutina, y que no viene marcado de fábrica
   porque no todo el mundo lo quiere ni le sirve. Cada uno entra entero: si
   se elige, sus pasos van sí o sí, y el resto de la rutina se acomoda. */
export type Extra = "saltos" | "golpecitos" | "acupresion" | "bruxismo" | "capilar";

export const EXTRAS: { id: Extra; label: string; detalle: string; minutos: string }[] = [
  {
    id: "saltos",
    label: "Saltos para activar",
    detalle: "Un rato de rebotes suaves antes de empezar: el músculo que se contrae empuja la linfa.",
    minutos: "+1½ min",
  },
  {
    id: "golpecitos",
    label: "Golpecitos por el cuerpo",
    detalle: "Percusión suave en brazos, piernas y espalda baja. Despierta la circulación de la piel.",
    minutos: "+1 min",
  },
  {
    id: "acupresion",
    label: "Puntos de acupresión",
    detalle: "Cuatro puntos de la medicina china para la cara congestionada y la nariz tapada.",
    minutos: "+2½ min",
  },
  {
    id: "bruxismo",
    label: "Para el bruxismo",
    detalle: "Soltar masetero y sien, y enseñarle a la mandíbula dónde descansar.",
    minutos: "+3 min",
  },
  {
    id: "capilar",
    label: "Masaje capilar",
    detalle: "Cuatro minutos de cuero cabelludo, que es lo que se usó en el estudio.",
    minutos: "+4 min",
  },
];

export type Enfoque = "drenaje" | "equilibrado" | "ejercicios";

export const ENFOQUES: { id: Enfoque; label: string; detalle: string }[] = [
  { id: "drenaje", label: "Más drenaje", detalle: "Deshinchar hoy" },
  { id: "equilibrado", label: "Equilibrado", detalle: "Según la hora" },
  { id: "ejercicios", label: "Más ejercicios", detalle: "Trabajar el músculo" },
];

/* Las duraciones que se ofrecen. Antes había una de 5 minutos, pero con los
   segundos de lectura de cada paso lo obligatorio (abrir el cuello, cerrar el
   circuito, los roces) ya dura entre 6,3 y 8,7 minutos según el caso, y eso no
   se puede recortar sin romper la técnica. Un botón de «5 minutos» que dura
   ocho sería mentir. */
/* Lo que se dice mientras se trabajan los masajes y ejercicios, una por
   paso, en orden. Las tres primeras son las frases con que Camila acompaña
   sus propios masajes; las demás van en la misma línea.

   Hay algo de evidencia de que afirmar los propios valores ayuda con el
   estrés (la llamada «autoafirmación»), pero aquí no se usan por eso: se usan
   porque este rato es de autocuidado y está bien llenarlo de palabras buenas. */
export const AFIRMACIONES = [
  "Todo lo que quiero, lo voy a lograr.",
  "Soy fuerte.",
  "Soy hermosa, tal como soy.",
  "Merezco este tiempo para mí.",
  "Confío en mí y en lo que estoy construyendo.",
  "Suelto lo que no me pertenece.",
  "Soy suficiente.",
  "Cada día estoy más cerca de lo que quiero.",
];

/** Lo último que se escucha: para salir con eso puesto. */
export const CIERRE =
  "Sal de aquí sabiendo esto: eres fuerte, eres hermosa, y lo que te propusiste hoy ya empezó a pasar.";

export const MINUTOS = [10, 15, 20] as const;

/** Quien había guardado una duración que ya no existe pasa a la más corta. */
export function minutosValidos(m: number | undefined) {
  return m !== undefined && (MINUTOS as readonly number[]).includes(m) ? m : MINUTOS[0];
}

/* Segundos al comienzo de cada paso para leerlo y entenderlo antes de
   empezar. Hacer un ejercicio mientras todavía se está leyendo qué hay que
   hacer es la forma más segura de hacerlo mal.

   Cuentan DENTRO de los minutos elegidos: «10 minutos» tiene que seguir
   siendo diez minutos. Por eso entra algún paso menos en cada rutina. */
export const LECTURA = 10;

/** Lo que dura un paso de verdad: leerlo y hacerlo. */
export function duracion(p: Paso) {
  return p.segundos + LECTURA;
}

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
  /** Solo entra si la persona pidió ese extra. */
  extra?: Extra;
  /* Qué se busca con el ejercicio, y no es un detalle:

     Los músculos de la cara no son todos iguales. Los de EXPRESIÓN (frontal,
     ceño, orbiculares) no se atrofian con la edad — se midió con resonancia y
     no hay diferencia de grosor ni volumen entre gente joven y mayor. Lo que
     hacen es marcar la arruga al contraerse, así que fortalecerlos trabaja en
     contra. Esos se sueltan.

     Los FUNCIONALES (lengua, suprahioideos, buccinador) sí pierden fuerza: es
     la «fragilidad oral», y está documentada. Y responden al entrenamiento.
     Esos se fortalecen.

     Y hay que mirar hacia dónde tira cada uno: el platisma y el depresor de la
     comisura tiran hacia ABAJO. Por eso en medicina estética se relajan, no se
     entrenan. */
  grupo?: "fortalecer" | "soltar";
  /* Lo que se dice mientras se HACE el paso (no mientras se lee). En el
     drenaje es la imagen de soltar; en algunos pasos, una frase propia.
     Es una práctica de la mente, no una promesa del cuerpo: se escribe como
     «imagina que…», nunca como que el masaje elimine algo. */
  intencion?: string;
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
      "Sécate bien la cara y las manos: el drenaje se hace con la piel seca, sin aceite ni crema.",
      "Recógete el pelo y suéltate la ropa del cuello.",
    ],
    base: true,
    necesidades: [],
    prioridad: 0,
  },
  {
    id: "act-saltos",
    fase: "preparacion",
    nombre: "Saltos suaves para activar",
    zona: "Todo el cuerpo",
    segundos: 90,
    como: [
      "De pie, rebota sobre las plantas de los pies: los talones apenas despegan del suelo.",
      "Suelta los hombros y los brazos. Que el cuerpo entero tiemble un poco.",
      "Si prefieres no saltar, sube y baja los talones o camina en el sitio: sirve igual.",
      "Respira por la nariz. Esto no es cardio, es despertar la bomba.",
    ],
    extra: "saltos",
    necesidades: [],
    prioridad: 0,
    fuente:
      "La linfa no tiene corazón que la mueva: avanza por la contracción del propio vaso, por la respiración y por el músculo que la aprieta al moverse. Eso está bien establecido. Lo que NO tiene respaldo propio es el trampolín como método especial: lo que sirve es moverse, en la forma que sea.",
  },
  {
    id: "act-golpecitos",
    fase: "preparacion",
    nombre: "Golpecitos por el cuerpo",
    zona: "Brazos, piernas y espalda",
    segundos: 60,
    como: [
      "Ahueca la mano, como si guardaras agua, y da golpecitos rítmicos.",
      "Brazos, hombros, muslos, glúteos y espalda baja. Diez segundos por zona.",
      "Que suene hueco, no plano: si suena a cachetada, estás pegando con la mano abierta.",
      "Sáltate esta parte si tienes la piel irritada, moretones o várices marcadas.",
    ],
    extra: "golpecitos",
    necesidades: [],
    prioridad: 0,
    fuente:
      "La percusión del masaje clásico (tapotement) produce hiperemia: aumenta la circulación local de la piel. Es práctica establecida en masoterapia, con poca investigación propia. Y ojo: esto NO es drenaje linfático, que se hace con presión mínima y sin golpes.",
  },
  {
    id: "dre-respirar",
    fase: "preparacion",
    /* Antes era solo bajar el ritmo. Ahora es también el momento de decidir
       para qué es este rato: pensar en lo valiosa que eres y en lo que
       quieres lograr, y entrar a la rutina con eso. */
    nombre: "Respira y ponte una intención",
    zona: "Al comenzar",
    segundos: 45,
    como: [
      "Cierra los ojos y haz cinco respiraciones lentas, soltando los hombros.",
      "Piensa en lo valiosa que eres. No en lo que te falta: en lo que ya eres.",
      "Trae a tu mente lo que quieres lograr, y míralo como si ya estuviera hecho.",
      "Este rato es tuyo. No es un trámite: es tu momento de cuidarte.",
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
    /* Se explican una sola vez y son cortas a propósito: son para entender,
       no para trabajar. Duraban el doble y se hacían eternas. */
    segundos: 15,
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
    segundos: 18,
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
    id: "dre-apertura",
    intencion: "Imagina que abres la puerta por donde se va a ir todo lo que ya no te sirve.",
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
    intencion: "Mientras bajas, imagina que arrastras contigo todo lo que cargaste de más.",
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
      "Cinco círculos fijos y avanza por el borde del hueso de abajo del ojo, hasta la sien. Nunca sobre el ojo.",
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
    intencion: "Por aquí sale todo. Imagina que lo que ya no te pertenece se va, y no vuelve.",
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
    intencion: "Suéltalo. Ya no es tuyo. Lo que queda eres tú, más liviana.",
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
  {
    id: "acu-yintang",
    fase: "drenaje",
    nombre: "Entre las cejas · Yintang",
    zona: "Entrecejo",
    segundos: 35,
    como: [
      "Apoya el dedo medio justo entre las cejas y hunde suave.",
      "Sostén treinta segundos, respirando lento. No hagas círculos: aquí se sostiene.",
      "Es el punto que la tradición china usa para la cabeza pesada y la nariz tapada.",
    ],
    extra: "acupresion",
    necesidades: ["hinchazon"],
    prioridad: 2,
    fuente:
      "Yintang (EX-HN3) es de los puntos más usados en los ensayos de acupuntura y acupresión para rinitis alérgica. Las revisiones encuentran mejoras modestas en los síntomas y en la calidad de vida; en las medidas objetivas de flujo nasal la evidencia es más débil.",
  },
  {
    id: "acu-yingxiang",
    fase: "drenaje",
    nombre: "Al lado de la nariz · Yingxiang",
    zona: "Aletas de la nariz",
    segundos: 40,
    como: [
      "Índices en el pliegue que baja desde la nariz hacia la comisura, a un dedo del borde de la aleta.",
      "Círculos pequeños y firmes, veinte de cada lado.",
      "Si tienes la nariz tapada, aquí es donde más se nota.",
    ],
    extra: "acupresion",
    necesidades: ["hinchazon"],
    prioridad: 2,
    fuente:
      "Yingxiang (IG20) es el punto central de los protocolos de acupresión para congestión nasal y rinitis alérgica, junto con Yintang. Metaanálisis de terapias relacionadas con acupuntura: mejoras en síntomas nasales y calidad de vida, con estudios de calidad variable.",
  },
  {
    id: "acu-zanzhu",
    fase: "drenaje",
    nombre: "Nacimiento de la ceja · Zanzhu",
    zona: "Cejas",
    segundos: 35,
    como: [
      "Pulgares en el huequito donde empieza la ceja, pegado al hueso de la nariz.",
      "Presión hacia arriba y hacia adentro, como si empujaras el hueso. Veinte segundos.",
      "Para los ojos pesados de la mañana y la frente apretada.",
    ],
    extra: "acupresion",
    necesidades: ["ojeras", "hinchazon"],
    prioridad: 3,
    mediaPresion: true,
    fuente:
      "Zanzhu (V2) aparece en los protocolos de acupresión facial para congestión de la zona de los ojos. Evidencia escasa y de baja calidad: se ofrece como tradición, no como tratamiento.",
  },
  {
    id: "acu-fengchi",
    fase: "drenaje",
    nombre: "En la nuca · Fengchi",
    zona: "Base del cráneo",
    segundos: 40,
    como: [
      "Pulgares en los dos huecos de la base del cráneo, a los lados de la columna.",
      "Presiona hacia arriba y hacia el centro, con la cabeza pesada sobre los dedos.",
      "Treinta segundos. Es donde se junta la tensión del día.",
    ],
    extra: "acupresion",
    necesidades: ["mandibula", "hinchazon"],
    prioridad: 3,
    fuente:
      "Fengchi (VB20) se usa en los protocolos de acupresión para cefalea tensional y congestión nasal. La evidencia es limitada; la sensación de alivio, inmediata.",
  },
  {
    id: "prep-deslizante",
    /* El drenaje se hace sobre la piel SECA: el dedo tiene que arrastrar la
       piel, no resbalar sobre ella, y con aceite patina y la piel no se mueve.
       Así se hace en el método Vodder, que es de donde viene la técnica.

       Por eso el aceite va recién ahora, después del drenaje: para los masajes
       y ejercicios que siguen, donde sí conviene que los dedos resbalen. Y lo
       que no alcance a usarse se absorbe, que es justamente el tratamiento.

       Antes iba al principio y decía «los dedos tienen que resbalar», que
       contradecía al propio paso del círculo fijo. */
    fase: "ejercicios",
    nombre: "Ahora sí, el aceite",
    zona: "Antes de los masajes",
    segundos: 25,
    como: [
      "El drenaje se hizo en seco a propósito: con aceite el dedo patina y la piel no se mueve.",
      "Ahora reparte unas gotas de aceite por cara y cuello.",
      "Para los masajes que siguen, aquí sí conviene que los dedos resbalen.",
      "Lo que no alcances a usar se absorbe: ese es el tratamiento.",
    ],
    base: true,
    necesidades: [],
    prioridad: 0,
    fuente: "Método Vodder: el drenaje manual se hace sobre la piel seca, para poder desplazarla",
  },

  // ── Ejercicios faciales ──────────────────────────────────────
  {
    id: "ej-pomulos",
    grupo: "fortalecer",
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
    grupo: "fortalecer",
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
    nombre: "Soltar la frente",
    zona: "Frente",
    segundos: 40,
    como: [
      "La arruga de la frente la hace este músculo al contraerse, así que aquí no se fortalece: se suelta.",
      "Dedos planos sobre la frente. Empuja la piel hacia arriba y sostén 10 segundos, sin arrugar.",
      "Suelta despacio y repite tres veces.",
      "Termina apoyando las palmas sobre la frente, sin presionar, y afloja las cejas.",
    ],
    repeticiones: "3 veces",
    grupo: "soltar",
    necesidades: ["frente"],
    prioridad: 1,
    esMasaje: true,
    fuente: "Los músculos de expresión bajan tono y rigidez con el trabajo facial (Myoton®PRO, 2025); no se atrofian con la edad (resonancia de alta resolución)",
  },
  {
    id: "ej-entrecejo",
    grupo: "soltar",
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
    grupo: "fortalecer",
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
    grupo: "fortalecer",
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
    grupo: "fortalecer",
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
    grupo: "fortalecer",
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
    grupo: "fortalecer",
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
    nombre: "Soltar el cuello",
    zona: "Platisma",
    segundos: 40,
    como: [
      "El platisma tira las comisuras hacia abajo: es un depresor. Por eso aquí se estira, no se tensa.",
      "Gira la cabeza despacio a un lado y estira el cuello, sin forzar. Diez segundos.",
      "Al otro lado, otros diez.",
      "Termina con los hombros sueltos y la mandíbula entreabierta.",
    ],
    repeticiones: "10 segundos por lado",
    grupo: "soltar",
    necesidades: ["cuello"],
    prioridad: 4,
    fuente: "Las bandas del platisma se tratan relajando el músculo, no fortaleciéndolo",
  },
  {
    id: "ej-masetero",
    grupo: "soltar",
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
    grupo: "soltar",
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

  {
    id: "bru-masetero-profundo",
    grupo: "soltar",
    fase: "ejercicios",
    nombre: "Deshacer el nudo del masetero",
    zona: "Mandíbula",
    segundos: 60,
    como: [
      "Boca entreabierta, dientes separados. El músculo tiene que estar blando para trabajarlo.",
      "Nudillos en el masetero. En vez de círculos, arrastra despacio de arriba hacia abajo, como planchando la fibra.",
      "Cuando encuentres un punto que duele sordo, quédate ahí respirando diez segundos, sin aumentar la presión.",
      "Treinta segundos por lado. Si el dolor es agudo o se dispara, sal.",
    ],
    extra: "bruxismo",
    necesidades: ["mandibula"],
    prioridad: 1,
    esMasaje: true,
    fuente:
      "Ensayo aleatorizado en personas con bruxismo: la técnica de arrastre profundo sobre los músculos masticadores mejoró la calidad de sueño, la movilidad de la mandíbula y el umbral de dolor más que el TENS y que la liberación miofascial (Journal of Bodywork and Movement Therapies, 2022).",
  },
  {
    id: "bru-temporal",
    grupo: "soltar",
    fase: "ejercicios",
    nombre: "Soltar la sien",
    zona: "Músculo temporal",
    segundos: 45,
    como: [
      "Aprieta los dientes y toca la sien: eso que se mueve es el temporal, y también aprieta de noche.",
      "Suelta la mandíbula y masajea en abanico, desde la sien hacia arriba y hacia atrás.",
      "Veinte segundos por lado. Si tienes dolor de cabeza tensional, aquí vive.",
    ],
    extra: "bruxismo",
    necesidades: ["mandibula"],
    prioridad: 2,
    esMasaje: true,
    fuente:
      "La terapia manual sobre los músculos masticadores y cervicales es parte de los programas de fisioterapia para trastornos temporomandibulares, con mejoras en dolor y movilidad (revisiones sistemáticas de enfoques de tratamiento en disfunción temporomandibular, 2023).",
  },
  {
    id: "bru-reposo",
    grupo: "soltar",
    fase: "ejercicios",
    nombre: "Dónde va la mandíbula cuando descansa",
    zona: "Posición de reposo",
    segundos: 50,
    como: [
      "Labios juntos, dientes SEPARADOS, lengua apoyada en el paladar detrás de los dientes de arriba.",
      "Esa es la posición de reposo. Los dientes solo deberían tocarse al tragar y al comer.",
      "Quédate así medio minuto y memoriza la sensación: es la que tienes que reencontrar durante el día.",
      "Si te sorprendes apretando, vuelve a esto. Ese es todo el ejercicio.",
    ],
    extra: "bruxismo",
    necesidades: ["mandibula"],
    prioridad: 1,
    fuente:
      "La conciencia postural de la mandíbula y el reentrenamiento de la posición de reposo son parte de los programas conservadores para bruxismo de vigilia, junto con la terapia manual y el ejercicio.",
  },
  {
    id: "bru-apertura-guiada",
    grupo: "soltar",
    fase: "ejercicios",
    nombre: "Abrir derecho, con la lengua arriba",
    zona: "Articulación",
    segundos: 45,
    como: [
      "Lengua en el paladar. Abre la boca sin despegarla: se abre poco, y está bien.",
      "Mírate en el espejo: la mandíbula tiene que bajar recta, sin irse a un lado.",
      "Seis veces, lentas. Sin chasquidos y sin dolor.",
    ],
    repeticiones: "6 veces",
    extra: "bruxismo",
    necesidades: ["mandibula"],
    prioridad: 3,
    fuente:
      "Ejercicios de apertura controlada con control de la desviación: ejercicio terapéutico estándar en el manejo conservador de los trastornos temporomandibulares. Si hay bloqueo, chasquido con dolor o limitación para abrir, eso se ve con odontóloga o kinesióloga, no con una app.",
  },

  /* ── Fuerza de verdad ──────────────────────────────────────────
     Fortalecer pide volumen: con dos o tres ejercicios no pasa nada. Este
     bloque es el que sostiene la parte de fuerza cuando se elige el enfoque
     «más ejercicios». La lengua y los suprahioideos son los que tienen mejor
     respaldo: se entrenan y se miden. */
  {
    id: "ej-lengua-mejilla",
    fase: "ejercicios",
    nombre: "Lengua contra la mejilla",
    zona: "Lengua",
    segundos: 45,
    como: [
      "Empuja la lengua contra el interior de la mejilla, fuerte.",
      "Pon el dedo por fuera haciendo resistencia, para que la lengua tenga contra qué empujar.",
      "Sostén 5 segundos. Cinco veces por lado.",
    ],
    repeticiones: "5 por lado",
    grupo: "fortalecer",
    necesidades: ["ovalo", "labios"],
    prioridad: 2,
    fuente: "Entrenamiento de fuerza lingual: +11,5% de presión máxima en 8 semanas en adultos mayores sanos",
  },
  {
    id: "ej-lengua-fuera",
    fase: "ejercicios",
    nombre: "Lengua afuera, sostenida",
    zona: "Lengua",
    segundos: 40,
    como: [
      "Saca la lengua recta, todo lo que puedas, sin torcerla.",
      "Sostén 8 segundos sintiendo el trabajo bajo el mentón.",
      "Cinco veces, descansando entre una y otra.",
    ],
    repeticiones: "5 veces",
    grupo: "fortalecer",
    necesidades: ["ovalo", "cuello"],
    prioridad: 3,
    fuente: "Ejercicios orofaríngeos de lengua y paladar (Guimarães et al., ensayo aleatorizado con grupo placebo)",
  },
  {
    id: "ej-deglucion",
    fase: "ejercicios",
    nombre: "Tragar con fuerza",
    zona: "Suprahioideos",
    segundos: 40,
    como: [
      "Junta saliva, aprieta la lengua entera contra el paladar y traga con todas tus fuerzas.",
      "Vas a sentir cómo se tensa todo bajo el mentón: esos son los suprahioideos.",
      "Seis veces, sin apuro.",
    ],
    repeticiones: "6 veces",
    grupo: "fortalecer",
    necesidades: ["ovalo", "cuello"],
    prioridad: 2,
    fuente: "Deglución con esfuerzo: ejercicio de suprahioideos usado en rehabilitación de la deglución",
  },
  {
    id: "ej-abrir-resistencia",
    fase: "ejercicios",
    nombre: "Abrir contra el puño",
    zona: "Suprahioideos",
    segundos: 40,
    como: [
      "Pon el puño bajo el mentón e intenta abrir la boca mientras el puño lo impide.",
      "Sostén 5 segundos. Es el ejercicio del doble mentón que sí tiene respaldo.",
      "Seis veces. Si la mandíbula cruje o duele, sáltalo.",
    ],
    repeticiones: "6 veces",
    grupo: "fortalecer",
    necesidades: ["ovalo", "cuello"],
    prioridad: 2,
    fuente: "La fuerza de apertura mandibular se asocia a la masa de los suprahioideos y a la presión lingual",
  },
  {
    id: "ej-pomulo-elevador",
    fase: "ejercicios",
    nombre: "Elevador de pómulo",
    zona: "Cigomáticos",
    segundos: 45,
    como: [
      "Boca en O, con el labio de arriba cubriendo los dientes.",
      "Sonríe para levantar los pómulos y apoya los dedos arriba de la mejilla.",
      "Baja los pómulos y vuelve a subirlos, sintiendo el músculo bajo los dedos.",
      "Diez veces.",
    ],
    repeticiones: "10 veces",
    grupo: "fortalecer",
    necesidades: ["ovalo"],
    prioridad: 1,
    fuente: "Uno de los dos ejercicios publicados del programa de Northwestern (JAMA Dermatology, 2018), donde mejoró el volumen de la mejilla",
  },
  {
    id: "ej-aire-mejillas",
    fase: "ejercicios",
    nombre: "Pasar el aire",
    zona: "Buccinador",
    segundos: 40,
    como: [
      "Infla las mejillas con la boca cerrada y aguanta el aire.",
      "Pásalo de una mejilla a la otra, despacio, sin dejarlo escapar.",
      "Diez pases. Después suelta el aire de a poco.",
    ],
    repeticiones: "10 pases",
    grupo: "fortalecer",
    necesidades: ["ovalo", "labios"],
    prioridad: 3,
    fuente: "El buccinador es uno de los músculos que suben tono y rigidez con el trabajo facial (Myoton®PRO, 2025)",
  },
  {
    id: "ej-labios-resistencia",
    fase: "ejercicios",
    nombre: "Cierre de labios",
    zona: "Orbicular de los labios",
    segundos: 35,
    como: [
      "Aprieta los labios uno contra otro, sin fruncirlos hacia adelante.",
      "Pon un dedo horizontal delante y empuja suave hacia afuera: los labios tienen que resistir.",
      "Sostén 5 segundos. Seis veces.",
    ],
    repeticiones: "6 veces",
    grupo: "fortalecer",
    necesidades: ["labios", "ovalo"],
    prioridad: 3,
    fuente: "Entrenamiento del orbicular de los labios y del cierre labial en terapia miofuncional orofacial",
  },
  {
    id: "ej-masticar",
    fase: "ejercicios",
    nombre: "Masticar a conciencia",
    zona: "Masticación",
    segundos: 40,
    como: [
      "Mastica exagerando el movimiento, con la boca cerrada, veinte veces de un lado.",
      "Veinte del otro. La mayoría de la gente mastica siempre del mismo lado sin darse cuenta.",
      "Es el único ejercicio que puedes hacer comiendo.",
    ],
    repeticiones: "20 por lado",
    grupo: "fortalecer",
    necesidades: ["ovalo", "mandibula"],
    prioridad: 4,
    fuente: "Entrenamiento funcional de masticación alternada (terapia miofuncional orofacial, CoDAS 2024)",
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
    id: "cap-craneo",
    fase: "cierre",
    nombre: "Masaje del cuero cabelludo",
    zona: "Cabeza",
    segundos: 120,
    como: [
      "Límpiate el aceite de las manos: esto se hace en seco, con las yemas, nunca con las uñas.",
      "Apoya los dedos y MUEVE el cuero cabelludo sobre el hueso. No resbales por el pelo: la piel tiene que desplazarse.",
      "Por zonas: sienes, encima de las orejas, coronilla, parte de atrás. Quince segundos en cada una.",
      "Presión firme y sostenida, sin dolor. Es un estiramiento de la piel, no un rasguño.",
    ],
    extra: "capilar",
    necesidades: [],
    prioridad: 1,
    fuente:
      "Koyama et al., 2016: nueve hombres, cuatro minutos al día de masaje estandarizado del cuero cabelludo durante 24 semanas. El pelo se engrosó (de 0,085 a 0,092 mm) y cambió la expresión de genes del folículo; la CANTIDAD de pelos no aumentó. La hipótesis es la mecanotransducción: el estiramiento de la piel llega a las células de la papila dérmica.",
  },
  {
    id: "cap-tracciones",
    fase: "cierre",
    nombre: "Tracciones suaves",
    zona: "Raíz del pelo",
    segundos: 60,
    como: [
      "Toma un mechón pequeño cerca de la raíz, con la mano entera, y tira suave un par de segundos.",
      "Suelta y cambia de zona. Nunca desde las puntas, y nunca hasta que duela.",
      "Un minuto por toda la cabeza.",
    ],
    extra: "capilar",
    necesidades: [],
    prioridad: 3,
    fuente:
      "Es la misma idea de estiramiento mecánico del estudio anterior. Traccionar fuerte o siempre en la misma zona hace lo contrario: la tracción sostenida (moños apretados, trenzas tirantes) causa alopecia por tracción, que sí está bien documentada.",
  },
  {
    id: "cap-nuca",
    fase: "cierre",
    nombre: "Nuca y borde del pelo",
    zona: "Nuca",
    segundos: 60,
    como: [
      "Pulgares en la base del cráneo, dedos abiertos sobre la cabeza.",
      "Círculos lentos por todo el borde del pelo, subiendo hacia la coronilla.",
      "Termina peinando con los dedos desde la frente hacia atrás, tres veces.",
    ],
    extra: "capilar",
    necesidades: [],
    prioridad: 2,
    fuente:
      "Lo honesto: el masaje capilar engrosa el pelo que ya tienes y se siente bien. No revierte una alopecia androgenética, que tiene causa genética y hormonal; para eso lo que tiene evidencia sólida es el minoxidil y, con indicación médica, la finasterida. Si se te cae el pelo de golpe, en parches o con picazón, eso se ve con dermatóloga.",
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
  enfoque: Enfoque;
  necesidades: Necesidad[];
  minutos: number;
  momento: Momento;
  nivel: Nivel;
  estadoPiel: EstadoPiel;
};

export type Opciones = {
  necesidades: Necesidad[];
  /** Opcional: quien guardó su elección antes de que esto existiera sigue funcionando. */
  enfoque?: Enfoque;
  minutos: number;
  momento: Momento;
  nivel: Nivel;
  estadoPiel: EstadoPiel;
  /** Opcional: quien guardó antes de que existieran no lleva ninguno. */
  extras?: Extra[];
};

const indice = new Map(CATALOGO.map((p, i) => [p.id, i]));

function aplica(p: Paso, o: Opciones) {
  if (p.extra && !(o.extras ?? []).includes(p.extra)) return false;
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

  /* Los extras elegidos entran completos, como la base: quien pidió el masaje
     capilar lo quiere entero, no la mitad porque no cupo. Lo que se acomoda es
     el resto de la rutina. */
  const base = disponibles.filter((p) => p.base || p.extra);
  const usados = new Set(base.map((p) => p.id));
  const segundosBase = base.reduce((a, p) => a + duracion(p), 0);

  const objetivo = o.minutos * 60;
  let libre = Math.max(0, objetivo - segundosBase);

  /* De mañana pesa más el drenaje (la cara amanece hinchada); de noche pesan
     más los ejercicios y la relajación. El reparto es del tiempo libre, no del
     total: la base ya está dentro. */
  const porLaHora = o.momento === "manana" ? 0.65 : 0.45;
  const repartoDrenaje =
    o.enfoque === "drenaje" ? 0.8 : o.enfoque === "ejercicios" ? 0.3 : porLaHora;
  let cupoDrenaje = Math.round(libre * repartoDrenaje);
  let cupoEjercicios = libre - cupoDrenaje;

  /* La primera vez conviene menos ejercicio y más drenaje: la técnica del
     drenaje es lo que hay que aprender, y los ejercicios mal hechos cansan. */
  if (o.nivel === "primera" && o.enfoque !== "ejercicios") {
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
    if (duracion(p) > cupo) continue;
    usados.add(p.id);
    if (p.fase === "drenaje") cupoDrenaje -= duracion(p);
    else cupoEjercicios -= duracion(p);
  }

  /* Si sobró tiempo en un cupo y falta en el otro, se aprovecha: más vale una
     rutina completa que dos cupos a medio llenar.

     Pero solo hacia la fase que se pidió. Antes rellenaba con cualquier cosa y
     eso anulaba la elección: «más drenaje» terminaba dando exactamente la misma
     rutina que «equilibrado», porque el sobrante se iba igual en ejercicios.
     Si se pidió un enfoque y ya no quedan pasos de esa fase, la rutina queda
     más corta, y está bien: es lo que se pidió. */
  const sobra = cupoDrenaje + cupoEjercicios;
  if (sobra > 0) {
    const favorita =
      o.enfoque === "drenaje" ? "drenaje" : o.enfoque === "ejercicios" ? "ejercicios" : null;
    for (const p of candidatos) {
      if (usados.has(p.id)) continue;
      if (favorita && p.fase !== favorita) continue;
      if (duracion(p) > cupoDrenaje + cupoEjercicios) continue;
      usados.add(p.id);
      if (p.fase === "drenaje") cupoDrenaje -= duracion(p);
      else cupoEjercicios -= duracion(p);
    }
  }

  const pasos = disponibles.filter((p) => usados.has(p.id));

  return {
    pasos,
    segundos: pasos.reduce((a, p) => a + duracion(p), 0),
    enfoque: o.enfoque ?? "equilibrado",
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

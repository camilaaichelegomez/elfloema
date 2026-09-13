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
      "Pulgares sobre el esternón. Roces suaves en abanico hacia los lados.",
      "El último roce va a lo largo de la clavícula.",
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
      "Círculos fijos sin desplazar los dedos, bajando por el costado del cuello.",
      "Empieza bajo la mandíbula y avanza punto por punto hasta encima de la clavícula.",
      "Presiona más lento de lo que sueltas.",
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
      "Círculos fijos en la base del cráneo.",
      "Baja junto a las cervicales hasta la clavícula.",
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
      "Círculos fijos justo debajo del mentón.",
      "Avanza por el borde de la mandíbula hacia la oreja.",
      "De ahí, baja a la clavícula.",
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
      "Círculos fijos delante de la oreja.",
      "Pasa por detrás de la oreja y baja hasta la clavícula.",
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
      "Círculos fijos desde la punta del hombro hacia el cuello.",
      "Sigue el borde del trapecio y termina sobre la clavícula.",
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
      "Roces paralelos, muy livianos: labio inferior, labio superior, nariz, mejillas, frente.",
      "Es un saludo a la piel, no una maniobra de vaciado.",
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
      "Círculos fijos desde el centro del labio inferior hacia los ganglios sobre la mandíbula.",
      "Repite desde el centro del labio superior.",
      "Al terminar, drena una vez en espiral hasta encima de la clavícula.",
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
      "Círculos fijos a los lados de la nariz: primero en la punta, después al medio, después en la raíz.",
      "Presiona muy suavemente los surcos que bajan de la nariz a la boca.",
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
      "Empieza debajo de los ojos y ve bombeando en espiral hacia abajo.",
      "Pasa por la comisura de los labios y sigue hasta el mentón.",
      "Desde ahí, a los ganglios bajo la mandíbula y de ahí a la clavícula.",
      "Es el recorrido completo: la linfa de la cara saliendo por donde debe.",
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
      "Usa solo el dedo anular: es el que menos fuerza tiene.",
      "Círculos fijos sobre el hueso, del lagrimal hacia la sien. Nunca sobre el globo del ojo.",
      "Aquí la presión es la mitad que en el resto de la cara.",
      "Si estiras el párpado, estás haciendo demasiado.",
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
      "Toma las cejas entre el pulgar y el índice y recórrelas de dentro hacia fuera.",
      "Círculos fijos sobre el entrecejo.",
      "Después, círculos siguiendo el arco de la ceja.",
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
      "Dedos planos desde el centro de la frente.",
      "Círculos fijos avanzando hacia delante de la oreja.",
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
      "Círculos fijos desde delante de la oreja hacia los ganglios de la mandíbula.",
      "De ahí, hasta encima de la clavícula.",
      "Este paso no se salta: es por donde sale todo lo que moviste.",
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
    como: ["Roces largos y livianos hacia abajo, una sola vez."],
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
};

export type Opciones = {
  necesidades: Necesidad[];
  minutos: number;
  momento: Momento;
  nivel: Nivel;
};

const indice = new Map(CATALOGO.map((p, i) => [p.id, i]));

function aplica(p: Paso, o: Opciones) {
  if (p.soloPrimeraVez && o.nivel !== "primera") return false;
  if (p.soloMomento && p.soloMomento !== o.momento) return false;
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

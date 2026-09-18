import type { Cuidado, Objetivo } from "./tipos";

/* Qué está probado y qué no.

   Regla de la casa: acá no se promete nada que no esté respaldado. Cada
   objetivo lleva un grado y la referencia real, que está descargada en
   biblioteca-cientifica/yoga/<carpeta>/todos.json. Si mañana quieres revisar
   una afirmación, abres esa carpeta y buscas el título.

   Los grados:
   · probado    — revisiones sistemáticas o metaanálisis que apuntan al mismo lado.
   · prometedor — hay ensayos y revisiones, pero con muestras chicas o resultados dispares.
   · debil      — se estudia poco, o los estudios que hay no alcanzan para afirmar.
   · tradicion  — viene de la tradición del yoga y no de la investigación. Se dice así.

   Lo que el yoga NO hace también está escrito. Es la parte que casi nadie pone
   y la que más falta hace. */

export type Grado = "probado" | "prometedor" | "debil" | "tradicion";

export const ETIQUETA_GRADO: Record<Grado, string> = {
  probado: "Bien respaldado",
  prometedor: "Prometedor",
  debil: "Evidencia débil",
  tradicion: "Tradición, no ciencia",
};

export type Evidencia = {
  grado: Grado;
  /** Qué se puede decir con honestidad. */
  dice: string;
  /** El pero. Siempre hay uno. */
  matiz: string;
  /** Referencia real, descargada en la biblioteca. */
  fuente: string;
  /** Carpeta donde están los artículos. */
  carpeta: string;
};

export const EVIDENCIA: Record<Objetivo, Evidencia> = {
  espalda: {
    grado: "probado",
    dice: "Para el dolor lumbar crónico inespecífico, el yoga mejora el dolor y la función. Es de los usos con más ensayos detrás.",
    matiz:
      "No es mejor que otras formas de ejercicio: las revisiones que comparan yoga con ejercicio terapéutico encuentran resultados parecidos. Lo que importa es moverse con constancia, y el yoga sirve si es lo que vas a sostener.",
    fuente:
      "«Is yoga more beneficial than exercise-based interventions for patients with chronic low back pain? A systematic review and meta-analysis», Frontiers in Medicine, 2026",
    carpeta: "yoga/dolor_espalda",
  },
  calma: {
    grado: "probado",
    dice: "Baja la ansiedad y los síntomas depresivos leves a moderados. Es de lo más estudiado que hay en yoga.",
    matiz:
      "Los efectos son moderados y muchos estudios comparan contra no hacer nada, lo que siempre favorece a la intervención. No reemplaza tratamiento psicológico ni psiquiátrico cuando hace falta.",
    fuente:
      "Revisiones y ensayos recopilados en la carpeta, incluida la umbrella review de actividad física y ansiedad perinatal, EClinicalMedicine, 2026",
    carpeta: "yoga/ansiedad_estres",
  },
  dormir: {
    grado: "probado",
    dice: "Mejora la calidad del sueño autorreportada. El yoga nidra en particular tiene revisión sistemática propia para insomnio y alteraciones del sueño.",
    matiz:
      "Casi todo se mide con cuestionarios, no con polisomnografía. Y hay que practicar seguido: no es una pastilla para una noche mala.",
    fuente:
      "«Effect of yoga Nidra (yogic sleep) in sleep disturbances and insomnia: systematic review and meta-analysis», Sleep & Breathing, 2026",
    carpeta: "yoga/sueno_nidra",
  },
  flexibilidad: {
    grado: "probado",
    dice: "Gana rango de movimiento. Es de los efectos más consistentes y de los que más rápido se notan.",
    matiz:
      "El rango se pierde si dejas de practicar. Y ganar flexibilidad no previene lesiones por sí solo: eso es un mito que se repite mucho.",
    fuente: "Revisiones de dosis de estiramiento y rango de movimiento en la carpeta, incluida la dosis-respuesta en Annals of Physical and Rehabilitation Medicine, 2026",
    carpeta: "yoga/fuerza_flexibilidad",
  },
  equilibrio: {
    grado: "probado",
    dice: "Mejora el equilibrio y la estabilidad, y en personas mayores forma parte de los programas que reducen caídas.",
    matiz:
      "Para prevención de caídas lo que funciona es el entrenamiento de equilibrio específico y sostenido, con o sin yoga. El yoga sirve como vehículo, no como magia.",
    fuente:
      "«Therapeutic yoga versus physiotherapy-based balance and proprioceptive neuromuscular facilitation training», JBI Evidence Synthesis, 2026",
    carpeta: "yoga/mayores_movilidad",
  },
  fuerza: {
    grado: "prometedor",
    dice: "Sostener el propio peso desarrolla fuerza, sobre todo en quien parte de poco entrenamiento.",
    matiz:
      "Comparado con entrenamiento de fuerza con carga, el yoga rinde menos en ganancia de músculo. Si tu objetivo principal es fuerza, el yoga complementa; no reemplaza las pesas.",
    fuente: "Ensayos de fuerza y capacidad funcional recopilados en la carpeta",
    carpeta: "yoga/fuerza_flexibilidad",
  },
  menstrual: {
    grado: "prometedor",
    dice: "Para la dismenorrea primaria hay ensayos aleatorizados con mejoras en dolor y en calidad de sueño.",
    matiz:
      "Los estudios son chicos y difíciles de cegar: nadie puede hacer yoga sin saber que lo está haciendo. Si el dolor te incapacita o cambió de golpe, eso se consulta, no se estira.",
    fuente:
      "«Effects of yoga on pain, sleep quality, and aerobic endurance in young women with primary dysmenorrhea: a randomized controlled trial», Health Care for Women International, 2026",
    carpeta: "yoga/menstrual_hormonal",
  },
  embarazo: {
    grado: "probado",
    dice: "El yoga prenatal adaptado mejora ansiedad, depresión y calidad de vida en el embarazo, y se considera seguro cuando se adapta.",
    matiz:
      "«Adaptado» es la palabra clave: nada de boca abajo, ni torsiones cerradas, ni mucho rato de espaldas después del primer trimestre, ni buscar rango nuevo (la relaxina ya te da de más). Confirma con tu matrona o médica.",
    fuente:
      "«The effect of yoga on depression, anxiety, and stress during pregnancy and postpartum: a systematic review and meta-analysis», Best Practice & Research Clinical Obstetrics & Gynaecology, 2026",
    carpeta: "yoga/embarazo",
  },
  cuello_hombros: {
    grado: "prometedor",
    dice: "El ejercicio terapéutico mejora el dolor de cuello crónico y la postura de cabeza adelantada. El yoga entra en esa familia.",
    matiz:
      "Ojo con lo que promete la industria de la postura: las revisiones muestran que el ángulo craneovertebral cambia, pero el beneficio clínico y funcional no siempre acompaña. Mejora el dolor; no te va a rediseñar el cuerpo.",
    fuente:
      "«Therapeutic Exercise for Forward Head Posture in Neck Pain Patients: A Systematic Review and Meta-Analysis», Journal of Pain Research, 2026",
    carpeta: "yoga/postura_escritorio",
  },
  postura: {
    grado: "prometedor",
    dice: "Los ejercicios correctivos mejoran las medidas de postura, y fortalecer la espalda alta ayuda a sostenerse más erguida sin esfuerzo.",
    matiz:
      "«Corregir la postura» no equivale a quitar el dolor: hay revisiones que encuentran mejoras claras en postura sin mejoras consistentes en síntomas. La mejor postura sigue siendo la siguiente: moverse seguido.",
    fuente:
      "«Corrective exercises strongly improve posture but fail to produce consistent clinical or functional benefits», BMC Sports Science, Medicine & Rehabilitation, 2026",
    carpeta: "yoga/postura_escritorio",
  },
  digestion: {
    grado: "prometedor",
    dice: "En síndrome de intestino irritable hay revisión sistemática con mejoras en síntomas y en el malestar psicológico asociado.",
    matiz:
      "Buena parte del efecto puede venir por el lado del estrés, que en el intestino irritable pesa mucho. Las torsiones no «exprimen» órganos ni «desintoxican» nada.",
    fuente: "«The Effectiveness of Yoga for Irritable Bowel Syndrome: A Systematic Review», Comprehensive Physiology, 2025",
    carpeta: "yoga/digestivo",
  },
  energia: {
    grado: "prometedor",
    dice: "Practicar en la mañana sube el estado de alerta y el ánimo, como casi cualquier actividad física.",
    matiz:
      "Nada de esto es exclusivo del yoga: caminar rápido veinte minutos hace algo parecido. El yoga gana cuando es lo que te gusta y lo que vas a repetir.",
    fuente: "Ensayos de intervención breve y bienestar psicológico en la carpeta",
    carpeta: "yoga/ansiedad_estres",
  },
  foco: {
    grado: "prometedor",
    dice: "Las prácticas de meditación y mind-body muestran mejoras en atención y función cognitiva, sobre todo en personas mayores.",
    matiz:
      "Los tamaños de efecto son chicos y los estudios de meditación tienen un problema grande de sesgo: quien practica sabe que practica y quiere que funcione.",
    fuente:
      "«A Meta-Analysis of Studies of the Effect of Mind Body Exercise on Various Domains of Cognitive Function in Older People», Journal of Evidence-Based Integrative Medicine, 2025",
    carpeta: "yoga/meditacion_mindfulness",
  },
  caderas: {
    grado: "prometedor",
    dice: "Abrir la cadera mejora el rango y suele aliviar la espalda baja, porque parte de la carga lumbar viene de una cadera que no se mueve.",
    matiz:
      "El rango tiene un techo: tu forma de hueso también decide. Forzar la cadera buscando una foto es la manera más común de terminar con dolor de ingle.",
    fuente: "Revisiones de rango de movimiento y de dolor lumbar en la biblioteca",
    carpeta: "yoga/fuerza_flexibilidad",
  },
  piernas: {
    grado: "debil",
    dice: "Poner las piernas arriba alivia la sensación de pesadez después de muchas horas de pie. El retorno venoso se favorece cuando la pierna queda sobre el nivel del corazón.",
    matiz:
      "Eso es fisiología, no un tratamiento: alivia mientras dura y un rato después. Para varices o hinchazón que no baja, hay que ver a alguien.",
    fuente: "Fisiología del retorno venoso; no hay ensayos de yoga específicos para esto en la biblioteca",
    carpeta: "yoga/cardio_metabolico",
  },
  pecho: {
    grado: "debil",
    dice: "Abrir el pecho y trabajar la movilidad de la columna dorsal permite que las costillas se muevan más al respirar.",
    matiz:
      "No hay estudios que muestren que esto cambie tu capacidad pulmonar si estás sana. Se siente bien, que ya es razón suficiente, pero no lo vendas como más.",
    fuente: "Revisiones de movilidad torácica y cifosis en la carpeta",
    carpeta: "yoga/postura_escritorio",
  },
};

/* Lo que se dice del yoga y no es cierto. Va aparte y con nombre propio. */
export const MITOS: { dice: string; realidad: string }[] = [
  {
    dice: "La música a 432 Hz o a 528 Hz sana y repara el cuerpo",
    realidad:
      "No hay estudios serios que lo respalden. Lo que sí tiene respaldo es algo más simple: la música lenta que te gusta baja la ansiedad, sea en la afinación que sea.",
  },
  {
    dice: "Las torsiones «desintoxican» los órganos",
    realidad:
      "Ninguna postura exprime el hígado ni limpia nada. Los órganos que depuran son el hígado y los riñones, y funcionan igual estés torcida o no. La torsión mueve la columna, y eso ya es bastante.",
  },
  {
    dice: "El yoga alinea los chakras y equilibra la energía",
    realidad:
      "Los chakras son parte de la tradición, no anatomía. Se pueden nombrar como lo que son —un mapa simbólico del cuerpo— sin presentarlos como fisiología. Lo que sí se mide es el sistema nervioso autónomo.",
  },
  {
    dice: "La flexibilidad previene lesiones",
    realidad:
      "No está demostrado. Lo que sí baja el riesgo es la fuerza y la progresión gradual. Hay quien se lesiona justamente por ser demasiado flexible sin fuerza que sostenga ese rango.",
  },
  {
    dice: "Si duele, es que está funcionando",
    realidad:
      "Al revés. La molestia sorda de un estiramiento se puede sostener; el dolor agudo, punzante, eléctrico o articular es señal de salir. Hay una revisión sistemática dedicada solo a los eventos adversos del yoga.",
  },
  {
    dice: "El yoga sirve para bajar de peso",
    realidad:
      "Una clase suave gasta poco. Un vinyasa sostenido gasta más, pero menos que correr. El yoga ayuda por otro lado: duermes mejor, comes con más conciencia y te mueves más seguido.",
  },
];

/* La música de fondo. Tres cosas distintas que suelen venderse juntas, y que
   tienen evidencia muy distinta. Los artículos están en
   biblioteca-cientifica/yoga/musica_frecuencias. */
export const SOBRE_MUSICA: { tema: string; grado: Grado; dice: string; fuente: string }[] = [
  {
    tema: "Música lenta y relajante",
    grado: "probado",
    dice: "Baja la ansiedad. Es de lo más estudiado en música y salud, en contextos que van de una sala de espera a un parto.",
    fuente: "«Music for anxiety? Meta-analysis of anxiety reduction in non-clinical samples», Psychology of Music, 2017",
  },
  {
    tema: "Pulsos binaurales",
    grado: "prometedor",
    dice: "Hay revisiones que encuentran menos ansiedad y dolor, sobre todo antes de una cirugía. Pero la idea de que «sincronizan las ondas cerebrales» no está demostrada, y muchos estudios no encuentran efecto.",
    fuente: "«Binaural beats for perioperative anxiety and pain: a systematic review and meta-analysis», Complementary Therapies in Medicine, 2025",
  },
  {
    tema: "432 Hz y frecuencias solfeggio (528 Hz)",
    grado: "tradicion",
    dice: "No hay evidencia de que una afinación o una frecuencia concreta sane nada. Lo que existe son estudios piloto muy chicos y textos exploratorios. La app no usa ni promete estas frecuencias.",
    fuente: "Estudios piloto sobre 432 Hz y textos exploratorios sobre solfeggio en la carpeta",
  },
];

/* Qué hay que saber cuando se marca un cuidado. Aparece junto a la rutina. */
export type Aviso = { tono: "cuidado" | "nota"; texto: string };

export const AVISOS_CUIDADO: Record<Cuidado, Aviso[]> = {
  rodillas: [
    {
      tono: "nota",
      texto:
        "Regla simple para la rodilla: nunca la dejes caer hacia adentro, y que no pase la línea del tobillo en las posturas de pie. Una manta doblada bajo la rodilla cambia por completo el arrodillarse.",
    },
  ],
  munecas: [
    {
      tono: "nota",
      texto:
        "En vez de la palma, apoya los puños o los antebrazos. También sirve poner las manos en una silla en vez del suelo: la muñeca deja de doblarse a noventa grados.",
    },
  ],
  hombros: [
    {
      tono: "nota",
      texto:
        "Los brazos sobre la cabeza sostenidos son lo que más molesta. Bájalos a la altura del pecho y no pierdes nada de la postura.",
    },
  ],
  cuello: [
    {
      tono: "cuidado",
      texto:
        "Nada de peso en la cabeza y nada de dejarla caer hacia atrás. En las posturas de apertura, la nuca sigue la línea de la columna: la mirada va al frente, no al techo.",
    },
  ],
  lumbar: [
    {
      tono: "cuidado",
      texto:
        "Con hernia o protrusión, la flexión de columna con las piernas rectas es lo que más suele molestar. Dobla las rodillas siempre y trabaja la estabilidad antes que el rango. Si el dolor baja por la pierna, consulta antes de seguir.",
    },
  ],
  ciatica: [
    {
      tono: "cuidado",
      texto:
        "Si aparece hormigueo o el dolor baja más abajo de la rodilla, sal de la postura. Eso no es estiramiento, es un nervio irritado.",
    },
  ],
  hipertension: [
    {
      tono: "cuidado",
      texto:
        "Fuera las invertidas, la cabeza sostenida bajo el corazón y la respiración de fuego. La respiración lenta, en cambio, está a tu favor: hay metaanálisis de pranayama y presión arterial.",
    },
  ],
  glaucoma: [
    {
      tono: "cuidado",
      texto:
        "Toda postura con la cabeza bajo el corazón sube la presión dentro del ojo mientras la sostienes. No es una recomendación de trámite: está medido. Nada de vela, pinzas colgadas ni perro mirando hacia abajo.",
    },
  ],
  embarazo: [
    {
      tono: "cuidado",
      texto:
        "Nada boca abajo, nada de torsiones cerradas, nada de abdominales y poco tiempo de espaldas a partir del segundo trimestre. El descanso final se hace de lado izquierdo. Y aunque el cuerpo llegue más lejos por la relaxina, no es el momento de ganar rango nuevo.",
    },
  ],
  menstruacion: [
    {
      tono: "nota",
      texto:
        "Lo de no invertirse durante la menstruación es tradición, no ciencia: no hay evidencia de que haga daño. Decide tú por cómo te sientes. Lo que sí tiene ensayos es que la práctica suave ayuda con los cólicos.",
    },
  ],
  osteoporosis: [
    {
      tono: "cuidado",
      texto:
        "La flexión de columna hacia adelante con carga es el movimiento asociado a fracturas vertebrales en osteoporosis. Nada de pinzas redondeadas ni torsiones forzadas. Extensión suave y fuerza, sí.",
    },
  ],
  vertigo: [
    {
      tono: "nota",
      texto:
        "Cambia de altura despacio y evita bajar y subir la cabeza seguido. Al salir de una postura acostada, siéntate primero y espera unos segundos.",
    },
  ],
  cirugia: [
    {
      tono: "cuidado",
      texto:
        "Mientras no tengas el alta, esto se queda en respiración y descanso. No es prudencia excesiva: la pared abdominal y las cicatrices necesitan tiempo.",
    },
  ],
  hipermovilidad: [
    {
      tono: "cuidado",
      texto:
        "Tu problema no es llegar más lejos: es controlar el rango que ya tienes. No bloquees codos ni rodillas, para antes del tope y trabaja fuerza. Los estiramientos pasivos largos no te convienen.",
    },
  ],
};

/* Cada cuánto, según para qué. Sale de las pautas que usan los propios
   ensayos: es la dosis que se estudió, no una cifra inventada. */
export const CADA_CUANTO: { caso: string; frecuencia: string; fuente: string }[] = [
  {
    caso: "Dolor lumbar crónico",
    frecuencia: "Una a dos clases por semana durante 12 semanas, más práctica en casa",
    fuente: "Formato de los ensayos de yoga para lumbalgia de la biblioteca",
  },
  {
    caso: "Ansiedad y ánimo",
    frecuencia: "Dos a tres veces por semana, 8 a 12 semanas",
    fuente: "Duración típica de los ensayos de yoga y salud mental",
  },
  {
    caso: "Sueño",
    frecuencia: "Práctica corta casi todos los días, de noche; el nidra se puede hacer diario",
    fuente: "Ensayos de yoga nidra e insomnio",
  },
  {
    caso: "Flexibilidad",
    frecuencia: "Tres veces por semana; el rango empieza a notarse a las 4 semanas",
    fuente: "Revisiones de dosis de estiramiento y rango de movimiento",
  },
  {
    caso: "Dolor menstrual",
    frecuencia: "Práctica suave los días de dolor, más práctica regular el resto del ciclo",
    fuente: "Ensayos de yoga y dismenorrea primaria",
  },
  {
    caso: "Equilibrio en personas mayores",
    frecuencia: "Dos a tres veces por semana, sostenido en el tiempo",
    fuente: "Programas de prevención de caídas",
  },
];

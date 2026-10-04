/* Los chakras, como tradición.

   Este archivo se llama «tradicion» y no «ciencia» a propósito: casi todo lo
   que hay acá es un sistema simbólico, no una descripción del cuerpo. No se
   han observado, no se han medido y no corresponden a ningún órgano.

   Eso no los hace menos interesantes —son un mapa de la atención con siglos
   de elaboración— pero sí obliga a escribirlos con cuidado: lo que dice la
   tradición va como tradición, y lo poco que sí está estudiado (la
   respiración lenta, la meditación, el canto) va aparte y con su referencia.

   Dos cosas que se repiten en todos lados y son falsas, y por eso están
   nombradas explícitamente más abajo: que cada chakra corresponde a una
   glándula (es una adición de 1927) y que los colores del arcoíris son
   milenarios (son de 1977). */

export const EN_UNA_LINEA =
  "En la tradición tántrica, los chakras son centros de energía ensartados a lo largo de un canal " +
  "que recorre la columna: puntos donde se concentra la atención durante la práctica. No son " +
  "órganos, no se han observado y no corresponden a ninguna estructura del cuerpo. Son un mapa " +
  "simbólico, y leerlos así es lo que los vuelve útiles.";

export const QUE_SIGNIFICA_LA_PALABRA =
  "Chakra (चक्र) quiere decir «rueda» o «disco» en sánscrito. En los textos se describen como " +
  "flores de loto con un número fijo de pétalos, que giran. Se escribe chakra; en castellano " +
  "también se ve «chacra», pero en el contexto de la tradición se prefiere la primera forma.";

/* ── De dónde vienen de verdad ──────────────────────────────────────────── */

export const HISTORIA = [
  {
    cuando: "Siglos VIII–XII",
    que: "Las primeras listas",
    dice:
      "Aparecen en textos del tantra hindú y budista. No hay un sistema único: según el linaje se " +
      "cuentan cuatro centros, cinco, seis, nueve, doce o treinta y dos. El número siete no es el " +
      "original ni el más común.",
  },
  {
    cuando: "1577",
    que: "El texto que fijó los siete",
    dice:
      "Pūrṇānanda escribe el Ṣaṭ-cakra-nirūpaṇa («descripción de los seis centros»), que describe " +
      "seis chakras más el sahasrāra en la coronilla. De acá sale casi todo lo que hoy se repite: " +
      "los pétalos, las sílabas, los elementos.",
  },
  {
    cuando: "1919",
    que: "La llegada a Occidente",
    dice:
      "John Woodroffe, bajo el seudónimo Arthur Avalon, traduce ese texto en The Serpent Power. Es " +
      "la puerta por la que el sistema entra al mundo de habla inglesa.",
  },
  {
    cuando: "1927",
    que: "Las glándulas, que no estaban",
    dice:
      "Charles Leadbeater, de la Sociedad Teosófica, publica The Chakras y hace dos cosas nuevas: " +
      "los asocia a glándulas del sistema endocrino y los convierte en categorías psicológicas. " +
      "Ninguna de las dos está en los textos originales.",
  },
  {
    cuando: "1977",
    que: "Los colores del arcoíris",
    dice:
      "Christopher Hills, en Nuclear Evolution, ordena los siete centros con los colores del " +
      "espectro: rojo abajo, violeta arriba. Es el esquema que hoy se ve en todas partes y tiene " +
      "menos de cincuenta años. En los textos clásicos los colores son otros.",
  },
];

/* ── Los siete ──────────────────────────────────────────────────────────── */

export type Chakra = {
  id: string;
  nombre: string;
  sanscrito: string;
  significado: string;
  donde: string;
  petalos: string;
  elemento: string;
  bija: string;
  colorClasico: string;
  colorModerno: string;
  /** El color con que se dibuja en el esquema (el del sistema moderno). */
  tono: string;
  /** Lo que la tradición le atribuye. Nunca se afirma como hecho. */
  seLeAtribuye: string;
  /** Cómo se nota el tema en la vida de todos los días, en lenguaje llano. */
  enLaPractica: string;
  /** Lo que se dice que pasa cuando «está cerrado». Tradición, no diagnóstico. */
  cuandoCuesta: string;
};

export const CHAKRAS: Chakra[] = [
  {
    id: "muladhara",
    nombre: "Raíz",
    sanscrito: "Mūlādhāra",
    significado: "«soporte de la raíz»",
    donde: "La base de la columna, en el perineo",
    petalos: "4 pétalos",
    elemento: "Tierra (pṛthvī)",
    bija: "LAM",
    colorClasico: "Pétalos carmesí, con un cuadrado amarillo en el centro",
    colorModerno: "Rojo",
    tono: "#b03a2e",
    seLeAtribuye:
      "La supervivencia, el arraigo y la relación con el cuerpo físico: tener dónde pararse, techo, " +
      "comida, pertenencia. Es el centro que la tradición asocia al miedo más básico.",
    enLaPractica:
      "El tema de fondo es la seguridad. Lo que en el día a día se siente como «¿voy a estar bien?»: " +
      "la plata, la casa, la salud, el suelo que una pisa.",
    cuandoCuesta:
      "Se le atribuye miedo difuso, desconfianza, sensación de no tener dónde apoyarse, o el otro " +
      "extremo: acumular y aferrarse.",
  },
  {
    id: "svadhisthana",
    nombre: "Sacro",
    sanscrito: "Svādhiṣṭhāna",
    significado: "«su propia morada»",
    donde: "Bajo el ombligo, a la altura del hueso sacro",
    petalos: "6 pétalos",
    elemento: "Agua (ap)",
    bija: "VAM",
    colorClasico: "Pétalos bermellón, con una luna creciente blanca",
    colorModerno: "Naranjo",
    tono: "#c9742e",
    seLeAtribuye:
      "El deseo, el placer, la sexualidad y la creatividad: todo lo que fluye y cambia. La tradición " +
      "lo liga al agua justamente por eso, por el movimiento.",
    enLaPractica:
      "El tema es el goce y la capacidad de dejarse llevar. Lo que se siente como ganas, apetito, " +
      "juego, atracción.",
    cuandoCuesta:
      "Se le atribuye culpa con el placer, rigidez, o el extremo contrario: buscar la emoción fuerte " +
      "sin pausa.",
  },
  {
    id: "manipura",
    nombre: "Plexo solar",
    sanscrito: "Maṇipūra",
    significado: "«ciudad de joyas»",
    donde: "A la altura del ombligo, bajo el esternón",
    petalos: "10 pétalos",
    elemento: "Fuego (agni)",
    bija: "RAM",
    colorClasico: "Pétalos azules, con un triángulo rojo invertido",
    colorModerno: "Amarillo",
    tono: "#c8a050",
    seLeAtribuye:
      "La voluntad, el poder propio y la transformación: lo que una decide hacer con lo que tiene. " +
      "Por el elemento fuego se le asocia también la digestión, entendida como «cocer» lo que entra.",
    enLaPractica:
      "El tema es la fuerza para sostener una decisión. Lo que se siente como determinación, " +
      "iniciativa, o como la guata apretada antes de algo importante.",
    cuandoCuesta:
      "Se le atribuye desgano, dificultad para decir que no, dejar que otros decidan; o el extremo: " +
      "controlarlo todo y la rabia a flor de piel.",
  },
  {
    id: "anahata",
    nombre: "Corazón",
    sanscrito: "Anāhata",
    significado: "«no golpeado» — el sonido que suena sin que nada lo produzca",
    donde: "En el centro del pecho, no sobre el corazón físico",
    petalos: "12 pétalos",
    elemento: "Aire (vāyu)",
    bija: "YAM",
    colorClasico: "Pétalos rojo intenso, con una estrella de seis puntas color humo",
    colorModerno: "Verde",
    tono: "#5a7a3a",
    seLeAtribuye:
      "El amor, la compasión y el vínculo: la bisagra del sistema, donde lo de abajo (cuerpo, deseo, " +
      "voluntad) se encuentra con lo de arriba (palabra, visión, conciencia).",
    enLaPractica:
      "El tema es la capacidad de querer y de dejarse querer. Lo que se siente como ternura, " +
      "gratitud, o como el peso en el pecho cuando hay pena.",
    cuandoCuesta:
      "Se le atribuye dureza, aislamiento, duelo que no termina de pasar; o el extremo: dar hasta " +
      "quedarse sin nada.",
  },
  {
    id: "vishuddha",
    nombre: "Garganta",
    sanscrito: "Viśuddha",
    significado: "«purísimo»",
    donde: "En la garganta, a la altura de la laringe",
    petalos: "16 pétalos",
    elemento: "Espacio o éter (ākāśa)",
    bija: "HAM",
    colorClasico: "Pétalos color humo o púrpura, con un círculo blanco",
    colorModerno: "Celeste",
    tono: "#4a7c8c",
    seLeAtribuye:
      "La expresión y la escucha: poder decir lo que es, y poder oír. No solo hablar — también el " +
      "silencio elegido y el canto.",
    enLaPractica:
      "El tema es la verdad dicha. Lo que se siente como el nudo en la garganta cuando algo no se " +
      "dice, o el alivio cuando por fin se dijo.",
    cuandoCuesta:
      "Se le atribuye callar lo que importa, hablar de más para no decir nada, o la voz que se " +
      "achica frente a ciertas personas.",
  },
  {
    id: "ajna",
    nombre: "Entrecejo",
    sanscrito: "Ājñā",
    significado: "«orden», «mando»",
    donde: "Entre las cejas, hacia adentro",
    petalos: "2 pétalos",
    elemento: "Ninguno: acá la tradición dice que se termina lo elemental",
    bija: "OM",
    colorClasico: "Pétalos blancos",
    colorModerno: "Índigo",
    tono: "#4a4a8c",
    seLeAtribuye:
      "El discernimiento y la visión interior: distinguir lo que es de lo que una quisiera que fuera. " +
      "Es el famoso «tercer ojo», que en los textos es mucho menos esotérico de lo que suena: es " +
      "ver con claridad.",
    enLaPractica:
      "El tema es la lucidez. Lo que se siente como intuición, como «ya sabía», o como la cabeza " +
      "demasiado llena para ver nada.",
    cuandoCuesta:
      "Se le atribuye confusión, rumiar sin llegar a ninguna parte, o el extremo: vivir en la cabeza " +
      "y desconectarse del cuerpo.",
  },
  {
    id: "sahasrara",
    nombre: "Corona",
    sanscrito: "Sahasrāra",
    significado: "«de mil pétalos»",
    donde: "En la coronilla, o apenas por encima de la cabeza",
    petalos: "1000 pétalos",
    elemento: "Ninguno: está más allá de los elementos",
    bija: "No tiene sílaba: la tradición lo pone más allá del sonido",
    colorClasico: "Luminoso, descrito como luz blanca",
    colorModerno: "Violeta o blanco",
    tono: "#7a4a8a",
    seLeAtribuye:
      "La conciencia y la unión: en la tradición no es un centro más de la lista, es el punto de " +
      "llegada. Por eso el texto clásico se llama «de los seis centros» y no de los siete.",
    enLaPractica:
      "El tema es la sensación de formar parte de algo más grande. Lo que aparece en momentos de " +
      "quietud, en la naturaleza, o cuando el yo pesa menos.",
    cuandoCuesta:
      "Se le atribuye sensación de sinsentido o de desconexión; o el extremo: desentenderse de la " +
      "vida concreta en nombre de lo espiritual.",
  },
];

/* ── El canal y la serpiente ────────────────────────────────────────────── */

export const EL_CANAL =
  "Los chakras no flotan sueltos: la tradición los describe ensartados en suṣumṇā, un canal que " +
  "sube por el eje de la columna. A los lados corren otros dos, iḍā y piṅgalā, que se cruzan entre " +
  "centro y centro. La energía que sube por ahí se llama kuṇḍalinī y se representa como una " +
  "serpiente enroscada en la base, dormida. Toda la práctica clásica apunta a lo mismo: que " +
  "despierte y suba hasta la coronilla.";

export const NADIS = [
  { nombre: "Suṣumṇā", donde: "El eje, por el centro de la columna", que: "El canal principal, donde están ensartados los chakras." },
  { nombre: "Iḍā", donde: "A la izquierda", que: "Se asocia a lo lunar, lo fresco, lo receptivo." },
  { nombre: "Piṅgalā", donde: "A la derecha", que: "Se asocia a lo solar, lo cálido, lo activo." },
];

/* ── Lo que no es ───────────────────────────────────────────────────────── */

export const MITOS = [
  {
    dice: "Cada chakra corresponde a una glándula",
    realidad:
      "Esa correspondencia la inventó Leadbeater en 1927 y no está en ningún texto anterior. No hay " +
      "base anatómica: la tiroides no tiene nada que ver con viśuddha más allá de estar cerca.",
  },
  {
    dice: "Los colores son rojo, naranjo, amarillo, verde, celeste, índigo y violeta",
    realidad:
      "Ese orden es de 1977 (Christopher Hills). En el texto clásico de 1577 los colores son otros: " +
      "maṇipūra tiene pétalos azules, no amarillos, y ājñā los tiene blancos, no índigo.",
  },
  {
    dice: "Se pueden medir, fotografiar o leer",
    realidad:
      "No. No existe ninguna medición reproducible de un campo energético corporal, ni instrumento " +
      "que detecte un chakra. Quien dice leértelos está interpretando, no midiendo.",
  },
  {
    dice: "Desbloquear un chakra cura enfermedades",
    realidad:
      "No hay evidencia de eso y creerlo puede ser peligroso, porque retrasa tratamientos que sí " +
      "funcionan. Un síntoma físico se consulta con tu médica, no con un mapa simbólico.",
  },
  {
    dice: "Son siete desde siempre",
    realidad:
      "No. Según el linaje y la época se cuentan cuatro, cinco, seis, nueve, doce o más. Los siete " +
      "se volvieron el estándar recién con la difusión occidental del siglo XX.",
  },
];

/* ── Lo que sí está estudiado ───────────────────────────────────────────── */

export const LO_QUE_SI = [
  {
    tema: "La respiración lenta",
    grado: "Bien respaldado" as const,
    dice:
      "Respirar alrededor de seis veces por minuto —que es el ritmo al que terminan muchas prácticas " +
      "de visualización por centros— aumenta la variabilidad del ritmo cardíaco y baja la activación " +
      "del sistema de alerta.",
    matiz:
      "El efecto es de la respiración, no del chakra: se obtiene igual contando la exhalación, sin " +
      "ninguna visualización de por medio.",
    fuente: "Zaccaro et al., 2018, Frontiers in Human Neuroscience · Lehrer y Gevirtz, 2014",
  },
  {
    tema: "Meditar con un foco",
    grado: "Bien respaldado" as const,
    dice:
      "Los programas de meditación de ocho semanas muestran efectos moderados sobre ansiedad, " +
      "síntomas depresivos y dolor. Poner la atención en un punto del cuerpo es una técnica de foco " +
      "válida, como cualquier otra.",
    matiz:
      "Lo que está probado es el acto de sostener la atención, no el mapa que se use para hacerlo. " +
      "La vela, la respiración o un centro del pecho funcionan parecido.",
    fuente: "Goyal et al., 2014, JAMA Internal Medicine",
  },
  {
    tema: "Cantar las sílabas",
    grado: "Prometedor" as const,
    dice:
      "Cantar un sonido sostenido alarga mucho la exhalación y vibra en el pecho y la cara. Eso " +
      "explica buena parte de la sensación de calma que deja, sin necesidad de invocar nada más.",
    matiz:
      "Los estudios son pequeños y de corta duración. Que calme en el momento está bastante claro; " +
      "lo demás, no.",
    fuente: "Zaccaro et al., 2018 · revisiones sobre canto y exhalación prolongada",
  },
  {
    tema: "Que exista la energía que suben",
    grado: "No hay evidencia" as const,
    dice:
      "No se ha observado la kuṇḍalinī, ni los canales, ni los centros. No es que esté «aún por " +
      "demostrar»: es que no hay nada medible que buscar.",
    matiz:
      "Eso no obliga a descartar la práctica. Obliga a no venderla como fisiología.",
    fuente: "No hay literatura que lo sostenga",
  },
];

/* ── Cómo usarlo sin mentir ─────────────────────────────────────────────── */

export const COMO_USARLO =
  "Hay una manera honesta de usar este mapa, y es tratarlo como lo que es: un vocabulario del " +
  "cuerpo. El nudo en la garganta cuando algo no se dice existe de verdad. El peso en el pecho " +
  "cuando hay pena, también. La guata apretada antes de una decisión difícil, también. Los chakras " +
  "le ponen nombre y orden a sensaciones que una ya tiene, y tener un nombre ayuda a notarlas " +
  "antes. Eso es suficiente: no hace falta que sean órganos para que servir de mapa.";

export const CUIDADO =
  "Las prácticas intensivas de concentración —retiros largos, trabajo fuerte con kuṇḍalinī— pueden " +
  "desestabilizar. Está documentado: hay quienes reportan ansiedad, despersonalización o " +
  "reaparición de material difícil. Si hay historia de psicosis, trauma o disociación, esto se " +
  "conversa antes con tu terapeuta, no después. Y cualquier síntoma físico se consulta con tu " +
  "médica: un mapa simbólico no diagnostica nada.";

export const FUENTE_CUIDADO =
  "Lindahl et al., 2017, PLoS ONE — «The varieties of contemplative experience»";

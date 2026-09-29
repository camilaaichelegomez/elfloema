import { ETIQUETA_GRADO, type Grado } from "@/lib/yoga/evidencia";

/* Meditación: la teoría completa, cómo se hace y qué está probado.

   Esta sección es sobre todo un texto, y eso es a propósito. Las otras tres
   partes de Florecer son cosas que se hacen; esta es la que explica. Quien
   entra a meditar sin saber qué está haciendo aguanta tres días: casi siempre
   porque cree que tiene que dejar la mente en blanco, no lo logra, y concluye
   que no sirve para esto.

   Reglas de la casa, las mismas del Ritual de yoga:

   · Cada afirmación de que algo funciona lleva grado y referencia real.
   · Lo que viene de la tradición se nombra como tradición, no como ciencia.
   · Lo que la meditación NO hace también está escrito, y los riesgos también.
     Esa es la parte que casi ninguna app pone y la que más falta hace.

   Las referencias con carpeta están descargadas en
   biblioteca-cientifica/yoga/<carpeta>. */

export { ETIQUETA_GRADO };
export type { Grado };

/* ── Qué es, en realidad ──────────────────────────────────── */

export const QUE_ES = [
  "Meditar es entrenar la atención. Nada más que eso, y nada menos. Eliges algo a lo que atender —la respiración, las sensaciones del cuerpo, un sonido—, te das cuenta cuando la cabeza se fue a otra parte, y vuelves. Ese volver es el ejercicio. No es lo que interrumpe la meditación: es la meditación.",
  "Por eso la frase «no puedo meditar porque pienso mucho» es como decir «no puedo ir al gimnasio porque las pesas pesan». El peso es el punto. Una sesión en la que te distrajiste cuarenta veces y volviste cuarenta veces es una sesión buena, no una fracasada.",
  "La investigación describe la práctica en tres partes que se entrenan juntas: regular la atención, darse cuenta de lo que pasa en el cuerpo, y cambiar la relación con lo que se siente y se piensa. Ese último es el cambio grande: no dejas de tener pensamientos molestos, dejas de creerles automáticamente.",
  "Y hay dos formas básicas de hacerlo, que la literatura llama atención focalizada y monitoreo abierto. En la primera eliges un solo objeto y vuelves a él; en la segunda dejas de elegir y observas lo que va apareciendo. Casi todas las técnicas que existen son una de las dos, una mezcla, o una de las dos con algo encima —una frase, un sonido, un recorrido por el cuerpo.",
];

export const EN_UNA_LINEA =
  "Eliges algo a lo que atender, te distraes, te das cuenta y vuelves. Eso es todo. Lo demás son variantes.";

/* ── De dónde viene ───────────────────────────────────────── */

export type Hito = { epoca: string; que: string };

export const DE_DONDE_VIENE: Hito[] = [
  {
    epoca: "Hace unos 2.500 o 3.000 años, en la India",
    que: "Las primeras descripciones escritas de prácticas de concentración y absorción aparecen en los Upanishads. La palabra que se usa es dhyāna, que en chino se volvió chán y en japonés zen: es la misma palabra viajando.",
  },
  {
    epoca: "El budismo temprano",
    que: "Se sistematizan dos vías que siguen siendo las mismas de hoy: samatha, calmar y unificar la mente en un objeto, y vipassanā, observar con claridad lo que aparece. De ahí viene la atención a la respiración, y de ahí viene el mindfulness moderno.",
  },
  {
    epoca: "Los Yoga Sutras de Patanjali",
    que: "Ordenan la práctica en ocho ramas. Las posturas (āsana) son la tercera: la parte del yoga que hoy llena las salas era, en ese texto, un paso preparatorio. La sexta es dhāraṇā (concentrarse), la séptima dhyāna (meditar) y la octava samādhi. La meditación no es un accesorio del yoga: es a lo que apuntaba.",
  },
  {
    epoca: "No es de una sola religión",
    que: "Hay prácticas contemplativas con estructura parecida en el cristianismo (la oración del corazón, la lectio divina), en el islam (el dhikr, repetir un nombre), en el judaísmo cabalístico y en tradiciones de todo el mundo. Sentarse a atender una sola cosa es algo que a los humanos se les ocurrió muchas veces por separado.",
  },
  {
    epoca: "1975, Boston",
    que: "El cardiólogo Herbert Benson describe la «respuesta de relajación»: un patrón fisiológico opuesto al de estrés —baja la frecuencia cardíaca, el consumo de oxígeno, la tensión— que aparece con prácticas de atención y de respiración lenta, sin importar la tradición. Fue el primer puente serio entre esto y un hospital.",
  },
  {
    epoca: "1979, Universidad de Massachusetts",
    que: "Jon Kabat-Zinn arma un programa de ocho semanas para pacientes con dolor crónico a los que la medicina ya no tenía qué ofrecer: el MBSR. Le saca el vocabulario budista, lo deja en instrucciones, y lo mide. Casi toda la investigación que existe hoy cuelga de ese formato de ocho semanas.",
  },
  {
    epoca: "2000 en adelante",
    que: "Sobre el MBSR se construye la MBCT para prevenir recaídas de depresión, y la meditación entra a guías clínicas. Al mismo tiempo empieza la exageración: miles de estudios de baja calidad, promesas de que cura todo, y una industria de apps. Las dos cosas son ciertas a la vez y en esta página están las dos.",
  },
];

/* ── Cómo se hace ─────────────────────────────────────────── */

export type Detalle = { parte: string; como: string; porQue: string };

export const POSTURA: Detalle[] = [
  {
    parte: "Dónde",
    como: "En una silla, con los pies en el suelo y la espalda apoyada si hace falta. O en el suelo sobre un cojín firme, con las caderas más altas que las rodillas.",
    porQue: "Sentarse en el suelo con las caderas al nivel de las rodillas tira de la pelvis hacia atrás y redondea la espalda baja: a los diez minutos duele y se termina la sesión. La silla no es la versión fácil, es una silla.",
  },
  {
    parte: "La espalda",
    como: "Larga, no rígida. Imagina que la coronilla sube y los hombros bajan. Que se aguante sola sin que tengas que apretar nada.",
    porQue: "El cuerpo derecho y despierto sostiene la atención; el cuerpo desplomado invita al sueño. Pero una espalda tensa cansa y se vuelve el tema de la sesión.",
  },
  {
    parte: "Las manos",
    como: "En los muslos, o una sobre otra en el regazo. Lo que no pida esfuerzo.",
    porQue: "Da igual el gesto que hagas con los dedos. Los mudras vienen de la tradición y no hay evidencia de que cambien nada medible; si te gustan, úsalos porque te gustan.",
  },
  {
    parte: "Los ojos",
    como: "Cerrados, o entreabiertos mirando el suelo a un metro sin enfocar nada.",
    porQue: "Cerrados hay menos distracción y más sueño. Entreabiertos es al revés, y es lo que conviene si te da somnolencia, si te marea cerrar los ojos o si cerrarlos te pone ansiosa.",
  },
  {
    parte: "La mandíbula y la lengua",
    como: "Suelta la mandíbula; deja los dientes sin tocarse y la lengua descansando abajo.",
    porQue: "Es donde casi todo el mundo guarda tensión sin notarlo. Soltarla ahí suele soltar los hombros de paso.",
  },
  {
    parte: "La respiración",
    como: "Que respire sola. No la alargues ni la cuentes salvo que la técnica lo pida.",
    porQue: "En la mayoría de las técnicas la respiración es el objeto que observas, no algo que controlas. Controlarla es otra práctica —pranayama— y tiene su propio lugar en el Ritual de yoga.",
  },
  {
    parte: "Acostada",
    como: "Sirve para el recorrido del cuerpo y para el yoga nidra. Para lo demás, solo si no te vas a dormir.",
    porQue: "Acostada el cuerpo tiene aprendido que lo que viene es dormir. No es trampa: es que estarías practicando dormirte, que es otra cosa útil pero distinta.",
  },
];

export const LOS_CINCO_PASOS = [
  "Elige cuánto rato y ponlo en un temporizador. Sin reloj, media sesión se va en calcular cuánto falta.",
  "Siéntate como dice arriba y date tres respiraciones largas para llegar. Al salir el aire, suelta los hombros.",
  "Lleva la atención a lo que hayas elegido —lo más común: el aire entrando y saliendo por la nariz, o el vientre que sube y baja.",
  "Cuando notes que te fuiste —y te vas a ir, muchas veces—, nota adónde te fuiste, sin retarte, y vuelve. Esa es la repetición del ejercicio.",
  "Al final, no te pares de un salto. Nota cómo estás, abre los ojos y entra al día. Eso de unos segundos es lo que hace que lo de la sesión se pegue a lo que sigue.",
];

export const LO_QUE_NADIE_TE_DICE = [
  "La sesión no tiene que sentirse bien para servir. Una sesión inquieta y aburrida cuenta igual que una sesión tranquila; son repeticiones las dos.",
  "No vas a «lograr» nada dentro de la sesión. El cambio se nota afuera: en el segundo que aparece entre algo que te molesta y tu reacción.",
  "Al principio casi todo el mundo se siente peor antes que mejor, porque sentarse en silencio hace visible cuánto ruido había. Eso pasa.",
  "Diez minutos todos los días valen más que una hora el domingo. Es lo mismo que con el yoga y con cualquier otra cosa que se entrene.",
  "Y no necesitas creer en nada. Ni en chakras, ni en energías, ni en el budismo. Es un ejercicio de atención.",
];

/* ── Las técnicas ─────────────────────────────────────────── */

export type Familia = "focalizada" | "abierta" | "cultivo" | "cuerpo" | "movimiento";

export const NOMBRE_FAMILIA: Record<Familia, string> = {
  focalizada: "Atención focalizada",
  abierta: "Atención abierta",
  cultivo: "Cultivo de una actitud",
  cuerpo: "Atención al cuerpo",
  movimiento: "En movimiento",
};

export type Tecnica = {
  id: string;
  nombre: string;
  tambien?: string;
  familia: Familia;
  /** Para quién es, en una línea. Es lo que se lee en la tarjeta. */
  linea: string;
  queEs: string;
  pasos: string[];
  paraQue: string;
  minutos: number[];
  /** El pero honesto de esta técnica. */
  ojo?: string;
  /** Guía que aparece (y se dice, si quieres voz) durante la práctica.
      `en` es la fracción de la sesión: 0 al empezar, 1 al terminar. */
  guia: { en: number; texto: string }[];
};

export const TECNICAS: Tecnica[] = [
  {
    id: "conteo",
    nombre: "Contar respiraciones",
    tambien: "La puerta de entrada",
    familia: "focalizada",
    linea: "Si nunca has meditado, empieza acá.",
    queEs:
      "Atención focalizada con una ayuda: contar. El número te dice de inmediato si te fuiste, porque cuando volvés no sabés en cuál ibas. Es la versión más fácil de notar que la mente se fue, y por eso es la primera.",
    pasos: [
      "Al salir el aire, cuenta «uno». A la siguiente exhalación, «dos». Así hasta diez.",
      "Al llegar a diez, vuelve a uno.",
      "Si te pierdes o llegas a quince sin darte cuenta, no pasa nada: vuelve a uno. Perderse es parte del ejercicio.",
      "No alargues la respiración para contar mejor. El aire va a su ritmo; el número solo acompaña.",
    ],
    paraQue:
      "Aprender a notar la distracción, que es la habilidad de la que dependen todas las demás técnicas. También sirve como ancla en un día muy revuelto, cuando la respiración sola se hace demasiado sutil.",
    minutos: [3, 5, 10],
    ojo: "Contar ocupa un poco de la cabeza, y eso es justamente lo que la hace fácil. Cuando ya no necesites el número, suéltalo y pasa a la siguiente.",
    guia: [
      { en: 0, texto: "Siéntate con la espalda larga y los hombros sueltos. Tres respiraciones largas para llegar." },
      { en: 0.08, texto: "Ahora deja que el aire vaya solo. Al salir el aire, cuenta uno. A la siguiente, dos. Hasta diez." },
      { en: 0.25, texto: "Si ya te perdiste en el número, está bien. Vuelve a uno. Perderse y volver es el ejercicio." },
      { en: 0.45, texto: "No alargues la respiración para contar. El aire manda; el número acompaña." },
      { en: 0.65, texto: "Nota dónde se siente el aire: en la nariz, en el pecho, en el vientre. Sigue contando ahí." },
      { en: 0.85, texto: "Últimos minutos. Cada vez que vuelves, la práctica cuenta una repetición más." },
      { en: 0.97, texto: "Suelta el número. Quédate un momento sin hacer nada." },
    ],
  },
  {
    id: "respiracion",
    nombre: "Atención a la respiración",
    tambien: "ānāpānasati, samatha",
    familia: "focalizada",
    linea: "La práctica de siempre. La que está en casi todos los estudios.",
    queEs:
      "La misma cosa sin el número: el aire entrando y saliendo es lo único a lo que atiendes. Es la técnica más antigua documentada y la que forma el esqueleto del MBSR, que es el formato con el que se hizo la mayor parte de la investigación.",
    pasos: [
      "Encuentra el lugar donde sientes la respiración con más claridad: las fosas nasales, la garganta, el pecho o el vientre. Quédate ahí toda la sesión.",
      "Atiende a la sensación, no a la idea de respirar. Fresco al entrar, tibio al salir. El vientre que se llena y se vacía.",
      "Cuando notes que te fuiste, nota adónde —un plan, un recuerdo, una molestia— y vuelve al mismo lugar.",
      "No corrijas la respiración. Si es corta, es corta. Observar algo lo cambia solo, y eso está bien.",
    ],
    paraQue:
      "Es la práctica base para calma, para atención sostenida y para todo lo demás: las técnicas más difíciles asumen que esta ya se sostiene.",
    minutos: [5, 10, 15, 20],
    guia: [
      { en: 0, texto: "Espalda larga, hombros sueltos, mandíbula suelta. Tres respiraciones largas para llegar." },
      { en: 0.08, texto: "Busca el lugar donde sientes la respiración con más claridad. La nariz, el pecho o el vientre. Quédate ahí." },
      { en: 0.2, texto: "Sensación, no idea. Fresco al entrar, tibio al salir." },
      { en: 0.38, texto: "Si te fuiste, nota adónde te fuiste, sin retarte, y vuelve al mismo lugar." },
      { en: 0.55, texto: "No corrijas la respiración. Si es corta, es corta. Solo la acompañas." },
      { en: 0.72, texto: "Cada vuelta cuenta. No hay una cantidad correcta de distracciones." },
      { en: 0.9, texto: "Quédate con las últimas respiraciones tal como vengan." },
      { en: 0.97, texto: "Nota cómo estás ahora, sin decidir si estuvo bien o mal." },
    ],
  },
  {
    id: "cuerpo",
    nombre: "Recorrido del cuerpo",
    tambien: "body scan, del MBSR",
    familia: "cuerpo",
    linea: "Para cuando la cabeza no para y el cuerpo está apretado.",
    queEs:
      "Pasear la atención por el cuerpo, parte por parte, notando lo que hay sin arreglar nada. Es la práctica central de las primeras semanas del MBSR, y la que más se usa para dolor crónico.",
    pasos: [
      "Acostada o sentada. Empieza por los dedos de un pie y sube despacio: pie, tobillo, pantorrilla, rodilla, muslo. Luego la otra pierna.",
      "Después pelvis, vientre, espalda baja, pecho, espalda alta, manos, brazos, hombros, cuello, cara, cráneo.",
      "En cada parte: ¿qué hay? Calor, frío, peso, hormigueo, presión, nada. «Nada» también es una respuesta válida.",
      "No busques relajarte y no corrijas la postura. Si hay dolor, no lo evites ni te clavés en él: nótalo y sigue el recorrido.",
    ],
    paraQue:
      "Recuperar la conciencia del cuerpo, que es una de las tres cosas que la investigación describe como el mecanismo de todo esto. Es también la técnica que mejor funciona para dormirse, aunque no sea su propósito.",
    minutos: [10, 15, 20],
    ojo:
      "Si tienes una historia de trauma o una relación difícil con tu cuerpo, esta técnica puede remover más de lo esperado. Empieza corta, con los ojos abiertos, y salta las zonas que se sientan demasiado.",
    guia: [
      { en: 0, texto: "Acuéstate o siéntate cómoda. Tres respiraciones largas, y deja que el cuerpo pese." },
      { en: 0.07, texto: "Lleva la atención a los dedos del pie izquierdo. Nota lo que haya. Si no hay nada, nada también es una respuesta." },
      { en: 0.17, texto: "Sube: tobillo, pantorrilla, rodilla, muslo izquierdo. Despacio." },
      { en: 0.29, texto: "Ahora el pie derecho, y sube por la pierna derecha igual de despacio." },
      { en: 0.42, texto: "Pelvis, vientre, espalda baja. Nota el peso del cuerpo donde te apoyas." },
      { en: 0.54, texto: "Pecho y espalda alta. Deja que respiren sin ayudarlas." },
      { en: 0.65, texto: "Manos, brazos, hombros. Suelta los hombros al salir el aire." },
      { en: 0.76, texto: "Cuello, mandíbula, alrededor de los ojos, frente. Ahí se guarda casi toda la tensión." },
      { en: 0.87, texto: "Ahora el cuerpo entero a la vez, como una sola sensación." },
      { en: 0.97, texto: "Quédate así un momento antes de moverte." },
    ],
  },
  {
    id: "abierta",
    nombre: "Atención abierta",
    tambien: "vipassanā, monitoreo abierto",
    familia: "abierta",
    linea: "Cuando ya sostienes la respiración diez minutos.",
    queEs:
      "Dejas de elegir un objeto. Te quedas atenta a lo que aparezca —un sonido, un picor, un pensamiento, una emoción— y lo dejas pasar sin seguirlo. Lo que se entrena acá es la parte que de verdad cambia las cosas: ver un pensamiento como un pensamiento y no como un hecho.",
    pasos: [
      "Empieza con dos o tres minutos de respiración para asentarte.",
      "Después abre la atención: que entre lo que entre. No busques nada.",
      "Cuando algo aparezca, nómbralo en una palabra y suéltalo. «Sonido». «Plan». «Rabia». «Dolor de rodilla».",
      "Si algo te arrastra y te das cuenta tres minutos después, vuelve a la respiración un rato y abre otra vez.",
    ],
    paraQue:
      "Cambiar la relación con lo que pasa por la cabeza. Es la base de la MBCT, el programa que se usa para prevenir recaídas de depresión: sirve para no engancharse con el rumiar.",
    minutos: [10, 15, 20],
    ojo:
      "Sin una base de atención focalizada, esto es simplemente quedarse pensando con los ojos cerrados. Si aún te cuesta estar cinco minutos con la respiración, vuelve a la de arriba: no es un paso que se pueda saltar.",
    guia: [
      { en: 0, texto: "Espalda larga. Empieza con la respiración, solo para asentarte." },
      { en: 0.15, texto: "Ahora abre la atención. Que entre lo que entre. No busques nada en particular." },
      { en: 0.3, texto: "Cuando algo aparezca, ponle una palabra y suéltalo. Sonido. Plan. Molestia." },
      { en: 0.45, texto: "Los pensamientos son eventos, no órdenes ni verdades. Los ves llegar y los ves irse." },
      { en: 0.6, texto: "Si algo te arrastró, vuelve a la respiración un momento y abre otra vez." },
      { en: 0.78, texto: "Nota que hay algo que observa y no cambia con lo observado." },
      { en: 0.93, texto: "Deja que se cierre solo. Vuelve a la respiración." },
    ],
  },
  {
    id: "bondad",
    nombre: "Práctica de la bondad",
    tambien: "mettā, loving-kindness",
    familia: "cultivo",
    linea: "Para los días de rabia, culpa o dureza con una misma.",
    queEs:
      "En vez de observar, se cultiva: se repiten unas frases de buena voluntad dirigidas a alguien, empezando por quien te resulte fácil y ampliando desde ahí. Es la técnica con más evidencia sobre emociones positivas y trato con los demás, y también la que más incomoda al principio.",
    pasos: [
      "Empieza por alguien a quien quieras sin complicación: una amiga, un hijo, un animal. Tráelo a la mente.",
      "Repite despacio, al ritmo de la respiración: «que estés bien, que estés en paz, que estés sin dolor».",
      "Amplía: alguien neutro (la persona del almacén), después alguien con quien estés incómoda, y al final tú.",
      "Si no sientes nada, no fuerces el sentimiento. La práctica es la intención de las frases, no la emoción.",
    ],
    paraQue:
      "Emociones positivas, trato menos duro consigo misma y con los demás. En los días en que la atención a la respiración se hace intolerable porque hay demasiada rabia, esta suele entrar mejor.",
    minutos: [5, 10, 15],
    ojo:
      "A mucha gente le resulta insoportable dirigirse las frases a sí misma, y eso es información, no un fracaso. Déjate para el final, o para otro mes.",
    guia: [
      { en: 0, texto: "Siéntate cómoda. Una mano en el pecho si te ayuda. Tres respiraciones largas." },
      { en: 0.08, texto: "Trae a la mente a alguien a quien quieras sin complicación. Que esté ahí, delante." },
      { en: 0.18, texto: "Repite despacio: que estés bien, que estés en paz, que estés sin dolor." },
      { en: 0.35, texto: "Ahora alguien neutro. Alguien que ves y no conoces. Las mismas frases." },
      { en: 0.52, texto: "Ahora alguien con quien estés incómoda. Sin forzar nada: solo las frases." },
      { en: 0.7, texto: "Ahora tú. Que esté bien, que esté en paz, que esté sin dolor." },
      { en: 0.85, texto: "Si no sientes nada, da igual. La práctica es la intención, no la emoción." },
      { en: 0.96, texto: "Deja las frases y quédate con lo que quedó." },
    ],
  },
  {
    id: "mantra",
    nombre: "Repetir un sonido",
    tambien: "japa, mantra",
    familia: "focalizada",
    linea: "Si la respiración te pone ansiosa o te aburre.",
    queEs:
      "Atención focalizada con un sonido en lugar del aire: una palabra o sílaba que se repite mentalmente. Puede ser tradicional (om, so-ham) o cualquier palabra neutra —Benson usaba «uno» a propósito, para mostrar que el contenido no importaba.",
    pasos: [
      "Elige una palabra corta y neutra, o una sílaba tradicional si te acomoda.",
      "Repítela mentalmente, sin voz, a un ritmo tranquilo. No tiene que ir con la respiración.",
      "Cuando notes que la soltaste, vuelve a repetirla. No busques que suene «bien».",
      "Si la palabra se apaga sola y queda silencio atento, deja que quede así: es lo que se busca.",
    ],
    paraQue:
      "Calma y concentración, en gente a la que atender a la respiración le resulta angustiante —pasa, sobre todo con ansiedad o con historia de asma o pánico. Acá el objeto no está dentro del cuerpo.",
    minutos: [5, 10, 15, 20],
    ojo:
      "Lo que se vende como meditación trascendental es esta técnica con un mantra asignado y un curso pagado. La evidencia no muestra que un mantra secreto funcione mejor que la palabra «uno».",
    guia: [
      { en: 0, texto: "Siéntate con la espalda larga. Tres respiraciones largas para llegar." },
      { en: 0.08, texto: "Elige la palabra. Corta y neutra. Empieza a repetirla por dentro, sin voz." },
      { en: 0.22, texto: "A un ritmo tranquilo. No tiene que ir con la respiración." },
      { en: 0.4, texto: "Cuando notes que la soltaste, vuelve a ella. Sin reproche." },
      { en: 0.58, texto: "Si la palabra se hace más tenue, déjala. No la fuerces para que suene fuerte." },
      { en: 0.75, texto: "Si queda silencio atento y la palabra desapareció, quédate en el silencio." },
      { en: 0.93, texto: "Suelta la palabra del todo y quédate un momento." },
    ],
  },
  {
    id: "nidra",
    nombre: "Yoga nidra",
    tambien: "el sueño yóguico",
    familia: "cuerpo",
    linea: "Acostada, para descansar de verdad y para dormir mejor.",
    queEs:
      "Una rotación de la conciencia por el cuerpo, acostada y guiada, en el borde entre despierta y dormida. Es lo más parecido a una siesta que sigue siendo práctica, y de las técnicas de este tipo es la que tiene revisiones sistemáticas propias.",
    pasos: [
      "Acostada de espaldas, tapada, con algo bajo las rodillas si la espalda lo pide. Se trata de no moverse más.",
      "Recorre el cuerpo rápido, nombrando las partes, sin detenerte a sentir cada una como en el body scan.",
      "Deja que aparezca la sensación de pesadez, y después de liviandad.",
      "No luches contra el sueño ni te entregues del todo. Si te duermes, te dormiste: también sirvió.",
    ],
    paraQue:
      "Sueño, ansiedad y descanso profundo en poco rato. Es la que conviene a las siete de la tarde de un día terrible, cuando sentarse no es opción.",
    minutos: [10, 15, 20],
    ojo:
      "Hay una versión larga y guiada dentro del Ritual de yoga, con la voz llevando la práctica entera. Acá va la versión corta.",
    guia: [
      { en: 0, texto: "Acuéstate de espaldas, tapada. A partir de ahora no te mueves más." },
      { en: 0.08, texto: "Deja que el cuerpo pese sobre el suelo. Nada que hacer, nada que arreglar." },
      { en: 0.2, texto: "Lleva la atención rápido: mano derecha, brazo, hombro. Solo nombrarlos." },
      { en: 0.32, texto: "Mano izquierda, brazo, hombro. Pie derecho, pierna. Pie izquierdo, pierna." },
      { en: 0.46, texto: "Espalda entera. Vientre. Pecho. Garganta. Cara. Cabeza." },
      { en: 0.6, texto: "Todo el cuerpo pesado. Como si se hundiera un poco." },
      { en: 0.74, texto: "Y ahora liviano. Como si flotara. Deja las dos sensaciones venir y pasar." },
      { en: 0.88, texto: "Quédate en el borde: sin dormirte del todo, sin esforzarte por no dormirte." },
      { en: 0.97, texto: "Vuelve de a poco. Mueve los dedos antes de abrir los ojos." },
    ],
  },
  {
    id: "caminando",
    nombre: "Meditación caminando",
    tambien: "kinhin",
    familia: "movimiento",
    linea: "Para cuerpos que no aguantan quedarse quietos.",
    queEs:
      "La misma práctica con los pies como objeto. Se camina muy despacio en un tramo corto, ida y vuelta, atendiendo a cada paso. Es práctica formal, no un paseo con atención.",
    pasos: [
      "Busca un tramo de unos diez pasos, adentro o afuera. Las manos delante o detrás.",
      "Camina más lento de lo que te parece razonable. Nota el peso que pasa de un pie al otro.",
      "Atiende a un detalle concreto: el talón que se despega, la planta que se apoya, el momento sin apoyo.",
      "Al llegar al final, detente, gira despacio y vuelve. Sin apuro y sin destino.",
    ],
    paraQue:
      "Los días de inquietud, de mucho café o de mucha rabia, cuando sentarse sería pelear media hora. También para quien tiene dolor al estar sentada.",
    minutos: [5, 10, 15],
    guia: [
      { en: 0, texto: "De pie. Siente los dos pies en el suelo antes de moverte." },
      { en: 0.08, texto: "Empieza a caminar más lento de lo razonable. Diez pasos, y vuelves." },
      { en: 0.25, texto: "Nota el peso pasando de un pie al otro. Ahí está toda la práctica." },
      { en: 0.45, texto: "Elige un detalle: el talón que se despega, la planta que se apoya." },
      { en: 0.65, texto: "Si te fuiste en pensamientos, nótalo, y vuelve a los pies." },
      { en: 0.85, texto: "Al girar, gira despacio también. No hay adónde llegar." },
      { en: 0.96, texto: "Detente. Quédate de pie un momento antes de seguir con el día." },
    ],
  },
  {
    id: "respiracion-lenta",
    nombre: "Respiración lenta",
    tambien: "respiración coherente, seis por minuto",
    familia: "focalizada",
    linea: "La más rápida para bajar el cuerpo. Dos minutos alcanzan.",
    queEs:
      "Acá sí se controla la respiración: se lleva a unas seis respiraciones por minuto, con la salida más larga que la entrada. Es la más fisiológica de todas —hace lo suyo en el sistema nervioso autónomo, se mida como se mida— y la menos meditativa.",
    pasos: [
      "Entra por la nariz contando cuatro. Sal por la nariz o por la boca contando seis.",
      "Sin apretar y sin llenarte del todo. Si te marea o te falta aire, acorta los números.",
      "Dos a cinco minutos. No hace falta más para notar el efecto.",
      "Después, si quieres, suelta la cuenta y quédate mirando cómo respira solo: ahí empieza la meditación.",
    ],
    paraQue:
      "Cuando el cuerpo está activado —antes de algo que da miedo, después de una discusión, a las tres de la mañana. Es lo que más rápido cambia algo medible.",
    minutos: [2, 3, 5],
    ojo:
      "Esto es pranayama, no meditación, y por eso está con sus advertencias en el Ritual de yoga. Si estás embarazada, si tienes hipertensión no controlada, glaucoma o epilepsia, las retenciones y las respiraciones fuertes no van; esta suave sí, pero preguntando.",
    guia: [
      { en: 0, texto: "Espalda larga, hombros sueltos. Suelta el aire entero una vez." },
      { en: 0.08, texto: "Entra contando cuatro. Sal contando seis. Sin apretar." },
      { en: 0.3, texto: "Si te marea o te falta aire, acorta los números. Tiene que ser cómodo." },
      { en: 0.55, texto: "La salida larga es la que baja el cuerpo. Deja que sea larga y blanda." },
      { en: 0.8, texto: "Últimas respiraciones contadas." },
      { en: 0.94, texto: "Suelta la cuenta. Mira cómo respira solo, sin ayudarlo." },
    ],
  },
  {
    id: "tres-respiraciones",
    nombre: "Las tres respiraciones",
    tambien: "el espacio de respiración, de la MBCT",
    familia: "focalizada",
    linea: "Un minuto entre dos cosas del día. La que más se usa de verdad.",
    queEs:
      "La práctica corta del programa de MBCT, pensada para meterse en un día cualquiera y no en un cojín. Tiene forma de reloj de arena: se abre a todo lo que hay, se estrecha en la respiración, y se vuelve a abrir al cuerpo entero antes de seguir.",
    pasos: [
      "Primero, pregúntate qué hay ahora mismo: qué pensamiento, qué emoción, qué sensación. Nómbralo y no lo arregles.",
      "Después estrecha todo a la respiración. Unas pocas respiraciones, solo eso.",
      "Y abre otra vez: el cuerpo entero sentado o de pie, la postura, la expresión de la cara.",
      "Sigue con lo que estabas haciendo. Esa vuelta al día es parte de la práctica.",
    ],
    paraQue:
      "Cortar el piloto automático a mitad de jornada. Es la que hace que lo de la sesión larga sirva para algo: entre una reunión y la siguiente, antes de contestar un mensaje con rabia.",
    minutos: [1, 2, 3],
    guia: [
      { en: 0, texto: "Párate o siéntate derecha. Primero: qué hay ahora. Qué pensamiento, qué emoción, qué sensación." },
      { en: 0.25, texto: "Nómbralo en una palabra. No lo arregles." },
      { en: 0.42, texto: "Ahora estrecha todo a la respiración. Solo el aire entrando y saliendo." },
      { en: 0.68, texto: "Y abre otra vez: el cuerpo entero, la postura, la cara." },
      { en: 0.9, texto: "Lleva esto a lo que sigue del día." },
    ],
  },
  {
    id: "sonido",
    nombre: "Atención al sonido",
    familia: "abierta",
    linea: "Si atender al cuerpo te cuesta o te incomoda.",
    queEs:
      "El objeto es lo que se oye. En vez de pelear con el ruido de la casa o de la calle, el ruido pasa a ser la práctica. Se escucha sin nombrar: no «una moto», sino el sonido en bruto, como si fuera música que no conoces.",
    pasos: [
      "Ojos cerrados o entreabiertos. Deja que los oídos hagan el trabajo; tú no vas a buscar nada.",
      "Nota los sonidos lejanos y los cercanos, y el silencio entre medio, que también es algo que se oye.",
      "Si te descubres armando la historia —quién es, por qué, cuánto va a durar—, vuelve al sonido puro.",
      "Incluye tus propios ruidos: la respiración, la tripa, la ropa al moverse.",
    ],
    paraQue:
      "Casas ruidosas, oficinas, buses. Y para quien la atención al cuerpo le resulta angustiante: acá el objeto está afuera y eso hace toda la diferencia.",
    minutos: [5, 10, 15],
    guia: [
      { en: 0, texto: "Siéntate cómoda y deja que los oídos hagan el trabajo. Tú no vas a buscar nada." },
      { en: 0.14, texto: "Nota los sonidos lejanos. Los de más allá de esta habitación." },
      { en: 0.32, texto: "Ahora los cercanos. Y el silencio entre medio, que también se oye." },
      { en: 0.52, texto: "Sin nombrar. No una moto, no una voz: el sonido en bruto." },
      { en: 0.7, texto: "Incluye tus propios ruidos. La respiración, la ropa, la tripa." },
      { en: 0.88, texto: "Deja que el oído se quede abierto, sin ir a buscar." },
      { en: 0.97, texto: "Y vuelve al cuerpo un momento antes de terminar." },
    ],
  },
  {
    id: "montana",
    nombre: "La montaña",
    tambien: "del MBSR",
    familia: "cultivo",
    linea: "Para días en que todo se mueve y tú te mueves con todo.",
    queEs:
      "Una imagen sostenida en vez de una sensación: te imaginas una montaña, y después te imaginas siendo esa montaña mientras las estaciones y el clima pasan por encima. Es de las pocas prácticas con imagen que tiene lugar en un programa clínico.",
    pasos: [
      "Sentada, con el cuerpo asentado: la base ancha, la espalda como la ladera, la cabeza como la cumbre.",
      "Imagina la montaña con detalle. La que quieras: una que conozcas o una inventada.",
      "Deja pasar por ella el día y la noche, la lluvia, la nieve, la gente que sube. La montaña no las impide y tampoco las persigue.",
      "Ahora eso eres tú: los estados de ánimo son el clima, no la montaña.",
    ],
    paraQue:
      "Semanas de cambios, de mala noticia, de ánimo que sube y baja tres veces al día. Da algo estable a lo que volver que no depende de que las cosas se calmen.",
    minutos: [10, 15],
    ojo:
      "Si te cuesta visualizar —a mucha gente le pasa, y no es un defecto—, quédate con la sensación de peso y de base ancha. Funciona igual sin imagen.",
    guia: [
      { en: 0, texto: "Siéntate con la base ancha y la espalda larga. Como si pesaras más abajo que arriba." },
      { en: 0.1, texto: "Imagina una montaña. La que quieras. Su base, sus laderas, su cumbre." },
      { en: 0.25, texto: "Míralas con detalle. La piedra, la nieve, los árboles de abajo." },
      { en: 0.4, texto: "Ahora esa montaña eres tú. Las piernas son la base, la espalda la ladera, la cabeza la cumbre." },
      { en: 0.56, texto: "Pasa el día y pasa la noche por encima. La montaña sigue igual." },
      { en: 0.72, texto: "Pasa la lluvia, pasa el viento, pasa el sol. Ninguno la cambia." },
      { en: 0.86, texto: "Tus estados de ánimo son el clima. Tú eres la montaña." },
      { en: 0.96, texto: "Quédate un momento con el peso de la base." },
    ],
  },
  {
    id: "rain",
    nombre: "Reconocer lo que pasa",
    tambien: "RAIN, de la enseñanza contemporánea",
    familia: "abierta",
    linea: "Cuando hay una emoción que no se va.",
    queEs:
      "Cuatro pasos para quedarse con algo difícil sin ahogarse y sin escapar: reconocer, permitir, investigar y acompañar. No es una técnica de la tradición antigua ni sale de un ensayo clínico: viene de la enseñanza contemporánea, y está acá porque da un orden cuando lo que hay es demasiado.",
    pasos: [
      "Reconocer: ponle nombre a lo que está pasando. «Miedo». «Rabia». «Pena».",
      "Permitir: deja que esté ahí, un rato, sin arreglarlo ni justificarlo. No es aprobarlo: es dejar de empujarlo.",
      "Investigar: ¿dónde se siente en el cuerpo? ¿Qué forma tiene? ¿Qué está pidiendo?",
      "Acompañar: date algo de lo que le darías a alguien que quieres en ese estado. Una mano en el pecho sirve más de lo que parece.",
    ],
    paraQue:
      "Emociones que vuelven, culpa, ansiedad que no afloja. Es la práctica para el día en que sentarse a mirar la respiración sería esquivar lo que hay.",
    minutos: [10, 15],
    ojo:
      "Si lo que aparece te desborda, para. Esto es una forma de acompañar una emoción difícil, no un tratamiento para un trauma, y hacerlo sola con algo grande puede ser demasiado.",
    guia: [
      { en: 0, texto: "Siéntate. Tres respiraciones largas. Trae a la mente lo que está pesando." },
      { en: 0.12, texto: "Reconocer. Ponle un nombre. Miedo. Rabia. Pena. Lo que sea." },
      { en: 0.3, texto: "Permitir. Deja que esté ahí. No lo arregles, no lo justifiques, no lo empujes." },
      { en: 0.5, texto: "Investigar. Dónde se siente en el cuerpo. Qué forma tiene. Qué está pidiendo." },
      { en: 0.72, texto: "Acompañar. Una mano en el pecho. Date lo que le darías a alguien que quieres." },
      { en: 0.9, texto: "Nota que estuviste con esto y sigues entera. Eso también se aprende." },
    ],
  },
  {
    id: "gratitud",
    nombre: "Tres cosas del día",
    tambien: "práctica de gratitud",
    familia: "cultivo",
    linea: "Corta, de noche, y cambia cómo recuerdas el día.",
    queEs:
      "Recorrer el día y detenerse en tres cosas concretas que estuvieron bien —no grandes: concretas. El primer sorbo de café, que alguien te esperó. Se sostiene en cada una unos segundos, que es lo que la diferencia de hacer una lista.",
    pasos: [
      "Recorre el día desde que despertaste, como una película rápida.",
      "Detente en algo que estuvo bien. Quédate unos segundos: dónde estabas, qué se sentía.",
      "Busca dos más. Si el día fue horrible, sirve «me tomé el remedio» o «llegué a la noche».",
      "Cierra notando si algo cambió en el cuerpo. A veces no cambia nada, y también está bien.",
    ],
    paraQue:
      "Cerrar el día y dormirse con algo que no sea el repaso de lo que faltó. Es de las prácticas más fáciles de sostener porque dura tres minutos y se hace en la cama.",
    minutos: [3, 5, 10],
    ojo:
      "Los primeros estudios de gratitud mostraron efectos grandes en bienestar; las revisiones posteriores, comparando contra actividades activas, los encontraron bastante más chicos. Sirve, pero no es la palanca que prometieron los libros.",
    guia: [
      { en: 0, texto: "Cómoda, en la cama si quieres. Tres respiraciones largas." },
      { en: 0.12, texto: "Recorre el día desde que despertaste. Como una película rápida." },
      { en: 0.3, texto: "Detente en algo que estuvo bien. Chico y concreto. Quédate ahí unos segundos." },
      { en: 0.5, texto: "Busca una segunda cosa. Dónde estabas, qué se sentía." },
      { en: 0.7, texto: "Y una tercera. Si el día fue horrible, sirve haber llegado a la noche." },
      { en: 0.9, texto: "Nota si algo cambió en el cuerpo. Si no cambió nada, también está bien." },
    ],
  },
  {
    id: "llama",
    nombre: "Mirar una llama",
    tambien: "trāṭaka",
    familia: "focalizada",
    linea: "Con los ojos abiertos, si cerrarlos te inquieta.",
    queEs:
      "Atención focalizada con un objeto que se mira: tradicionalmente la llama de una vela, a un metro y a la altura de los ojos. Es de las prácticas de concentración más antiguas y viene de los textos de hatha yoga, no de un laboratorio.",
    pasos: [
      "Enciende una vela a un metro, a la altura de los ojos, en una habitación en penumbra.",
      "Mira la llama sin forzar y parpadeando lo que haga falta. Que los ojos no sufran.",
      "Cuando se cansen, cierra los ojos y quédate con la imagen que queda dentro hasta que se apague.",
      "Abre y repite. Al final, palmas tibias sobre los ojos cerrados un momento.",
    ],
    paraQue:
      "Concentración, y sobre todo: poder practicar con los ojos abiertos. Para quien cerrarlos le da angustia, esta es la puerta de entrada.",
    minutos: [5, 10],
    ojo:
      "Es tradición: la evidencia es escasa y de estudios chicos, así que va como técnica de concentración y no como algo que cure la vista ni «abra» nada. No la hagas si tienes una condición ocular sin conversarlo antes, y nunca fuerces la vista sin parpadear: eso sí hace daño.",
    guia: [
      { en: 0, texto: "Vela encendida a un metro, a la altura de los ojos. Siéntate derecha." },
      { en: 0.1, texto: "Mira la llama sin forzar. Parpadea todo lo que necesites." },
      { en: 0.3, texto: "Si los ojos se cansan, ciérralos y quédate con la imagen que quedó dentro." },
      { en: 0.5, texto: "Cuando se apague esa imagen, abre y vuelve a la llama." },
      { en: 0.72, texto: "Nada más que eso: mirar, cerrar, volver." },
      { en: 0.92, texto: "Cierra los ojos y pon las palmas tibias encima un momento." },
    ],
  },
];

/* ── Los obstáculos ──────────────────────────────────────── */

export type Obstaculo = {
  que: string;
  /** El nombre tradicional, cuando existe. Se dice que es tradición. */
  tradicion?: string;
  porQue: string;
  queHacer: string;
};

export const OBSTACULOS: Obstaculo[] = [
  {
    que: "Te da sueño",
    tradicion: "en los textos budistas, thīna-middha: pereza y torpor",
    porQue:
      "Silencio, ojos cerrados y cuerpo quieto son exactamente las condiciones con las que te duermes cada noche. Tu cuerpo hace lo que aprendió.",
    queHacer:
      "Abre los ojos y mira el suelo. Siéntate más derecha, o de plano de pie. Cambia la hora: no justo después de comer ni en la cama. Si igual te duermes siempre, probablemente lo que te falta es dormir, no meditar.",
  },
  {
    que: "No puedes estar quieta",
    tradicion: "uddhacca-kukkucca: agitación y remordimiento",
    porQue:
      "La inquietud del cuerpo suele ser energía sin gastar o ansiedad buscando salida. No se resuelve apretando los dientes.",
    queHacer:
      "Muévete primero: una práctica corta de yoga, una caminata. Baja el rato a tres minutos y sube de a poco. O usa la meditación caminando, que para esto es mejor que la sentada.",
  },
  {
    que: "Te acuerdas de todo lo que tienes que hacer",
    tradicion: "kāmacchanda: el deseo que tira hacia afuera",
    porQue:
      "Es lo primero que aparece cuando la cabeza se queda sin tarea. No es una señal de que estés haciéndolo mal, es la cola de pendientes vaciándose.",
    queHacer:
      "Escribe la lista antes de sentarte —en la sección de Hábitos, si quieres. Sabiendo que está anotada, la cabeza deja de repetirla para no olvidarla.",
  },
  {
    que: "Te da rabia, o pena, o algo grande",
    tradicion: "byāpāda: la aversión",
    porQue:
      "Al bajar el ruido aparece lo que estaba tapado. Es de las cosas más incómodas de la práctica y de las más útiles, si no te pasa por encima.",
    queHacer:
      "Nómbralo en una palabra y mira dónde se siente en el cuerpo. Si es demasiado, abre los ojos, siente los pies en el suelo y mira algo de la habitación: eso te trae al presente. Y si aparece seguido algo que te desborda, esto se conversa con alguien, no se medita sola.",
  },
  {
    que: "Piensas que no te está sirviendo",
    tradicion: "vicikicchā: la duda",
    porQue:
      "Los cambios de esta práctica son lentos y se notan afuera, no dentro de la sesión. Esperando notarlos dentro, la conclusión siempre va a ser que no sirve.",
    queHacer:
      "Dale un plazo con número: ocho semanas, diez minutos al día, que es la dosis de casi toda la investigación. En el calendario de Hábitos queda el registro. A las ocho semanas decides con datos y no con la sensación de un martes malo.",
  },
  {
    que: "Te duele la espalda o las piernas",
    porQue: "Casi siempre es la postura, no la meditación.",
    queHacer:
      "Silla, o cojín más alto. Y muévete si hay que moverse: aguantar dolor no es parte del ejercicio. Los textos que dicen lo contrario fueron escritos por gente que se sentaba así desde los cuatro años.",
  },
];

/* ── Qué está probado ─────────────────────────────────────── */

export type Prueba = {
  tema: string;
  grado: Grado;
  dice: string;
  matiz: string;
  fuente: string;
  carpeta?: string;
};

export const PRUEBAS: Prueba[] = [
  {
    tema: "Ansiedad, depresión y dolor",
    grado: "probado",
    dice:
      "La revisión más citada reunió 47 ensayos con 3.515 personas y encontró evidencia moderada de mejoría en ansiedad, síntomas depresivos y dolor con programas de atención plena de ocho semanas.",
    matiz:
      "«Moderada» quiere decir que el efecto está y es chico a mediano, no que resuelva un trastorno. En esa misma revisión, la evidencia para ánimo positivo, atención, sueño, consumo de sustancias y peso fue baja o insuficiente. Y frente a otra actividad activa —ejercicio, terapia, un grupo que conversa— la ventaja se achica.",
    fuente:
      "Goyal et al. (2014), Meditation programs for psychological stress and well-being: a systematic review and meta-analysis, JAMA Internal Medicine 174(3):357-368",
    carpeta: "yoga/meditacion_mindfulness",
  },
  {
    tema: "Recaídas de depresión",
    grado: "probado",
    dice:
      "La terapia cognitiva basada en mindfulness (MBCT) reduce el riesgo de recaída en personas con depresión recurrente. Un metaanálisis con los datos individuales de nueve ensayos lo mostró frente a los cuidados habituales y también frente a tratamientos activos, incluida la mantención con antidepresivos.",
    matiz:
      "Es un programa de ocho semanas con un terapeuta entrenado y un grupo, no meditar sola con una app. Y es para prevenir la recaída de alguien que está estable, no para salir de un episodio en curso.",
    fuente:
      "Kuyken et al. (2016), Efficacy of mindfulness-based cognitive therapy in prevention of depressive relapse: an individual patient data meta-analysis, JAMA Psychiatry 73(6):565-574",
  },
  {
    tema: "Atención y memoria de trabajo",
    grado: "prometedor",
    dice:
      "Cuatro sesiones de veinte minutos ya mejoraron el ánimo y la atención sostenida frente a un grupo control. Y en personas sin experiencia, trece minutos al día durante ocho semanas mejoraron atención, memoria de trabajo y ánimo; a las cuatro semanas todavía no había cambios.",
    matiz:
      "Muestras chicas y casi siempre en estudiantes. La revisión de JAMA clasificó la evidencia sobre atención como insuficiente. Lo que se repite es la atención sostenida, no la inteligencia: esto no te vuelve más lista.",
    fuente:
      "Zeidan et al. (2010), Consciousness and Cognition 19(2):597-605; Basso et al. (2019), Behavioural Brain Research 356:208-220",
    carpeta: "yoga/meditacion_mindfulness",
  },
  {
    tema: "Dormir mejor",
    grado: "prometedor",
    dice:
      "Un metaanálisis de ensayos aleatorizados encontró mejoría en la calidad del sueño con programas de meditación, comparable a la de controles activos específicos. El yoga nidra tiene además revisión sistemática propia para insomnio y alteraciones del sueño.",
    matiz:
      "Se mide casi todo con cuestionarios, no con polisomnografía. Y para un insomnio instalado el tratamiento con más respaldo sigue siendo la terapia cognitivo-conductual del insomnio; esto acompaña, no reemplaza.",
    fuente:
      "Rusch et al. (2019), The effect of mindfulness meditation on sleep quality, Annals of the New York Academy of Sciences 1445(1):5-16; revisión de yoga nidra en Sleep & Breathing, 2026",
    carpeta: "yoga/sueno_nidra",
  },
  {
    tema: "Dolor crónico",
    grado: "prometedor",
    dice:
      "Las revisiones encuentran una mejora pequeña del dolor y de la calidad de vida. Los estudios de imágenes sugieren que lo que cambia no es tanto la señal como la respuesta emocional al dolor.",
    matiz:
      "Efecto chico y calidad de la evidencia baja. Nadie ha mostrado que reemplace un tratamiento del dolor; lo que muestra es que se puede vivir distinto con el mismo dolor, que no es poco pero es otra cosa.",
    fuente:
      "Hilton et al. (2017), Mindfulness meditation for chronic pain: systematic review and meta-analysis, Annals of Behavioral Medicine 51(2):199-213",
    carpeta: "yoga/dolor_cronico",
  },
  {
    tema: "Estrés en gente sana",
    grado: "prometedor",
    dice:
      "En población no clínica, los programas de atención plena reducen el malestar psicológico comparados con no hacer nada.",
    matiz:
      "Comparados con otra práctica activa, no salieron consistentemente mejores, y los resultados varían mucho de un estudio a otro. Traducido: sirve, y la relajación o el ejercicio también. Lo que conviene es lo que vayas a sostener.",
    fuente:
      "Galante et al. (2021), Mindfulness-based programmes for mental health promotion in adults in nonclinical settings, PLOS Medicine 18(1):e1003481",
  },
  {
    tema: "Ser más amable con los demás",
    grado: "debil",
    dice:
      "Las prácticas de compasión aumentan la compasión medida, sí. Pero el metaanálisis que revisó esos estudios encontró que el efecto se reducía o desaparecía cuando el grupo control era activo y cuando quien enseñaba no era el propio autor del estudio.",
    matiz:
      "Es un buen ejemplo de por qué conviene desconfiar de los titulares: los resultados más entusiastas vienen de los diseños más flojos. La práctica de la bondad está en esta app porque cambia el día de quien la hace, no porque te vuelva mejor persona de forma demostrada.",
    fuente:
      "Kreplin, Farias & Brandão (2018), The limited prosocial effects of meditation: a systematic review and meta-analysis, Scientific Reports 8:2403",
  },
  {
    tema: "Presión arterial y corazón",
    grado: "debil",
    dice:
      "La Asociación Americana del Corazón revisó la evidencia y concluyó que la meditación se puede considerar como complemento a lo que ya está probado, dado su bajo costo y riesgo.",
    matiz:
      "El propio documento aclara que la evidencia es de calidad modesta y que no debe reemplazar los tratamientos con respaldo. Las bajadas de presión reportadas son de pocos milímetros de mercurio. Para el corazón, lo que está probado es moverse, dormir y comer distinto.",
    fuente:
      "Levine et al. (2017), Meditation and cardiovascular risk reduction: a scientific statement from the American Heart Association, Journal of the American Heart Association 6(10):e002218",
  },
  {
    tema: "Dejar de fumar y otros consumos",
    grado: "prometedor",
    dice:
      "La revisión de intervenciones basadas en mindfulness para trastornos psiquiátricos las encontró superiores a no tratar y a controles no específicos, y comparables a tratamientos ya establecidos; el consumo de tabaco fue de los resultados más consistentes.",
    matiz:
      "Comparable no es mejor. Y los programas estudiados son con terapeuta: no hay evidencia de que meditar sola diez minutos al día haga esto.",
    fuente:
      "Goldberg et al. (2018), Mindfulness-based interventions for psychiatric disorders: a systematic review and meta-analysis, Clinical Psychology Review 59:52-60",
  },
  {
    tema: "Gratitud",
    grado: "prometedor",
    dice:
      "El experimento original pidió a un grupo anotar cinco cosas por las que estuviera agradecido cada semana, y encontró mejor ánimo y menos molestias físicas que en los grupos que anotaban problemas o hechos neutros.",
    matiz:
      "Los metaanálisis posteriores, comparando la gratitud contra otras actividades activas y no contra nada, encontraron efectos bastante más chicos de lo que prometió la divulgación. Es una práctica corta y agradable con un beneficio modesto, no una palanca.",
    fuente:
      "Emmons & McCullough (2003), Counting blessings versus burdens, Journal of Personality and Social Psychology 84(2):377-389; Davis et al. (2016), Journal of Counseling Psychology 63(1):20-31",
  },
];

/* ── El cerebro, con honestidad ────────────────────────────── */

export type Mecanismo = { titulo: string; dice: string; pero: string; fuente: string };

export const EN_EL_CEREBRO: Mecanismo[] = [
  {
    titulo: "Tres cosas, no una",
    dice:
      "La revisión de referencia sobre el tema describe la práctica como el entrenamiento de tres capacidades: regular la atención, registrar lo que pasa en el cuerpo, y regular la emoción —incluida la forma en que uno se relaciona con la idea de sí mismo. Las áreas que aparecen una y otra vez son la corteza cingulada anterior, la ínsula y zonas prefrontales.",
    pero:
      "Los propios autores advierten que la mayoría de los estudios son chicos, con controles débiles, y que la variedad de prácticas que se llaman «meditación» hace difícil comparar.",
    fuente: "Tang, Hölzel & Posner (2015), The neuroscience of mindfulness meditation, Nature Reviews Neuroscience 16(4):213-225",
  },
  {
    titulo: "La red de la cabeza divagando",
    dice:
      "Hay una red de regiones que se activa cuando no estamos haciendo nada en particular: es la que sostiene el hablarse a sí mismo, el rumiar y el planear. En meditadores con experiencia se ha visto menos activa durante la práctica, y con distinta conectividad.",
    pero:
      "Casi todos esos estudios comparan a meditadores expertos con gente que nunca meditó. Eso no prueba que la meditación causara la diferencia: puede que quien medita diez mil horas ya fuera distinto antes.",
    fuente: "Brewer et al. (2011), Meditation experience is associated with differences in default mode network activity and connectivity, PNAS 108(50):20254-20259",
  },
  {
    titulo: "¿Cambia el cerebro de forma?",
    dice:
      "El metaanálisis de los estudios de morfometría encontró diferencias consistentes en ocho regiones de meditadores, con tamaños de efecto moderados.",
    pero:
      "Los mismos autores señalan que son estudios transversales y que hay sesgo de publicación. La frase «meditar te hace crecer el cerebro» no se sostiene con eso; lo honesto es «hay diferencias asociadas, y no sabemos bien qué las causa».",
    fuente:
      "Fox et al. (2014), Is meditation associated with altered brain structure? A systematic review and meta-analysis of morphometric neuroimaging, Neuroscience & Biobehavioral Reviews 43:48-73",
  },
  {
    titulo: "El cuerpo al revés del estrés",
    dice:
      "Lo más antiguo y lo más sólido que se puede decir del mecanismo no es del cerebro sino del sistema nervioso autónomo: la atención sostenida y la respiración lenta producen un patrón opuesto al de la alarma —menos frecuencia cardíaca, menos consumo de oxígeno, más variabilidad del ritmo cardíaco.",
    pero:
      "Eso es un efecto del rato, no una transformación. Se puede conseguir igual con respiración lenta sin nada de meditación, y por eso la respiración lenta está en esta sección.",
    fuente:
      "Esch et al. (2001), The physiology of mind-body interactions: the stress response and the relaxation response, Journal of Alternative and Complementary Medicine",
    },
  {
    titulo: "La advertencia de la propia disciplina",
    dice:
      "Un grupo grande de investigadores del área publicó una revisión crítica del campo: definiciones inconsistentes, mediciones pobres, ensayos sin controles activos, y una distancia enorme entre lo que muestran los datos y lo que se afirma en los medios y en la industria del bienestar.",
    pero:
      "No dice que no funcione. Dice que se ha prometido mucho más de lo que se ha mostrado. Esta página está escrita con ese texto al lado.",
    fuente:
      "Van Dam et al. (2018), Mind the hype: a critical evaluation and prescriptive agenda for research on mindfulness and meditation, Perspectives on Psychological Science 13(1):36-61",
  },
];

/* ── Riesgos ──────────────────────────────────────────────── */

export const RIESGOS = {
  intro:
    "Se repite que la meditación no puede hacer daño. No es verdad, y decirlo deja sola a la gente a la que le pasa algo.",
  hallazgo:
    "La revisión sistemática de eventos adversos reunió 83 estudios con 6.703 personas y encontró que alrededor del 8% reportó algún efecto adverso. Los más frecuentes fueron ansiedad y síntomas depresivos, seguidos de síntomas cognitivos y perceptuales. Aparecieron tanto en personas con antecedentes psiquiátricos como sin ellos.",
  fuente:
    "Farias, Maraldi, Wallenkampf & Lucchetti (2020), Adverse events in meditation practices and meditation-based therapies: a systematic review, Acta Psychiatrica Scandinavica 142(5):374-393",
  cuidado: [
    "Si hay historia de trauma: la atención al cuerpo y el silencio pueden traer de vuelta lo que el cuerpo guardó, sin nadie al lado. Sesiones cortas, ojos abiertos, y mejor acompañada.",
    "Si hay historia de psicosis, manía o trastorno bipolar: los retiros largos e intensivos y la privación de sueño que a veces traen son un riesgo real. Práctica corta y diaria, sí; retiros de silencio, con tu médica.",
    "Si hay un duelo o una crisis reciente: quedarse quieta con eso puede ser demasiado pronto. El movimiento —caminar, el yoga— suele entrar mejor esas semanas.",
    "Si hay un trastorno alimentario: el recorrido del cuerpo puede ser terreno difícil. Empieza por la respiración o por el sonido, no por el cuerpo.",
  ],
  reglas: [
    "Ojos abiertos y pies en el suelo cuando algo se pone intenso. Anclarse en algo externo trae de vuelta al presente mejor que insistir hacia dentro.",
    "Parar es una opción válida y no es fracasar. Diez minutos que se cortan a los tres son diez minutos bien usados.",
    "Nada de esto reemplaza un tratamiento. Si estás en terapia o con medicación, cuéntale que empezaste a meditar: es información clínica útil.",
    "Desconfía de quien te diga que lo que sentiste es «parte del proceso» sin preguntarte nada más.",
  ],
};

/* ── Mitos ────────────────────────────────────────────────── */

export const MITOS = [
  {
    mito: "Meditar es dejar la mente en blanco.",
    realidad:
      "No, y esta es la creencia que hace que la mayoría lo abandone en la primera semana. Los pensamientos siguen apareciendo toda la vida, también en quien lleva treinta años. Lo que se entrena es notar que apareció uno y volver, no impedir que aparezca.",
  },
  {
    mito: "Si me distraigo, lo hice mal.",
    realidad:
      "La distracción es el material del ejercicio. Sin distracción no habría nada que practicar: es como un abdominal sin el peso del tronco.",
  },
  {
    mito: "Hay que meditar una hora, y al amanecer.",
    realidad:
      "La dosis de la mayoría de los estudios con resultados es de diez a veinte minutos al día durante ocho semanas. En uno de ellos bastaron trece minutos diarios. La hora del día no cambió nada medible: lo que importa es que sea siempre a la misma hora, porque así se sostiene.",
  },
  {
    mito: "La meditación no tiene contraindicaciones.",
    realidad:
      "Cerca del 8% de las personas en los estudios revisados reportó algún efecto adverso, sobre todo ansiedad y ánimo bajo. Es una práctica con efectos, y lo que tiene efectos tiene efectos no deseados.",
  },
  {
    mito: "Mis ondas cerebrales cambian, eso prueba que funciona.",
    realidad:
      "Que algo se vea distinto en un electroencefalograma dice que pasó algo, no que sea bueno para ti. Dormir, tener miedo y tomar café también cambian las ondas. El beneficio se prueba midiendo lo que te pasa, no el gráfico.",
  },
  {
    mito: "Meditar alarga la vida y rejuvenece las células.",
    realidad:
      "Los estudios de telómeros y meditación son pocos, chicos y de resultados mezclados. No hay base para prometer eso, y quien lo promete suele estar vendiendo un retiro.",
  },
  {
    mito: "Es una práctica religiosa: hay que creer en algo.",
    realidad:
      "Las técnicas vienen de tradiciones religiosas, igual que los hospitales vienen de las órdenes monásticas. El ejercicio de atención funciona sin ninguna creencia asociada, y así se estudia.",
  },
  {
    mito: "Con una app basta.",
    realidad:
      "Las revisiones de programas digitales encuentran efectos más chicos que los de los programas con profesor y grupo, y abandonos altos. Sirven para empezar y para sostener; no son lo mismo que un curso de ocho semanas con alguien que te vea.",
  },
];

/* ── Las ocho semanas ─────────────────────────────────────── */

export const POR_QUE_OCHO_SEMANAS =
  "Ocho semanas no es un número mágico: es el largo del MBSR, y por eso es el plazo que se midió en casi todos los estudios. Con diez a trece minutos al día, ahí es donde aparecen los cambios reportados. Y calza con lo que se sabe de hábitos: la mediana para que una conducta se vuelva automática fue de 66 días, con un rango que va de 18 a 254.";

export type Etapa = { semanas: string; tecnica: string; minutos: string; que: string };

export const PROGRAMA: Etapa[] = [
  {
    semanas: "Semanas 1 y 2",
    tecnica: "Contar respiraciones",
    minutos: "5 minutos",
    que: "El objetivo de estas dos semanas no es meditar bien: es sentarse todos los días a la misma hora. Cinco minutos, contando hasta diez y volviendo a uno. Si un día no puedes, al día siguiente sigue igual.",
  },
  {
    semanas: "Semanas 3 y 4",
    tecnica: "Atención a la respiración",
    minutos: "10 minutos",
    que: "Suelta el número. Elige el lugar donde sientes mejor el aire y quédate ahí. Acá es donde aparece el aburrimiento; el aburrimiento también se practica.",
  },
  {
    semanas: "Semana 5",
    tecnica: "Recorrido del cuerpo",
    minutos: "10 a 15 minutos",
    que: "Una semana entera de cuerpo. Es lo que devuelve la información que el día entero tapa: dónde estás apretada, qué te duele, cómo respiras de verdad.",
  },
  {
    semanas: "Semana 6",
    tecnica: "Atención abierta",
    minutos: "10 a 15 minutos",
    que: "Ahora sí: sin objeto fijo. Nombrar lo que aparece y soltarlo. Es la semana en que se nota el cambio de fondo, que es dejar de creerle automáticamente a lo que uno piensa.",
  },
  {
    semanas: "Semana 7",
    tecnica: "Práctica de la bondad",
    minutos: "10 minutos",
    que: "Las frases, en el orden que corresponde: alguien fácil, alguien neutro, alguien difícil, tú. Si la última parte se atraviesa, anótalo y déjala para más adelante.",
  },
  {
    semanas: "Semana 8",
    tecnica: "La que hayas elegido",
    minutos: "15 a 20 minutos",
    que: "Ya sabes cuál te sirve. Sube el rato, y agrega una práctica informal al día: una cosa cotidiana —lavar la taza, caminar a la esquina— hecha con toda la atención puesta ahí. Eso es lo que traslada la práctica a la vida, que es de lo que se trata.",
  },
];

/* ── Preguntas ────────────────────────────────────────────── */

export const PREGUNTAS = [
  {
    p: "¿Cuánto rato tengo que meditar?",
    r: "Cinco minutos si estás empezando, diez a veinte si ya llevas un mes. Es la dosis de los estudios con resultados. Y diez minutos diarios sirven más que una hora un día a la semana: esto se entrena como se entrena cualquier otra cosa.",
  },
  {
    p: "¿A qué hora?",
    r: "A la que la vayas a hacer. No hay evidencia de que una hora sea mejor que otra. Lo que sí está probado es que atar la práctica a algo que ya haces todos los días —después de lavarse los dientes, antes del primer café— hace bastante más probable que ocurra.",
  },
  {
    p: "¿Tengo que sentarme en el suelo con las piernas cruzadas?",
    r: "No. Una silla está bien y para muchas caderas es mejor. Lo único que importa es que la espalda esté larga y que el cuerpo aguante el rato sin dolor.",
  },
  {
    p: "¿Y si me quedo dormida?",
    r: "Siéntate más derecha, abre los ojos, cambia la hora. Si igual te duermes siempre, probablemente tu cuerpo está pidiendo sueño y no atención; eso se atiende primero. Con el yoga nidra, dormirse no es un problema: ahí es casi la idea.",
  },
  {
    p: "¿Con música o en silencio?",
    r: "En silencio se aprende más rápido, porque no hay nada que te sostenga. Pero si el silencio te pone ansiosa o vives en una casa ruidosa, la música ayuda a empezar. Acá es opcional y se genera en el propio teléfono, sin internet.",
  },
  {
    p: "¿Ojos abiertos o cerrados?",
    r: "Cerrados hay menos distracción; entreabiertos hay menos sueño y menos angustia. Si cerrar los ojos te inquieta —pasa con ansiedad y con historia de trauma—, entreabiertos es la opción correcta, no la fácil.",
  },
  {
    p: "¿Cuándo voy a notar algo?",
    r: "Algo del rato —el cuerpo más bajo— lo notas la primera vez. Los cambios de ánimo y atención se midieron desde cuatro sesiones, y los de los programas completos a las ocho semanas. Y se notan afuera: en el segundo que aparece entre lo que te molesta y lo que haces con eso.",
  },
  {
    p: "¿Esto reemplaza la terapia o los remedios?",
    r: "No. Acompaña. La MBCT está en guías clínicas para prevenir recaídas de depresión, y es un programa con terapeuta; nada de lo que hay en esta app es un tratamiento. Si estás en tratamiento, cuenta que empezaste a meditar.",
  },
  {
    p: "¿Meditar es lo mismo que relajarse?",
    r: "No. La relajación es un resultado que a veces aparece; la meditación es el entrenamiento. Hay sesiones incómodas que son excelentes sesiones, y siestas muy ricas que no entrenan nada.",
  },
  {
    p: "¿Y los chakras, las energías, las frecuencias?",
    r: "Eso es tradición, y en esta casa la tradición se nombra como tradición. Sirve como mapa poético del cuerpo y como forma de ordenar una práctica; no hay evidencia de que exista algo que se pueda medir ahí. La atención sí se puede medir, y es lo que esta sección entrena.",
  },
];

export const SOBRE_LA_MUSICA =
  "La música de la práctica se genera en vivo en tu teléfono con la misma máquina del Ritual de yoga: no hay archivos que descargar y nunca suena igual dos veces. Se puede apagar. Sobre la música y la ansiedad hay ensayos con resultados favorables, pero lo de las «frecuencias sanadoras» —432 Hz y compañía— no tiene respaldo: lo que se ha comparado no muestra diferencias atribuibles a la afinación.";

export const DONDE_QUEDA =
  "Las prácticas que hagas acá quedan anotadas en el mismo lugar que las pausas de Hábitos, así que aparecen en tu calendario y en tus gráficos. Se guardan en este aparato; con cuenta, te siguen al teléfono y al computador.";

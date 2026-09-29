/* Hipopresivos: lo que dice la evidencia, y lo que no.

   Todo lo que se afirma aquí sale de revisiones sistemáticas y ensayos
   clínicos publicados en revistas con revisión por pares. Nada sale de
   páginas de academias ni de quienes venden cursos de la técnica: es la
   regla de la sección, porque es justo el terreno donde más se promete.

   La conclusión honesta, en corto: sirven para los síntomas del suelo
   pélvico y el dolor lumbar, más o menos igual que otros ejercicios, pero no
   le ganan a los ejercicios de suelo pélvico (Kegel) para ganar fuerza, y el
   mecanismo que se les atribuye —«bajan la presión del abdomen»— no se
   confirmó cuando se midió. */

export type Grado = "probado" | "prometedor" | "debil" | "tradicion";

export const EN_UNA_LINEA =
  "Una respiración con pausa y una postura que activan sin esfuerzo la faja abdominal y el suelo pélvico. Sirven, pero no hacen magia: acompañan a los ejercicios de suelo pélvico, no los reemplazan.";

export const QUE_ES = [
  "Los hipopresivos son ejercicios de postura y respiración. En cada repetición se bota todo el aire, se aguanta sin respirar unos segundos y, en esa pausa, se abren las costillas como si se fuera a tomar aire sin dejarlo entrar. El abdomen se hunde solo, hacia adentro y hacia arriba.",
  "Los creó el fisioterapeuta belga Marcel Caufriez en la década de 1980, pensando en la recuperación después del parto. Él los llamó gimnasia abdominal hipopresiva. Después aparecieron versiones de entrenamiento para cualquier persona, como Low Pressure Fitness, que es la que más se ha estudiado.",
  "Las posturas tienen nombres de diosas (Deméter, acostada boca arriba; Atenea, de pie), pero lo que las define es la forma: el cuerpo largo, los hombros lejos de las orejas, los codos abiertos y el peso un poco hacia adelante.",
];

export const PASOS_DE_LA_TECNICA: { paso: string; como: string }[] = [
  {
    paso: "1. La postura",
    como: "Crece desde la coronilla como si te tiraran de un hilo, mentón un poco hacia adentro, hombros lejos de las orejas, codos abiertos hacia los lados. Si estás de pie, rodillas sueltas y el peso hacia la punta de los pies.",
  },
  {
    paso: "2. Tres respiraciones",
    como: "Toma aire lento por la nariz llevándolo a las costillas, hacia los lados, sin inflar la guata. Bótalo lento por la boca. Tres veces.",
  },
  {
    paso: "3. Bota todo el aire",
    como: "En la tercera, sigue botando hasta que no quede nada. Sin apretar el abdomen: deja que el aire se vaya.",
  },
  {
    paso: "4. La pausa con las costillas abiertas",
    como: "Sin tomar aire, abre las costillas hacia los lados como si fueras a respirar. El ombligo se va hacia adentro y hacia arriba solo. Aguanta unos segundos.",
  },
  {
    paso: "5. Suelta",
    como: "Deja entrar el aire suave, sin bocanada, y respira normal unas veces antes de repetir.",
  },
];

/* Qué pasa en el cuerpo: lo que se dice y lo que se midió. */
export const QUE_PASA: { titulo: string; dice: string; pero: string; fuente?: string }[] = [
  {
    titulo: "El suelo pélvico se activa solo",
    dice: "Durante la pausa, los músculos del suelo pélvico se contraen sin que tengas que apretarlos. Se midió con electromiografía: el elevador del ano llega a entre un tercio y la mitad de su contracción máxima.",
    pero: "Es una activación refleja y moderada. Para ganar fuerza en ese músculo, lo que más funciona sigue siendo contraerlo a propósito (los ejercicios de suelo pélvico o Kegel).",
    fuente: "Estudio observacional en 36 mujeres, Physiotherapy 2026; antes, Stüpp y cols., Neurourology and Urodynamics 2011.",
  },
  {
    titulo: "¿De verdad baja la presión dentro del abdomen?",
    dice: "Es la explicación con la que se promocionan: que la pausa crea una presión negativa que «sube» los órganos. De ahí el nombre, hipo-presivo.",
    pero: "Cuando se midió con un sensor, la presión dentro del abdomen no bajó de forma relevante, ni acostada ni de pie. Los efectos existen, pero probablemente por otra vía: la activación de los músculos profundos y el trabajo del diafragma.",
    fuente: "Estudio observacional en 36 mujeres sin experiencia previa, Physiotherapy 2026.",
  },
  {
    titulo: "El diafragma trabaja",
    dice: "Abrir las costillas sin dejar entrar aire es un ejercicio para los músculos de la respiración. En personas con dolor lumbar, ocho semanas de hipopresivos engrosaron el diafragma y aumentaron la fuerza para inspirar.",
    pero: "Es un solo ensayo, con 40 personas y comparado contra no hacer nada. Falta compararlo con otros ejercicios.",
    fuente: "Vicente-Campos y cols., ensayo aleatorizado, 2021.",
  },
  {
    titulo: "La presión arterial sube durante la pausa",
    dice: "En mujeres jóvenes con presión normal, la presión arterial sistólica subió mientras hacían los ejercicios sentadas, y volvió a lo normal al terminar.",
    pero: "Por eso la pausa sin aire no se hace con presión alta, problemas del corazón o en el embarazo. Sin la pausa, la postura y la respiración sí se pueden hacer.",
    fuente: "Serie de casos en 10 mujeres, Journal of Bodywork and Movement Therapies 2021.",
  },
];

/* Las fichas de evidencia. Cada una dice lo que se puede afirmar, el matiz
   que siempre hay, y de dónde sale. */
export const PRUEBAS: { tema: string; grado: Grado; dice: string; matiz: string; fuente: string }[] = [
  {
    tema: "Síntomas del suelo pélvico (escapes de orina, peso, calidad de vida)",
    grado: "prometedor",
    dice: "En mujeres con síntomas, ocho semanas de hipopresivos mejoraron los escapes de orina, la fuerza del suelo pélvico y la calidad de vida, comparado con no hacer nada.",
    matiz: "Comparados con los ejercicios de suelo pélvico, dieron resultados parecidos: todos los grupos mejoraron y ninguno le ganó al otro, tampoco combinando los dos.",
    fuente: "Molina-Torres y cols., Neurourology and Urodynamics 2023 (117 mujeres); Navarro-Brazález y cols., Journal of Clinical Medicine 2020 (94 mujeres, seguimiento de un año).",
  },
  {
    tema: "Fuerza del suelo pélvico",
    grado: "probado",
    dice: "Para ganar fuerza en el suelo pélvico, los ejercicios de suelo pélvico (contraer a propósito, tipo Kegel) funcionan mejor que los hipopresivos. Es la conclusión de varias revisiones.",
    matiz: "Los hipopresivos mejoran algo la fuerza, pero menos. Donde salieron mejor fue en calidad de vida.",
    fuente: "Ruiz de Viñaspre Hernández, Actas Urológicas Españolas 2018 (revisión sistemática); Santoro y cols., Journal of Bodywork and Movement Therapies 2023 (revisión de ensayos); Mitchell y cols., American Journal of Surgery 2025 (análisis conjunto).",
  },
  {
    tema: "Prolapso (descenso de la vejiga o el útero)",
    grado: "probado",
    dice: "En mujeres con prolapso leve a moderado, los ejercicios de suelo pélvico mejoraron más que los hipopresivos.",
    matiz: "Los hipopresivos no son el tratamiento de primera línea para el prolapso. Si tienes sensación de peso o de «bolita», lo primero es una evaluación con una kinesióloga de suelo pélvico.",
    fuente: "Resende y cols., Neurourology and Urodynamics 2019 (ensayo aleatorizado con evaluador ciego); Bernardes y cols., São Paulo Medical Journal 2012.",
  },
  {
    tema: "Dolor lumbar crónico",
    grado: "prometedor",
    dice: "En personas con dolor lumbar crónico sin causa específica, ocho semanas de hipopresivos, dos veces por semana, bajaron el dolor y la discapacidad.",
    matiz: "Se comparó contra no hacer nada. Casi cualquier ejercicio ayuda en el dolor lumbar; falta saber si estos ayudan más que otros.",
    fuente: "Vicente-Campos y cols., ensayo aleatorizado 2021 (40 personas).",
  },
  {
    tema: "Diástasis abdominal después del parto",
    grado: "debil",
    dice: "En un ensayo, seis semanas de hipopresivos redujeron la separación de los rectos unos 3 milímetros, lo mismo que los abdominales convencionales.",
    matiz: "En otro ensayo más reciente, la separación no se redujo, aunque sí mejoraron la función del abdomen, la imagen corporal y los síntomas de suelo pélvico. No cierran la diástasis por sí solos.",
    fuente: "Soto-González y cols., PLOS One 2024 (28 mujeres); ensayo aleatorizado, Brazilian Journal of Physical Therapy 2026.",
  },
  {
    tema: "Cintura más fina",
    grado: "debil",
    dice: "En mujeres sanas, algunos estudios ven menos contorno de cintura después de practicar.",
    matiz: "Son cinco estudios chicos y de calidad dispar. No queman grasa: si la cintura cambia, es por el tono de la faja abdominal, y no hay que esperar tallas.",
    fuente: "Revisión sistemática, Journal of Bodywork and Movement Therapies 2024.",
  },
  {
    tema: "«Bajan la presión del abdomen y suben los órganos»",
    grado: "tradicion",
    dice: "Es la explicación clásica del método y la que le da el nombre.",
    matiz: "Medida con un sensor, la presión no bajó. El suelo pélvico sí se activó. La técnica funciona, pero no por la razón con que se vende.",
    fuente: "Estudio observacional en 36 mujeres, Physiotherapy 2026.",
  },
];

export const LA_DOSIS: { que: string; cuanto: string; porQue: string }[] = [
  {
    que: "Cuántas veces",
    cuanto: "2 o más veces por semana",
    porQue: "El ensayo de dolor lumbar usó dos sesiones por semana y vio resultados. Hacerlo a diario no está probado que sea mejor.",
  },
  {
    que: "Cuánto rato",
    cuanto: "10 a 20 minutos",
    porQue: "Los ensayos no coinciden en la duración de cada sesión. En casa, lo que importa es la calidad de cada pausa; 10 a 20 minutos es un buen punto de partida.",
  },
  {
    que: "Por cuánto tiempo",
    cuanto: "8 semanas o más",
    porQue: "Casi todos los programas que mostraron cambios duraban ocho semanas. Antes de eso, lo que se nota es que la técnica sale más fácil.",
  },
  {
    que: "La pausa sin aire",
    cuanto: "De 8 a 25 segundos",
    porQue: "Los programas parten con unos 10 segundos y suben hasta 20 o 25. Lo que importa es que la costilla se abra bien, no aguantar más.",
  },
  {
    que: "Repeticiones",
    cuanto: "3 por postura",
    porQue: "Tres ciclos de pausa por postura, con respiración tranquila entremedio, es el esquema de los ensayos.",
  },
];

export const MITOS: { mito: string; realidad: string }[] = [
  {
    mito: "Los hipopresivos reemplazan los ejercicios de suelo pélvico.",
    realidad:
      "No. Para la fuerza del suelo pélvico, contraerlo a propósito funciona mejor. Los hipopresivos se pueden sumar, pero no son el reemplazo, y menos si hay escapes de orina o prolapso.",
  },
  {
    mito: "Reducen la cintura y queman grasa abdominal.",
    realidad:
      "No queman grasa: ningún ejercicio quema la grasa de una zona específica. La evidencia sobre la cintura es poca y débil. Si cambia algo, es el tono de la faja, no la grasa.",
  },
  {
    mito: "Funcionan porque crean una presión negativa que sube los órganos.",
    realidad:
      "Cuando se midió con un sensor, la presión dentro del abdomen no bajó. Lo que sí pasa es que el suelo pélvico y los músculos profundos se activan.",
  },
  {
    mito: "Cierran la diástasis abdominal.",
    realidad:
      "Los ensayos no coinciden: en uno la separación bajó lo mismo que con abdominales convencionales, en otro no bajó. Sí mejoran la función del abdomen. La diástasis la debe evaluar una kinesióloga.",
  },
  {
    mito: "Mientras más segundos aguantes sin aire, mejor.",
    realidad:
      "No. Lo que hace el trabajo es abrir bien las costillas durante la pausa. Aguantar hasta marearse no suma nada y sube la presión arterial.",
  },
  {
    mito: "Se pueden hacer en el embarazo, igual que siempre.",
    realidad:
      "La pausa sin aire no se hace en el embarazo. La postura y la respiración sin pausa sí, con el visto bueno de tu matrona.",
  },
  {
    mito: "Hay que hacerlos en ayunas estrictas.",
    realidad:
      "Con el estómago lleno cuesta y se siente mal, por eso se recomienda dejar un par de horas después de comer. Es una recomendación práctica, no algo que se haya estudiado.",
  },
  {
    mito: "Son abdominales sin esfuerzo que reemplazan el resto del ejercicio.",
    realidad:
      "Son un complemento. La fuerza muscular, el ejercicio aeróbico y moverse cada día siguen haciendo falta.",
  },
];

export const SEGURIDAD = {
  intro:
    "Son ejercicios suaves, pero la pausa sin aire sube la presión arterial por unos segundos. Por eso hay casos en que se hacen sin la pausa, y casos en que conviene esperar.",
  reglas: [
    "Si te mareas, ves puntitos, te duele la cabeza o sientes hormigueo, suelta la pausa y respira. La próxima vez, menos segundos.",
    "Nunca tomes una bocanada de aire al soltar: deja entrar el aire suave.",
    "Deja un par de horas después de comer. Con el estómago lleno cuesta y se siente mal.",
    "La pausa se hace con las costillas abiertas, nunca apretando el abdomen ni pujando hacia abajo.",
    "Si durante o después sientes peso en la vagina, escapes o dolor pélvico, para y consulta.",
  ],
  sinPausa: [
    "Embarazo: postura y respiración sí, la pausa sin aire no. Consulta primero con tu matrona.",
    "Presión alta, aunque esté controlada, o enfermedad del corazón: sin la pausa, y con el visto bueno de tu médica.",
  ],
  esperar: [
    "Parto hace menos de seis semanas, o cesárea reciente: espera el alta y, si puedes, una evaluación de suelo pélvico con una kinesióloga.",
    "Cirugía de abdomen o pelvis en los últimos tres meses: consulta a quien te operó antes de empezar.",
    "Hernia abdominal o hiatal, o enfermedad inflamatoria del intestino activa: consulta antes.",
    "Prolapso con sensación de «bolita», o escapes de orina que te complican el día: lo primero es una evaluación con una kinesióloga de suelo pélvico.",
  ],
};

export const PREGUNTAS: { p: string; r: string }[] = [
  {
    p: "¿Hipopresivos o ejercicios de Kegel?",
    r: "Si lo que buscas es fuerza en el suelo pélvico, o tienes escapes o prolapso, los ejercicios de suelo pélvico son la primera opción. Los hipopresivos se pueden sumar: mejoran los síntomas y la calidad de vida de forma parecida, y a mucha gente le resultan agradables.",
  },
  {
    p: "¿Cuándo se nota?",
    r: "Los ensayos que vieron cambios duraban unas ocho semanas, con al menos dos sesiones por semana. Las primeras semanas son de aprender: al principio la costilla casi no se abre, y eso es normal.",
  },
  {
    p: "¿Los puedo hacer después del parto?",
    r: "Sí, pasadas unas seis semanas y después del alta. Lo ideal es que antes te evalúe una kinesióloga de suelo pélvico, que puede decirte si conviene partir por ahí o por los ejercicios de suelo pélvico.",
  },
  {
    p: "Me cuesta abrir las costillas, ¿lo estoy haciendo mal?",
    r: "Es lo que más cuesta al principio. Parte acostada, con las manos en los costados de las costillas para sentir cómo se separan. Si el abdomen no se hunde nada, probablemente quedó aire: bota un poco más antes de la pausa.",
  },
  {
    p: "¿Cuántos segundos debo aguantar?",
    r: "Empieza con unos 8 a 10 segundos. Cuando te salga cómodo y la costilla se abra bien, sube de a poco. Los programas llegan a 20 o 25 segundos después de varias semanas.",
  },
  {
    p: "¿Sirven para los hombres?",
    r: "Casi todos los estudios son en mujeres, así que no se sabe bien. La técnica es la misma, pero lo que se afirma aquí vale sobre todo para mujeres.",
  },
];

export const DONDE_QUEDA =
  "Tus respuestas, tu nivel y las sesiones que llevas se guardan solo en este aparato. No se mandan a ninguna parte.";

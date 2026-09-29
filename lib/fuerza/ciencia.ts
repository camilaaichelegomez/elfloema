import { ETIQUETA_GRADO, type Grado } from "@/lib/yoga/evidencia";

/* Fuerza y masa muscular en mujeres adultas: qué se sabe.

   Esta sección existe por un hecho incómodo: la masa muscular empieza a caer
   mucho antes de lo que casi nadie cuenta, y en las mujeres hay además un
   tramo —la transición a la menopausia— en que la caída se acelera. No es
   estética. Es cuánta autonomía va a haber a los ochenta.

   Reglas de la casa, las mismas del yoga y la meditación:

   · Cada afirmación de que algo funciona lleva grado y referencia real.
   · El pero de cada estudio está escrito.
   · Los mitos del gimnasio se nombran como mitos.
   · Lo que la fuerza NO hace también está.

   Las referencias están descargadas en biblioteca-cientifica/fuerza/. */

export { ETIQUETA_GRADO };
export type { Grado };

/* ── Por qué esta sección existe ──────────────────────────── */

export const POR_QUE = [
  "A partir de los treinta la masa muscular empieza a bajar sola. Las estimaciones más citadas hablan de entre un 3% y un 8% por década, y el ritmo se acelera después de los sesenta. No se nota: se pierde poco, se gana algo de grasa en el mismo lugar, y la balanza marca casi lo mismo durante quince años.",
  "La fuerza, además, se pierde más rápido que el músculo. En el estudio que siguió a casi dos mil personas mayores durante tres años, la fuerza cayó dos o tres veces más rápido que la masa, y quienes mantuvieron o incluso ganaron masa igual perdieron fuerza. Lo que se va primero no es el tamaño: es la capacidad de usarlo.",
  "En las mujeres hay un tramo propio. Durante la transición a la menopausia, el descenso de masa magra se acelera y el hueso pierde densidad más rápido que en cualquier otro momento de la vida. Es un plazo, no una sentencia: lo que se construya antes y durante ese tramo es lo que queda después.",
  "Y la parte buena, que es la que casi no se cuenta: el músculo responde a los estímulos a cualquier edad. Se ha medido hipertrofia en personas de setenta, de ochenta y de noventa años. Empezar tarde es peor que empezar temprano, y muchísimo mejor que no empezar.",
];

export const EN_UNA_LINEA =
  "El músculo se pierde desde los treinta si nadie le pide nada. Pedírselo dos o tres veces por semana, con el propio cuerpo, alcanza.";

/* ── Qué pasa cuando entrenas ─────────────────────────────── */

export type Mecanismo = { titulo: string; dice: string; pero: string; fuente?: string };

export const QUE_PASA: Mecanismo[] = [
  {
    titulo: "Tensión, no cansancio",
    dice:
      "Lo que le dice a un músculo que crezca es la tensión mecánica: fibras trabajando cerca de su límite, repetición tras repetición. Por eso importa tanto llegar cerca del fallo y tan poco terminar empapada. Un ejercicio que te deja sin aire pero no carga el músculo entrena el corazón, no el bíceps.",
    pero:
      "«Cerca del fallo» no quiere decir al fallo siempre: la revisión sobre cuán cerca hay que llegar encontró hipertrofia parecida llegando al fallo o parándose unas repeticiones antes, con menos fatiga en el segundo caso.",
    fuente:
      "Refalo et al. (2023), Influence of resistance training proximity-to-failure on skeletal muscle hypertrophy, Sports Medicine 53(3):649-665",
  },
  {
    titulo: "El músculo se construye después, no durante",
    dice:
      "El entrenamiento rompe y señaliza; la construcción ocurre en las horas y días siguientes, con la síntesis de proteína elevada entre veinticuatro y cuarenta y ocho horas. Por eso el descanso y la comida no son el complemento del entrenamiento: son la mitad del entrenamiento.",
    pero:
      "Esa ventana es la razón de entrenar cada músculo al menos dos veces por semana, y no de comer proteína en los treinta minutos siguientes: esa «ventana anabólica» estrecha no se sostiene con los datos actuales.",
  },
  {
    titulo: "Primero manda el sistema nervioso",
    dice:
      "Las primeras semanas se gana fuerza muy rápido sin que el músculo crezca casi nada: lo que mejora es la coordinación, cuántas fibras se reclutan y a qué velocidad. Por eso al mes ya levantas más y todavía no se ve nada en el espejo.",
    pero:
      "Es la etapa en la que mucha gente abandona porque «no pasa nada». Está pasando: el tamaño empieza a moverse alrededor de las ocho a doce semanas.",
  },
  {
    titulo: "No hace falta hierro, hace falta dificultad",
    dice:
      "La carga puede venir del peso o de la palanca. Una flexión en la pared y una con los pies en alto son el mismo movimiento con cargas muy distintas. Cuando las series se llevan cerca del fallo, la hipertrofia con cargas bajas es parecida a la de cargas altas.",
    pero:
      "Para la fuerza máxima pura, el peso alto sigue siendo mejor. Y hay un piso: con cargas muy livianas (por debajo de un 30% de lo máximo) la cosa deja de funcionar aunque llegues al fallo.",
    fuente:
      "Schoenfeld, Grgic, Ogborn & Krieger (2017), Strength and hypertrophy adaptations between low- vs. high-load resistance training, Journal of Strength and Conditioning Research 31(12):3508-3523",
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
    tema: "Las mujeres ganan músculo igual de bien",
    grado: "probado",
    dice:
      "El metaanálisis que comparó hombres y mujeres entrenando lo mismo no encontró diferencias en la hipertrofia relativa. En fuerza del tren superior, las mujeres ganaron relativamente más. Lo que difiere es el punto de partida y la cantidad absoluta de kilos, no la capacidad de responder.",
    matiz:
      "Relativo no es absoluto: con menos masa de partida, el mismo porcentaje son menos kilos. Y la mayoría de los estudios son de doce a veinticuatro semanas, así que del largo plazo se sabe menos.",
    fuente:
      "Roberts, Nuckols & Krieger (2020), Sex differences in resistance training: a systematic review and meta-analysis, Journal of Strength and Conditioning Research 34(5):1448-1460",
    carpeta: "fuerza/mujeres_hipertrofia",
  },
  {
    tema: "Con el propio cuerpo se construye músculo",
    grado: "prometedor",
    dice:
      "Un programa progresivo de flexiones produjo aumentos de grosor muscular y de fuerza comparables a los del press de banca con barra en el mismo periodo. Y la literatura de cargas bajas muestra que, llevando las series cerca del fallo, la hipertrofia es parecida con mucho o con poco peso.",
    matiz:
      "El estudio de las flexiones fue corto y con pocos participantes. Y la calistenia tiene un techo real: para seguir progresando hay que ir cambiando de peldaño, y para algunos patrones —tirar hacia abajo, sobre todo— hace falta al menos una barra o una banda.",
    fuente:
      "Kotarsky et al. (2018), Effect of progressive calisthenic push-up training on muscle strength and thickness, Journal of Strength and Conditioning Research 32(3):651-659",
    carpeta: "fuerza/calistenia",
  },
  {
    tema: "Cuánto: más series, más músculo (hasta cierto punto)",
    grado: "probado",
    dice:
      "Hay una relación dosis-respuesta clara: por debajo de cinco series semanales por grupo muscular se gana poco; entre cinco y nueve, bastante más; con diez o más, más todavía. El punto de partida útil son unas diez series semanales por grupo.",
    matiz:
      "La curva se aplana y en algún punto el volumen extra solo agrega fatiga. Y hay dosis mínimas que funcionan: revisiones sobre el mínimo efectivo encuentran mejoras de fuerza con muy poco volumen, siempre que ese poco sea exigente.",
    fuente:
      "Schoenfeld, Ogborn & Krieger (2017), Dose-response relationship between weekly resistance training volume and increases in muscle mass, Journal of Sports Sciences 35(11):1073-1082",
    carpeta: "fuerza/dosis",
  },
  {
    tema: "Cada cuánto: dos veces por semana por músculo",
    grado: "probado",
    dice:
      "Entrenar un grupo muscular dos veces por semana produce más hipertrofia que una sola, igualando el volumen total. Tres no mostró ventaja clara sobre dos.",
    matiz:
      "Lo que manda es el volumen semanal total; la frecuencia es sobre todo la forma de repartirlo sin que cada sesión sea eterna. Dos sesiones de cuerpo completo cumplen.",
    fuente:
      "Schoenfeld, Ogborn & Krieger (2016), Effects of resistance training frequency on measures of muscle hypertrophy, Sports Medicine 46(11):1689-1697",
    carpeta: "fuerza/dosis",
  },
  {
    tema: "Proteína: alrededor de 1,6 g por kilo al día",
    grado: "probado",
    dice:
      "El metaanálisis de referencia encontró que suplementar proteína aumenta la masa magra y la fuerza ganadas con el entrenamiento, y que el beneficio deja de crecer alrededor de 1,6 gramos por kilo de peso al día. Sin entrenamiento, la proteína sola no hace nada.",
    matiz:
      "Es proteína total del día, no polvos: la comida cuenta igual. Y el umbral es un promedio con bastante variación entre personas; en adultos mayores suele hacer falta algo más por comida para disparar la síntesis.",
    fuente:
      "Morton et al. (2018), A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength, British Journal of Sports Medicine 52(6):376-384",
    carpeta: "fuerza/proteina",
  },
  {
    tema: "Hueso: sirve, pero tiene que ser exigente",
    grado: "prometedor",
    dice:
      "En mujeres posmenopáusicas con masa ósea baja, un programa de fuerza de alta intensidad e impacto, supervisado y de solo treinta minutos dos veces por semana, mejoró la densidad ósea de columna y cadera, y la altura, frente al grupo control. Y resultó seguro.",
    matiz:
      "«Alta intensidad» es literal: cargas pesadas con técnica supervisada. Los programas suaves de este tipo mejoran poco el hueso, aunque sirvan para otras cosas. Lo que hay en esta app ayuda al músculo mucho más que al hueso.",
    fuente:
      "Watson et al. (2018), High-intensity resistance and impact training improves bone mineral density and physical function in postmenopausal women with osteopenia and osteoporosis: the LIFTMOR randomized controlled trial, Journal of Bone and Mineral Research 33(2):211-220",
    carpeta: "fuerza/hueso",
  },
  {
    tema: "Vivir más y mejor",
    grado: "probado",
    dice:
      "En el metaanálisis de estudios de cohorte, hacer actividades de fortalecimiento muscular se asoció a un 10-17% menos de mortalidad por cualquier causa y de riesgo de enfermedad cardiovascular, cáncer y diabetes. El máximo beneficio apareció entre treinta y sesenta minutos a la semana.",
    matiz:
      "Son estudios observacionales: muestran asociación, no causa, y quien entrena fuerza suele hacer también otras cosas. Y el dato de las curvas en J —que más de una hora semanal no agregó beneficio en mortalidad total— conviene tomarlo con calma: es poca evidencia.",
    fuente:
      "Momma et al. (2022), Muscle-strengthening activities are associated with lower risk and mortality in major non-communicable diseases, British Journal of Sports Medicine 56(13):755-763",
    carpeta: "fuerza/metabolico",
  },
  {
    tema: "Ánimo",
    grado: "probado",
    dice:
      "El metaanálisis de 33 ensayos con casi dos mil personas encontró que el entrenamiento de fuerza reduce los síntomas depresivos, con un efecto moderado, y que la mejora no dependió de cuánta fuerza se ganara.",
    matiz:
      "Buena parte de los estudios comparan contra no hacer nada. No reemplaza tratamiento, y el efecto es parecido al del ejercicio aeróbico: lo que importa es hacer algo que se sostenga.",
    fuente:
      "Gordon et al. (2018), Association of efficacy of resistance exercise training with depressive symptoms, JAMA Psychiatry 75(6):566-576",
    carpeta: "fuerza/metabolico",
  },
  {
    tema: "Perder grasa sin perder músculo",
    grado: "prometedor",
    dice:
      "En un déficit de calorías se pierde grasa y también músculo. Entrenar fuerza y comer suficiente proteína es lo que más reduce esa pérdida de masa magra, y en algunos ensayos permite ganar algo de músculo mientras se pierde grasa.",
    matiz:
      "Ganar músculo y perder grasa a la vez ocurre sobre todo en personas sin entrenamiento previo o que vuelven después de una pausa. Con años de entrenamiento encima, es mucho más difícil y lento.",
    fuente:
      "Revisiones de composición corporal y entrenamiento de fuerza recopiladas en la carpeta; ver también Morton et al. (2018)",
    carpeta: "fuerza/metabolico",
  },
  {
    tema: "Menopausia",
    grado: "prometedor",
    dice:
      "Las revisiones de intervenciones no farmacológicas para prevenir la sarcopenia en mujeres en la menopausia encuentran que el ejercicio —y en particular el de fuerza— mejora masa muscular y función física.",
    matiz:
      "Los estudios son heterogéneos y muchos son chicos. Lo que no está claro es cuánto del deterioro es la edad y cuánto son las hormonas: se separan mal. Lo que sí está claro es qué hacer al respecto.",
    fuente:
      "Revisión sistemática y metaanálisis sobre intervenciones no farmacológicas y sarcopenia en mujeres menopáusicas, BMC Women's Health, 2023",
    carpeta: "fuerza/menopausia",
  },
  {
    tema: "Seguridad",
    grado: "prometedor",
    dice:
      "El entrenamiento de fuerza tiene tasas de lesión bajas comparado con la mayoría de los deportes, y con el peso corporal el riesgo es todavía menor: la carga no puede caerse encima de nadie.",
    matiz:
      "Bajo no es cero. La mayoría de las lesiones vienen de subir demasiado rápido, de la técnica en ejercicios que no se dominan, y de ignorar molestias que llevaban semanas avisando.",
    fuente: "Keogh & Winwood (2017), The epidemiology of injuries across the weight-training sports, Sports Medicine 47(3):479-501",
    carpeta: "fuerza/seguridad",
  },
];

/* ── La dosis, en números ─────────────────────────────────── */

export const LA_DOSIS = [
  { que: "Sesiones por semana", cuanto: "2 a 4", porQue: "Con dos de cuerpo completo cada músculo ya se entrena dos veces, que es lo que muestra más hipertrofia que una." },
  { que: "Series por grupo muscular a la semana", cuanto: "10 o más", porQue: "Por debajo de cinco se gana poco; de diez para arriba es donde están los mejores resultados de la curva dosis-respuesta." },
  { que: "Repeticiones por serie", cuanto: "5 a 30", porQue: "Con las series llevadas cerca del fallo, el rango importa mucho menos de lo que se cree. Con peso corporal se suele trabajar arriba: de 8 a 20." },
  { que: "Cuán cerca del fallo", cuanto: "Que sobren 0 a 3", porQue: "Si al terminar te sobraban cinco repeticiones, el estímulo fue flojo. Si llegaste al fallo en todas las series, pagas fatiga sin ganar más." },
  { que: "Descanso entre series", cuanto: "90 a 180 segundos", porQue: "Descansar más de dos minutos dio mejores resultados en fuerza e hipertrofia que descansar uno. Apurarse no ahorra tiempo: quita repeticiones." },
  { que: "Velocidad", cuanto: "2 seg al bajar, 1 al subir", porQue: "La bajada controlada es donde se produce buena parte del daño que después se repara. Dejarse caer es media repetición." },
  { que: "Proteína al día", cuanto: "1,6 g por kilo", porQue: "Ahí se aplana el beneficio. Para 65 kilos son unos 105 gramos, repartidos entre las comidas." },
  { que: "Cuándo se nota", cuanto: "Fuerza: 3-4 semanas · Tamaño: 8-12", porQue: "Las primeras semanas mejora el sistema nervioso, no el músculo. Eso desanima a mucha gente justo antes de que empiece lo bueno." },
];

/* ── Cómo subir ───────────────────────────────────────────── */

export const COMO_SUBIR = [
  "El principio se llama sobrecarga progresiva y es lo único que de verdad hace crecer un músculo: la próxima vez, un poquito más de lo que ya puedes hacer cómodamente.",
  "Con peso corporal ese «más» tiene cinco formas, en este orden: más repeticiones, más series, más lento al bajar, más rango, y por último un ejercicio más difícil.",
  "La app lleva la cuenta por ti: cuando llegas al tope del rango en todas las series de un ejercicio, te sube al siguiente peldaño de esa escalera.",
  "Al cambiar de peldaño vas a hacer muchas menos repeticiones, y está bien. Es el mismo músculo con más carga.",
  "Si un peldaño se te atraganta tres sesiones seguidas, vuelve al anterior y quédate dos semanas más. No es retroceder: es la única forma que hay de avanzar sin lesionarse.",
];

/* ── Proteína, en la práctica ─────────────────────────────── */

export const PROTEINA = {
  intro:
    "El entrenamiento pide la construcción; la proteína pone los ladrillos. Sin lo segundo, lo primero rinde la mitad, y esta es la parte que más se descuida en las mujeres adultas.",
  cuanto:
    "Alrededor de 1,6 gramos por kilo de peso al día, que es donde el beneficio deja de crecer en el metaanálisis de referencia. Para 60 kilos son unos 96 gramos; para 70, unos 112.",
  reparto:
    "Repartida entre tres o cuatro comidas, con al menos 20 o 30 gramos en cada una, funciona mejor que concentrarla en la cena. Con los años hace falta algo más por comida para disparar la misma respuesta.",
  ejemplos: [
    "Un huevo: 6 g. Dos huevos: 12 g.",
    "Una taza de legumbres cocidas: 15 g.",
    "Un filete de pollo del tamaño de la palma: 30 g.",
    "Un tarro de atún: 25 g.",
    "Un yogur griego natural: 15 g.",
    "Cien gramos de tofu firme: 15 g.",
    "Un puñado de almendras: 6 g.",
  ],
  ojo:
    "En personas con los riñones sanos no hay evidencia de que estas cantidades hagan daño. Con enfermedad renal la historia es otra y lo dice tu médica, no una app.",
};

/* ── Mitos ────────────────────────────────────────────────── */

export const MITOS = [
  {
    mito: "Vas a quedar musculosa como un hombre.",
    realidad:
      "No con este tipo de entrenamiento y no con esta fisiología: las mujeres tienen una fracción de la testosterona, y ganar volumen visible cuesta años de trabajo deliberado. Lo que sí pasa en unos meses es que se ve más firme lo que ya hay, que es exactamente lo que casi todas quieren y llaman «tonificar».",
  },
  {
    mito: "Primero hay que bajar grasa y después tonificar.",
    realidad:
      "«Tonificar» no es nada: hay músculo y hay grasa. Lo que se ve firme es músculo con menos grasa encima. Y si bajas de peso sin entrenar fuerza, una parte importante de lo que pierdes es músculo, que es justo lo que no quieres perder.",
  },
  {
    mito: "Haciendo abdominales se baja la barriga.",
    realidad:
      "La reducción localizada no existe: los estudios que midieron semanas de ejercicio abdominal no encontraron reducción de grasa abdominal frente al control. El abdomen se entrena para que sostenga la columna, no para adelgazar por zonas.",
  },
  {
    mito: "Si no quedé con agujetas, no sirvió.",
    realidad:
      "El dolor muscular tardío no es una medida de cuánto creció el músculo. Aparece sobre todo con ejercicios nuevos y baja a medida que te acostumbras, mientras sigues progresando. Usar las agujetas de brújula lleva a cambiar de rutina todo el rato, que es lo contrario de lo que funciona.",
  },
  {
    mito: "Más de doce repeticiones es resistencia, no músculo.",
    realidad:
      "Ese corte viene de los manuales de los años setenta. Cuando las series se llevan cerca del fallo, la hipertrofia es parecida entre cinco y treinta repeticiones. Lo que sí depende del rango es la fuerza máxima, que mejora más con cargas altas.",
  },
  {
    mito: "Después de los cuarenta ya no se gana músculo.",
    realidad:
      "Se gana a los cuarenta, a los sesenta y a los ochenta. Se gana algo más lento y hace falta un poco más de proteína, pero la capacidad de responder no se apaga. Hay ensayos con hipertrofia medida en personas de más de noventa años.",
  },
  {
    mito: "Hay que entrenar todos los días.",
    realidad:
      "El músculo se construye en el descanso. Dos o tres sesiones bien hechas por semana le ganan a seis a medias, y dejan espacio para caminar, para el yoga y para tener una vida.",
  },
  {
    mito: "Sin gimnasio no se puede.",
    realidad:
      "Se puede bastante más de lo que se cree, sobre todo al empezar: el propio cuerpo sobra para los primeros meses y, con progresiones, para bastante más. Donde el gimnasio gana claro es en las piernas avanzadas y en la carga pesada para el hueso.",
  },
  {
    mito: "El ácido láctico causa las agujetas.",
    realidad:
      "El lactato se limpia en menos de una hora. Las agujetas aparecen entre las doce y las cuarenta y ocho horas y tienen que ver con microdaño e inflamación, no con el lactato.",
  },
  {
    mito: "Si dejo de entrenar, el músculo se convierte en grasa.",
    realidad:
      "Son tejidos distintos; uno no se transforma en el otro. Lo que pasa al dejar es que el músculo se achica y, si se come igual, la grasa aumenta. Se ve parecido y no es lo mismo.",
  },
];

/* ── Seguridad ────────────────────────────────────────────── */

export const SEGURIDAD = {
  intro:
    "El entrenamiento de fuerza es de las cosas más seguras que puedes hacer con tu cuerpo, y eso no significa que se pueda hacer de cualquier manera.",
  reglas: [
    "Sube de peldaño solo cuando el actual sale completo y limpio. La prisa es la causa número uno de lesión en esto.",
    "La molestia del músculo trabajando se puede sostener. El dolor agudo, punzante o dentro de una articulación es señal de parar ese ejercicio hoy.",
    "No aguantes la respiración en el esfuerzo. Suelta el aire al empujar o tirar: sube menos la presión dentro del abdomen, que importa mucho para el suelo pélvico.",
    "Un día de descanso entre sesiones que trabajan lo mismo. Las agujetas fuertes son señal de que la próxima empiece más suave, no de que vayas más fuerte.",
    "Si algo duele igual tres sesiones seguidas, deja de buscar en internet y pide que te vean.",
  ],
  cuando: [
    "Suelo pélvico: si hay pérdidas de orina, pesadez o prolapso, esto se conversa con una kinesióloga especializada antes de cargar. El entrenamiento del propio suelo pélvico tiene evidencia sólida y es otra cosa distinta a lo que hay acá.",
    "Posparto: conviene que alguien revise la línea alba antes de volver a planchas y a cargar. No hay una fecha mágica; hay una revisión.",
    "Embarazo: entrenar fuerza está recomendado en un embarazo sin complicaciones, con ajustes. Los ajustes los pone quien te controla.",
    "Presión alta, problemas de corazón, cirugía reciente, osteoporosis diagnosticada: hay versiones para todo, pero el visto bueno no lo da una app.",
  ],
};

/* ── Preguntas ────────────────────────────────────────────── */

export const PREGUNTAS = [
  {
    p: "¿Cuánto tardo en notar algo?",
    r: "Fuerza, entre tres y cuatro semanas: vas a hacer más repeticiones del mismo ejercicio. Cambios de tamaño visibles, entre ocho y doce semanas. La ropa suele avisar antes que el espejo.",
  },
  {
    p: "¿Tengo que dejar el cardio o el yoga?",
    r: "No. Lo que conviene es no hacer una sesión de cardio duro justo antes de la de fuerza, porque llegas con menos. Caminar, yoga y fuerza conviven perfecto: entrenan cosas distintas.",
  },
  {
    p: "¿Y si tengo poco tiempo?",
    r: "Quince minutos dos veces por semana, bien exigentes, ya construyen músculo. La sesión más corta que haces es infinitamente mejor que la de una hora que no haces.",
  },
  {
    p: "¿Sirve si estoy bajando de peso?",
    r: "Sirve más que nunca: en un déficit se pierde grasa y también músculo, y el entrenamiento de fuerza con proteína suficiente es lo que más reduce esa pérdida. Sin él, una parte grande de lo que baja la balanza es músculo.",
  },
  {
    p: "¿Cuánto descanso entre series?",
    r: "Noventa segundos a tres minutos. Descansar más de dos minutos dio mejores resultados que descansar uno: apurarse te quita repeticiones, y las repeticiones son el estímulo.",
  },
  {
    p: "¿Tengo que llegar al fallo?",
    r: "No siempre. Que te sobren entre cero y tres repeticiones está bien. Al fallo en todas las series suma fatiga y no suma músculo proporcional; quedarte a cinco de distancia sí se queda corto.",
  },
  {
    p: "¿Qué hago con la regla?",
    r: "Entrenar. La evidencia sobre ajustar el entrenamiento según la fase del ciclo es débil y contradictoria. Si un día te sientes peor, baja la exigencia ese día; la regla general la pone cómo te sientes, no un calendario.",
  },
  {
    p: "¿Necesito polvos de proteína?",
    r: "No. Es comida, no medicina: el batido es una forma cómoda de llegar al total del día si no llegas comiendo. Lo que importa es el total, no el envase.",
  },
  {
    p: "¿Y la creatina?",
    r: "Es de los pocos suplementos con evidencia real para fuerza y masa magra, también en mujeres y en adultos mayores. Antes de nada: primero entrenar y comer suficiente proteína, que es de donde viene casi todo el resultado.",
  },
  {
    p: "¿Cuándo voy a necesitar gimnasio?",
    r: "Para masa muscular, cuando las progresiones en casa se te acaben, y eso tarda bastante más de lo que se cree. Para el hueso, antes: el programa que mejoró densidad ósea usaba cargas pesadas supervisadas.",
  },
];

export const DONDE_QUEDA =
  "Lo que entrenas se guarda en este aparato: el peldaño de cada movimiento y lo que hiciste cada día. Con cuenta, te sigue al teléfono y al computador.";

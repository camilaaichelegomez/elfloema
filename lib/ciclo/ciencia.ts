/* El ciclo menstrual: lo que dice la evidencia.

   Las fuentes son guías clínicas de sociedades médicas (ACOG, FIGO, NICE,
   Endocrine Society, The Menopause Society, la guía internacional de SOP),
   revisiones sistemáticas y estudios grandes publicados en revistas con
   revisión por pares. Nada sale de páginas que venden suplementos, tests de
   hormonas o planes de «equilibrio hormonal»: es justo el terreno donde más
   se promete.

   La misma información alimenta la app (lib/ciclo/registro.ts), así que lo
   que la app aconseja y lo que la biblioteca explica no se pueden
   contradecir. */

export type Grado = "probado" | "prometedor" | "debil" | "tradicion";

export const EN_UNA_LINEA =
  "El ciclo es una conversación entre el cerebro y los ovarios que se repite cada tres a cinco semanas. Conocerlo ayuda a entender el cuerpo y a notar a tiempo cuando algo cambia, pero no hay que «sincronizar» la vida con él.";

export const QUE_ES = [
  "Cada ciclo empieza el primer día de la regla y termina el día antes de la siguiente. En ese tiempo, el hipotálamo (en el cerebro) le habla a la hipófisis, la hipófisis le habla a los ovarios con dos hormonas, FSH y LH, y los ovarios contestan con estrógenos y progesterona. Lo que contestan los ovarios regula, a su vez, lo que manda el cerebro: es un circuito que se ajusta solo.",
  "El propósito del ciclo es madurar un óvulo, liberarlo y preparar el útero por si hay embarazo. Si no lo hay, las hormonas caen, el revestimiento del útero se desprende y empieza la regla. Pero sus efectos llegan mucho más allá del útero: los estrógenos cuidan los huesos, los vasos sanguíneos, la piel y el cerebro.",
  "Por eso el Colegio Americano de Ginecología (ACOG) pide mirar el ciclo como un signo vital, igual que la presión o el pulso: cuando cambia mucho, suele estar diciendo algo de la salud general.",
];

/* ── Las cuatro fases ─────────────────────────────────────── */

export type Fase = "menstrual" | "folicular" | "ovulatoria" | "lutea";

export const FASES: {
  id: Fase;
  nombre: string;
  cuando: string;
  hormonas: string;
  cuerpo: string;
}[] = [
  {
    id: "menstrual",
    nombre: "Menstruación",
    cuando: "Del día 1 a los días 3 a 8",
    hormonas:
      "Estrógenos y progesterona están en su punto más bajo. Justo antes y al inicio de la regla sube la FSH, que despierta a un grupo de folículos en los ovarios.",
    cuerpo:
      "El útero se contrae para desprender su revestimiento, con la ayuda de unas sustancias llamadas prostaglandinas: son las que dan los cólicos. Es normal sentir más cansancio, sobre todo si el sangrado es abundante.",
  },
  {
    id: "folicular",
    nombre: "Fase folicular",
    cuando: "Desde la regla hasta la ovulación (dura lo que más varía entre una mujer y otra)",
    hormonas:
      "Un folículo se adelanta a los demás y fabrica cada vez más estradiol, el estrógeno principal. El estradiol engrosa el revestimiento del útero y vuelve el flujo vaginal más claro y elástico a medida que se acerca la ovulación.",
    cuerpo:
      "Muchas mujeres se sienten con más energía y ánimo, pero no todas: la variación entre personas es mayor que la variación entre fases.",
  },
  {
    id: "ovulatoria",
    nombre: "Ovulación",
    cuando: "Unos 12 a 14 días antes de la regla siguiente, no el día 14 del ciclo",
    hormonas:
      "Cuando el estradiol llega a su máximo, el cerebro responde con una subida brusca de LH (y algo de FSH). Unas 24 a 36 horas después, el folículo suelta el óvulo. La testosterona también sube un poco por estos días.",
    cuerpo:
      "Algunas notan un dolor leve a un costado del bajo vientre, flujo como clara de huevo o más deseo sexual. Los días fértiles son los cinco anteriores a la ovulación y el día de la ovulación.",
  },
  {
    id: "lutea",
    nombre: "Fase lútea",
    cuando: "Desde la ovulación hasta la regla: unos 12 a 14 días, bastante estable",
    hormonas:
      "El folículo vacío se transforma en el cuerpo lúteo y fabrica progesterona, que llega a su máximo a mitad de esta fase; el estradiol hace un segundo pico más bajo. Si no hay embarazo, el cuerpo lúteo se apaga a los 10 a 14 días, las dos hormonas caen y viene la regla.",
    cuerpo:
      "La progesterona sube la temperatura del cuerpo unas décimas y puede dar algo más de hambre. En los últimos días, con la caída de las hormonas, aparecen los síntomas premenstruales en quienes los tienen.",
  },
];

/* Los números de lo normal: FIGO para la edad adulta y ACOG para la
   adolescencia. */
export const LO_NORMAL: { que: string; adulta: string; adolescente: string }[] = [
  { que: "Cada cuánto llega la regla", adulta: "Cada 24 a 38 días", adolescente: "Cada 21 a 45 días" },
  { que: "Cuántos días dura", adulta: "Hasta 8 días", adolescente: "Hasta 7 días" },
  {
    que: "Cuánto cambia de un ciclo a otro",
    adulta: "Hasta 7 a 9 días entre el ciclo más corto y el más largo",
    adolescente: "Es normal que varíe más los primeros años",
  },
  {
    que: "Cuánto sangra",
    adulta: "Lo que no interfiere con tu vida: si te obliga a cambiarte de noche o a faltar, es abundante",
    adolescente: "Igual: empapar una toalla o tampón cada una o dos horas es demasiado",
  },
];

export const DATOS_DEL_CICLO = [
  "En más de 600.000 ciclos registrados, el ciclo promedio duró 29,3 días, pero solo una de cada ocho mujeres tenía ciclos de exactamente 28 días.",
  "La fase que más cambia es la folicular: en promedio dura 17 días, pero puede ir de 10 a 30. La lútea es más estable, de unos 12 a 14.",
  "Por eso la ovulación cae en días muy distintos: solo en tres de cada diez mujeres los días fértiles quedan entre el día 10 y el 17 del ciclo.",
  "Entre los 25 y los 45 años, el ciclo se acorta poco a poco, unas dos décimas de día por año, sobre todo porque se acorta la fase folicular.",
];

/* ── A lo largo de la vida ─────────────────────────────── */

export const ETAPAS_DE_LA_VIDA: { etapa: string; edad: string; hormonas: string; que_se_nota: string }[] = [
  {
    etapa: "Pubertad y primeros años de regla",
    edad: "La primera regla llega en promedio a los 12 o 13 años",
    hormonas:
      "El cerebro está aprendiendo a dar la señal de la ovulación. Los primeros años muchos ciclos no ovulan, y sin ovulación no hay progesterona.",
    que_se_nota:
      "Ciclos irregulares, de 21 a 45 días, que se ordenan en dos a tres años: al tercer año, entre seis y ocho de cada diez ciclos duran de 21 a 34 días. No llegar a la primera regla a los 15 años merece consulta.",
  },
  {
    etapa: "Edad reproductiva",
    edad: "De los 20 a fines de los 30, más o menos",
    hormonas:
      "El circuito está maduro: casi todos los ciclos ovulan y el patrón de cada mujer se vuelve bastante predecible.",
    que_se_nota:
      "Es la etapa en que mejor funciona llevar el calendario: un cambio claro en tu patrón habitual es una señal que vale la pena mirar.",
  },
  {
    etapa: "Fin de la etapa reproductiva",
    edad: "Fines de los 30 y comienzos de los 40",
    hormonas:
      "Quedan menos folículos: baja la hormona antimülleriana (AMH) y la inhibina B. La FSH empieza a subir para compensar.",
    que_se_nota:
      "Ciclos un poco más cortos, a veces regla más abundante o más escasa. Todavía regulares.",
  },
  {
    etapa: "Perimenopausia (la transición)",
    edad: "Suele empezar a mediados de los 40 y dura varios años",
    hormonas:
      "No es que los estrógenos bajen de a poco: suben y bajan bruscamente. En cerca de un tercio de los ciclos hay un pico de estradiol fuera de lugar, en plena fase lútea. La progesterona baja porque se ovula menos.",
    que_se_nota:
      "Primero, ciclos que cambian siete días o más respecto de lo habitual; después, saltos de 60 días o más sin regla. Aparecen bochornos, sudores de noche, peor sueño, cambios de ánimo y reglas a veces muy abundantes.",
  },
  {
    etapa: "Menopausia",
    edad: "Se confirma tras 12 meses sin regla; la edad promedio ronda los 50 a 51",
    hormonas:
      "Los ovarios dejan de ovular y de fabricar estradiol en cantidad. La FSH queda alta. Antes de los 40 se llama insuficiencia ovárica prematura, y siempre se consulta.",
    que_se_nota: "La regla se acaba. Los síntomas de la transición pueden seguir un tiempo.",
  },
  {
    etapa: "Posmenopausia",
    edad: "El resto de la vida",
    hormonas:
      "Estrógenos bajos y estables. El cuerpo sigue fabricando pequeñas cantidades a partir de otras hormonas, sobre todo en el tejido graso.",
    que_se_nota:
      "En los primeros cinco a diez años se pierde hueso más rápido (hasta un 2 % al año), cambia el riesgo cardiovascular y pueden aparecer sequedad vaginal y molestias urinarias, que tienen tratamiento. Cualquier sangrado después de un año sin regla se consulta.",
  },
];

/* ── Cuando algo se desordena ─────────────────────────── */

export const SOBRE_EL_DESBALANCE = [
  "«Desbalance hormonal» no es un diagnóstico médico: es una forma de decir que algo del ciclo o de los síntomas no está bien. Detrás puede haber cosas muy distintas, con causas y tratamientos distintos, y vale la pena llamarlas por su nombre.",
  "Un examen de «hormonas» hecho cualquier día dice poco, porque las hormonas cambian todo el mes. Los médicos piden cada examen en un día específico del ciclo, y solo cuando hay una pregunta concreta que responder.",
];

export const DESORDENES: { nombre: string; senales: string; que_es: string; que_hacer: string; fuente: string }[] = [
  {
    nombre: "Síntomas premenstruales (SPM) y trastorno disfórico premenstrual (TDPM)",
    senales:
      "Hinchazón, mamas sensibles, irritabilidad, tristeza, ansiedad o antojos en los días antes de la regla, que se van cuando empieza o a los pocos días.",
    que_es:
      "Casi todas notan algo; entre dos y cuatro de cada diez tienen síntomas que molestan de verdad, y alrededor de 3 de cada 100 tienen la forma severa (TDPM), con un ánimo que cambia la vida. No es que las hormonas estén «altas» o «bajas»: el cerebro de algunas mujeres reacciona más a los cambios normales.",
    que_hacer:
      "Anotar los síntomas dos ciclos seguidos (la app sirve para eso: así se confirma que van con el ciclo). Ayudan el ejercicio regular, dormir bien y el calcio (1.000 a 1.200 mg al día, mejor de la comida). Si el ánimo cambia tanto que afecta tu vida, existen tratamientos eficaces: terapia cognitivo-conductual, algunos antidepresivos (incluso tomados solo en la segunda mitad del ciclo) y ciertos anticonceptivos.",
    fuente: "ACOG, guía clínica de trastornos premenstruales, 2023; metaanálisis de prevalencia de TDPM, 2024.",
  },
  {
    nombre: "Regla dolorosa (dismenorrea)",
    senales: "Cólicos en el bajo vientre que empiezan con la regla y duran uno a tres días.",
    que_es:
      "El dolor común viene de las prostaglandinas, que hacen contraerse al útero. Si el dolor no se calma con los remedios habituales, te hace faltar a tus cosas, empeora con los años o aparece también al tener relaciones o ir al baño, puede haber endometriosis: afecta a 1 de cada 10 mujeres y suele tardar años en diagnosticarse.",
    que_hacer:
      "Calor local, ejercicio regular (no solo esos días) y antiinflamatorios como el ibuprofeno, que bloquean las prostaglandinas, si te los puedes tomar. El jengibre alivió el dolor más que un placebo en varios ensayos. Si el dolor no cede o te limita, consulta: no es normal que la regla te deje en cama.",
    fuente: "Revisión Cochrane de ejercicio para la dismenorrea, 2019; metaanálisis de jengibre, 2021; OMS, endometriosis.",
  },
  {
    nombre: "Sangrado abundante",
    senales:
      "Cambiar la toalla o el tampón cada una o dos horas, coágulos grandes, tener que levantarte de noche a cambiarte, regla de más de 8 días, cansancio y ahogo.",
    que_es:
      "Le pasa a una de cada cuatro o cinco mujeres en algún momento, y es la causa más común de falta de hierro y anemia en mujeres jóvenes. Puede venir de miomas, pólipos, problemas de coagulación, de la tiroides o de ciclos sin ovulación (frecuentes en la adolescencia y la perimenopausia).",
    que_hacer:
      "Consultar: se pide un hemograma y la ferritina, y hay tratamientos que reducen mucho el sangrado. Mientras, comer hierro (ver más abajo) y no esperar a sentirse agotada.",
    fuente: "NICE, guía NG88 de sangrado menstrual abundante; FIGO 2018.",
  },
  {
    nombre: "Ciclos irregulares o que desaparecen",
    senales: "Reglas cada menos de 24 días o cada más de 38, que varían mucho, o que dejan de llegar tres meses o más.",
    que_es:
      "Lo primero es descartar un embarazo. Después, las causas más comunes son: el síndrome de ovario poliquístico (SOP), que afecta a 1 de cada 8 a 10 mujeres y junta ciclos irregulares con exceso de hormonas masculinas (acné, vello) o con ovarios poliquísticos; la amenorrea hipotalámica, cuando el cerebro «apaga» el ciclo por comer poco para lo que se gasta, mucho ejercicio o estrés; la tiroides; y la prolactina alta.",
    que_hacer:
      "Consultar para encontrar la causa, porque cada una se trata distinto. En el SOP, el estilo de vida (moverse, comer bien, dormir) es la base del tratamiento, sin una dieta especial. En la amenorrea hipotalámica, lo que la revierte es comer lo suficiente y bajar la carga, y no basta con tomar anticonceptivos para «que vuelva la regla».",
    fuente: "Guía internacional de SOP, 2023; Endocrine Society, guía de amenorrea hipotalámica funcional, 2017.",
  },
  {
    nombre: "Los síntomas de la perimenopausia",
    senales: "Bochornos, sudores de noche, insomnio, cambios de ánimo, niebla mental, reglas impredecibles, a partir de los 40.",
    que_es:
      "Son la respuesta del cuerpo a los vaivenes de estradiol, no una enfermedad. Duran en promedio varios años, y en algunas mujeres más de una década.",
    que_hacer:
      "Hay mucho que se puede hacer. Para los bochornos, la terapia hormonal es lo más eficaz en mujeres sanas cerca de la menopausia; si no se puede o no se quiere, la terapia cognitivo-conductual, la hipnosis clínica y varios medicamentos sin hormonas tienen buena evidencia. Además: entrenamiento de fuerza, buen sueño y cuidar el peso. Conversarlo con tu médico vale la pena.",
    fuente: "The Menopause Society, declaración sobre terapias sin hormonas, 2023; estudio SWAN.",
  },
];

/* ── Lo que ayuda: comida y hábitos ──────────────────────── */

export const AYUDAS: { tema: string; grado: Grado; dice: string; matiz: string; fuente: string }[] = [
  {
    tema: "Comer lo suficiente",
    grado: "probado",
    dice: "El ciclo necesita energía. Cuando lo que se come no alcanza para lo que se gasta (por dieta, ejercicio intenso o estrés), el cerebro baja la señal a los ovarios y la regla se desordena o se va.",
    matiz: "Pasa también con un peso «normal». Una regla que desaparece no es señal de buen estado físico: es una alarma, y a la larga debilita los huesos.",
    fuente: "Endocrine Society, guía de amenorrea hipotalámica funcional, 2017.",
  },
  {
    tema: "Hierro",
    grado: "probado",
    dice: "Mientras hay regla, el cuerpo necesita 18 mg de hierro al día (después de los 51, 8 mg). Está en carnes, legumbres, hojas verdes y semillas; el de origen vegetal se absorbe mejor junto a vitamina C (cítricos, pimentón) y peor junto al té o el café.",
    matiz: "No tomes suplementos de hierro sin un examen: el exceso también hace daño. Si sangras mucho, pide que te midan la ferritina.",
    fuente: "Institutos Nacionales de Salud de EE. UU. (NIH), hoja informativa de hierro.",
  },
  {
    tema: "Calcio para los síntomas premenstruales",
    grado: "prometedor",
    dice: "En ensayos clínicos, 1.000 a 1.200 mg de calcio al día redujeron los síntomas premenstruales. Los lácteos, el tofu con calcio, las sardinas con espina y las almendras aportan.",
    matiz: "La guía de ACOG lo recomienda con evidencia de baja calidad. Es barato, seguro y bueno para los huesos de todas formas.",
    fuente: "ACOG, guía de trastornos premenstruales, 2023.",
  },
  {
    tema: "Ejercicio regular",
    grado: "prometedor",
    dice: "Moverse varias veces por semana (unos 45 a 60 minutos, tres veces) redujo el dolor menstrual en una revisión Cochrane, y ayuda con los síntomas premenstruales.",
    matiz: "Los ensayos eran pequeños y distintos entre sí. Funciona como hábito, no solo los días de dolor.",
    fuente: "Revisión Cochrane, Armour y cols., 2019; ACOG 2023.",
  },
  {
    tema: "Calor y jengibre para los cólicos",
    grado: "prometedor",
    dice: "El calor local alivia los cólicos. El jengibre en polvo, en los primeros días de regla, alivió el dolor más que un placebo y de forma parecida a los antiinflamatorios.",
    matiz: "Los estudios del jengibre son pocos y con dosis distintas (en general de 750 a 2.000 mg al día los primeros tres días).",
    fuente: "Metaanálisis de jengibre en dismenorrea primaria, 2021.",
  },
  {
    tema: "Dormir y bajar el estrés",
    grado: "prometedor",
    dice: "El estrés sostenido y el mal sueño alteran la señal del cerebro al ovario: pueden atrasar la ovulación, alargar el ciclo y empeorar los síntomas premenstruales.",
    matiz: "No significa que un mes estresante «desequilibre» todo: el cuerpo se recupera. Lo que pesa es lo que se sostiene en el tiempo.",
    fuente: "Endocrine Society 2017; ACOG 2023.",
  },
  {
    tema: "Sauzgatillo (Vitex agnus-castus)",
    grado: "debil",
    dice: "Es la planta más estudiada para los síntomas premenstruales, y la mayoría de los ensayos encontró mejoría.",
    matiz: "Los estudios tienen mucho riesgo de sesgo y resultados muy distintos entre sí, así que no se puede afirmar con seguridad. No se usa con anticonceptivos hormonales, en el embarazo ni con medicamentos que actúan sobre la dopamina sin hablarlo antes.",
    fuente: "Revisión sistemática y metaanálisis, Csupor y cols., 2019; Cerqueira y cols., 2017.",
  },
  {
    tema: "«Sincronizar» la dieta y el ejercicio con el ciclo",
    grado: "tradicion",
    dice: "Se promete que entrenar o comer distinto en cada fase mejora el rendimiento y las hormonas.",
    matiz: "Cuando se juntaron 78 estudios, el ciclo cambió el rendimiento de forma trivial, y en los estudios bien hechos el efecto desapareció. Lo que sí vale es escuchar cómo te sientes tú cada día.",
    fuente: "McNulty y cols., revisión sistemática y metaanálisis, Sports Medicine 2020.",
  },
];

/* Lo que cambia la comida y los hábitos según la etapa de la vida. */
export const POR_ETAPA: { etapa: string; consejos: string[] }[] = [
  {
    etapa: "Adolescencia",
    consejos: [
      "Comer suficiente para crecer y moverse: el hueso que se gana ahora es el que se tiene después.",
      "Hierro y calcio todos los días, sobre todo si la regla es abundante.",
      "Anotar las reglas desde el principio: es la mejor forma de saber qué es normal para ti.",
    ],
  },
  {
    etapa: "Edad reproductiva",
    consejos: [
      "Hierro suficiente mientras haya regla, y examen si sangras mucho.",
      "Ejercicio regular y buen sueño: ayudan con el dolor y los síntomas premenstruales.",
      "Si piensas en un embarazo, el ácido fólico se empieza antes, no cuando ya estás embarazada.",
    ],
  },
  {
    etapa: "Perimenopausia",
    consejos: [
      "Entrenamiento de fuerza dos o tres veces por semana: es lo que más cuida el músculo y el hueso que empiezan a perderse.",
      "Proteína suficiente en cada comida, calcio y vitamina D.",
      "Dormir y limitar el alcohol, que empeora los bochornos y el sueño.",
      "Llevar el calendario: los cambios de ritmo de la regla son el mejor indicador de en qué parte de la transición estás.",
    ],
  },
  {
    etapa: "Posmenopausia",
    consejos: [
      "Fuerza, ejercicios con impacto (caminar rápido, subir escaleras) y equilibrio: protegen el hueso y previenen caídas.",
      "Calcio, vitamina D y proteína.",
      "Controlar la presión, el colesterol y el azúcar: el riesgo cardiovascular cambia con la menopausia.",
      "La sequedad vaginal y las molestias urinarias tienen tratamiento: no hay que aguantarlas.",
    ],
  },
];

/* ── Disruptores endocrinos ──────────────────────────────── */

export const DISRUPTORES_QUE_SON = [
  "Son sustancias de afuera que imitan, bloquean o alteran a las hormonas. La Endocrine Society, la sociedad científica de los especialistas en hormonas, revisó la evidencia en 2015 y concluyó que sus efectos sobre la salud son reales, incluida la reproducción femenina.",
  "Lo que los hace difíciles de estudiar es que no siguen la regla de «la dosis hace el veneno»: pueden actuar en dosis muy bajas, y el momento importa más que la cantidad. Las etapas más sensibles son el embarazo, la infancia y la pubertad.",
];

export const DISRUPTORES: { nombre: string; donde: string }[] = [
  { nombre: "Bisfenoles (BPA y sus reemplazos)", donde: "Plásticos duros, el interior de las latas, boletas de papel térmico." },
  { nombre: "Ftalatos", donde: "Plásticos blandos, envoltorios, y las «fragancias» de cosméticos, perfumes y productos de limpieza." },
  { nombre: "Parabenos", donde: "Conservantes de cremas, champús y maquillaje." },
  { nombre: "PFAS («químicos eternos»)", donde: "Sartenes antiadherentes, ropa impermeable, envases de comida rápida, el polvo de la casa." },
  { nombre: "Algunos plaguicidas", donde: "Restos en frutas y verduras, y en el campo." },
  { nombre: "Triclosán y algunos filtros solares (oxibenzona)", donde: "Jabones antibacterianos y protectores solares." },
];

export const DISRUPTORES_EVIDENCIA: { tema: string; grado: Grado; dice: string; matiz: string; fuente: string }[] = [
  {
    tema: "Se asocian a problemas del ciclo y la fertilidad",
    grado: "prometedor",
    dice: "En estudios de población, niveles más altos de algunos disruptores se asociaron a endometriosis (sobre todo el BPA), a SOP y a menopausia más temprana: las mujeres con más PFAS en la sangre llegaron a la menopausia unos dos años antes.",
    matiz: "Son asociaciones: no prueban que el químico sea la causa. Pero coinciden con lo que se ve en experimentos de laboratorio, y por eso las sociedades médicas piden reducir la exposición.",
    fuente: "Endocrine Society, EDC-2, 2015; estudio SWAN, Journal of Clinical Endocrinology & Metabolism 2020; ACOG, opinión 832, 2021.",
  },
  {
    tema: "Cambiar los productos baja la exposición en pocos días",
    grado: "probado",
    dice: "Cien adolescentes cambiaron sus cosméticos por otros sin ftalatos, parabenos ni triclosán por solo tres días, y en la orina bajaron los parabenos un 44 %, el triclosán un 36 % y un ftalato un 27 %. Un estudio francés reciente, en 103 mujeres jóvenes, encontró algo parecido en cinco días.",
    matiz: "Lo que está probado es que bajan los químicos en el cuerpo. Que eso cambie la salud a largo plazo es razonable, pero todavía no se ha medido.",
    fuente: "Estudio HERMOSA, Harley y cols., Environmental Health Perspectives 2016; INSERM, Environment International.",
  },
];

export const DISRUPTORES_QUE_HACER = [
  "Guardar y calentar la comida en vidrio, loza o acero, no en plástico. Nunca calentar plástico en el microondas.",
  "Menos comida enlatada y bebidas en botella plástica.",
  "Elegir cosméticos y productos de limpieza sin «fragancia» o «perfume» en la lista, sin parabenos ni ftalatos. Menos productos, mejor.",
  "Limpiar el polvo con paño húmedo y ventilar: el polvo de la casa acumula retardantes de llama y PFAS.",
  "Lavar bien frutas y verduras; si se puede, preferir orgánico en las que más plaguicidas suelen traer.",
  "Cambiar las sartenes antiadherentes rayadas por hierro, acero o cerámica.",
  "No pedir boleta impresa cuando no hace falta, y lavarse las manos después de tocarla.",
];

/* ── Cuándo consultar ──────────────────────────────────── */

export const CONSULTAR = [
  "No llega la primera regla a los 15 años.",
  "La regla no llega en tres meses o más (y no hay embarazo), o tus ciclos duran menos de 21 días o más de 45.",
  "Sangras más de 8 días, empapas una toalla o tampón cada una o dos horas, o tienes coágulos grandes.",
  "Sangras entre reglas o después de tener relaciones.",
  "El dolor no se calma con los remedios habituales o te hace faltar a tus cosas.",
  "El ánimo antes de la regla cambia tanto que afecta tu vida o tus relaciones, o tienes pensamientos de hacerte daño.",
  "Tienes acné fuerte o vello en la cara o el pecho junto con ciclos irregulares.",
  "Te falta la regla y has bajado de peso, comes poco o entrenas mucho.",
  "Cualquier sangrado después de un año sin regla.",
  "La menopausia llega antes de los 40.",
];

/* ── Mitos ─────────────────────────────────────────── */

export const MITOS: { mito: string; realidad: string }[] = [
  {
    mito: "La ovulación es el día 14",
    realidad:
      "Solo en una minoría. La ovulación ocurre unos 12 a 14 días antes de la regla siguiente, y como la primera mitad del ciclo varía tanto, cae en días muy distintos. Por eso los calendarios no sirven como anticonceptivo.",
  },
  {
    mito: "Un examen de hormonas dice si estás «desbalanceada»",
    realidad:
      "Las hormonas cambian todo el mes, de un ciclo a otro y a lo largo del día. Un valor suelto sin una pregunta clínica detrás no diagnostica nada; los exámenes de hormonas en saliva u orina que se venden por internet tampoco están validados para eso.",
  },
  {
    mito: "Hay que entrenar y comer distinto en cada fase",
    realidad:
      "La evidencia no lo respalda para la población general: el efecto del ciclo sobre el rendimiento es trivial. Lo útil es ajustar según cómo te sientes ese día, no según un calendario.",
  },
  {
    mito: "El «ciclado de semillas» equilibra las hormonas",
    realidad:
      "Comer linaza y zapallo en la primera mitad y sésamo y maravilla en la segunda no tiene estudios que muestren efecto sobre las hormonas o el ciclo. Las semillas son buena comida, nada más.",
  },
  {
    mito: "La «fatiga adrenal» desordena las hormonas",
    realidad:
      "No es un diagnóstico reconocido por ninguna sociedad de endocrinología, y una revisión sistemática concluyó que no existe como enfermedad. El cansancio es real y merece estudio, pero por otras causas: anemia, tiroides, sueño, ánimo.",
  },
  {
    mito: "La regla «limpia» o «desintoxica» el cuerpo",
    realidad:
      "La sangre menstrual es sangre y tejido del útero, no toxinas. Tampoco hay que «limpiar el hígado» para equilibrar los estrógenos: el hígado ya lo hace solo.",
  },
  {
    mito: "Si tomo anticonceptivos tengo fases",
    realidad:
      "Los anticonceptivos hormonales combinados frenan la ovulación: no hay fase folicular ni lútea propias. El sangrado de la semana de descanso es un sangrado por suspensión, no una regla. Por eso la app no calcula fases en ese caso.",
  },
];

export const PREGUNTAS: { p: string; r: string }[] = [
  {
    p: "¿Puedo usar la app para no quedar embarazada?",
    r: "No. La app estima la ovulación a partir de tus reglas pasadas, y la ovulación cambia de un ciclo a otro. Los métodos de conciencia de la fertilidad que funcionan miden cosas como la temperatura o el moco cervical todos los días, y se aprenden con alguien capacitado.",
  },
  {
    p: "¿Cuántos ciclos hacen falta para que las predicciones sirvan?",
    r: "Al menos tres. Con menos, la app usa 28 días como punto de partida y lo dice. Mientras más ciclos registres, mejor conoce tu patrón; aun así, es una estimación.",
  },
  {
    p: "¿Mi regla es abundante?",
    r: "Si interfiere con tu vida, sí: si te levantas de noche a cambiarte, si necesitas doble protección, si manchas la ropa o te hace faltar a tus cosas. No hace falta medir mililitros.",
  },
  {
    p: "Tengo 45 y mis ciclos están raros. ¿Es la perimenopausia?",
    r: "Es lo más probable, sobre todo si el ritmo cambia siete días o más respecto de lo tuyo. Pero un sangrado muy abundante, entre reglas o después de las relaciones se consulta igual, a cualquier edad.",
  },
  {
    p: "¿Dónde quedan mis datos?",
    r: "Lo que anotas en la app se guarda solo en tu teléfono. No se sube a ninguna parte, ni siquiera si tienes cuenta: son datos de salud y preferimos que no salgan de tu aparato.",
  },
];

export const FUENTES = [
  "ACOG, opinión 651: «La menstruación en niñas y adolescentes: el ciclo como signo vital», 2015.",
  "Munro y cols., sistemas FIGO de sangrado uterino normal y anormal, International Journal of Gynecology & Obstetrics 2018.",
  "Bull y cols., características reales de más de 600.000 ciclos, npj Digital Medicine 2019.",
  "Wilcox y cols., el momento de la ventana fértil, BMJ 2000.",
  "Harlow y cols., STRAW+10: las etapas del envejecimiento reproductivo, 2012.",
  "Estudio SWAN (Study of Women's Health Across the Nation): trayectorias hormonales en la transición y PFAS y edad de menopausia, JCEM 2020.",
  "ACOG, guía clínica de trastornos premenstruales, 2023.",
  "Armour y cols., ejercicio para la dismenorrea, revisión Cochrane 2019.",
  "NICE, guía NG88: sangrado menstrual abundante, 2018 (actualizada 2021).",
  "Gordon y cols., amenorrea hipotalámica funcional, guía de la Endocrine Society 2017.",
  "Teede y cols., guía internacional basada en evidencia para el SOP, 2023.",
  "The Menopause Society, declaración sobre terapias sin hormonas para los bochornos, 2023.",
  "Gore y cols., EDC-2: segunda declaración científica de la Endocrine Society sobre disruptores endocrinos, Endocrine Reviews 2015.",
  "ACOG y ASRM, opinión 832: reducir la exposición a agentes ambientales tóxicos, 2021.",
  "Harley y cols., estudio HERMOSA, Environmental Health Perspectives 2016.",
  "McNulty y cols., el ciclo menstrual y el rendimiento deportivo, Sports Medicine 2020.",
  "NIH, Oficina de Suplementos Dietéticos: hierro.",
  "Cadegiani y Kater, «La fatiga adrenal no existe», BMC Endocrine Disorders 2016.",
  "OMS, nota descriptiva sobre endometriosis.",
];

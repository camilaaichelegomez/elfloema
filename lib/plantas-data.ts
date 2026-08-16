export type MetodoPreparacion = {
  temperatura: string;
  tiempo: string;
  descripcion: string;
};

export type CategoriaKey =
  | "expectorantes"
  | "ciclo-menstrual"
  | "antiinflamatorias"
  | "cicatrizantes"
  | "sistema-nervioso"
  | "inmunidad-antimicrobianas"
  | "digestivas"
  | "piel-cosmetica"
  | "diureticas-depurativas";

export type Planta = {
  slug: string;
  nombre: string;
  nombreCientifico: string;
  familia: string;
  descripcionBreve: string;
  descripcionCompleta: string;
  propiedades: string[];
  usosMedicinales: string[];
  usosCosmeticos: string[];
  preparacion: Partial<Record<"infusion" | "decoccion" | "maceracion" | "tintura", MetodoPreparacion>>;
  contraindicaciones: string[];
  categorias: CategoriaKey[];
};

export type Categoria = {
  key: CategoriaKey;
  label: string;
  descripcion: string;
};

export const categorias: Categoria[] = [
  {
    key: "expectorantes",
    label: "Expectorantes y respiratorio",
    descripcion: "Plantas que facilitan la expectoración, alivian bronquios y vías respiratorias. Se preparan principalmente en decocciones e infusiones que se inhalan o se toman calientes.",
  },
  {
    key: "ciclo-menstrual",
    label: "Ciclo menstrual y salud femenina",
    descripcion: "Plantas emenágogas y reguladoras del ciclo. Actúan sobre la musculatura uterina, el equilibrio hormonal y los dolores asociados al ciclo.",
  },
  {
    key: "antiinflamatorias",
    label: "Antiinflamatorias",
    descripcion: "Plantas con compuestos que inhiben mediadores proinflamatorios como prostaglandinas y citocinas. Útiles tanto en uso interno como tópico.",
  },
  {
    key: "cicatrizantes",
    label: "Cicatrizantes y reparadoras",
    descripcion: "Plantas que aceleran la regeneración tisular, favorecen la hemostasia y reducen la formación de queloides. Fundamentales en formulación cosmética reparadora.",
  },
  {
    key: "sistema-nervioso",
    label: "Sistema nervioso y estrés",
    descripcion: "Plantas adaptógenas, sedantes suaves y ansiolíticas. Actúan sobre el eje HPA y la transmisión GABAérgica sin producir dependencia en dosis terapéuticas.",
  },
  {
    key: "inmunidad-antimicrobianas",
    label: "Inmunidad y antimicrobianas",
    descripcion: "Plantas con actividad inmunomoduladora, antimicrobiana y antiviral. Contienen polifenoles, taninos y compuestos azufrados que alteran membranas bacterianas.",
  },
  {
    key: "digestivas",
    label: "Digestivas",
    descripcion: "Plantas carminativas, colagogas y procinéticas que regulan el tránsito intestinal, alivian espasmos y protegen la mucosa gastroduodenal.",
  },
  {
    key: "piel-cosmetica",
    label: "Piel y cosmética",
    descripcion: "Plantas con principios activos compatibles con formulación cosmética: antioxidantes, emolientes, astringentes, despigmentantes y estimulantes de colágeno.",
  },
  {
    key: "diureticas-depurativas",
    label: "Diuréticas y depurativas",
    descripcion: "Plantas que aumentan la diuresis y apoyan la eliminación de toxinas por vía renal y hepática. Remineralizantes y depurativas, muy usadas en la tradición chilena para el hígado y los riñones.",
  },
];

export const plantas: Planta[] = [
  {
    slug: "matico",
    nombre: "Matico",
    nombreCientifico: "Piper aduncum",
    familia: "Piperaceae",
    descripcionBreve: "Arbusto andino con poderosa acción cicatrizante y antimicrobiana. Referente de la medicina tradicional del sur.",
    descripcionCompleta: "El matico es un arbusto de los Andes tropicales y subtropicales, ampliamente usado en la medicina tradicional andina desde tiempos precolombinos. Sus hojas contienen flavonoides, aceites esenciales (principalmente safrol y asarona), taninos y compuestos fenólicos que explican su potente actividad cicatrizante, antiinflamatoria y antimicrobiana. La combinación de astringencia tánica con acción antiinflamatoria flavonoídica lo convierte en uno de los activos más versátiles de la farmacopea vegetal andina.",
    propiedades: ["cicatrizante", "antiinflamatorio", "antimicrobiano"],
    usosMedicinales: [
      "Cicatrización de heridas cutáneas, úlceras y abrasiones",
      "Tratamiento tópico de infecciones dérmicas menores",
      "Antiinflamatorio en afecciones articulares externas",
      "Antiséptico en lesiones de mucosa oral",
      "Compresa en contusiones y hematomas superficiales",
    ],
    usosCosmeticos: [
      "Tónico reparador para pieles agredidas post-tratamiento",
      "Activo en sérum cicatrizante para cicatrices y estrías",
      "Calmante en formulaciones para pieles reactivas o atópicas",
      "Extracto en cremas de regeneración celular",
      "Agua floral maticada para tónicos astringentes",
    ],
    preparacion: {
      infusion: {
        temperatura: "90 °C",
        tiempo: "10 min",
        descripcion: "Añadir 2 g de hojas secas por cada 200 ml de agua. Tapar y reposar. Usar como compresa fría en heridas o como tónico tópico. No hervir: el calor excesivo volatiliza los aceites esenciales activos.",
      },
      decoccion: {
        temperatura: "100 °C",
        tiempo: "15 min",
        descripcion: "Hervir hojas en agua durante 15 minutos. Mayor extracción de taninos. Ideal para baños de zona en heridas, hemorroides o afecciones vulvovaginales. Enfriar antes de aplicar.",
      },
      maceracion: {
        temperatura: "Ambiente (18–22 °C)",
        tiempo: "3–4 semanas",
        descripcion: "Macerar hojas frescas o secas en aceite de jojoba o de almendras dulces. Relación 1:5 (planta:aceite). Proteger de la luz. Filtrar con tela fina. Usar directamente como aceite reparador o como base de ungüento.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3–4 semanas",
        descripcion: "1 parte de hojas secas por 5 partes de alcohol etílico 70°. Macerar en frasco oscuro. Agitar cada 2 días. Filtrar con papel. Conservar en ámbar a temperatura baja. Diluir al 10% en agua para uso tópico.",
      },
    },
    contraindicaciones: [
      "Evitar uso interno durante el embarazo por posible efecto emenagogo",
      "Puede causar sensibilización en pieles muy sensibles — realizar prueba de parche",
      "No usar en heridas profundas o punzantes sin supervisión médica",
      "Interacción posible con anticoagulantes — consultar profesional",
    ],
    categorias: ["cicatrizantes", "antiinflamatorias", "inmunidad-antimicrobianas", "piel-cosmetica"],
  },
  {
    slug: "pitra",
    nombre: "Pitra",
    nombreCientifico: "Myrceugenia exsucca",
    familia: "Myrtaceae",
    descripcionBreve: "Árbol nativo del sur de Chile con potente acción astringente, antioxidante y hepatoprotectora.",
    descripcionCompleta: "La pitra es un árbol endémico de los bosques valdiviano y patagónico chileno. Crece en suelos húmedos y riberas. Su corteza y hojas contienen taninos condensados de alta densidad, flavonoides (quercetina, miricetina) y polifenoles de actividad antioxidante comparable a extractos de té verde. Culturalmente usada por el pueblo mapuche para tratar afecciones hepáticas y como astringente en diarreas agudas.",
    propiedades: ["astringente", "antioxidante", "hepatoprotector"],
    usosMedicinales: [
      "Tratamiento de diarrea aguda y gastroenteritis",
      "Afecciones hepáticas leves como hepatoprotector",
      "Uso tópico en heridas húmedas y eccemas exudativos",
      "Gárgaras en faringitis y aftas orales",
    ],
    usosCosmeticos: [
      "Tónico astringente para pieles grasas y poros dilatados",
      "Activo antioxidante en sérum anti-aging",
      "Agua de corteza en preparaciones para pieles acneicas",
      "Extracto en contornos de ojos por su acción vasoconstrictora suave",
    ],
    preparacion: {
      decoccion: {
        temperatura: "100 °C",
        tiempo: "20 min",
        descripcion: "Hervir 5 g de corteza seca fragmentada en 300 ml de agua. Mayor extracción de taninos condensados de la corteza. Colar y usar tibio. Para uso interno (diarrea): tomar 2 tazas al día máximo 3 días.",
      },
      infusion: {
        temperatura: "85 °C",
        tiempo: "12 min",
        descripcion: "Usar hojas secas (2 g/200 ml). Temperatura moderada para preservar flavonoides sensibles al calor. Ideal para uso tópico como compresa astringente en eccemas.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "4 semanas",
        descripcion: "Corteza triturada en alcohol 70° (1:5). Maceración prolongada para extraer taninos. Filtrar por prensado. Diluir al 5–10% en formulaciones cosméticas como activo astringente.",
      },
    },
    contraindicaciones: [
      "No usar internamente por más de una semana continua por concentración de taninos",
      "Puede interferir con la absorción de hierro y otros minerales",
      "Evitar en estreñimiento crónico",
      "Precaución en personas con úlcera gástrica activa",
    ],
    categorias: ["antiinflamatorias", "piel-cosmetica", "digestivas"],
  },
  {
    slug: "arrayan",
    nombre: "Arrayán",
    nombreCientifico: "Luma apiculata",
    familia: "Myrtaceae",
    descripcionBreve: "Árbol emblemático del bosque templado lluvioso. Antiséptico, digestivo y aromaterapéutico por excelencia.",
    descripcionCompleta: "El arrayán es uno de los árboles más característicos del bosque templado lluvioso del sur de Chile y Argentina. Su corteza rojiza y sus pequeñas hojas aromáticas contienen aceites esenciales ricos en eucaliptol, linalol y α-pineno, además de flavonoides y taninos. Forma bosques puros llamados 'arrayalares' en las orillas de lagos y ríos. Su fragancia característica lo ha hecho parte del paisaje cultural valdiviano.",
    propiedades: ["antiséptico", "digestivo", "antifúngico"],
    usosMedicinales: [
      "Antiséptico en infecciones urinarias leves",
      "Digestivo en dispepsias y flatulencias",
      "Antifúngico tópico en micosis superficiales",
      "Inhalación en afecciones respiratorias y sinusitis",
    ],
    usosCosmeticos: [
      "Aceite esencial en formulaciones antisépticas y desodorantes",
      "Extracto en jabones antibacterianos artesanales",
      "Agua floral de hojas en tónicos para pieles mixtas",
      "Activo aromaterapéutico en cremas relajantes",
    ],
    preparacion: {
      infusion: {
        temperatura: "90 °C",
        tiempo: "8 min",
        descripcion: "2 g de hojas frescas o secas en 200 ml de agua. No sobrepasar temperatura para preservar aceites esenciales. Tapar durante la infusión. Tomar 2 tazas/día para problemas digestivos.",
      },
      decoccion: {
        temperatura: "100 °C",
        tiempo: "10 min",
        descripcion: "Corteza fragmentada (3 g/200 ml). Hervir 10 minutos. Para uso tópico en micosis: baño de pies o compresas en la zona afectada. Enfriar antes de aplicar.",
      },
      maceracion: {
        temperatura: "Ambiente",
        tiempo: "2 semanas",
        descripcion: "Hojas frescas en aceite de coco o argán (1:4). 2 semanas en frasco oscuro. Filtrar. El aceite resultante contiene aceites esenciales aromáticos útiles en formulación cosmética.",
      },
    },
    contraindicaciones: [
      "Evitar aceite esencial puro sobre piel sin diluir (puede causar irritación)",
      "Precaución en niños menores de 6 años con aceites esenciales",
      "No usar internamente en cantidades elevadas — puede irritar la mucosa renal",
    ],
    categorias: ["digestivas", "inmunidad-antimicrobianas", "piel-cosmetica", "expectorantes"],
  },
  {
    slug: "maqui",
    nombre: "Maqui",
    nombreCientifico: "Aristotelia chilensis",
    familia: "Elaeocarpaceae",
    descripcionBreve: "La superfruta del mundo. Concentración de antocianinas sin par en el reino vegetal.",
    descripcionCompleta: "El maqui es un arbusto nativo de los bosques templados del sur de Chile y Argentina. Sus frutos violeta-negro poseen la mayor concentración de antocianinas registrada en cualquier fruta conocida — principalmente delfinidinas. Estas antocianinas no solo son potentes antioxidantes sino que modulan la respuesta inflamatoria a nivel molecular, inhiben la glicación proteica y tienen demostrado efecto fotoprotector.",
    propiedades: ["antioxidante", "antiinflamatorio", "inmunoestimulante"],
    usosMedicinales: [
      "Protección contra estrés oxidativo sistémico",
      "Apoyo en procesos inflamatorios crónicos",
      "Estimulación del sistema inmune",
      "Regulación del azúcar sanguíneo post-prandial",
    ],
    usosCosmeticos: [
      "Activo anti-aging en sérum por su acción sobre oxidación celular",
      "Extracto en cremas fotoprotectoras naturales",
      "Pigmento natural en cosmética color",
      "Inhibidor de glicación en formulaciones anti-manchas",
      "Activo en contorno de ojos por su acción microcirculatoria",
    ],
    preparacion: {
      infusion: {
        temperatura: "75 °C",
        tiempo: "8 min",
        descripcion: "Frutos secos o frescos (5 g/200 ml). Temperatura baja para preservar antocianinas termolábiles. Tapar. Tomar 1–2 tazas al día. El fruto fresco es preferible al seco para mayor actividad antioxidante.",
      },
      maceracion: {
        temperatura: "Frío (4–8 °C)",
        tiempo: "24–48 h",
        descripcion: "Maceración acuosa en frío: frutos aplastados en agua destilada fría durante 24-48 h en refrigeración. Preserva máxima concentración de antocianinas. Para uso cosmético, incorporar como fase acuosa en emulsiones.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "2 semanas",
        descripcion: "Frutos en alcohol glicerinado (60% etanol / 10% glicerina / 30% agua). La glicerina estabiliza los pigmentos antociánicos. Filtrar. Conservar a 4 °C. Usar al 5–15% en formulaciones cosméticas.",
      },
    },
    contraindicaciones: [
      "Puede potenciar efecto de anticoagulantes — consultar médico",
      "Efecto hipoglucemiante: precaución en diabéticos con medicación",
      "Los pigmentos tiñen piel y superficies — tomar precauciones",
    ],
    categorias: ["antiinflamatorias", "inmunidad-antimicrobianas", "piel-cosmetica"],
  },
  {
    slug: "triwe",
    nombre: "Triwe",
    nombreCientifico: "Laureliopsis philippiana",
    familia: "Atherospermataceae",
    descripcionBreve: "El árbol sagrado del bosque valdiviano. Sedante, aromático y guardián del sistema nervioso.",
    descripcionCompleta: "El triwe —nombre mapuche para el tepa— es un árbol endémico de los bosques valdivianos de Chile y Argentina. Alcanza los 30 metros de altura y puede vivir cientos de años. Sus hojas contienen alcaloides isoquinolínicos (laurelina), aceites esenciales con linalol y terpenoides de acción sedante-ansiolítica. Para el pueblo mapuche es un árbol medicinal y espiritual de primer orden. Su aroma es intensamente fragante y reconocible en el bosque húmedo.",
    propiedades: ["sedante", "antiespasmódico", "aromático"],
    usosMedicinales: [
      "Ansiedad leve y estados de nerviosismo",
      "Insomnio de inicio por sobreactivación nerviosa",
      "Cólicos intestinales y espasmos digestivos",
      "Dolores de cabeza tensionales",
    ],
    usosCosmeticos: [
      "Aceite esencial en aromaterapia de relajación",
      "Extracto en cremas de masaje anticontractura",
      "Activo sedante en formulaciones para pieles reactivas por estrés",
      "Agua floral en brumas corporales relajantes",
    ],
    preparacion: {
      infusion: {
        temperatura: "85 °C",
        tiempo: "10 min",
        descripcion: "Hojas jóvenes (1–2 g/200 ml). Temperatura moderada para preservar alcaloides y aceites. Tomar 1 taza antes de dormir para insomnio, o 2–3 veces al día para ansiedad. La sobredosis puede causar somnolencia excesiva.",
      },
      maceracion: {
        temperatura: "Ambiente",
        tiempo: "2–3 semanas",
        descripcion: "Hojas en aceite de argán o de jojoba. Para uso en masaje relajante. El aceite resultante capta bien los compuestos lipofílicos aromáticos. Aplicar con técnica de effleurage en zona cervical.",
      },
    },
    contraindicaciones: [
      "No combinar con fármacos ansiolíticos o sedantes sin supervisión",
      "Evitar durante el embarazo — posible efecto sobre útero",
      "No usar antes de conducir o manejar maquinaria pesada",
      "Uso prolongado puede generar tolerancia — ciclar el consumo",
    ],
    categorias: ["sistema-nervioso", "digestivas", "expectorantes"],
  },
  {
    slug: "chilco",
    nombre: "Chilco",
    nombreCientifico: "Fuchsia magellanica",
    familia: "Onagraceae",
    descripcionBreve: "La flor colgante del sur del mundo. Astringente, cicatrizante y de profunda identidad andino-patagónica.",
    descripcionCompleta: "El chilco o fucsia silvestre es un arbusto nativo de los bosques andino-patagónicos que crece desde el centro-sur de Chile hasta Tierra del Fuego. Reconocible por sus flores bicolores colgantes, contiene en hojas y tallos taninos hidrolizables, flavonoides (quercetina, kaempferol) y antocianinas en los frutos. Resistente a condiciones extremas de viento y lluvia, ha desarrollado mecanismos de protección celular que se traducen en principios activos de interés cosmético.",
    propiedades: ["astringente", "cicatrizante", "antiinflamatorio"],
    usosMedicinales: [
      "Heridas superficiales y abrasiones con sangrado leve",
      "Gastritis y diarrea por su acción astringente",
      "Hemostático tópico en cortes superficiales",
      "Uso tópico en hemorroides externas",
    ],
    usosCosmeticos: [
      "Tónico astringente para pieles con poros dilatados",
      "Activo en fórmulas post-depilación calmantes",
      "Extracto en contorno de ojos por su acción sobre microcirculación",
      "Ingrediente en mascarillas peel-off por sus taninos",
    ],
    preparacion: {
      decoccion: {
        temperatura: "100 °C",
        tiempo: "15 min",
        descripcion: "Hojas y tallos frescos o secos (3 g/200 ml). Hervir 15 minutos para máxima extracción de taninos. Enfriar. Para uso tópico: compresas frías en heridas y hemorroides. Para uso interno: máximo 3 tazas al día.",
      },
      infusion: {
        temperatura: "88 °C",
        tiempo: "10 min",
        descripcion: "Solo con hojas (2 g/200 ml). Más suave que la decocción. Usada en gárgaras para faringitis o bebida para diarrea leve. Los frutos maduros pueden añadirse como fuente de antocianinas.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3 semanas",
        descripcion: "Hojas en alcohol 70° (1:5). Filtrar por prensado. Al 3–8% en tónicos faciales astringentes. Excelente estabilizador de emulsiones O/W por su contenido tánico.",
      },
    },
    contraindicaciones: [
      "Uso interno prolongado puede causar estreñimiento por exceso de taninos",
      "Evitar en personas con tendencia a estreñimiento crónico",
      "Posible interferencia con absorción de fármacos — tomar con 2 h de diferencia",
    ],
    categorias: ["cicatrizantes", "antiinflamatorias", "piel-cosmetica"],
  },
  {
    slug: "milenrama",
    nombre: "Milenrama",
    nombreCientifico: "Achillea millefolium",
    familia: "Asteraceae",
    descripcionBreve: "La hierba de los guerreros. Hemostática, emenagoga y cicatrizante de uso milenario en todas las tradiciones del mundo.",
    descripcionCompleta: "La milenrama es una de las plantas medicinales más universales de la historia. Su nombre científico evoca a Aquiles, quien según la mitología la usó para curar heridas de batalla. Presente en zonas templadas de todo el hemisferio norte y ampliamente naturalizada en el sur de Chile y Argentina. Sus cabezuelas florales contienen aceites esenciales con azuleno (antiinflamatorio potente), flavonoides, alcaloides (achileína, estaquidrina) y taninos con efecto hemostático documentado.",
    propiedades: ["hemostático", "emenagogo", "cicatrizante"],
    usosMedicinales: [
      "Hemostático en heridas con sangrado superficial activo",
      "Regulación del ciclo menstrual irregular",
      "Dismenorrea y cólicos menstruales",
      "Antiinflamatorio sistémico en fiebre y estados gripales",
      "Digestivo amargo y colerético",
    ],
    usosCosmeticos: [
      "Activo antiinflamatorio en formulaciones para pieles sensibles",
      "Extracto en cremas cicatrizantes post-acné",
      "Tónico floral para pieles con rosácea o eritema facial",
      "Activo en mascarillas para pieles grasas por su acción sebostática",
      "Agua de milenrama como bruma facial calmante",
    ],
    preparacion: {
      infusion: {
        temperatura: "90 °C",
        tiempo: "10 min",
        descripcion: "2 g de flores y hojas secas en 200 ml de agua. Tapar. La infusión libera azuleno de las flores azules. Para ciclo menstrual: 1–2 tazas al día en los 5 días previos. Para heridas: compresa fría directa.",
      },
      decoccion: {
        temperatura: "100 °C",
        tiempo: "12 min",
        descripcion: "Para uso tópico intensivo: hervir 5 g en 300 ml. Enfriar completamente. Usar como lavado hemostático en heridas o como baño de zona en menorragia.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "4 semanas",
        descripcion: "Flores en alcohol 60° (1:5). La tintura concentra alcaloides y flavonoides. Al 5% en tónicos faciales. Al 10–15% en formulaciones hemostáticas o antiinflamatorias tópicas.",
      },
      maceracion: {
        temperatura: "Ambiente con calor solar (método solar)",
        tiempo: "4–6 semanas",
        descripcion: "Flores frescas en aceite de oliva o girasol por el método tradicional solar. El calor suave extrae el azuleno lipofílico que da el aceite un tono levemente azulado. Cicatrizante y calmante directo sobre la piel.",
      },
    },
    contraindicaciones: [
      "Contraindicada en embarazo por su acción emenagoga",
      "Puede causar dermatitis de contacto en personas sensibles a Asteráceas",
      "Evitar con anticoagulantes — efecto hemostático puede interaccionar",
      "No usar flores silvestres sin identificación segura — posible confusión con plantas tóxicas",
    ],
    categorias: ["cicatrizantes", "ciclo-menstrual", "antiinflamatorias", "piel-cosmetica"],
  },
  {
    slug: "boldo",
    nombre: "Boldo",
    nombreCientifico: "Peumus boldus",
    familia: "Monimiaceae",
    descripcionBreve: "Árbol endémico de Chile, el gran guardián del hígado. Digestivo y colagogo insignia de la herbolaria chilena.",
    descripcionCompleta: "El boldo es un árbol siempreverde endémico de la zona central de Chile, uno de los emblemas de la medicina tradicional chilena y hoy exportado a todo el mundo. Sus hojas coriáceas y aromáticas contienen el alcaloide boldina, flavonoides y un aceite esencial rico en eucaliptol y ascaridol. La boldina es un potente antioxidante y hepatoprotector que estimula la producción y el flujo de bilis —acción colerética y colagoga—, lo que explica su uso ancestral para las digestiones pesadas, el hígado perezoso y la vesícula.",
    propiedades: ["hepatoprotector", "digestivo", "colagogo"],
    usosMedicinales: [
      "Digestiones lentas y pesadas, dispepsia biliar",
      "Estimulante de la función hepática y del flujo de bilis",
      "Apoyo en la salud de la vesícula (bajo supervisión si hay cálculos)",
      "Carminativo — alivia gases y distensión",
      "Laxante suave en tránsito lento",
    ],
    usosCosmeticos: [
      "Extracto antioxidante para pieles apagadas y grasas",
      "Tónico purificante en formulaciones detox faciales",
      "Agua aromática de hojas como astringente suave",
      "Activo protector frente al estrés oxidativo cutáneo",
    ],
    preparacion: {
      infusion: {
        temperatura: "85–90 °C",
        tiempo: "8–10 min",
        descripcion: "2–3 hojas secas por taza (no más). Tapar y reposar. No hervir ni sobredosificar: el ascaridol del aceite esencial es neurotóxico en exceso. Tomar 1 taza después de las comidas, en curas cortas.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3 semanas",
        descripcion: "Hojas secas en alcohol 70° (1:5). Filtrar. Uso interno en gotas como colerético, o al 3–5% en cosmética como activo antioxidante.",
      },
    },
    contraindicaciones: [
      "Contraindicado en embarazo y lactancia (el ascaridol puede ser abortivo)",
      "No usar con obstrucción total de las vías biliares",
      "Evitar el uso prolongado o en dosis altas — riesgo de toxicidad por ascaridol",
      "Precaución con anticoagulantes y en enfermedad hepática grave",
    ],
    categorias: ["digestivas"],
  },
  {
    slug: "bailahuen",
    nombre: "Bailahuén",
    nombreCientifico: "Haplopappus baylahuen",
    familia: "Asteraceae",
    descripcionBreve: "Hierba resinosa de la cordillera chilena. Digestiva y hepática, compañera clásica del boldo.",
    descripcionCompleta: "El bailahuén es una pequeña planta resinosa que crece en la precordillera y cordillera andina del norte y centro de Chile, muy valorada en la medicina popular chilena. Sus hojas pegajosas y aromáticas concentran resinas, flavonoides derivados del ácido cafeico y un aceite esencial. Actúa como colagogo y hepatoprotector, estimulando la digestión de las grasas, y se ha usado tradicionalmente junto al boldo para las molestias del hígado y la vesícula.",
    propiedades: ["digestivo", "colagogo", "hepatoprotector"],
    usosMedicinales: [
      "Digestiones difíciles, sobre todo de comidas grasas",
      "Estimulante hepático y biliar",
      "Antiséptico digestivo suave",
      "Sudorífico en resfríos y estados gripales",
    ],
    usosCosmeticos: [
      "Extracto antioxidante y purificante para piel grasa",
      "Tónico astringente por su contenido resinoso",
      "Activo en formulaciones detox",
    ],
    preparacion: {
      infusion: {
        temperatura: "90 °C",
        tiempo: "10 min",
        descripcion: "Una cucharadita de hojas secas por taza. Tapar. Tomar después de las comidas para estimular la digestión. Sabor amargo-resinoso característico.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3 semanas",
        descripcion: "Hojas en alcohol 70° (1:5) — el alcohol extrae bien las resinas. Uso digestivo en gotas o como activo cosmético astringente.",
      },
    },
    contraindicaciones: [
      "Evitar en embarazo y lactancia",
      "No usar con obstrucción de las vías biliares",
      "Puede causar dermatitis de contacto en sensibles a Asteráceas",
      "Uso en curas cortas, no prolongado",
    ],
    categorias: ["digestivas", "diureticas-depurativas"],
  },
  {
    slug: "canelo",
    nombre: "Canelo · Foye",
    nombreCientifico: "Drimys winteri",
    familia: "Winteraceae",
    descripcionBreve: "El árbol sagrado del pueblo mapuche. Cicatrizante y antimicrobiano, histórico remedio antiescorbútico del sur.",
    descripcionCompleta: "El canelo o foye es el árbol sagrado por excelencia de la cultura mapuche, presente en sus ceremonias más importantes. Crece en los bosques húmedos del centro-sur de Chile. Su corteza es extraordinariamente rica en vitamina C —fue usada para prevenir el escorbuto— y contiene sesquiterpenos como el poligodial, de marcada acción antimicrobiana, antifúngica y antiinflamatoria, además de taninos y flavonoides. Une así el valor espiritual con una potente actividad cicatrizante y protectora de la piel.",
    propiedades: ["cicatrizante", "antimicrobiano", "antiinflamatorio"],
    usosMedicinales: [
      "Cicatrización de heridas y úlceras cutáneas",
      "Antiséptico en afecciones de la piel y mucosas",
      "Antiinflamatorio en dolores reumáticos (uso tópico)",
      "Histórico antiescorbútico por su alto contenido de vitamina C",
      "Antifúngico en micosis superficiales",
    ],
    usosCosmeticos: [
      "Activo cicatrizante y antioxidante (vitamina C natural)",
      "Extracto antimicrobiano para pieles con tendencia acneica",
      "Tónico de corteza para pieles agredidas",
      "Ingrediente en bálsamos reparadores",
    ],
    preparacion: {
      decoccion: {
        temperatura: "100 °C",
        tiempo: "15 min",
        descripcion: "Corteza fragmentada (3–5 g por 300 ml). Hervir y enfriar. Uso tópico como lavado antiséptico y cicatrizante de heridas, o en baños de zona.",
      },
      infusion: {
        temperatura: "85 °C",
        tiempo: "10 min",
        descripcion: "Hojas frescas o secas. Temperatura moderada para preservar la vitamina C. Uso tópico como tónico; internamente con precaución.",
      },
      maceracion: {
        temperatura: "Ambiente",
        tiempo: "3–4 semanas",
        descripcion: "Corteza u hojas en aceite vegetal para un oleato cicatrizante, base de ungüentos reparadores.",
      },
    },
    contraindicaciones: [
      "Evitar el uso interno en embarazo y lactancia",
      "En dosis altas la corteza puede ser irritante del tracto digestivo",
      "Realizar prueba de parche antes del uso tópico extendido",
      "Respetar su carácter de planta sagrada — usar con atribución cultural",
    ],
    categorias: ["cicatrizantes", "inmunidad-antimicrobianas", "piel-cosmetica"],
  },
  {
    slug: "llanten",
    nombre: "Llantén",
    nombreCientifico: "Plantago major",
    familia: "Plantaginaceae",
    descripcionBreve: "La hierba cicatrizante universal, presente en todo Chile. Repara la piel y calma las vías respiratorias.",
    descripcionCompleta: "El llantén crece como maleza en todo Chile y es una de las plantas medicinales más usadas del mundo. Sus hojas contienen aucubina (un glucósido iridoide antimicrobiano y antiinflamatorio), mucílagos que calman y protegen las mucosas, alantoína que estimula la regeneración celular, taninos astringentes y flavonoides. Esta combinación lo hace a la vez cicatrizante, antiinflamatorio, astringente y expectorante suave —un botiquín en una sola hoja.",
    propiedades: ["cicatrizante", "antiinflamatorio", "expectorante"],
    usosMedicinales: [
      "Cicatrización de heridas, picaduras y quemaduras leves",
      "Antiinflamatorio y calmante de la garganta y las vías respiratorias",
      "Astringente en diarreas leves",
      "Descongestivo y expectorante suave en la tos",
      "Calmante de irritaciones oculares (uso tópico muy diluido)",
    ],
    usosCosmeticos: [
      "Activo cicatrizante y calmante (alantoína natural)",
      "Extracto para pieles sensibles, reactivas o irritadas",
      "Tónico astringente suave para pieles mixtas",
      "Ingrediente en cremas reparadoras post-sol o post-depilación",
    ],
    preparacion: {
      infusion: {
        temperatura: "90 °C",
        tiempo: "10 min",
        descripcion: "Hojas secas (2 g/200 ml). Tapar. Como gárgara para la garganta, bebida para la tos, o compresa fría cicatrizante sobre la piel.",
      },
      maceracion: {
        temperatura: "Ambiente",
        tiempo: "3–4 semanas",
        descripcion: "Hojas frescas machacadas en aceite vegetal para un oleato reparador, base de ungüentos cicatrizantes.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3 semanas",
        descripcion: "Hojas en alcohol 70° (1:5). Al 5–10% en cosmética como activo calmante y astringente.",
      },
    },
    contraindicaciones: [
      "Muy bien tolerado; raras reacciones alérgicas",
      "Recolectar lejos de caminos y zonas contaminadas (acumula metales)",
      "Moderar el uso interno prolongado por su contenido de taninos",
      "Prueba de parche antes del uso tópico extendido en piel muy reactiva",
    ],
    categorias: ["cicatrizantes", "expectorantes", "antiinflamatorias", "piel-cosmetica"],
  },
  {
    slug: "paico",
    nombre: "Paico",
    nombreCientifico: "Dysphania ambrosioides",
    familia: "Amaranthaceae",
    descripcionBreve: "Hierba aromática del campo chileno. Digestiva y carminativa, remedio tradicional para el estómago.",
    descripcionCompleta: "El paico es una hierba aromática muy usada en la medicina popular chilena y latinoamericana, que crece espontánea en terrenos removidos. Su intenso aroma proviene de un aceite esencial rico en ascaridol, junto a flavonoides y terpenos. Tradicionalmente se ha empleado como digestivo y carminativo para los dolores de estómago y los gases, y como antiparasitario intestinal —aunque este último uso exige mucha prudencia por la toxicidad del ascaridol.",
    propiedades: ["digestivo", "carminativo", "antiespasmódico"],
    usosMedicinales: [
      "Dolores de estómago y digestiones difíciles",
      "Carminativo — expulsa gases y alivia la distensión",
      "Antiespasmódico en cólicos intestinales",
      "Antiparasitario tradicional (solo bajo supervisión, por su toxicidad)",
    ],
    usosCosmeticos: [
      "Uso cosmético muy limitado por la toxicidad del aceite esencial",
      "Eventual extracto antimicrobiano a muy baja concentración",
    ],
    preparacion: {
      infusion: {
        temperatura: "85 °C",
        tiempo: "5–8 min",
        descripcion: "Muy pocas hojas frescas por taza (una ramita pequeña). Tapar. Tomar puntualmente tras las comidas. NO sobredosificar ni usar a diario: el ascaridol es tóxico acumulativo.",
      },
    },
    contraindicaciones: [
      "Contraindicado en embarazo y lactancia (abortivo)",
      "No usar en niños pequeños",
      "Tóxico en dosis altas o uso prolongado (ascaridol neuro y hepatotóxico)",
      "Nunca usar el aceite esencial puro por vía interna",
    ],
    categorias: ["digestivas"],
  },
  {
    slug: "rosa-mosqueta",
    nombre: "Rosa Mosqueta",
    nombreCientifico: "Rosa rubiginosa",
    familia: "Rosaceae",
    descripcionBreve: "El tesoro cosmético del sur de Chile. Su aceite regenera cicatrices, estrías y piel madura.",
    descripcionCompleta: "La rosa mosqueta es un arbusto naturalizado en el sur de Chile, donde crece silvestre y se cosecha su fruto (el escaramujo). De sus semillas se extrae por prensado en frío un aceite excepcional: ~40% ácido linoleico y ~35% ácido alfa-linolénico (omega-3), además de trazas de ácido transretinoico —precursor natural de la vitamina A—, tocoferoles y carotenoides. Es uno de los aceites regeneradores más valorados del mundo, ícono de la cosmética natural chilena. El fruto, además, es riquísimo en vitamina C.",
    propiedades: ["regenerador", "cicatrizante", "antioxidante"],
    usosMedicinales: [
      "Regeneración de la piel tras heridas y cirugías",
      "Atenuación de cicatrices y quemaduras",
      "Aporte de vitamina C (fruto) para el sistema inmune",
      "Antioxidante frente al daño solar acumulado",
    ],
    usosCosmeticos: [
      "Aceite antiedad para piel madura — estimula el colágeno",
      "Atenúa estrías, cicatrices y manchas",
      "Activo reparador en sérums y aceites faciales",
      "Nutritivo para pieles secas y desvitalizadas",
    ],
    preparacion: {
      maceracion: {
        temperatura: "Ambiente (frío)",
        tiempo: "Uso directo",
        descripcion: "El aceite se obtiene por prensado en frío de las semillas. Uso directo sobre la piel o al 5–15% en formulaciones. Termosensible: incorporar siempre bajo 38 °C y conservar refrigerado.",
      },
      infusion: {
        temperatura: "75 °C",
        tiempo: "8 min",
        descripcion: "Con el fruto (escaramujo) seco y troceado, como infusión rica en vitamina C. Temperatura baja para preservarla.",
      },
    },
    contraindicaciones: [
      "El aceite se oxida (enrancia) con facilidad — conservar en frío y oscuridad",
      "En pieles muy grasas o acneicas puede resultar comedogénico en exceso",
      "Realizar prueba de parche en pieles reactivas",
      "No exponer el aceite a calor alto (degrada el retinoico y los omega)",
    ],
    categorias: ["cicatrizantes", "piel-cosmetica"],
  },
  {
    slug: "manzanilla",
    nombre: "Manzanilla",
    nombreCientifico: "Matricaria chamomilla",
    familia: "Asteraceae",
    descripcionBreve: "La flor calmante universal. Digestiva, antiinflamatoria y suave para la piel más sensible.",
    descripcionCompleta: "La manzanilla es quizá la planta medicinal más popular de Chile y el mundo. Sus pequeñas flores concentran un aceite esencial con camazuleno —de intenso color azul y potente acción antiinflamatoria— y bisabolol, junto a flavonoides como la apigenina, de efecto ansiolítico y sedante suave, y mucílagos. Esta combinación la hace digestiva, antiinflamatoria, calmante y cicatrizante, apta incluso para bebés y pieles muy sensibles.",
    propiedades: ["antiinflamatorio", "digestivo", "sedante"],
    usosMedicinales: [
      "Digestiones difíciles, cólicos y gases",
      "Calmante suave de la ansiedad y ayuda para dormir",
      "Antiinflamatorio de mucosas (gárgaras, ojos, vías digestivas)",
      "Antiespasmódico en cólicos menstruales e intestinales",
      "Cicatrizante de irritaciones leves de la piel",
    ],
    usosCosmeticos: [
      "Activo calmante para pieles sensibles, reactivas y con rojeces",
      "Agua floral (hidrolato) como tónico suave y descongestivo",
      "Extracto para contorno de ojos y pieles delicadas",
      "Aclara y da brillo al cabello rubio",
    ],
    preparacion: {
      infusion: {
        temperatura: "90 °C",
        tiempo: "8–10 min",
        descripcion: "Flores secas (2 g/200 ml). Tapar bien para no perder los aceites. Bebida digestiva y relajante; compresa fría para ojos irritados; enjuague calmante para la piel.",
      },
      maceracion: {
        temperatura: "Ambiente (método solar)",
        tiempo: "3–4 semanas",
        descripcion: "Flores en aceite vegetal para un oleato antiinflamatorio y calmante, base de bálsamos para pieles sensibles.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3 semanas",
        descripcion: "Flores en alcohol 70° (1:5). Al 3–5% en cosmética como activo calmante.",
      },
    },
    contraindicaciones: [
      "Posible alergia en personas sensibles a las Asteráceas (margaritas)",
      "En dosis muy altas puede ser emética",
      "Precaución con anticoagulantes (contenido de cumarinas)",
      "Prueba de parche antes del uso tópico en piel muy reactiva",
    ],
    categorias: ["digestivas", "sistema-nervioso", "antiinflamatorias", "piel-cosmetica"],
  },
  {
    slug: "cola-de-caballo",
    nombre: "Cola de Caballo",
    nombreCientifico: "Equisetum arvense",
    familia: "Equisetaceae",
    descripcionBreve: "Un fósil viviente rico en sílice. Diurético, remineralizante y reafirmante de piel, cabello y uñas.",
    descripcionCompleta: "La cola de caballo es una de las plantas más antiguas del planeta, un fósil viviente sin flores que se reproduce por esporas y crece en lugares húmedos de Chile. Es excepcionalmente rica en sílice (ácido silícico) —hasta un 10% de su peso seco—, además de potasio, flavonoides y saponinas. El silicio es esencial para la síntesis de colágeno y elastina, lo que explica su fama como remineralizante y reafirmante de los tejidos, y su acción diurética la hace clásica en las curas depurativas.",
    propiedades: ["diurético", "remineralizante", "reafirmante"],
    usosMedicinales: [
      "Diurético en retención de líquidos y curas depurativas",
      "Remineralizante (aporte de silicio) para huesos, uñas y cabello",
      "Cicatrizante y hemostático por sus taninos y sílice",
      "Astringente en diarreas leves",
      "Apoyo en infecciones urinarias leves (aumenta la diuresis)",
    ],
    usosCosmeticos: [
      "Reafirmante y antiedad — estimula el colágeno y la elastina",
      "Fortalecedor de cabello y uñas (silicio)",
      "Astringente para pieles grasas y poros dilatados",
      "Activo en tónicos y champús anticaída",
    ],
    preparacion: {
      decoccion: {
        temperatura: "100 °C",
        tiempo: "20–30 min",
        descripcion: "El silicio se libera mejor con hervor prolongado: 3 g de planta seca por 300 ml, hervir tapado. Bebida diurética y remineralizante, o enjuague fortalecedor para el cabello.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3 semanas",
        descripcion: "Planta seca en alcohol 70° (1:5). Al 5% en cosmética como activo reafirmante.",
      },
    },
    contraindicaciones: [
      "No usar en edemas por insuficiencia cardíaca o renal grave",
      "El uso prolongado puede reducir la tiamina (vitamina B1) — hacer curas cortas",
      "Evitar en embarazo y lactancia",
      "Identificar bien la especie: no confundir con Equisetum palustre (tóxico)",
    ],
    categorias: ["diureticas-depurativas", "cicatrizantes", "piel-cosmetica"],
  },
  {
    slug: "melisa",
    nombre: "Toronjil · Melisa",
    nombreCientifico: "Melissa officinalis",
    familia: "Lamiaceae",
    descripcionBreve: "La hierba del ánimo, con aroma a limón. Calma los nervios y el estómago; el 'toronjil' de las abuelas chilenas.",
    descripcionCompleta: "El toronjil o melisa es una hierba aromática con inconfundible aroma a limón, cultivada en huertos de todo Chile y clásica del té de las abuelas para 'los nervios'. Sus hojas contienen ácido rosmarínico y otros polifenoles —de acción antioxidante, ansiolítica y antiviral—, junto a un aceite esencial rico en citral y citronelal. Es un sedante suave que no produce dependencia, un buen digestivo, y su extracto es un antiviral reconocido frente al herpes labial.",
    propiedades: ["sedante", "digestivo", "antiviral"],
    usosMedicinales: [
      "Ansiedad, nerviosismo e insomnio leve",
      "Digestivo y antiespasmódico en molestias de origen nervioso",
      "Antiviral tópico frente al herpes labial (ácido rosmarínico)",
      "Calmante de palpitaciones de origen nervioso",
    ],
    usosCosmeticos: [
      "Activo antioxidante y calmante para pieles reactivas",
      "Agua floral (hidrolato) como tónico refrescante",
      "Extracto antiviral en bálsamos labiales",
      "Aromaterapia relajante en brumas y cremas",
    ],
    preparacion: {
      infusion: {
        temperatura: "85 °C",
        tiempo: "8–10 min",
        descripcion: "Hojas frescas o secas (2–3 g/200 ml). Tapar para conservar los aceites volátiles. Tomar en la tarde-noche para calmar o después de comer para digerir.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3 semanas",
        descripcion: "Hojas en alcohol 70° (1:5). Uso ansiolítico en gotas o al 3–5% en cosmética.",
      },
    },
    contraindicaciones: [
      "En dosis altas puede afectar la función tiroidea — precaución en hipotiroidismo",
      "Puede potenciar sedantes y ansiolíticos",
      "Evitar dosis altas en embarazo",
      "Somnolencia: precaución al conducir tras dosis altas",
    ],
    categorias: ["sistema-nervioso", "digestivas"],
  },
  {
    slug: "menta",
    nombre: "Menta",
    nombreCientifico: "Mentha × piperita",
    familia: "Lamiaceae",
    descripcionBreve: "Frescor y digestión en una hoja. Antiespasmódica, carminativa y descongestiva.",
    descripcionCompleta: "La menta piperita es un híbrido aromático cultivado en todo Chile, protagonista de infusiones y remedios caseros. Su aceite esencial es riquísimo en mentol y mentona, responsables de su frescor característico y de su acción antiespasmódica sobre el músculo liso digestivo, además de flavonoides y ácido rosmarínico. Es un digestivo y carminativo de primer orden, un descongestivo respiratorio y un analgésico tópico suave por el efecto frío del mentol.",
    propiedades: ["antiespasmódico", "digestivo", "descongestivo"],
    usosMedicinales: [
      "Digestiones difíciles, cólicos y gases (antiespasmódico)",
      "Náuseas y malestar estomacal",
      "Descongestivo respiratorio en resfríos (inhalaciones)",
      "Analgésico tópico suave (dolor de cabeza y muscular) por el mentol",
      "Alivio del colon irritable (aceite con cubierta entérica)",
    ],
    usosCosmeticos: [
      "Activo refrescante en cremas de piernas cansadas y pies",
      "Tónico purificante para pieles grasas",
      "Aroma y frescor en pasta dental y bálsamos labiales",
      "Estimulante del cuero cabelludo en champús",
    ],
    preparacion: {
      infusion: {
        temperatura: "85 °C",
        tiempo: "8 min",
        descripcion: "Hojas frescas o secas (2 g/200 ml). Tapar. Digestiva después de comer; en vahos para descongestionar las vías respiratorias.",
      },
      maceracion: {
        temperatura: "Ambiente",
        tiempo: "2–3 semanas",
        descripcion: "Hojas en aceite vegetal para un oleato refrescante, base de bálsamos para piernas y músculos.",
      },
    },
    contraindicaciones: [
      "No aplicar mentol ni aceite esencial en la cara de bebés y niños pequeños (riesgo de espasmo laríngeo)",
      "Puede agravar el reflujo gastroesofágico (relaja el esfínter esofágico)",
      "Evitar el aceite esencial puro sobre la piel sin diluir",
      "Precaución en cálculos biliares y hernia de hiato",
    ],
    categorias: ["digestivas", "sistema-nervioso"],
  },
  {
    slug: "romero",
    nombre: "Romero",
    nombreCientifico: "Salvia rosmarinus",
    familia: "Lamiaceae",
    descripcionBreve: "Aromática mediterránea aclimatada en todo Chile. Despierta la memoria, la circulación y el cabello.",
    descripcionCompleta: "El romero se cultiva en huertos de todo Chile y es una de las aromáticas medicinales más versátiles. Sus hojas contienen ácido rosmarínico y ácido carnósico —dos de los antioxidantes vegetales más potentes conocidos—, además de un aceite esencial rico en 1,8-cineol, alcanfor y alfa-pineno. Estimula la circulación (incluida la del cuero cabelludo), tonifica el sistema nervioso mejorando la concentración y la memoria, y tiene marcada acción antioxidante, antimicrobiana y colerética.",
    propiedades: ["antioxidante", "estimulante circulatorio", "antimicrobiano"],
    usosMedicinales: [
      "Estimulante de la memoria y la concentración",
      "Digestivo y colerético (estimula la bilis)",
      "Estimulante circulatorio en fatiga y baja presión",
      "Antiinflamatorio y analgésico en dolores musculares (uso tópico)",
      "Antimicrobiano y antiséptico",
    ],
    usosCosmeticos: [
      "Tónico capilar anticaída — estimula el folículo y el riego del cuero cabelludo",
      "Antioxidante antiedad en sérums y cremas",
      "Astringente y purificante para pieles grasas",
      "Agua de romero como tónico revitalizante",
    ],
    preparacion: {
      infusion: {
        temperatura: "90 °C",
        tiempo: "10 min",
        descripcion: "Hojas secas (2 g/200 ml). Tapar. Bebida tonificante y digestiva por la mañana; como enjuague capilar frío, estimula y da brillo.",
      },
      maceracion: {
        temperatura: "Ambiente (método solar)",
        tiempo: "3–4 semanas",
        descripcion: "Hojas en aceite vegetal para un oleato de masaje circulatorio y capilar, base de bálsamos musculares.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3 semanas",
        descripcion: "Hojas en alcohol 70° (1:5). Al 3–5% en tónicos capilares y faciales antioxidantes.",
      },
    },
    contraindicaciones: [
      "Evitar dosis altas en embarazo (emenagogo)",
      "Precaución en epilepsia por el alcanfor del aceite esencial",
      "Dosis altas pueden elevar la presión arterial",
      "No aplicar el aceite esencial puro sobre la piel",
    ],
    categorias: ["sistema-nervioso", "inmunidad-antimicrobianas", "piel-cosmetica", "digestivas"],
  },
  {
    slug: "tomillo",
    nombre: "Tomillo",
    nombreCientifico: "Thymus vulgaris",
    familia: "Lamiaceae",
    descripcionBreve: "El gran antiséptico respiratorio de la cocina y el botiquín. Expectorante y antimicrobiano potente.",
    descripcionCompleta: "El tomillo es una aromática mediterránea muy usada en Chile tanto en la cocina como en la herbolaria. Su aceite esencial es rico en timol y carvacrol —fenoles con una de las actividades antibacterianas, antifúngicas y antivirales más potentes del reino vegetal—, además de flavonoides y ácido rosmarínico. Es el remedio clásico para la tos y las infecciones respiratorias: expectorante, antitusivo y antiséptico de las vías aéreas.",
    propiedades: ["antimicrobiano", "expectorante", "antiséptico"],
    usosMedicinales: [
      "Tos, bronquitis y catarros (expectorante y antitusivo)",
      "Antiséptico de las vías respiratorias (vahos)",
      "Digestivo y carminativo",
      "Antiséptico bucal y de garganta (gárgaras)",
      "Antiparasitario intestinal tradicional",
    ],
    usosCosmeticos: [
      "Antimicrobiano en formulaciones para piel acneica",
      "Tónico purificante del cuero cabelludo (caspa)",
      "Conservante natural suave por su poder antimicrobiano",
      "Enjuague bucal antiséptico",
    ],
    preparacion: {
      infusion: {
        temperatura: "90 °C",
        tiempo: "10 min",
        descripcion: "Hojas secas (2 g/200 ml). Tapar bien. Bebida para la tos con miel; en vahos para descongestionar; como gárgara para la garganta.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3 semanas",
        descripcion: "Hojas en alcohol 70° (1:5). Antiséptico en gotas diluidas o al 2–3% en cosmética antiacné.",
      },
    },
    contraindicaciones: [
      "El aceite esencial es dermocáustico (timol/carvacrol) — máximo 0.5–1%, nunca puro",
      "Evitar dosis altas en embarazo y lactancia",
      "Precaución en hipertensión (dosis altas del AE)",
      "No usar el aceite esencial en niños pequeños",
    ],
    categorias: ["expectorantes", "inmunidad-antimicrobianas", "digestivas"],
  },
  {
    slug: "oregano",
    nombre: "Orégano",
    nombreCientifico: "Origanum vulgare",
    familia: "Lamiaceae",
    descripcionBreve: "Más que un condimento: uno de los antimicrobianos naturales más potentes. Digestivo y del sistema inmune.",
    descripcionCompleta: "El orégano, omnipresente en la cocina chilena, es también un potente medicinal. Su aceite esencial concentra carvacrol y timol —fenoles de altísima actividad antibacteriana, antifúngica y antiparasitaria, hoy muy estudiados—, junto a ácido rosmarínico y flavonoides antioxidantes. Se usa como antiséptico digestivo y respiratorio y como apoyo del sistema inmune frente a infecciones.",
    propiedades: ["antimicrobiano", "digestivo", "antioxidante"],
    usosMedicinales: [
      "Antiséptico digestivo e intestinal",
      "Apoyo del sistema inmune frente a infecciones",
      "Expectorante y antiséptico respiratorio",
      "Carminativo — alivia gases y espasmos",
      "Antifúngico y antiparasitario tradicional",
    ],
    usosCosmeticos: [
      "Antimicrobiano potente en formulaciones antiacné (muy diluido)",
      "Antifúngico en preparaciones para pie de atleta",
      "Conservante natural por su poder antimicrobiano",
    ],
    preparacion: {
      infusion: {
        temperatura: "90 °C",
        tiempo: "10 min",
        descripcion: "Hojas secas (2 g/200 ml). Tapar. Digestiva y antiséptica después de las comidas.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3 semanas",
        descripcion: "Hojas en alcohol 70° (1:5). Antiséptico en gotas muy diluidas.",
      },
    },
    contraindicaciones: [
      "El aceite esencial es dermocáustico — nunca puro, máximo 0.5%",
      "Evitar en embarazo (emenagogo en dosis altas)",
      "Puede irritar mucosas en dosis altas",
      "Precaución con anticoagulantes",
    ],
    categorias: ["inmunidad-antimicrobianas", "digestivas", "expectorantes"],
  },
  {
    slug: "ortiga",
    nombre: "Ortiga",
    nombreCientifico: "Urtica dioica",
    familia: "Urticaceae",
    descripcionBreve: "La maleza que cura. Remineralizante, depurativa y el mejor tónico natural para el cabello.",
    descripcionCompleta: "La ortiga crece silvestre en toda la zona centro-sur de Chile y, pese a su fama de urticante, es un alimento-medicina excepcional. Es muy rica en hierro, sílice, calcio y clorofila, además de flavonoides y ácidos orgánicos. Sus pelos urticantes inyectan histamina y ácido fórmico —que desaparecen al secar o cocer—. Actúa como remineralizante, diurético depurativo y antiinflamatorio, y su raíz regula la próstata.",
    propiedades: ["remineralizante", "diurético", "antiinflamatorio"],
    usosMedicinales: [
      "Remineralizante en anemia y fatiga (hierro y clorofila)",
      "Diurético y depurativo en gota y exceso de ácido úrico",
      "Antiinflamatorio en dolores articulares (artritis)",
      "La raíz apoya la hiperplasia benigna de próstata",
      "Antialérgico paradójico en rinitis estacional",
    ],
    usosCosmeticos: [
      "Tónico capilar anticaída y contra la caspa — clásico del pelo fuerte",
      "Seborregulador del cuero cabelludo y de pieles grasas",
      "Remineralizante y astringente en tónicos faciales",
      "Aporte de clorofila y minerales en mascarillas",
    ],
    preparacion: {
      infusion: {
        temperatura: "90 °C",
        tiempo: "10 min",
        descripcion: "Hojas secas (2–3 g/200 ml). Al secarse pierden el poder urticante. Bebida remineralizante y depurativa; como enjuague capilar frío, fortalece el cabello.",
      },
      decoccion: {
        temperatura: "100 °C",
        tiempo: "15 min",
        descripcion: "Raíz troceada para uso prostático, o planta entera como loción capilar concentrada.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3 semanas",
        descripcion: "Hojas en alcohol 70° (1:5). Al 5% en tónicos capilares anticaída.",
      },
    },
    contraindicaciones: [
      "Manipular fresca con guantes (pelos urticantes)",
      "Diurético: precaución con edemas por insuficiencia cardíaca o renal grave",
      "Puede potenciar hipotensores y antidiabéticos",
      "Evitar dosis altas en embarazo",
    ],
    categorias: ["diureticas-depurativas", "piel-cosmetica", "antiinflamatorias"],
  },
  {
    slug: "diente-de-leon",
    nombre: "Diente de León",
    nombreCientifico: "Taraxacum officinale",
    familia: "Asteraceae",
    descripcionBreve: "La flor amarilla del prado, gran depurativa. Diurética sin perder potasio y estimulante del hígado.",
    descripcionCompleta: "El diente de león crece en prados y jardines de todo Chile. Toda la planta es medicinal: la hoja es un diurético excepcional —tan potente como algunos fármacos pero rico en potasio, por lo que no lo agota—, y la raíz es colagoga y hepatoprotectora. Contiene principios amargos (taraxacina), inulina (prebiótico), flavonoides y triterpenos. Es la planta depurativa por excelencia, para el hígado y los riñones.",
    propiedades: ["diurético", "colagogo", "depurativo"],
    usosMedicinales: [
      "Diurético potente sin pérdida de potasio (retención de líquidos)",
      "Estimulante del hígado y de la bilis (raíz)",
      "Digestivo amargo que abre el apetito",
      "Depurativo en curas de primavera",
      "Apoyo en el metabolismo de azúcares (inulina)",
    ],
    usosCosmeticos: [
      "Extracto depurativo y antioxidante para pieles congestionadas",
      "Activo detox en formulaciones faciales",
      "Tónico para pieles apagadas",
    ],
    preparacion: {
      infusion: {
        temperatura: "90 °C",
        tiempo: "10 min",
        descripcion: "Hojas secas (2 g/200 ml) como diurético; tomar durante el día. Sabor amargo característico.",
      },
      decoccion: {
        temperatura: "100 °C",
        tiempo: "15 min",
        descripcion: "Raíz troceada para estimular el hígado y la vesícula. La raíz tostada es un sustituto del café.",
      },
    },
    contraindicaciones: [
      "No usar con obstrucción de las vías biliares",
      "Precaución en cálculos biliares (efecto colagogo)",
      "Posible alergia en sensibles a las Asteráceas",
      "Puede potenciar diuréticos y antidiabéticos",
    ],
    categorias: ["diureticas-depurativas", "digestivas"],
  },
  {
    slug: "calendula",
    nombre: "Caléndula",
    nombreCientifico: "Calendula officinalis",
    familia: "Asteraceae",
    descripcionBreve: "La flor naranja de la piel. Cicatrizante y antiinflamatoria suprema, apta hasta para bebés.",
    descripcionCompleta: "La caléndula es la reina de la cosmética reparadora y una de las plantas más cultivadas en huertos chilenos. Sus flores anaranjadas concentran triterpenos (como el faradiol, potente antiinflamatorio), flavonoides, carotenoides y mucílagos. Estimula la regeneración de los tejidos, calma la inflamación y protege la piel más delicada, siendo el activo clásico de ungüentos para heridas, dermatitis del pañal y pieles atópicas.",
    propiedades: ["cicatrizante", "antiinflamatorio", "regenerador"],
    usosMedicinales: [
      "Cicatrización de heridas, quemaduras leves y grietas",
      "Antiinflamatorio de la piel y las mucosas",
      "Dermatitis del pañal y pieles irritadas del bebé",
      "Antiséptico suave y antifúngico leve",
      "Calmante de eccemas y dermatitis",
    ],
    usosCosmeticos: [
      "Oleato y bálsamo reparador para pieles sensibles y atópicas",
      "Activo calmante en cremas para bebé y pieles reactivas",
      "Agua floral (hidrolato) como tónico suave",
      "Ingrediente estrella de ungüentos regeneradores",
    ],
    preparacion: {
      maceracion: {
        temperatura: "Ambiente (método solar)",
        tiempo: "3–4 semanas",
        descripcion: "Flores secas en aceite vegetal (oliva, girasol) por el método solar. El oleato de caléndula es la base cicatrizante por excelencia de bálsamos y ungüentos.",
      },
      infusion: {
        temperatura: "90 °C",
        tiempo: "10 min",
        descripcion: "Flores secas (2 g/200 ml). Compresa cicatrizante y calmante sobre la piel, o enjuague para irritaciones.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3 semanas",
        descripcion: "Flores en alcohol 70° (1:5). Al 3–5% en cosmética como activo cicatrizante.",
      },
    },
    contraindicaciones: [
      "Posible alergia en sensibles a las Asteráceas (margaritas)",
      "Evitar el uso interno en embarazo (emenagogo en dosis altas)",
      "Prueba de parche antes del uso tópico extendido en piel muy reactiva",
      "Uso interno con moderación; su fuerte es el uso tópico",
    ],
    categorias: ["cicatrizantes", "antiinflamatorias", "piel-cosmetica"],
  },
  {
    slug: "hiperico",
    nombre: "Hipérico · Hierba de San Juan",
    nombreCientifico: "Hypericum perforatum",
    familia: "Hypericaceae",
    descripcionBreve: "La hierba del ánimo y del oleato rojo. Antidepresiva suave y reparadora de la piel — pero con cuidado.",
    descripcionCompleta: "El hipérico o hierba de San Juan crece naturalizado en Chile. Sus flores contienen hipericina (de color rojo) e hiperforina, responsables de su acción antidepresiva leve a moderada por vía interna, con eficacia documentada. En uso externo, su oleato rojo es un excelente cicatrizante, antiinflamatorio y calmante para quemaduras y neuralgias. Es una planta poderosa que exige respeto por su fotosensibilidad y sus numerosas interacciones farmacológicas.",
    propiedades: ["antidepresivo", "cicatrizante", "antiinflamatorio"],
    usosMedicinales: [
      "Depresión leve a moderada y ansiedad (uso interno, con supervisión)",
      "Cicatrizante de heridas y quemaduras (oleato tópico)",
      "Antiinflamatorio y analgésico en neuralgias y dolores musculares",
      "Calmante de quemaduras solares (oleato)",
    ],
    usosCosmeticos: [
      "Oleato rojo reparador para pieles agredidas",
      "Activo antiinflamatorio y calmante en bálsamos",
      "Cuidado post-solar (solo de noche, por la fotosensibilidad)",
    ],
    preparacion: {
      maceracion: {
        temperatura: "Ambiente (método solar)",
        tiempo: "4–6 semanas",
        descripcion: "Flores frescas en aceite vegetal al sol: el aceite se tiñe de rojo intenso (hipericina). Oleato cicatrizante y antiinflamatorio de uso tópico nocturno.",
      },
      infusion: {
        temperatura: "90 °C",
        tiempo: "10 min",
        descripcion: "Flores secas (2 g/200 ml) para uso interno antidepresivo — solo con conocimiento de sus interacciones.",
      },
    },
    contraindicaciones: [
      "FUERTE fotosensibilizante — no exponer la piel tratada al sol",
      "Numerosas interacciones: anula anticonceptivos orales; con antidepresivos ISRS puede dar síndrome serotoninérgico; afecta anticoagulantes, inmunosupresores y antirretrovirales",
      "No combinar con ningún medicamento sin consultar (induce el CYP3A4)",
      "Evitar en embarazo y lactancia",
    ],
    categorias: ["sistema-nervioso", "cicatrizantes", "piel-cosmetica"],
  },
  {
    slug: "sauce-blanco",
    nombre: "Sauce Blanco",
    nombreCientifico: "Salix alba",
    familia: "Salicaceae",
    descripcionBreve: "La aspirina de la naturaleza. Su corteza contiene salicina, antiinflamatoria y analgésica.",
    descripcionCompleta: "El sauce blanco crece junto a los cursos de agua de Chile. Su corteza contiene salicina, un glucósido que el cuerpo transforma en ácido salicílico —el compuesto que inspiró la síntesis de la aspirina—, junto a taninos y flavonoides. Es un antiinflamatorio, analgésico y febrífugo natural, más suave con el estómago que la aspirina. En cosmética, la salicina es un exfoliante BHA de origen vegetal, ideal para la piel grasa.",
    propiedades: ["antiinflamatorio", "analgésico", "febrífugo"],
    usosMedicinales: [
      "Dolores de cabeza, musculares y articulares",
      "Antiinflamatorio en reumatismo y artritis",
      "Febrífugo (baja la fiebre)",
      "Dismenorrea (dolor menstrual)",
    ],
    usosCosmeticos: [
      "Exfoliante BHA natural (salicina) para piel grasa y acneica",
      "Astringente y seborregulador",
      "Activo suave para destapar poros",
      "Tónico purificante facial",
    ],
    preparacion: {
      decoccion: {
        temperatura: "100 °C",
        tiempo: "15–20 min",
        descripcion: "Corteza troceada (3 g/300 ml). Hervir para extraer la salicina. Bebida analgésica y antiinflamatoria; enfriada, como tónico astringente facial.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3–4 semanas",
        descripcion: "Corteza en alcohol 70° (1:5). Al 3–5% en cosmética como activo exfoliante y seborregulador.",
      },
    },
    contraindicaciones: [
      "Contraindicado en alergia a la aspirina y los salicilatos",
      "No dar a niños con fiebre viral (riesgo de síndrome de Reye)",
      "Evitar en embarazo, lactancia y úlcera gástrica",
      "Precaución con anticoagulantes",
    ],
    categorias: ["antiinflamatorias", "piel-cosmetica"],
  },
  {
    slug: "sauco",
    nombre: "Saúco",
    nombreCientifico: "Sambucus nigra",
    familia: "Adoxaceae",
    descripcionBreve: "Flor y baya contra los resfríos. Sudorífico, antiviral y suavizante de la piel.",
    descripcionCompleta: "El saúco se cultiva y crece asilvestrado en Chile. Sus flores blancas son sudoríficas, expectorantes y antivirales —remedio clásico de los estados gripales—, y sus bayas maduras, ricas en antocianinas, son un potente antiviral y tónico inmune. Contiene flavonoides (rutina, quercetina) y ácidos fenólicos. Sus flores dan además una loción suavizante y aclarante tradicional para la piel.",
    propiedades: ["sudorífico", "antiviral", "expectorante"],
    usosMedicinales: [
      "Resfríos y gripe: sudorífico que ayuda a bajar la fiebre (flor)",
      "Antiviral y tónico inmune (baya madura cocida)",
      "Expectorante en catarros y tos",
      "Diurético suave y depurativo",
    ],
    usosCosmeticos: [
      "Agua de flores de saúco como tónico suavizante y aclarante",
      "Activo antioxidante (bayas) en cosmética antiedad",
      "Calmante para pieles sensibles",
    ],
    preparacion: {
      infusion: {
        temperatura: "90 °C",
        tiempo: "10 min",
        descripcion: "Flores secas (2 g/200 ml). Tapar. Beber caliente para los resfríos (efecto sudorífico); fría, como tónico facial suavizante.",
      },
      decoccion: {
        temperatura: "100 °C",
        tiempo: "15 min",
        descripcion: "Bayas maduras cocidas (nunca crudas) para jarabe antiviral de invierno.",
      },
    },
    contraindicaciones: [
      "Tallos, hojas y bayas crudas son tóxicos (glucósidos cianogénicos) — cocer siempre las bayas",
      "Usar solo la flor y la baya madura y cocida",
      "Precaución con diuréticos y en embarazo",
      "No confundir con especies de Sambucus de bayas rojas (más tóxicas)",
    ],
    categorias: ["inmunidad-antimicrobianas", "expectorantes", "piel-cosmetica"],
  },
  {
    slug: "valeriana",
    nombre: "Valeriana",
    nombreCientifico: "Valeriana officinalis",
    familia: "Caprifoliaceae",
    descripcionBreve: "La raíz del sueño. Sedante y ansiolítica natural, sin la resaca de los somníferos.",
    descripcionCompleta: "La valeriana es una de las plantas sedantes más estudiadas del mundo, cultivada también en Chile. Su raíz —de olor intenso y característico— contiene ácido valerénico y valepotriatos, que potencian la acción del GABA, el principal neurotransmisor calmante del cerebro. Induce el sueño y reduce la ansiedad sin producir la dependencia ni la somnolencia diurna de muchos fármacos, y relaja además la musculatura.",
    propiedades: ["sedante", "ansiolítico", "antiespasmódico"],
    usosMedicinales: [
      "Insomnio de conciliación (ayuda a dormir)",
      "Ansiedad, estrés y nerviosismo",
      "Antiespasmódico en cólicos y tensión muscular de origen nervioso",
      "Calmante de palpitaciones nerviosas",
    ],
    usosCosmeticos: [
      "Uso cosmético limitado por su aroma intenso",
      "Aromaterapia de relajación en brumas de ambiente",
    ],
    preparacion: {
      decoccion: {
        temperatura: "100 °C",
        tiempo: "10 min",
        descripcion: "Raíz seca troceada (2 g/200 ml). Tomar una taza 30–60 min antes de dormir. El sabor y olor son fuertes; se puede combinar con melisa o manzanilla.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3–4 semanas",
        descripcion: "Raíz en alcohol 70° (1:5). Sedante en gotas antes de dormir.",
      },
    },
    contraindicaciones: [
      "Produce somnolencia — no conducir ni operar maquinaria tras tomarla",
      "Potencia el alcohol, los sedantes y los ansiolíticos",
      "Evitar en embarazo y lactancia",
      "Uso prolongado puede generar tolerancia — ciclar el consumo",
    ],
    categorias: ["sistema-nervioso"],
  },
  {
    slug: "lavanda",
    nombre: "Lavanda",
    nombreCientifico: "Lavandula angustifolia",
    familia: "Lamiaceae",
    descripcionBreve: "La flor de la calma y de la piel serena. Sedante, cicatrizante y el aceite esencial más seguro y versátil.",
    descripcionCompleta: "La lavanda se cultiva en todo Chile y es una de las plantas más queridas de la aromaterapia y la cosmética. Su aceite esencial es rico en linalol y acetato de linalilo, responsables de su efecto ansiolítico y sedante suave por vía inhalatoria, y de su acción cicatrizante y antiséptica sobre la piel. Es uno de los pocos aceites esenciales considerados seguros incluso en aplicaciones puntuales sin diluir, lo que la hace insustituible en el botiquín natural.",
    propiedades: ["sedante", "cicatrizante", "antiséptico"],
    usosMedicinales: [
      "Ansiedad, estrés e insomnio (aromaterapia)",
      "Cicatrización de heridas y quemaduras leves",
      "Antiséptico y calmante de picaduras",
      "Dolores de cabeza tensionales",
      "Repelente suave de insectos",
    ],
    usosCosmeticos: [
      "Calmante y regenerante para pieles sensibles y con acné",
      "Agua floral (hidrolato) como tónico equilibrante",
      "Activo aromaterapéutico en cremas y brumas relajantes",
      "Aromatizante natural de bálsamos y jabones",
    ],
    preparacion: {
      infusion: {
        temperatura: "90 °C",
        tiempo: "8–10 min",
        descripcion: "Flores secas (1–2 g/200 ml). Tapar. Bebida relajante antes de dormir; fría, como tónico calmante para la piel.",
      },
      maceracion: {
        temperatura: "Ambiente (método solar)",
        tiempo: "3–4 semanas",
        descripcion: "Flores en aceite vegetal para un oleato calmante y cicatrizante, base de bálsamos relajantes.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3 semanas",
        descripcion: "Flores en alcohol 70° (1:5). Al 3–5% en cosmética como activo calmante.",
      },
    },
    contraindicaciones: [
      "Dosis altas por vía interna pueden causar somnolencia",
      "Precaución con el aceite esencial en el primer trimestre del embarazo",
      "Realizar prueba de parche en pieles muy reactivas",
      "El aceite esencial de lavandín (híbrido) es más alcanforado — no confundir",
    ],
    categorias: ["sistema-nervioso", "cicatrizantes", "piel-cosmetica", "inmunidad-antimicrobianas"],
  },
  {
    slug: "aloe-vera",
    nombre: "Aloe Vera",
    nombreCientifico: "Aloe barbadensis",
    familia: "Asphodelaceae",
    descripcionBreve: "La planta del primer auxilio. Su gel calma, hidrata y repara quemaduras y heridas al instante.",
    descripcionCompleta: "El aloe vera se cultiva fácilmente en Chile y es una farmacia en una hoja. Hay que distinguir dos partes muy distintas: el gel transparente del interior —rico en polisacáridos (acemanano), aminoácidos, vitaminas y minerales, cicatrizante e hidratante— y el látex amarillo justo bajo la piel (acíbar), rico en antraquinonas de acción laxante drástica. El gel es el gran calmante y reparador de la piel; el látex, un purgante potente que exige mucha prudencia.",
    propiedades: ["cicatrizante", "hidratante", "calmante"],
    usosMedicinales: [
      "Quemaduras (incluido el sol), heridas y escaldaduras — cicatriza y refresca",
      "Hidratación y reparación de la piel",
      "Antiinflamatorio y calmante de irritaciones y picaduras",
      "Laxante potente (solo el látex/acíbar, con mucha precaución)",
      "Apoyo digestivo de la mucosa (gel, uso interno moderado)",
    ],
    usosCosmeticos: [
      "Gel base hidratante y calmante para todo tipo de piel",
      "After-sun y mascarillas refrescantes",
      "Vehículo acuoso ligero para otros activos",
      "Acondicionador y gel fijador natural para el cabello",
    ],
    preparacion: {
      maceracion: {
        temperatura: "Ambiente (frío)",
        tiempo: "Uso directo",
        descripcion: "Extraer el gel transparente del interior de la hoja (descartando el látex amarillo, que se lava). Usar fresco sobre la piel o incorporar como fase acuosa. Con agua siempre necesita conservante.",
      },
    },
    contraindicaciones: [
      "El látex/acíbar (laxante) está contraindicado en embarazo, lactancia y niños",
      "No usar el látex de forma prolongada — irrita el intestino",
      "El gel fresco se contamina en días: refrigerar y conservar",
      "Lavar bien el gel para eliminar restos de látex amarillo",
    ],
    categorias: ["cicatrizantes", "piel-cosmetica", "digestivas"],
  },
  {
    slug: "hamamelis",
    nombre: "Hamamelis",
    nombreCientifico: "Hamamelis virginiana",
    familia: "Hamamelidaceae",
    descripcionBreve: "El astringente y venotónico de la piel. Cierra poros, descongestiona y tonifica la circulación.",
    descripcionCompleta: "El hamamelis es un arbusto cuya corteza y hojas concentran taninos y flavonoides de marcada acción astringente, antiinflamatoria y venotónica. El clásico 'agua de hamamelis' es uno de los tónicos faciales más antiguos y usados del mundo. Tonifica las paredes venosas, reduce la congestión y estrecha los poros, siendo un aliado tanto de la circulación (varices, hemorroides) como de las pieles grasas y sensibles.",
    propiedades: ["astringente", "venotónico", "antiinflamatorio"],
    usosMedicinales: [
      "Venotónico en varices, piernas cansadas y hemorroides",
      "Astringente y hemostático en heridas y sangrados leves",
      "Antiinflamatorio de la piel irritada",
      "Descongestivo en golpes y hematomas (uso tópico)",
    ],
    usosCosmeticos: [
      "Tónico astringente para pieles grasas y poros dilatados",
      "Descongestivo del contorno de ojos (bolsas)",
      "After-shave calmante y astringente",
      "Activo para pieles con rosácea y capilares marcados",
    ],
    preparacion: {
      decoccion: {
        temperatura: "100 °C",
        tiempo: "15 min",
        descripcion: "Corteza u hojas (3 g/300 ml). Hervir y enfriar. Compresa astringente y descongestiva; base de tónicos faciales.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3 semanas",
        descripcion: "Corteza en alcohol 70° (1:5). Al 5–10% en tónicos astringentes (o usar el hidrolato comercial de hamamelis).",
      },
    },
    contraindicaciones: [
      "Uso interno prolongado no recomendado por su alta concentración de taninos",
      "Puede resecar en exceso las pieles muy secas",
      "Los preparados con alcohol pueden irritar pieles sensibles",
      "Prueba de parche antes del uso extendido",
    ],
    categorias: ["piel-cosmetica", "antiinflamatorias", "cicatrizantes"],
  },
  {
    slug: "arnica",
    nombre: "Árnica",
    nombreCientifico: "Arnica montana",
    familia: "Asteraceae",
    descripcionBreve: "La flor de los golpes. Antiinflamatoria y antihematoma — pero solo para uso externo sobre piel sana.",
    descripcionCompleta: "El árnica es la planta clásica para los golpes y contusiones. Sus flores contienen lactonas sesquiterpénicas (helenalina) y flavonoides que reducen la inflamación y favorecen la reabsorción de los hematomas y el edema. Es un remedio exclusivamente tópico: la helenalina es tóxica por vía interna, y no debe aplicarse sobre heridas abiertas ni mucosas. Bien usada, es insuperable para golpes, esguinces y dolores musculares.",
    propiedades: ["antiinflamatorio", "antihematoma", "analgésico"],
    usosMedicinales: [
      "Golpes, contusiones y hematomas (uso tópico sobre piel sana)",
      "Esguinces y torceduras",
      "Dolores musculares y agujetas",
      "Inflamación articular (uso externo)",
    ],
    usosCosmeticos: [
      "Oleato o gel para golpes y piernas cansadas",
      "Activo descongestivo en preparaciones de masaje",
      "No usar en pieles con acné activo o heridas",
    ],
    preparacion: {
      maceracion: {
        temperatura: "Ambiente",
        tiempo: "3–4 semanas",
        descripcion: "Flores secas en aceite vegetal para un oleato antihematoma, base de bálsamos y geles para golpes. Solo uso externo.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3 semanas",
        descripcion: "Flores en alcohol 70° (1:5). Diluir mucho (compresas al 10–20%) para uso tópico sobre piel intacta.",
      },
    },
    contraindicaciones: [
      "SOLO uso externo sobre piel sana — tóxico por vía interna",
      "No aplicar sobre heridas abiertas, mucosas ni piel dañada",
      "Puede causar dermatitis; alergia frecuente en sensibles a Asteráceas",
      "No usar en embarazo ni de forma prolongada",
    ],
    categorias: ["antiinflamatorias", "piel-cosmetica"],
  },
  {
    slug: "hinojo",
    nombre: "Hinojo",
    nombreCientifico: "Foeniculum vulgare",
    familia: "Apiaceae",
    descripcionBreve: "El anís del huerto. Digestivo y carminativo suave, clásico para los gases y el cólico del bebé.",
    descripcionCompleta: "El hinojo se cultiva en huertos de todo Chile y se aprovecha entero: bulbo, hojas y sobre todo semillas. Su aceite esencial es rico en trans-anetol, de sabor anisado y acción carminativa, antiespasmódica y expectorante. Es el remedio tradicional para los gases y los cólicos —incluidos los del lactante, como 'agua de hinojo'— y un galactagogo suave que favorece la producción de leche materna.",
    propiedades: ["digestivo", "carminativo", "galactagogo"],
    usosMedicinales: [
      "Gases, hinchazón y cólicos (incluido el cólico del lactante)",
      "Digestivo y antiespasmódico",
      "Galactagogo — estimula la producción de leche materna",
      "Expectorante suave en la tos",
    ],
    usosCosmeticos: [
      "Tónico descongestivo del contorno de ojos",
      "Agua aromática digestiva y refrescante",
      "Activo en formulaciones reafirmantes",
    ],
    preparacion: {
      infusion: {
        temperatura: "90 °C",
        tiempo: "10 min",
        descripcion: "Semillas ligeramente machacadas (1 cucharadita/200 ml). Tapar. Después de comer para los gases; muy diluida como agua de hinojo para el bebé (con criterio).",
      },
    },
    contraindicaciones: [
      "El anetol es fitoestrógeno — precaución en cáncer hormonodependiente y endometriosis",
      "El aceite esencial no debe usarse en embarazo, epilepsia ni en niños pequeños",
      "Usar en dosis culinarias-terapéuticas moderadas",
      "Posible alergia en sensibles a las Apiáceas",
    ],
    categorias: ["digestivas", "expectorantes"],
  },
  {
    slug: "anis",
    nombre: "Anís",
    nombreCientifico: "Pimpinella anisum",
    familia: "Apiaceae",
    descripcionBreve: "La semilla dulce de la buena digestión. Carminativa y expectorante, prima cercana del hinojo.",
    descripcionCompleta: "El anís (anís verde) es una de las semillas digestivas más antiguas y queridas. Como el hinojo, debe su aroma y su acción al trans-anetol de su aceite esencial, carminativo, antiespasmódico y expectorante. Se usa tradicionalmente tras las comidas para los gases y las digestiones difíciles, y en jarabes para la tos por su suave efecto expectorante y su sabor agradable.",
    propiedades: ["digestivo", "carminativo", "expectorante"],
    usosMedicinales: [
      "Digestiones difíciles, gases y cólicos",
      "Antiespasmódico digestivo",
      "Expectorante en la tos (jarabes)",
      "Galactagogo suave",
    ],
    usosCosmeticos: [
      "Aromatizante natural de bálsamos labiales y pastas dentales",
      "Agua aromática digestiva",
    ],
    preparacion: {
      infusion: {
        temperatura: "90 °C",
        tiempo: "10 min",
        descripcion: "Semillas machacadas (1 cucharadita/200 ml). Tapar. Bebida digestiva después de las comidas.",
      },
    },
    contraindicaciones: [
      "El anetol es fitoestrógeno — precaución en tumores hormonodependientes",
      "El aceite esencial no se usa en embarazo ni en niños pequeños",
      "Posible alergia en sensibles a las Apiáceas",
      "No confundir con el anís estrellado japonés (tóxico)",
    ],
    categorias: ["digestivas", "expectorantes"],
  },
  {
    slug: "cardo-mariano",
    nombre: "Cardo Mariano",
    nombreCientifico: "Silybum marianum",
    familia: "Asteraceae",
    descripcionBreve: "El gran protector del hígado. Su silimarina regenera y blinda las células hepáticas.",
    descripcionCompleta: "El cardo mariano, naturalizado en Chile, es el hepatoprotector vegetal más estudiado del mundo. Sus semillas concentran silimarina —un complejo de flavonolignanos, sobre todo silibinina— que estabiliza la membrana de los hepatocitos, estimula su regeneración y actúa como potente antioxidante hepático. Es un clásico de apoyo al hígado tras excesos, exposición a toxinas o en el hígado graso.",
    propiedades: ["hepatoprotector", "antioxidante", "regenerador hepático"],
    usosMedicinales: [
      "Protección y regeneración del hígado",
      "Apoyo en hígado graso y tras excesos o toxinas",
      "Antioxidante hepático",
      "Digestivo y colerético suave",
    ],
    usosCosmeticos: [
      "El aceite de sus semillas es antioxidante y regenerante para la piel",
      "Activo protector frente al estrés oxidativo cutáneo",
    ],
    preparacion: {
      decoccion: {
        temperatura: "100 °C",
        tiempo: "15 min",
        descripcion: "Semillas machacadas (1 cucharadita/200 ml). La silimarina se extrae mejor con las semillas trituradas. Tomar como apoyo hepático en curas.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3–4 semanas",
        descripcion: "Semillas en alcohol 70° (1:5). Uso hepatoprotector en gotas.",
      },
    },
    contraindicaciones: [
      "Posible alergia en sensibles a las Asteráceas",
      "Puede alterar el metabolismo de algunos fármacos (consultar)",
      "Evitar con obstrucción de las vías biliares",
      "Efecto laxante leve en dosis altas",
    ],
    categorias: ["digestivas", "diureticas-depurativas"],
  },
  {
    slug: "equinacea",
    nombre: "Equinácea",
    nombreCientifico: "Echinacea purpurea",
    familia: "Asteraceae",
    descripcionBreve: "El escudo del invierno. Estimula las defensas para prevenir y acortar los resfríos.",
    descripcionCompleta: "La equinácea es la planta inmunoestimulante por excelencia, hoy muy usada también en Chile. Sus raíces y partes aéreas contienen alcamidas, polisacáridos y derivados del ácido cafeico (equinacósido) que activan los macrófagos y las defensas inespecíficas del organismo. Tomada a los primeros síntomas, ayuda a prevenir y acortar los resfríos y las gripes, y en uso tópico es cicatrizante y antiséptica.",
    propiedades: ["inmunoestimulante", "antiviral", "cicatrizante"],
    usosMedicinales: [
      "Prevención y tratamiento temprano de resfríos y gripe",
      "Estimulante de las defensas en infecciones recurrentes",
      "Cicatrizante y antiséptico en heridas (uso tópico)",
      "Antiinflamatorio de las vías respiratorias",
    ],
    usosCosmeticos: [
      "Activo cicatrizante y regenerante para pieles dañadas",
      "Antiinflamatorio para pieles sensibles",
      "Extracto reparador en cremas antiedad",
    ],
    preparacion: {
      decoccion: {
        temperatura: "100 °C",
        tiempo: "15 min",
        descripcion: "Raíz troceada (2 g/200 ml). Tomar a los primeros síntomas de resfrío, en ciclos cortos.",
      },
      tintura: {
        temperatura: "Ambiente",
        tiempo: "3–4 semanas",
        descripcion: "Raíz o planta en alcohol 70° (1:5). Inmunoestimulante en gotas durante 7–10 días seguidos, no de forma continua.",
      },
    },
    contraindicaciones: [
      "Contraindicada en enfermedades autoinmunes (estimula el sistema inmune)",
      "Usar en ciclos cortos, no de forma continua prolongada",
      "Posible alergia en sensibles a las Asteráceas",
      "Precaución con inmunosupresores",
    ],
    categorias: ["inmunidad-antimicrobianas", "cicatrizantes"],
  },
  {
    slug: "jengibre",
    nombre: "Jengibre",
    nombreCientifico: "Zingiber officinale",
    familia: "Zingiberaceae",
    descripcionBreve: "La raíz que enciende el fuego digestivo. Antináuseas, antiinflamatoria y calorífica.",
    descripcionCompleta: "El jengibre, hoy común en Chile, es una de las raíces medicinales más versátiles. Sus compuestos picantes —gingeroles y shogaoles— le dan una potente acción digestiva, antiemética (contra las náuseas y el mareo), antiinflamatoria y estimulante de la circulación, con un efecto calorífico que reconforta en los resfríos. Es uno de los mejores remedios naturales frente a las náuseas, incluidas las del embarazo y los viajes.",
    propiedades: ["digestivo", "antiemético", "antiinflamatorio"],
    usosMedicinales: [
      "Náuseas y mareos (viaje, embarazo, digestivas)",
      "Digestivo y carminativo",
      "Antiinflamatorio en dolores articulares y musculares",
      "Calorífico en resfríos y mala circulación",
      "Estimulante de la circulación periférica",
    ],
    usosCosmeticos: [
      "Estimulante de la circulación del cuero cabelludo (anticaída)",
      "Antioxidante en cosmética antiedad",
      "Activo calorífico en preparaciones de masaje",
    ],
    preparacion: {
      decoccion: {
        temperatura: "100 °C",
        tiempo: "10 min",
        descripcion: "Rodajas de raíz fresca (3–5 g/300 ml). Hervir suave. Bebida digestiva y calorífica; con limón y miel para los resfríos.",
      },
      maceracion: {
        temperatura: "Ambiente",
        tiempo: "2–3 semanas",
        descripcion: "Raíz en aceite vegetal para un oleato caliente de masaje circulatorio y muscular.",
      },
    },
    contraindicaciones: [
      "Precaución en cálculos biliares (colagogo)",
      "Efecto antiagregante — cuidado con anticoagulantes y antes de cirugías",
      "Dosis altas pueden agravar el reflujo y la úlcera",
      "Moderar en embarazo (dosis culinarias son seguras)",
    ],
    categorias: ["digestivas", "antiinflamatorias", "inmunidad-antimicrobianas"],
  },
  {
    slug: "curcuma",
    nombre: "Cúrcuma",
    nombreCientifico: "Curcuma longa",
    familia: "Zingiberaceae",
    descripcionBreve: "La raíz dorada antiinflamatoria. Curcumina antioxidante para el cuerpo y la piel.",
    descripcionCompleta: "La cúrcuma, de intenso color dorado, es una de las plantas antiinflamatorias más estudiadas de la actualidad. Su principio activo, la curcumina, inhibe mediadores de la inflamación (como el NF-κB y la COX-2) y es un potente antioxidante. Su gran limitación es la baja biodisponibilidad —se absorbe poco—, que mejora notablemente combinándola con pimienta negra (piperina) y grasas. En la piel es antiinflamatoria, antioxidante y antiacneica.",
    propiedades: ["antiinflamatorio", "antioxidante", "hepatoprotector"],
    usosMedicinales: [
      "Antiinflamatorio sistémico en dolores articulares",
      "Antioxidante y protector celular",
      "Apoyo digestivo y hepático (colerético)",
      "Coadyuvante en procesos inflamatorios crónicos",
    ],
    usosCosmeticos: [
      "Antiinflamatoria y antioxidante en mascarillas faciales",
      "Iluminadora y unificadora del tono (mascarillas)",
      "Activo antiacné por su acción antibacteriana",
      "Nota: tiñe la piel y las telas de amarillo",
    ],
    preparacion: {
      decoccion: {
        temperatura: "100 °C",
        tiempo: "10 min",
        descripcion: "Raíz fresca rallada o en polvo (1 cucharadita/300 ml) con una pizca de pimienta negra y un poco de grasa (leche, aceite) para mejorar la absorción. La clásica 'leche dorada'.",
      },
      maceracion: {
        temperatura: "Ambiente",
        tiempo: "2–3 semanas",
        descripcion: "Raíz en aceite vegetal para un oleato antiinflamatorio; base de bálsamos (tiñe de dorado).",
      },
    },
    contraindicaciones: [
      "Precaución en cálculos y obstrucción de las vías biliares (colagoga)",
      "Efecto antiagregante — cuidado con anticoagulantes y antes de cirugías",
      "Puede teñir la piel, uñas y ropa de amarillo",
      "Moderar dosis altas en embarazo",
    ],
    categorias: ["antiinflamatorias", "piel-cosmetica", "digestivas"],
  },
];

export function getPlanta(slug: string): Planta | undefined {
  return plantas.find((p) => p.slug === slug);
}

export function getPlantasByCategoria(key: CategoriaKey): Planta[] {
  return plantas.filter((p) => p.categorias.includes(key));
}

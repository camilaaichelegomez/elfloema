// Ingredientes adicionales de la página /ingredientes, agrupados por la categoría
// donde se muestran (misma clave que el id del acordeón). Las afirmaciones de
// tradición o evidencia débil van redactadas como «se le atribuye».

export type IngExtra = {
  nombre: string;
  inci?: string;
  que: string;
  funcion?: string[];
  uso?: string;
  ojo?: string;
  enLab?: boolean;
  usadoEn?: string;
};

export type SeccionExtra = {
  titulo?: string;
  nota?: string;
  items: IngExtra[];
};

export const SECCIONES_EXTRA: Record<string, SeccionExtra> = {
  bases: {
    items: [
      {
        nombre: "Manteca de Karité",
        inci: "Butyrospermum Parkii (Shea) Butter",
        enLab: true,
        usadoEn: "Firmeza, Hidrata",
        que: "Grasa sólida extraída de las nueces del árbol africano del karité. Sus ácidos oleico y esteárico la hacen cremosa y nutritiva, y su fracción insaponificable (triterpenos, tocoferoles, esteroles) le suma un efecto calmante y antioxidante.",
        funcion: [
          "Emoliente nutritivo: alivia la sensación de piel tirante",
          "Estructurante suave en cremas, bálsamos y barras",
          "Funde cerca de la temperatura de la piel",
        ],
        uso: "3–10% en cremas · 20–50% en bálsamos y mantecas corporales. Va en la fase oleosa (se funde a 60–70°C).",
        ojo: "Si se enfría muy lento puede granularse (cristales de estearina): enfría rápido o recalienta y vuelve a enfriar. La sin refinar huele ahumado.",
      },
      {
        nombre: "Manteca de Café Verde",
        inci: "Coffea Arabica (Coffee) Seed Butter / Oil",
        usadoEn: "Firmeza",
        que: "Grasa obtenida de granos de café sin tostar. Aporta ácidos linoleico y palmítico, esteroles y tocoferoles: un emoliente de tacto más seco que otras mantecas, con cierto poder antioxidante.",
        funcion: [
          "Emoliente de tacto seco, agradable en piel madura",
          "Antioxidante suave por sus tocoferoles",
          "Se le atribuye un efecto tonificante y reafirmante; la evidencia clínica de ese efecto es limitada",
        ],
        uso: "2–10% en la fase oleosa.",
      },
      {
        nombre: "Manteca de Cacao",
        inci: "Theobroma Cacao (Cocoa) Seed Butter",
        que: "Grasa dura y quebradiza, rica en ácidos esteárico, oleico y palmítico. Funde justo bajo la temperatura de la piel (~34°C), y por eso da esa sensación «derretida».",
        funcion: [
          "Nutritiva y protectora: labios, manos y cuerpo",
          "Da dureza y brillo a bálsamos y labiales",
          "Aroma a chocolate natural (la desodorizada casi no huele)",
        ],
        uso: "2–10% en cremas · 10–30% en bálsamos y labiales.",
        ojo: "En piel muy grasa puede sentirse pesada en el rostro.",
      },
      {
        nombre: "Manteca de Mango",
        inci: "Mangifera Indica (Mango) Seed Butter",
        que: "Manteca suave y poco pegajosa, rica en ácidos esteárico y oleico. Más ligera y menos aceitosa que el karité, con muy buen deslizamiento.",
        funcion: ["Emoliente de absorción agradable", "Alternativa al karité cuando buscas un tacto más seco"],
        uso: "3–10% en cremas · 10–30% en bálsamos.",
      },
      {
        nombre: "Cera de Candelilla",
        inci: "Euphorbia Cerifera (Candelilla) Wax",
        que: "Cera vegetal de un arbusto del desierto mexicano, dura y brillante. La alternativa vegana a la cera de abeja.",
        funcion: ["Da estructura y brillo a labiales y bálsamos", "Forma una película protectora sobre la piel"],
        uso: "Para reemplazar cera de abeja usa ~50% de la cantidad (es más dura). Punto de fusión: 68–73°C.",
      },
      {
        nombre: "Cera de Carnauba",
        inci: "Copernicia Cerifera (Carnauba) Wax",
        que: "La cera vegetal más dura y de mayor punto de fusión (~80–86°C), obtenida de palmas de Brasil. Da dureza y un brillo espejo.",
        uso: "1–5% en barras y labiales. Sube el punto de fusión de toda la mezcla.",
      },
      {
        nombre: "Lanolina",
        inci: "Lanolin",
        que: "Grasa natural de la lana de oveja. Emoliente y oclusiva muy eficaz: retiene la humedad de la piel.",
        uso: "2–10% en bálsamos para piel muy seca.",
        ojo: "No es vegana y algunas personas sensibles reaccionan a ella. Usa grado cosmético (purificada).",
      },
    ],
  },

  aceites: {
    nota: "Los aceites ricos en linoleico y linolénico se enrancian rápido: guárdalos frescos y en oscuro, y agrega 0.1–0.5% de vitamina E. Mira también Rosa mosqueta, Jojoba, Argán y Escualano al final de la página.",
    items: [
      {
        nombre: "Aceite de Almendras Dulces",
        inci: "Prunus Amygdalus Dulcis (Sweet Almond) Oil",
        enLab: true,
        usadoEn: "Fluye, Mate",
        que: "Aceite ligero de tacto sedoso, con ~62–75% de ácido oleico y 17–30% de linoleico. El emoliente vegetal más versátil para piel y masaje.",
        funcion: [
          "Suaviza y nutre sin dejar una película pesada",
          "Excelente base de aceites de masaje y desmaquillantes",
          "Vehículo de aceites esenciales",
        ],
        uso: "5–100% según el producto.",
        ojo: "Evitar si hay alergia a frutos secos.",
      },
      {
        nombre: "Aceite de Sésamo",
        inci: "Sesamum Indicum (Sesame) Seed Oil",
        enLab: true,
        usadoEn: "Fluye",
        que: "Aceite de tacto medio, con ~35–45% de oleico y ~35–45% de linoleico, y antioxidantes propios (sesamol, sesamina) que lo hacen bastante estable. Es el aceite clásico del masaje ayurvédico.",
        funcion: [
          "Emoliente nutritivo y estable",
          "Buen medio de deslizamiento para masaje",
          "Se le atribuye una acción tonificante y «calentadora» (tradición ayurvédica)",
        ],
        uso: "5–100% según el producto.",
        ojo: "Alergeno frecuente (semillas). Sin refinar tiene aroma marcado.",
      },
      {
        nombre: "Aceite de Coco Virgen",
        inci: "Cocos Nucifera (Coconut) Oil",
        enLab: true,
        que: "Tiene ~45–52% de ácido láurico. Es sólido bajo ~24°C y se derrite en la mano. Muy estable, con la actividad antimicrobiana propia del láurico.",
        funcion: [
          "Emoliente y acondicionador capilar (penetra la fibra del cabello)",
          "En pre-lavado reduce la pérdida de proteínas del cabello (evidencia en cabello)",
          "Base de jabones y desodorantes",
        ],
        uso: "5–30% según el producto.",
        ojo: "Puede resultar comedogénico en rostro de piel grasa.",
      },
      {
        nombre: "Monoi de Tahití",
        inci: "Cocos Nucifera (Monoi) Oil",
        enLab: true,
        usadoEn: "Peina",
        que: "Aceite de coco macerado con flores de tiaré (Gardenia taitensis), con denominación de origen de la Polinesia Francesa. Aroma floral delicado y gran suavidad.",
        funcion: ["Nutre cabello seco y rizado", "Aporta aroma sin perfume añadido"],
        uso: "3–10% en leches capilares y cremas.",
      },
      {
        nombre: "Aceite de Oliva",
        inci: "Olea Europaea (Olive) Fruit Oil",
        que: "Con ~55–80% de ácido oleico y trazas de escualeno y polifenoles. Nutritivo y de tacto rico.",
        funcion: ["Ideal para piel muy seca y cuerpo", "Base clásica de jabones de castilla y bálsamos"],
        ojo: "Pesado en rostro graso. El virgen extra tiene aroma marcado.",
      },
      {
        nombre: "Aceite de Girasol Alto Oleico",
        inci: "Helianthus Annuus (Sunflower) Seed Oil",
        que: "Variedad con ≥75% de oleico: muy estable, de tacto ligero y económico. Buena base para macerados y aceites de masaje.",
        uso: "Hasta 100% en aceites de masaje y bases de macerado.",
        ojo: "El girasol común es rico en linoleico y se enrancia rápido: busca el «alto oleico».",
      },
      {
        nombre: "Aceite de Semilla de Uva",
        inci: "Vitis Vinifera (Grape) Seed Oil",
        que: "Muy ligero, con ~65–75% de linoleico. Se absorbe rápido y deja un tacto seco: buen aliado de pieles mixtas y grasas.",
        ojo: "Se enrancia con facilidad. Guárdalo frío y con vitamina E.",
      },
      {
        nombre: "Aceite de Avellana",
        inci: "Corylus Avellana (Hazel) Seed Oil",
        que: "~70–80% de oleico. Ligero, se absorbe rápido y deja un tacto seco; se usa en pieles mixtas.",
        ojo: "Evitar si hay alergia a frutos secos.",
      },
      {
        nombre: "Aceite de Macadamia",
        inci: "Macadamia Ternifolia Seed Oil",
        que: "Rico en ácido palmitoleico (~15–25%), un ácido graso presente en el sebo de la piel joven. Nutritivo, de buena extensión y muy estable.",
        funcion: ["Piel madura y seca", "Puntas de cabello reseco"],
      },
      {
        nombre: "Aceite de Aguacate",
        inci: "Persea Gratissima (Avocado) Oil",
        que: "Aceite denso, con ~50–70% de oleico y una fracción insaponificable rica en esteroles y tocoferoles. Muy nutritivo.",
        ojo: "Pesado: mejor para cuerpo, manos y cabello.",
      },
      {
        nombre: "Aceite de Sacha Inchi",
        inci: "Plukenetia Volubilis Seed Oil",
        que: "Semilla de la Amazonía con ~45–50% de ácido alfa-linolénico (omega-3) y ~35% de linoleico. Muy ligero.",
        ojo: "Se oxida muy rápido: frasco oscuro, refrigerado y vida corta.",
      },
      {
        nombre: "Aceite de Onagra",
        inci: "Oenothera Biennis (Evening Primrose) Oil",
        que: "~70% de linoleico y 8–10% de ácido gamma-linolénico (GLA). Se usa en piel seca y reactiva.",
        ojo: "Se oxida rápido: refrigerar.",
      },
      {
        nombre: "Macerado Oleoso de Caléndula",
        inci: "Calendula Officinalis Flower Extract (en aceite)",
        que: "Flores de caléndula maceradas en un aceite base (girasol, oliva, almendras). Aporta carotenoides y triterpenos; es el calmante clásico para piel irritada o sensible.",
        funcion: ["Se le atribuye acción calmante, cicatrizante y antiinflamatoria (uso tradicional; estudios modestos)"],
        uso: "10–100% según el producto.",
      },
      {
        nombre: "Aceite de Tamanu",
        inci: "Calophyllum Inophyllum Seed Oil",
        que: "Aceite verde oscuro, viscoso y de aroma fuerte, tradicional de la Polinesia. Se usa en cicatrices y piel dañada; se le atribuye acción cicatrizante y hay estudios preliminares.",
        uso: "1–10% por su color y olor.",
        ojo: "Haz prueba de parche antes de usarlo.",
      },
    ],
  },

  activos: {
    nota: "Los extractos y tinturas botánicas se describen con su uso tradicional; donde la evidencia es débil, se dice «se le atribuye».",
    items: [
      {
        nombre: "Cafeína",
        inci: "Caffeine",
        enLab: true,
        usadoEn: "Firmeza, Mate, Hidrata",
        que: "Alcaloide hidrosoluble del café. Sobre la piel actúa como antioxidante y vasoconstrictor leve: descongestiona y da un efecto tensor pasajero. En cuero cabelludo hay estudios que muestran que prolonga la fase anágena del folículo.",
        funcion: [
          "Descongestiona y tensa visiblemente (efecto temporal)",
          "Antioxidante",
          "Se usa en contorno de ojos, anticelulíticos y tónicos capilares",
        ],
        uso: "0.5–3%. Se disuelve en la fase acuosa caliente.",
        ojo: "Sobre ~3% puede cristalizar al enfriar. Los efectos reafirmantes duraderos no están bien demostrados: úsala por su acción descongestiva, no como «lifting».",
      },
      {
        nombre: "MaízCare — Biopolímero de Maíz",
        inci: "Hydrolyzed Corn Starch",
        enLab: true,
        usadoEn: "Firmeza, Purifica, Peina, Hidrata",
        que: "Biopolímero derivado del maíz que forma una película fina y flexible sobre la piel o el cabello.",
        funcion: [
          "Efecto tensor inmediato y visual mate / soft-focus que difumina",
          "En cabello: sella la cutícula y da brillo",
          "Alternativa vegetal a las siliconas formadoras de película",
        ],
        uso: "1–3% (sigue la ficha del proveedor).",
        ojo: "El efecto es de película: se nota al aplicar y se va al lavar. No cambia la estructura de la piel.",
      },
      {
        nombre: "Bisabolol",
        inci: "Bisabolol",
        que: "Alcohol sesquiterpénico obtenido de la manzanilla o del árbol candeia. Su acción calmante y antiinflamatoria está bien descrita en estudios de laboratorio y es el activo típico de los productos «para piel sensible».",
        uso: "0.1–1%. Liposoluble: va en la fase oleosa o en frío.",
      },
      {
        nombre: "Avena Coloidal",
        inci: "Avena Sativa (Oat) Kernel Flour",
        usadoEn: "Mascarilla Iluminadora",
        que: "Avena molida muy fina, con betaglucanos, lípidos y proteínas. Forma una capa protectora que calma la piel irritada o con picazón.",
        uso: "1–2% en productos que se dejan · 10–30% en mascarillas y baños.",
        ojo: "En productos con agua se enrancia y contamina fácil: necesita conservante.",
      },
      {
        nombre: "Cúrcuma",
        inci: "Curcuma Longa Root Powder",
        usadoEn: "Mascarilla Iluminadora",
        que: "Su pigmento, la curcumina, es antioxidante y antiinflamatorio en laboratorio, aunque su absorción por la piel es baja. En cosmética se usa sobre todo por su color y por la fama de «iluminadora».",
        uso: "1–5% en mascarillas en polvo.",
        ojo: "Mancha intensamente (piel clara, telas, lavamanos). Haz prueba de parche.",
      },
      {
        nombre: "Carbón Activado",
        inci: "Charcoal Powder",
        enLab: true,
        usadoEn: "Mascarilla Purificante",
        que: "Polvo de carbón muy poroso que adsorbe impurezas, sebo superficial y olores. La idea de «detox profundo» es marketing: limpia la superficie, como una arcilla.",
        uso: "1–10% en mascarillas · 0.5–2% en jabones.",
        ojo: "Mancha telas y lavamanos. No inhalar el polvo.",
      },
      {
        nombre: "Té Verde",
        inci: "Camellia Sinensis Leaf Extract",
        enLab: true,
        usadoEn: "Purifica",
        que: "Rico en catequinas (EGCG), antioxidantes y astringentes suaves. Lo tienes en tintura alcohólica.",
        funcion: [
          "Antioxidante (demostrado en laboratorio; la penetración en piel es limitada)",
          "Astringente suave para piel mixta o grasa",
        ],
        uso: "2–5% de tintura en la fase acuosa fría o tibia.",
        ojo: "El alcohol de la tintura suma al total: en piel sensible baja la dosis.",
      },
      {
        nombre: "Nalca",
        inci: "Gunnera Tinctoria Leaf Extract",
        enLab: true,
        usadoEn: "Purifica",
        que: "Planta gigante del bosque valdiviano; se usa la hoja en tintura. Uso tradicional astringente y depurativo; se le atribuye acción antiinflamatoria.",
        uso: "2–5% de tintura.",
      },
      {
        nombre: "Maqui",
        inci: "Aristotelia Chilensis Fruit Extract",
        enLab: true,
        que: "Baya chilena muy rica en antocianinas y polifenoles, antioxidantes en laboratorio. En tintura tiene color morado intenso.",
        ojo: "El color cambia con el pH y la luz, y puede teñir.",
      },
      {
        nombre: "Matico",
        inci: "Buddleja Globosa Leaf Extract",
        enLab: true,
        que: "Planta chilena de uso tradicional para heridas y como antiséptica. Hay estudios preliminares con sus extractos (verbascósido, flavonoides) que muestran actividad cicatrizante y antiinflamatoria.",
        funcion: ["Lo tienes en tintura y como infusión en tallow (junto a milenrama)"],
      },
      {
        nombre: "Tomillo",
        inci: "Thymus Vulgaris Extract",
        enLab: true,
        usadoEn: "Purifica",
        que: "Contiene timol y carvacrol, con actividad antimicrobiana descrita en laboratorio. En cosmética se usa en tintura y a dosis pequeñas.",
        uso: "1–3% de tintura.",
      },
      {
        nombre: "Pitra",
        inci: "Myrceugenia Exsucca Leaf",
        enLab: true,
        usadoEn: "Firmeza",
        que: "Árbol nativo del sur de Chile, de hoja aromática. De tradición astringente y antimicrobiana: se le atribuye esa acción. Lo tienes infusionado en tallow.",
      },
      {
        nombre: "Ortiga",
        inci: "Urtica Dioica Leaf Extract",
        enLab: true,
        que: "Rica en flavonoides, sílice y minerales. Se le atribuye acción astringente y seborreguladora, y de tradición se usa en el cabello.",
        uso: "1–5% en tónicos y cremas.",
      },
      {
        nombre: "Milenrama",
        inci: "Achillea Millefolium Extract",
        enLab: true,
        que: "Planta tradicional astringente y cicatrizante; se le atribuye acción antiinflamatoria. La tienes infusionada en tallow junto al matico.",
      },
      {
        nombre: "Regaliz",
        inci: "Glycyrrhiza Glabra Root Extract",
        que: "La raíz contiene glabridina y ácido glicirretínico, con acción antiinflamatoria y aclarante suave descrita en estudios.",
        uso: "0.1–1%.",
      },
      {
        nombre: "Manzanilla",
        inci: "Chamomilla Recutita (Matricaria) Flower Extract",
        que: "Contiene bisabolol y camazuleno, con acción calmante. Muy usada en pieles sensibles, irritadas o con enrojecimiento.",
        uso: "Como hidrolato, tintura o macerado.",
        ojo: "Personas alérgicas a las asteráceas (margarita, ambrosía) pueden reaccionar.",
      },
      {
        nombre: "Propóleo",
        inci: "Propolis Extract",
        que: "Resina que las abejas elaboran con brotes de plantas. Tiene flavonoides y actividad antimicrobiana y antioxidante descritas en laboratorio.",
        uso: "0.5–2% en forma de tintura.",
        ojo: "Alergeno conocido en personas sensibles a las abejas o a los bálsamos. Prueba de parche.",
      },
      {
        nombre: "Ácido Glicólico",
        inci: "Glycolic Acid",
        que: "AHA de molécula pequeña: penetra con facilidad, exfolia y renueva. El más potente (e irritante) de los AHA de uso cosmético.",
        uso: "5–10% a pH 3.5–4.",
        ojo: "Fotosensibiliza: uso nocturno y protector solar de día.",
      },
      {
        nombre: "Ácido Mandélico",
        inci: "Mandelic Acid",
        que: "AHA de molécula grande: penetra más lento y es más suave que el glicólico. Se elige para piel sensible o con manchas leves.",
        uso: "5–10% a pH 3.5–4.",
        ojo: "Fotosensibiliza: protector solar de día.",
      },
      {
        nombre: "Alfa-Arbutina",
        inci: "Alpha-Arbutin",
        que: "Inhibe la tirosinasa, la enzima que fabrica melanina: aclara manchas de forma gradual.",
        uso: "0.5–2% a pH 5–7.",
        ojo: "Evita pH muy ácido y calor prolongado, que la degradan.",
      },
      {
        nombre: "Bakuchiol",
        inci: "Bakuchiol",
        que: "Compuesto vegetal usado como alternativa al retinol. Un ensayo clínico aleatorizado comparó bakuchiol 0.5% con retinol 0.5%: mejoró arrugas y pigmentación de forma similar, con menos irritación.",
        uso: "0.5–1%. Liposoluble.",
      },
    ],
  },

  hidratantes: {
    items: [
      {
        nombre: "Xilitol",
        inci: "Xylitol",
        enLab: true,
        que: "Alcohol de azúcar que humecta la piel y deja una sensación fresca. Se usa como humectante de apoyo junto a la glicerina.",
        uso: "1–5%.",
      },
      {
        nombre: "Lactato de Sodio",
        inci: "Sodium Lactate",
        enLab: true,
        usadoEn: "Purifica",
        que: "Sal del ácido láctico. Es parte del factor natural de humectación de la piel (NMF) y, junto al ácido láctico, forma un tampón que estabiliza el pH.",
        uso: "1–5%.",
      },
      {
        nombre: "Betaína",
        inci: "Betaine",
        que: "Obtenida de la remolacha. Humectante suave que además reduce la irritación que causan los tensioactivos.",
        uso: "1–5%.",
      },
      {
        nombre: "Propanodiol",
        inci: "Propanediol",
        que: "Humectante y solvente de origen vegetal (de maíz). Mejora la sensación en piel y potencia la acción de los conservantes.",
        uso: "1–10%.",
      },
      {
        nombre: "Sorbitol",
        inci: "Sorbitol",
        que: "Humectante de origen vegetal, algo más ligero que la glicerina.",
        uso: "2–10%.",
      },
      {
        nombre: "Miel",
        inci: "Mel",
        que: "Humectante natural por su alta concentración de azúcares. Aporta suavidad y, en concentraciones muy altas, es antimicrobiana.",
        uso: "1–5%.",
        ojo: "En fórmulas con agua necesita conservante: no se conserva sola.",
      },
      {
        nombre: "Ceramidas",
        inci: "Ceramide NP",
        que: "Lípidos que forman el «cemento» de la barrera cutánea. Al aplicarlos reponen lo que la piel pierde con la sequedad o la irritación.",
        uso: "0.1–1%.",
      },
    ],
  },

  arcillas: {
    nota: "Las arcillas se mezclan con agua, hidrolato o yogur y no se usan con utensilios metálicos. Los polvos en productos con agua necesitan conservante.",
    items: [
      {
        nombre: "Arcilla Negra",
        enLab: true,
        usadoEn: "Mascarilla Purificante",
        que: "Su composición cambia según el proveedor (suele ser una mezcla de arcillas con minerales oscuros o con carbón). Pídele la ficha técnica a tu proveedor.",
        funcion: ["Absorbe sebo e impurezas en pieles grasas"],
      },
      {
        nombre: "Bentonita",
        inci: "Bentonite (Montmorillonita)",
        que: "Arcilla que se hincha mucho al mojarse y es muy absorbente. Forma pastas espesas y cremosas.",
        funcion: ["Mascarillas purificantes", "Suspende polvos en preparaciones acuosas"],
        uso: "10–100% en mascarillas en polvo · 1–3% como espesante.",
      },
      {
        nombre: "Rhassoul (Ghassoul)",
        inci: "Moroccan Lava Clay",
        que: "Arcilla marroquí rica en magnesio y silicio. Limpia con suavidad y deja una sensación sedosa, tanto en piel como en cabello.",
        uso: "Mascarillas, lavado de cabello y de rostro.",
      },
      {
        nombre: "Arcilla Rosa",
        inci: "Kaolin + Illite Rojo",
        que: "Mezcla de caolín y arcilla roja. Es la más suave de las coloreadas, ideal para piel sensible o seca.",
      },
      {
        nombre: "Almidón de Maíz y Arrowroot",
        inci: "Zea Mays Starch · Maranta Arundinacea Root Powder",
        que: "Almidones que absorben la humedad y dan un tacto sedoso. Se usan en polvos, desodorantes y para matificar.",
        uso: "5–20% en polvos · 1–5% en cremas.",
        ojo: "Húmedos favorecen el crecimiento de microorganismos: úsalos secos o con conservante.",
      },
      {
        nombre: "Dióxido de Titanio",
        inci: "Titanium Dioxide (CI 77891)",
        enLab: true,
        que: "Pigmento blanco opacificante y filtro solar físico. Da cobertura y blanquea.",
        uso: "1–5% como pigmento o blanqueador.",
        ojo: "Dispérsalo primero en un poco de glicerina o aceite y luego agrégalo a la mezcla: en seco forma grumos blancos. No inhalar el polvo. Usado así no es un protector solar.",
      },
      {
        nombre: "Óxidos de Hierro",
        inci: "Iron Oxides (CI 77491 / 77492 / 77499)",
        que: "Pigmentos minerales rojos, amarillos y negros, muy estables. Se mezclan para lograr tonos de piel, tierra y marrón en bases, polvos y labiales.",
        uso: "0.1–5% según el tono.",
      },
      {
        nombre: "Mica",
        inci: "Mica (CI 77019)",
        que: "Mineral en láminas finas que da brillo y efecto perlado a polvos, iluminadores y labiales.",
        ojo: "Elige proveedores con abastecimiento ético certificado.",
      },
    ],
  },

  tensioactivos: {
    nota: "Recuerda: los tensioactivos aniónicos (SCI, SLSA, SCS, glutamato) no se mezclan con los catiónicos (BTMS). Los anfóteros y no iónicos sí son compatibles con ambos.",
    items: [
      {
        nombre: "Disodium Cocoyl Glutamate",
        inci: "Disodium Cocoyl Glutamate",
        usadoEn: "Savia Limpiadora",
        que: "Tensioactivo aniónico muy suave, derivado del coco y del ácido glutámico. Trabaja bien a pH 5–6, cerca del pH de la piel, y da una espuma cremosa.",
        uso: "5–15%.",
      },
      {
        nombre: "Coco-Glucósido",
        inci: "Coco-Glucoside",
        enLab: true,
        usadoEn: "Savia Limpiadora",
        que: "Tensioactivo no iónico suave, hecho de azúcares y grasas del coco. Complementa a los aniónicos: mejora la espuma y reduce la irritación.",
        uso: "5–15%.",
      },
      {
        nombre: "Betaína de Coco",
        inci: "Cocamidopropyl Betaine",
        enLab: true,
        que: "Tensioactivo anfótero. Da espuma, espesa con un poco de sal y suaviza a los aniónicos.",
        uso: "3–10%.",
        ojo: "Trae trazas de impurezas que pueden sensibilizar a algunas personas.",
      },
      {
        nombre: "SLSA — Sodium Lauryl Sulfoacetate",
        inci: "Sodium Lauryl Sulfoacetate",
        enLab: true,
        que: "Tensioactivo aniónico en polvo, de espuma abundante y algo más suave que un sulfato clásico. Se usa en barras de limpieza y champús sólidos.",
        uso: "Según la fórmula (en barras es un componente mayor).",
      },
      {
        nombre: "SCS — Sodium Coco-Sulfate",
        inci: "Sodium Coco-Sulfate",
        enLab: true,
        que: "Sulfato de origen coco. Espuma abundante y desengrasa bien: más potente (y más resecante) que el SCI.",
        uso: "5–20%.",
        ojo: "Poco recomendable para piel sensible o seca.",
      },
      {
        nombre: "Polisorbato 80",
        inci: "Polysorbate 80",
        enLab: true,
        usadoEn: "Despoja",
        que: "Tensioactivo no iónico. En Despoja permite que el aceite se vuelva lechoso y se enjuague con agua.",
        uso: "1–10% según lo que se solubilice o emulsione.",
      },
      {
        nombre: "Polisorbato 20 (Tween 20)",
        inci: "Polysorbate 20",
        enLab: true,
        que: "Solubilizante de aceites esenciales en bases acuosas. Sin él los aceites flotan o dejan turbios los tónicos.",
        uso: "Aprox. 1 a 4 partes por cada parte de aceite esencial.",
      },
      {
        nombre: "Quillay",
        inci: "Quillaja Saponaria Bark Extract",
        que: "Corteza del árbol chileno quillay, rica en saponinas: espumante natural, tradicional para el lavado del cabello.",
        uso: "1–10% de extracto.",
        ojo: "Irrita los ojos: enjuaga bien.",
      },
    ],
  },

  emulsionantes: {
    items: [
      {
        nombre: "Monoestearato de Glicerina (GMS)",
        inci: "Glyceryl Stearate",
        enLab: true,
        que: "Coemulsionante no iónico de origen vegetal. Refuerza la emulsión y aporta cuerpo y suavidad.",
        uso: "2–5% junto a un emulsionante principal.",
      },
      {
        nombre: "Alcohol Estearílico",
        inci: "Stearyl Alcohol",
        enLab: true,
        que: "Alcohol graso sólido, primo del cetílico pero más cerúleo. Da estructura y cuerpo a cremas y acondicionadores.",
        uso: "2–5%.",
      },
      {
        nombre: "Goma Guar",
        inci: "Cyamopsis Tetragonoloba (Guar) Gum",
        enLab: true,
        que: "Espesante de origen vegetal (semilla de guar). Da cuerpo a geles y tónicos, y acondiciona el cabello.",
        uso: "0.2–1%.",
        ojo: "Dispérsala primero en glicerina para evitar grumos.",
      },
      {
        nombre: "Carragenina",
        inci: "Chondrus Crispus (Carrageenan)",
        que: "Espesante y gelificante extraído de algas rojas. Da geles suaves y elásticos.",
        uso: "0.2–1%.",
      },
      {
        nombre: "Agar-Agar",
        inci: "Gelidium Amansii (Agar)",
        que: "Gelificante de algas. Da geles firmes y opacos que se forman al enfriar.",
        uso: "0.5–2%. Se disuelve a ~90°C.",
      },
      {
        nombre: "Hidroxietilcelulosa",
        inci: "Hydroxyethylcellulose",
        que: "Espesante semi-natural derivado de la celulosa. Forma geles transparentes y estables.",
        uso: "0.5–1.5%.",
      },
    ],
  },

  esenciales: {
    nota: "Los siguientes aceites esenciales son comunes en cosmética natural pero no están en tu inventario actual. Dosis orientativas: rostro 0.2–1%, cuerpo 1–2%. Evita su uso sin asesoría en embarazo, lactancia, menores de 6 años y mascotas.",
    items: [
      {
        nombre: "AE Lavanda",
        inci: "Lavandula angustifolia",
        que: "Rico en linalol y acetato de linalilo. Calmante y suave; el aceite esencial más versátil.",
        uso: "Rostro 0.2–0.5% · cuerpo 1–2%.",
        ojo: "El linalol es un alérgeno de fragancia declarable.",
      },
      {
        nombre: "AE Árbol de Té",
        inci: "Melaleuca alternifolia",
        que: "El terpinen-4-ol le da actividad antimicrobiana demostrada; se usa en piel con imperfecciones.",
        uso: "0.5–2% en piel.",
        ojo: "Oxidado se vuelve sensibilizante: usa uno fresco. Tóxico para gatos y perros.",
      },
      {
        nombre: "AE Menta Piperita",
        inci: "Mentha piperita",
        que: "El mentol da sensación de frescor y alivio momentáneo.",
        uso: "Hasta ~1% en productos corporales.",
        ojo: "No usar en rostro ni cerca de la cara de bebés y niños pequeños.",
      },
      {
        nombre: "AE Eucalipto",
        inci: "Eucalyptus globulus",
        que: "Rico en 1,8-cineol: aroma limpio y descongestionante.",
        uso: "1–2% en cuerpo y ungüentos.",
        ojo: "No usar en niños pequeños.",
      },
      {
        nombre: "AE Romero",
        inci: "Rosmarinus officinalis",
        que: "De tradición estimulante en el cuidado del cabello; se le atribuye mejora del aspecto del cuero cabelludo.",
        uso: "0.5–1% en cuero cabelludo.",
        ojo: "Evitar en embarazo y epilepsia (el quimiotipo alcanfor).",
      },
      {
        nombre: "AE Geranio",
        inci: "Pelargonium graveolens",
        que: "Aroma floral con notas verdes; de tradición equilibrante de la piel.",
        ojo: "Contiene geraniol y citronelol, alérgenos declarables.",
      },
      {
        nombre: "AE Ylang Ylang",
        inci: "Cananga odorata",
        que: "Aroma floral dulce y muy intenso: se usa en pequeñas cantidades.",
        uso: "0.1–0.5%.",
      },
      {
        nombre: "AE Manzanilla",
        inci: "Chamaemelum nobile / Matricaria recutita",
        que: "Calmante clásico. La alemana es azul por el camazuleno.",
        ojo: "Puede reaccionar en personas alérgicas a las asteráceas.",
      },
      {
        nombre: "AE Incienso (Olíbano)",
        inci: "Boswellia carterii",
        que: "Aroma resinoso; de tradición se usa en piel madura y se le atribuye acción regeneradora.",
        uso: "0.2–1%.",
      },
      {
        nombre: "AE Pachulí",
        inci: "Pogostemon cablin",
        que: "Aroma terroso y persistente; fijador de fragancias.",
        uso: "0.1–0.5%.",
      },
      {
        nombre: "AE Cítricos (limón, naranja, pomelo, bergamota)",
        que: "Aromas frescos y muy volátiles; contienen limoneno, que se oxida con facilidad.",
        uso: "0.5–2%.",
        ojo: "Los prensados en frío son fotosensibilizantes, sobre todo la bergamota (bergapteno): evita el sol por 12–24 h o usa versiones sin furocumarinas (FCF).",
      },
    ],
  },

  preparaciones: {
    items: [
      {
        nombre: "Hidrolato de Triwe",
        inci: "Laurelia Sempervirens Leaf Water",
        enLab: true,
        usadoEn: "Savia Limpiadora",
        que: "Agua aromática de la destilación de las hojas del triwe (laurel chileno). Base cálida y especiada para limpiadores, tónicos y sérums. La estás produciendo en cantidad.",
        funcion: ["De tradición se le atribuye acción tonificante y antiséptica", "Reemplaza al agua en la fase acuosa"],
        uso: "Hasta 100% de la fase acuosa.",
        ojo: "Los hidrolatos puros se contaminan: refrigéralos y agrégales conservante si los mezclas en un producto.",
      },
      {
        nombre: "Hidrolato de Rosas",
        inci: "Rosa Damascena Flower Water",
        que: "Tónico suave y aromático; de tradición se usa en piel seca, sensible o madura.",
      },
      {
        nombre: "Hidrolato de Lavanda",
        inci: "Lavandula Angustifolia Flower Water",
        que: "Calmante y refrescante, con el aroma suave de la lavanda. Muy versátil en tónicos y sprays.",
      },
      {
        nombre: "Hidrolato de Manzanilla",
        inci: "Chamomilla Recutita Flower Water",
        que: "Calmante para piel sensible o enrojecida y para el contorno de ojos.",
      },
      {
        nombre: "Hamamelis",
        inci: "Hamamelis Virginiana (Witch Hazel) Water",
        que: "Rico en taninos, es astringente y tonificante. Ojo: el comercial suele traer alcohol.",
        ojo: "Puede resecar en pieles sensibles.",
      },
      {
        nombre: "Agua de Azahar",
        inci: "Citrus Aurantium Amara Flower Water",
        que: "Agua floral de flor de naranjo amargo, de aroma delicado. Se usa en tónicos y perfumería suave.",
      },
      {
        nombre: "Macerado de Árnica",
        inci: "Arnica Montana Flower Extract (en aceite)",
        que: "Flores de árnica maceradas en aceite. De tradición se le atribuye acción antiinflamatoria en golpes y dolores musculares.",
        ojo: "Solo sobre piel íntegra. Puede sensibilizar.",
      },
      {
        nombre: "Macerado de Hipérico (Hierba de San Juan)",
        inci: "Hypericum Perforatum Flower Extract (en aceite)",
        que: "Macerado rojo, tradicional para piel irritada y masaje.",
        ojo: "Fotosensibilizante: no exponerse al sol tras aplicarlo.",
      },
      {
        nombre: "Consuelda",
        inci: "Symphytum Officinale Root Extract",
        que: "Contiene alantoína y ácido rosmarínico. De tradición se usa en piel dañada; se le atribuye acción cicatrizante.",
        ojo: "No aplicar sobre heridas abiertas. Evita su uso prolongado por las pirrolizidinas de la planta.",
      },
    ],
  },

  conservantes: {
    titulo: "Conservantes, Antioxidantes y pH",
    nota: "Todo producto con agua necesita conservante: sin él, en días crecen hongos y bacterias. Mide el pH con tiras o pH-metro y ajústalo al rango de tu conservante antes de envasar.",
    items: [
      {
        nombre: "Cosgard",
        inci: "Benzyl Alcohol + Dehydroacetic Acid",
        enLab: true,
        usadoEn: "Firmeza, Hidrata, Mate, Purifica, Peina",
        que: "Conservante de amplio espectro, aceptado en cosmética natural. Combina alcohol bencílico y ácido dehidroacético.",
        uso: "0.8–1.5%. Eficaz a pH menor de 6.",
        ojo: "Agrégalo en la fase fría, por debajo de ~50°C.",
      },
      {
        nombre: "Benzoato de Sodio",
        inci: "Sodium Benzoate",
        enLab: true,
        que: "Conservante de sal del ácido benzoico. Actúa solo con el pH ácido.",
        uso: "0.3–0.5%. Requiere pH menor de 5.",
      },
      {
        nombre: "Sorbato de Potasio",
        inci: "Potassium Sorbate",
        enLab: true,
        usadoEn: "Savia Limpiadora",
        que: "Conservante que actúa sobre todo contra hongos y levaduras. Suele combinarse con el benzoato.",
        uso: "0.3–0.6%. Requiere pH menor de 6.",
      },
      {
        nombre: "Procide PF130",
        enLab: true,
        que: "En tu inventario aparece como quelante o refuerzo del conservante. Úsalo según la ficha técnica del proveedor.",
      },
      {
        nombre: "Alcohol de Cereal 96°",
        inci: "Alcohol",
        enLab: true,
        usadoEn: "Purifica",
        que: "Solvente de tinturas y aportante de conservación: para que actúe como conservante debe rondar el 20% o más del producto final.",
        ojo: "Reseca y puede irritar piel sensible.",
      },
      {
        nombre: "Ácido Cítrico",
        inci: "Citric Acid",
        usadoEn: "Firmeza, Hidrata, Mate, Peina",
        que: "Ajusta el pH hacia abajo y actúa como quelante suave que protege el producto del enranciamiento.",
        uso: "0.1–0.5%. Se disuelve en agua antes de agregar.",
      },
      {
        nombre: "Extracto de Romero",
        inci: "Rosmarinus Officinalis Leaf Extract",
        que: "Antioxidante natural que retrasa el enranciamiento de aceites y mantecas. No es un conservante contra microbios.",
        uso: "0.05–0.5% en la fase oleosa.",
      },
    ],
  },

  capilar: {
    titulo: "Cuidado Capilar",
    nota: "Para el cabello ya cuentas en las otras secciones con BTMS-50, pantenol, MaízCare, cafeína, aceite de coco, monoi, ricino y quillay. Aquí, otros ingredientes comunes.",
    items: [
      {
        nombre: "Henna",
        inci: "Lawsonia Inermis Leaf Powder",
        que: "Polvo de hoja que tiñe el cabello de rojizo (lawsona) y lo recubre, dándole cuerpo y fuerza.",
        ojo: "El tinte es permanente y puede interferir con otros tintes. Evita la «henna negra»: suele traer PPD, un alérgeno grave.",
      },
      {
        nombre: "Cassia (Henna Neutra)",
        inci: "Cassia Obovata Flower Powder",
        que: "Polvo que acondiciona y da brillo sin teñir de forma marcada.",
      },
      {
        nombre: "Polvos Ayurvédicos (Amla, Shikakai, Reetha)",
        que: "Amla (grosella india), shikakai y reetha (nuez de jabón, con saponinas) son limpiadores y acondicionadores tradicionales. Se les atribuye fortalecer el cabello.",
        uso: "Se mezclan con agua tibia hasta formar una pasta.",
      },
      {
        nombre: "Enjuague de Vinagre de Manzana",
        inci: "Apple Cider Vinegar / Citric Acid",
        que: "Un enjuague ácido (pH ~4.5–5.5) ayuda a cerrar la cutícula después de limpiadores alcalinos, y deja el cabello más brillante.",
        uso: "1–2 cucharadas por litro de agua, y enjuagar.",
      },
      {
        nombre: "Gel de Linaza",
        inci: "Linum Usitatissimum Seed Extract",
        que: "Mucílago de las semillas de lino. Da definición y control a rizos y ondas.",
        ojo: "Se descompone en pocos días: guárdalo refrigerado o agrega conservante.",
      },
    ],
  },
};

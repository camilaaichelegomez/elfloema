// Catálogo de la Tienda El Floema.
// Nombres, precios y fotos son provisionales — se afinan a medida que se definen.
// La foto de cada producto va en public/tienda/<slug>.jpg y aparece sola.

export type ProductoTienda = {
  slug: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  descripcionLarga?: string;
  beneficios?: string[]; // propiedades / beneficios, en viñetas
  ciencia?: { titulo: string; texto: string }[]; // "Cómo actúa": molécula + mecanismo por tarjeta
  bioquimica?: { prompt: string; leyenda: string }; // ilustración de proceso bioquímico (placeholder con prompt)
  ingredientes?: string; // INCI o ingredientes clave
  modoUso?: string;
  piel?: string; // para qué tipo de piel
  tamano?: string; // ej "100 ml"
  imagenPrompt?: string; // prompt para generar la foto del producto (placeholder)
  fichaPrompt?: string; // prompt para generar la ficha ilustrada (infografía estilo El Floema)
  precio: number | null;
  glyph: string;
  accent: string;
  destacado?: boolean;
};

export const productosTienda: ProductoTienda[] = [
  {
    slug: "calma",
    nombre: "Calma",
    categoria: "Sérum facial",
    descripcion: "Sérum facial calmante para pieles sensibles, reactivas y con rojeces.",
    descripcionLarga:
      "Un sérum ligero que serena la piel reactiva: baja las rojeces, refuerza la barrera y devuelve el confort. La centella asiática repara mientras el pantenol y el ácido hialurónico calman e hidratan, dejando la piel flexible y sin tirantez. De textura fluida y rápida absorción, para el paso previo a la crema.",
    beneficios: [
      "Reduce rojeces y calma la piel reactiva",
      "Centella asiática que repara y refuerza la barrera",
      "Pantenol y ácido hialurónico que hidratan sin peso",
      "Textura fluida, apta para piel sensible",
    ],
    ciencia: [
      { titulo: "Centella asiática (asiaticósido)", texto: "Sus triterpenos —asiaticósido y madecasósido— estimulan la síntesis de colágeno y modulan las citoquinas inflamatorias. Por eso reparan la barrera y bajan las rojeces de la piel reactiva." },
      { titulo: "Pantenol (provitamina B5)", texto: "En la piel se convierte en ácido pantoténico: mejora la función barrera, retiene agua y tiene acción antiinflamatoria, dejando esa sensación sedosa y aliviada." },
      { titulo: "Ácido hialurónico", texto: "Un polisacárido que retiene muchas veces su peso en agua. Rellena de humedad las capas superficiales y borra la tirantez que suele acompañar a la piel sensible." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un corte de piel enrojecida e inflamada que se calma: las moleculas de centella asiatica (triterpenos) reducen la inflamacion y estimulan fibras de colageno que reparan la barrera cutanea. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'asiaticosido', 'menos inflamacion', 'colageno', 'barrera reparada'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "La centella modula la inflamación y repara la barrera",
    },
    ingredientes:
      "Aqua, Glycerin, Centella Asiatica Extract, Panthenol, Sodium Hyaluronate, Xanthan Gum, Citric Acid, Benzyl Alcohol, Dehydroacetic Acid.",
    modoUso:
      "Aplica 3-4 gotas sobre el rostro limpio, mañana y noche, antes de la crema. Da unos toquecitos suaves para ayudar a absorber.",
    piel: "Sensible, reactiva o con rojeces",
    tamano: "30 ml",
    precio: null,
    glyph: "◯",
    accent: "rgba(90,122,58,0.28)",
    destacado: true,
  },
  {
    slug: "ilumina",
    nombre: "Ilumina",
    categoria: "Sérum facial",
    descripcion: "Sérum iluminador y antioxidante que unifica el tono y aporta luminosidad.",
    descripcionLarga:
      "Un sérum antioxidante que devuelve la luz a las pieles apagadas. El maqui y el té verde defienden del daño diario, la niacinamida empareja el tono y atenúa las manchas, y el ácido hialurónico rellena de agua para un rostro jugoso. Se absorbe al instante, sin pegote.",
    beneficios: [
      "Antioxidantes de maqui y té verde contra el daño diario",
      "Niacinamida que empareja el tono y atenúa manchas",
      "Ácido hialurónico para un efecto jugoso y relleno",
      "Se absorbe al instante, uso diario",
    ],
    ciencia: [
      { titulo: "Antocianinas del maqui", texto: "Las delfinidinas del maqui (Aristotelia chilensis) son antioxidantes potentes: neutralizan los radicales libres que genera el sol y la contaminación, la causa principal del tono desparejo y el envejecimiento prematuro." },
      { titulo: "EGCG (té verde)", texto: "El galato de epigalocatequina es un polifenol antioxidante y fotoprotector suave; además ayuda a regular el sebo y a calmar la piel." },
      { titulo: "Niacinamida (vitamina B3)", texto: "Frena la transferencia de melanina desde el melanocito al queratinocito: al cortar ese transporte, empareja el tono y reduce las manchas. También refuerza la barrera estimulando ceramidas." },
      { titulo: "Ácido hialurónico", texto: "Retiene agua en la superficie para un efecto relleno; una piel bien hidratada refleja mejor la luz y se ve más luminosa al instante." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra antioxidantes del maqui (antocianinas) neutralizando radicales libres en la piel, y una molecula de niacinamida bloqueando la transferencia de melanina desde el melanocito al queratinocito. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'antocianinas', 'radical libre neutralizado', 'niacinamida', 'menos melanina'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "Los antioxidantes neutralizan radicales y la niacinamida empareja el tono",
    },
    ingredientes:
      "Aqua, Glycerin, Niacinamide, Aristotelia Chilensis (Maqui) Fruit Extract, Camellia Sinensis (Green Tea) Leaf Extract, Centella Asiatica Extract, Caffeine, Sodium Hyaluronate, Xanthan Gum, Citric Acid, Benzyl Alcohol, Dehydroacetic Acid.",
    modoUso:
      "Aplica 3-4 gotas sobre el rostro limpio, mañana y noche. En el día, acompaña siempre con protector solar.",
    piel: "Apagada, con manchas o primeras líneas",
    tamano: "30 ml",
    precio: null,
    glyph: "✧",
    accent: "rgba(200,160,80,0.24)",
    destacado: true,
  },
  {
    slug: "purifica",
    nombre: "Purifica",
    categoria: "Sérum facial",
    descripcion: "Sérum purificante y seborregulador para pieles mixtas y grasas.",
    descripcionLarga:
      "Un sérum diario que equilibra la piel con tendencia grasa sin agredir. La niacinamida regula el sebo y afina el poro, la centella calma, y el ácido hialurónico hidrata sin peso. Para una piel más pareja, sin ese rebote graso de los productos que resecan.",
    beneficios: [
      "Niacinamida que regula el sebo y afina el poro",
      "Centella asiática que calma la piel reactiva",
      "Ácido hialurónico que hidrata sin peso",
      "Uso diario, equilibra sin resecar",
    ],
    ciencia: [
      { titulo: "Niacinamida (vitamina B3)", texto: "Modula la actividad de las glándulas sebáceas (regula la producción de sebo) y refuerza la barrera estimulando la síntesis de ceramidas. Por eso afina el poro sin resecar." },
      { titulo: "Centella asiática", texto: "Sus triterpenos calman la inflamación y la reactividad que suele acompañar a la piel grasa o con tendencia acneica, sin taponar el poro." },
      { titulo: "Ácido hialurónico", texto: "Hidrata las capas superficiales sin aportar grasa. Evita la deshidratación que, paradójicamente, dispara aún más la producción de sebo (el rebote graso)." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un corte de piel grasa con el poro dilatado: una molecula de niacinamida regula la glandula sebacea (menos sebo) y refuerza la barrera de ceramidas, afinando el poro. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'niacinamida', 'glandula sebacea', 'menos sebo', 'ceramidas'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "La niacinamida regula el sebo y refuerza la barrera de ceramidas",
    },
    ingredientes:
      "Aqua, Glycerin, Niacinamide, Centella Asiatica Extract, Sodium Hyaluronate, Xanthan Gum, Citric Acid, Benzyl Alcohol, Dehydroacetic Acid.",
    modoUso:
      "Aplica 3-4 gotas sobre el rostro limpio, mañana y noche, antes de la hidratante.",
    piel: "Mixta, grasa o con tendencia acneica",
    tamano: "30 ml",
    precio: null,
    glyph: "◇",
    accent: "rgba(122,74,138,0.3)",
    destacado: true,
  },
  {
    slug: "syndet-facial-triwe",
    nombre: "Syndet Facial Líquido de Triwe",
    categoria: "Limpieza facial",
    descripcion: "Gel limpiador facial sin sulfatos, pH piel, con hidrolato de triwe.",
    descripcionLarga:
      "Un gel de limpieza que respeta lo que tu piel ya sabe hacer. Su base es hidrolato de triwe —el laurel nativo del sur de Chile—, un agua aromática suave que reemplaza al agua común. Limpia con tensioactivos derivados del coco y de aminoácidos que arrastran el exceso de grasa y la contaminación sin romper la barrera ni dejar la piel tirante. La glicerina retiene la humedad y la inulina, un prebiótico, cuida el microbioma que mantiene la piel en equilibrio. Formulado a pH 5,5, el mismo de tu manto ácido. Para quienes quieren limpiar sin resecar, con la nobleza de lo nativo y el criterio de la ciencia.",
    beneficios: [
      "Limpia sin resecar ni dejar tirantez",
      "Sin sulfatos: tensioactivos suaves derivados del coco",
      "Respeta el pH y la barrera de la piel (pH 5,5)",
      "Con prebiótico (inulina) para el microbioma",
      "Uso diario, apto para piel sensible y mixta",
    ],
    ciencia: [
      { titulo: "Sodium Cocoyl Isethionate (SCI)", texto: "Tensioactivo del coco y aminoácidos. Limpia formando micelas que atrapan la grasa y la suciedad, pero su cadena grasa NO desnaturaliza las proteínas de la piel como los sulfatos: por eso hace espuma cremosa sin resecar ni dañar la barrera." },
      { titulo: "Glucósido + Betaína de coco", texto: "Un tensioactivo azucarado ultra suave y un co-tensioactivo anfótero. La betaína además reduce el potencial irritante de la fórmula al modular el tamaño de las micelas." },
      { titulo: "pH 5,5 — el manto ácido", texto: "Ajustado con ácido cítrico al pH natural de la piel. Mantener ese pH preserva la barrera y el equilibrio de la flora cutánea; un jabón alcalino (pH 9-10) lo altera, este no." },
      { titulo: "Glicerina + Inulina", texto: "La glicerina atrae y retiene agua (sus grupos OH forman puentes con las moléculas de agua), evitando la tirantez. La inulina es un prebiótico: alimenta las bacterias buenas del microbioma cutáneo." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un corte de la superficie de la piel en seccion, con micelas de tensioactivo suave (esferas) atrapando gotas de grasa y suciedad para arrastrarlas al enjuagar, mientras la barrera cutanea y el manto acido permanecen intactos. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'micela', 'grasa atrapada', 'barrera intacta', 'pH 5,5'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "Las micelas atrapan la grasa sin romper la barrera",
    },
    ingredientes:
      "Laurelia Sempervirens Leaf Water (hidrolato de triwe), Aqua, Sodium Cocoyl Isethionate, Coco-Glucoside, Cocamidopropyl Betaine, Glycerin, Inulin, Xanthan Gum, Citric Acid, Benzyl Alcohol, Dehydroacetic Acid.",
    modoUso:
      "Sobre el rostro húmedo, aplica una pequeña cantidad y masajea con movimientos circulares, evitando el contorno de los ojos. Enjuaga con agua tibia. Úsalo mañana y noche.",
    piel: "Todo tipo de piel, ideal sensible y mixta",
    tamano: "100 ml",
    imagenPrompt:
      "A partir de la FOTO REAL del producto que se entrega, mejora SOLO el fondo y la ambientacion. NO modifiques el producto: conserva exactamente el frasco, su forma, tapa, color, la etiqueta y el contenido tal como estan en la foto. Reemplaza unicamente el fondo por una escena botanica: rodeado de hojas de triwe (laurel nativo chileno), sobre piedra oscura humeda, con luz calida dorada lateral y fondo de bosque verde oscuro difuminado, estetica botanica y mistica de cosmetica natural artesanal, tonos verdes profundos, dorados y tierra. Manten la iluminacion y las sombras coherentes con el producto real. No anadas ningun texto ni marca de agua.",
    fichaPrompt:
      "Poster vertical estilo ficha de producto de El Floema, cosmetica botanica, formato retrato. Fondo de madera oscura con vetas, tonos negro, verde profundo, marron y dorado. Marco ornamental dorado art nouveau alrededor de todo el borde, con volutas botanicas en las esquinas y lunas doradas arriba. Arriba al centro el emblema de El Floema (frasco pocion con raices doradas). En el centro, la foto real de un frasco con dosificador de gel dentro de un ovalo dorado. Alrededor, ilustraciones botanicas coloreadas estilo grabado cientifico de hojas de triwe (laurel nativo chileno) y coco, con suaves burbujas de espuma cremosa, simetricas y ordenadas. Distribuye recuadros ornamentados dorados con el siguiente texto, en espanol con ORTOGRAFIA PERFECTA y tipografia serif dorada elegante, muy legible y ordenado. TITULO: 'SYNDET FACIAL DE TRIWE - Limpiador sin sulfatos, pH 5,5'. Recuadro COMO ACTUA: 'SCI (coco y aminoacidos): limpia por micelas sin danar las proteinas de la piel. Glucosido y betaina de coco: ultra suaves; la betaina reduce la irritacion. pH 5,5: respeta el manto acido. Glicerina e inulina: humectan y cuidan el microbioma.'. Recuadro PROPIEDADES: 'Limpia sin resecar. Sin sulfatos. Respeta la barrera. Con prebiotico.'. Recuadro MODO DE USO: 'Sobre el rostro humedo, masajea con movimientos circulares y enjuaga. Manana y noche.'. Recuadro PARA: 'Todo tipo de piel, ideal sensible y mixta'. Recuadro RESULTADO: 'Piel limpia, suave y sin tirantez.'. Escribe EXACTAMENTE ese texto, sin inventar ni deformar palabras. Estetica mistica y cientifica, iluminacion calida dorada, composicion equilibrada y muy ordenada, alta calidad.",
    precio: null,
    glyph: "◈",
    accent: "rgba(90,122,58,0.24)",
  },
  {
    slug: "hidrolato-triwe",
    nombre: "Hidrolato de Triwe",
    categoria: "Agua floral",
    descripcion: "Tónico relajante y astringente del laurel nativo (triwe).",
    descripcionLarga:
      "Un agua botánica destilada del triwe, árbol nativo del bosque chileno, con un aroma herbal fresco y balsámico que despierta los sentidos. Al aplicarla deja la piel limpia, tonificada y con una sensación de frescor inmediato, sin tirantez. Un ritual del bosque nativo en cada aplicación.",
    beneficios: [
      "Purifica y refresca la piel",
      "Ayuda a equilibrar el exceso de grasa",
      "Tonifica con frescor herbal",
      "Base aromática de origen nativo",
    ],
    ciencia: [
      { titulo: "1,8-cineol (eucaliptol)", texto: "El volátil mayoritario del triwe (~28%). Es antiséptico: desestabiliza la membrana de los microorganismos, por eso purifica y da la sensación de frescor limpio." },
      { titulo: "Linalol", texto: "Alcohol monoterpénico (~28%) de aroma suave. Calma los sentidos y aporta una acción antimicrobiana gentil, muy bien tolerada." },
      { titulo: "α-terpineol", texto: "Terpeno que refuerza la acción antiséptica y deja la piel tonificada y fresca, sin la tirantez del alcohol." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un corte esquematico de la piel visto de lado con la molecula de linalol calmando y refrescando la superficie: la piel queda serena, con una sensacion de calma y frescor herbal. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'linalol', 'accion calmante', 'piel serena y fresca'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El linalol calma y refresca la piel",
    },
    ingredientes: "Laurelia Sempervirens Leaf Water (hidrolato de triwe), Benzyl Alcohol, Dehydroacetic Acid.",
    modoUso:
      "Sobre el rostro limpio, aplica con algodón o vaporiza a 20 cm y deja absorber. Úsalo como tónico antes del sérum o la crema, o durante el día para refrescar. Mañana y noche.",
    piel: "Mixta y grasa",
    tamano: "100 ml",
    imagenPrompt:
      "A partir de la FOTO REAL del producto que se entrega, mejora SOLO el fondo y la ambientacion. NO modifiques el producto: conserva exactamente el frasco, su forma, tapa, color, la etiqueta y el contenido tal como estan en la foto. Reemplaza unicamente el fondo por una escena botanica: rodeado de hojas verdes brillantes de triwe (laurel nativo chileno), sobre piedra oscura humeda, con luz calida dorada lateral y fondo de bosque verde oscuro difuminado, estetica botanica y mistica de cosmetica natural artesanal, tonos verdes profundos, dorados y tierra. Manten la iluminacion y las sombras coherentes con el producto real. No anadas ningun texto ni marca de agua.",
    fichaPrompt:
      "Poster vertical estilo ficha de producto de El Floema, cosmetica botanica, formato retrato. Fondo de madera oscura con vetas, tonos negro, verde profundo, marron y dorado. Marco ornamental dorado art nouveau alrededor de todo el borde, con volutas botanicas en las esquinas y lunas doradas arriba. Arriba al centro el emblema de El Floema (frasco pocion con raices doradas). En el centro, la foto real de un frasco de vidrio ambar con atomizador dentro de un ovalo dorado. Alrededor, ilustraciones botanicas coloreadas estilo grabado cientifico de hojas de triwe (laurel chileno, Laurelia sempervirens), simetricas y ordenadas. Distribuye recuadros ornamentados dorados con el siguiente texto, en espanol con ORTOGRAFIA PERFECTA y tipografia serif dorada elegante, muy legible y ordenado. TITULO: 'HIDROLATO DE TRIWE - Tonico facial purificante'. Recuadro COMO ACTUA: '1,8-cineol (eucaliptol): antiseptico, purifica y refresca. Linalol: calma, accion antimicrobiana suave. Alfa-terpineol: tonifica y refresca sin resecar.'. Recuadro PROPIEDADES: 'Purifica y refresca. Equilibra el exceso de grasa. Tonifica con frescor herbal.'. Recuadro MODO DE USO: 'Sobre el rostro limpio, aplica con algodon o vaporiza. Manana y noche.'. Recuadro PARA: 'Piel mixta y grasa'. Recuadro RESULTADO: 'Piel purificada, fresca y tonificada.'. Escribe EXACTAMENTE ese texto, sin inventar ni deformar palabras. Estetica mistica y cientifica, iluminacion calida dorada, composicion equilibrada y muy ordenada, alta calidad.",
    precio: null,
    glyph: "❁",
    accent: "rgba(122,74,138,0.24)",
  },
  {
    slug: "hidrolato-laurel",
    nombre: "Hidrolato de Laurel",
    categoria: "Agua floral",
    descripcion: "Tónico tonificante y antimicrobiano suave de laurel.",
    descripcionLarga:
      "Agua aromática de laurel, de aroma limpio y especiado, pensada para pieles que brillan y necesitan orden. Su naturaleza astringente ayuda a afinar el aspecto de los poros y a controlar el exceso de sebo, dejando la piel fresca y mate, nunca reseca.",
    beneficios: [
      "Astringente: afina el aspecto de los poros",
      "Controla el exceso de sebo",
      "Purifica con acción antiséptica suave",
      "Deja la piel fresca y mate",
    ],
    ciencia: [
      { titulo: "1,8-cineol", texto: "El volátil dominante del laurel. Antiséptico y purificante: altera la pared de las bacterias, ayudando a controlar las imperfecciones." },
      { titulo: "Terpinen-4-ol", texto: "El mismo antimicrobiano estrella del árbol del té. Actúa sobre la flora que agrava el acné, de forma suave y sin resecar." },
      { titulo: "Por qué se siente astringente", texto: "El conjunto de volátiles más el pH ácido del hidrolato dan un tacto fresco y matificante. La astringencia profunda de los taninos vive en la tintura, no en el agua destilada: aquí es tonificación aromática, honesta." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un corte esquematico de un poro de la piel visto en seccion, con la molecula terpinen-4-ol actuando sobre las bacterias de la piel y equilibrando el poro. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'terpinen-4-ol', 'accion sobre la flora', 'poro equilibrado'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El terpinen-4-ol equilibra la flora del poro",
    },
    ingredientes: "Laurus Nobilis Leaf Water (hidrolato de laurel), Benzyl Alcohol, Dehydroacetic Acid.",
    modoUso:
      "Sobre el rostro limpio, aplica con algodón o vaporiza. Úsalo como tónico astringente antes del sérum, enfocándote en la zona T si tu piel es mixta. Mañana y noche.",
    piel: "Mixta a grasa",
    tamano: "100 ml",
    imagenPrompt:
      "A partir de la FOTO REAL del producto que se entrega, mejora SOLO el fondo y la ambientacion. NO modifiques el producto: conserva exactamente el frasco, su forma, tapa, color, la etiqueta y el contenido tal como estan en la foto. Reemplaza unicamente el fondo por una escena botanica: rodeado de hojas de laurel verdes y algunas ramas, sobre superficie de piedra oscura, con luz calida dorada lateral y fondo verde oscuro difuminado, estetica botanica y mistica de cosmetica natural artesanal, tonos verdes profundos, dorados y tierra. Manten la iluminacion y las sombras coherentes con el producto real. No anadas ningun texto ni marca de agua.",
    fichaPrompt:
      "Poster vertical estilo ficha de producto de El Floema, cosmetica botanica, formato retrato. Fondo de madera oscura con vetas, tonos negro, verde profundo, marron y dorado. Marco ornamental dorado art nouveau alrededor de todo el borde, con volutas botanicas en las esquinas y lunas doradas arriba. Arriba al centro el emblema de El Floema (frasco pocion con raices doradas). En el centro, la foto real de un frasco de vidrio ambar con atomizador dentro de un ovalo dorado. Alrededor, ilustraciones botanicas coloreadas estilo grabado cientifico de hojas y ramas de laurel (Laurus nobilis), simetricas y ordenadas. Distribuye recuadros ornamentados dorados con el siguiente texto, en espanol con ORTOGRAFIA PERFECTA y tipografia serif dorada elegante, muy legible y ordenado. TITULO: 'HIDROLATO DE LAUREL - Tonico astringente purificante'. Recuadro COMO ACTUA: '1,8-cineol: antiseptico purificante, controla las imperfecciones. Terpinen-4-ol: antimicrobiano suave, el mismo del arbol del te.'. Recuadro PROPIEDADES: 'Afina el aspecto de los poros. Controla el exceso de sebo. Deja la piel mate.'. Recuadro MODO DE USO: 'Con algodon o vaporiza, enfocando la zona T. Manana y noche.'. Recuadro PARA: 'Piel mixta a grasa'. Recuadro RESULTADO: 'Piel fresca, mate y equilibrada.'. Escribe EXACTAMENTE ese texto, sin inventar ni deformar palabras. Estetica mistica y cientifica, iluminacion calida dorada, composicion equilibrada y muy ordenada, alta calidad.",
    precio: null,
    glyph: "❁",
    accent: "rgba(90,122,58,0.22)",
  },
  {
    slug: "hidrolato-eucalipto",
    nombre: "Hidrolato de Eucalipto",
    categoria: "Agua floral",
    descripcion: "Agua floral purificante y descongestiva de eucalipto.",
    descripcionLarga:
      "Agua destilada de eucalipto, de aroma fresco y descongestionante que despeja al instante. Purifica la piel grasa, ayuda a controlar el brillo y aporta una sensación de limpieza profunda y frescor vivificante. Un respiro fresco para tu piel, directo del bosque.",
    beneficios: [
      "Purifica la piel grasa o acneica",
      "Ayuda a controlar el brillo",
      "Acción antiséptica y astringente",
      "Frescor vivificante",
    ],
    ciencia: [
      { titulo: "1,8-cineol (eucaliptol)", texto: "Constituye la mayor parte del volátil del eucalipto. Antiséptico y descongestionante: purifica el poro y refresca al instante." },
      { titulo: "Acción antimicrobiana", texto: "El eucaliptol altera la membrana de las bacterias de la piel grasa, ayudando a mantener el cutis limpio." },
      { titulo: "Frescor y control del brillo", texto: "Su alta volatilidad da la sensación de despeje inmediato y acompaña el control del exceso de sebo." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un corte esquematico de piel grasa en seccion, con la molecula 1,8-cineol (eucaliptol) purificando el poro y regulando el exceso de sebo, con una sensacion de frescor. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: '1,8-cineol', 'control del sebo', 'piel fresca y limpia'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El eucaliptol purifica el poro y regula el sebo",
    },
    ingredientes: "Eucalyptus Globulus Leaf Water (hidrolato de eucalipto), Benzyl Alcohol, Dehydroacetic Acid.",
    modoUso:
      "Sobre el rostro limpio, aplica con algodón o vaporiza, evitando el contorno de los ojos. Úsalo como tónico purificante antes del sérum. Preferentemente una vez al día.",
    piel: "Grasa y mixta",
    tamano: "100 ml",
    imagenPrompt:
      "A partir de la FOTO REAL del producto que se entrega, mejora SOLO el fondo y la ambientacion. NO modifiques el producto: conserva exactamente el frasco, su forma, tapa, color, la etiqueta y el contenido tal como estan en la foto. Reemplaza unicamente el fondo por una escena botanica: rodeado de ramas de eucalipto de hojas azul-verdosas, sobre superficie de piedra oscura, con luz calida dorada lateral y fondo verde oscuro difuminado, estetica botanica y mistica de cosmetica natural artesanal, tonos verdes profundos, dorados y tierra. Manten la iluminacion y las sombras coherentes con el producto real. No anadas ningun texto ni marca de agua.",
    fichaPrompt:
      "Poster vertical estilo ficha de producto de El Floema, cosmetica botanica, formato retrato. Fondo de madera oscura con vetas, tonos negro, verde profundo, marron y dorado. Marco ornamental dorado art nouveau alrededor de todo el borde, con volutas botanicas en las esquinas y lunas doradas arriba. Arriba al centro el emblema de El Floema (frasco pocion con raices doradas). En el centro, la foto real de un frasco de vidrio ambar con atomizador dentro de un ovalo dorado. Alrededor, ilustraciones botanicas coloreadas estilo grabado cientifico de ramas de eucalipto de hojas azul-verdosas (Eucalyptus globulus), simetricas y ordenadas. Distribuye recuadros ornamentados dorados con el siguiente texto, en espanol con ORTOGRAFIA PERFECTA y tipografia serif dorada elegante, muy legible y ordenado. TITULO: 'HIDROLATO DE EUCALIPTO - Tonico purificante y descongestivo'. Recuadro COMO ACTUA: '1,8-cineol (eucaliptol): antiseptico y descongestionante, purifica el poro. Accion antimicrobiana: ayuda a mantener el cutis limpio.'. Recuadro PROPIEDADES: 'Purifica la piel grasa. Controla el brillo. Frescor vivificante.'. Recuadro MODO DE USO: 'Con algodon o vaporiza, evitando los ojos. Una vez al dia.'. Recuadro PARA: 'Piel grasa y mixta'. Recuadro RESULTADO: 'Piel limpia, fresca y con menos brillo.'. Escribe EXACTAMENTE ese texto, sin inventar ni deformar palabras. Estetica mistica y cientifica, iluminacion calida dorada, composicion equilibrada y muy ordenada, alta calidad.",
    precio: null,
    glyph: "❁",
    accent: "rgba(90,122,58,0.24)",
  },
  {
    slug: "spray-capilar-cafeina-laurel",
    nombre: "Spray Capilar Anticaída",
    categoria: "Cuidado capilar",
    descripcion: "Tónico sin enjuague con cafeína, ortiga, té verde y tomillo que fortalece la raíz.",
    descripcionLarga:
      "Un tónico capilar sin enjuague para acompañar el cabello que se cae o se debilita. La cafeína y el extracto de ortiga estimulan el folículo y equilibran el cuero cabelludo, con té verde y tomillo que lo cuidan, sobre una base de hidrolato de laurel. Se rocía a diario sobre la raíz y se masajea para activar la microcirculación. La constancia es la clave: es un ritual diario, no un milagro de un día.",
    beneficios: [
      "Cafeína y ortiga que estimulan el folículo y la raíz",
      "Té verde y tomillo que cuidan el cuero cabelludo",
      "Activa la microcirculación con el masaje",
      "Sin enjuague, uso diario",
    ],
    ciencia: [
      { titulo: "Cafeína", texto: "Aplicada de forma constante, penetra el folículo y prolonga su fase de crecimiento (anágena), contrarrestando parte del efecto de la DHT que lo debilita; además estimula la microcirculación del cuero cabelludo." },
      { titulo: "Extracto de ortiga", texto: "Aliado tradicional contra la caída: se le atribuye la capacidad de frenar la 5-alfa-reductasa (la enzima que forma la DHT) y de aportar minerales que nutren el folículo." },
      { titulo: "Té verde y tomillo", texto: "El té verde suma antioxidantes que protegen el folículo del estrés oxidativo, y el tomillo es un tónico y antiséptico suave que cuida la salud del cuero cabelludo." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un corte del cuero cabelludo con un foliculo piloso: la cafeina penetra y estimula el crecimiento del cabello (prolonga la fase anagena) mientras la microcirculacion se activa y la ortiga frena la enzima que produce la DHT. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'cafeina', 'foliculo estimulado', 'fase de crecimiento', 'ortiga: menos DHT'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "La cafeína estimula el folículo y la ortiga frena la DHT",
    },
    ingredientes:
      "Laurus Nobilis Leaf Water (hidrolato de laurel), Caffeine, Glycerin, Urtica Dioica (Nettle) Extract, Camellia Sinensis (Green Tea) Tincture, Panthenol, Thymus Vulgaris (Thyme) Tincture, Cedrus Atlantica Oil, Polysorbate 20, Benzyl Alcohol, Dehydroacetic Acid, Citric Acid.",
    modoUso:
      "Sobre el cuero cabelludo limpio o seco, rocía por zonas y masajea con las yemas un minuto. No se enjuaga. Úsalo a diario; la constancia es la clave.",
    piel: "Cuero cabelludo con tendencia a la caída",
    tamano: "100 ml",
    precio: null,
    glyph: "❦",
    accent: "rgba(122,74,138,0.26)",
  },
  {
    slug: "jabon-ducha-amarillo",
    nombre: "Jabón de Ducha",
    categoria: "Cuerpo",
    descripcion: "Barra syndet de ducha suave, con tensioactivos amables con la piel.",
    precio: null,
    glyph: "◆",
    accent: "rgba(200,160,80,0.22)",
  },
  {
    slug: "vela-soya-carnauba",
    nombre: "Vela de Soya",
    categoria: "Aromaterapia",
    descripcion: "Vela natural de cera de soja, sin parafinas ni aromas químicos, con un toque de triwe.",
    descripcionLarga:
      "Una vela de pura cera de soja —sin parafinas ni aromas químicos— para ambientar con intención. Lleva solo un toque de aceite esencial de triwe, nuestro árbol nativo, que le da un aroma natural y sutil: no es una vela de perfume intenso, sino de fragancia honesta y delicada. Combustión limpia y duradera, sin el hollín ni los derivados del petróleo de las velas comunes.",
    beneficios: [
      "Pura cera de soja, sin parafinas ni derivados del petróleo",
      "Aroma natural y sutil de triwe, sin fragancias sintéticas",
      "Combustión limpia y duradera",
    ],
    modoUso:
      "Recorta la mecha a ~5 mm antes de cada encendido. En el primer uso, deja que la cera se derrita hasta los bordes. No la dejes encendida sin supervisión ni cerca de materiales inflamables o corrientes de aire.",
    precio: null,
    glyph: "❋",
    accent: "rgba(42,21,53,0.5)",
  },
  {
    slug: "velas-flores",
    nombre: "Velas de Flores",
    categoria: "Aromaterapia",
    descripcion: "Velas naturales de cera de soja con forma de flor, sin parafinas ni aromas químicos, en verde, amarillo y morado.",
    descripcionLarga:
      "Velas artesanales de pura cera de soja —sin parafinas ni aromas químicos— con forma de flor, para encender un momento de calma con intención. Llevan solo un toque de aceite esencial de triwe, nuestro árbol nativo, que les da un aroma natural y sutil: no son velas de perfume intenso, sino de fragancia honesta y delicada que se percibe de cerca (preferimos poco aceite esencial puro antes que mucha fragancia sintética). La flor simboliza el florecer: el crecimiento, la renovación y la belleza que se abre. Y cada color guarda su propio significado — el verde sana, equilibra y conecta con la naturaleza; el amarillo ilumina, alegra y despeja la mente; el morado eleva, protege e invita a la introspección. Un pequeño jardín de intenciones en cera vegetal, de combustión limpia y duradera. Elige tu color según lo que quieras atraer, o reúnelos como un ritual completo de cuerpo, mente y espíritu.",
    beneficios: [
      "Pura cera de soja, sin parafinas ni aromas químicos",
      "Aroma natural y sutil de triwe, sin fragancias sintéticas",
      "💚 Verde — sanación, equilibrio, abundancia",
      "💛 Amarillo — alegría, claridad mental, energía",
      "💜 Morado — espiritualidad, intuición, transformación",
    ],
    modoUso:
      "Recorta la mecha a ~5 mm antes de cada encendido. En el primer uso, deja que la cera se derrita hasta los bordes para que consuma parejo. No la dejes encendida sin supervisión, ni cerca de materiales inflamables o corrientes de aire.",
    tamano: "Unidad",
    precio: null,
    glyph: "✿",
    accent: "rgba(122,74,138,0.3)",
  },
  {
    slug: "crema-matificante",
    nombre: "Crema Matificante",
    categoria: "Hidratación facial",
    descripcion: "Hidrata y controla el brillo sin resecar, para piel mixta a grasa.",
    descripcionLarga:
      "Una crema de textura ligera que hidrata mientras controla el brillo. El óxido de zinc y la sílice absorben el exceso de grasa y difuminan el poro, mientras el ácido hialurónico, la urea y la inulina mantienen la piel cómoda y sin tirantez. La cafeína activa la microcirculación. Acabado aterciopelado, mate natural, para usar cada mañana bajo el maquillaje o sola.",
    beneficios: [
      "Hidrata y matifica a la vez",
      "Óxido de zinc y sílice absorben el exceso de grasa",
      "Ácido hialurónico, urea e inulina para confort sin tirantez",
      "Acabado aterciopelado, ideal bajo el maquillaje",
    ],
    ciencia: [
      { titulo: "Óxido de zinc", texto: "Mineral que absorbe el sebo y tiene acción astringente y calmante. Reduce el brillo en la superficie mientras suaviza la piel reactiva típica del cutis graso." },
      { titulo: "Dióxido de silicio", texto: "Micropartículas porosas que absorben el exceso de grasa y difuminan ópticamente el poro (efecto soft-focus): la luz se dispersa y el poro se ve más fino al instante." },
      { titulo: "Urea + ácido hialurónico", texto: "La urea es parte del factor natural de hidratación (NMF) y mantiene la piel flexible; el ácido hialurónico retiene agua. Hidratan por dentro aunque la superficie quede mate." },
      { titulo: "Inulina (prebiótico)", texto: "Alimenta las bacterias buenas del microbioma cutáneo, ayudando a mantener el equilibrio de la piel con tendencia grasa." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra la superficie de una piel grasa: microparticulas de oxido de zinc y dioxido de silicio absorbiendo gotas de sebo y difuminando la luz sobre el poro (efecto soft-focus), mientras por dentro la urea y el acido hialuronico retienen agua. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'oxido de zinc', 'silice', 'sebo absorbido', 'agua retenida'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El zinc y la sílice absorben el sebo mientras la piel se hidrata por dentro",
    },
    ingredientes:
      "Aqua, Zinc Oxide, Silica, Glycerin, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Behentrimonium Methosulfate, Cetyl Alcohol, Urea, Sodium Hyaluronate, Inulin, Caffeine, Panthenol, Benzyl Alcohol, Dehydroacetic Acid, Citric Acid.",
    modoUso:
      "Aplica una capa fina sobre el rostro limpio, evitando el contorno de los ojos. Úsala en la mañana como último paso de hidratación.",
    piel: "Mixta a grasa",
    tamano: "50 ml",
    precio: null,
    glyph: "◐",
    accent: "rgba(122,74,138,0.26)",
  },
  {
    slug: "syndet-facial-piel-grasa",
    nombre: "Syndet Facial Líquido · Piel Grasa",
    categoria: "Limpieza facial",
    descripcion: "Limpieza equilibrante con salicílico y ortiga para piel grasa.",
    descripcionLarga:
      "Un gel de limpieza que deja la piel grasa limpia y en equilibrio, sin esa tirantez que la lleva a producir más sebo. El ácido salicílico —liposoluble— entra al poro y disuelve el sebo que lo tapa, mientras el extracto de ortiga astringe y regula. Todo sobre una base de tensioactivos suaves ajustada al pH de tu piel, para limpiar en profundidad sin arrasar la barrera.",
    beneficios: [
      "Ácido salicílico que destapa el poro desde dentro",
      "Ortiga astringente y seborreguladora",
      "Base suave a pH de la piel, no reseca",
      "Uso diario para pieles mixtas a grasas",
    ],
    ciencia: [
      { titulo: "Ácido salicílico (BHA)", texto: "Es liposoluble, así que penetra dentro del poro —que está lleno de grasa— y disuelve el tapón de sebo desde adentro. Su acción queratolítica afloja además las células muertas que obstruyen. Un limpiador soluble en agua no llega ahí." },
      { titulo: "SCI + SCS (tensioactivos)", texto: "El SCI limpia por micelas sin desnaturalizar las proteínas de la piel; el SCS suma poder desengrasante para la piel grasa. Juntos remueven el exceso de sebo sin arrasar la barrera." },
      { titulo: "Extracto de ortiga", texto: "Astringente y seborregulador de tradición: ayuda a equilibrar la producción de grasa y a cerrar el aspecto del poro." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un poro de piel grasa tapado de sebo: una molecula de acido salicilico, por ser liposoluble, entra al poro y disuelve el tapon desde adentro, mientras las micelas de los tensioactivos arrastran la grasa de la superficie. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'acido salicilico', 'liposoluble', 'poro destapado', 'micela'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El salicílico entra al poro y disuelve el sebo desde dentro",
    },
    ingredientes:
      "Aqua, Sodium Cocoyl Isethionate, Sodium Coco Sulfate, Cocamidopropyl Betaine, Coco-Glucoside, Glycerin, Urtica Dioica (Nettle) Extract, Salicylic Acid, Alcohol, Xanthan Gum, Cupressus Sempervirens (Cypress) Oil, Citric Acid, Benzyl Alcohol, Dehydroacetic Acid.",
    modoUso:
      "Sobre el rostro húmedo, masajea una pequeña cantidad y enjuaga con agua tibia. Úsalo mañana y noche.",
    piel: "Grasa y mixta con tendencia acneica",
    tamano: "100 ml",
    precio: null,
    glyph: "◈",
    accent: "rgba(90,122,58,0.26)",
  },
  {
    slug: "sos-granitos",
    nombre: "SOS Granitos",
    categoria: "Tratamiento localizado",
    descripcion: "Tratamiento puntual con salicílico para secar granitos.",
    descripcionLarga:
      "Un tratamiento localizado para ese granito que aparece de golpe. El ácido salicílico, liposoluble, entra al poro y disuelve el sebo que lo tapa, secando la imperfección sin resecar el resto de la piel. Un toque puntual, solo donde lo necesitas, de noche.",
    beneficios: [
      "Ácido salicílico que actúa dentro del poro",
      "Seca el granito sin arrasar la piel sana",
      "Aplicación puntual y precisa",
      "Uso nocturno según necesidad",
    ],
    ciencia: [
      { titulo: "Ácido salicílico (BHA)", texto: "Es liposoluble: penetra dentro del poro tapado de sebo y lo disuelve desde adentro. Su acción queratolítica seca la imperfección aflojando las células muertas que la obstruyen." },
      { titulo: "Aplicación localizada", texto: "Al actuar solo en el punto exacto, concentra su efecto donde se necesita y no reseca ni irrita la piel sana de alrededor." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un solo granito con el poro tapado: una gota de acido salicilico entra al poro, disuelve el tapon de sebo y lo seca, sin tocar la piel sana de alrededor. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'acido salicilico', 'poro tapado', 'tapon disuelto', 'piel sana intacta'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El salicílico destapa y seca el granito sin tocar la piel sana",
    },
    ingredientes:
      "Alcohol Denat., Aqua, Salicylic Acid, Glycerin, Panthenol, Citric Acid.",
    modoUso:
      "Aplica solo sobre el granito, con un cotonito o el aplicador, de noche. No lo extiendas por todo el rostro. No uses en piel irritada.",
    piel: "Grasa y mixta con tendencia acneica",
    tamano: "10 ml",
    precio: null,
    glyph: "✦",
    accent: "rgba(122,74,138,0.3)",
  },
  {
    slug: "leche-capilar-anti-frizz",
    nombre: "Leche Capilar Anti-Frizz",
    categoria: "Cuidado capilar",
    descripcion: "Leave-in que domina el frizz sin apelmazar, de medios a puntas.",
    descripcionLarga:
      "Una leche sin enjuague que controla el frizz y da suavidad. El biopolímero MaízCare forma un film transpirable que sella la cutícula y domina el encrespado, mientras el monoi y el BTMS desenredan y aportan brillo. Textura ligera que no apelmaza; ideal para cabello seco o rizado que busca definición y control de la humedad.",
    beneficios: [
      "MaízCare biopolímero que sella la cutícula y controla el frizz",
      "Monoi y BTMS que desenredan y dan brillo",
      "Sin enjuague, ligera, no apelmaza",
      "Cabello seco, rizado o con tendencia al encrespado",
    ],
    ciencia: [
      { titulo: "Biopolímero MaízCare", texto: "Un almidón de maíz hidrolizado que forma un film flexible y transpirable sobre la fibra: sella la cutícula y crea una barrera contra la humedad del ambiente, que es justamente la que hincha el cabello y provoca el frizz." },
      { titulo: "BTMS-50 (catiónico)", texto: "Es un acondicionador de carga positiva; el cabello dañado tiene carga negativa, así que el BTMS se adhiere justo donde más se necesita, desenreda y alisa la cutícula reduciendo la fricción." },
      { titulo: "Monoi, ricino y vitamina E", texto: "El monoi (coco + tiaré) aporta brillo y suavidad, el ricino da cuerpo, y la vitamina E es antioxidante que protege los aceites de la oxidación." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un cabello con la cuticula levantada (frizz) que se alisa: el biopolimero MaizCare forma un film que sella la cuticula y bloquea la humedad del aire, mientras el BTMS (cargas positivas) se adhiere a la fibra dañada. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'cuticula sellada', 'film MaizCare', 'bloquea humedad', 'BTMS cationico'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El film sella la cutícula y bloquea la humedad que causa el frizz",
    },
    ingredientes:
      "Aqua, Glycerin, Panthenol, Behentrimonium Methosulfate (BTMS-50), Cetyl Alcohol, Cocos Nucifera (Monoi) Oil, Cocos Nucifera (Coconut) Oil, Ricinus Communis (Castor) Seed Oil, Tocopherol, Hydrolyzed Corn Starch (MaizCare), Benzyl Alcohol, Dehydroacetic Acid, Cedrus Atlantica Oil, Citric Acid.",
    modoUso:
      "Sobre el cabello húmedo o seco, aplica de medios a puntas y peina. No enjuagues.",
    piel: "Cabello seco a rizado",
    tamano: "100 ml",
    precio: null,
    glyph: "❧",
    accent: "rgba(90,122,58,0.24)",
  },
  {
    slug: "champu-solido-curly",
    nombre: "Champú Sólido Curly",
    categoria: "Cuidado capilar",
    descripcion: "Champú sólido sin sulfatos agresivos, apto método curly.",
    descripcionLarga:
      "Una barra de champú pensada para el método curly: limpia con tensioactivos suaves, sin sulfatos agresivos que resequen, mientras el BTMS, la manteca de karité y el ricino acondicionan la fibra para rizos hidratados y definidos. Una sola barra rinde muchos lavados y viaja sin envases.",
    beneficios: [
      "Sin sulfatos agresivos, apto método curly",
      "BTMS, karité y ricino que acondicionan el rizo",
      "Limpieza suave que respeta la fibra",
      "Sólida: rinde meses y es libre de plástico",
    ],
    modoUso:
      "Frota la barra directamente en el cabello mojado o hazla espuma entre las manos, masajea el cuero y las largas, y enjuaga. Deja secar la barra al aire.",
    piel: "Cabello rizado y ondulado",
    tamano: "Barra ~60 g",
    precio: null,
    glyph: "◉",
    accent: "rgba(90,122,58,0.26)",
  },
  {
    slug: "champu-solido-cabello-graso",
    nombre: "Champú Sólido · Cabello Graso",
    categoria: "Cuidado capilar",
    descripcion: "Champú sólido clarificante con arcilla verde para cuero graso.",
    descripcionLarga:
      "Una barra clarificante para el cuero cabelludo graso. La arcilla verde absorbe el exceso de sebo y el aceite esencial de ciprés equilibra, con una limpieza algo más profunda que devuelve frescura a la raíz sin resecar las puntas. Aplícala de raíz a medios.",
    beneficios: [
      "Arcilla verde que absorbe el exceso de sebo",
      "Ciprés astringente que equilibra el cuero cabelludo",
      "Limpieza fresca de raíz, sin resecar las puntas",
      "Sólida y libre de plástico",
    ],
    modoUso:
      "Frota la barra en el cabello mojado enfocándote en la raíz y el cuero, masajea y enjuaga. Deja secar la barra al aire.",
    piel: "Cuero cabelludo graso",
    tamano: "Barra ~60 g",
    precio: null,
    glyph: "◍",
    accent: "rgba(90,122,58,0.28)",
  },
  {
    slug: "champu-solido-raiz",
    nombre: "Champú Sólido Raíz",
    categoria: "Cuidado capilar",
    descripcion: "Champú sólido con cafeína y ortiga que estimula el crecimiento.",
    descripcionLarga:
      "Una barra pensada para acompañar el crecimiento del cabello. La cafeína y el extracto de ortiga estimulan el folículo y equilibran el cuero cabelludo, sobre una base suave que limpia sin agredir. Masajea bien la raíz al lavar para aprovechar sus activos.",
    beneficios: [
      "Cafeína y ortiga que estimulan el folículo",
      "Acompaña el crecimiento y da fuerza a la raíz",
      "Base de limpieza suave, sin agredir",
      "Sólida y libre de plástico",
    ],
    modoUso:
      "Frota la barra en el cabello mojado, masajea el cuero cabelludo por un minuto para que actúen los activos, y enjuaga. Deja secar la barra al aire.",
    piel: "Todo tipo de cabello, foco en la raíz",
    tamano: "Barra ~60 g",
    precio: null,
    glyph: "❂",
    accent: "rgba(200,160,80,0.24)",
  },
  {
    slug: "acondicionador-solido-seda",
    nombre: "Acondicionador Sólido Seda",
    categoria: "Cuidado capilar",
    descripcion: "Acondicionador sólido nutritivo para cabello seco o rizado.",
    descripcionLarga:
      "Una barra de acondicionador nutritiva para el cabello seco, rizado o dañado. El BTMS y la manteca de karité desenredan y nutren en profundidad, y su pH ácido sella la cutícula para un brillo de espejo. Se aplica de medios a puntas y se enjuaga: seda al tacto.",
    beneficios: [
      "BTMS y karité que desenredan y nutren",
      "pH ácido que sella la cutícula y da brillo",
      "Ideal para cabello seco, rizado o dañado",
      "Sólido y libre de plástico",
    ],
    modoUso:
      "Tras el champú, desliza la barra de medios a puntas, peina con los dedos, deja actuar un minuto y enjuaga. Deja secar la barra al aire.",
    piel: "Cabello seco a rizado",
    tamano: "Barra ~60 g",
    precio: null,
    glyph: "❈",
    accent: "rgba(122,74,138,0.24)",
  },
  {
    slug: "acondicionador-solido-ligero",
    nombre: "Acondicionador Sólido Ligero",
    categoria: "Cuidado capilar",
    descripcion: "Acondicionador sólido liviano para cabello fino o graso.",
    descripcionLarga:
      "Una barra de acondicionador liviana para el cabello fino, graso o normal. Desenreda y da deslizamiento con un mínimo de aceites, para que no apelmace ni engrase, mientras el ciprés equilibra el cuero cabelludo. Aplícala solo de medios a puntas.",
    beneficios: [
      "Desenreda sin apelmazar ni engrasar",
      "Toque mínimo de aceites, alto deslizamiento",
      "Ciprés que equilibra el cuero cabelludo",
      "Cabello fino, graso o normal",
    ],
    modoUso:
      "Tras el champú, aplica la barra solo de medios a puntas (evita la raíz), deja actuar y enjuaga. Deja secar la barra al aire.",
    piel: "Cabello fino a normal",
    tamano: "Barra ~60 g",
    precio: null,
    glyph: "❊",
    accent: "rgba(90,122,58,0.22)",
  },
  {
    slug: "manteca-ancestral",
    nombre: "Manteca Ancestral",
    categoria: "Bálsamo facial de noche",
    descripcion: "Bálsamo facial batido de tallow infusionado con pitra, tratamiento reparador de noche.",
    descripcionLarga:
      "Un bálsamo facial batido de tallow (grasa de vacuno purificada) infusionado con pitra, nuestro árbol nativo, pensado como tratamiento nutritivo de noche para el rostro. El tallow es biomimético —su perfil de grasas se parece al de la piel humana, por eso se reconoce y absorbe— y repara la barrera con vitaminas A, D, E y K; la manteca de karité y el café verde suman confort y antioxidantes. Textura mousse que se derrite al contacto. Se aplica en el rostro como último paso de la noche (y sirve también para manos y zonas secas del cuerpo).",
    beneficios: [
      "Tratamiento facial de noche, reparador y nutritivo",
      "Tallow biomimético que la piel reconoce y absorbe",
      "Repara la barrera con vitaminas A, D, E y K",
      "Café verde antioxidante y karité nutritiva",
    ],
    ciencia: [
      { titulo: "Tallow biomimético", texto: "Su perfil de ácidos grasos (oleico, palmítico, esteárico) es casi idéntico al del sebo humano. Por eso la piel lo reconoce y lo integra a su película hidrolipídica en vez de dejarlo encima, restaurando la barrera." },
      { titulo: "Vitaminas A, D, E y K", texto: "El tallow aporta estas vitaminas liposolubles: la A (retinol natural) apoya la renovación celular, la E es antioxidante y protege los lípidos de la piel, favoreciendo la reparación nocturna." },
      { titulo: "Manteca de café verde", texto: "Rica en ácido clorogénico y esteroles antioxidantes que neutralizan radicales libres, protegiendo la piel del daño oxidativo mientras duermes." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un corte de piel seca y con la barrera debilitada que se repara de noche: los lipidos del tallow (identicos al sebo humano) se integran a la pelicula hidrolipidica y las vitaminas A, D, E y K nutren las capas. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'lipidos biomimeticos', 'barrera reparada', 'vitaminas A D E K'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "Los lípidos del tallow se integran a la barrera y la reparan",
    },
    ingredientes:
      "Bos Taurus Tallow (infusionado con pitra), Butyrospermum Parkii (Shea) Butter, Coffea Arabica (Green Coffee) Seed Butter, Tocopherol (Vitamina E), Aniba Rosaeodora (Ho Wood) Oil.",
    modoUso:
      "Toma una cantidad del tamaño de una avellana y masajea en el rostro como último paso de la noche. Sirve también para manos y zonas secas del cuerpo. Un poco rinde mucho.",
    piel: "Rostro (tratamiento de noche); piel seca y cuerpo",
    tamano: "60 ml",
    precio: null,
    glyph: "❃",
    accent: "rgba(200,160,80,0.26)",
  },
  {
    slug: "aceite-facial-drenante",
    nombre: "Aceite Facial Drenante",
    categoria: "Ritual facial",
    descripcion: "Aceite de masaje facial que ayuda al drenaje linfático.",
    descripcionLarga:
      "Un aceite de masaje para el ritual de drenaje linfático del rostro. Aceites ligeros deslizan sin tirar de la piel, mientras los aceites esenciales de ciprés, hinojo y cedro acompañan la descongestión. Se masajea hacia los ganglios y se retira el exceso con un algodón: el rostro queda descongestionado y luminoso.",
    beneficios: [
      "Deslizamiento perfecto para el masaje facial",
      "Ciprés, hinojo y cedro que acompañan el drenaje",
      "Ayuda a descongestionar y desinflamar",
      "Ritual relajante de noche",
    ],
    ciencia: [
      { titulo: "Aceites ligeros (base)", texto: "El coco fraccionado, las almendras y el sésamo tienen baja viscosidad: dan el deslizamiento necesario para que las manos masajeen sin arrastrar ni estirar la piel, condición clave de un buen drenaje." },
      { titulo: "AE de ciprés", texto: "Venotónico y astringente de tradición: acompaña el retorno de líquidos y la sensación de piernas y rostro descongestionados." },
      { titulo: "Hinojo y cedro", texto: "El aceite esencial de hinojo es espasmolítico y el de cedro, drenante linfático tradicional; juntos acompañan la descongestión del masaje." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un rostro en seccion con la red de vasos linfaticos: el masaje con el aceite mueve el liquido acumulado hacia los ganglios (orejas y cuello), descongestionando la piel. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'vasos linfaticos', 'masaje', 'hacia los ganglios', 'rostro descongestionado'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El masaje mueve el líquido hacia los ganglios y descongestiona",
    },
    ingredientes:
      "Caprylic/Capric Triglyceride (coco fraccionado), Prunus Amygdalus Dulcis (Sweet Almond) Oil, Sesamum Indicum (Sesame) Seed Oil, Tocopherol, Cupressus Sempervirens (Cypress) Oil, Foeniculum Vulgare (Fennel) Oil, Cedrus Atlantica Oil.",
    modoUso:
      "Aplica unas gotas y masajea el rostro con movimientos ascendentes y hacia los ganglios (orejas y cuello). Retira el exceso con un algodón. Uso nocturno.",
    piel: "Todo tipo de piel (masaje, se retira)",
    tamano: "30 ml",
    precio: null,
    glyph: "✺",
    accent: "rgba(90,122,58,0.24)",
  },
  {
    slug: "unguento-efecto-calor",
    nombre: "Ungüento Efecto Calor",
    categoria: "Ungüentos medicinales",
    descripcion: "Ungüento de tallow infusionado con clavo, canela y pitra, que da calor para el masaje muscular.",
    descripcionLarga:
      "Un ungüento denso para el masaje de músculos y articulaciones cansadas. Su base es tallow (grasa de vacuno) infusionado con clavo, canela y pitra: el eugenol del clavo y el cinamaldehído de la canela generan un calor real que reconforta y acompaña el alivio. La cera de abeja le da cuerpo firme, y los aceites esenciales de clavo, cedro (antiinflamatorio muscular) e hinojo (espasmolítico) potencian el efecto. De la tradición de la botica casera, con criterio.",
    beneficios: [
      "Tallow infusionado con clavo, canela y pitra: calor real",
      "Clavo y canela (eugenol y cinamaldehído) que reconfortan",
      "Cedro antiinflamatorio e hinojo espasmolítico",
      "Para músculos y articulaciones cansadas",
    ],
    modoUso:
      "Masajea una pequeña cantidad sobre la zona. Solo uso corporal (no en rostro ni mucosas). Prueba antes en una zona pequeña: el clavo y la canela pueden sensibilizar. No usar en menores de 6 años ni sobre piel irritada o dañada. Lava tus manos después.",
    piel: "Uso corporal externo",
    tamano: "30 g",
    precio: null,
    glyph: "☉",
    accent: "rgba(150,80,45,0.3)",
  },
  {
    slug: "unguento-cicatrizante-botanico",
    nombre: "Ungüento Cicatrizante Botánico",
    categoria: "Ungüentos medicinales",
    descripcion: "Ungüento de tallow infusionado con matico y milenrama para la piel dañada.",
    descripcionLarga:
      "Un ungüento reparador de tallow (grasa de vacuno) infusionado con matico y milenrama, dos plantas de larga tradición cicatrizante y antiinflamatoria en el sur de Chile. El tallow biomimético nutre y protege, la cera de abeja le da cuerpo semisólido, y los aceites esenciales de palo de ho (linalol, que apoya la regeneración celular) y cedro (sesquiterpenos antiinflamatorios) acompañan la reparación de la piel seca, agrietada o marcada. Denso y nutritivo, de la botica del bosque.",
    beneficios: [
      "Tallow infusionado con matico y milenrama, cicatrizantes del sur",
      "Palo de ho (linalol) que apoya la regeneración de la piel",
      "Cedro con sesquiterpenos antiinflamatorios",
      "Acompaña la reparación de piel seca, agrietada o marcada",
    ],
    modoUso:
      "Aplica una capa fina sobre la piel limpia y seca, una o dos veces al día. Uso externo, sobre piel sin heridas abiertas.",
    piel: "Piel seca, agrietada o con marcas",
    tamano: "30 g",
    precio: null,
    glyph: "❦",
    accent: "rgba(122,74,60,0.3)",
  },
  {
    slug: "aceite-desmaquillante",
    nombre: "Aceite Desmaquillante",
    categoria: "Limpieza facial",
    descripcion: "Aceite que disuelve el maquillaje a prueba de agua y se enjuaga sin residuo.",
    descripcionLarga:
      "Un aceite de limpieza que disuelve hasta el maquillaje a prueba de agua y el protector solar, porque lo semejante disuelve lo semejante: la grasa del maquillaje se une a los aceites. Al mojarlo con agua se emulsiona y se enjuaga sin dejar película grasa. Con un toque de ricino que cuida las pestañas. El primer paso de la doble limpieza, suave incluso para el contorno de los ojos.",
    beneficios: [
      "Disuelve maquillaje waterproof y protector solar",
      "Se emulsiona con agua y se enjuaga sin residuo",
      "Ricino que cuida y fortalece las pestañas",
      "Primer paso de la doble limpieza",
    ],
    ciencia: [
      { titulo: "Lo semejante disuelve lo semejante", texto: "El maquillaje a prueba de agua y el protector solar son grasos: repelen el agua pero tienen afinidad química por los aceites, que los disuelven sin frotar. Por eso un aceite limpia lo que el agua no puede." },
      { titulo: "Polisorbato 80 (emulsionante)", texto: "Al añadir agua, sus moléculas rodean las gotas de aceite y forman una emulsión lechosa que arrastra el maquillaje disuelto y se enjuaga por completo, sin dejar película grasa." },
      { titulo: "Ácido ricinoleico (ricino)", texto: "El aceite de ricino es rico en ácido ricinoleico; aporta un toque que nutre y fortalece las pestañas mientras desmaquillas." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra dos momentos: primero gotas de aceite disolviendo particulas de maquillaje graso sobre la piel; luego, al agregar agua, el polisorbato 80 emulsionando esas gotas en una mezcla lechosa que se enjuaga. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'aceite disuelve maquillaje', 'polisorbato 80', 'emulsion lechosa', 'se enjuaga'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El aceite disuelve el maquillaje y el polisorbato lo emulsiona con agua",
    },
    ingredientes:
      "Caprylic/Capric Triglyceride (coco fraccionado), Ricinus Communis (Castor) Seed Oil, Polysorbate 80, Tocopherol.",
    modoUso:
      "Sobre el rostro seco y las manos secas, masajea para disolver el maquillaje. Moja con un poco de agua para que se vuelva lechoso y enjuaga. Ideal antes de tu limpiador.",
    piel: "Todo tipo de piel",
    tamano: "100 ml",
    precio: null,
    glyph: "◑",
    accent: "rgba(200,160,80,0.24)",
  },
  {
    slug: "mascarilla-purificante",
    nombre: "Mascarilla Purificante",
    categoria: "Mascarilla facial",
    descripcion: "Mascarilla en polvo de carbón, arcilla verde y avena que detoxifica la piel grasa.",
    descripcionLarga:
      "Una mascarilla en polvo que activas con agua justo antes de usar, para que sus arcillas lleguen frescas. El carbón activado y la arcilla verde atraen y absorben el exceso de sebo y las impurezas del poro, mientras la avena coloidal y el caolín suavizan para que no apriete ni reseque de más. Deja la piel mate, limpia y afinada. En polvo dura más y viaja sin conservantes.",
    beneficios: [
      "Carbón activado y arcilla verde que absorben el sebo",
      "Avena coloidal que calma y evita la sensación tirante",
      "Detoxifica y afina el poro",
      "En polvo: sin conservantes, se activa al momento",
    ],
    modoUso:
      "Mezcla una cucharadita del polvo con un poco de agua (o hidrolato) hasta formar una pasta. Aplica una capa sobre el rostro limpio, evita el contorno de los ojos, deja 10 minutos sin que seque del todo y enjuaga. Una a dos veces por semana.",
    piel: "Grasa y mixta",
    tamano: "50 g",
    precio: null,
    glyph: "◕",
    accent: "rgba(60,70,55,0.4)",
  },
  {
    slug: "mascarilla-calmante",
    nombre: "Mascarilla Calmante",
    categoria: "Mascarilla facial",
    descripcion: "Mascarilla en polvo de caolín y avena, la más suave, para piel sensible.",
    descripcionLarga:
      "La mascarilla más delicada de la línea, pensada para las pieles sensibles, secas o reactivas que no toleran las arcillas fuertes. El caolín (arcilla blanca) es la más suave: limpia y absorbe el exceso de grasa sin resecar, y la avena coloidal calma con sus avenantramidas y suaviza para que la piel no quede tirante. Se activa con agua al momento y deja la piel fresca, confortable y sin estrés.",
    beneficios: [
      "Caolín, la arcilla más suave, que no reseca",
      "Avena coloidal que calma la piel sensible",
      "Sin color ni activos fuertes: pura suavidad",
      "En polvo: sin conservantes, se activa al momento",
    ],
    modoUso:
      "Mezcla una cucharadita del polvo con un poco de agua o hidrolato hasta formar una pasta. Aplica sobre el rostro limpio, deja 10 minutos sin que seque del todo y enjuaga. Una vez por semana.",
    piel: "Sensible, seca o reactiva",
    tamano: "50 g",
    precio: null,
    glyph: "◔",
    accent: "rgba(200,190,160,0.28)",
  },
  {
    slug: "mascarilla-iluminadora",
    nombre: "Mascarilla Iluminadora",
    categoria: "Mascarilla facial",
    descripcion: "Mascarilla en polvo de arcilla amarilla, avena y cúrcuma que devuelve luz a la piel apagada.",
    descripcionLarga:
      "Una mascarilla en polvo pensada para devolver luz a las pieles apagadas o cansadas. La arcilla amarilla limpia con suavidad y aporta luminosidad, la avena coloidal calma y suaviza para que la arcilla nunca apriete ni reseque, y la cúrcuma suma su curcumina, un potente antioxidante y antiinflamatorio que revitaliza y empareja el aspecto del cutis. Se activa con agua al momento, así llega fresca y sin conservantes. Deja la piel limpia, fresca y con un brillo saludable.",
    beneficios: [
      "Arcilla amarilla que ilumina y suaviza",
      "Avena coloidal que calma y evita la sensación tirante",
      "Cúrcuma (curcumina): antioxidante y antiinflamatoria",
      "En polvo: sin conservantes, se activa al momento",
    ],
    modoUso:
      "Mezcla una cucharadita del polvo con un poco de agua, hidrolato o yogur hasta formar una pasta. Aplica sobre el rostro limpio, deja 10 minutos sin que seque del todo y enjuaga. Una vez por semana. Si queda un leve tono amarillo, retíralo con tu aceite desmaquillante.",
    piel: "Normal, apagada o cansada",
    tamano: "50 g",
    precio: null,
    glyph: "◓",
    accent: "rgba(200,160,80,0.28)",
  },
  {
    slug: "jabon-obsidiana",
    nombre: "Jabón Obsidiana",
    categoria: "Cuerpo",
    descripcion: "Jabón negro de carbón activado, purificante para cuerpo y piel grasa.",
    descripcionLarga:
      "Un jabón negro como la obsidiana, con carbón activado que atrae y arrastra impurezas y exceso de grasa. Limpia en profundidad dejando la piel fresca y depurada, ideal para el cuerpo y las pieles grasas o con tendencia a impurezas. Su color intenso y su carácter mineral lo hacen un ritual en sí mismo.",
    beneficios: [
      "Carbón activado que purifica y depura",
      "Limpieza profunda para cuerpo y piel grasa",
      "Deja la piel fresca, sin sensación grasa",
      "Estética mineral, negro intenso",
    ],
    modoUso:
      "Frota entre las manos húmedas o sobre una esponja, aplica la espuma sobre la piel y enjuaga. Uso corporal; en el rostro, solo pieles grasas.",
    piel: "Piel grasa y cuerpo",
    tamano: "Barra ~100 g",
    precio: null,
    glyph: "◆",
    accent: "rgba(30,30,35,0.55)",
  },
  {
    slug: "jabon-oro",
    nombre: "Jabón Oro",
    categoria: "Cuerpo",
    descripcion: "Jabón dorado de glicerina con tallow infusionado con pitra y cúrcuma, para el cuidado diario.",
    descripcionLarga:
      "Un jabón de glicerina de tono dorado, enriquecido con tallow (grasa de vacuno) infusionado con pitra, nuestro árbol nativo, que nutre la piel mientras se limpia. La cúrcuma le regala su color de oro y su cualidad antioxidante, y el aceite esencial de triwe, su aroma herbal y fresco. Limpia con delicadeza dejando la piel cómoda y aterciopelada. Un pequeño lujo cotidiano de la casa El Floema.",
    beneficios: [
      "Tallow infusionado con pitra que nutre al limpiar",
      "Color dorado natural de la cúrcuma",
      "Aroma herbal de triwe, nuestro árbol nativo",
      "Limpieza suave, apta para todo tipo de piel",
    ],
    modoUso:
      "Frota entre las manos húmedas o sobre una esponja, aplica la espuma y enjuaga. Uso corporal diario.",
    piel: "Todo tipo de piel",
    tamano: "Barra ~100 g",
    precio: null,
    glyph: "◇",
    accent: "rgba(200,160,80,0.3)",
  },
  {
    slug: "spray-antiinsectos",
    nombre: "Spray Antiinsectos",
    categoria: "Cuerpo",
    descripcion: "Repelente botánico con citronela, cedro y clavo. Reaplicar cada 1-2 h.",
    descripcionLarga:
      "Un repelente en spray hecho con aceites esenciales cuyo aroma ahuyenta a los mosquitos: citronela —el clásico—, cedro, palo de ho y un toque de clavo. La glicerina ayuda a que los aromas permanezcan un poco más sobre la piel. Fresco y de origen natural. Como todo repelente botánico, protege por menos tiempo que los sintéticos, así que se reaplica cada una o dos horas.",
    beneficios: [
      "Citronela, cedro, palo de ho y clavo repelentes",
      "Fórmula botánica, sin DEET",
      "Fresco y de aroma herbal",
      "Para paseos, campo y tardes de verano",
    ],
    modoUso:
      "Agita antes de usar. Rocía sobre la piel expuesta y la ropa, a 15 cm, evitando ojos, mucosas y heridas. Reaplica cada 1 a 2 horas. No usar en menores de 3 años; prueba antes en el antebrazo.",
    piel: "Uso corporal externo",
    tamano: "100 ml",
    precio: null,
    glyph: "✺",
    accent: "rgba(90,122,58,0.26)",
  },
];

export function getProductoTienda(slug: string): ProductoTienda | undefined {
  return productosTienda.find((p) => p.slug === slug);
}

export const productosDestacados: ProductoTienda[] = productosTienda.filter((p) => p.destacado);

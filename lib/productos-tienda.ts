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
  resultado?: string; // "qué esperar" — resultado breve para la ficha imprimible
  piel?: string; // para qué tipo de piel
  tamano?: string; // ej "100 ml"
  imagenPrompt?: string; // prompt para generar la foto del producto (placeholder)
  fichaPrompt?: string; // prompt para generar la ficha ilustrada (infografía estilo El Floema)
  precio: number | null;
  glyph: string;
  accent: string;
  destacado?: boolean;
  // oculto: true = no aparece en la tienda (pero conserva su info para cuando se
  // vuelva a fabricar; basta con quitar el flag para que reaparezca).
  oculto?: boolean;
};

export const productosTienda: ProductoTienda[] = [
  {
    slug: "calma",
    nombre: "Calma",
    categoria: "Sérum facial",
    descripcion: "Sérum facial calmante con arrayán nativo, para pieles sensibles y con rojeces.",
    descripcionLarga:
      "Un sérum ligero que serena la piel reactiva: baja las rojeces, refuerza la barrera y devuelve el confort. Sobre una base de hidrolato de arrayán —nuestro árbol nativo—, la centella y el pantenol reparan, la niacinamida fortalece la barrera, y la urea con el ácido hialurónico hidratan sin tirantez. La inulina cuida el microbioma. Textura fluida y de rápida absorción.",
    beneficios: [
      "Centella y pantenol que reparan y calman",
      "Niacinamida que refuerza la barrera",
      "Urea y ácido hialurónico que hidratan sin peso",
      "Base de arrayán nativo; inulina prebiótica",
    ],
    ciencia: [
      { titulo: "Centella asiática (asiaticósido)", texto: "Sus triterpenos —asiaticósido y madecasósido— estimulan la síntesis de colágeno y modulan las citoquinas inflamatorias. Por eso reparan la barrera y bajan las rojeces de la piel reactiva." },
      { titulo: "Niacinamida + pantenol", texto: "La niacinamida (B3) refuerza la barrera estimulando ceramidas; el pantenol (B5) se convierte en ácido pantoténico, calma y repara. Juntos dejan la piel serena y sedosa." },
      { titulo: "Urea + ácido hialurónico", texto: "La urea es parte del factor natural de hidratación (NMF): humecta y mantiene la piel flexible. El ácido hialurónico rellena de agua las capas superficiales, borrando la tirantez." },
      { titulo: "Inulina + MaízCare", texto: "La inulina es un prebiótico que nutre el microbioma sano de la piel; el biopolímero MaízCare deja un film tensor de tacto suave que alisa la superficie." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un corte de piel enrojecida e inflamada que se calma: las moleculas de centella asiatica (triterpenos) reducen la inflamacion y estimulan fibras de colageno que reparan la barrera cutanea. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'asiaticosido', 'menos inflamacion', 'colageno', 'barrera reparada'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "La centella modula la inflamación y repara la barrera",
    },
    ingredientes:
      "Luma Apiculata (Arrayán) Leaf Water, Glycerin, Urea, Panthenol, Niacinamide, Inulin, Hydrolyzed Corn Starch (MaizCare), Centella Asiatica Extract, Sodium Hyaluronate, Xanthan Gum, Benzyl Alcohol, Dehydroacetic Acid, Citric Acid.",
    modoUso:
      "Aplica 3-4 gotas sobre el rostro limpio, mañana y noche, antes de la crema. Da unos toquecitos suaves para ayudar a absorber.",
    piel: "Sensible, reactiva o con rojeces",
    tamano: "30 ml",
    imagenPrompt:
      "A partir de la FOTO REAL del producto que se entrega, mejora SOLO el fondo y la ambientacion. NO modifiques el producto: conserva exactamente el frasco, su forma, tapa, color, la etiqueta y el contenido tal como estan en la foto. Reemplaza unicamente el fondo por una escena botanica: rodeado de hojas de arrayan (Luma apiculata, de corteza canela) y hojas de centella asiatica, sobre piedra oscura humeda, con luz calida dorada lateral y fondo de bosque verde oscuro difuminado, estetica botanica y mistica de cosmetica natural artesanal, tonos verdes profundos, dorados y tierra. Manten la iluminacion y las sombras coherentes con el producto real. No anadas ningun texto ni marca de agua.",
    fichaPrompt:
      "Poster vertical estilo ficha de producto de El Floema, cosmetica botanica, formato retrato. Fondo de madera oscura con vetas, tonos negro, verde profundo, marron y dorado. Marco ornamental dorado art nouveau alrededor de todo el borde, con volutas botanicas en las esquinas y lunas doradas arriba. Arriba al centro el emblema de El Floema (frasco pocion con raices doradas). En el centro, la foto real de un frasco con gotario dentro de un ovalo dorado. Alrededor, ilustraciones botanicas coloreadas estilo grabado cientifico de hojas de arrayan y centella asiatica, simetricas y ordenadas, con lineas doradas finas que conectan cada ingrediente con su recuadro. Distribuye recuadros ornamentados dorados con el siguiente texto, en espanol con ORTOGRAFIA PERFECTA y tipografia serif dorada elegante, muy legible y ordenado. TITULO: 'SERUM CALMA - Calmante y reparador con arrayan nativo'. Recuadro COMO ACTUA: 'Centella asiatica: repara la barrera y calma. Niacinamida y pantenol: refuerzan la barrera y alivian. Urea y acido hialuronico: hidratan sin tirantez. Inulina: cuida el microbioma.'. Recuadro PROPIEDADES: 'Reduce rojeces. Repara la barrera. Calma la piel reactiva.'. Recuadro MODO DE USO: 'Manana y noche, 3-4 gotas antes de la crema.'. Recuadro PARA: 'Piel sensible, reactiva o con rojeces'. Recuadro RESULTADO: 'Piel serena, flexible y sin tirantez.'. Escribe EXACTAMENTE ese texto, sin inventar ni deformar palabras. Estetica mistica y cientifica, iluminacion calida dorada, composicion equilibrada y muy ordenada, alta calidad.",
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
      "Un sérum antioxidante que devuelve la luz a las pieles apagadas. El maqui y el té verde defienden del daño diario, la niacinamida empareja el tono y atenúa manchas, y la cafeína descongestiona y da vitalidad. La urea y el ácido hialurónico hidratan para un rostro jugoso, sobre una base de arrayán nativo. Se absorbe al instante.",
    beneficios: [
      "Antioxidantes de maqui y té verde contra el daño diario",
      "Niacinamida que empareja el tono y atenúa manchas",
      "Cafeína que descongestiona y da vitalidad al rostro",
      "Urea y ácido hialurónico para un rostro jugoso",
    ],
    ciencia: [
      { titulo: "Antocianinas del maqui", texto: "Las delfinidinas del maqui (Aristotelia chilensis) son antioxidantes potentes: neutralizan los radicales libres que genera el sol y la contaminación, la causa principal del tono desparejo y el envejecimiento prematuro." },
      { titulo: "EGCG (té verde)", texto: "El galato de epigalocatequina es un polifenol antioxidante y fotoprotector suave; además ayuda a regular el sebo y a calmar la piel." },
      { titulo: "Niacinamida (vitamina B3)", texto: "Frena la transferencia de melanina desde el melanocito al queratinocito: al cortar ese transporte, empareja el tono y reduce las manchas. También refuerza la barrera estimulando ceramidas." },
      { titulo: "Cafeína", texto: "Antioxidante y vasoactiva: mejora la microcirculación y descongestiona, dando al rostro un aspecto más despierto y vital." },
      { titulo: "Urea, hialurónico y centella", texto: "La urea (NMF) y el ácido hialurónico hidratan —y una piel hidratada refleja mejor la luz—; la centella asiática repara la barrera. El biopolímero MaízCare alisa la superficie." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra antioxidantes del maqui (antocianinas) neutralizando radicales libres en la piel, y una molecula de niacinamida bloqueando la transferencia de melanina desde el melanocito al queratinocito. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'antocianinas', 'radical libre neutralizado', 'niacinamida', 'menos melanina'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "Los antioxidantes neutralizan radicales y la niacinamida empareja el tono",
    },
    ingredientes:
      "Luma Apiculata (Arrayán) Leaf Water, Glycerin, Urea, Aristotelia Chilensis (Maqui) Fruit Extract, Niacinamide, Camellia Sinensis (Green Tea) Leaf Extract, Centella Asiatica Extract, Caffeine, Hydrolyzed Corn Starch (MaizCare), Alcohol, Xanthan Gum, Sodium Hyaluronate, Benzyl Alcohol, Dehydroacetic Acid, Citric Acid.",
    modoUso:
      "Aplica 3-4 gotas sobre el rostro limpio, mañana y noche. En el día, acompaña siempre con protector solar.",
    piel: "Apagada, con manchas o primeras líneas",
    tamano: "30 ml",
    imagenPrompt:
      "A partir de la FOTO REAL del producto que se entrega, mejora SOLO el fondo y la ambientacion. NO modifiques el producto: conserva exactamente el frasco, su forma, tapa, color, la etiqueta y el contenido tal como estan en la foto. Reemplaza unicamente el fondo por una escena botanica: rodeado de racimos de maqui (Aristotelia chilensis) de frutos morado oscuro y hojas de te verde, sobre piedra oscura humeda, con luz calida dorada lateral y fondo de bosque verde oscuro difuminado, estetica botanica y mistica de cosmetica natural artesanal, tonos verdes profundos, dorados, morados y tierra. Manten la iluminacion y las sombras coherentes con el producto real. No anadas ningun texto ni marca de agua.",
    fichaPrompt:
      "Poster vertical estilo ficha de producto de El Floema, cosmetica botanica, formato retrato. Fondo de madera oscura con vetas, tonos negro, verde profundo, morado y dorado. Marco ornamental dorado art nouveau alrededor de todo el borde, con volutas botanicas en las esquinas y lunas doradas arriba. Arriba al centro el emblema de El Floema (frasco pocion con raices doradas). En el centro, la foto real de un frasco con gotario dentro de un ovalo dorado. Alrededor, ilustraciones botanicas coloreadas estilo grabado cientifico de racimos de maqui morado y hojas de te verde, simetricas y ordenadas, con lineas doradas finas que conectan cada ingrediente con su recuadro. Distribuye recuadros ornamentados dorados con el siguiente texto, en espanol con ORTOGRAFIA PERFECTA y tipografia serif dorada elegante, muy legible y ordenado. TITULO: 'SERUM ILUMINA - Antioxidante iluminador con maqui'. Recuadro COMO ACTUA: 'Maqui (antocianinas) y te verde (EGCG): antioxidantes contra el dano diario. Niacinamida: empareja el tono y atenua manchas. Cafeina: descongestiona y da vitalidad. Urea y acido hialuronico: hidratan y dan luz.'. Recuadro PROPIEDADES: 'Ilumina el cutis apagado. Empareja el tono. Antioxidante.'. Recuadro MODO DE USO: 'Manana y noche, 3-4 gotas. De dia, protector solar.'. Recuadro PARA: 'Piel apagada, con manchas o primeras lineas'. Recuadro RESULTADO: 'Rostro luminoso, jugoso y de tono parejo.'. Escribe EXACTAMENTE ese texto, sin inventar ni deformar palabras. Estetica mistica y cientifica, iluminacion calida dorada, composicion equilibrada y muy ordenada, alta calidad.",
    precio: null,
    glyph: "✧",
    accent: "rgba(200,160,80,0.24)",
    destacado: true,
  },
  {
    slug: "purifica",
    nombre: "Purifica",
    categoria: "Sérum facial",
    descripcion: "Sérum seborregulador y renovador para pieles mixtas y grasas, con nalca nativa.",
    descripcionLarga:
      "Un sérum diario que equilibra la piel con tendencia grasa sin agredir. La niacinamida regula el sebo y afina el poro, el ácido láctico —tamponado con lactato de sodio— renueva e ilumina con suavidad, y la tintura de nalca, planta nativa, astringe. La inulina cuida el microbioma. Para una piel más pareja y fresca, sin resecar.",
    beneficios: [
      "Niacinamida que regula el sebo y afina el poro",
      "Ácido láctico (AHA) que renueva e ilumina, de buena tolerancia",
      "Tintura de nalca nativa, astringente",
      "Inulina prebiótica; uso diario sin resecar",
    ],
    ciencia: [
      { titulo: "Niacinamida (vitamina B3)", texto: "Modula la actividad de las glándulas sebáceas (regula la producción de sebo) y refuerza la barrera estimulando la síntesis de ceramidas. Por eso afina el poro sin resecar." },
      { titulo: "Ácido láctico (AHA)", texto: "Exfoliante suave que disuelve la unión entre las células muertas de la superficie: renueva e ilumina. El lactato de sodio lo tampona para buena tolerancia y, además, humecta (es parte del factor natural de hidratación)." },
      { titulo: "Tintura de nalca (nativa)", texto: "La nalca (Gunnera tinctoria) es rica en taninos; se le atribuye una acción astringente que ayuda a cerrar el aspecto del poro y a controlar el brillo." },
      { titulo: "Inulina + MaízCare", texto: "La inulina es un prebiótico que nutre el microbioma sano de la piel; el biopolímero MaízCare deja un film tensor de tacto matificante." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un corte de piel grasa: la niacinamida regula la glandula sebacea (menos sebo) y refuerza las ceramidas, mientras el acido lactico (AHA) afloja las celulas muertas de la superficie renovandola. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'niacinamida', 'menos sebo', 'ceramidas', 'acido lactico renueva'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "La niacinamida regula el sebo y el ácido láctico renueva la superficie",
    },
    ingredientes:
      "Laurus Nobilis (Laurel) Leaf Water, Gunnera Tinctoria (Nalca) Leaf Extract, Niacinamide, Lactic Acid, Sodium Lactate, Glycerin, Hydrolyzed Corn Starch (MaizCare), Inulin, Alcohol, Xanthan Gum, Benzyl Alcohol, Dehydroacetic Acid.",
    modoUso:
      "Aplica 3-4 gotas sobre el rostro limpio, mañana y noche, antes de la hidratante. Como contiene ácido láctico (AHA), en el día usa siempre protector solar.",
    piel: "Mixta, grasa o con tendencia acneica",
    tamano: "30 ml",
    imagenPrompt:
      "A partir de la FOTO REAL del producto que se entrega, mejora SOLO el fondo y la ambientacion. NO modifiques el producto: conserva exactamente el frasco, su forma, tapa, color, la etiqueta y el contenido tal como estan en la foto. Reemplaza unicamente el fondo por una escena botanica: rodeado de hojas gigantes de nalca (Gunnera tinctoria) y hojas de laurel, sobre piedra oscura humeda, con luz calida dorada lateral y fondo de bosque verde oscuro difuminado, estetica botanica y mistica de cosmetica natural artesanal, tonos verdes profundos, dorados y tierra. Manten la iluminacion y las sombras coherentes con el producto real. No anadas ningun texto ni marca de agua.",
    fichaPrompt:
      "Poster vertical estilo ficha de producto de El Floema, cosmetica botanica, formato retrato. Fondo de madera oscura con vetas, tonos negro, verde profundo, marron y dorado. Marco ornamental dorado art nouveau alrededor de todo el borde, con volutas botanicas en las esquinas y lunas doradas arriba. Arriba al centro el emblema de El Floema (frasco pocion con raices doradas). En el centro, la foto real de un frasco con gotario dentro de un ovalo dorado. Alrededor, ilustraciones botanicas coloreadas estilo grabado cientifico de hojas de nalca (Gunnera tinctoria) y laurel, simetricas y ordenadas. Distribuye recuadros ornamentados dorados con el siguiente texto, en espanol con ORTOGRAFIA PERFECTA y tipografia serif dorada elegante, muy legible y ordenado. TITULO: 'SERUM PURIFICA - Seborregulador con nalca nativa'. Recuadro COMO ACTUA: 'Niacinamida: regula el sebo y afina el poro. Acido lactico (AHA): renueva e ilumina, tamponado para buena tolerancia. Nalca: astringente nativa. Inulina y MaizCare: microbioma y efecto matificante.'. Recuadro PROPIEDADES: 'Regula el brillo. Afina el poro. Renueva sin resecar.'. Recuadro MODO DE USO: 'Manana y noche, antes de la hidratante. De dia, protector solar.'. Recuadro PARA: 'Piel mixta, grasa o con tendencia acneica'. Recuadro RESULTADO: 'Piel mas pareja, fresca y en equilibrio.'. Escribe EXACTAMENTE ese texto, sin inventar ni deformar palabras. Estetica mistica y cientifica, iluminacion calida dorada, composicion equilibrada y muy ordenada, alta calidad.",
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
    oculto: true,
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
    oculto: true,
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
    oculto: true,
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
    oculto: true,
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
    slug: "vela-soya-carnauba",
    oculto: true,
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
      { titulo: "Inulina + cafeína", texto: "La inulina es un prebiótico que alimenta el microbioma sano de la piel, ayudando al equilibrio del cutis graso; la cafeína es antioxidante y activa la microcirculación, dando vitalidad." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra la superficie de una piel grasa: microparticulas de oxido de zinc y dioxido de silicio absorbiendo gotas de sebo y difuminando la luz sobre el poro (efecto soft-focus), mientras por dentro la urea y el acido hialuronico retienen agua. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'oxido de zinc', 'silice', 'sebo absorbido', 'agua retenida'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El zinc y la sílice absorben el sebo mientras la piel se hidrata por dentro",
    },
    ingredientes:
      "Laurus Nobilis (Laurel) Leaf Water, Zinc Oxide, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Cocos Nucifera (Coconut) Oil, Urea, Glycerin, Behentrimonium Methosulfate, Silica, Inulin, Cetyl Alcohol, Caffeine, Sodium Hyaluronate, Cinnamomum Camphora (Ho Wood) Oil, Benzyl Alcohol, Dehydroacetic Acid, Citric Acid.",
    modoUso:
      "Aplica una capa fina sobre el rostro limpio, evitando el contorno de los ojos. Usa poca cantidad: el óxido de zinc puede dejar un velo blanco si te pasas. Úsala en la mañana como último paso de hidratación.",
    piel: "Mixta a grasa",
    tamano: "50 ml",
    imagenPrompt:
      "A partir de la FOTO REAL del producto que se entrega, mejora SOLO el fondo y la ambientacion. NO modifiques el producto: conserva exactamente el envase, su forma, tapa, color, la etiqueta y el contenido tal como estan en la foto. Reemplaza unicamente el fondo por una escena botanica y mineral: rodeado de hojas de laurel y pequenos cristales minerales claros (zinc/silice), sobre piedra oscura humeda, con luz calida dorada lateral y fondo de bosque verde oscuro difuminado, estetica botanica y mistica de cosmetica natural artesanal, tonos verdes profundos, dorados y tierra. Manten la iluminacion y las sombras coherentes con el producto real. No anadas ningun texto ni marca de agua.",
    fichaPrompt:
      "Poster vertical estilo ficha de producto de El Floema, cosmetica botanica, formato retrato. Fondo de madera oscura con vetas, tonos negro, verde profundo, marron y dorado. Marco ornamental dorado art nouveau alrededor de todo el borde, con volutas botanicas en las esquinas y lunas doradas arriba. Arriba al centro el emblema de El Floema (frasco pocion con raices doradas). En el centro, la foto real del envase de crema dentro de un ovalo dorado. Alrededor, ilustraciones botanicas coloreadas estilo grabado cientifico de hojas de laurel y cristales minerales, simetricas y ordenadas, con lineas doradas finas que conectan cada ingrediente con su recuadro. Distribuye recuadros ornamentados dorados con el siguiente texto, en espanol con ORTOGRAFIA PERFECTA y tipografia serif dorada elegante, muy legible y ordenado. TITULO: 'CREMA MATIFICANTE - Hidrata y controla el brillo'. Recuadro COMO ACTUA: 'Oxido de zinc y silice: absorben el sebo y difuminan el poro (soft-focus). Urea y acido hialuronico: hidratan por dentro. Inulina: microbioma. Cafeina: vitalidad.'. Recuadro PROPIEDADES: 'Hidrata y matifica. Afina el poro. Acabado aterciopelado.'. Recuadro MODO DE USO: 'En la manana, poca cantidad, sola o bajo el maquillaje.'. Recuadro PARA: 'Piel mixta a grasa'. Recuadro RESULTADO: 'Piel comoda, mate y sin tirantez.'. Escribe EXACTAMENTE ese texto, sin inventar ni deformar palabras. Estetica mistica y cientifica, iluminacion calida dorada, composicion equilibrada y muy ordenada, alta calidad.",
    precio: null,
    glyph: "◐",
    accent: "rgba(122,74,138,0.26)",
  },
  {
    slug: "crema-reafirmante-facial",
    nombre: "Crema Facial Reafirmante",
    categoria: "Hidratación facial",
    descripcion: "Crema densa de noche que reafirma y nutre la piel flácida, con centella asiática, cafeína y tallow biomimético.",
    descripcionLarga:
      "Un tratamiento facial de noche de textura densa, pensado para la piel flácida o que ha perdido firmeza. La centella asiática estimula la síntesis de colágeno mientras la cafeína activa la microcirculación y aporta un efecto tensor; el tallow infusionado con pitra —biomimético, con un perfil de grasas parecido al de la piel— repara la barrera junto a la manteca de café verde, rica en antioxidantes. La urea, el ácido hialurónico y el pantenol hidratan y calman por dentro, y un toque de dióxido de titanio difumina la piel (efecto soft-focus). Se aplica de noche, en poca cantidad, como último paso.",
    beneficios: [
      "Tratamiento de noche que reafirma y nutre la piel flácida",
      "Centella asiática que estimula el colágeno + cafeína tensora",
      "Tallow biomimético y café verde que reparan la barrera",
      "Urea, ácido hialurónico y pantenol para hidratar y calmar",
    ],
    ciencia: [
      { titulo: "Centella asiática", texto: "Sus triterpenos (asiaticósido y madecasósido) estimulan a los fibroblastos a producir colágeno y calman la piel. Por eso se usa para reafirmar y reparar." },
      { titulo: "Cafeína", texto: "Antioxidante que activa la microcirculación y tiene un efecto tensor y descongestivo: aporta vitalidad y una firmeza aparente al aplicarla." },
      { titulo: "Tallow infusionado con pitra", texto: "El tallow es biomimético: su perfil de ácidos grasos se parece al de la piel humana, por eso se reconoce y absorbe. Aporta vitaminas A, D, E y K que ayudan a reparar la barrera." },
      { titulo: "Urea, ácido hialurónico y pantenol", texto: "La urea (parte del factor natural de hidratación) y el ácido hialurónico retienen agua; el pantenol (provitamina B5) calma y refuerza la barrera. Mantienen la piel flexible y confortable." },
      { titulo: "MaízCare (almidón de maíz hidrolizado)", texto: "Forma un film ligero sobre la piel que da un efecto tensor y aterciopelado inmediato, mejorando el aspecto de firmeza mientras los activos trabajan por dentro." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra una seccion de piel que recupera firmeza: la centella asiatica estimula a los fibroblastos a producir fibras de colageno nuevas, la cafeina activa la microcirculacion y el tallow biomimetico repara la barrera lipidica. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'centella asiatica', 'colageno nuevo', 'cafeina', 'barrera reparada'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "La centella estimula el colágeno mientras la cafeína tensa y el tallow repara la barrera",
    },
    ingredientes:
      "Laurus Nobilis (Laurel) Leaf Water, Laurelia Sempervirens (Triwe) Leaf Water, Tallow (sebo infusionado con pitra), Coffea Arabica (Green Coffee) Seed Butter, Behentrimonium Methosulfate, Stearic Acid, Cetyl Alcohol, Urea, Glycerin, Hydrolyzed Corn Starch, Titanium Dioxide, Panthenol, Caffeine, Centella Asiatica Extract, Inulin, Sodium Hyaluronate, Tocopherol, Benzyl Alcohol, Dehydroacetic Acid.",
    modoUso:
      "De noche, sobre el rostro limpio, aplica una pequeña cantidad y masajea con movimientos ascendentes hasta absorber. Usa poca: el toque de dióxido de titanio puede dejar un velo blanco si te pasas. Es tu último paso de la noche.",
    piel: "Piel flácida, madura o con pérdida de firmeza",
    tamano: "50 g",
    imagenPrompt:
      "A partir de la FOTO REAL del producto que se entrega, mejora SOLO el fondo y la ambientacion. NO modifiques el producto: conserva exactamente el envase (tarro), su forma, tapa, color, la etiqueta y el contenido tal como estan en la foto. Reemplaza unicamente el fondo por una escena botanica y calida: rodeado de granos de cafe verde, hojas nativas y una rama de pitra, sobre madera oscura y piedra, con luz dorada lateral y fondo de bosque verde oscuro difuminado, estetica botanica y mistica de cosmetica natural artesanal, tonos verdes profundos, dorados y tierra. Manten la iluminacion y las sombras coherentes con el producto real. No anadas ningun texto ni marca de agua.",
    fichaPrompt:
      "Poster vertical estilo ficha de producto de El Floema, cosmetica botanica, formato retrato. Fondo de madera oscura con vetas, tonos negro, verde profundo, marron y dorado. Marco ornamental dorado art nouveau alrededor de todo el borde, con volutas botanicas en las esquinas y lunas doradas arriba. Arriba al centro el emblema de El Floema (frasco pocion con raices doradas). En el centro, la foto real del tarro de crema dentro de un ovalo dorado. Alrededor, ilustraciones botanicas coloreadas estilo grabado cientifico de hojas de centella asiatica, granos de cafe verde y una rama de pitra, simetricas y ordenadas, con lineas doradas finas que conectan cada ingrediente con su recuadro. Distribuye recuadros ornamentados dorados con el siguiente texto, en espanol con ORTOGRAFIA PERFECTA y tipografia serif dorada elegante, muy legible y ordenado. TITULO: 'CREMA FACIAL REAFIRMANTE - Reafirma y nutre de noche'. Recuadro COMO ACTUA: 'Centella asiatica: estimula el colageno. Cafeina: efecto tensor y microcirculacion. Tallow biomimetico y cafe verde: reparan la barrera. Urea, acido hialuronico y pantenol: hidratan y calman.'. Recuadro PROPIEDADES: 'Reafirma la piel flacida. Nutre e hidrata. Efecto tensor.'. Recuadro MODO DE USO: 'De noche, poca cantidad, en movimientos ascendentes.'. Recuadro PARA: 'Piel flacida, madura o con perdida de firmeza'. Recuadro RESULTADO: 'Piel mas firme, nutrida y confortable.'. Escribe EXACTAMENTE ese texto, sin inventar ni deformar palabras. Estetica mistica y cientifica, iluminacion calida dorada, composicion equilibrada y muy ordenada, alta calidad.",
    precio: null,
    glyph: "❖",
    accent: "rgba(150,105,60,0.26)",
  },
  {
    slug: "syndet-facial-piel-grasa",
    oculto: true,
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
    oculto: true,
    nombre: "SOS Granitos",
    categoria: "Tratamiento localizado",
    descripcion: "Tratamiento puntual con ácido salicílico, niacinamida y tinturas de nalca y tomillo.",
    descripcionLarga:
      "Un tratamiento localizado para ese granito que aparece de golpe. El ácido salicílico entra al poro y disuelve el sebo que lo tapa, la niacinamida calma la rojez, y las tinturas de nalca (astringente nativa) y tomillo (antiséptica) ayudan a secar y depurar la zona. Un toque puntual en el granito, de noche.",
    beneficios: [
      "Ácido salicílico que destapa el poro y seca",
      "Niacinamida que calma la rojez",
      "Tintura de nalca astringente que cierra el poro",
      "Tintura de tomillo, antiséptica suave",
    ],
    ciencia: [
      { titulo: "Ácido salicílico (BHA)", texto: "Es liposoluble: penetra dentro del poro tapado de sebo y lo disuelve desde adentro. Su acción queratolítica seca la imperfección aflojando las células muertas que la obstruyen." },
      { titulo: "Niacinamida", texto: "Antiinflamatoria: calma el enrojecimiento y la hinchazón del granito, y ayuda a que la marca posterior sea menor." },
      { titulo: "Tinturas de nalca y tomillo", texto: "La nalca (nativa) es rica en taninos astringentes que cierran el aspecto del poro y ayudan a secar; el tomillo aporta timol, un antiséptico que ayuda a depurar la zona." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un solo granito con el poro tapado: una gota de acido salicilico entra al poro, disuelve el tapon de sebo y lo seca, sin tocar la piel sana de alrededor. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'acido salicilico', 'poro tapado', 'tapon disuelto', 'piel sana intacta'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El salicílico destapa y seca el granito sin tocar la piel sana",
    },
    ingredientes:
      "Laurus Nobilis (Laurel) Leaf Water, Gunnera Tinctoria (Nalca) Tincture, Niacinamide, Salicylic Acid, Glycerin, Thymus Vulgaris (Thyme) Tincture, Alcohol, Citric Acid.",
    modoUso:
      "Aplica solo sobre el granito, con un cotonito o el aplicador, de noche. No lo extiendas por todo el rostro ni lo repitas muchas veces (el salicílico puede resecar o irritar de más). No uses en piel irritada.",
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
    ciencia: [
      { titulo: "SCI + betaína (sin sulfatos)", texto: "Limpian formando micelas que atrapan la suciedad sin desnaturalizar las proteínas del cabello como los sulfatos. Por eso respetan la fibra: clave del método curly, que evita los tensioactivos agresivos." },
      { titulo: "BTMS-50 (catiónico)", texto: "Acondicionador de carga positiva que se adhiere a la fibra dañada (cargada negativamente), desenreda al instante y ayuda a alinear la cutícula para definir el rizo." },
      { titulo: "Karité, ricino y tallow", texto: "Nutren e hidratan el rizo, que suele necesitar más grasa: la karité repara, el ricino da definición y el tallow infusionado con pitra —el sello El Floema— aporta emoliencia. El pH ácido (ácido cítrico) sella la cutícula." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un rizo de cabello: los tensioactivos suaves limpian sin dañar la fibra, mientras el BTMS (cargas positivas) se adhiere a la cuticula dañada, la alisa y define el rizo. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'tensioactivo suave', 'fibra respetada', 'BTMS cationico', 'rizo definido'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "Limpia sin dañar la fibra y el BTMS define el rizo",
    },
    ingredientes:
      "Sodium Cocoyl Isethionate, Laurus Nobilis (Laurel) Leaf Water, Cetyl Alcohol, Behentrimonium Methosulfate, Cocamidopropyl Betaine, Butyrospermum Parkii (Shea) Butter, Glycerin, Ricinus Communis (Castor) Seed Oil, Bos Taurus Tallow (infusionado con pitra), Citric Acid, Cedrus Atlantica Oil, Panthenol, Cocos Nucifera (Coconut) Oil.",
    modoUso:
      "Frota la barra directamente en el cabello mojado o hazla espuma entre las manos, masajea el cuero y las largas, y enjuaga. Deja secar la barra al aire.",
    piel: "Cabello rizado y ondulado",
    tamano: "Barra ~60 g",
    imagenPrompt:
      "A partir de la FOTO REAL del producto que se entrega, mejora SOLO el fondo y la ambientacion. NO modifiques el producto: conserva exactamente la barra de champu solido, su forma, color y textura tal como estan en la foto. Reemplaza unicamente el fondo por una escena botanica: rodeada de hojas de laurel, ramas de ricino y rizos de cabello, sobre piedra oscura humeda, con luz calida dorada lateral y fondo de bosque verde oscuro difuminado, estetica botanica y mistica de cosmetica natural artesanal, tonos verdes profundos, dorados y tierra. Manten la iluminacion y las sombras coherentes con el producto real. No anadas ningun texto ni marca de agua.",
    fichaPrompt:
      "Poster vertical estilo ficha de producto de El Floema, cosmetica botanica, formato retrato. Fondo de madera oscura con vetas, tonos negro, verde profundo, marron y dorado. Marco ornamental dorado art nouveau alrededor de todo el borde, con volutas botanicas en las esquinas y lunas doradas arriba. Arriba al centro el emblema de El Floema (frasco pocion con raices doradas). En el centro, la foto real de la barra de champu solido dentro de un ovalo dorado. Alrededor, ilustraciones botanicas coloreadas estilo grabado cientifico de hojas de laurel, ricino y rizos, simetricas y ordenadas, con lineas doradas finas que conectan cada ingrediente con su recuadro. Distribuye recuadros ornamentados dorados con el siguiente texto, en espanol con ORTOGRAFIA PERFECTA y tipografia serif dorada elegante, muy legible y ordenado. TITULO: 'CHAMPU SOLIDO CURLY - Metodo curly, sin sulfatos'. Recuadro COMO ACTUA: 'SCI y betaina: limpian sin sulfatos, respetando la fibra. BTMS cationico: desenreda y define el rizo. Karite, ricino y tallow de pitra: nutren e hidratan. pH acido: sella la cuticula.'. Recuadro PROPIEDADES: 'Sin sulfatos. Define el rizo. Hidrata. Solida y sin plastico.'. Recuadro MODO DE USO: 'Frota en el cabello mojado, masajea el cuero y las largas, y enjuaga.'. Recuadro PARA: 'Cabello rizado y ondulado'. Recuadro RESULTADO: 'Rizos hidratados, definidos y suaves.'. Escribe EXACTAMENTE ese texto, sin inventar ni deformar palabras. Estetica mistica y cientifica, iluminacion calida dorada, composicion equilibrada y muy ordenada, alta calidad.",
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
    ciencia: [
      { titulo: "SCI + SCS + betaína + SLSA", texto: "Una base que limpia con buena espuma; el SCS suma poder desengrasante para el cuero graso, mientras el SCI y la betaína mantienen la suavidad para no arrasar la barrera del cuero cabelludo." },
      { titulo: "Arcilla verde", texto: "Rica en minerales, absorbe el exceso de sebo del cuero cabelludo y arrastra impurezas, devolviendo frescura y ligereza a la raíz." },
      { titulo: "Ciprés + pH ácido", texto: "El aceite esencial de ciprés es astringente y ayuda a equilibrar la producción de grasa; el pH ácido cierra la cutícula. El tallow (bajo) aporta el sello El Floema sin apelmazar." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un cuero cabelludo graso: los tensioactivos y el SCS arrastran el exceso de sebo mientras la arcilla verde lo absorbe, dejando la raiz fresca y ligera. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'exceso de sebo', 'SCS desengrasa', 'arcilla verde absorbe', 'raiz fresca'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El SCS y la arcilla verde controlan el sebo del cuero graso",
    },
    ingredientes:
      "Sodium Cocoyl Isethionate, Cetyl Alcohol, Cocamidopropyl Betaine, Sodium Coco Sulfate, Illite (Green Clay), Laurus Nobilis (Laurel) Leaf Water, Sodium Lauryl Sulfoacetate, Bos Taurus Tallow (infusionado con pitra), Behentrimonium Methosulfate, Citric Acid, Cedrus Atlantica Oil, Cupressus Sempervirens (Cypress) Oil, Panthenol.",
    modoUso:
      "Frota la barra en el cabello mojado enfocándote en la raíz y el cuero, masajea y enjuaga. Deja secar la barra al aire.",
    piel: "Cuero cabelludo graso",
    tamano: "Barra ~60 g",
    imagenPrompt:
      "A partir de la FOTO REAL del producto que se entrega, mejora SOLO el fondo y la ambientacion. NO modifiques el producto: conserva exactamente la barra de champu solido, su forma, color y textura tal como estan en la foto. Reemplaza unicamente el fondo por una escena botanica: rodeada de hojas de laurel, ramas de cipres y terrones de arcilla verde, sobre piedra oscura humeda, con luz calida dorada lateral y fondo de bosque verde oscuro difuminado, estetica botanica y mistica de cosmetica natural artesanal, tonos verdes profundos, dorados y tierra. Manten la iluminacion y las sombras coherentes con el producto real. No anadas ningun texto ni marca de agua.",
    fichaPrompt:
      "Poster vertical estilo ficha de producto de El Floema, cosmetica botanica, formato retrato. Fondo de madera oscura con vetas, tonos negro, verde profundo, marron y dorado. Marco ornamental dorado art nouveau alrededor de todo el borde, con volutas botanicas en las esquinas y lunas doradas arriba. Arriba al centro el emblema de El Floema (frasco pocion con raices doradas). En el centro, la foto real de la barra de champu solido dentro de un ovalo dorado. Alrededor, ilustraciones botanicas coloreadas estilo grabado cientifico de hojas de laurel, ramas de cipres y arcilla verde, simetricas y ordenadas, con lineas doradas finas que conectan cada ingrediente con su recuadro. Distribuye recuadros ornamentados dorados con el siguiente texto, en espanol con ORTOGRAFIA PERFECTA y tipografia serif dorada elegante, muy legible y ordenado. TITULO: 'CHAMPU SOLIDO CABELLO GRASO - Clarificante'. Recuadro COMO ACTUA: 'SCI, SCS y betaina: limpieza con poder desengrasante que respeta la barrera. Arcilla verde: absorbe el exceso de sebo. Cipres: astringente que equilibra. pH acido: sella la cuticula.'. Recuadro PROPIEDADES: 'Controla el sebo. Frescura de raiz. No reseca las puntas. Solida.'. Recuadro MODO DE USO: 'Frota en el cabello mojado enfocando la raiz y el cuero, masajea y enjuaga.'. Recuadro PARA: 'Cuero cabelludo graso'. Recuadro RESULTADO: 'Raiz fresca y ligera por mas tiempo.'. Escribe EXACTAMENTE ese texto, sin inventar ni deformar palabras. Estetica mistica y cientifica, iluminacion calida dorada, composicion equilibrada y muy ordenada, alta calidad.",
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
    ciencia: [
      { titulo: "Cafeína", texto: "Aplicada de forma constante, penetra el folículo y prolonga su fase de crecimiento (anágena), y estimula la microcirculación del cuero cabelludo. Por eso conviene masajear la raíz al lavar." },
      { titulo: "Extracto de ortiga", texto: "Aliado tradicional contra la caída: se le atribuye la capacidad de frenar la 5-alfa-reductasa (la enzima que forma la DHT que debilita el folículo) y de aportar minerales que lo nutren." },
      { titulo: "Base suave + tallow", texto: "El SCI y la betaína limpian sin agredir un cuero cabelludo que suele estar sensibilizado; la karité y el tallow infusionado con pitra aportan emoliencia. El pH ácido sella la cutícula." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un corte del cuero cabelludo con un foliculo piloso: la cafeina penetra y estimula el crecimiento (prolonga la fase anagena) mientras la ortiga frena la enzima que produce la DHT, con la microcirculacion activada. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'cafeina', 'foliculo estimulado', 'fase de crecimiento', 'ortiga: menos DHT'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "La cafeína estimula el folículo y la ortiga frena la DHT",
    },
    ingredientes:
      "Sodium Cocoyl Isethionate, Laurus Nobilis (Laurel) Leaf Water, Cetyl Alcohol, Cocamidopropyl Betaine, Sodium Lauryl Sulfoacetate, Butyrospermum Parkii (Shea) Butter, Behentrimonium Methosulfate, Urtica Dioica (Nettle) Extract, Caffeine, Bos Taurus Tallow (infusionado con pitra), Citric Acid, Cedrus Atlantica Oil, Panthenol, Cocos Nucifera (Coconut) Oil.",
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
    oculto: true,
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
    ciencia: [
      { titulo: "BTMS-50 (catiónico)", texto: "Es el acondicionador por excelencia: su carga positiva se adhiere justo a la fibra dañada (cargada negativamente), desenreda al instante y reduce la fricción que quiebra el cabello." },
      { titulo: "Karité, coco, ricino y tallow", texto: "Nutren en profundidad el cabello seco o rizado, devolviéndole elasticidad y suavidad; el tallow infusionado con pitra es el sello El Floema." },
      { titulo: "pH ácido — brillo espejo", texto: "El ácido cítrico baja el pH y sella la cutícula, que se abre con el lavado. Una cutícula cerrada y lisa refleja mejor la luz: de ahí el brillo y la sensación de seda." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un cabello con la cuticula levantada que se cierra: el BTMS (cargas positivas) se adhiere a la fibra dañada y el pH acido sella las escamas de la cuticula, que al quedar lisa refleja la luz (brillo). IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'BTMS cationico', 'fibra desenredada', 'pH acido', 'cuticula sellada'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El BTMS desenreda y el pH ácido sella la cutícula para dar brillo",
    },
    ingredientes:
      "Behentrimonium Methosulfate, Cetyl Alcohol, Butyrospermum Parkii (Shea) Butter, Cocos Nucifera (Coconut) Oil, Bos Taurus Tallow (infusionado con pitra), Ricinus Communis (Castor) Seed Oil, Citric Acid, Cedrus Atlantica Oil, Tocopherol.",
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
    ciencia: [
      { titulo: "BTMS-50 + alcohol cetílico", texto: "El BTMS catiónico desenreda adhiriéndose a la fibra, y el alcohol cetílico da deslizamiento con tacto liviano. Juntos suavizan sin apelmazar ni engrasar, ideal para cabello fino." },
      { titulo: "Mínimo de aceites", texto: "Lleva muy poca karité, coco y tallow: lo justo para nutrir sin peso, evitando que el cabello fino o graso quede lacio o cargado." },
      { titulo: "Ciprés + pH ácido", texto: "El aceite esencial de ciprés equilibra el cuero cabelludo con tendencia grasa, y el pH ácido sella la cutícula para dar brillo. Se aplica solo de medios a puntas." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un cabello fino y ligero: el BTMS y el alcohol cetilico desenredan y dan deslizamiento con muy poca grasa, dejando la fibra suave, con movimiento y sin peso. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'BTMS desenreda', 'poco aceite', 'deslizamiento', 'sin peso'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "Desenreda y da deslizamiento con un mínimo de aceites, sin peso",
    },
    ingredientes:
      "Behentrimonium Methosulfate, Cetyl Alcohol, Butyrospermum Parkii (Shea) Butter, Glycerin, Bos Taurus Tallow (infusionado con pitra), Cocos Nucifera (Coconut) Oil, Citric Acid, Tocopherol, Cupressus Sempervirens (Cypress) Oil, Cedrus Atlantica Oil.",
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
    oculto: true,
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
    ciencia: [
      { titulo: "Eugenol y cinamaldehído", texto: "Los compuestos del clavo (eugenol) y la canela (cinamaldehído) activan los receptores de calor de la piel (como el TRPV1): de ahí la sensación de calor real que reconforta y acompaña el masaje." },
      { titulo: "Cedro e hinojo", texto: "El aceite esencial de cedro se asocia a una acción antiinflamatoria muscular, y el de hinojo es espasmolítico (ayuda a relajar el músculo tenso)." },
      { titulo: "Tallow + cera de abeja", texto: "El tallow infusionado (clavo, canela, pitra) es una base biomimética que nutre y transporta los activos; la cera de abeja le da el cuerpo firme para masajear." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un musculo tenso bajo la piel: las moleculas de eugenol (clavo) y cinamaldehido (canela) activan los receptores de calor de la piel generando una sensacion caliente que reconforta, mientras el cedro calma. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'eugenol y cinamaldehido', 'receptor de calor', 'sensacion de calor', 'musculo relajado'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El eugenol y el cinamaldehído activan la sensación de calor",
    },
    ingredientes:
      "Bos Taurus Tallow (infusionado con clavo, canela y pitra), Cera Alba (cera de abeja), Tocopherol, Eugenia Caryophyllus (Clove) Oil, Cedrus Atlantica Oil, Foeniculum Vulgare (Fennel) Oil.",
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
    ciencia: [
      { titulo: "Matico (verbascósido)", texto: "El matico es una planta nativa de larga tradición cicatrizante en el sur de Chile; se le atribuye —por su verbascósido— una acción reparadora y antiinflamatoria que acompaña la recuperación de la piel." },
      { titulo: "Milenrama (Achillea)", texto: "De tradición antiinflamatoria y astringente, acompaña el cierre y la calma de la piel dañada; junto al matico forma el corazón botánico de este ungüento." },
      { titulo: "Tallow biomimético + palo de ho", texto: "El tallow crea una capa protectora que nutre y evita que la piel dañada pierda agua; el palo de ho (linalol) se asocia a la regeneración celular." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un corte de piel seca y agrietada que se repara: el tallow forma una capa protectora que retiene agua mientras el matico y la milenrama acompanan la reparacion y calman la inflamacion. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'tallow protege', 'matico y milenrama', 'menos inflamacion', 'piel reparada'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El tallow protege y el matico con la milenrama acompañan la reparación",
    },
    ingredientes:
      "Bos Taurus Tallow (infusionado con matico y milenrama), Cera Alba (cera de abeja), Tocopherol, Aniba Rosaeodora (Ho Wood) Oil, Cedrus Atlantica Oil.",
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
    categoria: "Mascarilla exfoliante en polvo",
    descripcion: "Mascarilla en polvo de carbón, arcilla verde y avena que detoxifica la piel grasa.",
    descripcionLarga:
      "Una mascarilla en polvo que activas con agua justo antes de usar, para que sus arcillas lleguen frescas. El carbón activado y la arcilla verde atraen y absorben el exceso de sebo y las impurezas del poro, mientras la avena coloidal y el caolín suavizan para que no apriete ni reseque de más. Deja la piel mate, limpia y afinada. En polvo dura más y viaja sin conservantes.",
    beneficios: [
      "Carbón activado y arcilla verde que absorben el sebo",
      "Avena coloidal que calma y evita la sensación tirante",
      "Detoxifica y afina el poro",
      "En polvo: sin conservantes, se activa al momento",
    ],
    ciencia: [
      { titulo: "Arcilla verde", texto: "Sus partículas cargadas atraen por intercambio iónico el exceso de sebo y las impurezas alojadas en el poro, absorbiéndolas. Por eso deja la piel mate y afinada." },
      { titulo: "Carbón activado", texto: "Su superficie porosa adsorbe (atrapa físicamente) toxinas e impurezas, potenciando el efecto detox de la arcilla verde." },
      { titulo: "Avena coloidal + caolín", texto: "La avena (beta-glucanos y avenantramidas) calma y forma un film suave; el caolín absorbe con delicadeza, para que la mascarilla no apriete ni reseque de más." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un poro de piel grasa: las particulas de arcilla verde y carbon activado atraen y absorben el exceso de sebo y las impurezas, mientras la avena calma la superficie. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'arcilla verde', 'carbon adsorbe', 'sebo absorbido', 'avena calma'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "La arcilla verde y el carbón absorben el sebo; la avena calma",
    },
    ingredientes:
      "Illite (arcilla verde), Avena Sativa (avena coloidal), Kaolin (caolín), Charcoal Powder (carbón activado).",
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
    categoria: "Mascarilla exfoliante en polvo",
    descripcion: "Mascarilla en polvo de caolín y avena, la más suave, para piel sensible.",
    descripcionLarga:
      "La mascarilla más delicada de la línea, pensada para las pieles sensibles, secas o reactivas que no toleran las arcillas fuertes. El caolín (arcilla blanca) es la más suave: limpia y absorbe el exceso de grasa sin resecar, y la avena coloidal calma con sus avenantramidas y suaviza para que la piel no quede tirante. Se activa con agua al momento y deja la piel fresca, confortable y sin estrés.",
    beneficios: [
      "Caolín, la arcilla más suave, que no reseca",
      "Avena coloidal que calma la piel sensible",
      "Sin color ni activos fuertes: pura suavidad",
      "En polvo: sin conservantes, se activa al momento",
    ],
    ciencia: [
      { titulo: "Avena coloidal", texto: "Sus avenantramidas son antiinflamatorias y sus beta-glucanos forman un film que calma e hidrata la piel. Es el ingrediente clásico para pieles sensibles, secas o con picazón." },
      { titulo: "Caolín (arcilla blanca)", texto: "La más suave de las arcillas: absorbe el exceso de grasa con delicadeza, sin desmineralizar ni resecar. Limpia sin estresar la piel reactiva." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra una piel sensible e irritada que se calma: la avena coloidal (avenantramidas y beta-glucanos) forma un film que reduce la inflamacion, mientras el caolin limpia con suavidad. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'avena', 'avenantramidas', 'menos inflamacion', 'piel calmada'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "La avena calma la inflamación y el caolín limpia con suavidad",
    },
    ingredientes:
      "Avena Sativa (avena coloidal), Kaolin (caolín).",
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
    categoria: "Mascarilla exfoliante en polvo",
    descripcion: "Mascarilla en polvo de arcilla amarilla, avena y cúrcuma que devuelve luz a la piel apagada.",
    descripcionLarga:
      "Una mascarilla en polvo pensada para devolver luz a las pieles apagadas o cansadas. La arcilla amarilla limpia con suavidad y aporta luminosidad, la avena coloidal calma y suaviza para que la arcilla nunca apriete ni reseque, y la cúrcuma suma su curcumina, un potente antioxidante y antiinflamatorio que revitaliza y empareja el aspecto del cutis. Se activa con agua al momento, así llega fresca y sin conservantes. Deja la piel limpia, fresca y con un brillo saludable.",
    beneficios: [
      "Arcilla amarilla que ilumina y suaviza",
      "Avena coloidal que calma y evita la sensación tirante",
      "Cúrcuma (curcumina): antioxidante y antiinflamatoria",
      "En polvo: sin conservantes, se activa al momento",
    ],
    ciencia: [
      { titulo: "Cúrcuma (curcumina)", texto: "La curcumina es un potente antioxidante y antiinflamatorio: neutraliza radicales libres y revitaliza el cutis apagado, aportando luminosidad y ayudando a emparejar el aspecto de la piel." },
      { titulo: "Arcilla amarilla", texto: "Suave y rica en minerales, limpia con delicadeza y estimula la piel apagada, aportando luz sin agredir ni resecar." },
      { titulo: "Avena coloidal + caolín", texto: "La avena calma con sus avenantramidas y el caolín suaviza, para que la arcilla nunca apriete ni deje tirantez." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia, amarillo y verde apagado. Muestra una piel apagada que recupera luz: la curcumina (curcuma) neutraliza radicales libres y revitaliza el cutis, mientras la arcilla amarilla limpia con suavidad y la avena calma. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'curcumina', 'radical libre neutralizado', 'arcilla amarilla', 'piel con luz'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "La curcumina revitaliza y la arcilla amarilla ilumina el cutis apagado",
    },
    ingredientes:
      "Yellow Illite (arcilla amarilla), Avena Sativa (avena coloidal), Kaolin (caolín), Curcuma Longa (cúrcuma).",
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
    ciencia: [
      { titulo: "Carbón activado (adsorción)", texto: "Su superficie extremadamente porosa atrapa por adsorción impurezas, toxinas y exceso de sebo —como un imán físico—, que se arrastran al enjuagar. De ahí su acción depurativa." },
      { titulo: "Acción del jabón", texto: "El jabón tiene una parte que ama la grasa y otra que ama el agua: rodea la suciedad grasa y la levanta para llevársela con el agua del enjuague." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra la superficie de una piel grasa: particulas de carbon activado, muy porosas, atrapando por adsorcion impurezas y gotas de sebo que luego se enjuagan. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'carbon activado', 'poros que atrapan', 'impurezas adsorbidas', 'piel depurada'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El carbón activado atrapa las impurezas por adsorción",
    },
    ingredientes:
      "Base de jabón, Charcoal Powder (carbón activado).",
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
    ciencia: [
      { titulo: "Tallow infusionado con pitra", texto: "Es biomimético: su perfil de grasas se parece al sebo humano, por eso nutre y deja la piel confortable en vez de reseca —algo poco común en un jabón—, con el aporte botánico de la pitra nativa." },
      { titulo: "Cúrcuma (curcumina)", texto: "Le da su tono dorado natural y suma su cualidad antioxidante: la curcumina neutraliza radicales libres, protegiendo la piel del daño oxidativo." },
      { titulo: "Base de glicerina", texto: "La glicerina es humectante: atrae y retiene agua, así el jabón limpia con delicadeza y deja la piel aterciopelada, sin la tirantez de un jabón común." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra la superficie de la piel al lavarse: el jabon limpia mientras los lipidos del tallow (parecidos al sebo humano) y la glicerina humectante quedan nutriendo y evitando la tirantez, con un brillo dorado de la curcuma. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'tallow biomimetico', 'glicerina humecta', 'curcuma antioxidante', 'piel confortable'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El tallow nutre y la glicerina humecta mientras limpia",
    },
    ingredientes:
      "Base de jabón de glicerina (melt & pour), Bos Taurus Tallow (infusionado con pitra), Curcuma Longa (Turmeric) Powder, Aniba Rosaeodora (Ho Wood) Oil.",
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
    oculto: true,
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
    ciencia: [
      { titulo: "Citronela (citronelal)", texto: "El repelente botánico clásico: su aroma intenso enmascara las señales con que el mosquito nos localiza (el CO2 y el ácido láctico que exhala la piel), confundiéndolo y alejándolo." },
      { titulo: "Cedro, palo de ho y clavo", texto: "Refuerzan el efecto con sus aromas; el eugenol del clavo es un repelente potente. Juntos crean una barrera olfativa que a los insectos no les gusta." },
      { titulo: "Alcohol + glicerina", texto: "El alcohol dispersa y ayuda a volatilizar los aceites esenciales; la glicerina los fija un poco para que duren algo más sobre la piel. Aun así, un repelente botánico dura menos que el DEET: reaplica cada 1-2 horas." },
    ],
    bioquimica: {
      prompt:
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra la piel exhalando señales invisibles (CO2 y acido lactico) que atraen a un mosquito, y una nube aromatica de citronela que enmascara esas señales y aleja al insecto. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: 'CO2 y acido lactico', 'citronela enmascara', 'mosquito confundido', 'piel protegida'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "La citronela enmascara las señales con que el mosquito te encuentra",
    },
    ingredientes:
      "Alcohol, Laurelia Sempervirens (Triwe) Leaf Water, Glycerin, Polysorbate 20, Cymbopogon (Citronella) Oil, Cedrus Atlantica Oil, Aniba Rosaeodora (Ho Wood) Oil, Eugenia Caryophyllus (Clove) Oil, Benzyl Alcohol, Dehydroacetic Acid.",
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

// Productos que SÍ se muestran en la tienda (los ocultos se conservan en la data
// pero no aparecen hasta que se les quite el flag `oculto`).
export const productosVisibles: ProductoTienda[] = productosTienda.filter((p) => !p.oculto);

export const productosDestacados: ProductoTienda[] = productosTienda.filter((p) => p.destacado && !p.oculto);

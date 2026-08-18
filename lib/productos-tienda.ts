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
      "Un sérum ligero formulado para serenar la piel: reduce las rojeces, refuerza la barrera y devuelve la sensación de confort a las pieles más reactivas. Con activos botánicos calmantes y antioxidantes.",
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
      "Un sérum antioxidante que combate el estrés oxidativo, atenúa las manchas y devuelve la luz a las pieles apagadas. Unifica el tono y aporta un brillo saludable, día a día.",
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
      "Un sérum que regula el sebo, refina los poros y mantiene la piel limpia sin resecarla. Ideal para pieles mixtas, grasas o con tendencia acneica, con activos botánicos astringentes y antibacterianos.",
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
      "Fotografia de producto de un frasco de vidrio ambar con dosificador dorado y etiqueta oscura elegante, sobre una piedra oscura humeda, con hojas de triwe (laurel nativo) y una gota de gel translucido, luz calida dorada lateral y fondo de bosque verde oscuro difuminado, estetica botanica y mistica de cosmetica natural artesanal, tonos verdes profundos, dorados y tierra, enfoque nitido en el frasco, alta calidad, sin ningun texto ni marca de agua.",
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
        "Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra un corte esquematico de la piel visto de lado con la molecula de 1,8-cineol (eucaliptol) actuando sobre la superficie: microorganismos siendo neutralizados y una sensacion de frescor purificante. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: '1,8-cineol', 'accion antiseptica', 'piel purificada'. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.",
      leyenda: "El 1,8-cineol purifica la superficie de la piel",
    },
    ingredientes: "Laurelia Sempervirens Leaf Water (hidrolato de triwe), Benzyl Alcohol, Dehydroacetic Acid.",
    modoUso:
      "Sobre el rostro limpio, aplica con algodón o vaporiza a 20 cm y deja absorber. Úsalo como tónico antes del sérum o la crema, o durante el día para refrescar. Mañana y noche.",
    piel: "Mixta y grasa",
    tamano: "100 ml",
    imagenPrompt:
      "Fotografia de producto de un frasco de vidrio ambar con atomizador dorado y etiqueta oscura elegante, sobre una piedra oscura humeda, rodeado de hojas verdes brillantes de triwe (laurel chileno nativo), con luz calida dorada lateral y fondo de bosque verde oscuro difuminado, estetica botanica y mistica de cosmetica natural artesanal, tonos verdes profundos, dorados y tierra, enfoque nitido en el frasco, alta calidad, sin ningun texto ni marca de agua.",
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
      "Fotografia de producto de un frasco de vidrio ambar con atomizador dorado y etiqueta oscura elegante, sobre una superficie de piedra oscura, rodeado de hojas de laurel verdes y algunas ramas, con luz calida dorada lateral y fondo verde oscuro difuminado, estetica botanica y mistica de cosmetica natural artesanal, tonos verdes profundos, dorados y tierra, enfoque nitido en el frasco, alta calidad, sin ningun texto ni marca de agua.",
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
      "Fotografia de producto de un frasco de vidrio ambar con atomizador dorado y etiqueta oscura elegante, sobre una superficie de piedra oscura, rodeado de ramas de eucalipto de hojas azul-verdosas, con luz calida dorada lateral y fondo verde oscuro difuminado, estetica botanica y mistica de cosmetica natural artesanal, tonos verdes profundos, dorados y tierra, enfoque nitido en el frasco, alta calidad, sin ningun texto ni marca de agua.",
    precio: null,
    glyph: "❁",
    accent: "rgba(90,122,58,0.24)",
  },
  {
    slug: "spray-capilar-cafeina-laurel",
    nombre: "Spray Capilar Anticaída",
    categoria: "Cuidado capilar",
    descripcion: "Spray con cafeína e hidrolato de laurel que estimula el cuero cabelludo.",
    descripcionLarga:
      "Un tónico capilar que activa la microcirculación del cuero cabelludo y ayuda a fortalecer el cabello, con cafeína e hidrolato de laurel. De uso diario, sin enjuague.",
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
    descripcion: "Vela de cera de soya y carnauba, para ambientar con intención.",
    precio: null,
    glyph: "❋",
    accent: "rgba(42,21,53,0.5)",
  },
];

export function getProductoTienda(slug: string): ProductoTienda | undefined {
  return productosTienda.find((p) => p.slug === slug);
}

export const productosDestacados: ProductoTienda[] = productosTienda.filter((p) => p.destacado);

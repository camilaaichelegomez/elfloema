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
  ciencia?: { titulo: string; texto: string }[]; // "Cómo actúa": mecanismo por tarjeta
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
      "Un limpiador facial suave que respeta el manto ácido de la piel: limpia sin dejar tirantez, con tensioactivos amables y el hidrolato de triwe (laurel nativo chileno). De uso diario, apto para pieles sensibles.",
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
      { titulo: "Purifica", texto: "Los compuestos volátiles del triwe ayudan a equilibrar el exceso de sebo y a mantener el cutis limpio." },
      { titulo: "Tonifica", texto: "Su carácter astringente suave refresca y ordena la piel tras la limpieza, sin resecar." },
      { titulo: "Botánica nativa", texto: "Destilado del laurel chileno (Laurelia sempervirens): agua aromática de bosque, no agua común." },
    ],
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
      { titulo: "Astringente", texto: "Afina el aspecto de los poros y controla el brillo, dejando la piel mate." },
      { titulo: "Purifica", texto: "Su acción antiséptica suave ayuda a mantener a raya las imperfecciones." },
      { titulo: "Equilibra", texto: "Ordena las pieles mixtas y grasas sin la tirantez de un tónico con alcohol." },
    ],
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
      { titulo: "Purifica", texto: "Su carácter antiséptico y astringente limpia en profundidad la piel grasa o con tendencia acneica." },
      { titulo: "Descongestiona", texto: "El frescor vivificante del eucalipto despeja y revitaliza la piel al instante." },
      { titulo: "Control del brillo", texto: "Ayuda a regular el exceso de grasa manteniendo la piel fresca y mate." },
    ],
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

// Catálogo de la Tienda El Floema.
// Nombres, precios y fotos son provisionales — se afinan a medida que se definen.
// La foto de cada producto va en public/tienda/<slug>.jpg y aparece sola.

export type ProductoTienda = {
  slug: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  descripcionLarga?: string;
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
    slug: "hidrolato-matico",
    nombre: "Hidrolato de Matico",
    categoria: "Agua floral",
    descripcion: "Agua floral cicatrizante y calmante de matico, tónico facial.",
    precio: null,
    glyph: "❁",
    accent: "rgba(90,122,58,0.26)",
  },
  {
    slug: "hidrolato-arrayan",
    nombre: "Hidrolato de Arrayán",
    categoria: "Agua floral",
    descripcion: "Tónico astringente y antioxidante de arrayán, para pieles mixtas.",
    precio: null,
    glyph: "❁",
    accent: "rgba(200,160,80,0.2)",
  },
  {
    slug: "hidrolato-triwe",
    nombre: "Hidrolato de Triwe",
    categoria: "Agua floral",
    descripcion: "Tónico relajante y astringente del laurel nativo (triwe).",
    precio: null,
    glyph: "❁",
    accent: "rgba(122,74,138,0.24)",
  },
  {
    slug: "hidrolato-laurel",
    nombre: "Hidrolato de Laurel",
    categoria: "Agua floral",
    descripcion: "Tónico tonificante y antimicrobiano suave de laurel.",
    precio: null,
    glyph: "❁",
    accent: "rgba(90,122,58,0.22)",
  },
  {
    slug: "hidrolato-eucalipto",
    nombre: "Hidrolato de Eucalipto",
    categoria: "Agua floral",
    descripcion: "Agua floral purificante y descongestiva de eucalipto.",
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

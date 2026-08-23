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
    modoUso:
      "Sobre el rostro húmedo, masajea una pequeña cantidad y enjuaga con agua tibia. Úsalo mañana y noche.",
    piel: "Grasa y mixta con tendencia acneica",
    tamano: "100 ml",
    precio: null,
    glyph: "◈",
    accent: "rgba(90,122,58,0.26)",
  },
  {
    slug: "roll-on-despierta",
    nombre: "Roll-on Despierta",
    categoria: "Contorno de ojos",
    descripcion: "Contorno con cafeína que descongestiona ojeras y bolsas.",
    descripcionLarga:
      "Un contorno de ojos en roll-on para una mirada más despierta. La cafeína descongestiona y ayuda a bajar la hinchazón, mientras el ácido hialurónico hidrata la piel más fina del rostro. El aplicador de bola, frío al contacto, da un pequeño masaje que activa la circulación. Perfecto para las mañanas y los días de poco sueño.",
    beneficios: [
      "Cafeína que descongestiona y desinflama",
      "Ácido hialurónico que hidrata la zona delicada",
      "Aplicador roll-on con masaje frío",
      "Ideal para ojeras y bolsas matinales",
    ],
    modoUso:
      "Desliza el roll-on por el contorno del ojo, sobre el hueso, sin acercarte a la línea de las pestañas. Da unos toquecitos para ayudar a absorber. Mañana (y noche si quieres).",
    piel: "Todo tipo de piel",
    tamano: "10 ml",
    precio: null,
    glyph: "◔",
    accent: "rgba(200,160,80,0.24)",
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
    categoria: "Bálsamo corporal",
    descripcion: "Bálsamo batido de sebo, tratamiento reparador de noche.",
    descripcionLarga:
      "Un bálsamo batido de sebo purificado, tratamiento nutritivo para la noche. El sebo es biomimético —su perfil de grasas se parece al de la piel humana, por eso se reconoce y absorbe— y repara la barrera con vitaminas A, D, E y K; la manteca de karité y el café verde suman confort y antioxidantes. Textura mousse que se derrite al contacto. Para rostro (de noche), manos y zonas secas del cuerpo.",
    beneficios: [
      "Sebo biomimético que la piel reconoce y absorbe",
      "Repara la barrera con vitaminas A, D, E y K",
      "Café verde antioxidante y karité nutritiva",
      "Textura mousse, ideal como tratamiento de noche",
    ],
    modoUso:
      "Toma una pequeña cantidad (del tamaño de una avellana) y masajea en zonas secas o en el rostro como último paso de la noche. Un poco rinde mucho.",
    piel: "Piel seca; rostro de noche y cuerpo",
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
    descripcion: "Ungüento de sebo con clavo que da calor local para el masaje.",
    descripcionLarga:
      "Un ungüento denso de sebo con clavo de olor, de la tradición de la botica casera, para el masaje de músculos y articulaciones cansadas. El eugenol del clavo genera una sensación de calor reconfortante que acompaña el masaje, sobre una base de sebo que nutre y desliza. Parte de nuestra línea de ungüentos medicinales.",
    beneficios: [
      "Sensación de calor local que reconforta el masaje",
      "Clavo (eugenol) de la tradición herbal",
      "Base de sebo nutritiva y de buen deslizamiento",
      "Para músculos y articulaciones cansadas",
    ],
    modoUso:
      "Masajea una pequeña cantidad sobre la zona, evitando heridas, mucosas y ojos. Lava tus manos después. Uso externo.",
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
    descripcion: "Ungüento de sebo con macerado de matico para la piel dañada.",
    descripcionLarga:
      "Un ungüento reparador de sebo con macerado de matico, planta de larga tradición cicatrizante en el sur de Chile. El sebo biomimético nutre y protege para acompañar la recuperación de la piel seca, agrietada o marcada, mientras el matico aporta su sabiduría botánica. Denso y nutritivo, de la botica del bosque.",
    beneficios: [
      "Macerado de matico, tradición cicatrizante del sur",
      "Sebo biomimético que nutre y protege la piel",
      "Acompaña la recuperación de piel seca o agrietada",
      "Parte de la línea de ungüentos medicinales",
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
    descripcion: "Jabón dorado suave y nutritivo, luminoso para el cuidado diario.",
    descripcionLarga:
      "Un jabón de tono dorado, suave y nutritivo, pensado para el cuidado diario de la piel. Limpia con delicadeza dejando una sensación cómoda y aterciopelada, con un acabado luminoso. Un pequeño lujo cotidiano de la casa El Floema.",
    beneficios: [
      "Limpieza suave para el uso diario",
      "Deja la piel cómoda y aterciopelada",
      "Acabado luminoso y dorado",
      "Apto para todo tipo de piel",
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

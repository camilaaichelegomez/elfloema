// Catálogo maestro de productos El Floema — Formulario Maestro de Recetas 2026.
// Fuente única de verdad para que las asesoras (Belleza / Formulación) recomienden
// productos reales cuando sea pertinente.
// El Floema · @elfloema · La Unión, Región de Los Ríos, Chile.

export interface ProductoFloema {
  nombre: string;
  lote: string;
  categoria: string;
  para: string; // necesidad / indicación principal
  nota?: string; // advertencia o detalle de seguridad relevante
}

export const PRODUCTOS_FLOEMA: ProductoFloema[] = [
  // Limpieza facial — sindets suaves, pH 5.5–6
  { nombre: "Sindet Facial Piel Sensible (líquido o sólido)", lote: "L005/L018", categoria: "Limpieza facial", para: "piel sensible, reactiva", nota: "hidrolato de triwe+arrayán, centella" },
  { nombre: "Sindet Facial Piel Mixta (líquido o sólido)", lote: "L010/L019", categoria: "Limpieza facial", para: "piel mixta", nota: "urea + prebióticos" },
  { nombre: "Sindet Facial Carbón (líquido o sólido)", lote: "L011/L020", categoria: "Limpieza facial", para: "piel grasa, poros, puntos negros", nota: "carbón activado" },

  // Tratamiento
  { nombre: "Sérum Calmante Rosácea", lote: "L006", categoria: "Sérum", para: "rosácea, piel reactiva o enrojecida", nota: "sin aceites; sugerir prueba de parche 24h" },

  // Cremas — emulsión O/W
  { nombre: "Crema Hidratación Botánica", lote: "L012", categoria: "Crema", para: "hidratación diaria, todo tipo de piel" },
  { nombre: "Crema Sabiduría Botánica Antiedad", lote: "L013", categoria: "Crema", para: "piel madura 35+, antiedad", nota: "centella + cafeína" },
  { nombre: "Crema Calma Profunda Rosácea", lote: "L014", categoria: "Crema", para: "rosácea, piel sensible", nota: "sin aceites esenciales, sin cafeína" },

  // Cuidado corporal / labial
  { nombre: "Ungüento Cicatrizante Botánico", lote: "L001", categoria: "Corporal", para: "cicatrices y piel dañada (cuerpo)", nota: "matico + milenrama" },
  { nombre: "Ungüento Dolor Efecto Calor", lote: "L002", categoria: "Corporal", para: "dolor muscular o articular", nota: "SOLO uso externo; no en cara, mucosas ni piel irritada; no en menores de 6 años" },
  { nombre: "Labial Dark Purple", lote: "L003", categoria: "Labial", para: "labios" },
  { nombre: "Base Solar Tintada Cacao", lote: "L004", categoria: "Corporal", para: "tono natural con algo de protección", nota: "SPF mineral estimado 15–20, NO certificado en laboratorio: no presentar como fotoprotección médica" },

  // Cabello — shampoos sólidos
  { nombre: "Shampoo Sólido Raíz Fuerte", lote: "L015", categoria: "Cabello", para: "caída, cabello débil", nota: "cafeína + ortiga" },
  { nombre: "Shampoo Sólido Cuero Limpio", lote: "L016", categoria: "Cabello", para: "caspa, cuero cabelludo", nota: "ricino + arcilla negra + salicílico" },
  { nombre: "Shampoo Sólido Detox Capilar", lote: "L017", categoria: "Cabello", para: "cabello graso", nota: "arcilla verde + carbón" },

  // Aromaterapia / ambiente
  { nombre: "Bruma del Nuevo Día", lote: "L008", categoria: "Bruma", para: "aroma ambiental, claridad", nota: "laurel, cedro, citronela" },
  { nombre: "Bruma del Bosque", lote: "L009", categoria: "Bruma", para: "aroma ambiental, arraigo", nota: "selva valdiviana" },
];

// Versión en texto lista para inyectar en el system prompt de una asesora.
export const CATALOGO_TEXTO = `CATÁLOGO EL FLOEMA (productos artesanales reales, La Unión, Región de Los Ríos, Chile — recomiéndalos SOLO cuando encajen con la necesidad de la persona):

LIMPIEZA FACIAL (sindets suaves, pH 5.5–6, líquidos o sólidos):
- Piel sensible/reactiva → "Sindet Facial Piel Sensible" · hidrolato triwe+arrayán, centella
- Piel mixta → "Sindet Facial Piel Mixta" · urea + prebióticos
- Piel grasa / poros / puntos negros → "Sindet Facial Carbón" · carbón activado

TRATAMIENTO / SÉRUM:
- Rosácea, piel reactiva o enrojecida → "Sérum Calmante Rosácea" · centella + hidrolato de triwe (sin aceites; sugerir prueba de parche 24h)

CREMAS (emulsión O/W):
- Hidratación diaria, todo tipo de piel → "Crema Hidratación Botánica"
- Piel madura 35+ / antiedad → "Crema Sabiduría Botánica Antiedad" · centella + cafeína
- Rosácea / piel sensible → "Crema Calma Profunda Rosácea" · sin aceites esenciales, sin cafeína

CUIDADO CORPORAL / LABIAL:
- Cicatrices y piel dañada (cuerpo) → "Ungüento Cicatrizante Botánico" · matico + milenrama
- Dolor muscular/articular → "Ungüento Dolor Efecto Calor" · SOLO uso externo, no en cara ni piel irritada, no en menores de 6 años
- Labios → "Labial Dark Purple"
- Tono con algo de protección → "Base Solar Tintada Cacao" · SPF mineral estimado 15–20, NO certificado: no la presentes como fotoprotección médica

CABELLO (shampoos sólidos):
- Caída / cabello débil → "Shampoo Sólido Raíz Fuerte" · cafeína + ortiga
- Caspa / cuero cabelludo → "Shampoo Sólido Cuero Limpio" · ricino + arcilla negra + salicílico
- Cabello graso → "Shampoo Sólido Detox Capilar" · arcilla verde + carbón

AROMATERAPIA / AMBIENTE:
- Brumas: "Bruma del Nuevo Día" (laurel, cedro, citronela) y "Bruma del Bosque" (selva valdiviana)`;

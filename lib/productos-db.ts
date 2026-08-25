import { supabase } from "@/lib/supabase";
import { productosTienda, type ProductoTienda } from "@/lib/productos-tienda";

// Capa de datos de la tienda. Lee los productos desde Supabase (tabla `productos`)
// para que se puedan crear/editar desde el Lab. Si la tabla aún no existe o está
// vacía, cae al catálogo estático (lib/productos-tienda.ts) — así la tienda nunca
// se rompe durante la migración.

interface ProductoRow {
  slug: string;
  nombre: string;
  categoria: string | null;
  descripcion: string | null;
  descripcion_larga: string | null;
  beneficios: string[] | null;
  ciencia: { titulo: string; texto: string }[] | null;
  bioquimica: { prompt: string; leyenda: string } | null;
  ingredientes: string | null;
  modo_uso: string | null;
  resultado: string | null;
  piel: string | null;
  tamano: string | null;
  imagen_prompt: string | null;
  ficha_prompt: string | null;
  precio: number | null;
  glyph: string | null;
  accent: string | null;
  destacado: boolean | null;
  oculto: boolean | null;
}

function mapRow(r: ProductoRow): ProductoTienda {
  return {
    slug: r.slug,
    nombre: r.nombre,
    categoria: r.categoria ?? "",
    descripcion: r.descripcion ?? "",
    descripcionLarga: r.descripcion_larga ?? undefined,
    beneficios: r.beneficios ?? undefined,
    ciencia: r.ciencia ?? undefined,
    bioquimica: r.bioquimica ?? undefined,
    ingredientes: r.ingredientes ?? undefined,
    modoUso: r.modo_uso ?? undefined,
    resultado: r.resultado ?? undefined,
    piel: r.piel ?? undefined,
    tamano: r.tamano ?? undefined,
    imagenPrompt: r.imagen_prompt ?? undefined,
    fichaPrompt: r.ficha_prompt ?? undefined,
    precio: r.precio ?? null,
    glyph: r.glyph ?? "✦",
    accent: r.accent ?? "rgba(200,160,80,0.24)",
    destacado: r.destacado ?? undefined,
    oculto: r.oculto ?? undefined,
  };
}

export async function getProductos(): Promise<ProductoTienda[]> {
  try {
    const { data, error } = await supabase
      .from("productos")
      .select("*")
      .order("orden", { ascending: true })
      .order("nombre", { ascending: true });
    if (error || !data || data.length === 0) return productosTienda;
    return (data as ProductoRow[]).map(mapRow);
  } catch {
    return productosTienda;
  }
}

export async function getProducto(slug: string): Promise<ProductoTienda | undefined> {
  const todos = await getProductos();
  return todos.find((p) => p.slug === slug);
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { CatalogoPersonal } from "@/components/lab/CatalogoPersonal";
import type { ProductoTienda } from "@/lib/productos-tienda";

/* Cada usuaria genera su propio catálogo con los productos que tenga visibles.
   Se lee con su sesión, así que las reglas de la base ya devuelven solo los
   suyos: no hay que filtrar por usuaria aquí. */

export const dynamic = "force-dynamic";

export default async function MiCatalogoImprimirPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/lab/login");

  const { data } = await supabase
    .from("productos")
    .select("slug, nombre, categoria, descripcion, ingredientes, modo_uso, tamano, precio, oculto, orden")
    .order("orden", { ascending: true })
    .order("nombre", { ascending: true });

  const productos: ProductoTienda[] = (data ?? [])
    .filter((p) => !p.oculto)
    .map((p) => ({
      slug: p.slug,
      nombre: p.nombre,
      categoria: p.categoria ?? "",
      descripcion: p.descripcion ?? "",
      ingredientes: p.ingredientes ?? undefined,
      modoUso: p.modo_uso ?? undefined,
      tamano: p.tamano ?? undefined,
      precio: p.precio ?? null,
      glyph: "✦",
      accent: "rgba(200,160,80,0.24)",
    }));

  return (
    <main
      className="parchment-bg lab-bg"
      style={{ minHeight: "100vh", padding: "clamp(90px, 14vh, 140px) clamp(20px, 5vw, 64px) 64px" }}
    >
      <div style={{ maxWidth: 940, margin: "0 auto" }}>
        <div className="no-print" style={{ marginBottom: "1.2rem" }}>
          <Link
            href="/lab/catalogo"
            style={{
              fontFamily: "var(--font-cinzel), serif",
              fontSize: "0.62rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(200,160,80,0.7)",
            }}
          >
            ← Volver a editar mis productos
          </Link>
          <h1
            style={{
              fontFamily: "var(--font-cinzel), serif",
              fontSize: "clamp(1.5rem,3.5vw,2.1rem)",
              color: "#c8a050",
              letterSpacing: "0.1em",
              margin: "0.6rem 0 0.3rem",
            }}
          >
            Generar mi catálogo
          </h1>
          <p
            style={{
              fontFamily: "var(--font-crimson), serif",
              fontSize: "0.95rem",
              color: "rgba(212,196,160,0.7)",
              margin: 0,
            }}
          >
            Aparecen los productos que tienes visibles. Elige un diseño, pon tu marca y descárgalo.
          </p>
        </div>

        <CatalogoPersonal productos={productos} />
      </div>
    </main>
  );
}

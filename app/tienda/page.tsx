import Link from "next/link";
import Navbar from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import ProductoCard from "@/components/tienda/ProductoCard";
import { getProductos } from "@/lib/productos-db";
import type { ProductoTienda } from "@/lib/productos-tienda";

export const metadata = {
  title: "Tienda · El Floema",
  description: "Cosmética botánica elaborada con ciencia — sérums, hidrolatos, jabones y velas de El Floema.",
};

export const dynamic = "force-dynamic";

// Orden de exhibición: primero el ritual facial completo, luego capilar,
// cuerpo y por último aromaterapia/hogar. Una categoría que no está en esta
// lista (por ejemplo una nueva creada desde el Lab) simplemente aparece al
// final, ordenada alfabéticamente — nunca desaparece.
const ORDEN_CATEGORIAS = [
  "Sérum facial",
  "Hidratación facial",
  "Limpieza facial",
  "Ritual facial",
  "Mascarilla exfoliante en polvo",
  "Tratamiento localizado",
  "Ungüentos medicinales",
  "Cuidado capilar",
  "Cuerpo",
  "Agua floral",
  "Aromaterapia",
];

function agruparPorCategoria(productos: ProductoTienda[]) {
  const grupos = new Map<string, ProductoTienda[]>();
  for (const p of productos) {
    const cat = p.categoria?.trim() || "Otros";
    if (!grupos.has(cat)) grupos.set(cat, []);
    grupos.get(cat)!.push(p);
  }
  const categorias = Array.from(grupos.keys()).sort((a, b) => {
    const ia = ORDEN_CATEGORIAS.indexOf(a);
    const ib = ORDEN_CATEGORIAS.indexOf(b);
    if (ia === -1 && ib === -1) return a.localeCompare(b, "es");
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
  return categorias.map((cat) => ({ categoria: cat, productos: grupos.get(cat)! }));
}

export default async function TiendaPage() {
  const productosTienda = await getProductos();
  const secciones = agruparPorCategoria(productosTienda.filter((p) => !p.oculto));
  return (
    <>
      <Navbar />
      <main
        style={{
          background:
            "linear-gradient(rgba(8,13,8,0.78), rgba(8,13,8,0.9)), url('/fondo_tienda.jpg') center top / cover fixed, var(--bg-primary)",
          minHeight: "100vh",
          paddingTop: "5rem",
        }}
      >
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "clamp(2rem,5vh,4rem) clamp(1.5rem,5vw,3rem) 6rem" }}>
          {/* Nav */}
          <div style={{ marginBottom: "clamp(2rem,4vh,3rem)" }}>
            <BackButton label="← Volver al inicio" href="/" />
          </div>

          {/* Header */}
          <header style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vh,4rem)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "clamp(18px,3vh,28px)", opacity: 0.32, maxWidth: 380, marginInline: "auto" }}>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #c8a050)" }} />
              <span style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "0.58rem", letterSpacing: "0.38em", textTransform: "uppercase", color: "#c8a050", whiteSpace: "nowrap" }}>
                Cosmética Botánica
              </span>
              <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #c8a050)" }} />
            </div>

            <h1 style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "clamp(2rem,5.5vw,3.5rem)", color: "#c8a050", letterSpacing: "0.16em", textShadow: "0 0 55px rgba(200,160,80,0.28)", marginBottom: "0.75rem" }}>
              Tienda El Floema
            </h1>
            <p style={{ fontFamily: "var(--font-crimson), serif", fontStyle: "italic", fontSize: "clamp(1rem,2vw,1.2rem)", color: "#d4c4a0", opacity: 0.55, maxWidth: 620, margin: "0 auto" }}>
              Cada producto nace en el laboratorio y se elabora a mano. Pronto podrás encontrar aquí toda la colección.
            </p>
          </header>

          {/* Enlace al catálogo */}
          <div style={{ textAlign: "center", marginBottom: "clamp(2rem,4vh,3rem)" }}>
            <Link
              href="/catalogo"
              style={{
                fontFamily: "var(--font-cinzel), serif",
                fontSize: "0.72rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c8a050",
                textDecoration: "none",
                border: "1px solid rgba(200,160,80,0.4)",
                borderRadius: 3,
                padding: "0.8rem 1.6rem",
                display: "inline-block",
              }}
            >
              Ver catálogo (PDF) →
            </Link>
          </div>

          {/* Productos agrupados por categoría */}
          {secciones.map(({ categoria, productos }) => (
            <section key={categoria} style={{ marginBottom: "clamp(2.5rem,5vh,4rem)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "clamp(1.2rem,2.5vh,1.8rem)" }}>
                <h2
                  style={{
                    fontFamily: "var(--font-cinzel), serif",
                    fontSize: "clamp(1.05rem,2.2vw,1.4rem)",
                    color: "#c8a050",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    margin: 0,
                  }}
                >
                  {categoria}
                </h2>
                <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(200,160,80,0.3), transparent)" }} />
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
                  gap: "clamp(1rem,2vw,1.75rem)",
                }}
              >
                {productos.map((p, i) => (
                  <ProductoCard key={p.slug} producto={p} index={i} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}

import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import ProductoImagen from "@/components/tienda/ProductoImagen";
import FiguraCiencia from "@/components/tienda/FiguraCiencia";
import AddToCartButton from "@/components/tienda/AddToCartButton";
import { productosTienda, getProductoTienda } from "@/lib/productos-tienda";

const GOLD = "#c8a050";
const CREAM = "#d4c4a0";

const sectionHeading: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.7rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: GOLD,
  opacity: 0.85,
  margin: "0 0 0.9rem",
};

export function generateStaticParams() {
  return productosTienda.filter((p) => !p.oculto).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const producto = getProductoTienda(slug);
  if (!producto) return { title: "Producto no encontrado · El Floema" };
  return {
    title: `${producto.nombre} · Tienda El Floema`,
    description: producto.descripcion,
  };
}

export default async function ProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = getProductoTienda(slug);
  if (!producto || producto.oculto) notFound();

  return (
    <>
      <Navbar />
      <main
        style={{
          background:
            "linear-gradient(rgba(8,13,8,0.82), rgba(8,13,8,0.92)), url('/fondo_tienda.jpg') center top / cover fixed, var(--bg-primary)",
          minHeight: "100vh",
          paddingTop: "5rem",
        }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "clamp(2rem,5vh,4rem) clamp(1.5rem,5vw,3rem) 6rem" }}>
          {/* Nav */}
          <div style={{ marginBottom: "clamp(2rem,4vh,3rem)" }}>
            <BackButton label="← Volver a la tienda" href="/tienda" />
          </div>

          {/* Hero: imagen (fija) + info esencial */}
          <style>{`
            .producto-hero { display: grid; grid-template-columns: minmax(280px, 380px) 1fr; gap: clamp(2rem,4vw,4rem); align-items: start; }
            @media (max-width: 760px) {
              .producto-hero { grid-template-columns: 1fr; }
              .producto-hero-img { position: static !important; }
            }
          `}</style>
          <div className="producto-hero">
            {/* Imagen — sticky para acompañar la lectura */}
            <div className="producto-hero-img" style={{ position: "sticky", top: "5.5rem" }}>
              <ProductoImagen slug={producto.slug} nombre={producto.nombre} glyph={producto.glyph} accent={producto.accent} prompt={producto.imagenPrompt} />
              {(producto.piel || producto.tamano) && (
                <p style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(212,196,160,0.55)", textAlign: "center", margin: "1.1rem 0 0" }}>
                  {[producto.piel && `Piel: ${producto.piel}`, producto.tamano].filter(Boolean).join("  ·  ")}
                </p>
              )}
            </div>

            {/* Info esencial */}
            <div>
              <p
                style={{
                  fontFamily: "var(--font-cinzel), serif",
                  fontSize: "0.62rem",
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  color: "rgba(154,106,170,0.85)",
                  marginBottom: "0.7rem",
                }}
              >
                {producto.categoria}
              </p>

              <h1
                style={{
                  fontFamily: "var(--font-cinzel), serif",
                  fontSize: "clamp(1.8rem,4vw,2.8rem)",
                  color: GOLD,
                  letterSpacing: "0.08em",
                  lineHeight: 1.15,
                  textShadow: "0 0 55px rgba(200,160,80,0.25)",
                  margin: "0 0 1.2rem",
                }}
              >
                {producto.nombre}
              </h1>

              <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "0 0 1.4rem", opacity: 0.3, maxWidth: 220 }}>
                <span style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #c8a050)" }} />
                <span style={{ color: GOLD, fontSize: "0.7rem" }}>✦</span>
                <span style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #c8a050)" }} />
              </div>

              <p
                style={{
                  fontFamily: "var(--font-crimson), serif",
                  fontSize: "clamp(1.02rem,1.5vw,1.18rem)",
                  color: CREAM,
                  opacity: 0.85,
                  lineHeight: 1.85,
                  margin: "0 0 2rem",
                }}
              >
                {producto.descripcionLarga ?? producto.descripcion}
              </p>

              {/* Propiedades */}
              {producto.beneficios && producto.beneficios.length > 0 && (
                <div style={{ margin: "0 0 2rem" }}>
                  <h2 style={sectionHeading}>Propiedades</h2>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.5rem 1.4rem" }}>
                    {producto.beneficios.map((b) => (
                      <li key={b} style={{ fontFamily: "var(--font-crimson), serif", fontSize: "0.98rem", color: CREAM, opacity: 0.8, lineHeight: 1.5 }}>
                        <span style={{ color: GOLD, marginRight: "0.6rem" }}>❧</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Precio */}
              <p
                style={{
                  fontFamily: "var(--font-cinzel), serif",
                  fontSize: producto.precio ? "1.5rem" : "0.85rem",
                  color: producto.precio ? GOLD : "rgba(212,196,160,0.5)",
                  letterSpacing: "0.04em",
                  fontStyle: producto.precio ? "normal" : "italic",
                  margin: "0.4rem 0 1.6rem",
                }}
              >
                {producto.precio ? `$${producto.precio.toLocaleString("es-CL")} CLP` : "Precio próximamente"}
              </p>

              {/* CTA: agregar al carrito + encargar por Instagram */}
              <AddToCartButton producto={producto} variant="detail" />
              <a
                href="https://instagram.com/elfloema"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-cinzel), serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: GOLD,
                  textDecoration: "none",
                  border: "1px solid rgba(200,160,80,0.5)",
                  padding: "0.9rem 2rem",
                }}
              >
                Encargar por Instagram →
              </a>

              <p
                style={{
                  fontFamily: "var(--font-crimson), serif",
                  fontStyle: "italic",
                  fontSize: "0.82rem",
                  color: "rgba(212,196,160,0.4)",
                  marginTop: "1rem",
                }}
              >
                Escríbenos a @elfloema para conocer disponibilidad y precios.
              </p>
            </div>
          </div>

          {/* Cómo actúa · la ciencia detrás (ancho completo) */}
          {producto.ciencia && producto.ciencia.length > 0 && (
            <section style={{ marginTop: "clamp(3rem,6vh,4.5rem)" }}>
              <h2 style={{ ...sectionHeading, textAlign: "center", marginBottom: "1.6rem" }}>Cómo actúa · la ciencia detrás</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
                {producto.ciencia.map((c) => (
                  <div
                    key={c.titulo}
                    style={{
                      border: "1px solid rgba(200,160,80,0.18)",
                      borderRadius: 6,
                      padding: "1.2rem 1.3rem",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <h3 style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "0.82rem", letterSpacing: "0.06em", color: GOLD, margin: "0 0 0.6rem" }}>
                      {c.titulo}
                    </h3>
                    <p style={{ fontFamily: "var(--font-crimson), serif", fontSize: "0.94rem", lineHeight: 1.65, color: CREAM, opacity: 0.78, margin: 0 }}>
                      {c.texto}
                    </p>
                  </div>
                ))}
              </div>
              {producto.bioquimica && (
                <div style={{ maxWidth: 640, margin: "1.6rem auto 0" }}>
                  <FiguraCiencia
                    src={`/tienda/${producto.slug}-ciencia.jpg`}
                    prompt={producto.bioquimica.prompt}
                    leyenda={producto.bioquimica.leyenda}
                  />
                </div>
              )}
            </section>
          )}

          {/* Modo de uso + Ingredientes (dos columnas) */}
          {(producto.modoUso || producto.ingredientes) && (
            <section
              style={{
                marginTop: "clamp(2.5rem,5vh,3.5rem)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "clamp(1.5rem,4vw,3rem)",
                alignItems: "start",
              }}
            >
              {producto.modoUso && (
                <div>
                  <h2 style={sectionHeading}>Modo de uso</h2>
                  <p style={{ fontFamily: "var(--font-crimson), serif", fontSize: "0.98rem", lineHeight: 1.75, color: CREAM, opacity: 0.82, margin: 0 }}>
                    {producto.modoUso}
                  </p>
                </div>
              )}
              {producto.ingredientes && (
                <div>
                  <h2 style={sectionHeading}>Ingredientes (INCI)</h2>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.84rem", lineHeight: 1.7, color: CREAM, opacity: 0.58, margin: 0 }}>
                    {producto.ingredientes}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Ficha ilustrada (infografía estilo El Floema) */}
          {producto.fichaPrompt && (
            <section style={{ marginTop: "clamp(3rem,6vh,4.5rem)" }}>
              <h2 style={{ ...sectionHeading, textAlign: "center" }}>Ficha ilustrada</h2>
              <div style={{ maxWidth: 560, margin: "0 auto" }}>
                <FiguraCiencia
                  src={`/tienda/${producto.slug}-ficha.jpg`}
                  prompt={producto.fichaPrompt}
                  titulo="Ficha ilustrada"
                  leyenda="Infografía completa del producto (se genera con IA; el texto se agrega en Canva)."
                />
              </div>
            </section>
          )}

          {/* Otros productos */}
          <section style={{ marginTop: "clamp(4rem,8vh,6rem)" }}>
            <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
              <h2 style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "clamp(1.1rem,3vw,1.6rem)", color: GOLD, letterSpacing: "0.14em" }}>
                Más de la tienda
              </h2>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", justifyContent: "center" }}>
              {productosTienda
                .filter((p) => p.slug !== producto.slug && !p.oculto)
                .slice(0, 6)
                .map((p) => (
                  <Link
                    key={p.slug}
                    href={`/tienda/${p.slug}`}
                    style={{
                      fontFamily: "var(--font-cinzel), serif",
                      fontSize: "0.62rem",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: GOLD,
                      textDecoration: "none",
                      border: "1px solid rgba(200,160,80,0.28)",
                      borderRadius: "2rem",
                      padding: "0.5rem 1.1rem",
                    }}
                  >
                    {p.nombre}
                  </Link>
                ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

import type { CSSProperties } from "react";
import BotonImprimirCatalogo from "@/components/tienda/BotonImprimirCatalogo";
import CatalogoImagen from "@/components/tienda/CatalogoImagen";
import { productosTienda } from "@/lib/productos-tienda";

export const metadata = {
  title: "Catálogo · El Floema",
  description: "Catálogo de El Floema — cosmética botánica elaborada con ciencia.",
};

const GOLD = "#c8a050";
const GOLD_LIGHT = "#e8c878";
const CREAM = "#d4c4a0";

// Orden de categorías según su primera aparición en el catálogo de productos.
function categoriasOrdenadas(): string[] {
  const cats: string[] = [];
  for (const p of productosTienda) if (!cats.includes(p.categoria)) cats.push(p.categoria);
  return cats;
}

export default function CatalogoPage() {
  const categorias = categoriasOrdenadas();

  return (
    <div style={pageStyle}>
      <style>{cssImpresion}</style>

      {/* Barra de acción (no se imprime) */}
      <div className="no-print" style={{ display: "flex", justifyContent: "center", gap: "1rem", padding: "1.5rem", flexWrap: "wrap" }}>
        <a href="/tienda" style={linkVolverStyle}>← Volver a la tienda</a>
        <BotonImprimirCatalogo />
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(1rem,4vw,2.5rem) 3rem" }}>
        {/* Portada */}
        <section className="cat-cover" style={{ textAlign: "center", padding: "clamp(2rem,8vh,5rem) 0 clamp(2rem,6vh,4rem)" }}>
          <p style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "0.62rem", letterSpacing: "0.4em", textTransform: "uppercase", color: GOLD, opacity: 0.75, marginBottom: "1.2rem" }}>
            Fitocosmética Científica
          </p>
          <h1 style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "clamp(2.4rem,7vw,4rem)", color: GOLD, letterSpacing: "0.14em", margin: "0 0 0.6rem", textShadow: "0 0 55px rgba(200,160,80,0.25)" }}>
            El Floema
          </h1>
          <p style={{ fontFamily: "var(--font-crimson), serif", fontStyle: "italic", fontSize: "clamp(1.1rem,2.4vw,1.5rem)", color: CREAM, opacity: 0.7, margin: "0 0 2rem" }}>
            Con ciencia, mi magia despierta
          </p>
          <Divisor />
          <p style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD_LIGHT, marginTop: "2rem" }}>
            Catálogo
          </p>
          <p style={{ fontFamily: "var(--font-crimson), serif", fontStyle: "italic", fontSize: "1rem", color: "rgba(212,196,160,0.55)", maxWidth: 560, margin: "1.5rem auto 0", lineHeight: 1.7 }}>
            Cosmética botánica elaborada a mano, con plantas nativas y respaldo científico. Cada producto nace en el laboratorio de El Floema, en La Unión, Región de Los Ríos.
          </p>
        </section>

        {/* Secciones por categoría */}
        {categorias.map((cat) => (
          <section key={cat} className="cat-cat" style={{ marginBottom: "clamp(2rem,5vh,3.5rem)" }}>
            <h2 style={categoriaStyle}>{cat}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {productosTienda
                .filter((p) => p.categoria === cat)
                .map((p) => (
                  <article key={p.slug} className="cat-card" style={cardStyle}>
                    <div style={{ width: "clamp(96px, 22%, 150px)", flexShrink: 0 }}>
                      <CatalogoImagen slug={p.slug} nombre={p.nombre} glyph={p.glyph} accent={p.accent} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={nombreStyle}>{p.nombre}</h3>
                      <p style={descStyle}>{p.descripcionLarga ?? p.descripcion}</p>

                      {p.beneficios && p.beneficios.length > 0 && (
                        <ul style={benefListStyle}>
                          {p.beneficios.slice(0, 4).map((b) => (
                            <li key={b} style={benefItemStyle}>
                              <span style={{ color: GOLD, marginRight: "0.5rem" }}>❧</span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}

                      <div style={metaRowStyle}>
                        <span>{[p.piel && `Piel: ${p.piel}`, p.tamano].filter(Boolean).join("  ·  ")}</span>
                        <span style={{ color: p.precio ? GOLD : "rgba(212,196,160,0.45)", fontStyle: p.precio ? "normal" : "italic" }}>
                          {p.precio ? `$${p.precio.toLocaleString("es-CL")} CLP` : "Consultar precio"}
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}

        {/* Cierre / contacto */}
        <section className="cat-cat" style={{ textAlign: "center", marginTop: "clamp(2rem,5vh,3.5rem)", paddingTop: "2rem", borderTop: "1px solid rgba(200,160,80,0.18)" }}>
          <Divisor />
          <p style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "0.9rem", letterSpacing: "0.24em", textTransform: "uppercase", color: GOLD, margin: "1.5rem 0 0.6rem" }}>
            Encarga por Instagram
          </p>
          <p style={{ fontFamily: "var(--font-crimson), serif", fontSize: "1.1rem", color: CREAM }}>@elfloema</p>
          <p style={{ fontFamily: "var(--font-crimson), serif", fontStyle: "italic", fontSize: "0.85rem", color: "rgba(212,196,160,0.5)", marginTop: "0.8rem" }}>
            El Floema · La Unión, Región de Los Ríos, Chile
          </p>
        </section>
      </div>
    </div>
  );
}

function Divisor() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", maxWidth: 280, margin: "0 auto", opacity: 0.4 }}>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #c8a050)" }} />
      <span style={{ color: GOLD, fontSize: "0.7rem" }}>✦</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #c8a050)" }} />
    </div>
  );
}

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  background: "linear-gradient(rgba(9,15,9,0.97), rgba(9,15,9,0.99)), radial-gradient(ellipse 60% 40% at 50% 0%, rgba(200,160,80,0.05), transparent 70%), #0b140b",
  color: CREAM,
  WebkitPrintColorAdjust: "exact",
  printColorAdjust: "exact",
};

const categoriaStyle: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.72rem",
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  color: GOLD_LIGHT,
  borderBottom: "1px solid rgba(200,160,80,0.22)",
  paddingBottom: "0.6rem",
  marginBottom: "1.2rem",
};

const cardStyle: CSSProperties = {
  display: "flex",
  gap: "clamp(1rem,3vw,1.6rem)",
  alignItems: "flex-start",
  background: "linear-gradient(135deg, rgba(15,26,15,0.6), rgba(11,20,11,0.6))",
  border: "1px solid rgba(200,160,80,0.16)",
  borderRadius: 6,
  padding: "clamp(0.9rem,2.5vw,1.4rem)",
};

const nombreStyle: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "clamp(1rem,2.2vw,1.25rem)",
  color: GOLD,
  letterSpacing: "0.05em",
  margin: "0 0 0.5rem",
};

const descStyle: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.92rem",
  lineHeight: 1.6,
  color: "rgba(212,196,160,0.82)",
  margin: "0 0 0.7rem",
};

const benefListStyle: CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: "0 0 0.8rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
};

const benefItemStyle: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.86rem",
  color: "rgba(212,196,160,0.7)",
  lineHeight: 1.4,
};

const metaRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: "1rem",
  flexWrap: "wrap",
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.62rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(212,196,160,0.55)",
  borderTop: "1px solid rgba(200,160,80,0.12)",
  paddingTop: "0.6rem",
};

const linkVolverStyle: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.72rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: GOLD,
  textDecoration: "none",
  border: "1px solid rgba(200,160,80,0.3)",
  borderRadius: 3,
  padding: "0.85rem 1.4rem",
};

const cssImpresion = `
  @page { size: A4; margin: 12mm; }
  @media print {
    .no-print { display: none !important; }
    .cat-cover { break-after: page; }
    .cat-cat, .cat-card { break-inside: avoid; }
  }
`;

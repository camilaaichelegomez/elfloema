import Link from "next/link";
import Navbar from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import ProductoCard from "@/components/tienda/ProductoCard";
import { productosTienda } from "@/lib/productos-tienda";

export const metadata = {
  title: "Tienda · El Floema",
  description: "Cosmética botánica elaborada con ciencia — sérums, hidrolatos, jabones y velas de El Floema.",
};

export default function TiendaPage() {
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

          {/* Product grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))",
              gap: "clamp(1rem,2vw,1.75rem)",
            }}
          >
            {productosTienda
              .filter((p) => !p.oculto)
              .map((p, i) => (
                <ProductoCard key={p.slug} producto={p} index={i} />
              ))}
          </div>
        </div>
      </main>
    </>
  );
}

import Navbar from "@/components/Navbar";
import { ParallaxHero } from "@/components/ParallaxHero";
import { PageBackground } from "@/components/PageBackground";
import { AgentesIA } from "@/components/AgentesIA";
import { PlantasMedicinalesSection } from "@/components/PlantasMedicinalesSection";
import { KnowledgeCards } from "@/components/KnowledgeCards";
import { NavCards, CuerpoSection, GrimorioSection } from "@/components/NavCards";
import { LaBotica } from "@/components/LaBotica";
import { CartProvider } from "@/components/tienda/CartProvider";
import { Comentarios } from "@/components/Comentarios";

export default function Home() {
  return (
    <>
      <PageBackground />
      <Navbar />
      <ParallaxHero />
      <div id="contenido" style={{ scrollMarginTop: "72px" }} />
      <AgentesIA />
      <PlantasMedicinalesSection />
      <KnowledgeCards />
      <NavCards />
      <CuerpoSection />
      <GrimorioSection />
      <CartProvider>
        <LaBotica />
      </CartProvider>
      <div style={{ position: "relative", zIndex: 1, padding: "0 clamp(1.5rem,5vw,3rem) clamp(3rem,8vh,5rem)" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 clamp(1.2rem,4vw,2.4rem) clamp(1.6rem,4vw,2.4rem)", background: "rgba(8,13,8,0.78)", border: "1px solid rgba(200,160,80,0.18)", borderRadius: 14 }}>
          <Comentarios pagina="inicio" />
        </div>
      </div>
      <footer className="site-footer">
        <img src="/logo.jpg" alt="El Floema" className="footer-logo" />
        <p className="footer-tagline">Con ciencia, mi magia despierta</p>
        <p className="footer-handle">@elfloema</p>
        <p style={{ marginTop: "0.9rem" }}>
          <a
            href="/privacidad"
            style={{
              fontFamily: "var(--font-cinzel), serif",
              fontSize: "0.58rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(212,196,160,0.45)",
            }}
          >
            Política de privacidad
          </a>
          <span style={{ color: "rgba(212,196,160,0.25)", margin: "0 0.6rem" }}>·</span>
          <a
            href="/terminos"
            style={{
              fontFamily: "var(--font-cinzel), serif",
              fontSize: "0.58rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(212,196,160,0.45)",
            }}
          >
            Términos de uso
          </a>
        </p>
      </footer>
    </>
  );
}

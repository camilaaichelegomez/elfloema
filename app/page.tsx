import Navbar from "@/components/Navbar";
import { ParallaxHero } from "@/components/ParallaxHero";
import { PageBackground } from "@/components/PageBackground";
import { AgentesIA } from "@/components/AgentesIA";
import { PlantasMedicinalesSection } from "@/components/PlantasMedicinalesSection";
import { KnowledgeCards } from "@/components/KnowledgeCards";
import { NavCards, GrimorioSection } from "@/components/NavCards";
import { LaBotica } from "@/components/LaBotica";
import { CartProvider } from "@/components/tienda/CartProvider";

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
      <GrimorioSection />
      <CartProvider>
        <LaBotica />
      </CartProvider>
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

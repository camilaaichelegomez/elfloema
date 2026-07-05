import Navbar from "@/components/Navbar";
import { ParallaxHero } from "@/components/ParallaxHero";
import { PageBackground } from "@/components/PageBackground";
import { AgentesIA } from "@/components/AgentesIA";
import { PlantasMedicinalesSection } from "@/components/PlantasMedicinalesSection";
import { KnowledgeCards } from "@/components/KnowledgeCards";
import { SectionDivider } from "@/components/SectionDivider";
import { NavCards } from "@/components/NavCards";
import { LaBotica } from "@/components/LaBotica";
import { GrainOverlay } from "@/components/GrainOverlay";

export default function Home() {
  return (
    <>
      <PageBackground />
      <GrainOverlay />
      <Navbar />
      <ParallaxHero />
      <AgentesIA />
      <PlantasMedicinalesSection />
      <KnowledgeCards />
      <SectionDivider />
      <NavCards />
      <LaBotica />
      <SectionDivider />
      <footer className="site-footer">
        <img src="/logo.jpg" alt="El Floema" className="footer-logo" />
        <p className="footer-tagline">Con ciencia, mi magia despierta</p>
        <p className="footer-handle">@elfloema</p>
      </footer>
    </>
  );
}

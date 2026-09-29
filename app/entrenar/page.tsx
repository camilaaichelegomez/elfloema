import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { BackButton } from "@/components/BackButton";
import { BarraFlorecer } from "@/components/florecer/BarraFlorecer";
import { BotonInstalar } from "@/components/BotonInstalar";
import { Entrenar } from "@/components/florecer/Entrenar";
import { RegistrarServiceWorker } from "@/components/lab/RegistrarServiceWorker";
import { Sincroniza } from "@/components/florecer/Sincroniza";

/* Entrenar: Yoga, Fuerza e Hipopresivos juntos, detrás de una sola pestaña
   de la barra. Cada una sigue siendo su propia sección; esto es la puerta. */

export const metadata: Metadata = {
  title: "Entrenar — El Floema",
  description: "Yoga, fuerza e hipopresivos: elige qué practicar hoy y mira cuándo hiciste cada una.",
  manifest: "/florecer/manifest.webmanifest",
  icons: { apple: "/icon-flor-180.png" },
};

export default function EntrenarPage() {
  return (
    <main
      className="fuerza-bg con-barra-florecer"
      style={{ minHeight: "100vh", padding: "clamp(78px, 9vh, 96px) clamp(16px, 5vw, 64px) 80px" }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto", minWidth: 0 }}>
        <RegistrarServiceWorker />
        <Sincroniza />
        <BackButton href="/florecer" />

        <header style={{ margin: "0 0 1.2rem" }}>
          <p style={rotulo}>Cuidado del cuerpo</p>
          <h1 style={h1}>Entrenar</h1>
          <p style={texto}>Elige qué practicar hoy. Debajo de cada una ves cuándo la hiciste por última vez.</p>
        </header>

        <BotonInstalar nombre="Florecer" />

        <Entrenar />
      </div>
      <BarraFlorecer />
    </main>
  );
}

const rotulo: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.7rem",
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: "rgba(200,160,80,0.85)",
  margin: 0,
};

const h1: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "clamp(1.4rem, 3.6vw, 2.1rem)",
  color: "#c8a050",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  margin: "0.3rem 0 0",
  textShadow: "0 0 60px rgba(200,160,80,0.2)",
};

const texto: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "clamp(0.97rem, 2.1vw, 1.06rem)",
  lineHeight: 1.6,
  color: "rgba(217,203,170,0.9)",
  margin: "0.7rem 0 0",
  maxWidth: "52ch",
};

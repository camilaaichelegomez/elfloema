import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { BackButton } from "@/components/BackButton";
import { BarraFlorecer } from "@/components/florecer/BarraFlorecer";
import { BotonInstalar } from "@/components/BotonInstalar";
import { Ciclo } from "@/components/ciclo/Ciclo";
import { RegistrarServiceWorker } from "@/components/lab/RegistrarServiceWorker";

/* Ciclo dentro de Florecer: el calendario de la regla y de cómo te
   sientes, la fase de hoy y los consejos según la etapa.

   No lleva <Sincroniza />: son datos de salud y se quedan en el teléfono.
   La teoría vive en /biblioteca/ciclo-menstrual. */

export const metadata: Metadata = {
  title: "Ciclo — El Floema",
  description:
    "Anota tu regla y cómo te sientes, mira en qué fase vas y recibe consejos según tu etapa. Todo se guarda solo en tu teléfono.",
  manifest: "/florecer/manifest.webmanifest",
  icons: { apple: "/icon-flor-180.png" },
};

export default function CicloPage() {
  return (
    <main
      className="yoga-bg con-barra-florecer"
      style={{ minHeight: "100vh", padding: "clamp(78px, 9vh, 96px) clamp(16px, 5vw, 64px) 80px" }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto", minWidth: 0 }}>
        <RegistrarServiceWorker />
        <BackButton href="/florecer" />

        <header style={{ margin: "0 0 1.1rem" }}>
          <p style={rotulo}>Hormonas y ciclo</p>
          <h1 style={h1}>Ciclo</h1>
          <p style={texto}>Tu regla y cómo te sientes, día a día. Se guarda solo en este teléfono.</p>
        </header>

        <BotonInstalar nombre="Florecer" />

        <Ciclo />
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
  color: "rgba(217,203,170,0.85)",
  margin: "0.6rem 0 0",
  maxWidth: "56ch",
};

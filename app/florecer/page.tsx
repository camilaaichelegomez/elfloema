import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { BotonInstalar } from "@/components/BotonInstalar";
import { BarraFlorecer } from "@/components/florecer/BarraFlorecer";
import { RegistrarServiceWorker } from "@/components/lab/RegistrarServiceWorker";
import { Portada } from "@/components/florecer/Portada";
import { Cuenta } from "@/components/florecer/Cuenta";

/* Florecer: la puerta de entrada a las tres secciones del cuerpo.

   Son una sola app instalable. El Lab queda aparte a propósito: es trabajo,
   lo usa otra gente y tiene su propio manifiesto. */

export const metadata: Metadata = {
  title: "Florecer — yoga, ritual facial y hábitos | El Floema",
  description:
    "Tu práctica de yoga, el ritual facial y tus hábitos del día en una sola app, que funciona sin internet.",
  manifest: "/florecer/manifest.webmanifest",
  icons: { apple: "/icon-flor-180.png" },
};

export default function CuidadoPage() {
  return (
    <main
      className="yoga-bg con-barra-florecer"
      style={{ minHeight: "100vh", padding: "clamp(78px, 9vh, 96px) clamp(16px, 5vw, 64px) 80px" }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <RegistrarServiceWorker />

        <header style={{ margin: "0 0 1.2rem" }}>
          <p style={rotulo}>Cuidado del cuerpo y de los días</p>
          <h1
            style={{
              fontFamily: "var(--font-grimoire)",
              fontSize: "clamp(1.4rem, 3.6vw, 2.1rem)",
              color: "#c8a050",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              margin: "0.3rem 0 0",
              textShadow: "0 0 60px rgba(200,160,80,0.2)",
              textWrap: "balance",
            }}
          >
            Florecer
          </h1>
        </header>

        <BotonInstalar nombre="Florecer" />

        <div style={{ marginBottom: "1rem" }}>
          <Cuenta />
        </div>

        <Portada />

        <p style={{ ...parrafo, marginTop: "1.6rem" }}>
          Las tres funcionan sin internet una vez instaladas, y lo que respondes se guarda en este
          aparato. El Floema Lab, el de la producción, es otra app y va aparte.
        </p>
      </div>
      <BarraFlorecer />
    </main>
  );
}

const rotulo: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.6rem",
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: "rgba(200,160,80,0.7)",
  margin: 0,
};

const parrafo: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.95rem",
  lineHeight: 1.6,
  color: "rgba(217,203,170,0.7)",
  maxWidth: "62ch",
};

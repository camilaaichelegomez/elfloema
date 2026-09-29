import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BackButton } from "@/components/BackButton";
import { Dibujos } from "@/components/fuerza/Dibujos";
import { leerPrompts } from "@/lib/fuerza/leer-prompts";

/* La lista de dibujos por hacer, con los nombres listos para copiar.

   Es una herramienta de taller, no una página de la app: no está en el menú
   ni en la barra de abajo. Se llega por la dirección, o por el enlace al pie
   de la sección de Fuerza.

   Los prompts salen de prompts-fuerza.md al construir el sitio, así que el
   documento sigue siendo el único sitio donde se escriben. */

export const metadata: Metadata = {
  title: "Dibujos de Fuerza — El Floema",
  description: "Los nombres de archivo y los prompts de los ejercicios, listos para copiar.",
  robots: { index: false, follow: false },
};

export default function DibujosPage() {
  const prompts = leerPrompts();

  return (
    <main
      className="fuerza-bg"
      style={{ minHeight: "100vh", padding: "clamp(78px, 9vh, 96px) clamp(16px, 5vw, 64px) 80px" }}
    >
      <div style={{ maxWidth: 820, margin: "0 auto", minWidth: 0 }}>
        <BackButton />

        <header style={{ margin: "0 0 1.4rem" }}>
          <p style={rotulo}>Taller</p>
          <h1 style={h1}>Dibujos de Fuerza</h1>
          <p style={{ ...texto, marginTop: "0.7rem", maxWidth: "58ch" }}>
            Los nombres de archivo y los prompts, para copiar sin escribir nada a mano. El nombre
            tiene que quedar exacto: si cambia una letra, el dibujo no aparece en la app.
          </p>
        </header>

        <Dibujos prompts={prompts} />

        <p style={{ ...texto, marginTop: "2rem", fontSize: "0.92rem", opacity: 0.75 }}>
          Cuando tengas las imágenes, déjalas en <code>public/fuerza/</code> y aparecen solas en{" "}
          <Link href="/fuerza" style={enlace}>
            la sección de Fuerza
          </Link>
          . Si te salieron en png o jpg, no las conviertas: déjalas todas en una carpeta y dime.
        </p>
      </div>
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

const h1: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "clamp(1.3rem, 3.4vw, 1.9rem)",
  color: "#c8a050",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  margin: "0.3rem 0 0",
  textWrap: "balance",
};

const texto: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "1rem",
  lineHeight: 1.65,
  color: "rgba(217,203,170,0.82)",
  margin: 0,
};

const enlace: CSSProperties = { color: "rgba(200,160,80,0.85)" };

import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { BackButton } from "@/components/BackButton";
import { Habitos } from "@/components/habitos/Habitos";
import { HALLAZGOS, MITOS, SOBRE_LOS_DATOS } from "@/lib/habitos/ciencia";

/* Hábitos: objetivos, hábitos, tareas y pausas, en un solo lugar.

   La sección existe porque el Ritual de yoga ya demostró que lo que sirve es
   abrir la app y que esté todo listo. Aquí es lo mismo con lo demás del día.

   Cada decisión de diseño sale de un hallazgo publicado, y el texto de abajo
   dice cuál. Lo que no tiene respaldo se nombra como mito, no se calla. */

export const metadata: Metadata = {
  title: "Hábitos — El Floema",
  description:
    "Tus objetivos, hábitos y tareas en un calendario, con gráficos de cómo vas y pausas cortas. Basado en lo que la investigación muestra que funciona.",
};

export default function HabitosPage() {
  return (
    <main
      className="habitos-bg"
      style={{ minHeight: "100vh", padding: "clamp(78px, 9vh, 96px) clamp(16px, 5vw, 64px) 80px" }}
    >
      <div style={{ maxWidth: 940, margin: "0 auto" }}>
        <BackButton />

        <header style={{ margin: "0 0 1.1rem" }}>
          <p style={rotulo}>Cuidado de los días</p>
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
            Hábitos
          </h1>
        </header>

        <Habitos />

        <section style={{ marginTop: "3rem" }}>
          <h2 style={encabezado}>Por qué está hecha así</h2>
          <p style={parrafo}>
            No es una app de motivación. Cada cosa que te pide —escribir cuándo harás algo, partir
            una tarea en pasos, marcar el día— está ahí porque hay investigación que la respalda.
            Esto es lo que dice cada estudio y qué se hizo con eso.
          </p>

          <ul style={{ listStyle: "none", margin: "1.4rem 0 0", padding: 0, display: "grid", gap: "1rem" }}>
            {HALLAZGOS.map((h) => (
              <li key={h.titulo} style={ficha}>
                <h3 style={{ ...parrafo, color: "#e8c878", fontSize: "1.05rem", margin: "0 0 0.4rem" }}>
                  {h.titulo}
                </h3>
                <p style={{ ...parrafo, margin: "0 0 0.5rem" }}>{h.dice}</p>
                <p style={{ ...parrafo, margin: "0 0 0.5rem", color: "rgba(168,200,138,0.85)" }}>
                  En la app: {h.enLaApp}
                </p>
                <p style={{ ...parrafo, margin: 0, fontSize: "0.82rem", opacity: 0.6 }}>{h.fuente}</p>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginTop: "2.4rem" }}>
          <h2 style={encabezado}>Lo que se repite y no es verdad</h2>
          <ul style={{ listStyle: "none", margin: "1rem 0 0", padding: 0, display: "grid", gap: "0.9rem" }}>
            {MITOS.map((m) => (
              <li key={m.mito} style={ficha}>
                <p style={{ ...parrafo, margin: "0 0 0.4rem", color: "#dd9464" }}>{m.mito}</p>
                <p style={{ ...parrafo, margin: 0 }}>{m.realidad}</p>
              </li>
            ))}
          </ul>
        </section>

        <section style={{ marginTop: "2.4rem" }}>
          <h2 style={encabezado}>Dónde queda lo que escribes</h2>
          <p style={parrafo}>{SOBRE_LOS_DATOS}</p>
        </section>
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

const encabezado: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
  color: "#c8a050",
  letterSpacing: "0.08em",
  margin: "0 0 0.6rem",
};

const parrafo: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "clamp(0.98rem, 2.1vw, 1.08rem)",
  lineHeight: 1.65,
  color: "rgba(217,203,170,0.8)",
  maxWidth: "70ch",
};

const ficha: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.18)",
  background: "rgba(12,22,12,0.6)",
  borderRadius: 6,
  padding: "0.9rem 1.1rem",
};

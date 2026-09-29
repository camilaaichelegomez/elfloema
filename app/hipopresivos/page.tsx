import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BackButton } from "@/components/BackButton";
import { BarraFlorecer } from "@/components/florecer/BarraFlorecer";
import { BotonInstalar } from "@/components/BotonInstalar";
import { RegistrarServiceWorker } from "@/components/lab/RegistrarServiceWorker";
import { Desplegable } from "@/components/florecer/Desplegable";
import { Sincroniza } from "@/components/florecer/Sincroniza";
import { FiguraHipopresivo } from "@/components/hipopresivos/FiguraHipopresivo";
import { Hipopresivos } from "@/components/hipopresivos/Hipopresivos";
import { DONDE_QUEDA, EN_UNA_LINEA, LA_DOSIS, PASOS_DE_LA_TECNICA, SEGURIDAD } from "@/lib/hipopresivos/ciencia";
import { NIVELES, PAUTAS_COMUNES, POSTURAS } from "@/lib/hipopresivos/practica";

/* Hipopresivos dentro de Florecer: la práctica.

   Arriba, la sesión del día ya armada y guiada: la app dice cuándo tomar
   aire, cuándo botarlo y cuándo hacer la pausa. Debajo, plegado, lo que
   hace falta tener a mano: cómo se hace la técnica, las posturas, la dosis y
   cuándo parar.

   La teoría —qué está probado y qué no, los mitos, de dónde viene— vive en
   la biblioteca, en /biblioteca/hipopresivos. */

export const metadata: Metadata = {
  title: "Hipopresivos — El Floema",
  description:
    "Práctica guiada de hipopresivos: la app lleva el ritmo de la respiración y la pausa, con posturas por nivel y un chequeo de seguridad al empezar.",
  manifest: "/florecer/manifest.webmanifest",
  icons: { apple: "/icon-flor-180.png" },
};

const NOMBRE_NIVEL = Object.fromEntries(NIVELES.map((n) => [n.id, n.label]));

export default function HipopresivosPage() {
  return (
    <main
      className="hipopresivos-bg con-barra-florecer"
      style={{ minHeight: "100vh", padding: "clamp(78px, 9vh, 96px) clamp(16px, 5vw, 64px) 80px" }}
    >
      <div style={{ maxWidth: 940, margin: "0 auto", minWidth: 0 }}>
        <RegistrarServiceWorker />
        <Sincroniza />
        <BackButton label="← Entrenar" href="/entrenar" />

        <header style={{ margin: "0 0 1.1rem" }}>
          <p style={rotulo}>Cuidado del centro del cuerpo</p>
          <h1 style={h1}>Hipopresivos</h1>
          <p style={{ ...texto, marginTop: "0.7rem", maxWidth: "56ch", color: "rgba(217,203,170,0.9)" }}>
            {EN_UNA_LINEA}
          </p>
        </header>

        <BotonInstalar nombre="Florecer" />

        <Hipopresivos />

        <Desplegable titulo="Cómo se hace, paso a paso">
          <ol style={lista}>
            {PASOS_DE_LA_TECNICA.map((p) => (
              <li key={p.paso} style={{ ...tarjeta, marginBottom: "0.55rem" }}>
                <p style={{ ...texto, margin: "0 0 0.3rem", color: "#e8c878" }}>{p.paso}</p>
                <p style={{ ...texto, margin: 0 }}>{p.como}</p>
              </li>
            ))}
          </ol>
          <p style={{ ...texto, marginTop: "0.9rem", marginBottom: 0 }}>
            Lo que más cuesta al principio es abrir las costillas sin dejar entrar aire. Acostada, con
            las manos en los costados, se siente mejor cómo se separan.
          </p>
        </Desplegable>

        <Desplegable titulo={`Las posturas: ${POSTURAS.length}`}>
          <p style={{ ...texto, maxWidth: "66ch" }}>
            Lo que vale en todas. {PAUTAS_COMUNES.join(" ")} La app va sumando posturas a medida que
            subes de nivel.
          </p>
          <ol style={lista}>
            {POSTURAS.map((p, i) => (
              <li key={p.id} style={{ ...tarjeta, marginBottom: "0.55rem" }}>
                <div style={{ display: "flex", gap: "0.6rem", alignItems: "baseline", flexWrap: "wrap" }}>
                  <span style={numero}>{i + 1}</span>
                  <span style={{ ...texto, margin: 0, color: "#e8c878", fontSize: "1.02rem" }}>{p.nombre}</span>
                  <span style={fuente}>desde «{NOMBRE_NIVEL[p.nivel]}»</span>
                </div>
                <div style={{ marginTop: "0.6rem" }}>
                  <FiguraHipopresivo figura={p.figura} nombre={p.nombre} alto={150} />
                </div>
                <ul style={{ ...lista, margin: "0.4rem 0" }}>
                  {p.pasos.map((x) => (
                    <li key={x} style={{ ...texto, margin: "0 0 0.3rem" }}>
                      {x}
                    </li>
                  ))}
                </ul>
                <p style={{ ...texto, margin: 0, color: "rgba(221,148,100,0.9)", fontSize: "0.95rem" }}>Ojo: {p.ojo}</p>
              </li>
            ))}
          </ol>
        </Desplegable>

        <Desplegable titulo="La dosis, en números">
          <div style={{ display: "grid", gap: "0.6rem" }}>
            {LA_DOSIS.map((d) => (
              <article key={d.que} style={tarjeta}>
                <div style={{ display: "flex", gap: "0.7rem", alignItems: "baseline", flexWrap: "wrap" }}>
                  <span style={{ ...rotulo, margin: 0 }}>{d.que}</span>
                  <span style={{ ...texto, margin: 0, color: "#e8c878" }}>{d.cuanto}</span>
                </div>
                <p style={{ ...texto, margin: "0.35rem 0 0" }}>{d.porQue}</p>
              </article>
            ))}
          </div>
        </Desplegable>

        <Desplegable titulo="Cuándo parar y cuándo preguntar">
          <p style={{ ...texto, maxWidth: "68ch", color: "rgba(232,200,120,0.95)" }}>{SEGURIDAD.intro}</p>
          <p style={{ ...rotulo, margin: "0 0 0.5rem" }}>Reglas que valen siempre</p>
          <ul style={{ ...lista, marginBottom: "1.2rem" }}>
            {SEGURIDAD.reglas.map((r) => (
              <li key={r.slice(0, 20)} style={{ ...texto, margin: "0 0 0.5rem" }}>
                {r}
              </li>
            ))}
          </ul>
          <p style={{ ...rotulo, margin: "0 0 0.5rem" }}>Sin la pausa sin aire</p>
          <ul style={{ ...lista, marginBottom: "1.2rem" }}>
            {SEGURIDAD.sinPausa.map((c) => (
              <li key={c.slice(0, 20)} style={{ ...texto, margin: "0 0 0.5rem", color: "rgba(232,200,120,0.92)" }}>
                {c}
              </li>
            ))}
          </ul>
          <p style={{ ...rotulo, margin: "0 0 0.5rem" }}>Esto se conversa antes</p>
          <ul style={lista}>
            {SEGURIDAD.esperar.map((c) => (
              <li key={c.slice(0, 20)} style={{ ...texto, margin: "0 0 0.5rem", color: "rgba(221,148,100,0.92)" }}>
                {c}
              </li>
            ))}
          </ul>
        </Desplegable>

        <Desplegable titulo="Dónde queda lo tuyo">
          <p style={{ ...texto, maxWidth: "68ch", marginBottom: 0 }}>{DONDE_QUEDA}</p>
        </Desplegable>

        <p style={{ ...texto, marginTop: "2rem", maxWidth: "68ch" }}>
          De dónde vienen, qué está probado y qué no, por qué no reemplazan a los ejercicios de suelo
          pélvico y los mitos más repetidos:{" "}
          <Link prefetch={false} href="/biblioteca/hipopresivos" style={enlace}>
            en la biblioteca
          </Link>
          .
        </p>
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
  textWrap: "balance",
};

const texto: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "clamp(0.97rem, 2.1vw, 1.06rem)",
  lineHeight: 1.65,
  color: "rgba(217,203,170,0.82)",
  margin: "0 0 0.8rem",
};

const tarjeta: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.18)",
  background: "rgba(12,22,12,0.62)",
  borderRadius: 6,
  padding: "0.9rem 1.1rem",
  minWidth: 0,
};

const lista: CSSProperties = { listStyle: "none", margin: 0, padding: 0 };

const numero: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.7rem",
  color: "rgba(200,160,80,0.85)",
  flexShrink: 0,
  minWidth: "1.1rem",
};

const fuente: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.82rem",
  fontStyle: "italic",
  color: "rgba(217,203,170,0.7)",
  margin: 0,
};

const enlace: CSSProperties = { color: "rgba(200,160,80,0.85)" };

import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BackButton } from "@/components/BackButton";
import { BotonInstalar } from "@/components/BotonInstalar";
import { BarraFlorecer } from "@/components/florecer/BarraFlorecer";
import { RegistrarServiceWorker } from "@/components/lab/RegistrarServiceWorker";
import { Desplegable } from "@/components/florecer/Desplegable";
import { Sincroniza } from "@/components/florecer/Sincroniza";
import { Practica } from "@/components/meditacion/Practica";
import { SoloMusica } from "@/components/meditacion/SoloMusica";
import {
  DONDE_QUEDA,
  EN_UNA_LINEA,
  LOS_CINCO_PASOS,
  NOMBRE_FAMILIA,
  OBSTACULOS,
  POSTURA,
  RIESGOS,
  TECNICAS,
} from "@/lib/meditacion/ciencia";

/* Meditación dentro de Florecer: la práctica.

   Acá va lo que se usa con la app abierta —sentarse un rato con una técnica,
   o poner música y un tiempo—, y debajo, plegado, lo que hace falta tener a
   mano mientras se practica: cómo se sienta uno, las técnicas, los tropiezos
   de siempre y cuándo parar.

   La teoría completa —qué es, de dónde viene, qué está probado, qué no hace,
   el cerebro, los mitos— vive en la biblioteca, en /biblioteca/meditacion. Es
   para leer, no para tener delante mientras meditas. */

export const metadata: Metadata = {
  title: "Meditación — El Floema",
  description:
    "Quince prácticas guiadas de 1 a 20 minutos, y música sola con temporizador: mar, río, lluvia, bosque, piano o un tono sostenido.",
  manifest: "/florecer/manifest.webmanifest",
  icons: { apple: "/icon-flor-180.png" },
};

export default function MeditacionPage() {
  return (
    <main
      className="meditacion-bg con-barra-florecer"
      style={{ minHeight: "100vh", padding: "clamp(78px, 9vh, 96px) clamp(16px, 5vw, 64px) 80px" }}
    >
      <div style={{ maxWidth: 940, margin: "0 auto", minWidth: 0 }}>
        <RegistrarServiceWorker />
        <Sincroniza />
        <BackButton href="/florecer" />

        <header style={{ margin: "0 0 1.1rem" }}>
          <p style={rotulo}>Cuidado de la atención</p>
          <h1 style={h1}>Meditación</h1>
          <p style={{ ...texto, marginTop: "0.7rem", maxWidth: "54ch", color: "rgba(217,203,170,0.9)" }}>
            {EN_UNA_LINEA}
          </p>
        </header>

        <BotonInstalar nombre="Florecer" />

        <Practica />

        <div style={{ marginTop: "1rem" }}>
          <SoloMusica />
        </div>

        {/* ── Lo que conviene tener a mano, plegado ── */}
        <Desplegable titulo="Cómo se hace, paso a paso">
          <p style={{ ...texto, maxWidth: "66ch" }}>
            Cinco pasos, y el resto es repetición. Lo de la postura no es estética: es lo que decide
            si a los diez minutos estás practicando o aguantando.
          </p>
          <ol style={{ ...lista, marginBottom: "1.4rem" }}>
            {LOS_CINCO_PASOS.map((p, i) => (
              <li key={p.slice(0, 20)} style={{ ...texto, display: "flex", gap: "0.7rem", margin: "0 0 0.7rem" }}>
                <span style={numero}>{i + 1}</span>
                <span style={{ flex: 1, minWidth: 0 }}>{p}</span>
              </li>
            ))}
          </ol>
          <h3 style={h3}>El cuerpo, parte por parte</h3>
          <div style={{ display: "grid", gap: "0.7rem" }}>
            {POSTURA.map((d) => (
              <article key={d.parte} style={tarjeta}>
                <p style={{ ...rotulo, margin: "0 0 0.35rem" }}>{d.parte}</p>
                <p style={{ ...texto, margin: "0 0 0.4rem", color: "rgba(232,200,120,0.92)" }}>{d.como}</p>
                <p style={{ ...texto, margin: 0 }}>{d.porQue}</p>
              </article>
            ))}
          </div>
        </Desplegable>

        <Desplegable titulo={`Las ${TECNICAS.length} técnicas, explicadas`}>
          <p style={{ ...texto, maxWidth: "66ch" }}>
            Todas son la misma cosa con distinto objeto de atención. Son las mismas que están arriba
            en la práctica, con los mismos textos: no hay nada que la app sepa y esta página no diga.
          </p>
          <div style={{ display: "grid", gap: "1rem" }}>
            {TECNICAS.map((t) => (
              <article key={t.id} style={tarjeta} id={`tecnica-${t.id}`}>
                <div style={{ display: "flex", gap: "0.6rem", alignItems: "baseline", flexWrap: "wrap" }}>
                  <h3 style={{ ...h3, margin: 0 }}>{t.nombre}</h3>
                  <span style={insigniaFamilia}>{NOMBRE_FAMILIA[t.familia]}</span>
                  {t.tambien && <span style={fuente}>{t.tambien}</span>}
                </div>
                <p style={{ ...texto, margin: "0.6rem 0 0.5rem" }}>{t.queEs}</p>
                <ol style={lista}>
                  {t.pasos.map((p, i) => (
                    <li key={p.slice(0, 18)} style={{ ...texto, display: "flex", gap: "0.6rem", margin: "0 0 0.45rem" }}>
                      <span style={numero}>{i + 1}</span>
                      <span style={{ flex: 1, minWidth: 0 }}>{p}</span>
                    </li>
                  ))}
                </ol>
                <p style={{ ...texto, margin: "0.7rem 0 0.3rem", color: "rgba(168,200,138,0.88)" }}>
                  Para qué: {t.paraQue}
                </p>
                <p style={{ ...texto, margin: 0 }}>Rato: {t.minutos.join(", ")} minutos.</p>
                {t.ojo && (
                  <p style={{ ...texto, margin: "0.5rem 0 0", color: "rgba(221,148,100,0.92)" }}>Ojo: {t.ojo}</p>
                )}
              </article>
            ))}
          </div>
        </Desplegable>

        <Desplegable titulo="Si te da sueño, si no puedes estar quieta…">
          <p style={{ ...texto, maxWidth: "66ch" }}>
            No son fallas tuyas: están descritos y nombrados desde hace más de dos mil años, lo que
            dice bastante de cuán universales son. Los nombres en cursiva vienen de los textos
            budistas —son tradición, no un hallazgo de laboratorio—, pero lo que describen es
            exactamente lo que te va a pasar el jueves.
          </p>
          <div style={{ display: "grid", gap: "0.8rem" }}>
            {OBSTACULOS.map((o) => (
              <article key={o.que} style={tarjeta}>
                <h3 style={{ ...h3, margin: "0 0 0.2rem" }}>{o.que}</h3>
                {o.tradicion && <p style={{ ...fuente, margin: "0 0 0.5rem" }}>{o.tradicion}</p>}
                <p style={{ ...texto, margin: "0 0 0.45rem" }}>{o.porQue}</p>
                <p style={{ ...texto, margin: 0, color: "rgba(168,200,138,0.9)" }}>{o.queHacer}</p>
              </article>
            ))}
          </div>
        </Desplegable>

        <Desplegable titulo="Cuándo tener cuidado">
          <p style={{ ...texto, margin: "0 0 0.6rem", color: "rgba(232,200,120,0.95)", maxWidth: "66ch" }}>
            {RIESGOS.intro}
          </p>
          <p style={{ ...texto, maxWidth: "66ch" }}>{RIESGOS.hallazgo}</p>
          <p style={{ ...fuente, marginBottom: "1.1rem" }}>{RIESGOS.fuente}</p>

          <p style={{ ...rotulo, margin: "0 0 0.5rem" }}>En qué casos</p>
          <ul style={{ ...lista, marginBottom: "1.1rem" }}>
            {RIESGOS.cuidado.map((c) => (
              <li key={c.slice(0, 20)} style={{ ...texto, margin: "0 0 0.5rem", color: "rgba(221,148,100,0.92)" }}>
                {c}
              </li>
            ))}
          </ul>

          <p style={{ ...rotulo, margin: "0 0 0.5rem" }}>Qué hacer siempre</p>
          <ul style={lista}>
            {RIESGOS.reglas.map((r) => (
              <li key={r.slice(0, 20)} style={{ ...texto, margin: "0 0 0.5rem" }}>
                {r}
              </li>
            ))}
          </ul>
        </Desplegable>

        <Desplegable titulo="Dónde queda lo tuyo">
          <p style={{ ...texto, maxWidth: "68ch", marginBottom: 0 }}>{DONDE_QUEDA}</p>
        </Desplegable>

        <p style={{ ...texto, marginTop: "2rem", maxWidth: "68ch" }}>
          Toda la teoría —qué es meditar, de dónde viene, qué está probado y qué no, qué pasa en el
          cerebro, los mitos y un plan de ocho semanas— está en{" "}
          <Link href="/biblioteca/meditacion" style={enlace}>
            la biblioteca
          </Link>
          , junto a la del yoga y la del drenaje.
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

const h3: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "1.02rem",
  color: "#e8c878",
  letterSpacing: "0.04em",
  margin: "0 0 0.7rem",
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
  padding: "0.95rem 1.15rem",
  minWidth: 0,
};

const lista: CSSProperties = { listStyle: "none", margin: 0, padding: 0 };

const numero: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.7rem",
  color: "rgba(200,160,80,0.85)",
  flexShrink: 0,
  paddingTop: "0.2rem",
  minWidth: "1.1rem",
};

const fuente: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.8rem",
  fontStyle: "italic",
  color: "rgba(217,203,170,0.7)",
  margin: 0,
};

const enlace: CSSProperties = { color: "rgba(200,160,80,0.85)" };

const insigniaFamilia: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.66rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "rgba(168,200,138,0.8)",
  border: "1px solid rgba(168,200,138,0.4)",
  borderRadius: 3,
  padding: "0.16rem 0.45rem",
};

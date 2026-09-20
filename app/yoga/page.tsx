import type { Metadata } from "next";
import Link from "next/link";
import { BackButton } from "@/components/BackButton";
import { BotonInstalar } from "@/components/BotonInstalar";
import { RegistrarServiceWorker } from "@/components/lab/RegistrarServiceWorker";
import { Yoga } from "@/components/yoga/Yoga";
import { CATALOGO } from "@/lib/yoga/armar";
import { SECUENCIAS } from "@/lib/yoga/secuencias";
import { AVISOS_CUIDADO, CADA_CUANTO, ETIQUETA_GRADO, EVIDENCIA, MITOS, SOBRE_MUSICA } from "@/lib/yoga/evidencia";
import { ESTILOS, OBJETIVOS, type Objetivo } from "@/lib/yoga/tipos";

/* Ritual de yoga: arma la práctica según lo que cada persona necesita, la guía
   paso a paso y deja las preferencias guardadas.

   El texto de esta página dice, para cada objetivo, qué está probado y qué no,
   con la referencia que está descargada en la biblioteca científica del
   proyecto (biblioteca-cientifica/yoga/). Es una sección de cuidado del
   cuerpo, no un tratamiento. */

export const metadata: Metadata = {
  title: "Ritual de yoga — El Floema",
  description:
    "Arma tu práctica de yoga según lo que necesites, con todos los estilos, y síguela paso a paso. Responde una vez y queda guardada.",
  manifest: "/yoga/manifest.webmanifest",
};

const POSTURAS_TOTAL = CATALOGO.filter((p) => p.familia !== "respiracion" && p.familia !== "quietud").length;
const RESPIRACIONES_TOTAL = CATALOGO.filter((p) => p.familia === "respiracion").length;
const SERIES_TOTAL = SECUENCIAS.length;

export default function YogaPage() {
  return (
    <main
      className="yoga-bg"
      style={{ minHeight: "100vh", padding: "clamp(78px, 9vh, 96px) clamp(16px, 5vw, 64px) 80px" }}
    >
      <div style={{ maxWidth: 940, margin: "0 auto" }}>
        <RegistrarServiceWorker />
        <BackButton />

        {/* Cabecera corta a propósito: lo primero que tiene que aparecer al
            entrar es la práctica. La presentación larga va más abajo. */}
        <header style={{ margin: "0 0 1.1rem" }}>
          <p style={rotulo}>Cuidado del cuerpo</p>
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
            Ritual de yoga
          </h1>
        </header>

        <BotonInstalar nombre="el Ritual de yoga" />

        <Yoga />

        <section style={{ marginTop: "2.4rem" }}>
          <p
            style={{
              fontFamily: "var(--font-crimson), serif",
              fontSize: "clamp(1rem, 2.2vw, 1.14rem)",
              lineHeight: 1.65,
              color: "rgba(217,203,170,0.8)",
              maxWidth: "58ch",
              margin: 0,
            }}
          >
            Dime qué necesitas, cuánto rato tienes y qué hay que cuidar. Te armo la práctica con
            posturas y secuencias de todos los estilos, te la dibujo y te la voy pasando sola.
            Respondes una vez: de ahí en adelante, al entrar ya está lista.
          </p>
          <p style={{ ...fuente, marginTop: "0.9rem" }}>
            {POSTURAS_TOTAL} posturas, {RESPIRACIONES_TOTAL} respiraciones y {SERIES_TOTAL} series de
            hatha, vinyasa, ashtanga, iyengar, yin, restaurativo, kundalini, yoga nidra, silla y
            somático.
          </p>
        </section>

        {/* ── Qué está probado, objetivo por objetivo ── */}
        <section style={{ marginTop: "3rem" }}>
          <h2 style={titulo2}>Qué está probado, para cada cosa</h2>
          <p style={{ ...texto, maxWidth: "62ch" }}>
            Esto no es decoración: es la razón por la que la práctica se arma de una forma y no de
            otra. Cada referencia está descargada en la biblioteca del proyecto, así que se puede ir a
            revisar.
          </p>
          <div style={{ display: "grid", gap: "0.9rem" }}>
            {(Object.keys(EVIDENCIA) as Objetivo[]).map((id) => {
              const e = EVIDENCIA[id];
              const label = OBJETIVOS.find((o) => o.id === id)?.label ?? id;
              return (
                <article key={id} style={tarjeta}>
                  <div style={{ display: "flex", gap: "0.7rem", alignItems: "baseline", flexWrap: "wrap" }}>
                    <p style={{ ...texto, color: "#e8c878", margin: 0, fontSize: "1.02rem" }}>{label}</p>
                    <span style={insignia(e.grado)}>{ETIQUETA_GRADO[e.grado]}</span>
                  </div>
                  <p style={{ ...texto, margin: "0.5rem 0 0.4rem" }}>{e.dice}</p>
                  <p style={{ ...texto, margin: "0 0 0.5rem", color: "rgba(221,148,100,0.9)" }}>{e.matiz}</p>
                  <p style={fuente}>
                    {e.fuente} · biblioteca-cientifica/{e.carpeta}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── Mitos ── */}
        <section style={{ marginTop: "2.6rem" }}>
          <h2 style={titulo2}>Lo que se dice del yoga y no es así</h2>
          <div style={{ display: "grid", gap: "0.8rem" }}>
            {MITOS.map((m) => (
              <article key={m.dice} style={{ ...tarjeta, padding: "0.9rem 1.1rem" }}>
                <p style={{ ...texto, color: "rgba(221,148,100,0.9)", margin: "0 0 0.35rem" }}>
                  «{m.dice}»
                </p>
                <p style={{ ...texto, margin: 0 }}>{m.realidad}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Música ── */}
        <section style={{ marginTop: "2.6rem" }}>
          <h2 style={titulo2}>La música de fondo, sin cuentos</h2>
          <p style={{ ...texto, maxWidth: "62ch" }}>
            La app genera la música en vivo: para relajar, un acorde grave que sube y baja seis veces
            por minuto, al mismo ritmo de la respiración lenta; para activar, un pulso suave a 96 por
            minuto. Lo que se vende junto con la música «sanadora» tiene evidencia muy distinta:
          </p>
          <div style={{ display: "grid", gap: "0.8rem" }}>
            {SOBRE_MUSICA.map((m) => (
              <article key={m.tema} style={tarjeta}>
                <div style={{ display: "flex", gap: "0.7rem", alignItems: "baseline", flexWrap: "wrap" }}>
                  <p style={{ ...texto, color: "#e8c878", margin: 0, fontSize: "1.02rem" }}>{m.tema}</p>
                  <span style={insignia(m.grado)}>{ETIQUETA_GRADO[m.grado]}</span>
                </div>
                <p style={{ ...texto, margin: "0.5rem 0 0.4rem" }}>{m.dice}</p>
                <p style={fuente}>{m.fuente} · biblioteca-cientifica/yoga/musica_frecuencias</p>
              </article>
            ))}
          </div>
        </section>

        {/* ── Estilos ── */}
        <section style={{ marginTop: "2.6rem" }}>
          <h2 style={titulo2}>Los estilos, en una línea cada uno</h2>
          <p style={{ ...texto, maxWidth: "62ch" }}>
            No hay un estilo mejor: hay uno que calza con lo que necesitas hoy. Puedes marcar varios,
            o ninguno y dejar que la práctica salga clásica.
          </p>
          <div style={{ display: "grid", gap: "0.6rem", gridTemplateColumns: "repeat(auto-fit,minmax(16rem,1fr))" }}>
            {ESTILOS.map((e) => (
              <article key={e.id} style={{ ...tarjeta, padding: "0.85rem 1rem" }}>
                <p style={{ ...texto, color: "#e8c878", margin: "0 0 0.25rem" }}>{e.label}</p>
                <p style={{ ...texto, margin: "0 0 0.3rem", fontSize: "0.92rem" }}>{e.detalle}</p>
                <p style={{ ...texto, margin: 0, fontSize: "0.9rem", opacity: 0.75 }}>{e.sensacion}</p>
              </article>
            ))}
          </div>
          <p style={{ ...texto, marginTop: "1rem", maxWidth: "62ch", opacity: 0.8 }}>
            Falta uno a propósito: el <strong>bikram o yoga caliente</strong>, que se hace en una sala
            a unos 40 °C. No se puede armar en casa y el calor agrega riesgo propio — golpe de calor y
            deshidratación —, así que no entra en las rutinas.
          </p>
        </section>

        {/* ── Cada cuánto ── */}
        <section style={{ marginTop: "2.6rem" }}>
          <h2 style={titulo2}>Cada cuánto, según para qué</h2>
          <p style={{ ...texto, maxWidth: "62ch" }}>
            Estas frecuencias no son una regla espiritual: son la dosis que usaron los propios
            estudios. Si algo funcionó a las doce semanas, no lo esperes en tres días.
          </p>
          <div style={{ overflowX: "auto", border: "1px solid rgba(200,160,80,0.2)", borderRadius: 8 }}>
            <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 560 }}>
              <thead>
                <tr>
                  {["Para qué", "Cada cuánto", "De dónde sale"].map((h) => (
                    <th key={h} style={encabezado}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {CADA_CUANTO.map((p) => (
                  <tr key={p.caso}>
                    <td style={{ ...celda, color: "#e8c878" }}>{p.caso}</td>
                    <td style={celda}>{p.frecuencia}</td>
                    <td style={{ ...celda, opacity: 0.62, fontStyle: "italic" }}>{p.fuente}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Seguridad ── */}
        <section style={{ marginTop: "2.6rem" }}>
          <div
            style={{
              border: "1px solid rgba(221,148,100,0.34)",
              background: "rgba(221,148,100,0.07)",
              borderRadius: 8,
              padding: "clamp(1rem, 3vw, 1.5rem)",
            }}
          >
            <p style={{ ...rotulo, color: "#dd9464" }}>Lo que de verdad hay que cuidar</p>
            <h2 style={{ ...titulo2, marginTop: "0.3rem", marginBottom: "0.8rem" }}>
              Cuándo una postura no se hace
            </h2>
            <p style={texto}>
              Existe una revisión sistemática dedicada solo a los eventos adversos del yoga
              (Journal of Integrative Medicine, 2026, en la carpeta yoga/seguridad_lesiones). La
              mayoría de lo que aparece ahí es prevenible. Cuando marcas algo en la app, estas
              posturas salen solas de tu rutina.
            </p>
            <div style={{ display: "grid", gap: "0.6rem", marginTop: "1rem" }}>
              {(Object.keys(AVISOS_CUIDADO) as (keyof typeof AVISOS_CUIDADO)[])
                .flatMap((c) => AVISOS_CUIDADO[c].map((a) => ({ c, a })))
                .map(({ c, a }) => (
                  <p
                    key={c}
                    style={{
                      ...texto,
                      margin: 0,
                      color: a.tono === "cuidado" ? "rgba(221,148,100,0.92)" : "rgba(217,203,170,0.82)",
                    }}
                  >
                    {a.texto}
                  </p>
                ))}
            </div>
            <p style={{ ...texto, marginTop: "1rem", marginBottom: 0, color: "rgba(221,148,100,0.9)" }}>
              Regla que vale para todo: la molestia sorda de un estiramiento se puede sostener. El
              dolor agudo, punzante, eléctrico o dentro de una articulación es señal de salir. Y si
              tienes una condición médica, esto se conversa con tu médica antes, no después.
            </p>
          </div>
        </section>

        <p style={{ ...fuente, marginTop: "2rem", textAlign: "center" }}>
          Los dibujos de cada postura están hechos a mano en la propia página. Lo que muestran es la
          forma: dónde va cada articulación, que es lo que de verdad importa.{" "}
          <Link href="/biblioteca" style={{ color: "rgba(200,160,80,0.8)" }}>
            Ver la biblioteca
          </Link>
          .
        </p>
      </div>
    </main>
  );
}

const rotulo = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.6rem",
  letterSpacing: "0.26em",
  textTransform: "uppercase" as const,
  color: "rgba(200,160,80,0.68)",
  margin: 0,
};
const titulo2 = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "clamp(1.1rem, 2.6vw, 1.45rem)",
  color: "#c8a050",
  letterSpacing: "0.08em",
  margin: "0 0 1.1rem",
  textWrap: "balance" as const,
};
const tarjeta = {
  border: "1px solid rgba(200,160,80,0.2)",
  background: "rgba(12,22,12,0.68)",
  borderRadius: 8,
  padding: "1rem 1.2rem",
};
const texto = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.97rem",
  lineHeight: 1.65,
  color: "rgba(217,203,170,0.82)",
  margin: "0 0 0.7rem",
};
const celda = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.92rem",
  lineHeight: 1.5,
  color: "rgba(217,203,170,0.82)",
  padding: "0.75rem 0.9rem",
  borderBottom: "1px solid rgba(200,160,80,0.1)",
  verticalAlign: "top" as const,
};
const encabezado = {
  textAlign: "left" as const,
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.58rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase" as const,
  color: "#c8a050",
  padding: "0.7rem 0.9rem",
  background: "rgba(200,160,80,0.07)",
  borderBottom: "1px solid rgba(200,160,80,0.2)",
};
const fuente = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.8rem",
  fontStyle: "italic" as const,
  color: "rgba(217,203,170,0.45)",
  margin: 0,
};

function insignia(grado: keyof typeof ETIQUETA_GRADO) {
  const color =
    grado === "probado"
      ? "rgba(168,200,138,0.9)"
      : grado === "prometedor"
        ? "rgba(200,160,80,0.9)"
        : "rgba(221,148,100,0.9)";
  return {
    fontFamily: "var(--font-grimoire)",
    fontSize: "0.54rem",
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color,
    border: `1px solid ${color}`,
    borderRadius: 3,
    padding: "0.18rem 0.5rem",
  };
}

import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BackButton } from "@/components/BackButton";
import { BarraFlorecer } from "@/components/florecer/BarraFlorecer";
import { BotonInstalar } from "@/components/BotonInstalar";
import { RegistrarServiceWorker } from "@/components/lab/RegistrarServiceWorker";
import { Desplegable } from "@/components/florecer/Desplegable";
import { Sincroniza } from "@/components/florecer/Sincroniza";
import { Fuerza } from "@/components/fuerza/Fuerza";
import { CALENTAMIENTO, TOTAL_EJERCICIOS } from "@/lib/fuerza/armar";
import { EJERCICIOS, escalera } from "@/lib/fuerza/ejercicios";
import { COMO_SUBIR, DONDE_QUEDA, EN_UNA_LINEA, LA_DOSIS, PROTEINA, SEGURIDAD } from "@/lib/fuerza/ciencia";
import { MUSCULOS_PATRON, NOMBRE_EQUIPO, NOMBRE_PATRON, type Patron } from "@/lib/fuerza/tipos";

/* Fuerza dentro de Florecer: la práctica.

   Arriba, la sesión del día ya armada. Debajo, plegado, lo que hace falta
   tener a mano: las escaleras completas de cada movimiento, la dosis en
   números, cómo se sube, la proteína y cuándo parar.

   La teoría —por qué la masa muscular se pierde desde los treinta, qué está
   probado, los mitos del gimnasio— vive en la biblioteca, en
   /biblioteca/fuerza. */

export const metadata: Metadata = {
  title: "Fuerza — El Floema",
  description:
    "Rutina de fuerza con el propio cuerpo para mujeres adultas: se arma sola según lo que tengas en casa y sube de peldaño cuando te queda corta.",
  manifest: "/florecer/manifest.webmanifest",
  icons: { apple: "/icon-flor-180.png" },
};

const PATRONES = Object.keys(NOMBRE_PATRON) as Patron[];

export default function FuerzaPage() {
  return (
    <main
      className="fuerza-bg"
      style={{ minHeight: "100vh", padding: "clamp(78px, 9vh, 96px) clamp(16px, 5vw, 64px) 80px" }}
    >
      <div style={{ maxWidth: 940, margin: "0 auto", minWidth: 0 }}>
        <RegistrarServiceWorker />
        <Sincroniza />
        <BackButton />

        <header style={{ margin: "0 0 1.1rem" }}>
          <p style={rotulo}>Cuidado de la fuerza</p>
          <h1 style={h1}>Fuerza</h1>
          <p style={{ ...texto, marginTop: "0.7rem", maxWidth: "56ch", color: "rgba(217,203,170,0.9)" }}>
            {EN_UNA_LINEA}
          </p>
        </header>

        <BotonInstalar nombre="Florecer" />

        <Fuerza />

        <Desplegable titulo="Antes de empezar: el calentamiento">
          <ol style={lista}>
            {CALENTAMIENTO.map((c, i) => (
              <li key={c.slice(0, 18)} style={{ ...texto, display: "flex", gap: "0.7rem", margin: "0 0 0.6rem" }}>
                <span style={numero}>{i + 1}</span>
                <span style={{ flex: 1, minWidth: 0 }}>{c}</span>
              </li>
            ))}
          </ol>
          <p style={{ ...texto, marginBottom: 0 }}>
            Cuatro o cinco minutos. No hace falta estirar antes: estirar en frío no previene
            lesiones, y estirar fuerte justo antes baja un poco la fuerza de ese día.
          </p>
        </Desplegable>

        <Desplegable titulo={`Las escaleras: ${TOTAL_EJERCICIOS} ejercicios`}>
          <p style={{ ...texto, maxWidth: "66ch" }}>
            Cada movimiento tiene su escalera, del primer peldaño al último. Así es como se sube la
            carga sin pesas: no cambias de ejercicio, cambias de peldaño del mismo ejercicio. La app
            te sube sola cuando llegas al tope del rango en todas las series.
          </p>
          {PATRONES.map((p) => {
            const chain = escalera(p);
            if (chain.length === 0) return null;
            return (
              <section key={p} style={{ marginBottom: "1.6rem" }}>
                <h3 style={h3}>{NOMBRE_PATRON[p]}</h3>
                <p style={{ ...texto, margin: "0 0 0.7rem", opacity: 0.8 }}>{MUSCULOS_PATRON[p]}</p>
                <ol style={lista}>
                  {chain.map((e, i) => (
                    <li key={e.id} style={{ ...tarjeta, marginBottom: "0.55rem" }}>
                      <div style={{ display: "flex", gap: "0.6rem", alignItems: "baseline", flexWrap: "wrap" }}>
                        <span style={numero}>{i + 1}</span>
                        <span style={{ ...texto, margin: 0, color: "#e8c878", fontSize: "1.02rem" }}>{e.nombre}</span>
                        {e.tambien && <span style={fuente}>{e.tambien}</span>}
                      </div>
                      <p style={{ ...texto, margin: "0.4rem 0 0.4rem" }}>{e.que}</p>
                      <p style={{ ...texto, margin: 0, opacity: 0.75, fontSize: "0.92rem" }}>
                        {e.series} series de{" "}
                        {e.porTiempo ? `${e.repes[0]} a ${e.repes[1]} segundos` : `${e.repes[0]} a ${e.repes[1]} repeticiones`}
                        {e.equipo.length > 0
                          ? ` · hace falta: ${e.equipo.map((q) => NOMBRE_EQUIPO[q].toLowerCase()).join(", ")}`
                          : " · sin nada"}
                      </p>
                      {e.criterio && (
                        <p style={{ ...texto, margin: "0.4rem 0 0", color: "rgba(168,200,138,0.88)", fontSize: "0.92rem" }}>
                          Para subir: {e.criterio}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
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

        <Desplegable titulo="Cómo se sube sin pesas">
          {COMO_SUBIR.map((c) => (
            <p key={c.slice(0, 20)} style={{ ...texto, maxWidth: "68ch" }}>
              {c}
            </p>
          ))}
        </Desplegable>

        <Desplegable titulo="Proteína: lo que hay que comer">
          <p style={{ ...texto, maxWidth: "68ch" }}>{PROTEINA.intro}</p>
          <p style={{ ...texto, maxWidth: "68ch", color: "rgba(232,200,120,0.92)" }}>{PROTEINA.cuanto}</p>
          <p style={{ ...texto, maxWidth: "68ch" }}>{PROTEINA.reparto}</p>
          <div style={tarjeta}>
            <p style={{ ...rotulo, margin: "0 0 0.5rem" }}>Para hacerte una idea</p>
            {PROTEINA.ejemplos.map((x) => (
              <p key={x} style={{ ...texto, margin: "0 0 0.25rem", fontSize: "0.95rem" }}>
                {x}
              </p>
            ))}
          </div>
          <p style={{ ...texto, marginTop: "0.9rem", marginBottom: 0, color: "rgba(221,148,100,0.9)" }}>
            {PROTEINA.ojo}
          </p>
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
          <p style={{ ...rotulo, margin: "0 0 0.5rem" }}>Esto se conversa antes</p>
          <ul style={lista}>
            {SEGURIDAD.cuando.map((c) => (
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
          Por qué la masa muscular empieza a caer desde los treinta, qué pasa en la menopausia, qué
          está probado y qué no, y los mitos del gimnasio desarmados uno por uno:{" "}
          <Link href="/biblioteca/fuerza" style={enlace}>
            en la biblioteca
          </Link>
          .
        </p>
        <p style={{ ...fuente, marginTop: "0.8rem" }}>
          {EJERCICIOS.length} ejercicios repartidos en {PATRONES.length} patrones de movimiento. Las
          ilustraciones vienen después: por ahora cada uno está descrito paso a paso.
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
  fontSize: "1rem",
  color: "#e8c878",
  letterSpacing: "0.04em",
  margin: "0 0 0.2rem",
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
  color: "rgba(200,160,80,0.75)",
  flexShrink: 0,
  paddingTop: "0.2rem",
  minWidth: "1.1rem",
};

const fuente: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.8rem",
  fontStyle: "italic",
  color: "rgba(217,203,170,0.45)",
  margin: 0,
};

const enlace: CSSProperties = { color: "rgba(200,160,80,0.85)" };

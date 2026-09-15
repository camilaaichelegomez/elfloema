"use client";

import { useState, type CSSProperties } from "react";
import type { Rutina } from "@/lib/yoga/armar";

/* La guía que responde dudas sobre ESTA práctica.

   No es un chat general de yoga: se le manda la rutina que la persona tiene
   armada, con sus cuidados y sus props, así que cuando alguien pregunta «esta
   postura me tira la rodilla, ¿qué hago?» ya sabe cuál postura es y qué tiene
   a mano para cambiarla. */

const SUGERENCIAS = [
  "¿Por qué me pusiste estas posturas?",
  "Me tira la espalda baja, ¿qué cambio?",
  "No tengo bloque, ¿con qué lo reemplazo?",
  "¿Cada cuánto conviene hacerla?",
];

export function AsesorYoga({ rutina }: { rutina: Rutina }) {
  const [abierto, setAbierto] = useState(false);
  const [pregunta, setPregunta] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mensajes, setMensajes] = useState<{ de: "yo" | "guia"; texto: string }[]>([]);

  async function preguntar(texto: string) {
    const limpio = texto.trim();
    if (!limpio || cargando) return;
    setMensajes((m) => [...m, { de: "yo", texto: limpio }]);
    setPregunta("");
    setCargando(true);
    try {
      const res = await fetch("/api/yoga", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pregunta: limpio,
          prefs: rutina.prefs,
          pasos: rutina.pasos.map((p) => ({
            nombre: p.nombre,
            sanscrito: p.sanscrito,
            fase: p.fase,
            duracion: p.duracion,
            cuidado: p.cuidado,
            masFacil: p.masFacil,
          })),
          historial: mensajes.slice(-6),
        }),
      });
      const datos = await res.json();
      setMensajes((m) => [
        ...m,
        {
          de: "guia",
          texto: datos.respuesta ?? "No pude responder ahora. Intenta de nuevo en un momento.",
        },
      ]);
    } catch {
      setMensajes((m) => [
        ...m,
        { de: "guia", texto: "Me quedé sin conexión. Intenta de nuevo cuando vuelva." },
      ]);
    } finally {
      setCargando(false);
    }
  }

  if (!abierto) {
    return (
      <button type="button" onClick={() => setAbierto(true)} style={{ ...boton, marginTop: "1.6rem" }}>
        Preguntar algo sobre esta práctica
      </button>
    );
  }

  return (
    <section style={caja}>
      <p style={rotulo}>Pregúntale a la guía</p>
      <p style={ayuda}>
        Sabe qué posturas te tocaron hoy y qué marcaste que hay que cuidar. No reemplaza a un
        profesor: si algo duele, para.
      </p>

      {mensajes.length === 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.9rem" }}>
          {SUGERENCIAS.map((s) => (
            <button key={s} type="button" onClick={() => preguntar(s)} style={sugerencia}>
              {s}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: "grid", gap: "0.6rem", marginBottom: "0.9rem" }}>
        {mensajes.map((m, i) => (
          <p
            key={i}
            style={{
              ...ayuda,
              margin: 0,
              padding: "0.6rem 0.8rem",
              borderRadius: 5,
              whiteSpace: "pre-wrap",
              color: m.de === "yo" ? "#e8c878" : "rgba(217,203,170,0.85)",
              background: m.de === "yo" ? "rgba(200,160,80,0.1)" : "rgba(13,26,13,0.55)",
              border: "1px solid rgba(200,160,80,0.16)",
            }}
          >
            {m.texto}
          </p>
        ))}
        {cargando && <p style={{ ...ayuda, margin: 0 }}>Pensando…</p>}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          void preguntar(pregunta);
        }}
        style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
      >
        <input
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          placeholder="Escribe tu duda"
          style={entrada}
        />
        <button type="submit" disabled={cargando || !pregunta.trim()} style={boton}>
          Preguntar
        </button>
      </form>
    </section>
  );
}

const caja: CSSProperties = {
  marginTop: "1.6rem",
  border: "1px solid rgba(200,160,80,0.2)",
  background: "rgba(10,18,10,0.5)",
  borderRadius: 7,
  padding: "1rem 1.1rem",
};
const rotulo: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.6rem",
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: "rgba(200,160,80,0.75)",
  margin: "0 0 0.5rem",
};
const ayuda: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.92rem",
  lineHeight: 1.6,
  color: "rgba(217,203,170,0.62)",
  margin: "0 0 0.9rem",
};
const entrada: CSSProperties = {
  flex: "1 1 200px",
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.95rem",
  color: "#d9cbaa",
  background: "rgba(13,26,13,0.6)",
  border: "1px solid rgba(200,160,80,0.28)",
  borderRadius: 5,
  padding: "0.6rem 0.8rem",
  minHeight: 44,
};
const boton: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.68rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#c8a050",
  background: "transparent",
  border: "1px solid rgba(200,160,80,0.45)",
  borderRadius: 4,
  padding: "0 1.2rem",
  minHeight: 44,
  cursor: "pointer",
};
const sugerencia: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.86rem",
  color: "#d4c4a0",
  background: "rgba(13,26,13,0.5)",
  border: "1px solid rgba(200,160,80,0.22)",
  borderRadius: 20,
  padding: "0.4rem 0.8rem",
  cursor: "pointer",
};

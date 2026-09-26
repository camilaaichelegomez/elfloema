"use client";

import { useState, type CSSProperties } from "react";
import { createClient } from "@/lib/supabase-browser";

// Moderación de los comentarios de la web. Arriba, los pendientes: nada se
// publica hasta que se aprueba. Los aprobados se pueden ocultar de nuevo.

export type ComentarioFila = {
  id: number;
  pagina: string;
  nombre: string | null;
  texto: string;
  aprobado: boolean;
  creado: string;
};

const GOLD = "#c8a050";
const CREAM = "#d4c4a0";
const fecha = (iso: string) =>
  new Date(iso).toLocaleString("es-CL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export function ComentariosManager({ inicial }: { inicial: ComentarioFila[] }) {
  const [filas, setFilas] = useState(inicial);
  const [error, setError] = useState<string | null>(null);

  async function aprobar(c: ComentarioFila, aprobado: boolean) {
    setError(null);
    setFilas((xs) => xs.map((x) => (x.id === c.id ? { ...x, aprobado } : x)));
    const { error: err } = await createClient().from("comentarios").update({ aprobado }).eq("id", c.id);
    if (err) {
      setFilas((xs) => xs.map((x) => (x.id === c.id ? { ...x, aprobado: !aprobado } : x)));
      setError(`No se pudo guardar: ${err.message}`);
    }
  }

  async function borrar(c: ComentarioFila) {
    if (!window.confirm("¿Borrar este comentario para siempre?")) return;
    setError(null);
    const { error: err } = await createClient().from("comentarios").delete().eq("id", c.id);
    if (err) {
      setError(`No se pudo borrar: ${err.message}`);
      return;
    }
    setFilas((xs) => xs.filter((x) => x.id !== c.id));
  }

  const pendientes = filas.filter((c) => !c.aprobado);
  const publicados = filas.filter((c) => c.aprobado);

  if (filas.length === 0) {
    return (
      <p style={{ ...nota, textAlign: "center", padding: "3rem 0" }}>
        Todavía no hay comentarios. Cuando alguien escriba en la web, aparecerá aquí para que lo apruebes.
      </p>
    );
  }

  return (
    <div style={{ display: "grid", gap: "2.2rem" }}>
      {error && <p style={{ ...nota, color: "#e05a4a", fontStyle: "normal" }}>{error}</p>}

      <Grupo titulo={`Por revisar (${pendientes.length})`} vacio="Nada pendiente. 🌿">
        {pendientes.map((c) => (
          <Tarjeta key={c.id} c={c}>
            <button type="button" onClick={() => aprobar(c, true)} style={botonPri}>Aprobar</button>
            <button type="button" onClick={() => borrar(c)} style={botonPeligro}>Borrar</button>
          </Tarjeta>
        ))}
      </Grupo>

      {publicados.length > 0 && (
        <Grupo titulo={`Publicados (${publicados.length})`}>
          {publicados.map((c) => (
            <Tarjeta key={c.id} c={c}>
              <button type="button" onClick={() => aprobar(c, false)} style={botonSec}>Ocultar</button>
              <button type="button" onClick={() => borrar(c)} style={botonPeligro}>Borrar</button>
            </Tarjeta>
          ))}
        </Grupo>
      )}
    </div>
  );
}

function Grupo({ titulo, vacio, children }: { titulo: string; vacio?: string; children: React.ReactNode[] }) {
  return (
    <section>
      <h2 style={tituloGrupo}>{titulo}</h2>
      {children.length === 0 ? <p style={nota}>{vacio}</p> : <div style={{ display: "grid", gap: "0.7rem" }}>{children}</div>}
    </section>
  );
}

function Tarjeta({ c, children }: { c: ComentarioFila; children: React.ReactNode }) {
  return (
    <article style={tarjeta}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.8rem", flexWrap: "wrap", marginBottom: "0.4rem" }}>
        <strong style={{ color: GOLD, fontFamily: "var(--font-cinzel), serif", fontSize: "0.8rem", letterSpacing: "0.08em" }}>
          {c.nombre || "Visitante"} <span style={{ color: "rgba(212,196,160,0.5)", fontWeight: 400 }}>· /{c.pagina}</span>
        </strong>
        <span style={{ color: "rgba(212,196,160,0.55)", fontSize: "0.8rem" }}>{fecha(c.creado)}</span>
      </div>
      <p style={{ margin: "0 0 0.8rem", color: CREAM, lineHeight: 1.65, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{c.texto}</p>
      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>{children}</div>
    </article>
  );
}

const nota: CSSProperties = { fontFamily: "var(--font-body)", fontStyle: "italic", color: CREAM, margin: 0 };
const tituloGrupo: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.85rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: GOLD,
  margin: "0 0 0.8rem",
};
const tarjeta: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.2)",
  background: "rgba(13,26,13,0.5)",
  borderRadius: 8,
  padding: "0.9rem 1.1rem",
};
const botonBase: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.64rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  borderRadius: 4,
  padding: "0 1.1rem",
  minHeight: 40,
  cursor: "pointer",
};
const botonPri: CSSProperties = { ...botonBase, color: "#0d1a0d", background: "rgba(200,160,80,0.92)", border: "none" };
const botonSec: CSSProperties = { ...botonBase, color: GOLD, background: "transparent", border: "1px solid rgba(200,160,80,0.45)" };
const botonPeligro: CSSProperties = { ...botonBase, color: "#f0a080", background: "transparent", border: "1px solid rgba(240,160,128,0.4)" };

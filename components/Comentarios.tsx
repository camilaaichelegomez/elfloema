"use client";

import { useEffect, useState, type CSSProperties, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";

// Sección «Deja tu comentario» para las páginas públicas. Los comentarios se
// guardan sin aprobar y solo se muestran cuando la dueña los aprueba en el Lab.
// Si la tabla todavía no existe en Supabase (supabase_comentarios.sql), la
// sección no se muestra, para no dejar un formulario roto.

type Comentario = { id: number; nombre: string | null; texto: string; creado: string };

const GOLD = "#c8a050";
const CREAM = "#d4c4a0";
const ESPERA_MS = 30_000;

export function Comentarios({ pagina }: { pagina: string }) {
  const [lista, setLista] = useState<Comentario[]>([]);
  const [disponible, setDisponible] = useState<boolean | null>(null);
  const [nombre, setNombre] = useState("");
  const [texto, setTexto] = useState("");
  const [trampa, setTrampa] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [aviso, setAviso] = useState<{ tipo: "ok" | "error"; msg: string } | null>(null);

  useEffect(() => {
    let vivo = true;
    supabase
      .from("comentarios")
      .select("id, nombre, texto, creado")
      .eq("pagina", pagina)
      .order("creado", { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (!vivo) return;
        if (error) {
          setDisponible(false);
          return;
        }
        setLista((data as Comentario[]) ?? []);
        setDisponible(true);
      });
    return () => {
      vivo = false;
    };
  }, [pagina]);

  async function enviar(e: FormEvent) {
    e.preventDefault();
    setAviso(null);
    if (trampa) return; // campo oculto: solo lo llenan los robots
    const limpio = texto.trim();
    if (limpio.length < 3) {
      setAviso({ tipo: "error", msg: "Escribe al menos unas palabras." });
      return;
    }
    try {
      const ultimo = Number(localStorage.getItem("comentario_ultimo") ?? 0);
      if (Date.now() - ultimo < ESPERA_MS) {
        setAviso({ tipo: "error", msg: "Espera unos segundos antes de enviar otro comentario." });
        return;
      }
    } catch {
      /* sin almacenamiento local: se sigue igual */
    }
    setEnviando(true);
    const { error } = await supabase.from("comentarios").insert({
      pagina,
      nombre: nombre.trim().slice(0, 40) || null,
      texto: limpio.slice(0, 600),
    });
    setEnviando(false);
    if (error) {
      setAviso({ tipo: "error", msg: "No se pudo enviar. Inténtalo de nuevo en un momento." });
      return;
    }
    try {
      localStorage.setItem("comentario_ultimo", String(Date.now()));
    } catch {
      /* ignorar */
    }
    setTexto("");
    setAviso({ tipo: "ok", msg: "¡Gracias! Tu comentario se publicará cuando lo revisemos." });
  }

  if (disponible === false || disponible === null) return null;

  return (
    <section aria-labelledby="comentarios-titulo" style={{ marginTop: "4rem" }}>
      <div style={{ height: 1, background: "linear-gradient(to right,transparent,rgba(200,160,80,0.35),transparent)", marginBottom: "2rem" }} />
      <h2 id="comentarios-titulo" style={titulo}>Deja tu comentario</h2>
      <p style={{ ...nota, marginBottom: "1.4rem" }}>
        Cuéntanos qué te pareció, qué te faltó o qué te gustaría aprender. Los comentarios se publican después de una revisión.
      </p>

      <form onSubmit={enviar} style={{ display: "grid", gap: "0.7rem", marginBottom: "2rem" }}>
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          maxLength={40}
          placeholder="Tu nombre (opcional)"
          aria-label="Tu nombre (opcional)"
          autoComplete="given-name"
          style={campo}
        />
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          maxLength={600}
          rows={4}
          required
          placeholder="Escribe tu comentario…"
          aria-label="Tu comentario"
          style={{ ...campo, resize: "vertical", minHeight: 110 }}
        />
        <input
          value={trampa}
          onChange={(e) => setTrampa(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          name="web"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />
        <div style={{ display: "flex", gap: "0.9rem", alignItems: "center", flexWrap: "wrap" }}>
          <button type="submit" disabled={enviando} style={boton}>
            {enviando ? "Enviando…" : "Enviar comentario"}
          </button>
          <span style={{ ...nota, fontSize: "0.78rem", opacity: 0.7 }}>{texto.length}/600 · No pongas datos personales.</span>
        </div>
        {aviso && (
          <p role="status" style={{ ...nota, margin: 0, color: aviso.tipo === "ok" ? "#a8c88a" : "#e0876a", fontStyle: "normal" }}>
            {aviso.msg}
          </p>
        )}
      </form>

      {lista.length > 0 && (
        <div style={{ display: "grid", gap: "0.8rem" }}>
          {lista.map((c) => (
            <article key={c.id} style={tarjeta}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "0.8rem", flexWrap: "wrap", marginBottom: "0.35rem" }}>
                <strong style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "0.78rem", letterSpacing: "0.08em", color: GOLD, fontWeight: 600 }}>
                  {c.nombre || "Visitante"}
                </strong>
                <time dateTime={c.creado} style={{ fontSize: "0.76rem", color: "rgba(212,196,160,0.55)" }}>
                  {new Date(c.creado).toLocaleDateString("es-CL", { day: "numeric", month: "short", year: "numeric" })}
                </time>
              </div>
              <p style={{ margin: 0, fontSize: "0.93rem", lineHeight: 1.7, color: CREAM, whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>{c.texto}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

const titulo: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "clamp(1.1rem,2.4vw,1.5rem)",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: GOLD,
  margin: "0 0 0.6rem",
};
const nota: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontStyle: "italic",
  fontSize: "0.95rem",
  lineHeight: 1.65,
  color: CREAM,
  margin: 0,
};
const campo: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "1rem",
  color: "#efe5c8",
  background: "rgba(8,13,8,0.75)",
  border: "1px solid rgba(200,160,80,0.3)",
  borderRadius: 6,
  padding: "0.7rem 0.85rem",
  width: "100%",
  boxSizing: "border-box",
};
const boton: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.68rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#0d1a0d",
  background: "rgba(200,160,80,0.92)",
  border: "none",
  borderRadius: 4,
  padding: "0 1.4rem",
  minHeight: 44,
  cursor: "pointer",
};
const tarjeta: CSSProperties = {
  background: "rgba(8,13,8,0.55)",
  border: "1px solid rgba(200,160,80,0.18)",
  borderRadius: 8,
  padding: "0.9rem 1.1rem",
};

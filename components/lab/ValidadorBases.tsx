"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { validarFormula, listaBases, buscarBase, type ItemFormula } from "@/lib/validar-formula";

/* Compara lo que estás formulando con la base correspondiente de la
   Biblioteca y avisa si algo se sale de los rangos documentados.
   Siempre avisa, nunca impide guardar. */
export function ValidadorBases({ items }: { items: ItemFormula[] }) {
  const [baseId, setBaseId] = useState<string>("");
  const [verRangos, setVerRangos] = useState(false);
  const bases = useMemo(() => listaBases(), []);

  const avisos = useMemo(() => validarFormula(items, baseId || null), [items, baseId]);
  const base = baseId ? buscarBase(baseId) : undefined;

  const alertas = avisos.filter((a) => a.nivel === "alerta");
  const advertencias = avisos.filter((a) => a.nivel === "aviso");
  const conformes = avisos.filter((a) => a.nivel === "ok");

  return (
    <section style={cajaStyle}>
      <div style={cabeceraStyle}>
        <p style={tituloStyle}>Contraste con la Biblioteca</p>
        <select value={baseId} onChange={(e) => setBaseId(e.target.value)} style={selectStyle}>
          <option value="">Elige la base…</option>
          {bases.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}
        </select>
      </div>

      {!baseId && (
        <p style={pistaStyle}>
          Elige el tipo de base y te aviso si algún ingrediente se sale de los rangos documentados.
        </p>
      )}

      {base && (
        <p style={pistaStyle}>
          pH de referencia <strong style={{ color: "#c8a050" }}>{base.ph}</strong> · Conservante:{" "}
          <strong style={{ color: /obligatorio/i.test(base.preservative) ? "#e0a050" : "#c8a050" }}>
            {base.preservative}
          </strong>
        </p>
      )}

      {(alertas.length > 0 || advertencias.length > 0 || conformes.length > 0) && (
        <ul style={listaStyle}>
          {[...alertas, ...advertencias, ...conformes].map((a, i) => (
            <li key={i} style={{ ...avisoStyle, ...(estilos[a.nivel] as CSSProperties) }}>
              <span aria-hidden style={{ flexShrink: 0 }}>
                {a.nivel === "alerta" ? "⚠" : a.nivel === "aviso" ? "!" : "✓"}
              </span>
              <span>{a.mensaje}</span>
            </li>
          ))}
        </ul>
      )}

      {base && (
        <>
          <button type="button" onClick={() => setVerRangos((v) => !v)} style={botonVerStyle}>
            {verRangos ? "Ocultar" : "Ver"} los rangos de «{base.title}»
          </button>

          {verRangos && (
            <div style={rangosStyle}>
              {base.categories.map((c) => (
                <div key={c.title} style={{ marginBottom: "0.7rem" }}>
                  <p style={catTituloStyle}>
                    {c.title} <span style={{ opacity: 0.6 }}>{c.range}</span>
                  </p>
                  {c.items.map((it) => (
                    <p key={it.name} style={itemRangoStyle}>
                      <span style={{ color: "rgba(212,196,160,0.9)" }}>{it.name}</span>{" "}
                      <span style={{ color: "#c8a050" }}>{it.range}</span>
                    </p>
                  ))}
                </div>
              ))}
              {base.note && <p style={notaStyle}>{base.note}</p>}
            </div>
          )}
        </>
      )}
    </section>
  );
}

const estilos: Record<string, CSSProperties> = {
  alerta: { background: "rgba(150, 60, 30, 0.16)", borderColor: "rgba(200, 110, 60, 0.5)", color: "#f0b48a" },
  aviso: { background: "rgba(200, 160, 80, 0.1)", borderColor: "rgba(200, 160, 80, 0.35)", color: "#e8c878" },
  ok: { background: "rgba(90, 122, 58, 0.1)", borderColor: "rgba(120, 160, 80, 0.28)", color: "rgba(190, 214, 160, 0.9)" },
};

const cajaStyle: CSSProperties = {
  border: "1px solid rgba(122, 74, 138, 0.3)",
  background: "rgba(122, 74, 138, 0.06)",
  borderRadius: "0.5rem",
  padding: "0.9rem 1rem",
  marginBottom: "1rem",
};
const cabeceraStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.75rem",
  flexWrap: "wrap",
  marginBottom: "0.6rem",
};
const tituloStyle: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.62rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(170, 120, 190, 0.95)",
  margin: 0,
};
const selectStyle: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.85rem",
  color: "#d4c4a0",
  background: "rgba(13, 26, 13, 0.9)",
  border: "1px solid rgba(200, 160, 80, 0.3)",
  borderRadius: "0.3rem",
  padding: "0.35rem 0.5rem",
  minHeight: 36,
};
const pistaStyle: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.85rem",
  color: "rgba(212, 196, 160, 0.7)",
  margin: "0 0 0.6rem",
  lineHeight: 1.6,
};
const listaStyle: CSSProperties = { listStyle: "none", padding: 0, margin: "0 0 0.5rem", display: "flex", flexDirection: "column", gap: "0.35rem" };
const avisoStyle: CSSProperties = {
  display: "flex",
  gap: "0.55rem",
  alignItems: "flex-start",
  fontFamily: "var(--font-body)",
  fontSize: "0.86rem",
  lineHeight: 1.55,
  border: "1px solid",
  borderRadius: "0.35rem",
  padding: "0.45rem 0.6rem",
};
const botonVerStyle: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.58rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#c8a050",
  background: "none",
  border: "1px solid rgba(200, 160, 80, 0.35)",
  borderRadius: "0.3rem",
  padding: "0.4rem 0.7rem",
  cursor: "pointer",
  minHeight: 34,
};
const rangosStyle: CSSProperties = {
  marginTop: "0.6rem",
  paddingTop: "0.6rem",
  borderTop: "1px solid rgba(200, 160, 80, 0.15)",
};
const catTituloStyle: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.58rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#c8a050",
  margin: "0 0 0.25rem",
};
const itemRangoStyle: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.84rem",
  margin: "0 0 0.15rem",
  paddingLeft: "0.6rem",
  lineHeight: 1.5,
};
const notaStyle: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontStyle: "italic",
  fontSize: "0.82rem",
  color: "rgba(220, 180, 80, 0.85)",
  borderLeft: "2px solid rgba(220, 180, 80, 0.4)",
  paddingLeft: "0.6rem",
  margin: "0.5rem 0 0",
  lineHeight: 1.55,
};

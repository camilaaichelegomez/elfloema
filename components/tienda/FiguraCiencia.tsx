"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// Ilustración de un proceso bioquímico en la piel. Deja el espacio para la imagen;
// mientras no exista `src`, muestra el prompt para generarla con IA y la ruta donde
// guardarla (misma convención que las láminas de la biblioteca). Cuando el archivo
// aparece en /public, la imagen se ve sola.
export default function FiguraCiencia({
  src,
  prompt,
  leyenda,
  titulo = "Ilustración bioquímica",
}: {
  src: string;
  prompt: string;
  leyenda?: string;
  titulo?: string;
}) {
  const [imgOk, setImgOk] = useState(true);
  const [copiado, setCopiado] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setImgOk(false);
  }, []);

  async function copiarPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {
      /* portapapeles no disponible */
    }
  }

  return (
    <figure style={{ margin: "0 0 0.6rem" }}>
      <div style={marcoStyle}>
        {imgOk ? (
          <img
            ref={imgRef}
            src={src}
            alt={leyenda ?? "Ilustración del proceso"}
            onError={() => setImgOk(false)}
            style={{ display: "block", width: "100%", height: "auto", borderRadius: 3 }}
          />
        ) : (
          <div style={placeholderStyle}>
            <p style={placeholderLabelStyle}>{titulo} — espacio para imagen</p>
            <p style={promptStyle}>
              <span style={{ color: "rgba(170,120,190,0.9)" }}>Imagen a generar (IA): </span>
              {prompt}
            </p>
            <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 12, flexWrap: "wrap", justifyContent: "center" }}>
              <button type="button" onClick={copiarPrompt} style={botonPromptStyle}>
                {copiado ? "✓ Prompt copiado" : "Copiar prompt"}
              </button>
              <code style={rutaStyle}>guardar en&nbsp;·&nbsp;public{src}</code>
            </div>
          </div>
        )}
      </div>
      {leyenda && <figcaption style={leyendaStyle}>{leyenda}</figcaption>}
    </figure>
  );
}

const marcoStyle: CSSProperties = {
  position: "relative",
  border: "1px solid rgba(200,160,80,0.28)",
  borderRadius: 4,
  padding: 6,
  background: "rgba(200,160,80,0.04)",
  boxShadow: "inset 0 0 24px rgba(0,0,0,0.35)",
};

const placeholderStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  minHeight: 200,
  border: "1px dashed rgba(200,160,80,0.35)",
  borderRadius: 2,
  padding: "1.6rem 1.4rem",
  background:
    "repeating-linear-gradient(45deg, rgba(200,160,80,0.03) 0 10px, transparent 10px 20px), linear-gradient(rgba(10,17,10,0.9), rgba(10,17,10,0.9))",
};

const placeholderLabelStyle: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.6rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(200,160,80,0.7)",
  margin: "0 0 10px",
};

const promptStyle: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontStyle: "italic",
  fontSize: "0.86rem",
  lineHeight: 1.6,
  color: "rgba(212,196,160,0.85)",
  maxWidth: 560,
  margin: 0,
};

const botonPromptStyle: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.56rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#c8a050",
  background: "none",
  border: "1px solid rgba(200,160,80,0.4)",
  padding: "6px 12px",
  borderRadius: 2,
  cursor: "pointer",
};

const rutaStyle: CSSProperties = {
  fontFamily: "monospace",
  fontSize: "0.68rem",
  color: "rgba(212,196,160,0.5)",
  background: "rgba(0,0,0,0.2)",
  padding: "4px 8px",
  borderRadius: 2,
};

const leyendaStyle: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontStyle: "italic",
  fontSize: "0.82rem",
  color: "rgba(212,196,160,0.6)",
  textAlign: "center",
  margin: "8px auto 0",
  maxWidth: 520,
  lineHeight: 1.5,
};

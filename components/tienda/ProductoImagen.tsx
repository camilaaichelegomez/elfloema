"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// Deja el espacio para la foto del producto. Mientras no exista /tienda/<slug>.jpg,
// si hay `prompt` muestra el texto para generarla con IA y la ruta donde guardarla
// (misma convención que las láminas de la biblioteca). Cuando el archivo aparece
// en /public, la imagen se ve sola.
export default function ProductoImagen({
  slug,
  nombre,
  glyph,
  accent,
  prompt,
}: {
  slug: string;
  nombre: string;
  glyph: string;
  accent: string;
  prompt?: string;
}) {
  const [imgOk, setImgOk] = useState(true);
  const [copiado, setCopiado] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Si la imagen ya falló antes de que React montara el onError (404 previo a la
  // hidratación), lo detectamos aquí para mostrar el placeholder igual.
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setImgOk(false);
  }, []);

  async function copiarPrompt() {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {
      /* portapapeles no disponible */
    }
  }

  const mostrarPrompt = !imgOk && !!prompt;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: mostrarPrompt ? undefined : "1 / 1",
        minHeight: mostrarPrompt ? 340 : undefined,
        borderRadius: "6px",
        overflow: "hidden",
        border: "1px solid rgba(200,160,80,0.2)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(ellipse 70% 60% at 50% 55%, ${accent} 0%, transparent 70%), linear-gradient(135deg, rgba(21,37,21,0.5) 0%, rgba(13,26,13,0.5) 100%)`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(200,160,80,0.06)",
      }}
    >
      {imgOk ? (
        <img
          ref={imgRef}
          src={`/tienda/${slug}.jpg`}
          alt={nombre}
          onError={() => setImgOk(false)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : mostrarPrompt ? (
        <div style={placeholderStyle}>
          <span style={{ fontSize: "2.6rem", color: "rgba(200,160,80,0.3)", lineHeight: 1, marginBottom: 10 }}>{glyph}</span>
          <p style={placeholderLabelStyle}>Espacio para la foto del producto</p>
          <p style={promptStyle}>
            <span style={{ color: "rgba(170,120,190,0.9)" }}>Imagen a generar (IA): </span>
            {prompt}
          </p>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 14, flexWrap: "wrap", justifyContent: "center" }}>
            <button type="button" onClick={copiarPrompt} style={botonPromptStyle}>
              {copiado ? "✓ Prompt copiado" : "Copiar prompt"}
            </button>
            <code style={rutaStyle}>guardar en&nbsp;·&nbsp;public/tienda/{slug}.jpg</code>
          </div>
        </div>
      ) : (
        <>
          <span
            style={{
              position: "absolute",
              width: 140,
              height: 140,
              borderRadius: "50%",
              border: "1px solid rgba(200,160,80,0.14)",
            }}
          />
          <span style={{ fontSize: "5rem", color: "rgba(200,160,80,0.3)", lineHeight: 1 }}>{glyph}</span>
          <span
            style={{
              position: "absolute",
              bottom: "1.2rem",
              fontFamily: "var(--font-cinzel), serif",
              fontSize: "0.55rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(212,196,160,0.35)",
            }}
          >
            Foto próximamente
          </span>
        </>
      )}
    </div>
  );
}

const placeholderStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  width: "100%",
  height: "100%",
  padding: "1.8rem 1.5rem",
  boxSizing: "border-box",
  background:
    "repeating-linear-gradient(45deg, rgba(200,160,80,0.03) 0 10px, transparent 10px 20px)",
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
  maxWidth: 440,
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

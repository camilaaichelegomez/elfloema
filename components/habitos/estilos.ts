import type { CSSProperties } from "react";

/* Los mismos estilos del Ritual de yoga: es el mismo sitio y tiene que
   verse como una pieza más, no como otra app pegada al lado. */

export const panel: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.22)",
  background: "rgba(12,22,12,0.72)",
  backdropFilter: "blur(3px)",
  borderRadius: 8,
  padding: "clamp(1.1rem, 3vw, 1.8rem)",
};

export const rotulo: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.6rem",
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: "rgba(200,160,80,0.7)",
  margin: "0 0 0.6rem",
};

export const ayuda: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.92rem",
  lineHeight: 1.6,
  color: "rgba(217,203,170,0.62)",
  margin: "0 0 1rem",
};

export const titulo: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "clamp(1.1rem, 3.4vw, 1.5rem)",
  color: "#e8c878",
  letterSpacing: "0.05em",
  margin: "0 0 0.5rem",
};

export const texto: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "1rem",
  lineHeight: 1.6,
  color: "#d9cbaa",
};

export const botonPri: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.7rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#0d1a0d",
  background: "rgba(200,160,80,0.92)",
  border: "none",
  borderRadius: 4,
  padding: "0 1.2rem",
  minHeight: 44,
  cursor: "pointer",
};

export const botonSec: CSSProperties = {
  ...botonPri,
  color: "#c8a050",
  background: "transparent",
  border: "1px solid rgba(200,160,80,0.45)",
};

export const botonLink: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.88rem",
  color: "rgba(200,160,80,0.75)",
  background: "none",
  border: "none",
  padding: "0.3rem 0.2rem",
  cursor: "pointer",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
};

export const campo: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "1rem",
  color: "#e6dcc3",
  background: "rgba(10,18,10,0.6)",
  border: "1px solid rgba(200,160,80,0.28)",
  borderRadius: 5,
  padding: "0.6rem 0.75rem",
  width: "100%",
  minHeight: 44,
};

export const tarjeta: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.18)",
  background: "rgba(10,18,10,0.45)",
  borderRadius: 6,
  padding: "0.75rem 0.9rem",
};

export const VERDE = "#a8c88a";
export const ORO = "#c8a050";

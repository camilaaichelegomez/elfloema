"use client";

import { useState } from "react";

export default function ProductoImagen({
  slug,
  nombre,
  glyph,
  accent,
}: {
  slug: string;
  nombre: string;
  glyph: string;
  accent: string;
}) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        borderRadius: "6px",
        overflow: "hidden",
        border: "1px solid rgba(200,160,80,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(ellipse 70% 60% at 50% 55%, ${accent} 0%, transparent 70%), linear-gradient(135deg, rgba(21,37,21,0.5) 0%, rgba(13,26,13,0.5) 100%)`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(200,160,80,0.06)",
      }}
    >
      {imgOk ? (
        <img
          src={`/tienda/${slug}.jpg`}
          alt={nombre}
          onError={() => setImgOk(false)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
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

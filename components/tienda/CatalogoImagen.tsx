"use client";

import { useEffect, useRef, useState } from "react";

// Imagen del producto para el catálogo. Si /tienda/<slug>.jpg existe, la muestra;
// si no, muestra el glifo (sin el placeholder de prompt, que no va en un catálogo).
export default function CatalogoImagen({
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
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setImgOk(false);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "1 / 1",
        borderRadius: 4,
        overflow: "hidden",
        border: "1px solid rgba(200,160,80,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(ellipse 70% 60% at 50% 55%, ${accent} 0%, transparent 70%), linear-gradient(135deg, rgba(21,37,21,0.5) 0%, rgba(13,26,13,0.5) 100%)`,
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
      ) : (
        <span style={{ fontSize: "2.8rem", color: "rgba(200,160,80,0.32)", lineHeight: 1 }}>{glyph}</span>
      )}
    </div>
  );
}

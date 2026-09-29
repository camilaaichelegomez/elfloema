"use client";

import { useState } from "react";

/* El dibujo de una postura de hipopresivos.

   Las ilustraciones las genera Camila con IA (prompts-hipopresivos.md) y se
   guardan en public/hipopresivos/<figura>.webp. Mientras una no exista, no se
   muestra nada: sin imágenes rotas ni listas que mantener. Se copia el
   archivo a la carpeta y aparece sola.

   Si se reemplaza un dibujo, sube VERSION_FIGURAS: el teléfono guarda las
   imágenes por su dirección y seguiría mostrando la vieja. */

export const VERSION_FIGURAS = 1;

export function FiguraHipopresivo({ figura, nombre, alto = 200 }: { figura: string; nombre: string; alto?: number }) {
  const [falta, setFalta] = useState(false);
  if (falta) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/hipopresivos/${figura}.webp?v=${VERSION_FIGURAS}`}
      alt={nombre}
      loading="lazy"
      onError={() => setFalta(true)}
      style={{
        display: "block",
        width: "100%",
        maxWidth: Math.round((alto * 4) / 3),
        height: "auto",
        borderRadius: 6,
        border: "1px solid rgba(200,160,80,0.18)",
        margin: "0 auto 0.9rem",
      }}
    />
  );
}

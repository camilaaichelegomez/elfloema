"use client";

import { useState } from "react";

/* El dibujo de una postura de hipopresivos.

   Las ilustraciones las genera Camila con IA (prompts-hipopresivos.md) y se
   guardan en public/hipopresivos/<figura>, en webp, png o jpg: se prueba en
   ese orden, así que se pueden subir tal como salen de la IA, sin
   convertirlas. Mientras una no exista, no se muestra nada: sin imágenes
   rotas ni listas que mantener. Se copia el archivo a la carpeta y aparece
   sola.

   Si se reemplaza un dibujo, sube VERSION_FIGURAS: el teléfono guarda las
   imágenes por su dirección y seguiría mostrando la vieja. */

export const VERSION_FIGURAS = 1;

const FORMATOS = ["webp", "png", "jpg", "jpeg"];

export function FiguraHipopresivo({ figura, nombre, alto = 200 }: { figura: string; nombre: string; alto?: number }) {
  // Qué formato se está probando; si ninguno existe, no se muestra nada.
  const [intento, setIntento] = useState(0);
  if (intento >= FORMATOS.length) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      key={intento}
      src={`/hipopresivos/${figura}.${FORMATOS[intento]}?v=${VERSION_FIGURAS}`}
      alt={nombre}
      loading="lazy"
      onError={() => setIntento((i) => i + 1)}
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

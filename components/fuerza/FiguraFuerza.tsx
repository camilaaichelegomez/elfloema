"use client";

import { useState } from "react";

/* El dibujo de un ejercicio.

   Las ilustraciones las genera Camila con IA, una por una, y se guardan en
   public/fuerza/<figura>.webp. Mientras una no exista, este componente
   simplemente no muestra nada: no hay lista de archivos que mantener al día
   ni imágenes rotas. Copias el archivo a la carpeta y aparece sola.

   El número de versión sirve para cuando se reemplaza un dibujo: el teléfono
   guarda las imágenes por su dirección, así que si cambia el archivo sin
   cambiar la dirección, sigue mostrando el viejo. */

export const VERSION_FIGURAS = 1;

export function FiguraFuerza({
  figura,
  nombre,
  alto = 200,
}: {
  figura?: string;
  nombre: string;
  alto?: number;
}) {
  const [falta, setFalta] = useState(false);
  if (!figura || falta) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/fuerza/${figura}.webp?v=${VERSION_FIGURAS}`}
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
        margin: "0 0 0.9rem",
      }}
    />
  );
}

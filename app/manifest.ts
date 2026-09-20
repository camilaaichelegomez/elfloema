import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "El Floema Lab",
    short_name: "Floema Lab",
    description: "Inventario, fórmulas y asistente de formulación de El Floema",
    start_url: "/lab",
    scope: "/lab",
    display: "standalone",
    background_color: "#0d1a0f",
    theme_color: "#0d1a0f",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      /* El «maskable» es el que Android recorta en círculo. Sin él, el
         teléfono encoge el logo y lo pega sobre un círculo blanco: el fondo
         oscuro tiene que llenar todo el ícono y el dibujo ir al centro. */
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}

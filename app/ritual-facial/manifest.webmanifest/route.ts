import type { MetadataRoute } from "next";

/* Segundo manifiesto: el Ritual facial se instala como su propia app.

   El Lab (app/manifest.ts) queda intacto, con su scope en /lab. Son dos
   públicos distintos: quien formula instala el Lab y quiere abrir en el
   inventario; quien hace la rutina quiere abrir en la rutina. Cada una con su
   ícono y su nombre.

   El service worker, en cambio, es UNO SOLO para todo el sitio (/sw.js con
   scope "/"): dos service workers peleando por el mismo scope se pisan, y el
   último registrado gana. Ese worker ya cachea /ritual-facial. */

export const dynamic = "force-static";

export function GET() {
  const manifest: MetadataRoute.Manifest = {
    name: "Ritual Facial — El Floema",
    short_name: "Ritual Facial",
    description:
      "Arma tu rutina de drenaje linfático y ejercicios faciales, y síguela paso a paso con dibujos.",
    start_url: "/ritual-facial",
    scope: "/ritual-facial",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0d1a0d",
    theme_color: "#0d1a0d",
    icons: [
      { src: "/icon-ritual-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-ritual-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      // El recortado en círculo va aparte, con margen: si no, se comería las raíces de los lados.
      { src: "/icon-ritual-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };

  return Response.json(manifest, {
    headers: { "Content-Type": "application/manifest+json" },
  });
}

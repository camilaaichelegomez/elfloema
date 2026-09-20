import type { MetadataRoute } from "next";

/* Tercer manifiesto del sitio: el Ritual de yoga se instala como su propia app.

   Misma lógica que el Ritual facial: son públicos distintos y cada uno quiere
   abrir la app en SU pantalla, no en el Lab. El service worker sigue siendo uno
   solo para todo el sitio (/sw.js con scope "/"), porque dos workers en el
   mismo scope se pisan. */

export const dynamic = "force-static";

export function GET() {
  const manifest: MetadataRoute.Manifest = {
    name: "Ritual de Yoga — El Floema",
    short_name: "Yoga",
    description:
      "Arma tu práctica de yoga según lo que necesites y síguela paso a paso, con las preferencias guardadas.",
    start_url: "/yoga",
    scope: "/yoga",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0d1a0d",
    theme_color: "#0d1a0d",
    icons: [
      { src: "/icon-yoga-bailarin-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-yoga-bailarin-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-yoga-bailarin-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };

  return Response.json(manifest, {
    headers: { "Content-Type": "application/manifest+json" },
  });
}

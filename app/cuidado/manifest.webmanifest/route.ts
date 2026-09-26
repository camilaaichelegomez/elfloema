import type { MetadataRoute } from "next";

/* El manifiesto de la app junta.

   Antes había tres apps instalables —yoga, ritual facial y hábitos— y eso
   eran tres iconos en el teléfono para el mismo rato del día. Ahora es una
   sola: El Floema Cuidado, que abre en su portada y desde ahí lleva a las
   tres secciones.

   El alcance es todo el sitio ("/") a propósito: las tres secciones viven en
   direcciones distintas (/yoga, /ritual-facial, /habitos) y, si el alcance
   fuera más estrecho, tocar una de ellas dentro de la app abriría el
   navegador por fuera.

   El Lab sigue aparte, con su propio manifiesto y su alcance en /lab: es
   otra cosa y la usa otra gente. */

export const dynamic = "force-static";

export function GET() {
  const manifest: MetadataRoute.Manifest = {
    name: "El Floema Cuidado",
    short_name: "Cuidado",
    description:
      "Tu práctica de yoga, el ritual facial y tus hábitos del día, en un solo lugar.",
    start_url: "/cuidado",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0d1a0d",
    theme_color: "#0d1a0d",
    icons: [
      { src: "/icon-cuidado-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-cuidado-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-cuidado-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Ritual de yoga", url: "/yoga" },
      { name: "Ritual facial", url: "/ritual-facial" },
      { name: "Hábitos", url: "/habitos" },
    ],
  };

  return Response.json(manifest, {
    headers: { "Content-Type": "application/manifest+json" },
  });
}

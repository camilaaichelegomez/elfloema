import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { GeneradorEtiquetas } from "@/components/lab/GeneradorEtiquetas";

/* Generador de etiquetas para envases: se diseña una etiqueta a la vez y se van
   sumando a la hoja las que se quieran imprimir, lista para recortar. */

export const dynamic = "force-dynamic";

export default async function EtiquetasPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/lab/login");

  return (
    <main
      className="parchment-bg lab-bg"
      style={{ minHeight: "100vh", padding: "clamp(90px, 14vh, 140px) clamp(20px, 5vw, 64px) 64px" }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div className="no-print" style={{ marginBottom: "1.4rem" }}>
          <h1
            style={{
              fontFamily: "var(--font-cinzel), serif",
              fontSize: "clamp(1.5rem,3.5vw,2.1rem)",
              color: "#c8a050",
              letterSpacing: "0.1em",
              margin: "0 0 0.4rem",
            }}
          >
            Etiquetas
          </h1>
          <p
            style={{
              fontFamily: "var(--font-crimson), serif",
              fontSize: "0.98rem",
              color: "rgba(212,196,160,0.72)",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Diseña una etiqueta a la vez y mírala grande. Cuando te guste, súmala a la hoja: puedes
            juntar varias, incluso de productos distintos, e imprimirlas todas en la misma hoja.
          </p>
        </div>

        <GeneradorEtiquetas />
      </div>
    </main>
  );
}

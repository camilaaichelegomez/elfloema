import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { LabEncabezado } from "@/components/lab/LabEncabezado";
import { CostosManager } from "@/components/lab/CostosManager";

export default async function CostosLabPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/lab/login");
  }

  const [
    { data: formulas, error: errFormulas },
    { data: inventario },
    { data: costos },
  ] = await Promise.all([
    supabase
      .from("formulas")
      .select("id, nombre, categoria, rinde_gramos, formula_items(ingrediente, gramos)")
      .is("deleted_at", null)
      .order("nombre", { ascending: true }),
    supabase.from("inventario_con_costo").select("ingrediente, costo_unitario, unidad"),
    supabase.from("costos_producto").select("*").eq("user_id", user.id),
  ]);

  return (
    <main
      className="parchment-bg lab-bg"
      style={{ minHeight: "100vh", padding: "clamp(90px, 14vh, 140px) clamp(20px, 5vw, 64px) 64px" }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <LabEncabezado titulo="Costos y Precios" actual="costos" />

        {errFormulas ? (
          <p style={{ fontFamily: "var(--font-body)", color: "#e05a4a" }}>
            No se pudieron cargar las fórmulas: {errFormulas.message}
          </p>
        ) : (
          <CostosManager
            userId={user.id}
            formulas={formulas ?? []}
            inventario={inventario ?? []}
            costosIniciales={costos ?? []}
          />
        )}
      </div>
    </main>
  );
}

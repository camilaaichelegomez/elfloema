import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { LabEncabezado } from "@/components/lab/LabEncabezado";
import { ProveedoresBuscador } from "@/components/lab/ProveedoresBuscador";

export default async function ProveedoresLabPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/lab/login");
  }

  return (
    <main
      className="parchment-bg lab-bg"
      style={{ minHeight: "100vh", padding: "clamp(78px, 9vh, 96px) clamp(20px, 5vw, 64px) 64px" }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <LabEncabezado titulo="Buscar en proveedores" actual="proveedores" />
        <ProveedoresBuscador />
      </div>
    </main>
  );
}

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { LabEncabezado } from "@/components/lab/LabEncabezado";
import { CatalogoManager } from "@/components/lab/CatalogoManager";
import { productosTienda } from "@/lib/productos-tienda";

export const dynamic = "force-dynamic";

export default async function CatalogoLabPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/lab/login");
  }

  const { data: productos } = await supabase
    .from("productos")
    .select("*")
    .order("orden", { ascending: true })
    .order("nombre", { ascending: true });

  return (
    <main
      className="parchment-bg lab-bg"
      style={{ minHeight: "100vh", padding: "clamp(90px, 14vh, 140px) clamp(20px, 5vw, 64px) 64px" }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <LabEncabezado titulo="Catálogo de la tienda" actual="catalogo" />
        <CatalogoManager userId={user.id} productosDb={productos ?? []} semilla={productosTienda} />
      </div>
    </main>
  );
}

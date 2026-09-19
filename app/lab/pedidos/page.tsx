import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { LabEncabezado } from "@/components/lab/LabEncabezado";
import { PedidosManager, type Pedido } from "@/components/lab/PedidosManager";

export default async function PedidosLabPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/lab/login");
  }

  // Las reglas de la tabla solo dejan ver los pedidos a la dueña de la tienda.
  const { data, error } = await supabase
    .from("pedidos")
    .select("*")
    .order("creado", { ascending: false })
    .limit(300);

  return (
    <main
      className="parchment-bg lab-bg"
      style={{ minHeight: "100vh", padding: "clamp(78px, 9vh, 96px) clamp(20px, 5vw, 64px) 64px" }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <LabEncabezado titulo="Pedidos de la tienda" actual="pedidos" />

        {error ? (
          <p style={{ fontFamily: "var(--font-body)", color: "#e05a4a" }}>
            {error.code === "42P01" || /does not exist|schema cache/i.test(error.message)
              ? "Falta crear la tabla de pedidos en Supabase."
              : `No se pudieron cargar los pedidos: ${error.message}`}
          </p>
        ) : (
          <PedidosManager inicial={(data as Pedido[] | null) ?? []} />
        )}
      </div>
    </main>
  );
}

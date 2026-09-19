import { createClient } from "@supabase/supabase-js";
import { estadoPago, NOMBRE_ESTADO } from "@/lib/flow";

/* Los pedidos de la tienda, guardados en la tabla `pedidos` de Supabase.

   Los escribe solo el servidor, con la clave secreta de Supabase (que salta
   las reglas de seguridad). Nadie desde el navegador puede crear ni tocar un
   pedido; solo Camila, con su sesión del Lab, puede leerlos y marcarlos como
   despachados.

   Variable en Vercel:
     SUPABASE_SECRET_KEY = la «secret key» (Supabase → Project Settings → API Keys) */

export function pedidosConfigurado() {
  return !!process.env.SUPABASE_SECRET_KEY;
}

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type ItemPedido = { slug: string; nombre: string; cantidad: number; precio: number };

export type NuevoPedido = {
  orden: string;
  total: number;
  items: ItemPedido[];
  nombre: string;
  email: string;
  telefono: string;
  metodo_envio: "domicilio" | "sucursal";
  direccion: string | null;
  sucursal: string | null;
  comentarios: string | null;
};

export async function guardarPedido(p: NuevoPedido) {
  const { error } = await admin().from("pedidos").insert(p);
  if (error) throw new Error(`pedidos: ${error.message}`);
}

export async function anotarOrdenFlow(orden: string, flowOrden: number) {
  await admin().from("pedidos").update({ flow_orden: flowOrden }).eq("orden", orden);
}

/** Consulta a Flow el estado del pago y lo anota en el pedido. Se llama tanto
 *  desde el aviso que manda Flow como desde la vuelta de la clienta: el que
 *  llegue primero lo deja anotado, y el otro no cambia nada. */
export async function sincronizarPago(token: string) {
  const st = await estadoPago(token);
  const db = admin();
  const { data: pedido } = await db
    .from("pedidos")
    .select("total, estado")
    .eq("orden", st.commerceOrder)
    .maybeSingle();

  let estado = NOMBRE_ESTADO[st.status] ?? "pendiente";
  // Si el monto no calza con lo que se cobró, no se da por pagado.
  if (estado === "pagado" && pedido && Number(st.amount) !== Number(pedido.total)) {
    estado = "pendiente";
  }

  if (pedido && pedido.estado !== estado && pedido.estado !== "pagado") {
    await db
      .from("pedidos")
      .update({
        estado,
        flow_orden: st.flowOrder,
        ...(estado === "pagado" ? { pagado: new Date().toISOString() } : {}),
      })
      .eq("orden", st.commerceOrder);
  }

  return { orden: st.commerceOrder, estado: pedido?.estado === "pagado" ? "pagado" : estado };
}

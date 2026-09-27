import { createClient } from "@supabase/supabase-js";
import { estadoPago, NOMBRE_ESTADO } from "@/lib/flow";
import { estadoPagoMP } from "@/lib/mercadopago";

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

export type Pasarela = "flow" | "mercadopago";

export type NuevoPedido = {
  orden: string;
  /** Por dónde se cobró. Sirve para saber dónde buscar si algo no calza. */
  pasarela: Pasarela;
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

export async function anotarPagoMP(orden: string, pagoId: string) {
  await admin().from("pedidos").update({ pago_id: pagoId }).eq("orden", orden);
}

/* Anotar cómo quedó un pago es lo mismo venga de donde venga, y es la parte
   delicada: nunca se da por pagado algo cuyo monto no calza con el pedido, y
   un pedido ya pagado no se vuelve atrás por un aviso que llegue tarde. */
async function anotarEstado(
  orden: string,
  estadoPasarela: "pendiente" | "pagado" | "rechazado" | "anulado",
  monto: number,
  extra: Record<string, unknown> = {}
) {
  const db = admin();
  const { data: pedido } = await db
    .from("pedidos")
    .select("total, estado")
    .eq("orden", orden)
    .maybeSingle();

  let estado = estadoPasarela;
  if (estado === "pagado" && pedido && Number(monto) !== Number(pedido.total)) {
    estado = "pendiente";
  }

  if (pedido && pedido.estado !== estado && pedido.estado !== "pagado") {
    await db
      .from("pedidos")
      .update({
        estado,
        ...extra,
        ...(estado === "pagado" ? { pagado: new Date().toISOString() } : {}),
      })
      .eq("orden", orden);
  }

  return { orden, estado: pedido?.estado === "pagado" ? "pagado" : estado };
}

/** Consulta a Mercado Pago el estado de un pago y lo anota en el pedido. */
export async function sincronizarPagoMercadoPago(pagoId: string) {
  const pago = await estadoPagoMP(pagoId);
  if (!pago.orden) return { orden: "", estado: "pendiente" as const };
  return anotarEstado(pago.orden, pago.estado, pago.monto, { pago_id: pago.pagoId });
}

/** Consulta a Flow el estado del pago y lo anota en el pedido. Se llama tanto
 *  desde el aviso que manda Flow como desde la vuelta de la clienta: el que
 *  llegue primero lo deja anotado, y el otro no cambia nada. */
export async function sincronizarPago(token: string) {
  const st = await estadoPago(token);
  return anotarEstado(st.commerceOrder, NOMBRE_ESTADO[st.status] ?? "pendiente", st.amount, {
    flow_orden: st.flowOrder,
  });
}

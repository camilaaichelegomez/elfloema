/* Conexión con Mercado Pago, la segunda pasarela de la tienda.

   Solo se usa en el servidor: el token nunca llega al navegador.

   Para activarlo, en Vercel → Settings → Environment Variables:
     MP_ACCESS_TOKEN = el «Access Token» de producción de tu cuenta
   (Mercado Pago → Tu negocio → Configuraciones → Credenciales.)
   Para probar sin cobrar de verdad se usa el Access Token de prueba, que
   empieza con TEST-.

   Igual que con Flow, la regla es la misma: lo que diga la clienta al volver
   no vale nada. El estado real se le pregunta a Mercado Pago por el id del
   pago, y recién ahí se anota. */

const API = process.env.MP_API_URL || "https://api.mercadopago.com";

export function mercadoPagoConfigurado() {
  return !!process.env.MP_ACCESS_TOKEN;
}

/** Es una cuenta de prueba: los pagos no son reales. */
export function mercadoPagoEnPruebas() {
  return (process.env.MP_ACCESS_TOKEN ?? "").startsWith("TEST-");
}

async function leer<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = (data as { message?: string } | null)?.message ?? res.statusText;
    throw new Error(`Mercado Pago ${res.status}: ${msg}`);
  }
  return data as T;
}

export type ItemMP = { nombre: string; cantidad: number; precio: number };

/** Crea la preferencia de pago y devuelve la dirección a la que se envía a la
 *  clienta. `orden` viaja como `external_reference`: es el hilo que después
 *  permite saber a qué pedido corresponde el pago. */
export async function crearPreferencia(datos: {
  orden: string;
  items: ItemMP[];
  email: string;
  nombre: string;
  urlRetorno: string;
  urlAviso: string;
}) {
  const res = await fetch(`${API}/checkout/preferences`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      items: datos.items.map((i) => ({
        title: i.nombre,
        quantity: i.cantidad,
        unit_price: i.precio, // el peso chileno no lleva decimales
        currency_id: "CLP",
      })),
      payer: { name: datos.nombre || undefined, email: datos.email },
      external_reference: datos.orden,
      back_urls: {
        success: datos.urlRetorno,
        failure: datos.urlRetorno,
        pending: datos.urlRetorno,
      },
      auto_return: "approved",
      notification_url: datos.urlAviso,
      statement_descriptor: "EL FLOEMA",
    }),
  });

  const r = await leer<{ id: string; init_point: string; sandbox_init_point?: string }>(res);
  // Con credenciales de prueba, la dirección buena es la de sandbox.
  const url = mercadoPagoEnPruebas() ? (r.sandbox_init_point ?? r.init_point) : r.init_point;
  return { url, preferenciaId: r.id };
}

/* Los estados de Mercado Pago, traducidos a los cuatro que usa la tienda.
   `in_process` y `authorized` son pagos que todavía no se acreditan: se
   tratan como pendientes hasta que el aviso diga otra cosa. */
const ESTADOS: Record<string, "pendiente" | "pagado" | "rechazado" | "anulado"> = {
  approved: "pagado",
  pending: "pendiente",
  in_process: "pendiente",
  in_mediation: "pendiente",
  authorized: "pendiente",
  rejected: "rechazado",
  cancelled: "anulado",
  refunded: "anulado",
  charged_back: "anulado",
};

/** Le pregunta a Mercado Pago cómo quedó un pago. Única fuente de verdad. */
export async function estadoPagoMP(pagoId: string) {
  const res = await fetch(`${API}/v1/payments/${encodeURIComponent(pagoId)}`, {
    headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` },
    cache: "no-store",
  });
  const r = await leer<{
    id: number;
    status: string;
    external_reference: string | null;
    transaction_amount: number;
  }>(res);

  return {
    pagoId: String(r.id),
    orden: r.external_reference ?? "",
    estado: ESTADOS[r.status] ?? "pendiente",
    monto: r.transaction_amount,
  };
}

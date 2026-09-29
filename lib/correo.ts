/* El aviso por correo cuando alguien compra.

   Se manda con Resend. Para activarlo, en Vercel:
     RESEND_API_KEY   = la clave de resend.com
     CORREO_AVISOS    = a dónde llega el aviso (el correo de Camila)
   Opcional, cuando haya dominio propio verificado en Resend:
     CORREO_REMITENTE = El Floema <hola@elfloema.cl>

   Sin esas variables no pasa nada: el pedido se guarda igual y la tienda
   sigue funcionando. El aviso es un extra, nunca puede voltear una venta.

   Mercado Pago ya manda su propio correo al recibir un pago, pero ese no
   trae la dirección de despacho ni qué se compró: eso vive acá. */

const API = process.env.RESEND_API_URL || "https://api.resend.com/emails";

/* El remitente por defecto es el que Resend presta a cualquier cuenta nueva.
   Con él solo se puede escribir a la dirección dueña de la cuenta, que es
   justo lo que queremos: que Camila se avise a sí misma. */
const REMITENTE = process.env.CORREO_REMITENTE || "El Floema <onboarding@resend.dev>";

export function correoConfigurado() {
  return !!(process.env.RESEND_API_KEY && process.env.CORREO_AVISOS);
}

export type PedidoParaAviso = {
  orden: string;
  total: number;
  items: { nombre: string; cantidad: number; precio: number }[] | null;
  nombre: string | null;
  email: string | null;
  telefono: string | null;
  metodo_envio: string | null;
  direccion: string | null;
  sucursal: string | null;
  comentarios: string | null;
  pasarela: string | null;
};

const pesos = (n: number) => `$${Math.round(n).toLocaleString("es-CL")}`;

/** Escapa lo que escribió la clienta: su texto va dentro de un correo HTML y
 *  no tiene por qué poder meter etiquetas ahí. */
const limpio = (t: string | null | undefined) =>
  (t ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function cuerpo(p: PedidoParaAviso) {
  const lineas = (p.items ?? [])
    .map(
      (i) =>
        `<tr><td style="padding:4px 10px 4px 0">${limpio(i.nombre)}</td>` +
        `<td style="padding:4px 10px;text-align:center">${i.cantidad}</td>` +
        `<td style="padding:4px 0;text-align:right">${pesos(i.precio * i.cantidad)}</td></tr>`
    )
    .join("");

  const destino =
    p.metodo_envio === "sucursal"
      ? `Sucursal de Correos: ${limpio(p.sucursal)}`
      : limpio(p.direccion);

  return `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.6;color:#222">
  <h2 style="margin:0 0 4px">Nuevo pedido pagado</h2>
  <p style="margin:0 0 16px;color:#666">N.º ${limpio(p.orden)} · ${limpio(p.pasarela)}</p>

  <table style="border-collapse:collapse;margin-bottom:8px">${lineas}</table>
  <p style="margin:0 0 20px;font-weight:600">Total: ${pesos(p.total)}</p>

  <p style="margin:0 0 4px"><strong>${limpio(p.nombre)}</strong></p>
  <p style="margin:0 0 4px">${destino}</p>
  <p style="margin:0 0 4px">${limpio(p.telefono)} · ${limpio(p.email)}</p>
  ${p.comentarios ? `<p style="margin:12px 0 0"><em>«${limpio(p.comentarios)}»</em></p>` : ""}

  <p style="margin:24px 0 0;color:#666;font-size:13px">
    Para marcarlo como despachado, entra al Lab → Pedidos.
  </p>
</div>`;
}

/** Avisa que entró una venta. Si algo falla, lo dice en los registros y
 *  sigue: el pedido ya está guardado y eso es lo que importa.
 *
 *  Devuelve cómo le fue —sin lanzar nunca— para que la prueba desde el Lab
 *  pueda decir la verdad en vez de un «enviado» que no llegó a ninguna parte.
 *  La causa es en castellano y no incluye la respuesta cruda de Resend: ahí
 *  podría venir el valor de una clave, como ya pasó una vez con Supabase. */
export async function avisarVenta(p: PedidoParaAviso): Promise<{ ok: boolean; causa?: string }> {
  if (!correoConfigurado()) {
    return { ok: false, causa: "Faltan RESEND_API_KEY y CORREO_AVISOS en Vercel." };
  }
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: REMITENTE,
        to: [process.env.CORREO_AVISOS],
        subject: `🌿 Pedido ${p.orden} · ${pesos(p.total)}`,
        html: cuerpo(p),
      }),
    });
    if (res.ok) return { ok: true };

    const detalle = await res.text().catch(() => "");
    console.error("aviso de venta:", res.status, detalle);
    const m = detalle.toLowerCase();
    return {
      ok: false,
      causa:
        res.status === 401 || res.status === 403
          ? "Resend no acepta la clave. Puede estar incompleta, mal pegada o borrada."
          : m.includes("testing emails") || m.includes("own email address")
            ? "Con el remitente prestado (onboarding@resend.dev) Resend solo deja escribirle a la dirección dueña de la cuenta. CORREO_AVISOS tiene que ser ese mismo correo, o hay que verificar elfloema.cl en Resend."
            : m.includes("domain") || m.includes("from")
              ? "Resend rechaza el remitente. Si pusiste CORREO_REMITENTE, ese dominio tiene que estar verificado en Resend."
              : res.status === 429
                ? "Resend está limitando el envío por ahora. Probá de nuevo en un rato."
                : "Resend rechazó el envío y el motivo no es uno de los conocidos. Está en los registros de Vercel.",
    };
  } catch (e) {
    console.error("aviso de venta:", e);
    return { ok: false, causa: "No se pudo contactar a Resend. Puede ser un tropiezo de red." };
  }
}

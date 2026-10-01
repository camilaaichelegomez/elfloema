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


/* ── Mandar ────────────────────────────────────────────────────────────────
   Un solo lugar que habla con Resend. Nunca lanza: devuelve cómo le fue, en
   castellano y sin la respuesta cruda del servidor (ahí podría venir el valor
   de una clave, como ya pasó una vez con Supabase). */
async function mandar(
  para: string,
  asunto: string,
  html: string,
  queEra: string
): Promise<{ ok: boolean; causa?: string }> {
  if (!correoConfigurado()) {
    return { ok: false, causa: "Faltan RESEND_API_KEY y CORREO_AVISOS en Vercel." };
  }
  if (!para) return { ok: false, causa: "El pedido no trae correo de la clienta." };

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({ from: REMITENTE, to: [para], subject: asunto, html }),
    });
    if (res.ok) return { ok: true };

    const detalle = await res.text().catch(() => "");
    console.error(`${queEra}:`, res.status, detalle);
    const m = detalle.toLowerCase();
    return {
      ok: false,
      causa:
        res.status === 401 || res.status === 403
          ? "Resend no acepta la clave. Puede estar incompleta, mal pegada o borrada."
          : m.includes("testing emails") || m.includes("own email address")
            ? "Con el remitente prestado (onboarding@resend.dev) Resend solo deja escribirle a la dirección dueña de la cuenta. Para escribirle a las clientas hay que verificar elfloema.cl en Resend."
            : m.includes("domain") || m.includes("from")
              ? "Resend rechaza el remitente. Si pusiste CORREO_REMITENTE, ese dominio tiene que estar verificado en Resend."
              : res.status === 429
                ? "Resend está limitando el envío por ahora. Probá de nuevo en un rato."
                : "Resend rechazó el envío y el motivo no es uno de los conocidos. Está en los registros de Vercel.",
    };
  } catch (e) {
    console.error(`${queEra}:`, e);
    return { ok: false, causa: "No se pudo contactar a Resend. Puede ser un tropiezo de red." };
  }
}

/** Avisa a Camila que entró una venta. Si algo falla, queda en los registros
 *  y sigue: el pedido ya está guardado y eso es lo que importa. */
export async function avisarVenta(p: PedidoParaAviso) {
  return mandar(
    process.env.CORREO_AVISOS ?? "",
    `🌿 Pedido ${p.orden} · ${pesos(p.total)}`,
    cuerpo(p),
    "aviso de venta"
  );
}

/* ── Los correos que recibe la clienta ─────────────────────────────────────
   Van con el mismo marco los dos, para que se reconozcan como de El Floema.
   Sobrio a propósito: muchos clientes de correo recortan o bloquean lo que
   trae imágenes de fondo y tipografías cargadas. */
function marco(titulo: string, dentro: string) {
  return `<div style="background:#0d1a0d;padding:28px 16px;font-family:Georgia,'Times New Roman',serif">
  <div style="max-width:520px;margin:0 auto;background:#111f11;border:1px solid rgba(200,160,80,0.3);border-radius:8px;padding:28px 26px;color:#d4c4a0;font-size:15px;line-height:1.65">
    <p style="margin:0 0 2px;letter-spacing:0.24em;font-size:11px;text-transform:uppercase;color:#c8a050">El Floema</p>
    <p style="margin:0 0 22px;font-size:12px;font-style:italic;color:rgba(212,196,160,0.6)">Con ciencia, mi magia despierta</p>
    <h1 style="margin:0 0 18px;font-size:21px;font-weight:normal;color:#e8c878">${titulo}</h1>
    ${dentro}
    <p style="margin:26px 0 0;padding-top:16px;border-top:1px solid rgba(200,160,80,0.18);font-size:12px;color:rgba(212,196,160,0.55)">
      Cualquier duda, respondé este correo. · elfloema.cl
    </p>
  </div>
</div>`;
}

function tablaDeProductos(p: PedidoParaAviso) {
  const lineas = (p.items ?? [])
    .map(
      (i) =>
        `<tr><td style="padding:5px 10px 5px 0;color:#d4c4a0">${limpio(i.nombre)}</td>` +
        `<td style="padding:5px 10px;text-align:center;color:rgba(212,196,160,0.7)">${i.cantidad}</td>` +
        `<td style="padding:5px 0;text-align:right;color:#d4c4a0">${pesos(i.precio * i.cantidad)}</td></tr>`
    )
    .join("");
  return `<table style="border-collapse:collapse;width:100%;margin:0 0 10px;font-size:14px">${lineas}</table>
  <p style="margin:0 0 20px;text-align:right;color:#e8c878">Total: ${pesos(p.total)}</p>`;
}

function aDonde(p: PedidoParaAviso) {
  return p.metodo_envio === "sucursal"
    ? `Retiro en sucursal de Correos: ${limpio(p.sucursal)}`
    : limpio(p.direccion);
}

/** El acuse de recibo que llega apenas se confirma el pago.
 *
 *  Promete dos cosas y las dos se cumplen desde el Lab: que sale en tres días
 *  hábiles, y que va a llegar un segundo correo con el seguimiento. Si alguna
 *  vez se cambia este texto, hay que mirar también avisarEnvio. */
export async function confirmarPedido(p: PedidoParaAviso) {
  const saludo = p.nombre ? `Hola ${limpio(p.nombre.split(" ")[0])},` : "Hola,";
  const dentro = `
    <p style="margin:0 0 16px">${saludo} recibimos tu pedido y ya está pagado. Gracias de verdad.</p>
    <p style="margin:0 0 18px;font-size:13px;color:rgba(212,196,160,0.7)">Pedido N.º ${limpio(p.orden)}</p>
    ${tablaDeProductos(p)}
    <p style="margin:0 0 4px;font-size:13px;color:rgba(212,196,160,0.7)">Se envía a:</p>
    <p style="margin:0 0 22px">${aDonde(p)}</p>
    <p style="margin:0 0 14px">
      Cada producto se prepara a mano en el laboratorio. <strong style="color:#e8c878">Tu pedido sale
      dentro de los próximos 3 días hábiles.</strong>
    </p>
    <p style="margin:0">
      Cuando salga te escribimos a este mismo correo con el número de seguimiento, para que puedas
      ir siguiéndolo.
    </p>`;
  return mandar(p.email ?? "", `Tu pedido ${p.orden} · El Floema`, marco("Tu pedido está confirmado", dentro), "confirmacion de pedido");
}

/** El segundo correo: el que se prometió arriba. Sale cuando Camila marca el
 *  pedido como despachado en el Lab y pega el número de seguimiento. */
export async function avisarEnvio(p: PedidoParaAviso, seguimiento: string, empresa?: string | null) {
  const saludo = p.nombre ? `Hola ${limpio(p.nombre.split(" ")[0])},` : "Hola,";
  const dentro = `
    <p style="margin:0 0 16px">${saludo} tu pedido ya salió. Va en camino.</p>
    <p style="margin:0 0 18px;font-size:13px;color:rgba(212,196,160,0.7)">Pedido N.º ${limpio(p.orden)}</p>
    <div style="margin:0 0 22px;padding:14px 16px;border:1px solid rgba(200,160,80,0.3);border-radius:6px">
      <p style="margin:0 0 4px;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#c8a050">Número de seguimiento</p>
      <p style="margin:0;font-size:19px;color:#e8c878;letter-spacing:0.04em">${limpio(seguimiento)}</p>
      ${empresa ? `<p style="margin:8px 0 0;font-size:13px;color:rgba(212,196,160,0.7)">Lo despachamos por ${limpio(empresa)}.</p>` : ""}
    </div>
    <p style="margin:0 0 4px;font-size:13px;color:rgba(212,196,160,0.7)">Va a:</p>
    <p style="margin:0 0 20px">${aDonde(p)}</p>
    <p style="margin:0;font-size:13px;color:rgba(212,196,160,0.7)">
      El seguimiento puede tardar unas horas en aparecer en el sitio de la empresa de envío: recién
      queda registrado cuando el paquete pasa por su primer punto.
    </p>`;
  return mandar(p.email ?? "", `Tu pedido ${p.orden} va en camino · El Floema`, marco("Tu pedido va en camino", dentro), "aviso de envio");
}

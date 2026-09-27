import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getProductos } from "@/lib/productos-db";
import { crearPago, flowConfigurado } from "@/lib/flow";
import { crearPreferencia, mercadoPagoConfigurado } from "@/lib/mercadopago";
import {
  anotarOrdenFlow,
  anotarPagoMP,
  guardarPedido,
  pedidosConfigurado,
  type ItemPedido,
  type Pasarela,
} from "@/lib/pedidos";

// Guarda el pedido y crea el cobro en la pasarela que eligio la clienta.
//
// Hoy la tienda cobra por Mercado Pago: la cuenta de Flow no se pudo activar
// porque su verificacion llega por SMS y donde vive Camila no hay senal. El
// codigo de Flow queda listo; el dia que active la cuenta, basta con poner
// FLOW_API_KEY y FLOW_SECRET_KEY en Vercel y el boton aparece solo. Devuelve la direccion de pago, a la que el navegador la
// envia. Los precios se leen SIEMPRE del catalogo del servidor, nunca del
// cliente, para que no se puedan manipular.
//
// El GET dice que pasarelas estan disponibles, para que el checkout muestre
// solo los botones que de verdad funcionan. Si no hay ninguna configurada
// (ver lib/flow.ts, lib/mercadopago.ts y lib/pedidos.ts), el POST responde
// { configured: false } y el checkout muestra "el pago estará disponible pronto".

/** Que se puede usar hoy. Si falta la clave de Supabase no hay ninguna, porque
 *  sin guardar el pedido no sabriamos a donde despachar. */
function disponibles(): Pasarela[] {
  if (!pedidosConfigurado()) return [];
  const lista: Pasarela[] = [];
  if (flowConfigurado()) lista.push("flow");
  if (mercadoPagoConfigurado()) lista.push("mercadopago");
  return lista;
}

/* Que falta para poder cobrar. Son nombres de configuracion, no valores:
   sirve para que Camila vea desde el navegador que llave no quedo puesta en
   Vercel, sin tener que adivinar ni mandarme nada secreto. */
function falta(): string[] {
  const pendientes: string[] = [];
  if (!pedidosConfigurado()) pendientes.push("SUPABASE_SECRET_KEY");
  if (!flowConfigurado() && !mercadoPagoConfigurado()) {
    pendientes.push("MP_ACCESS_TOKEN (o las dos claves de Flow)");
  }
  return pendientes;
}

export async function GET() {
  const pasarelas = disponibles();
  return NextResponse.json(
    pasarelas.length > 0 ? { pasarelas } : { pasarelas, falta: falta() }
  );
}

type Pedido = { slug: string; cantidad: number };
type Cliente = {
  nombre?: string;
  email?: string;
  telefono?: string;
  metodoEnvio?: "domicilio" | "sucursal";
  direccion?: string;
  sucursal?: string;
  comentarios?: string;
};

const texto = (v: unknown, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  const pasarelas = disponibles();
  if (pasarelas.length === 0) {
    return NextResponse.json({ configured: false });
  }

  let body: { items?: Pedido[]; cliente?: Cliente; pasarela?: Pasarela };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "json_invalido" }, { status: 400 });
  }

  const pedido = Array.isArray(body.items) ? body.items : [];
  const productos = await getProductos();
  const items: ItemPedido[] = [];
  for (const it of pedido) {
    const p = productos.find((x) => x.slug === it?.slug && !x.oculto);
    if (!p || p.precio == null || p.precio <= 0) continue;
    const cantidad = Math.max(1, Math.min(99, Math.floor(Number(it.cantidad) || 1)));
    items.push({ slug: p.slug, nombre: p.nombre, cantidad, precio: p.precio });
  }
  if (items.length === 0) {
    return NextResponse.json({ error: "sin_items_con_precio" }, { status: 400 });
  }
  const total = items.reduce((s, x) => s + x.precio * x.cantidad, 0);

  const c = body.cliente ?? {};
  const email = texto(c.email, 120);
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "email_invalido" }, { status: 400 });
  }
  const metodo = c.metodoEnvio === "sucursal" ? "sucursal" : "domicilio";

  // Numero de pedido corto y legible, unico: EF-<fecha en base36>-<azar>.
  const orden = `EF-${Date.now().toString(36).toUpperCase()}-${randomBytes(2).toString("hex").toUpperCase()}`;

  /* La pedida, si esta disponible; si no, la primera que haya. Asi un enlace
     viejo o un navegador raro nunca deja a la clienta sin poder pagar. */
  const pasarela: Pasarela = pasarelas.includes(body.pasarela as Pasarela)
    ? (body.pasarela as Pasarela)
    : pasarelas[0];

  try {
    await guardarPedido({
      orden,
      pasarela,
      total,
      items,
      nombre: texto(c.nombre, 120),
      email,
      telefono: texto(c.telefono, 40),
      metodo_envio: metodo,
      direccion: metodo === "domicilio" ? texto(c.direccion) : null,
      sucursal: metodo === "sucursal" ? texto(c.sucursal) : null,
      comentarios: texto(c.comentarios, 600) || null,
    });
  } catch (e) {
    /* El motivo va SOLO a los registros del servidor, nunca en la respuesta.
       Se probo devolverlo para diagnosticar y el primer error que llego traia
       el valor entero de una clave secreta dentro del mensaje: un mensaje de
       error puede cargar cualquier cosa, asi que aqui no sale ninguno. */
    console.error("no se pudo guardar el pedido:", e);
    return NextResponse.json({ error: "no_se_guardo" }, { status: 500 });
  }

  const origin = process.env.SITIO_URL || req.headers.get("origin") || "https://elfloema.vercel.app";
  const unidades = items.reduce((s, x) => s + x.cantidad, 0);

  const asunto = `El Floema · pedido ${orden} (${unidades} ${unidades === 1 ? "producto" : "productos"})`;

  try {
    if (pasarela === "mercadopago") {
      const pago = await crearPreferencia({
        orden,
        items,
        email,
        nombre: texto(c.nombre, 120),
        urlRetorno: `${origin}/api/mercadopago/retorno`,
        urlAviso: `${origin}/api/mercadopago/aviso`,
      });
      await anotarPagoMP(orden, pago.preferenciaId).catch(() => {});
      return NextResponse.json({ url: pago.url });
    }

    const pago = await crearPago({
      orden,
      asunto,
      monto: total,
      email,
      urlConfirmacion: `${origin}/api/flow/confirmacion`,
      urlRetorno: `${origin}/api/flow/retorno`,
    });
    await anotarOrdenFlow(orden, pago.flowOrden).catch(() => {});
    return NextResponse.json({ url: pago.url });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "pasarela_error" }, { status: 502 });
  }
}

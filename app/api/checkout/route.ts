import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { getProductos } from "@/lib/productos-db";
import { crearPago, flowConfigurado } from "@/lib/flow";
import { anotarOrdenFlow, guardarPedido, pedidosConfigurado, type ItemPedido } from "@/lib/pedidos";

// Guarda el pedido y crea el cobro en Flow. Devuelve la direccion de pago de
// Flow, a la que el navegador envia a la clienta. Los precios se leen SIEMPRE
// del catalogo del servidor, nunca del cliente, para que no se puedan manipular.
//
// Mientras falten las claves (ver lib/flow.ts y lib/pedidos.ts), responde
// { configured: false } y el checkout muestra "el pago estará disponible pronto".

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
  if (!flowConfigurado() || !pedidosConfigurado()) {
    return NextResponse.json({ configured: false });
  }

  let body: { items?: Pedido[]; cliente?: Cliente };
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

  try {
    await guardarPedido({
      orden,
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
    console.error(e);
    return NextResponse.json({ error: "no_se_guardo" }, { status: 500 });
  }

  const origin = process.env.SITIO_URL || req.headers.get("origin") || "https://elfloema.vercel.app";
  const unidades = items.reduce((s, x) => s + x.cantidad, 0);

  try {
    const pago = await crearPago({
      orden,
      asunto: `El Floema · pedido ${orden} (${unidades} ${unidades === 1 ? "producto" : "productos"})`,
      monto: total,
      email,
      urlConfirmacion: `${origin}/api/flow/confirmacion`,
      urlRetorno: `${origin}/api/flow/retorno`,
    });
    await anotarOrdenFlow(orden, pago.flowOrden).catch(() => {});
    return NextResponse.json({ url: pago.url });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "flow_error" }, { status: 502 });
  }
}

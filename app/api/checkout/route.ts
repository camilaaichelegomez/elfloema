import { NextResponse } from "next/server";
import { productosTienda } from "@/lib/productos-tienda";

// Crea una preferencia de pago en MercadoPago y devuelve el init_point (URL de
// checkout). Los precios se leen SIEMPRE del catalogo del servidor, nunca del
// cliente, para que no se puedan manipular.
//
// Para activarlo, define en Vercel la variable de entorno:
//   MP_ACCESS_TOKEN = <Access Token de produccion de tu cuenta MercadoPago>
// (Configuracion > Credenciales en el panel de MercadoPago.)
// Mientras no exista, la ruta responde { configured: false } y el carrito
// muestra "el pago estará disponible pronto".

type ItemPedido = { slug: string; cantidad: number };

export async function POST(req: Request) {
  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json({ configured: false });
  }

  let body: { items?: ItemPedido[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "json_invalido" }, { status: 400 });
  }

  const pedido = Array.isArray(body.items) ? body.items : [];
  const mpItems = [];
  for (const it of pedido) {
    const p = productosTienda.find((x) => x.slug === it?.slug && !x.oculto);
    if (!p || p.precio == null || p.precio <= 0) continue;
    const cantidad = Math.max(1, Math.min(99, Math.floor(Number(it.cantidad) || 1)));
    mpItems.push({
      title: p.nombre,
      quantity: cantidad,
      unit_price: p.precio, // CLP no usa decimales
      currency_id: "CLP",
    });
  }

  if (mpItems.length === 0) {
    return NextResponse.json({ error: "sin_items_con_precio" }, { status: 400 });
  }

  const origin = req.headers.get("origin") ?? "https://elfloema.vercel.app";
  const preferencia = {
    items: mpItems,
    back_urls: {
      success: `${origin}/tienda?pago=exito`,
      failure: `${origin}/tienda?pago=error`,
      pending: `${origin}/tienda?pago=pendiente`,
    },
    auto_return: "approved",
    statement_descriptor: "EL FLOEMA",
  };

  try {
    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(preferencia),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "mercadopago_error" }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json({ init_point: data.init_point ?? data.sandbox_init_point });
  } catch {
    return NextResponse.json({ error: "conexion" }, { status: 502 });
  }
}

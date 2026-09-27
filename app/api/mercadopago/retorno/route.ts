import { NextResponse } from "next/server";
import { sincronizarPagoMercadoPago } from "@/lib/pedidos";

/* Aqui vuelve la clienta despues de pagar en Mercado Pago. En la direccion
   vienen el id del pago y un estado, pero ese estado NO se cree: se consulta
   el pago de verdad y recien entonces se la lleva a la pagina del pedido. */

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const pagoId = q.get("payment_id") ?? q.get("collection_id");
  const destino = new URL("/tienda/pedido", req.url);

  if (!pagoId || pagoId === "null") {
    destino.searchParams.set("estado", "desconocido");
    const orden = q.get("external_reference");
    if (orden) destino.searchParams.set("orden", orden);
    return NextResponse.redirect(destino, 303);
  }

  try {
    const { orden, estado } = await sincronizarPagoMercadoPago(pagoId);
    if (orden) destino.searchParams.set("orden", orden);
    destino.searchParams.set("estado", estado);
  } catch (e) {
    console.error(e);
    destino.searchParams.set("estado", "desconocido");
  }
  return NextResponse.redirect(destino, 303);
}

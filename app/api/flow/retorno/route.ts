import { NextResponse } from "next/server";
import { sincronizarPago } from "@/lib/pedidos";

// Aqui vuelve la clienta despues de pagar en Flow (Flow la envia con un POST
// que trae el token). Se revisa el pago y se la lleva a la pagina del pedido.

async function volver(req: Request, token: string | null) {
  const base = new URL("/tienda/pedido", req.url);
  if (token) {
    try {
      const { orden, estado } = await sincronizarPago(token);
      base.searchParams.set("orden", orden);
      base.searchParams.set("estado", estado);
    } catch (e) {
      console.error(e);
      base.searchParams.set("estado", "desconocido");
    }
  } else {
    base.searchParams.set("estado", "desconocido");
  }
  // 303: el navegador sigue con un GET aunque haya llegado con POST.
  return NextResponse.redirect(base, 303);
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const token = form?.get("token");
  return volver(req, typeof token === "string" ? token : null);
}

export async function GET(req: Request) {
  return volver(req, new URL(req.url).searchParams.get("token"));
}

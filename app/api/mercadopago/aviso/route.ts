import { NextResponse } from "next/server";
import { sincronizarPagoMercadoPago } from "@/lib/pedidos";

/* Mercado Pago avisa aqui cada vez que pasa algo con un pago. Manda el id, no
   el estado: el estado se le pregunta a Mercado Pago con ese id.

   Segun la version del aviso, el id viene en el cuerpo (data.id) o en la
   direccion (?data.id= o ?id=), asi que se buscan los dos. */

function idDelPago(url: URL, cuerpo: unknown): string | null {
  const q = url.searchParams;
  const tipo = q.get("type") ?? q.get("topic");
  if (tipo && tipo !== "payment") return null;

  const enUrl = q.get("data.id") ?? q.get("id");
  if (enUrl) return enUrl;

  const b = cuerpo as { type?: string; action?: string; data?: { id?: string | number } } | null;
  if (b?.type && b.type !== "payment") return null;
  if (b?.action && !b.action.startsWith("payment")) return null;
  return b?.data?.id ? String(b.data.id) : null;
}

export async function POST(req: Request) {
  const cuerpo = await req.json().catch(() => null);
  const id = idDelPago(new URL(req.url), cuerpo);
  // Un aviso que no es de un pago igual se responde 200: si no, Mercado Pago
  // lo reintenta para siempre.
  if (!id) return NextResponse.json({ ok: true, ignorado: true });

  try {
    await sincronizarPagoMercadoPago(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    // Con error, Mercado Pago vuelve a intentar mas tarde.
    return NextResponse.json({ error: "no_se_pudo_confirmar" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const id = idDelPago(new URL(req.url), null);
  if (!id) return NextResponse.json({ ok: true, ignorado: true });
  try {
    await sincronizarPagoMercadoPago(id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "no_se_pudo_confirmar" }, { status: 500 });
  }
}

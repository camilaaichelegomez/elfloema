import { NextResponse } from "next/server";
import { sincronizarPago } from "@/lib/pedidos";

// Flow avisa aqui, de servidor a servidor, cada vez que un pago cambia de
// estado. Solo manda un token: el estado real se le pregunta a Flow.

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const token = form?.get("token");
  if (typeof token !== "string" || !token) {
    return NextResponse.json({ error: "sin_token" }, { status: 400 });
  }
  try {
    await sincronizarPago(token);
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    // Un error hace que Flow vuelva a intentar el aviso mas tarde.
    return NextResponse.json({ error: "no_se_pudo_confirmar" }, { status: 500 });
  }
}

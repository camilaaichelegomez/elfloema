import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { avisarEnvio } from "@/lib/correo";

/* Marcar un pedido como despachado y avisarle a la clienta con el número de
   seguimiento.

   Pasa por el servidor y no desde el navegador porque la clave de Resend es
   secreta: no puede andar dando vueltas en la página. Pide sesión del Lab, y
   el correo solo puede ir a la dirección que viene guardada en ESE pedido:
   nunca se elige el destinatario desde afuera. */

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id, seguimiento, empresa } = (await req.json().catch(() => ({}))) as {
    id?: number;
    seguimiento?: string;
    empresa?: string;
  };
  if (!id) return NextResponse.json({ error: "Falta el pedido" }, { status: 400 });

  const numero = (seguimiento ?? "").trim();
  const porDonde = (empresa ?? "").trim();

  /* Se lee con la sesión de Camila, así que las reglas de la tabla siguen
     valiendo: solo puede tocar sus propios pedidos. */
  const { data: pedido, error } = await supabase
    .from("pedidos")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error || !pedido) return NextResponse.json({ error: "No se encontró el pedido" }, { status: 404 });

  const { error: errorAlGuardar } = await supabase
    .from("pedidos")
    .update({
      despachado: true,
      seguimiento: numero || null,
      empresa_envio: porDonde || null,
      despachado_en: new Date().toISOString(),
    })
    .eq("id", id);
  if (errorAlGuardar) {
    console.error("despachar:", errorAlGuardar.message);
    return NextResponse.json(
      { error: "No se pudo guardar. Puede que falte correr el SQL de las columnas nuevas." },
      { status: 500 }
    );
  }

  /* Sin número no se avisa: un correo que dice «va en camino» sin seguimiento
     no cumple lo que prometimos en la confirmación, y después no se puede
     desmandar. El pedido igual queda marcado como despachado. */
  if (!numero) {
    return NextResponse.json({ ok: true, correo: { ok: false, causa: "Sin número de seguimiento no se manda el correo." } });
  }

  const correo = await avisarEnvio(pedido, numero, porDonde || null);
  return NextResponse.json({ ok: true, correo });
}

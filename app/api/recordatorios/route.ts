import { NextRequest, NextResponse } from "next/server";
import { admin, avisosConfigurados } from "@/lib/florecer/avisos-servidor";
import { endpointValido, limpiarRecordatorios, zonaValida } from "@/lib/florecer/recordatorios";

/* Guarda (POST) o borra (DELETE) los recordatorios de un aparato.

   No pide cuenta: el aparato se identifica por su suscripción de avisos, una
   dirección larga e imposible de adivinar que entrega el navegador. Quien la
   tiene es ese aparato. Por eso nunca se devuelve en ninguna respuesta. */

const MAX_CUERPO = 32_000;
const MAX_APARATOS = 5_000;

async function leerJson(req: NextRequest) {
  const texto = await req.text();
  if (texto.length > MAX_CUERPO) return null;
  try {
    return JSON.parse(texto) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  if (!avisosConfigurados()) {
    return NextResponse.json({ error: "Los recordatorios todavía no están configurados." }, { status: 503 });
  }
  const cuerpo = await leerJson(req);
  const sus = cuerpo?.suscripcion as { endpoint?: unknown; keys?: { p256dh?: unknown; auth?: unknown } } | undefined;
  const p256dh = sus?.keys?.p256dh;
  const auth = sus?.keys?.auth;
  if (
    !cuerpo ||
    !endpointValido(sus?.endpoint) ||
    typeof p256dh !== "string" ||
    typeof auth !== "string" ||
    p256dh.length > 200 ||
    auth.length > 100 ||
    !zonaValida(cuerpo.zona)
  ) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const db = admin();

  /* Tope de aparatos. Guardar no pide cuenta, así que sin tope alguien
     podría llenar la tabla con suscripciones inventadas y hacer que el reloj
     se demore tanto que no alcance a avisarle a nadie. Un aparato que ya
     está guardado siempre puede actualizarse. */
  const { count } = await db.from("recordatorios_push").select("id", { count: "exact", head: true });
  if ((count ?? 0) >= MAX_APARATOS) {
    const { data: existe } = await db
      .from("recordatorios_push")
      .select("id")
      .eq("endpoint", sus!.endpoint as string)
      .maybeSingle();
    if (!existe) {
      console.error("recordatorios: se llegó al tope de aparatos");
      return NextResponse.json({ error: "No se pueden agregar más aparatos por ahora." }, { status: 503 });
    }
  }

  const { error } = await db
    .from("recordatorios_push")
    .upsert(
      {
        endpoint: sus!.endpoint as string,
        p256dh,
        auth,
        zona: cuerpo.zona,
        recordatorios: limpiarRecordatorios(cuerpo.recordatorios),
        actualizado: new Date().toISOString(),
      },
      { onConflict: "endpoint" },
    );
  if (error) {
    console.error("recordatorios: no se pudo guardar", error.message);
    return NextResponse.json({ error: "No se pudo guardar." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  if (!avisosConfigurados()) return NextResponse.json({ ok: true });
  const cuerpo = await leerJson(req);
  if (!cuerpo || !endpointValido(cuerpo.endpoint)) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }
  const { error } = await admin().from("recordatorios_push").delete().eq("endpoint", cuerpo.endpoint);
  if (error) {
    console.error("recordatorios: no se pudo borrar", error.message);
    return NextResponse.json({ error: "No se pudo borrar." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

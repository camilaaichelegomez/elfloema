import { NextRequest, NextResponse } from "next/server";
import { admin, avisosConfigurados, prepararWebPush, suscripcionMuerta, webpush } from "@/lib/florecer/avisos-servidor";
import { endpointValido } from "@/lib/florecer/recordatorios";

/* Un aviso de prueba, ahora mismo, al aparato que lo pide.

   Solo llega a una suscripción que ya está guardada, y solo a esa: conocer
   su dirección es lo que prueba que el aparato es el tuyo. Una vez por
   minuto como mucho, para que no sirva para molestar. */

export async function POST(req: NextRequest) {
  if (!avisosConfigurados()) {
    return NextResponse.json({ error: "Los recordatorios todavía no están configurados." }, { status: 503 });
  }
  let endpoint: unknown;
  try {
    const texto = await req.text();
    if (texto.length > 2000) throw new Error();
    endpoint = (JSON.parse(texto) as { endpoint?: unknown }).endpoint;
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }
  if (!endpointValido(endpoint)) return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });

  const db = admin();
  const { data: fila } = await db
    .from("recordatorios_push")
    .select("id, p256dh, auth, enviados")
    .eq("endpoint", endpoint)
    .maybeSingle();
  if (!fila) return NextResponse.json({ error: "Este aparato no tiene recordatorios activos." }, { status: 404 });

  const enviados = (fila.enviados ?? {}) as Record<string, string>;
  const ultima = Date.parse(enviados._prueba ?? "");
  if (Number.isFinite(ultima) && Date.now() - ultima < 60_000) {
    return NextResponse.json({ error: "Espera un minuto antes de otra prueba." }, { status: 429 });
  }

  prepararWebPush();
  try {
    await webpush.sendNotification(
      { endpoint, keys: { p256dh: fila.p256dh, auth: fila.auth } },
      JSON.stringify({
        titulo: "Florecer",
        cuerpo: "Así te van a llegar los recordatorios, aunque la app esté cerrada.",
        url: "/florecer",
        tag: "prueba",
      }),
      { TTL: 300 },
    );
  } catch (e) {
    const codigo = (e as { statusCode?: number }).statusCode;
    if (suscripcionMuerta(codigo)) await db.from("recordatorios_push").delete().eq("id", fila.id);
    return NextResponse.json({ error: "No se pudo enviar." }, { status: 502 });
  }
  await db
    .from("recordatorios_push")
    .update({ enviados: { ...enviados, _prueba: new Date().toISOString() } })
    .eq("id", fila.id);
  return NextResponse.json({ ok: true });
}

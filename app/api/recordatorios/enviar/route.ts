import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { admin, avisosConfigurados, prepararWebPush, suscripcionMuerta, webpush } from "@/lib/florecer/avisos-servidor";
import { ahoraEn, porEnviar, type Recordatorio } from "@/lib/florecer/recordatorios";

/* El reloj de los recordatorios. Lo llama Supabase cada cinco minutos
   (pg_cron + pg_net, en supabase_recordatorios.sql) con la contraseña
   CRON_SECRET. Revisa cada aparato, manda lo que le toca y anota que lo
   mandó para no repetirlo el mismo día.

   Si un aparato ya no existe (desinstalaron la app, quitaron el permiso) o
   la suscripción era inventada, el servicio de avisos lo dice y se borra su
   fila (ver suscripcionMuerta). */

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type Fila = {
  id: number;
  endpoint: string;
  p256dh: string;
  auth: string;
  zona: string;
  recordatorios: Recordatorio[];
  enviados: Record<string, string> | null;
};

function autorizado(req: NextRequest) {
  const secreto = process.env.CRON_SECRET;
  if (!secreto) return false;
  const llega = Buffer.from(req.headers.get("authorization") ?? "");
  const espera = Buffer.from(`Bearer ${secreto}`);
  return llega.length === espera.length && timingSafeEqual(llega, espera);
}

export async function GET(req: NextRequest) {
  if (!autorizado(req)) return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  if (!avisosConfigurados()) return NextResponse.json({ error: "Sin configurar." }, { status: 503 });
  prepararWebPush();

  const db = admin();
  let enviados = 0;
  let borrados = 0;
  let fallidos = 0;

  for (let desde = 0; ; desde += 500) {
    const { data, error } = await db
      .from("recordatorios_push")
      .select("id, endpoint, p256dh, auth, zona, recordatorios, enviados")
      .order("id")
      .range(desde, desde + 499);
    if (error) {
      console.error("recordatorios: no se pudo leer", error.message);
      return NextResponse.json({ error: "No se pudo leer." }, { status: 500 });
    }
    const filas = (data ?? []) as Fila[];

    await Promise.all(
      filas.map(async (f) => {
        let ahora;
        try {
          ahora = ahoraEn(f.zona);
        } catch {
          return;
        }
        const yaEnviados = f.enviados ?? {};
        const tocan = porEnviar(f.recordatorios ?? [], yaEnviados, ahora);
        if (tocan.length === 0) return;

        const nuevos: Record<string, string> = {};
        // Solo se guardan las marcas de los recordatorios que siguen existiendo.
        for (const r of f.recordatorios) if (yaEnviados[r.id]) nuevos[r.id] = yaEnviados[r.id];

        for (const r of tocan) {
          try {
            await webpush.sendNotification(
              { endpoint: f.endpoint, keys: { p256dh: f.p256dh, auth: f.auth } },
              JSON.stringify({ titulo: r.titulo, cuerpo: r.cuerpo, url: r.url, tag: r.id }),
              { TTL: 60 * 60, urgency: "normal" },
            );
            nuevos[r.id] = ahora.fecha;
            enviados++;
          } catch (e) {
            const codigo = (e as { statusCode?: number }).statusCode;
            if (suscripcionMuerta(codigo)) {
              await db.from("recordatorios_push").delete().eq("id", f.id);
              borrados++;
              return;
            }
            fallidos++;
            console.error("recordatorios: falló un envío", codigo);
          }
        }
        await db.from("recordatorios_push").update({ enviados: nuevos }).eq("id", f.id);
      }),
    );

    if (filas.length < 500) break;
  }

  return NextResponse.json({ ok: true, enviados, borrados, fallidos });
}

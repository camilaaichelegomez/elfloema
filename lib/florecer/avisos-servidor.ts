import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";

/* El lado del servidor de los recordatorios de Florecer.

   Variables en Vercel (las tres son necesarias; sin ellas los recordatorios
   quedan apagados y el resto del sitio funciona igual):
     NEXT_PUBLIC_VAPID_PUBLIC_KEY  la clave pública de los avisos
     VAPID_PRIVATE_KEY             la clave privada de los avisos (secreta)
     CRON_SECRET                   la contraseña que usa el reloj de Supabase
   Además usa SUPABASE_SECRET_KEY, que ya está puesta para los pedidos.

   La tabla es public.recordatorios_push (supabase_recordatorios.sql). Tiene
   RLS encendido y ninguna regla: solo este servidor, con la clave secreta,
   la lee y la escribe. */

export function avisosConfigurados() {
  return !!(
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY &&
    process.env.VAPID_PRIVATE_KEY &&
    process.env.SUPABASE_SECRET_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL
  );
}

export function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

let listo = false;
export function prepararWebPush() {
  if (listo) return;
  webpush.setVapidDetails(
    process.env.SITIO_URL || "https://elfloema.vercel.app",
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  );
  listo = true;
}

/* Respuestas del servicio de avisos que dicen que esa suscripción no sirve
   más: 404/410 ya no existe, 400 es inválida (inventada), 403 fue creada con
   otra clave. Se borra la fila para no insistir cada día. */
export function suscripcionMuerta(codigo: number | undefined) {
  return codigo === 400 || codigo === 403 || codigo === 404 || codigo === 410;
}

export { webpush };

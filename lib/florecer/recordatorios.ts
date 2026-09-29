/* Recordatorios de Florecer: lo que comparten el teléfono y el servidor.

   El teléfono arma la lista (los hábitos con hora y las horas elegidas para
   cada sección) y la manda al servidor. Cada cinco minutos el servidor revisa
   a quién le toca un aviso y lo empuja, aunque la app esté cerrada.

   Aquí solo hay lógica pura, sin navegador ni base de datos, para que se
   pueda probar sola y para que el servidor valide exactamente lo mismo que el
   teléfono manda. */

export type Recordatorio = {
  /** Único por aparato: «habito-abc», «seccion-yoga». */
  id: string;
  /** HH:MM en la hora local de la persona. */
  hora: string;
  /** Días de la semana (0 = domingo). Vacío = todos los días. */
  dias: number[];
  titulo: string;
  cuerpo: string;
  /** A dónde lleva al tocar el aviso. Siempre una ruta de Florecer. */
  url: string;
  /** Día local (YYYY-MM-DD) en que ya se hizo: ese día no se avisa. */
  hechoEl?: string;
};

export const MAX_RECORDATORIOS = 40;
export const RUTAS_PERMITIDAS = ["/florecer", "/yoga", "/ritual-facial", "/habitos", "/meditacion", "/fuerza", "/hipopresivos"];

/* Solo se guardan suscripciones de los servicios de avisos de los
   navegadores. El servidor le hace un pedido a esa dirección, así que dejar
   pasar cualquier URL permitiría usarlo para golpear sitios ajenos. */
const SERVICIOS_PUSH = [
  "fcm.googleapis.com",
  "android.googleapis.com",
  "updates.push.services.mozilla.com",
  "push.services.mozilla.com",
  "web.push.apple.com",
  "notify.windows.com",
];

export function endpointValido(endpoint: unknown): endpoint is string {
  if (typeof endpoint !== "string" || endpoint.length > 1000) return false;
  try {
    const u = new URL(endpoint);
    if (u.protocol !== "https:") return false;
    return SERVICIOS_PUSH.some((s) => u.hostname === s || u.hostname.endsWith(`.${s}`));
  } catch {
    return false;
  }
}

const HORA = /^([01]\d|2[0-3]):[0-5]\d$/;
const FECHA = /^\d{4}-\d{2}-\d{2}$/;

function texto(v: unknown, max: number) {
  return typeof v === "string" ? v.replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max) : "";
}

/** Limpia lo que llega del teléfono. Lo que no calza se descarta. */
export function limpiarRecordatorios(entrada: unknown): Recordatorio[] {
  if (!Array.isArray(entrada)) return [];
  const vistos = new Set<string>();
  const salida: Recordatorio[] = [];
  for (const r of entrada.slice(0, MAX_RECORDATORIOS)) {
    if (!r || typeof r !== "object") continue;
    const o = r as Record<string, unknown>;
    const id = texto(o.id, 80);
    const hora = typeof o.hora === "string" && HORA.test(o.hora) ? o.hora : "";
    const url = typeof o.url === "string" && RUTAS_PERMITIDAS.includes(o.url) ? o.url : "/florecer";
    const titulo = texto(o.titulo, 80);
    if (!id || !hora || !titulo || vistos.has(id)) continue;
    vistos.add(id);
    const dias = Array.isArray(o.dias)
      ? [...new Set(o.dias.filter((d): d is number => Number.isInteger(d) && d >= 0 && d <= 6))]
      : [];
    const hechoEl = typeof o.hechoEl === "string" && FECHA.test(o.hechoEl) ? o.hechoEl : undefined;
    salida.push({ id, hora, dias, titulo, cuerpo: texto(o.cuerpo, 160), url, ...(hechoEl ? { hechoEl } : {}) });
  }
  return salida;
}

export function zonaValida(zona: unknown): zona is string {
  if (typeof zona !== "string" || zona.length > 64) return false;
  try {
    new Intl.DateTimeFormat("es", { timeZone: zona });
    return true;
  } catch {
    return false;
  }
}

/** Fecha, día de la semana y minuto del día en una zona horaria. */
export function ahoraEn(zona: string, momento = new Date()) {
  const partes = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone: zona,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(momento)
      .map((p) => [p.type, p.value]),
  );
  const DIAS: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  return {
    fecha: `${partes.year}-${partes.month}-${partes.day}`,
    dia: DIAS[partes.weekday] ?? 0,
    minuto: Number(partes.hour) * 60 + Number(partes.minute),
  };
}

/* Un aviso que se atrasó (el reloj corre cada cinco minutos, y a veces se
   demora) igual sale si no pasó más de media hora. Más tarde que eso ya no
   sirve: un «toma agua» de las 8 que llega a las 11 es ruido. */
export const VENTANA_MINUTOS = 30;

/** Qué recordatorios tocan ahora y todavía no se enviaron hoy. */
export function porEnviar(
  recordatorios: Recordatorio[],
  enviados: Record<string, string>,
  ahora: { fecha: string; dia: number; minuto: number },
) {
  return recordatorios.filter((r) => {
    if (r.dias.length > 0 && !r.dias.includes(ahora.dia)) return false;
    if (r.hechoEl === ahora.fecha) return false;
    if (enviados[r.id] === ahora.fecha) return false;
    const [h, m] = r.hora.split(":").map(Number);
    const atraso = ahora.minuto - (h * 60 + m);
    return atraso >= 0 && atraso < VENTANA_MINUTOS;
  });
}

import { createHmac } from "node:crypto";

/* Conexión con Flow (flow.cl), la pasarela de pago de la tienda. Solo se usa
   en el servidor: las claves nunca llegan al navegador.

   Para activarlo, en Vercel → Settings → Environment Variables:
     FLOW_API_KEY     = la «API Key» de tu cuenta Flow
     FLOW_SECRET_KEY  = la «Secret Key»
   (Flow → Mis datos → Integración / Datos técnicos.)
   Opcional, para probar sin cobrar de verdad con las claves de sandbox.flow.cl:
     FLOW_API_URL     = https://sandbox.flow.cl/api

   Flow pide que cada llamada vaya firmada: se ordenan los parámetros por
   nombre, se pegan nombre y valor uno tras otro, y se firma eso con la
   Secret Key (HMAC-SHA256). */

const API = process.env.FLOW_API_URL || "https://www.flow.cl/api";

export function flowConfigurado() {
  return !!(process.env.FLOW_API_KEY && process.env.FLOW_SECRET_KEY);
}

function firmar(params: Record<string, string>) {
  const texto = Object.keys(params)
    .sort()
    .map((k) => k + params[k])
    .join("");
  return createHmac("sha256", process.env.FLOW_SECRET_KEY!).update(texto).digest("hex");
}

function conFirma(params: Record<string, string | number>) {
  const p: Record<string, string> = { apiKey: process.env.FLOW_API_KEY! };
  for (const [k, v] of Object.entries(params)) p[k] = String(v);
  return { ...p, s: firmar(p) };
}

async function leer<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = (data as { message?: string } | null)?.message ?? res.statusText;
    throw new Error(`Flow ${res.status}: ${msg}`);
  }
  return data as T;
}

/** Crea el cobro. Devuelve la dirección de Flow a la que se envía a la clienta. */
export async function crearPago(datos: {
  orden: string;
  asunto: string;
  monto: number;
  email: string;
  urlConfirmacion: string;
  urlRetorno: string;
  opcional?: Record<string, string>;
}) {
  const params = conFirma({
    commerceOrder: datos.orden,
    subject: datos.asunto,
    currency: "CLP",
    amount: datos.monto,
    email: datos.email,
    paymentMethod: 9, // todos los medios que tenga activos la cuenta
    urlConfirmation: datos.urlConfirmacion,
    urlReturn: datos.urlRetorno,
    ...(datos.opcional ? { optional: JSON.stringify(datos.opcional) } : {}),
  });
  const res = await fetch(`${API}/payment/create`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(params).toString(),
  });
  const r = await leer<{ url: string; token: string; flowOrder: number }>(res);
  return { url: `${r.url}?token=${r.token}`, flowOrden: r.flowOrder };
}

/** 1 pendiente · 2 pagado · 3 rechazado · 4 anulado */
export type EstadoFlow = 1 | 2 | 3 | 4;

/** Pregunta a Flow cómo quedó un pago. Es la única fuente de verdad: lo que
 *  llega en la URL o en el formulario de vuelta no se cree por sí solo. */
export async function estadoPago(token: string) {
  const qs = new URLSearchParams(conFirma({ token })).toString();
  const res = await fetch(`${API}/payment/getStatus?${qs}`, { cache: "no-store" });
  return leer<{
    flowOrder: number;
    commerceOrder: string;
    status: EstadoFlow;
    amount: number;
  }>(res);
}

export const NOMBRE_ESTADO: Record<EstadoFlow, "pendiente" | "pagado" | "rechazado" | "anulado"> = {
  1: "pendiente",
  2: "pagado",
  3: "rechazado",
  4: "anulado",
};

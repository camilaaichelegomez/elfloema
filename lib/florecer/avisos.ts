"use client";

import { hoy, leerDatos } from "@/lib/habitos/tipos";
import type { Recordatorio } from "@/lib/florecer/recordatorios";

/* Recordatorios con la app cerrada, del lado del teléfono.

   · Se activan con un toque (el navegador exige que el permiso salga de un
     toque de la persona, nunca solo).
   · La lista sale de dos lugares: los hábitos que tienen hora, y la hora que
     se eligió para cada sección. Se manda al servidor cada vez que cambia y
     al salir de la app, que es justo cuando hace falta que esté al día.
   · En iPhone solo funcionan con Florecer instalada en la pantalla de inicio
     (iOS 16.4 o más nuevo). Dentro de Safari, el sistema no los permite. */

const CLAVE = "floema-recordatorios";

export type Seccion = "yoga" | "cara" | "meditacion" | "fuerza";

export type Ajustes = {
  activo: boolean;
  secciones: Partial<Record<Seccion, string>>;
  /** Huella de lo último que se mandó, para no mandar lo mismo dos veces. */
  huella?: string;
};

export const SECCIONES: { id: Seccion; label: string; titulo: string; cuerpo: string; url: string; clave: string }[] = [
  { id: "yoga", label: "Yoga", titulo: "Tu práctica de yoga", cuerpo: "Ya está armada. Un rato para el cuerpo.", url: "/yoga", clave: "floema-yoga" },
  { id: "fuerza", label: "Fuerza", titulo: "Tu sesión de fuerza", cuerpo: "Con tu propio cuerpo, sin pesas.", url: "/fuerza", clave: "floema-fuerza" },
  { id: "cara", label: "Ritual facial", titulo: "Tu ritual facial", cuerpo: "Drenaje y yoga facial, paso a paso.", url: "/ritual-facial", clave: "floema-ritual-facial" },
  { id: "meditacion", label: "Meditación", titulo: "Un rato de meditación", cuerpo: "Sentarte un momento y volver a ti.", url: "/meditacion", clave: "" },
];

export function leerAjustes(): Ajustes {
  try {
    const raw = localStorage.getItem(CLAVE);
    if (raw) return { activo: false, secciones: {}, ...(JSON.parse(raw) as Partial<Ajustes>) };
  } catch {
    /* sin almacenamiento */
  }
  return { activo: false, secciones: {} };
}

export function guardarAjustes(a: Ajustes) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(a));
  } catch {
    /* modo privado */
  }
}

export function soportaAvisos() {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

/** iPhone o iPad abriendo Florecer desde Safari, sin instalar. */
export function iosSinInstalar() {
  if (typeof window === "undefined") return false;
  const ios = /iPhone|iPad|iPod/.test(navigator.userAgent);
  const instalada =
    window.matchMedia?.("(display-mode: standalone)").matches ||
    (navigator as Navigator & { standalone?: boolean }).standalone === true;
  return ios && !instalada;
}

/* El día en que se hizo cada sección, en fecha local. El yoga y el ritual lo
   anotan en hora universal: si es hoy en UTC, es hoy aquí también. */
function hechoHoy(clave: string) {
  if (!clave) return undefined;
  try {
    const g = JSON.parse(localStorage.getItem(clave) ?? "null") as {
      ultimoDia?: string;
      historial?: { dia: string }[];
    } | null;
    const dia = g?.ultimoDia ?? g?.historial?.[0]?.dia;
    const local = hoy();
    const utc = new Date().toISOString().slice(0, 10);
    return dia && (dia === local || dia === utc) ? local : undefined;
  } catch {
    return undefined;
  }
}

export function armarLista(a: Ajustes): Recordatorio[] {
  const lista: Recordatorio[] = [];
  const fecha = hoy();

  for (const s of SECCIONES) {
    const hora = a.secciones[s.id];
    if (!hora) continue;
    const hecho = hechoHoy(s.clave);
    lista.push({ id: `seccion-${s.id}`, hora, dias: [], titulo: s.titulo, cuerpo: s.cuerpo, url: s.url, ...(hecho ? { hechoEl: hecho } : {}) });
  }

  const datos = leerDatos();
  const hechosHoy = datos.hechos[fecha] ?? [];
  for (const h of datos.habitos) {
    if (!h.hora || h.archivado) continue;
    lista.push({
      id: `habito-${h.id}`,
      hora: h.hora,
      dias: h.dias,
      titulo: h.nombre,
      cuerpo: h.cuando ? `Tu plan: ${h.cuando}` : h.minimo ? `Aunque sea: ${h.minimo}` : "Tu hábito de hoy.",
      url: "/habitos",
      ...(hechosHoy.includes(h.id) ? { hechoEl: fecha } : {}),
    });
  }
  return lista;
}

function aBytes(base64: string) {
  const relleno = "=".repeat((4 - (base64.length % 4)) % 4);
  const b = atob((base64 + relleno).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(b, (c) => c.charCodeAt(0));
}

async function suscripcion(crear: boolean) {
  const reg = await navigator.serviceWorker.ready;
  const existente = await reg.pushManager.getSubscription();
  if (existente || !crear) return existente;
  const clave = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
  if (!clave) throw new Error("sin-configurar");
  return reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: aBytes(clave) });
}

function huellaDe(texto: string) {
  let h = 5381;
  for (let i = 0; i < texto.length; i++) h = ((h << 5) + h + texto.charCodeAt(i)) | 0;
  return `${texto.length}-${(h >>> 0).toString(36)}`;
}

/** Manda la lista al servidor si cambió. Devuelve false si algo falló. */
export async function enviarLista(opciones: { forzar?: boolean; alSalir?: boolean } = {}) {
  const a = leerAjustes();
  if (!a.activo || !soportaAvisos() || Notification.permission !== "granted") return true;
  try {
    const sus = await suscripcion(false);
    if (!sus) return false;
    const cuerpo = JSON.stringify({
      suscripcion: sus.toJSON(),
      zona: Intl.DateTimeFormat().resolvedOptions().timeZone,
      recordatorios: armarLista(a),
    });
    const huella = huellaDe(cuerpo);
    if (!opciones.forzar && huella === a.huella) return true;
    const res = await fetch("/api/recordatorios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: cuerpo,
      keepalive: !!opciones.alSalir,
    });
    if (!res.ok) return false;
    guardarAjustes({ ...leerAjustes(), huella });
    return true;
  } catch {
    return false;
  }
}

export type ResultadoActivar = "ok" | "denegado" | "sin-soporte" | "instalar" | "sin-configurar" | "error";

export async function activarAvisos(): Promise<ResultadoActivar> {
  if (iosSinInstalar()) return "instalar";
  if (!soportaAvisos()) return "sin-soporte";
  const permiso = await Notification.requestPermission();
  if (permiso !== "granted") return "denegado";
  try {
    await suscripcion(true);
  } catch (e) {
    return (e as Error).message === "sin-configurar" ? "sin-configurar" : "error";
  }
  guardarAjustes({ ...leerAjustes(), activo: true, huella: undefined });
  const ok = await enviarLista({ forzar: true });
  if (!ok) {
    guardarAjustes({ ...leerAjustes(), activo: false });
    return "error";
  }
  return "ok";
}

export async function desactivarAvisos() {
  guardarAjustes({ ...leerAjustes(), activo: false, huella: undefined });
  try {
    const sus = await suscripcion(false);
    if (!sus) return;
    await fetch("/api/recordatorios", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint: sus.endpoint }),
    });
    await sus.unsubscribe();
  } catch {
    /* si no hay red, el servidor la borra solo cuando el aviso rebote */
  }
}

/** Pide al servidor un aviso de prueba ahora mismo, a este aparato. */
export async function probarAviso() {
  try {
    const sus = await suscripcion(false);
    if (!sus) return false;
    const res = await fetch("/api/recordatorios/probar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ endpoint: sus.endpoint }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

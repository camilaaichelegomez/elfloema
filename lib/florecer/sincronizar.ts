"use client";

import { createClient } from "@/lib/supabase-browser";

/* Guardar lo tuyo en tu cuenta, y traerlo en el otro aparato.

   Cómo funciona, y por qué así:

   · Sin cuenta, la app funciona igual: todo vive en el navegador. Esto solo
     se enciende cuando hay sesión iniciada.
   · La fuente de verdad sigue siendo el navegador. La nube es una copia. Si
     no hay internet, se sigue usando y se sube después.
   · Para saber quién tiene lo más nuevo se guarda una huella de lo último
     que se subió. Si lo de este aparato cambió desde entonces, sube; si no
     cambió y en la nube hay algo más nuevo, baja. Así no hay que tocar el
     código de cada sección para avisar «guardé algo».

   Cuando hay conflicto —cambiaste en el teléfono y en el computador sin
   sincronizar entremedio— gana lo último guardado en este aparato, y lo otro
   se pierde. Es la regla simple y predecible; una mezcla automática de dos
   listas de hábitos haría cosas raras a espaldas de la persona. */

export type App = "yoga" | "cara" | "habitos";

export const CLAVES: Record<App, string> = {
  yoga: "floema-yoga",
  cara: "floema-ritual-facial",
  habitos: "floema-habitos",
};

const CLAVE_ESTADO = "floema-cuidado-sync";
const CLAVE_RECARGA = "floema-cuidado-recargado";

type Estado = Record<string, { huella: string; subidoEn: string }>;

/** Huella corta y estable del contenido: sirve para saber si cambió. */
function huella(texto: string) {
  let h = 5381;
  for (let i = 0; i < texto.length; i++) h = ((h << 5) + h + texto.charCodeAt(i)) | 0;
  return `${texto.length}-${(h >>> 0).toString(36)}`;
}

function leerEstado(): Estado {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_ESTADO) ?? "{}") as Estado;
  } catch {
    return {};
  }
}

function guardarEstado(e: Estado) {
  try {
    localStorage.setItem(CLAVE_ESTADO, JSON.stringify(e));
  } catch {
    /* sin espacio: la próxima vez se vuelve a comparar */
  }
}

export type Resultado = { subidas: App[]; bajadas: App[]; error?: string };

/** Sube lo que cambió aquí y baja lo que cambió en otro aparato. */
export async function sincronizar(): Promise<Resultado> {
  const salida: Resultado = { subidas: [], bajadas: [] };
  if (typeof window === "undefined") return salida;

  const supabase = createClient();
  const { data: sesion } = await supabase.auth.getUser();
  const usuario = sesion.user?.id;
  if (!usuario) return salida;

  const { data: remoto, error } = await supabase
    .from("cuidado_datos")
    .select("app, datos, actualizado")
    .eq("usuario", usuario);

  if (error) {
    // Lo más común: la tabla todavía no existe en Supabase.
    return { ...salida, error: error.message };
  }

  const estado = leerEstado();
  const porApp = new Map((remoto ?? []).map((r) => [r.app as App, r]));

  for (const app of Object.keys(CLAVES) as App[]) {
    const local = localStorage.getItem(CLAVES[app]);
    const fila = porApp.get(app);
    const anotado = estado[app];
    const huellaLocal = local ? huella(local) : null;
    const cambioAqui = !!local && (!anotado || anotado.huella !== huellaLocal);

    if (cambioAqui) {
      const { error: errorSubida } = await supabase.from("cuidado_datos").upsert(
        { usuario, app, datos: JSON.parse(local as string), actualizado: new Date().toISOString() },
        { onConflict: "usuario,app" }
      );
      if (!errorSubida) {
        estado[app] = { huella: huellaLocal as string, subidoEn: new Date().toISOString() };
        salida.subidas.push(app);
      }
      continue;
    }

    if (fila && (!anotado || fila.actualizado > anotado.subidoEn)) {
      const texto = JSON.stringify(fila.datos);
      if (texto !== local) {
        localStorage.setItem(CLAVES[app], texto);
        salida.bajadas.push(app);
      }
      estado[app] = { huella: huella(texto), subidoEn: fila.actualizado };
    }
  }

  guardarEstado(estado);
  return salida;
}

/* Si bajó algo mientras la pantalla ya estaba dibujada, lo que se ve quedó
   viejo: cada sección lee su parte al montarse. Se recarga una sola vez por
   sesión del navegador, para no dejar a nadie en un bucle de recargas. */
export function recargarSiHaceFalta(resultado: Resultado) {
  if (resultado.bajadas.length === 0) return false;
  if (sessionStorage.getItem(CLAVE_RECARGA)) return false;
  sessionStorage.setItem(CLAVE_RECARGA, "1");
  location.reload();
  return true;
}

/** Al cerrar sesión se olvida qué se había subido, no los datos del aparato. */
export function olvidarEstadoDeSincronia() {
  try {
    localStorage.removeItem(CLAVE_ESTADO);
    sessionStorage.removeItem(CLAVE_RECARGA);
  } catch {
    /* da igual */
  }
}

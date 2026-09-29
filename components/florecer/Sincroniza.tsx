"use client";

import { useEffect } from "react";
import { recargarSiHaceFalta, sincronizar } from "@/lib/florecer/sincronizar";
import { SincronizaAvisos } from "@/components/florecer/SincronizaAvisos";

/* Sincroniza en silencio.

   Va en las tres secciones: quien entra directo a /yoga sin pasar por la
   portada también quiere que lo suyo se guarde en su cuenta. Sin sesión
   iniciada no hace nada y no muestra nada. */
export function Sincroniza() {
  useEffect(() => {
    let vivo = true;
    const correr = async () => {
      const r = await sincronizar();
      if (vivo) recargarSiHaceFalta(r);
    };
    void correr();
    const alVolver = () => {
      if (!document.hidden) void correr();
    };
    document.addEventListener("visibilitychange", alVolver);
    return () => {
      vivo = false;
      document.removeEventListener("visibilitychange", alVolver);
    };
  }, []);
  return <SincronizaAvisos />;
}

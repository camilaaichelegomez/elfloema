"use client";

import { useEffect } from "react";
import { enviarLista } from "@/lib/florecer/avisos";

/* Mantiene al día, en el servidor, la lista de recordatorios de este
   aparato: al entrar, cada minuto si algo cambió (marcaste un hábito, le
   cambiaste la hora) y, sobre todo, al salir de la app, que es cuando el
   servidor necesita saber que hoy ya hiciste algo para no avisarte.

   Si los recordatorios están apagados no hace nada. Solo manda cuando la
   lista cambió, así que casi siempre no sale ningún pedido. */
export function SincronizaAvisos() {
  useEffect(() => {
    void enviarLista();
    const id = setInterval(() => void enviarLista(), 60_000);
    const alOcultar = () => {
      if (document.hidden) void enviarLista({ alSalir: true });
    };
    document.addEventListener("visibilitychange", alOcultar);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", alOcultar);
    };
  }, []);
  return null;
}

"use client";

import { useEffect } from "react";

/* Registra el service worker en scope "/" (antes era "/lab/").
   Con scope "/lab/" el worker no podía interceptar los archivos de la app,
   que viven en /_next/static/, así que sin conexión no había nada que servir
   y la app instalada no abría. */
export function RegistrarServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {});
  }, []);

  return null;
}

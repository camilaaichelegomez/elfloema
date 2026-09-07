"use client";

import { useEffect, useState } from "react";

/* Avisa si estás sin conexión y cuántos cambios quedaron esperando para
   subirse. Sin esto, guardar sin señal daría una falsa sensación de éxito. */
export function EstadoOffline() {
  const [enLinea, setEnLinea] = useState(true);
  const [pendientes, setPendientes] = useState(0);
  const [sincronizando, setSincronizando] = useState(false);

  useEffect(() => {
    setEnLinea(navigator.onLine);

    const alConectar = () => {
      setEnLinea(true);
      setSincronizando(true);
      navigator.serviceWorker?.controller?.postMessage("sincronizar");
      // Si en 8s no llegó confirmación, dejamos de mostrar "subiendo".
      setTimeout(() => setSincronizando(false), 8000);
    };
    const alDesconectar = () => setEnLinea(false);

    const alMensaje = (e: MessageEvent) => {
      if (e.data?.tipo === "cola-offline") {
        setPendientes(e.data.pendientes ?? 0);
        if ((e.data.pendientes ?? 0) === 0) setSincronizando(false);
      }
    };

    window.addEventListener("online", alConectar);
    window.addEventListener("offline", alDesconectar);
    navigator.serviceWorker?.addEventListener("message", alMensaje);
    navigator.serviceWorker?.ready.then(() =>
      navigator.serviceWorker.controller?.postMessage("estado-cola")
    );

    return () => {
      window.removeEventListener("online", alConectar);
      window.removeEventListener("offline", alDesconectar);
      navigator.serviceWorker?.removeEventListener("message", alMensaje);
    };
  }, []);

  // Todo normal y nada pendiente: no molestar.
  if (enLinea && pendientes === 0 && !sincronizando) return null;

  const texto = !enLinea
    ? pendientes > 0
      ? `Sin conexión · ${pendientes} ${pendientes === 1 ? "cambio guardado aquí" : "cambios guardados aquí"}`
      : "Sin conexión · viendo lo último cargado"
    : pendientes > 0
      ? `Subiendo ${pendientes} ${pendientes === 1 ? "cambio" : "cambios"}…`
      : "Cambios subidos";

  const tono = !enLinea ? "offline" : "sync";

  return (
    <div className={`lab-estado-offline lab-estado-offline--${tono}`} role="status" aria-live="polite">
      <span className="lab-estado-punto" aria-hidden="true" />
      {texto}
    </div>
  );
}

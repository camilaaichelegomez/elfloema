"use client";

import { useEffect, useState, type CSSProperties } from "react";

/* El botón de instalar.

   Las tres apps del sitio ya se pueden instalar desde el menú del navegador,
   pero ahí no las ve nadie: hay que saber que existe esa opción. Este botón
   la pone a la vista.

   Dos caminos, porque los navegadores no se comportan igual:

   · Android, Chrome y Edge avisan antes con `beforeinstallprompt`. Se guarda
     ese aviso y el botón lo dispara cuando la persona quiere, no cuando al
     navegador se le ocurre.
   · iPhone y iPad no tienen ese aviso: en Safari se instala a mano, desde
     Compartir → Añadir a pantalla de inicio. Ahí el botón muestra esos dos
     pasos, que es lo único que se puede hacer.

   Si la app ya está instalada y se está viendo desde ella, no aparece nada. */

type AvisoDeInstalacion = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function BotonInstalar({ nombre, estilo }: { nombre: string; estilo?: CSSProperties }) {
  const [aviso, setAviso] = useState<AvisoDeInstalacion | null>(null);
  const [instalada, setInstalada] = useState(true);
  const [enIOS, setEnIOS] = useState(false);
  const [mostrarPasos, setMostrarPasos] = useState(false);

  useEffect(() => {
    const abierta =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
    setInstalada(abierta);

    const ua = window.navigator.userAgent;
    // iPadOS se hace pasar por Mac: se delata por la pantalla táctil.
    const esIOS = /iphone|ipod|ipad/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1);
    setEnIOS(esIOS && /safari/i.test(ua) && !/crios|fxios|edgios/i.test(ua));

    const alAviso = (e: Event) => {
      e.preventDefault();
      setAviso(e as AvisoDeInstalacion);
    };
    const alInstalar = () => {
      setInstalada(true);
      setAviso(null);
    };
    window.addEventListener("beforeinstallprompt", alAviso);
    window.addEventListener("appinstalled", alInstalar);
    return () => {
      window.removeEventListener("beforeinstallprompt", alAviso);
      window.removeEventListener("appinstalled", alInstalar);
    };
  }, []);

  if (instalada) return null;
  if (!aviso && !enIOS) return null;

  const instalar = async () => {
    if (!aviso) return;
    await aviso.prompt();
    const { outcome } = await aviso.userChoice;
    if (outcome === "accepted") setInstalada(true);
    // El aviso se gasta al usarlo: el navegador manda otro si hace falta.
    setAviso(null);
  };

  return (
    <div style={{ margin: "0 0 1rem", ...estilo }}>
      <button
        type="button"
        onClick={() => (aviso ? void instalar() : setMostrarPasos((v) => !v))}
        style={{
          fontFamily: "var(--font-crimson), serif",
          fontSize: "0.92rem",
          color: "#c8a050",
          background: "rgba(200,160,80,0.1)",
          border: "1px solid rgba(200,160,80,0.35)",
          borderRadius: 4,
          padding: "0.5rem 0.9rem",
          cursor: "pointer",
        }}
      >
        Instalar {nombre} en este {enIOS ? "teléfono" : "dispositivo"}
      </button>

      {mostrarPasos && (
        <p
          style={{
            fontFamily: "var(--font-crimson), serif",
            fontSize: "0.88rem",
            color: "#a89878",
            maxWidth: "46ch",
            margin: "0.6rem 0 0",
            lineHeight: 1.5,
          }}
        >
          En el iPhone se instala a mano: toca el botón <strong>Compartir</strong> (el cuadrado con la
          flecha hacia arriba, abajo en la pantalla) y elige <strong>Añadir a pantalla de inicio</strong>.
          Queda como una app más, y funciona sin internet.
        </p>
      )}
    </div>
  );
}

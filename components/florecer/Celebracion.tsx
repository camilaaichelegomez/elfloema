"use client";

import { useEffect } from "react";

/* El cierre de una práctica o de un día de hábitos: la flor de Florecer se
   abre, pétalo por pétalo, y el teléfono da un pulso suave.

   Lo que más se recuerda de una experiencia es su mejor momento y cómo
   terminó (la regla del pico y el final). Por eso el final no es solo un
   texto: es un momento chico y bonito, sin fuegos artificiales.

   La vibración solo existe en Android; en iPhone no hace nada y no pasa nada.
   Con «reducir movimiento» activado, la flor aparece ya abierta. */

const PETALOS = [0, 72, 144, 216, 288];

export function Celebracion({ tamano = 96, vibrar = true }: { tamano?: number; vibrar?: boolean }) {
  useEffect(() => {
    if (!vibrar) return;
    try {
      navigator.vibrate?.([16, 70, 16]);
    } catch {
      /* sin vibración, igual se ve */
    }
  }, [vibrar]);

  return (
    <div className="celebracion" aria-hidden="true" style={{ width: tamano, height: tamano }}>
      <svg viewBox="-50 -50 100 100" width={tamano} height={tamano}>
        <circle className="celebracion-halo" r="44" />
        {PETALOS.map((giro, i) => (
          <g key={giro} transform={`rotate(${giro})`}>
            <path
              className="celebracion-petalo"
              style={{ animationDelay: `${0.08 + i * 0.09}s` }}
              d="M0 -8 C -11 -18 -9 -34 0 -40 C 9 -34 11 -18 0 -8 Z"
            />
          </g>
        ))}
        <circle className="celebracion-centro" r="7" />
      </svg>
    </div>
  );
}

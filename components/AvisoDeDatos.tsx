"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/* El aviso de la primera visita.

   No es un banner de cookies de los que piden permiso, porque no hay nada que
   permitir: el sitio no tiene analítica, ni píxeles, ni publicidad. Lo único
   que se guarda es lo necesario para que funcione (el carrito, las
   preferencias de las rutinas, la sesión del Lab), y eso la ley deja usarlo
   sin consentimiento.

   Lo que sí corresponde es decirlo. Por eso esto informa y enlaza a la
   política, sin bloquear la página ni perseguir a nadie.

   Si algún día se agrega Google Analytics, un píxel de Meta o cualquier
   medición, esto tiene que cambiar: ahí sí hay que pedir permiso ANTES de
   cargar el script, con la casilla desmarcada. */

const CLAVE = "floema-aviso-datos";
const UN_ANO = 365 * 24 * 60 * 60 * 1000;

export function AvisoDeDatos() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const visto = Number(localStorage.getItem(CLAVE) ?? 0);
      if (!visto || Date.now() - visto > UN_ANO) {
        // Un respiro antes de aparecer: que primero se vea la página.
        const id = window.setTimeout(() => setVisible(true), 1200);
        return () => window.clearTimeout(id);
      }
    } catch {
      /* modo privado o almacenamiento bloqueado: no se muestra y no pasa nada */
    }
  }, []);

  function cerrar() {
    setVisible(false);
    try {
      localStorage.setItem(CLAVE, String(Date.now()));
    } catch {
      /* si no se puede guardar, volverá a aparecer; es lo menos malo */
    }
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Aviso sobre datos"
      style={{
        position: "fixed",
        left: "clamp(0.75rem, 3vw, 1.5rem)",
        right: "clamp(0.75rem, 3vw, 1.5rem)",
        bottom: "clamp(0.75rem, 3vw, 1.5rem)",
        maxWidth: 520,
        marginInline: "auto",
        zIndex: 120,
        background: "rgba(9,14,9,0.96)",
        border: "1px solid rgba(200,160,80,0.35)",
        borderRadius: 8,
        boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
        padding: "1rem 1.1rem",
        animation: "aviso-datos-entra 0.5s ease-out",
      }}
    >
      <style>{`
        @keyframes aviso-datos-entra {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [aria-label="Aviso sobre datos"] { animation: none !important; }
        }
      `}</style>

      <p
        style={{
          fontFamily: "var(--font-crimson), serif",
          fontSize: "0.95rem",
          lineHeight: 1.7,
          color: "#d4c4a0",
          margin: "0 0 0.8rem",
        }}
      >
        Esta página guarda en tu dispositivo solo lo necesario para funcionar: tu carrito y las
        preferencias de las rutinas. <strong style={{ color: "#e8c878" }}>No usamos cookies de
        publicidad ni de seguimiento</strong>, y no compartimos tus datos con nadie.
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", alignItems: "center" }}>
        <button type="button" onClick={cerrar} style={boton}>
          Entendido
        </button>
        <Link href="/privacidad#cookies" onClick={cerrar} style={enlace}>
          Leer la política
        </Link>
      </div>
    </div>
  );
}

const boton = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.68rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  color: "#12200f",
  background: "linear-gradient(135deg, #e8c878, #c8a050)",
  border: "none",
  borderRadius: 3,
  padding: "0.6rem 1.2rem",
  cursor: "pointer",
};

const enlace = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.68rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  color: "rgba(212,196,160,0.75)",
  textDecoration: "underline",
  textDecorationColor: "rgba(200,160,80,0.4)",
};

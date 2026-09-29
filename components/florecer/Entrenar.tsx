"use client";

import Link from "next/link";
import { useSyncExternalStore, type CSSProperties } from "react";
import { Sena } from "@/components/florecer/senas";
import { hoy } from "@/lib/habitos/tipos";

/* Entrenar: la puerta a las tres prácticas de movimiento.

   Yoga, Fuerza e Hipopresivos comparten una pestaña en la barra de abajo.
   Aquí se elige cuál, y de un vistazo se ve cuándo se hizo cada una por
   última vez: así se nota qué toca sin tener que acordarse. */

const PRACTICAS = [
  {
    href: "/yoga",
    titulo: "Yoga",
    linea: "La práctica de hoy, armada para lo que necesites.",
    sena: "yoga",
    clave: "floema-yoga",
  },
  {
    href: "/fuerza",
    titulo: "Fuerza",
    linea: "Masa muscular con tu propio cuerpo, subiendo de a poco.",
    sena: "fuerza",
    clave: "floema-fuerza",
  },
  {
    href: "/hipopresivos",
    titulo: "Hipopresivos",
    linea: "Respiración y pausa guiadas, para el centro del cuerpo.",
    sena: "hipopresivos",
    clave: "floema-hipopresivos",
  },
];

/* El último día en que se hizo cada práctica. El yoga lo guarda en
   «ultimoDia» (en hora universal); fuerza e hipopresivos, en su historial. */
function ultimoDia(clave: string): string | null {
  try {
    const g = JSON.parse(localStorage.getItem(clave) ?? "null") as {
      ultimoDia?: string;
      historial?: { dia: string }[];
    } | null;
    return g?.ultimoDia || g?.historial?.[0]?.dia || null;
  } catch {
    return null;
  }
}

function estado(clave: string) {
  const dia = ultimoDia(clave);
  if (!dia) return "Todavía no empiezas";
  const local = hoy();
  const utc = new Date().toISOString().slice(0, 10);
  if (dia === local || dia === utc) return "Hecha hoy ✓";
  const dias = Math.round((Date.parse(local) - Date.parse(dia)) / 86_400_000);
  if (dias <= 1) return "Ayer";
  return `Hace ${dias} días`;
}

const sinSuscribir = () => () => {};

export function Entrenar() {
  // El estado de cada práctica vive en el aparato: se lee al montar.
  const montado = useSyncExternalStore(sinSuscribir, () => true, () => false);

  return (
    <nav aria-label="Prácticas de entrenamiento" style={{ display: "grid", gap: "0.9rem" }}>
      {PRACTICAS.map((p) => {
        const e = montado ? estado(p.clave) : "";
        return (
          <Link prefetch={false} key={p.href} href={p.href} style={tarjeta}>
            <span style={{ color: "#e8c878", display: "flex" }}>
              <Sena cual={p.sena} tamano={56} />
            </span>
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={titulo}>{p.titulo}</span>
              <span style={linea}>{p.linea}</span>
              {e && <span style={{ ...linea, color: e.startsWith("Hecha") ? "#a8c88a" : "rgba(232,200,120,0.9)", marginTop: "0.35rem", fontSize: "0.9rem" }}>{e}</span>}
            </span>
            <span aria-hidden="true" style={{ color: "#c8a050", fontSize: "1.4rem" }}>
              ›
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

const tarjeta: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  textDecoration: "none",
  border: "1px solid rgba(200,160,80,0.28)",
  background: "rgba(12,22,12,0.78)",
  backdropFilter: "blur(3px)",
  borderRadius: 10,
  padding: "clamp(1rem, 3vw, 1.4rem)",
  minHeight: 96,
};

const titulo: CSSProperties = {
  display: "block",
  fontFamily: "var(--font-grimoire)",
  fontSize: "clamp(1.1rem, 4vw, 1.3rem)",
  letterSpacing: "0.06em",
  color: "#f2dc9c",
  marginBottom: "0.2rem",
};

const linea: CSSProperties = {
  display: "block",
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.98rem",
  lineHeight: 1.45,
  color: "#d9cbaa",
};

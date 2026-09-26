"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { habitosDe, hoy as hoyTexto, leerDatos, tareasDe } from "@/lib/habitos/tipos";

/* La portada de El Floema Cuidado.

   Las tres secciones —la práctica de yoga, el ritual facial y los hábitos—
   eran tres apps instalables distintas, y tener tres iconos en el teléfono
   para el mismo rato del día no tenía sentido. Ahora son una sola, y esta es
   la pantalla que se abre.

   Lo primero no son las tres puertas, es el estado del día: qué te falta hoy
   y cuántos días seguidos llevas. Las puertas van debajo. */

type Resumen = {
  habitosHechos: number;
  habitosTotal: number;
  tareas: number;
  rachaYoga: number;
  yogaHoy: boolean;
  caraHoy: boolean;
};

function leerRacha(clave: string) {
  try {
    const raw = localStorage.getItem(clave);
    if (!raw) return { racha: 0, ultimoDia: "" };
    const g = JSON.parse(raw) as { racha?: number; ultimoDia?: string };
    return { racha: g.racha ?? 0, ultimoDia: g.ultimoDia ?? "" };
  } catch {
    return { racha: 0, ultimoDia: "" };
  }
}

/* Tres señas dibujadas a mano, del mismo grosor y el mismo dorado: una
   figura de pie, una cara de perfil y una lista con sus marcas. Con fotos,
   cada tarjeta tiraba para su lado. */
const SENAS: Record<string, React.ReactNode> = {
  yoga: (
    <>
      <circle cx="30" cy="12" r="5" />
      <path d="M30 17 L30 36" />
      <path d="M30 22 L20 15 M30 22 L40 15" />
      <path d="M30 36 L24 52 M30 36 L37 52" />
      <path d="M18 52 L42 52" opacity="0.5" />
    </>
  ),
  cara: (
    <>
      <path d="M22 16 q10 -8 18 2 q5 6 3 16 q-2 12 -12 14 q-9 2 -11 -10" />
      <path d="M26 26 q3 -2 6 0" />
      <path d="M28 38 q4 3 8 0" />
      <path d="M44 24 q6 6 2 14" opacity="0.55" />
      <path d="M49 22 q8 8 3 19" opacity="0.35" />
    </>
  ),
  habitos: (
    <>
      <rect x="14" y="12" width="12" height="12" rx="2" />
      <path d="M17 18 l3 3 l5 -6" />
      <rect x="14" y="30" width="12" height="12" rx="2" />
      <path d="M17 36 l3 3 l5 -6" />
      <rect x="14" y="48" width="12" height="10" rx="2" opacity="0.5" />
      <path d="M32 18 L50 18 M32 36 L50 36 M32 53 L46 53" opacity="0.6" />
    </>
  ),
};

function Sena({ cual }: { cual: string }) {
  return (
    <svg
      viewBox="0 0 62 64"
      width="52"
      height="54"
      fill="none"
      stroke="#c8a050"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {SENAS[cual]}
    </svg>
  );
}

const SECCIONES = [
  {
    href: "/yoga",
    titulo: "Ritual de yoga",
    linea: "La práctica de hoy, armada para lo que necesites.",
    sena: "yoga",
  },
  {
    href: "/ritual-facial",
    titulo: "Ritual facial",
    linea: "Drenaje linfático y yoga facial, paso a paso.",
    sena: "cara",
  },
  {
    href: "/habitos",
    titulo: "Hábitos",
    linea: "Tus objetivos, lo de cada día y lo que hay que hacer.",
    sena: "habitos",
  },
];

export function Portada() {
  const [resumen, setResumen] = useState<Resumen | null>(null);

  useEffect(() => {
    const fecha = hoyTexto();
    const datos = leerDatos();
    const habitos = habitosDe(datos, fecha);
    const hechos = datos.hechos[fecha] ?? [];
    const tareas = tareasDe(datos, fecha);
    const yoga = leerRacha("floema-yoga");
    const cara = leerRacha("floema-ritual-facial");
    setResumen({
      habitosHechos: habitos.filter((h) => hechos.includes(h.id)).length,
      habitosTotal: habitos.length,
      tareas: tareas.delDia.length + tareas.atrasadas.length,
      rachaYoga: yoga.racha,
      yogaHoy: yoga.ultimoDia === fecha,
      caraHoy: cara.ultimoDia === fecha,
    });
  }, []);

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {resumen && (
        <div style={panel}>
          <p style={rotulo}>Hoy</p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.4rem" }}>
            <li style={linea}>
              {resumen.habitosTotal === 0
                ? "Todavía no tienes hábitos anotados."
                : resumen.habitosHechos === resumen.habitosTotal
                  ? `Los ${resumen.habitosTotal} hábitos de hoy, cumplidos.`
                  : `${resumen.habitosHechos} de ${resumen.habitosTotal} hábitos.`}
            </li>
            {resumen.tareas > 0 && (
              <li style={linea}>
                {resumen.tareas} {resumen.tareas === 1 ? "tarea pendiente" : "tareas pendientes"}.
              </li>
            )}
            <li style={linea}>
              {resumen.yogaHoy
                ? "Ya hiciste tu práctica de yoga."
                : resumen.rachaYoga > 0
                  ? `Llevas ${resumen.rachaYoga} ${resumen.rachaYoga === 1 ? "día" : "días"} de yoga seguidos.`
                  : "La práctica de yoga te espera."}
            </li>
            {resumen.caraHoy && <li style={linea}>El ritual facial de hoy está hecho.</li>}
          </ul>
        </div>
      )}

      <nav style={{ display: "grid", gap: "0.8rem" }}>
        {SECCIONES.map((s) => (
          <Link key={s.href} href={s.href} style={{ ...panel, ...tarjetaEnlace }}>
            <Sena cual={s.sena} />
            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={tituloSeccion}>{s.titulo}</span>
              <span style={{ ...linea, display: "block", opacity: 0.75 }}>{s.linea}</span>
            </span>
            <span aria-hidden="true" style={{ color: "#c8a050", fontSize: "1.3rem" }}>
              ›
            </span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.22)",
  background: "rgba(12,22,12,0.72)",
  backdropFilter: "blur(3px)",
  borderRadius: 8,
  padding: "clamp(0.9rem, 2.6vw, 1.4rem)",
};

const tarjetaEnlace: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.9rem",
  textDecoration: "none",
};

const rotulo: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.6rem",
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: "rgba(200,160,80,0.7)",
  margin: "0 0 0.6rem",
};

const tituloSeccion: CSSProperties = {
  display: "block",
  fontFamily: "var(--font-grimoire)",
  fontSize: "1.02rem",
  letterSpacing: "0.06em",
  color: "#e8c878",
  marginBottom: "0.2rem",
};

const linea: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.96rem",
  lineHeight: 1.5,
  color: "#d9cbaa",
};

"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { Sena } from "@/components/florecer/senas";
import { habitosDe, hoy as hoyTexto, leerDatos, tareasDe } from "@/lib/habitos/tipos";

/* La portada de Florecer.

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
  {
    href: "/meditacion",
    titulo: "Meditación",
    linea: "Sentarse un rato, y toda la teoría de por qué sirve.",
    sena: "meditacion",
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
          <Link prefetch={false} key={s.href} href={s.href} style={{ ...panel, ...tarjetaEnlace }}>
            <span style={{ color: "#c8a050", display: "flex" }}>
              <Sena cual={s.sena} />
            </span>
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

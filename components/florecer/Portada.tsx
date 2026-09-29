"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { Sena } from "@/components/florecer/senas";
import { habitosDe, hoy as hoyTexto, leerDatos, sumarDias, tareasDe } from "@/lib/habitos/tipos";

/* La portada de Florecer.

   Las tres secciones —la práctica de yoga, el ritual facial y los hábitos—
   eran tres apps instalables distintas, y tener tres iconos en el teléfono
   para el mismo rato del día no tenía sentido. Ahora son una sola, y esta es
   la pantalla que se abre.

   Lo primero no son las puertas, es lo que toca ahora: una sola tarjeta
   grande con un botón, elegida según la hora y lo que ya hiciste. Una acción
   clara al abrir es lo que más ayuda a volver cada día (menos decisiones,
   menos fricción). Debajo va el resumen del día y, al final, las puertas. */

type Siguiente = {
  href: string;
  sena: string;
  titulo: string;
  detalle: string;
  boton: string;
};

type Resumen = {
  siguiente: Siguiente | null;
  saludo: string;
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

/* Minutos que cada sección tiene guardados en sus preferencias, para decir
   cuánto rato va a tomar antes de tocar el botón. */
function leerMinutos(clave: string): number | null {
  try {
    const raw = localStorage.getItem(clave);
    if (!raw) return null;
    const g = JSON.parse(raw) as { minutos?: number; prefs?: { minutos?: number } };
    return g.prefs?.minutos ?? g.minutos ?? null;
  } catch {
    return null;
  }
}

function leerUltimaFuerza(): string | null {
  try {
    const raw = localStorage.getItem("floema-fuerza");
    if (!raw) return null;
    const g = JSON.parse(raw) as { historial?: { dia: string }[] };
    return g.historial?.[0]?.dia ?? "";
  } catch {
    return null;
  }
}

function saludoDe(hora: number) {
  if (hora >= 5 && hora < 12) return "Buenos días";
  if (hora >= 12 && hora < 20) return "Buenas tardes";
  return "Buenas noches";
}

/* Qué toca ahora. Cada momento del día tiene su orden: en la mañana primero
   el cuerpo, al mediodía lo pendiente, en la noche lo que calma. Se muestra
   lo primero de esa lista que todavía no está hecho hoy. */
function elegirSiguiente(
  hora: number,
  estado: {
    yogaHoy: boolean;
    caraHoy: boolean;
    habitosFaltan: number;
    habitosTotal: number;
    fuerzaToca: boolean;
  },
): Siguiente | null {
  const minYoga = leerMinutos("floema-yoga");
  const minMedita = leerMinutos("floema-meditacion");
  const minFuerza = leerMinutos("floema-fuerza");

  const yoga: Siguiente | null = estado.yogaHoy
    ? null
    : {
        href: "/yoga",
        sena: "yoga",
        titulo: "Tu práctica de yoga",
        detalle: minYoga ? `${minYoga} minutos, ya armada para ti.` : "Respondes unas preguntas y queda armada.",
        boton: "Empezar",
      };
  const habitos: Siguiente | null =
    estado.habitosFaltan > 0
      ? {
          href: "/habitos",
          sena: "habitos",
          titulo:
            estado.habitosFaltan === 1 ? "Te falta 1 hábito" : `Te faltan ${estado.habitosFaltan} hábitos`,
          detalle: "Márcalos a medida que los haces.",
          boton: "Ver mis hábitos",
        }
      : null;
  const cara: Siguiente | null = estado.caraHoy
    ? null
    : {
        href: "/ritual-facial",
        sena: "cara",
        titulo: "Tu ritual facial",
        detalle: "Drenaje y yoga facial, paso a paso.",
        boton: "Empezar",
      };
  const fuerza: Siguiente | null = estado.fuerzaToca
    ? {
        href: "/fuerza",
        sena: "fuerza",
        titulo: "Tu sesión de fuerza",
        detalle: minFuerza ? `${minFuerza} minutos, con tu propio cuerpo.` : "Con tu propio cuerpo, sin pesas.",
        boton: "Empezar",
      }
    : null;
  const medita: Siguiente = {
    href: "/meditacion",
    sena: "meditacion",
    titulo: "Un rato de meditación",
    detalle: minMedita ? `${minMedita} minutos para aterrizar.` : "Desde un minuto, con campana y voz.",
    boton: "Sentarme",
  };
  const primerHabito: Siguiente | null =
    estado.habitosTotal === 0
      ? {
          href: "/habitos",
          sena: "habitos",
          titulo: "Anota tu primer hábito",
          detalle: "Con uno basta para partir.",
          boton: "Empezar",
        }
      : null;

  const orden =
    hora >= 5 && hora < 12
      ? [yoga, fuerza, habitos, cara]
      : hora >= 12 && hora < 18
        ? [habitos, fuerza, yoga, cara]
        : [cara, habitos, yoga, fuerza];
  // La meditación no lleva registro del día: se ofrece cuando lo demás está hecho.
  return orden.find(Boolean) ?? primerHabito ?? (hora >= 18 || hora < 5 ? medita : null);
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
  {
    href: "/fuerza",
    titulo: "Fuerza",
    linea: "Masa muscular con tu propio cuerpo, subiendo de a poco.",
    sena: "fuerza",
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
    /* El yoga y el ritual anotan el día en hora universal y los hábitos en
       hora local: en la noche de Chile ya son «mañana» en UTC. Se acepta
       cualquiera de las dos para no ofrecer algo que ya se hizo. */
    const fechaUtc = new Date().toISOString().slice(0, 10);
    const esHoy = (d: string) => d === fecha || d === fechaUtc;
    const hechosHoy = habitos.filter((h) => hechos.includes(h.id)).length;
    const hora = new Date().getHours();
    /* Fuerza no es de todos los días: toca si no se hizo hoy ni ayer (el
       músculo crece en el descanso). Solo se propone si ya hay rutina. */
    const ultimaFuerza = leerUltimaFuerza();
    const fuerzaToca =
      ultimaFuerza !== null && ultimaFuerza !== fecha && ultimaFuerza !== sumarDias(fecha, -1);
    const estado = {
      fuerzaToca,
      yogaHoy: esHoy(yoga.ultimoDia),
      caraHoy: esHoy(cara.ultimoDia),
      habitosFaltan: habitos.length - hechosHoy,
      habitosTotal: habitos.length,
    };
    setResumen({
      siguiente: elegirSiguiente(hora, estado),
      saludo: saludoDe(hora),
      habitosHechos: hechosHoy,
      habitosTotal: habitos.length,
      tareas: tareas.delDia.length + tareas.atrasadas.length,
      rachaYoga: yoga.racha,
      yogaHoy: estado.yogaHoy,
      caraHoy: estado.caraHoy,
    });
  }, []);

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {resumen && (
        <section aria-label="Lo que toca ahora" style={ahora}>
          <p style={rotulo}>{resumen.saludo}</p>
          {resumen.siguiente ? (
            <Link prefetch={false} href={resumen.siguiente.href} style={ahoraEnlace}>
              <span style={{ display: "flex", gap: "0.9rem", alignItems: "center" }}>
                <span style={{ color: "#e8c878", display: "flex" }}>
                  <Sena cual={resumen.siguiente.sena} tamano={46} />
                </span>
                <span style={{ minWidth: 0 }}>
                  <span style={ahoraTitulo}>{resumen.siguiente.titulo}</span>
                  <span style={{ ...linea, display: "block" }}>{resumen.siguiente.detalle}</span>
                </span>
              </span>
              <span style={botonGrande}>{resumen.siguiente.boton} →</span>
            </Link>
          ) : (
            <div style={{ display: "flex", gap: "0.9rem", alignItems: "center" }}>
              <span style={{ color: "#e8c878", display: "flex" }}>
                <Sena cual="hoy" tamano={46} />
              </span>
              <span>
                <span style={ahoraTitulo}>Por hoy está todo</span>
                <span style={{ ...linea, display: "block" }}>
                  Lo que te propusiste, hecho. Descansa, que mañana sigue.
                </span>
              </span>
            </div>
          )}
        </section>
      )}

      {resumen && (
        <div style={panel}>
          <p style={rotulo}>Tu día</p>
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

/* La tarjeta de «ahora» es la única cosa grande de la pantalla: más luz en
   el borde, más aire, y el botón dorado lleno. Todo lo demás queda debajo. */
const ahora: CSSProperties = {
  border: "1px solid rgba(232,200,120,0.5)",
  background: "linear-gradient(160deg, rgba(40,52,24,0.85), rgba(12,22,12,0.85))",
  backdropFilter: "blur(4px)",
  borderRadius: 12,
  padding: "clamp(1.1rem, 3.4vw, 1.6rem)",
  boxShadow: "0 10px 40px rgba(0,0,0,0.35), 0 0 60px rgba(200,160,80,0.08)",
};

const ahoraEnlace: CSSProperties = {
  display: "grid",
  gap: "1.1rem",
  textDecoration: "none",
};

const ahoraTitulo: CSSProperties = {
  display: "block",
  fontFamily: "var(--font-grimoire)",
  fontSize: "clamp(1.15rem, 4.4vw, 1.4rem)",
  letterSpacing: "0.04em",
  color: "#f2dc9c",
  marginBottom: "0.25rem",
  textWrap: "balance",
};

const botonGrande: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 52,
  borderRadius: 8,
  background: "linear-gradient(135deg, #e8c878, #c8a050)",
  color: "#12200f",
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.86rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  fontWeight: 600,
};

const tarjetaEnlace: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.9rem",
  textDecoration: "none",
};

const rotulo: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.7rem",
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: "rgba(200,160,80,0.85)",
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

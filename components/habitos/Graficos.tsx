"use client";

import {
  cumplimiento,
  habitosDe,
  hoy,
  racha,
  sumarDias,
  type Datos,
} from "@/lib/habitos/tipos";
import { ayuda, panel, rotulo, titulo } from "./estilos";

/* Los gráficos.

   Tres preguntas, tres dibujos: cómo va la constancia semana a semana, qué
   hábito se sostiene y cuál no, y cuántas tareas se están cerrando. Todo en
   SVG dibujado a mano: son pocos datos y no vale la pena traer una librería
   de gráficos entera para esto. */

const ORO = "#c8a050";
const VERDE = "#a8c88a";
const TENUE = "rgba(200,160,80,0.16)";

/** El día en que empieza la semana (lunes) de una fecha cualquiera. */
function lunesDe(fecha: string) {
  const [a, m, d] = fecha.split("-").map(Number);
  const f = new Date(a, m - 1, d);
  const dia = (f.getDay() + 6) % 7; // 0 = lunes
  f.setDate(f.getDate() - dia);
  const mm = `${f.getMonth() + 1}`.padStart(2, "0");
  const dd = `${f.getDate()}`.padStart(2, "0");
  return `${f.getFullYear()}-${mm}-${dd}`;
}

/** Cumplimiento y tareas de las últimas `semanas` semanas, de la más vieja a hoy. */
function porSemana(d: Datos, semanas: number) {
  const inicio = lunesDe(hoy());
  const filas: { etiqueta: string; porcentaje: number; tareas: number; pausas: number }[] = [];
  for (let s = semanas - 1; s >= 0; s--) {
    const lunes = sumarDias(inicio, -7 * s);
    let tocaron = 0;
    let hechos = 0;
    let tareas = 0;
    let pausas = 0;
    for (let i = 0; i < 7; i++) {
      const fecha = sumarDias(lunes, i);
      if (fecha > hoy()) break;
      for (const h of habitosDe(d, fecha)) {
        // El día de hoy no cuenta en contra: todavía puede cumplirse.
        const hecho = (d.hechos[fecha] ?? []).includes(h.id);
        if (fecha === hoy() && !hecho) continue;
        tocaron++;
        if (hecho) hechos++;
      }
      tareas += d.tareas.filter((t) => t.hecha && t.hechaEl === fecha).length;
      pausas += d.pausas.filter((p) => p.fecha === fecha).length;
    }
    const [, mes, dia] = lunes.split("-");
    filas.push({
      etiqueta: `${Number(dia)}/${Number(mes)}`,
      porcentaje: tocaron === 0 ? 0 : Math.round((hechos / tocaron) * 100),
      tareas,
      pausas,
    });
  }
  return filas;
}

function Barras({
  filas,
  valor,
  color,
  maximo,
  sufijo,
}: {
  filas: { etiqueta: string; porcentaje: number; tareas: number; pausas: number }[];
  valor: (f: { porcentaje: number; tareas: number; pausas: number }) => number;
  color: string;
  maximo?: number;
  sufijo?: string;
}) {
  const alto = 120;
  const ancho = Math.max(240, filas.length * 46);
  const tope = maximo ?? Math.max(1, ...filas.map(valor));
  const paso = ancho / filas.length;
  const barra = Math.min(26, paso * 0.55);

  return (
    <svg
      viewBox={`0 0 ${ancho} ${alto + 34}`}
      width="100%"
      height={alto + 34}
      role="img"
      style={{ overflow: "visible" }}
    >
      <line x1="0" y1={alto} x2={ancho} y2={alto} stroke={TENUE} strokeWidth="1" />
      {filas.map((f, i) => {
        const v = valor(f);
        const h = tope === 0 ? 0 : (v / tope) * (alto - 14);
        const x = i * paso + (paso - barra) / 2;
        return (
          <g key={f.etiqueta + i}>
            <rect x={x} y={alto - h} width={barra} height={Math.max(h, 1.5)} rx="2" fill={color} opacity={v === 0 ? 0.25 : 0.85} />
            <text
              x={x + barra / 2}
              y={alto - h - 5}
              textAnchor="middle"
              fontSize="10"
              fill="rgba(217,203,170,0.75)"
            >
              {v > 0 ? `${v}${sufijo ?? ""}` : ""}
            </text>
            <text x={x + barra / 2} y={alto + 16} textAnchor="middle" fontSize="10" fill="rgba(217,203,170,0.5)">
              {f.etiqueta}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function Graficos({ datos }: { datos: Datos }) {
  const semanas = porSemana(datos, 8);
  const activos = datos.habitos.filter((h) => !h.archivado);
  const hayAlgo =
    activos.length > 0 || datos.tareas.some((t) => t.hecha) || datos.pausas.length > 0;

  if (!hayAlgo) {
    return (
      <div style={panel}>
        <h2 style={titulo}>Tus avances</h2>
        <p style={ayuda}>
          Cuando lleves unos días marcando hábitos y cerrando tareas, aquí aparecen los gráficos:
          la constancia semana a semana, hábito por hábito, y las tareas terminadas.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <div style={panel}>
        <h2 style={titulo}>Constancia por semana</h2>
        <p style={ayuda}>
          De todo lo que te tocaba cada semana, cuánto cumpliste. Las semanas sueltas importan
          poco; lo que se mira es hacia dónde va la línea.
        </p>
        <div style={{ overflowX: "auto" }}>
          <Barras filas={semanas} valor={(f) => f.porcentaje} color={VERDE} maximo={100} sufijo="%" />
        </div>
      </div>

      {activos.length > 0 && (
        <div style={panel}>
          <h2 style={titulo}>Hábito por hábito</h2>
          <p style={ayuda}>Últimos 30 días, contando solo los días que le tocaban a cada uno.</p>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.7rem" }}>
            {activos.map((h) => {
              const c = cumplimiento(datos, h, 30);
              const r = racha(datos, h);
              return (
                <li key={h.id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "0.6rem",
                      fontFamily: "var(--font-crimson), serif",
                      color: "#d9cbaa",
                      fontSize: "0.95rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <span>{h.nombre}</span>
                    <span style={{ color: "rgba(217,203,170,0.6)", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                      {c.hechos} de {c.tocaron} · {r > 0 ? `${r} seguidos` : "sin racha"}
                    </span>
                  </div>
                  <div style={{ height: 8, background: TENUE, borderRadius: 4, overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${c.porcentaje}%`,
                        height: "100%",
                        background: c.porcentaje >= 70 ? VERDE : ORO,
                        borderRadius: 4,
                      }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div style={panel}>
        <h2 style={titulo}>Tareas terminadas</h2>
        <p style={ayuda}>Cuántas cerraste cada semana. Los pasos de una tarea no cuentan aparte.</p>
        <div style={{ overflowX: "auto" }}>
          <Barras filas={semanas} valor={(f) => f.tareas} color={ORO} />
        </div>
      </div>

      {datos.pausas.length > 0 && (
        <div style={panel}>
          <h2 style={titulo}>Pausas</h2>
          <p style={ayuda}>Cuántas veces paraste a respirar cada semana.</p>
          <div style={{ overflowX: "auto" }}>
            <Barras filas={semanas} valor={(f) => f.pausas} color={VERDE} />
          </div>
        </div>
      )}
    </div>
  );
}

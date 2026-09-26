"use client";

import { useState } from "react";
import {
  NOMBRE_MES,
  aTexto,
  habitosDe,
  hoy,
  type Datos,
} from "@/lib/habitos/tipos";
import { ayuda, botonLink, panel, rotulo, titulo } from "./estilos";

/* El calendario del mes.

   Cada día es un cuadrito que se llena según cuánto cumpliste ese día: vacío
   si no había nada, apenas marcado si cumpliste poco, lleno si cumpliste
   todo. Debajo, un punto dorado si ese día terminaste alguna tarea.

   La idea no es premiar ni castigar, es poder mirar el mes entero de una vez
   y notar los patrones: los fines de semana, la semana que se cayó todo. */

const DIAS = ["L", "M", "M", "J", "V", "S", "D"];

function diasDelMes(ano: number, mes: number) {
  const primero = new Date(ano, mes, 1);
  const cuantos = new Date(ano, mes + 1, 0).getDate();
  // La grilla empieza en lunes.
  const hueco = (primero.getDay() + 6) % 7;
  const celdas: (string | null)[] = Array(hueco).fill(null);
  for (let d = 1; d <= cuantos; d++) celdas.push(aTexto(new Date(ano, mes, d)));
  return celdas;
}

export function Calendario({
  datos,
  alElegirDia,
}: {
  datos: Datos;
  alElegirDia?: (fecha: string) => void;
}) {
  const ahora = new Date();
  const [ano, setAno] = useState(ahora.getFullYear());
  const [mes, setMes] = useState(ahora.getMonth());
  const celdas = diasDelMes(ano, mes);

  const mover = (cuanto: number) => {
    const f = new Date(ano, mes + cuanto, 1);
    setAno(f.getFullYear());
    setMes(f.getMonth());
  };

  return (
    <div style={panel}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.8rem", marginBottom: "0.8rem" }}>
        <h2 style={{ ...titulo, margin: 0, flex: 1 }}>
          {NOMBRE_MES[mes]} {ano}
        </h2>
        <button type="button" onClick={() => mover(-1)} style={botonLink}>
          Anterior
        </button>
        <button type="button" onClick={() => mover(1)} style={botonLink}>
          Siguiente
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "0.3rem" }}>
        {DIAS.map((d, i) => (
          <span key={i} style={{ ...rotulo, margin: 0, textAlign: "center", fontSize: "0.55rem" }}>
            {d}
          </span>
        ))}

        {celdas.map((fecha, i) => {
          if (!fecha) return <span key={`hueco-${i}`} />;
          const tocaban = habitosDe(datos, fecha);
          const hechos = (datos.hechos[fecha] ?? []).filter((id) =>
            tocaban.some((h) => h.id === id)
          ).length;
          const parte = tocaban.length === 0 ? 0 : hechos / tocaban.length;
          const tareas = datos.tareas.filter((t) => t.hecha && t.hechaEl === fecha).length;
          const pausas = datos.pausas.filter((p) => p.fecha === fecha).length;
          const esHoy = fecha === hoy();
          const futuro = fecha > hoy();

          return (
            <button
              key={fecha}
              type="button"
              onClick={() => alElegirDia?.(fecha)}
              title={`${fecha}: ${hechos} de ${tocaban.length} hábitos${tareas ? `, ${tareas} tareas` : ""}`}
              style={{
                aspectRatio: "1",
                borderRadius: 5,
                border: esHoy ? "1px solid #c8a050" : "1px solid rgba(200,160,80,0.14)",
                // El relleno crece con lo cumplido: se lee el mes de un vistazo.
                background: futuro
                  ? "rgba(10,18,10,0.3)"
                  : `rgba(168,200,138,${(0.07 + parte * 0.55).toFixed(2)})`,
                color: "#d9cbaa",
                fontFamily: "var(--font-crimson), serif",
                fontSize: "0.8rem",
                display: "grid",
                placeItems: "center",
                gap: 2,
                padding: 2,
                cursor: alElegirDia ? "pointer" : "default",
                opacity: futuro ? 0.5 : 1,
              }}
            >
              <span>{Number(fecha.slice(-2))}</span>
              <span style={{ display: "flex", gap: 2, height: 4 }}>
                {tareas > 0 && (
                  <span style={{ width: 4, height: 4, borderRadius: 2, background: "#c8a050" }} />
                )}
                {pausas > 0 && (
                  <span
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: 2,
                      background: "rgba(217,203,170,0.7)",
                    }}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>

      <p style={{ ...ayuda, margin: "0.9rem 0 0", fontSize: "0.85rem" }}>
        El verde es cuánto cumpliste de lo que te tocaba ese día. El punto dorado es que
        terminaste alguna tarea; el claro, que hiciste una pausa.
      </p>
    </div>
  );
}

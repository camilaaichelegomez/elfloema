"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { PROVEEDORES, normalizar } from "@/lib/proveedores";

// Busca un ingrediente en las listas de los proveedores y lleva a su tienda.
// La búsqueda ignora tildes y mayúsculas, y exige que estén todas las palabras.

const GOLD = "#c8a050";
const CREAM = "#d4c4a0";
const MAX = 60;

// Algunas tiendas ponen su propio nombre al final de productos que no tienen que
// ver (p. ej. «Balanza digital … calendula»). Si la búsqueda solo calza con ese
// nombre final, el resultado se manda al fondo de la lista, sin ocultarlo.
function soloEnMarca(k: string, palabras: string[], marca: string): boolean {
  const m = normalizar(marca);
  const tokens = k.split(" ");
  if (tokens.length < 2 || tokens[tokens.length - 1] !== m) return false;
  const resto = tokens.slice(0, -1).join(" ");
  return !palabras.some((w) => resto.includes(w));
}

export function ProveedoresBuscador() {
  const [q, setQ] = useState("");
  const [pais, setPais] = useState("todos");

  const paises = useMemo(() => Array.from(new Set(PROVEEDORES.map((p) => p.pais))), []);

  const indice = useMemo(
    () =>
      PROVEEDORES.map((p) => ({
        proveedor: p,
        items: p.productos.map((x) => ({ ...x, k: normalizar(x.n) })),
      })),
    []
  );

  const palabras = normalizar(q).split(" ").filter(Boolean);

  const resultados = useMemo(() => {
    if (palabras.length === 0) return [];
    return indice
      .filter((g) => pais === "todos" || g.proveedor.pais === pais)
      .map((g) => ({
        proveedor: g.proveedor,
        items: g.items
          .filter((x) => palabras.every((w) => x.k.includes(w)))
          .map((x) => ({ ...x, marca: soloEnMarca(x.k, palabras, g.proveedor.nombre) }))
          .sort((a, b) => Number(a.marca) - Number(b.marca)),
      }))
      .filter((g) => g.items.length > 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, pais, indice]);

  const total = resultados.reduce((s, g) => s + g.items.length, 0);

  return (
    <div>
      <p style={nota}>
        Escribe un ingrediente (por ejemplo «caléndula» o «karité») y mira qué productos tiene cada proveedor. Cada
        resultado te lleva a su tienda. Los precios no aparecen aquí: anota en tu inventario lo que tú pagaste.
      </p>

      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", margin: "1.2rem 0 1.6rem" }}>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar ingrediente…"
          aria-label="Buscar ingrediente"
          style={{ ...campo, flex: "1 1 260px" }}
        />
        <select value={pais} onChange={(e) => setPais(e.target.value)} aria-label="País" style={{ ...campo, flex: "0 0 auto" }}>
          <option value="todos">Todos los países</option>
          {paises.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {palabras.length === 0 ? (
        <p style={{ ...nota, opacity: 0.75 }}>
          Hay {PROVEEDORES.reduce((s, p) => s + p.productos.length, 0)} productos de {PROVEEDORES.length}{" "}
          {PROVEEDORES.length === 1 ? "proveedor" : "proveedores"} ({paises.join(", ")}). Pronto se sumarán más países.
        </p>
      ) : total === 0 ? (
        <p style={nota}>No hay productos con «{q}». Prueba con otra palabra o sin tildes.</p>
      ) : (
        <div style={{ display: "grid", gap: "1.6rem" }}>
          {resultados.map((g) => (
            <section key={g.proveedor.id}>
              <h2 style={tituloGrupo}>
                {g.proveedor.nombre} <span style={{ opacity: 0.55 }}>· {g.proveedor.pais}</span>{" "}
                <span style={{ opacity: 0.55 }}>({g.items.length})</span>
              </h2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.45rem" }}>
                {g.items.slice(0, MAX).map((x) => (
                  <li key={x.u}>
                    <a href={x.u} target="_blank" rel="noopener noreferrer" style={enlace}>
                      <span>{x.n}</span>
                      <span aria-hidden style={{ color: GOLD }}>↗</span>
                    </a>
                  </li>
                ))}
              </ul>
              {g.items.length > MAX && (
                <p style={{ ...nota, marginTop: "0.6rem", opacity: 0.7 }}>
                  Se muestran {MAX} de {g.items.length}. Agrega otra palabra para afinar.
                </p>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

const nota: CSSProperties = { fontFamily: "var(--font-body)", fontStyle: "italic", color: CREAM, margin: 0, lineHeight: 1.65 };
const campo: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "1rem",
  color: "#efe5c8",
  background: "rgba(8,13,8,0.75)",
  border: "1px solid rgba(200,160,80,0.3)",
  borderRadius: 6,
  padding: "0.7rem 0.85rem",
  minHeight: 44,
  boxSizing: "border-box",
};
const tituloGrupo: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.85rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: GOLD,
  margin: "0 0 0.7rem",
};
const enlace: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
  color: CREAM,
  textDecoration: "none",
  background: "rgba(13,26,13,0.5)",
  border: "1px solid rgba(200,160,80,0.18)",
  borderRadius: 6,
  padding: "0.65rem 0.9rem",
  fontSize: "0.95rem",
  lineHeight: 1.4,
};

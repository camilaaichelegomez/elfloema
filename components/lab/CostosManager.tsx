"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { supabase } from "@/lib/supabase";

// ── Tipos ────────────────────────────────────────────────────────────────────
interface FormulaItem {
  ingrediente: string;
  gramos: number | null;
}
interface Formula {
  id: string;
  nombre: string;
  categoria: string | null;
  rinde_gramos: number | null;
  formula_items: FormulaItem[] | null;
}
interface InventarioCosto {
  ingrediente: string;
  costo_unitario: number | null;
  unidad: string | null;
}
interface CostoProducto {
  formula_id: string;
  envase_ml: number | null;
  envase: number | null;
  etiqueta: number | null;
  mano_obra: number | null;
  precio_venta: number | null;
}

type Extras = {
  envase_ml: string;
  envase: string;
  etiqueta: string;
  mano_obra: string;
  precio_venta: string;
};

const GOLD = "#c8a050";
const CREAM = "#d4c4a0";

// Palabras de relleno / cualificadores / unidades que no aportan a la identidad
// del ingrediente (se ignoran al comparar nombres de fórmula vs inventario).
const STOP = new Set([
  "de", "con", "y", "o", "en", "del", "la", "el", "para", "al", "a", "x", "un", "una",
  "unidad", "unidades", "usp", "bpm", "hg", "bio", "oleosa", "oleoso", "anhidra", "anhidro",
  "vegetal", "coloidal", "coloido", "polvo", "pellets", "varisoft", "importado", "importada",
  "artesanal", "natural", "puro", "pura", "fino", "fina", "grueso", "gruesa", "precision",
  "vencimiento", "pack", "liquido", "liquida", "uso", "cosmetico", "cosmetica",
]);

function tokens(s: string): string[] {
  const base = s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ");
  return Array.from(
    new Set(base.split(/\s+/).filter((t) => t && !STOP.has(t) && !/^\d+[a-z]*$/.test(t)))
  );
}

function clp(n: number) {
  return `$${Math.round(n).toLocaleString("es-CL")}`;
}

const vacio: Extras = { envase_ml: "", envase: "", etiqueta: "", mano_obra: "", precio_venta: "" };

export function CostosManager({
  userId,
  formulas,
  inventario,
  costosIniciales,
}: {
  userId: string;
  formulas: Formula[];
  inventario: InventarioCosto[];
  costosIniciales: CostoProducto[];
}) {
  const [extras, setExtras] = useState<Record<string, Extras>>(() => {
    const m: Record<string, Extras> = {};
    for (const c of costosIniciales) {
      m[c.formula_id] = {
        envase_ml: c.envase_ml != null ? String(c.envase_ml) : "",
        envase: c.envase != null ? String(c.envase) : "",
        etiqueta: c.etiqueta != null ? String(c.etiqueta) : "",
        mano_obra: c.mano_obra != null ? String(c.mano_obra) : "",
        precio_venta: c.precio_venta != null ? String(c.precio_venta) : "",
      };
    }
    return m;
  });

  // Índice de inventario tokenizado (solo insumos con costo y unidad g/ml).
  const invIndex = useMemo(
    () =>
      inventario
        .filter((i) => i.costo_unitario != null && (i.unidad === "g" || i.unidad === "ml"))
        .map((i) => ({ nombre: i.ingrediente, costo: i.costo_unitario as number, toks: new Set(tokens(i.ingrediente)) })),
    [inventario]
  );

  // Match inteligente: un insumo del inventario calza si contiene TODAS las
  // palabras del ingrediente de la fórmula. Gana el que tenga menos palabras de sobra.
  function matchCosto(ingrediente: string): number | null {
    const ft = tokens(ingrediente);
    if (ft.length === 0) return null;
    let best: { costo: number; extra: number; len: number } | null = null;
    for (const item of invIndex) {
      let all = true;
      for (const t of ft) {
        if (!item.toks.has(t)) {
          all = false;
          break;
        }
      }
      if (!all) continue;
      const extra = item.toks.size - ft.length;
      if (!best || extra < best.extra || (extra === best.extra && item.nombre.length < best.len)) {
        best = { costo: item.costo, extra, len: item.nombre.length };
      }
    }
    return best ? best.costo : null;
  }

  function getExtras(id: string): Extras {
    return extras[id] ?? vacio;
  }
  function setExtra(id: string, campo: keyof Extras, valor: string) {
    setExtras((prev) => ({ ...prev, [id]: { ...(prev[id] ?? vacio), [campo]: valor } }));
  }

  async function guardarFila(id: string) {
    const e = getExtras(id);
    const num = (v: string) => (v.trim() === "" ? null : Number(v));
    await supabase.from("costos_producto").upsert(
      {
        user_id: userId,
        formula_id: id,
        envase_ml: num(e.envase_ml),
        envase: num(e.envase),
        etiqueta: num(e.etiqueta),
        mano_obra: num(e.mano_obra),
        precio_venta: num(e.precio_venta),
      },
      { onConflict: "user_id,formula_id" }
    );
  }

  // Cálculo por fórmula.
  function calcular(f: Formula) {
    const items = f.formula_items ?? [];
    let materiales = 0;
    let sinCosto = 0;
    const faltantes: string[] = [];
    for (const it of items) {
      const costo = matchCosto(it.ingrediente);
      if (costo == null) {
        if (it.ingrediente) {
          sinCosto++;
          faltantes.push(it.ingrediente);
        }
        continue;
      }
      materiales += (it.gramos ?? 0) * costo;
    }
    const rinde = f.rinde_gramos ?? items.reduce((s, i) => s + (i.gramos ?? 0), 0);
    const costoPorUnidad = rinde > 0 ? materiales / rinde : 0; // por gramo o por ml

    const e = getExtras(f.id);
    const envaseMl = Number(e.envase_ml) || 0;
    const precioEnvase = Number(e.envase) || 0;
    const etiqueta = Number(e.etiqueta) || 0;
    const manoObra = Number(e.mano_obra) || 0;

    const contenido = envaseMl * costoPorUnidad;
    const costoProducto = contenido + precioEnvase + etiqueta + manoObra;

    const precio = Number(e.precio_venta) || 0;
    const margen = precio > 0 ? ((precio - costoProducto) / precio) * 100 : null;
    const ganancia = precio > 0 ? precio - costoProducto : null;

    return { costoPorUnidad, sinCosto, faltantes, contenido, costoProducto, precio, margen, ganancia };
  }

  return (
    <div>
      <p style={introStyle}>
        Cada fórmula te da su <strong>costo por gramo o ml</strong> (materiales, según tu{" "}
        <a href="/lab/inventario" style={{ color: GOLD }}>inventario</a>). Tú pones el{" "}
        <strong>tamaño del envase</strong> y su <strong>precio</strong>, y sale el costo del producto y el margen.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem", marginTop: "1.4rem" }}>
        {formulas.map((f) => {
          const r = calcular(f);
          const e = getExtras(f.id);
          return (
            <div key={f.id} style={cardStyle}>
              {/* Cabecera */}
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "baseline" }}>
                <div>
                  <h3 style={cardTitle}>{f.nombre}</h3>
                  <span style={cardSub}>{f.categoria ?? "Fórmula"} · lote {f.rinde_gramos ?? "—"} g/ml</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={miniLabel}>Costo por g/ml</div>
                  <div style={{ fontFamily: "var(--font-grimoire)", fontSize: "1.1rem", color: GOLD }}>
                    {clp(r.costoPorUnidad)}
                  </div>
                  {r.sinCosto > 0 && (
                    <div title={r.faltantes.join(", ")} style={{ color: "#d9a84a", fontSize: "0.72rem", marginTop: 2 }}>
                      ⚠ {r.sinCosto} sin costo
                    </div>
                  )}
                </div>
              </div>

              {/* Inputs */}
              <div style={gridInputs}>
                <Campo label="Tamaño envase (ml/g)" value={e.envase_ml} onChange={(v) => setExtra(f.id, "envase_ml", v)} onBlur={() => guardarFila(f.id)} placeholder="ej. 50" />
                <Campo label="Precio envase ($)" value={e.envase} onChange={(v) => setExtra(f.id, "envase", v)} onBlur={() => guardarFila(f.id)} placeholder="ej. 320" />
                <Campo label="Etiqueta ($)" value={e.etiqueta} onChange={(v) => setExtra(f.id, "etiqueta", v)} onBlur={() => guardarFila(f.id)} />
                <Campo label="Mano de obra ($)" value={e.mano_obra} onChange={(v) => setExtra(f.id, "mano_obra", v)} onBlur={() => guardarFila(f.id)} />
                <Campo label="Precio de venta ($)" value={e.precio_venta} onChange={(v) => setExtra(f.id, "precio_venta", v)} onBlur={() => guardarFila(f.id)} destacado />
              </div>

              {/* Resultado */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1.4rem", alignItems: "baseline", marginTop: "0.9rem", paddingTop: "0.8rem", borderTop: "1px solid rgba(200,160,80,0.12)" }}>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(212,196,160,0.75)" }}>
                  Contenido: <strong style={{ color: CREAM }}>{clp(r.contenido)}</strong>
                </span>
                <span style={{ fontFamily: "var(--font-grimoire)", fontSize: "0.95rem", color: GOLD }}>
                  Costo del producto: {clp(r.costoProducto)}
                </span>
                {r.margen != null && (
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.9rem",
                      marginLeft: "auto",
                      color: r.margen < 0 ? "#e0715a" : r.margen < 40 ? "#d9a84a" : "#8fbf6f",
                    }}
                  >
                    {r.margen < 0
                      ? `⚠ Bajo el costo (pierdes ${clp(-(r.ganancia ?? 0))})`
                      : `Ganancia ${clp(r.ganancia ?? 0)} · margen ${Math.round(r.margen)}%`}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Campo({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  destacado,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  placeholder?: string;
  destacado?: boolean;
}) {
  return (
    <label style={labelStyle}>
      <span style={{ color: destacado ? GOLD : "rgba(212,196,160,0.65)" }}>{label}</span>
      <input
        style={{ ...inputStyle, borderColor: destacado ? "rgba(200,160,80,0.55)" : "rgba(200,160,80,0.25)" }}
        inputMode="numeric"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
      />
    </label>
  );
}

// ── estilos ──────────────────────────────────────────────────────────────────
const introStyle: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.95rem",
  lineHeight: 1.6,
  color: "rgba(212,196,160,0.75)",
  maxWidth: 720,
};
const cardStyle: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.18)",
  borderRadius: 10,
  padding: "1.1rem 1.3rem",
  background: "rgba(15,26,15,0.5)",
};
const cardTitle: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "1rem",
  color: CREAM,
  letterSpacing: "0.04em",
  margin: "0 0 0.2rem",
};
const cardSub: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.58rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "rgba(154,106,170,0.75)",
};
const miniLabel: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.55rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "rgba(212,196,160,0.55)",
};
const gridInputs: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
  gap: "0.8rem",
  marginTop: "1rem",
};
const labelStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.3rem",
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.56rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(212,196,160,0.65)",
};
const inputStyle: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: "0.95rem",
  color: CREAM,
  background: "rgba(8,13,8,0.7)",
  border: "1px solid rgba(200,160,80,0.25)",
  borderRadius: 5,
  padding: "0.5rem 0.6rem",
  width: "100%",
  boxSizing: "border-box",
};

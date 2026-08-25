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
interface Config {
  valor_hora: number | null;
  merma_pct: number | null;
}
interface CostoProducto {
  formula_id: string;
  unidades_lote: number | null;
  envase: number | null;
  etiqueta: number | null;
  energia_lote: number | null;
  minutos_lote: number | null;
  precio_venta: number | null;
}

type Extras = {
  unidades_lote: string;
  envase: string;
  etiqueta: string;
  energia_lote: string;
  minutos_lote: string;
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

// Divide un nombre en tokens significativos (sin tildes, sin puntuación, sin
// tamaños tipo "100g"/"5ml", sin palabras de relleno).
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

const vacio: Extras = {
  unidades_lote: "",
  envase: "",
  etiqueta: "",
  energia_lote: "",
  minutos_lote: "",
  precio_venta: "",
};

export function CostosManager({
  userId,
  formulas,
  inventario,
  configInicial,
  costosIniciales,
}: {
  userId: string;
  formulas: Formula[];
  inventario: InventarioCosto[];
  configInicial: Config | null;
  costosIniciales: CostoProducto[];
}) {
  const [valorHora, setValorHora] = useState(configInicial?.valor_hora != null ? String(configInicial.valor_hora) : "3000");
  const [mermaPct, setMermaPct] = useState(configInicial?.merma_pct != null ? String(configInicial.merma_pct) : "8");
  const [guardadoConfig, setGuardadoConfig] = useState(false);

  const [extras, setExtras] = useState<Record<string, Extras>>(() => {
    const m: Record<string, Extras> = {};
    for (const c of costosIniciales) {
      m[c.formula_id] = {
        unidades_lote: c.unidades_lote != null ? String(c.unidades_lote) : "",
        envase: c.envase != null ? String(c.envase) : "",
        etiqueta: c.etiqueta != null ? String(c.etiqueta) : "",
        energia_lote: c.energia_lote != null ? String(c.energia_lote) : "",
        minutos_lote: c.minutos_lote != null ? String(c.minutos_lote) : "",
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
  // palabras del ingrediente de la fórmula. Entre los que calzan, gana el que
  // tenga menos palabras de sobra (el más parecido).
  function matchCosto(ingrediente: string): { costo: number; nombre: string } | null {
    const ft = tokens(ingrediente);
    if (ft.length === 0) return null;
    let best: { costo: number; nombre: string; extra: number } | null = null;
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
      if (!best || extra < best.extra || (extra === best.extra && item.nombre.length < best.nombre.length)) {
        best = { costo: item.costo, nombre: item.nombre, extra };
      }
    }
    return best ? { costo: best.costo, nombre: best.nombre } : null;
  }

  const valorHoraN = Number(valorHora) || 0;
  const mermaN = Number(mermaPct) || 0;

  function getExtras(id: string): Extras {
    return extras[id] ?? vacio;
  }

  function setExtra(id: string, campo: keyof Extras, valor: string) {
    setExtras((prev) => ({ ...prev, [id]: { ...(prev[id] ?? vacio), [campo]: valor } }));
  }

  async function guardarConfig() {
    await supabase
      .from("costos_config")
      .upsert({ user_id: userId, valor_hora: valorHoraN, merma_pct: mermaN }, { onConflict: "user_id" });
    setGuardadoConfig(true);
    window.setTimeout(() => setGuardadoConfig(false), 1500);
  }

  async function guardarFila(id: string) {
    const e = getExtras(id);
    const num = (v: string) => (v.trim() === "" ? null : Number(v));
    await supabase.from("costos_producto").upsert(
      {
        user_id: userId,
        formula_id: id,
        unidades_lote: num(e.unidades_lote),
        envase: num(e.envase),
        etiqueta: num(e.etiqueta),
        energia_lote: num(e.energia_lote),
        minutos_lote: num(e.minutos_lote),
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
      const costo = matchCosto(it.ingrediente)?.costo;
      if (costo == null) {
        if (it.ingrediente) {
          sinCosto++;
          faltantes.push(it.ingrediente);
        }
        continue;
      }
      materiales += (it.gramos ?? 0) * costo;
    }
    const e = getExtras(f.id);
    const unidades = Number(e.unidades_lote) || 1;
    const envase = Number(e.envase) || 0;
    const etiqueta = Number(e.etiqueta) || 0;
    const energiaLote = Number(e.energia_lote) || 0;
    const minutosLote = Number(e.minutos_lote) || 0;
    const manoObraLote = (minutosLote / 60) * valorHoraN;

    const costoDirecto =
      materiales / unidades + envase + etiqueta + energiaLote / unidades + manoObraLote / unidades;
    const costoUnit = costoDirecto * (1 + mermaN / 100);

    const precio = Number(e.precio_venta) || 0;
    const margen = precio > 0 ? ((precio - costoUnit) / precio) * 100 : null;
    const ganancia = precio > 0 ? precio - costoUnit : null;

    return { materiales, sinCosto, faltantes, unidades, costoUnit, precio, margen, ganancia };
  }

  return (
    <div>
      {/* Intro */}
      <p style={introStyle}>
        Calcula el <strong>costo real</strong> de cada producto usando los gramos de tus fórmulas y el
        costo por gramo de tu <a href="/lab/inventario" style={{ color: GOLD }}>inventario</a>. Suma
        envase, etiqueta, gas y tu tiempo, y pones el precio mirando el mercado — te avisa el margen.
      </p>

      {/* Config global */}
      <div style={configBox}>
        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", alignItems: "flex-end" }}>
          <label style={labelStyle}>
            Valor de tu hora ($)
            <input
              style={inputStyle}
              inputMode="numeric"
              value={valorHora}
              onChange={(e) => setValorHora(e.target.value)}
              onBlur={guardarConfig}
            />
          </label>
          <label style={labelStyle}>
            Merma / pérdidas (%)
            <input
              style={inputStyle}
              inputMode="numeric"
              value={mermaPct}
              onChange={(e) => setMermaPct(e.target.value)}
              onBlur={guardarConfig}
            />
          </label>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: guardadoConfig ? "#8fbf6f" : "rgba(212,196,160,0.45)", fontStyle: "italic" }}>
            {guardadoConfig ? "✓ guardado" : "se guarda solo al salir del campo"}
          </span>
        </div>
      </div>

      {/* Lista de fórmulas */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginTop: "1.75rem" }}>
        {formulas.map((f) => {
          const r = calcular(f);
          const e = getExtras(f.id);
          return (
            <div key={f.id} style={cardStyle}>
              {/* Cabecera */}
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", alignItems: "baseline" }}>
                <div>
                  <h3 style={cardTitle}>{f.nombre}</h3>
                  <span style={cardSub}>
                    {f.categoria ?? "Fórmula"} · lote {f.rinde_gramos ?? "—"} g
                  </span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "var(--font-grimoire)", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,196,160,0.55)" }}>
                    Costo / unidad
                  </div>
                  <div style={{ fontFamily: "var(--font-grimoire)", fontSize: "1.25rem", color: GOLD }}>{clp(r.costoUnit)}</div>
                </div>
              </div>

              {/* Materiales */}
              <div style={{ marginTop: "0.6rem", fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "rgba(212,196,160,0.7)" }}>
                Materiales del lote: <strong style={{ color: CREAM }}>{clp(r.materiales)}</strong>
                {r.sinCosto > 0 && (
                  <span title={r.faltantes.join(", ")} style={{ color: "#d9a84a", marginLeft: "0.6rem" }}>
                    ⚠ {r.sinCosto} insumo{r.sinCosto > 1 ? "s" : ""} sin costo (agrégalo en Inventario)
                  </span>
                )}
              </div>

              {/* Inputs */}
              <div style={gridInputs}>
                <Campo label="Unidades / lote" value={e.unidades_lote} onChange={(v) => setExtra(f.id, "unidades_lote", v)} onBlur={() => guardarFila(f.id)} placeholder="ej. 17" />
                <Campo label="Envase ($)" value={e.envase} onChange={(v) => setExtra(f.id, "envase", v)} onBlur={() => guardarFila(f.id)} />
                <Campo label="Etiqueta ($)" value={e.etiqueta} onChange={(v) => setExtra(f.id, "etiqueta", v)} onBlur={() => guardarFila(f.id)} />
                <Campo label="Gas/energía lote ($)" value={e.energia_lote} onChange={(v) => setExtra(f.id, "energia_lote", v)} onBlur={() => guardarFila(f.id)} />
                <Campo label="Minutos de trabajo (lote)" value={e.minutos_lote} onChange={(v) => setExtra(f.id, "minutos_lote", v)} onBlur={() => guardarFila(f.id)} />
                <Campo label="Precio de venta ($)" value={e.precio_venta} onChange={(v) => setExtra(f.id, "precio_venta", v)} onBlur={() => guardarFila(f.id)} destacado />
              </div>

              {/* Margen */}
              {r.margen != null && (
                <div
                  style={{
                    marginTop: "0.9rem",
                    fontFamily: "var(--font-body)",
                    fontSize: "0.9rem",
                    color: r.margen < 0 ? "#e0715a" : r.margen < 40 ? "#d9a84a" : "#8fbf6f",
                  }}
                >
                  {r.margen < 0
                    ? `⚠ Estás vendiendo BAJO el costo (pierdes ${clp(-(r.ganancia ?? 0))} por unidad)`
                    : `Ganancia ${clp(r.ganancia ?? 0)} por unidad · margen ${Math.round(r.margen)}%`}
                </div>
              )}
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
  marginBottom: "1.5rem",
};
const configBox: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.2)",
  borderRadius: 10,
  padding: "1.1rem 1.3rem",
  background: "rgba(255,255,255,0.02)",
};
const cardStyle: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.18)",
  borderRadius: 10,
  padding: "1.25rem 1.4rem",
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
const gridInputs: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: "0.8rem",
  marginTop: "1rem",
};
const labelStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.3rem",
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.58rem",
  letterSpacing: "0.12em",
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

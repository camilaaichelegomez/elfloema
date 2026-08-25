"use client";

import { useState, type CSSProperties } from "react";
import { createClient } from "@/lib/supabase-browser";
import type { ProductoTienda } from "@/lib/productos-tienda";

// Editor del catálogo de la tienda. La tienda pública lee de la tabla `productos`
// de Supabase; aquí se crean/editan. El botón "Sincronizar" carga el catálogo
// actual (estático) por primera vez.

const GOLD = "#c8a050";
const CREAM = "#d4c4a0";

interface CienciaCard {
  titulo: string;
  texto: string;
}
interface Row {
  id?: number;
  slug: string;
  nombre: string;
  categoria: string | null;
  descripcion: string | null;
  descripcion_larga: string | null;
  beneficios: string[] | null;
  ciencia: CienciaCard[] | null;
  bioquimica: { prompt: string; leyenda: string } | null;
  ingredientes: string | null;
  modo_uso: string | null;
  resultado: string | null;
  piel: string | null;
  tamano: string | null;
  imagen_prompt: string | null;
  ficha_prompt: string | null;
  precio: number | null;
  glyph: string | null;
  accent: string | null;
  destacado: boolean | null;
  oculto: boolean | null;
  orden: number | null;
}

function semillaARow(p: ProductoTienda, orden: number): Row {
  return {
    slug: p.slug,
    nombre: p.nombre,
    categoria: p.categoria ?? null,
    descripcion: p.descripcion ?? null,
    descripcion_larga: p.descripcionLarga ?? null,
    beneficios: p.beneficios ?? null,
    ciencia: p.ciencia ?? null,
    bioquimica: p.bioquimica ?? null,
    ingredientes: p.ingredientes ?? null,
    modo_uso: p.modoUso ?? null,
    resultado: p.resultado ?? null,
    piel: p.piel ?? null,
    tamano: p.tamano ?? null,
    imagen_prompt: p.imagenPrompt ?? null,
    ficha_prompt: p.fichaPrompt ?? null,
    precio: p.precio ?? null,
    glyph: p.glyph ?? null,
    accent: p.accent ?? null,
    destacado: p.destacado ?? false,
    oculto: p.oculto ?? false,
    orden,
  };
}

function rowVacia(): Row {
  return {
    slug: "", nombre: "", categoria: "", descripcion: "", descripcion_larga: "",
    beneficios: [], ciencia: [], bioquimica: null, ingredientes: "", modo_uso: "",
    resultado: "", piel: "", tamano: "", imagen_prompt: "", ficha_prompt: "",
    precio: null, glyph: "✦", accent: "rgba(200,160,80,0.24)", destacado: false, oculto: false, orden: 999,
  };
}

export function CatalogoManager({
  userId,
  productosDb,
  semilla,
}: {
  userId: string;
  productosDb: Row[];
  semilla: ProductoTienda[];
}) {
  const [productos, setProductos] = useState<Row[]>(productosDb);
  const [form, setForm] = useState<Row | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [sincronizando, setSincronizando] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const supabase = createClient();

  async function recargar() {
    const { data } = await supabase.from("productos").select("*").order("orden").order("nombre");
    setProductos((data as Row[]) ?? []);
  }

  async function sincronizar() {
    if (!window.confirm("Cargar el catálogo actual a la base de datos. Los productos que ya existan se actualizan por su slug. ¿Continuar?")) return;
    setSincronizando(true);
    setMsg(null);
    const filas = semilla.map((p, i) => ({ ...semillaARow(p, i), user_id: userId }));
    const { error } = await supabase.from("productos").upsert(filas, { onConflict: "slug" });
    setSincronizando(false);
    if (error) {
      setMsg("Error al sincronizar: " + error.message);
      return;
    }
    setMsg("Catálogo sincronizado ✓");
    await recargar();
  }

  function set<K extends keyof Row>(campo: K, valor: Row[K]) {
    setForm((f) => (f ? { ...f, [campo]: valor } : f));
  }

  async function guardar() {
    if (!form) return;
    if (!form.slug.trim() || !form.nombre.trim()) {
      setMsg("El slug y el nombre son obligatorios.");
      return;
    }
    setGuardando(true);
    setMsg(null);
    const fila = {
      ...form,
      user_id: userId,
      beneficios: form.beneficios && form.beneficios.length ? form.beneficios : null,
      ciencia: form.ciencia && form.ciencia.length ? form.ciencia : null,
      bioquimica: form.bioquimica && (form.bioquimica.prompt || form.bioquimica.leyenda) ? form.bioquimica : null,
      precio: form.precio === null || Number.isNaN(form.precio) ? null : Number(form.precio),
    };
    const { error } = await supabase.from("productos").upsert(fila, { onConflict: "slug" });
    setGuardando(false);
    if (error) {
      setMsg("Error al guardar: " + error.message);
      return;
    }
    setMsg("Guardado ✓");
    setForm(null);
    await recargar();
  }

  async function borrar(slug: string) {
    if (!window.confirm(`¿Borrar "${slug}" del catálogo? (No borra la fórmula, solo la ficha de tienda.)`)) return;
    const { error } = await supabase.from("productos").delete().eq("slug", slug);
    if (error) {
      setMsg("Error al borrar: " + error.message);
      return;
    }
    await recargar();
  }

  // ── Formulario de edición ──────────────────────────────────────────────────
  if (form) {
    const f = form;
    return (
      <div>
        <div style={{ display: "flex", gap: "0.8rem", marginBottom: "1.2rem", flexWrap: "wrap" }}>
          <button onClick={guardar} disabled={guardando} style={botonPrimario}>
            {guardando ? "Guardando…" : "Guardar"}
          </button>
          <button onClick={() => { setForm(null); setMsg(null); }} style={botonSecundario}>Cancelar</button>
          {msg && <span style={{ alignSelf: "center", color: CREAM, fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>{msg}</span>}
        </div>

        <div style={grid2}>
          <Campo label="Slug (url, sin espacios) *"><input style={input} value={f.slug} onChange={(e) => set("slug", e.target.value)} /></Campo>
          <Campo label="Nombre *"><input style={input} value={f.nombre} onChange={(e) => set("nombre", e.target.value)} /></Campo>
          <Campo label="Categoría"><input style={input} value={f.categoria ?? ""} onChange={(e) => set("categoria", e.target.value)} /></Campo>
          <Campo label="Precio (CLP)"><input style={input} inputMode="numeric" value={f.precio ?? ""} onChange={(e) => set("precio", e.target.value === "" ? null : Number(e.target.value))} /></Campo>
          <Campo label="Tamaño (ej. 50 ml)"><input style={input} value={f.tamano ?? ""} onChange={(e) => set("tamano", e.target.value)} /></Campo>
          <Campo label="Piel"><input style={input} value={f.piel ?? ""} onChange={(e) => set("piel", e.target.value)} /></Campo>
          <Campo label="Ícono (glyph)"><input style={input} value={f.glyph ?? ""} onChange={(e) => set("glyph", e.target.value)} /></Campo>
          <Campo label="Color (accent)"><input style={input} value={f.accent ?? ""} onChange={(e) => set("accent", e.target.value)} /></Campo>
        </div>

        <div style={{ display: "flex", gap: "1.5rem", margin: "1rem 0" }}>
          <label style={checkLabel}><input type="checkbox" checked={!!f.oculto} onChange={(e) => set("oculto", e.target.checked)} /> Oculto (no aparece en la tienda)</label>
          <label style={checkLabel}><input type="checkbox" checked={!!f.destacado} onChange={(e) => set("destacado", e.target.checked)} /> Destacado</label>
        </div>

        <Campo label="Descripción corta"><textarea style={area} value={f.descripcion ?? ""} onChange={(e) => set("descripcion", e.target.value)} /></Campo>
        <Campo label="Descripción larga"><textarea style={{ ...area, minHeight: 120 }} value={f.descripcion_larga ?? ""} onChange={(e) => set("descripcion_larga", e.target.value)} /></Campo>
        <Campo label="Beneficios (uno por línea)">
          <textarea style={area} value={(f.beneficios ?? []).join("\n")} onChange={(e) => set("beneficios", e.target.value.split("\n").map((x) => x.trim()).filter(Boolean))} />
        </Campo>

        {/* Ciencia */}
        <div style={{ margin: "1rem 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
            <span style={labelTexto}>Ciencia (tarjetas “Cómo actúa”)</span>
            <button style={botonMini} onClick={() => set("ciencia", [...(f.ciencia ?? []), { titulo: "", texto: "" }])}>+ tarjeta</button>
          </div>
          {(f.ciencia ?? []).map((c, i) => (
            <div key={i} style={{ border: "1px solid rgba(200,160,80,0.15)", borderRadius: 6, padding: "0.6rem", marginBottom: "0.5rem" }}>
              <input style={{ ...input, marginBottom: "0.4rem" }} placeholder="Título (ej. Óxido de zinc)" value={c.titulo}
                onChange={(e) => set("ciencia", (f.ciencia ?? []).map((x, j) => (j === i ? { ...x, titulo: e.target.value } : x)))} />
              <textarea style={area} placeholder="Cómo actúa…" value={c.texto}
                onChange={(e) => set("ciencia", (f.ciencia ?? []).map((x, j) => (j === i ? { ...x, texto: e.target.value } : x)))} />
              <button style={{ ...botonMini, marginTop: "0.3rem" }} onClick={() => set("ciencia", (f.ciencia ?? []).filter((_, j) => j !== i))}>quitar</button>
            </div>
          ))}
        </div>

        <Campo label="Bioquímica — prompt de ilustración">
          <textarea style={area} value={f.bioquimica?.prompt ?? ""} onChange={(e) => set("bioquimica", { prompt: e.target.value, leyenda: f.bioquimica?.leyenda ?? "" })} />
        </Campo>
        <Campo label="Bioquímica — leyenda">
          <input style={input} value={f.bioquimica?.leyenda ?? ""} onChange={(e) => set("bioquimica", { prompt: f.bioquimica?.prompt ?? "", leyenda: e.target.value })} />
        </Campo>

        <Campo label="Ingredientes (INCI)"><textarea style={area} value={f.ingredientes ?? ""} onChange={(e) => set("ingredientes", e.target.value)} /></Campo>
        <Campo label="Modo de uso"><textarea style={area} value={f.modo_uso ?? ""} onChange={(e) => set("modo_uso", e.target.value)} /></Campo>
        <Campo label="Qué esperar (resultado)"><textarea style={area} value={f.resultado ?? ""} onChange={(e) => set("resultado", e.target.value)} /></Campo>
        <Campo label="Prompt para mejorar la FOTO"><textarea style={{ ...area, minHeight: 110 }} value={f.imagen_prompt ?? ""} onChange={(e) => set("imagen_prompt", e.target.value)} /></Campo>
        <Campo label="Prompt para generar la FICHA"><textarea style={{ ...area, minHeight: 110 }} value={f.ficha_prompt ?? ""} onChange={(e) => set("ficha_prompt", e.target.value)} /></Campo>
      </div>
    );
  }

  // ── Lista ──────────────────────────────────────────────────────────────────
  return (
    <div>
      <p style={{ fontFamily: "var(--font-body)", color: "rgba(212,196,160,0.75)", maxWidth: 720, marginBottom: "1.2rem" }}>
        La tienda pública lee estos productos. Créalos o edítalos aquí (ciencia, INCI, precio, prompts, ocultar) y se reflejan en la tienda y en las fichas.
      </p>

      <div style={{ display: "flex", gap: "0.8rem", marginBottom: "1.4rem", flexWrap: "wrap", alignItems: "center" }}>
        <button onClick={() => { setForm(rowVacia()); setMsg(null); }} style={botonPrimario}>+ Nuevo producto</button>
        {productos.length === 0 && (
          <button onClick={sincronizar} disabled={sincronizando} style={botonSecundario}>
            {sincronizando ? "Sincronizando…" : "Sincronizar catálogo actual"}
          </button>
        )}
        {msg && <span style={{ color: CREAM, fontFamily: "var(--font-body)", fontSize: "0.9rem" }}>{msg}</span>}
      </div>

      {productos.length === 0 ? (
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "rgba(212,196,160,0.6)" }}>
          Aún no hay productos en la base de datos. Pulsa <strong>“Sincronizar catálogo actual”</strong> para cargar los que ya tienes, y de ahí los editas.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {productos.map((p) => (
            <div key={p.slug} style={filaStyle}>
              <div style={{ minWidth: 0 }}>
                <span style={{ fontFamily: "var(--font-grimoire)", color: CREAM }}>{p.glyph} {p.nombre}</span>
                <span style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "rgba(212,196,160,0.5)" }}>
                  {p.categoria} · {p.precio ? `$${p.precio.toLocaleString("es-CL")}` : "sin precio"} {p.oculto ? "· OCULTO" : ""}
                </span>
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button style={botonMini} onClick={() => { setForm(p); setMsg(null); }}>Editar</button>
                <button style={botonMini} onClick={() => borrar(p.slug)}>Borrar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block", marginBottom: "0.9rem" }}>
      <span style={labelTexto}>{label}</span>
      {children}
    </label>
  );
}

const labelTexto: CSSProperties = {
  display: "block", fontFamily: "var(--font-grimoire)", fontSize: "0.58rem", letterSpacing: "0.14em",
  textTransform: "uppercase", color: "rgba(212,196,160,0.65)", marginBottom: "0.35rem",
};
const input: CSSProperties = {
  width: "100%", fontFamily: "var(--font-body)", fontSize: "0.92rem", color: CREAM, background: "rgba(8,13,8,0.7)",
  border: "1px solid rgba(200,160,80,0.25)", borderRadius: 5, padding: "0.5rem 0.6rem", boxSizing: "border-box",
};
const area: CSSProperties = { ...input, minHeight: 70, resize: "vertical", lineHeight: 1.5 };
const grid2: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.8rem" };
const checkLabel: CSSProperties = { fontFamily: "var(--font-body)", fontSize: "0.88rem", color: CREAM, display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer" };
const filaStyle: CSSProperties = {
  display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem",
  border: "1px solid rgba(200,160,80,0.16)", borderRadius: 8, padding: "0.7rem 1rem", background: "rgba(15,26,15,0.5)",
};
const botonPrimario: CSSProperties = {
  fontFamily: "var(--font-grimoire)", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase",
  color: "#12200f", background: "linear-gradient(135deg, #e8c878, #c8a050)", border: "1px solid rgba(200,160,80,0.5)",
  borderRadius: 4, padding: "0.7rem 1.4rem", cursor: "pointer",
};
const botonSecundario: CSSProperties = { ...botonPrimario, color: GOLD, background: "rgba(200,160,80,0.1)" };
const botonMini: CSSProperties = {
  fontFamily: "var(--font-grimoire)", fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase",
  color: GOLD, background: "rgba(200,160,80,0.08)", border: "1px solid rgba(200,160,80,0.3)", borderRadius: 4,
  padding: "0.4rem 0.8rem", cursor: "pointer",
};

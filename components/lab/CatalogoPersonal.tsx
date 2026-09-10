"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { createClient } from "@/lib/supabase-browser";
import type { ProductoTienda } from "@/lib/productos-tienda";

/* Catálogo propio de cada usuaria: sube las fotos de sus productos, elige un
   diseño, pone su marca y lo descarga listo para mandar — en PDF (respeta el
   diseño) o en Word (editable).

   Las fotos van a un espacio público de Storage, en una carpeta por usuaria,
   porque el documento de Word tiene que poder mostrarlas al abrirse en otro
   computador (un enlace temporal expiraría). */

type Plantilla = {
  id: string;
  nombre: string;
  descripcion: string;
  fondo: string | null;
  papel: string;
  tinta: string;
  tintaSuave: string;
  acento: string;
  titular: string;
  cuerpo: string;
  borde: string;
  /* Colores planos para el documento de Word, que no entiende degradados. */
  wordPapel: string;
  wordTinta: string;
  wordAcento: string;
  wordFuente: string;
};

const PLANTILLAS: Plantilla[] = [
  {
    id: "grimorio",
    nombre: "Grimorio",
    descripcion: "Oscuro y ritual",
    fondo: "/fondo_tienda.jpg",
    papel: "#0b140b",
    tinta: "#e8d8b0",
    tintaSuave: "rgba(212,196,160,0.75)",
    acento: "#c8a050",
    titular: "var(--font-cinzel), serif",
    cuerpo: "var(--font-crimson), serif",
    borde: "rgba(200,160,80,0.35)",
    wordPapel: "#101a10",
    wordTinta: "#e8d8b0",
    wordAcento: "#c8a050",
    wordFuente: "Georgia, 'Times New Roman', serif",
  },
  {
    id: "herbario",
    nombre: "Herbario",
    descripcion: "Claro y botánico",
    fondo: null,
    papel: "#f4efe2",
    tinta: "#2f3a26",
    tintaSuave: "rgba(47,58,38,0.72)",
    acento: "#7a6a2f",
    titular: "var(--font-cormorant), serif",
    cuerpo: "var(--font-crimson), serif",
    borde: "rgba(122,106,47,0.35)",
    wordPapel: "#f4efe2",
    wordTinta: "#2f3a26",
    wordAcento: "#7a6a2f",
    wordFuente: "Garamond, Georgia, serif",
  },
  {
    id: "limpio",
    nombre: "Limpio",
    descripcion: "Blanco y sobrio",
    fondo: null,
    papel: "#ffffff",
    tinta: "#1f2a1a",
    tintaSuave: "rgba(31,42,26,0.7)",
    acento: "#4a6b34",
    titular: "var(--font-lora), serif",
    cuerpo: "var(--font-lora), serif",
    borde: "rgba(31,42,26,0.18)",
    wordPapel: "#ffffff",
    wordTinta: "#1f2a1a",
    wordAcento: "#4a6b34",
    wordFuente: "Calibri, Arial, sans-serif",
  },
];

const CLAVE = "floema-catalogo-marca";
type Marca = { nombre: string; lema: string; contacto: string };

export function CatalogoPersonal({
  productos: iniciales,
  userId,
}: {
  productos: ProductoTienda[];
  userId: string;
}) {
  const [productos, setProductos] = useState(iniciales);
  const [plantillaId, setPlantillaId] = useState("grimorio");
  const [marca, setMarca] = useState<Marca>({ nombre: "", lema: "", contacto: "" });
  const [generando, setGenerando] = useState(false);
  const [subiendo, setSubiendo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const p = useMemo(() => PLANTILLAS.find((x) => x.id === plantillaId) ?? PLANTILLAS[0], [plantillaId]);

  useEffect(() => {
    try {
      const g = localStorage.getItem(CLAVE);
      if (g) setMarca(JSON.parse(g));
    } catch {
      /* sin almacenamiento */
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(marca));
    } catch {
      /* nada */
    }
  }, [marca]);

  const porCategoria = useMemo(() => {
    const m = new Map<string, ProductoTienda[]>();
    for (const prod of productos) {
      const c = prod.categoria?.trim() || "Otros";
      if (!m.has(c)) m.set(c, []);
      m.get(c)!.push(prod);
    }
    return [...m.entries()];
  }, [productos]);

  async function subirFoto(slug: string, file: File) {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Ese archivo no es una imagen.");
      return;
    }
    if (file.size > 6 * 1024 * 1024) {
      setError("La foto pesa más de 6 MB. Usa una más liviana.");
      return;
    }
    setSubiendo(slug);
    try {
      const supabase = createClient();
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const ruta = `${userId}/${slug}-${Date.now()}.${ext}`;

      const { error: errSubida } = await supabase.storage.from("productos").upload(ruta, file, {
        contentType: file.type,
        upsert: false,
      });
      if (errSubida) throw new Error(errSubida.message);

      const { data: pub } = supabase.storage.from("productos").getPublicUrl(ruta);
      const url = pub.publicUrl;

      const { error: errDb } = await supabase.from("productos").update({ imagen_url: url }).eq("slug", slug);
      if (errDb) throw new Error(errDb.message);

      setProductos((ps) => ps.map((x) => (x.slug === slug ? { ...x, imagenUrl: url } : x)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "No se pudo subir la foto.");
    } finally {
      setSubiendo(null);
    }
  }

  async function descargarPdf() {
    const el = document.getElementById("mi-catalogo");
    if (!el) return;
    setGenerando(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      try {
        await (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts?.ready;
      } catch {
        /* Fonts API no disponible */
      }
      await html2pdf()
        .set({
          filename: `catalogo-${slugMarca()}.pdf`,
          margin: 0,
          image: { type: "jpeg", quality: 0.96 },
          html2canvas: { scale: 2, backgroundColor: p.papel, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["css", "legacy"], avoid: ".cat-item" },
        })
        .from(el)
        .save();
    } finally {
      setGenerando(false);
    }
  }

  const slugMarca = () => (marca.nombre || "mi-marca").toLowerCase().replace(/\s+/g, "-");

  /* Documento de Word: se arma con la misma paleta y las mismas fotos, pero con
     maquetado de tabla, que es lo que Word respeta bien. */
  function descargarEditable() {
    const abs = (u?: string) => (u && u.startsWith("/") ? `${location.origin}${u}` : u);

    const secciones = porCategoria
      .map(([cat, items]) => {
        const filas = items
          .map((it) => {
            const foto = abs(it.imagenUrl);
            const celdaFoto = foto
              ? `<td width="120" style="padding:8pt 10pt 8pt 0;vertical-align:top;"><img src="${foto}" width="110" style="width:110px;border:1px solid ${p.wordAcento};"/></td>`
              : "";
            return `
    <tr>
      ${celdaFoto}
      <td style="padding:8pt 0;vertical-align:top;">
        <p style="margin:0 0 2pt;font-size:13pt;font-weight:bold;color:${p.wordTinta};">${esc(it.nombre)}${
              it.tamano ? ` <span style="font-weight:normal;font-size:10pt;color:${p.wordAcento};">· ${esc(it.tamano)}</span>` : ""
            }</p>
        ${it.descripcion ? `<p style="margin:0 0 4pt;font-size:11pt;color:${p.wordTinta};">${esc(it.descripcion)}</p>` : ""}
        ${it.modoUso ? `<p style="margin:0 0 3pt;font-size:10pt;color:${p.wordTinta};"><b>Modo de uso:</b> ${esc(it.modoUso)}</p>` : ""}
        ${it.ingredientes ? `<p style="margin:0 0 3pt;font-size:9pt;color:${p.wordAcento};"><i>${esc(it.ingredientes)}</i></p>` : ""}
        <p style="margin:4pt 0 0;font-size:12pt;font-weight:bold;color:${p.wordAcento};">${
              it.precio ? `$${it.precio.toLocaleString("es-CL")} CLP` : "Consultar precio"
            }</p>
      </td>
    </tr>
    <tr><td colspan="2" style="border-bottom:1px solid ${p.wordAcento};opacity:0.3;font-size:1pt;">&nbsp;</td></tr>`;
          })
          .join("");
        return `
  <h2 style="margin:20pt 0 6pt;font-size:14pt;letter-spacing:2pt;text-transform:uppercase;color:${p.wordAcento};">${esc(cat)}</h2>
  <table cellpadding="0" cellspacing="0" width="100%">${filas}</table>`;
      })
      .join("");

    const doc = `<!DOCTYPE html><html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
<head><meta charset="utf-8"><title>${esc(marca.nombre || "Catálogo")}</title>
<style>@page { size: A4; margin: 2cm; } body { font-family: ${p.wordFuente}; color:${p.wordTinta}; background:${p.wordPapel}; }</style>
</head>
<body>
  <div style="text-align:center;padding:18pt 0 14pt;border-bottom:2px solid ${p.wordAcento};margin-bottom:6pt;">
    <h1 style="margin:0 0 4pt;font-size:30pt;letter-spacing:3pt;color:${p.wordAcento};">${esc(marca.nombre || "Mi catálogo")}</h1>
    ${marca.lema ? `<p style="margin:0;font-style:italic;font-size:12pt;color:${p.wordTinta};">${esc(marca.lema)}</p>` : ""}
  </div>
  ${secciones}
  ${
    marca.contacto
      ? `<p style="margin-top:24pt;padding-top:10pt;border-top:2px solid ${p.wordAcento};text-align:center;font-size:12pt;color:${p.wordAcento};"><b>${esc(
          marca.contacto
        )}</b></p>`
      : ""
  }
</body></html>`;

    const blob = new Blob(["﻿", doc], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `catalogo-${slugMarca()}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (productos.length === 0) {
    return (
      <div style={vacioStyle}>
        <p style={{ fontFamily: "var(--font-crimson), serif", margin: 0 }}>
          Todavía no tienes productos visibles. Agrégalos en <strong>Mi catálogo</strong> y asegúrate de no
          dejarlos marcados como ocultos.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="no-print" style={panelStyle}>
        <p style={etiquetaStyle}>Diseño</p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          {PLANTILLAS.map((pl) => (
            <button
              key={pl.id}
              type="button"
              onClick={() => setPlantillaId(pl.id)}
              style={{
                ...chipStyle,
                borderColor: pl.id === plantillaId ? "#c8a050" : "rgba(200,160,80,0.25)",
                background: pl.id === plantillaId ? "rgba(200,160,80,0.14)" : "transparent",
                color: pl.id === plantillaId ? "#e8c878" : "rgba(212,196,160,0.7)",
              }}
            >
              <span style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.12em" }}>{pl.nombre}</span>
              <span style={{ display: "block", fontSize: "0.72rem", opacity: 0.6, textTransform: "none", letterSpacing: 0, fontFamily: "var(--font-crimson), serif" }}>
                {pl.descripcion}
              </span>
            </button>
          ))}
        </div>

        <p style={etiquetaStyle}>Tu marca</p>
        <div style={{ display: "grid", gap: "0.5rem", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", marginBottom: "1rem" }}>
          <input style={inputStyle} placeholder="Nombre de tu marca" value={marca.nombre} onChange={(e) => setMarca({ ...marca, nombre: e.target.value })} />
          <input style={inputStyle} placeholder="Lema (opcional)" value={marca.lema} onChange={(e) => setMarca({ ...marca, lema: e.target.value })} />
          <input style={inputStyle} placeholder="@instagram / teléfono" value={marca.contacto} onChange={(e) => setMarca({ ...marca, contacto: e.target.value })} />
        </div>

        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <button type="button" onClick={descargarPdf} disabled={generando} style={botonPrimarioStyle}>
            {generando ? "Generando…" : "Descargar PDF"}
          </button>
          <button type="button" onClick={descargarEditable} style={botonSecundarioStyle}>
            Descargar Word (editable)
          </button>
          <button type="button" onClick={() => window.print()} style={botonSecundarioStyle}>
            Imprimir
          </button>
        </div>
        {error && <p style={{ ...pistaStyle, color: "#f0a080" }}>{error}</p>}
        <p style={pistaStyle}>
          Sube una foto a cada producto para que el catálogo se vea completo. El PDF conserva el diseño; el
          Word lleva las mismas fotos y colores, y además puedes editar los textos.
        </p>
      </div>

      {/* ── El catálogo ── */}
      <div
        id="mi-catalogo"
        style={{
          background: p.fondo ? `linear-gradient(rgba(8,13,8,0.88), rgba(8,13,8,0.93)), url('${p.fondo}') center / cover` : p.papel,
          color: p.tinta,
          padding: "40px 36px 46px",
          borderRadius: 8,
          border: `1px solid ${p.borde}`,
        }}
      >
        <header style={{ textAlign: "center", marginBottom: 34, paddingBottom: 24, borderBottom: `2px solid ${p.acento}` }}>
          <h1 style={{ fontFamily: p.titular, fontSize: "2.3rem", letterSpacing: "0.14em", color: p.acento, margin: "0 0 8px", textTransform: "uppercase" }}>
            {marca.nombre || "Mi catálogo"}
          </h1>
          {marca.lema && <p style={{ fontFamily: p.cuerpo, fontStyle: "italic", fontSize: "1.05rem", color: p.tintaSuave, margin: 0 }}>{marca.lema}</p>}
        </header>

        {porCategoria.map(([cat, items]) => (
          <section key={cat} style={{ marginBottom: 28 }}>
            <h2 style={{ fontFamily: p.titular, fontSize: "0.82rem", letterSpacing: "0.24em", textTransform: "uppercase", color: p.acento, margin: "0 0 14px" }}>
              {cat}
            </h2>

            {items.map((it) => (
              <div
                key={it.slug}
                className="cat-item"
                style={{ display: "flex", gap: 16, marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid ${p.borde}`, breakInside: "avoid" }}
              >
                {/* Foto (o botón para subirla) */}
                <div style={{ flexShrink: 0, width: 96 }}>
                  {it.imagenUrl ? (
                    <img
                      src={it.imagenUrl}
                      alt={it.nombre}
                      style={{ width: 96, height: 96, objectFit: "cover", borderRadius: 4, border: `1px solid ${p.borde}` }}
                    />
                  ) : (
                    <div style={{ width: 96, height: 96, borderRadius: 4, border: `1px dashed ${p.borde}`, display: "flex", alignItems: "center", justifyContent: "center", color: p.tintaSuave, fontSize: "1.4rem" }}>
                      ✦
                    </div>
                  )}
                  <label className="no-print" style={subirStyle}>
                    {subiendo === it.slug ? "Subiendo…" : it.imagenUrl ? "Cambiar foto" : "Subir foto"}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      disabled={subiendo !== null}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) subirFoto(it.slug, f);
                        e.target.value = "";
                      }}
                    />
                  </label>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "baseline" }}>
                    <p style={{ fontFamily: p.titular, fontSize: "1.05rem", color: p.tinta, margin: 0 }}>
                      {it.nombre}
                      {it.tamano && <span style={{ fontSize: "0.78rem", color: p.acento }}> · {it.tamano}</span>}
                    </p>
                    <p style={{ fontFamily: p.titular, fontSize: "1rem", color: p.acento, margin: 0, whiteSpace: "nowrap" }}>
                      {it.precio ? `$${it.precio.toLocaleString("es-CL")}` : "—"}
                    </p>
                  </div>
                  {it.descripcion && (
                    <p style={{ fontFamily: p.cuerpo, fontSize: "0.9rem", color: p.tintaSuave, margin: "4px 0 0", lineHeight: 1.6 }}>{it.descripcion}</p>
                  )}
                  {it.modoUso && (
                    <p style={{ fontFamily: p.cuerpo, fontSize: "0.84rem", color: p.tintaSuave, margin: "4px 0 0", lineHeight: 1.55 }}>
                      <strong style={{ color: p.acento }}>Modo de uso:</strong> {it.modoUso}
                    </p>
                  )}
                  {it.ingredientes && (
                    <p style={{ fontFamily: p.cuerpo, fontSize: "0.76rem", fontStyle: "italic", color: p.tintaSuave, margin: "4px 0 0", opacity: 0.8 }}>
                      {it.ingredientes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </section>
        ))}

        {marca.contacto && (
          <p style={{ fontFamily: p.cuerpo, textAlign: "center", color: p.acento, marginTop: 28, paddingTop: 16, borderTop: `2px solid ${p.acento}`, fontSize: "1rem" }}>
            {marca.contacto}
          </p>
        )}
      </div>
    </>
  );
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const panelStyle: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.22)",
  background: "rgba(200,160,80,0.05)",
  borderRadius: 8,
  padding: "1rem 1.1rem",
  marginBottom: "1.4rem",
};
const etiquetaStyle: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.58rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(200,160,80,0.75)",
  margin: "0 0 0.5rem",
};
const chipStyle: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  textTransform: "uppercase",
  border: "1px solid",
  borderRadius: 6,
  padding: "0.5rem 0.8rem",
  cursor: "pointer",
  textAlign: "left",
  minHeight: 44,
};
const inputStyle: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.92rem",
  color: "#d4c4a0",
  background: "rgba(13,26,13,0.85)",
  border: "1px solid rgba(200,160,80,0.28)",
  borderRadius: 4,
  padding: "0.5rem 0.6rem",
  minHeight: 40,
};
const botonPrimarioStyle: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.66rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#0d1a0d",
  background: "rgba(200,160,80,0.92)",
  border: "none",
  borderRadius: 4,
  padding: "0 1.3rem",
  minHeight: 42,
  cursor: "pointer",
};
const botonSecundarioStyle: CSSProperties = {
  ...botonPrimarioStyle,
  color: "#c8a050",
  background: "transparent",
  border: "1px solid rgba(200,160,80,0.45)",
};
const subirStyle: CSSProperties = {
  display: "block",
  marginTop: 6,
  textAlign: "center",
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.52rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#c8a050",
  border: "1px solid rgba(200,160,80,0.4)",
  borderRadius: 3,
  padding: "5px 4px",
  cursor: "pointer",
};
const pistaStyle: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.84rem",
  color: "rgba(212,196,160,0.6)",
  margin: "0.7rem 0 0",
  lineHeight: 1.6,
};
const vacioStyle: CSSProperties = {
  border: "1px dashed rgba(200,160,80,0.3)",
  borderRadius: 8,
  padding: "1.4rem",
  color: "#d4c4a0",
};

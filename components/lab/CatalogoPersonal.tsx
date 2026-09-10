"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import type { ProductoTienda } from "@/lib/productos-tienda";

/* Catálogo propio de cada usuaria: elige plantilla, pone su marca y lo
   descarga para imprimir (PDF) o para editar (documento de Word).

   El PDF conserva el diseño tal cual; el documento es editable pero pierde
   los fondos, así que para editar conviene la plantilla "Limpio". */

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
};

const PLANTILLAS: Plantilla[] = [
  {
    id: "grimorio",
    nombre: "Grimorio",
    descripcion: "Oscuro y ritual, como la botica",
    fondo: "/fondo_tienda.jpg",
    papel: "#0b140b",
    tinta: "#e8d8b0",
    tintaSuave: "rgba(212,196,160,0.72)",
    acento: "#c8a050",
    titular: "var(--font-cinzel), serif",
    cuerpo: "var(--font-crimson), serif",
    borde: "rgba(200,160,80,0.35)",
  },
  {
    id: "herbario",
    nombre: "Herbario",
    descripcion: "Claro y botánico, tipo lámina antigua",
    fondo: null,
    papel: "#f4efe2",
    tinta: "#2f3a26",
    tintaSuave: "rgba(47,58,38,0.7)",
    acento: "#7a6a2f",
    titular: "var(--font-cormorant), serif",
    cuerpo: "var(--font-crimson), serif",
    borde: "rgba(122,106,47,0.35)",
  },
  {
    id: "limpio",
    nombre: "Limpio",
    descripcion: "Blanco y sobrio — el mejor para editar en Word",
    fondo: null,
    papel: "#ffffff",
    tinta: "#1f2a1a",
    tintaSuave: "rgba(31,42,26,0.68)",
    acento: "#4a6b34",
    titular: "var(--font-lora), serif",
    cuerpo: "var(--font-lora), serif",
    borde: "rgba(31,42,26,0.2)",
  },
];

const CLAVE = "floema-catalogo-marca";

type Marca = { nombre: string; lema: string; contacto: string };

export function CatalogoPersonal({ productos }: { productos: ProductoTienda[] }) {
  const [plantillaId, setPlantillaId] = useState("grimorio");
  const [marca, setMarca] = useState<Marca>({ nombre: "", lema: "", contacto: "" });
  const [generando, setGenerando] = useState(false);

  const p = useMemo(() => PLANTILLAS.find((x) => x.id === plantillaId) ?? PLANTILLAS[0], [plantillaId]);

  // Los datos de la marca se guardan en este navegador: no hay que reescribirlos.
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(CLAVE);
      if (guardado) setMarca(JSON.parse(guardado));
    } catch {
      /* sin almacenamiento disponible */
    }
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(marca));
    } catch {
      /* nada que hacer */
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
          filename: `catalogo-${(marca.nombre || "mi-marca").toLowerCase().replace(/\s+/g, "-")}.pdf`,
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

  /* Documento editable: se arma un HTML con estilos simples que Word y Google
     Docs abren sin problema. No se usa el diseño con fondo porque al editarlo
     estorba; el objetivo aquí es que puedan cambiar los textos. */
  function descargarEditable() {
    const filas = porCategoria
      .map(([cat, items]) => {
        const productosHtml = items
          .map(
            (it) => `
      <p style="margin:14pt 0 2pt;font-size:13pt;font-weight:bold;color:#2f3a26;">${escapar(it.nombre)}${
        it.tamano ? ` <span style="font-weight:normal;color:#666;">· ${escapar(it.tamano)}</span>` : ""
      }</p>
      ${it.descripcion ? `<p style="margin:0 0 3pt;font-size:11pt;color:#333;">${escapar(it.descripcion)}</p>` : ""}
      ${it.ingredientes ? `<p style="margin:0 0 3pt;font-size:9.5pt;color:#666;"><i>Ingredientes: ${escapar(it.ingredientes)}</i></p>` : ""}
      ${it.modoUso ? `<p style="margin:0 0 3pt;font-size:10pt;color:#333;"><b>Modo de uso:</b> ${escapar(it.modoUso)}</p>` : ""}
      <p style="margin:0 0 8pt;font-size:11pt;color:#4a6b34;"><b>${
        it.precio ? `$${it.precio.toLocaleString("es-CL")} CLP` : "Precio a convenir"
      }</b></p>`
          )
          .join("");
        return `<h2 style="margin:22pt 0 4pt;font-size:14pt;color:#4a6b34;border-bottom:1px solid #ccc;padding-bottom:3pt;">${escapar(
          cat
        )}</h2>${productosHtml}`;
      })
      .join("");

    const doc = `<!DOCTYPE html><html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="utf-8"><title>${escapar(
      marca.nombre || "Catálogo"
    )}</title></head>
<body style="font-family:Georgia,'Times New Roman',serif;color:#1f2a1a;">
  <h1 style="text-align:center;font-size:24pt;margin:0 0 4pt;color:#2f3a26;">${escapar(marca.nombre || "Mi catálogo")}</h1>
  ${marca.lema ? `<p style="text-align:center;font-style:italic;color:#666;margin:0 0 18pt;">${escapar(marca.lema)}</p>` : ""}
  ${filas}
  ${
    marca.contacto
      ? `<p style="margin-top:26pt;text-align:center;font-size:11pt;color:#444;border-top:1px solid #ccc;padding-top:10pt;">${escapar(
          marca.contacto
        )}</p>`
      : ""
  }
</body></html>`;

    const blob = new Blob(["﻿", doc], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `catalogo-${(marca.nombre || "mi-marca").toLowerCase().replace(/\s+/g, "-")}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  }

  if (productos.length === 0) {
    return (
      <div style={vacioStyle}>
        <p style={{ fontFamily: "var(--font-crimson), serif", fontSize: "1rem", margin: 0 }}>
          Todavía no tienes productos visibles. Ve a <strong>Mi catálogo</strong>, agrega tus productos y
          asegúrate de no dejarlos marcados como ocultos.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* ── Controles (no salen impresos) ── */}
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
              <span style={{ display: "block", fontSize: "0.72rem", opacity: 0.65, textTransform: "none", letterSpacing: 0, fontFamily: "var(--font-crimson), serif" }}>
                {pl.descripcion}
              </span>
            </button>
          ))}
        </div>

        <p style={etiquetaStyle}>Tu marca</p>
        <div style={{ display: "grid", gap: "0.5rem", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", marginBottom: "1rem" }}>
          <input style={inputStyle} placeholder="Nombre de tu marca" value={marca.nombre} onChange={(e) => setMarca({ ...marca, nombre: e.target.value })} />
          <input style={inputStyle} placeholder="Lema (opcional)" value={marca.lema} onChange={(e) => setMarca({ ...marca, lema: e.target.value })} />
          <input style={inputStyle} placeholder="Contacto: @instagram / teléfono" value={marca.contacto} onChange={(e) => setMarca({ ...marca, contacto: e.target.value })} />
        </div>

        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <button type="button" onClick={descargarPdf} disabled={generando} style={botonPrimarioStyle}>
            {generando ? "Generando…" : "Descargar PDF"}
          </button>
          <button type="button" onClick={descargarEditable} style={botonSecundarioStyle}>
            Descargar para editar (Word)
          </button>
          <button type="button" onClick={() => window.print()} style={botonSecundarioStyle}>
            Imprimir
          </button>
        </div>
        <p style={pistaStyle}>
          El PDF respeta el diseño. El documento de Word es editable pero sin fondo — para editarlo
          conviene el diseño «Limpio».
        </p>
      </div>

      {/* ── El catálogo ── */}
      <div
        id="mi-catalogo"
        style={{
          background: p.fondo ? `linear-gradient(rgba(8,13,8,0.86), rgba(8,13,8,0.92)), url('${p.fondo}') center / cover` : p.papel,
          color: p.tinta,
          padding: "38px 34px 44px",
          borderRadius: 8,
          border: `1px solid ${p.borde}`,
        }}
      >
        <header style={{ textAlign: "center", marginBottom: 30, paddingBottom: 22, borderBottom: `1px solid ${p.borde}` }}>
          <h1 style={{ fontFamily: p.titular, fontSize: "2.1rem", letterSpacing: "0.12em", color: p.acento, margin: "0 0 6px" }}>
            {marca.nombre || "Mi catálogo"}
          </h1>
          {marca.lema && (
            <p style={{ fontFamily: p.cuerpo, fontStyle: "italic", color: p.tintaSuave, margin: 0 }}>{marca.lema}</p>
          )}
        </header>

        {porCategoria.map(([cat, items]) => (
          <section key={cat} style={{ marginBottom: 26 }}>
            <h2 style={{ fontFamily: p.titular, fontSize: "0.86rem", letterSpacing: "0.2em", textTransform: "uppercase", color: p.acento, margin: "0 0 12px", paddingBottom: 5, borderBottom: `1px solid ${p.borde}` }}>
              {cat}
            </h2>
            {items.map((it) => (
              <div key={it.slug} className="cat-item" style={{ marginBottom: 14, breakInside: "avoid" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "baseline" }}>
                  <p style={{ fontFamily: p.titular, fontSize: "1rem", color: p.tinta, margin: 0 }}>
                    {it.nombre}
                    {it.tamano && <span style={{ fontSize: "0.8rem", color: p.tintaSuave }}> · {it.tamano}</span>}
                  </p>
                  <p style={{ fontFamily: p.titular, fontSize: "0.95rem", color: p.acento, margin: 0, whiteSpace: "nowrap" }}>
                    {it.precio ? `$${it.precio.toLocaleString("es-CL")}` : "—"}
                  </p>
                </div>
                {it.descripcion && (
                  <p style={{ fontFamily: p.cuerpo, fontSize: "0.9rem", color: p.tintaSuave, margin: "3px 0 0", lineHeight: 1.6 }}>
                    {it.descripcion}
                  </p>
                )}
                {it.ingredientes && (
                  <p style={{ fontFamily: p.cuerpo, fontSize: "0.78rem", fontStyle: "italic", color: p.tintaSuave, margin: "3px 0 0", opacity: 0.8 }}>
                    {it.ingredientes}
                  </p>
                )}
              </div>
            ))}
          </section>
        ))}

        {marca.contacto && (
          <p style={{ fontFamily: p.cuerpo, textAlign: "center", color: p.tintaSuave, marginTop: 26, paddingTop: 14, borderTop: `1px solid ${p.borde}` }}>
            {marca.contacto}
          </p>
        )}
      </div>
    </>
  );
}

function escapar(s: string): string {
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

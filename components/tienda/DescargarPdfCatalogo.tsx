"use client";

import { useState, type CSSProperties } from "react";

// Descarga el catálogo como PDF directamente (sin el diálogo de impresión),
// generándolo en el navegador a partir del contenido con id=targetId.
export default function DescargarPdfCatalogo({ targetId }: { targetId: string }) {
  const [generando, setGenerando] = useState(false);

  async function descargar() {
    const el = document.getElementById(targetId);
    if (!el) return;
    setGenerando(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      // Esperar a que las fuentes carguen para que el PDF no use una de respaldo.
      try {
        await (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts?.ready;
      } catch {
        /* fonts API no disponible */
      }
      await html2pdf()
        .set({
          filename: "catalogo-el-floema.pdf",
          margin: 0,
          image: { type: "jpeg", quality: 0.96 },
          html2canvas: { scale: 2, backgroundColor: "#0b140b", useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["css", "legacy"], avoid: ".cat-card" },
        })
        .from(el)
        .save();
    } finally {
      setGenerando(false);
    }
  }

  return (
    <button type="button" className="no-print" onClick={descargar} disabled={generando} style={botonStyle}>
      {generando ? "Generando PDF…" : "Descargar catálogo (PDF)"}
    </button>
  );
}

const botonStyle: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.72rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "#0d1a0d",
  background: "rgba(200,160,80,0.92)",
  border: "1px solid rgba(200,160,80,0.5)",
  borderRadius: 3,
  padding: "0.85rem 1.8rem",
  cursor: "pointer",
};

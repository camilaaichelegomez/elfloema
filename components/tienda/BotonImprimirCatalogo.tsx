"use client";

// Botón para descargar/imprimir el catálogo como PDF (usa el diálogo de impresión
// del navegador → "Guardar como PDF"). Se oculta en la impresión con .no-print.
export default function BotonImprimirCatalogo() {
  return (
    <button
      type="button"
      className="no-print"
      onClick={() => window.print()}
      style={{
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
      }}
    >
      Descargar / Imprimir PDF
    </button>
  );
}

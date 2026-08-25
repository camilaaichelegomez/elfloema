"use client";

export default function BotonImprimir({ label = "Imprimir 🖨" }: { label?: string }) {
  return <button onClick={() => window.print()}>{label}</button>;
}

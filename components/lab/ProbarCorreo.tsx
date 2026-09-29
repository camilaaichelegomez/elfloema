"use client";

import { useState, type CSSProperties } from "react";

/* Un botón para comprobar que el aviso por correo llega de verdad.
   Manda un pedido de mentira, claramente marcado como prueba: así no hace
   falta comprar algo real para saber si quedó bien configurado. */

export function ProbarCorreo() {
  const [estado, setEstado] = useState<"quieto" | "mandando" | "listo" | "falla">("quieto");
  const [causa, setCausa] = useState<string | null>(null);

  async function probar() {
    setEstado("mandando");
    setCausa(null);
    try {
      const res = await fetch("/api/lab/probar-correo", { method: "POST" });
      const r = await res.json();
      if (r.ok) {
        setEstado("listo");
      } else {
        setEstado("falla");
        setCausa(r.causa ?? r.error ?? "No se pudo mandar.");
      }
    } catch {
      setEstado("falla");
      setCausa("No se pudo contactar al servidor. Revisá tu conexión.");
    }
  }

  return (
    <section style={caja}>
      <p style={titulo}>El aviso por correo</p>
      <p style={nota}>
        Cuando alguien pague en la tienda te llega un correo con qué compró y a dónde mandarlo. Acá
        podés comprobar que funciona sin tener que comprar nada.
      </p>

      <button type="button" onClick={probar} disabled={estado === "mandando"} style={boton}>
        {estado === "mandando" ? "Mandando…" : "Mandarme un correo de prueba"}
      </button>

      {estado === "listo" && (
        <p style={{ ...nota, color: "#9fc98a", fontStyle: "normal", marginTop: "0.9rem" }}>
          Mandado. Debería llegarte en menos de un minuto. Si no aparece, mirá en spam o en
          «promociones».
        </p>
      )}
      {estado === "falla" && (
        <p style={{ ...nota, color: "#e05a4a", fontStyle: "normal", marginTop: "0.9rem" }}>{causa}</p>
      )}
    </section>
  );
}

const caja: CSSProperties = {
  background: "rgba(10,16,10,0.72)",
  border: "1px solid rgba(200,160,80,0.28)",
  borderRadius: 6,
  padding: "1.1rem 1.2rem",
  marginBottom: "2.4rem",
};
const titulo: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.78rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#c8a050",
  margin: "0 0 0.5rem",
};
const nota: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontStyle: "italic",
  color: "rgba(212,196,160,0.65)",
  margin: 0,
  maxWidth: "58ch",
};
const boton: CSSProperties = {
  marginTop: "1rem",
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.72rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#d4c4a0",
  background: "transparent",
  border: "1px solid rgba(200,160,80,0.4)",
  borderRadius: 3,
  padding: "0.7rem 1.1rem",
  minHeight: 44,
  cursor: "pointer",
};

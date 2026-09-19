"use client";

import { Suspense, useEffect, type CSSProperties } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useCart } from "@/components/tienda/CartProvider";

// Adonde llega la clienta al volver de Flow. El estado ya viene revisado con
// Flow por /api/flow/retorno; aqui solo se muestra.

const GOLD = "#c8a050";
const CREAM = "#d4c4a0";

const TEXTOS: Record<string, { titulo: string; texto: string; glifo: string }> = {
  pagado: {
    glifo: "✦",
    titulo: "¡Gracias por tu compra!",
    texto:
      "Tu pago quedó confirmado. Te llegará un comprobante al correo, y te escribiremos cuando tu pedido vaya en camino.",
  },
  pendiente: {
    glifo: "☾",
    titulo: "Tu pago está en proceso",
    texto:
      "Todavía no se confirma. Si pagaste por transferencia puede tardar unos minutos. Apenas se confirme, preparamos tu pedido.",
  },
  rechazado: {
    glifo: "❧",
    titulo: "El pago no se completó",
    texto: "No se hizo ningún cargo. Tu carrito sigue guardado: puedes intentarlo de nuevo, con otra tarjeta o por transferencia.",
  },
  anulado: {
    glifo: "❧",
    titulo: "El pago se anuló",
    texto: "No se hizo ningún cargo. Tu carrito sigue guardado por si quieres intentarlo de nuevo.",
  },
  desconocido: {
    glifo: "☾",
    titulo: "No pudimos ver cómo quedó tu pago",
    texto:
      "Si se hizo el cargo, te llegará el comprobante al correo. Si tienes dudas, escríbenos a Instagram (@elfloema.cl) y lo revisamos.",
  },
};

function Contenido() {
  const q = useSearchParams();
  const estado = q.get("estado") ?? "desconocido";
  const orden = q.get("orden");
  const t = TEXTOS[estado] ?? TEXTOS.desconocido;
  const { clear, hydrated } = useCart();

  // Pagado: el carrito ya cumplió. Se espera a que el carrito termine de
  // cargarse del teléfono; si no, al cargarse volvería a aparecer lleno.
  useEffect(() => {
    if (estado === "pagado" && hydrated) clear();
  }, [estado, hydrated, clear]);

  const reintentar = estado === "rechazado" || estado === "anulado";

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
      <div aria-hidden style={{ fontSize: "2.4rem", color: GOLD, marginBottom: "1rem" }}>
        {t.glifo}
      </div>
      <h1
        style={{
          fontFamily: "var(--font-cinzel), serif",
          fontSize: "clamp(1.5rem,4vw,2.2rem)",
          color: GOLD,
          letterSpacing: "0.08em",
          margin: "0 0 1.2rem",
          textWrap: "balance",
        }}
      >
        {t.titulo}
      </h1>
      <p style={{ fontFamily: "var(--font-crimson), serif", fontSize: "1.15rem", color: CREAM, lineHeight: 1.6, margin: "0 0 1.4rem" }}>
        {t.texto}
      </p>
      {orden && (
        <p style={{ fontFamily: "var(--font-crimson), serif", fontStyle: "italic", color: "rgba(212,196,160,0.65)", margin: "0 0 2rem" }}>
          N.º de pedido: <strong style={{ color: CREAM, fontStyle: "normal", letterSpacing: "0.04em" }}>{orden}</strong>
        </p>
      )}
      <Link href={reintentar ? "/tienda/checkout" : "/tienda"} style={boton}>
        {reintentar ? "Intentar de nuevo →" : "Volver a la tienda →"}
      </Link>
    </div>
  );
}

export default function PedidoPage() {
  return (
    <>
      <Navbar />
      <main
        className="bg-vivo"
        style={{
          background:
            "linear-gradient(rgba(8,13,8,0.62), rgba(8,13,8,0.78)), url('/fondo_tienda.jpg') center top / cover fixed, var(--bg-primary)",
          minHeight: "100vh",
          padding: "clamp(7rem,16vh,10rem) clamp(1.25rem,5vw,3rem) 6rem",
        }}
      >
        <Suspense fallback={null}>
          <Contenido />
        </Suspense>
      </main>
    </>
  );
}

const boton: CSSProperties = {
  display: "inline-block",
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.78rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "#12200f",
  background: "linear-gradient(135deg, #e8c878, #c8a050)",
  borderRadius: 3,
  padding: "0.95rem 1.8rem",
  textDecoration: "none",
};

"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import type { ProductoTienda } from "@/lib/productos-tienda";

const GOLD = "#c8a050";

// Boton "Agregar al carrito".
// variant "card"   -> compacto, para la tarjeta del grid (dentro de un <Link>,
//                     por eso frena la navegacion con preventDefault).
// variant "detail" -> prominente, para la pagina del producto.
export default function AddToCartButton({
  producto,
  variant = "card",
}: {
  producto: ProductoTienda;
  variant?: "card" | "detail";
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handle(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    add({
      slug: producto.slug,
      nombre: producto.nombre,
      precio: producto.precio,
      glyph: producto.glyph,
      accent: producto.accent,
      tamano: producto.tamano,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  }

  if (variant === "detail") {
    return (
      <button
        onClick={handle}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.6rem",
          fontFamily: "var(--font-cinzel), serif",
          fontSize: "0.75rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#12200f",
          background: "linear-gradient(135deg, #e8c878, #c8a050)",
          border: "1px solid rgba(200,160,80,0.6)",
          padding: "0.9rem 2rem",
          cursor: "pointer",
          marginRight: "0.8rem",
        }}
      >
        {added ? "✓ Agregado" : "Agregar al carrito"}
      </button>
    );
  }

  return (
    <button
      onClick={handle}
      aria-label={`Agregar ${producto.nombre} al carrito`}
      style={{
        fontFamily: "var(--font-cinzel), serif",
        fontSize: "0.66rem",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: added ? "#12200f" : GOLD,
        background: added ? GOLD : "rgba(200,160,80,0.08)",
        border: "1px solid rgba(200,160,80,0.4)",
        borderRadius: 3,
        padding: "0.5rem 0.9rem",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background 0.25s, color 0.25s",
      }}
    >
      {added ? "✓ Agregado" : "Agregar ＋"}
    </button>
  );
}

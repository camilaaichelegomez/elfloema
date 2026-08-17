"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ProductoCard from "@/components/tienda/ProductoCard";
import { productosDestacados } from "@/lib/productos-tienda";

const GOLD = "#c8a050";
const CREAM = "#d4c4a0";

export function LaBotica() {
  return (
    <section
      style={{
        position: "relative",
        background: "rgba(6,11,6,0.15)",
        padding: "clamp(5.5rem,10vh,9rem) clamp(1.5rem,5vw,5rem) clamp(3rem,5vh,5rem)",
        overflow: "hidden",
        borderTop: "1px solid rgba(122,74,138,0.18)",
      }}
    >
      {/* Atmospheric glow — purple dominant */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse 100% 50% at 50% 0%,   rgba(200,160,80,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 70%  60% at 0%   50%,  rgba(90,45,107,0.1)   0%, transparent 55%),
            radial-gradient(ellipse 70%  60% at 100% 50%,  rgba(90,45,107,0.08)  0%, transparent 55%),
            radial-gradient(ellipse 55%  45% at 50%  100%, rgba(42,21,53,0.15)   0%, transparent 60%),
            radial-gradient(ellipse 40%  30% at 50%  40%,  rgba(122,74,138,0.05) 0%, transparent 50%)
          `,
        }}
      />
      {/* Section-level corner gems */}
      {[
        { top: 20, left: 20 },
        { top: 20, right: 20 },
        { bottom: 20, left: 20 },
        { bottom: 20, right: 20 },
      ].map((pos, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            ...pos,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#7a4a8a",
            opacity: 0.55,
            boxShadow: "0 0 14px rgba(122,74,138,0.7)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ))}

      {/* giant ghost text */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-grimoire)",
          fontSize: "clamp(7rem,18vw,18rem)",
          color: "rgba(200,160,80,0.022)",
          letterSpacing: "0.3em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        TIENDA
      </span>

      {/* header */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.95 }}
        style={{
          textAlign: "center",
          marginBottom: "clamp(3rem,6vh,5rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            maxWidth: 340,
            margin: "0 auto 1.1rem",
            opacity: 0.38,
          }}
        >
          <span style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${GOLD})`, display: "block" }} />
          <span style={{ fontFamily: "var(--font-grimoire)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: GOLD, whiteSpace: "nowrap" }}>
            Cosmética Botánica
          </span>
          <span style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${GOLD})`, display: "block" }} />
        </div>

        <h2
          style={{
            fontFamily: "var(--font-grimoire)",
            fontSize: "clamp(2.2rem,6vw,4.6rem)",
            color: GOLD,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            fontWeight: 700,
            lineHeight: 1.05,
            margin: "0 0 0.85rem",
            textShadow:
              "0 0 80px rgba(200,160,80,0.38), 0 0 160px rgba(200,160,80,0.14), 0 3px 12px rgba(0,0,0,0.9)",
          }}
        >
          Tienda El Floema
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontStyle: "italic",
            fontSize: "clamp(1rem,2vw,1.2rem)",
            color: CREAM,
            opacity: 0.42,
            margin: 0,
            letterSpacing: "0.05em",
          }}
        >
          Elaborado con ciencia, entregado con alma
        </p>
      </motion.div>

      {/* featured product grid (3) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "clamp(1rem,2vw,1.75rem)",
          maxWidth: 1160,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {productosDestacados.map((p, i) => (
          <ProductoCard key={p.slug} producto={p} index={i} />
        ))}
      </div>

      {/* CTA to full store */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          textAlign: "center",
          marginTop: "clamp(2.5rem,5vh,4rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Link
          href="/tienda"
          style={{
            display: "inline-block",
            fontFamily: "var(--font-grimoire)",
            fontSize: "0.82rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: GOLD,
            textDecoration: "none",
            border: `1px solid rgba(200,160,80,0.45)`,
            padding: "0.95rem 2.4rem",
            transition: "background 0.3s, border-color 0.3s, color 0.3s",
          }}
        >
          Ver toda la tienda →
        </Link>
      </motion.div>
    </section>
  );
}

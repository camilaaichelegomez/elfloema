"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import type { ProductoTienda } from "@/lib/productos-tienda";

const GOLD = "#c8a050";
const CREAM = "#d4c4a0";
const PURPLE = "#7a4a8a";

export default function ProductoCard({
  producto,
  index = 0,
}: {
  producto: ProductoTienda;
  index?: number;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -10 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ display: "flex" }}
    >
      {/* Card box (chrome) — el <Link> envuelve solo imagen + texto; el boton
          "Agregar" va aparte, para no anidar <button> dentro de <a>. */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          background: "#0f1a0f",
          border: `1px solid ${hovered ? "rgba(122,74,138,0.65)" : "rgba(200,160,80,0.18)"}`,
          borderRadius: "4px",
          overflow: "hidden",
          position: "relative",
          boxShadow: hovered
            ? "0 32px 70px rgba(0,0,0,0.8), 0 0 40px rgba(122,74,138,0.18), inset 0 1px 0 rgba(122,74,138,0.08)"
            : "0 4px 24px rgba(0,0,0,0.4), inset 0 1px rgba(200,160,80,0.06)",
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Purple gem corners */}
        {[
          { top: 7, left: 7 },
          { top: 7, right: 7 },
          { bottom: 7, left: 7 },
          { bottom: 7, right: 7 },
        ].map((pos, i) => (
          <span
            key={i}
            style={{
              position: "absolute",
              ...pos,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: PURPLE,
              opacity: hovered ? 0.9 : 0.5,
              boxShadow: hovered ? `0 0 12px ${PURPLE}` : "none",
              zIndex: 3,
              transition: "opacity 0.4s, box-shadow 0.4s",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          />
        ))}
        {/* corner bracket TL */}
        <span
          style={{
            position: "absolute",
            top: -1,
            left: -1,
            width: hovered ? 44 : 28,
            height: hovered ? 44 : 28,
            borderTop: `1.5px solid ${hovered ? "rgba(154,106,170,0.85)" : "rgba(200,160,80,0.28)"}`,
            borderLeft: `1.5px solid ${hovered ? "rgba(154,106,170,0.85)" : "rgba(200,160,80,0.28)"}`,
            zIndex: 2,
            transition: "width 0.4s, height 0.4s, border-color 0.4s",
            pointerEvents: "none",
          }}
        />
        {/* corner bracket BR */}
        <span
          style={{
            position: "absolute",
            bottom: -1,
            right: -1,
            width: hovered ? 44 : 28,
            height: hovered ? 44 : 28,
            borderBottom: `1.5px solid ${hovered ? "rgba(154,106,170,0.85)" : "rgba(200,160,80,0.28)"}`,
            borderRight: `1.5px solid ${hovered ? "rgba(154,106,170,0.85)" : "rgba(200,160,80,0.28)"}`,
            zIndex: 2,
            transition: "width 0.4s, height 0.4s, border-color 0.4s",
            pointerEvents: "none",
          }}
        />

        {/* Link: imagen + texto (navega al producto) */}
        <Link
          href={`/tienda/${producto.slug}`}
          style={{
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            flex: 1,
            color: "inherit",
          }}
        >
          {/* image area */}
          <div
            style={{
              height: 210,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.6rem",
              borderBottom: "1px solid rgba(200,160,80,0.08)",
              position: "relative",
              overflow: "hidden",
              background: `radial-gradient(ellipse 70% 60% at 50% 55%, ${producto.accent} 0%, transparent 70%), linear-gradient(135deg, rgba(21,37,21,0.4) 0%, rgba(13,26,13,0.4) 100%)`,
              filter: hovered ? "brightness(1.1)" : "brightness(1)",
              transition: "filter 0.4s",
            }}
          >
            {/* real photo when available */}
            {imgOk && (
              <img
                src={`/tienda/${producto.slug}.jpg`}
                alt={producto.nombre}
                onError={() => setImgOk(false)}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transform: hovered ? "scale(1.05)" : "scale(1)",
                  transition: "transform 0.6s ease",
                }}
              />
            )}
            {/* glyph placeholder (shown until a photo exists) */}
            {!imgOk && (
              <>
                <span
                  style={{
                    position: "absolute",
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    border: `1px solid ${hovered ? "rgba(154,106,170,0.25)" : "rgba(200,160,80,0.12)"}`,
                    transition: "border-color 0.4s",
                    pointerEvents: "none",
                  }}
                />
                <span
                  style={{
                    fontSize: "3.4rem",
                    color: hovered ? "rgba(200,160,80,0.45)" : "rgba(200,160,80,0.2)",
                    lineHeight: 1,
                    transform: hovered ? "scale(1.12)" : "scale(1)",
                    transition: "color 0.4s, transform 0.4s",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {producto.glyph}
                </span>
              </>
            )}
          </div>

          {/* body text */}
          <div
            style={{
              padding: "1.4rem 1.6rem 0.9rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.45rem",
              flex: 1,
            }}
          >
            <div>
              <p
                style={{
                  fontFamily: "var(--font-grimoire)",
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(154,106,170,0.7)",
                  margin: "0 0 0.2rem",
                  borderBottom: "1px solid rgba(200,160,80,0.2)",
                  paddingBottom: "0.4rem",
                }}
              >
                {producto.categoria}
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-grimoire)",
                  fontSize: "0.9rem",
                  color: CREAM,
                  letterSpacing: "0.06em",
                  lineHeight: 1.25,
                  margin: 0,
                }}
              >
                {producto.nombre}
              </h3>
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontStyle: "italic",
                fontSize: "0.82rem",
                color: "rgba(212,196,160,0.4)",
                lineHeight: 1.5,
                margin: 0,
                flex: 1,
              }}
            >
              {producto.descripcion}
            </p>
          </div>
        </Link>

        {/* footer: price + agregar (fuera del Link) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.75rem",
            margin: "0 1.6rem",
            padding: "0.85rem 0 1.4rem",
            borderTop: "1px solid rgba(200,160,80,0.1)",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-grimoire)",
              fontSize: producto.precio ? "0.92rem" : "0.7rem",
              color: producto.precio ? GOLD : "rgba(212,196,160,0.4)",
              letterSpacing: "0.04em",
              fontStyle: producto.precio ? "normal" : "italic",
              whiteSpace: "nowrap",
            }}
          >
            {producto.precio ? `$${producto.precio.toLocaleString("es-CL")} CLP` : "Precio pronto"}
          </span>
          <AddToCartButton producto={producto} variant="card" />
        </div>
      </div>
    </motion.div>
  );
}

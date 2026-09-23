"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/BackButton";
import { llevarLaVistaAlAbrir } from "@/lib/llevar-la-vista";

/* Las piezas con que están hechas las páginas de la Biblioteca: el papel, los
   recuadros de colores, las tablas y los acordeones.

   Antes cada página se traía su propia copia de todo esto. Las secciones del
   cuerpo (yoga, drenaje) las comparten desde aquí, para que si un día
   cambiamos el estilo, cambie en todas de una vez. */

const ORO = "#c8a050";

export function GrainOverlay({ id }: { id: string }) {
  return (
    <svg className="grain-layer" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <filter id={`grain-${id}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#grain-${id})`} />
    </svg>
  );
}

export function P({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#d4c4a0", marginBottom: "12px", ...style }}>
      {children}
    </p>
  );
}

export function Dorado({ children }: { children: ReactNode }) {
  return <strong style={{ color: ORO }}>{children}</strong>;
}

export function SubLabel({ children }: { children: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-grimoire)",
        fontSize: "0.78rem",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        color: "rgba(200,160,80,0.52)",
        marginBottom: "10px",
        marginTop: "18px",
      }}
    >
      {children}
    </p>
  );
}

export function Check({ children, mark = "✓" }: { children: ReactNode; mark?: string }) {
  const color = mark === "✓" ? "#5a7a3a" : mark === "✗" ? "rgba(184,115,51,0.75)" : ORO;
  return (
    <div style={{ marginBottom: "8px", paddingLeft: "0.2rem" }}>
      <p style={{ fontSize: "0.93rem", lineHeight: 1.75, color: "#d4c4a0", marginBottom: 0 }}>
        <span style={{ color, marginRight: "0.45rem" }}>{mark}</span>
        {children}
      </p>
    </div>
  );
}

function Caja({
  title,
  children,
  fondo,
  borde,
  colorTitulo,
}: {
  title?: string;
  children: ReactNode;
  fondo: string;
  borde: string;
  colorTitulo: string;
}) {
  return (
    <div
      style={{
        background: fondo,
        border: `1px solid ${borde}`,
        borderRadius: "0.4rem",
        padding: "0.85rem 1rem",
        marginBottom: "14px",
      }}
    >
      {title && (
        <p
          style={{
            fontFamily: "var(--font-grimoire)",
            fontSize: "0.78rem",
            letterSpacing: "0.13em",
            textTransform: "uppercase",
            color: colorTitulo,
            marginBottom: "7px",
          }}
        >
          {title}
        </p>
      )}
      <div style={{ fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(212,196,160,0.85)" }}>{children}</div>
    </div>
  );
}

export function InfoBox({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <Caja title={title} fondo="rgba(200,160,80,0.05)" borde="rgba(200,160,80,0.13)" colorTitulo="rgba(200,160,80,0.62)">
      {children}
    </Caja>
  );
}

export function WarnBox({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <Caja title={title} fondo="rgba(184,115,51,0.07)" borde="rgba(184,115,51,0.22)" colorTitulo="rgba(200,160,80,0.65)">
      {children}
    </Caja>
  );
}

export function GreenBox({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <Caja title={title} fondo="rgba(90,122,58,0.07)" borde="rgba(90,122,58,0.22)" colorTitulo="rgba(90,122,58,0.8)">
      {children}
    </Caja>
  );
}

export function PurpleBox({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <Caja title={title} fondo="rgba(122,74,138,0.07)" borde="rgba(122,74,138,0.22)" colorTitulo="rgba(154,106,170,0.8)">
      {children}
    </Caja>
  );
}

/** Lo que viene de la tradición y no de un estudio. Se dice así, sin disfraz. */
export function Tradicion({ children }: { children: ReactNode }) {
  return <PurpleBox title="Tradición, no ciencia">{children}</PurpleBox>;
}

/** Qué dice la investigación, con la referencia real de la biblioteca. */
export function Evidencia({
  grado,
  children,
  fuente,
}: {
  grado: "Bien respaldado" | "Prometedor" | "Evidencia débil" | "No hay evidencia";
  children: ReactNode;
  fuente?: string;
}) {
  const color =
    grado === "Bien respaldado"
      ? "rgba(90,122,58,0.8)"
      : grado === "Prometedor"
        ? "rgba(200,160,80,0.75)"
        : "rgba(184,115,51,0.8)";
  return (
    <div
      style={{
        borderLeft: `2px solid ${color}`,
        paddingLeft: "0.9rem",
        marginBottom: "14px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-grimoire)",
          fontSize: "0.72rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color,
          marginBottom: "6px",
        }}
      >
        {grado}
      </p>
      <div style={{ fontSize: "0.93rem", lineHeight: 1.78, color: "#d4c4a0" }}>{children}</div>
      {fuente && (
        <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "rgba(212,196,160,0.5)", marginTop: "7px", fontStyle: "italic" }}>
          {fuente}
        </p>
      )}
    </div>
  );
}

export function MiniTable({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: "14px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "rgba(200,160,80,0.08)" }}>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  border: "1px solid rgba(200,160,80,0.18)",
                  padding: "7px 10px",
                  color: ORO,
                  fontWeight: 600,
                  fontSize: "0.83rem",
                  textAlign: "left",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} style={{ background: i % 2 === 1 ? "rgba(200,160,80,0.02)" : "transparent" }}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    border: "1px solid rgba(200,160,80,0.12)",
                    padding: "7px 10px",
                    fontSize: "0.87rem",
                    lineHeight: 1.6,
                    color: "#d4c4a0",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function LineDivider() {
  return (
    <div
      style={{
        height: 1,
        background: "linear-gradient(to right, transparent, rgba(200,160,80,0.15), transparent)",
        margin: "18px 0",
      }}
    />
  );
}

export function Seccion({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 40 }}>
      <h2
        style={{
          fontFamily: "var(--font-cinzel), serif",
          color: ORO,
          fontSize: "1.2rem",
          letterSpacing: "0.12em",
          marginBottom: 18,
        }}
      >
        {titulo}
      </h2>
      {children}
    </section>
  );
}

export function AccordionItem({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        border: `1px solid ${open ? "rgba(200,160,80,0.3)" : "rgba(200,160,80,0.1)"}`,
        borderRadius: "0.5rem",
        marginBottom: "0.5rem",
        background: open ? "rgba(200,160,80,0.04)" : "transparent",
        transition: "border-color 0.3s, background 0.3s",
        overflow: "hidden",
      }}
    >
      <button
        onClick={(e) => {
          const el = e.currentTarget as HTMLElement;
          const abrir = !open;
          onToggle();
          if (abrir) llevarLaVistaAlAbrir(el);
        }}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 1.25rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "1rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-grimoire)",
            fontSize: "0.78rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: ORO,
          }}
        >
          {title}
        </span>
        <span
          style={{
            color: "rgba(200,160,80,0.6)",
            fontSize: "0.9rem",
            display: "inline-block",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            flexShrink: 0,
          }}
        >
          →
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 1.25rem 1.25rem" }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Un grupo de acordeones donde solo uno queda abierto a la vez. */
export function Acordeones({ items }: { items: { id: string; title: string; contenido: ReactNode }[] }) {
  const [abierto, setAbierto] = useState<string | null>(items[0]?.id ?? null);
  return (
    <>
      {items.map((it) => (
        <AccordionItem
          key={it.id}
          title={it.title}
          open={abierto === it.id}
          onToggle={() => setAbierto((a) => (a === it.id ? null : it.id))}
        >
          {it.contenido}
        </AccordionItem>
      ))}
    </>
  );
}

/** El papel sobre el que va toda la página, con su fondo y su título. */
export function PaginaBiblioteca({
  id,
  titulo,
  bajada,
  fondo = "/biblioteca-fondo.jpg",
  children,
}: {
  id: string;
  titulo: string;
  bajada: string;
  fondo?: string;
  children: ReactNode;
}) {
  return (
    <main
      className="parchment-bg bg-vivo"
      style={{
        minHeight: "100vh",
        paddingBottom: 48,
        /* Dos capas de imagen: la propia de la sección y, debajo, la de la
           Biblioteca. Si el archivo de la sección todavía no está subido, el
           navegador descarta esa capa y se ve la de abajo en vez de un fondo
           plano. */
        background: `linear-gradient(rgba(10,16,10,0.45), rgba(10,16,10,0.62)), url('${fondo}') center top / cover fixed, url('/biblioteca-fondo.jpg') center top / cover fixed, var(--bg-primary)`,
      }}
    >
      <GrainOverlay id={id} />
      <div
        style={{
          maxWidth: 820,
          margin: "0 auto",
          padding: "clamp(32px, 6vh, 64px) clamp(20px, 5vw, 56px)",
          background: "rgba(9,14,9,0.8)",
          borderRadius: 10,
          border: "1px solid rgba(200,160,80,0.1)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
        }}
      >
        <BackButton label="← Volver a la Biblioteca" href="/biblioteca" />

        <header style={{ textAlign: "center", marginBottom: 40, marginTop: 8 }}>
          <h1
            style={{
              fontFamily: "var(--font-cinzel), serif",
              fontSize: "clamp(1.5rem, 4.5vw, 2.2rem)",
              color: ORO,
              letterSpacing: "0.14em",
              marginBottom: 8,
              textWrap: "balance",
            }}
          >
            {titulo}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-crimson), serif",
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: "#d4c4a0",
              textWrap: "balance",
            }}
          >
            {bajada}
          </p>
        </header>

        {children}
      </div>
    </main>
  );
}

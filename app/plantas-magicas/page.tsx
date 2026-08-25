"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/BackButton";

/* ── Overlay de grano ─────────────────────────────────────────── */
function GrainOverlay() {
  return (
    <svg className="grain-layer" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <filter id="grain-filter-pm">
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter-pm)" />
    </svg>
  );
}

/* ── Helpers ─────────────────────────────────────────────────── */
function P({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#d4c4a0", marginBottom: "12px", ...style }}>{children}</p>;
}
function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "0.97rem", color: "rgba(200,160,80,0.9)", letterSpacing: "0.1em", margin: "18px 0 12px", borderLeft: "2px solid rgba(122,74,138,0.4)", paddingLeft: "0.75rem" }}>{children}</h3>
  );
}
function GreenBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "rgba(90,122,58,0.08)", border: "1px solid rgba(90,122,58,0.24)", borderRadius: "0.4rem", padding: "0.85rem 1rem", marginBottom: "14px" }}>
      {title && <p style={{ fontFamily: "var(--font-grimoire)", fontSize: "0.78rem", letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(120,160,80,0.85)", marginBottom: "7px" }}>{title}</p>}
      <div style={{ fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(212,196,160,0.85)" }}>{children}</div>
    </div>
  );
}
function PurpleBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "rgba(122,74,138,0.09)", border: "1px solid rgba(122,74,138,0.26)", borderRadius: "0.4rem", padding: "0.85rem 1rem", marginBottom: "14px" }}>
      {title && <p style={{ fontFamily: "var(--font-grimoire)", fontSize: "0.78rem", letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(170,120,190,0.9)", marginBottom: "7px" }}>{title}</p>}
      <div style={{ fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(212,196,160,0.85)" }}>{children}</div>
    </div>
  );
}
function LineDivider() {
  return <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(200,160,80,0.15), transparent)", margin: "20px 0" }} />;
}

/* ── Datos ───────────────────────────────────────────────────── */

const MAPUCHE = [
  {
    nombre: "Foye · Canelo",
    latin: "Drimys winteri",
    texto: "El árbol SAGRADO por excelencia, presente en las ceremonias más importantes (nguillatun, machitun). Sus ramas representan la paz; se dice que “el foye conversa con los espíritus”, y la machi lo usa para el contacto con el otro mundo. Corazón de un sahumerio de limpieza y protección de espacios y personas.",
  },
  {
    nombre: "Triwe · Laurel chileno",
    latin: "Laurelia sempervirens",
    texto: "Junto al canelo, planta de comunicación espiritual usada por la machi. Aromática y protectora. Se sahúma para protección y claridad. En El Floema vive como hidrolato de triwe.",
  },
  {
    nombre: "Maqui · Kvlog",
    latin: "Aristotelia chilensis",
    texto: "Símbolo de BUENA INTENCIÓN y buenos augurios para el pueblo mapuche. Se usa en rituales de intención positiva, abundancia y protección.",
  },
  {
    nombre: "Ruda",
    latin: "Ruta graveolens",
    texto: "La protectora por excelencia de la cultura mapuche-campesina chilena. Aleja las malas energías, la envidia y la mala intención, y potencia la claridad mental. Clásica el agua con sal y ruda para limpiar el hogar.",
  },
  {
    nombre: "Araucaria · Pewen",
    latin: "Araucaria araucana",
    texto: "Árbol sagrado y patrimonio del pueblo pewenche; símbolo de conexión con los ancestros y la montaña. Su fruto, el piñón (nguilliu), es alimento sagrado.",
  },
  {
    nombre: "Murta · Murtilla",
    latin: "Ugni molinae",
    texto: "Usada desde antes de la llegada de los españoles; asociada al bienestar y a la tierra. Acompaña rituales de arraigo y buena intención.",
  },
  {
    nombre: "Chilco",
    latin: "Fuchsia magellanica",
    texto: "Planta de los esteros y del agua, asociada a lo femenino y a los cursos de agua del sur. Para rituales ligados a la emoción y la intuición.",
  },
  {
    nombre: "Boldo, matico y arrayán (luma)",
    latin: "nativas aromáticas",
    texto: "Nativas que se queman o sahúman para limpiar ambientes. El boldo y el matico son clásicos del sahumado de limpieza; el arrayán (luma) aporta su aroma protector.",
  },
];

const HIERBAS = [
  { n: "Tomillo", p: "Purificación (quemado como incienso), salud y protección; hojas bajo la almohada contra las pesadillas." },
  { n: "Lavanda", p: "Paz, amor, limpieza energética y sanación; eleva la conciencia y calma la mente." },
  { n: "Laurel", p: "Protección y purificación de ambientes, adivinación, clarividencia y suerte (hoja seca escrita y quemada)." },
  { n: "Romero", p: "Amor, memoria y juventud, limpieza energética (incienso o baño) y protección; sustituye a cualquier hierba en un apuro." },
  { n: "Albahaca", p: "Amor y reconciliación, fidelidad, fortuna en los negocios y protección del hogar." },
  { n: "Ruda", p: "Protección de personas y lugares; aleja maleficios, envidia y mala suerte." },
  { n: "Salvia", p: "Purificación (el humo limpia), prosperidad, sanación y sabiduría; resuelve situaciones estancadas." },
  { n: "Menta", p: "Prosperidad, claridad mental, purificación y energía renovada." },
  { n: "Manzanilla", p: "Calma, meditación, prosperidad y sueño reparador; atrae la suerte cuando se lava las manos con su infusión." },
  { n: "Canela", p: "Protección, prosperidad y pasión; acelera y potencia cualquier otra intención." },
  { n: "Rosa · escaramujo", p: "Amor, adivinación, protección y curación psíquica; la reina de los rituales de amor propio." },
  { n: "Artemisa", p: "Sueños lúcidos, protección, adivinación y limpieza; se sahúma antes de meditar o adivinar." },
  { n: "Damiana", p: "Atracción, amor, deseo y adivinación." },
  { n: "Milenrama", p: "Valor, protección, amor duradero y adivinación; disipa el miedo." },
  { n: "Verbena", p: "Purificación, protección, paz e inspiración; hierba de encanto y creatividad." },
  { n: "Jazmín", p: "Amor espiritual, sueños proféticos y prosperidad; aroma de la luna." },
  { n: "Cardamomo", p: "Amor, pasión y elocuencia." },
  { n: "Bergamota", p: "Dinero, éxito y buena fortuna." },
  { n: "Alfalfa", p: "Prosperidad y protección del hogar contra la carencia." },
  { n: "Bardana", p: "Protección y purificación; corta las energías negativas." },
  { n: "Enebro", p: "Protección, destierro de lo negativo y salud." },
  { n: "Clavo de olor", p: "Protección, dinero y detener la maledicencia y los chismes." },
  { n: "Cedro", p: "Protección, limpieza, arraigo y longevidad." },
  { n: "Ciprés", p: "Protección, consuelo en el duelo y longevidad; acompaña las transiciones." },
];

/* ── Acordeón ─────────────────────────────────────────────────── */
function AccordionItem({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div style={{ border: `1px solid ${open ? "rgba(122,74,138,0.4)" : "rgba(200,160,80,0.1)"}`, borderRadius: "0.5rem", marginBottom: "0.5rem", background: open ? "rgba(122,74,138,0.05)" : "transparent", transition: "border-color 0.3s, background 0.3s", overflow: "hidden" }}>
      <button onClick={(e) => { const el = e.currentTarget as HTMLElement; const abrir = !open; onToggle(); if (abrir) setTimeout(() => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" }), 400); }} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 1.25rem", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: "1rem" }}>
        <span style={{ fontFamily: "var(--font-grimoire)", fontSize: "0.78rem", letterSpacing: "0.16em", textTransform: "uppercase", color: open ? "#b98acb" : "#c8a050" }}>{title}</span>
        <span style={{ color: "rgba(170,120,190,0.7)", fontSize: "0.9rem", display: "inline-block", transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.3s ease", flexShrink: 0 }}>→</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div key="content" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} style={{ overflow: "hidden" }}>
            <div style={{ padding: "0 1.25rem 1.25rem" }}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const SECTIONS = ["cosmovision", "mapuche", "hierbas", "usar"] as const;
type SectionId = (typeof SECTIONS)[number];

export default function PlantasMagicas() {
  const [open, setOpen] = useState<SectionId | null>("cosmovision");
  const toggle = (id: SectionId) => setOpen((prev) => (prev === id ? null : id));

  return (
    <main className="parchment-bg" style={{ minHeight: "100vh", paddingBottom: 48, background: "linear-gradient(rgba(10,16,10,0.5), rgba(10,16,10,0.68)), url('/fondo_brujaverde.jpg') center top / cover fixed, var(--bg-primary)", }}>
      <GrainOverlay />
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "clamp(32px, 6vh, 64px) clamp(24px, 5vw, 56px)", background: "rgba(9,14,9,0.65)", borderRadius: 10, border: "1px solid rgba(200,160,80,0.1)", boxShadow: "0 8px 40px rgba(0,0,0,0.45)" }}>
        <BackButton label="← Volver al inicio" href="/" />

        <header style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontFamily: "var(--font-grimoire)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(170,120,190,0.7)", marginBottom: 14 }}>
            El Grimorio · El alma de la planta
          </p>
          <h1 style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "clamp(2rem, 5vw, 2.8rem)", color: "#c8a050", letterSpacing: "0.14em", marginBottom: 10, textShadow: "0 0 55px rgba(122,74,138,0.35)" }}>
            Plantas Mágicas
          </h1>
          <p style={{ fontFamily: "var(--font-crimson), serif", fontSize: "1.12rem", fontStyle: "italic", color: "#d4c4a0", maxWidth: 580, margin: "0 auto", lineHeight: 1.7 }}>
            El lado espiritual de las plantas: su fuerza simbólica según la cosmovisión mapuche y la tradición verde y wicca. La cara medicinal vive en la Biblioteca de Plantas; aquí vive su alma.
          </p>
        </header>

        <PurpleBox title="Cómo leer esta sección">
          Aquí las plantas se miran desde la tradición, no desde la clínica. Es herencia cultural viva —sobre todo la
          mapuche— que compartimos con respeto y atribución, como saber simbólico y ritual, no como &ldquo;hechizos&rdquo;
          ni como tratamiento. <strong>Ninguna afirmación de esta página es médica.</strong>
        </PurpleBox>

        <section style={{ marginTop: 28 }}>
          {/* 1 — Cosmovisión */}
          <AccordionItem title="El newen — el alma de la planta" open={open === "cosmovision"} onToggle={() => toggle("cosmovision")}>
            <P>
              Para casi todas las culturas, una planta es más que sus compuestos: carga una energía y un simbolismo que la
              humanidad le ha atribuido durante milenios. Reconocerlo no niega la ciencia — la acompaña. Aquí miramos esa
              otra cara.
            </P>
            <P>
              En la cosmovisión mapuche las plantas medicinales —<em>lawen</em>— tienen un <em>newen</em>: una fuerza o
              energía propia que ayuda a restaurar el equilibrio entre cuerpo, espíritu y entorno. La <em>machi</em>, guía
              espiritual y sanadora, interpreta el lenguaje de las plantas mediante infusiones, mates, <em>sahumados</em> y
              baños de hierbas que buscan limpiar las emociones, fortalecer el ánimo y reconectar con el territorio, el{" "}
              <em>mapu</em>.
            </P>
            <P>
              La tradición verde europea y la wicca ordenan ese mismo saber en <strong>correspondencias</strong>: cada
              hierba se asocia a una intención —limpieza, protección, amor, prosperidad, claridad, calma— y a los
              elementos, los planetas y la luna. Dos linajes, una misma idea: la planta como aliada del espíritu.
            </P>
            <GreenBox title="Bruja científica">
              Una misma planta puede tener una acción demostrada sobre la piel <em>y</em> un lugar en la tradición. No
              competimos con la evidencia; caminamos con las dos manos. Lo simbólico ordena la intención; la ciencia cuida
              el cuerpo.
            </GreenBox>
          </AccordionItem>

          {/* 2 — Plantas sagradas mapuche */}
          <AccordionItem title="Plantas sagradas mapuche" open={open === "mapuche"} onToggle={() => toggle("mapuche")}>
            <P>
              Las plantas de conexión espiritual de la tradición mapuche y campesina chilena. Varias ya viven en nuestras
              fórmulas —maqui, matico, arrayán, triwe— y aquí muestran su otra cara.
            </P>
            {MAPUCHE.map((pl) => (
              <div key={pl.nombre} style={{ marginBottom: "14px" }}>
                <SubTitle>
                  {pl.nombre} <span style={{ fontStyle: "italic", fontSize: "0.82rem", color: "rgba(212,196,160,0.5)", fontWeight: 400 }}>· {pl.latin}</span>
                </SubTitle>
                <P style={{ marginBottom: 0 }}>{pl.texto}</P>
              </div>
            ))}
            <GreenBox title="Sahumerios con nativas del sur">
              <strong>Limpieza mapuche:</strong> foye (canelo) + triwe + un toque de ruda. ·{" "}
              <strong>Intención y abundancia:</strong> maqui + laurel + murta. ·{" "}
              <strong>Protección del hogar:</strong> ruda + canelo + romero.
            </GreenBox>
          </AccordionItem>

          {/* 3 — Fichas de hierbas mágicas (wicca) */}
          <AccordionItem title="Correspondencias mágicas — fichas de hierbas" open={open === "hierbas"} onToggle={() => toggle("hierbas")}>
            <P>La propiedad mágica principal de las hierbas más usadas en la tradición verde y wicca. Muchas se cruzan con las plantas de tus fórmulas e hidrolatos.</P>
            {HIERBAS.map((h) => (
              <div key={h.n} style={{ marginBottom: "9px", paddingLeft: "0.9rem", position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: "#7a9a5a" }}>❧</span>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "#d4c4a0", margin: 0 }}>
                  <strong style={{ color: "rgba(200,160,80,0.9)" }}>{h.n}.</strong> {h.p}
                </p>
              </div>
            ))}
          </AccordionItem>

          {/* 4 — Cómo usarlas */}
          <AccordionItem title="Cómo trabajar con ellas" open={open === "usar"} onToggle={() => toggle("usar")}>
            <P>
              La planta mágica se activa en el gesto: el <strong>sahumado</strong> que limpia con su humo, el{" "}
              <strong>baño de hierbas</strong> que serena, el <strong>saquito</strong> o amuleto que se lleva encima, la{" "}
              <strong>vela vestida</strong> con la intención. La regla verde es simple: usa lo de tu territorio y lo que ya
              tienes.
            </P>
            <PurpleBox title="Sigue el sendero">
              Para el arte del fuego y el humo —color de las velas, resinas, recetas de incienso y sahumerio, ritual paso a
              paso— visita <a href="/velas-inciensos" style={{ color: "#b98acb", textDecoration: "underline" }}>Velas e Inciensos</a>. Para el
              qué y el porqué del sendero verde, <a href="/bruja-verde" style={{ color: "#b98acb", textDecoration: "underline" }}>Bruja Verde</a>.
            </PurpleBox>
            <P style={{ fontSize: "0.85rem", color: "rgba(212,196,160,0.6)", fontStyle: "italic", marginBottom: 0 }}>
              Con el inventario de El Floema —romero, tomillo, lavanda, menta, laurel/triwe, maqui, matico, canelo— ya se
              cubren las cuatro intenciones más pedidas: limpieza, protección, prosperidad y calma.
            </P>
          </AccordionItem>
        </section>

        <LineDivider />
        <p style={{ textAlign: "center", fontFamily: "var(--font-crimson), serif", fontStyle: "italic", fontSize: "0.95rem", color: "rgba(212,196,160,0.5)", maxWidth: 560, margin: "8px auto 0", lineHeight: 1.7 }}>
          Fuentes: etnobotánica mapuche (Ladera Sur, Serindígena, medicina herbolaria mapuche, Diario Mapuche), &ldquo;La
          bruja verde&rdquo; de Arin Murphy-Hiscock, Cunningham y tradición wicca. Compartido como herencia cultural, con
          respeto y sin fines médicos.
        </p>
      </div>
    </main>
  );
}

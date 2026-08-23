"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/BackButton";

/* ── Overlay de grano ─────────────────────────────────────────── */
function GrainOverlay() {
  return (
    <svg className="grain-layer" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <filter id="grain-filter-vi">
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter-vi)" />
    </svg>
  );
}

/* ── Helpers de tipografía ───────────────────────────────────── */
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
const VELAS = [
  { c: "Blanco", hex: "#efe8d2", s: "Pureza, paz, protección, limpieza, nuevos comienzos. Comodín: sirve para cualquier intención." },
  { c: "Rojo", hex: "#b5423a", s: "Amor pasional, energía, vitalidad, fuerza y valor." },
  { c: "Rosa", hex: "#c98aa0", s: "Amor suave, autoestima, ternura, amistad y reconciliación." },
  { c: "Verde", hex: "#5a7a3a", s: "Abundancia, prosperidad, crecimiento, salud y naturaleza." },
  { c: "Dorado / amarillo", hex: "#c8a050", s: "Éxito, riqueza, iluminación, alegría e intelecto. El sol." },
  { c: "Azul", hex: "#5a7a9a", s: "Calma, paz, comunicación, sanación y sabiduría." },
  { c: "Morado / violeta", hex: "#7a4a8a", s: "Espiritualidad, intuición, meditación profunda y poder psíquico." },
  { c: "Naranja", hex: "#c07a3a", s: "Creatividad, atracción, cambio y entusiasmo." },
  { c: "Negro", hex: "#2a2a2a", s: "Protección fuerte, destierro de energías negativas, transformación y cierre de ciclos." },
  { c: "Marrón", hex: "#7a5a3a", s: "Arraigo, hogar, animales, estabilidad y conexión con la tierra." },
];

const RESINAS = [
  { n: "Oliban · incienso (frankincense)", p: "Purificación, elevación espiritual y conexión divina." },
  { n: "Mirra", p: "Protección, sanación y acompañamiento del duelo; se combina con el oliban." },
  { n: "Benjuí", p: "Prosperidad, purificación y calma." },
  { n: "Copal", p: "Limpieza (tradición mesoamericana), ofrenda y purificación de espacios." },
  { n: "Sándalo", p: "Meditación, paz y espiritualidad; fija los otros aromas." },
  { n: "Cedro", p: "Protección, limpieza y arraigo." },
  { n: "Palo santo", p: "Limpieza energética, buena suerte y aroma dulce." },
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

const SECTIONS = ["fundamento", "velas", "ritual", "resinas", "recetas", "tiempos", "seguridad"] as const;
type SectionId = (typeof SECTIONS)[number];

export default function VelasInciensos() {
  const [open, setOpen] = useState<SectionId | null>("fundamento");
  const toggle = (id: SectionId) => setOpen((prev) => (prev === id ? null : id));

  return (
    <main className="parchment-bg" style={{ minHeight: "100vh", paddingBottom: 48, background: "linear-gradient(rgba(10,16,10,0.72), rgba(10,16,10,0.88)), url('/fondo_brujaverde.jpg') center top / cover fixed, var(--bg-primary)", }}>
      <GrainOverlay />
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "clamp(32px, 6vh, 64px) clamp(24px, 5vw, 56px)", background: "rgba(9,14,9,0.8)", borderRadius: 10, border: "1px solid rgba(200,160,80,0.1)", boxShadow: "0 8px 40px rgba(0,0,0,0.45)" }}>
        <BackButton label="← Volver al inicio" href="/" />

        <header style={{ textAlign: "center", marginBottom: 40 }}>
          <p style={{ fontFamily: "var(--font-grimoire)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(170,120,190,0.7)", marginBottom: 14 }}>
            El Grimorio · Fuego y Humo
          </p>
          <h1 style={{ fontFamily: "var(--font-cinzel), serif", fontSize: "clamp(2rem, 5vw, 2.8rem)", color: "#c8a050", letterSpacing: "0.14em", marginBottom: 10, textShadow: "0 0 55px rgba(122,74,138,0.35)" }}>
            Velas e Inciensos
          </h1>
          <p style={{ fontFamily: "var(--font-crimson), serif", fontSize: "1.12rem", fontStyle: "italic", color: "#d4c4a0", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
            El arte del fuego, el humo y la intención: el color de las velas, las resinas del incienso y las recetas para hacerlos en casa.
          </p>
        </header>

        {/* Encuadre respetuoso */}
        <PurpleBox title="Cómo leer esta sección">
          Velas, sahumerios e inciensos se comparten aquí como saber simbólico y ritual —herencia cultural, sobre todo
          mapuche—, con respeto y atribución, no como &ldquo;hechizos&rdquo; ni como tratamiento.{" "}
          <strong>Ninguna afirmación de esta página es médica.</strong>
        </PurpleBox>

        <section style={{ marginTop: 28 }}>
          {/* 0 — Cómo funciona */}
          <AccordionItem title="Cómo funciona el fuego y el humo" open={open === "fundamento"} onToggle={() => toggle("fundamento")}>
            <P>
              En la brujería verde, las velas y los inciensos no &ldquo;hacen&rdquo; nada por sí solos: son
              <strong> herramientas para enfocar la mente y sostener una intención</strong>. El fuego es uno de los cuatro
              elementos —el de la transformación y la voluntad—. La vela concentra la atención en un punto: encenderla es
              un gesto de comienzo, y dejar que se consuma es dejar que la intención &ldquo;trabaje&rdquo; en el tiempo.
            </P>
            <P>
              El incienso trabaja con el otro gran vehículo: el <strong>humo</strong>. En casi todas las culturas el humo
              aromático eleva la plegaria o la intención, purifica el aire y marca un espacio como distinto o sagrado. El
              aroma, además, actúa sobre el ánimo por vía directa —el olfato conecta con la memoria y la emoción—, así que
              el efecto sensorial es real aunque el simbólico sea cultural.
            </P>
            <GreenBox title="Lo que de verdad ocurre">
              Dos cosas reales sostienen el rito: la <strong>atención</strong> (un foco visual y olfativo ordena la mente,
              como en la meditación) y el <strong>aroma</strong> (los aceites esenciales modulan el estado de ánimo). Sobre
              eso, la tradición pone el símbolo. No es magia contra ciencia: es ritual con sentido.
            </GreenBox>
          </AccordionItem>

          {/* 1 — El color de las velas */}
          <AccordionItem title="El color de las velas" open={open === "velas"} onToggle={() => toggle("velas")}>
            <P>Cada color de cera lleva su propia intención. Elige según lo que quieras cultivar.</P>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              {VELAS.map((v) => (
                <div key={v.c} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", padding: "0.5rem 0" }}>
                  <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: "50%", background: v.hex, border: "1px solid rgba(200,160,80,0.35)", marginTop: 2 }} />
                  <p style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "#d4c4a0", margin: 0 }}>
                    <strong style={{ color: "rgba(200,160,80,0.9)" }}>{v.c}.</strong> {v.s}
                  </p>
                </div>
              ))}
            </div>
          </AccordionItem>

          {/* 1b — Ritual de vela paso a paso */}
          <AccordionItem title="Ritual de vela — paso a paso" open={open === "ritual"} onToggle={() => toggle("ritual")}>
            <P>Un ritual de vela es simple. Lo que lo hace &ldquo;funcionar&rdquo; es la claridad de tu intención y la atención que pones en cada gesto.</P>
            <SubTitle>1 · Prepara y limpia el espacio</SubTitle>
            <P style={{ marginBottom: 10 }}>Despeja la superficie, silencia las distracciones y, si quieres, pasa humo de salvia o romero para &ldquo;abrir&rdquo; el espacio. Respira y define en una frase qué buscas.</P>
            <SubTitle>2 · Elige el color</SubTitle>
            <P style={{ marginBottom: 10 }}>Según la intención (ver &ldquo;El color de las velas&rdquo;). Si dudas, la vela blanca sirve para todo.</P>
            <SubTitle>3 · Viste (unge) la vela</SubTitle>
            <P style={{ marginBottom: 10 }}>Frota la vela con una fina capa de aceite (oliva, o un aceite esencial acorde). El sentido importa: de la base hacia la mecha para <strong>atraer</strong> algo hacia ti; de la mecha hacia la base para <strong>alejar o soltar</strong>. Mientras la untas, repite tu intención.</P>
            <SubTitle>4 · Graba tu intención (opcional)</SubTitle>
            <P style={{ marginBottom: 10 }}>Con un alfiler o palillo, graba en la cera una palabra, símbolo o inicial que represente lo que buscas.</P>
            <SubTitle>5 · Enciende con intención</SubTitle>
            <P style={{ marginBottom: 10 }}>Al encender, visualiza con claridad lo que deseas; puedes decir una frase breve. La llama es ahora el foco de tu atención.</P>
            <SubTitle>6 · Deja que se consuma con seguridad</SubTitle>
            <P style={{ marginBottom: 12 }}>Lo ideal es dejar que una vela pequeña se consuma sola. Si necesitas apagarla, según la tradición <strong>no se sopla</strong> (dispersaría la intención): usa un apagavelas o dedos húmedos. Nunca la dejes sin supervisión.</P>
            <GreenBox title="Leer la llama">
              <strong>Alta y estable</strong> → energía fuerte, buen augurio. · <strong>Baja o titilante</strong> → resistencia o poca energía. · <strong>Chisporroteo / crepita</strong> → comunicación, la intención se mueve. · <strong>Se ahoga o da humo negro</strong> → obstáculos; conviene reintentar con más claridad. · <strong>Se apaga sola</strong> → pausa, el trabajo terminó por hoy.
            </GreenBox>
          </AccordionItem>

          {/* 2 — Resinas y maderas */}
          <AccordionItem title="Resinas y maderas para incienso" open={open === "resinas"} onToggle={() => toggle("resinas")}>
            <P>Dan cuerpo, duración y profundidad al humo. Son el alma de los inciensos.</P>
            {RESINAS.map((r) => (
              <div key={r.n} style={{ marginBottom: "9px", paddingLeft: "0.9rem", position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: "#b98acb" }}>◆</span>
                <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "#d4c4a0", margin: 0 }}>
                  <strong style={{ color: "rgba(200,160,80,0.9)" }}>{r.n}.</strong> {r.p}
                </p>
              </div>
            ))}
            <SubTitle>Cómo quemar resinas</SubTitle>
            <P style={{ marginBottom: 0 }}>
              Las resinas puras (oliban, mirra, copal) <strong>no arden solas</strong>: se queman sobre un carbón. Enciende
              un disco de carbón autoencendible sobre una capa de arena, en un pebetero o recipiente resistente al calor;
              espera a que se cubra de ceniza gris y coloca encima un trocito pequeño de resina. Dará bastante humo:
              ventila. El <strong>palo santo</strong> y el <strong>sándalo en astilla</strong> sí encienden directo —
              prende la punta, sopla y deja humear.
            </P>
          </AccordionItem>

          {/* 3 — Recetas: inciensos, sahumerios y velas */}
          <AccordionItem title="Recetas — inciensos, sahumerios y velas" open={open === "recetas"} onToggle={() => toggle("recetas")}>
            <SubTitle>Incienso en cono — receta base (por partes)</SubTitle>
            <P style={{ marginBottom: 6 }}>
              <strong>4 partes</strong> base combustible (corteza de eucalipto molida, aserrín fino, carbón vegetal en
              polvo o polvo de sándalo/makko). · <strong>3 partes</strong> aroma (hierbas secas, especias, maderas y
              resinas: oliban, mirra, benjuí, copal). · <strong>1 parte</strong> aglutinante (goma tragacanto hidratada
              en gel). · Opcional: una pizca de nitrato de potasio para que la brasa no se apague. · Agua destilada c.s.
            </P>
            <P style={{ marginBottom: 12 }}>
              Moler la base a harina fina; triturar hierbas y resinas en el mortero; mezclar y tamizar los secos; sumar el
              gel de tragacanto de a poco hasta una pasta moldeable (unas gotas de aceite esencial al final); formar conos
              de ~3 cm y <strong>secar sobre papel encerado 2–3 semanas</strong> en lugar fresco. El secado largo es la
              clave: humedad = no enciende.
            </P>

            <SubTitle>Sahumerio en atado (sin base combustible)</SubTitle>
            <P style={{ marginBottom: 12 }}>
              Atar hierbas secas frescas —romero, salvia, laurel, lavanda, foye— con hilo de algodón; secar colgado 2–3
              semanas. Se enciende la punta y se sopla para que humee.
            </P>

            <SubTitle>Inciensos por intención</SubTitle>
            <GreenBox>
              <strong>Limpieza:</strong> base + salvia + romero + oliban + un toque de canelo (foye). ·{" "}
              <strong>Protección del hogar:</strong> base + ruda + laurel/triwe + mirra + cedro. ·{" "}
              <strong>Prosperidad:</strong> base + canela + laurel + benjuí + menta + una pizca de albahaca. ·{" "}
              <strong>Amor / armonía:</strong> base + pétalos de rosa + lavanda + damiana + un toque de canela. ·{" "}
              <strong>Calma / meditación:</strong> base + lavanda + manzanilla + sándalo.
            </GreenBox>

            <SubTitle>Velas de soya aromáticas</SubTitle>
            <P style={{ marginBottom: 6 }}>
              El aroma se aporta con <strong>aceites esenciales</strong> (no quemando la hierba): 6–10 % del peso de la
              cera, agregados a ~50–55 °C (más caliente se volatiliza). Se decoran con flores o hierbas secas por fuera,
              nunca dentro, por seguridad de la llama. Combina color + aceite según la intención:
            </P>
            <PurpleBox>
              <strong>Limpieza:</strong> vela blanca + AE de romero / eucalipto / cedro. ·{" "}
              <strong>Protección:</strong> vela negra o blanca + AE de laurel / cedro / clavo. ·{" "}
              <strong>Prosperidad:</strong> vela verde o dorada + AE de canela / naranja / menta. ·{" "}
              <strong>Calma / amor:</strong> vela rosa o lavanda + AE de lavanda / rosa / citronela suave.
            </PurpleBox>
          </AccordionItem>

          {/* 3b — El momento: días y luna */}
          <AccordionItem title="El momento — días y fases de la luna" open={open === "tiempos"} onToggle={() => toggle("tiempos")}>
            <P>La tradición elige <strong>cuándo</strong> encender la vela o el incienso para acompañar la intención con el ritmo del cielo. No es obligatorio, pero ayuda a ordenar y dar peso al gesto.</P>
            <SubTitle>Las fases de la luna</SubTitle>
            <div style={{ display: "grid", gap: "0.4rem", marginBottom: 6 }}>
              {[
                ["Luna nueva", "Comienzos: sembrar una intención nueva, proyectos que recién nacen."],
                ["Creciente", "Atraer y hacer crecer: amor, prosperidad, salud, todo lo que sume."],
                ["Llena", "Plenitud y máxima energía: cargar objetos, agradecer, cerrar con fuerza."],
                ["Menguante", "Soltar y alejar: limpiar, cortar lazos, terminar ciclos, quitar lo que estorba."],
              ].map(([f, d]) => (
                <p key={f} style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "#d4c4a0", margin: 0 }}>
                  <strong style={{ color: "rgba(170,120,190,0.9)" }}>{f}.</strong> {d}
                </p>
              ))}
            </div>
            <SubTitle>Los días de la semana</SubTitle>
            <div style={{ display: "grid", gap: "0.4rem" }}>
              {[
                ["Lunes · Luna", "Intuición, sueños, hogar, emociones, lo femenino."],
                ["Martes · Marte", "Fuerza, valor, protección, empuje."],
                ["Miércoles · Mercurio", "Comunicación, estudio, viajes, negocios."],
                ["Jueves · Júpiter", "Prosperidad, abundancia, expansión, suerte."],
                ["Viernes · Venus", "Amor, belleza, amistad, arte, placer."],
                ["Sábado · Saturno", "Cierres, límites, protección, soltar, disciplina."],
                ["Domingo · Sol", "Éxito, salud, vitalidad, claridad, logros."],
              ].map(([d, s]) => (
                <p key={d} style={{ fontSize: "0.9rem", lineHeight: 1.65, color: "#d4c4a0", margin: 0 }}>
                  <strong style={{ color: "rgba(200,160,80,0.9)" }}>{d}.</strong> {s}
                </p>
              ))}
            </div>
          </AccordionItem>

          {/* 4 — Seguridad */}
          <AccordionItem title="Seguridad y cuidados" open={open === "seguridad"} onToggle={() => toggle("seguridad")}>
            <GreenBox title="Antes de encender">
              Ventila siempre el espacio al quemar incienso o sahumerio. Nunca dejes una vela encendida sin supervisión ni
              al alcance de niños o mascotas. Usa bases resistentes al calor y aleja las decoraciones vegetales de la
              llama. El uso es aromático, simbólico y ritual — no terapéutico.
            </GreenBox>
          </AccordionItem>
        </section>

        <LineDivider />
        <p style={{ textAlign: "center", fontFamily: "var(--font-crimson), serif", fontStyle: "italic", fontSize: "0.95rem", color: "rgba(212,196,160,0.5)", maxWidth: 560, margin: "8px auto 0", lineHeight: 1.7 }}>
          Fuentes: tradición de inciensos, velas y sahumerios (Cunningham, &ldquo;La bruja verde&rdquo; de Arin
          Murphy-Hiscock y etnobotánica mapuche). Compartido como herencia cultural, con respeto y sin fines médicos.
        </p>
      </div>
    </main>
  );
}

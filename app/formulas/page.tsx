import { BackButton } from "@/components/BackButton";
import { basesCosmetica, type Formula, type FormulaCategory } from "@/lib/bases-cosmetica";

// ── Grain overlay ─────────────────────────────────────────────────────────────
function GrainOverlay() {
  return (
    <svg className="grain-layer" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <filter id="grain-filter-x">
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain-filter-x)" />
    </svg>
  );
}

// ── Typography helpers ────────────────────────────────────────────────────────
function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 style={{ fontFamily: "var(--font-grimoire)", fontSize: "clamp(1.8rem,4vw,3rem)", color: "#c8a050", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem", textShadow: "0 0 60px rgba(200,160,80,0.2)" }}>
      {children}
    </h1>
  );
}
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: "var(--font-grimoire)", fontSize: "clamp(0.9rem,2vw,1.2rem)", color: "#c8a050", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "1rem", textShadow: "0 0 30px rgba(200,160,80,0.18)" }}>
      {children}
    </h2>
  );
}
function Divider() {
  return (
    <div style={{ height: 1, background: "linear-gradient(to right,transparent,rgba(200,160,80,0.25),transparent)", margin: "2.5rem 0" }} />
  );
}
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontFamily: "var(--font-grimoire)", fontSize: "0.58rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(200,160,80,0.45)", display: "block", marginBottom: "0.6rem" }}>
      {children}
    </span>
  );
}

// ── Formula data types ────────────────────────────────────────────────────────

// ── Category block ────────────────────────────────────────────────────────────
function CategoryBlock({ cat }: { cat: FormulaCategory }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div
        style={{
          background: "rgba(200,160,80,0.08)",
          borderLeft: "3px solid #c8a050",
          padding: "0.5rem 1rem",
          marginBottom: "0.75rem",
        }}
      >
        <span style={{ fontFamily: "var(--font-grimoire)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c8a050" }}>
          {cat.title}
        </span>
        {" "}
        <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.88rem", color: "#d4c4a0", opacity: 0.7 }}>
          {cat.range}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
        {cat.items.map((item) => (
          <div key={item.name} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", paddingLeft: "0.5rem" }}>
            <span style={{ color: "#c8a050", fontSize: "0.7rem", flexShrink: 0, marginTop: "0.35rem" }}>●</span>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(0.95rem,1.5vw,1.05rem)", lineHeight: 1.65, color: "#d4c4a0", margin: 0 }}>
              <strong style={{ color: "rgba(212,196,160,0.95)" }}>{item.name}</strong>
              {" "}
              <span style={{ color: "rgba(200,160,80,0.7)", fontFamily: "var(--font-grimoire)", fontSize: "0.7rem", letterSpacing: "0.08em" }}>{item.range}</span>
              {" — "}
              <em style={{ color: "rgba(212,196,160,0.65)" }}>{item.desc}</em>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Formula card ──────────────────────────────────────────────────────────────
function FormulaCard({ formula }: { formula: Formula }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(200,160,80,0.15)",
        borderRadius: "0.75rem",
        padding: "2rem 2.5rem",
        marginBottom: "2.5rem",
      }}
    >
      <SectionTitle>{formula.title}</SectionTitle>
      <p style={{ fontFamily: "var(--font-grimoire)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(200,160,80,0.5)", marginBottom: "1.5rem" }}>
        pH: {formula.ph} · Conservante: {formula.preservative}
      </p>
      {formula.categories.map((cat) => (
        <CategoryBlock key={cat.title} cat={cat} />
      ))}
      {formula.note && (
        <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: "0.9rem", color: "rgba(220,180,80,0.8)", marginTop: "0.5rem", marginBottom: 0, paddingLeft: "0.75rem", borderLeft: "2px solid rgba(220,180,80,0.4)" }}>
          {formula.note}
        </p>
      )}
    </div>
  );
}

// ── Formula data ──────────────────────────────────────────────────────────────
const formulas = basesCosmetica;

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Formulas() {
  return (
    <div className="parchment-bg bg-vivo" style={{ position: "relative", minHeight: "100vh", background: "linear-gradient(rgba(10,16,10,0.42), rgba(10,16,10,0.6)), url('/fondo_formulas.jpg') center top / cover fixed, var(--bg-primary)" }}>
      <GrainOverlay />
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "clamp(80px,12vh,140px) clamp(24px,5vw,64px) clamp(64px,10vh,120px)", background: "rgba(9,14,9,0.65)", borderRadius: 10, border: "1px solid rgba(200,160,80,0.1)", boxShadow: "0 8px 40px rgba(0,0,0,0.45)" }}>
        <BackButton label="← Volver" />

        {/* Page header */}
        <div style={{ marginTop: "2.5rem", marginBottom: "3rem" }}>
          <Label>El Grimorio · Fórmulas</Label>
          <PageTitle>Fórmulas</PageTitle>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              fontSize: "clamp(1rem,1.6vw,1.18rem)",
              color: "#d4c4a0",
              marginBottom: "1.5rem",
              lineHeight: 1.6,
            }}
          >
            Proporciones y rangos — la arquitectura de cada producto
          </p>
          <div style={{ height: 1, background: "linear-gradient(to right,transparent,rgba(200,160,80,0.35),transparent)" }} />
        </div>

        {/* Formula cards */}
        {formulas.map((formula) => (
          <FormulaCard key={formula.id} formula={formula} />
        ))}

        <Divider />
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <BackButton label="← Volver" />
        </div>
      </div>
    </div>
  );
}

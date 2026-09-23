"use client";

import type { CSSProperties } from "react";

/* Dos esquemas que no son dibujos de algo que exista: son explicaciones.
   Por eso van dibujados aquí y no generados: llevan medidas, flechas y
   palabras exactas, y tienen que poder corregirse en un minuto. */

const ORO = "#c8a050";
const ORO_TENUE = "rgba(200,160,80,0.45)";
const VERDE = "#9dc46f";
const TEXTO = "#d4c4a0";

function Marco({ children, pie }: { children: React.ReactNode; pie: string }) {
  return (
    <figure style={figura}>
      <div style={marco}>{children}</div>
      <figcaption style={leyenda}>{pie}</figcaption>
    </figure>
  );
}

/** El vaso linfático por dentro: válvulas, tramos y hacia dónde empuja. */
export function EsquemaLinfangion() {
  return (
    <Marco pie="El vaso por dentro: cada tramo entre dos válvulas se aprieta solo, y las válvulas impiden que el líquido vuelva atrás.">
      <svg viewBox="0 0 420 190" role="img" aria-label="Esquema de un vaso linfático con sus válvulas" style={{ width: "100%", height: "auto" }}>
        {/* el vaso */}
        <path d="M20,95 C20,72 40,68 60,68 L360,68 C382,68 400,74 400,95 C400,116 382,122 360,122 L60,122 C40,122 20,118 20,95 Z"
              fill="rgba(157,196,111,0.07)" stroke={ORO} strokeWidth="1.6" />

        {/* válvulas: dos hojitas que se abren hacia la derecha */}
        {[110, 210, 310].map((x) => (
          <g key={x}>
            <path d={`M${x},70 L${x + 26},95 L${x},120`} fill="none" stroke={ORO} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
            <path d={`M${x},70 L${x + 26},95`} fill="none" stroke="rgba(200,160,80,0.25)" strokeWidth="6" strokeLinecap="round" />
            <path d={`M${x},120 L${x + 26},95`} fill="none" stroke="rgba(200,160,80,0.25)" strokeWidth="6" strokeLinecap="round" />
          </g>
        ))}

        {/* el sentido del flujo */}
        <defs>
          <marker id="flechaLinfa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M0,1 L9,5 L0,9 z" fill={VERDE} />
          </marker>
        </defs>
        <line x1="45" y1="95" x2="95" y2="95" stroke={VERDE} strokeWidth="2" markerEnd="url(#flechaLinfa)" />
        <line x1="150" y1="95" x2="195" y2="95" stroke={VERDE} strokeWidth="2" markerEnd="url(#flechaLinfa)" />
        <line x1="250" y1="95" x2="295" y2="95" stroke={VERDE} strokeWidth="2" markerEnd="url(#flechaLinfa)" />
        <line x1="350" y1="95" x2="392" y2="95" stroke={VERDE} strokeWidth="2" markerEnd="url(#flechaLinfa)" />

        {/* medidas del tramo */}
        <line x1="136" y1="146" x2="236" y2="146" stroke={ORO_TENUE} strokeWidth="1" />
        <line x1="136" y1="140" x2="136" y2="152" stroke={ORO_TENUE} strokeWidth="1" />
        <line x1="236" y1="140" x2="236" y2="152" stroke={ORO_TENUE} strokeWidth="1" />
        <text x="186" y="166" textAnchor="middle" fill={TEXTO} fontSize="12" fontStyle="italic">un linfangión</text>

        <text x="110" y="52" textAnchor="middle" fill={ORO} fontSize="12">válvula</text>
        <line x1="110" y1="57" x2="112" y2="68" stroke={ORO_TENUE} strokeWidth="1" />

        <text x="300" y="52" textAnchor="middle" fill={ORO} fontSize="12">pared con músculo liso</text>
        <line x1="300" y1="57" x2="300" y2="68" stroke={ORO_TENUE} strokeWidth="1" />

        <text x="400" y="146" textAnchor="end" fill={VERDE} fontSize="12" fontStyle="italic">hacia la clavícula</text>
      </svg>
    </Marco>
  );
}

/** La curva de una clase: cuándo sube y cuándo baja. */
export function ArcoDeClase() {
  const etapas = [
    { x: 24, label: "Llegar" },
    { x: 78, label: "Respirar" },
    { x: 140, label: "Calentar" },
    { x: 212, label: "Calor" },
    { x: 276, label: "De pie" },
    { x: 330, label: "Cumbre" },
    { x: 386, label: "Bajar" },
    { x: 440, label: "Savasana" },
  ];
  return (
    <Marco pie="Una clase sube y baja: la postura más exigente va cuando el cuerpo ya está listo, y se termina más tranquila de lo que se llegó.">
      <svg viewBox="0 0 480 220" role="img" aria-label="Curva de intensidad de una clase de yoga" style={{ width: "100%", height: "auto" }}>
        {/* ejes */}
        <line x1="18" y1="170" x2="466" y2="170" stroke={ORO_TENUE} strokeWidth="1" />
        <text x="18" y="30" fill="rgba(200,160,80,0.55)" fontSize="11">intensidad</text>

        {/* la curva */}
        <path
          d="M24,158 C60,156 90,150 120,132 C160,108 190,92 215,78 C255,56 300,40 330,38 C360,36 375,64 392,104 C408,140 425,158 452,162"
          fill="none"
          stroke={ORO}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M24,158 C60,156 90,150 120,132 C160,108 190,92 215,78 C255,56 300,40 330,38 C360,36 375,64 392,104 C408,140 425,158 452,162 L452,170 L24,170 Z"
          fill="rgba(200,160,80,0.08)"
          stroke="none"
        />

        {/* la cumbre */}
        <circle cx="330" cy="38" r="4.5" fill="none" stroke={ORO} strokeWidth="1.6" />
        <text x="330" y="26" textAnchor="middle" fill="#e8c878" fontSize="12">la postura cumbre</text>

        {/* savasana */}
        <circle cx="452" cy="162" r="4" fill={VERDE} opacity="0.8" />

        {/* etapas */}
        {etapas.map((e) => (
          <g key={e.label}>
            <line x1={e.x} y1="170" x2={e.x} y2="176" stroke={ORO_TENUE} strokeWidth="1" />
            <text x={e.x} y="192" textAnchor="middle" fill={TEXTO} fontSize="11">
              {e.label}
            </text>
          </g>
        ))}
        <text x="240" y="212" textAnchor="middle" fill="rgba(212,196,160,0.5)" fontSize="11" fontStyle="italic">
          el tiempo de la clase
        </text>
      </svg>
    </Marco>
  );
}

const figura: CSSProperties = { margin: "22px 0 26px" };

const marco: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.22)",
  borderRadius: 6,
  padding: "14px 12px 6px",
  background: "rgba(9,14,9,0.55)",
};

const leyenda: CSSProperties = {
  fontFamily: "var(--font-body)",
  fontStyle: "italic",
  fontSize: "0.86rem",
  lineHeight: 1.6,
  color: "rgba(212,196,160,0.6)",
  textAlign: "center",
  marginTop: 10,
};

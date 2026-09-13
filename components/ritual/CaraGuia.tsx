"use client";

import type { CSSProperties } from "react";

/* Dibujo de la cara con las marcas de cada maniobra.

   Es SVG hecho a mano, no una imagen: en el drenaje lo que importa es la
   DIRECCIÓN del recorrido, y eso tiene que estar exacto. Las flechas se animan
   dibujándose para que se vea hacia dónde va el movimiento.

   Coordenadas: lienzo 220 × 300, cara centrada en x = 110.
   Las marcas se escriben solo para el lado izquierdo de la pantalla y el
   componente las refleja cuando la maniobra es simétrica (casi todas lo son).
*/

type Marca =
  /** Recorrido con punta de flecha. Se dibuja animada. */
  | { t: "flecha"; d: string }
  /** Los puntos donde se hacen los círculos fijos. */
  | { t: "puntos"; p: [number, number][] }
  /** Zona de músculo que se trabaja (relleno tenue). */
  | { t: "zona"; d: string }
  /** Aro de atención: párpados, articulación. */
  | { t: "aro"; c: [number, number]; r: number };

type Guia = { marcas: Marca[]; simetrico?: boolean };

const MARCAS: Record<string, Guia> = {
  // ── Preparación ──
  "prep-limpieza": { marcas: [] },
  "prep-deslizante": {
    simetrico: true,
    marcas: [
      { t: "flecha", d: "M 108 118 Q 84 120 62 112" },
      { t: "flecha", d: "M 108 148 Q 84 152 64 142" },
      { t: "flecha", d: "M 108 200 Q 92 210 80 226" },
    ],
  },
  "prep-presion": {
    marcas: [
      { t: "puntos", p: [[84, 136], [94, 142]] },
      { t: "aro", c: [89, 139], r: 22 },
    ],
  },

  // ── Drenaje: cuello ──
  "dre-respirar": {
    simetrico: true,
    marcas: [{ t: "flecha", d: "M 92 268 Q 88 256 92 244" }],
  },
  "dre-apertura": {
    simetrico: true,
    marcas: [
      { t: "flecha", d: "M 108 252 Q 86 248 60 250" },
      { t: "puntos", p: [[108, 252]] },
    ],
  },
  "dre-cadena-cuello": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[80, 190], [77, 206], [74, 222], [71, 238]] },
      { t: "flecha", d: "M 80 188 Q 74 214 70 242" },
    ],
  },
  "dre-nuca": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[52, 148], [58, 172], [64, 200]] },
      { t: "flecha", d: "M 50 144 Q 60 196 70 240" },
    ],
  },
  "dre-menton": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[104, 185], [88, 178], [72, 164], [58, 144]] },
      { t: "flecha", d: "M 106 186 Q 78 178 54 138" },
      { t: "flecha", d: "M 54 138 Q 60 192 70 240" },
    ],
  },
  "dre-orejas": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[58, 118], [42, 116]] },
      { t: "flecha", d: "M 58 118 Q 46 128 42 118" },
      { t: "flecha", d: "M 44 124 Q 58 184 70 240" },
    ],
  },
  "dre-hombros": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[36, 262], [56, 256], [76, 250]] },
      { t: "flecha", d: "M 34 262 Q 66 252 96 246" },
    ],
  },

  // ── Drenaje: rostro ──
  "dre-roce-rostro": {
    simetrico: true,
    marcas: [
      { t: "flecha", d: "M 106 160 L 74 158" },
      { t: "flecha", d: "M 106 146 L 76 144" },
      { t: "flecha", d: "M 106 126 L 82 124" },
      { t: "flecha", d: "M 106 72 L 72 74" },
    ],
  },
  "dre-labios": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[104, 158], [90, 160], [76, 158]] },
      { t: "flecha", d: "M 106 158 Q 88 164 70 156" },
      { t: "flecha", d: "M 70 156 Q 66 200 70 240" },
    ],
  },
  "dre-nariz": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[102, 100], [100, 114], [100, 128]] },
      { t: "flecha", d: "M 100 128 Q 92 134 84 136" },
    ],
  },
  "dre-viaje-largo": {
    simetrico: true,
    marcas: [
      { t: "flecha", d: "M 84 116 Q 92 140 100 158" },
      { t: "flecha", d: "M 100 158 Q 104 176 106 186" },
      { t: "flecha", d: "M 106 186 Q 78 178 56 140" },
      { t: "flecha", d: "M 56 140 Q 62 192 70 240" },
    ],
  },
  "dre-ojos": {
    simetrico: true,
    marcas: [
      { t: "aro", c: [85, 100], r: 20 },
      { t: "puntos", p: [[98, 104], [90, 112], [78, 112], [68, 104]] },
      { t: "flecha", d: "M 99 104 Q 84 116 66 102" },
    ],
  },
  "dre-cejas": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[98, 85], [86, 82], [72, 84]] },
      { t: "flecha", d: "M 100 86 Q 86 80 68 84" },
    ],
  },
  "dre-frente": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[104, 66], [88, 68], [72, 76]] },
      { t: "flecha", d: "M 106 66 Q 82 68 58 96" },
    ],
  },
  "dre-cierre": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[58, 118], [68, 152], [76, 176]] },
      { t: "flecha", d: "M 58 118 Q 70 152 84 178" },
      { t: "flecha", d: "M 84 178 Q 74 212 70 242" },
    ],
  },
  "dre-roce-final": {
    simetrico: true,
    marcas: [
      { t: "flecha", d: "M 74 78 Q 70 140 70 196" },
      { t: "flecha", d: "M 100 70 Q 96 150 92 214" },
    ],
  },

  // ── Ejercicios ──
  "ej-pomulos": {
    simetrico: true,
    marcas: [
      { t: "zona", d: "M 62 116 Q 84 108 102 122 Q 92 146 68 142 Z" },
      { t: "puntos", p: [[74, 120], [88, 124]] },
    ],
  },
  "ej-pez": {
    simetrico: true,
    marcas: [
      { t: "zona", d: "M 62 120 Q 84 114 100 128 Q 88 150 66 146 Z" },
      { t: "flecha", d: "M 66 132 L 92 136" },
    ],
  },
  "ej-frente": {
    simetrico: true,
    marcas: [
      { t: "zona", d: "M 64 58 Q 88 48 108 54 L 108 80 Q 86 74 66 80 Z" },
      { t: "puntos", p: [[80, 78], [96, 76]] },
      { t: "flecha", d: "M 88 78 L 88 62" },
    ],
  },
  "ej-entrecejo": {
    marcas: [
      { t: "zona", d: "M 100 80 Q 110 76 120 80 L 120 94 Q 110 90 100 94 Z" },
      { t: "puntos", p: [[99, 86], [121, 86]] },
      { t: "flecha", d: "M 100 86 L 88 84" },
    ],
  },
  "ej-ojos": {
    simetrico: true,
    marcas: [
      { t: "zona", d: "M 68 102 Q 85 98 102 102 Q 86 116 68 102 Z" },
      { t: "puntos", p: [[66, 100], [104, 102]] },
    ],
  },
  "ej-o-sonrisa": {
    marcas: [
      { t: "aro", c: [110, 152], r: 15 },
      { t: "zona", d: "M 92 150 Q 110 142 128 150 Q 110 168 92 150 Z" },
    ],
  },
  "ej-labios-dentro": {
    marcas: [{ t: "zona", d: "M 90 146 Q 110 138 130 146 Q 110 166 90 146 Z" }],
  },
  "ej-lengua": {
    marcas: [
      { t: "zona", d: "M 94 148 Q 110 142 126 148 Q 110 162 94 148 Z" },
      { t: "flecha", d: "M 110 160 L 110 146" },
    ],
  },
  "ej-beso-techo": {
    marcas: [
      { t: "zona", d: "M 82 186 Q 110 178 138 186 L 136 232 Q 110 240 84 232 Z" },
      { t: "flecha", d: "M 110 188 Q 112 172 110 158" },
    ],
  },
  "ej-platisma": {
    simetrico: true,
    marcas: [
      { t: "zona", d: "M 82 188 Q 96 182 108 188 L 108 234 Q 94 240 84 234 Z" },
      { t: "flecha", d: "M 96 190 L 96 232" },
    ],
  },
  "ej-masetero": {
    simetrico: true,
    marcas: [
      { t: "zona", d: "M 52 118 Q 66 114 72 130 Q 68 156 54 148 Z" },
      { t: "flecha", d: "M 56 128 Q 70 134 60 146 Q 52 138 62 132" },
    ],
  },
  "ej-abrir-cerrar": {
    simetrico: true,
    marcas: [
      { t: "aro", c: [52, 120], r: 9 },
      { t: "flecha", d: "M 96 182 Q 110 196 96 208" },
    ],
  },

  // ── Cierre ──
  "cie-percusion": {
    simetrico: true,
    marcas: [
      {
        t: "puntos",
        p: [
          [88, 70], [70, 84], [96, 96], [74, 110], [90, 126],
          [68, 134], [92, 150], [76, 168], [96, 182], [80, 206],
        ],
      },
    ],
  },
  "cie-mandibula": {
    marcas: [
      { t: "zona", d: "M 84 160 Q 110 150 136 160 Q 130 192 110 196 Q 90 192 84 160 Z" },
      { t: "flecha", d: "M 110 168 L 110 188" },
    ],
  },
  "cie-agua": { marcas: [] },
};

const ORO = "#c8a050";
const ORO_CLARO = "#e8c878";
const TRAZO = "rgba(217, 203, 170, 0.34)";

/** Rostro base: siempre el mismo, para que la vista no cambie entre pasos. */
function Rostro() {
  return (
    <g fill="none" stroke={TRAZO} strokeWidth="1.5" strokeLinecap="round">
      {/* cráneo y óvalo */}
      <path d="M 110 24 Q 172 24 172 104 Q 172 150 152 172 Q 132 194 110 196 Q 88 194 68 172 Q 48 150 48 104 Q 48 24 110 24" />
      {/* orejas */}
      <path d="M 48 100 Q 38 100 38 116 Q 38 130 50 132" />
      <path d="M 172 100 Q 182 100 182 116 Q 182 130 170 132" />
      {/* cejas */}
      <path d="M 68 84 Q 84 76 100 84" />
      <path d="M 120 84 Q 136 76 152 84" />
      {/* ojos */}
      <path d="M 70 100 Q 85 92 100 100 Q 85 110 70 100 Z" />
      <path d="M 120 100 Q 135 92 150 100 Q 135 110 120 100 Z" />
      {/* nariz */}
      <path d="M 110 96 L 110 124 Q 102 130 100 126" />
      <path d="M 110 124 Q 118 130 120 126" />
      {/* boca */}
      <path d="M 92 150 Q 110 142 128 150 Q 110 164 92 150 Z" />
      {/* cuello y hombros */}
      <path d="M 84 190 Q 82 216 78 240" />
      <path d="M 136 190 Q 138 216 142 240" />
      <path d="M 28 268 Q 58 250 78 242 L 110 250 L 142 242 Q 162 250 192 268" />
      {/* clavículas */}
      <path d="M 60 256 Q 86 250 108 252" />
      <path d="M 160 256 Q 134 250 112 252" />
    </g>
  );
}

function Marcas({ marcas, animar }: { marcas: Marca[]; animar: boolean }) {
  return (
    <>
      {marcas.map((m, i) => {
        if (m.t === "zona") {
          return (
            <path
              key={i}
              d={m.d}
              fill="rgba(200, 160, 80, 0.22)"
              stroke={ORO}
              strokeWidth="1.2"
              strokeDasharray="3 3"
            />
          );
        }
        if (m.t === "aro") {
          return (
            <circle
              key={i}
              cx={m.c[0]}
              cy={m.c[1]}
              r={m.r}
              fill="none"
              stroke={ORO}
              strokeWidth="1.2"
              strokeDasharray="4 4"
              opacity="0.75"
            />
          );
        }
        if (m.t === "puntos") {
          return (
            <g key={i}>
              {m.p.map(([x, y], j) => (
                <circle key={j} cx={x} cy={y} r="3.4" fill={ORO_CLARO} opacity="0.9">
                  {animar && (
                    <animate
                      attributeName="r"
                      values="2.6;4.4;2.6"
                      dur="1.6s"
                      begin={`${j * 0.18}s`}
                      repeatCount="indefinite"
                    />
                  )}
                </circle>
              ))}
            </g>
          );
        }
        return (
          <path
            key={i}
            className={animar ? "ritual-flecha" : undefined}
            d={m.d}
            fill="none"
            stroke={ORO_CLARO}
            strokeWidth="2.4"
            strokeLinecap="round"
            markerEnd="url(#ritual-punta)"
            style={animar ? ({ animationDelay: `${i * 0.45}s` } as CSSProperties) : undefined}
          />
        );
      })}
    </>
  );
}

export function CaraGuia({
  pasoId,
  animar = true,
  tamano = 260,
}: {
  pasoId: string;
  animar?: boolean;
  tamano?: number;
}) {
  const guia = MARCAS[pasoId] ?? { marcas: [] };

  return (
    <svg
      viewBox="0 0 220 300"
      width={tamano}
      height={(tamano * 300) / 220}
      role="img"
      aria-label="Dibujo de la cara con el recorrido de la maniobra"
      style={{ display: "block", maxWidth: "100%", height: "auto" }}
    >
      <defs>
        <marker
          id="ritual-punta"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill={ORO_CLARO} />
        </marker>
      </defs>

      <Rostro />
      <Marcas marcas={guia.marcas} animar={animar} />
      {guia.simetrico && (
        <g transform="translate(220,0) scale(-1,1)">
          <Marcas marcas={guia.marcas} animar={animar} />
        </g>
      )}
    </svg>
  );
}

/** Si un paso todavía no tiene dibujo, el modo guiado no muestra el marco vacío. */
export function tieneDibujo(pasoId: string) {
  return (MARCAS[pasoId]?.marcas.length ?? 0) > 0;
}

/* Cómo suben y bajan las cuatro hormonas en un ciclo de 28 días.

   Es un esquema, no datos de una persona: las curvas están a escala
   relativa (cada una contra su propio máximo), siguiendo las mediciones
   clásicas del ciclo. Lo que importa es el orden de los picos —el
   estradiol sube, dispara la LH, ovulación, y después manda la
   progesterona— y eso se ve igual en cualquier ciclo, sea de 25 o de 35
   días: lo que se estira es la primera mitad. */

const ANCHO = 360;
const ALTO = 230;
const IZQ = 10;
const DER = 10;
const ARRIBA = 26;
const ABAJO = 50;
const DIAS = 28;

const g = (d: number, centro: number, ancho: number) => Math.exp(-((d - centro) ** 2) / (2 * ancho ** 2));

const CURVAS = [
  {
    id: "estradiol",
    nombre: "Estradiol",
    color: "#e8c878",
    f: (d: number) => 0.12 + 0.8 * g(d, 13, 2.4) + 0.42 * g(d, 21, 3),
    etiqueta: 9.6,
  },
  {
    id: "lh",
    nombre: "LH",
    color: "#e08f62",
    f: (d: number) => 0.1 + 0.9 * g(d, 14, 0.75),
    etiqueta: 14,
  },
  {
    id: "fsh",
    nombre: "FSH",
    color: "#b3a4e0",
    f: (d: number) => 0.14 + 0.24 * g(d, 2, 3) + 0.38 * g(d, 14, 0.8) + 0.12 * g(d, 29, 2),
    etiqueta: 3,
  },
  {
    id: "progesterona",
    nombre: "Progesterona",
    color: "#93b87c",
    f: (d: number) => 0.04 + 0.82 * g(d, 21, 3.2),
    etiqueta: 21,
  },
];

const FASES = [
  { nombre: "Menstruación", desde: 1, hasta: 5 },
  { nombre: "Folicular", desde: 5, hasta: 13 },
  { nombre: "Ovulación", desde: 13, hasta: 15.5 },
  { nombre: "Lútea", desde: 15.5, hasta: 28 },
];

const x = (d: number) => IZQ + ((d - 1) / (DIAS - 1)) * (ANCHO - IZQ - DER);
const y = (v: number) => ARRIBA + (1 - v) * (ALTO - ARRIBA - ABAJO);

function camino(f: (d: number) => number) {
  const puntos: string[] = [];
  for (let d = 1; d <= DIAS; d += 0.25) puntos.push(`${x(d).toFixed(1)},${y(f(d)).toFixed(1)}`);
  return `M${puntos.join(" L")}`;
}

export function CurvasHormonas() {
  const base = ALTO - ABAJO;
  return (
    <figure style={{ margin: "0 0 18px" }}>
      <svg
        viewBox={`0 0 ${ANCHO} ${ALTO}`}
        width="100%"
        role="img"
        aria-label="Esquema de un ciclo de 28 días: el estradiol sube en la fase folicular y llega a su máximo justo antes de la ovulación; ahí se dispara la LH y sube algo la FSH; después de la ovulación sube la progesterona, que llega a su máximo a mitad de la fase lútea, y todo cae antes de la menstruación."
        style={{ display: "block", maxWidth: "100%" }}
      >
        {/* Las fases, como bandas suaves detrás de las curvas. */}
        {FASES.map((f, i) => (
          <g key={f.nombre}>
            <rect
              x={x(f.desde)}
              y={ARRIBA}
              width={x(f.hasta) - x(f.desde)}
              height={base - ARRIBA}
              fill={i % 2 === 0 ? "rgba(200,160,80,0.07)" : "rgba(200,160,80,0.02)"}
            />
            <text
              x={(x(f.desde) + x(f.hasta)) / 2}
              y={base + 34}
              textAnchor="middle"
              fontSize="11"
              fill="rgba(212,196,160,0.8)"
              fontFamily="var(--font-crimson), serif"
            >
              {f.nombre}
            </text>
          </g>
        ))}

        <line x1={IZQ} x2={ANCHO - DER} y1={base} y2={base} stroke="rgba(212,196,160,0.35)" strokeWidth="1" />
        {[1, 7, 14, 21, 28].map((d) => (
          <text
            key={d}
            x={x(d)}
            y={base + 15}
            textAnchor={d === 1 ? "start" : d === 28 ? "end" : "middle"}
            fontSize="10"
            fill="rgba(212,196,160,0.6)"
            fontFamily="var(--font-crimson), serif"
          >
            día {d}
          </text>
        ))}

        {CURVAS.map((c) => (
          <path key={c.id} d={camino(c.f)} fill="none" stroke={c.color} strokeWidth="2" strokeLinejoin="round" />
        ))}

        {/* Cada curva lleva su nombre junto a su pico: sin leyenda aparte. */}
        {CURVAS.map((c) => (
          <text
            key={`${c.id}-t`}
            x={x(c.etiqueta)}
            y={y(c.f(c.etiqueta)) - 8}
            textAnchor={c.id === "estradiol" ? "end" : "middle"}
            fontSize="12"
            fontWeight="600"
            fill={c.color}
            fontFamily="var(--font-crimson), serif"
          >
            {c.nombre}
          </text>
        ))}
      </svg>
      <figcaption style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "rgba(212,196,160,0.6)", fontStyle: "italic", marginTop: 6 }}>
        Esquema de un ciclo de 28 días. Cada curva va contra su propio máximo: sirve para ver el orden de los picos,
        no para comparar cantidades. En un ciclo más largo o más corto, lo que cambia es sobre todo la primera mitad.
      </figcaption>
    </figure>
  );
}

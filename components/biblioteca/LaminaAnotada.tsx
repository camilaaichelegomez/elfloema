"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/* Una lámina con los nombres puestos encima.

   El dibujo lo genera Camila con IA —una figura limpia, cuadrada, sin una
   sola letra— y aquí se le montan los puntos, los números, las flechas y la
   leyenda. Así el dibujo es bonito y lo que enseña es exacto: la IA no
   escribe etiquetas legibles ni acierta dónde va un ganglio, y esto no tiene
   por qué depender de eso.

   Las coordenadas van de 0 a 100, sobre la lámina cuadrada: (0,0) arriba a la
   izquierda, (100,100) abajo a la derecha. Por eso las láminas se piden
   CUADRADAS y con la figura centrada.

   Mientras el archivo no exista, se ve el armazón con los puntos en su lugar
   y el prompt para generarla. */

const ORO = "#c8a050";

/** El estilo que comparten todas las láminas del grimorio, para que la IA
 *  devuelva dibujos hermanos y —sobre todo— sin una sola letra encima. */
export const ESTILO_LAMINA =
  "Hand-painted antique botanical-plate style, ink and watercolour, sepia and aged gold on a very dark " +
  "forest-green background, warm atmospheric light, highly detailed, perfectly centered and symmetric, " +
  "square 1:1 composition with generous empty margin around the subject. VERY IMPORTANT: absolutely no " +
  "text, no letters, no words, no labels, no numbers, no arrows, no captions and no watermark anywhere " +
  "in the image. Only the clean illustration.";

export type Punto = {
  /** Posición sobre la lámina, de 0 a 100. */
  x: number;
  y: number;
  /** Qué es. Aparece numerado en la leyenda de abajo. */
  texto: string;
  /** Hacia dónde sale la etiqueta, si estorba el dibujo. */
  lado?: "izq" | "der";
};

export type Flecha = {
  /** Camino en el mismo sistema de 0 a 100: "M 50 40 Q 65 45 78 48". */
  d: string;
  /** Verde para el recorrido de la linfa; oro para lo demás. */
  color?: "oro" | "verde";
};

export function LaminaAnotada({
  num,
  titulo,
  src,
  prompt,
  puntos = [],
  flechas = [],
  leyenda,
}: {
  num: string;
  titulo: string;
  src: string;
  prompt: string;
  puntos?: Punto[];
  flechas?: Flecha[];
  leyenda?: string;
}) {
  const [hayImagen, setHayImagen] = useState(true);
  const [copiado, setCopiado] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  /* Si la lámina falta, el error ocurre antes de que React tome el control de
     la página y `onError` nunca se entera. Por eso, al montar, se pregunta
     directo: ¿cargó algo o quedó vacía? */
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setHayImagen(false);
  }, []);

  async function copiarPrompt() {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 1800);
    } catch {
      /* sin portapapeles: se puede leer y copiar a mano */
    }
  }

  return (
    <figure style={figura}>
      <div style={marco}>
        {/* Gemas de esquina, como en las demás láminas del grimorio */}
        <span style={{ ...gema, top: -3, left: -3 }} />
        <span style={{ ...gema, top: -3, right: -3 }} />
        <span style={{ ...gema, bottom: -3, left: -3 }} />
        <span style={{ ...gema, bottom: -3, right: -3 }} />

        <div style={{ position: "relative", width: "100%", aspectRatio: "1 / 1" }}>
          {hayImagen ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={imgRef}
              src={src}
              alt={titulo}
              onError={() => setHayImagen(false)}
              style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }}
            />
          ) : (
            <div style={sinImagen}>
              <p style={{ fontFamily: "var(--font-grimoire)", fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(200,160,80,0.55)", margin: 0, textAlign: "center", padding: "0 1rem" }}>
                Falta la lámina
              </p>
            </div>
          )}

          {/* Flechas y puntos, encima del dibujo */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          >
            <defs>
              <marker id={`punta-oro-${num}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                <path d="M0,1 L9,5 L0,9 z" fill={ORO} />
              </marker>
              <marker id={`punta-verde-${num}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
                <path d="M0,1 L9,5 L0,9 z" fill="#9dc46f" />
              </marker>
            </defs>
            {flechas.map((f, i) => (
              <g key={i}>
                {/* Un trazo oscuro debajo: así la flecha se ve sobre cualquier dibujo */}
                <path d={f.d} fill="none" stroke="rgba(8,13,8,0.75)" strokeWidth={1.9} strokeLinecap="round" />
                <path
                  d={f.d}
                  fill="none"
                  stroke={f.color === "verde" ? "#9dc46f" : ORO}
                  strokeWidth={0.9}
                  strokeLinecap="round"
                  markerEnd={`url(#punta-${f.color === "verde" ? "verde" : "oro"}-${num})`}
                />
              </g>
            ))}
          </svg>

          {puntos.map((p, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                left: `${p.x}%`,
                top: `${p.y}%`,
                transform: "translate(-50%, -50%)",
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "rgba(9,14,9,0.85)",
                border: `1.5px solid ${ORO}`,
                color: "#e8c878",
                fontFamily: "var(--font-grimoire)",
                fontSize: "0.7rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 10px rgba(0,0,0,0.6)",
              }}
            >
              {i + 1}
            </span>
          ))}
        </div>
      </div>

      <figcaption style={pie}>
        <span style={{ color: ORO }}>Lámina {num}</span> · {titulo}
        {leyenda && <span style={{ display: "block", marginTop: 4, opacity: 0.8 }}>{leyenda}</span>}
      </figcaption>

      {puntos.length > 0 && (
        <ol style={lista}>
          {puntos.map((p, i) => (
            <li key={i} style={item}>
              <span style={numero}>{i + 1}</span>
              <span>{p.texto}</span>
            </li>
          ))}
        </ol>
      )}

      {!hayImagen && (
        <div style={cajaPrompt}>
          <p style={{ fontFamily: "var(--font-grimoire)", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(200,160,80,0.55)", marginBottom: 8 }}>
            Generar con IA y guardar en <code style={{ color: "#e8c878" }}>public{src}</code>
          </p>
          <p style={{ fontSize: "0.82rem", lineHeight: 1.6, color: "rgba(212,196,160,0.72)", marginBottom: 10 }}>{prompt}</p>
          <button type="button" onClick={copiarPrompt} style={boton}>
            {copiado ? "Copiado ✓" : "Copiar el prompt"}
          </button>
        </div>
      )}
    </figure>
  );
}

const figura: CSSProperties = { margin: "22px 0 26px" };

const marco: CSSProperties = {
  position: "relative",
  border: "1px solid rgba(200,160,80,0.28)",
  borderRadius: 4,
  padding: 6,
  background: "rgba(9,14,9,0.5)",
};

const gema: CSSProperties = {
  position: "absolute",
  width: 6,
  height: 6,
  borderRadius: "50%",
  background: "rgba(200,160,80,0.6)",
};

const sinImagen: CSSProperties = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "repeating-linear-gradient(45deg, rgba(200,160,80,0.035) 0 10px, transparent 10px 20px), rgba(12,18,12,0.9)",
  borderRadius: 2,
};

const pie: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.72rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(212,196,160,0.6)",
  textAlign: "center",
  marginTop: 10,
  lineHeight: 1.6,
};

const lista: CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: "14px 0 0",
  display: "grid",
  gap: 6,
};

const item: CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "flex-start",
  fontSize: "0.9rem",
  lineHeight: 1.6,
  color: "#d4c4a0",
};

const numero: CSSProperties = {
  flexShrink: 0,
  width: 20,
  height: 20,
  borderRadius: "50%",
  border: `1px solid rgba(200,160,80,0.5)`,
  color: "#e8c878",
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.66rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 1,
};

const cajaPrompt: CSSProperties = {
  marginTop: 12,
  background: "rgba(200,160,80,0.05)",
  border: "1px dashed rgba(200,160,80,0.25)",
  borderRadius: 6,
  padding: "0.85rem 1rem",
};

const boton: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.66rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#e8c878",
  background: "transparent",
  border: "1px solid rgba(200,160,80,0.4)",
  borderRadius: 3,
  padding: "0.45rem 0.9rem",
  cursor: "pointer",
};

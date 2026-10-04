import { CHAKRAS } from "@/lib/chakras/tradicion";

/* Los siete centros sobre la ilustración de la postura sentada, la misma que
   usa el ritual de yoga: así es un cuerpo de verdad y no un monigote, y se ve
   igual que el resto del sitio.

   Las alturas no están puestas a ojo. Se midió la ilustración fila por fila
   para encontrar dónde está cada parte: la coronilla a los 108 px, el mentón a
   los 165, el cuello entre 170 y 195, los hombros a los 210, la cintura a los
   320. Cada centro va donde la tradición lo ubica sobre ese cuerpo.

   Los números van sobre la figura y los nombres en una lista debajo, en texto
   de verdad. Si fueran rótulos dentro del dibujo, en el teléfono quedarían de
   ocho píxeles y no se leerían. */

/* En la ilustración (800 × 600), el eje del cuerpo cae en x = 400. */
const EJE = 400;

/** Dónde cae cada centro sobre la ilustración, medido sobre la figura. */
const Y: Record<string, number> = {
  muladhara: 412, // donde se apoya al sentarse
  svadhisthana: 352, // bajo el ombligo
  manipura: 300, // boca del estómago
  anahata: 258, // centro del pecho
  vishuddha: 188, // el cuello
  ajna: 136, // entre las cejas
  sahasrara: 94, // la coronilla
};

/* Se recorta al cuerpo: la ilustración trae mucho fondo vacío alrededor y, sin
   recortar, en el teléfono la figura queda diminuta. */
const RECORTE = "190 56 420 520";

export function ColumnaChakras() {
  return (
    <figure style={{ margin: "0 0 22px" }}>
      <svg
        viewBox={RECORTE}
        width="100%"
        style={{
          maxWidth: 430,
          display: "block",
          margin: "0 auto",
          height: "auto",
          /* El fondo de la ilustración es un verde distinto al de la página: con
             el borde queda como una lámina y no como un recorte pegado. */
          border: "1px solid rgba(200,160,80,0.28)",
          borderRadius: 6,
        }}
        role="img"
        aria-label="Una mujer sentada en postura de meditación con los siete chakras marcados a lo largo del eje del cuerpo, numerados del uno en la base al siete en la coronilla."
      >
        <image href="/yoga/posturas/sentada.webp" x="0" y="0" width="800" height="600" />

        {/* El canal, de la base a la coronilla */}
        <path
          d={`M${EJE} ${Y.muladhara} L ${EJE} ${Y.sahasrara}`}
          stroke="rgba(232,200,120,0.5)"
          strokeWidth="2"
          strokeDasharray="4 5"
          fill="none"
        />

        {CHAKRAS.map((c, i) => {
          const y = Y[c.id];
          return (
            <g key={c.id}>
              <circle cx={EJE} cy={y} r={19} fill={c.tono} opacity="0.3" />
              <circle cx={EJE} cy={y} r={15} fill={c.tono} />
              <circle cx={EJE} cy={y} r={15} fill="none" stroke="rgba(13,26,13,0.55)" strokeWidth="1.5" />
              <text
                x={EJE}
                y={y + 7}
                textAnchor="middle"
                fill="#0d1a0d"
                style={{ fontFamily: "var(--font-cinzel), serif", fontSize: 19, fontWeight: 700 }}
              >
                {i + 1}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Los nombres, en texto de verdad: se leen a cualquier tamaño. */}
      <ol style={{ listStyle: "none", margin: "18px 0 0", padding: 0, display: "grid", gap: "10px" }}>
        {CHAKRAS.map((c, i) => (
          <li key={c.id} style={{ display: "flex", gap: "11px", alignItems: "flex-start" }}>
            <span
              style={{
                flexShrink: 0,
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: c.tono,
                color: "#0d1a0d",
                fontFamily: "var(--font-cinzel), serif",
                fontSize: "0.82rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 2,
              }}
            >
              {i + 1}
            </span>
            <span style={{ minWidth: 0, flex: 1 }}>
              <span
                style={{
                  fontFamily: "var(--font-cinzel), serif",
                  color: "#e8c878",
                  fontSize: "0.92rem",
                  letterSpacing: "0.03em",
                }}
              >
                {c.nombre}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  color: "rgba(212,196,160,0.6)",
                  fontSize: "0.85rem",
                  fontStyle: "italic",
                }}
              >
                {" "}
                · {c.sanscrito} · {c.petalos}
              </span>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-body)",
                  color: "#d4c4a0",
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                }}
              >
                {c.donde}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <figcaption
        style={{
          fontFamily: "var(--font-body)",
          fontStyle: "italic",
          fontSize: "0.82rem",
          lineHeight: 1.6,
          color: "rgba(212,196,160,0.5)",
          marginTop: "14px",
        }}
      >
        La línea punteada es suṣumṇā, el canal donde la tradición los describe ensartados. Las posiciones
        son las de la tradición: no corresponden a ningún órgano.
      </figcaption>
    </figure>
  );
}

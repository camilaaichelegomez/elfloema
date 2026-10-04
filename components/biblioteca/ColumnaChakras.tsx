import { CHAKRAS } from "@/lib/chakras/tradicion";

/* Los siete centros sobre una figura sentada, de perfil.

   Va dibujado en código y no generado con IA a propósito: lo que tiene que
   quedar exacto son los nombres y la altura de cada centro, y eso una imagen
   generada lo escribe mal. Acá los rótulos salen de la misma lista que el
   resto de la página, así que no se pueden desincronizar.

   Las alturas siguen la descripción de la tradición: perineo, bajo el
   ombligo, boca del estómago, centro del pecho, garganta, entrecejo y
   coronilla. Los colores son los del esquema moderno —el de 1977— porque es
   el que la gente reconoce; el texto aclara que los clásicos son otros. */

const ALTO = 400;
const EJE = 86; // el eje del cuerpo, en x
const Y: Record<string, number> = {
  sahasrara: 52,
  ajna: 88,
  vishuddha: 128,
  anahata: 176,
  manipura: 214,
  svadhisthana: 250,
  muladhara: 288,
};

export function ColumnaChakras() {
  return (
    <figure style={{ margin: "0 0 20px" }}>
      <svg
        viewBox={`0 0 330 ${ALTO}`}
        width="100%"
        style={{ maxWidth: 560, display: "block", margin: "0 auto", height: "auto" }}
        role="img"
        aria-label="Figura sentada de perfil con los siete chakras marcados a lo largo de la columna, desde el perineo hasta la coronilla."
      >
        {/* Una silueta apenas insinuada detrás de las líneas: sin esto el dibujo
            se lee como un montón de curvas sueltas y no como alguien sentado. */}
        <path
          d={`M${EJE - 30} 136 C ${EJE - 34} 180, ${EJE - 30} 240, ${EJE - 26} 272
              C ${EJE - 44} 266, ${EJE - 52} 276, ${EJE - 52} 286
              C ${EJE - 34} 310, ${EJE + 34} 310, ${EJE + 52} 286
              C ${EJE + 52} 276, ${EJE + 44} 266, ${EJE + 26} 272
              C ${EJE + 30} 240, ${EJE + 34} 180, ${EJE + 30} 136
              C ${EJE + 16} 128, ${EJE - 16} 128, ${EJE - 30} 136 Z`}
          fill="rgba(200,160,80,0.055)"
        />
        <circle cx={EJE} cy={90} r={24} fill="rgba(200,160,80,0.055)" />

        {/* ── La figura, de frente y sentada en loto ── */}
        <g stroke="rgba(200,160,80,0.55)" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round">
          {/* cabeza y cuello */}
          <circle cx={EJE} cy={90} r={24} />
          <path d={`M${EJE - 7} 112 L ${EJE - 7} 126 M${EJE + 7} 112 L ${EJE + 7} 126`} />
          {/* hombros y tronco, que se afina hacia la cintura */}
          <path d={`M${EJE - 30} 136 C ${EJE - 34} 180, ${EJE - 30} 230, ${EJE - 24} 266`} />
          <path d={`M${EJE + 30} 136 C ${EJE + 34} 180, ${EJE + 30} 230, ${EJE + 24} 266`} />
          <path d={`M${EJE - 30} 136 C ${EJE - 16} 128, ${EJE + 16} 128, ${EJE + 30} 136`} />
          {/* brazos: bajan por fuera y llegan a las rodillas */}
          <path d={`M${EJE - 31} 142 C ${EJE - 50} 178, ${EJE - 54} 234, ${EJE - 44} 276`} opacity="0.75" />
          <path d={`M${EJE + 31} 142 C ${EJE + 50} 178, ${EJE + 54} 234, ${EJE + 44} 276`} opacity="0.75" />
          {/* piernas cruzadas: las rodillas abiertas y los tobillos al centro */}
          <path d={`M${EJE - 52} 286 C ${EJE - 36} 258, ${EJE + 36} 258, ${EJE + 52} 286`} />
          <path d={`M${EJE - 52} 286 C ${EJE - 34} 310, ${EJE + 34} 310, ${EJE + 52} 286`} />
          <path d={`M${EJE - 30} 294 C ${EJE - 12} 284, ${EJE + 12} 284, ${EJE + 30} 294`} opacity="0.5" />
        </g>

        {/* ── El canal: suṣumṇā ── */}
        <path
          d={`M${EJE} 288 L ${EJE} 52`}
          stroke="rgba(200,160,80,0.28)"
          strokeWidth="1.6"
          strokeDasharray="3 4"
          fill="none"
        />

        {/* ── Los siete centros, cada uno con su rótulo ── */}
        {CHAKRAS.map((c) => {
          const y = Y[c.id];
          const esCorona = c.id === "sahasrara";
          return (
            <g key={c.id}>
              {/* el halo del centro */}
              <circle cx={EJE} cy={y} r={esCorona ? 13 : 10} fill={c.tono} opacity="0.22" />
              <circle cx={EJE} cy={y} r={esCorona ? 8 : 6} fill={c.tono} opacity="0.85" />
              <circle cx={EJE} cy={y} r={esCorona ? 13 : 10} fill="none" stroke={c.tono} strokeWidth="1" opacity="0.6" />

              {/* la línea que lleva al rótulo */}
              <path
                d={`M${EJE + (esCorona ? 15 : 12)} ${y} L 150 ${y}`}
                stroke={c.tono}
                strokeWidth="0.9"
                opacity="0.45"
                fill="none"
              />

              {/* el rótulo */}
              <text
                x={156}
                y={y - 2}
                fill="#d4c4a0"
                style={{ fontFamily: "var(--font-cinzel), serif", fontSize: 11, letterSpacing: "0.04em" }}
              >
                {c.nombre}
              </text>
              <text
                x={156}
                y={y + 11}
                fill="rgba(212,196,160,0.58)"
                style={{ fontFamily: "var(--font-body), serif", fontSize: 9.5, fontStyle: "italic" }}
              >
                {c.sanscrito} · {c.petalos}
              </text>
            </g>
          );
        })}

        {/* ── La serpiente enroscada en la base ── */}
        <path
          d={`M${EJE - 14} 300 c 5 -7, 17 -7, 20 0 c 2.5 5, -3.5 8.5, -8.5 7 c -4 -1.5, -3.5 -7, 1 -7`}
          stroke="rgba(176,58,46,0.6)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <text
          x={EJE}
          y={322}
          textAnchor="middle"
          fill="rgba(212,196,160,0.45)"
          style={{ fontFamily: "var(--font-body), serif", fontSize: 8.5, fontStyle: "italic" }}
        >
          kuṇḍalinī
        </text>

        {/* ── Pie del esquema ── */}
        <text
          x={165}
          y={ALTO - 46}
          textAnchor="middle"
          fill="rgba(212,196,160,0.5)"
          style={{ fontFamily: "var(--font-body), serif", fontSize: 9.5, fontStyle: "italic" }}
        >
          La línea punteada es suṣumṇā, el canal donde van ensartados.
        </text>
        <text
          x={165}
          y={ALTO - 30}
          textAnchor="middle"
          fill="rgba(212,196,160,0.38)"
          style={{ fontFamily: "var(--font-body), serif", fontSize: 9, fontStyle: "italic" }}
        >
          Las posiciones son las de la tradición. No corresponden a ningún órgano.
        </text>
      </svg>
    </figure>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore, type CSSProperties } from "react";
import { Desplegable } from "@/components/florecer/Desplegable";
import {
  CONSEJO_ETAPA,
  ETAPAS,
  FLUJOS,
  NOMBRE_FASE,
  SINTOMAS,
  ciclos,
  consejosDeHoy,
  diaOvulacion,
  diasEntre,
  estadoDe,
  etapaSugerida,
  fechaCorta,
  guardarCiclo,
  hoy,
  leerCiclo,
  loQueSeRepite,
  mancha,
  previsto,
  reglas,
  senales,
  sinFases,
  sumarDias,
  type DatosCiclo,
  type Dia,
  type Etapa,
  type Flujo,
} from "@/lib/ciclo/registro";

/* La sección Ciclo de Florecer.

   Arriba, lo de hoy: en qué día y fase vas, cuándo llega la próxima menstruación
   y un botón para anotar. Debajo, el calendario del mes para anotar o
   corregir cualquier día. Después, los consejos del día, lo que se repite
   en tu registro y las señales que conviene conversar. Lo demás, plegado.

   Todo se guarda solo en este teléfono. */

const sinSuscribir = () => () => {};

const COLOR_FASE: Record<string, string> = {
  menstrual: "#c8735a",
  folicular: "#a7c08c",
  ovulatoria: "#e8c878",
  lutea: "#b3a4e0",
};

const DIAS_SEMANA = ["L", "M", "M", "J", "V", "S", "D"];
const MESES_LARGOS = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export function Ciclo() {
  const montado = useSyncExternalStore(sinSuscribir, () => true, () => false);
  const leido = useMemo(() => (montado ? leerCiclo() : null), [montado]);
  const [cambiado, setDatos] = useState<DatosCiclo | null>(null);
  const datos = cambiado ?? leido;
  const fecha = hoy();
  const [elegido, setElegido] = useState(fecha);
  const [mes, setMes] = useState(() => fecha.slice(0, 7));
  const [borrando, setBorrando] = useState(false);

  if (!datos) return <div style={{ minHeight: 320 }} aria-busy="true" />;

  const guardar = (d: DatosCiclo) => {
    setDatos(d);
    guardarCiclo(d);
  };

  if (!datos.etapa) return <Bienvenida datos={datos} guardar={guardar} />;

  const cambiarDia = (t: string, cambio: Partial<Dia>) => {
    const nuevo: Dia = { ...datos.dias[t], ...cambio };
    if (!nuevo.flujo) delete nuevo.flujo;
    if (!nuevo.sintomas?.length) delete nuevo.sintomas;
    if (!nuevo.nota?.trim()) delete nuevo.nota;
    const dias = { ...datos.dias };
    if (Object.keys(nuevo).length) dias[t] = nuevo;
    else delete dias[t];
    guardar({ ...datos, dias });
  };

  const est = estadoDe(datos, fecha);
  const conFases = !sinFases(datos.etapa);
  const consejos = consejosDeHoy(datos, fecha);
  const alertas = senales(datos, fecha);
  const repite = loQueSeRepite(datos);
  const historial = ciclos(datos).slice(-6).reverse();
  const todas = reglas(datos);
  const hoyDia = datos.dias[fecha];
  const enRegla = est.fase === "menstrual";

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {/* ── Hoy ───────────────────────────── */}
      <section style={ahora} aria-labelledby="ciclo-hoy">
        <p style={rotulo}>Hoy</p>
        {conFases && !est.sinDatos && est.diaDelCiclo ? (
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap" }}>
            <Rueda largo={est.atraso ? est.largo + est.atraso : est.largo} dia={est.diaDelCiclo} />
            <div style={{ flex: "1 1 200px", minWidth: 0 }}>
              <h2 id="ciclo-hoy" style={titulo}>
                Día {est.diaDelCiclo} · {est.fase ? NOMBRE_FASE[est.fase] : ""}
              </h2>
              <p style={linea}>
                {est.atraso
                  ? `La menstruación viene ${est.atraso} ${est.atraso === 1 ? "día" : "días"} más tarde que tu promedio.`
                  : est.proximaRegla
                    ? `Próxima regla: alrededor del ${fechaCorta(est.proximaRegla)} (en ${diasEntre(fecha, est.proximaRegla)} días).`
                    : null}
              </p>
              <p style={{ ...linea, fontSize: "0.88rem", opacity: 0.75 }}>
                {est.confiable
                  ? `Calculado con tus últimos ciclos: duran unos ${est.largo} días. Es una estimación.`
                  : `Con menos de tres ciclos anotados, parto de 28 días. Mejora desde el tercero.`}
              </p>
            </div>
          </div>
        ) : (
          <>
            <h2 id="ciclo-hoy" style={titulo}>
              {conFases
                ? "Anota tu última menstruación"
                : datos.etapa === "posmenopausia"
                  ? "Tu registro"
                  : "Tu registro, sin fases"}
            </h2>
            <p style={linea}>
              {conFases
                ? "Marca el primer día de tu última menstruación en el calendario de abajo, y desde ahí te digo en qué fase vas."
                : datos.etapa === "posmenopausia"
                  ? "Ya no hay ciclo que calcular. Puedes anotar cómo te sientes, y si alguna vez hay sangrado, anótalo: se consulta."
                  : "En esta etapa no hay fases propias que calcular. Puedes anotar sangrados y cómo te sientes."}
            </p>
          </>
        )}

        {conFases && elegido === fecha && (
          <button
            type="button"
            style={botonPri}
            data-sin-marca
            onClick={() => {
              if (enRegla && mancha(hoyDia)) {
                document.getElementById("ciclo-anotar")?.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
              }
              cambiarDia(fecha, { flujo: "medio" });
              document.getElementById("ciclo-anotar")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          >
            {enRegla && mancha(hoyDia) ? "Anotar cómo va hoy" : "Me llegó la menstruación hoy"}
          </button>
        )}
      </section>

      {/* ── Calendario ───────────────────── */}
      <section style={panel} aria-label="Calendario">
        <Calendario
          datos={datos}
          mes={mes}
          setMes={setMes}
          elegido={elegido}
          elegir={(t) => {
            setElegido(t);
            setBorrando(false);
          }}
          conFases={conFases}
        />
      </section>

      {/* ── Anotar el día ───────────────── */}
      <section id="ciclo-anotar" style={panel} aria-labelledby="ciclo-dia">
        <h2 id="ciclo-dia" style={{ ...titulo, fontSize: "1.1rem" }}>
          {elegido === fecha ? "Hoy" : fechaCorta(elegido)}
        </h2>
        <p style={subrotulo}>Sangrado</p>
        <div style={chips}>
          {FLUJOS.map((f) => (
            <button
              key={f.id}
              type="button"
              style={chip}
              aria-pressed={datos.dias[elegido]?.flujo === f.id}
              onClick={() =>
                cambiarDia(elegido, { flujo: datos.dias[elegido]?.flujo === f.id ? undefined : (f.id as Flujo) })
              }
            >
              {f.label}
            </button>
          ))}
        </div>
        <p style={subrotulo}>Cómo te sientes</p>
        <div style={chips}>
          {SINTOMAS.map((s) => {
            const tiene = datos.dias[elegido]?.sintomas?.includes(s.id) ?? false;
            return (
              <button
                key={s.id}
                type="button"
                style={chip}
                aria-pressed={tiene}
                onClick={() => {
                  const actuales = datos.dias[elegido]?.sintomas ?? [];
                  cambiarDia(elegido, {
                    sintomas: tiene ? actuales.filter((x) => x !== s.id) : [...actuales, s.id],
                  });
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>
        <label style={{ display: "block", marginTop: "0.9rem" }}>
          <span style={subrotulo}>Nota</span>
          <textarea
            key={elegido}
            defaultValue={datos.dias[elegido]?.nota ?? ""}
            onBlur={(e) => cambiarDia(elegido, { nota: e.target.value })}
            rows={2}
            maxLength={500}
            placeholder="Algo que quieras recordar de este día"
            style={nota}
          />
        </label>
        <p style={{ ...linea, fontSize: "0.85rem", opacity: 0.65, marginTop: "0.5rem" }}>
          Se guarda solo, en este teléfono.
        </p>
      </section>

      {/* ── Consejos ─────────────────────── */}
      {consejos.length > 0 && (
        <section style={panel} aria-labelledby="ciclo-consejos">
          <h2 id="ciclo-consejos" style={{ ...titulo, fontSize: "1.1rem" }}>
            Para hoy
          </h2>
          <ul style={lista}>
            {consejos.map((c) => (
              <li key={c.slice(0, 24)} style={item}>
                {c}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Señales ──────────────────────── */}
      {alertas.length > 0 && (
        <section style={{ ...panel, borderColor: "rgba(221,148,100,0.55)" }} aria-labelledby="ciclo-senales">
          <h2 id="ciclo-senales" style={{ ...titulo, fontSize: "1.1rem", color: "#e8a07a" }}>
            Para conversar con un profesional
          </h2>
          <ul style={lista}>
            {alertas.map((a) => (
              <li key={a.titulo} style={item}>
                <strong style={{ color: "#e8c878", fontWeight: 600 }}>{a.titulo}.</strong> {a.detalle}
              </li>
            ))}
          </ul>
          <p style={{ ...linea, fontSize: "0.85rem", opacity: 0.7, margin: 0 }}>
            La app no diagnostica: te muestra lo que tu registro sugiere mirar.
          </p>
        </section>
      )}

      {/* ── Lo que se repite ─────────────── */}
      {repite.length > 0 && (
        <section style={panel} aria-labelledby="ciclo-repite">
          <h2 id="ciclo-repite" style={{ ...titulo, fontSize: "1.1rem" }}>
            Lo que se repite
          </h2>
          <ul style={lista}>
            {repite.map((r) => (
              <li key={r} style={item}>
                {r}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Tus ciclos ───────────────────── */}
      {historial.length > 0 && (
        <Desplegable titulo={`Tus ciclos: ${historial.length}`}>
          <ul style={lista}>
            {historial.map((c) => {
              const r = todas.find((x) => x.inicio === c.inicio);
              return (
                <li key={c.inicio} style={{ ...item, display: "flex", justifyContent: "space-between", gap: "1rem" }}>
                  <span>Desde el {fechaCorta(c.inicio)}</span>
                  <span style={{ color: "#e8c878" }}>
                    {c.largo} días{r ? ` · menstruación de ${r.dias}` : ""}
                  </span>
                </li>
              );
            })}
          </ul>
        </Desplegable>
      )}

      <Desplegable titulo="Para tu etapa">
        <ul style={lista}>
          {CONSEJO_ETAPA[datos.etapa].map((c) => (
            <li key={c.slice(0, 24)} style={item}>
              {c}
            </li>
          ))}
        </ul>
      </Desplegable>

      <Desplegable titulo="Cómo calcula la app">
        <p style={linea}>
          El largo de tu ciclo es el promedio de tus últimos ciclos anotados (hasta seis), y solo lo uso desde
          el tercero. La ovulación la ubico unos 14 días antes de la menstruación siguiente, porque la segunda mitad
          del ciclo es la estable: la que varía es la primera.
        </p>
        <p style={linea}>
          Es una estimación. Solo en tres de cada diez mujeres los días fértiles caen entre el día 10 y el 17,
          y cambian de un ciclo a otro. <strong style={{ color: "#e8c878" }}>No la uses como anticonceptivo.</strong>
        </p>
        <p style={{ ...linea, margin: 0 }}>
          Los datos se quedan en este teléfono: no se suben a tu cuenta ni a ninguna parte.
        </p>
      </Desplegable>

      <Desplegable titulo="Ajustes">
        <p style={subrotulo}>Tu etapa</p>
        <div style={chips}>
          {ETAPAS.map((e) => (
            <button
              key={e.id}
              type="button"
              style={chip}
              aria-pressed={datos.etapa === e.id}
              onClick={() => guardar({ ...datos, etapa: e.id })}
            >
              {e.label}
            </button>
          ))}
        </div>
        <p style={{ ...subrotulo, marginTop: "1.1rem" }}>Borrar todo</p>
        {borrando ? (
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <button
              type="button"
              style={{ ...botonSec, borderColor: "rgba(221,148,100,0.7)", color: "#e8a07a" }}
              onClick={() => {
                guardar({ dias: {} });
                setBorrando(false);
              }}
            >
              Sí, borrar mi registro
            </button>
            <button type="button" style={botonSec} onClick={() => setBorrando(false)}>
              No, dejarlo
            </button>
          </div>
        ) : (
          <button type="button" style={botonSec} onClick={() => setBorrando(true)}>
            Borrar mi registro de este teléfono
          </button>
        )}
      </Desplegable>

      <p style={{ ...linea, marginTop: "0.6rem" }}>
        Qué hacen las hormonas en cada fase y en cada edad, qué está probado y qué no, y cuándo consultar:{" "}
        <Link prefetch={false} href="/biblioteca/ciclo-menstrual" style={{ color: "rgba(200,160,80,0.9)" }}>
          en la biblioteca
        </Link>
        .
      </p>
    </div>
  );
}

/* ── La primera vez ──────────────────────────────────── */

function Bienvenida({ datos, guardar }: { datos: DatosCiclo; guardar: (d: DatosCiclo) => void }) {
  const [anio, setAnio] = useState(datos.nacimiento ? String(datos.nacimiento) : "");
  const nacimiento = /^\d{4}$/.test(anio) ? Number(anio) : undefined;
  const sugerida = etapaSugerida(nacimiento);
  const [etapa, setEtapa] = useState<Etapa | null>(null);
  const elegida = etapa ?? sugerida;

  return (
    <section style={ahora} aria-labelledby="ciclo-bienvenida">
      <p style={rotulo}>Antes de empezar</p>
      <h2 id="ciclo-bienvenida" style={titulo}>
        Dos preguntas, y listo
      </h2>
      <p style={linea}>
        Con esto ajusto lo que es normal para ti y los consejos. Lo que anotes aquí se queda en este teléfono.
      </p>
      <label style={{ display: "block", margin: "0.9rem 0" }}>
        <span style={subrotulo}>Año en que naciste (opcional)</span>
        <input
          inputMode="numeric"
          pattern="\d{4}"
          maxLength={4}
          value={anio}
          onChange={(e) => setAnio(e.target.value.replace(/\D/g, ""))}
          placeholder="1990"
          style={{ ...nota, maxWidth: 140, display: "block" }}
        />
      </label>
      <p style={subrotulo}>¿En qué etapa estás?</p>
      <div style={{ display: "grid", gap: "0.5rem" }}>
        {ETAPAS.map((e) => (
          <button
            key={e.id}
            type="button"
            aria-pressed={elegida === e.id}
            onClick={() => setEtapa(e.id)}
            style={{ ...chip, textAlign: "left", padding: "0.7rem 0.9rem", width: "100%" }}
          >
            <span style={{ display: "block", color: "#e8c878" }}>{e.label}</span>
            <span style={{ display: "block", fontSize: "0.85rem", opacity: 0.8 }}>{e.linea}</span>
          </button>
        ))}
      </div>
      <button type="button" data-sin-marca style={botonPri} onClick={() => guardar({ ...datos, nacimiento, etapa: elegida })}>
        Empezar
      </button>
    </section>
  );
}

/* ── La rueda del ciclo ──────────────────────────────── */

function Rueda({ largo, dia }: { largo: number; dia: number }) {
  const R = 46;
  const C = 2 * Math.PI * R;
  const ov = diaOvulacion(largo);
  const tramos = [
    { fase: "menstrual", desde: 1, hasta: Math.min(5, ov - 3) },
    { fase: "folicular", desde: Math.min(5, ov - 3) + 1, hasta: ov - 3 },
    { fase: "ovulatoria", desde: ov - 2, hasta: ov + 1 },
    { fase: "lutea", desde: ov + 2, hasta: largo },
  ].filter((t) => t.hasta >= t.desde);
  const ang = ((Math.min(dia, largo) - 0.5) / largo) * 2 * Math.PI - Math.PI / 2;
  return (
    <svg width="116" height="116" viewBox="0 0 116 116" role="img" aria-label={`Día ${dia} de un ciclo de unos ${largo} días`}>
      <g transform="rotate(-90 58 58)">
        {tramos.map((t) => (
          <circle
            key={t.fase}
            cx="58"
            cy="58"
            r={R}
            fill="none"
            stroke={COLOR_FASE[t.fase]}
            strokeOpacity="0.75"
            strokeWidth="10"
            strokeDasharray={`${((t.hasta - t.desde + 1) / largo) * C - 2} ${C}`}
            strokeDashoffset={-((t.desde - 1) / largo) * C}
          />
        ))}
      </g>
      <circle cx={58 + R * Math.cos(ang)} cy={58 + R * Math.sin(ang)} r="8" fill="#0c160c" stroke="#f4e2b0" strokeWidth="2.5" />
      <text x="58" y="56" textAnchor="middle" fontSize="24" fill="#f4e2b0" fontFamily="var(--font-grimoire)">
        {dia}
      </text>
      <text x="58" y="74" textAnchor="middle" fontSize="11" fill="rgba(217,203,170,0.75)" fontFamily="var(--font-crimson), serif">
        de ~{largo}
      </text>
    </svg>
  );
}

/* ── El calendario ───────────────────────────────────── */

function Calendario({
  datos,
  mes,
  setMes,
  elegido,
  elegir,
  conFases,
}: {
  datos: DatosCiclo;
  mes: string;
  setMes: (m: string) => void;
  elegido: string;
  elegir: (t: string) => void;
  conFases: boolean;
}) {
  const fecha = hoy();
  const [a, m] = mes.split("-").map(Number);
  const primero = `${mes}-01`;
  const enMes = new Date(a, m, 0).getDate();
  const corrimiento = (new Date(a, m - 1, 1).getDay() + 6) % 7;
  const mover = (n: number) => {
    const d = new Date(a, m - 1 + n, 1);
    setMes(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  };
  const celdas: (string | null)[] = [
    ...Array.from({ length: corrimiento }, () => null),
    ...Array.from({ length: enMes }, (_, i) => sumarDias(primero, i)),
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
        <button type="button" style={flecha} onClick={() => mover(-1)} aria-label="Mes anterior" data-sin-marca>
          ‹
        </button>
        <h2 style={{ ...titulo, fontSize: "1.05rem", margin: 0 }}>
          {MESES_LARGOS[m - 1]} {a}
        </h2>
        <button
          type="button"
          style={flecha}
          onClick={() => mover(1)}
          aria-label="Mes siguiente"
          data-sin-marca
          disabled={mes >= fecha.slice(0, 7) && !conFases}
        >
          ›
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4 }}>
        {DIAS_SEMANA.map((d, i) => (
          <span key={`${d}${i}`} style={{ ...cabecera }} aria-hidden="true">
            {d}
          </span>
        ))}
        {celdas.map((t, i) => {
          if (!t) return <span key={`v${i}`} />;
          const d = datos.dias[t];
          const futuro = t > fecha;
          const prev = conFases && futuro ? previsto(datos, t) : null;
          const flujo = d?.flujo && d.flujo !== "nada" ? d.flujo : null;
          const fondo =
            flujo === "abundante"
              ? "rgba(200,115,90,0.95)"
              : flujo === "medio"
                ? "rgba(200,115,90,0.7)"
                : flujo === "leve"
                  ? "rgba(200,115,90,0.45)"
                  : flujo === "manchado"
                    ? "rgba(200,115,90,0.2)"
                    : "rgba(12,22,12,0.5)";
          const borde =
            t === elegido
              ? "2px solid #f4e2b0"
              : prev === "regla"
                ? "1.5px dashed rgba(200,115,90,0.9)"
                : prev === "ovulacion"
                  ? "1.5px dashed rgba(232,200,120,0.85)"
                  : t === fecha
                    ? "1.5px solid rgba(232,200,120,0.8)"
                    : "1px solid rgba(200,160,80,0.12)";
          const etiqueta = [
            fechaCorta(t),
            flujo ? `sangrado ${FLUJOS.find((f) => f.id === flujo)?.label.toLowerCase()}` : null,
            d?.sintomas?.length ? `${d.sintomas.length} síntomas` : null,
            prev === "regla" ? "menstruación prevista" : prev === "ovulacion" ? "ovulación estimada" : null,
            t === fecha ? "hoy" : null,
          ]
            .filter(Boolean)
            .join(", ");
          return (
            <button
              key={t}
              type="button"
              data-sin-marca
              disabled={futuro}
              onClick={() => elegir(t)}
              aria-label={etiqueta}
              aria-current={t === elegido ? "date" : undefined}
              style={{
                position: "relative",
                aspectRatio: "1",
                minHeight: 38,
                borderRadius: 8,
                border: borde,
                background: fondo,
                color: flujo === "abundante" || flujo === "medio" ? "#1a0f0a" : futuro ? "rgba(217,203,170,0.45)" : "#e8dcc0",
                fontFamily: "var(--font-crimson), serif",
                fontSize: "0.95rem",
                cursor: futuro ? "default" : "pointer",
                padding: 0,
              }}
            >
              {Number(t.slice(8))}
              {(d?.sintomas?.length || d?.nota) && (
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    bottom: 4,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#e8c878",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
      <p style={{ ...linea, fontSize: "0.82rem", opacity: 0.7, margin: "0.7rem 0 0" }}>
        Toca un día para anotarlo. Relleno: sangrado. Punto: síntomas o nota.
        {conFases ? " Borde punteado: menstruación prevista (rojizo) y ovulación estimada (dorado)." : ""}
      </p>
    </div>
  );
}

/* ── Estilos ─────────────────────────────────────────── */

const panel: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.22)",
  background: "rgba(12,22,12,0.72)",
  backdropFilter: "blur(3px)",
  borderRadius: 10,
  padding: "clamp(0.9rem, 2.6vw, 1.3rem)",
  minWidth: 0,
};

const ahora: CSSProperties = {
  ...panel,
  border: "1px solid rgba(232,200,120,0.5)",
  background: "linear-gradient(160deg, rgba(40,52,24,0.85), rgba(12,22,12,0.85))",
  borderRadius: 12,
};

const rotulo: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.68rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "rgba(200,160,80,0.85)",
  margin: "0 0 0.4rem",
};

const subrotulo: CSSProperties = { ...rotulo, fontSize: "0.62rem", margin: "0.9rem 0 0.45rem", display: "block" };

const titulo: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "clamp(1.15rem, 3vw, 1.4rem)",
  color: "#e8c878",
  letterSpacing: "0.06em",
  margin: "0 0 0.4rem",
  textWrap: "balance",
};

const linea: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "clamp(0.98rem, 2.2vw, 1.05rem)",
  lineHeight: 1.6,
  color: "rgba(217,203,170,0.9)",
  margin: "0 0 0.4rem",
};

const lista: CSSProperties = { listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.6rem" };

const item: CSSProperties = { ...linea, margin: 0 };

const chips: CSSProperties = { display: "flex", flexWrap: "wrap", gap: "0.45rem" };

const chip: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.95rem",
  color: "#e8dcc0",
  background: "rgba(12,22,12,0.6)",
  border: "1px solid rgba(200,160,80,0.35)",
  borderRadius: 999,
  padding: "0.45rem 0.85rem",
  minHeight: 40,
  cursor: "pointer",
};

const botonPri: CSSProperties = {
  marginTop: "1rem",
  width: "100%",
  minHeight: 50,
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.85rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#1a1408",
  background: "linear-gradient(180deg, #e8c878, #c8a050)",
  border: "none",
  borderRadius: 10,
  cursor: "pointer",
};

const botonSec: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.98rem",
  color: "#e8dcc0",
  background: "transparent",
  border: "1px solid rgba(200,160,80,0.45)",
  borderRadius: 8,
  padding: "0.55rem 0.9rem",
  minHeight: 44,
  cursor: "pointer",
};

const flecha: CSSProperties = { ...botonSec, minWidth: 44, padding: "0.2rem 0.6rem", fontSize: "1.3rem", lineHeight: 1 };

const cabecera: CSSProperties = {
  textAlign: "center",
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.65rem",
  color: "rgba(200,160,80,0.7)",
  padding: "0.2rem 0",
};

const nota: CSSProperties = {
  width: "100%",
  fontFamily: "var(--font-crimson), serif",
  fontSize: "1rem",
  color: "#e8dcc0",
  background: "rgba(8,14,8,0.7)",
  border: "1px solid rgba(200,160,80,0.3)",
  borderRadius: 8,
  padding: "0.6rem 0.75rem",
  resize: "vertical",
};

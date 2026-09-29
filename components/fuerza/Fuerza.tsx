"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { campana, contextoDeAudio } from "@/lib/campana";
import {
  AL_TERMINAR,
  AVISOS_CUIDADO,
  CALENTAMIENTO,
  armarSesion,
  siguientePeldano,
  subeDePeldano,
  type Sesion,
} from "@/lib/fuerza/armar";
import { escalera } from "@/lib/fuerza/ejercicios";
import {
  CUIDADOS,
  NOMBRE_EQUIPO,
  NOMBRE_PATRON,
  OBJETIVOS,
  PREFERENCIAS_POR_DEFECTO,
  guardarFuerza,
  hoy,
  leerFuerza,
  sesionesRecientes,
  type Cuidado,
  type Equipo,
  type Guardado,
  type Preferencias,
  type SerieHecha,
} from "@/lib/fuerza/tipos";
import { ayuda, botonLink, botonPri, botonSec, panel, rotulo, tarjeta, titulo } from "@/components/habitos/estilos";

/* La sesión de fuerza.

   Se responde una vez —qué buscas, cuántos días, cuánto rato, qué tienes en
   casa, qué hay que cuidar— y de ahí en adelante, al entrar, la sesión del
   día ya está armada. Rota entre las sesiones de la semana para que ningún
   patrón de movimiento se quede fuera.

   Lo que hace que esto sirva y no sea una lista de ejercicios: se anota
   cuántas repeticiones salieron en cada serie, y cuando llegas al tope del
   rango en todas, la app te sube al siguiente peldaño de esa escalera. Eso es
   la sobrecarga progresiva, que es lo único que de verdad hace crecer un
   músculo. */

type Etapa = "cargando" | "preguntas" | "listo" | "sesion" | "fin";

const EQUIPOS: Equipo[] = ["nada", "silla", "mesa", "escalon", "banda", "mochila", "barra"];

export function Fuerza() {
  const [etapa, setEtapa] = useState<Etapa>("cargando");
  const [g, setG] = useState<Guardado | null>(null);
  const [prefs, setPrefs] = useState<Preferencias>(PREFERENCIAS_POR_DEFECTO);
  const [sesion, setSesion] = useState<Sesion | null>(null);

  const [iEj, setIEj] = useState(0);
  const [hecho, setHecho] = useState<Record<string, SerieHecha[]>>({});
  const [valor, setValor] = useState(0);
  const [descanso, setDescanso] = useState<number | null>(null);
  const [aguante, setAguante] = useState<number | null>(null);
  const [subidas, setSubidas] = useState<{ de: string; a: string }[]>([]);
  const audio = useRef<AudioContext | null>(null);
  const empezado = useRef<number>(0);

  useEffect(() => {
    const leido = leerFuerza();
    setG(leido);
    setPrefs(leido.prefs);
    if (leido.historial.length === 0 && Object.keys(leido.niveles).length === 0) {
      setEtapa("preguntas");
    } else {
      setSesion(armarSesion(leido));
      setEtapa("listo");
    }
  }, []);

  const sonar = useCallback(() => {
    try {
      audio.current ??= contextoDeAudio();
      const ctx = audio.current;
      if (ctx) campana(ctx, ctx.currentTime, 0.6);
    } catch {
      /* sin audio, el número igual llega a cero */
    }
  }, []);

  // El descanso entre series.
  useEffect(() => {
    if (descanso === null) return;
    if (descanso <= 0) {
      if (prefs.aviso) sonar();
      setDescanso(null);
      return;
    }
    const id = setTimeout(() => setDescanso((d) => (d === null ? null : d - 1)), 1000);
    return () => clearTimeout(id);
  }, [descanso, prefs.aviso, sonar]);

  // El cronómetro de los ejercicios que van por tiempo.
  useEffect(() => {
    if (aguante === null) return;
    if (aguante <= 0) {
      if (prefs.aviso) sonar();
      return;
    }
    const id = setTimeout(() => setAguante((a) => (a === null ? null : a - 1)), 1000);
    return () => clearTimeout(id);
  }, [aguante, prefs.aviso, sonar]);

  const guardarPrefs = (p: Preferencias) => {
    const nuevo: Guardado = { ...(g ?? { niveles: {}, historial: [], vuelta: 0, prefs: p }), prefs: p };
    setG(nuevo);
    guardarFuerza(nuevo);
    setSesion(armarSesion(nuevo));
    setEtapa("listo");
  };

  const empezarSesion = () => {
    if (!sesion) return;
    setIEj(0);
    setHecho({});
    setSubidas([]);
    empezado.current = Date.now();
    const primero = sesion.pasos[0];
    setValor(primero ? primero.repes[1] : 0);
    setAguante(null);
    setDescanso(null);
    setEtapa("sesion");
  };

  const paso = sesion?.pasos[iEj];
  const seriesHechas = paso ? (hecho[paso.ejercicio.id] ?? []).length : 0;

  const anotarSerie = (repes: number) => {
    if (!paso) return;
    const previas = hecho[paso.ejercicio.id] ?? [];
    const nuevas = [...previas, { repes }];
    const nuevoHecho = { ...hecho, [paso.ejercicio.id]: nuevas };
    setHecho(nuevoHecho);
    setAguante(null);

    if (nuevas.length >= paso.series) {
      // Ejercicio terminado: al siguiente, sin descanso de por medio.
      const siguiente = sesion?.pasos[iEj + 1];
      if (siguiente) {
        setIEj(iEj + 1);
        setValor(siguiente.repes[1]);
        setDescanso(prefs.descanso);
      } else {
        terminar(nuevoHecho);
      }
      return;
    }
    setValor(paso.repes[1]);
    setDescanso(prefs.descanso);
  };

  const terminar = (hechoFinal: Record<string, SerieHecha[]>) => {
    if (!g || !sesion) return;
    const niveles = { ...g.niveles };
    const subio: { de: string; a: string }[] = [];
    for (const p of sesion.pasos) {
      const series = hechoFinal[p.ejercicio.id] ?? [];
      if (series.length === 0) continue;
      if (subeDePeldano(p.ejercicio, series, p.series)) {
        const sig = siguientePeldano(p.ejercicio);
        if (sig) {
          niveles[p.patron] = sig.nivel;
          subio.push({ de: p.ejercicio.nombre, a: sig.nombre });
        }
      } else if ((niveles[p.patron] ?? 1) < p.ejercicio.nivel) {
        niveles[p.patron] = p.ejercicio.nivel;
      }
    }
    const minutos = Math.max(1, Math.round((Date.now() - empezado.current) / 60000));
    const nuevo: Guardado = {
      ...g,
      niveles,
      vuelta: g.vuelta + 1,
      historial: [{ dia: hoy(), minutos, hecho: hechoFinal }, ...g.historial].slice(0, 120),
    };
    setG(nuevo);
    guardarFuerza(nuevo);
    setSubidas(subio);
    setSesion(armarSesion(nuevo));
    setDescanso(null);
    setEtapa("fin");
  };

  if (etapa === "cargando") return <div style={{ ...panel, minHeight: 260 }} />;

  /* ── Las preguntas ───────────────────────────────────── */
  if (etapa === "preguntas") {
    return (
      <div style={panel}>
        <h2 style={titulo}>Armemos tu rutina</h2>
        <p style={ayuda}>
          Cinco preguntas, una sola vez. De ahí en adelante, al entrar ya está la sesión del día
          lista y subiendo sola cuando te queda corta.
        </p>

        <Pregunta n={1} t="¿Qué buscas?">
          <div style={fila}>
            {OBJETIVOS.map((o) => (
              <Chip
                key={o.id}
                activo={prefs.objetivo === o.id}
                onClick={() => setPrefs({ ...prefs, objetivo: o.id })}
                ancho
              >
                {o.label}
              </Chip>
            ))}
          </div>
          <p style={{ ...ayuda, margin: "0.5rem 0 0" }}>
            {OBJETIVOS.find((o) => o.id === prefs.objetivo)?.linea}
          </p>
        </Pregunta>

        <Pregunta n={2} t="¿Cuántos días a la semana?" nota="Con dos ya se construye músculo. Tres es el punto dulce.">
          <div style={fila}>
            {([2, 3, 4] as const).map((d) => (
              <Chip key={d} activo={prefs.dias === d} onClick={() => setPrefs({ ...prefs, dias: d })}>
                {d} días
              </Chip>
            ))}
          </div>
        </Pregunta>

        <Pregunta n={3} t="¿Cuánto rato tienes?" nota="Quince minutos exigentes valen más que una hora que no haces.">
          <div style={fila}>
            {([15, 25, 35, 45] as const).map((m) => (
              <Chip key={m} activo={prefs.minutos === m} onClick={() => setPrefs({ ...prefs, minutos: m })}>
                {m} min
              </Chip>
            ))}
          </div>
        </Pregunta>

        <Pregunta n={4} t="¿Qué tienes en casa?" nota="Marca todo lo que haya. Con el suelo y una silla ya hay rutina.">
          <div style={fila}>
            {EQUIPOS.map((q) => (
              <Chip
                key={q}
                activo={prefs.equipo.includes(q)}
                onClick={() =>
                  setPrefs({
                    ...prefs,
                    equipo: prefs.equipo.includes(q)
                      ? prefs.equipo.filter((x) => x !== q)
                      : [...prefs.equipo, q],
                  })
                }
                ancho
              >
                {NOMBRE_EQUIPO[q]}
              </Chip>
            ))}
          </div>
        </Pregunta>

        <Pregunta n={5} t="¿Hay algo que cuidar?" nota="Si no hay nada, sigue de largo.">
          <div style={fila}>
            {CUIDADOS.map((c) => (
              <Chip
                key={c.id}
                activo={prefs.cuidados.includes(c.id)}
                onClick={() =>
                  setPrefs({
                    ...prefs,
                    cuidados: prefs.cuidados.includes(c.id)
                      ? prefs.cuidados.filter((x) => x !== c.id)
                      : [...prefs.cuidados, c.id],
                  })
                }
              >
                {c.label}
              </Chip>
            ))}
          </div>
          {prefs.cuidados.map((c) => (
            <p key={c} style={{ ...ayuda, margin: "0.6rem 0 0", color: "rgba(221,148,100,0.9)" }}>
              {AVISOS_CUIDADO[c as Cuidado]}
            </p>
          ))}
        </Pregunta>

        <button type="button" onClick={() => guardarPrefs(prefs)} style={botonPri}>
          Armar mi rutina
        </button>
      </div>
    );
  }

  /* ── La sesión de hoy, antes de empezar ──────────────── */
  if (etapa === "listo" && sesion) {
    const estaSemana = g ? sesionesRecientes(g.historial) : 0;
    return (
      <div style={panel}>
        <p style={rotulo}>{sesion.nombre} · unos {sesion.minutos} minutos</p>
        <h2 style={titulo}>La sesión de hoy</h2>

        <ol style={{ listStyle: "none", margin: "0 0 1.2rem", padding: 0, display: "grid", gap: "0.6rem" }}>
          {sesion.pasos.map((p, i) => (
            <li key={p.ejercicio.id} style={{ ...tarjeta, display: "flex", gap: "0.8rem", minWidth: 0 }}>
              <span style={numero}>{i + 1}</span>
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: "block", color: "#e8c878", fontFamily: "var(--font-crimson), serif", fontSize: "1.02rem" }}>
                  {p.ejercicio.nombre}
                </span>
                <span style={{ ...ayuda, display: "block", margin: "0.15rem 0 0" }}>
                  {NOMBRE_PATRON[p.patron]} · {p.series} series de{" "}
                  {p.ejercicio.porTiempo ? `${p.repes[0]} a ${p.repes[1]} segundos` : `${p.repes[0]} a ${p.repes[1]}`}
                </span>
              </span>
            </li>
          ))}
        </ol>

        {sesion.faltantes.length > 0 && (
          <div style={{ ...tarjeta, borderColor: "rgba(221,148,100,0.3)", marginBottom: "1.2rem" }}>
            {sesion.faltantes.map((f) => (
              <p key={f.patron} style={{ ...ayuda, margin: 0, color: "rgba(221,148,100,0.9)" }}>
                Falta {NOMBRE_PATRON[f.patron].toLowerCase()}: {f.porQue}
              </p>
            ))}
          </div>
        )}

        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "center" }}>
          <button type="button" onClick={empezarSesion} style={botonPri}>
            Empezar
          </button>
          <button type="button" onClick={() => g && setSesion(armarSesion({ ...g, vuelta: g.vuelta + 1 }))} style={botonSec}>
            Otra sesión
          </button>
          <button type="button" onClick={() => setEtapa("preguntas")} style={botonLink}>
            Cambiar respuestas
          </button>
        </div>

        <p style={{ ...ayuda, margin: "1.1rem 0 0" }}>
          {estaSemana === 0
            ? "Todavía no entrenas esta semana."
            : `Llevas ${estaSemana} ${estaSemana === 1 ? "sesión" : "sesiones"} en los últimos siete días.`}{" "}
          {g && g.historial.length > 0 ? `${g.historial.length} en total.` : ""}
        </p>
      </div>
    );
  }

  /* ── Durante la sesión ───────────────────────────────── */
  if (etapa === "sesion" && sesion && paso) {
    const e = paso.ejercicio;
    const chain = escalera(e.patron);
    const peldano = chain.findIndex((x) => x.id === e.id) + 1;

    if (descanso !== null) {
      const siguienteSerie = seriesHechas + 1;
      return (
        <div style={{ ...panel, textAlign: "center" }}>
          <p style={rotulo}>Descanso</p>
          <p style={{ fontFamily: "var(--font-grimoire)", fontSize: "3rem", color: "#e8c878", margin: "0.4rem 0" }}>
            {descanso}
          </p>
          <p style={{ ...ayuda, maxWidth: "30ch", margin: "0 auto 1.2rem" }}>
            Descansar de verdad no es perder tiempo: con menos descanso salen menos repeticiones, y
            las repeticiones son el estímulo.
          </p>
          <p style={{ ...ayuda, marginBottom: "1.2rem", color: "rgba(232,200,120,0.9)" }}>
            Viene: {e.nombre}, serie {siguienteSerie} de {paso.series}.
          </p>
          <button type="button" onClick={() => setDescanso(null)} style={botonSec}>
            Seguir ahora
          </button>
        </div>
      );
    }

    return (
      <div style={panel}>
        <p style={rotulo}>
          Ejercicio {iEj + 1} de {sesion.pasos.length} · {NOMBRE_PATRON[e.patron]}
        </p>
        <h2 style={{ ...titulo, marginBottom: "0.2rem" }}>{e.nombre}</h2>
        <p style={{ ...ayuda, marginBottom: "0.9rem" }}>
          Peldaño {peldano} de {chain.length}
          {e.tambien ? ` · ${e.tambien}` : ""} · serie {seriesHechas + 1} de {paso.series}
        </p>

        <ol style={{ listStyle: "none", margin: "0 0 1rem", padding: 0 }}>
          {e.pasos.map((t, i) => (
            <li key={t.slice(0, 16)} style={{ display: "flex", gap: "0.6rem", marginBottom: "0.45rem" }}>
              <span style={numero}>{i + 1}</span>
              <span style={{ ...textoPaso, flex: 1, minWidth: 0 }}>{t}</span>
            </li>
          ))}
        </ol>

        <div style={{ ...tarjeta, marginBottom: "1rem" }}>
          <p style={{ ...rotulo, margin: "0 0 0.4rem" }}>Ojo con</p>
          {e.errores.map((x) => (
            <p key={x.slice(0, 16)} style={{ ...ayuda, margin: "0 0 0.3rem" }}>
              {x}
            </p>
          ))}
          {e.cuidado && (
            <p style={{ ...ayuda, margin: "0.3rem 0 0", color: "rgba(221,148,100,0.9)" }}>{e.cuidado}</p>
          )}
        </div>

        {e.porTiempo ? (
          <div style={{ textAlign: "center" }}>
            <p style={{ ...ayuda, marginBottom: "0.4rem" }}>
              Meta: entre {e.repes[0]} y {e.repes[1]} segundos.
            </p>
            {aguante === null ? (
              <button type="button" onClick={() => setAguante(e.repes[1])} style={botonPri}>
                Empezar la serie
              </button>
            ) : (
              <>
                <p style={{ fontFamily: "var(--font-grimoire)", fontSize: "2.6rem", color: "#e8c878", margin: "0.3rem 0" }}>
                  {Math.max(0, aguante)}
                </p>
                <button type="button" onClick={() => anotarSerie(e.repes[1] - Math.max(0, aguante))} style={botonPri}>
                  Ya está
                </button>
              </>
            )}
          </div>
        ) : (
          <>
            <p style={{ ...ayuda, marginBottom: "0.5rem" }}>
              ¿Cuántas repeticiones te salieron? La meta de hoy es entre {e.repes[0]} y {e.repes[1]}.
            </p>
            <div style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "1rem" }}>
              <button type="button" onClick={() => setValor((v) => Math.max(0, v - 1))} style={botonRedondo} aria-label="Una menos">
                −
              </button>
              <span
                style={{
                  fontFamily: "var(--font-grimoire)",
                  fontSize: "2rem",
                  color: "#e8c878",
                  minWidth: "2.6ch",
                  textAlign: "center",
                }}
              >
                {valor}
              </span>
              <button type="button" onClick={() => setValor((v) => v + 1)} style={botonRedondo} aria-label="Una más">
                +
              </button>
            </div>
            <button type="button" onClick={() => anotarSerie(valor)} style={botonPri}>
              Serie hecha
            </button>
          </>
        )}

        <div style={{ marginTop: "1rem" }}>
          <button type="button" onClick={() => terminar(hecho)} style={botonLink}>
            Terminar aquí
          </button>
        </div>
      </div>
    );
  }

  /* ── Al terminar ─────────────────────────────────────── */
  if (etapa === "fin") {
    return (
      <div style={panel}>
        <h2 style={titulo}>Hecho</h2>
        {subidas.length > 0 ? (
          <>
            <p style={{ ...ayuda, color: "rgba(168,200,138,0.92)" }}>
              Llegaste al tope del rango, así que subes de peldaño. La próxima vez van a salir menos
              repeticiones y está bien: es el mismo músculo con más carga.
            </p>
            <ul style={{ listStyle: "none", margin: "0 0 1rem", padding: 0 }}>
              {subidas.map((s) => (
                <li key={s.a} style={{ ...tarjeta, marginBottom: "0.5rem" }}>
                  <span style={{ ...ayuda, margin: 0, display: "block" }}>{s.de}</span>
                  <span style={{ color: "#e8c878", fontFamily: "var(--font-crimson), serif" }}>↑ {s.a}</span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p style={ayuda}>
            Quedó anotado. El músculo se construye en las próximas cuarenta y ocho horas, no ahora:
            come proteína y duerme.
          </p>
        )}
        {AL_TERMINAR.map((t) => (
          <p key={t.slice(0, 16)} style={ayuda}>
            {t}
          </p>
        ))}
        <button type="button" onClick={() => setEtapa("listo")} style={botonPri}>
          Volver
        </button>
      </div>
    );
  }

  return null;
}

/* ── Piezas ────────────────────────────────────────────── */

function Pregunta({ n, t, nota, children }: { n: number; t: string; nota?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: "1.3rem" }}>
      <p style={{ ...rotulo, margin: "0 0 0.1rem" }}>Pregunta {n}</p>
      <p style={{ fontFamily: "var(--font-crimson), serif", fontSize: "1.05rem", color: "#e6dcc3", margin: "0 0 0.15rem" }}>
        {t}
      </p>
      {nota && <p style={{ ...ayuda, margin: "0 0 0.5rem" }}>{nota}</p>}
      {children}
    </div>
  );
}

function Chip({
  activo,
  onClick,
  ancho,
  children,
}: {
  activo: boolean;
  onClick: () => void;
  ancho?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activo}
      style={{
        ...botonSec,
        padding: "0 0.9rem",
        minHeight: 42,
        fontSize: "0.62rem",
        ...(ancho ? { minWidth: 130 } : null),
        ...(activo ? { background: "rgba(200,160,80,0.18)", color: "#e8c878" } : null),
      }}
    >
      {children}
    </button>
  );
}

const fila: CSSProperties = { display: "flex", gap: "0.45rem", flexWrap: "wrap" };

const numero: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.7rem",
  color: "rgba(200,160,80,0.75)",
  flexShrink: 0,
  paddingTop: "0.25rem",
  minWidth: "1.2rem",
};

const textoPaso: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "1rem",
  lineHeight: 1.55,
  color: "#d9cbaa",
};

const botonRedondo: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "1.3rem",
  color: "#c8a050",
  background: "transparent",
  border: "1px solid rgba(200,160,80,0.45)",
  borderRadius: "50%",
  width: 48,
  height: 48,
  cursor: "pointer",
  lineHeight: 1,
};

export const CALENTAMIENTO_TEXTOS = CALENTAMIENTO;

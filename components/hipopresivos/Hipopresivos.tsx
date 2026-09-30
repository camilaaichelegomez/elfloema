"use client";

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { Celebracion } from "@/components/florecer/Celebracion";
import { campana, contextoDeAudio } from "@/lib/campana";
import { usarVoz } from "@/lib/voz";
import {
  ACOMODARSE,
  CONDICIONES,
  NIVELES,
  PAUTAS_COMUNES,
  REPETICIONES,
  TEXTO_FASE,
  armarSesion,
  evaluar,
  guardarHipopresivos,
  hoy,
  leerHipopresivos,
  propondriaSubir,
  sesionesSemana,
  tramosDeRepeticion,
  type Fase,
  type Guardado,
  type Nivel,
  type Postura,
  type Preferencias,
} from "@/lib/hipopresivos/practica";
import { SEGURIDAD } from "@/lib/hipopresivos/ciencia";
import { ayuda, botonLink, botonPri, botonSec, panel, rotulo, tarjeta, titulo } from "@/components/habitos/estilos";
import { FiguraHipopresivo } from "./FiguraHipopresivo";

/* La práctica de hipopresivos.

   La primera vez, un chequeo corto: hay condiciones en que la pausa sin
   aire no se hace (embarazo, presión alta) y otras en que conviene esperar o
   consultar antes. De ahí en adelante, al entrar ya está la sesión del día.

   Durante la sesión, la app lleva el ritmo: dice cuándo tomar aire, cuándo
   botarlo, cuándo hacer la pausa y cuándo soltar, con un círculo que crece y
   se achica al ritmo de la respiración. No hay que mirar el reloj. */

type Etapa = "seguridad" | "listo" | "sesion" | "fin";

type Paso = { postura: Postura; iPostura: number; rep: number; fase: Fase | "acomodarse"; segundos: number; respiracion?: number };

const sinSuscribir = () => () => {};

/* Qué hacer con cada condición que pide esperar, en el mismo orden en que
   están escritas en la teoría (lib/hipopresivos/ciencia.ts). */
const CONSEJO_ESPERAR: Record<string, string> = {
  parto: SEGURIDAD.esperar[0],
  cirugia: SEGURIDAD.esperar[1],
  hernia: SEGURIDAD.esperar[2],
  prolapso: SEGURIDAD.esperar[3],
};

function pasosDe(posturas: Postura[], pausa: number, sinPausa: boolean): Paso[] {
  const pasos: Paso[] = [];
  posturas.forEach((postura, iPostura) => {
    pasos.push({ postura, iPostura, rep: 0, fase: "acomodarse", segundos: ACOMODARSE });
    for (let rep = 1; rep <= REPETICIONES; rep++) {
      for (const t of tramosDeRepeticion(pausa, sinPausa)) {
        pasos.push({ postura, iPostura, rep, fase: t.fase, segundos: t.segundos, respiracion: t.respiracion });
      }
    }
  });
  return pasos;
}

const FRASE: Record<Fase, string> = {
  inhala: "Toma aire",
  exhala: "Bota el aire",
  vacia: "Bota todo el aire",
  pausa: "Sin aire. Abre las costillas",
  suelta: "Suelta, y respira tranquila",
};

export function Hipopresivos() {
  const montado = useSyncExternalStore(sinSuscribir, () => true, () => false);
  const [cambiado, setG] = useState<Guardado | null>(null);
  const [elegida, setEtapa] = useState<Etapa | null>(null);
  const [marcadas, setMarcadas] = useState<string[]>([]);
  const [reloj, setReloj] = useState<{ i: number; restante: number } | null>(null);
  const [pausado, setPausado] = useState(false);
  const [hecha, setHecha] = useState<{ minutos: number; semana: number; subir: Nivel | null } | null>(null);
  const audio = useRef<AudioContext | null>(null);
  const empezo = useRef(0);
  const dicho = useRef(-1);
  const despierta = useRef<{ release: () => Promise<void> } | null>(null);
  const cajaRef = useRef<HTMLDivElement>(null);

  // Se lee una vez al montar; después manda lo que se va cambiando.
  const leido = useMemo(() => (montado ? leerHipopresivos() : null), [montado]);
  const g = cambiado ?? leido;
  const sesion = useMemo(() => (g ? armarSesion(g) : null), [g]);
  const pasos = useMemo(
    () => (sesion ? pasosDe(sesion.posturas, sesion.pausa, sesion.sinPausa) : []),
    [sesion],
  );
  const { decir, callar, desbloquear } = usarVoz(g?.prefs.voz ?? true);

  const sonar = useCallback(
    (volumen = 0.6) => {
      if (!g?.prefs.campana) return;
      try {
        audio.current ??= contextoDeAudio();
        const ctx = audio.current;
        if (ctx) campana(ctx, ctx.currentTime, volumen);
      } catch {
        /* sin audio, la práctica sigue */
      }
    },
    [g?.prefs.campana],
  );

  const soltarPantalla = useCallback(() => {
    void despierta.current?.release().catch(() => {});
    despierta.current = null;
  }, []);

  const terminar = useCallback(
    (completa: boolean) => {
      setReloj(null);
      setPausado(false);
      callar();
      soltarPantalla();
      if (!g || !completa) {
        setEtapa("listo");
        return;
      }
      sonar(0.8);
      const minutos = Math.max(1, Math.round((Date.now() - empezo.current) / 60000));
      const nuevo: Guardado = {
        ...g,
        vuelta: g.vuelta + 1,
        historial: [{ dia: hoy(), minutos, nivel: g.prefs.nivel }, ...g.historial].slice(0, 200),
      };
      setG(nuevo);
      guardarHipopresivos(nuevo);
      setHecha({ minutos, semana: sesionesSemana(nuevo), subir: propondriaSubir(nuevo) });
      setEtapa("fin");
    },
    [g, callar, soltarPantalla, sonar],
  );

  // El reloj: baja de a un segundo y pasa al tramo siguiente al llegar a cero.
  useEffect(() => {
    if (!reloj || pausado) return;
    const id = setTimeout(() => {
      if (reloj.restante > 1) {
        setReloj({ ...reloj, restante: reloj.restante - 1 });
        return;
      }
      const sig = reloj.i + 1;
      if (sig >= pasos.length) {
        terminar(true);
        return;
      }
      // La campana marca el fin de la pausa: ahí se suelta.
      if (pasos[reloj.i].fase === "pausa") sonar(0.45);
      setReloj({ i: sig, restante: pasos[sig].segundos });
    }, 1000);
    return () => clearTimeout(id);
  }, [reloj, pausado, pasos, terminar, sonar]);

  // La voz: una frase por tramo, dicha una sola vez.
  const iActual = reloj?.i ?? -1;
  useEffect(() => {
    if (iActual < 0 || iActual === dicho.current) return;
    dicho.current = iActual;
    const p = pasos[iActual];
    if (!p) return;
    if (p.fase === "acomodarse") {
      decir(`${p.postura.nombre}. ${p.postura.pasos.join(" ")}`, { velocidad: 0.95 });
    } else if (p.fase === "inhala" && p.respiracion && p.respiracion > 1) {
      // Las respiraciones de en medio van en silencio: el círculo marca el ritmo.
      return;
    } else if (p.fase === "exhala" && p.respiracion && p.respiracion > 1) {
      return;
    } else {
      // En la pausa, si la postura mueve algo (Atenea sube los brazos), se dice ahí.
      const extra = p.fase === "pausa" && p.postura.enPausa ? ` ${p.postura.enPausa}` : "";
      decir(`${FRASE[p.fase]}.${extra}`, { velocidad: 0.9 });
    }
  }, [iActual, pasos, decir]);

  /* Al empezar y en cada postura nueva, la pantalla sube hasta la práctica:
     el círculo tiene que quedar a la vista entero, sin tener que buscarlo. */
  const iPostura = reloj ? (pasos[reloj.i]?.iPostura ?? -1) : -1;
  useEffect(() => {
    if (iPostura < 0) return;
    cajaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [iPostura]);

  if (!g || !sesion) return <div style={{ ...panel, minHeight: 260 }} />;
  const etapa: Etapa = elegida ?? (g.seguridad.respondida ? "listo" : "seguridad");

  const guardarPrefs = (p: Partial<Preferencias>) => {
    const nuevo = { ...g, prefs: { ...g.prefs, ...p } };
    setG(nuevo);
    guardarHipopresivos(nuevo);
  };

  const empezar = async () => {
    if (g.prefs.voz) desbloquear();
    audio.current ??= contextoDeAudio();
    empezo.current = Date.now();
    dicho.current = -1;
    setPausado(false);
    setReloj({ i: 0, restante: pasos[0].segundos });
    setEtapa("sesion");
    sonar(0.5);
    // Que la pantalla no se apague a mitad de la práctica.
    try {
      const nav = navigator as Navigator & { wakeLock?: { request: (t: "screen") => Promise<{ release: () => Promise<void> }> } };
      despierta.current = (await nav.wakeLock?.request("screen")) ?? null;
    } catch {
      /* si no se puede, la práctica sigue igual */
    }
  };

  /* ── El chequeo de seguridad ─────────────────────────────── */
  if (etapa === "seguridad") {
    return (
      <div style={panel}>
        <h2 style={titulo}>Antes de empezar</h2>
        <p style={ayuda}>
          Hay casos en que la pausa sin aire no se hace, y casos en que conviene esperar. Marca lo
          que te pase; si no te pasa nada, sigue sin marcar. Se pregunta una sola vez y queda en
          este aparato.
        </p>
        <div style={{ display: "grid", gap: "0.5rem", marginBottom: "1.2rem" }}>
          {CONDICIONES.map((c) => {
            const on = marcadas.includes(c.id);
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => setMarcadas(on ? marcadas.filter((x) => x !== c.id) : [...marcadas, c.id])}
                style={{ ...opcion, textAlign: "left" }}
              >
                {c.texto}
              </button>
            );
          })}
        </div>
        <button
          type="button"
          style={{ ...botonPri, width: "100%", minHeight: 48 }}
          onClick={() => {
            const nuevo = { ...g, seguridad: evaluar(marcadas) };
            setG(nuevo);
            guardarHipopresivos(nuevo);
            setEtapa("listo");
          }}
        >
          {marcadas.length === 0 ? "No me pasa nada de esto" : "Listo"}
        </button>
      </div>
    );
  }

  /* ── La sesión en curso ─────────────────────────────────── */
  if (etapa === "sesion" && reloj) {
    const p = pasos[reloj.i];
    const total = sesion.posturas.length;
    return (
      <div ref={cajaRef} style={{ ...panel, textAlign: "center", scrollMarginTop: "4.5rem" }}>
        <p style={rotulo}>
          Postura {p.iPostura + 1} de {total}
          {p.rep > 0 ? ` · repetición ${p.rep} de ${REPETICIONES}` : ""}
        </p>
        <h2 style={{ ...titulo, marginBottom: "0.8rem" }}>{p.postura.nombre}</h2>

        {p.fase === "acomodarse" ? (
          <>
            <FiguraHipopresivo figura={p.postura.figura} nombre={p.postura.nombre} alto={200} />
            <ol style={{ ...ayuda, textAlign: "left", maxWidth: "46ch", margin: "0 auto 1rem", paddingLeft: "1.2rem" }}>
              {p.postura.pasos.map((x) => (
                <li key={x} style={{ marginBottom: "0.35rem" }}>
                  {x}
                </li>
              ))}
            </ol>
            <p style={{ ...ayuda, color: "#e8c878" }}>Acomódate: empezamos en {reloj.restante}</p>
          </>
        ) : (
          <>
            <Respiracion fase={p.fase} segundos={p.segundos} restante={reloj.restante} />
            <p aria-live="polite" style={faseTexto}>
              {TEXTO_FASE[p.fase]}
            </p>
            {p.fase === "pausa" ? (
              <p style={{ ...ayuda, maxWidth: "36ch", margin: "0 auto 1rem" }}>
                {p.postura.enPausa && (
                  <strong style={{ display: "block", color: "#f2dc9c", marginBottom: "0.3rem" }}>
                    {p.postura.enPausa}
                  </strong>
                )}
                Como si fueras a tomar aire, sin dejarlo entrar. El ombligo se va solo hacia adentro.
              </p>
            ) : (
              <p style={{ ...ayuda, maxWidth: "40ch", margin: "0 auto 1rem", opacity: 0.85 }}>{p.postura.ojo}</p>
            )}
          </>
        )}

        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button
            type="button"
            style={botonSec}
            onClick={() => {
              if (!pausado) callar();
              setPausado(!pausado);
            }}
          >
            {pausado ? "Seguir" : "Pausa"}
          </button>
          <button
            type="button"
            style={botonSec}
            onClick={() => {
              // Saltar a la próxima postura (o terminar si era la última).
              const sig = pasos.findIndex((x, k) => k > reloj.i && x.fase === "acomodarse");
              if (sig < 0) terminar(true);
              else setReloj({ i: sig, restante: pasos[sig].segundos });
            }}
          >
            Siguiente postura
          </button>
        </div>
        <button type="button" style={{ ...botonLink, marginTop: "0.9rem" }} onClick={() => terminar(false)}>
          Salir
        </button>
        <p style={{ ...ayuda, fontSize: "0.82rem", marginTop: "1rem", marginBottom: 0 }}>
          Si te mareas o ves puntitos, suelta la pausa y respira.
        </p>
      </div>
    );
  }

  /* ── El final ──────────────────────────────────────────── */
  if (etapa === "fin" && hecha) {
    const nivelSig = hecha.subir ? NIVELES.find((n) => n.id === hecha.subir) : null;
    return (
      <div style={{ ...panel, textAlign: "center" }}>
        <Celebracion />
        <p style={rotulo}>Terminaste</p>
        <h2 style={titulo}>
          {hecha.semana > 1 ? `${hecha.semana} sesiones esta semana` : "Sesión hecha"}
        </h2>
        <p style={{ ...ayuda, maxWidth: "44ch", margin: "0 auto 1.2rem" }}>
          Lo que se nota primero es que la costilla se abre más fácil. Los cambios en los síntomas,
          en los estudios, aparecen después de unas ocho semanas con al menos dos sesiones por semana.
        </p>
        {nivelSig && (
          <div style={{ ...tarjeta, maxWidth: 420, margin: "0 auto 1.2rem" }}>
            <p style={{ ...ayuda, margin: "0 0 0.7rem", color: "#e8c878" }}>
              Llevas ocho sesiones en este nivel. Si la costilla se abre bien, puedes subir a «
              {nivelSig.label}»: pausas de {nivelSig.pausa} segundos y posturas nuevas.
            </p>
            <button type="button" style={botonPri} onClick={() => { guardarPrefs({ nivel: nivelSig.id }); setEtapa("listo"); }}>
              Subir de nivel
            </button>
          </div>
        )}
        <button type="button" style={botonSec} onClick={() => setEtapa("listo")}>
          Volver
        </button>
      </div>
    );
  }

  /* ── La sesión del día, lista ────────────────────────────── */
  const nivel = NIVELES.find((n) => n.id === g.prefs.nivel)!;
  return (
    <div style={panel}>
      {g.seguridad.esperar && (
        <div style={{ ...tarjeta, borderColor: "rgba(221,148,100,0.45)", marginBottom: "1rem" }}>
          <p style={{ ...ayuda, margin: 0, color: "rgba(221,148,100,0.95)" }}>
            Por lo que marcaste, lo mejor es consultar antes de empezar:{" "}
            {g.seguridad.marcadas
              .map((id) => CONSEJO_ESPERAR[id])
              .filter(Boolean)
              .join(" ")}
          </p>
        </div>
      )}
      {g.seguridad.sinPausa && (
        <div style={{ ...tarjeta, marginBottom: "1rem" }}>
          <p style={{ ...ayuda, margin: 0, color: "#e8c878" }}>
            Tu práctica va sin la pausa sin aire: postura y respiración lenta, que es lo que se puede
            hacer en el embarazo o con presión alta. Conversa con tu matrona o tu médica antes de
            empezar.
          </p>
        </div>
      )}

      <p style={rotulo}>La sesión de hoy</p>
      <h2 style={titulo}>
        {sesion.posturas.length} {sesion.posturas.length === 1 ? "postura" : "posturas"} · unos {g.prefs.minutos} minutos
      </h2>
      <p style={ayuda}>
        {sesion.sinPausa
          ? "Tres respiraciones lentas y una exhalación larga, tres veces por postura."
          : `Tres respiraciones y una pausa de ${sesion.pausa} segundos con las costillas abiertas, tres veces por postura.`}
      </p>

      <ol style={{ listStyle: "none", margin: "0 0 1.2rem", padding: 0, display: "grid", gap: "0.45rem" }}>
        {sesion.posturas.map((p, i) => (
          <li key={`${p.id}-${i}`} style={{ ...tarjeta, display: "flex", gap: "0.7rem", alignItems: "baseline" }}>
            <span style={{ ...rotulo, margin: 0 }}>{i + 1}</span>
            <span style={{ fontFamily: "var(--font-crimson), serif", color: "#e8c878" }}>{p.nombre}</span>
          </li>
        ))}
      </ol>

      <button type="button" style={{ ...botonPri, width: "100%", minHeight: 52, fontSize: "0.82rem" }} onClick={empezar}>
        Empezar
      </button>

      <p style={{ ...ayuda, marginTop: "1rem", marginBottom: "0.6rem" }}>
        Con el estómago vacío (un par de horas después de comer) sale mejor.
      </p>

      <details style={{ marginTop: "0.6rem" }}>
        <summary style={{ ...botonLink, display: "inline-block" }}>Ajustar nivel, rato y sonido</summary>
        <div style={{ marginTop: "0.9rem" }}>
          <p style={{ ...rotulo, marginBottom: "0.4rem" }}>Nivel</p>
          <div style={{ display: "grid", gap: "0.45rem", marginBottom: "1rem" }}>
            {NIVELES.map((n) => (
              <button
                key={n.id}
                type="button"
                aria-pressed={g.prefs.nivel === n.id}
                onClick={() => guardarPrefs({ nivel: n.id })}
                style={{ ...opcion, textAlign: "left" }}
              >
                <span style={{ display: "block" }}>{n.label}</span>
                <span style={{ display: "block", fontSize: "0.82rem", opacity: 0.75 }}>{n.linea}</span>
              </button>
            ))}
          </div>
          <p style={{ ...rotulo, marginBottom: "0.4rem" }}>Cuánto rato</p>
          <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            {([5, 10, 15, 20] as const).map((m) => (
              <button key={m} type="button" aria-pressed={g.prefs.minutos === m} onClick={() => guardarPrefs({ minutos: m })} style={opcion}>
                {m} min
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap" }}>
            <button type="button" aria-pressed={g.prefs.voz} onClick={() => guardarPrefs({ voz: !g.prefs.voz })} style={opcion}>
              Voz que guía
            </button>
            <button type="button" aria-pressed={g.prefs.campana} onClick={() => guardarPrefs({ campana: !g.prefs.campana })} style={opcion}>
              Campana
            </button>
          </div>
          <button
            type="button"
            style={{ ...botonLink, marginTop: "1rem" }}
            onClick={() => {
              setMarcadas(g.seguridad.marcadas);
              setEtapa("seguridad");
            }}
          >
            Volver a responder el chequeo de seguridad
          </button>
        </div>
      </details>

      <p style={{ ...ayuda, marginTop: "1rem", marginBottom: 0, fontSize: "0.85rem" }}>
        En cada postura. {PAUTAS_COMUNES.join(" ")}
      </p>
      <p style={{ ...ayuda, marginTop: "0.5rem", marginBottom: 0, fontSize: "0.85rem" }}>
        {nivel.label} · {g.historial.length} {g.historial.length === 1 ? "sesión" : "sesiones"} en total.
      </p>
    </div>
  );
}

/* El círculo que respira: crece al tomar aire, se achica al botarlo, se
   queda chico y quieto en la pausa con un anillo que marca los segundos. */
function Respiracion({ fase, segundos, restante }: { fase: Fase; segundos: number; restante: number }) {
  const grande = fase === "inhala";
  const chico = fase === "vacia" || fase === "pausa";
  const escala = grande ? 1 : chico ? 0.55 : fase === "suelta" ? 0.8 : 0.7;
  const perimetro = 2 * Math.PI * 70;
  const avance = 1 - restante / segundos;
  return (
    <div style={{ position: "relative", width: 180, height: 180, margin: "0.4rem auto 0.8rem" }} aria-hidden="true">
      <svg viewBox="0 0 160 160" width="180" height="180" style={{ position: "absolute", inset: 0 }}>
        <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(200,160,80,0.14)" strokeWidth="3" />
        {fase === "pausa" && (
          <circle
            cx="80"
            cy="80"
            r="70"
            fill="none"
            stroke="#a8c88a"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={perimetro}
            strokeDashoffset={perimetro * (1 - avance)}
            transform="rotate(-90 80 80)"
            style={{ transition: "stroke-dashoffset 0.95s linear" }}
          />
        )}
      </svg>
      <div
        className="hipo-circulo"
        style={{
          position: "absolute",
          inset: 22,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,200,120,0.35), rgba(200,160,80,0.08))",
          border: "1px solid rgba(232,200,120,0.5)",
          transform: `scale(${escala})`,
          transition: `transform ${fase === "pausa" ? 0.4 : segundos}s ease-in-out`,
        }}
      />
      <span
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          placeItems: "center",
          fontFamily: "var(--font-grimoire)",
          fontSize: "1.7rem",
          color: "#f2dc9c",
        }}
      >
        {restante}
      </span>
    </div>
  );
}

const opcion: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.96rem",
  color: "#d4c4a0",
  background: "rgba(13,26,13,0.5)",
  border: "1px solid rgba(200,160,80,0.28)",
  borderRadius: 5,
  padding: "0.6rem 0.85rem",
  minHeight: 44,
  cursor: "pointer",
};

const faseTexto: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "clamp(1.05rem, 4vw, 1.3rem)",
  letterSpacing: "0.05em",
  color: "#f2dc9c",
  margin: "0 0 0.6rem",
};

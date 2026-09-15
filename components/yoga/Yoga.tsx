"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { armarRutina, enBloques, porFase, type Rutina } from "@/lib/yoga/armar";
import { CHAKRAS, type Chakra } from "@/lib/yoga/chakras";
import { hayVoz, unirFrases, usarVoz } from "@/lib/voz";
import {
  CUIDADOS,
  ESTILOS,
  ETIQUETA_FASE,
  INTENSIDADES,
  MINUTOS,
  MOMENTOS,
  NIVELES,
  OBJETIVOS,
  PREFERENCIAS_POR_DEFECTO,
  PROPS,
  mmss,
  type Cuidado,
  type Estilo,
  type Objetivo,
  type Preferencias,
  type Prop,
} from "@/lib/yoga/tipos";
import { FiguraYoga } from "./FiguraYoga";
import { AsesorYoga } from "./AsesorYoga";

/* La app de la práctica.

   Dos decisiones mandan sobre el resto:

   1. LAS PREFERENCIAS SE GUARDAN. El cuestionario largo se responde UNA vez.
      Después, al abrir, la práctica del día ya está armada y lo único que se
      pregunta es si hoy cambió algo — cuánto rato tienes y cómo amaneciste.
      Nadie va a contestar catorce preguntas cada mañana antes de estirar.

   2. EN LA RUTINA NO SE TOCA LA PANTALLA. Estás en el suelo, con las manos
      ocupadas y muchas veces con los ojos cerrados. Así que avanza sola, suena
      al cambiar de postura, avisa el cambio de lado y la letra es grande para
      leerla de lejos.

   Lo que se guarda vive solo en este teléfono o computador (localStorage).
   No se sube a ningún lado. */

type Etapa = "preferencias" | "resumen" | "rutina" | "guiado" | "final";

const CLAVE = "floema-yoga";

type Sesion = { dia: string; minutos: number; objetivos: Objetivo[] };

type Guardado = {
  prefs: Preferencias;
  racha: number;
  ultimoDia: string;
  historial: Sesion[];
};

const hoy = () => new Date().toISOString().slice(0, 10);
const ayer = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
};

function leerGuardado(): Guardado | null {
  try {
    const raw = localStorage.getItem(CLAVE);
    if (!raw) return null;
    const g = JSON.parse(raw) as Guardado;
    // Mezcla con los valores por defecto: si mañana agrego una pregunta nueva,
    // lo guardado antes no se rompe.
    return { ...g, prefs: { ...PREFERENCIAS_POR_DEFECTO, ...g.prefs } };
  } catch {
    return null;
  }
}

function guardar(g: Guardado) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(g));
  } catch {
    /* Modo privado o almacenamiento lleno: la práctica funciona igual, solo
       que hay que volver a responder la próxima vez. */
  }
}

/* Un tono corto al cambiar de postura, y uno doble al cambiar de lado. Sin
   archivos de audio: se genera. */
function usarPitido(activo: boolean) {
  const ctxRef = useRef<AudioContext | null>(null);
  return useCallback(
    (doble = false) => {
      if (!activo) return;
      try {
        type ConAudio = typeof window & { webkitAudioContext?: typeof AudioContext };
        const Ctor = window.AudioContext ?? (window as ConAudio).webkitAudioContext;
        if (!Ctor) return;
        const ctx = (ctxRef.current ??= new Ctor());
        if (ctx.state === "suspended") void ctx.resume();
        const tono = (retraso: number, hz: number) => {
          const osc = ctx.createOscillator();
          const vol = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = hz;
          const t = ctx.currentTime + retraso;
          vol.gain.setValueAtTime(0, t);
          vol.gain.linearRampToValueAtTime(0.13, t + 0.03);
          vol.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
          osc.connect(vol).connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.52);
        };
        tono(0, 528);
        if (doble) tono(0.4, 704);
      } catch {
        /* Sin audio: no pasa nada. */
      }
    },
    [activo]
  );
}

export function Yoga() {
  const [listo, setListo] = useState(false);
  const [etapa, setEtapa] = useState<Etapa>("preferencias");
  const [prefs, setPrefs] = useState<Preferencias>(PREFERENCIAS_POR_DEFECTO);
  const [rutina, setRutina] = useState<Rutina | null>(null);
  const [racha, setRacha] = useState(0);
  const [historial, setHistorial] = useState<Sesion[]>([]);

  const [indice, setIndice] = useState(0);
  const [restante, setRestante] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  const [segundoLado, setSegundoLado] = useState(false);

  const pitar = usarPitido(prefs.sonido);
  const { decir, callar, desbloquear } = usarVoz(prefs.voz);
  const wakeRef = useRef<{ release: () => Promise<void> } | null>(null);
  const cajaRef = useRef<HTMLDivElement | null>(null);
  const primeraVista = useRef(true);

  /* Al cambiar de pantalla (armar, empezar, terminar) la vista sube al panel.
     Sin esto te quedas donde estaba el botón, mirando texto, y parece que la
     app no hizo nada. La primera carga no se toca: ahí el panel ya está
     arriba y mover la página sola es peor. */
  useEffect(() => {
    if (primeraVista.current) {
      primeraVista.current = false;
      return;
    }
    cajaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [etapa]);

  // Recupera lo guardado. Si ya hay preferencias, se salta el cuestionario.
  useEffect(() => {
    const g = leerGuardado();
    if (g) {
      setPrefs(g.prefs);
      setRacha(g.ultimoDia === hoy() || g.ultimoDia === ayer() ? g.racha : 0);
      setHistorial(g.historial ?? []);
      if (g.prefs.objetivos.length > 0) {
        const r = armarRutina(g.prefs);
        setRutina(r);
        setRestante(r.pasos[0]?.duracion ?? 0);
        setEtapa("rutina");
      }
    }
    setListo(true);
  }, []);

  const pasoActual = rutina?.pasos[indice];

  /* El temporizador. Cuando la postura es por lado, a la mitad suena doble y
     cambia el rótulo: el cuerpo tiene que saber cuándo cambiar sin mirar. */
  useEffect(() => {
    if (!corriendo || !rutina || !pasoActual) return;
    const id = setInterval(() => {
      setRestante((r) => {
        const mitad = Math.round(pasoActual.duracion / 2);
        if (pasoActual.porLado && !pasoActual.secuencia && r === mitad + 1) {
          setSegundoLado(true);
          pitar(true);
        }
        if (r > 1) return r - 1;
        const siguiente = indice + 1;
        if (siguiente >= rutina.pasos.length) {
          setCorriendo(false);
          setEtapa("final");
          pitar(true);
          return 0;
        }
        setIndice(siguiente);
        setSegundoLado(false);
        pitar();
        return rutina.pasos[siguiente].duracion;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [corriendo, indice, rutina, pasoActual, pitar]);

  /* La voz dice la postura al entrar en ella. Cuánto dice depende del caso:
     en una serie que se repite, a la segunda vuelta ya no hace falta repetir
     las instrucciones completas — molesta más de lo que ayuda. */
  useEffect(() => {
    if (etapa !== "guiado" || !pasoActual || !corriendo) return;
    const enVuelta = pasoActual.secuencia?.vuelta ?? 1;
    const partes: string[] = [pasoActual.nombre];
    if (pasoActual.secuencia?.lado) partes.push(`lado ${pasoActual.secuencia.lado}`);
    else if (pasoActual.porLado) partes.push("Empieza por un lado");

    if (enVuelta === 1) {
      const lineas = pasoActual.duracion < 20 ? pasoActual.como.slice(0, 1) : pasoActual.como;
      partes.push(...lineas);
      if (pasoActual.cuidado) partes.push(pasoActual.cuidado);
    }
    decir(unirFrases(partes));
    // Solo cuando cambia el paso: no hay que releer al pausar y seguir.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indice, etapa]);

  // Avisa el cambio de lado sin que haya que mirar la pantalla.
  useEffect(() => {
    if (etapa !== "guiado" || !segundoLado) return;
    decir("Cambia de lado");
  }, [segundoLado, etapa, decir]);

  // Al pausar o salir, se calla.
  useEffect(() => {
    if (!corriendo) callar();
  }, [corriendo, callar]);

  // Que no se apague la pantalla a mitad de la práctica.
  useEffect(() => {
    type ConWakeLock = Navigator & {
      wakeLock?: { request: (t: "screen") => Promise<{ release: () => Promise<void> }> };
    };
    const nav = navigator as ConWakeLock;
    if (etapa === "guiado" && corriendo && nav.wakeLock) {
      nav.wakeLock
        .request("screen")
        .then((s) => (wakeRef.current = s))
        .catch(() => {});
    }
    return () => {
      void wakeRef.current?.release().catch(() => {});
      wakeRef.current = null;
    };
  }, [etapa, corriendo]);

  // Al terminar: racha, historial y preferencias quedan guardadas.
  useEffect(() => {
    if (etapa !== "final") return;
    const g = leerGuardado();
    const seguido = g?.ultimoDia === ayer();
    const yaHoy = g?.ultimoDia === hoy();
    const nueva = yaHoy ? g?.racha ?? 1 : seguido ? (g?.racha ?? 0) + 1 : 1;
    const sesion: Sesion = { dia: hoy(), minutos: prefs.minutos, objetivos: prefs.objetivos };
    const nuevoHistorial = [sesion, ...(g?.historial ?? [])].slice(0, 60);
    setRacha(nueva);
    setHistorial(nuevoHistorial);
    guardar({ prefs, racha: nueva, ultimoDia: hoy(), historial: nuevoHistorial });
  }, [etapa, prefs]);

  const guardarPrefs = useCallback((p: Preferencias) => {
    setPrefs(p);
    const g = leerGuardado();
    guardar({
      prefs: p,
      racha: g?.racha ?? 0,
      ultimoDia: g?.ultimoDia ?? "",
      historial: g?.historial ?? [],
    });
  }, []);

  function alternar<T>(lista: T[], valor: T): T[] {
    return lista.includes(valor) ? lista.filter((x) => x !== valor) : [...lista, valor];
  }

  function armar(p: Preferencias = prefs) {
    const r = armarRutina(p);
    setRutina(r);
    setIndice(0);
    setSegundoLado(false);
    setRestante(r.pasos[0]?.duracion ?? 0);
    setEtapa("rutina");
  }

  function empezar() {
    if (!rutina) return;
    desbloquear();
    setIndice(0);
    setSegundoLado(false);
    setRestante(rutina.pasos[0]?.duracion ?? 0);
    setEtapa("guiado");
    setCorriendo(true);
    pitar();
  }

  function irA(n: number) {
    if (!rutina) return;
    const i = Math.max(0, Math.min(rutina.pasos.length - 1, n));
    setIndice(i);
    setSegundoLado(false);
    setRestante(rutina.pasos[i].duracion);
  }

  const transcurrido = useMemo(() => {
    if (!rutina) return 0;
    const previos = rutina.pasos.slice(0, indice).reduce((a, p) => a + p.duracion, 0);
    return previos + ((pasoActual?.duracion ?? 0) - restante);
  }, [rutina, indice, restante, pasoActual]);

  if (!listo) {
    return <div style={{ ...panel, minHeight: 200 }} aria-busy="true" />;
  }

  // ══ Preferencias ═════════════════════════════════════════════
  if (etapa === "preferencias") {
    const yaRespondio = prefs.objetivos.length > 0;
    return (
      <div ref={cajaRef} style={{ ...panel, scrollMarginTop: "5.5rem" }}>
        <p style={paso}>Tus preferencias</p>
        <p style={ayuda}>
          Esto se responde una sola vez. Queda guardado en este dispositivo y la próxima vez que
          entres la práctica ya va a estar armada.
        </p>

        <Pregunta n={1} titulo="¿Qué quieres trabajar?" nota="Marca todo lo que aplique.">
          <Chips
            opciones={OBJETIVOS}
            activo={(o) => prefs.objetivos.includes(o.id)}
            onClick={(o) => setPrefs({ ...prefs, objetivos: alternar(prefs.objetivos, o.id) })}
          />
        </Pregunta>

        <Pregunta n={2} titulo="¿Cuánto rato tienes?">
          <div style={fila}>
            {MINUTOS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setPrefs({ ...prefs, minutos: m })}
                aria-pressed={prefs.minutos === m}
                style={{ ...chip, ...(prefs.minutos === m ? chipActivo : null), minWidth: 92 }}
              >
                {m} minutos
              </button>
            ))}
          </div>
        </Pregunta>

        <Pregunta
          n={3}
          titulo="¿A qué hora practicas normalmente?"
          nota="De mañana pesa el movimiento; de noche, todo baja hacia el suelo."
        >
          <Chips
            opciones={MOMENTOS}
            activo={(m) => prefs.momento === m.id}
            onClick={(m) => setPrefs({ ...prefs, momento: m.id })}
          />
        </Pregunta>

        <Pregunta n={4} titulo="¿Cuánta experiencia tienes?">
          <Chips
            opciones={NIVELES}
            activo={(n) => prefs.nivel === n.id}
            onClick={(n) => setPrefs({ ...prefs, nivel: n.id })}
          />
        </Pregunta>

        <Pregunta n={5} titulo="¿Qué tan exigente la quieres?">
          <Chips
            opciones={INTENSIDADES}
            activo={(i) => prefs.intensidad === i.id}
            onClick={(i) => setPrefs({ ...prefs, intensidad: i.id })}
          />
        </Pregunta>

        <Pregunta
          n={6}
          titulo="¿Qué estilos te gustan?"
          nota="Si no conoces ninguno, no marques nada: te armo una práctica clásica y vas viendo cuál te acomoda."
        >
          <Chips
            opciones={ESTILOS.map((e) => ({ id: e.id, label: e.label, detalle: e.sensacion }))}
            activo={(e) => prefs.estilos.includes(e.id as Estilo)}
            onClick={(e) => setPrefs({ ...prefs, estilos: alternar(prefs.estilos, e.id as Estilo) })}
          />
        </Pregunta>

        <Pregunta
          n={7}
          titulo="¿Con qué cuentas?"
          nota="No hace falta comprar nada: al lado de cada cosa dice con qué se reemplaza."
        >
          <div style={{ display: "grid", gap: "0.4rem" }}>
            {PROPS.map((p) => {
              const activo = prefs.props.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPrefs({ ...prefs, props: alternar(prefs.props, p.id as Prop) })}
                  aria-pressed={activo}
                  style={{
                    ...chip,
                    display: "flex",
                    gap: "0.7rem",
                    alignItems: "baseline",
                    ...(activo ? chipActivo : null),
                  }}
                >
                  <span style={{ minWidth: 92, color: activo ? "#e8c878" : "#d4c4a0" }}>{p.label}</span>
                  <span style={{ fontSize: "0.82rem", opacity: 0.62 }}>
                    {p.detalle} · si no tienes: {p.casero}
                  </span>
                </button>
              );
            })}
          </div>
        </Pregunta>

        <Pregunta
          n={8}
          titulo="¿Hay algo que cuidar?"
          nota="Esto no es un formulario de trámite: cada cosa que marques saca posturas de la rutina, y te digo cuáles."
        >
          <div style={{ display: "grid", gap: "0.4rem" }}>
            {CUIDADOS.map((c) => {
              const activo = prefs.cuidados.includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setPrefs({ ...prefs, cuidados: alternar(prefs.cuidados, c.id as Cuidado) })}
                  aria-pressed={activo}
                  style={{
                    ...chip,
                    ...(activo
                      ? { borderColor: "#dd9464", background: "rgba(221,148,100,0.12)", color: "#dd9464" }
                      : null),
                  }}
                >
                  <span style={{ fontSize: "0.94rem", display: "block" }}>{c.label}</span>
                  <span style={{ fontSize: "0.8rem", opacity: 0.62, display: "block" }}>
                    {activo ? c.quita : c.detalle}
                  </span>
                </button>
              );
            })}
          </div>
        </Pregunta>

        <Pregunta
          n={9}
          titulo="¿Quieres trabajar algún chakra?"
          nota="Los chakras son tradición del yoga, no anatomía: no hay órganos que correspondan a ellos y no se pueden medir. Lo que hace marcar uno acá es inclinar la práctica hacia esa zona del cuerpo, que sí es real."
        >
          <div style={{ display: "grid", gap: "0.4rem" }}>
            {CHAKRAS.map((c) => {
              const activo = (prefs.chakras ?? []).includes(c.id);
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() =>
                    setPrefs({ ...prefs, chakras: alternar(prefs.chakras ?? [], c.id as Chakra) })
                  }
                  aria-pressed={activo}
                  style={{
                    ...chip,
                    display: "flex",
                    gap: "0.7rem",
                    alignItems: "baseline",
                    ...(activo ? chipActivo : null),
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: c.color,
                      flexShrink: 0,
                      alignSelf: "center",
                    }}
                  />
                  <span style={{ minWidth: 92, color: activo ? "#e8c878" : "#d4c4a0" }}>
                    {c.nombre}
                  </span>
                  <span style={{ fontSize: "0.82rem", opacity: 0.62 }}>
                    {activo ? c.enElCuerpo : c.donde}
                  </span>
                </button>
              );
            })}
          </div>
        </Pregunta>

        <Pregunta n={10} titulo="¿Qué más incluyo?">
          <div style={fila}>
            <button
              type="button"
              onClick={() => setPrefs({ ...prefs, respiracion: !prefs.respiracion })}
              aria-pressed={prefs.respiracion}
              style={{ ...chip, ...(prefs.respiracion ? chipActivo : null) }}
            >
              Respiración (pranayama)
            </button>
            <button
              type="button"
              onClick={() => setPrefs({ ...prefs, meditacion: !prefs.meditacion })}
              aria-pressed={prefs.meditacion}
              style={{ ...chip, ...(prefs.meditacion ? chipActivo : null) }}
            >
              Meditación al final
            </button>
            <button
              type="button"
              onClick={() => setPrefs({ ...prefs, sonido: !prefs.sonido })}
              aria-pressed={prefs.sonido}
              style={{ ...chip, ...(prefs.sonido ? chipActivo : null) }}
            >
              {prefs.sonido ? "Con sonido" : "Sin sonido"}
            </button>
            {hayVoz() && (
              <button
                type="button"
                onClick={() => setPrefs({ ...prefs, voz: !prefs.voz })}
                aria-pressed={prefs.voz}
                style={{ ...chip, ...(prefs.voz ? chipActivo : null) }}
              >
                {prefs.voz ? "Con voz que guía" : "Sin voz"}
              </button>
            )}
          </div>
        </Pregunta>

        <Pregunta
          n={11}
          titulo="¿Cómo prefieres el ritmo?"
          nota="Pausado: menos posturas, sostenidas más rato. Ligero: más posturas, más movimiento."
        >
          <div style={fila}>
            {(
              [
                ["pausado", "Pausado"],
                ["normal", "Normal"],
                ["ligero", "Ligero"],
              ] as [Preferencias["ritmo"], string][]
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setPrefs({ ...prefs, ritmo: id })}
                aria-pressed={prefs.ritmo === id}
                style={{ ...chip, ...(prefs.ritmo === id ? chipActivo : null), minWidth: 110 }}
              >
                {label}
              </button>
            ))}
          </div>
        </Pregunta>

        <button
          type="button"
          onClick={() => {
            guardarPrefs(prefs);
            armar(prefs);
          }}
          disabled={prefs.objetivos.length === 0}
          style={{ ...botonPri, width: "100%", opacity: prefs.objetivos.length === 0 ? 0.45 : 1 }}
        >
          Guardar y armar mi práctica
        </button>
        {prefs.objetivos.length === 0 && (
          <p style={{ ...ayuda, marginTop: "0.7rem" }}>Marca al menos una cosa que quieras trabajar.</p>
        )}
        {yaRespondio && (
          <button type="button" onClick={() => setEtapa("resumen")} style={{ ...botonLink, marginTop: "0.9rem" }}>
            Volver sin cambiar nada
          </button>
        )}
      </div>
    );
  }

  // ══ Resumen del día ══════════════════════════════════════════
  if (etapa === "resumen") {
    const objetivos = prefs.objetivos
      .map((o) => OBJETIVOS.find((x) => x.id === o)?.label)
      .filter(Boolean)
      .join(" · ");

    return (
      <div ref={cajaRef} style={{ ...panel, scrollMarginTop: "5.5rem" }}>
        <p style={paso}>Tu práctica de hoy</p>
        <h2
          style={{
            fontFamily: "var(--font-grimoire)",
            fontSize: "clamp(1.1rem, 3.4vw, 1.5rem)",
            color: "#e8c878",
            letterSpacing: "0.05em",
            margin: "0 0 0.4rem",
            textWrap: "balance",
          }}
        >
          {objetivos || "Práctica general"}
        </h2>
        <p style={{ ...ayuda, marginBottom: "1.4rem" }}>
          {prefs.minutos} minutos ·{" "}
          {MOMENTOS.find((m) => m.id === prefs.momento)?.label.toLowerCase() ?? ""} ·{" "}
          {INTENSIDADES.find((i) => i.id === prefs.intensidad)?.label.toLowerCase()}
          {prefs.estilos.length > 0 &&
            " · " + prefs.estilos.map((e) => ESTILOS.find((x) => x.id === e)?.label).join(", ")}
          {racha > 1 && ` · ${racha} días seguidos`}
        </p>

        <p style={rotulo}>¿Hoy cambió algo?</p>
        <p style={{ ...ayuda, marginBottom: "0.6rem" }}>
          Lo que toques acá vale solo para esta práctica, salvo que lo guardes.
        </p>

        <div style={{ ...fila, marginBottom: "0.7rem" }}>
          {MINUTOS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setPrefs({ ...prefs, minutos: m })}
              aria-pressed={prefs.minutos === m}
              style={{ ...chip, ...(prefs.minutos === m ? chipActivo : null), minWidth: 74, padding: "0.45rem 0.7rem" }}
            >
              {m} min
            </button>
          ))}
        </div>
        <div style={{ ...fila, marginBottom: "0.7rem" }}>
          {MOMENTOS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setPrefs({ ...prefs, momento: m.id })}
              aria-pressed={prefs.momento === m.id}
              style={{ ...chip, ...(prefs.momento === m.id ? chipActivo : null), padding: "0.45rem 0.7rem" }}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div style={{ ...fila, marginBottom: "1.4rem" }}>
          {INTENSIDADES.map((i) => (
            <button
              key={i.id}
              type="button"
              onClick={() => setPrefs({ ...prefs, intensidad: i.id })}
              aria-pressed={prefs.intensidad === i.id}
              style={{ ...chip, ...(prefs.intensidad === i.id ? chipActivo : null), padding: "0.45rem 0.7rem" }}
            >
              {i.label}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          <button type="button" onClick={() => armar()} style={{ ...botonPri, flex: "1 1 220px" }}>
            Armar la práctica
          </button>
          <button type="button" onClick={() => guardarPrefs(prefs)} style={botonSec}>
            Guardar estos cambios
          </button>
        </div>

        <button type="button" onClick={() => setEtapa("preferencias")} style={{ ...botonLink, marginTop: "1rem" }}>
          Cambiar todas mis preferencias
        </button>

        {historial.length > 0 && (
          <p style={{ ...ayuda, marginTop: "1.4rem", marginBottom: 0 }}>
            Llevas {historial.length} {historial.length === 1 ? "práctica" : "prácticas"} registradas.
            La última fue el {historial[0].dia.split("-").reverse().join("/")}.
          </p>
        )}
      </div>
    );
  }

  // ══ La rutina armada ═════════════════════════════════════════
  if (etapa === "rutina" && rutina) {
    const grupos = porFase(rutina);
    return (
      <div ref={cajaRef} style={{ ...panel, scrollMarginTop: "5.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ ...paso, marginBottom: "0.2rem" }}>Tu práctica</p>
            <p style={{ ...ayuda, margin: 0 }}>
              {rutina.pasos.length} pasos · {mmss(rutina.segundos)}
            </p>
          </div>
          <div style={{ display: "flex", gap: "0.8rem" }}>
            <button type="button" onClick={() => armar()} style={botonLink}>
              Armar otra
            </button>
            <button type="button" onClick={() => setEtapa("resumen")} style={botonLink}>
              Cambiar
            </button>
          </div>
        </div>

        {rutina.quitadas.length > 0 && (
          <div style={{ ...avisoCaja, marginTop: "1.2rem" }}>
            <p style={{ ...ayuda, color: "#dd9464", margin: "0 0 0.4rem" }}>
              Saqué {rutina.quitadas.length}{" "}
              {rutina.quitadas.length === 1 ? "postura" : "posturas"} por lo que marcaste.
            </p>
            <p style={{ ...ayuda, margin: 0, fontSize: "0.86rem" }}>
              {rutina.quitadas
                .slice(0, 6)
                .map((q) => `${q.nombre} (${q.motivo})`)
                .join(" · ")}
              {rutina.quitadas.length > 6 && ` y ${rutina.quitadas.length - 6} más`}
              .
            </p>
          </div>
        )}

        {rutina.propsUsados.length > 0 && (
          <p style={{ ...ayuda, marginTop: "1rem" }}>
            Ten a mano:{" "}
            {rutina.propsUsados.map((p) => PROPS.find((x) => x.id === p)?.label.toLowerCase()).join(", ")}.
          </p>
        )}

        <div style={{ marginTop: "1.4rem", display: "grid", gap: "1.3rem" }}>
          {grupos.map(({ fase, pasos }) => (
            <div key={fase}>
              <p style={rotulo}>
                {ETIQUETA_FASE[fase]} · {mmss(pasos.reduce((a, p) => a + p.duracion, 0))}
              </p>
              <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.4rem" }}>
                {enBloques(pasos).map((b) =>
                  b.tipo === "paso" ? (
                    <li key={b.paso.clave} style={filaPaso}>
                      <FiguraYoga figura={b.paso.figura} tamano={62} estilo={{ flexShrink: 0, opacity: 0.85 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ color: "#e8c878", fontSize: "0.97rem", display: "block" }}>
                          {b.paso.nombre}
                        </span>
                        <span style={{ fontSize: "0.82rem", opacity: 0.6 }}>
                          {[b.paso.sanscrito, b.paso.porLado ? "los dos lados" : null]
                            .filter(Boolean)
                            .join(" · ")}
                        </span>
                      </div>
                      <span style={tiempoFila}>{mmss(b.paso.duracion)}</span>
                    </li>
                  ) : (
                    <li key={b.pasos[0].clave} style={cajaSerie}>
                      <div style={{ display: "flex", gap: "0.7rem", alignItems: "baseline", flexWrap: "wrap" }}>
                        <span style={{ color: "#e8c878", fontSize: "0.99rem" }}>{b.nombre}</span>
                        <span style={{ ...rotulo, margin: 0, color: "rgba(168,200,138,0.9)" }}>
                          {b.vueltas} {b.vueltas === 1 ? "vuelta" : "vueltas"}
                          {b.porLado ? " · cada lado" : ""}
                        </span>
                        <span style={{ ...tiempoFila, marginLeft: "auto" }}>{mmss(b.duracion)}</span>
                      </div>
                      <p style={{ ...ayuda, fontSize: "0.87rem", margin: "0.4rem 0 0.6rem" }}>{b.porque}</p>
                      <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.3rem" }}>
                        {b.pasos
                          .filter(
                            (x) =>
                              x.secuencia?.vuelta === 1 &&
                              (x.secuencia?.lado === undefined || x.secuencia?.lado === "derecho")
                          )
                          .map((x, i) => (
                            <li
                              key={x.clave}
                              style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
                            >
                              <span style={{ ...rotulo, margin: 0, minWidth: 16 }}>{i + 1}</span>
                              <FiguraYoga figura={x.figura} tamano={46} estilo={{ flexShrink: 0, opacity: 0.8 }} />
                              <span style={{ fontSize: "0.9rem", color: "rgba(217,203,170,0.85)", flex: 1 }}>
                                {x.nombre}
                              </span>
                              <span style={{ ...tiempoFila, fontSize: "0.72rem" }}>{x.duracion}s</span>
                            </li>
                          ))}
                      </ol>
                    </li>
                  )
                )}
              </ol>
            </div>
          ))}
        </div>

        <button type="button" onClick={empezar} style={{ ...botonPri, width: "100%", marginTop: "1.8rem" }}>
          Empezar
        </button>
        <p style={{ ...ayuda, marginTop: "0.9rem" }}>
          Avanza sola y suena al cambiar de postura. Cuando una va a los dos lados, suena doble a la
          mitad para que cambies.
        </p>

        <AsesorYoga rutina={rutina} />
      </div>
    );
  }

  // ══ Modo guiado ══════════════════════════════════════════════
  if (etapa === "guiado" && rutina && pasoActual) {
    const total = pasoActual.duracion;
    const vuelta = total > 0 ? 1 - restante / total : 0;
    const perimetro = 2 * Math.PI * 52;

    return (
      <div ref={cajaRef} style={{ ...panel, textAlign: "center", scrollMarginTop: "5.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1.2rem" }}>
          <span style={{ ...rotulo, margin: 0, flexShrink: 0 }}>
            {indice + 1}/{rutina.pasos.length}
          </span>
          <div style={{ flex: 1, height: 3, background: "rgba(200,160,80,0.16)", borderRadius: 2 }}>
            <div
              style={{
                width: `${Math.min(100, (transcurrido / Math.max(1, rutina.segundos)) * 100)}%`,
                height: "100%",
                background: "#c8a050",
                borderRadius: 2,
                transition: "width 0.9s linear",
              }}
            />
          </div>
          <span style={{ ...rotulo, margin: 0, flexShrink: 0 }}>
            {mmss(Math.max(0, rutina.segundos - transcurrido))}
          </span>
        </div>

        <p style={{ ...rotulo, color: "rgba(168,200,138,0.85)" }}>
          {pasoActual.secuencia
            ? `${pasoActual.secuencia.nombre} · vuelta ${pasoActual.secuencia.vuelta} de ${pasoActual.secuencia.vueltas}${
                pasoActual.secuencia.lado ? ` · lado ${pasoActual.secuencia.lado}` : ""
              }`
            : ETIQUETA_FASE[pasoActual.fase]}
        </p>

        <h2
          style={{
            fontFamily: "var(--font-grimoire)",
            fontSize: "clamp(1.3rem, 5vw, 1.95rem)",
            color: "#e8c878",
            letterSpacing: "0.05em",
            margin: "0 0 0.25rem",
            textWrap: "balance",
          }}
        >
          {pasoActual.nombre}
        </h2>
        <p style={{ ...ayuda, margin: "0 0 1rem" }}>
          {pasoActual.sanscrito ?? ""}
          {pasoActual.porLado && !pasoActual.secuencia && (
            <span style={{ color: "#a8c88a" }}>
              {pasoActual.sanscrito ? " · " : ""}
              {segundoLado ? "ahora el otro lado" : "primer lado"}
            </span>
          )}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem", alignItems: "center", justifyContent: "center", marginBottom: "1.2rem" }}>
          <div style={{ border: "1px solid rgba(200,160,80,0.22)", background: "rgba(10,18,10,0.55)", borderRadius: 6, padding: "0.4rem" }}>
            <FiguraYoga figura={pasoActual.figura} tamano={220} />
          </div>

          <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
            <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(200,160,80,0.16)" strokeWidth="5" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={segundoLado ? "#a8c88a" : "#c8a050"}
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={perimetro}
                strokeDashoffset={perimetro * (1 - vuelta)}
                transform="rotate(-90 60 60)"
                style={{ transition: "stroke-dashoffset 0.9s linear" }}
              />
            </svg>
            <span
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-grimoire)",
                fontSize: "1.7rem",
                color: "#e8c878",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {mmss(restante)}
            </span>
          </div>
        </div>

        <ul style={{ listStyle: "none", margin: "0 auto 1.1rem", padding: 0, maxWidth: "46ch", textAlign: "left", display: "grid", gap: "0.5rem" }}>
          {pasoActual.como.map((linea, i) => (
            <li
              key={i}
              style={{
                fontFamily: "var(--font-crimson), serif",
                fontSize: "1.08rem",
                lineHeight: 1.5,
                color: "#d9cbaa",
                paddingLeft: "1.2rem",
                position: "relative",
              }}
            >
              <span style={{ position: "absolute", left: 0, color: "#c8a050" }}>·</span>
              {linea}
            </li>
          ))}
        </ul>

        {pasoActual.respirar && (
          <p style={{ ...ayuda, maxWidth: "44ch", margin: "0 auto 0.8rem", color: "rgba(168,200,138,0.85)" }}>
            {pasoActual.respirar}
          </p>
        )}
        {pasoActual.cuidado && <p style={avisoTexto}>{pasoActual.cuidado}</p>}
        {pasoActual.masFacil && (
          <p style={{ ...ayuda, maxWidth: "44ch", margin: "0 auto 1.1rem", fontSize: "0.88rem" }}>
            Más fácil: {pasoActual.masFacil}
          </p>
        )}

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button type="button" onClick={() => irA(indice - 1)} disabled={indice === 0} style={botonSec}>
            Anterior
          </button>
          <button type="button" onClick={() => setCorriendo((c) => !c)} style={{ ...botonPri, minWidth: 130 }}>
            {corriendo ? "Pausa" : "Seguir"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (indice + 1 >= rutina.pasos.length) setEtapa("final");
              else irA(indice + 1);
            }}
            style={botonSec}
          >
            Siguiente
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            setCorriendo(false);
            setEtapa("rutina");
          }}
          style={{ ...botonLink, marginTop: "1rem" }}
        >
          Salir
        </button>

        {pasoActual.fuente && (
          <p style={{ ...ayuda, marginTop: "1.2rem", fontSize: "0.76rem", opacity: 0.5 }}>{pasoActual.fuente}</p>
        )}
      </div>
    );
  }

  // ══ Final ════════════════════════════════════════════════════
  return (
    <div ref={cajaRef} style={{ ...panel, textAlign: "center", scrollMarginTop: "5.5rem" }}>
      <p style={rotulo}>Terminaste</p>
      <h2
        style={{
          fontFamily: "var(--font-grimoire)",
          fontSize: "clamp(1.4rem, 5vw, 2rem)",
          color: "#e8c878",
          letterSpacing: "0.07em",
          margin: "0.3rem 0 0.8rem",
        }}
      >
        {racha > 1 ? `${racha} días seguidos` : "Práctica hecha"}
      </h2>
      <p style={{ ...ayuda, maxWidth: "46ch", margin: "0 auto 1.6rem" }}>
        Lo que se nota el mismo día es la calma y el cuerpo suelto. La flexibilidad y la fuerza son
        cosa de semanas: en los ensayos, los cambios aparecen entre las ocho y las doce semanas de
        práctica seguida.
      </p>

      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", justifyContent: "center" }}>
        <button type="button" onClick={empezar} style={botonPri}>
          Hacerla de nuevo
        </button>
        <button type="button" onClick={() => setEtapa("resumen")} style={botonSec}>
          Volver al inicio
        </button>
      </div>
    </div>
  );
}

// ── Piezas de la interfaz ────────────────────────────────────

function Pregunta({
  n,
  titulo,
  nota,
  children,
}: {
  n: number;
  titulo: string;
  nota?: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ marginBottom: "1.8rem" }}>
      <p style={paso}>
        {n} · {titulo}
      </p>
      {nota && <p style={{ ...ayuda, marginBottom: "0.7rem" }}>{nota}</p>}
      {children}
    </section>
  );
}

type Opcion = { id: string; label: string; detalle?: string };

function Chips<T extends Opcion>({
  opciones,
  activo,
  onClick,
}: {
  opciones: readonly T[];
  activo: (o: T) => boolean;
  onClick: (o: T) => void;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
      {opciones.map((o) => {
        const on = activo(o);
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onClick(o)}
            aria-pressed={on}
            style={{ ...chip, ...(on ? chipActivo : null) }}
          >
            <span style={{ fontSize: "0.94rem", display: "block" }}>{o.label}</span>
            {o.detalle && (
              <span style={{ fontSize: "0.79rem", opacity: 0.62, display: "block" }}>{o.detalle}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ── Estilos ──────────────────────────────────────────────────
const panel: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.22)",
  background: "rgba(12,22,12,0.72)",
  backdropFilter: "blur(3px)",
  borderRadius: 8,
  padding: "clamp(1.1rem, 3vw, 1.8rem)",
};
const paso: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.68rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: "rgba(200,160,80,0.85)",
  margin: "0 0 0.4rem",
};
const rotulo: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.6rem",
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  color: "rgba(200,160,80,0.7)",
  margin: "0 0 0.6rem",
};
const ayuda: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.92rem",
  lineHeight: 1.6,
  color: "rgba(217,203,170,0.62)",
  margin: "0 0 1rem",
};
const fila: CSSProperties = { display: "flex", gap: "0.5rem", flexWrap: "wrap" };
const chip: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.94rem",
  textAlign: "left",
  color: "#d4c4a0",
  background: "rgba(13,26,13,0.5)",
  border: "1px solid rgba(200,160,80,0.28)",
  borderRadius: 5,
  padding: "0.55rem 0.85rem",
  minHeight: 44,
  cursor: "pointer",
};
const chipActivo: CSSProperties = {
  borderColor: "#e8c878",
  background: "rgba(200,160,80,0.16)",
  color: "#e8c878",
};
const filaPaso: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.7rem",
  border: "1px solid rgba(200,160,80,0.14)",
  borderRadius: 5,
  padding: "0.45rem 0.7rem",
  background: "rgba(13,26,13,0.4)",
};
const tiempoFila: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.78rem",
  color: "rgba(200,160,80,0.75)",
  flexShrink: 0,
};
const cajaSerie: CSSProperties = {
  border: "1px solid rgba(168,200,138,0.28)",
  background: "rgba(13,26,13,0.55)",
  borderRadius: 6,
  padding: "0.7rem 0.85rem",
};
const botonPri: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.7rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#0d1a0d",
  background: "rgba(200,160,80,0.92)",
  border: "none",
  borderRadius: 4,
  padding: "0 1.4rem",
  minHeight: 46,
  cursor: "pointer",
};
const botonSec: CSSProperties = {
  ...botonPri,
  color: "#c8a050",
  background: "transparent",
  border: "1px solid rgba(200,160,80,0.45)",
};
const botonLink: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.9rem",
  color: "#c8a050",
  background: "none",
  border: "none",
  padding: "0.3rem 0",
  cursor: "pointer",
  textDecoration: "underline",
};
const avisoCaja: CSSProperties = {
  border: "1px solid rgba(221,148,100,0.3)",
  background: "rgba(221,148,100,0.07)",
  borderRadius: 6,
  padding: "0.7rem 0.9rem",
};
const avisoTexto: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.92rem",
  color: "#dd9464",
  border: "1px solid rgba(221,148,100,0.3)",
  background: "rgba(221,148,100,0.08)",
  borderRadius: 5,
  padding: "0.55rem 0.8rem",
  margin: "0 auto 1rem",
  maxWidth: "44ch",
};

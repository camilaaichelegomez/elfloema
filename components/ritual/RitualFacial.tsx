"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { llevarLaVista } from "@/lib/llevar-la-vista";
import Link from "next/link";
import {
  AVISOS_PIEL,
  CATALOGO,
  CONSEJOS,
  ENFOQUES,
  ESTADOS_PIEL,
  ETIQUETA_FASE,
  MINUTOS,
  NECESIDADES,
  armarRutina,
  mmss,
  type Enfoque,
  type EstadoPiel,
  type Fase,
  type Momento,
  type Necesidad,
  type Nivel,
  type Rutina,
} from "@/lib/ritual-facial";
import { CaraGuia } from "./CaraGuia";
import { hayVoz, unirFrases, usarVoz } from "@/lib/voz";
import { SelectorDeVoz } from "@/components/SelectorDeVoz";

/* La aplicación del ritual facial: se elige qué trabajar, se arma la rutina y
   se sigue paso a paso con el dibujo y el temporizador.

   La decisión de diseño que manda sobre todo lo demás: mientras se hace la
   rutina las manos están en la cara. Así que el modo guiado avanza solo, avisa
   con un sonido, y la letra es grande para leerla de lejos. Nada obliga a
   tocar la pantalla. */

type Etapa = "eleccion" | "rutina" | "guiado" | "final";

const CLAVE = "floema-ritual-facial";

type Guardado = {
  necesidades: Necesidad[];
  minutos: number;
  momento: Momento;
  /** Opcional: quien guardó antes de que el enfoque existiera no se rompe. */
  enfoque?: Enfoque;
  nivel: Nivel;
  estadoPiel: EstadoPiel;
  racha: number;
  ultimoDia: string;
  /** Opcional: quien guardó antes de que existiera la voz no queda sin ella. */
  voz?: boolean;
  /** Nombre de la voz elegida; vacío = la que mejor suene del dispositivo. */
  vozNombre?: string;
};

function hoy() {
  return new Date().toISOString().slice(0, 10);
}

function ayer() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function leerGuardado(): Guardado | null {
  try {
    const raw = localStorage.getItem(CLAVE);
    return raw ? (JSON.parse(raw) as Guardado) : null;
  } catch {
    return null;
  }
}

function guardar(g: Guardado) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(g));
  } catch {
    /* Modo privado o almacenamiento bloqueado: la rutina funciona igual. */
  }
}

/* Un pitido corto al cambiar de paso. Sin archivos de audio: se genera. */
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
          vol.gain.linearRampToValueAtTime(0.14, t + 0.02);
          vol.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
          osc.connect(vol).connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.24);
        };

        tono(0, 660);
        if (doble) tono(0.26, 880);
      } catch {
        /* Sin audio disponible: no pasa nada. */
      }
    },
    [activo]
  );
}

export function RitualFacial() {
  const [etapa, setEtapa] = useState<Etapa>("eleccion");
  const [necesidades, setNecesidades] = useState<Necesidad[]>([]);
  const [minutos, setMinutos] = useState<number>(10);
  const [momento, setMomento] = useState<Momento>("manana");
  const [enfoque, setEnfoque] = useState<Enfoque>("equilibrado");
  const [nivel, setNivel] = useState<Nivel>("primera");
  const [estadoPiel, setEstadoPiel] = useState<EstadoPiel>("normal");
  const [rutina, setRutina] = useState<Rutina | null>(null);

  const [indice, setIndice] = useState(0);
  const [restante, setRestante] = useState(0);
  const [corriendo, setCorriendo] = useState(false);
  const [sonido, setSonido] = useState(true);
  const [voz, setVoz] = useState(true);
  const [vozNombre, setVozNombre] = useState<string | undefined>();
  const [racha, setRacha] = useState(0);

  const pitar = usarPitido(sonido);
  const { decir, callar, desbloquear } = usarVoz(voz, vozNombre);
  const wakeRef = useRef<{ release: () => Promise<void> } | null>(null);
  /* Al cambiar de etapa el contenido se reemplaza entero, pero el navegador
     deja el scroll donde estaba: el botón «Armar mi rutina» está abajo del
     cuestionario, así que la rutina aparecía arriba de donde quedó la persona.
     Esto la lleva al principio de lo nuevo. */
  const panelRef = useRef<HTMLDivElement>(null);
  const yaMontado = useRef(false);

  useEffect(() => {
    if (!yaMontado.current) {
      yaMontado.current = true; // al cargar la página no se mueve nada
      return;
    }
    llevarLaVista(panelRef.current);
  }, [etapa]);

  // Recupera la última elección y la racha.
  useEffect(() => {
    const g = leerGuardado();
    if (!g) return;
    setNecesidades(g.necesidades ?? []);
    setMinutos(g.minutos ?? 10);
    setMomento(g.momento ?? "manana");
    setEnfoque(g.enfoque ?? "equilibrado");
    setNivel(g.nivel === "primera" ? "practico" : g.nivel ?? "practico");
    setEstadoPiel(g.estadoPiel ?? "normal");
    setRacha(g.ultimoDia === hoy() || g.ultimoDia === ayer() ? g.racha ?? 0 : 0);
    setVoz(g.voz ?? true);
    setVozNombre(g.vozNombre);

    /* Si ya eligió alguna vez, la rutina se arma sola y se entra directo a
       ella: volver a la pantalla de preguntas cada vez, con la cabecera
       arriba, hacía parecer que la página no había cargado. */
    if ((g.necesidades ?? []).length > 0) {
      const r = armarRutina({
        necesidades: g.necesidades,
        minutos: g.minutos ?? 10,
        momento: g.momento ?? "manana",
        enfoque: g.enfoque ?? "equilibrado",
        nivel: g.nivel === "primera" ? "practico" : g.nivel ?? "practico",
        estadoPiel: g.estadoPiel ?? "normal",
      });
      setRutina(r);
      setRestante(r.pasos[0]?.segundos ?? 0);
      setEtapa("rutina");
    }
  }, []);

  const pasoActual = rutina?.pasos[indice];

  // Temporizador: descuenta y pasa al siguiente solo.
  useEffect(() => {
    if (!corriendo || !rutina) return;
    const id = setInterval(() => {
      setRestante((r) => {
        if (r > 1) return r - 1;
        const siguiente = indice + 1;
        if (siguiente >= rutina.pasos.length) {
          setCorriendo(false);
          setEtapa("final");
          pitar(true);
          return 0;
        }
        setIndice(siguiente);
        pitar();
        return rutina.pasos[siguiente].segundos;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [corriendo, indice, rutina, pitar]);

  // Que la pantalla no se apague a mitad de la rutina.
  useEffect(() => {
    type ConWakeLock = Navigator & {
      wakeLock?: { request: (t: "screen") => Promise<{ release: () => Promise<void> }> };
    };
    const nav = navigator as ConWakeLock;
    if (etapa === "guiado" && corriendo && nav.wakeLock) {
      nav.wakeLock
        .request("screen")
        .then((s) => (wakeRef.current = s))
        .catch(() => {
          /* El navegador puede negarlo; no es crítico. */
        });
    }
    return () => {
      void wakeRef.current?.release().catch(() => {});
      wakeRef.current = null;
    };
  }, [etapa, corriendo]);

  // Registra la sesión terminada y actualiza la racha.
  useEffect(() => {
    if (etapa !== "final") return;
    const g = leerGuardado();
    const seguido = g?.ultimoDia === ayer();
    const yaHoy = g?.ultimoDia === hoy();
    const nueva = yaHoy ? g?.racha ?? 1 : seguido ? (g?.racha ?? 0) + 1 : 1;
    setRacha(nueva);
    guardar({ necesidades, minutos, momento, enfoque, nivel, estadoPiel, racha: nueva, ultimoDia: hoy(), voz, vozNombre });
  }, [etapa, necesidades, minutos, momento, enfoque, nivel, estadoPiel, voz, vozNombre]);

  /* La voz lee la maniobra al entrar en ella. En el drenaje esto pesa más que
     en yoga: tienes las dos manos en la cara y los ojos cerrados, así que la
     pantalla no se puede mirar. */
  useEffect(() => {
    if (etapa !== "guiado" || !pasoActual || !corriendo) return;
    const partes = [pasoActual.nombre, pasoActual.zona];
    if (pasoActual.repeticiones) partes.push(pasoActual.repeticiones);
    partes.push(...pasoActual.como);
    if (pasoActual.mediaPresion) partes.push("Aquí la presión es la mitad");
    decir(unirFrases(partes));
    // Solo al cambiar de maniobra: pausar y seguir no debe releer todo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indice, etapa]);

  useEffect(() => {
    if (!corriendo) callar();
  }, [corriendo, callar]);

  const porFase = useMemo(() => {
    if (!rutina) return [];
    const orden: Fase[] = ["preparacion", "drenaje", "ejercicios", "cierre"];
    return orden
      .map((f) => ({ fase: f, pasos: rutina.pasos.filter((p) => p.fase === f) }))
      .filter((g) => g.pasos.length > 0);
  }, [rutina]);

  function alternar(n: Necesidad) {
    setNecesidades((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));
  }

  function armar() {
    const r = armarRutina({ necesidades, minutos, momento, enfoque, nivel, estadoPiel });
    setRutina(r);
    setIndice(0);
    setRestante(r.pasos[0]?.segundos ?? 0);
    setEtapa("rutina");
  }

  function empezar() {
    if (!rutina) return;
    desbloquear();
    setIndice(0);
    setRestante(rutina.pasos[0]?.segundos ?? 0);
    setEtapa("guiado");
    setCorriendo(true);
    pitar();
  }

  function irA(n: number) {
    if (!rutina) return;
    const i = Math.max(0, Math.min(rutina.pasos.length - 1, n));
    setIndice(i);
    setRestante(rutina.pasos[i].segundos);
  }

  const transcurrido = useMemo(() => {
    if (!rutina) return 0;
    const previos = rutina.pasos.slice(0, indice).reduce((a, p) => a + p.segundos, 0);
    return previos + ((pasoActual?.segundos ?? 0) - restante);
  }, [rutina, indice, restante, pasoActual]);

  // ── Elección ───────────────────────────────────────────────
  if (etapa === "eleccion") {
    return (
      <div ref={panelRef} style={panel}>
        <p style={paso}>1 · ¿Qué quieres trabajar?</p>
        <p style={ayuda}>Elige todo lo que aplique. Puedes marcar una sola cosa.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.6rem" }}>
          {NECESIDADES.map((n) => {
            const activa = necesidades.includes(n.id);
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => alternar(n.id)}
                aria-pressed={activa}
                style={{
                  ...chip,
                  borderColor: activa ? "#e8c878" : "rgba(200,160,80,0.28)",
                  background: activa ? "rgba(200,160,80,0.16)" : "rgba(13,26,13,0.5)",
                  color: activa ? "#e8c878" : "#d4c4a0",
                }}
              >
                <span style={{ fontSize: "0.94rem", display: "block" }}>{n.label}</span>
                <span style={{ fontSize: "0.78rem", opacity: 0.6, display: "block" }}>{n.detalle}</span>
              </button>
            );
          })}
        </div>

        <p style={paso}>2 · ¿Cuánto tiempo tienes?</p>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.6rem", flexWrap: "wrap" }}>
          {MINUTOS.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMinutos(m)}
              aria-pressed={minutos === m}
              style={{ ...chip, ...(minutos === m ? chipActivo : null), minWidth: 92 }}
            >
              {m} minutos
            </button>
          ))}
        </div>

        <p style={paso}>3 · ¿A qué hora?</p>
        <p style={ayuda}>
          De mañana pesa más el drenaje, porque la cara amanece hinchada. De noche pesan más los
          ejercicios y soltar la mandíbula.
        </p>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.6rem", flexWrap: "wrap" }}>
          {([["manana", "En la mañana"], ["noche", "En la noche"]] as [Momento, string][]).map(
            ([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setMomento(id)}
                aria-pressed={momento === id}
                style={{ ...chip, ...(momento === id ? chipActivo : null), minWidth: 130 }}
              >
                {label}
              </button>
            )
          )}
        </div>

        <p style={paso}>4 · ¿En qué te enfocas hoy?</p>
        <p style={ayuda}>
          El drenaje deshincha hoy mismo; los ejercicios son cosa de meses. Aunque elijas más
          ejercicios, el drenaje no desaparece: abrir el cuello y cerrar el circuito son la entrada
          y la salida de todo lo que muevas.
        </p>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.6rem", flexWrap: "wrap" }}>
          {ENFOQUES.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setEnfoque(e.id)}
              aria-pressed={enfoque === e.id}
              style={{ ...chip, ...(enfoque === e.id ? chipActivo : null), minWidth: 130 }}
            >
              <span style={{ display: "block" }}>{e.label}</span>
              <span style={{ display: "block", fontSize: "0.78rem", opacity: 0.7 }}>{e.detalle}</span>
            </button>
          ))}
        </div>

        <p style={paso}>5 · ¿Ya lo has hecho antes?</p>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.8rem", flexWrap: "wrap" }}>
          {([["primera", "Es mi primera vez"], ["practico", "Ya practico"]] as [Nivel, string][]).map(
            ([id, label]) => (
              <button
                key={id}
                type="button"
                onClick={() => setNivel(id)}
                aria-pressed={nivel === id}
                style={{ ...chip, ...(nivel === id ? chipActivo : null), minWidth: 150 }}
              >
                {label}
              </button>
            )
          )}
        </div>

        <p style={paso}>5 · ¿Cómo está tu piel hoy?</p>
        <p style={ayuda}>
          No es un detalle: en acné y en rosácea el drenaje está indicado, pero el masaje facial no.
          Según lo que marques, saco o dejo pasos.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.8rem" }}>
          {ESTADOS_PIEL.map((e) => {
            const activo = estadoPiel === e.id;
            return (
              <button
                key={e.id}
                type="button"
                onClick={() => setEstadoPiel(e.id)}
                aria-pressed={activo}
                style={{
                  ...chip,
                  borderColor: activo ? "#e8c878" : "rgba(200,160,80,0.28)",
                  background: activo ? "rgba(200,160,80,0.16)" : "rgba(13,26,13,0.5)",
                  color: activo ? "#e8c878" : "#d4c4a0",
                }}
              >
                <span style={{ fontSize: "0.94rem", display: "block" }}>{e.label}</span>
                <span style={{ fontSize: "0.78rem", opacity: 0.6, display: "block" }}>{e.detalle}</span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={armar}
          disabled={necesidades.length === 0}
          style={{ ...botonPri, opacity: necesidades.length === 0 ? 0.45 : 1, width: "100%" }}
        >
          Armar mi rutina
        </button>
        {necesidades.length === 0 && (
          <p style={{ ...ayuda, marginTop: "0.7rem" }}>Marca al menos una cosa para empezar.</p>
        )}

        {racha > 1 && (
          <p style={{ ...ayuda, marginTop: "1.2rem", color: "#a8c88a" }}>
            Llevas {racha} días seguidos. El estudio del que salen estos ejercicios midió resultados
            recién a las 20 semanas de práctica casi diaria.
          </p>
        )}
      </div>
    );
  }

  // ── Rutina armada ──────────────────────────────────────────
  if (etapa === "rutina" && rutina) {
    return (
      <div ref={panelRef} style={panel}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ ...paso, marginBottom: "0.2rem" }}>Tu rutina</p>
            <p style={{ ...ayuda, margin: 0 }}>
              {rutina.pasos.length} pasos · {mmss(rutina.segundos)} · {momento === "manana" ? "mañana" : "noche"}
            </p>
          </div>
          <button type="button" onClick={() => setEtapa("eleccion")} style={botonLink}>
            Cambiar
          </button>
        </div>

        {/* Lo que hay que saber antes de tocarse la cara */}
        {AVISOS_PIEL[estadoPiel].length > 0 && (
          <div style={{ marginTop: "1.3rem", display: "grid", gap: "0.5rem" }}>
            {AVISOS_PIEL[estadoPiel].map((a, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "var(--font-crimson), serif",
                  fontSize: "0.93rem",
                  lineHeight: 1.55,
                  margin: 0,
                  padding: "0.6rem 0.8rem",
                  borderRadius: 5,
                  border: `1px solid ${a.tono === "cuidado" ? "rgba(221,148,100,0.34)" : "rgba(200,160,80,0.2)"}`,
                  background: a.tono === "cuidado" ? "rgba(221,148,100,0.08)" : "rgba(200,160,80,0.05)",
                  color: a.tono === "cuidado" ? "#dd9464" : "rgba(217,203,170,0.82)",
                }}
              >
                {a.texto}
              </p>
            ))}
          </div>
        )}

        {/* Asesoría: qué pasa, qué esperar y cada cuánto, por cada cosa elegida */}
        {necesidades.length > 0 && (
          <div style={{ marginTop: "1.5rem", display: "grid", gap: "0.7rem" }}>
            <p style={rotulo}>Lo que elegiste</p>
            {necesidades.map((n) => {
              const c = CONSEJOS[n];
              const label = NECESIDADES.find((x) => x.id === n)?.label ?? n;
              return (
                <div key={n} style={{ ...fila, display: "block" }}>
                  <p style={{ ...ayuda, color: "#e8c878", margin: "0 0 0.35rem", fontSize: "0.98rem" }}>{label}</p>
                  <p style={{ ...ayuda, margin: "0 0 0.4rem" }}>{c.pasa}</p>
                  <p style={{ ...ayuda, margin: "0 0 0.4rem" }}>
                    <span style={{ color: "rgba(168,200,138,0.9)" }}>Qué esperar: </span>
                    {c.esperar}
                  </p>
                  <p style={{ ...ayuda, margin: 0 }}>
                    <span style={{ color: "rgba(168,200,138,0.9)" }}>Cada cuánto: </span>
                    {c.cada}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ marginTop: "1.6rem", display: "grid", gap: "1.4rem" }}>
          {porFase.map(({ fase, pasos }) => (
            <div key={fase}>
              <p style={rotulo}>
                {ETIQUETA_FASE[fase]} ·{" "}
                {mmss(pasos.reduce((a, p) => a + p.segundos, 0))}
              </p>
              <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.4rem" }}>
                {pasos.map((p) => (
                  <li key={p.id} style={fila}>
                    <div style={{ flexShrink: 0, opacity: 0.85 }}>
                      <CaraGuia pasoId={p.id} animar={false} tamano={44} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <span style={{ color: "#e8c878", fontSize: "0.97rem", display: "block" }}>{p.nombre}</span>
                      <span style={{ fontSize: "0.82rem", opacity: 0.6 }}>
                        {p.zona}
                        {p.repeticiones ? ` · ${p.repeticiones}` : ""}
                      </span>
                    </div>
                    <span style={{ fontFamily: "var(--font-grimoire)", fontSize: "0.8rem", color: "rgba(200,160,80,0.75)", flexShrink: 0 }}>
                      {p.segundos}s
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "1.8rem" }}>
          <button type="button" onClick={empezar} style={{ ...botonPri, flex: "1 1 200px" }}>
            Empezar la rutina
          </button>
          <button
            type="button"
            onClick={() => setSonido((s) => !s)}
            style={botonSec}
            aria-pressed={sonido}
          >
            {sonido ? "Sonido activado" : "Sonido apagado"}
          </button>
          {hayVoz() && (
            <button type="button" onClick={() => setVoz((v) => !v)} style={botonSec} aria-pressed={voz}>
              {voz ? "Con voz que guía" : "Sin voz"}
            </button>
          )}
          {hayVoz() && voz && (
            <button
              type="button"
              onClick={() => {
                desbloquear();
                decir("Esta es la voz que te va a guiar. Si no la escuchas, revisa el volumen.");
              }}
              style={botonSec}
            >
              Probar la voz
            </button>
          )}
        </div>
        {hayVoz() && voz && (
          <SelectorDeVoz
            valor={vozNombre}
            onElegir={setVozNombre}
            decir={decir}
            chip={chip}
            chipActivo={chipActivo}
            ayuda={ayuda}
          />
        )}
        <p style={{ ...ayuda, marginTop: "0.9rem" }}>
          Avanza sola y suena al cambiar de paso, así no tienes que soltarte la cara para tocar la
          pantalla.
        </p>
      </div>
    );
  }

  // ── Modo guiado ────────────────────────────────────────────
  if (etapa === "guiado" && rutina && pasoActual) {
    const total = pasoActual.segundos;
    const vuelta = total > 0 ? 1 - restante / total : 0;
    const perimetro = 2 * Math.PI * 52;

    return (
      <div ref={panelRef} style={{ ...panel, textAlign: "center" }}>
        {/* Progreso general */}
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
          <span style={{ ...rotulo, margin: 0, flexShrink: 0 }}>{mmss(Math.max(0, rutina.segundos - transcurrido))}</span>
        </div>

        <p style={{ ...rotulo, color: "rgba(168,200,138,0.85)" }}>{ETIQUETA_FASE[pasoActual.fase]}</p>

        <h2
          style={{
            fontFamily: "var(--font-grimoire)",
            fontSize: "clamp(1.3rem, 5vw, 1.9rem)",
            color: "#e8c878",
            letterSpacing: "0.06em",
            margin: "0 0 0.25rem",
            textWrap: "balance",
          }}
        >
          {pasoActual.nombre}
        </h2>
        <p style={{ ...ayuda, margin: "0 0 1.2rem" }}>
          {pasoActual.zona}
          {pasoActual.repeticiones ? ` · ${pasoActual.repeticiones}` : ""}
        </p>

        {/* Dibujo + temporizador */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem", alignItems: "center", justifyContent: "center", marginBottom: "1.3rem" }}>
          <div
            style={{
              border: "1px solid rgba(200,160,80,0.22)",
              background: "rgba(10,18,10,0.55)",
              borderRadius: 6,
              padding: "0.6rem",
            }}
          >
            <CaraGuia pasoId={pasoActual.id} tamano={230} />
          </div>

          <div style={{ position: "relative", width: 120, height: 120, flexShrink: 0 }}>
            <svg viewBox="0 0 120 120" width="120" height="120" aria-hidden="true">
              <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(200,160,80,0.16)" strokeWidth="5" />
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="#c8a050"
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
                fontSize: "1.9rem",
                color: "#e8c878",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {restante}
            </span>
          </div>
        </div>

        {/* Instrucciones: grandes, para leerlas de lejos */}
        <ul style={{ listStyle: "none", margin: "0 auto 1.5rem", padding: 0, maxWidth: "46ch", textAlign: "left", display: "grid", gap: "0.55rem" }}>
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

        {pasoActual.mediaPresion && (
          <p style={aviso}>Aquí la presión es la mitad. Si estiras el párpado, es demasiado.</p>
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
          Salir de la rutina
        </button>

        {pasoActual.fuente && (
          <p style={{ ...ayuda, marginTop: "1.2rem", fontSize: "0.78rem", opacity: 0.5 }}>
            {pasoActual.fuente}
          </p>
        )}
      </div>
    );
  }

  // ── Final ──────────────────────────────────────────────────
  return (
    <div ref={panelRef} style={{ ...panel, textAlign: "center" }}>
      <p style={rotulo}>Terminaste</p>
      <h2
        style={{
          fontFamily: "var(--font-grimoire)",
          fontSize: "clamp(1.4rem, 5vw, 2rem)",
          color: "#e8c878",
          letterSpacing: "0.08em",
          margin: "0.3rem 0 0.8rem",
        }}
      >
        {racha > 1 ? `${racha} días seguidos` : "Primera vez hecha"}
      </h2>
      <p style={{ ...ayuda, maxWidth: "44ch", margin: "0 auto 1.6rem" }}>
        La hinchazón baja hoy; el tono muscular es cosa de meses. En el único estudio que midió esto,
        el cambio se vio recién después de 20 semanas de práctica casi diaria.
      </p>

      <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", justifyContent: "center" }}>
        <button type="button" onClick={empezar} style={botonPri}>
          Hacerla de nuevo
        </button>
        <button type="button" onClick={() => setEtapa("eleccion")} style={botonSec}>
          Armar otra
        </button>
      </div>

      <p style={{ ...ayuda, marginTop: "1.6rem" }}>
        Si te faltó deslizante, un aceite vegetal sirve mejor que una crema:{" "}
        <Link href="/tienda" style={{ color: "#e8c878" }}>
          mira los de la tienda
        </Link>
        .
      </p>
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
const chip: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.94rem",
  textAlign: "left",
  color: "#d4c4a0",
  background: "rgba(13,26,13,0.5)",
  border: "1px solid rgba(200,160,80,0.28)",
  borderRadius: 5,
  padding: "0.6rem 0.85rem",
  minHeight: 44,
  cursor: "pointer",
};
const chipActivo: CSSProperties = {
  borderColor: "#e8c878",
  background: "rgba(200,160,80,0.16)",
  color: "#e8c878",
};
const fila: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.7rem",
  border: "1px solid rgba(200,160,80,0.14)",
  borderRadius: 5,
  padding: "0.5rem 0.7rem",
  background: "rgba(13,26,13,0.4)",
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
const aviso: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.9rem",
  color: "#dd9464",
  border: "1px solid rgba(221,148,100,0.3)",
  background: "rgba(221,148,100,0.08)",
  borderRadius: 5,
  padding: "0.55rem 0.8rem",
  margin: "0 auto 1.2rem",
  maxWidth: "44ch",
};

/* Se exporta para la página: cuántas maniobras tiene el catálogo, sin duplicar
   el número a mano en el texto. */
export const TOTAL_MANIOBRAS = CATALOGO.length;

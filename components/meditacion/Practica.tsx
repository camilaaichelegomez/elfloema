"use client";

import { Celebracion } from "@/components/florecer/Celebracion";
import { useCallback, useEffect, useRef, useState } from "react";
import { campana, contextoDeAudio } from "@/lib/campana";
import { MotorMusica, hayAudio } from "@/lib/musica-yoga";
import { hayVoz, usarVoz } from "@/lib/voz";
import { guardarDatos, hoy, leerDatos } from "@/lib/habitos/tipos";
import { NOMBRE_FAMILIA, TECNICAS, type Familia, type Tecnica } from "@/lib/meditacion/ciencia";
import { ayuda, botonPri, botonSec, panel, rotulo, titulo } from "@/components/habitos/estilos";

/* La práctica guiada.

   Eliges una técnica y un rato, y la app te va pasando las instrucciones de
   esa técnica en la pantalla —y con voz, si la quieres. No es una grabación:
   son los mismos textos que están escritos más abajo en la página, dichos en
   el momento en que toca cada uno.

   Lo que se guarda va al mismo sitio que las pausas de Hábitos, así que la
   meditación aparece en el calendario y en los gráficos sin tener que anotarla
   dos veces. */

const CLAVE_PREFS = "floema-meditacion";

type Prefs = { tecnica: string; minutos: number; voz: boolean; musica: boolean };

const PREFS_POR_DEFECTO: Prefs = { tecnica: "conteo", minutos: 5, voz: true, musica: true };

function leerPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(CLAVE_PREFS);
    if (!raw) return PREFS_POR_DEFECTO;
    return { ...PREFS_POR_DEFECTO, ...(JSON.parse(raw) as Partial<Prefs>) };
  } catch {
    return PREFS_POR_DEFECTO;
  }
}

function guardarPrefs(p: Prefs) {
  try {
    localStorage.setItem(CLAVE_PREFS, JSON.stringify(p));
  } catch {
    /* modo privado: la práctica igual corre, solo no recuerda la elección */
  }
}

/** Anota la práctica donde ya viven las pausas, para que salga en el calendario. */
function anotar(minutos: number) {
  try {
    const d = leerDatos();
    guardarDatos({ ...d, pausas: [...d.pausas, { fecha: hoy(), minutos }] });
  } catch {
    /* si no se puede guardar, la práctica ya ocurrió igual */
  }
}

export function Practica() {
  const [prefs, setPrefs] = useState<Prefs>(PREFS_POR_DEFECTO);
  const [listo, setListo] = useState(false);
  const [restante, setRestante] = useState<number | null>(null);
  const [indice, setIndice] = useState(0);
  const [hecha, setHecha] = useState<number | null>(null);
  const musica = useRef<MotorMusica | null>(null);
  const audio = useRef<AudioContext | null>(null);
  const dicho = useRef(-1);

  const tecnica: Tecnica = TECNICAS.find((t) => t.id === prefs.tecnica) ?? TECNICAS[0];
  const { decir, callar, desbloquear } = usarVoz(prefs.voz);

  useEffect(() => {
    setPrefs(leerPrefs());
    setListo(true);
  }, []);

  const cambiar = (p: Partial<Prefs>) => {
    setPrefs((v) => {
      const nuevo = { ...v, ...p };
      guardarPrefs(nuevo);
      return nuevo;
    });
  };

  const parar = useCallback(() => {
    musica.current?.detener();
    musica.current = null;
    callar();
    setRestante(null);
    dicho.current = -1;
  }, [callar]);

  useEffect(() => () => parar(), [parar]);

  /* El reloj. Cada segundo baja uno; cuando llega a cero suena la campana y la
     música se apaga de a poco, no de golpe. */
  useEffect(() => {
    if (restante === null) return;
    if (restante <= 0) {
      try {
        const ctx = audio.current;
        if (ctx) campana(ctx, ctx.currentTime);
      } catch {
        /* sin audio, igual termina */
      }
      const minutos = prefs.minutos;
      setTimeout(() => parar(), 5000);
      anotar(minutos);
      setHecha(minutos);
      setRestante(null);
      return;
    }
    const id = setTimeout(() => setRestante((r) => (r === null ? null : r - 1)), 1000);
    return () => clearTimeout(id);
  }, [restante, prefs.minutos, parar]);

  /* La guía: se mira qué fracción de la sesión va corrida y se muestra la
     instrucción que le toca. Se dice una sola vez cada una. */
  useEffect(() => {
    if (restante === null) return;
    const total = prefs.minutos * 60;
    const fraccion = 1 - restante / total;
    let i = 0;
    for (let k = 0; k < tecnica.guia.length; k++) {
      if (fraccion >= tecnica.guia[k].en) i = k;
    }
    if (i !== indice) setIndice(i);
    if (i !== dicho.current) {
      dicho.current = i;
      decir(tecnica.guia[i].texto, { velocidad: 0.86 });
    }
  }, [restante, prefs.minutos, tecnica, indice, decir]);

  const empezar = async () => {
    setHecha(null);
    setIndice(0);
    dicho.current = -1;
    // iOS no habla hasta que hubo un toque: este es el toque.
    if (prefs.voz) desbloquear();
    audio.current ??= contextoDeAudio();
    if (prefs.musica && hayAudio()) {
      try {
        const datos = leerDatos();
        const motor = new MotorMusica({
          modo: "relajar",
          volumen: datos.prefs.volumenMusica,
          binaural: false,
          agua: "ninguna",
        });
        await motor.empezar();
        musica.current = motor;
      } catch {
        /* si el navegador no deja sonar, la práctica corre en silencio */
      }
    }
    try {
      const ctx = audio.current;
      if (ctx) campana(ctx, ctx.currentTime, 0.7);
    } catch {
      /* da igual */
    }
    setRestante(prefs.minutos * 60);
  };

  const mm = (s: number) => `${Math.floor(s / 60)}:${`${s % 60}`.padStart(2, "0")}`;

  if (!listo) return <div style={{ ...panel, minHeight: 220 }} />;

  /* ── Corriendo ── */
  if (restante !== null) {
    const total = prefs.minutos * 60;
    const vuelta = 1 - restante / total;
    const perimetro = 2 * Math.PI * 52;
    return (
      <div style={{ ...panel, textAlign: "center" }}>
        <p style={rotulo}>
          {tecnica.nombre} · {prefs.minutos} minutos
        </p>
        <div style={{ position: "relative", width: 150, height: 150, margin: "0 auto 1.1rem" }}>
          <svg viewBox="0 0 120 120" width="150" height="150" aria-hidden="true">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(200,160,80,0.16)" strokeWidth="4" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="#a8c88a"
              strokeWidth="4"
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
              display: "grid",
              placeItems: "center",
              fontFamily: "var(--font-grimoire)",
              fontSize: "1.6rem",
              color: "#e8c878",
            }}
          >
            {mm(restante)}
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-crimson), serif",
            fontSize: "clamp(1.02rem, 2.6vw, 1.18rem)",
            lineHeight: 1.6,
            color: "rgba(168,200,138,0.92)",
            maxWidth: "32ch",
            margin: "0 auto 1.3rem",
            minHeight: "3.2em",
          }}
          aria-live="polite"
        >
          {tecnica.guia[indice].texto}
        </p>
        <button type="button" onClick={parar} style={botonSec}>
          Terminar antes
        </button>
      </div>
    );
  }

  /* ── Elegir ── */
  return (
    <div style={panel}>
      <h2 style={titulo}>Sentarse un rato</h2>
      {hecha !== null && <Celebracion tamano={80} />}
      {hecha !== null ? (
        <p style={{ ...ayuda, color: "rgba(168,200,138,0.9)" }}>
          {hecha} {hecha === 1 ? "minuto" : "minutos"} hechos, y anotados en tu calendario. Que la
          sesión se haya sentido bien o mal no cambia que cuenta.
        </p>
      ) : (
        <p style={ayuda}>
          Elige la técnica y el rato. La app te va pasando las instrucciones —en la pantalla, y con
          voz si la quieres—, y una campana abre y cierra la práctica. Cada técnica está explicada
          entera más abajo.
        </p>
      )}

      <p style={{ ...rotulo, marginTop: "0.4rem" }}>Qué vas a practicar</p>
      {/* Agrupadas por familia: quince botones seguidos eran un muro, y así
          además se ve de un vistazo qué tipo de práctica es cada una. */}
      {(Object.keys(NOMBRE_FAMILIA) as Familia[]).map((f) => {
        const delGrupo = TECNICAS.filter((t) => t.familia === f);
        if (delGrupo.length === 0) return null;
        return (
          <div key={f} style={{ marginBottom: "0.75rem" }}>
            <p style={{ ...rotulo, fontSize: "0.66rem", opacity: 0.75, margin: "0 0 0.35rem" }}>
              {NOMBRE_FAMILIA[f]}
            </p>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {delGrupo.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() =>
                    cambiar({
                      tecnica: t.id,
                      minutos: t.minutos.includes(prefs.minutos) ? prefs.minutos : t.minutos[0],
                    })
                  }
                  aria-pressed={t.id === prefs.tecnica}
                  style={{
                    ...botonSec,
                    padding: "0 0.8rem",
                    minHeight: 40,
                    fontSize: "0.7rem",
                    ...(t.id === prefs.tecnica
                      ? { background: "rgba(200,160,80,0.18)", color: "#e8c878" }
                      : null),
                  }}
                >
                  {t.nombre}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      <p style={{ ...ayuda, marginBottom: "0.9rem" }}>{tecnica.linea}</p>

      <p style={rotulo}>Cuánto rato</p>
      <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        {tecnica.minutos.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => cambiar({ minutos: m })}
            aria-pressed={prefs.minutos === m}
            style={{
              ...botonSec,
              padding: "0 1rem",
              ...(prefs.minutos === m ? { background: "rgba(200,160,80,0.16)", color: "#e8c878" } : null),
            }}
          >
            {m} min
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginBottom: "1.1rem" }}>
        {hayVoz() && (
          <button
            type="button"
            onClick={() => cambiar({ voz: !prefs.voz })}
            aria-pressed={prefs.voz}
            style={{
              ...botonSec,
              padding: "0 0.9rem",
              ...(prefs.voz ? { background: "rgba(200,160,80,0.16)", color: "#e8c878" } : null),
            }}
          >
            {prefs.voz ? "Con voz" : "Sin voz"}
          </button>
        )}
        <button
          type="button"
          onClick={() => cambiar({ musica: !prefs.musica })}
          aria-pressed={prefs.musica}
          style={{
            ...botonSec,
            padding: "0 0.9rem",
            ...(prefs.musica ? { background: "rgba(200,160,80,0.16)", color: "#e8c878" } : null),
          }}
        >
          {prefs.musica ? "Con música" : "En silencio"}
        </button>
      </div>

      <button type="button" onClick={() => void empezar()} style={botonPri}>
        Empezar
      </button>

      <p style={{ ...ayuda, margin: "1rem 0 0", fontSize: "0.86rem" }}>
        Si en algún momento se pone demasiado intenso, abre los ojos, siente los pies en el suelo y
        para. Parar no es fracasar.
      </p>
    </div>
  );
}

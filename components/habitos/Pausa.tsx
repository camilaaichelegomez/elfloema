"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MotorMusica, hayAudio, type ModoMusica } from "@/lib/musica-yoga";
import { PRESENCIA } from "@/lib/habitos/ciencia";
import { ayuda, botonPri, botonSec, panel, rotulo, titulo } from "./estilos";

/* La pausa: uno, tres o cinco minutos con música y nada más.

   Sin voz y sin cuento a propósito. La idea es poder hacerla entre dos cosas
   del día sin que se convierta en otra tarea: se elige el rato, suena la
   música, y una campana avisa al final. La música es la misma que la del
   Ritual de yoga, generada en vivo; no hay archivos que descargar. */

const MINUTOS = [1, 3, 5, 10];

function campana(ctx: AudioContext, cuando: number) {
  // Dos parciales y una caída larga: suena a cuenco, no a alarma.
  for (const [hz, vol, largo] of [
    [432, 0.22, 6],
    [648, 0.1, 4.5],
  ] as [number, number, number][]) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = hz;
    g.gain.setValueAtTime(0, cuando);
    g.gain.linearRampToValueAtTime(vol, cuando + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, cuando + largo);
    osc.connect(g).connect(ctx.destination);
    osc.start(cuando);
    osc.stop(cuando + largo + 0.1);
  }
}

export function Pausa({
  modo,
  volumen,
  alTerminar,
}: {
  modo: ModoMusica;
  volumen: number;
  alTerminar: (minutos: number) => void;
}) {
  const [minutos, setMinutos] = useState(3);
  const [restante, setRestante] = useState<number | null>(null);
  const [frase, setFrase] = useState(PRESENCIA[0]);
  const musica = useRef<MotorMusica | null>(null);
  const audio = useRef<AudioContext | null>(null);

  const parar = useCallback(() => {
    musica.current?.detener();
    musica.current = null;
    setRestante(null);
  }, []);

  useEffect(() => () => parar(), [parar]);

  useEffect(() => {
    if (restante === null) return;
    if (restante <= 0) {
      try {
        const ctx = audio.current;
        if (ctx) campana(ctx, ctx.currentTime);
      } catch {
        /* sin audio, igual termina */
      }
      // La música se apaga de a poco después de la campana, no de golpe.
      setTimeout(() => parar(), 4000);
      alTerminar(minutos);
      setRestante(null);
      return;
    }
    const id = setTimeout(() => setRestante((r) => (r === null ? null : r - 1)), 1000);
    return () => clearTimeout(id);
  }, [restante, minutos, parar, alTerminar]);

  const empezar = async () => {
    setFrase(PRESENCIA[Math.floor(Math.random() * PRESENCIA.length)]);
    if (hayAudio()) {
      try {
        const motor = new MotorMusica({ modo, volumen, binaural: false, agua: "ninguna" });
        await motor.empezar();
        musica.current = motor;
        type ConAudio = typeof window & { webkitAudioContext?: typeof AudioContext };
        const Ctor = window.AudioContext ?? (window as ConAudio).webkitAudioContext;
        if (Ctor) audio.current ??= new Ctor();
      } catch {
        /* Si el navegador no deja sonar, la pausa igual corre en silencio. */
      }
    }
    setRestante(minutos * 60);
  };

  const mm = (s: number) => `${Math.floor(s / 60)}:${`${s % 60}`.padStart(2, "0")}`;

  if (restante !== null) {
    const total = minutos * 60;
    const vuelta = 1 - restante / total;
    const perimetro = 2 * Math.PI * 52;
    return (
      <div style={{ ...panel, textAlign: "center" }}>
        <p style={rotulo}>Pausa de {minutos} minutos</p>
        <div style={{ position: "relative", width: 140, height: 140, margin: "0 auto 1rem" }}>
          <svg viewBox="0 0 120 120" width="140" height="140" aria-hidden="true">
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
        <p style={{ ...ayuda, maxWidth: "34ch", margin: "0 auto 1.2rem", color: "rgba(168,200,138,0.85)" }}>
          {frase}
        </p>
        <button type="button" onClick={parar} style={botonSec}>
          Terminar antes
        </button>
      </div>
    );
  }

  return (
    <div style={panel}>
      <h2 style={titulo}>Una pausa</h2>
      <p style={ayuda}>
        Música y nada más: sin voz, sin instrucciones. Al final suena una campana. Cuatro sesiones
        breves de atención bastaron, en un estudio controlado, para mejorar el ánimo y la atención
        sostenida; no hace falta una hora sentada.
      </p>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
        {MINUTOS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMinutos(m)}
            aria-pressed={minutos === m}
            style={{
              ...botonSec,
              padding: "0 1rem",
              ...(minutos === m ? { background: "rgba(200,160,80,0.16)", color: "#e8c878" } : null),
            }}
          >
            {m} min
          </button>
        ))}
      </div>
      <button type="button" onClick={() => void empezar()} style={botonPri}>
        Empezar la pausa
      </button>
    </div>
  );
}

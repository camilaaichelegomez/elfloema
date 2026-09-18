"use client";

import { useCallback, useEffect, useRef } from "react";

/* Música de fondo para el ritual, generada en el propio teléfono: no hay
   archivos de audio que descargar ni que se queden sin cargar sin conexión.

   Es un acorde que respira: varias notas sostenidas que suben y bajan de
   volumen muy despacio, cada una a su ritmo, como una respiración lenta.

   Está afinada sobre 528 Hz, la frecuencia que la tradición solfeggio asocia
   a la transformación. Eso es tradición, no un hecho: no hay estudios que
   muestren un efecto propio de esa frecuencia, y la app lo dice así. Lo que sí
   está bien estudiado es que la música lenta y suave baja el estrés y el
   ritmo cardíaco — y eso vale con cualquier afinación.

   528 Hz directo suena agudo y cansa. Por eso la base va dos octavas abajo
   (132 Hz), que es la misma nota, y el 528 queda arriba como un brillo muy
   tenue. */

const RAIZ = 528 / 4; // 132 Hz: la misma nota que 528, dos octavas más grave

/** [frecuencia, volumen] de cada voz del acorde. */
const VOCES: [number, number][] = [
  [RAIZ, 0.34], // base
  [RAIZ * 1.5, 0.2], // quinta
  [RAIZ * 2, 0.16], // octava
  [RAIZ * 2.5, 0.08], // tercera, arriba
  [528, 0.035], // el brillo
];

const VOLUMEN = 0.055; // bajo a propósito: la voz de la guía tiene que oírse encima
const ENTRADA = 3; // segundos de aparición
const SALIDA = 1.6; // segundos de desaparición

type Motor = {
  ctx: AudioContext;
  master: GainNode;
  nodos: OscillatorNode[];
};

export function usarMusica() {
  const motorRef = useRef<Motor | null>(null);

  const crear = (): Motor | null => {
    try {
      type ConAudio = typeof window & { webkitAudioContext?: typeof AudioContext };
      const Ctor = window.AudioContext ?? (window as ConAudio).webkitAudioContext;
      if (!Ctor) return null;
      const ctx = new Ctor();

      const master = ctx.createGain();
      master.gain.value = 0;

      // Un filtro que corta los agudos: sin él, las sinusoides suenan a teléfono.
      const filtro = ctx.createBiquadFilter();
      filtro.type = "lowpass";
      filtro.frequency.value = 1100;
      filtro.Q.value = 0.4;
      filtro.connect(master).connect(ctx.destination);

      const nodos: OscillatorNode[] = [];
      VOCES.forEach(([hz, vol], i) => {
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? "triangle" : "sine";
        osc.frequency.value = hz;
        // Un pelo desafinada cada voz: le da calidez, como un coro.
        osc.detune.value = (i % 2 === 0 ? 1 : -1) * (3 + i);

        const voz = ctx.createGain();
        voz.gain.value = vol;

        // La respiración de cada voz: un vaivén lentísimo, distinto en cada una
        // para que el acorde no suba y baje entero a la vez.
        const lfo = ctx.createOscillator();
        lfo.frequency.value = 0.045 + i * 0.017;
        const profundidad = ctx.createGain();
        profundidad.gain.value = vol * 0.55;
        lfo.connect(profundidad).connect(voz.gain);

        osc.connect(voz).connect(filtro);
        osc.start();
        lfo.start();
        nodos.push(osc, lfo);
      });

      return { ctx, master, nodos };
    } catch {
      return null; // sin audio disponible: la rutina sigue igual, sin música
    }
  };

  /** Hace sonar la música (o la retoma). Llamarla desde un toque del usuario:
   *  los navegadores no dejan empezar audio por su cuenta. */
  const iniciar = useCallback(() => {
    const m = (motorRef.current ??= crear());
    if (!m) return;
    if (m.ctx.state === "suspended") void m.ctx.resume();
    const t = m.ctx.currentTime;
    m.master.gain.cancelScheduledValues(t);
    m.master.gain.setValueAtTime(m.master.gain.value, t);
    m.master.gain.linearRampToValueAtTime(VOLUMEN, t + ENTRADA);
  }, []);

  /** La baja hasta el silencio sin apagarla, para retomarla sin cortes. */
  const pausar = useCallback(() => {
    const m = motorRef.current;
    if (!m) return;
    const t = m.ctx.currentTime;
    m.master.gain.cancelScheduledValues(t);
    m.master.gain.setValueAtTime(m.master.gain.value, t);
    m.master.gain.linearRampToValueAtTime(0, t + SALIDA);
  }, []);

  /** Apaga todo y libera el audio. */
  const detener = useCallback(() => {
    const m = motorRef.current;
    if (!m) return;
    motorRef.current = null;
    const t = m.ctx.currentTime;
    m.master.gain.cancelScheduledValues(t);
    m.master.gain.setValueAtTime(m.master.gain.value, t);
    m.master.gain.linearRampToValueAtTime(0, t + SALIDA);
    window.setTimeout(() => {
      m.nodos.forEach((n) => {
        try {
          n.stop();
        } catch {
          /* ya estaba detenido */
        }
      });
      void m.ctx.close().catch(() => {});
    }, SALIDA * 1000 + 100);
  }, []);

  // Si se sale de la página a mitad, que no quede sonando.
  useEffect(() => detener, [detener]);

  return { iniciar, pausar, detener };
}

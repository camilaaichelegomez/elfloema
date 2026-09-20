"use client";

import { useCallback, useEffect, useRef } from "react";

/* Sonido de fondo del ritual, generado en el propio teléfono: no hay archivos
   de audio que descargar ni que falten sin conexión.

   Hay tres ambientes, y los tres llevan debajo el mismo acorde: notas
   sostenidas que suben y bajan de volumen muy despacio, cada una a su ritmo,
   como una respiración lenta.

   El acorde está afinado sobre 528 Hz, la frecuencia que la tradición
   solfeggio asocia a la transformación. Eso es tradición, no un hecho: no hay
   estudios que muestren un efecto propio de esa frecuencia, y la app lo dice
   así. Lo que sí está bien estudiado es que la música lenta y suave baja el
   estrés y el ritmo cardíaco — y eso vale con cualquier afinación.

   528 Hz directo suena agudo y cansa. Por eso la base va dos octavas abajo
   (132 Hz), que es la misma nota, y el 528 queda arriba como un brillo tenue.

   El mar y el río son ruido filtrado: el mismo material del que están hechos
   en la vida real. El mar respira (olas que van y vienen cada diez segundos,
   graves); el río es parejo y más claro, como agua corriendo sobre piedras. */

const RAIZ = 528 / 4; // 132 Hz: la misma nota que 528, dos octavas más grave

/** [frecuencia, volumen] de cada voz del acorde. */
const VOCES: [number, number][] = [
  [RAIZ, 0.34], // base
  [RAIZ * 1.5, 0.2], // quinta
  [RAIZ * 2, 0.16], // octava
  [RAIZ * 2.5, 0.08], // tercera, arriba
  [528, 0.035], // el brillo
];

export type Ambiente = "acorde" | "mar" | "rio";

export const AMBIENTES: { id: Ambiente; label: string; detalle: string }[] = [
  { id: "acorde", label: "Acorde", detalle: "Notas suaves en 528 Hz, como una respiración." },
  { id: "mar", label: "Mar", detalle: "Olas que van y vienen, con el acorde debajo." },
  { id: "rio", label: "Río", detalle: "Agua corriendo, pareja, con el acorde debajo." },
];

/** Cuánto suena el acorde en cada ambiente: con agua se corre hacia atrás. */
const NIVEL_ACORDE: Record<Ambiente, number> = { acorde: 1, mar: 0.38, rio: 0.35 };
const NIVEL_MAR: Record<Ambiente, number> = { acorde: 0, mar: 1, rio: 0 };
const NIVEL_RIO: Record<Ambiente, number> = { acorde: 0, mar: 0, rio: 1 };

const VOLUMEN_MAX = 0.11; // con el control al máximo; a la mitad suena como antes
const ENTRADA = 3; // segundos de aparición
const SALIDA = 1.6; // segundos de desaparición
const CAMBIO = 1.4; // segundos para pasar de un ambiente a otro

type Motor = {
  ctx: AudioContext;
  master: GainNode;
  acorde: GainNode;
  mar: GainNode;
  rio: GainNode;
  nodos: (OscillatorNode | AudioBufferSourceNode)[];
};

/** Ruido en bucle, la materia prima del agua. Cuatro segundos alcanzan: al
 *  filtrarlo y moverlo no se nota que se repite. */
function ruido(ctx: AudioContext) {
  const largo = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(1, largo, ctx.sampleRate);
  const datos = buffer.getChannelData(0);
  let anterior = 0;
  for (let i = 0; i < largo; i++) {
    // Ruido suavizado: menos siseo agudo, más parecido al agua.
    anterior = (anterior + Math.random() * 2 - 1) * 0.5;
    datos[i] = anterior;
  }
  const fuente = ctx.createBufferSource();
  fuente.buffer = buffer;
  fuente.loop = true;
  return fuente;
}

/** Un vaivén lentísimo sobre un valor: las olas, y la respiración del acorde. */
function vaiven(ctx: AudioContext, destino: AudioParam, hz: number, profundidad: number) {
  const lfo = ctx.createOscillator();
  lfo.frequency.value = hz;
  const g = ctx.createGain();
  g.gain.value = profundidad;
  lfo.connect(g).connect(destino);
  lfo.start();
  return lfo;
}

export function usarMusica() {
  const motorRef = useRef<Motor | null>(null);
  const ambienteRef = useRef<Ambiente>("acorde");
  const volumenRef = useRef(0.5);
  const sonandoRef = useRef(false);

  const crear = (): Motor | null => {
    try {
      type ConAudio = typeof window & { webkitAudioContext?: typeof AudioContext };
      const Ctor = window.AudioContext ?? (window as ConAudio).webkitAudioContext;
      if (!Ctor) return null;
      const ctx = new Ctor();
      const nodos: Motor["nodos"] = [];

      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);

      // ── El acorde ──────────────────────────────────────────────────────
      const acorde = ctx.createGain();
      acorde.gain.value = NIVEL_ACORDE.acorde;
      acorde.connect(master);

      // Un filtro que corta los agudos: sin él, las sinusoides suenan a teléfono.
      const filtro = ctx.createBiquadFilter();
      filtro.type = "lowpass";
      filtro.frequency.value = 1100;
      filtro.Q.value = 0.4;
      filtro.connect(acorde);

      VOCES.forEach(([hz, vol], i) => {
        const osc = ctx.createOscillator();
        osc.type = i === 0 ? "triangle" : "sine";
        osc.frequency.value = hz;
        // Un pelo desafinada cada voz: le da calidez, como un coro.
        osc.detune.value = (i % 2 === 0 ? 1 : -1) * (3 + i);

        const voz = ctx.createGain();
        voz.gain.value = vol;
        // Cada voz respira a su ritmo, para que el acorde no suba y baje entero.
        nodos.push(vaiven(ctx, voz.gain, 0.045 + i * 0.017, vol * 0.55));

        osc.connect(voz).connect(filtro);
        osc.start();
        nodos.push(osc);
      });

      // ── El mar ─────────────────────────────────────────────────────────
      const mar = ctx.createGain();
      mar.gain.value = NIVEL_MAR.acorde;
      mar.connect(master);

      const olaFiltro = ctx.createBiquadFilter();
      olaFiltro.type = "lowpass";
      olaFiltro.frequency.value = 520;
      olaFiltro.Q.value = 0.7;
      // La espuma se abre cuando la ola rompe y se cierra al retirarse.
      nodos.push(vaiven(ctx, olaFiltro.frequency, 0.1, 280));

      const olaNivel = ctx.createGain();
      olaNivel.gain.value = 2.2;
      nodos.push(vaiven(ctx, olaNivel.gain, 0.1, 1.7)); // una ola cada ~10 s
      olaFiltro.connect(olaNivel).connect(mar);

      const fuenteMar = ruido(ctx);
      fuenteMar.connect(olaFiltro);
      fuenteMar.start();
      nodos.push(fuenteMar);

      // ── El río ─────────────────────────────────────────────────────────
      const rio = ctx.createGain();
      rio.gain.value = NIVEL_RIO.acorde;
      rio.connect(master);

      const rioFiltro = ctx.createBiquadFilter();
      rioFiltro.type = "bandpass";
      rioFiltro.frequency.value = 900;
      rioFiltro.Q.value = 0.8;
      nodos.push(vaiven(ctx, rioFiltro.frequency, 0.23, 160)); // el agua cambia de piedra

      const rioNivel = ctx.createGain();
      rioNivel.gain.value = 1.4;
      nodos.push(vaiven(ctx, rioNivel.gain, 0.17, 0.22)); // parejo, casi sin olas
      rioFiltro.connect(rioNivel).connect(rio);

      const fuenteRio = ruido(ctx);
      fuenteRio.connect(rioFiltro);
      fuenteRio.start();
      nodos.push(fuenteRio);

      return { ctx, master, acorde, mar, rio, nodos };
    } catch {
      return null; // sin audio disponible: la rutina sigue igual, sin música
    }
  };

  const rampa = (param: AudioParam, valor: number, ctx: AudioContext, segundos: number) => {
    const t = ctx.currentTime;
    param.cancelScheduledValues(t);
    param.setValueAtTime(param.value, t);
    param.linearRampToValueAtTime(valor, t + segundos);
  };

  /** Elige el ambiente y el volumen. Se puede llamar aunque no esté sonando:
   *  queda guardado para cuando empiece. */
  const configurar = useCallback((ambiente: Ambiente, volumen: number) => {
    ambienteRef.current = ambiente;
    volumenRef.current = Math.min(1, Math.max(0, volumen));
    const m = motorRef.current;
    if (!m) return;
    rampa(m.acorde.gain, NIVEL_ACORDE[ambiente], m.ctx, CAMBIO);
    rampa(m.mar.gain, NIVEL_MAR[ambiente], m.ctx, CAMBIO);
    rampa(m.rio.gain, NIVEL_RIO[ambiente], m.ctx, CAMBIO);
    if (sonandoRef.current) {
      rampa(m.master.gain, VOLUMEN_MAX * volumenRef.current, m.ctx, 0.35);
    }
  }, []);

  /** Hace sonar el fondo (o lo retoma). Llamarla desde un toque de la usuaria:
   *  los navegadores no dejan empezar audio por su cuenta. */
  const iniciar = useCallback(() => {
    const m = (motorRef.current ??= crear());
    if (!m) return;
    if (m.ctx.state === "suspended") void m.ctx.resume();
    const a = ambienteRef.current;
    m.acorde.gain.value = NIVEL_ACORDE[a];
    m.mar.gain.value = NIVEL_MAR[a];
    m.rio.gain.value = NIVEL_RIO[a];
    sonandoRef.current = true;
    rampa(m.master.gain, VOLUMEN_MAX * volumenRef.current, m.ctx, ENTRADA);
  }, []);

  /** Lo baja hasta el silencio sin apagarlo, para retomarlo sin cortes. */
  const pausar = useCallback(() => {
    const m = motorRef.current;
    if (!m) return;
    sonandoRef.current = false;
    rampa(m.master.gain, 0, m.ctx, SALIDA);
  }, []);

  /** Apaga todo y libera el audio. */
  const detener = useCallback(() => {
    const m = motorRef.current;
    if (!m) return;
    motorRef.current = null;
    sonandoRef.current = false;
    rampa(m.master.gain, 0, m.ctx, SALIDA);
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

  return { iniciar, pausar, detener, configurar };
}

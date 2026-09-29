/* La campana que abre y cierra una práctica.

   Dos parciales y una caída larga: suena a cuenco, no a alarma. Estaba
   escrita dentro de la Pausa de Hábitos; ahora la usan la Pausa y la
   Meditación, así que vive acá y es una sola. */

export function campana(ctx: AudioContext, cuando: number, volumen = 1) {
  for (const [hz, vol, largo] of [
    [432, 0.22, 6],
    [648, 0.1, 4.5],
  ] as [number, number, number][]) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = hz;
    g.gain.setValueAtTime(0, cuando);
    g.gain.linearRampToValueAtTime(vol * volumen, cuando + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, cuando + largo);
    osc.connect(g).connect(ctx.destination);
    osc.start(cuando);
    osc.stop(cuando + largo + 0.1);
  }
}

/** Un contexto de audio para la campana, creado la primera vez que se pide. */
export function contextoDeAudio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  type ConAudio = typeof window & { webkitAudioContext?: typeof AudioContext };
  const Ctor = window.AudioContext ?? (window as ConAudio).webkitAudioContext;
  if (!Ctor) return null;
  try {
    return new Ctor();
  } catch {
    return null;
  }
}

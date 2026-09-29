"use client";

/* Los paisajes sonoros: música y nada más, por el rato que elijas.

   Como la música del Ritual de yoga, no son archivos: se generan en vivo en el
   propio teléfono con Web Audio. Por eso funcionan sin internet, no pesan
   nada, no hay derechos de autor de por medio y nunca suenan igual dos veces.
   Una hora de mar son cero megas descargados.

   Seis paisajes, y cada uno está hecho de lo mismo de lo que está hecho el
   sonido de verdad:

   · MAR      — ruido grave que crece y se retira, una ola cada diez segundos.
   · RÍO      — agua corriendo sobre piedras: ruido filtrado que cambia de piedra.
   · LLUVIA   — lluvia pareja sobre un techo, con goteras sueltas encima.
   · BOSQUE   — viento entre las hojas, y pájaros que aparecen de vez en cuando.
   · PIANO    — notas sueltas de una escala pentatónica, con su eco. Nunca la
                misma melodía: se elige nota a nota mientras suena.
   · TONO     — un acorde sostenido que late muy despacio.

   Sobre el tono sostenido, que es lo que suele venderse como «frecuencias
   sanadoras»: acá se ofrece porque a mucha gente le ordena la cabeza, no
   porque una afinación cure algo. Los ensayos que compararon 432 Hz con 440 Hz
   no encontraron diferencias atribuibles a la afinación, y eso está escrito en
   la página. */

export type Paisaje = "mar" | "rio" | "lluvia" | "bosque" | "piano" | "tono";

export const PAISAJES: { id: Paisaje; nombre: string; linea: string }[] = [
  { id: "mar", nombre: "Mar", linea: "Olas que crecen y se retiran." },
  { id: "rio", nombre: "Río", linea: "Agua corriendo sobre piedras." },
  { id: "lluvia", nombre: "Lluvia", linea: "Lluvia pareja y goteras sueltas." },
  { id: "bosque", nombre: "Bosque", linea: "Viento en las hojas y pájaros." },
  { id: "piano", nombre: "Piano", linea: "Notas sueltas, sin melodía fija." },
  { id: "tono", nombre: "Frecuencias", linea: "Un acorde sostenido que late." },
];

/* Escala pentatónica de re: cinco notas que suenan bien en cualquier orden.
   Por eso el piano puede elegir al azar y no sonar nunca mal. */
const PENTATONICA = [146.83, 164.81, 196.0, 220.0, 293.66, 329.63, 392.0, 440.0, 587.33, 659.25];

export class MotorPaisaje {
  private ctx: AudioContext;
  private maestro: GainNode;
  private limitador: DynamicsCompressorNode;
  private eco: DelayNode | null = null;
  private fuentes: (OscillatorNode | AudioBufferSourceNode)[] = [];
  private reloj: ReturnType<typeof setInterval> | null = null;
  private proximo = 0;
  private detenido = false;
  private volumen: number;
  private paisaje: Paisaje;

  constructor(paisaje: Paisaje, volumen = 0.6) {
    type ConAudio = typeof window & { webkitAudioContext?: typeof AudioContext };
    const Ctor = window.AudioContext ?? (window as ConAudio).webkitAudioContext;
    if (!Ctor) throw new Error("Este navegador no genera audio");
    this.ctx = new Ctor();
    this.paisaje = paisaje;
    this.volumen = volumen;

    this.maestro = this.ctx.createGain();
    this.maestro.gain.value = 0;
    /* El mismo limitador de la música del yoga: sube lo que suena bajo y frena
       los picos, así el parlante de un teléfono no rompe el sonido. */
    this.limitador = this.ctx.createDynamicsCompressor();
    this.limitador.threshold.value = -18;
    this.limitador.knee.value = 12;
    this.limitador.ratio.value = 4;
    this.limitador.attack.value = 0.01;
    this.limitador.release.value = 0.4;
    this.maestro.connect(this.limitador).connect(this.ctx.destination);

    if (paisaje === "mar") this.armarMar();
    if (paisaje === "rio") this.armarRio();
    if (paisaje === "lluvia") this.armarLluvia();
    if (paisaje === "bosque") this.armarBosque();
    if (paisaje === "piano") this.armarPiano();
    if (paisaje === "tono") this.armarTono();
  }

  async empezar() {
    if (this.ctx.state === "suspended") await this.ctx.resume();
    const t = this.ctx.currentTime;
    // Entra de a poco: dos segundos. Un paisaje que aparece de golpe asusta.
    this.maestro.gain.cancelScheduledValues(t);
    this.maestro.gain.setValueAtTime(0.0001, t);
    this.maestro.gain.linearRampToValueAtTime(this.volumen, t + 2);
    if (this.paisaje === "piano" || this.paisaje === "bosque" || this.paisaje === "lluvia") {
      this.proximo = this.ctx.currentTime + 1.5;
      this.reloj = setInterval(() => this.programar(), 250);
    }
  }

  cambiarVolumen(v: number) {
    this.volumen = v;
    const t = this.ctx.currentTime;
    this.maestro.gain.cancelScheduledValues(t);
    this.maestro.gain.setTargetAtTime(v, t, 0.3);
  }

  /** Se apaga de a poco y recién después suelta el audio. */
  detener() {
    if (this.detenido) return;
    this.detenido = true;
    if (this.reloj) clearInterval(this.reloj);
    this.reloj = null;
    try {
      const t = this.ctx.currentTime;
      this.maestro.gain.cancelScheduledValues(t);
      this.maestro.gain.setValueAtTime(this.maestro.gain.value, t);
      this.maestro.gain.linearRampToValueAtTime(0.0001, t + 1.5);
    } catch {
      /* si ya estaba muerto, da igual */
    }
    setTimeout(() => {
      for (const f of this.fuentes) {
        try {
          f.stop();
        } catch {
          /* ya detenida */
        }
      }
      this.fuentes = [];
      void this.ctx.close().catch(() => {});
    }, 1700);
  }

  // ── Piezas comunes ─────────────────────────────────────────

  private ruido(color: "marron" | "blanco", segundos = 4) {
    const largo = Math.floor(this.ctx.sampleRate * segundos);
    const buffer = this.ctx.createBuffer(1, largo, this.ctx.sampleRate);
    const datos = buffer.getChannelData(0);
    let ultimo = 0;
    for (let i = 0; i < largo; i++) {
      const blanco = Math.random() * 2 - 1;
      if (color === "blanco") {
        datos[i] = blanco;
      } else {
        ultimo = (ultimo + 0.02 * blanco) / 1.02;
        datos[i] = ultimo * 3.5;
      }
    }
    return buffer;
  }

  /** Un vaivén lentísimo sobre cualquier valor: las olas, el viento. */
  private vaiven(destino: AudioParam, hz: number, profundidad: number) {
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = hz;
    const cuanto = this.ctx.createGain();
    cuanto.gain.value = profundidad;
    lfo.connect(cuanto).connect(destino);
    lfo.start();
    this.fuentes.push(lfo);
  }

  private fuenteDeRuido(color: "marron" | "blanco") {
    const fuente = this.ctx.createBufferSource();
    fuente.buffer = this.ruido(color);
    fuente.loop = true;
    fuente.start();
    this.fuentes.push(fuente);
    return fuente;
  }

  /** Un eco corto con realimentación: le da espacio al piano y a los pájaros. */
  private armarEco(retardo: number, devolucion: number) {
    const delay = this.ctx.createDelay(2);
    delay.delayTime.value = retardo;
    const vuelta = this.ctx.createGain();
    vuelta.gain.value = devolucion;
    const filtro = this.ctx.createBiquadFilter();
    filtro.type = "lowpass";
    filtro.frequency.value = 2200;
    delay.connect(filtro).connect(vuelta).connect(delay);
    delay.connect(this.maestro);
    this.eco = delay;
    return delay;
  }

  // ── Los seis paisajes ──────────────────────────────────────

  private armarMar() {
    const filtro = this.ctx.createBiquadFilter();
    filtro.type = "lowpass";
    filtro.frequency.value = 520;
    filtro.Q.value = 0.7;
    // La espuma se abre cuando la ola rompe y se cierra al retirarse.
    this.vaiven(filtro.frequency, 0.1, 280);
    const nivel = this.ctx.createGain();
    nivel.gain.value = 0.62;
    this.vaiven(nivel.gain, 0.1, 0.42);
    // Una segunda ola, más lenta y desfasada: el mar nunca es un solo ciclo.
    this.vaiven(nivel.gain, 0.037, 0.18);
    this.fuenteDeRuido("marron").connect(filtro).connect(nivel).connect(this.maestro);
  }

  private armarRio() {
    const filtro = this.ctx.createBiquadFilter();
    filtro.type = "bandpass";
    filtro.frequency.value = 900;
    filtro.Q.value = 0.8;
    this.vaiven(filtro.frequency, 0.23, 160); // el agua cambia de piedra
    const nivel = this.ctx.createGain();
    nivel.gain.value = 0.34;
    this.vaiven(nivel.gain, 0.17, 0.05);
    this.fuenteDeRuido("blanco").connect(filtro).connect(nivel).connect(this.maestro);

    // Debajo, el cuerpo grave del agua, que es lo que hace que suene cerca.
    const grave = this.ctx.createBiquadFilter();
    grave.type = "lowpass";
    grave.frequency.value = 300;
    const gv = this.ctx.createGain();
    gv.gain.value = 0.16;
    this.fuenteDeRuido("marron").connect(grave).connect(gv).connect(this.maestro);
  }

  private armarLluvia() {
    // La lluvia es ruido agudo y parejo; lo que la hace lluvia y no radio mal
    // sintonizada es el recorte de graves y el temblor lento del nivel.
    const alto = this.ctx.createBiquadFilter();
    alto.type = "highpass";
    alto.frequency.value = 900;
    const bajo = this.ctx.createBiquadFilter();
    bajo.type = "lowpass";
    bajo.frequency.value = 7000;
    const nivel = this.ctx.createGain();
    nivel.gain.value = 0.3;
    this.vaiven(nivel.gain, 0.045, 0.08);
    this.fuenteDeRuido("blanco").connect(alto).connect(bajo).connect(nivel).connect(this.maestro);

    // Y el techo: el retumbe grave de la lluvia sobre algo.
    const techo = this.ctx.createBiquadFilter();
    techo.type = "lowpass";
    techo.frequency.value = 260;
    const gt = this.ctx.createGain();
    gt.gain.value = 0.2;
    this.fuenteDeRuido("marron").connect(techo).connect(gt).connect(this.maestro);
    this.armarEco(0.18, 0.2);
  }

  private armarBosque() {
    // El viento: ruido grave que va y viene muy despacio.
    const filtro = this.ctx.createBiquadFilter();
    filtro.type = "lowpass";
    filtro.frequency.value = 700;
    this.vaiven(filtro.frequency, 0.021, 380);
    const nivel = this.ctx.createGain();
    nivel.gain.value = 0.3;
    this.vaiven(nivel.gain, 0.017, 0.16);
    this.fuenteDeRuido("marron").connect(filtro).connect(nivel).connect(this.maestro);

    // Las hojas: ruido agudo, muy bajo, siempre presente.
    const hojas = this.ctx.createBiquadFilter();
    hojas.type = "bandpass";
    hojas.frequency.value = 3200;
    hojas.Q.value = 0.6;
    const gh = this.ctx.createGain();
    gh.gain.value = 0.045;
    this.vaiven(gh.gain, 0.05, 0.03);
    this.fuenteDeRuido("blanco").connect(hojas).connect(gh).connect(this.maestro);

    this.armarEco(0.27, 0.3); // el bosque tiene eco: por eso suena a bosque
  }

  private armarPiano() {
    // Una sombra grave debajo, para que las notas no queden colgando solas.
    for (const f of [73.42, 110]) {
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      const g = this.ctx.createGain();
      g.gain.value = 0.05;
      this.vaiven(g.gain, 0.03, 0.02);
      osc.connect(g).connect(this.maestro);
      osc.start();
      this.fuentes.push(osc);
    }
    this.armarEco(0.42, 0.34);
  }

  private armarTono() {
    /* Un acorde sostenido con las voces levemente desafinadas entre sí: esa
       diferencia de pocos hertz es la que produce el latido lento. */
    for (const [f, vol] of [
      [110, 0.16],
      [110.4, 0.14],
      [164.81, 0.1],
      [220, 0.09],
      [329.63, 0.05],
      [440, 0.03],
    ] as [number, number][]) {
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = f;
      const g = this.ctx.createGain();
      g.gain.value = vol;
      this.vaiven(g.gain, 0.02 + Math.random() * 0.03, vol * 0.4);
      osc.connect(g).connect(this.maestro);
      osc.start();
      this.fuentes.push(osc);
    }
    const aire = this.ctx.createBiquadFilter();
    aire.type = "lowpass";
    aire.frequency.value = 380;
    const ga = this.ctx.createGain();
    ga.gain.value = 0.1;
    this.fuenteDeRuido("marron").connect(aire).connect(ga).connect(this.maestro);
  }

  // ── Lo que aparece de a ratos ──────────────────────────────

  /* Los pájaros, las goteras y las notas del piano no pueden estar sonando
     todo el rato: se programan de a poco, con el reloj del audio y no con
     setTimeout, para que no se atrasen si el teléfono está ocupado. */
  private programar() {
    if (this.detenido) return;
    const horizonte = this.ctx.currentTime + 1;
    while (this.proximo < horizonte) {
      if (this.paisaje === "piano") {
        this.nota(this.proximo);
        this.proximo += 1.8 + Math.random() * 4.2;
      } else if (this.paisaje === "bosque") {
        this.pajaro(this.proximo);
        this.proximo += 3 + Math.random() * 9;
      } else {
        this.gota(this.proximo);
        this.proximo += 0.4 + Math.random() * 2.4;
      }
    }
  }

  /** Una nota de piano: ataque instantáneo y caída larga, con sus armónicos. */
  private nota(cuando: number) {
    const f = PENTATONICA[Math.floor(Math.random() * PENTATONICA.length)];
    const largo = 3 + Math.random() * 2;
    const salida = this.ctx.createGain();
    salida.gain.value = 0.34;
    salida.connect(this.maestro);
    if (this.eco) salida.connect(this.eco);

    for (const [mult, vol, tipo] of [
      [1, 1, "sine"],
      [2, 0.28, "sine"],
      [3, 0.1, "triangle"],
      [4.01, 0.05, "sine"],
    ] as [number, number, OscillatorType][]) {
      const osc = this.ctx.createOscillator();
      osc.type = tipo;
      osc.frequency.value = f * mult;
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, cuando);
      g.gain.linearRampToValueAtTime(vol * 0.3, cuando + 0.008);
      g.gain.exponentialRampToValueAtTime(0.0001, cuando + largo * (mult > 2 ? 0.4 : 1));
      osc.connect(g).connect(salida);
      osc.start(cuando);
      osc.stop(cuando + largo + 0.1);
    }
    // De vez en cuando, dos notas juntas: le da aire de que alguien la toca.
    if (Math.random() < 0.22) {
      const otra = PENTATONICA[Math.floor(Math.random() * PENTATONICA.length)];
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = otra;
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, cuando + 0.06);
      g.gain.linearRampToValueAtTime(0.16, cuando + 0.07);
      g.gain.exponentialRampToValueAtTime(0.0001, cuando + largo);
      osc.connect(g).connect(salida);
      osc.start(cuando + 0.06);
      osc.stop(cuando + largo + 0.1);
    }
  }

  /** Un pájaro: dos o tres silbidos cortos que suben y bajan. */
  private pajaro(cuando: number) {
    const cuantos = 2 + Math.floor(Math.random() * 3);
    const base = 2200 + Math.random() * 1800;
    const lado = this.ctx.createStereoPanner();
    lado.pan.value = Math.random() * 1.6 - 0.8; // nunca están todos al frente
    const salida = this.ctx.createGain();
    salida.gain.value = 0.09;
    lado.connect(salida).connect(this.maestro);
    if (this.eco) salida.connect(this.eco);

    for (let i = 0; i < cuantos; i++) {
      const t = cuando + i * (0.1 + Math.random() * 0.14);
      const largo = 0.05 + Math.random() * 0.08;
      const osc = this.ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(base, t);
      osc.frequency.exponentialRampToValueAtTime(base * (0.7 + Math.random() * 0.7), t + largo);
      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(1, t + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t + largo);
      osc.connect(g).connect(lado);
      osc.start(t);
      osc.stop(t + largo + 0.05);
    }
  }

  /** Una gotera: un golpe corto y agudo sobre la lluvia pareja. */
  private gota(cuando: number) {
    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    const f = 900 + Math.random() * 1600;
    osc.frequency.setValueAtTime(f, cuando);
    osc.frequency.exponentialRampToValueAtTime(f * 0.55, cuando + 0.05);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, cuando);
    g.gain.linearRampToValueAtTime(0.035 + Math.random() * 0.03, cuando + 0.004);
    g.gain.exponentialRampToValueAtTime(0.0001, cuando + 0.09);
    const lado = this.ctx.createStereoPanner();
    lado.pan.value = Math.random() * 1.4 - 0.7;
    osc.connect(g).connect(lado).connect(this.maestro);
    if (this.eco) lado.connect(this.eco);
    osc.start(cuando);
    osc.stop(cuando + 0.15);
  }
}

/** ¿Este navegador genera audio? Para no ofrecer un botón que no hace nada. */
export function hayPaisajes() {
  if (typeof window === "undefined") return false;
  type ConAudio = typeof window & { webkitAudioContext?: typeof AudioContext };
  return !!(window.AudioContext ?? (window as ConAudio).webkitAudioContext);
}

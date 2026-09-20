"use client";

/* La música de fondo de la práctica.

   No es un archivo de audio: se genera en vivo con el propio navegador (Web
   Audio). Por eso funciona sin internet, no pesa nada, no tiene derechos de
   autor y nunca se repite igual.

   Hay dos paisajes:

   · RELAJAR — un acorde grave y abierto que "respira": sube y baja de volumen
     seis veces por minuto, que es exactamente el ritmo de la respiración 4-6
     de la app, la que tiene respaldo para activar el sistema de reposo. Debajo,
     un ruido marrón muy suave, como viento o mar lejano.

   · ACTIVAR — un acorde más brillante y un pulso de notas punteadas a 96 por
     minuto, con un roce de percusión entre medio. Acompaña el movimiento sin
     apurarlo.

   Y lo que hace que tenga sentido dentro de una clase: si la práctica empezó
   en "activar", al llegar al enfriamiento y al savasana la música se funde
   sola hacia "relajar". La música sigue el arco de la clase.

   Los pulsos binaurales van aparte y apagados por defecto: necesitan
   audífonos para existir, y su evidencia es mixta. Se ofrecen, pero no se
   venden como medicina. */

export type ModoMusica = "relajar" | "activar";

/* Un paisaje de agua encima de la música, el mismo del ritual facial: el mar
   respira (una ola cada diez segundos) y el río corre parejo. Los dos son
   ruido filtrado, que es de lo que está hecha el agua de verdad. */
export type Agua = "ninguna" | "mar" | "rio";

type Config = {
  modo: ModoMusica;
  volumen: number; // 0 a 1
  binaural: boolean;
  agua: Agua;
};

// Acordes abiertos: sin terceras en el grave, que es lo que los hace calmos.
// La octava de arriba (330–494 Hz) no es adorno: el parlante de un teléfono
// casi no reproduce 110 Hz, y sin ella el acorde de relajar apenas se oía.
const ACORDE_RELAJAR = [110, 164.81, 220, 246.94, 329.63, 440, 493.88]; // la, mi, la, si, mi, la, si — suspendido
const ACORDE_ACTIVAR = [146.83, 220, 293.66, 369.99, 440, 587.33]; // re, la, re, fa#, la, re — mayor abierto
const ARPEGIO_ACTIVAR = [293.66, 369.99, 440, 587.33, 440, 369.99]; // re fa# la re la fa#

// Diferencia entre oído izquierdo y derecho: 6 Hz (theta) para relajar,
// 14 Hz (beta bajo) para activar. Portadora grave para que no moleste.
const BINAURAL = {
  relajar: { base: 180, pulso: 6 },
  activar: { base: 200, pulso: 14 },
};

const PULSOS_POR_MINUTO = 96;

export class MotorMusica {
  private ctx: AudioContext;
  private maestro: GainNode;
  private duck: GainNode;
  private limitador: DynamicsCompressorNode;
  private capa: Record<ModoMusica, GainNode>;
  private binauralGanancia: GainNode;
  private binauralIzq: OscillatorNode;
  private binauralDer: OscillatorNode;
  private agua: Record<"mar" | "rio", GainNode>;
  private fuentes: (OscillatorNode | AudioBufferSourceNode)[] = [];
  private reloj: ReturnType<typeof setInterval> | null = null;
  private proximoPulso = 0;
  private nota = 0;
  private config: Config;
  private detenido = false;
  private escucharVoz: (e: Event) => void;

  constructor(config: Config) {
    type ConAudio = typeof window & { webkitAudioContext?: typeof AudioContext };
    const Ctor = window.AudioContext ?? (window as ConAudio).webkitAudioContext;
    if (!Ctor) throw new Error("Este navegador no genera audio");
    this.ctx = new Ctor();
    this.config = config;

    this.maestro = this.ctx.createGain();
    this.maestro.gain.value = 0;
    // Una capa extra solo para bajar la música mientras habla la voz.
    this.duck = this.ctx.createGain();
    this.duck.gain.value = 1;
    /* Un compresor al final: sube lo que suena bajo y frena los picos, así
       el volumen puede ir alto sin que el sonido se rompa en el parlante. */
    this.limitador = this.ctx.createDynamicsCompressor();
    this.limitador.threshold.value = -18;
    this.limitador.knee.value = 12;
    this.limitador.ratio.value = 4;
    this.limitador.attack.value = 0.01;
    this.limitador.release.value = 0.4;
    this.maestro.connect(this.duck).connect(this.limitador).connect(this.ctx.destination);

    this.capa = {
      relajar: this.ctx.createGain(),
      activar: this.ctx.createGain(),
    };
    this.capa.relajar.gain.value = config.modo === "relajar" ? 1 : 0;
    this.capa.activar.gain.value = config.modo === "activar" ? 1 : 0;
    this.capa.relajar.connect(this.maestro);
    this.capa.activar.connect(this.maestro);

    this.armarRelajar();
    this.armarActivar();

    /* El agua cuelga del maestro, no de las capas: así sigue sonando igual
       cuando la clase pasa de activar a relajar. */
    this.agua = { mar: this.ctx.createGain(), rio: this.ctx.createGain() };
    this.agua.mar.gain.value = config.agua === "mar" ? 1 : 0;
    this.agua.rio.gain.value = config.agua === "rio" ? 1 : 0;
    this.agua.mar.connect(this.maestro);
    this.agua.rio.connect(this.maestro);
    this.armarMar();
    this.armarRio();

    // Binaurales: un tono a cada oído, separados unos pocos hertz.
    this.binauralGanancia = this.ctx.createGain();
    this.binauralGanancia.gain.value = config.binaural ? 0.05 : 0;
    this.binauralGanancia.connect(this.maestro);
    const { base, pulso } = BINAURAL[config.modo];
    this.binauralIzq = this.tonoPaneado(base, -1);
    this.binauralDer = this.tonoPaneado(base + pulso, 1);

    this.escucharVoz = (e: Event) => {
      const hablando = e.type === "floema-voz-inicio";
      const t = this.ctx.currentTime;
      this.duck.gain.cancelScheduledValues(t);
      this.duck.gain.setTargetAtTime(hablando ? 0.5 : 1, t, hablando ? 0.15 : 0.6);
    };
    window.addEventListener("floema-voz-inicio", this.escucharVoz);
    window.addEventListener("floema-voz-fin", this.escucharVoz);
  }

  // ── Las piezas ─────────────────────────────────────────────

  private tonoPaneado(frecuencia: number, lado: -1 | 1) {
    const osc = this.ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = frecuencia;
    const pan = this.ctx.createStereoPanner();
    pan.pan.value = lado;
    osc.connect(pan).connect(this.binauralGanancia);
    osc.start();
    this.fuentes.push(osc);
    return osc;
  }

  /** Un acorde de osciladores levemente desafinados entre sí: eso le da cuerpo. */
  private acorde(frecuencias: number[], destino: AudioNode, brillo: number, volumen: number) {
    const filtro = this.ctx.createBiquadFilter();
    filtro.type = "lowpass";
    filtro.frequency.value = brillo;
    filtro.Q.value = 0.4;
    const salida = this.ctx.createGain();
    salida.gain.value = volumen;
    filtro.connect(salida).connect(destino);

    for (const f of frecuencias) {
      for (const [tipo, desafino] of [
        ["sine", 0],
        ["triangle", 4],
        ["sine", -5],
      ] as [OscillatorType, number][]) {
        const osc = this.ctx.createOscillator();
        osc.type = tipo;
        osc.frequency.value = f;
        osc.detune.value = desafino;
        const g = this.ctx.createGain();
        g.gain.value = 1 / (frecuencias.length * 3);
        osc.connect(g).connect(filtro);
        osc.start();
        this.fuentes.push(osc);
      }
    }
    return salida;
  }

  /** Oscilación lenta de volumen: es lo que hace que el sonido "respire". */
  private respiracion(destino: GainNode, porMinuto: number, profundidad: number) {
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = porMinuto / 60;
    const cuanto = this.ctx.createGain();
    cuanto.gain.value = profundidad;
    lfo.connect(cuanto).connect(destino.gain);
    lfo.start();
    this.fuentes.push(lfo);
  }

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
        // Ruido marrón: cada muestra se arrastra de la anterior. Suena grave,
        // como viento o mar de lejos, y no cansa como el blanco.
        ultimo = (ultimo + 0.02 * blanco) / 1.02;
        datos[i] = ultimo * 3.5;
      }
    }
    return buffer;
  }

  private armarRelajar() {
    const acorde = this.acorde(ACORDE_RELAJAR, this.capa.relajar, 900, 0.55);
    // Seis ciclos por minuto: el mismo ritmo que la respiración 4-6.
    this.respiracion(acorde, 6, 0.22);

    const fuente = this.ctx.createBufferSource();
    fuente.buffer = this.ruido("marron");
    fuente.loop = true;
    const filtro = this.ctx.createBiquadFilter();
    filtro.type = "lowpass";
    filtro.frequency.value = 420;
    const g = this.ctx.createGain();
    g.gain.value = 0.18;
    fuente.connect(filtro).connect(g).connect(this.capa.relajar);
    fuente.start();
    this.fuentes.push(fuente);
  }

  /** El mar: ruido grave que crece y se retira, una ola cada diez segundos. */
  private armarMar() {
    const fuente = this.ctx.createBufferSource();
    fuente.buffer = this.ruido("marron");
    fuente.loop = true;

    const filtro = this.ctx.createBiquadFilter();
    filtro.type = "lowpass";
    filtro.frequency.value = 520;
    filtro.Q.value = 0.7;
    // La espuma se abre cuando la ola rompe y se cierra al retirarse.
    this.vaiven(filtro.frequency, 0.1, 280);

    const nivel = this.ctx.createGain();
    nivel.gain.value = 0.55;
    this.vaiven(nivel.gain, 0.1, 0.4);

    fuente.connect(filtro).connect(nivel).connect(this.agua.mar);
    fuente.start();
    this.fuentes.push(fuente);
  }

  /** El río: agua corriendo sobre piedras, pareja y más clara. */
  private armarRio() {
    const fuente = this.ctx.createBufferSource();
    fuente.buffer = this.ruido("blanco");
    fuente.loop = true;

    const filtro = this.ctx.createBiquadFilter();
    filtro.type = "bandpass";
    filtro.frequency.value = 900;
    filtro.Q.value = 0.8;
    this.vaiven(filtro.frequency, 0.23, 160); // el agua cambia de piedra

    const nivel = this.ctx.createGain();
    nivel.gain.value = 0.3;
    this.vaiven(nivel.gain, 0.17, 0.05);

    fuente.connect(filtro).connect(nivel).connect(this.agua.rio);
    fuente.start();
    this.fuentes.push(fuente);
  }

  /** Un vaivén lentísimo sobre cualquier valor: las olas, el agua que cambia. */
  private vaiven(destino: AudioParam, hz: number, profundidad: number) {
    const lfo = this.ctx.createOscillator();
    lfo.frequency.value = hz;
    const cuanto = this.ctx.createGain();
    cuanto.gain.value = profundidad;
    lfo.connect(cuanto).connect(destino);
    lfo.start();
    this.fuentes.push(lfo);
  }

  private armarActivar() {
    const acorde = this.acorde(ACORDE_ACTIVAR, this.capa.activar, 2200, 0.32);
    this.respiracion(acorde, 15, 0.1);

    // El pulso se programa con el reloj del audio, no con setTimeout: así no
    // se atrasa aunque el teléfono esté ocupado.
    this.proximoPulso = this.ctx.currentTime + 0.1;
    const intervalo = 60 / PULSOS_POR_MINUTO;
    this.reloj = setInterval(() => {
      while (this.proximoPulso < this.ctx.currentTime + 0.15) {
        this.punteo(ARPEGIO_ACTIVAR[this.nota % ARPEGIO_ACTIVAR.length], this.proximoPulso);
        if (this.nota % 2 === 1) this.roce(this.proximoPulso + intervalo / 2);
        this.nota++;
        this.proximoPulso += intervalo;
      }
    }, 40);
  }

  /** Una nota corta, como una cuerda pulsada suave. */
  private punteo(frecuencia: number, cuando: number) {
    if (this.capa.activar.gain.value < 0.01) return; // no gastar si no suena
    const osc = this.ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = frecuencia;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0, cuando);
    g.gain.linearRampToValueAtTime(0.09, cuando + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, cuando + 0.55);
    osc.connect(g).connect(this.capa.activar);
    osc.start(cuando);
    osc.stop(cuando + 0.6);
  }

  /** Un roce de percusión entre pulso y pulso. */
  private roce(cuando: number) {
    if (this.capa.activar.gain.value < 0.01) return;
    const fuente = this.ctx.createBufferSource();
    fuente.buffer = this.ruido("blanco", 0.08);
    const filtro = this.ctx.createBiquadFilter();
    filtro.type = "highpass";
    filtro.frequency.value = 6000;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(0.025, cuando);
    g.gain.exponentialRampToValueAtTime(0.0001, cuando + 0.07);
    fuente.connect(filtro).connect(g).connect(this.capa.activar);
    fuente.start(cuando);
  }

  // ── Lo que usa la app ──────────────────────────────────────

  async empezar() {
    if (this.ctx.state === "suspended") await this.ctx.resume();
    const t = this.ctx.currentTime;
    this.maestro.gain.cancelScheduledValues(t);
    this.maestro.gain.setValueAtTime(this.maestro.gain.value, t);
    // Entra de a poco: tres segundos, no de golpe.
    this.maestro.gain.linearRampToValueAtTime(this.ganancia(), t + 3);
  }

  /** Cambia de paisaje fundiendo uno en el otro, sin cortes. */
  cambiarModo(modo: ModoMusica) {
    if (modo === this.config.modo) return;
    this.config.modo = modo;
    const t = this.ctx.currentTime;
    for (const m of ["relajar", "activar"] as ModoMusica[]) {
      const g = this.capa[m].gain;
      g.cancelScheduledValues(t);
      g.setValueAtTime(g.value, t);
      g.linearRampToValueAtTime(m === modo ? 1 : 0, t + 8);
    }
    const { base, pulso } = BINAURAL[modo];
    this.binauralIzq.frequency.linearRampToValueAtTime(base, t + 8);
    this.binauralDer.frequency.linearRampToValueAtTime(base + pulso, t + 8);
  }

  /* De la barra de volumen (0 a 1) a la ganancia real. Antes era la mitad
     de la barra y en el teléfono no se escuchaba: ahora la barra al máximo
     es tres veces más fuerte, y el compresor cuida que no se rompa. */
  private ganancia() {
    return this.config.volumen * 1.6;
  }

  ajustarVolumen(volumen: number) {
    this.config.volumen = volumen;
    const t = this.ctx.currentTime;
    this.maestro.gain.cancelScheduledValues(t);
    this.maestro.gain.setTargetAtTime(this.ganancia(), t, 0.2);
  }

  /** Cambia de agua fundiendo una en la otra, sin cortes. */
  ajustarAgua(agua: Agua) {
    this.config.agua = agua;
    const t = this.ctx.currentTime;
    for (const cual of ["mar", "rio"] as const) {
      const g = this.agua[cual].gain;
      g.cancelScheduledValues(t);
      g.setValueAtTime(g.value, t);
      g.linearRampToValueAtTime(agua === cual ? 1 : 0, t + 2);
    }
  }

  ajustarBinaural(activo: boolean) {
    this.config.binaural = activo;
    this.binauralGanancia.gain.setTargetAtTime(activo ? 0.05 : 0, this.ctx.currentTime, 0.4);
  }

  pausar() {
    const t = this.ctx.currentTime;
    this.maestro.gain.cancelScheduledValues(t);
    this.maestro.gain.setTargetAtTime(0, t, 0.25);
    setTimeout(() => {
      if (!this.detenido) void this.ctx.suspend();
    }, 1200);
  }

  async seguir() {
    await this.empezar();
  }

  /** Se apaga de a poco y libera el audio. */
  detener() {
    if (this.detenido) return;
    this.detenido = true;
    window.removeEventListener("floema-voz-inicio", this.escucharVoz);
    window.removeEventListener("floema-voz-fin", this.escucharVoz);
    const t = this.ctx.currentTime;
    this.maestro.gain.cancelScheduledValues(t);
    this.maestro.gain.setTargetAtTime(0, t, 0.5);
    if (this.reloj) clearInterval(this.reloj);
    setTimeout(() => {
      for (const f of this.fuentes) {
        try {
          f.stop();
        } catch {
          /* ya estaba detenida */
        }
      }
      void this.ctx.close();
    }, 2500);
  }
}

/* Qué paisaje corresponde, si la persona dejó "automático". De noche, o si
   busca calma, dormir o alivio, relajar. Si busca energía o fuerza, o la
   práctica es intensa, activar. Ante la duda, relajar: es el que no molesta. */
export function modoAutomatico(p: {
  objetivos: string[];
  momento: string;
  intensidad: string;
}): ModoMusica {
  const calma = ["calma", "dormir", "menstrual", "embarazo"].some((o) => p.objetivos.includes(o));
  const energia = ["energia", "fuerza"].some((o) => p.objetivos.includes(o));
  if (p.momento === "noche" || calma) return "relajar";
  if (energia || p.intensidad === "fuerte") return "activar";
  return "relajar";
}

/* Las fases del final de la clase. Ahí la música se va sola a relajar,
   aunque la práctica haya empezado activa. */
export const FASES_DE_CIERRE = ["enfriamiento", "respiracion_final", "savasana", "meditacion"];

export function hayAudio() {
  if (typeof window === "undefined") return false;
  type ConAudio = typeof window & { webkitAudioContext?: typeof AudioContext };
  return !!(window.AudioContext ?? (window as ConAudio).webkitAudioContext);
}

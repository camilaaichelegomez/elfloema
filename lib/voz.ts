"use client";

import { useCallback, useEffect, useRef } from "react";

/* La voz que guía la práctica.

   Usa la voz del propio navegador (speechSynthesis), no un servicio de audio.
   Tres razones, en orden de peso:

   1. Funciona sin internet. Las dos apps se instalan en el teléfono y la idea
      es practicar sin depender de la señal.
   2. No cuesta nada y no hay archivos que generar: los textos de las posturas
      cambian y la voz los lee tal cual, sin tener que regrabar nada.
   3. Habla apenas se lo pides. Un servicio de audio tendría que descargar el
      clip justo cuando cambia la postura, que es el peor momento.

   Lo que se pierde es calidez: es una voz sintética. Si algún día queremos una
   voz de verdad, los textos son fijos y se pueden grabar una vez.

   Nota de iOS: Safari no deja hablar hasta que la persona toca algo. Por eso
   `desbloquear` se llama desde el botón de empezar, no desde el temporizador. */

type Opciones = {
  /** Más bajo que 1 = más lento. La guía de una práctica va lenta. */
  velocidad?: number;
  /** Se dice después de todo lo anterior de la cola. */
  enCola?: boolean;
};

/* Qué tan buena suena una voz, para ordenarlas. No todas las del sistema son
   iguales: las de Google y las de Siri son de las que suenan naturales, y las
   antiguas de Microsoft son las que suenan a robot de los noventa. Como no hay
   forma de preguntarle eso al navegador, se ordena por el nombre. */
function calidad(v: SpeechSynthesisVoice) {
  const nombre = v.name.toLowerCase();
  let puntos = 0;
  if (/google/.test(nombre)) puntos += 5;
  if (/siri/.test(nombre)) puntos += 5;
  if (/natural|neural|premium|enhanced|mejorada/.test(nombre)) puntos += 4;
  if (/microsoft/.test(nombre)) puntos -= 1;
  // Acento: primero el de acá, después el resto de América.
  if (/es[-_]CL/i.test(v.lang)) puntos += 3;
  else if (/es[-_](MX|AR|US|CO|PE)/i.test(v.lang)) puntos += 2;
  return puntos;
}

/** Las voces en español que tiene este dispositivo, de la que mejor suena a la peor. */
export function vocesEnEspanol(): SpeechSynthesisVoice[] {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  return window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang.toLowerCase().startsWith("es"))
    .sort((a, b) => calidad(b) - calidad(a));
}

export function usarVoz(activa: boolean, nombreElegido?: string) {
  const vozRef = useRef<SpeechSynthesisVoice | null>(null);

  // Las voces llegan tarde en varios navegadores: hay que esperar el aviso.
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const elegir = () => {
      const enEspanol = vocesEnEspanol();
      if (enEspanol.length === 0) return;
      vozRef.current =
        (nombreElegido && enEspanol.find((v) => v.name === nombreElegido)) || enEspanol[0];
    };

    elegir();
    window.speechSynthesis.addEventListener("voiceschanged", elegir);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", elegir);
  }, [nombreElegido]);

  const callar = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
  }, []);

  const decir = useCallback(
    (texto: string, { velocidad = 0.92, enCola = false }: Opciones = {}) => {
      if (!activa || !texto) return;
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      try {
        const hablar = () => {
          const frase = new SpeechSynthesisUtterance(texto);
          if (vozRef.current) frase.voice = vozRef.current;
          frase.lang = vozRef.current?.lang ?? "es-ES";
          frase.rate = velocidad;
          frase.pitch = 1;
          /* Chrome deja la sintesis en pausa cuando la pestaña pierde el foco y
             no la reanuda solo. Sin esto, la voz enmudece a mitad de práctica. */
          window.speechSynthesis.resume();
          window.speechSynthesis.speak(frase);
        };

        if (enCola || !window.speechSynthesis.speaking) {
          hablar();
          return;
        }
        /* Cancelar y hablar en el mismo tic hace que Chrome se trague la frase
           (es un error conocido suyo). Hay que darle un respiro. */
        window.speechSynthesis.cancel();
        setTimeout(hablar, 140);
      } catch {
        /* Si el navegador no quiere hablar, la práctica sigue igual. */
      }
    },
    [activa]
  );

  /* iOS no habla hasta que hubo un toque. Esto se llama desde el botón de
     empezar: dice algo vacío para que el permiso quede dado. */
  const desbloquear = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      const vacio = new SpeechSynthesisUtterance(" ");
      vacio.volume = 0;
      window.speechSynthesis.speak(vacio);
    } catch {
      /* da igual */
    }
  }, []);

  // Si la persona se va de la página, que no siga hablando sola.
  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { decir, callar, desbloquear };
}

/* Une los trozos de una instrucción en una sola frase hablada. Cada línea del
   catálogo ya termina en punto, así que unirlas con ". " dejaba puntos dobles;
   se escuchan como un tropiezo. */
export function unirFrases(partes: (string | undefined | null)[]) {
  return partes
    .filter((p): p is string => !!p && p.trim().length > 0)
    .map((p) => p.trim().replace(/[.\s]+$/, ""))
    .join(". ")
    .concat(".");
}

/** ¿Este navegador puede hablar? Para no ofrecer un interruptor que no hace nada. */
export function hayVoz() {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

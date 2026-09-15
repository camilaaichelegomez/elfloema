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

export function usarVoz(activa: boolean) {
  const vozRef = useRef<SpeechSynthesisVoice | null>(null);

  // Las voces llegan tarde en varios navegadores: hay que esperar el aviso.
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

    const elegir = () => {
      const voces = window.speechSynthesis.getVoices();
      if (voces.length === 0) return;
      const enEspanol = voces.filter((v) => v.lang.toLowerCase().startsWith("es"));
      // Preferimos español de Chile, después cualquier americano, después el que haya.
      vozRef.current =
        enEspanol.find((v) => /es[-_]CL/i.test(v.lang)) ??
        enEspanol.find((v) => /es[-_](MX|AR|US|CO|PE)/i.test(v.lang)) ??
        enEspanol[0] ??
        null;
    };

    elegir();
    window.speechSynthesis.addEventListener("voiceschanged", elegir);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", elegir);
  }, []);

  const callar = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
  }, []);

  const decir = useCallback(
    (texto: string, { velocidad = 0.92, enCola = false }: Opciones = {}) => {
      if (!activa || !texto) return;
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
      try {
        if (!enCola) window.speechSynthesis.cancel();
        const frase = new SpeechSynthesisUtterance(texto);
        if (vozRef.current) frase.voice = vozRef.current;
        frase.lang = vozRef.current?.lang ?? "es-ES";
        frase.rate = velocidad;
        frase.pitch = 1;
        window.speechSynthesis.speak(frase);
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

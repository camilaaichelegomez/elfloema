"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { vocesEnEspanol } from "@/lib/voz";

/* Elegir la voz que guía la práctica.

   Las voces que trae un dispositivo suenan muy distinto entre sí: las de
   Google y las de Siri son naturales, y las antiguas de Microsoft son las que
   suenan a robot de los noventa. Como cada teléfono trae las suyas, lo único
   sensato es mostrarlas y dejar que la persona escuche y elija.

   Al tocar una se escucha de inmediato: probar es la única forma de decidir
   esto. */

export function SelectorDeVoz({
  valor,
  onElegir,
  decir,
  chip,
  chipActivo,
  ayuda,
}: {
  /** Nombre de la voz guardada. Si no hay, manda la primera de la lista. */
  valor?: string;
  onElegir: (nombre: string) => void;
  decir: (texto: string) => void;
  chip: CSSProperties;
  chipActivo: CSSProperties;
  ayuda: CSSProperties;
}) {
  const [voces, setVoces] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const cargar = () => setVoces(vocesEnEspanol());
    cargar();
    // En varios navegadores la lista llega después de cargar la página.
    window.speechSynthesis?.addEventListener("voiceschanged", cargar);
    return () => window.speechSynthesis?.removeEventListener("voiceschanged", cargar);
  }, []);

  // Con una sola voz no hay nada que elegir.
  if (voces.length <= 1) return null;

  return (
    <div style={{ marginTop: "0.8rem" }}>
      <p style={{ ...ayuda, marginBottom: "0.5rem" }}>
        Este dispositivo tiene {voces.length} voces en español y suenan muy distinto. Toca una para
        escucharla: la primera suele ser la que mejor suena.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
        {voces.map((v) => {
          const elegida = (valor ?? voces[0]?.name) === v.name;
          return (
            <button
              key={v.name}
              type="button"
              onClick={() => {
                onElegir(v.name);
                decir("Así sueno. Esta es la voz que te va a guiar la práctica.");
              }}
              aria-pressed={elegida}
              style={{
                ...chip,
                padding: "0.4rem 0.7rem",
                minHeight: 38,
                ...(elegida ? chipActivo : null),
              }}
            >
              <span style={{ fontSize: "0.88rem", display: "block" }}>
                {v.name.replace(/^(Microsoft|Google)\s+/i, "")}
              </span>
              <span style={{ fontSize: "0.74rem", opacity: 0.6 }}>{v.lang}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

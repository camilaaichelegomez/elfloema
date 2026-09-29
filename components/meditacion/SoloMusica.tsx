"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { campana, contextoDeAudio } from "@/lib/campana";
import { MotorPaisaje, PAISAJES, hayPaisajes, type Paisaje } from "@/lib/paisajes";
import { guardarDatos, hoy, leerDatos } from "@/lib/habitos/tipos";
import { ayuda, botonPri, botonSec, panel, rotulo, titulo } from "@/components/habitos/estilos";

/* Solo música y un tiempo.

   Sin instrucciones, sin voz y sin técnica: eliges un paisaje y cuántos
   minutos, suena, y una campana avisa cuando se termina. Es lo que la mayoría
   de la gente quiere de verdad la mayoría de los días, y también sirve para
   cualquier otra cosa —estudiar, dormirse, trabajar— sin fingir que es una
   práctica de meditación.

   Los seis paisajes se generan en vivo en el teléfono (lib/paisajes.ts): no
   hay archivos, no hace falta internet y una hora de mar no ocupa nada. */

const MINUTOS = [5, 10, 15, 20, 30, 45, 60];
const CLAVE = "floema-solo-musica";

type Prefs = { paisaje: Paisaje; minutos: number };
const POR_DEFECTO: Prefs = { paisaje: "mar", minutos: 20 };

function leerPrefs(): Prefs {
  try {
    const raw = localStorage.getItem(CLAVE);
    if (!raw) return POR_DEFECTO;
    return { ...POR_DEFECTO, ...(JSON.parse(raw) as Partial<Prefs>) };
  } catch {
    return POR_DEFECTO;
  }
}

function anotar(minutos: number) {
  try {
    const d = leerDatos();
    guardarDatos({ ...d, pausas: [...d.pausas, { fecha: hoy(), minutos }] });
  } catch {
    /* si no se puede guardar, el rato ya ocurrió igual */
  }
}

export function SoloMusica() {
  const [prefs, setPrefs] = useState<Prefs>(POR_DEFECTO);
  const [listo, setListo] = useState(false);
  const [restante, setRestante] = useState<number | null>(null);
  const [hecha, setHecha] = useState<number | null>(null);
  const motor = useRef<MotorPaisaje | null>(null);
  const audio = useRef<AudioContext | null>(null);

  useEffect(() => {
    setPrefs(leerPrefs());
    setListo(true);
  }, []);

  const cambiar = (p: Partial<Prefs>) => {
    setPrefs((v) => {
      const nuevo = { ...v, ...p };
      try {
        localStorage.setItem(CLAVE, JSON.stringify(nuevo));
      } catch {
        /* modo privado */
      }
      return nuevo;
    });
  };

  const parar = useCallback(() => {
    motor.current?.detener();
    motor.current = null;
    setRestante(null);
  }, []);

  useEffect(() => () => parar(), [parar]);

  useEffect(() => {
    if (restante === null) return;
    if (restante <= 0) {
      // El aviso del final: la campana suena mientras la música se retira.
      try {
        const ctx = audio.current;
        if (ctx) {
          campana(ctx, ctx.currentTime);
          campana(ctx, ctx.currentTime + 4);
        }
      } catch {
        /* sin audio, igual termina */
      }
      const minutos = prefs.minutos;
      setTimeout(() => parar(), 6000);
      anotar(minutos);
      setHecha(minutos);
      setRestante(null);
      return;
    }
    const id = setTimeout(() => setRestante((r) => (r === null ? null : r - 1)), 1000);
    return () => clearTimeout(id);
  }, [restante, prefs.minutos, parar]);

  const empezar = async () => {
    setHecha(null);
    audio.current ??= contextoDeAudio();
    if (hayPaisajes()) {
      try {
        const datos = leerDatos();
        const m = new MotorPaisaje(prefs.paisaje, Math.max(0.25, datos.prefs.volumenMusica));
        await m.empezar();
        motor.current = m;
      } catch {
        /* si el navegador no deja sonar, el reloj corre igual */
      }
    }
    setRestante(prefs.minutos * 60);
  };

  const reloj = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const seg = s % 60;
    return h > 0
      ? `${h}:${`${m}`.padStart(2, "0")}:${`${seg}`.padStart(2, "0")}`
      : `${m}:${`${seg}`.padStart(2, "0")}`;
  };

  if (!listo) return <div style={{ ...panel, minHeight: 200 }} />;

  const elegido = PAISAJES.find((p) => p.id === prefs.paisaje) ?? PAISAJES[0];

  if (restante !== null) {
    const total = prefs.minutos * 60;
    const vuelta = 1 - restante / total;
    const perimetro = 2 * Math.PI * 52;
    return (
      <div style={{ ...panel, textAlign: "center" }}>
        <p style={rotulo}>
          {elegido.nombre} · {prefs.minutos} minutos
        </p>
        <div style={{ position: "relative", width: 150, height: 150, margin: "0 auto 1rem" }}>
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
              fontSize: "1.5rem",
              color: "#e8c878",
            }}
          >
            {reloj(restante)}
          </span>
        </div>
        <p style={{ ...ayuda, maxWidth: "30ch", margin: "0 auto 1.2rem" }}>
          Suena hasta el final y después avisa con una campana. Puedes apagar la pantalla: la música
          sigue.
        </p>
        <button type="button" onClick={parar} style={botonSec}>
          Terminar antes
        </button>
      </div>
    );
  }

  return (
    <div style={panel}>
      <h2 style={titulo}>Solo música y un tiempo</h2>
      {hecha !== null ? (
        <p style={{ ...ayuda, color: "rgba(168,200,138,0.9)" }}>
          Se cumplieron los {hecha} minutos. Quedaron anotados en tu calendario.
        </p>
      ) : (
        <p style={ayuda}>
          Sin instrucciones y sin voz: eliges el sonido y el rato, suena, y una campana te avisa
          cuando se termina. Sirve para sentarte, y también para estudiar, trabajar o dormirte.
        </p>
      )}

      <p style={rotulo}>Qué suena</p>
      <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginBottom: "0.7rem" }}>
        {PAISAJES.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => cambiar({ paisaje: p.id })}
            aria-pressed={p.id === prefs.paisaje}
            style={{
              ...botonSec,
              padding: "0 1rem",
              ...(p.id === prefs.paisaje ? { background: "rgba(200,160,80,0.18)", color: "#e8c878" } : null),
            }}
          >
            {p.nombre}
          </button>
        ))}
      </div>
      <p style={{ ...ayuda, marginBottom: "1rem" }}>
        {elegido.linea}
        {elegido.id === "tono" && " Es un tono sostenido: lo de las frecuencias que curan no tiene respaldo."}
      </p>

      <p style={rotulo}>Cuánto rato</p>
      <div style={{ display: "flex", gap: "0.45rem", flexWrap: "wrap", marginBottom: "1.1rem" }}>
        {MINUTOS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => cambiar({ minutos: m })}
            aria-pressed={prefs.minutos === m}
            style={{
              ...botonSec,
              padding: "0 0.9rem",
              ...(prefs.minutos === m ? { background: "rgba(200,160,80,0.16)", color: "#e8c878" } : null),
            }}
          >
            {m} min
          </button>
        ))}
      </div>

      <button type="button" onClick={() => void empezar()} style={botonPri}>
        Poner {prefs.minutos} minutos
      </button>

      <p style={{ ...ayuda, margin: "1rem 0 0", fontSize: "0.86rem" }}>
        El sonido se genera en este aparato, no se descarga: funciona sin internet y nunca suena
        igual dos veces.
      </p>
    </div>
  );
}

"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { TERMINO_EN_INGLES, enlaceDeVideo } from "@/lib/fuerza/buscar";
import type { PromptDibujo } from "@/lib/fuerza/leer-prompts";

/* La lista de los dibujos por hacer, con botones para copiar.

   Generar 48 imágenes significa copiar 48 nombres de archivo exactos, y
   escribirlos a mano es justo donde aparecen las erratas: un acento, un
   guion cambiado, y el dibujo no aparece nunca en la app. Acá se copian de
   un toque, igual que el prompt.

   Marca además cuáles ya están hechas —eso vive solo en este navegador—,
   para no perder la cuenta a mitad de camino. */

const CLAVE = "floema-dibujos-hechos";

function leerHechos(): string[] {
  try {
    return JSON.parse(localStorage.getItem(CLAVE) ?? "[]") as string[];
  } catch {
    return [];
  }
}

async function copiar(texto: string) {
  try {
    await navigator.clipboard.writeText(texto);
    return true;
  } catch {
    /* Safari viejo y las páginas sin https no tienen portapapeles moderno:
       se cae al truco de siempre, un campo de texto invisible. */
    try {
      const campo = document.createElement("textarea");
      campo.value = texto;
      campo.style.position = "fixed";
      campo.style.opacity = "0";
      document.body.appendChild(campo);
      campo.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(campo);
      return ok;
    } catch {
      return false;
    }
  }
}

function BotonCopiar({
  texto,
  label,
  principal,
}: {
  texto: string;
  label: string;
  principal?: boolean;
}) {
  const [estado, setEstado] = useState<"" | "ok" | "no">("");

  return (
    <button
      type="button"
      onClick={async () => {
        const ok = await copiar(texto);
        setEstado(ok ? "ok" : "no");
        setTimeout(() => setEstado(""), 1600);
      }}
      style={{
        ...boton,
        ...(principal ? { background: "rgba(200,160,80,0.92)", color: "#0d1a0d", border: "none" } : null),
        ...(estado === "ok" ? { background: "rgba(168,200,138,0.9)", color: "#0d1a0d", border: "none" } : null),
        ...(estado === "no" ? { color: "#dd9464", borderColor: "rgba(221,148,100,0.6)" } : null),
      }}
    >
      {estado === "ok" ? "Copiado" : estado === "no" ? "No se pudo" : label}
    </button>
  );
}

export function Dibujos({ prompts }: { prompts: PromptDibujo[] }) {
  const [hechos, setHechos] = useState<string[]>([]);
  const [abierto, setAbierto] = useState<string | null>(null);

  // Las marcas se leen después del primer pintado: en el servidor no hay
  // localStorage, y leerlo durante el render desalinea la hidratación.
  useEffect(() => setHechos(leerHechos()), []);

  const marcar = (archivo: string) => {
    setHechos((h) => {
      const nuevo = h.includes(archivo) ? h.filter((x) => x !== archivo) : [...h, archivo];
      try {
        localStorage.setItem(CLAVE, JSON.stringify(nuevo));
      } catch {
        /* modo privado: la marca dura lo que dure la visita */
      }
      return nuevo;
    });
  };

  const grupos = [...new Set(prompts.map((p) => p.grupo))];
  /* El fondo de la biblioteca aparece en la lista porque también hay que
     generarlo, pero no cuenta como ejercicio ni va a la misma carpeta: fuera
     de la cuenta y de los botones de copiar todo. */
  const ejercicios = prompts.filter((p) => p.archivo !== "fondo_fuerza");
  const faltan = ejercicios.filter((p) => !hechos.includes(p.archivo));

  return (
    <div>
      <div style={{ ...panel, marginBottom: "1.4rem" }}>
        <p style={{ ...texto, margin: "0 0 0.8rem" }}>
          {hechos.length === 0
            ? `${ejercicios.length} dibujos por hacer.`
            : `${hechos.length} de ${ejercicios.length} marcados. Faltan ${faltan.length}.`}{" "}
          Copia el nombre, copia el prompt, genera la imagen y guárdala con ese nombre en la carpeta{" "}
          <code style={codigo}>public/fuerza/</code>.
        </p>
        <div style={fila}>
          <BotonCopiar
            texto={ejercicios.map((p) => `${p.archivo}.webp`).join("\n")}
            label={`Copiar los ${ejercicios.length} nombres`}
          />
          {faltan.length > 0 && faltan.length < ejercicios.length && (
            <BotonCopiar
              texto={faltan.map((p) => `${p.archivo}.webp`).join("\n")}
              label={`Copiar los ${faltan.length} que faltan`}
            />
          )}
        </div>
      </div>

      {grupos.map((grupo) => (
        <section key={grupo} style={{ marginBottom: "1.8rem" }}>
          <h2 style={h2}>{grupo}</h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.6rem" }}>
            {prompts
              .filter((p) => p.grupo === grupo)
              .map((p) => {
                const hecho = hechos.includes(p.archivo);
                return (
                  <li key={p.archivo} style={{ ...tarjeta, opacity: hecho ? 0.55 : 1 }}>
                    <div style={{ display: "flex", gap: "0.7rem", alignItems: "baseline", flexWrap: "wrap" }}>
                      <code style={{ ...codigo, fontSize: "0.95rem", color: "#e8c878" }}>
                        {p.archivo}.webp
                      </code>
                      <span style={{ ...texto, margin: 0, opacity: 0.72, fontSize: "0.92rem" }}>
                        {p.nombre}
                      </span>
                    </div>

                    {TERMINO_EN_INGLES[p.archivo] && (
                      <p style={{ ...texto, margin: "0.4rem 0 0", fontSize: "0.9rem" }}>
                        Se llama{" "}
                        <span style={{ ...codigo, color: "rgba(168,200,138,0.95)" }}>
                          {TERMINO_EN_INGLES[p.archivo]}
                        </span>
                        . Con ese nombre lo encuentras, y sirve para pedirle el dibujo a otra IA.
                      </p>
                    )}

                    <div style={{ ...fila, marginTop: "0.7rem" }}>
                      <BotonCopiar texto={`${p.archivo}.webp`} label="Copiar nombre" principal />
                      {TERMINO_EN_INGLES[p.archivo] && (
                        <BotonCopiar texto={TERMINO_EN_INGLES[p.archivo]} label="Copiar en inglés" />
                      )}
                      <BotonCopiar texto={p.prompt} label="Copiar prompt" />
                      {enlaceDeVideo(p.archivo) && (
                        <a
                          href={enlaceDeVideo(p.archivo) as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={enlace}
                        >
                          Ver cómo es ↗
                        </a>
                      )}
                      <button
                        type="button"
                        onClick={() => setAbierto(abierto === p.archivo ? null : p.archivo)}
                        style={enlace}
                      >
                        {abierto === p.archivo ? "Ocultar" : "Ver prompt"}
                      </button>
                      <button
                        type="button"
                        onClick={() => marcar(p.archivo)}
                        aria-pressed={hecho}
                        style={{ ...enlace, color: hecho ? "rgba(168,200,138,0.9)" : "rgba(200,160,80,0.75)" }}
                      >
                        {hecho ? "✓ hecha" : "Marcar hecha"}
                      </button>
                    </div>

                    {abierto === p.archivo && (
                      <pre style={bloque}>
                        <code>{p.prompt}</code>
                      </pre>
                    )}
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.22)",
  background: "rgba(12,22,12,0.72)",
  borderRadius: 8,
  padding: "clamp(0.9rem, 3vw, 1.3rem)",
  minWidth: 0,
};

const tarjeta: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.18)",
  background: "rgba(12,22,12,0.6)",
  borderRadius: 6,
  padding: "0.85rem 1rem",
  minWidth: 0,
};

const texto: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "1rem",
  lineHeight: 1.6,
  color: "rgba(217,203,170,0.85)",
};

const h2: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.68rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "rgba(200,160,80,0.75)",
  margin: "0 0 0.7rem",
};

const codigo: CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: "0.88rem",
  color: "#d9cbaa",
  wordBreak: "break-all",
};

const fila: CSSProperties = { display: "flex", gap: "0.45rem", flexWrap: "wrap", alignItems: "center" };

const boton: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.6rem",
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "#c8a050",
  background: "transparent",
  border: "1px solid rgba(200,160,80,0.45)",
  borderRadius: 4,
  padding: "0 0.85rem",
  minHeight: 40,
  cursor: "pointer",
  transition: "background 0.15s ease, color 0.15s ease",
};

const enlace: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.9rem",
  color: "rgba(200,160,80,0.75)",
  background: "none",
  border: "none",
  cursor: "pointer",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  padding: "0.3rem 0.2rem",
  minHeight: 40,
};

const bloque: CSSProperties = {
  marginTop: "0.7rem",
  marginBottom: 0,
  padding: "0.8rem 0.9rem",
  background: "rgba(8,14,8,0.75)",
  border: "1px solid rgba(200,160,80,0.14)",
  borderRadius: 5,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: "0.8rem",
  lineHeight: 1.55,
  color: "rgba(217,203,170,0.8)",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
  overflowX: "auto",
  minWidth: 0,
};

"use client";

import { useState, useSyncExternalStore, type CSSProperties } from "react";
import {
  activarAvisos,
  desactivarAvisos,
  enviarLista,
  guardarAjustes,
  iosSinInstalar,
  leerAjustes,
  probarAviso,
  SECCIONES,
  soportaAvisos,
  type Ajustes,
  type ResultadoActivar,
  type Seccion,
} from "@/lib/florecer/avisos";

/* Recordatorios con la app cerrada.

   Es lo que más ayuda a sostener un hábito: que algo te lo recuerde en el
   momento justo. Se eligen las horas de cada sección aquí; los hábitos
   avisan a la hora que se le pone a cada uno en Hábitos. */

const MENSAJES: Record<Exclude<ResultadoActivar, "ok">, string> = {
  denegado:
    "El teléfono no dio permiso. Para cambiarlo: en los ajustes del teléfono, busca Florecer (o el navegador) → Notificaciones → Permitir.",
  "sin-soporte": "Este navegador no permite avisos con la app cerrada. En Android usa Chrome; en iPhone, instala Florecer.",
  instalar:
    "En iPhone, los avisos solo funcionan con Florecer instalada: toca Compartir (el cuadrado con la flecha) → «Agregar a inicio», y actívalos desde ahí.",
  "sin-configurar": "Los recordatorios todavía no están configurados en el servidor.",
  error: "No se pudo activar. Revisa tu conexión e inténtalo de nuevo.",
};

/* Lo guardado en este aparato. Si se quitó el permiso desde los ajustes del
   teléfono, se muestra apagado. */
function leerInicial(): Ajustes {
  const a = leerAjustes();
  const permiso = typeof Notification !== "undefined" ? Notification.permission : "default";
  return a.activo && permiso !== "granted" ? { ...a, activo: false } : a;
}

const sinSuscribir = () => () => {};

export function Recordatorios() {
  // En el servidor no hay almacenamiento ni permisos: se dibuja al montar.
  const montado = useSyncExternalStore(sinSuscribir, () => true, () => false);
  const [cambiados, setAjustes] = useState<Ajustes | null>(null);
  const [trabajando, setTrabajando] = useState(false);
  const [mensaje, setMensaje] = useState<string | null>(null);

  if (!montado) return null;
  const ajustes = cambiados ?? leerInicial();
  const soporta = soportaAvisos() || iosSinInstalar();

  const activar = async () => {
    setTrabajando(true);
    setMensaje(null);
    const r = await activarAvisos();
    setTrabajando(false);
    if (r === "ok") {
      setAjustes(leerAjustes());
      setMensaje("Listo. Elige a qué hora quieres cada aviso.");
    } else {
      setMensaje(MENSAJES[r]);
    }
  };

  const apagar = async () => {
    setTrabajando(true);
    await desactivarAvisos();
    setAjustes(leerAjustes());
    setTrabajando(false);
    setMensaje("Recordatorios apagados.");
  };

  const cambiarHora = (s: Seccion, hora: string) => {
    const nuevo = { ...leerAjustes(), secciones: { ...leerAjustes().secciones, [s]: hora || undefined } };
    guardarAjustes(nuevo);
    setAjustes(nuevo);
    void enviarLista().then((ok) => {
      if (!ok) setMensaje("No se pudo guardar en el servidor. Se reintenta al salir de la app.");
    });
  };

  const probar = async () => {
    setMensaje(null);
    const ok = await probarAviso();
    setMensaje(ok ? "Aviso enviado: debería llegarte en unos segundos." : "No se pudo enviar la prueba. Espera un minuto e inténtalo de nuevo.");
  };

  return (
    <section style={caja} aria-labelledby="recordatorios-titulo">
      <p id="recordatorios-titulo" style={rotulo}>
        Recordatorios
      </p>

      {!ajustes.activo ? (
        <>
          <p style={{ ...texto, margin: "0.4rem 0 0.8rem" }}>
            Que Florecer te avise a la hora que elijas, aunque la app esté cerrada.
          </p>
          {soporta ? (
            <button type="button" onClick={activar} disabled={trabajando} style={botonDorado}>
              {trabajando ? "Activando…" : "Activar recordatorios"}
            </button>
          ) : (
            <p style={{ ...texto, opacity: 0.8 }}>{MENSAJES["sin-soporte"]}</p>
          )}
        </>
      ) : (
        <>
          <p style={{ ...texto, margin: "0.4rem 0 0.9rem" }}>
            Pon la hora de lo que quieras que te recuerde. Si ese día ya lo hiciste, no te avisa.
          </p>
          <div style={{ display: "grid", gap: "0.55rem" }}>
            {SECCIONES.map((s) => {
              const hora = ajustes.secciones[s.id] ?? "";
              return (
                <label key={s.id} style={fila}>
                  <span style={{ ...texto, flex: 1 }}>{s.label}</span>
                  <input
                    type="time"
                    value={hora}
                    onChange={(e) => cambiarHora(s.id, e.target.value)}
                    style={campoHora}
                    aria-label={`Hora del recordatorio de ${s.label}`}
                  />
                  {/* Sin hora, un hueco del mismo ancho: así las horas quedan en columna. */}
                  {!hora && <span style={{ width: 40, flexShrink: 0 }} aria-hidden="true" />}
                  {hora && (
                    <button
                      type="button"
                      onClick={() => cambiarHora(s.id, "")}
                      style={quitar}
                      aria-label={`Quitar el recordatorio de ${s.label}`}
                    >
                      ✕
                    </button>
                  )}
                </label>
              );
            })}
          </div>
          <p style={{ ...texto, fontSize: "0.88rem", opacity: 0.8, marginTop: "0.8rem" }}>
            Los hábitos avisan a la hora que le pongas a cada uno en Hábitos.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.6rem" }}>
            <button type="button" onClick={probar} style={enlace}>
              Probar un aviso
            </button>
            <button type="button" onClick={apagar} disabled={trabajando} style={enlace}>
              Apagar recordatorios
            </button>
          </div>
        </>
      )}

      {mensaje && (
        <p role="status" style={{ ...texto, fontSize: "0.9rem", color: "#a8c88a", marginTop: "0.7rem" }}>
          {mensaje}
        </p>
      )}
    </section>
  );
}

const caja: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.22)",
  background: "rgba(12,22,12,0.72)",
  borderRadius: 8,
  padding: "clamp(0.9rem, 2.6vw, 1.4rem)",
};

const rotulo: CSSProperties = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.7rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "rgba(200,160,80,0.85)",
  margin: 0,
};

const texto: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.96rem",
  lineHeight: 1.5,
  color: "#d9cbaa",
  margin: 0,
};

const fila: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  borderBottom: "1px solid rgba(200,160,80,0.12)",
  paddingBottom: "0.5rem",
};

const campoHora: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "1rem",
  color: "#f2dc9c",
  background: "rgba(10,18,10,0.6)",
  border: "1px solid rgba(200,160,80,0.35)",
  borderRadius: 5,
  padding: "0.35rem 0.5rem",
  minHeight: 42,
  colorScheme: "dark",
};

const quitar: CSSProperties = {
  width: 40,
  flexShrink: 0,
  minHeight: 40,
  background: "none",
  border: "1px solid rgba(221,148,100,0.4)",
  borderRadius: 5,
  color: "rgba(221,148,100,0.9)",
  cursor: "pointer",
};

const botonDorado: CSSProperties = {
  width: "100%",
  minHeight: 48,
  border: "none",
  borderRadius: 8,
  background: "linear-gradient(135deg, #e8c878, #c8a050)",
  color: "#12200f",
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.8rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontWeight: 600,
  cursor: "pointer",
};

const enlace: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.9rem",
  color: "rgba(200,160,80,0.9)",
  background: "none",
  border: "none",
  cursor: "pointer",
  textDecoration: "underline",
  textUnderlineOffset: "3px",
  padding: "0.3rem 0.1rem",
};

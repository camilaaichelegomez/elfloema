"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  DATOS_VACIOS,
  avanceDeObjetivo,
  cumplimiento,
  fechaLarga,
  guardarDatos,
  habitosDe,
  hoy,
  leerDatos,
  nuevoId,
  racha,
  sumarDias,
  tareasDe,
  type Datos,
  type Dia,
  type Habito,
  type Objetivo,
  type Tarea,
} from "@/lib/habitos/tipos";
import { AL_CUMPLIR, PRESENCIA } from "@/lib/habitos/ciencia";
import { Calendario } from "./Calendario";
import { Graficos } from "./Graficos";
import { Pausa } from "./Pausa";
import { ayuda, botonLink, botonPri, botonSec, campo, panel, rotulo, tarjeta, titulo } from "./estilos";

/* La sección de hábitos.

   Cómo está pensada, en una frase: lo que se abre primero es el día de hoy,
   porque una app de hábitos que empieza mostrándote la lista completa de tus
   objetivos de vida no se usa dos veces.

   El resto son pestañas: los objetivos (con su porqué y su identidad), las
   tareas con sus pasos, el calendario del mes, los gráficos y la pausa.

   Todo se guarda en este aparato, sin cuenta ni servidor. */

type Pestana = "hoy" | "objetivos" | "tareas" | "calendario" | "avances" | "pausa";

const PESTANAS: { id: Pestana; label: string }[] = [
  { id: "hoy", label: "Hoy" },
  { id: "objetivos", label: "Objetivos" },
  { id: "tareas", label: "Tareas" },
  { id: "calendario", label: "Calendario" },
  { id: "avances", label: "Avances" },
  { id: "pausa", label: "Pausa" },
];

const DIAS_CORTOS: { dia: Dia; label: string }[] = [
  { dia: 1, label: "L" },
  { dia: 2, label: "M" },
  { dia: 3, label: "M" },
  { dia: 4, label: "J" },
  { dia: 5, label: "V" },
  { dia: 6, label: "S" },
  { dia: 0, label: "D" },
];

/** Un tono corto al marcar algo: la recompensa tiene que llegar ahora, no en un mes. */
function usarTono() {
  const ctx = useRef<AudioContext | null>(null);
  return useCallback((alto = false) => {
    try {
      type ConAudio = typeof window & { webkitAudioContext?: typeof AudioContext };
      const Ctor = window.AudioContext ?? (window as ConAudio).webkitAudioContext;
      if (!Ctor) return;
      const c = (ctx.current ??= new Ctor());
      if (c.state === "suspended") void c.resume();
      const osc = c.createOscillator();
      const vol = c.createGain();
      osc.type = "sine";
      osc.frequency.value = alto ? 660 : 528;
      const t = c.currentTime;
      vol.gain.setValueAtTime(0, t);
      vol.gain.linearRampToValueAtTime(0.12, t + 0.02);
      vol.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      osc.connect(vol).connect(c.destination);
      osc.start(t);
      osc.stop(t + 0.55);
    } catch {
      /* sin audio, da igual */
    }
  }, []);
}

export function Habitos() {
  const [datos, setDatos] = useState<Datos>(DATOS_VACIOS);
  const [listo, setListo] = useState(false);
  const [pestana, setPestana] = useState<Pestana>("hoy");
  const [aviso, setAviso] = useState<string | null>(null);
  const [presencia, setPresencia] = useState<string | null>(null);
  const [diaMirado, setDiaMirado] = useState(hoy());
  const tono = usarTono();

  useEffect(() => {
    setDatos(leerDatos());
    setListo(true);
  }, []);

  const actualizar = useCallback((cambio: (d: Datos) => Datos) => {
    setDatos((antes) => {
      const nuevo = cambio(antes);
      guardarDatos(nuevo);
      return nuevo;
    });
  }, []);

  /* El recordatorio de estar presente. Solo mientras la app está abierta:
     un sitio web no puede despertar el teléfono a una hora exacta, y
     prometerlo sería mentir. Si diste permiso de notificaciones y estás en
     otra pestaña, el aviso sale como notificación del sistema. */
  useEffect(() => {
    if (!listo || !datos.prefs.recordatorios) return;
    const cada = Math.max(15, datos.prefs.cadaMinutos) * 60 * 1000;
    const id = setInterval(() => {
      const frase = PRESENCIA[Math.floor(Math.random() * PRESENCIA.length)];
      setPresencia(frase);
      if (typeof Notification !== "undefined" && Notification.permission === "granted" && document.hidden) {
        try {
          new Notification("Un momento de presencia", { body: frase, icon: "/icon-192.png" });
        } catch {
          /* algunos navegadores solo dejan notificar desde el service worker */
        }
      }
    }, cada);
    return () => clearInterval(id);
  }, [listo, datos.prefs.recordatorios, datos.prefs.cadaMinutos]);

  const fechaDeHoy = hoy();
  const habitosHoy = useMemo(() => habitosDe(datos, fechaDeHoy), [datos, fechaDeHoy]);
  const hechosHoy = datos.hechos[fechaDeHoy] ?? [];
  const tareas = useMemo(() => tareasDe(datos, fechaDeHoy), [datos, fechaDeHoy]);
  const identidades = datos.objetivos.filter((o) => o.identidad && !o.logrado);

  const marcarHabito = (h: Habito) => {
    const hecho = hechosHoy.includes(h.id);
    actualizar((d) => {
      const delDia = d.hechos[fechaDeHoy] ?? [];
      return {
        ...d,
        hechos: {
          ...d.hechos,
          [fechaDeHoy]: hecho ? delDia.filter((x) => x !== h.id) : [...delDia, h.id],
        },
      };
    });
    if (!hecho) {
      tono();
      setAviso(AL_CUMPLIR[Math.floor(Math.random() * AL_CUMPLIR.length)]);
      setTimeout(() => setAviso(null), 4000);
    }
  };

  const marcarTarea = (t: Tarea) => {
    actualizar((d) => ({
      ...d,
      tareas: d.tareas.map((x) =>
        x.id === t.id
          ? { ...x, hecha: !x.hecha, hechaEl: !x.hecha ? fechaDeHoy : undefined }
          : x
      ),
    }));
    if (!t.hecha) {
      tono(true);
      setAviso("Tarea cerrada. Avanzar algo, aunque sea poco, es lo que sostiene el ánimo.");
      setTimeout(() => setAviso(null), 4000);
    }
  };

  const marcarPaso = (tareaId: string, pasoId: string) => {
    actualizar((d) => ({
      ...d,
      tareas: d.tareas.map((t) =>
        t.id === tareaId
          ? { ...t, pasos: t.pasos.map((p) => (p.id === pasoId ? { ...p, hecho: !p.hecho } : p)) }
          : t
      ),
    }));
    tono();
  };

  if (!listo) {
    return (
      <div style={panel}>
        <p style={{ ...ayuda, margin: 0 }}>Abriendo lo tuyo…</p>
      </div>
    );
  }

  const vacia =
    datos.objetivos.length === 0 && datos.habitos.length === 0 && datos.tareas.length === 0;

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {/* La identidad primero: nombrarse como quien quieres ser cambia la
          conducta medida, no solo el ánimo. */}
      {identidades.length > 0 && pestana === "hoy" && (
        <p
          style={{
            ...titulo,
            fontSize: "clamp(1rem, 3vw, 1.3rem)",
            color: "rgba(168,200,138,0.95)",
            margin: 0,
            textAlign: "center",
          }}
        >
          {identidades[new Date().getDate() % identidades.length].identidad}
        </p>
      )}

      <nav style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", justifyContent: "center" }}>
        {PESTANAS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPestana(p.id)}
            aria-current={pestana === p.id}
            style={{
              ...botonSec,
              minHeight: 38,
              padding: "0 0.9rem",
              fontSize: "0.63rem",
              ...(pestana === p.id ? { background: "rgba(200,160,80,0.18)", color: "#e8c878" } : null),
            }}
          >
            {p.label}
          </button>
        ))}
      </nav>

      {aviso && (
        <p
          style={{
            ...tarjeta,
            margin: 0,
            fontFamily: "var(--font-crimson), serif",
            color: "#a8c88a",
            textAlign: "center",
          }}
          role="status"
        >
          {aviso}
        </p>
      )}

      {presencia && (
        <div style={{ ...tarjeta, display: "flex", gap: "0.8rem", alignItems: "center" }}>
          <p style={{ margin: 0, flex: 1, fontFamily: "var(--font-crimson), serif", color: "#d9cbaa" }}>
            {presencia}
          </p>
          <button type="button" onClick={() => setPresencia(null)} style={botonLink}>
            Listo
          </button>
        </div>
      )}

      {pestana === "hoy" && (
        <Hoy
          datos={datos}
          fecha={fechaDeHoy}
          habitos={habitosHoy}
          hechos={hechosHoy}
          tareas={tareas}
          vacia={vacia}
          actualizar={actualizar}
          marcarHabito={marcarHabito}
          marcarTarea={marcarTarea}
          marcarPaso={marcarPaso}
        />
      )}

      {pestana === "objetivos" && <Objetivos datos={datos} actualizar={actualizar} />}

      {pestana === "tareas" && (
        <Tareas
          datos={datos}
          actualizar={actualizar}
          marcarTarea={marcarTarea}
          marcarPaso={marcarPaso}
        />
      )}

      {pestana === "calendario" && (
        <div style={{ display: "grid", gap: "1rem" }}>
          <Calendario datos={datos} alElegirDia={setDiaMirado} />
          <DiaMirado datos={datos} fecha={diaMirado} />
        </div>
      )}

      {pestana === "avances" && <Graficos datos={datos} />}

      {pestana === "pausa" && (
        <div style={{ display: "grid", gap: "1rem" }}>
          <Pausa
            modo={datos.prefs.musica === "activar" ? "activar" : "relajar"}
            volumen={datos.prefs.volumenMusica}
            alTerminar={(minutos) =>
              actualizar((d) => ({ ...d, pausas: [...d.pausas, { fecha: hoy(), minutos }] }))
            }
          />
          <Ajustes datos={datos} actualizar={actualizar} />
        </div>
      )}
    </div>
  );
}

/* ══ Hoy ═══════════════════════════════════════════════════ */

function Hoy({
  datos,
  fecha,
  habitos,
  hechos,
  tareas,
  vacia,
  actualizar,
  marcarHabito,
  marcarTarea,
  marcarPaso,
}: {
  datos: Datos;
  fecha: string;
  habitos: Habito[];
  hechos: string[];
  tareas: ReturnType<typeof tareasDe>;
  vacia: boolean;
  actualizar: (c: (d: Datos) => Datos) => void;
  marcarHabito: (h: Habito) => void;
  marcarTarea: (t: Tarea) => void;
  marcarPaso: (tareaId: string, pasoId: string) => void;
}) {
  const [nuevoHabito, setNuevoHabito] = useState(false);
  const [nuevaTarea, setNuevaTarea] = useState("");
  const cumplidos = habitos.filter((h) => hechos.includes(h.id)).length;

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <div style={panel}>
        <p style={rotulo}>{fechaLarga(fecha)}</p>
        <h2 style={titulo}>
          {habitos.length === 0
            ? "Sin hábitos para hoy"
            : cumplidos === habitos.length
              ? "Hoy está completo"
              : `${cumplidos} de ${habitos.length} hábitos`}
        </h2>

        {vacia && (
          <p style={ayuda}>
            Esto está vacío todavía. Empieza por un objetivo (qué quieres y por qué), y después
            cuelga de él un hábito y las primeras tareas. Con uno basta para partir: es mejor un
            hábito que se cumple que cinco que no.
          </p>
        )}

        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.5rem" }}>
          {habitos.map((h) => {
            const hecho = hechos.includes(h.id);
            const dias = racha(datos, h);
            return (
              <li key={h.id}>
                <button
                  type="button"
                  onClick={() => marcarHabito(h)}
                  aria-pressed={hecho}
                  style={{
                    ...tarjeta,
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    display: "flex",
                    gap: "0.8rem",
                    alignItems: "center",
                    borderColor: hecho ? "rgba(168,200,138,0.5)" : "rgba(200,160,80,0.18)",
                    background: hecho ? "rgba(168,200,138,0.1)" : "rgba(10,18,10,0.45)",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 24,
                      height: 24,
                      flexShrink: 0,
                      borderRadius: 5,
                      border: `1px solid ${hecho ? "#a8c88a" : "rgba(200,160,80,0.5)"}`,
                      color: "#a8c88a",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "0.9rem",
                    }}
                  >
                    {hecho ? "✓" : ""}
                  </span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        display: "block",
                        fontFamily: "var(--font-crimson), serif",
                        fontSize: "1.02rem",
                        color: hecho ? "#a8c88a" : "#e8c878",
                      }}
                    >
                      {h.nombre}
                    </span>
                    {h.cuando && (
                      <span style={{ display: "block", ...ayuda, margin: 0, fontSize: "0.85rem" }}>
                        {h.cuando}
                      </span>
                    )}
                    {!hecho && h.minimo && (
                      <span style={{ display: "block", ...ayuda, margin: 0, fontSize: "0.8rem" }}>
                        Día difícil: {h.minimo}
                      </span>
                    )}
                  </span>
                  {dias > 0 && (
                    <span
                      style={{
                        ...rotulo,
                        margin: 0,
                        whiteSpace: "nowrap",
                        color: "rgba(168,200,138,0.85)",
                      }}
                    >
                      {dias} {dias === 1 ? "día" : "días"}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {!nuevoHabito ? (
          <button type="button" onClick={() => setNuevoHabito(true)} style={{ ...botonLink, marginTop: "0.8rem" }}>
            Agregar un hábito
          </button>
        ) : (
          <FormularioHabito
            datos={datos}
            alGuardar={(h) => {
              actualizar((d) => ({ ...d, habitos: [...d.habitos, h] }));
              setNuevoHabito(false);
            }}
            alCancelar={() => setNuevoHabito(false)}
          />
        )}
      </div>

      <div style={panel}>
        <h2 style={titulo}>Tareas de hoy</h2>
        {tareas.atrasadas.length > 0 && (
          <>
            <p style={{ ...rotulo, color: "rgba(221,148,100,0.85)" }}>De días anteriores</p>
            <ListaTareas
              tareas={tareas.atrasadas}
              datos={datos}
              marcarTarea={marcarTarea}
              marcarPaso={marcarPaso}
              actualizar={actualizar}
            />
          </>
        )}
        {tareas.delDia.length === 0 && tareas.atrasadas.length === 0 && (
          <p style={ayuda}>Nada pendiente para hoy. Puedes anotar algo si quieres.</p>
        )}
        <ListaTareas
          tareas={tareas.delDia}
          datos={datos}
          marcarTarea={marcarTarea}
          marcarPaso={marcarPaso}
          actualizar={actualizar}
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const titulo = nuevaTarea.trim();
            if (!titulo) return;
            actualizar((d) => ({
              ...d,
              tareas: [
                ...d.tareas,
                { id: nuevoId(), titulo, fecha, hecha: false, pasos: [], creado: hoy() },
              ],
            }));
            setNuevaTarea("");
          }}
          style={{ display: "flex", gap: "0.5rem", marginTop: "0.8rem" }}
        >
          <input
            id="tarea-de-hoy"
            value={nuevaTarea}
            onChange={(e) => setNuevaTarea(e.target.value)}
            placeholder="Agregar una tarea para hoy"
            style={campo}
          />
          <button type="submit" style={{ ...botonSec, flexShrink: 0 }}>
            Agregar
          </button>
        </form>

        {tareas.hechasHoy.length > 0 && (
          <p style={{ ...ayuda, margin: "0.9rem 0 0" }}>
            Hoy cerraste {tareas.hechasHoy.length}{" "}
            {tareas.hechasHoy.length === 1 ? "tarea" : "tareas"}.
          </p>
        )}
      </div>
    </div>
  );
}

/* ══ Lista de tareas, con sus pasos ════════════════════════ */

function ListaTareas({
  tareas,
  datos,
  marcarTarea,
  marcarPaso,
  actualizar,
}: {
  tareas: Tarea[];
  datos: Datos;
  marcarTarea: (t: Tarea) => void;
  marcarPaso: (tareaId: string, pasoId: string) => void;
  actualizar: (c: (d: Datos) => Datos) => void;
}) {
  const [abierta, setAbierta] = useState<string | null>(null);
  const [nuevoPaso, setNuevoPaso] = useState("");

  if (tareas.length === 0) return null;

  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.5rem" }}>
      {tareas.map((t) => {
        const objetivo = datos.objetivos.find((o) => o.id === t.objetivoId);
        const hechos = t.pasos.filter((p) => p.hecho).length;
        return (
          <li key={t.id} style={tarjeta}>
            <div style={{ display: "flex", gap: "0.7rem", alignItems: "flex-start" }}>
              <button
                type="button"
                onClick={() => marcarTarea(t)}
                aria-pressed={t.hecha}
                aria-label={t.hecha ? "Desmarcar" : "Marcar como hecha"}
                style={{
                  width: 22,
                  height: 22,
                  marginTop: 2,
                  flexShrink: 0,
                  borderRadius: 4,
                  border: `1px solid ${t.hecha ? "#a8c88a" : "rgba(200,160,80,0.5)"}`,
                  background: "transparent",
                  color: "#a8c88a",
                  cursor: "pointer",
                }}
              >
                {t.hecha ? "✓" : ""}
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: "var(--font-crimson), serif",
                    fontSize: "1rem",
                    color: t.hecha ? "rgba(217,203,170,0.5)" : "#d9cbaa",
                    textDecoration: t.hecha ? "line-through" : "none",
                  }}
                >
                  {t.titulo}
                </span>
                <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", alignItems: "baseline" }}>
                  {objetivo && (
                    <span style={{ ...rotulo, margin: 0, color: "rgba(168,200,138,0.8)" }}>
                      {objetivo.titulo}
                    </span>
                  )}
                  {t.pasos.length > 0 && (
                    <span style={{ ...ayuda, margin: 0, fontSize: "0.82rem" }}>
                      {hechos} de {t.pasos.length} pasos
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setAbierta(abierta === t.id ? null : t.id)}
                    style={{ ...botonLink, fontSize: "0.82rem" }}
                  >
                    {abierta === t.id ? "Cerrar" : "Pasos"}
                  </button>
                </div>
              </div>
            </div>

            {abierta === t.id && (
              <div style={{ marginTop: "0.6rem", paddingLeft: "1.9rem", display: "grid", gap: "0.4rem" }}>
                {t.pasos.map((p) => (
                  <label
                    key={p.id}
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      alignItems: "center",
                      fontFamily: "var(--font-crimson), serif",
                      color: p.hecho ? "rgba(217,203,170,0.5)" : "#d9cbaa",
                      fontSize: "0.94rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={p.hecho}
                      onChange={() => marcarPaso(t.id, p.id)}
                      style={{ accentColor: "#a8c88a", width: 18, height: 18 }}
                    />
                    <span style={{ textDecoration: p.hecho ? "line-through" : "none" }}>{p.titulo}</span>
                  </label>
                ))}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const titulo = nuevoPaso.trim();
                    if (!titulo) return;
                    actualizar((d) => ({
                      ...d,
                      tareas: d.tareas.map((x) =>
                        x.id === t.id
                          ? { ...x, pasos: [...x.pasos, { id: nuevoId(), titulo, hecho: false }] }
                          : x
                      ),
                    }));
                    setNuevoPaso("");
                  }}
                  style={{ display: "flex", gap: "0.4rem" }}
                >
                  <input
                    value={nuevoPaso}
                    onChange={(e) => setNuevoPaso(e.target.value)}
                    placeholder="Partirla en un paso más chico"
                    style={{ ...campo, minHeight: 38, fontSize: "0.92rem" }}
                  />
                  <button type="submit" style={{ ...botonSec, minHeight: 38, padding: "0 0.8rem" }}>
                    Sumar
                  </button>
                </form>
                <button
                  type="button"
                  onClick={() =>
                    actualizar((d) => ({ ...d, tareas: d.tareas.filter((x) => x.id !== t.id) }))
                  }
                  style={{ ...botonLink, justifySelf: "start", color: "rgba(221,148,100,0.8)" }}
                >
                  Borrar la tarea
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/* ══ Formulario de hábito ══════════════════════════════════ */

function FormularioHabito({
  datos,
  alGuardar,
  alCancelar,
}: {
  datos: Datos;
  alGuardar: (h: Habito) => void;
  alCancelar: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [cuando, setCuando] = useState("");
  const [minimo, setMinimo] = useState("");
  const [objetivoId, setObjetivoId] = useState("");
  const [dias, setDias] = useState<Dia[]>([]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!nombre.trim()) return;
        alGuardar({
          id: nuevoId(),
          nombre: nombre.trim(),
          cuando: cuando.trim() || undefined,
          minimo: minimo.trim() || undefined,
          objetivoId: objetivoId || undefined,
          dias,
          creado: hoy(),
        });
      }}
      style={{ display: "grid", gap: "0.6rem", marginTop: "0.9rem" }}
    >
      <label style={{ display: "grid", gap: "0.3rem" }}>
        <span style={rotulo}>El hábito</span>
        <input
          id="habito-nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Caminar veinte minutos"
          style={campo}
          autoFocus
        />
      </label>

      <label style={{ display: "grid", gap: "0.3rem" }}>
        <span style={rotulo}>Cuándo y dónde</span>
        <input
          id="habito-cuando"
          value={cuando}
          onChange={(e) => setCuando(e.target.value)}
          placeholder="Después de dejar la taza del desayuno, en el parque"
          style={campo}
        />
        <span style={{ ...ayuda, margin: 0, fontSize: "0.82rem" }}>
          Escribirlo como «cuando pase X, haré Y» es lo que más sube las probabilidades de
          cumplirlo: en 94 estudios, el efecto fue de los grandes.
        </span>
      </label>

      <label style={{ display: "grid", gap: "0.3rem" }}>
        <span style={rotulo}>La versión mínima</span>
        <input
          id="habito-minimo"
          value={minimo}
          onChange={(e) => setMinimo(e.target.value)}
          placeholder="Dar una vuelta a la manzana"
          style={campo}
        />
        <span style={{ ...ayuda, margin: 0, fontSize: "0.82rem" }}>
          Para el peor día. Lo que sostiene el hábito es no romper la repetición, no el tamaño.
        </span>
      </label>

      <div>
        <span style={rotulo}>Qué días</span>
        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
          {DIAS_CORTOS.map(({ dia, label }) => {
            const puesto = dias.includes(dia);
            return (
              <button
                key={dia}
                type="button"
                onClick={() => setDias(puesto ? dias.filter((x) => x !== dia) : [...dias, dia])}
                aria-pressed={puesto}
                style={{
                  ...botonSec,
                  minHeight: 38,
                  width: 40,
                  padding: 0,
                  ...(puesto ? { background: "rgba(200,160,80,0.18)", color: "#e8c878" } : null),
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
        <span style={{ ...ayuda, margin: "0.3rem 0 0", display: "block", fontSize: "0.82rem" }}>
          Sin marcar ninguno, es todos los días.
        </span>
      </div>

      {datos.objetivos.length > 0 && (
        <label style={{ display: "grid", gap: "0.3rem" }}>
          <span style={rotulo}>¿Para qué objetivo?</span>
          <select
            id="habito-objetivo"
            value={objetivoId}
            onChange={(e) => setObjetivoId(e.target.value)}
            style={campo}
          >
            <option value="">Ninguno en especial</option>
            {datos.objetivos
              .filter((o) => !o.logrado)
              .map((o) => (
                <option key={o.id} value={o.id}>
                  {o.titulo}
                </option>
              ))}
          </select>
        </label>
      )}

      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button type="submit" style={botonPri}>
          Guardar
        </button>
        <button type="button" onClick={alCancelar} style={botonLink}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

/* ══ Objetivos ═════════════════════════════════════════════ */

function Objetivos({
  datos,
  actualizar,
}: {
  datos: Datos;
  actualizar: (c: (d: Datos) => Datos) => void;
}) {
  const [abierto, setAbierto] = useState(false);
  const [titulo_, setTitulo] = useState("");
  const [plazo, setPlazo] = useState<"largo" | "corto">("corto");
  const [porque, setPorque] = useState("");
  const [identidad, setIdentidad] = useState("");
  const [fecha, setFecha] = useState("");

  const guardar = () => {
    if (!titulo_.trim()) return;
    const objetivo: Objetivo = {
      id: nuevoId(),
      titulo: titulo_.trim(),
      plazo,
      porque: porque.trim() || undefined,
      identidad: identidad.trim() || undefined,
      fecha: fecha || undefined,
      creado: hoy(),
    };
    actualizar((d) => ({ ...d, objetivos: [...d.objetivos, objetivo] }));
    setTitulo("");
    setPorque("");
    setIdentidad("");
    setFecha("");
    setAbierto(false);
  };

  const porPlazo = (p: "largo" | "corto") => datos.objetivos.filter((o) => o.plazo === p);

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {(["largo", "corto"] as const).map((p) => (
        <div key={p} style={panel}>
          <h2 style={titulo}>{p === "largo" ? "A largo plazo" : "A corto plazo"}</h2>
          {porPlazo(p).length === 0 && (
            <p style={ayuda}>
              {p === "largo"
                ? "Lo que quieres que sea verdad en un año o más. Uno o dos bastan."
                : "Lo de estas semanas o este mes: el trozo del objetivo grande que toca ahora."}
            </p>
          )}
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.7rem" }}>
            {porPlazo(p).map((o) => {
              const a = avanceDeObjetivo(datos, o.id);
              return (
                <li key={o.id} style={{ ...tarjeta, opacity: o.logrado ? 0.6 : 1 }}>
                  <div style={{ display: "flex", gap: "0.6rem", alignItems: "baseline" }}>
                    <h3
                      style={{
                        margin: 0,
                        flex: 1,
                        fontFamily: "var(--font-crimson), serif",
                        fontSize: "1.05rem",
                        color: "#e8c878",
                        textDecoration: o.logrado ? "line-through" : "none",
                      }}
                    >
                      {o.titulo}
                    </h3>
                    {o.fecha && <span style={{ ...rotulo, margin: 0 }}>{o.fecha}</span>}
                  </div>
                  {o.identidad && (
                    <p style={{ ...ayuda, margin: "0.3rem 0 0", color: "rgba(168,200,138,0.85)" }}>
                      {o.identidad}
                    </p>
                  )}
                  {o.porque && <p style={{ ...ayuda, margin: "0.3rem 0 0" }}>{o.porque}</p>}
                  <p style={{ ...ayuda, margin: "0.5rem 0 0", fontSize: "0.85rem" }}>
                    {a.tareas > 0 ? `${a.hechas} de ${a.tareas} tareas` : "Sin tareas todavía"}
                    {a.habitos > 0 && a.constancia !== null
                      ? ` · ${a.habitos} ${a.habitos === 1 ? "hábito" : "hábitos"} al ${a.constancia}%`
                      : ""}
                  </p>
                  <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.4rem" }}>
                    <button
                      type="button"
                      onClick={() =>
                        actualizar((d) => ({
                          ...d,
                          objetivos: d.objetivos.map((x) =>
                            x.id === o.id ? { ...x, logrado: !x.logrado } : x
                          ),
                        }))
                      }
                      style={botonLink}
                    >
                      {o.logrado ? "Reabrir" : "Logrado"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        actualizar((d) => ({
                          ...d,
                          objetivos: d.objetivos.filter((x) => x.id !== o.id),
                          habitos: d.habitos.map((h) =>
                            h.objetivoId === o.id ? { ...h, objetivoId: undefined } : h
                          ),
                          tareas: d.tareas.map((t) =>
                            t.objetivoId === o.id ? { ...t, objetivoId: undefined } : t
                          ),
                        }))
                      }
                      style={{ ...botonLink, color: "rgba(221,148,100,0.8)" }}
                    >
                      Borrar
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      ))}

      <div style={panel}>
        {!abierto ? (
          <button type="button" onClick={() => setAbierto(true)} style={botonPri}>
            Nuevo objetivo
          </button>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              guardar();
            }}
            style={{ display: "grid", gap: "0.7rem" }}
          >
            <label style={{ display: "grid", gap: "0.3rem" }}>
              <span style={rotulo}>Qué quieres lograr</span>
              <input
                id="objetivo-titulo"
                value={titulo_}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Tener la producción de El Floema al día"
                style={campo}
                autoFocus
              />
            </label>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              {(["corto", "largo"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlazo(p)}
                  aria-pressed={plazo === p}
                  style={{
                    ...botonSec,
                    ...(plazo === p ? { background: "rgba(200,160,80,0.18)", color: "#e8c878" } : null),
                  }}
                >
                  {p === "corto" ? "Corto plazo" : "Largo plazo"}
                </button>
              ))}
            </div>

            <label style={{ display: "grid", gap: "0.3rem" }}>
              <span style={rotulo}>Para cuándo</span>
              <input
                id="objetivo-fecha"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                style={campo}
              />
            </label>

            <label style={{ display: "grid", gap: "0.3rem" }}>
              <span style={rotulo}>Por qué importa</span>
              <textarea
                id="objetivo-porque"
                value={porque}
                onChange={(e) => setPorque(e.target.value)}
                placeholder="Para trabajar tranquila y no a última hora"
                rows={2}
                style={{ ...campo, resize: "vertical" }}
              />
              <span style={{ ...ayuda, margin: 0, fontSize: "0.82rem" }}>
                Esto es lo que se relee los días en que no dan ganas.
              </span>
            </label>

            <label style={{ display: "grid", gap: "0.3rem" }}>
              <span style={rotulo}>Quién quieres ser</span>
              <input
                id="objetivo-identidad"
                value={identidad}
                onChange={(e) => setIdentidad(e.target.value)}
                placeholder="Soy una persona que cumple lo que dice"
                style={campo}
              />
              <span style={{ ...ayuda, margin: 0, fontSize: "0.82rem" }}>
                Hablarse en términos de identidad, y no solo de la acción, cambió la conducta real
                en los estudios de participación electoral. Esta frase aparece arriba, en Hoy.
              </span>
            </label>

            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button type="submit" style={botonPri}>
                Guardar
              </button>
              <button type="button" onClick={() => setAbierto(false)} style={botonLink}>
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ══ Todas las tareas ══════════════════════════════════════ */

function Tareas({
  datos,
  actualizar,
  marcarTarea,
  marcarPaso,
}: {
  datos: Datos;
  actualizar: (c: (d: Datos) => Datos) => void;
  marcarTarea: (t: Tarea) => void;
  marcarPaso: (tareaId: string, pasoId: string) => void;
}) {
  const [titulo_, setTitulo] = useState("");
  const [fecha, setFecha] = useState("");
  const [objetivoId, setObjetivoId] = useState("");

  const pendientes = datos.tareas.filter((t) => !t.hecha);
  const hastaDomingo = sumarDias(hoy(), 7);
  const grupos = [
    { titulo: "Atrasadas", lista: pendientes.filter((t) => t.fecha && t.fecha < hoy()) },
    { titulo: "Hoy", lista: pendientes.filter((t) => t.fecha === hoy()) },
    {
      titulo: "Los próximos días",
      lista: pendientes.filter((t) => t.fecha && t.fecha > hoy() && t.fecha <= hastaDomingo),
    },
    { titulo: "Más adelante", lista: pendientes.filter((t) => t.fecha && t.fecha > hastaDomingo) },
    { titulo: "Algún día", lista: pendientes.filter((t) => !t.fecha) },
  ].filter((g) => g.lista.length > 0);

  const hechas = datos.tareas.filter((t) => t.hecha).slice(-8).reverse();

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      <div style={panel}>
        <h2 style={titulo}>Anotar una tarea</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!titulo_.trim()) return;
            actualizar((d) => ({
              ...d,
              tareas: [
                ...d.tareas,
                {
                  id: nuevoId(),
                  titulo: titulo_.trim(),
                  fecha: fecha || undefined,
                  objetivoId: objetivoId || undefined,
                  hecha: false,
                  pasos: [],
                  creado: hoy(),
                },
              ],
            }));
            setTitulo("");
            setFecha("");
          }}
          style={{ display: "grid", gap: "0.6rem" }}
        >
          <input
            id="tarea-titulo"
            value={titulo_}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Qué hay que hacer"
            style={campo}
          />
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <input
              id="tarea-fecha"
              type="date"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              style={{ ...campo, flex: "1 1 150px" }}
            />
            {datos.objetivos.length > 0 && (
              <select
                id="tarea-objetivo"
                value={objetivoId}
                onChange={(e) => setObjetivoId(e.target.value)}
                style={{ ...campo, flex: "1 1 180px" }}
              >
                <option value="">Sin objetivo</option>
                {datos.objetivos
                  .filter((o) => !o.logrado)
                  .map((o) => (
                    <option key={o.id} value={o.id}>
                      {o.titulo}
                    </option>
                  ))}
              </select>
            )}
          </div>
          <button type="submit" style={{ ...botonPri, justifySelf: "start" }}>
            Agregar
          </button>
        </form>
      </div>

      {grupos.map((g) => (
        <div key={g.titulo} style={panel}>
          <h2 style={titulo}>{g.titulo}</h2>
          <ListaTareas
            tareas={g.lista}
            datos={datos}
            marcarTarea={marcarTarea}
            marcarPaso={marcarPaso}
            actualizar={actualizar}
          />
        </div>
      ))}

      {hechas.length > 0 && (
        <div style={panel}>
          <h2 style={titulo}>Últimas terminadas</h2>
          <ListaTareas
            tareas={hechas}
            datos={datos}
            marcarTarea={marcarTarea}
            marcarPaso={marcarPaso}
            actualizar={actualizar}
          />
        </div>
      )}
    </div>
  );
}

/* ══ Un día del calendario ═════════════════════════════════ */

function DiaMirado({ datos, fecha }: { datos: Datos; fecha: string }) {
  const tocaban = habitosDe(datos, fecha);
  const hechos = datos.hechos[fecha] ?? [];
  const tareas = datos.tareas.filter((t) => t.hecha && t.hechaEl === fecha);
  const pausas = datos.pausas.filter((p) => p.fecha === fecha);

  return (
    <div style={panel}>
      <p style={rotulo}>{fechaLarga(fecha)}</p>
      {tocaban.length === 0 && tareas.length === 0 && pausas.length === 0 ? (
        <p style={{ ...ayuda, margin: 0 }}>Ese día no quedó registrado nada.</p>
      ) : (
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.35rem" }}>
          {tocaban.map((h) => (
            <li
              key={h.id}
              style={{
                fontFamily: "var(--font-crimson), serif",
                color: hechos.includes(h.id) ? "#a8c88a" : "rgba(217,203,170,0.55)",
              }}
            >
              {hechos.includes(h.id) ? "✓" : "·"} {h.nombre}
            </li>
          ))}
          {tareas.map((t) => (
            <li key={t.id} style={{ fontFamily: "var(--font-crimson), serif", color: "#e8c878" }}>
              ✓ {t.titulo}
            </li>
          ))}
          {pausas.map((p, i) => (
            <li key={i} style={{ ...ayuda, margin: 0 }}>
              Pausa de {p.minutos} minutos
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ══ Ajustes ═══════════════════════════════════════════════ */

function Ajustes({
  datos,
  actualizar,
}: {
  datos: Datos;
  actualizar: (c: (d: Datos) => Datos) => void;
}) {
  const [permiso, setPermiso] = useState<string>("default");
  useEffect(() => {
    if (typeof Notification !== "undefined") setPermiso(Notification.permission);
  }, []);

  const cambiar = (p: Partial<Datos["prefs"]>) =>
    actualizar((d) => ({ ...d, prefs: { ...d.prefs, ...p } }));

  return (
    <div style={panel}>
      <h2 style={titulo}>Recordatorios</h2>
      <p style={ayuda}>
        Mientras tengas la app abierta, cada cierto rato aparece una invitación a parar un momento.
        Si le das permiso a las notificaciones, también llega cuando estás en otra pestaña. Una
        página web no puede despertar el teléfono a una hora exacta con la app cerrada, así que eso
        no te lo prometo.
      </p>

      <label style={{ display: "flex", gap: "0.6rem", alignItems: "center", marginBottom: "0.8rem" }}>
        <input
          type="checkbox"
          checked={datos.prefs.recordatorios}
          onChange={async (e) => {
            const activo = e.target.checked;
            cambiar({ recordatorios: activo });
            if (activo && typeof Notification !== "undefined" && Notification.permission === "default") {
              try {
                setPermiso(await Notification.requestPermission());
              } catch {
                /* si el navegador no deja pedirlo, los avisos igual salen dentro de la app */
              }
            }
          }}
          style={{ accentColor: "#c8a050", width: 20, height: 20 }}
        />
        <span style={{ fontFamily: "var(--font-crimson), serif", color: "#d9cbaa" }}>
          Recordarme estar presente
        </span>
      </label>

      {datos.prefs.recordatorios && (
        <label style={{ ...ayuda, display: "flex", alignItems: "center", gap: "0.7rem", margin: "0 0 0.8rem" }}>
          Cada {datos.prefs.cadaMinutos} minutos
          <input
            type="range"
            min={30}
            max={240}
            step={15}
            value={datos.prefs.cadaMinutos}
            onChange={(e) => cambiar({ cadaMinutos: Number(e.target.value) })}
            style={{ flex: 1, accentColor: "#c8a050" }}
          />
        </label>
      )}

      {permiso === "denied" && (
        <p style={{ ...ayuda, fontSize: "0.85rem" }}>
          Este navegador tiene las notificaciones bloqueadas para el sitio. Los avisos van a salir
          igual dentro de la app.
        </p>
      )}

      <h2 style={{ ...titulo, marginTop: "1.2rem" }}>Música de la pausa</h2>
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
        {(
          [
            ["relajar", "Relajar"],
            ["activar", "Activar"],
            ["no", "Sin música"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => cambiar({ musica: id })}
            aria-pressed={datos.prefs.musica === id}
            style={{
              ...botonSec,
              ...(datos.prefs.musica === id
                ? { background: "rgba(200,160,80,0.18)", color: "#e8c878" }
                : null),
            }}
          >
            {label}
          </button>
        ))}
      </div>
      <label style={{ ...ayuda, display: "flex", alignItems: "center", gap: "0.7rem", margin: "0.8rem 0 0" }}>
        Volumen
        <input
          type="range"
          min={0.1}
          max={1}
          step={0.05}
          value={datos.prefs.volumenMusica}
          onChange={(e) => cambiar({ volumenMusica: Number(e.target.value) })}
          style={{ flex: 1, accentColor: "#c8a050" }}
        />
      </label>
    </div>
  );
}

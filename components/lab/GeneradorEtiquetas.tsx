"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  TAMANOS,
  HOJAS,
  medidaDesdeFrasco,
  calcularDistribucion,
} from "@/lib/lab/etiquetas-tamanos";

/* Generador de etiquetas para envases de cosmética.
   Pensado para quien recién empieza: se diseña UNA etiqueta a la vez y se ve
   grande mientras se edita; después se van sumando a la hoja las que se quieran
   imprimir. En la misma hoja pueden ir etiquetas distintas, de productos y hasta
   de tamaños distintos, para no gastar una hoja adhesiva por producto. */

type Estilo = {
  id: string;
  nombre: string;
  fondo: string;
  tinta: string;
  acento: string;
  fuenteTitulo: string;
  fuenteTexto: string;
  borde: string;
};

const ESTILOS: Estilo[] = [
  { id: "botica", nombre: "Botica", fondo: "#12200f", tinta: "#e8d8b0", acento: "#c8a050", fuenteTitulo: "var(--font-cinzel), serif", fuenteTexto: "var(--font-crimson), serif", borde: "#c8a050" },
  { id: "pergamino", nombre: "Pergamino", fondo: "#f0e6d2", tinta: "#4a3b28", acento: "#8a6a3a", fuenteTitulo: "var(--font-cormorant), serif", fuenteTexto: "var(--font-crimson), serif", borde: "#8a6a3a" },
  { id: "herbario", nombre: "Herbario", fondo: "#ffffff", tinta: "#2f3a26", acento: "#5a7a3a", fuenteTitulo: "var(--font-lora), serif", fuenteTexto: "var(--font-lora), serif", borde: "#5a7a3a" },
  { id: "nocturno", nombre: "Nocturno", fondo: "#141414", tinta: "#efe8d2", acento: "#c8a050", fuenteTitulo: "var(--font-cinzel), serif", fuenteTexto: "var(--font-lora), serif", borde: "#c8a050" },
  { id: "terracota", nombre: "Terracota", fondo: "#c98a6a", tinta: "#3a2418", acento: "#5a3320", fuenteTitulo: "var(--font-cormorant), serif", fuenteTexto: "var(--font-crimson), serif", borde: "#5a3320" },
  { id: "bosque", nombre: "Bosque", fondo: "#2b4030", tinta: "#e4ecdc", acento: "#a8c88a", fuenteTitulo: "var(--font-lora), serif", fuenteTexto: "var(--font-lora), serif", borde: "#a8c88a" },
  { id: "minimal", nombre: "Minimal", fondo: "#ffffff", tinta: "#1a1a1a", acento: "#1a1a1a", fuenteTitulo: "Helvetica, Arial, sans-serif", fuenteTexto: "Helvetica, Arial, sans-serif", borde: "#1a1a1a" },
  { id: "lavanda", nombre: "Lavanda", fondo: "#e6dced", tinta: "#3d2b46", acento: "#7a4a8a", fuenteTitulo: "var(--font-cormorant), serif", fuenteTexto: "var(--font-crimson), serif", borde: "#7a4a8a" },
  { id: "kraft", nombre: "Kraft", fondo: "#c9ab82", tinta: "#33261a", acento: "#5c4326", fuenteTitulo: "Georgia, serif", fuenteTexto: "Georgia, serif", borde: "#5c4326" },
  { id: "miel", nombre: "Miel", fondo: "#f3dfa8", tinta: "#4a3616", acento: "#9a6f1e", fuenteTitulo: "var(--font-crimson), serif", fuenteTexto: "var(--font-crimson), serif", borde: "#9a6f1e" },
];

type Datos = {
  marca: string;
  producto: string;
  contenido: string;
  ingredientes: string;
  modoUso: string;
  extra: string;
};

const DATOS_VACIOS: Datos = { marca: "", producto: "", contenido: "", ingredientes: "", modoUso: "", extra: "" };

/** Una etiqueta ya puesta en la hoja: se lleva su propio estilo y tamaño, así
 *  en una misma hoja pueden convivir productos distintos. */
type EnLaHoja = {
  id: string;
  estiloId: string;
  ancho: number;
  alto: number;
  redonda: boolean;
  fondo: string | null;
  datos: Datos;
  copias: number;
};

const MM = 96 / 25.4; // milímetros a píxeles de pantalla
const SEPARACION = 3; // mm entre etiquetas
const MARGEN = 10; // mm de margen de la hoja

function estiloDe(id: string) {
  return ESTILOS.find((e) => e.id === id) ?? ESTILOS[0];
}

/* Una etiqueta dibujada. Los tamaños de letra salen del alto en mm para que el
   texto no se desborde en las etiquetas chicas. */
function Etiqueta({
  estiloId,
  ancho,
  alto,
  redonda,
  fondo,
  datos,
}: Omit<EnLaHoja, "id" | "copias">) {
  const est = estiloDe(estiloId);
  return (
    <div
      style={{
        width: `${ancho}mm`,
        height: `${alto}mm`,
        background: fondo ? `url(${fondo}) center / cover` : est.fondo,
        color: est.tinta,
        border: `0.4mm solid ${est.borde}`,
        borderRadius: redonda ? "50%" : "1.2mm",
        padding: redonda ? "6mm 5mm" : "2.5mm 3mm",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        overflow: "hidden",
        boxSizing: "border-box",
        flex: "0 0 auto",
      }}
    >
      {datos.marca && (
        <div style={{ fontFamily: est.fuenteTitulo, fontSize: `${Math.max(1.6, alto * 0.055)}mm`, letterSpacing: "0.25em", textTransform: "uppercase", color: est.acento, marginBottom: "0.8mm" }}>
          {datos.marca}
        </div>
      )}
      <div style={{ fontFamily: est.fuenteTitulo, fontSize: `${Math.max(2.6, alto * 0.13)}mm`, lineHeight: 1.1, letterSpacing: "0.04em", marginBottom: "0.6mm" }}>
        {datos.producto || "Nombre del producto"}
      </div>
      {datos.contenido && (
        <div style={{ fontFamily: est.fuenteTexto, fontSize: `${Math.max(1.6, alto * 0.06)}mm`, color: est.acento, marginBottom: "0.8mm" }}>
          {datos.contenido}
        </div>
      )}
      {!redonda && datos.modoUso && (
        <div style={{ fontFamily: est.fuenteTexto, fontSize: `${Math.max(1.4, alto * 0.05)}mm`, lineHeight: 1.25, opacity: 0.9, marginBottom: "0.6mm" }}>
          {datos.modoUso}
        </div>
      )}
      {!redonda && datos.ingredientes && (
        <div style={{ fontFamily: est.fuenteTexto, fontSize: `${Math.max(1.2, alto * 0.042)}mm`, lineHeight: 1.2, opacity: 0.75, fontStyle: "italic" }}>
          {datos.ingredientes}
        </div>
      )}
      {datos.extra && (
        <div style={{ fontFamily: est.fuenteTexto, fontSize: `${Math.max(1.2, alto * 0.042)}mm`, opacity: 0.7, marginTop: "0.6mm" }}>
          {datos.extra}
        </div>
      )}
    </div>
  );
}

export function GeneradorEtiquetas() {
  const [estiloId, setEstiloId] = useState("botica");
  const [tamanoId, setTamanoId] = useState("frasco-50");
  const [ancho, setAncho] = useState(60);
  const [alto, setAlto] = useState(40);
  const [redonda, setRedonda] = useState(false);
  const [hojaId, setHojaId] = useState("carta");
  const [fondo, setFondo] = useState<string | null>(null);
  const [generando, setGenerando] = useState(false);
  const [verAyuda, setVerAyuda] = useState(false);
  const [diam, setDiam] = useState("");
  const [altoFrasco, setAltoFrasco] = useState("");
  const [datos, setDatos] = useState<Datos>(DATOS_VACIOS);

  const [enLaHoja, setEnLaHoja] = useState<EnLaHoja[]>([]);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [seSalen, setSeSalen] = useState(false);

  const hojaRef = useRef<HTMLDivElement>(null);
  const rejillaRef = useRef<HTMLDivElement>(null);

  const hoja = useMemo(() => HOJAS.find((h) => h.id === hojaId) ?? HOJAS[0], [hojaId]);
  const dist = useMemo(() => calcularDistribucion(hoja, ancho, alto), [hoja, ancho, alto]);
  const total = useMemo(() => enLaHoja.reduce((a, e) => a + e.copias, 0), [enLaHoja]);

  /* Cuántas más caben. Si todas son del mismo tamaño el cálculo es exacto (la
     rejilla queda regular); con tamaños mezclados es una estimación por
     superficie, y el aviso de «se salen de la hoja» es el que manda. */
  const cabenMas = useMemo(() => {
    if (dist.total === 0) return 0;
    const mismoTamano = enLaHoja.every((e) => e.ancho === ancho && e.alto === alto);
    if (mismoTamano) return Math.max(0, dist.total - total);
    const util = (hoja.ancho - MARGEN * 2) * (hoja.alto - MARGEN * 2);
    const usado = enLaHoja.reduce((a, e) => a + e.copias * (e.ancho + SEPARACION) * (e.alto + SEPARACION), 0);
    return Math.max(0, Math.floor((util - usado) / ((ancho + SEPARACION) * (alto + SEPARACION))));
  }, [dist.total, enLaHoja, ancho, alto, total, hoja]);

  /* El aviso de verdad: se mide la rejilla ya dibujada contra el alto de la
     hoja. Funciona igual con tamaños mezclados, donde ninguna cuenta calza. */
  useEffect(() => {
    const el = rejillaRef.current;
    if (!el) {
      setSeSalen(false);
      return;
    }
    const medir = () => setSeSalen(el.scrollHeight > (hoja.alto - MARGEN * 2) * MM + 2);
    medir();
    const obs = new ResizeObserver(medir);
    obs.observe(el);
    return () => obs.disconnect();
  }, [enLaHoja, hoja]);

  function elegirTamano(id: string) {
    setTamanoId(id);
    const t = TAMANOS.find((x) => x.id === id);
    if (t) {
      setAncho(t.ancho);
      setAlto(t.alto);
      setRedonda(t.forma === "redonda");
    }
  }

  function calcularDesdeFrasco() {
    const d = parseFloat(diam.replace(",", "."));
    const h = parseFloat(altoFrasco.replace(",", "."));
    if (!d || !h) return;
    const m = medidaDesdeFrasco(d, h);
    setAncho(m.ancho);
    setAlto(m.alto);
    setRedonda(false);
    setTamanoId("personalizado");
  }

  function cargarFondo(file: File) {
    const lector = new FileReader();
    lector.onload = () => setFondo(String(lector.result));
    lector.readAsDataURL(file);
  }

  const disenoActual = () => ({ estiloId, ancho, alto, redonda, fondo, datos });

  function anadir(copias: number) {
    if (copias < 1) return;
    setEnLaHoja((lista) => [
      ...lista,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, ...disenoActual(), copias },
    ]);
    setEditandoId(null);
  }

  function guardarCambios() {
    if (!editandoId) return;
    setEnLaHoja((lista) => lista.map((e) => (e.id === editandoId ? { ...e, ...disenoActual() } : e)));
    setEditandoId(null);
  }

  function editar(e: EnLaHoja) {
    setEstiloId(e.estiloId);
    setAncho(e.ancho);
    setAlto(e.alto);
    setRedonda(e.redonda);
    setFondo(e.fondo);
    setDatos(e.datos);
    setTamanoId(TAMANOS.find((t) => t.ancho === e.ancho && t.alto === e.alto)?.id ?? "personalizado");
    setEditandoId(e.id);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const acotar = (n: number) => Math.max(1, Math.min(200, n || 1));

  function cambiarCopias(id: string, copias: number) {
    setEnLaHoja((lista) => lista.map((e) => (e.id === id ? { ...e, copias: acotar(copias) } : e)));
  }

  /* Suma o resta sobre el valor vigente, no sobre el del último dibujo: si se
     aprieta rápido varias veces seguidas, no se pierde ningún toque. */
  function sumarCopias(id: string, delta: number) {
    setEnLaHoja((lista) => lista.map((e) => (e.id === id ? { ...e, copias: acotar(e.copias + delta) } : e)));
  }

  function quitar(id: string) {
    setEnLaHoja((lista) => lista.filter((e) => e.id !== id));
    if (editandoId === id) setEditandoId(null);
  }

  function empezarDeNuevo() {
    setDatos(DATOS_VACIOS);
    setFondo(null);
    setEditandoId(null);
  }

  async function descargarPdf() {
    const el = hojaRef.current;
    if (!el) return;
    setGenerando(true);
    try {
      const html2pdf = (await import("html2pdf.js")).default;
      try {
        await (document as unknown as { fonts?: { ready?: Promise<unknown> } }).fonts?.ready;
      } catch {
        /* Fonts API no disponible */
      }
      const nombre = enLaHoja[0]?.datos.producto || "mis-etiquetas";
      await html2pdf()
        .set({
          filename: `etiquetas-${nombre.toLowerCase().replace(/\s+/g, "-")}.pdf`,
          margin: 0,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 3, backgroundColor: "#ffffff", useCORS: true },
          jsPDF: { unit: "mm", format: hojaId === "a4" ? "a4" : "letter", orientation: "portrait" },
        })
        .from(el)
        .save();
    } finally {
      setGenerando(false);
    }
  }

  /* La vista previa se agranda para poder leerla mientras se edita; el tamaño
     de verdad va escrito debajo, que es lo que importa al imprimir. */
  const escala = Math.min(2.2, Math.max(0.62, 290 / (ancho * MM)));

  return (
    <>
      <div className="no-print" style={panel}>
        {/* Estilos */}
        <p style={lbl}>1 · Elige un estilo</p>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", marginBottom: "1.1rem" }}>
          {ESTILOS.map((e) => (
            <button
              key={e.id}
              type="button"
              onClick={() => setEstiloId(e.id)}
              title={e.nombre}
              style={{
                width: 66,
                minHeight: 46,
                borderRadius: 5,
                cursor: "pointer",
                background: e.fondo,
                color: e.tinta,
                border: e.id === estiloId ? "2px solid #e8c878" : `1px solid ${e.borde}`,
                fontFamily: e.fuenteTitulo,
                fontSize: "0.58rem",
                letterSpacing: "0.06em",
              }}
            >
              {e.nombre}
            </button>
          ))}
        </div>

        {/* Tamaño */}
        <p style={lbl}>2 · Tamaño según tu envase</p>
        <select value={tamanoId} onChange={(e) => elegirTamano(e.target.value)} style={{ ...input, width: "100%", marginBottom: "0.5rem" }}>
          {TAMANOS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre} — {t.ancho}×{t.alto} mm ({t.envase})
            </option>
          ))}
          <option value="personalizado">A mi medida…</option>
        </select>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center", marginBottom: "0.5rem" }}>
          <label style={mini}>Ancho
            <input type="number" value={ancho} min={15} max={200} onChange={(e) => { setAncho(Number(e.target.value)); setTamanoId("personalizado"); }} style={{ ...input, width: 74, marginLeft: 6 }} />
          </label>
          <label style={mini}>Alto
            <input type="number" value={alto} min={12} max={200} onChange={(e) => { setAlto(Number(e.target.value)); setTamanoId("personalizado"); }} style={{ ...input, width: 74, marginLeft: 6 }} />
          </label>
          <span style={{ ...mini, opacity: 0.7 }}>milímetros</span>
        </div>

        <button type="button" onClick={() => setVerAyuda((v) => !v)} style={botonLink}>
          {verAyuda ? "Ocultar" : "¿No sabes la medida? Mídela aquí"}
        </button>

        {verAyuda && (
          <div style={ayuda}>
            <p style={{ margin: "0 0 0.6rem" }}>
              Con una regla, mide tu frasco: el <strong>diámetro</strong> (el ancho de la tapa vista desde
              arriba) y el <strong>alto de la parte recta</strong> (sin contar la tapa ni la curva del hombro).
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
              <input placeholder="Diámetro mm" value={diam} onChange={(e) => setDiam(e.target.value)} style={{ ...input, width: 118 }} />
              <input placeholder="Alto recto mm" value={altoFrasco} onChange={(e) => setAltoFrasco(e.target.value)} style={{ ...input, width: 128 }} />
              <button type="button" onClick={calcularDesdeFrasco} style={botonSec}>Calcular</button>
            </div>
            <p style={{ margin: "0.6rem 0 0", opacity: 0.75 }}>
              La etiqueta debe dar la vuelta al frasco, así que el ancho es el contorno (diámetro × 3,14),
              menos unos milímetros para que las puntas no se monten.
            </p>
          </div>
        )}

        {/* Textos */}
        <p style={{ ...lbl, marginTop: "1.1rem" }}>3 · Qué dice la etiqueta</p>
        <div style={{ display: "grid", gap: "0.45rem", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>
          <input style={input} placeholder="Tu marca" value={datos.marca} onChange={(e) => setDatos({ ...datos, marca: e.target.value })} />
          <input style={input} placeholder="Nombre del producto" value={datos.producto} onChange={(e) => setDatos({ ...datos, producto: e.target.value })} />
          <input style={input} placeholder="Contenido (ej. 50 ml)" value={datos.contenido} onChange={(e) => setDatos({ ...datos, contenido: e.target.value })} />
          <input style={input} placeholder="Lote / vence / @instagram" value={datos.extra} onChange={(e) => setDatos({ ...datos, extra: e.target.value })} />
        </div>
        <textarea style={{ ...input, width: "100%", marginTop: "0.45rem", minHeight: 44 }} placeholder="Modo de uso (corto)" value={datos.modoUso} onChange={(e) => setDatos({ ...datos, modoUso: e.target.value })} />
        <textarea style={{ ...input, width: "100%", marginTop: "0.45rem", minHeight: 52 }} placeholder="Ingredientes (INCI)" value={datos.ingredientes} onChange={(e) => setDatos({ ...datos, ingredientes: e.target.value })} />

        {/* Fondo propio */}
        <p style={{ ...lbl, marginTop: "1.1rem" }}>4 · Fondo propio (opcional)</p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <label style={botonSec}>
            Subir mi fondo
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) cargarFondo(f); e.target.value = ""; }} />
          </label>
          {fondo && <button type="button" onClick={() => setFondo(null)} style={botonSec}>Quitar fondo</button>}
        </div>
        <p style={{ ...pista, marginTop: "0.5rem" }}>
          Puedes generar tu fondo con cualquier herramienta de imágenes pidiendo, por ejemplo:{" "}
          <em>«textura de papel kraft con hojas botánicas suaves en las esquinas, tonos tierra, centro
          despejado para poner texto, sin letras»</em>. Guárdalo y súbelo aquí. Que el centro quede
          despejado es lo importante: ahí va el nombre.
        </p>
      </div>

      {/* ── Una sola etiqueta, grande, mientras se edita ── */}
      <div className="no-print" style={{ ...panel, textAlign: "center" }}>
        <p style={{ ...lbl, textAlign: "left" }}>
          {editandoId ? "Editando una etiqueta de la hoja" : "Así se verá tu etiqueta"}
        </p>

        <div style={{ overflowX: "auto", padding: "0.4rem 0" }}>
          <div style={{ height: alto * MM * escala, display: "flex", justifyContent: "center" }}>
            <div style={{ transform: `scale(${escala})`, transformOrigin: "top center" }}>
              <Etiqueta estiloId={estiloId} ancho={ancho} alto={alto} redonda={redonda} fondo={fondo} datos={datos} />
            </div>
          </div>
        </div>

        <p style={{ ...mini, opacity: 0.7, margin: "0.7rem 0 0" }}>
          Tamaño real: {ancho} × {alto} mm · en pantalla se ve ampliada
        </p>

        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1rem" }}>
          {editandoId ? (
            <>
              <button type="button" onClick={guardarCambios} style={botonPri}>Guardar cambios</button>
              <button type="button" onClick={() => setEditandoId(null)} style={botonSec}>Cancelar</button>
            </>
          ) : (
            <>
              <button type="button" onClick={() => anadir(1)} disabled={dist.total === 0} style={botonPri}>
                Sumar a la hoja
              </button>
              <button type="button" onClick={() => anadir(cabenMas)} disabled={cabenMas === 0} style={botonSec}>
                {cabenMas > 0 ? `Llenar la hoja (${cabenMas})` : "Ya no cabe otra"}
              </button>
              <button type="button" onClick={empezarDeNuevo} style={botonSec}>Empezar en blanco</button>
            </>
          )}
        </div>

        {dist.total === 0 && (
          <p style={{ ...pista, color: "#f0a080" }}>
            Con esa medida no cabe ninguna etiqueta en la hoja. Achica el ancho o el alto.
          </p>
        )}
      </div>

      {/* ── Qué va en la hoja ── */}
      <div className="no-print" style={panel}>
        <p style={lbl}>5 · Las etiquetas de esta hoja</p>

        {enLaHoja.length === 0 ? (
          <p style={{ ...pista, margin: 0 }}>
            Todavía no has sumado ninguna. Diseña tu etiqueta arriba y aprieta{" "}
            <strong>Sumar a la hoja</strong>. Puedes sumar varias distintas —de productos diferentes— y
            todas saldrán juntas en la misma hoja.
          </p>
        ) : (
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {enLaHoja.map((e) => (
              <div key={e.id} style={fila}>
                <div style={{ width: 58, height: 44, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 auto" }}>
                  <div style={{ transform: `scale(${Math.min(0.5, 54 / (e.ancho * MM))})`, transformOrigin: "center" }}>
                    <Etiqueta estiloId={e.estiloId} ancho={e.ancho} alto={e.alto} redonda={e.redonda} fondo={e.fondo} datos={e.datos} />
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: 130 }}>
                  <p style={{ ...mini, margin: 0, color: "#d4c4a0" }}>{e.datos.producto || "Sin nombre"}</p>
                  <p style={{ ...mini, margin: 0, opacity: 0.6, fontSize: "0.78rem" }}>
                    {estiloDe(e.estiloId).nombre} · {e.ancho} × {e.alto} mm
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.3rem", flex: "0 0 auto" }}>
                  <button type="button" onClick={() => sumarCopias(e.id, -1)} style={botonRedondo} aria-label="Una menos">−</button>
                  <input
                    type="number"
                    value={e.copias}
                    min={1}
                    max={200}
                    onChange={(ev) => cambiarCopias(e.id, Number(ev.target.value))}
                    style={{ ...input, width: 62, textAlign: "center" }}
                    aria-label="Cuántas copias"
                  />
                  <button type="button" onClick={() => sumarCopias(e.id, 1)} style={botonRedondo} aria-label="Una más">+</button>
                </div>

                <div style={{ display: "flex", gap: "0.6rem", flex: "0 0 auto" }}>
                  <button type="button" onClick={() => editar(e)} style={botonLink}>Editar</button>
                  <button type="button" onClick={() => quitar(e.id)} style={{ ...botonLink, color: "#f0a080" }}>Quitar</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hoja */}
        <p style={{ ...lbl, marginTop: "1.2rem" }}>6 · Hoja para imprimir</p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <select value={hojaId} onChange={(e) => setHojaId(e.target.value)} style={{ ...input, minWidth: 210 }}>
            {HOJAS.map((h) => (
              <option key={h.id} value={h.id}>{h.nombre}</option>
            ))}
          </select>
          <span style={{ ...mini, color: seSalen ? "#f0a080" : "#a8c88a" }}>
            {total === 0
              ? "La hoja está vacía"
              : seSalen
                ? `${total} etiquetas: se salen de la hoja, quita algunas`
                : `${total} etiqueta${total === 1 ? "" : "s"} en la hoja`}
          </span>
        </div>

        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "1.1rem" }}>
          <button type="button" onClick={descargarPdf} disabled={generando || total === 0} style={botonPri}>
            {generando ? "Generando…" : "Descargar hoja (PDF)"}
          </button>
          <button type="button" onClick={() => window.print()} disabled={total === 0} style={botonSec}>
            Imprimir
          </button>
          {enLaHoja.length > 0 && (
            <button type="button" onClick={() => setEnLaHoja([])} style={botonSec}>Vaciar la hoja</button>
          )}
        </div>
        <p style={pista}>
          Imprime al <strong>100%</strong> (sin «ajustar a la página»), o las medidas no calzarán. Haz una
          prueba en hoja normal y compárala con el frasco antes de gastar el papel adhesivo.
        </p>
      </div>

      {/* ── La hoja completa: solo aparece cuando ya hay algo que imprimir ── */}
      {enLaHoja.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <div
            ref={hojaRef}
            style={{
              width: `${hoja.ancho}mm`,
              minHeight: `${hoja.alto}mm`,
              background: "#fff",
              padding: `${MARGEN}mm`,
              boxSizing: "border-box",
              margin: "0 auto",
            }}
          >
            <div
              ref={rejillaRef}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: `${SEPARACION}mm`,
                alignContent: "flex-start",
              }}
            >
              {enLaHoja.flatMap((e) =>
                Array.from({ length: e.copias }).map((_, i) => (
                  <Etiqueta
                    key={`${e.id}-${i}`}
                    estiloId={e.estiloId}
                    ancho={e.ancho}
                    alto={e.alto}
                    redonda={e.redonda}
                    fondo={e.fondo}
                    datos={e.datos}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(200,160,80,0.22)",
  background: "rgba(200,160,80,0.05)",
  borderRadius: 8,
  padding: "1rem 1.1rem",
  marginBottom: "1.4rem",
};
const lbl: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.6rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(200,160,80,0.8)",
  margin: "0 0 0.5rem",
};
const input: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.92rem",
  color: "#d4c4a0",
  background: "rgba(13,26,13,0.85)",
  border: "1px solid rgba(200,160,80,0.28)",
  borderRadius: 4,
  padding: "0.5rem 0.6rem",
  minHeight: 40,
};
const mini: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.85rem",
  color: "rgba(212,196,160,0.8)",
};
const fila: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "0.7rem",
  flexWrap: "wrap",
  border: "1px solid rgba(200,160,80,0.16)",
  borderRadius: 6,
  padding: "0.6rem 0.7rem",
  background: "rgba(13,26,13,0.35)",
};
const botonPri: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.66rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#0d1a0d",
  background: "rgba(200,160,80,0.92)",
  border: "none",
  borderRadius: 4,
  padding: "0 1.3rem",
  minHeight: 42,
  cursor: "pointer",
};
const botonSec: CSSProperties = { ...botonPri, color: "#c8a050", background: "transparent", border: "1px solid rgba(200,160,80,0.45)", display: "inline-flex", alignItems: "center" };
const botonRedondo: CSSProperties = {
  width: 40,
  height: 40,
  borderRadius: "50%",
  border: "1px solid rgba(200,160,80,0.45)",
  background: "transparent",
  color: "#c8a050",
  fontSize: "1.1rem",
  lineHeight: 1,
  cursor: "pointer",
  flex: "0 0 auto",
};
const botonLink: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.86rem",
  color: "#c8a050",
  background: "none",
  border: "none",
  padding: "0.3rem 0",
  cursor: "pointer",
  textDecoration: "underline",
};
const ayuda: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.88rem",
  lineHeight: 1.6,
  color: "rgba(212,196,160,0.85)",
  background: "rgba(122,74,138,0.1)",
  border: "1px solid rgba(122,74,138,0.28)",
  borderRadius: 6,
  padding: "0.8rem 0.9rem",
  marginTop: "0.5rem",
};
const pista: CSSProperties = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.84rem",
  color: "rgba(212,196,160,0.6)",
  margin: "0.7rem 0 0",
  lineHeight: 1.6,
};

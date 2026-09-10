"use client";

import { useMemo, useRef, useState, type CSSProperties } from "react";
import {
  TAMANOS,
  HOJAS,
  medidaDesdeFrasco,
  calcularDistribucion,
} from "@/lib/lab/etiquetas-tamanos";

/* Generador de etiquetas para envases de cosmética.
   Pensado para quien recién empieza: se elige un estilo hecho, se rellenan los
   datos y se descarga una hoja con la mayor cantidad de etiquetas que quepan,
   lista para imprimir y recortar. */

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

export function GeneradorEtiquetas() {
  const [estiloId, setEstiloId] = useState("botica");
  const [tamanoId, setTamanoId] = useState("frasco-50");
  const [ancho, setAncho] = useState(60);
  const [alto, setAlto] = useState(40);
  const [hojaId, setHojaId] = useState("carta");
  const [fondo, setFondo] = useState<string | null>(null);
  const [generando, setGenerando] = useState(false);
  const [verAyuda, setVerAyuda] = useState(false);
  const [diam, setDiam] = useState("");
  const [altoFrasco, setAltoFrasco] = useState("");
  const hojaRef = useRef<HTMLDivElement>(null);

  const [datos, setDatos] = useState<Datos>({
    marca: "",
    producto: "",
    contenido: "",
    ingredientes: "",
    modoUso: "",
    extra: "",
  });

  const est = useMemo(() => ESTILOS.find((e) => e.id === estiloId) ?? ESTILOS[0], [estiloId]);
  const hoja = useMemo(() => HOJAS.find((h) => h.id === hojaId) ?? HOJAS[0], [hojaId]);
  const tam = useMemo(() => TAMANOS.find((t) => t.id === tamanoId), [tamanoId]);
  const redonda = tam?.forma === "redonda";

  const dist = useMemo(() => calcularDistribucion(hoja, ancho, alto), [hoja, ancho, alto]);

  function elegirTamano(id: string) {
    setTamanoId(id);
    const t = TAMANOS.find((x) => x.id === id);
    if (t) {
      setAncho(t.ancho);
      setAlto(t.alto);
    }
  }

  function calcularDesdeFrasco() {
    const d = parseFloat(diam.replace(",", "."));
    const h = parseFloat(altoFrasco.replace(",", "."));
    if (!d || !h) return;
    const m = medidaDesdeFrasco(d, h);
    setAncho(m.ancho);
    setAlto(m.alto);
    setTamanoId("personalizado");
  }

  function cargarFondo(file: File) {
    const lector = new FileReader();
    lector.onload = () => setFondo(String(lector.result));
    lector.readAsDataURL(file);
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
      await html2pdf()
        .set({
          filename: `etiquetas-${(datos.producto || "mi-producto").toLowerCase().replace(/\s+/g, "-")}.pdf`,
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

  const Etiqueta = () => (
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

        {/* Hoja */}
        <p style={{ ...lbl, marginTop: "1.1rem" }}>5 · Hoja para imprimir</p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
          <select value={hojaId} onChange={(e) => setHojaId(e.target.value)} style={{ ...input, minWidth: 210 }}>
            {HOJAS.map((h) => (
              <option key={h.id} value={h.id}>{h.nombre}</option>
            ))}
          </select>
          <span style={{ ...mini, color: dist.total > 0 ? "#a8c88a" : "#f0a080" }}>
            {dist.total > 0
              ? `Caben ${dist.total} etiquetas (${dist.columnas} × ${dist.filas})`
              : "La etiqueta no cabe en esta hoja"}
          </span>
        </div>

        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "1.1rem" }}>
          <button type="button" onClick={descargarPdf} disabled={generando || dist.total === 0} style={botonPri}>
            {generando ? "Generando…" : "Descargar hoja (PDF)"}
          </button>
          <button type="button" onClick={() => window.print()} disabled={dist.total === 0} style={botonSec}>
            Imprimir
          </button>
        </div>
        <p style={pista}>
          Imprime al <strong>100%</strong> (sin «ajustar a la página»), o las medidas no calzarán. Haz una
          prueba en hoja normal y compárala con el frasco antes de gastar el papel adhesivo.
        </p>
      </div>

      {/* Hoja con todas las etiquetas */}
      <div style={{ overflowX: "auto" }}>
        <div
          ref={hojaRef}
          style={{
            width: `${hoja.ancho}mm`,
            minHeight: `${hoja.alto}mm`,
            background: "#fff",
            padding: "10mm",
            display: "grid",
            gridTemplateColumns: `repeat(${Math.max(1, dist.columnas)}, ${ancho}mm)`,
            gap: "3mm",
            alignContent: "start",
            justifyContent: "start",
            boxSizing: "border-box",
            margin: "0 auto",
          }}
        >
          {Array.from({ length: dist.total }).map((_, i) => (
            <Etiqueta key={i} />
          ))}
        </div>
      </div>
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

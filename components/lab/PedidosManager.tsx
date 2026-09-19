"use client";

import { useState, type CSSProperties } from "react";
import { createClient } from "@/lib/supabase-browser";

// Los pedidos que llegan por la tienda. Arriba, los pagados que faltan por
// despachar: es lo que hay que hacer hoy. Los pendientes o rechazados quedan
// aparte, porque no hay nada que enviar hasta que se paguen.

export type Pedido = {
  id: number;
  orden: string;
  estado: "pendiente" | "pagado" | "rechazado" | "anulado";
  total: number;
  items: { slug: string; nombre: string; cantidad: number; precio: number }[];
  nombre: string | null;
  email: string | null;
  telefono: string | null;
  metodo_envio: "domicilio" | "sucursal" | null;
  direccion: string | null;
  sucursal: string | null;
  comentarios: string | null;
  despachado: boolean;
  creado: string;
  pagado: string | null;
};

const GOLD = "#c8a050";
const CREAM = "#d4c4a0";
const clp = (n: number) => `$${Math.round(n).toLocaleString("es-CL")}`;
const fecha = (iso: string) =>
  new Date(iso).toLocaleString("es-CL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export function PedidosManager({ inicial }: { inicial: Pedido[] }) {
  const [pedidos, setPedidos] = useState(inicial);
  const [error, setError] = useState<string | null>(null);

  async function marcar(p: Pedido, despachado: boolean) {
    setError(null);
    setPedidos((xs) => xs.map((x) => (x.id === p.id ? { ...x, despachado } : x)));
    const { error: err } = await createClient().from("pedidos").update({ despachado }).eq("id", p.id);
    if (err) {
      setPedidos((xs) => xs.map((x) => (x.id === p.id ? { ...x, despachado: !despachado } : x)));
      setError(`No se pudo guardar: ${err.message}`);
    }
  }

  const porEnviar = pedidos.filter((p) => p.estado === "pagado" && !p.despachado);
  const enviados = pedidos.filter((p) => p.estado === "pagado" && p.despachado);
  const sinPagar = pedidos.filter((p) => p.estado !== "pagado");

  if (pedidos.length === 0) {
    return (
      <p style={{ ...nota, textAlign: "center", padding: "3rem 0" }}>
        Todavía no llegan pedidos. Cuando alguien pague en la tienda, aparecerá aquí con su dirección.
      </p>
    );
  }

  return (
    <div style={{ display: "grid", gap: "2.4rem" }}>
      {error && <p style={{ ...nota, color: "#e05a4a", fontStyle: "normal" }}>{error}</p>}

      <Grupo titulo={`Por despachar (${porEnviar.length})`} vacio="Nada pendiente. Todo va en camino. 🌿">
        {porEnviar.map((p) => (
          <Tarjeta key={p.id} p={p} onMarcar={marcar} />
        ))}
      </Grupo>

      {enviados.length > 0 && (
        <Grupo titulo={`Despachados (${enviados.length})`}>
          {enviados.map((p) => (
            <Tarjeta key={p.id} p={p} onMarcar={marcar} />
          ))}
        </Grupo>
      )}

      {sinPagar.length > 0 && (
        <Grupo titulo={`Sin pagar (${sinPagar.length})`}>
          <p style={{ ...nota, margin: "-0.4rem 0 0.4rem" }}>
            Alguien llenó sus datos pero el pago no se completó. No hay que enviar nada; sirve para saber
            quién se quedó a medio camino.
          </p>
          {sinPagar.map((p) => (
            <Tarjeta key={p.id} p={p} />
          ))}
        </Grupo>
      )}
    </div>
  );
}

function Grupo({ titulo, vacio, children }: { titulo: string; vacio?: string; children: React.ReactNode }) {
  const hay = Array.isArray(children) ? children.length > 0 : !!children;
  return (
    <section>
      <h2 style={subtitulo}>{titulo}</h2>
      <div style={{ display: "grid", gap: "1rem" }}>{hay ? children : vacio && <p style={nota}>{vacio}</p>}</div>
    </section>
  );
}

const ETIQUETA: Record<Pedido["estado"], string> = {
  pagado: "Pagado",
  pendiente: "Pago pendiente",
  rechazado: "Pago rechazado",
  anulado: "Anulado",
};

function Tarjeta({ p, onMarcar }: { p: Pedido; onMarcar?: (p: Pedido, v: boolean) => void }) {
  const destino = p.metodo_envio === "sucursal" ? `Sucursal Correos: ${p.sucursal ?? "—"}` : p.direccion ?? "—";
  return (
    <article style={{ ...tarjeta, opacity: p.estado === "pagado" ? 1 : 0.7 }}>
      <header style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.5rem", marginBottom: "0.8rem" }}>
        <div>
          <strong style={{ fontFamily: "var(--font-cinzel), serif", color: GOLD, letterSpacing: "0.06em" }}>{p.orden}</strong>
          <span style={{ ...nota, marginLeft: "0.6rem" }}>{fecha(p.pagado ?? p.creado)}</span>
        </div>
        <span style={{ ...insignia, ...(p.estado === "pagado" ? {} : { color: "rgba(212,196,160,0.7)", borderColor: "rgba(212,196,160,0.3)" }) }}>
          {ETIQUETA[p.estado]} · {clp(p.total)}
        </span>
      </header>

      <ul style={{ margin: "0 0 0.9rem", paddingLeft: "1.1rem", color: CREAM, fontFamily: "var(--font-body)", lineHeight: 1.6 }}>
        {p.items.map((it) => (
          <li key={it.slug}>
            {it.cantidad} × {it.nombre} <span style={{ opacity: 0.6 }}>({clp(it.precio * it.cantidad)})</span>
          </li>
        ))}
      </ul>

      <dl style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.3rem 0.9rem", margin: 0, fontFamily: "var(--font-body)", fontSize: "0.95rem", color: CREAM }}>
        <dt style={dt}>Nombre</dt>
        <dd style={dd}>{p.nombre || "—"}</dd>
        <dt style={dt}>Envío</dt>
        <dd style={dd}>{destino}</dd>
        <dt style={dt}>Teléfono</dt>
        <dd style={dd}>{p.telefono ? <a href={`tel:${p.telefono}`} style={enlace}>{p.telefono}</a> : "—"}</dd>
        <dt style={dt}>Correo</dt>
        <dd style={dd}>{p.email ? <a href={`mailto:${p.email}`} style={enlace}>{p.email}</a> : "—"}</dd>
        {p.comentarios && (
          <>
            <dt style={dt}>Nota</dt>
            <dd style={{ ...dd, fontStyle: "italic" }}>{p.comentarios}</dd>
          </>
        )}
      </dl>

      {onMarcar && (
        <button type="button" onClick={() => onMarcar(p, !p.despachado)} style={p.despachado ? botonSec : boton}>
          {p.despachado ? "Volver a «por despachar»" : "Marcar como despachado ✓"}
        </button>
      )}
    </article>
  );
}

const subtitulo: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.9rem",
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: GOLD,
  margin: "0 0 1rem",
};
const nota: CSSProperties = { fontFamily: "var(--font-body)", fontStyle: "italic", color: "rgba(212,196,160,0.65)", margin: 0 };
const tarjeta: CSSProperties = {
  background: "rgba(10,16,10,0.72)",
  border: "1px solid rgba(200,160,80,0.28)",
  borderRadius: 6,
  padding: "1.1rem 1.2rem",
};
const insignia: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.7rem",
  letterSpacing: "0.1em",
  color: GOLD,
  border: "1px solid rgba(200,160,80,0.5)",
  borderRadius: 999,
  padding: "0.25rem 0.7rem",
  alignSelf: "center",
};
const dt: CSSProperties = { opacity: 0.6 };
const dd: CSSProperties = { margin: 0, overflowWrap: "anywhere" };
const enlace: CSSProperties = { color: CREAM, textDecorationColor: "rgba(200,160,80,0.5)" };
const boton: CSSProperties = {
  marginTop: "1rem",
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.72rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#12200f",
  background: "linear-gradient(135deg, #e8c878, #c8a050)",
  border: "none",
  borderRadius: 3,
  padding: "0.7rem 1.1rem",
  cursor: "pointer",
};
const botonSec: CSSProperties = {
  ...boton,
  color: CREAM,
  background: "transparent",
  border: "1px solid rgba(200,160,80,0.4)",
};

"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";
import { useCart } from "@/components/tienda/CartProvider";

const GOLD = "#c8a050";
const CREAM = "#d4c4a0";

type MetodoEnvio = "domicilio" | "sucursal";

export default function CheckoutPage() {
  const { items, total, count, allPriced } = useCart();
  const [metodo, setMetodo] = useState<MetodoEnvio>("domicilio");
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    sucursal: "",
    comentarios: "",
  });
  const [errores, setErrores] = useState<Record<string, boolean>>({});
  const [aviso, setAviso] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  function set(campo: keyof typeof form, valor: string) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  function validar() {
    const e: Record<string, boolean> = {};
    if (!form.nombre.trim()) e.nombre = true;
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = true;
    if (!form.telefono.trim()) e.telefono = true;
    if (metodo === "domicilio" && !form.direccion.trim()) e.direccion = true;
    if (metodo === "sucursal" && !form.sucursal.trim()) e.sucursal = true;
    setErrores(e);
    return Object.keys(e).length === 0;
  }

  async function pagar() {
    setAviso(null);
    if (!validar()) {
      setAviso("Por favor completa los campos obligatorios (*).");
      return;
    }
    setEnviando(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((x) => ({ slug: x.slug, cantidad: x.cantidad })),
          cliente: { ...form, metodoEnvio: metodo },
        }),
      });
      const data = await res.json();
      if (data?.init_point) {
        window.location.href = data.init_point;
        return;
      }
      if (data?.configured === false) {
        setAviso(
          "El pago online estará disponible muy pronto. Mientras tanto, escríbenos a Instagram (@elfloema) con tu pedido y estos datos."
        );
      } else if (data?.error === "sin_items_con_precio") {
        setAviso("Aún no hay precios cargados para estos productos.");
      } else {
        setAviso("No pudimos iniciar el pago. Intenta de nuevo o escríbenos a @elfloema.");
      }
    } catch {
      setAviso("Hubo un problema de conexión. Intenta de nuevo.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <Navbar />
      <main
        style={{
          background:
            "linear-gradient(rgba(8,13,8,0.82), rgba(8,13,8,0.92)), url('/fondo_tienda.jpg') center top / cover fixed, var(--bg-primary)",
          minHeight: "100vh",
          paddingTop: "5rem",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(2rem,5vh,4rem) clamp(1.5rem,5vw,3rem) 6rem" }}>
          <div style={{ marginBottom: "clamp(1.5rem,4vh,2.5rem)" }}>
            <BackButton label="← Volver a la tienda" href="/tienda" />
          </div>

          <h1
            style={{
              fontFamily: "var(--font-cinzel), serif",
              fontSize: "clamp(1.7rem,4vw,2.6rem)",
              color: GOLD,
              letterSpacing: "0.1em",
              textShadow: "0 0 55px rgba(200,160,80,0.25)",
              margin: "0 0 2rem",
            }}
          >
            Finalizar compra
          </h1>

          {count === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <p style={{ fontFamily: "var(--font-crimson), serif", fontStyle: "italic", color: CREAM, opacity: 0.7, fontSize: "1.1rem", marginBottom: "1.5rem" }}>
                Tu carrito está vacío. 🌿
              </p>
              <Link href="/tienda" style={linkBoton}>
                Ir a la tienda →
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2.5rem" }}>
              {/* Resumen del pedido */}
              <section>
                <h2 style={heading}>Tu pedido</h2>
                <div style={{ border: "1px solid rgba(200,160,80,0.16)", borderRadius: 4, overflow: "hidden" }}>
                  {items.map((item) => (
                    <div
                      key={item.slug}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "1rem",
                        padding: "0.85rem 1.1rem",
                        borderBottom: "1px solid rgba(200,160,80,0.1)",
                        fontFamily: "var(--font-crimson), serif",
                      }}
                    >
                      <span style={{ color: CREAM }}>
                        {item.nombre} <span style={{ opacity: 0.55 }}>× {item.cantidad}</span>
                      </span>
                      <span style={{ color: item.precio ? GOLD : "rgba(212,196,160,0.45)", fontStyle: item.precio ? "normal" : "italic", whiteSpace: "nowrap" }}>
                        {item.precio ? `$${(item.precio * item.cantidad).toLocaleString("es-CL")}` : "Precio pronto"}
                      </span>
                    </div>
                  ))}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0.9rem 1.1rem",
                      fontFamily: "var(--font-cinzel), serif",
                      letterSpacing: "0.08em",
                    }}
                  >
                    <span style={{ color: "rgba(212,196,160,0.7)", textTransform: "uppercase", fontSize: "0.78rem" }}>Total</span>
                    <span style={{ color: GOLD, fontSize: "1.1rem" }}>
                      {allPriced ? `$${total.toLocaleString("es-CL")} CLP` : "Precios próximamente"}
                    </span>
                  </div>
                </div>
              </section>

              {/* Datos de contacto y envío */}
              <section>
                <h2 style={heading}>Tus datos</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.1rem" }}>
                  <Campo label="Nombre completo *" error={errores.nombre}>
                    <input style={input} value={form.nombre} onChange={(e) => set("nombre", e.target.value)} autoComplete="name" />
                  </Campo>
                  <Campo label="Correo electrónico *" error={errores.email}>
                    <input style={input} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
                  </Campo>
                  <Campo label="Teléfono *" error={errores.telefono}>
                    <input style={input} type="tel" value={form.telefono} onChange={(e) => set("telefono", e.target.value)} autoComplete="tel" placeholder="+56 9 ..." />
                  </Campo>
                </div>

                {/* Método de envío */}
                <h2 style={{ ...heading, marginTop: "2rem" }}>Envío</h2>
                <div style={{ display: "flex", gap: "0.8rem", flexWrap: "wrap", marginBottom: "1.1rem" }}>
                  <OpcionEnvio activo={metodo === "domicilio"} onClick={() => setMetodo("domicilio")} titulo="A mi domicilio" detalle="Entrega en tu dirección" />
                  <OpcionEnvio activo={metodo === "sucursal"} onClick={() => setMetodo("sucursal")} titulo="Sucursal Correos de Chile" detalle="Retiras en la sucursal" />
                </div>

                {metodo === "domicilio" ? (
                  <Campo label="Dirección de envío * (calle, número, comuna, ciudad)" error={errores.direccion}>
                    <input style={input} value={form.direccion} onChange={(e) => set("direccion", e.target.value)} autoComplete="street-address" />
                  </Campo>
                ) : (
                  <Campo label="Dirección de la sucursal de Correos de Chile *" error={errores.sucursal}>
                    <input
                      style={input}
                      value={form.sucursal}
                      onChange={(e) => set("sucursal", e.target.value)}
                      placeholder="Ej: Correos Chile, Av. ... , comuna"
                    />
                  </Campo>
                )}

                <div style={{ marginTop: "1.1rem" }}>
                  <Campo label="Comentarios (opcional)">
                    <textarea
                      style={{ ...input, minHeight: 90, resize: "vertical" }}
                      value={form.comentarios}
                      onChange={(e) => set("comentarios", e.target.value)}
                      placeholder="Indicaciones de entrega, horario, etc."
                    />
                  </Campo>
                </div>

                {aviso && (
                  <p
                    style={{
                      fontFamily: "var(--font-crimson), serif",
                      fontSize: "0.9rem",
                      color: "rgba(212,196,160,0.85)",
                      background: "rgba(122,74,138,0.12)",
                      border: "1px solid rgba(122,74,138,0.32)",
                      borderRadius: 4,
                      padding: "0.8rem 1rem",
                      margin: "1.4rem 0 0",
                      lineHeight: 1.55,
                    }}
                  >
                    {aviso}
                  </p>
                )}

                <button
                  onClick={pagar}
                  disabled={!allPriced || enviando}
                  style={{
                    width: "100%",
                    marginTop: "1.6rem",
                    fontFamily: "var(--font-cinzel), serif",
                    fontSize: "0.8rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: allPriced ? "#12200f" : "rgba(212,196,160,0.6)",
                    background: allPriced ? "linear-gradient(135deg, #e8c878, #c8a050)" : "rgba(200,160,80,0.12)",
                    border: "1px solid rgba(200,160,80,0.5)",
                    borderRadius: 3,
                    padding: "1.05rem",
                    cursor: allPriced && !enviando ? "pointer" : "not-allowed",
                  }}
                >
                  {enviando ? "Redirigiendo…" : allPriced ? "Pagar con MercadoPago" : "Precios próximamente"}
                </button>

                {!allPriced && (
                  <p style={{ fontFamily: "var(--font-crimson), serif", fontStyle: "italic", fontSize: "0.85rem", color: "rgba(212,196,160,0.45)", textAlign: "center", marginTop: "0.8rem" }}>
                    El pago se activará cuando los productos tengan precio. Mientras, encarga por Instagram (@elfloema).
                  </p>
                )}
              </section>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

// ---------- helpers de UI ----------
function Campo({ label, error, children }: { label: string; error?: boolean; children: React.ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <span
        style={{
          display: "block",
          fontFamily: "var(--font-cinzel), serif",
          fontSize: "0.64rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: error ? "#d98a8a" : "rgba(212,196,160,0.7)",
          marginBottom: "0.4rem",
        }}
      >
        {label}
      </span>
      <span style={{ display: "block", outline: error ? "1px solid rgba(217,138,138,0.6)" : "none", borderRadius: 4 }}>{children}</span>
    </label>
  );
}

function OpcionEnvio({ activo, onClick, titulo, detalle }: { activo: boolean; onClick: () => void; titulo: string; detalle: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: "1 1 200px",
        textAlign: "left",
        padding: "0.85rem 1.05rem",
        borderRadius: 4,
        cursor: "pointer",
        background: activo ? "rgba(200,160,80,0.12)" : "rgba(15,26,15,0.6)",
        border: `1px solid ${activo ? "rgba(200,160,80,0.6)" : "rgba(200,160,80,0.2)"}`,
        transition: "border-color 0.25s, background 0.25s",
      }}
    >
      <span style={{ display: "block", fontFamily: "var(--font-cinzel), serif", fontSize: "0.74rem", letterSpacing: "0.06em", color: activo ? GOLD : CREAM }}>
        {activo ? "◉ " : "○ "}
        {titulo}
      </span>
      <span style={{ display: "block", fontFamily: "var(--font-crimson), serif", fontSize: "0.82rem", fontStyle: "italic", color: "rgba(212,196,160,0.5)", marginTop: "0.2rem" }}>
        {detalle}
      </span>
    </button>
  );
}

const heading: CSSProperties = {
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.8rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: GOLD,
  margin: "0 0 1rem",
  paddingBottom: "0.5rem",
  borderBottom: "1px solid rgba(200,160,80,0.16)",
};

const input: CSSProperties = {
  width: "100%",
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.95rem",
  color: CREAM,
  background: "rgba(8,13,8,0.7)",
  border: "1px solid rgba(200,160,80,0.28)",
  borderRadius: 4,
  padding: "0.7rem 0.85rem",
  outline: "none",
};

const linkBoton: CSSProperties = {
  display: "inline-block",
  fontFamily: "var(--font-cinzel), serif",
  fontSize: "0.75rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: GOLD,
  textDecoration: "none",
  border: "1px solid rgba(200,160,80,0.5)",
  padding: "0.9rem 2rem",
};

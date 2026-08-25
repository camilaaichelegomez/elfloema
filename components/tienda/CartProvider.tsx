"use client";

// Carrito de la Tienda El Floema.
// Estado global (solo bajo /tienda, via app/tienda/layout.tsx), persistido en
// localStorage. Incluye el boton flotante y el panel lateral. El pago se hace
// con MercadoPago via /api/checkout (se activa cuando exista MP_ACCESS_TOKEN y
// los productos tengan precio).

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

const GOLD = "#c8a050";
const CREAM = "#d4c4a0";
const PANEL = "#0d160d";
const PURPLE = "#7a4a8a";

export type CartItem = {
  slug: string;
  nombre: string;
  precio: number | null;
  glyph: string;
  accent: string;
  tamano?: string;
  cantidad: number;
};

type CartInput = Omit<CartItem, "cantidad">;

type CartContextValue = {
  items: CartItem[];
  add: (p: CartInput, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
  allPriced: boolean;
  hydrated: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "floema-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Cargar desde localStorage al montar.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setItems(parsed);
      }
    } catch {
      /* ignora storage corrupto */
    }
    setHydrated(true);
  }, []);

  // Guardar cuando cambian los items (despues de hidratar).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage lleno o no disponible */
    }
  }, [items, hydrated]);

  const add = useCallback((p: CartInput, qty = 1) => {
    setItems((prev) => {
      const existente = prev.find((x) => x.slug === p.slug);
      if (existente) {
        return prev.map((x) =>
          x.slug === p.slug ? { ...x, cantidad: Math.min(99, x.cantidad + qty) } : x
        );
      }
      return [...prev, { ...p, cantidad: Math.max(1, Math.min(99, qty)) }];
    });
    setOpen(true);
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((x) => x.slug !== slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((x) => x.slug !== slug)
        : prev.map((x) => (x.slug === slug ? { ...x, cantidad: Math.min(99, qty) } : x))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((s, x) => s + x.cantidad, 0);
  const total = items.reduce((s, x) => s + (x.precio ?? 0) * x.cantidad, 0);
  const allPriced = items.length > 0 && items.every((x) => x.precio != null && x.precio > 0);

  return (
    <CartContext.Provider
      value={{ items, add, remove, setQty, clear, count, total, allPriced, hydrated, open, setOpen }}
    >
      {children}
      <CartButton />
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}

// ---------- Boton flotante ----------
function CartButton() {
  const { count, open, setOpen, hydrated } = useCart();
  if (!hydrated) return null;

  return (
    <button
      aria-label="Abrir carrito"
      onClick={() => setOpen(!open)}
      style={{
        position: "fixed",
        right: "clamp(1rem, 3vw, 2rem)",
        bottom: "clamp(1rem, 3vw, 2rem)",
        zIndex: 1200,
        width: 58,
        height: 58,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #16241a, #0d160d)",
        border: `1px solid rgba(200,160,80,0.5)`,
        boxShadow: "0 10px 34px rgba(0,0,0,0.6), 0 0 22px rgba(200,160,80,0.18)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: GOLD,
      }}
    >
      <BagIcon />
      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: -4,
            right: -4,
            minWidth: 22,
            height: 22,
            padding: "0 6px",
            borderRadius: 11,
            background: PURPLE,
            color: "#fff",
            fontFamily: "var(--font-cinzel), serif",
            fontSize: "0.72rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 12px rgba(122,74,138,0.7)",
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

// ---------- Panel lateral ----------
function CartDrawer() {
  const { items, open, setOpen, remove, setQty, total, count, allPriced, clear } = useCart();
  const router = useRouter();

  // Cerrar con Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  function continuar() {
    setOpen(false);
    router.push("/tienda/checkout");
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1300,
          background: "rgba(4,8,4,0.62)",
          backdropFilter: "blur(2px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
        aria-hidden={!open}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-label="Carrito de compra"
        aria-hidden={!open}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 1400,
          height: "100dvh",
          width: "min(420px, 92vw)",
          background: PANEL,
          borderLeft: "1px solid rgba(200,160,80,0.28)",
          boxShadow: "-24px 0 60px rgba(0,0,0,0.6)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.22,0.61,0.36,1)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "var(--font-crimson), serif",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.3rem 1.5rem",
            borderBottom: "1px solid rgba(200,160,80,0.16)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-cinzel), serif",
              fontSize: "0.82rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: GOLD,
              margin: 0,
            }}
          >
            Tu carrito {count > 0 && `· ${count}`}
          </h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="Cerrar carrito"
            style={{
              background: "none",
              border: "none",
              color: CREAM,
              fontSize: "1.4rem",
              lineHeight: 1,
              cursor: "pointer",
              opacity: 0.7,
            }}
          >
            ×
          </button>
        </div>

        {/* Lista */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.25rem" }}>
          {items.length === 0 ? (
            <p
              style={{
                fontStyle: "italic",
                color: "rgba(212,196,160,0.5)",
                textAlign: "center",
                marginTop: "3rem",
                fontSize: "0.95rem",
              }}
            >
              Tu carrito está vacío.
              <br />
              Agrega productos desde la tienda. 🌿
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.slug}
                style={{
                  display: "flex",
                  gap: "0.9rem",
                  padding: "0.85rem 0",
                  borderBottom: "1px solid rgba(200,160,80,0.1)",
                }}
              >
                {/* mini glyph / accent */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    flexShrink: 0,
                    borderRadius: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    color: "rgba(200,160,80,0.55)",
                    background: `radial-gradient(ellipse at 50% 55%, ${item.accent} 0%, transparent 72%), #0f1a0f`,
                    border: "1px solid rgba(200,160,80,0.14)",
                  }}
                >
                  {item.glyph}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      fontFamily: "var(--font-cinzel), serif",
                      fontSize: "0.78rem",
                      letterSpacing: "0.04em",
                      color: CREAM,
                      margin: "0 0 0.15rem",
                    }}
                  >
                    {item.nombre}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: item.precio ? GOLD : "rgba(212,196,160,0.45)",
                      fontStyle: item.precio ? "normal" : "italic",
                      margin: "0 0 0.4rem",
                    }}
                  >
                    {item.precio
                      ? `$${item.precio.toLocaleString("es-CL")} CLP`
                      : "Precio pronto"}
                    {item.tamano ? ` · ${item.tamano}` : ""}
                  </p>

                  {/* cantidad */}
                  <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <QtyBtn label="−" onClick={() => setQty(item.slug, item.cantidad - 1)} />
                    <span
                      style={{
                        fontFamily: "var(--font-cinzel), serif",
                        fontSize: "0.85rem",
                        color: CREAM,
                        minWidth: 20,
                        textAlign: "center",
                      }}
                    >
                      {item.cantidad}
                    </span>
                    <QtyBtn label="+" onClick={() => setQty(item.slug, item.cantidad + 1)} />
                    <button
                      onClick={() => remove(item.slug)}
                      style={{
                        marginLeft: "auto",
                        background: "none",
                        border: "none",
                        color: "rgba(212,196,160,0.45)",
                        fontSize: "0.72rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                      }}
                    >
                      Quitar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: "1.1rem 1.5rem 1.5rem", borderTop: "1px solid rgba(200,160,80,0.16)" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: "0.9rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-cinzel), serif",
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "rgba(212,196,160,0.6)",
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontFamily: "var(--font-cinzel), serif",
                  fontSize: "1.2rem",
                  color: GOLD,
                }}
              >
                {allPriced ? `$${total.toLocaleString("es-CL")} CLP` : "Precios próximamente"}
              </span>
            </div>

            <button
              onClick={continuar}
              disabled={!allPriced}
              style={{
                width: "100%",
                fontFamily: "var(--font-cinzel), serif",
                fontSize: "0.76rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: allPriced ? "#12200f" : "rgba(212,196,160,0.6)",
                background: allPriced
                  ? "linear-gradient(135deg, #e8c878, #c8a050)"
                  : "rgba(200,160,80,0.12)",
                border: "1px solid rgba(200,160,80,0.5)",
                borderRadius: 3,
                padding: "0.95rem",
                cursor: allPriced ? "pointer" : "not-allowed",
                transition: "opacity 0.25s",
              }}
            >
              {allPriced ? "Continuar al pago →" : "Precios próximamente"}
            </button>

            {!allPriced && (
              <p
                style={{
                  fontSize: "0.78rem",
                  fontStyle: "italic",
                  color: "rgba(212,196,160,0.4)",
                  textAlign: "center",
                  margin: "0.7rem 0 0",
                }}
              >
                Estamos cargando los precios. Mientras, encarga por Instagram (@elfloema).
              </p>
            )}

            <button
              onClick={clear}
              style={{
                width: "100%",
                background: "none",
                border: "none",
                color: "rgba(212,196,160,0.4)",
                fontSize: "0.72rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                marginTop: "0.7rem",
              }}
            >
              Vaciar carrito
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function QtyBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={label === "+" ? "Sumar" : "Restar"}
      style={{
        width: 26,
        height: 26,
        borderRadius: 4,
        border: "1px solid rgba(200,160,80,0.35)",
        background: "rgba(200,160,80,0.06)",
        color: GOLD,
        fontSize: "1rem",
        lineHeight: 1,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {label}
    </button>
  );
}

function BagIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 8h12l-1 11a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1L6 8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M9 8V6.5a3 3 0 0 1 6 0V8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

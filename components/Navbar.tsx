"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";

/* Navegación agrupada: 5 entradas en vez de 11 sueltas.
   Los grupos con `items` abren un desplegable; el resto son enlaces directos. */
type NavItem = { href: string; label: string; hint?: string };
type NavGroup = { label: string; href?: string; items?: NavItem[] };

const NAV: NavGroup[] = [
  { label: "Inicio", href: "/" },
  { label: "Tienda", href: "/tienda" },
  {
    label: "Biblioteca",
    items: [
      { href: "/biblioteca", label: "La Biblioteca", hint: "Ciencia, cosmética y grimorio" },
      { href: "/plantas", label: "Plantas", hint: "90 plantas medicinales" },
      { href: "/recetas", label: "Recetas", hint: "Fórmulas del laboratorio" },
      { href: "/blog", label: "Blog", hint: "Bitácora de El Floema" },
    ],
  },
  {
    label: "Asesoría",
    items: [
      { href: "/agente", label: "Naturópata", hint: "Salud y bienestar" },
      { href: "/botanico", label: "Botánico", hint: "Plantas y evidencia" },
      { href: "/belleza", label: "Belleza", hint: "Rutina y tipo de piel" },
      { href: "/formulacion", label: "Formulación", hint: "Crear tus fórmulas" },
    ],
  },
  { label: "El Floema Lab", href: "/lab" },
];

function useEsHijoActivo(pathname: string) {
  return useCallback(
    (g: NavGroup) => {
      if (g.href) return g.href === "/" ? pathname === "/" : pathname.startsWith(g.href);
      return (g.items ?? []).some((i) => pathname.startsWith(i.href));
    },
    [pathname]
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false); // menú móvil
  const [abierto, setAbierto] = useState<string | null>(null); // desplegable activo
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || "/";
  const esActivo = useEsHijoActivo(pathname);
  const navRef = useRef<HTMLElement>(null);
  const cierreTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cerrar todo al cambiar de página.
  useEffect(() => {
    setOpen(false);
    setAbierto(null);
  }, [pathname]);

  // Cerrar con Escape o al hacer clic fuera.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAbierto(null);
        setOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setAbierto(null);
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const cancelarCierre = () => {
    if (cierreTimer.current) clearTimeout(cierreTimer.current);
  };
  const programarCierre = () => {
    cancelarCierre();
    cierreTimer.current = setTimeout(() => setAbierto(null), 180);
  };

  return (
    <nav className={`navbar-grimorio${scrolled ? " scrolled" : ""}`} ref={navRef}>
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo" onClick={() => setOpen(false)}>
          <img src="/logo.jpg" alt="" />
          <span className="navbar-title">El Floema</span>
        </Link>

        <button
          className="navbar-burger"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`navbar-links${open ? " open" : ""}`}>
          {NAV.map((g) => {
            const activo = esActivo(g);

            if (!g.items) {
              return (
                <li key={g.label} className="nav-item">
                  <Link
                    href={g.href!}
                    className={`nav-link${activo ? " is-active" : ""}`}
                    aria-current={activo ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {g.label}
                  </Link>
                </li>
              );
            }

            const desplegado = abierto === g.label;
            return (
              <li
                key={g.label}
                className="nav-item has-menu"
                onMouseEnter={() => {
                  cancelarCierre();
                  setAbierto(g.label);
                }}
                onMouseLeave={programarCierre}
              >
                <button
                  type="button"
                  className={`nav-link nav-trigger${activo ? " is-active" : ""}${desplegado ? " is-open" : ""}`}
                  aria-expanded={desplegado}
                  aria-haspopup="true"
                  onClick={() => setAbierto(desplegado ? null : g.label)}
                >
                  {g.label}
                  <svg className="nav-chevron" width="8" height="5" viewBox="0 0 8 5" aria-hidden="true">
                    <path d="M1 1L4 4L7 1" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                <div className={`nav-menu${desplegado ? " is-open" : ""}`} onMouseEnter={cancelarCierre} onMouseLeave={programarCierre}>
                  {g.items.map((i) => {
                    const itemActivo = pathname.startsWith(i.href);
                    return (
                      <Link
                        key={i.href}
                        href={i.href}
                        className={`nav-menu-item${itemActivo ? " is-active" : ""}`}
                        aria-current={itemActivo ? "page" : undefined}
                        onClick={() => {
                          setAbierto(null);
                          setOpen(false);
                        }}
                      >
                        <span className="nav-menu-label">{i.label}</span>
                        {i.hint && <span className="nav-menu-hint">{i.hint}</span>}
                      </Link>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

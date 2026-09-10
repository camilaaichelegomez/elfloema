"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

/* Estructura de aplicación para el Lab: barra lateral fija en escritorio y
   barra inferior en móvil (como una app nativa). Antes la navegación vivía
   dentro del contenido y se perdía al hacer scroll. */

type Seccion = { href: string; label: string; icono: ReactNode };

const I = {
  inventario: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 6.5 10 3l7 3.5v7L10 17l-7-3.5v-7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M3 6.5 10 10l7-3.5M10 10v7" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  formulas: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M8 2.5v5L4 15a1.6 1.6 0 0 0 1.4 2.4h9.2A1.6 1.6 0 0 0 16 15l-4-7.5v-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7 2.5h6M6.5 12h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  preparadas: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="5" y="7" width="10" height="10.5" rx="1.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M7.5 7V4.5h5V7M7.5 11h5M7.5 14h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  asistente: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 8.5a5 5 0 0 1 5-5h4a5 5 0 0 1 0 10H8l-4 3.5v-3.6A5 5 0 0 1 3 8.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
  tareas: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 5.5h12M4 10h12M4 14.5h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  productos: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 7h10l-.8 9.2a1.4 1.4 0 0 1-1.4 1.3H7.2a1.4 1.4 0 0 1-1.4-1.3L5 7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7.6 7V5.4a2.4 2.4 0 0 1 4.8 0V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  costos: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12.4 7.4H9.2a1.7 1.7 0 0 0 0 3.4h1.6a1.7 1.7 0 0 1 0 3.4H7.6M10 6v8.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  ),
  etiquetas: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10.6 3H16a1 1 0 0 1 1 1v5.4a1.4 1.4 0 0 1-.4 1l-6.2 6.2a1.4 1.4 0 0 1-2 0l-5-5a1.4 1.4 0 0 1 0-2l6.2-6.2a1.4 1.4 0 0 1 1-.4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="13.2" cy="6.8" r="1.1" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  ),
  catalogo: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 4.5h4.6c.9 0 1.6.7 1.6 1.6v9.4c0-.7-.6-1.3-1.3-1.3H4v-9.7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M16 4.5h-4.6c-.9 0-1.6.7-1.6 1.6v9.4c0-.7.6-1.3 1.3-1.3H16v-9.7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
};

const MAS_ICONO = (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <circle cx="4.5" cy="10" r="1.5" fill="currentColor" />
    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    <circle cx="15.5" cy="10" r="1.5" fill="currentColor" />
  </svg>
);

/* En el celular solo caben unas pocas sin apretujarse. Estas son las de uso
   diario en el taller y quedan siempre a la vista; el resto vive en «Más».
   Antes iban las 9 en una barra con scroll horizontal: las de la derecha no
   las encontraba nadie, porque en una barra inferior no se ve que se pueda
   deslizar. */
const PRINCIPALES: Seccion[] = [
  { href: "/lab/inventario", label: "Inventario", icono: I.inventario },
  { href: "/lab/formulas", label: "Fórmulas", icono: I.formulas },
  { href: "/lab/preparadas", label: "Preparadas", icono: I.preparadas },
];

const SECUNDARIAS: (Seccion & { descripcion: string })[] = [
  { href: "/lab/productos", label: "Mis productos", icono: I.productos, descripcion: "Marcar fórmulas como producto y sus etiquetas" },
  { href: "/lab/catalogo", label: "Mi catálogo", icono: I.catalogo, descripcion: "Precios, fotos y generar el catálogo" },
  { href: "/lab/etiquetas", label: "Etiquetas", icono: I.etiquetas, descripcion: "Diseñar e imprimir etiquetas de tus envases" },
  { href: "/lab/costos", label: "Costos", icono: I.costos, descripcion: "Cuánto te cuesta cada producto" },
  { href: "/lab/tareas", label: "Tareas", icono: I.tareas, descripcion: "Pendientes del taller" },
  { href: "/lab/asistente", label: "Asistente", icono: I.asistente, descripcion: "Ayuda para formular" },
];

const SECCIONES: Seccion[] = [...PRINCIPALES, ...SECUNDARIAS];

export function LabShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";
  const [masAbierto, setMasAbierto] = useState(false);

  useEffect(() => setMasAbierto(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMasAbierto(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // El login no lleva navegación: aún no hay sesión.
  if (pathname.startsWith("/lab/login")) return <>{children}</>;

  const activo = (href: string) => pathname.startsWith(href);
  const enSecundaria = SECUNDARIAS.some((s) => activo(s.href));

  return (
    <div className="lab-shell">
      <aside className="lab-sidebar">
        <Link href="/lab/inventario" className="lab-sidebar-marca">
          <img src="/logo.jpg" alt="" />
          <span>Floema Lab</span>
        </Link>

        <nav className="lab-sidebar-nav">
          {SECCIONES.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className={`lab-nav-item${activo(s.href) ? " is-active" : ""}`}
              aria-current={activo(s.href) ? "page" : undefined}
            >
              <span className="lab-nav-icono">{s.icono}</span>
              <span className="lab-nav-label">{s.label}</span>
            </Link>
          ))}
        </nav>

        <Link href="/" className="lab-nav-item lab-nav-salir">
          <span className="lab-nav-icono">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M12 6.5V4.8c0-.8-.7-1.5-1.5-1.5h-5C4.7 3.3 4 4 4 4.8v10.4c0 .8.7 1.5 1.5 1.5h5c.8 0 1.5-.7 1.5-1.5V13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M8.5 10H17m0 0-2.4-2.4M17 10l-2.4 2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="lab-nav-label">Ir al sitio</span>
        </Link>
      </aside>

      <div className="lab-contenido">{children}</div>

      {/* ── Celular: 3 fijas + «Más», sin scroll escondido ── */}
      <nav className="lab-tabbar" aria-label="Secciones del Lab">
        {PRINCIPALES.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className={`lab-tab${activo(s.href) ? " is-active" : ""}`}
            aria-current={activo(s.href) ? "page" : undefined}
          >
            <span className="lab-tab-icono">{s.icono}</span>
            <span className="lab-tab-label">{s.label}</span>
          </Link>
        ))}
        <button
          type="button"
          className={`lab-tab${masAbierto || enSecundaria ? " is-active" : ""}`}
          aria-expanded={masAbierto}
          onClick={() => setMasAbierto((v) => !v)}
        >
          <span className="lab-tab-icono">{MAS_ICONO}</span>
          <span className="lab-tab-label">Más</span>
        </button>
      </nav>

      {/* Panel «Más»: aquí se ve de una todo lo que la app sabe hacer. */}
      {masAbierto && (
        <>
          <div className="lab-mas-fondo" onClick={() => setMasAbierto(false)} aria-hidden="true" />
          <div className="lab-mas-panel" role="dialog" aria-label="Todas las secciones">
            <span className="lab-mas-asa" aria-hidden="true" />
            <p className="lab-mas-titulo">Todo lo que puedes hacer</p>

            {SECUNDARIAS.map((s) => (
              <Link key={s.href} href={s.href} className={`lab-mas-item${activo(s.href) ? " is-active" : ""}`}>
                <span className="lab-nav-icono">{s.icono}</span>
                <span>
                  <span className="lab-mas-item-label">{s.label}</span>
                  <span className="lab-mas-item-desc">{s.descripcion}</span>
                </span>
              </Link>
            ))}

            <Link href="/" className="lab-mas-item">
              <span className="lab-nav-icono">
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M12 6.5V4.8c0-.8-.7-1.5-1.5-1.5h-5C4.7 3.3 4 4 4 4.8v10.4c0 .8.7 1.5 1.5 1.5h5c.8 0 1.5-.7 1.5-1.5V13.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <path d="M8.5 10H17m0 0-2.4-2.4M17 10l-2.4 2.4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="lab-mas-item-label">Ir al sitio</span>
                <span className="lab-mas-item-desc">Volver a la web de El Floema</span>
              </span>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

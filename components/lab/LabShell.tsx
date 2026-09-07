"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  catalogo: (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 4.5h4.6c.9 0 1.6.7 1.6 1.6v9.4c0-.7-.6-1.3-1.3-1.3H4v-9.7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M16 4.5h-4.6c-.9 0-1.6.7-1.6 1.6v9.4c0-.7.6-1.3 1.3-1.3H16v-9.7Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  ),
};

const SECCIONES: Seccion[] = [
  { href: "/lab/inventario", label: "Inventario", icono: I.inventario },
  { href: "/lab/formulas", label: "Fórmulas", icono: I.formulas },
  { href: "/lab/preparadas", label: "Preparadas", icono: I.preparadas },
  { href: "/lab/productos", label: "Productos", icono: I.productos },
  { href: "/lab/catalogo", label: "Catálogo", icono: I.catalogo },
  { href: "/lab/costos", label: "Costos", icono: I.costos },
  { href: "/lab/tareas", label: "Tareas", icono: I.tareas },
  { href: "/lab/asistente", label: "Asistente", icono: I.asistente },
];

export function LabShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "";

  // El login no lleva navegación: aún no hay sesión.
  if (pathname.startsWith("/lab/login")) return <>{children}</>;

  const activo = (href: string) => pathname.startsWith(href);

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
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sena } from "@/components/florecer/senas";

/* La barra de abajo de Florecer.

   Antes, para pasar del yoga a los hábitos había que volver a la portada y
   entrar de nuevo. Con la barra se salta de una sección a otra con un toque,
   como en cualquier app del teléfono. Queda fija abajo, donde llega el
   pulgar, y deja libre la zona del gesto de inicio del iPhone. */

const PESTANAS = [
  { href: "/florecer", label: "Hoy", sena: "hoy" },
  { href: "/yoga", label: "Yoga", sena: "yoga" },
  { href: "/ritual-facial", label: "Rostro", sena: "cara" },
  { href: "/habitos", label: "Hábitos", sena: "habitos" },
  { href: "/meditacion", label: "Meditar", sena: "meditacion" },
];

export function BarraFlorecer() {
  const pathname = usePathname() || "";

  return (
    <nav aria-label="Secciones de Florecer" className="barra-florecer">
      <ul>
        {PESTANAS.map((p) => {
          const activa = pathname.startsWith(p.href);
          return (
            <li key={p.href}>
              <Link prefetch={false} href={p.href} aria-current={activa ? "page" : undefined} data-activa={activa || undefined}>
                {/* En chico, el trazo se engrosa para que no se pierda. */}
                <Sena cual={p.sena} tamano={28} grosor={3.4} />
                <span>{p.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

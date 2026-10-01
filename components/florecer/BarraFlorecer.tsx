"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sena } from "@/components/florecer/senas";

/* La barra de abajo de Florecer.

   Antes, para pasar del yoga a los hábitos había que volver a la portada y
   entrar de nuevo. Con la barra se salta de una sección a otra con un toque,
   como en cualquier app del teléfono. Queda fija abajo, donde llega el
   pulgar, y deja libre la zona del gesto de inicio del iPhone. */

/* Seis pestañas. Yoga, Fuerza e Hipopresivos van juntas en «Entrenar»: con
   una pestaña cada una la barra llegaba a ocho y los nombres ya no se
   leían. La pestaña queda encendida también dentro de cada una de las tres.
   Ciclo tiene la suya porque se usa a diario y, solo en la portada, pasaba
   desapercibido; para que quepan seis, la seña y la letra son un poco más
   chicas (globals.css). */
const PESTANAS: { href: string; label: string; sena: string; incluye?: string[] }[] = [
  { href: "/florecer", label: "Hoy", sena: "hoy" },
  { href: "/entrenar", label: "Entrenar", sena: "entrenar", incluye: ["/yoga", "/fuerza", "/hipopresivos"] },
  { href: "/ritual-facial", label: "Rostro", sena: "cara" },
  { href: "/habitos", label: "Hábitos", sena: "habitos" },
  { href: "/ciclo", label: "Ciclo", sena: "ciclo" },
  { href: "/meditacion", label: "Meditar", sena: "meditacion" },
];

export function BarraFlorecer() {
  const pathname = usePathname() || "";

  return (
    <nav aria-label="Secciones de Florecer" className="barra-florecer">
      <ul>
        {PESTANAS.map((p) => {
          const activa = [p.href, ...(p.incluye ?? [])].some((r) => pathname.startsWith(r));
          return (
            <li key={p.href}>
              <Link prefetch={false} href={p.href} aria-current={activa ? "page" : undefined} data-activa={activa || undefined}>
                {/* En chico, el trazo se engrosa para que no se pierda. */}
                <Sena cual={p.sena} tamano={25} grosor={3.6} />
                <span>{p.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

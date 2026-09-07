"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* Revela su contenido al entrar en pantalla, con un retardo escalonado.
   Usa IntersectionObserver (nada de escuchar el scroll), y se revela una
   sola vez para que no parpadee al subir y bajar. */
export function Revelar({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Retardo en ms — súbelo de a ~100 para escalonar una lista. */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Si el navegador no lo soporta, mostrar sin animación.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`revelar${visible ? " visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}

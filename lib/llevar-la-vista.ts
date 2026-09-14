/* Llevar la vista a lo que acaba de aparecer.

   El problema que resuelve: cuando un botón cambia lo que se muestra —armar la
   rutina, abrir un acordeón, empezar el modo guiado— el navegador deja el
   scroll donde estaba. Si el botón estaba abajo y el contenido nuevo empieza
   arriba, la persona se queda mirando la mitad de algo y cree que no pasó nada.

   Tres cosas que hay que hacer bien y por eso viven acá y no repetidas:
   - Descontar la barra de navegación fija, o el título queda tapado.
   - Respetar «reducir movimiento»: a quien le marea el scroll animado, salto seco.
   - Mover el foco, para que quien navega con teclado o lector de pantalla
     también quede donde corresponde y no siga en el botón que ya no existe.
*/

const ALTO_BARRA = 90; // la barra fija de arriba

type Opciones = {
  /** Píxeles a dejar libres arriba. Por defecto, el alto de la barra. */
  margen?: number;
  /** Mover el foco al destino. Por defecto sí. */
  enfocar?: boolean;
};

function prefiereQuieto() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

export function llevarLaVista(el: HTMLElement | null, opciones: Opciones = {}) {
  if (!el || typeof window === "undefined") return;

  const { margen = ALTO_BARRA, enfocar = true } = opciones;

  /* Sin requestAnimationFrame a propósito: en una pestaña oculta nunca se
     dispara y el salto no ocurriría jamás. Llamado desde un useEffect, React
     ya pintó y getBoundingClientRect fuerza el cálculo que haga falta. */
  const destino = Math.max(0, el.getBoundingClientRect().top + window.scrollY - margen);
  window.scrollTo({ top: destino, behavior: prefiereQuieto() ? "auto" : "smooth" });

  if (enfocar) {
    // preventScroll: el scroll ya lo hicimos nosotros, con el margen correcto.
    if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }
}

/** Igual, pero para un acordeón que se está abriendo: espera a que despliegue. */
export function llevarLaVistaAlAbrir(el: HTMLElement | null, msDespliegue = 400) {
  if (!el) return;
  window.setTimeout(() => llevarLaVista(el, { enfocar: false }), msDespliegue);
}

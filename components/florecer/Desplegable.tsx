import type { ReactNode } from "react";

/* La explicación de por qué cada sección está hecha así: se queda plegada y
   se abre cuando una quiere leerla. Lo primero al entrar es la práctica.

   Va con <details> del navegador, sin JavaScript: se abre igual sin internet
   y con el lector de pantalla. */

export function Desplegable({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <details className="florecer-desplegable">
      <summary>
        <span>{titulo}</span>
        <span aria-hidden className="florecer-desplegable-flecha">
          ▾
        </span>
      </summary>
      <div className="florecer-desplegable-cuerpo">{children}</div>
    </details>
  );
}

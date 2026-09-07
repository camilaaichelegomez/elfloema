/* Borrador local de una fórmula en curso.

   Crear una fórmula nueva necesita internet, porque el servidor asigna el id
   correlativo con el que después se guardan los ingredientes (inventarlo en el
   teléfono mezclaría ingredientes entre fórmulas). Para que igual no se pierda
   el trabajo hecho en el taller sin señal, lo escrito se guarda en el propio
   navegador y se recupera al volver a abrir. */

const CLAVE = "floema-borrador-formula";

export type BorradorFormula = {
  datos: unknown;
  guardadoEn: number;
};

export function guardarBorrador(datos: unknown): void {
  try {
    const b: BorradorFormula = { datos, guardadoEn: Date.now() };
    localStorage.setItem(CLAVE, JSON.stringify(b));
  } catch {
    /* almacenamiento lleno o bloqueado: no es crítico */
  }
}

export function leerBorrador(): BorradorFormula | null {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return null;
    const b = JSON.parse(crudo) as BorradorFormula;
    return b && b.datos ? b : null;
  } catch {
    return null;
  }
}

export function borrarBorrador(): void {
  try {
    localStorage.removeItem(CLAVE);
  } catch {
    /* nada que hacer */
  }
}

export function haceCuanto(ms: number): string {
  const min = Math.round((Date.now() - ms) / 60000);
  if (min < 1) return "recién";
  if (min < 60) return `hace ${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `hace ${h} h`;
  return `hace ${Math.round(h / 24)} día(s)`;
}

/* Valida una fórmula del Lab contra las bases de cosmética de la Biblioteca.

   La idea: que al formular avise si algo se sale de lo documentado — un
   tensioactivo por sobre su rango, un conservante ausente en base acuosa,
   porcentajes que no suman 100. Nunca bloquea: son avisos, porque una
   formuladora puede tener razones para salirse del rango.
*/

import { basesCosmetica, type Formula } from "@/lib/bases-cosmetica";

export type Rango = { min: number; max: number; aprox: boolean; opcional: boolean };

/** Interpreta los rangos tal como están escritos en la Biblioteca:
 *  "55–72%", "0.3–0.5%", "~72%", "0–15% opcional", "c.s." */
export function leerRango(texto: string): Rango | null {
  if (!texto) return null;
  const t = texto.trim().toLowerCase();
  if (t.startsWith("c.s")) return null; // cantidad suficiente: no se valida

  const opcional = t.includes("opcional");
  const aprox = t.includes("~");
  // Guion normal, guion largo o "a": 55-72, 55–72, 55 a 72
  const par = t.match(/(\d+(?:[.,]\d+)?)\s*[–—-]\s*(\d+(?:[.,]\d+)?)/);
  if (par) {
    const min = parseFloat(par[1].replace(",", "."));
    const max = parseFloat(par[2].replace(",", "."));
    return { min, max, aprox, opcional };
  }
  const uno = t.match(/(\d+(?:[.,]\d+)?)/);
  if (uno) {
    const v = parseFloat(uno[1].replace(",", "."));
    return { min: v, max: v, aprox, opcional };
  }
  return null;
}

/** Normaliza para comparar nombres de ingredientes (sin tildes ni plurales). */
function normalizar(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const VACIAS = new Set(["de", "del", "la", "el", "los", "las", "y", "o", "en", "vegetal", "natural"]);

function palabras(s: string): string[] {
  return normalizar(s)
    .split(" ")
    .filter((p) => p.length > 2 && !VACIAS.has(p));
}

/** Empareja el ingrediente escrito con el de la base por palabras compartidas. */
export function emparejar(nombre: string, candidatos: { name: string; range: string }[]) {
  const pn = palabras(nombre);
  if (pn.length === 0) return null;
  let mejor: { item: { name: string; range: string }; puntaje: number } | null = null;

  for (const c of candidatos) {
    const pc = palabras(c.name);
    if (pc.length === 0) continue;
    const compartidas = pn.filter((p) => pc.includes(p)).length;
    if (compartidas === 0) continue;
    const puntaje = compartidas / Math.min(pn.length, pc.length);
    if (!mejor || puntaje > mejor.puntaje) mejor = { item: c, puntaje };
  }
  // Exigir coincidencia sólida para no dar avisos equivocados.
  return mejor && mejor.puntaje >= 0.5 ? mejor.item : null;
}

export type ItemFormula = { ingrediente: string; porcentaje: number | null; gramos?: number | null };

export type Aviso = {
  nivel: "alerta" | "aviso" | "ok";
  mensaje: string;
  ingrediente?: string;
};

export function buscarBase(id: string): Formula | undefined {
  return basesCosmetica.find((b) => b.id === id);
}

export const listaBases = () => basesCosmetica.map((b) => ({ id: b.id, title: b.title }));

/** Compara la fórmula con la base elegida y devuelve avisos ordenados. */
export function validarFormula(items: ItemFormula[], baseId: string | null): Aviso[] {
  const avisos: Aviso[] = [];
  const conPct = items.filter((i) => i.porcentaje != null && !Number.isNaN(i.porcentaje));

  // 1) ¿Suman 100%?
  if (conPct.length > 0) {
    const suma = conPct.reduce((a, i) => a + (i.porcentaje as number), 0);
    const dif = Math.abs(100 - suma);
    if (dif > 0.5) {
      avisos.push({
        nivel: dif > 5 ? "alerta" : "aviso",
        mensaje: `Los porcentajes suman ${suma.toFixed(2)}% (faltan o sobran ${dif.toFixed(2)}).`,
      });
    } else {
      avisos.push({ nivel: "ok", mensaje: `Los porcentajes suman ${suma.toFixed(2)}%.` });
    }
  }

  const base = baseId ? buscarBase(baseId) : undefined;
  if (!base) return avisos;

  // Todos los ingredientes documentados de esa base, con su categoría.
  const catalogo = base.categories.flatMap((c) =>
    c.items.map((i) => ({ ...i, categoria: c.title }))
  );

  // 2) Cada ingrediente dentro de su rango documentado.
  for (const it of items) {
    if (it.porcentaje == null || Number.isNaN(it.porcentaje)) continue;
    const ref = emparejar(it.ingrediente, catalogo);
    if (!ref) continue;
    const rango = leerRango(ref.range);
    if (!rango) continue;

    const v = it.porcentaje;
    const margen = rango.aprox ? Math.max(1, rango.max * 0.15) : 0;
    if (v < rango.min - margen || v > rango.max + margen) {
      avisos.push({
        nivel: "aviso",
        ingrediente: it.ingrediente,
        mensaje: `${it.ingrediente}: ${v}% queda fuera del rango de la Biblioteca (${ref.range}) para «${base.title}».`,
      });
    }
  }

  // 3) Conservante obligatorio en bases con agua.
  const exigeConservante = /obligatorio/i.test(base.preservative);
  if (exigeConservante) {
    const hay = items.some((i) =>
      /conservante|cosgard|geogard|benzyl|sorbato|leucidal|phenoxyethanol/i.test(normalizar(i.ingrediente))
    );
    if (!hay) {
      avisos.push({
        nivel: "alerta",
        mensaje: `«${base.title}» lleva agua: el conservante es obligatorio (${base.preservative}) y no aparece en la fórmula.`,
      });
    }
  }

  // 4) Recordatorio de pH.
  if (base.ph && base.ph.trim()) {
    avisos.push({ nivel: "ok", mensaje: `pH objetivo según la Biblioteca: ${base.ph}.` });
  }

  const orden = { alerta: 0, aviso: 1, ok: 2 } as const;
  return avisos.sort((a, b) => orden[a.nivel] - orden[b.nivel]);
}

import { readFileSync } from "node:fs";
import { join } from "node:path";

/* Lee prompts-fuerza.md y lo convierte en una lista.

   El documento sigue siendo la única fuente: si mañana cambio un prompt ahí,
   la página de los dibujos cambia sola. Escribir los 48 prompts otra vez en
   TypeScript habría sido pedir que un día los dos se contradigan.

   Se lee al construir el sitio, no en cada visita: la página queda estática. */

export type PromptDibujo = {
  grupo: string;
  /** Nombre del archivo, sin extensión: el que hay que copiar. */
  archivo: string;
  nombre: string;
  prompt: string;
};

export function leerPrompts(): PromptDibujo[] {
  let texto: string;
  try {
    texto = readFileSync(join(process.cwd(), "prompts-fuerza.md"), "utf8");
  } catch {
    // Si el documento no está, la página se muestra vacía en vez de romperse.
    return [];
  }

  const salida: PromptDibujo[] = [];
  let grupo = "";
  /* Git puede dejar el archivo con saltos de linea de Windows. Sin
     normalizarlos, cada linea termina en retorno de carro y no calza
     ninguna de las expresiones de abajo. */
  const lineas = texto.replace(/\r\n/g, "\n").split("\n");

  for (let i = 0; i < lineas.length; i++) {
    const l = lineas[i];

    const enGrupo = /^## (.+)$/.exec(l);
    if (enGrupo) {
      grupo = enGrupo[1].trim();
      continue;
    }

    // ### `flexion_pared.webp` — Flexión en la pared
    const enTitulo = /^### `([a-z0-9_]+)\.webp`(?:\s+—\s+(.*))?$/.exec(l);
    if (!enTitulo) continue;

    // El prompt es el primer bloque de código que venga después.
    let j = i + 1;
    while (j < lineas.length && lineas[j].trim() !== "```") j++;
    if (j >= lineas.length) continue;
    const cuerpo: string[] = [];
    for (j = j + 1; j < lineas.length && lineas[j].trim() !== "```"; j++) {
      cuerpo.push(lineas[j]);
    }

    salida.push({
      grupo,
      archivo: enTitulo[1],
      nombre: (enTitulo[2] ?? enTitulo[1]).trim(),
      prompt: cuerpo.join("\n").trim(),
    });
  }

  return salida;
}

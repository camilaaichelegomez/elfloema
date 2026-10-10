// Convierte salida/ingredientes.json en archivos SQL listos para pegar en el
// SQL Editor de Supabase (salida/sql/ingredientes-1.sql, -2.sql, ...).
// Cada archivo se puede ejecutar más de una vez: ignora los INCI que ya existen.
//
// Uso:  node catalogo-ingredientes/build.mjs && node catalogo-ingredientes/sql.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const aqui = path.dirname(fileURLToPath(import.meta.url));
const filas = JSON.parse(fs.readFileSync(path.join(aqui, "salida", "ingredientes.json"), "utf8"));
const dirSalida = path.join(aqui, "salida", "sql");
fs.rmSync(dirSalida, { recursive: true, force: true });
fs.mkdirSync(dirSalida, { recursive: true });

const q = (v) => (v == null || v === "" ? "null" : `'${String(v).replace(/'/g, "''")}'`);
const arr = (a) => (a.length ? `array[${a.map((x) => q(x)).join(", ")}]::text[]` : "'{}'::text[]");

const PREAMBULO = `-- Catálogo de ingredientes de El Floema (borrador por verificar).
-- Es seguro ejecutarlo más de una vez: los INCI que ya existen se ignoran.

create extension if not exists pg_trgm;

alter table public.ingredientes
  add column if not exists categoria text,
  add column if not exists precauciones text,
  add column if not exists parte_usada text,
  add column if not exists verificado boolean not null default false;

create index if not exists ingredientes_categoria_idx on public.ingredientes (categoria);
`;

const COLS = "inci, nombre_es, funciones, restriccion, rango_uso, que_es, origen, fuente, categoria, precauciones, parte_usada, verificado";
const POR_ARCHIVO = 170;
const n = Math.ceil(filas.length / POR_ARCHIVO);

for (let i = 0; i < n; i++) {
  const trozo = filas.slice(i * POR_ARCHIVO, (i + 1) * POR_ARCHIVO);
  const valores = trozo
    .map(
      (f) =>
        `  (${q(f.inci)}, ${q(f.nombre_es)}, ${arr(f.funciones)}, ${q(f.restriccion)}, ${q(f.rango_uso)}, ${q(f.que_es)}, 'floema', ${q(f.fuente)}, ${q(f.categoria)}, ${q(f.precauciones)}, ${q(f.parte_usada)}, false)`
    )
    .join(",\n");
  const sql = `${i === 0 ? PREAMBULO + "\n" : `-- Parte ${i + 1} de ${n}\n\n`}insert into public.ingredientes (${COLS}) values\n${valores}\non conflict ((lower(inci))) do nothing;\n`;
  fs.writeFileSync(path.join(dirSalida, `ingredientes-${i + 1}.sql`), sql, "utf8");
  console.log(`ingredientes-${i + 1}.sql: ${trozo.length} filas, ${(sql.length / 1024).toFixed(0)} KB`);
}

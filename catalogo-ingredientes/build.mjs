// Arma el catálogo de ingredientes a partir de los archivos de texto de ./datos
// y de las fichas de plantas de lib/plantas-data.ts. Valida y escribe:
//   salida/ingredientes.csv   → se importa en Supabase (Table Editor → Import)
//   salida/ingredientes.json  → copia para usar en la app
//   salida/reporte.txt        → conteos y avisos
//
// Formato de cada línea de datos (separador "|"):
//   INCI | Nombre en español | Función;Función | Qué es | Rango de uso | Precauciones | Restricción legal
// Las líneas que empiezan con # y las vacías se ignoran. Los tres últimos campos son opcionales.
//
// Uso:  node catalogo-ingredientes/build.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const aqui = path.dirname(fileURLToPath(import.meta.url));
const salida = path.join(aqui, "salida");
fs.mkdirSync(salida, { recursive: true });

const FUNCIONES = new Set([
  "Emoliente", "Humectante", "Oclusivo", "Emulsionante", "Coemulsionante", "Tensioactivo limpiador", "Espumante",
  "Espesante", "Gelificante", "Estructurante", "Conservante", "Antioxidante", "Quelante", "Regulador de pH",
  "Astringente", "Calmante", "Antiinflamatorio", "Cicatrizante", "Exfoliante", "Queratolítico", "Acondicionador capilar",
  "Acondicionador de piel", "Fragancia", "Colorante", "Pigmento", "Absorbente", "Matificante", "Filtro UV",
  "Formador de película", "Antimicrobiano", "Despigmentante", "Reafirmante", "Seborregulador", "Vitamina",
  "Disolvente", "Solubilizante", "Vehículo", "Nutritivo", "Regenerador", "Descongestionante", "Tonificante",
  "Desodorante", "Abrasivo suave", "Agente de carga", "Lubricante", "Refrescante", "Estimulante", "Suspensor",
  "Potenciador de conservante", "Mineral", "Protector", "Aclarante", "Antiedad", "Fortalecedor capilar",
  "Estabilizante", "Antiestático", "Prebiótico", "Antiséptico", "Antipruriginoso", "Antifúngico", "Tintura capilar", "Brillo",
]);

const CATEGORIAS = {
  "aceites": "Aceites vegetales",
  "mantecas-ceras": "Mantecas, ceras y emolientes",
  "emulsionantes": "Emulsionantes",
  "tensioactivos": "Tensioactivos y limpiadores",
  "espesantes": "Espesantes y gelificantes",
  "humectantes": "Humectantes e hidratantes",
  "activos": "Activos cosméticos",
  "conservantes": "Conservantes, antioxidantes y pH",
  "esenciales": "Aceites esenciales",
  "hidrolatos": "Hidrolatos y aguas",
  "minerales": "Arcillas, minerales y pigmentos",
  "botanicos-extra": "Extractos botánicos",
  "otros": "Otros ingredientes",
};

const avisos = [];
const filas = [];
const vistos = new Map();

function agregar(f, origenArchivo) {
  const clave = f.inci.trim().toLowerCase();
  if (!f.inci.trim()) return avisos.push(`${origenArchivo}: fila sin INCI`);
  if (vistos.has(clave)) return avisos.push(`DUPLICADO "${f.inci}" en ${origenArchivo} (ya estaba en ${vistos.get(clave)})`);
  vistos.set(clave, origenArchivo);
  for (const fn of f.funciones) if (!FUNCIONES.has(fn)) avisos.push(`función desconocida "${fn}" en ${f.inci}`);
  if (!f.nombre_es) avisos.push(`sin nombre en español: ${f.inci}`);
  if (!f.que_es || f.que_es.length < 20) avisos.push(`descripción muy corta: ${f.inci}`);
  filas.push(f);
}

// 1) Archivos de texto por categoría
for (const archivo of fs.readdirSync(path.join(aqui, "datos")).sort()) {
  if (!archivo.endsWith(".txt") || archivo === "plantas.txt") continue;
  const clave = archivo.replace(/\.txt$/, "");
  const categoria = CATEGORIAS[clave];
  if (!categoria) {
    avisos.push(`archivo sin categoría definida: ${archivo}`);
    continue;
  }
  const lineas = fs.readFileSync(path.join(aqui, "datos", archivo), "utf8").split(/\r?\n/);
  lineas.forEach((l, i) => {
    if (!l.trim() || l.trim().startsWith("#")) return;
    const p = l.split("|").map((x) => x.trim());
    if (p.length < 4) return avisos.push(`${archivo}:${i + 1} tiene menos de 4 campos`);
    agregar(
      {
        inci: p[0],
        nombre_es: p[1],
        funciones: (p[2] || "").split(";").map((x) => x.trim()).filter(Boolean),
        que_es: p[3],
        rango_uso: p[4] || "",
        precauciones: p[5] || "",
        restriccion: p[6] || "",
        categoria,
        parte_usada: "",
        fuente: "Referencia general de formulación; borrador por verificar con la ficha del proveedor y la biblioteca",
      },
      `${archivo}:${i + 1}`
    );
  });
}

// 2) Plantas: lib/plantas-data.ts + datos/plantas.txt (INCI y parte usada)
const ts = fs.readFileSync(path.join(aqui, "..", "lib", "plantas-data.ts"), "utf8");
const bloques = ts.split(/\n\s*slug: "/).slice(1);
const plantas = new Map();
for (const b of bloques) {
  const slug = b.slice(0, b.indexOf('"'));
  const nombre = (b.match(/nombre: "([^"]+)"/) || [])[1];
  const cient = (b.match(/nombreCientifico: "([^"]+)"/) || [])[1];
  const familia = (b.match(/familia: "([^"]+)"/) || [])[1];
  const lista = (clave) => {
    const m = b.match(new RegExp(clave + ": \\[([\\s\\S]*?)\\],\\s*\\n"));
    return m ? [...m[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => x[1]) : [];
  };
  plantas.set(slug, { nombre, cient, familia, usos: lista("usosCosmeticos"), contra: lista("contraindicaciones") });
}
const lineasPlantas = fs.readFileSync(path.join(aqui, "datos", "plantas.txt"), "utf8").split(/\r?\n/);
const usadas = new Set();
lineasPlantas.forEach((l, i) => {
  if (!l.trim() || l.trim().startsWith("#")) return;
  const p = l.split("|").map((x) => x.trim());
  const [slug, inci, parte, funcionesTxt, extra] = p;
  const pl = plantas.get(slug);
  if (!pl) return avisos.push(`plantas.txt:${i + 1}: no existe la planta "${slug}" en plantas-data.ts`);
  usadas.add(slug);
  const usos = pl.usos.length ? ` Usos cosméticos tradicionales: ${pl.usos.slice(0, 3).join("; ")}.` : "";
  const precauciones = [...pl.contra, extra].filter(Boolean).join(" · ");
  agregar(
    {
      inci,
      nombre_es: pl.nombre,
      funciones: (funcionesTxt || "").split(";").map((x) => x.trim()).filter(Boolean),
      que_es: `${pl.cient} (${pl.familia}). Parte usada: ${parte}.${usos} Lo que se atribuye a la planta viene del uso tradicional; revisa su ficha para ver qué dicen los estudios.`,
      rango_uso: "",
      precauciones,
      restriccion: "",
      categoria: "Extractos botánicos",
      parte_usada: parte,
      fuente: "Ficha de planta de El Floema (lib/plantas-data.ts); borrador por verificar con la biblioteca científica",
    },
    `plantas.txt:${i + 1}`
  );
});
for (const slug of plantas.keys()) if (!usadas.has(slug)) avisos.push(`planta sin fila en plantas.txt: ${slug}`);

// 3) Salida
const comillas = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
const arreglo = (a) => `"{${a.map((x) => `""${x.replace(/"/g, "")}""`).join(",")}}"`;
const columnas = ["inci", "nombre_es", "nombre_en", "cas", "ec", "funciones", "restriccion", "rango_uso", "que_es", "evidencia", "origen", "fuente", "categoria", "precauciones", "parte_usada", "verificado"];
const csv = [columnas.join(",")];
for (const f of filas) {
  csv.push(
    [
      comillas(f.inci), comillas(f.nombre_es), "", "", "", arreglo(f.funciones), comillas(f.restriccion), comillas(f.rango_uso),
      comillas(f.que_es), "", "floema", comillas(f.fuente), comillas(f.categoria), comillas(f.precauciones), comillas(f.parte_usada), "false",
    ].join(",")
  );
}
fs.writeFileSync(path.join(salida, "ingredientes.csv"), csv.join("\n"), "utf8");
fs.writeFileSync(path.join(salida, "ingredientes.json"), JSON.stringify(filas, null, 1), "utf8");

const porCat = {};
for (const f of filas) porCat[f.categoria] = (porCat[f.categoria] || 0) + 1;
const reporte = [
  `Ingredientes: ${filas.length}`,
  ...Object.entries(porCat).map(([k, v]) => `  ${k}: ${v}`),
  `Con rango de uso: ${filas.filter((f) => f.rango_uso).length}`,
  `Con precauciones: ${filas.filter((f) => f.precauciones).length}`,
  `Avisos: ${avisos.length}`,
  ...avisos.map((a) => "  - " + a),
].join("\n");
fs.writeFileSync(path.join(salida, "reporte.txt"), reporte, "utf8");
console.log(reporte);

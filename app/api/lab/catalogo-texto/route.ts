import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

// Genera los textos de tienda de un producto (descripción, ciencia molecular,
// INCI, beneficios, modo de uso, "qué esperar") a partir de su fórmula y de la
// biblioteca de formulación (RAG). Los prompts de foto/ficha se arman con
// plantilla on-brand a partir de esos textos.

interface CienciaCard {
  titulo: string;
  texto: string;
}
interface ComoActua {
  escena: string;
  rotulos: string[];
  leyenda: string;
}
interface Generado {
  descripcion: string;
  descripcionLarga: string;
  beneficios: string[];
  ciencia: CienciaCard[];
  ingredientes: string;
  modoUso: string;
  resultado: string;
  comoActua?: ComoActua;
}

function extraerJson(texto: string): Generado | null {
  const ini = texto.indexOf("{");
  const fin = texto.lastIndexOf("}");
  if (ini === -1 || fin === -1 || fin <= ini) return null;
  try {
    return JSON.parse(texto.slice(ini, fin + 1)) as Generado;
  } catch {
    return null;
  }
}

function promptImagen(nombre: string, categoria: string): string {
  return `A partir de la FOTO REAL del producto que se entrega, mejora SOLO el fondo y la ambientacion. NO modifiques el producto: conserva exactamente el envase, su forma, tapa, color, la etiqueta y el contenido tal como estan en la foto. Reemplaza unicamente el fondo por una escena botanica y mistica de cosmetica natural artesanal: plantas nativas, hojas y elementos naturales acordes a un ${categoria.toLowerCase()}, sobre madera oscura o piedra humeda, con luz calida dorada lateral y fondo de bosque verde oscuro difuminado, tonos verdes profundos, dorados y tierra. Manten la iluminacion y las sombras coherentes con el producto real. No anadas ningun texto ni marca de agua. (Producto: ${nombre}).`;
}

// Ilustracion "como actua" (bioquimica): misma plantilla visual on-brand que
// usan Calma/Ilumina/Purifica/Mate, con la escena y los rotulos que redacta
// la IA (verificados con la biblioteca, igual que la ciencia).
function promptComoActua(c: ComoActua): { prompt: string; leyenda: string } {
  const rotulos = c.rotulos.slice(0, 4).map((r) => `'${r}'`).join(", ");
  const prompt = `Ilustracion cientifica estilo lamina antigua de botanica, tinta y acuarela sobre fondo verde muy oscuro, con tonos dorado, sepia y verde apagado. Muestra ${c.escena}. IMPORTANTE: incluir rotulos de texto en ESPANOL con letra serif clara y ortografia correcta, con finas lineas guia. Rotula exactamente: ${rotulos}. Estetica mistica y cientifica de cosmetica natural, sin ningun otro texto ni marca de agua.`;
  return { prompt, leyenda: c.leyenda };
}

function promptFicha(g: Generado, nombre: string, piel: string): string {
  const comoActua = g.ciencia.map((c) => `${c.titulo}: ${c.texto}`).join(" ").slice(0, 500);
  const props = g.beneficios.slice(0, 3).join(". ");
  return `Poster vertical estilo ficha de producto de El Floema, cosmetica botanica, formato retrato. Fondo de madera oscura con vetas, tonos negro, verde profundo, marron y dorado. Marco ornamental dorado art nouveau alrededor de todo el borde, con volutas botanicas en las esquinas y lunas doradas arriba. Arriba al centro el emblema de El Floema (frasco pocion con raices doradas). En el centro, la foto real del envase dentro de un ovalo dorado. Alrededor, ilustraciones botanicas coloreadas estilo grabado cientifico, simetricas, con lineas doradas finas que conectan cada ingrediente con su recuadro. Distribuye recuadros ornamentados dorados con el siguiente texto, en espanol con ORTOGRAFIA PERFECTA y tipografia serif dorada elegante, muy legible y ordenado. TITULO: '${nombre.toUpperCase()}'. Recuadro COMO ACTUA: '${comoActua}'. Recuadro PROPIEDADES: '${props}'. Recuadro MODO DE USO: '${g.modoUso}'. Recuadro PARA: '${piel || "Todo tipo de piel"}'. Recuadro RESULTADO: '${g.resultado}'. Escribe EXACTAMENTE ese texto, sin inventar ni deformar palabras. Estetica mistica y cientifica, iluminacion calida dorada, composicion equilibrada y muy ordenada, alta calidad.`;
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "API key de Groq no configurada." }, { status: 500 });

  const body = await request.json().catch(() => null);
  const nombre: string = (body?.nombre ?? "").toString().slice(0, 200);
  const categoria: string = (body?.categoria ?? "").toString().slice(0, 120);
  const piel: string = (body?.piel ?? "").toString().slice(0, 120);
  if (!nombre.trim()) return NextResponse.json({ error: "Falta el nombre del producto." }, { status: 400 });

  // Fórmula que calce por nombre (para conocer los ingredientes reales).
  const { data: formulas } = await supabase
    .from("formulas")
    .select("id, nombre, descripcion, formula_items(ingrediente, porcentaje)")
    .ilike("nombre", nombre)
    .is("deleted_at", null)
    .limit(1);
  const formula = formulas?.[0] as
    | { descripcion: string | null; formula_items: { ingrediente: string; porcentaje: number | null }[] | null }
    | undefined;
  const ingredientesFormula = (formula?.formula_items ?? [])
    .map((i) => `${i.ingrediente}${i.porcentaje != null ? ` ${i.porcentaje}%` : ""}`)
    .join(", ");

  // RAG biblioteca: busca por el nombre + los ingredientes.
  const consulta = `${nombre} ${ingredientesFormula}`.slice(0, 400);
  let biblioteca = "";
  try {
    const { data: chunks } = await supabase
      .from("biblioteca")
      .select("fuente, texto")
      .textSearch("tsv", consulta, { type: "websearch", config: "spanish" })
      .limit(6);
    if (chunks && chunks.length > 0) {
      biblioteca = chunks.map((c) => `- [${c.fuente}] ${c.texto}`).join("\n").slice(0, 6000);
    }
  } catch {
    /* sin biblioteca */
  }

  const system = `Eres la redactora de El Floema, cosmetica botanica artesanal, estilo "bruja cientifica": ciencia real + seduccion. Redacta los textos de tienda de un producto.
REGLAS ESTRICTAS:
- La ciencia debe ser REAL y basarse en los extractos de la biblioteca de abajo. No inventes propiedades. Los claims de tradicion dilos como "se le atribuye", nunca como hecho.
- Describe SOLO el producto y sus propiedades. No compares con otras formulas ni digas "simple".
- Espanol, cercano y elegante.
Responde UNICAMENTE un JSON valido con esta forma exacta (sin texto fuera del JSON):
{"descripcion":"1 frase","descripcionLarga":"1 parrafo","beneficios":["4 vinetas"],"ciencia":[{"titulo":"molecula/ingrediente","texto":"como actua (mecanismo real)"}],"ingredientes":"INCI en una linea","modoUso":"1-2 frases","resultado":"que esperar, 1 frase","comoActua":{"escena":"describe en 1-2 frases, en español y en tercera persona, la escena molecular/biologica que ilustraria el mecanismo principal (ej. 'una seccion de piel reactiva calmandose: la centella asiatica estimula a los fibroblastos a producir colageno mientras la cafeina activa la microcirculacion')","rotulos":["3 a 4 palabras o frases cortas para rotular la ilustracion, ej. 'centella asiatica', 'colageno nuevo'"],"leyenda":"1 frase corta que resuma la escena, para mostrar como pie de foto"}}
- "ciencia": 3 a 5 tarjetas.
- "comoActua": describe SOLO el mecanismo real de 1-2 ingredientes destacados de la ciencia de arriba, coherente con la biblioteca. Si el producto no tiene un mecanismo biologico ilustrable (por ejemplo una vela), omite "comoActua" del JSON.`;

  const userMsg = `PRODUCTO: ${nombre}${categoria ? ` (categoria: ${categoria})` : ""}${piel ? ` — piel: ${piel}` : ""}
${formula?.descripcion ? `Descripcion de la formula: ${formula.descripcion}` : ""}
INGREDIENTES DE LA FORMULA: ${ingredientesFormula || "(no encontrada; usa el nombre para inferir)"}

EXTRACTOS DE LA BIBLIOTECA (unica fuente para la ciencia):
${biblioteca || "(sin coincidencias; se prudente y no inventes mecanismos)"}`;

  try {
    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: system },
        { role: "user", content: userMsg },
      ],
      ...({ reasoning_effort: "low" } as Record<string, unknown>),
    });
    const reply = completion.choices[0]?.message?.content ?? "";
    const g = extraerJson(reply);
    if (!g) return NextResponse.json({ error: "La IA no devolvió un formato válido. Intenta de nuevo." }, { status: 502 });

    return NextResponse.json({
      descripcion: g.descripcion ?? "",
      descripcionLarga: g.descripcionLarga ?? "",
      beneficios: Array.isArray(g.beneficios) ? g.beneficios : [],
      ciencia: Array.isArray(g.ciencia) ? g.ciencia : [],
      ingredientes: g.ingredientes ?? "",
      modoUso: g.modoUso ?? "",
      resultado: g.resultado ?? "",
      imagenPrompt: promptImagen(nombre, categoria || "producto"),
      fichaPrompt: promptFicha(g, nombre, piel),
      bioquimica: g.comoActua ? promptComoActua(g.comoActua) : null,
    });
  } catch (error) {
    console.error("[lab/catalogo-texto] groq", error);
    return NextResponse.json({ error: "No pude generar los textos ahora. Intenta de nuevo." }, { status: 502 });
  }
}

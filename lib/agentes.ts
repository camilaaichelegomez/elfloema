import Groq from "groq-sdk";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

/* Las bibliotecas tienen RLS puesto, así que la llave pública no las puede
   leer —por eso parecían vacías cuando las consulté desde afuera—. Se leen
   desde el servidor con la llave secreta, que nunca sale de Vercel. Es solo
   lectura de material propio: papers con autor, año y DOI. */
function admin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/* Los cuatro agentes públicos de la página: Naturópata, Botánico, Belleza y
   Formulación.

   Antes vivían en un servidor aparte (el-floema-agente.onrender.com) que
   pensaba con Gemini. Google dejó de dar acceso por API sin facturación
   habilitada, y Camila no pudo activarla: los cuatro agentes quedaron
   devolviendo «403 BILLING_DISABLED» a cualquiera que entrara. Encima el
   código de ese servidor ya no coincidía con el de esta carpeta, asi que
   tampoco se podia arreglar desde acá.

   Ahora viven acá dentro y piensan con Groq, el mismo que mueve el asistente
   del Lab desde hace meses sin problemas. Se gana en que no hay servidor
   aparte que se caiga ni cuenta de Google que exija tarjeta, y en que el
   código de lo que corre es el que se ve.

   Lo que se perdió, dicho sin vueltas: el servidor viejo buscaba en la
   biblioteca por significado (convertía la pregunta en números con un modelo
   de embeddings). Eso necesita correr un modelo de machine learning, y en
   Vercel no se puede. Acá se busca por palabras, con el buscador de texto en
   español de Postgres — el mismo método que usa el Lab. Encuentra menos
   cuando la pregunta usa sinónimos, pero encuentra, no cuesta nada y no
   depende de nadie. */

const MODELO = "openai/gpt-oss-120b";

/* El pedazo que llevan los cuatro: de qué marca son y qué no se inventa. */
const BASE = `Eres parte de El Floema, una marca chilena de cosmética botánica artesanal de La Unión, Región de Los Ríos. Hablas español de Chile, cálido y culto, como alguien que sabe mucho y explica con gusto.

Reglas que no se rompen:
- Toda afirmación sobre cómo actúa algo tiene que ser real. Si no lo sabes con certeza, dilo.
- NO inventes datos que suenen a ficha técnica. En concreto, no des NINGUNO de estos salvo que aparezca en las REFERENCIAS que te pasan más abajo: nombres de compuestos o principios activos, porcentajes, ni nombres científicos en latín. Son justo los datos que suenan expertos y arruinan la confianza cuando están mal. Sin referencias, habla de la planta por su nombre común, de su uso y de sus efectos descritos, y si te preguntan por su composición di con franqueza que preferís no afirmarlo de memoria.
- Lo que viene de la tradición se nombra como tradición: «se le atribuye», «la herbolaria mapuche lo usa para», nunca como hecho comprobado.
- No eres médica ni reemplazas a una. Ante algo que suene a problema de salud, además de responder, recomienda consultar.
- Respuestas conversacionales, de 2 a 4 párrafos. Emojis con mucha moderación.`;

export type Agente = "naturopata" | "botanico" | "belleza" | "formulacion";

export const PERSONALIDADES: Record<Agente, { nombre: string; sistema: string; conCatalogo: boolean }> = {
  naturopata: {
    nombre: "Naturópata",
    conCatalogo: false,
    sistema: `${BASE}

Eres guía de medicina integrativa y botánica. Tu misión es EDUCAR: no solo decir qué hacer, sino explicar el PORQUÉ detrás de cada cosa, para que la persona entienda su cuerpo y decida informada.

Sabes de fitoterapia, Ayurveda, Medicina Tradicional China, plantas medicinales, y de cómo se sostienen los hábitos. Cuando una molestia puede tener varias causas, lo dices en vez de atribuirla a una sola.`,
  },

  botanico: {
    nombre: "Botánico",
    conCatalogo: false,
    sistema: `${BASE}

Eres el botánico de El Floema. Identificas plantas, explicas sus compuestos y cómo se preparan: tinturas, hidrolatos, macerados, destilación, glicerito, solventes, aceites esenciales.

Te apoyas en las plantas nativas del sur de Chile (laurel, triwe/laurelia, arrayán, matico, maqui, nalca, pitra) sin limitarte a ellas. Cuando hables de un compuesto, nombra de qué parte de la planta sale y con qué método se extrae.`,
  },

  belleza: {
    nombre: "Belleza",
    conCatalogo: true,
    sistema: `${BASE}

Eres la asesora de belleza de El Floema. Armas rutinas de día y de noche según el tipo de piel, y sabes de cuidado capilar botánico, yoga facial, drenaje linfático, gua sha y masaje facial.

Sé específica y práctica: ingredientes reales, proporciones aproximadas, técnicas concretas. Recomienda productos de El Floema cuando de verdad calcen con lo que la persona pide — es tu propia marca, no seas tímida. Usa SOLO los del catálogo de más abajo, con su nombre exacto y su link. Si ninguno calza, dilo con honestidad en vez de forzar una recomendación.`,
  },

  formulacion: {
    nombre: "Formulación",
    conCatalogo: false,
    sistema: `${BASE}

Eres el asesor de formulación de El Floema. Ayudas a quien quiera entender o armar una fórmula de cosmética natural: fases, emulsiones, serums, tónicos, mascarillas, jabones, bálsamos.

Trabajas en porcentajes y explicas qué hace cada ingrediente en la fórmula, no solo cuánto va. Tres cosas que nombras siempre que corresponda, porque son las que arruinan una fórmula casera: el conservante (sin él, cualquier cosa con agua se contamina), el pH, y el orden de las fases.`,
  },
};

/* ── La biblioteca de cada agente ─────────────────────────────────────────
   Cada agente tiene su propia tabla de papers, con título, autores, año,
   revista, DOI y un extracto. Eso es lo que hacía buenos a los agentes: no
   opinan, citan.

   El servidor viejo buscaba por significado, con embeddings. Eso necesita
   correr un modelo que en Vercel no corre, así que acá se busca por palabras:
   se sacan las palabras con contenido de la pregunta y se buscan en el título,
   el extracto y la planta. Encuentra menos cuando la pregunta usa sinónimos,
   pero lo que encuentra es real y viene con su cita. */

const TABLA: Record<Agente, string> = {
  naturopata: "articulos_botanicos",
  botanico: "articulos_botanicos",
  belleza: "articulos_belleza",
  formulacion: "articulos_formulacion",
};

/* Palabras que no sirven para buscar porque aparecen en cualquier pregunta. */
const VACIAS = new Set(
  (
    "que cual como cuando donde por para con sin una unos unas los las del de la el en y o a " +
    "es son ser esta estan tiene tienen puedo puede sirve sirven me te se lo le su sus mi mis " +
    "sobre entre hasta desde muy mas menos tambien pero si no hay hacer uso usar sobre bueno"
  ).split(" ")
);

function palabrasClave(pregunta: string): string[] {
  return [
    ...new Set(
      pregunta
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 3 && !VACIAS.has(w))
    ),
  ].slice(0, 5);
}

type Paper = {
  title: string | null;
  authors: string | null;
  year: number | null;
  journal: string | null;
  doi: string | null;
  snippet: string | null;
};

/* Busca en tres tandas, de la más certera a la más vaga, y se queda con las
   primeras seis sin repetir.

   El orden importa y se descubrió mirando los resultados: los papers están en
   inglés, pero `plant_key` está en español. Entonces «matico» encuentra por
   planta justo los papers de Piper aduncum —los correctos—, mientras que una
   palabra como «heridas» aparece suelta en el extracto de cualquier paper. Si
   se busca todo junto en una sola tanda, esos papers de relleno empujan afuera
   a los buenos. Por planta primero, entonces; el extracto solo para rellenar
   si quedó espacio. */
type ClienteSupabase = { from: (t: string) => any }; // eslint-disable-line @typescript-eslint/no-explicit-any

async function buscarPorRelevancia(
  db: ClienteSupabase,
  tabla: string,
  palabras: string[]
): Promise<Paper[]> {
  const COLUMNAS = "title, authors, year, journal, doi, snippet";
  const tandas = [
    palabras.map((w) => `plant_key.ilike.%${w}%`), //  la planta: lo más certero
    palabras.map((w) => `title.ilike.%${w}%`), //      el título: bastante bueno
    palabras.map((w) => `snippet.ilike.%${w}%`), //    el extracto: relleno
  ];

  const elegidos: Paper[] = [];
  const vistos = new Set<string>();

  for (const tanda of tandas) {
    if (elegidos.length >= 6) break;
    const { data } = await db.from(tabla).select(COLUMNAS).or(tanda.join(",")).limit(6);
    for (const p of (data ?? []) as Paper[]) {
      const clave = (p.doi ?? p.title ?? "").trim().toLowerCase();
      if (!clave || vistos.has(clave)) continue;
      vistos.add(clave);
      elegidos.push(p);
      if (elegidos.length >= 6) break;
    }
  }
  return elegidos;
}

/* Qué papers encuentra una pregunta. Está aparte de `biblioteca()` para poder
   mirarlo desde fuera sin mandarle nada al modelo: afinar una búsqueda a ciegas
   es adivinar, y ya perdimos tiempo así una vez. */
export async function papelesQueCalzan(
  cual: Agente,
  pregunta: string
): Promise<{ tabla: string; palabras: string[]; cuantos: number; titulos: string[]; causa?: string }> {
  const palabras = palabrasClave(pregunta);
  const db = admin();
  if (!db) {
    return { tabla: TABLA[cual], palabras, cuantos: 0, titulos: [], causa: "Falta SUPABASE_SECRET_KEY: sin ella no se pueden leer las bibliotecas." };
  }
  if (palabras.length === 0) {
    return { tabla: TABLA[cual], palabras, cuantos: 0, titulos: [], causa: "La pregunta no dejó ninguna palabra con la que buscar." };
  }
  try {
    const data = await buscarPorRelevancia(db, TABLA[cual], palabras);
    return {
      tabla: TABLA[cual],
      palabras,
      cuantos: data.length,
      titulos: data.map((d) => d.title ?? "(sin título)"),
    };
  } catch (e) {
    return { tabla: TABLA[cual], palabras, cuantos: 0, titulos: [], causa: String(e) };
  }
}

async function biblioteca(cual: Agente, pregunta: string): Promise<string> {
  const db = admin();
  if (!db) return "";

  const palabras = palabrasClave(pregunta);
  if (palabras.length === 0) return "";

  try {
    const data = await buscarPorRelevancia(db, TABLA[cual], palabras);
    if (data.length === 0) return "";

    const refs = (data as Paper[]).map((a, i) => {
      const primerAutor = a.authors ? a.authors.split(/[,;]/)[0].trim() : "";
      const cita = [primerAutor, a.year, a.journal].filter(Boolean).join(", ");
      const doi = a.doi ? ` · doi:${a.doi}` : "";
      return `[${i + 1}] ${a.title ?? "(sin título)"}${cita ? ` — ${cita}` : ""}${doi}\n    ${(a.snippet ?? "").slice(0, 700)}`;
    });

    return (
      "\n\nPAPERS DE LA BIBLIOTECA DE EL FLOEMA. Esto es lo único que puedes afirmar como ciencia.\n" +
      "- Vienen en inglés: explicá lo que dicen en español, con tus palabras.\n" +
      "- Cuando uses uno, citalo con [1], [2] etc. en el texto, y al cerrar nombrá autor y año.\n" +
      "- Puede que algunos no tengan nada que ver con la pregunta: ignorá esos, no los fuerces.\n" +
      "- Si NINGUNO responde lo que te preguntan, decilo con franqueza («no tengo un estudio en mi " +
      "biblioteca sobre eso»). Nunca inventes un estudio ni digas «un estudio reciente» sin tenerlo acá:\n" +
      refs.join("\n")
    );
  } catch {
    return "";
  }
}

/* ── El catálogo ───────────────────────────────────────────────────────────
   Solo para Belleza, que es la que recomienda productos. Se lee de la tabla
   real para que nunca ofrezca algo que no existe o que esté oculto. */
async function catalogo(): Promise<string> {
  try {
    const { data } = await supabase
      .from("productos")
      .select("slug, nombre, categoria, descripcion, piel, precio")
      .eq("oculto", false)
      .order("categoria", { ascending: true })
      .order("nombre", { ascending: true });
    if (!data || data.length === 0) {
      return "\n\nCATÁLOGO: no disponible ahora. No recomiendes productos puntuales; habla en general.";
    }
    const lineas = data.map((p) => {
      const precio = p.precio ? ` · $${Number(p.precio).toLocaleString("es-CL")} CLP` : "";
      const piel = p.piel ? ` · para: ${p.piel}` : "";
      return `- ${p.nombre} (${p.categoria ?? "producto"}): ${p.descripcion ?? ""}${piel}${precio} — elfloema.cl/tienda/${p.slug}`;
    });
    return `\n\nCATÁLOGO REAL DE LA TIENDA (lo único que puedes recomendar; no menciones nada que no esté acá):\n${lineas.join("\n")}`;
  } catch {
    return "\n\nCATÁLOGO: no disponible ahora. No recomiendes productos puntuales; habla en general.";
  }
}

export type Turno = { user: string; assistant: string };

/* Responde una pregunta. Nunca lanza: devuelve el texto o un aviso en
   castellano, porque del otro lado hay una persona esperando y un error en
   inglés no le sirve de nada. */
export async function responder(
  cual: Agente,
  pregunta: string,
  historial: Turno[]
): Promise<{ response: string }> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return { response: "El asistente no está configurado todavía. Falta GROQ_API_KEY." };
  }

  const p = PERSONALIDADES[cual];
  const [refs, cat] = await Promise.all([
    biblioteca(cual, pregunta),
    p.conCatalogo ? catalogo() : "",
  ]);

  /* Solo los últimos turnos: la conversación entera encarece y despista. */
  const recientes = historial.slice(-6);

  const mensajes: Groq.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: p.sistema + cat + refs },
    ...recientes.flatMap((t) => [
      { role: "user" as const, content: t.user },
      { role: "assistant" as const, content: t.assistant },
    ]),
    { role: "user", content: pregunta },
  ];

  try {
    const groq = new Groq({ apiKey });
    const r = await groq.chat.completions.create({
      model: MODELO,
      messages: mensajes,
      ...({ reasoning_effort: "low" } as Record<string, unknown>),
    });
    const texto = r.choices[0]?.message?.content?.trim();
    if (!texto) return { response: "No me salió una respuesta esta vez. ¿Lo intentamos de nuevo?" };
    return { response: texto };
  } catch (e) {
    console.error(`[agente ${cual}]`, e);
    return { response: "Hubo un problema al pensar la respuesta. Intenta de nuevo en un momento." };
  }
}

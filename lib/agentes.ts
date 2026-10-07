import Groq from "groq-sdk";
import { supabase } from "@/lib/supabase";

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

/* ── La biblioteca ─────────────────────────────────────────────────────────
   Busca por palabras en la tabla `biblioteca`. Si la tabla no existe o no hay
   nada que calce, el agente responde igual, solo sin referencias. */
async function biblioteca(pregunta: string): Promise<string> {
  try {
    const { data } = await supabase
      .from("biblioteca")
      .select("fuente, texto")
      .textSearch("tsv", pregunta.slice(0, 400), { type: "websearch", config: "spanish" })
      .limit(5);
    if (!data || data.length === 0) return "";
    return (
      "\n\nREFERENCIAS DE LA BIBLIOTECA (fuente confiable: basa en esto lo que afirmes; " +
      'no inventes propiedades que no aparezcan acá. Los claims de tradición dilos como "se le atribuye"):\n' +
      data.map((f) => `- [${f.fuente}] ${f.texto}`).join("\n")
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
  const [refs, cat] = await Promise.all([biblioteca(pregunta), p.conCatalogo ? catalogo() : ""]);

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

import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { createClient as crearClienteAdmin } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase-server";
import { resumenBases } from "@/lib/bases-cosmetica";

interface MensajeChat {
  role: "user" | "model";
  content: string;
}

function construirContextoInventario(
  items: Array<{ ingrediente: string; cantidad: number; unidad: string; costo_unitario: number | null }>
): string {
  if (items.length === 0) {
    return "La usuaria todavía no tiene ingredientes cargados en su inventario.";
  }
  return items
    .map((it) => {
      const costo = it.costo_unitario !== null ? `, costo unitario ~$${Math.round(it.costo_unitario)} CLP/${it.unidad}` : "";
      return `- ${it.ingrediente}: ${it.cantidad} ${it.unidad} disponibles${costo}`;
    })
    .join("\n");
}

function construirSystemInstruction(contextoInventario: string, contextoBiblioteca: string): string {
  return `Eres el asistente de formulación del Lab de El Floema, una marca de cosmética natural artesanal. Ayudas a la formuladora a diseñar y ajustar fórmulas de cosmética natural.

Este es el inventario actual de la usuaria:
${contextoInventario}
${contextoBiblioteca ? `\n${contextoBiblioteca}\n` : ""}
BASES DE COSMÉTICA DE LA BIBLIOTECA (rangos de referencia obligatorios):
${resumenBases()}

Instrucciones:
- CÍÑETE A LOS RANGOS DE ESAS BASES. Son la referencia de la marca: no inventes porcentajes ni los estires "a ojo".
- Si por alguna razón necesitas salirte de un rango, dilo de forma explícita y explica por qué; nunca lo hagas en silencio.
- En cualquier base con agua, el conservante es OBLIGATORIO: jamás propongas una fórmula acuosa sin él, e indica su porcentaje.
- Los porcentajes de una fórmula deben sumar 100%. Revísalo antes de responder.
- Respeta el pH objetivo de la base e indica con qué se ajusta.
- Prioriza usar ingredientes que ya están en el inventario de arriba, para que no tenga que comprar de más.
- Si la fórmula necesita un ingrediente que no está en el inventario, dilo explícitamente.
- CUANDO USES LA BIBLIOTECA, NÓMBRALA. Escribe de dónde sale el dato así: «(según [nombre de la fuente])». Decir «según la bibliografía» sin nombrarla no sirve de nada: la formuladora no puede ir a comprobarlo.
- NO des de memoria la composición (INCI), el rango de pH ni la compatibilidad de un conservante o ingrediente comercial concreto. Esos datos suenan precisos y son los que más se equivocan. Si no están en la biblioteca ni en las bases de arriba, dilo: «no tengo la ficha de ese ingrediente en la biblioteca, conviene revisar la del proveedor». Es mejor eso que un dato inventado que después arruina una fórmula entera.
- Responde siempre en español, de forma cercana y profesional, sin inventar propiedades cosméticas que no sean razonables.
- Cuando la usuaria pida explícitamente guardar, finalizar o confirmar una fórmula, agrega al final de tu respuesta (después de tu explicación normal) un bloque de código con el lenguaje "formula" que contenga ÚNICAMENTE un JSON válido con este formato exacto:
\`\`\`formula
{"nombre": "string", "categoria": "string o null", "descripcion": "string o null", "ph_objetivo": "string o null", "rinde_gramos": number o null, "unidades": number o null, "pasos": "string o null", "items": [{"ingrediente": "string", "gramos": number, "porcentaje": number o null, "fase": "string o null"}]}
\`\`\`
- "pasos" es el procedimiento de elaboración paso a paso (no solo las cantidades), como un solo texto con cada paso en una línea numerada (ej. "1. Fundir la fase oleosa...\\n2. Agregar la fase acuosa...").
- No incluyas ese bloque "formula" en mensajes normales de conversación, solo cuando corresponda guardar una fórmula.`;
}

/* El cliente que sí puede leer la biblioteca: tiene RLS puesto, así que la
   llave pública no la ve. */
function clienteBiblioteca() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secreta = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secreta) return null;
  return crearClienteAdmin(url, secreta, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/* Con ?probar=<consulta> dice qué encuentra la búsqueda en la biblioteca, sin
   preguntarle nada al modelo.

   Va acá dentro y no en una ruta pública porque la biblioteca de formulación
   es material propio de Camila. Pide su sesión del Lab, igual que el chat.

   Existe porque este asistente estuvo meses respondiendo sin biblioteca y
   nadie lo notó: el error se tragaba en silencio. Ahora se puede mirar. */
export async function GET(request: NextRequest) {
  const sesion = await createClient();
  const {
    data: { user },
  } = await sesion.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const consulta = new URL(request.url).searchParams.get("probar");
  if (!consulta) {
    return NextResponse.json({ como: "Agregá ?probar=tu+consulta para ver qué trae la biblioteca." });
  }

  const db = clienteBiblioteca();
  if (!db) {
    return NextResponse.json({ ok: false, causa: "Falta SUPABASE_SECRET_KEY: sin ella no se puede leer la biblioteca." });
  }

  const { data, error, count } = await db
    .from("biblioteca")
    .select("fuente, texto", { count: "exact" })
    .textSearch("tsv", consulta.slice(0, 400), { type: "websearch", config: "spanish" })
    .limit(5);

  if (error) return NextResponse.json({ ok: false, causa: error.message });

  return NextResponse.json({
    ok: true,
    consulta,
    calzan_en_total: count ?? null,
    devueltos: data?.length ?? 0,
    fuentes: (data ?? []).map((f) => ({
      fuente: (f as { fuente: string }).fuente,
      inicio: (f as { texto: string }).texto.slice(0, 160),
    })),
  });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const mensajes: MensajeChat[] | undefined = body?.messages;

  if (!mensajes || !Array.isArray(mensajes) || mensajes.length === 0) {
    return NextResponse.json({ error: "Falta el mensaje." }, { status: 400 });
  }

  // Limita tamaño y forma de la conversación para no quemar cuota de Gemini con payloads anómalos.
  const MAX_MENSAJES = 40;
  const MAX_LARGO_MENSAJE = 6_000;
  const mensajesValidos = mensajes.every(
    (m) =>
      m &&
      typeof m === "object" &&
      (m.role === "user" || m.role === "model") &&
      typeof m.content === "string" &&
      m.content.length <= MAX_LARGO_MENSAJE
  );
  if (!mensajesValidos || mensajes.length > MAX_MENSAJES || mensajes[mensajes.length - 1].role !== "user") {
    return NextResponse.json({ error: "La conversación es demasiado larga o tiene un formato inválido." }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key de Groq no configurada." }, { status: 500 });
  }

  const { data: inventario } = await supabase
    .from("inventario_con_costo")
    .select("ingrediente, cantidad, unidad, costo_unitario")
    .order("ingrediente", { ascending: true });

  const contextoInventario = construirContextoInventario(inventario ?? []);

  // RAG: recupera fragmentos relevantes de la biblioteca de formulación (búsqueda
  // de texto en español). Si la tabla `biblioteca` aún no existe, sigue sin ella.
  const consulta = mensajes[mensajes.length - 1].content.slice(0, 400);
  let contextoBiblioteca = "";
  try {
    /* La tabla `biblioteca` tiene RLS puesto, así que la llave pública no la
       puede leer: este asistente estuvo meses respondiendo sin ella sin que se
       notara, porque el catch de abajo se traga el caso silenciosamente. Se
       lee con la llave de servidor, que nunca sale de Vercel. */
    const db = clienteBiblioteca() ?? supabase;

    const { data: fuentes } = await db
      .from("biblioteca")
      .select("fuente, texto")
      .textSearch("tsv", consulta, { type: "websearch", config: "spanish" })
      .limit(5);
    if (fuentes && fuentes.length > 0) {
      contextoBiblioteca =
        "Referencias de la biblioteca de formulación (fuente confiable — basa la ciencia y las proporciones en esto; no inventes propiedades que no aparezcan aquí o que no sean razonables. Los claims de tradición dilos como \"se le atribuye\"):\n" +
        fuentes.map((f) => `- [${f.fuente}] ${f.texto}`).join("\n");
    }
  } catch {
    // La tabla `biblioteca` todavía no existe: el asistente responde sin ella.
  }

  const systemInstruction = construirSystemInstruction(contextoInventario, contextoBiblioteca);

  const groqMensajes: Groq.Chat.ChatCompletionMessageParam[] = [
    { role: "system", content: systemInstruction },
    ...mensajes.map((m) => ({
      role: (m.role === "model" ? "assistant" : "user") as "assistant" | "user",
      content: m.content,
    })),
  ];

  try {
    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: groqMensajes,
      ...({ reasoning_effort: "low" } as Record<string, unknown>),
    });
    const reply = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[lab/asistente] groq", error);
    return NextResponse.json({ error: "No pude responder en este momento. Intenta de nuevo." }, { status: 502 });
  }
}

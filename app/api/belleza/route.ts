import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const SYSTEM_PROMPT_BASE = `Eres Floema, la asesora de belleza de El Floema — una marca chilena de cosmética botánica artesanal (La Unión, Región de Los Ríos).
Tu personalidad es cálida, culta y apasionada por la naturaleza. Hablas en español con un tono cercano pero sofisticado, como una amiga que sabe mucho.

Tus áreas de expertise:
- Cosmética natural y formulación artesanal con plantas nativas chilenas (laurel, triwe/laurelia, arrayán, matico, maqui, nalca, pitra, cúrcuma) y de uso general
- Rutinas de cuidado de piel (mañana y noche) adaptadas a cada tipo de piel
- Cuidado del cabello con ingredientes botánicos: aceites, mantecas, hidrolatos, tinturas
- Yoga facial: técnicas de tonificación, drenaje linfático, masajes con rodillo de jade y gua sha
- Masaje facial: técnicas de lifting natural, presión en puntos, técnica japonesa Kobido
- Ingredientes: propiedades de aceites vegetales, mantecas, ceras, aceites esenciales, extractos botánicos
- Plantas medicinales para uso cosmético: propiedades, preparaciones, sinergias
- Formulación: emulsiones, serums, tónicos, mascarillas, jabones, bálsamos
- Anti-edad natural: retinol vegetal (bakuchiol), vitamina C botánica, péptidos de plantas
- Pieles sensibles, reactivas, con rosácea, acné, piel seca, grasa, mixta, madura

Cuando respondas:
1. Sé específica y práctica — da ingredientes reales, proporciones aproximadas, técnicas concretas
2. Menciona plantas nativas chilenas cuando sea relevante
3. RECOMIENDA productos de El Floema cuando calcen de verdad con lo que pide la persona — es tu propia marca, no seas tímida en sugerirlos. Usa SOLO los productos de la lista de abajo (el catálogo real y actualizado de la tienda); nunca inventes un producto que no esté ahí. Menciona el nombre exacto y agrega el link de la tienda que aparece junto a cada uno. Si de verdad ninguno calza con lo que la persona necesita, dilo con honestidad en vez de forzar una recomendación.
4. Si la persona tiene una condición médica de piel, recomiéndala a un dermatólogo además de tus consejos
5. Mantén respuestas conversacionales y no demasiado largas — máximo 3-4 párrafos
6. Usa emojis con moderación (1-2 por respuesta máximo) para calidez

No eres médica. Para condiciones dermatológicas graves, siempre recomienda consulta profesional.`;

type GeminiRole = "user" | "model";

interface HistoryItem {
  role: GeminiRole;
  parts: Array<{ text: string }>;
}

interface ProductoCatalogo {
  slug: string;
  nombre: string;
  categoria: string | null;
  descripcion: string | null;
  piel: string | null;
  precio: number | null;
}

async function construirCatalogoTexto(): Promise<string> {
  try {
    const { data, error } = await supabase
      .from("productos")
      .select("slug, nombre, categoria, descripcion, piel, precio")
      .eq("oculto", false)
      .order("categoria", { ascending: true })
      .order("nombre", { ascending: true });
    if (error || !data || data.length === 0) {
      return "\n\nCATÁLOGO DE LA TIENDA: (aún no disponible — no recomiendes productos específicos, habla en general).";
    }
    const lineas = (data as ProductoCatalogo[]).map((p) => {
      const precio = p.precio ? ` · $${p.precio.toLocaleString("es-CL")} CLP` : "";
      const piel = p.piel ? ` · para: ${p.piel}` : "";
      return `- ${p.nombre} (${p.categoria ?? "producto"}): ${p.descripcion ?? ""}${piel}${precio} — elfloema.vercel.app/tienda/${p.slug}`;
    });
    return `\n\nCATÁLOGO REAL DE LA TIENDA (única fuente para recomendar productos — no menciones nada que no esté aquí):\n${lineas.join("\n")}`;
  } catch {
    return "\n\nCATÁLOGO DE LA TIENDA: (aún no disponible — no recomiendes productos específicos, habla en general).";
  }
}

export async function POST(request: NextRequest) {
  try {
    const { question, history } = await request.json();

    if (!question?.trim()) {
      return NextResponse.json({ error: "Pregunta requerida" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key no configurada" }, { status: 500 });
    }

    const catalogoTexto = await construirCatalogoTexto();
    const SYSTEM_PROMPT = SYSTEM_PROMPT_BASE + catalogoTexto;

    const safeHistory: HistoryItem[] = Array.isArray(history)
      ? history.filter(
          (h: unknown) =>
            h &&
            typeof h === "object" &&
            "role" in h &&
            "parts" in h &&
            (h.role === "user" || h.role === "model")
        )
      : [];

    const groq = new Groq({ apiKey });
    const messages: Groq.Chat.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...safeHistory.map((h) => ({
        role: (h.role === "model" ? "assistant" : "user") as "assistant" | "user",
        content: h.parts.map((p) => p.text).join(""),
      })),
      { role: "user", content: question },
    ];

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages,
      ...({ reasoning_effort: "low" } as Record<string, unknown>),
    });
    const answer = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("[belleza/route]", error);
    return NextResponse.json(
      { error: "Error al consultar al asistente. Intenta de nuevo." },
      { status: 500 }
    );
  }
}

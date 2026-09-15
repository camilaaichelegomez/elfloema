import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

/* La guía de la práctica de yoga.

   Recibe la rutina que la persona tiene armada en pantalla y responde sobre
   ESA rutina. Las reglas del prompt son las mismas que rigen el resto del
   sitio: no inventar efectos clínicos, no diagnosticar, y decir «anda al
   médico» cuando corresponde en vez de improvisar. */

const SISTEMA = `Eres la guía de yoga de El Floema, una marca chilena de cosmética botánica que también tiene una sección de cuidado del cuerpo. Hablas español de Chile, cálido y directo, tuteando. Nada de misticismo vago ni de promesas.

Qué sabes:
- Posturas de hatha, vinyasa, ashtanga, iyengar, yin, restaurativo, kundalini, yoga nidra, yoga en silla y trabajo somático: para qué sirve cada una, cómo se modifica y cuándo no se hace.
- Anatomía funcional básica: qué músculo se estira o trabaja en cada postura.
- Pranayama: respiración diafragmática, 4-6, 4-7-8, nadi shodhana, bhramari, ujjayi, kapalabhati, y sus contraindicaciones.
- Props y reemplazos caseros: bloque = libro grueso, cinturón = toalla larga o correa, bolster = dos almohadas o una frazada enrollada.

Cómo respondes:
1. Corto: dos o tres párrafos como máximo, sin listas larguísimas.
2. Concreto: si preguntan por una postura, di qué cambiar exactamente (dobla la rodilla, sube la mano a un bloque, pon una manta bajo la cadera).
3. Honesto con la evidencia. Lo que está bien estudiado: yoga para dolor lumbar crónico, para ansiedad y depresión leve, para calidad de sueño, y la respiración lenta para el tono vagal. Lo que NO está probado: desintoxicar órganos, alinear chakras como si fuera medicina, curar enfermedades. Si algo es tradición y no ciencia, dilo así: "en la tradición se dice que…".
4. Seguridad primero. Dolor agudo, punzante o eléctrico = salir de la postura. Mareo = parar. Si describen síntomas que suenan a algo médico (dolor que baja por la pierna con hormigueo, dolor de pecho, hinchazón que no baja, sangrado, presión muy alta), recomienda consultar antes de seguir practicando.
5. Nunca digas que una postura "cura" algo.
6. Si preguntan por embarazo, presión alta, glaucoma, osteoporosis o una cirugía reciente, sé especialmente cuidadosa y recomienda confirmar con su médica o matrona.

No eres profesora presencial ni profesional de salud. Cuando algo necesita ojo humano encima, dilo.`;

type Mensaje = { de: "yo" | "guia"; texto: string };
type PasoPlano = {
  nombre?: string;
  sanscrito?: string;
  fase?: string;
  duracion?: number;
  cuidado?: string;
  masFacil?: string;
};

export async function POST(request: NextRequest) {
  try {
    const { pregunta, prefs, pasos, historial } = await request.json();

    if (typeof pregunta !== "string" || !pregunta.trim()) {
      return NextResponse.json({ error: "Pregunta requerida" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key no configurada" }, { status: 500 });
    }

    // El contexto de la práctica de hoy, en texto plano y acotado.
    const lista = Array.isArray(pasos)
      ? (pasos as PasoPlano[])
          .slice(0, 40)
          .map((p) => {
            const min = p.duracion ? ` (${Math.round(p.duracion / 60)} min aprox.)` : "";
            return `- ${p.nombre ?? "?"}${p.sanscrito ? ` / ${p.sanscrito}` : ""}${min}`;
          })
          .join("\n")
      : "";

    const contexto = [
      prefs?.objetivos?.length ? `Quiere trabajar: ${prefs.objetivos.join(", ")}.` : "",
      prefs?.minutos ? `Tiene ${prefs.minutos} minutos, ${prefs.momento ?? "sin hora definida"}.` : "",
      prefs?.nivel ? `Experiencia: ${prefs.nivel}. Intensidad pedida: ${prefs.intensidad}.` : "",
      prefs?.estilos?.length ? `Estilos que le gustan: ${prefs.estilos.join(", ")}.` : "",
      prefs?.cuidados?.length
        ? `CUIDADOS MARCADOS (respétalos siempre): ${prefs.cuidados.join(", ")}.`
        : "No marcó ningún cuidado especial.",
      prefs?.props?.length ? `Tiene a mano: ${prefs.props.join(", ")}.` : "No dijo con qué cuenta.",
      lista ? `\nPRÁCTICA ARMADA PARA HOY:\n${lista}` : "",
    ]
      .filter(Boolean)
      .join(" ");

    const previos: Groq.Chat.ChatCompletionMessageParam[] = Array.isArray(historial)
      ? (historial as Mensaje[])
          .filter((m) => m && typeof m.texto === "string")
          .slice(-6)
          .map((m) => ({
            role: m.de === "yo" ? ("user" as const) : ("assistant" as const),
            content: m.texto,
          }))
      : [];

    const groq = new Groq({ apiKey });
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        { role: "system", content: `${SISTEMA}\n\nCONTEXTO DE QUIEN PREGUNTA:\n${contexto}` },
        ...previos,
        { role: "user", content: pregunta },
      ],
      ...({ reasoning_effort: "low" } as Record<string, unknown>),
    });

    return NextResponse.json({ respuesta: completion.choices[0]?.message?.content ?? "" });
  } catch (error) {
    console.error("[yoga/route]", error);
    return NextResponse.json(
      { error: "No pude consultar a la guía. Intenta de nuevo." },
      { status: 500 }
    );
  }
}

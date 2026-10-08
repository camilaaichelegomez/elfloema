import { NextResponse } from "next/server";
import {
  PERSONALIDADES,
  papelesQueCalzan,
  responder,
  type Agente,
  type Turno,
} from "@/lib/agentes";

/* Una sola ruta para los cuatro agentes: /api/agentes/naturopata, /botanico,
   /belleza y /formulacion.

   Respeta el mismo contrato que tenía el servidor de Render —recibe
   { question, history } y devuelve { response }— para que las páginas solo
   tuvieran que cambiar la dirección a la que preguntan, nada más. */

export const maxDuration = 60;

function esAgente(x: string): x is Agente {
  return x in PERSONALIDADES;
}

/* Con ?probar=<pregunta> dice qué papers encontraría esa búsqueda, sin
   preguntarle nada al modelo. Devuelve títulos de papers propios, que no son
   secretos, y nunca el contenido de ninguna llave. Sirve para afinar la
   búsqueda mirando en vez de adivinando. */
export async function GET(req: Request, { params }: { params: Promise<{ cual: string }> }) {
  const { cual } = await params;
  if (!esAgente(cual)) {
    return NextResponse.json({ error: "Ese asistente no existe." }, { status: 404 });
  }
  const pregunta = new URL(req.url).searchParams.get("probar");
  if (!pregunta) {
    return NextResponse.json({
      agente: PERSONALIDADES[cual].nombre,
      como: "Agregá ?probar=tu+pregunta para ver qué papers encontraría.",
    });
  }
  return NextResponse.json(await papelesQueCalzan(cual, pregunta.slice(0, 400)));
}

export async function POST(req: Request, { params }: { params: Promise<{ cual: string }> }) {
  const { cual } = await params;
  if (!esAgente(cual)) {
    return NextResponse.json({ error: "Ese asistente no existe." }, { status: 404 });
  }

  const cuerpo = (await req.json().catch(() => ({}))) as {
    question?: string;
    history?: unknown;
  };

  const pregunta = (cuerpo.question ?? "").trim();
  if (!pregunta) {
    return NextResponse.json({ error: "Falta la pregunta." }, { status: 400 });
  }

  /* El historial viene del navegador, así que se filtra: solo turnos con las
     dos partes y en texto. */
  const historial: Turno[] = Array.isArray(cuerpo.history)
    ? cuerpo.history
        .filter(
          (t): t is Turno =>
            !!t &&
            typeof t === "object" &&
            typeof (t as Turno).user === "string" &&
            typeof (t as Turno).assistant === "string"
        )
        .map((t) => ({ user: t.user.slice(0, 4000), assistant: t.assistant.slice(0, 4000) }))
    : [];

  return NextResponse.json(await responder(cual, pregunta.slice(0, 4000), historial));
}

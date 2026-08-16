import Groq from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

const MODELO = "llama-3.3-70b-versatile";

const SYSTEM_INSTRUCTION = `Eres, a la vez, COPYWRITER experto en cosmética y COSMETÓLOGA formuladora de El Floema, una marca chilena de cosmética natural artesanal. Escribes textos que combinan rigor (conoces la función real de cada ingrediente cosmético) con seducción (dan ganas de usar el producto).

Dado el nombre de un producto y su lista de ingredientes, redactas los textos de su ficha.

PASO 0 — FILTRO. Antes de escribir decide si es un COSMÉTICO TÓPICO (se aplica sobre el cuerpo: piel, cabello, labios, uñas). Una vela, difusor, ambientador, jabón de lavar ropa, alimento, o cualquier cosa que NO se aplica sobre el cuerpo NO es cosmético tópico. Si no lo es: es_cosmetico_topico=false y deja modo_uso, advertencias, descripcion_catalogo y descripcion_redes en "".

CÓMO ESCRIBIR (lo más importante — los textos deben ser RICOS, específicos y deseables, NUNCA genéricos):

De cada ingrediente relevante conoces DOS funciones y debes usar ambas:
- Función EN LA PIEL: el beneficio para quien lo usa (hidrata, calma, regula el sebo, ilumina, empareja el tono, repara la barrera, antioxidante, suaviza, etc.).
- Función EN LA FÓRMULA: su rol técnico (tensioactivo suave, humectante, emoliente, emulsionante, base acuosa/hidrolato, conservante, espesante, regulador de pH, etc.).

PROHIBIDO: adjetivos vacíos sin sustento ("increíble", "mágico", "el mejor"), frases de relleno, listar ingredientes sin explicar para qué sirven, repetir la misma idea con otras palabras, sonar a infomercial.
OBLIGADO: lenguaje sensorial y concreto (textura, sensación en la piel, aroma, cómo queda la piel después), beneficios creíbles y específicos.

CAMPOS:
- "tipo_producto": qué es realmente, en pocas palabras (ej. "syndet facial líquido", "crema de manos", "sérum capilar").
- "modo_uso": 2-4 oraciones prácticas y específicas al tipo de producto (no genéricas). Solo si es cosmético tópico.
- "advertencias": seguridad estándar de cosmética natural (uso externo, evitar contacto con los ojos, mantener fuera del alcance de niños, suspender si hay irritación), ajustadas según los ingredientes. Solo si es cosmético tópico.
- "descripcion_catalogo": para la tienda/catálogo, 6-9 oraciones, así:
   1) Abre con la transformación o el momento de uso: qué resuelve, qué se siente.
   2) Describe la experiencia sensorial (textura, aroma, cómo queda la piel).
   3) Incluye un bloque que empiece con "Ingredientes y para qué sirven:" y liste los 3-5 ingredientes clave, cada uno con su función EN LA PIEL y EN LA FÓRMULA, en frases cortas (ej. "Hidrolato de triwe — calma y aporta frescor; en la fórmula es la base acuosa aromática.").
   4) Cierra dejando claro para quién es ideal y una invitación cálida a usarlo.
- "descripcion_redes": Instagram, 3-4 oraciones: gancho potente en la primera frase (una emoción, un resultado, una pregunta), 2-3 ingredientes estrella con su beneficio para la piel, y un cierre que dé ganas de probarlo. Sin hashtags ni emojis.

HONESTIDAD: persuasivo NO es exagerado. Basa cada afirmación en lo que es razonable esperar de estos ingredientes. Nada de promesas médicas ni falsas ("borra arrugas", "cura", "elimina"). En un producto de enjuague, los activos y el hidrolato aportan de forma suave — dilo con matices, no exageres.

EJEMPLO del NIVEL esperado (NO copies el contenido, copia el nivel de detalle):
POBRE: "Crema hidratante natural con ingredientes de calidad que nutre tu piel y la deja suave. Ideal para todo tipo de piel."
EXCELENTE: "Se funde al primer toque y deja la piel flexible, sin película grasa, con un aroma herbal tenue que se disipa en segundos. Ingredientes y para qué sirven: Manteca de karité — nutre y refuerza la barrera cutánea; en la fórmula aporta cuerpo y untuosidad. Niacinamida — regula el brillo y empareja el tono; además estabiliza la textura. Glicerina — atrae agua a la piel y evita la tirantez. Ideal para pieles que amanecen tirantes y buscan confort real, no solo una capa que se siente encima."

Responde ÚNICAMENTE con un JSON válido, sin texto adicional, con este formato exacto:
{"es_cosmetico_topico": boolean, "tipo_producto": "string", "modo_uso": "string", "advertencias": "string", "descripcion_catalogo": "string", "descripcion_redes": "string"}`;

// Glosario de referencia: función real de cada ingrediente (EN LA PIEL / EN LA FÓRMULA).
// Se inyecta al prompt para que el modelo NO invente y conecte cada ingrediente con su
// acción verdadera, sobre todo en activos e ingredientes botánicos/nativos.
const GLOSARIO_INGREDIENTES = `GLOSARIO DE INGREDIENTES — usa esto para explicar cómo actúa cada ingrediente. Si un ingrediente del producto está aquí, respeta su función; si NO está y no la conoces con certeza, no inventes: menciónalo sin atribuirle un beneficio dudoso.

TENSIOACTIVOS (limpian): SCI / Sodium Cocoyl Isethionate — deriva de aminoácidos y coco; limpia con espuma cremosa sin resecar ni dañar la barrera. Coco-Glucoside / Glucósido de coco — tensioactivo azucarado del coco, ultra suave, apto para piel sensible. Cocamidopropyl Betaine / Betaína de coco — co-tensioactivo suave; da cuerpo y acondiciona. SLSA / SCS — tensioactivos de coco para más espuma en sólidos.
HUMECTANTES / HIDRATANTES: Glicerina — atrae y retiene agua, evita la tirantez. Ácido hialurónico — retiene agua en profundidad, efecto plumping. Pantenol (B5) — calma, repara la barrera, deja sensación sedosa. Urea — hidrata (parte del factor natural de hidratación); en alta concentración es queratolítica. Inulina — prebiótico: nutre el microbioma sano de la piel. Lactato de sodio — humectante del manto natural.
ACTIVOS: Niacinamida (B3) — regula el sebo, empareja el tono, reduce manchas, fortalece la barrera. Vitamina C / ácido ascórbico — antioxidante, ilumina, estimula el colágeno. Ácido salicílico (BHA) — seborregulador, exfolia dentro del poro; piel grasa y con tendencia acneica. Ácido glicólico (AHA) — renueva, alisa e ilumina. Ácido láctico — exfolia suave e hidrata, buena tolerancia. Gluconolactona (PHA) — renueva sin irritar; apto para piel sensible o con rosácea. Alantoína — calmante y cicatrizante. Centella asiática — repara, calma, estimula colágeno. Aloe vera — hidrata, calma, refresca. Cafeína — descongestiona y reafirma. Vitamina E — antioxidante que protege los aceites y la piel.
BOTÁNICOS Y NATIVOS DE CHILE: Hidrolato de triwe (laurel nativo) — agua aromática suave; base acuosa noble y ligera con frescor herbal. Matico — tradición cicatrizante y antiinflamatoria. Maqui — antioxidante potente (antocianinas). Rosa mosqueta — regenera, antiedad, atenúa cicatrices. Manzanilla y caléndula — calmantes y antiinflamatorias. Romero — antioxidante y tonificante. Boldo, arrayán, canelo (foye) — nativos aromáticos, purificantes.
ACEITES Y MANTECAS: Manteca de karité — nutre, repara, antiinflamatoria; da cuerpo. Aceite de jojoba — regula el sebo (parecido al sebo humano). Aceite de rosa mosqueta — regenera, ideal piel madura. Escualano — emoliente ligero para piel sensible. Aceite de coco — humectante, forma capa protectora. Ácido esteárico — da cuerpo y emoliencia.
ARCILLAS: Caolín (blanca) — suave, absorbe grasa, piel sensible. Verde — purifica y seborregula, piel grasa/acné. Roja — revitaliza la piel apagada.
AUXILIARES (rol técnico, no beneficio en la piel): Ácido cítrico — ajusta el pH al de la piel (~5.5). Cosgard / conservante — evita la contaminación en fórmulas con agua. Goma xantana — espesa y da la textura. Agua destilada — vehículo. Alcohol cetílico / emulsionantes — unen agua y aceite y dan textura.`;

// Revisor independiente y adversarial: su único trabajo es CAZAR errores graves,
// sobre todo tratar como cosmético algo que no se aplica sobre el cuerpo.
const REVISOR_INSTRUCTION = `Eres un revisor crítico y estricto de etiquetas de cosmética. Te dan un producto, sus ingredientes y un texto de etiqueta generado por otra IA. Tu ÚNICO trabajo es detectar errores graves, especialmente:

1. ¿El producto realmente es un cosmético que se aplica sobre el cuerpo (piel, cabello, labios, uñas)? Si es una vela, difusor, ambientador, alimento, producto de limpieza del hogar, o cualquier cosa que NO se aplica sobre el cuerpo, es un ERROR GRAVE tratarlo como cosmético.
2. ¿El "modo de uso" asume que se aplica sobre el cuerpo cuando el producto no corresponde?
3. ¿Hay promesas MÉDICAS o claramente FALSAS (ej. "cura", "elimina arrugas", "trata el acné", "regenera la piel", cualquier claim de enfermedad)? Un copy detallado y sensorial que describe funciones razonables de los ingredientes es CORRECTO y NO es motivo de rechazo — solo rechaza afirmaciones médicas o falsas.

Sé estricto SOLO con los puntos 1, 2 y 3 anteriores; no rechaces por estilo ni por ser descriptivo. Responde ÚNICAMENTE con un JSON válido:
{"aprobado": boolean, "es_cosmetico_topico": boolean, "tipo_producto": "string", "problema": "string"}
- "aprobado": true solo si el texto es correcto y seguro para una etiqueta cosmética.
- "problema": si aprobado es false, explica en una o dos frases claras cuál es el error (ej. "El producto es una vela aromática, no se aplica sobre la piel; el modo de uso y las advertencias cosméticas no corresponden."). Si aprobado es true, deja "".`;

interface Generado {
  es_cosmetico_topico: boolean;
  tipo_producto: string;
  modo_uso: string;
  advertencias: string;
  descripcion_catalogo: string;
  descripcion_redes: string;
}

interface Revision {
  aprobado: boolean;
  es_cosmetico_topico: boolean;
  tipo_producto: string;
  problema: string;
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
  const productName: string | undefined = body?.product_name;
  const ingredientes: string | undefined = body?.ingredientes;

  if (!productName?.trim()) {
    return NextResponse.json({ error: "Falta el nombre del producto." }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key de Groq no configurada." }, { status: 500 });
  }

  const mensajeUsuario = `Producto: ${productName}\nIngredientes (INCI): ${ingredientes?.trim() || "sin especificar"}`;
  const groq = new Groq({ apiKey });

  // ── Etapa 1: generar ──
  let generado: Generado;
  try {
    const completion = await groq.chat.completions.create({
      model: MODELO,
      messages: [
        { role: "system", content: `${SYSTEM_INSTRUCTION}\n\n${GLOSARIO_INGREDIENTES}` },
        { role: "user", content: mensajeUsuario },
      ],
      response_format: { type: "json_object" },
      temperature: 0.75,
      max_tokens: 1900,
    });
    const parsed = JSON.parse(completion.choices[0]?.message?.content ?? "{}");
    const texto = (campo: string) => (typeof parsed[campo] === "string" ? parsed[campo] : "");
    generado = {
      es_cosmetico_topico: parsed.es_cosmetico_topico !== false, // por defecto true si no vino
      tipo_producto: texto("tipo_producto"),
      modo_uso: texto("modo_uso"),
      advertencias: texto("advertencias"),
      descripcion_catalogo: texto("descripcion_catalogo"),
      descripcion_redes: texto("descripcion_redes"),
    };
  } catch (error) {
    console.error("[lab/etiqueta-texto] generar", error);
    return NextResponse.json({ error: "No pude generar el texto en este momento. Intenta de nuevo." }, { status: 502 });
  }

  // ── Etapa 2: verificar (revisor independiente) ──
  // Si esta llamada falla, caemos a la clasificación de la etapa 1 (no bloqueamos el uso normal).
  let revision: Revision = {
    aprobado: generado.es_cosmetico_topico,
    es_cosmetico_topico: generado.es_cosmetico_topico,
    tipo_producto: generado.tipo_producto,
    problema: generado.es_cosmetico_topico
      ? ""
      : `El producto no parece un cosmético que se aplique sobre el cuerpo (parece: ${generado.tipo_producto || "otro tipo de producto"}).`,
  };

  try {
    const textoParaRevisar = `${mensajeUsuario}
Tipo de producto (según generador): ${generado.tipo_producto || "sin especificar"}
Modo de uso generado: ${generado.modo_uso || "(vacío)"}
Advertencias generadas: ${generado.advertencias || "(vacío)"}
Descripción de catálogo: ${generado.descripcion_catalogo || "(vacío)"}`;

    const rev = await groq.chat.completions.create({
      model: MODELO,
      messages: [
        { role: "system", content: REVISOR_INSTRUCTION },
        { role: "user", content: textoParaRevisar },
      ],
      response_format: { type: "json_object" },
    });
    const parsedRev = JSON.parse(rev.choices[0]?.message?.content ?? "{}");
    const esTopico = parsedRev.es_cosmetico_topico !== false && generado.es_cosmetico_topico;
    revision = {
      aprobado: parsedRev.aprobado === true && esTopico,
      es_cosmetico_topico: esTopico,
      tipo_producto: typeof parsedRev.tipo_producto === "string" && parsedRev.tipo_producto ? parsedRev.tipo_producto : generado.tipo_producto,
      problema: typeof parsedRev.problema === "string" ? parsedRev.problema : "",
    };
  } catch (error) {
    // No abortamos: usamos la clasificación de la etapa 1 ya cargada en `revision`.
    console.error("[lab/etiqueta-texto] verificar", error);
  }

  // Si el filtro no aprueba, NO devolvemos los textos de aplicación (para no rellenar
  // "aplicar sobre la piel" en algo que no es cosmético). Devolvemos solo la alerta.
  if (!revision.aprobado) {
    return NextResponse.json({
      modo_uso: "",
      advertencias: "",
      descripcion_catalogo: "",
      descripcion_redes: "",
      revision,
    });
  }

  return NextResponse.json({
    modo_uso: generado.modo_uso,
    advertencias: generado.advertencias,
    descripcion_catalogo: generado.descripcion_catalogo,
    descripcion_redes: generado.descripcion_redes,
    revision,
  });
}

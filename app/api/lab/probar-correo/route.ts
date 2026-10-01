import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { avisarEnvio, avisarVenta, confirmarPedido, correoConfigurado } from "@/lib/correo";

/* Manda correos de prueba, para comprobar que llegan sin tener que hacer una
   compra de verdad (que con las claves de produccion de Mercado Pago cuesta
   plata de verdad).

   Son los tres que manda la tienda:
     venta        → a Camila, cuando entra un pedido
     confirmacion → a la clienta, apenas se confirma el pago
     envio        → a la clienta, cuando el pedido sale con su seguimiento

   Los tres de prueba van SIEMPRE a CORREO_AVISOS, la direccion de Camila,
   para que vea con sus ojos lo que recibe una clienta. El destinatario nunca
   se elige desde afuera.

   Pide sesion del Lab: si no, cualquiera podria llenarle la casilla apretando
   esta direccion una y otra vez. */

const DESTINO = () => process.env.CORREO_AVISOS ?? "";

/* Se marca como prueba por todos lados para que, si queda dando vueltas en la
   casilla, no se confunda nunca con un pedido real. */
const PEDIDO_DE_PRUEBA = () => ({
  orden: "PRUEBA",
  total: 19890,
  items: [
    { nombre: "Esto es una prueba, no es un pedido real", cantidad: 1, precio: 9900 },
    { nombre: "Asi se ve una segunda linea", cantidad: 1, precio: 9990 },
  ],
  nombre: "Prueba de El Floema",
  email: DESTINO(),
  telefono: "—",
  metodo_envio: "domicilio",
  direccion: "Si estás leyendo esto, el correo funciona.",
  sucursal: null,
  comentarios: "Correo de prueba pedido desde el Lab. Ningún pedido fue creado.",
  pasarela: "prueba",
});

export async function POST(req: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  if (!correoConfigurado()) {
    return NextResponse.json({
      ok: false,
      causa: "Faltan RESEND_API_KEY y CORREO_AVISOS en Vercel.",
    });
  }

  const { tipo } = (await req.json().catch(() => ({}))) as { tipo?: string };
  const p = PEDIDO_DE_PRUEBA();

  const resultado =
    tipo === "confirmacion"
      ? await confirmarPedido(p)
      : tipo === "envio"
        ? await avisarEnvio(p, "PRUEBA-123456789", "Correos de Chile")
        : await avisarVenta(p);

  return NextResponse.json(resultado);
}

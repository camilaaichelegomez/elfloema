import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";
import { avisarVenta, correoConfigurado } from "@/lib/correo";

/* Manda un aviso de venta de mentira, para comprobar que el correo llega sin
   tener que hacer una compra de verdad (que con las claves de produccion de
   Mercado Pago cuesta plata de verdad).

   Pide sesion del Lab: si no, cualquiera podria llenarle la casilla a Camila
   apretando esta direccion una y otra vez. El correo ademas solo puede ir a
   CORREO_AVISOS, que es su propia direccion; nunca se elige desde afuera. */

export async function POST() {
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

  /* Se marca como prueba por todos lados para que, si queda dando vueltas en
     la casilla, no se confunda nunca con un pedido real. */
  const resultado = await avisarVenta({
    orden: "PRUEBA",
    total: 9990,
    items: [{ nombre: "Esto es una prueba, no es un pedido real", cantidad: 1, precio: 9990 }],
    nombre: "Prueba de El Floema",
    email: "prueba@elfloema.cl",
    telefono: "—",
    metodo_envio: "domicilio",
    direccion: "Si estás leyendo esto, el aviso por correo funciona.",
    sucursal: null,
    comentarios: "Correo de prueba pedido desde el Lab. Ningún pedido fue creado.",
    pasarela: "prueba",
  });

  return NextResponse.json(resultado);
}

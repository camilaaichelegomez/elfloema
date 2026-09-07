/* Verificación de dominio para la app de Android (Digital Asset Links).

   Google exige este archivo para confirmar que elfloema.vercel.app y la app
   de Play Store son de la misma dueña. Sin él, la app abre con la barra del
   navegador a la vista, como si fuera una página web cualquiera.

   Los dos datos los entrega Play Console al crear la app, así que en vez de
   dejarlos escritos aquí (o inventarlos, lo que haría fallar la verificación)
   se leen de las variables de entorno de Vercel:

     ANDROID_PACKAGE_NAME        ej. cl.elfloema.tienda
     ANDROID_SHA256_FINGERPRINT  ej. AB:CD:12:...  (Play Console →
                                 Integridad de la app → firma de la app)

   Mientras no estén configuradas, la ruta responde 404, que es lo correcto:
   todavía no hay ninguna app que verificar.
*/

export const dynamic = "force-dynamic";

export function GET() {
  const paquete = process.env.ANDROID_PACKAGE_NAME;
  const huella = process.env.ANDROID_SHA256_FINGERPRINT;

  if (!paquete || !huella) {
    return new Response(
      JSON.stringify({
        error: "Sin configurar",
        comor:
          "Define ANDROID_PACKAGE_NAME y ANDROID_SHA256_FINGERPRINT en Vercel para activar la verificación de la app de Android.",
      }),
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  // Admite varias huellas separadas por coma (útil al pasar de pruebas a producción).
  const huellas = huella
    .split(",")
    .map((h) => h.trim().toUpperCase())
    .filter(Boolean);

  const cuerpo = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: paquete,
        sha256_cert_fingerprints: huellas,
      },
    },
  ];

  return new Response(JSON.stringify(cuerpo, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      // Google lo consulta seguido; una caché corta evita quedar con datos viejos.
      "Cache-Control": "public, max-age=300",
    },
  });
}

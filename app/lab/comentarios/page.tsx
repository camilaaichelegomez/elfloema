import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";
import { LabEncabezado } from "@/components/lab/LabEncabezado";
import { ComentariosManager, type ComentarioFila } from "@/components/lab/ComentariosManager";

export default async function ComentariosLabPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/lab/login");
  }

  // Las reglas de la tabla solo dejan ver los pendientes a la dueña de la web.
  const { data, error } = await supabase
    .from("comentarios")
    .select("*")
    .order("creado", { ascending: false })
    .limit(300);

  return (
    <main
      className="parchment-bg lab-bg"
      style={{ minHeight: "100vh", padding: "clamp(78px, 9vh, 96px) clamp(20px, 5vw, 64px) 64px" }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <LabEncabezado titulo="Comentarios de la web" actual="comentarios" />

        {error ? (
          <p style={{ fontFamily: "var(--font-body)", color: "#e05a4a" }}>
            {error.code === "42P01" || /does not exist|schema cache/i.test(error.message)
              ? "Falta crear la tabla de comentarios en Supabase (supabase_comentarios.sql)."
              : `No se pudieron cargar los comentarios: ${error.message}`}
          </p>
        ) : (
          <ComentariosManager inicial={(data as ComentarioFila[] | null) ?? []} />
        )}
      </div>
    </main>
  );
}

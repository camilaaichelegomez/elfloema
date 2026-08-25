import Link from "next/link";
import { getProductos } from "@/lib/productos-db";
import FichaImprimible from "@/components/tienda/FichaImprimible";
import FichaEstilos from "@/components/tienda/FichaEstilos";
import BotonImprimir from "@/components/tienda/BotonImprimir";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Fichas imprimibles · El Floema",
};

// Todas las fichas imprimibles, una por página (page-break al imprimir).
// Para imprimir todas de una, o usar el rango de páginas del navegador.
export default async function FichasPage() {
  const productos = (await getProductos()).filter((p) => !p.oculto);

  return (
    <div className="ficha-page">
      <FichaEstilos />
      <div className="ficha-toolbar no-print">
        <Link href="/tienda">← Volver a la tienda</Link>
        <BotonImprimir label="Imprimir todas 🖨" />
      </div>
      <p className="ficha-note no-print">
        {productos.length} fichas en blanco y negro, una por página. Imprime todas, o elige
        el rango de páginas en el diálogo de impresión. Para una sola, abre la ficha desde su producto.
      </p>
      {productos.map((p) => (
        <FichaImprimible key={p.slug} producto={p} />
      ))}
    </div>
  );
}

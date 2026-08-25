import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { productosTienda, getProductoTienda } from "@/lib/productos-tienda";
import FichaImprimible from "@/components/tienda/FichaImprimible";
import FichaEstilos from "@/components/tienda/FichaEstilos";
import BotonImprimir from "@/components/tienda/BotonImprimir";

// Fichas imprimibles para todos los productos (incluye ocultos: ella igual
// puede imprimir la ficha de algo que aun no esta a la venta).
export function generateStaticParams() {
  return productosTienda.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const producto = getProductoTienda(slug);
  return { title: producto ? `Ficha · ${producto.nombre}` : "Ficha" };
}

export default async function FichaProductoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const producto = getProductoTienda(slug);
  if (!producto) notFound();

  return (
    <div className="ficha-page">
      <FichaEstilos />
      <div className="ficha-toolbar no-print">
        <Link href={`/tienda/${producto.slug}`}>← Volver al producto</Link>
        <BotonImprimir />
      </div>
      <p className="ficha-note no-print">
        Vista de impresión en blanco y negro. Pulsa Imprimir (o Ctrl/Cmd+P) — ideal en papel kraft.
      </p>
      <FichaImprimible producto={producto} />
    </div>
  );
}

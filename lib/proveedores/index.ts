import calendulaCl from "./calendula-cl.json";

// Proveedores de insumos para formular, por país. Cada proveedor trae su lista
// de productos (nombre + enlace a su tienda); la búsqueda del Lab los cruza.
// Para sumar un proveedor de otro país: agregar su archivo JSON y una entrada acá.
// Los precios NO se guardan: los anota cada formuladora con lo que pagó de verdad.

export type ProductoProveedor = { n: string; u: string };

export type Proveedor = {
  id: string;
  nombre: string;
  pais: string;
  codigoPais: string;
  sitio: string;
  productos: ProductoProveedor[];
};

export const PROVEEDORES: Proveedor[] = [
  {
    id: "calendula-cl",
    nombre: "Cálendula",
    pais: "Chile",
    codigoPais: "CL",
    sitio: "https://calendula.cl",
    productos: calendulaCl as ProductoProveedor[],
  },
];

export function normalizar(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

import { CartProvider } from "@/components/tienda/CartProvider";

// Envuelve todas las rutas /tienda/* con el carrito (estado + boton flotante +
// panel lateral). Asi el carrito solo existe en la tienda, no en todo el sitio.
export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

import type { ProductoTienda } from "@/lib/productos-tienda";

// Ficha imprimible en blanco y negro para incluir con el pedido (papel kraft).
// Breve, en una plana: propiedades, modo de uso y qué esperar.
// Sin color: solo tinta negra, para que imprima bien sobre kraft.
export default function FichaImprimible({ producto }: { producto: ProductoTienda }) {
  const meta = [producto.tamano, producto.piel && `Para ${producto.piel.toLowerCase()}`]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <article className="ficha">
      {/* Encabezado */}
      <header className="ficha-head">
        <p className="ficha-marca">✿ EL FLOEMA ✿</p>
        <p className="ficha-marca-sub">Cosmética botánica · hecho a mano</p>
        <div className="ficha-rule" />
        <h1 className="ficha-nombre">{producto.nombre}</h1>
        {producto.categoria && <p className="ficha-cat">{producto.categoria}</p>}
        {meta && <p className="ficha-meta">{meta}</p>}
      </header>

      {/* Propiedades */}
      {producto.beneficios && producto.beneficios.length > 0 && (
        <section className="ficha-sec">
          <h2 className="ficha-h2">Propiedades</h2>
          <ul className="ficha-lista">
            {producto.beneficios.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Modo de uso */}
      {producto.modoUso && (
        <section className="ficha-sec">
          <h2 className="ficha-h2">Modo de uso</h2>
          <p className="ficha-texto">{producto.modoUso}</p>
        </section>
      )}

      {/* Qué esperar */}
      {(producto.resultado || producto.descripcion) && (
        <section className="ficha-sec">
          <h2 className="ficha-h2">Qué esperar</h2>
          <p className="ficha-texto">{producto.resultado ?? producto.descripcion}</p>
        </section>
      )}

      {/* Ingredientes (breve, al pie) */}
      {producto.ingredientes && (
        <p className="ficha-inci">
          <strong>Ingredientes (INCI):</strong> {producto.ingredientes}
        </p>
      )}

      {/* Pie */}
      <footer className="ficha-foot">
        <div className="ficha-rule" />
        <p>El Floema · La Unión, Región de Los Ríos, Chile</p>
        <p>@elfloema · Con ciencia, mi magia despierta</p>
      </footer>
    </article>
  );
}

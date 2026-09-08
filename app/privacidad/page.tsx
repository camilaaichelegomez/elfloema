import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Política de Privacidad · El Floema",
  description:
    "Qué datos recoge El Floema, para qué se usan, con quién se comparten y cómo pedir que se eliminen.",
};

/* Política de privacidad. Debe describir SOLO lo que el sitio realmente hace:
   no se declaran cookies de analítica ni rastreo publicitario porque no
   existen en el proyecto. Si algún día se agregan, hay que actualizarla. */

const ACTUALIZADA = "8 de septiembre de 2026";

function Titulo({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontFamily: "var(--font-cinzel), serif",
        fontSize: "clamp(1rem,2.2vw,1.25rem)",
        color: "#c8a050",
        letterSpacing: "0.1em",
        margin: "2rem 0 0.75rem",
      }}
    >
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontFamily: "var(--font-crimson), serif",
        fontSize: "1rem",
        lineHeight: 1.85,
        color: "#d4c4a0",
        opacity: 0.88,
        margin: "0 0 0.9rem",
      }}
    >
      {children}
    </p>
  );
}

function Lista({ items }: { items: React.ReactNode[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 1rem" }}>
      {items.map((t, i) => (
        <li
          key={i}
          style={{
            fontFamily: "var(--font-crimson), serif",
            fontSize: "1rem",
            lineHeight: 1.8,
            color: "#d4c4a0",
            opacity: 0.88,
            paddingLeft: "1.1rem",
            position: "relative",
            marginBottom: "0.4rem",
          }}
        >
          <span style={{ position: "absolute", left: 0, color: "#c8a050", opacity: 0.6 }}>·</span>
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function PrivacidadPage() {
  return (
    <>
      <Navbar />
      <main
        className="bg-vivo"
        style={{
          background:
            "linear-gradient(rgba(10,16,10,0.42), rgba(10,16,10,0.6)), url('/biblioteca-fondo.jpg') center top / cover fixed, var(--bg-primary)",
          minHeight: "100vh",
          paddingTop: "5rem",
        }}
      >
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            padding: "clamp(2rem,5vh,4rem) clamp(1.5rem,5vw,3rem) 6rem",
            background: "rgba(9,14,9,0.72)",
            borderRadius: 10,
            border: "1px solid rgba(200,160,80,0.1)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
          }}
        >
          <div style={{ marginBottom: "2rem" }}>
            <BackButton label="← Volver al inicio" href="/" />
          </div>

          <h1
            style={{
              fontFamily: "var(--font-cinzel), serif",
              fontSize: "clamp(1.7rem,4vw,2.4rem)",
              color: "#c8a050",
              letterSpacing: "0.12em",
              marginBottom: "0.5rem",
            }}
          >
            Política de Privacidad
          </h1>
          <p
            style={{
              fontFamily: "var(--font-crimson), serif",
              fontStyle: "italic",
              color: "#d4c4a0",
              opacity: 0.55,
              marginBottom: "1.5rem",
            }}
          >
            Última actualización: {ACTUALIZADA}
          </p>

          <P>
            El Floema es una marca chilena de cosmética botánica artesanal. Esta política explica, en
            palabras simples, qué datos recogemos, para qué los usamos y cómo puedes pedir que los
            eliminemos. Se rige por la Ley N.º 19.628 sobre Protección de la Vida Privada de Chile.
          </P>

          <Titulo>Quién trata tus datos</Titulo>
          <P>
            El Floema, a cargo de Camila Aichele. Puedes escribirnos por Instagram a{" "}
            <a href="https://instagram.com/elfloema" target="_blank" rel="noopener noreferrer" style={{ color: "#c8a050" }}>
              @elfloema
            </a>{" "}
            para cualquier consulta sobre tus datos.
          </P>

          <Titulo>Qué datos recogemos</Titulo>
          <P>
            <strong style={{ color: "#c8a050" }}>Si compras en la tienda:</strong> tu nombre, correo
            electrónico, teléfono, dirección de despacho y los comentarios que escribas en el pedido.
            Los necesitamos para prepararte y enviarte el producto.
          </P>
          <P>
            <strong style={{ color: "#c8a050" }}>Si creas una cuenta en El Floema Lab:</strong> tu
            correo electrónico y contraseña (la contraseña se guarda cifrada, no podemos verla), junto
            con la información que tú misma cargues: tu inventario, tus fórmulas, tus costos y tus
            notas.
          </P>
          <P>
            <strong style={{ color: "#c8a050" }}>Si solo navegas:</strong> no recogemos nada. Este
            sitio no usa cookies publicitarias, ni Google Analytics, ni píxeles de redes sociales, ni
            ningún sistema de rastreo.
          </P>

          <Titulo>Tus fórmulas son tuyas</Titulo>
          <P>
            Lo que cargues en el Lab es privado. Cada cuenta ve únicamente su propia información: otras
            usuarias no pueden ver tu inventario, tus fórmulas ni tus costos. Las únicas fórmulas
            visibles públicamente en la sección Recetas son las de El Floema, publicadas por decisión
            propia como transparencia de marca.
          </P>
          <P>
            No vendemos, arrendamos ni cedemos tus datos a terceros con fines comerciales. Nunca.
          </P>

          <Titulo>Con quién se comparten</Titulo>
          <P>
            Para que el servicio funcione usamos proveedores que procesan datos por encargo nuestro.
            Algunos tienen servidores fuera de Chile:
          </P>
          <Lista
            items={[
              <>
                <strong style={{ color: "#c8a050" }}>Supabase</strong> — guarda la base de datos y las
                cuentas de usuaria.
              </>,
              <>
                <strong style={{ color: "#c8a050" }}>Vercel</strong> — aloja el sitio y la aplicación.
              </>,
              <>
                <strong style={{ color: "#c8a050" }}>MercadoPago</strong> — procesa los pagos.{" "}
                <em>No recibimos ni guardamos los datos de tu tarjeta</em>: los maneja directamente
                MercadoPago.
              </>,
              <>
                <strong style={{ color: "#c8a050" }}>Groq</strong> — hace funcionar el asistente de
                formulación. Cuando le escribes al asistente, tu consulta y los datos de la fórmula
                consultada se envían para poder responderte.
              </>,
            ]}
          />

          <Titulo>Cuánto tiempo los guardamos</Titulo>
          <P>
            Los datos de tu cuenta del Lab se conservan mientras la mantengas abierta. Los datos de una
            compra se guardan el tiempo necesario para cumplir con las obligaciones tributarias y de
            garantía. Si pides que eliminemos tu cuenta, borramos tu información dentro de 30 días.
          </P>

          <Titulo>Tus derechos</Titulo>
          <P>Puedes pedirnos en cualquier momento, sin costo:</P>
          <Lista
            items={[
              "Saber qué datos tuyos tenemos.",
              "Corregir los que estén equivocados o incompletos.",
              "Eliminar tu cuenta y toda tu información.",
              "Obtener una copia de tus fórmulas e inventario para llevártelos.",
            ]}
          />
          <P>
            Escríbenos a{" "}
            <a href="https://instagram.com/elfloema" target="_blank" rel="noopener noreferrer" style={{ color: "#c8a050" }}>
              @elfloema
            </a>{" "}
            y respondemos dentro de los plazos que exige la ley.
          </P>

          <Titulo>Seguridad</Titulo>
          <P>
            La conexión al sitio va cifrada (HTTPS) y el acceso a los datos está restringido por cuenta:
            la base de datos aplica reglas que impiden que una usuaria acceda a la información de otra.
            Ningún sistema es infalible; si ocurriera una brecha que te afecte, te lo comunicaríamos.
          </P>

          <Titulo>Menores de edad</Titulo>
          <P>
            El Floema Lab está pensado para personas mayores de 18 años. No recogemos datos de menores
            de forma consciente. Si crees que un menor nos entregó datos, avísanos y los eliminaremos.
          </P>

          <Titulo>Cambios a esta política</Titulo>
          <P>
            Si cambia algo relevante, actualizaremos esta página y su fecha. Si el cambio te afecta de
            forma importante y tienes cuenta, te avisaremos por correo.
          </P>
        </div>
      </main>
    </>
  );
}

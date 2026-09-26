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
   existen en el proyecto. Si algún día se agrega Google Analytics, un píxel
   de Meta o cualquier medición, hay que actualizar esta página Y pedir
   consentimiento antes de cargarlo: eso ya no sería «estrictamente
   necesario».

   Escrita mirando la Ley 19.628, vigente hoy, y la Ley 21.719, que rige
   desde el 1 de diciembre de 2026 y es más exigente: por eso aquí ya van la
   base de licitud de cada tratamiento, los derechos ARCOP, los plazos y el
   aviso de brechas.

   Esto no es asesoría legal: si el negocio crece, que lo revise una abogada. */

const ACTUALIZADA = "23 de septiembre de 2026";

function Titulo({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2
      id={id}
      style={{
        scrollMarginTop: "6rem",
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

function Tabla({ headers, rows }: { headers: string[]; rows: React.ReactNode[][] }) {
  return (
    <div style={{ overflowX: "auto", margin: "0 0 1.2rem" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-crimson), serif" }}>
        <thead>
          <tr style={{ background: "rgba(200,160,80,0.08)" }}>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  border: "1px solid rgba(200,160,80,0.18)",
                  padding: "8px 10px",
                  color: "#c8a050",
                  fontSize: "0.9rem",
                  textAlign: "left",
                  fontWeight: 600,
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((fila, i) => (
            <tr key={i} style={{ background: i % 2 === 1 ? "rgba(200,160,80,0.02)" : "transparent" }}>
              {fila.map((celda, j) => (
                <td
                  key={j}
                  style={{
                    border: "1px solid rgba(200,160,80,0.12)",
                    padding: "8px 10px",
                    fontSize: "0.93rem",
                    lineHeight: 1.65,
                    color: "#d4c4a0",
                    opacity: 0.9,
                  }}
                >
                  {celda}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Destacado({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: "rgba(200,160,80,0.08)",
        border: "1px solid rgba(200,160,80,0.3)",
        borderRadius: "0.4rem",
        padding: "1rem 1.2rem",
        margin: "0 0 1.2rem",
      }}
    >
      <div style={{ fontFamily: "var(--font-crimson), serif", fontSize: "1rem", lineHeight: 1.8, color: "#e8d8b0" }}>
        {children}
      </div>
    </div>
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
            palabras simples, qué datos recogemos, para qué los usamos, con quién se comparten y cómo
            pedir que los eliminemos. Se rige por la Ley N.º 19.628 sobre Protección de la Vida Privada
            y se adelanta a la Ley N.º 21.719, que rige en Chile desde el 1 de diciembre de 2026.
          </P>

          <Destacado>
            Lo esencial, por si no quieres leer todo: <strong>no usamos cookies de publicidad, ni
            Google Analytics, ni píxeles de redes sociales</strong>. Lo único que se guarda en tu
            teléfono es lo que hace falta para que la página funcione —tu carrito, tus preferencias de
            las rutinas— y eso no sale de tu dispositivo. <strong>No vendemos ni cedemos tus datos a
            nadie.</strong>
          </Destacado>

          <Titulo>Quién trata tus datos</Titulo>
          <P>
            La responsable es <strong style={{ color: "#c8a050" }}>Camila Aichele Gómez</strong>, a
            cargo de El Floema, en La Unión, Región de Los Ríos, Chile. Para cualquier cosa de esta
            política, escríbele a{" "}
            <a href="mailto:camilaaichelegomez@gmail.com" style={{ color: "#c8a050" }}>
              camilaaichelegomez@gmail.com
            </a>{" "}
            o por Instagram a{" "}
            <a href="https://instagram.com/elfloema" target="_blank" rel="noopener noreferrer" style={{ color: "#c8a050" }}>
              @elfloema
            </a>
            .
          </P>

          <Titulo>Qué datos recogemos, para qué y con qué fundamento</Titulo>
          <Tabla
            headers={["Cuándo", "Qué datos", "Para qué", "Fundamento legal"]}
            rows={[
              [
                "Si solo navegas",
                "Ninguno que te identifique.",
                "—",
                "No hay tratamiento de datos personales.",
              ],
              [
                "Si compras en la tienda",
                "Nombre, correo, teléfono, dirección de despacho o sucursal, y los comentarios del pedido.",
                "Preparar el pedido, cobrarlo, despacharlo y responder por la garantía.",
                "Ejecución del contrato de compraventa, y cumplimiento de obligaciones legales (tributarias y del consumidor).",
              ],
              [
                "Si creas una cuenta en El Floema Lab",
                "Correo y contraseña (cifrada, no podemos verla), más lo que tú cargues: inventario, fórmulas, costos, notas.",
                "Darte la cuenta y guardar tu trabajo.",
                "Ejecución del servicio que pediste al registrarte.",
              ],
              [
                "Si le escribes al asistente",
                "Tu consulta y los datos de la fórmula consultada.",
                "Poder responderte.",
                "Tu solicitud expresa al usar la herramienta.",
              ],
              [
                "Si nos escribes",
                "Lo que nos cuentes por correo o por Instagram.",
                "Responderte.",
                "Tu propio contacto.",
              ],
            ]}
          />

          <Titulo id="cookies">Cookies y lo que se guarda en tu dispositivo</Titulo>
          <P>
            Aquí está todo, sin letra chica. La página usa dos cosas: <strong>cookies</strong>, que son
            archivitos que el navegador manda de vuelta al servidor, y{" "}
            <strong>almacenamiento local</strong>, que son datos que se quedan guardados en tu teléfono
            o computador y <em>nunca</em> se envían a ninguna parte.
          </P>
          <Tabla
            headers={["Qué es", "Tipo", "Para qué sirve", "Cuánto dura"]}
            rows={[
              [
                "Sesión de El Floema Lab",
                "Cookie",
                "Mantenerte con la sesión iniciada en el Lab. Solo existe si creas una cuenta y entras.",
                "Hasta que cierras sesión o caduca.",
              ],
              [
                <>Tu carrito (<code>floema-cart</code>)</>,
                "En tu dispositivo",
                "Que no se pierda lo que agregaste al carrito si cierras la página.",
                "Hasta que lo vacíes o borres los datos del navegador.",
              ],
              [
                <>Ritual facial (<code>floema-ritual-facial</code>)</>,
                "En tu dispositivo",
                "Recordar tu rutina, el sonido, la música y tu racha.",
                "Hasta que borres los datos del navegador.",
              ],
              [
                <>Ritual de yoga (<code>floema-yoga</code>)</>,
                "En tu dispositivo",
                "Recordar tus preferencias de práctica y tu historial.",
                "Hasta que borres los datos del navegador.",
              ],
              [
                <>Borrador de fórmula y catálogo (<code>floema-borrador-formula</code>, <code>floema-catalogo-marca</code>)</>,
                "En tu dispositivo",
                "No perder lo que estabas escribiendo en el Lab.",
                "Hasta que borres los datos del navegador.",
              ],
              [
                <>Aviso leído (<code>floema-aviso-datos</code>)</>,
                "En tu dispositivo",
                "No volver a mostrarte el aviso de esta política cada vez que entras.",
                "Un año.",
              ],
            ]}
          />
          <P>
            Todas son <strong>estrictamente necesarias</strong> para que el sitio funcione, y por eso no
            te pedimos permiso para usarlas: no hay nada que rastree tu navegación ni que arme un perfil
            tuyo. Si algún día agregamos analítica o publicidad, te lo vamos a pedir antes, con una
            casilla que empieza desmarcada.
          </P>
          <P>
            <strong style={{ color: "#c8a050" }}>Cómo borrarlas:</strong> en la configuración de tu
            navegador, en «borrar datos de navegación» o «datos de sitios». Si las borras, el carrito y
            tus preferencias de las rutinas vuelven a cero; nada más se pierde.
          </P>

          <Titulo>Tus fórmulas son tuyas</Titulo>
          <P>
            Lo que cargues en el Lab es privado. Cada cuenta ve únicamente su propia información: otras
            usuarias no pueden ver tu inventario, tus fórmulas ni tus costos. Las únicas fórmulas
            visibles públicamente son las de El Floema, publicadas por decisión propia como
            transparencia de marca.
          </P>
          <P>No vendemos, arrendamos ni cedemos tus datos a terceros con fines comerciales. Nunca.</P>

          <Titulo>Con quién se comparten</Titulo>
          <P>
            Para que el servicio funcione usamos proveedores que tratan datos por encargo nuestro, solo
            para lo que se les pide. Algunos tienen servidores fuera de Chile, así que tus datos pueden
            almacenarse en el extranjero con las garantías que esos proveedores ofrecen en sus contratos:
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
                <strong style={{ color: "#c8a050" }}>Flow</strong> — procesa los pagos cuando la tienda
                cobra en línea. <em>No recibimos ni guardamos los datos de tu tarjeta ni de tu banco</em>:
                los maneja directamente Flow. Para cobrar le enviamos tu correo y el monto del pedido.
              </>,
              <>
                <strong style={{ color: "#c8a050" }}>Groq</strong> y{" "}
                <strong style={{ color: "#c8a050" }}>Google (Gemini)</strong> — hacen funcionar los
                asistentes. Lo que les escribes se envía para poder responderte; no les mandamos tu
                nombre ni tu correo.
              </>,
            ]}
          />
          <P>
            Ninguno de ellos puede usar tus datos para fines propios, y no hay nadie más: ni agencias de
            publicidad, ni corredores de datos, ni redes sociales.
          </P>

          <Titulo>Cuánto tiempo los guardamos</Titulo>
          <Lista
            items={[
              "Cuenta del Lab: mientras la mantengas abierta. Si pides eliminarla, borramos tu información dentro de 30 días.",
              "Compras: el tiempo que exigen las obligaciones tributarias y la garantía legal (seis años los documentos tributarios).",
              "Consultas por correo o Instagram: hasta un año después de responderte, salvo que pidas borrarlas antes.",
              "Lo guardado en tu dispositivo: lo controlas tú, borrando los datos del navegador.",
            ]}
          />

          <Titulo>Tus derechos</Titulo>
          <P>Puedes pedirnos en cualquier momento, gratis y sin explicar por qué:</P>
          <Lista
            items={[
              <>
                <strong style={{ color: "#c8a050" }}>Acceso</strong> — saber qué datos tuyos tenemos y
                qué hacemos con ellos.
              </>,
              <>
                <strong style={{ color: "#c8a050" }}>Rectificación</strong> — corregir los que estén
                equivocados o incompletos.
              </>,
              <>
                <strong style={{ color: "#c8a050" }}>Cancelación o supresión</strong> — eliminar tu
                cuenta y tu información.
              </>,
              <>
                <strong style={{ color: "#c8a050" }}>Oposición</strong> — pedir que dejemos de usar tus
                datos para algo determinado.
              </>,
              <>
                <strong style={{ color: "#c8a050" }}>Portabilidad</strong> — llevarte una copia de tus
                fórmulas e inventario en un archivo que puedas abrir en otra parte.
              </>,
            ]}
          />
          <P>
            Escríbenos a{" "}
            <a href="mailto:camilaaichelegomez@gmail.com" style={{ color: "#c8a050" }}>
              camilaaichelegomez@gmail.com
            </a>{" "}
            y te respondemos dentro de los plazos que exige la ley. Si no quedas conforme con la
            respuesta, puedes reclamar ante la autoridad de protección de datos personales que
            corresponda.
          </P>

          <Titulo>Seguridad y qué pasa si algo falla</Titulo>
          <P>
            La conexión al sitio va cifrada (HTTPS), las contraseñas se guardan cifradas y el acceso a
            los datos está restringido por cuenta: la base de datos aplica reglas que impiden que una
            usuaria vea la información de otra. Ningún sistema es infalible. Si ocurriera una brecha que
            pueda afectarte, te lo comunicaremos sin dilación y avisaremos a la autoridad cuando
            corresponda.
          </P>

          <Titulo>Menores de edad</Titulo>
          <P>
            El Floema Lab y la tienda están pensados para personas mayores de 18 años. No recogemos
            datos de menores a sabiendas. Si crees que un menor nos entregó datos, avísanos y los
            eliminamos.
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

import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { BackButton } from "@/components/BackButton";

export const metadata: Metadata = {
  title: "Términos de Uso · El Floema",
  description:
    "Condiciones para usar El Floema Lab y la tienda: responsabilidades, alcance del asistente de formulación y derechos de cada usuaria.",
};

/* Términos de uso. El punto central es delimitar responsabilidades: el Lab es
   una herramienta de apoyo, y quien formula y fabrica un cosmético es
   responsable de su producto. Redactado para que se entienda, no para
   esconderse en letra chica. Conviene que lo revise un abogado antes de
   abrir el Lab a terceras. */

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
      <div
        style={{
          fontFamily: "var(--font-crimson), serif",
          fontSize: "1rem",
          lineHeight: 1.8,
          color: "#e8d8b0",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function TerminosPage() {
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
            Términos de Uso
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
            Estas condiciones regulan el uso del sitio de El Floema, de su tienda y de la herramienta
            El Floema Lab. Al crear una cuenta o comprar, aceptas lo que sigue. Está escrito para que
            se entienda: si algo no te queda claro, escríbenos antes de usar el servicio.
          </P>

          <Titulo>1. Qué es El Floema Lab</Titulo>
          <P>
            El Floema Lab es una herramienta de apoyo para formular cosmética: permite llevar un
            inventario, registrar fórmulas, calcular costos y consultar una biblioteca de referencia.
            Es un cuaderno de trabajo digital, no un laboratorio ni un servicio de asesoría técnica
            certificada.
          </P>

          <Titulo>2. El asistente y la biblioteca son orientativos</Titulo>
          <Destacado>
            El asistente de formulación funciona con inteligencia artificial y{" "}
            <strong>puede equivocarse</strong>. Sus sugerencias, los rangos de las bases y el contenido
            de la biblioteca son material de referencia y estudio: <strong>no reemplazan tu criterio
            profesional, ni un análisis de laboratorio, ni la normativa sanitaria vigente</strong>.
            Verifica siempre cada ingrediente, cada porcentaje y cada incompatibilidad antes de
            elaborar algo.
          </Destacado>
          <P>
            La información de la biblioteca tiene fines educativos. No constituye consejo médico,
            farmacéutico ni dermatológico. Los usos tradicionales de las plantas se presentan como
            herencia cultural, no como tratamiento.
          </P>

          <Titulo>3. Tú eres responsable de lo que elaboras</Titulo>
          <Destacado>
            Si usas el Lab para crear un producto, <strong>tú eres la única responsable</strong> de su
            formulación, fabricación, conservación, etiquetado, seguridad y de cumplir la normativa
            que corresponda en tu país —en Chile, entre otras, la del Instituto de Salud Pública—.
            El Floema no fabrica, no revisa ni aprueba los productos de sus usuarias, y no responde
            por daños derivados de productos elaborados por terceras personas.
          </Destacado>
          <P>
            Esto incluye las pruebas de estabilidad y microbiológicas, el uso de conservantes
            adecuados, las advertencias al consumidor final y cualquier permiso o registro sanitario
            que tu actividad requiera.
          </P>

          <Titulo>4. Tu cuenta</Titulo>
          <Lista
            items={[
              "Debes ser mayor de 18 años para crear una cuenta.",
              "Los datos que entregues deben ser verdaderos.",
              "Eres responsable de tu contraseña y de lo que ocurra con tu cuenta.",
              "Puedes cerrarla cuando quieras y pedirnos que eliminemos tu información.",
            ]}
          />

          <Titulo>5. Tus fórmulas son tuyas</Titulo>
          <P>
            La información que cargues en el Lab —inventario, fórmulas, costos y notas— te pertenece.
            No la usamos con fines comerciales, no la mostramos a otras usuarias y no la vendemos.
            Solo la procesamos para que el servicio funcione, según explicamos en la{" "}
            <a href="/privacidad" style={{ color: "#c8a050" }}>
              Política de Privacidad
            </a>
            .
          </P>
          <P>
            Por otro lado, el contenido propio de El Floema —textos de la biblioteca, fichas de
            plantas, bases de cosmética, ilustraciones, marca y diseño— es nuestro. Puedes usarlo para
            estudiar y formular, pero no copiarlo para republicarlo o revenderlo como si fuera tuyo.
          </P>

          <Titulo>6. Uso responsable</Titulo>
          <P>No está permitido:</P>
          <Lista
            items={[
              "Intentar acceder a datos de otras usuarias o vulnerar la seguridad del servicio.",
              "Usar el asistente para obtener indicaciones peligrosas o ilegales.",
              "Extraer masivamente el contenido de la biblioteca de forma automatizada.",
              "Suplantar a El Floema o dar a entender que respaldamos tus productos.",
            ]}
          />
          <P>
            Si detectamos un uso así, podemos suspender la cuenta. Cuando sea posible, avisaremos
            antes y daremos oportunidad de corregir.
          </P>

          <Titulo>7. Disponibilidad del servicio</Titulo>
          <P>
            Trabajamos para que el Lab esté siempre disponible, pero puede haber interrupciones por
            mantención, fallas o cambios en servicios de terceros. El servicio se entrega{" "}
            <em>tal como está</em>: no garantizamos que esté libre de errores ni que sirva para un fin
            específico. Te recomendamos guardar por tu cuenta una copia de las fórmulas que sean
            importantes para ti.
          </P>
          <P>
            Si en el futuro el Lab pasa a ser de pago o cambian sus condiciones, lo avisaremos con
            anticipación razonable.
          </P>

          <Titulo>8. Compras en la tienda</Titulo>
          <P>
            Nuestros productos son <strong>cosméticos</strong>, no medicamentos: no curan ni tratan
            enfermedades. Cada persona reacciona distinto, así que revisa siempre los ingredientes y
            haz una prueba en una zona pequeña de piel antes del primer uso. Si tienes una condición
            dermatológica, consulta a tu médico.
          </P>
          <P>
            Los pagos se procesan a través de MercadoPago; no recibimos los datos de tu tarjeta. Se
            aplican los derechos que la Ley 19.496 sobre Protección de los Derechos de los
            Consumidores reconoce a las compras a distancia. Ante cualquier problema con un pedido,
            escríbenos primero: preferimos resolverlo directamente.
          </P>

          <Titulo>9. Límite de responsabilidad</Titulo>
          <P>
            En la medida en que la ley lo permita, El Floema no responde por daños indirectos, pérdida
            de datos, lucro cesante ni por consecuencias de productos elaborados por las usuarias del
            Lab. Nada en estos términos limita los derechos irrenunciables que la ley chilena reconoce
            a los consumidores.
          </P>

          <Titulo>10. Cambios y ley aplicable</Titulo>
          <P>
            Podemos actualizar estos términos; los cambios relevantes se avisarán en esta página con su
            fecha. Estas condiciones se rigen por la ley chilena y cualquier controversia se someterá a
            los tribunales competentes de Chile.
          </P>

          <Titulo>11. Contacto</Titulo>
          <P>
            Escríbenos por Instagram a{" "}
            <a href="https://instagram.com/elfloema" target="_blank" rel="noopener noreferrer" style={{ color: "#c8a050" }}>
              @elfloema
            </a>{" "}
            para cualquier duda sobre estos términos.
          </P>
        </div>
      </main>
    </>
  );
}

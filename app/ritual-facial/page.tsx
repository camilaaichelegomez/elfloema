import type { Metadata } from "next";
import { BackButton } from "@/components/BackButton";
import { RitualFacial } from "@/components/ritual/RitualFacial";

/* Ritual facial: arma una rutina de drenaje linfático y ejercicios faciales
   según lo que cada persona quiera trabajar, y la guía paso a paso.

   La secuencia del drenaje sale del manual de la biblioteca (Archiprete,
   Ciucci, Ferreira y Marcovecchio) y del material de apoyo de Maryi Maldonado.
   El texto de esta página dice exactamente qué está probado y qué no: es una
   sección de cuidado corporal, no un tratamiento. */

export const metadata: Metadata = {
  title: "Ritual facial — El Floema",
  description:
    "Arma tu rutina de yoga facial y drenaje linfático según lo que quieras trabajar, y síguela paso a paso con dibujos.",
};

export default function RitualFacialPage() {
  return (
    <main
      className="ritual-bg"
      style={{ minHeight: "100vh", padding: "clamp(90px, 14vh, 140px) clamp(16px, 5vw, 64px) 80px" }}
    >
      <div style={{ maxWidth: 940, margin: "0 auto" }}>
        <BackButton />

        <header style={{ margin: "0 0 2.2rem" }}>
          <p style={rotulo}>Cuidado del rostro</p>
          <h1
            style={{
              fontFamily: "var(--font-grimoire)",
              fontSize: "clamp(1.9rem, 5.5vw, 3.1rem)",
              color: "#c8a050",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              margin: "0.4rem 0 0.8rem",
              textShadow: "0 0 60px rgba(200,160,80,0.2)",
              textWrap: "balance",
            }}
          >
            Ritual facial
          </h1>
          <p
            style={{
              fontFamily: "var(--font-crimson), serif",
              fontSize: "clamp(1rem, 2.2vw, 1.18rem)",
              lineHeight: 1.65,
              color: "rgba(217,203,170,0.8)",
              maxWidth: "56ch",
              margin: 0,
            }}
          >
            Dime qué quieres trabajar y cuánto tiempo tienes. Te armo la rutina, te la dibujo y te la
            voy pasando sola — con las manos en la cara no puedes andar tocando la pantalla.
          </p>
        </header>

        <RitualFacial />

        {/* ── Qué está probado y qué no ── */}
        <section style={{ marginTop: "3rem" }}>
          <h2 style={titulo2}>Qué dice la evidencia, sin adornos</h2>

          <div style={{ display: "grid", gap: "1.1rem", gridTemplateColumns: "repeat(auto-fit,minmax(17rem,1fr))" }}>
            <article style={tarjeta}>
              <p style={rotulo}>Ejercicios faciales</p>
              <p style={texto}>
                Hay <strong>un</strong> estudio serio: 16 mujeres de 40 a 65 años, 30 minutos de
                ejercicios al día durante 8 semanas y cada dos días por 9 semanas más. Un panel de
                dermatólogos que no sabía cuál foto era antes o después les calculó, en promedio,{" "}
                <strong>2,7 años menos</strong> de edad aparente, sobre todo por volumen en las
                mejillas.
              </p>
              <p style={{ ...texto, color: "rgba(221,148,100,0.9)" }}>
                Lo que hay que saber: fue un grupo chico, sin grupo de control, y tomó 20 semanas de
                práctica casi diaria. No es un lifting y no actúa en una semana.
              </p>
              <p style={fuente}>JAMA Dermatology, enero de 2018 (Northwestern University)</p>
            </article>

            <article style={tarjeta}>
              <p style={rotulo}>Drenaje linfático</p>
              <p style={texto}>
                Como técnica médica está bien estudiado para el <strong>linfedema</strong>, sobre todo
                después de cirugía de mama. Ahí sí hay ensayos y revisiones.
              </p>
              <p style={texto}>
                Para la hinchazón de todos los días la evidencia es mucho más débil. Mueve líquido
                acumulado, y eso se nota al rato: la cara se ve menos inflada. Ese efecto es{" "}
                <strong>temporal</strong>.
              </p>
              <p style={{ ...texto, color: "rgba(221,148,100,0.9)" }}>
                Lo que no hace: no «elimina toxinas» ni desintoxica. La linfa transporta líquido y
                células de defensa; los órganos que depuran son el hígado y los riñones.
              </p>
              <p style={fuente}>
                Manual de la biblioteca: Archiprete, Ciucci, Ferreira y Marcovecchio, «Drenaje
                Linfático Manual»
              </p>
            </article>
          </div>
        </section>

        {/* ── Las tres reglas del manual ── */}
        <section style={{ marginTop: "2.4rem" }}>
          <h2 style={titulo2}>Las tres reglas que no se rompen</h2>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "0.9rem" }}>
            {[
              [
                "El cuello primero, siempre",
                "El cuello es la salida de todo el sistema y es la única zona que no necesita preparación previa. El rostro tiene al cuello como «zona de apertura»: si drenas la cara con el cuello cerrado, el líquido no tiene a dónde ir.",
              ],
              [
                "Casi sin fuerza",
                "De 30 a 40 mmHg, unos 55 gramos: el peso de un huevo. En los párpados, la mitad. Si la piel queda roja o algo duele, era demasiado. El drenaje no es un masaje y no se hace fuerte.",
              ],
              [
                "Cinco a siete veces, lento",
                "Cada maniobra se repite de 5 a 7 veces en el mismo punto, y la fase de presión dura más que la de relajación. Menos repeticiones no sirven: el líquido necesita tiempo antes de empezar a moverse.",
              ],
            ].map(([t, d]) => (
              <li key={t} style={{ ...tarjeta, padding: "0.9rem 1.1rem" }}>
                <p style={{ ...texto, color: "#e8c878", marginBottom: "0.3rem" }}>{t}</p>
                <p style={{ ...texto, margin: 0 }}>{d}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── Contraindicaciones ── */}
        <section style={{ marginTop: "2.4rem" }}>
          <div
            style={{
              border: "1px solid rgba(221,148,100,0.34)",
              background: "rgba(221,148,100,0.07)",
              borderRadius: 8,
              padding: "clamp(1rem, 3vw, 1.5rem)",
            }}
          >
            <p style={{ ...rotulo, color: "#dd9464" }}>Cuándo no hacerlo</p>
            <h2 style={{ ...titulo2, marginTop: "0.3rem", marginBottom: "0.8rem" }}>
              El drenaje tiene contraindicaciones reales
            </h2>
            <p style={texto}>
              No son advertencias de trámite: la vía linfática es una vía de propagación. Esta lista
              sale del manual de la biblioteca.
            </p>
            <ul style={{ margin: "0.8rem 0 0", paddingLeft: "1.2rem", display: "grid", gap: "0.5rem" }}>
              {[
                "Infección aguda, viral o bacteriana, con o sin fiebre. Contraindicado por completo: el drenaje puede difundirla.",
                "Insuficiencia cardíaca: se puede sobrecargar el corazón.",
                "Flebitis, trombosis o tromboflebitis: no se manipula ni encima ni en la zona vecina.",
                "Hipertiroidismo: no presionar la zona de la tiroides, en la parte baja y delantera del cuello.",
                "Personas mayores con arterioesclerosis avanzada: las maniobras en el cuello pueden bajar el pulso y la presión.",
                "Presión baja: al terminar, quédate sentada un momento y levántate lento.",
                "Si palpas un ganglio abultado, no drenes: un ganglio que se palpa indica inflamación. Consulta primero.",
              ].map((t) => (
                <li key={t} style={{ ...texto, margin: 0 }}>
                  {t}
                </li>
              ))}
            </ul>
            <p style={{ ...texto, marginTop: "1rem", marginBottom: 0, color: "rgba(221,148,100,0.9)" }}>
              Esto es cuidado cosmético, no un tratamiento médico. Si tienes hinchazón que no baja,
              dolor, o cualquiera de estas condiciones, consulta con tu médica antes.
            </p>
          </div>
        </section>

        <p style={{ ...fuente, marginTop: "2rem", textAlign: "center" }}>
          Los dibujos de cada maniobra están hechos a mano en la propia página: las flechas muestran
          la dirección exacta del recorrido, que es lo que de verdad importa.
        </p>
      </div>
    </main>
  );
}

const rotulo = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "0.6rem",
  letterSpacing: "0.26em",
  textTransform: "uppercase" as const,
  color: "rgba(200,160,80,0.68)",
  margin: 0,
};
const titulo2 = {
  fontFamily: "var(--font-grimoire)",
  fontSize: "clamp(1.1rem, 2.6vw, 1.45rem)",
  color: "#c8a050",
  letterSpacing: "0.08em",
  margin: "0 0 1.1rem",
  textWrap: "balance" as const,
};
const tarjeta = {
  border: "1px solid rgba(200,160,80,0.2)",
  background: "rgba(12,22,12,0.68)",
  borderRadius: 8,
  padding: "1.1rem 1.2rem",
};
const texto = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.97rem",
  lineHeight: 1.65,
  color: "rgba(217,203,170,0.82)",
  margin: "0 0 0.7rem",
};
const fuente = {
  fontFamily: "var(--font-crimson), serif",
  fontSize: "0.8rem",
  fontStyle: "italic" as const,
  color: "rgba(217,203,170,0.45)",
  margin: 0,
};

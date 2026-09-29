"use client";

import Link from "next/link";
import {
  Acordeones,
  Dorado,
  Evidencia,
  GreenBox,
  InfoBox,
  LineDivider,
  MiniTable,
  P,
  PaginaBiblioteca,
  Seccion,
  SubLabel,
  WarnBox,
} from "@/components/biblioteca/Piezas";
import {
  COMO_SUBIR,
  EN_UNA_LINEA,
  LA_DOSIS,
  MITOS,
  POR_QUE,
  PREGUNTAS,
  PROTEINA,
  PRUEBAS,
  QUE_PASA,
  SEGURIDAD,
} from "@/lib/fuerza/ciencia";
import { escalera } from "@/lib/fuerza/ejercicios";
import { MUSCULOS_PATRON, NOMBRE_PATRON, type Patron } from "@/lib/fuerza/tipos";

/* La teoría de la fuerza.

   Existe porque hay un hecho que casi nadie le cuenta a una mujer de treinta
   y cinco: la masa muscular ya está bajando, la fuerza baja más rápido
   todavía, y la transición a la menopausia acelera las dos cosas. Lo que se
   construya antes es lo que queda después.

   Cada afirmación de eficacia lleva grado y referencia. Los mitos del
   gimnasio se desarman con la fuente al lado. */

const ENLACE = { color: "#e8c878", textDecorationColor: "rgba(200,160,80,0.5)" };

const GRADO_PIEZA = {
  probado: "Bien respaldado",
  prometedor: "Prometedor",
  debil: "Evidencia débil",
  tradicion: "No hay evidencia",
} as const;

const PATRONES = Object.keys(NOMBRE_PATRON) as Patron[];

export default function BibliotecaFuerza() {
  return (
    <PaginaBiblioteca
      id="fuerza"
      titulo="Fuerza y masa muscular"
      fondo="/fondo_fuerza.webp"
      bajada="Por qué importa desde los treinta, qué está probado y cómo se hace en casa"
    >
      <Seccion titulo="Por qué esto importa, y desde cuándo">
        <InfoBox title="En una línea">
          <P>{EN_UNA_LINEA}</P>
        </InfoBox>
        {POR_QUE.map((p) => (
          <P key={p.slice(0, 24)}>{p}</P>
        ))}
        <GreenBox title="Lo que se gana, además del músculo">
          <P style={{ margin: 0 }}>
            Hueso más denso, azúcar mejor manejada, menos síntomas depresivos, y la capacidad de
            levantarte de una silla sin manos a los ochenta, que es la prueba con la que los
            geriatras predicen quién va a seguir viviendo sola. El músculo no es estética: es la
            reserva con la que se envejece.
          </P>
        </GreenBox>
      </Seccion>

      <LineDivider />

      <Seccion titulo="Qué pasa cuando entrenas">
        {QUE_PASA.map((m) => (
          <div key={m.titulo} style={{ marginBottom: 20 }}>
            <SubLabel>{m.titulo}</SubLabel>
            <P>{m.dice}</P>
            <P>
              <Dorado>El matiz:</Dorado> {m.pero}
            </P>
            {m.fuente && <P style={{ fontSize: "0.82rem", opacity: 0.6, margin: 0 }}>{m.fuente}</P>}
          </div>
        ))}
      </Seccion>

      <LineDivider />

      <Seccion titulo="Qué está probado y qué no">
        <P>
          Esto es lo que decide qué promete la app y qué no. Cada ficha dice lo que se puede
          afirmar, <Dorado>el pero que siempre hay</Dorado>, y de dónde sale. Las referencias están
          descargadas en la biblioteca científica del proyecto, en la carpeta <em>fuerza</em>.
        </P>
        {PRUEBAS.map((e) => (
          <Evidencia key={e.tema} grado={GRADO_PIEZA[e.grado]} fuente={e.fuente}>
            <P style={{ margin: "0 0 8px" }}>
              <Dorado>{e.tema}.</Dorado> {e.dice}
            </P>
            <P style={{ margin: 0 }}>{e.matiz}</P>
          </Evidencia>
        ))}
      </Seccion>

      <LineDivider />

      <Seccion titulo="La dosis, en números">
        <P>
          Casi todo lo que se discute en un gimnasio está resuelto en la literatura, y las cifras
          son menos exigentes de lo que parece.
        </P>
        <MiniTable
          headers={["Qué", "Cuánto", "Por qué"]}
          rows={LA_DOSIS.map((d) => [d.que, <Dorado key={d.que}>{d.cuanto}</Dorado>, d.porQue])}
        />
      </Seccion>

      <LineDivider />

      <Seccion titulo="Calistenia: por qué el propio cuerpo alcanza">
        <P>
          La objeción de siempre es que sin pesas no se puede aumentar la carga. Se puede:{" "}
          <Dorado>lo que cambia no es el peso, es la palanca</Dorado>. Una flexión en la pared y una
          con los pies en alto son el mismo movimiento con cargas muy distintas, y entre las dos hay
          cinco peldaños.
        </P>
        <P>
          Eso importa porque, cuando las series se llevan cerca del fallo, la hipertrofia con cargas
          bajas es parecida a la de cargas altas. Lo que no se puede es quedarse cómoda: si te
          sobran cinco repeticiones, ese peldaño ya no entrena nada.
        </P>
        <P>
          Y los límites, que también son reales: para la fuerza máxima pura el peso pesado sigue
          ganando, el hueso responde sobre todo a cargas altas, y hay un patrón —tirar hacia abajo,
          el de las dominadas— que en casa necesita al menos una barra o una banda.
        </P>
        <SubLabel>Los patrones, y qué trabaja cada uno</SubLabel>
        <MiniTable
          headers={["Patrón", "Qué trabaja", "Peldaños"]}
          rows={PATRONES.map((p) => [
            NOMBRE_PATRON[p],
            MUSCULOS_PATRON[p],
            `${escalera(p).length}`,
          ])}
        />
        <P>
          Las escaleras completas, ejercicio por ejercicio y con el criterio para subir de cada uno,
          están en{" "}
          <Link prefetch={false} href="/fuerza" style={ENLACE}>
            la app
          </Link>
          .
        </P>
      </Seccion>

      <LineDivider />

      <Seccion titulo="Cómo se sube">
        {COMO_SUBIR.map((c) => (
          <P key={c.slice(0, 20)}>{c}</P>
        ))}
      </Seccion>

      <LineDivider />

      <Seccion titulo="Proteína">
        <P>{PROTEINA.intro}</P>
        <P>
          <Dorado>Cuánta:</Dorado> {PROTEINA.cuanto}
        </P>
        <P>
          <Dorado>Cómo repartirla:</Dorado> {PROTEINA.reparto}
        </P>
        <MiniTable
          headers={["Alimento", "Proteína"]}
          rows={PROTEINA.ejemplos.map((x) => {
            const [a, b] = x.split(": ");
            return [a, b ?? ""];
          })}
        />
        <WarnBox>
          <P style={{ margin: 0 }}>{PROTEINA.ojo}</P>
        </WarnBox>
      </Seccion>

      <LineDivider />

      <Seccion titulo="Los mitos del gimnasio">
        <Acordeones
          items={MITOS.map((m, i) => ({
            id: `mito-${i}`,
            title: m.mito,
            contenido: <P style={{ margin: 0 }}>{m.realidad}</P>,
          }))}
        />
      </Seccion>

      <LineDivider />

      <Seccion titulo="Seguridad">
        <P>{SEGURIDAD.intro}</P>
        <SubLabel>Reglas que valen siempre</SubLabel>
        {SEGURIDAD.reglas.map((r) => (
          <P key={r.slice(0, 20)}>{r}</P>
        ))}
        <WarnBox title="Esto se conversa antes">
          {SEGURIDAD.cuando.map((c) => (
            <P key={c.slice(0, 20)}>{c}</P>
          ))}
        </WarnBox>
      </Seccion>

      <LineDivider />

      <Seccion titulo="Preguntas">
        <Acordeones
          items={PREGUNTAS.map((q, i) => ({
            id: `pregunta-${i}`,
            title: q.p,
            contenido: <P style={{ margin: 0 }}>{q.r}</P>,
          }))}
        />
      </Seccion>

      <Seccion titulo="Y ahora">
        <GreenBox>
          <P style={{ margin: 0 }}>
            La rutina se arma sola según lo que tengas en casa, lleva la cuenta de tus repeticiones
            y te sube de peldaño cuando te queda corta.{" "}
            <Link prefetch={false} href="/fuerza" style={ENLACE}>
              Ir a la práctica
            </Link>
            .
          </P>
        </GreenBox>
      </Seccion>
    </PaginaBiblioteca>
  );
}

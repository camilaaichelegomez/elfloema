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
  Tradicion,
  WarnBox,
} from "@/components/biblioteca/Piezas";
import {
  DE_DONDE_VIENE,
  EN_EL_CEREBRO,
  EN_UNA_LINEA,
  ETIQUETA_GRADO,
  LOS_CINCO_PASOS,
  LO_QUE_NADIE_TE_DICE,
  MITOS,
  NOMBRE_FAMILIA,
  OBSTACULOS,
  POSTURA,
  POR_QUE_OCHO_SEMANAS,
  PREGUNTAS,
  PROGRAMA,
  PRUEBAS,
  QUE_ES,
  RIESGOS,
  SOBRE_LA_MUSICA,
  TECNICAS,
} from "@/lib/meditacion/ciencia";

/* La teoría de la meditación, entera.

   En la app (/meditacion) va lo que se usa mientras se practica. Acá va lo
   que se lee una vez y ordena todo lo demás: qué es en realidad, de dónde
   viene, qué está probado, qué no hace, qué pasa en el cuerpo y cuándo
   conviene tener cuidado.

   Las afirmaciones de eficacia llevan grado y referencia. Lo que viene de la
   tradición se nombra como tradición. */

const ENLACE = { color: "#e8c878", textDecorationColor: "rgba(200,160,80,0.5)" };

const GRADO_PIEZA = {
  probado: "Bien respaldado",
  prometedor: "Prometedor",
  debil: "Evidencia débil",
  tradicion: "No hay evidencia",
} as const;

export default function BibliotecaMeditacion() {
  return (
    <PaginaBiblioteca
      id="meditacion"
      titulo="Meditación"
      fondo="/fondo_meditacion.webp"
      bajada="Qué es, de dónde viene, cómo se hace y qué está probado"
    >
      <Seccion titulo="Qué es, en realidad">
        <InfoBox title="En una línea">
          <P>{EN_UNA_LINEA}</P>
        </InfoBox>
        {QUE_ES.map((p) => (
          <P key={p.slice(0, 24)}>{p}</P>
        ))}
        <GreenBox title="Lo que nadie te dice al principio">
          {LO_QUE_NADIE_TE_DICE.map((l) => (
            <P key={l.slice(0, 20)}>{l}</P>
          ))}
        </GreenBox>
      </Seccion>

      <LineDivider />

      <Seccion titulo="De dónde viene">
        <Tradicion>
          Nada de esta parte es una afirmación de eficacia: es historia. Está acá porque saber de
          dónde sale una práctica ayuda a entender por qué se hace así.
        </Tradicion>
        {DE_DONDE_VIENE.map((h) => (
          <div key={h.epoca} style={{ marginBottom: 18 }}>
            <SubLabel>{h.epoca}</SubLabel>
            <P>{h.que}</P>
          </div>
        ))}
      </Seccion>

      <LineDivider />

      <Seccion titulo="Cómo se hace">
        <P>
          Cinco pasos, y el resto es repetición. Lo de la postura no es estética:{" "}
          <Dorado>es lo que decide si a los diez minutos estás practicando o aguantando</Dorado>.
        </P>
        <ol style={{ margin: "0 0 20px", paddingLeft: 20 }}>
          {LOS_CINCO_PASOS.map((p) => (
            <li key={p.slice(0, 20)} style={{ marginBottom: 8 }}>
              <P style={{ margin: 0 }}>{p}</P>
            </li>
          ))}
        </ol>
        <MiniTable
          headers={["El cuerpo", "Cómo", "Por qué"]}
          rows={POSTURA.map((d) => [d.parte, d.como, d.porQue])}
        />
      </Seccion>

      <LineDivider />

      <Seccion titulo={`Las ${TECNICAS.length} técnicas`}>
        <P>
          Todas son la misma cosa con distinto objeto de atención: la respiración, el cuerpo, un
          sonido, una frase, una imagen. La literatura las ordena en dos grandes grupos —{" "}
          <Dorado>atención focalizada</Dorado>, donde eliges un objeto y vuelves a él, y{" "}
          <Dorado>monitoreo abierto</Dorado>, donde dejas de elegir y observas lo que aparece—, y casi
          todo lo demás es una de las dos con algo encima.
        </P>
        <P>
          Todas están en{" "}
          <Link prefetch={false} href="/meditacion" style={ENLACE}>
            la app
          </Link>
          , guiadas paso a paso y con temporizador.
        </P>
        <Acordeones
          items={TECNICAS.map((t) => ({
            id: t.id,
            title: `${t.nombre} — ${NOMBRE_FAMILIA[t.familia]}`,
            contenido: (
              <>
                {t.tambien && <SubLabel>{t.tambien}</SubLabel>}
                <P>{t.queEs}</P>
                <SubLabel>Cómo</SubLabel>
                <ol style={{ margin: "0 0 14px", paddingLeft: 20 }}>
                  {t.pasos.map((p) => (
                    <li key={p.slice(0, 18)} style={{ marginBottom: 6 }}>
                      <P style={{ margin: 0 }}>{p}</P>
                    </li>
                  ))}
                </ol>
                <P>
                  <Dorado>Para qué:</Dorado> {t.paraQue}
                </P>
                <P>
                  <Dorado>Rato:</Dorado> {t.minutos.join(", ")} minutos.
                </P>
                {t.ojo && <WarnBox title="Ojo">{<P style={{ margin: 0 }}>{t.ojo}</P>}</WarnBox>}
              </>
            ),
          }))}
        />
      </Seccion>

      <LineDivider />

      <Seccion titulo="Los problemas de siempre">
        <P>
          No son fallas tuyas: están descritos y nombrados desde hace más de dos mil años, lo que
          dice bastante de cuán universales son. Los nombres en pali vienen de los textos budistas
          —tradición, no un hallazgo de laboratorio—, pero lo que describen es exactamente lo que te
          va a pasar el jueves.
        </P>
        {OBSTACULOS.map((o) => (
          <div key={o.que} style={{ marginBottom: 18 }}>
            <SubLabel>{o.tradicion ? `${o.que} · ${o.tradicion}` : o.que}</SubLabel>
            <P>{o.porQue}</P>
            <P>
              <Dorado>Qué hacer:</Dorado> {o.queHacer}
            </P>
          </div>
        ))}
      </Seccion>

      <LineDivider />

      <Seccion titulo="Qué está probado y qué no">
        <P>
          Esta es la parte que decide qué se promete en la app y qué no. Cada ficha dice lo que se
          puede afirmar, <Dorado>el pero que siempre hay</Dorado>, y de dónde sale. Las referencias
          están descargadas en la biblioteca científica del proyecto.
        </P>
        {PRUEBAS.map((e) => (
          <Evidencia key={e.tema} grado={GRADO_PIEZA[e.grado] ?? ETIQUETA_GRADO[e.grado]} fuente={e.fuente}>
            <P style={{ margin: "0 0 8px" }}>
              <Dorado>{e.tema}.</Dorado> {e.dice}
            </P>
            <P style={{ margin: 0 }}>{e.matiz}</P>
          </Evidencia>
        ))}
      </Seccion>

      <LineDivider />

      <Seccion titulo="Qué pasa en el cuerpo y en el cerebro">
        <P>
          Acá es donde más se exagera, así que cada punto viene con su propio límite al lado. Si
          alguna vez lees «la meditación reconfigura tu cerebro», lo que hay debajo es alguno de
          estos estudios contado sin el pero.
        </P>
        {EN_EL_CEREBRO.map((m) => (
          <div key={m.titulo} style={{ marginBottom: 20 }}>
            <SubLabel>{m.titulo}</SubLabel>
            <P>{m.dice}</P>
            <P>
              <Dorado>El pero:</Dorado> {m.pero}
            </P>
            <P style={{ fontSize: "0.82rem", opacity: 0.6, margin: 0 }}>{m.fuente}</P>
          </div>
        ))}
      </Seccion>

      <LineDivider />

      <Seccion titulo="Cuándo tener cuidado">
        <WarnBox title="Esto sí tiene efectos no deseados">
          <P>{RIESGOS.intro}</P>
          <P>{RIESGOS.hallazgo}</P>
          <P style={{ fontSize: "0.82rem", opacity: 0.65, margin: 0 }}>{RIESGOS.fuente}</P>
        </WarnBox>
        <SubLabel>En qué casos</SubLabel>
        {RIESGOS.cuidado.map((c) => (
          <P key={c.slice(0, 20)}>{c}</P>
        ))}
        <SubLabel>Qué hacer siempre</SubLabel>
        {RIESGOS.reglas.map((r) => (
          <P key={r.slice(0, 20)}>{r}</P>
        ))}
      </Seccion>

      <LineDivider />

      <Seccion titulo="Lo que se repite y no es verdad">
        <Acordeones
          items={MITOS.map((m, i) => ({
            id: `mito-${i}`,
            title: m.mito,
            contenido: <P style={{ margin: 0 }}>{m.realidad}</P>,
          }))}
        />
      </Seccion>

      <LineDivider />

      <Seccion titulo="Ocho semanas, si quieres un plan">
        <P>{POR_QUE_OCHO_SEMANAS}</P>
        <MiniTable
          headers={["Cuándo", "Qué", "Cuánto"]}
          rows={PROGRAMA.map((e) => [
            e.semanas,
            <>
              <Dorado>{e.tecnica}.</Dorado> {e.que}
            </>,
            e.minutos,
          ])}
        />
        <GreenBox title="Y después">
          <P style={{ margin: 0 }}>
            Cada práctica que hagas en{" "}
            <Link prefetch={false} href="/meditacion" style={ENLACE}>
              la app
            </Link>{" "}
            queda anotada junto a las pausas de Hábitos, así que a las ocho semanas decides con el
            registro delante y no con la sensación de un martes malo.
          </P>
        </GreenBox>
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

      <LineDivider />

      <Seccion titulo="Sobre la música">
        <P>{SOBRE_LA_MUSICA}</P>
        <P>
          En la app hay seis paisajes —mar, río, lluvia, bosque, piano y un tono sostenido— y todos
          se generan en vivo en el propio teléfono, sin descargar nada.{" "}
          <Link prefetch={false} href="/meditacion" style={ENLACE}>
            Ir a la práctica
          </Link>
          .
        </P>
      </Seccion>
    </PaginaBiblioteca>
  );
}

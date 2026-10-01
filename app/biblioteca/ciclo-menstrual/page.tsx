"use client";

import Link from "next/link";
import {
  Acordeones,
  Check,
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
import { CurvasHormonas } from "@/components/ciclo/CurvasHormonas";
import {
  AYUDAS,
  CONSULTAR,
  DATOS_DEL_CICLO,
  DESORDENES,
  DISRUPTORES,
  DISRUPTORES_EVIDENCIA,
  DISRUPTORES_QUE_HACER,
  DISRUPTORES_QUE_SON,
  EN_UNA_LINEA,
  ETAPAS_DE_LA_VIDA,
  FASES,
  FUENTES,
  LO_NORMAL,
  MITOS,
  POR_ETAPA,
  PREGUNTAS,
  QUE_ES,
  SOBRE_EL_DESBALANCE,
} from "@/lib/ciclo/ciencia";

/* La teoría del ciclo menstrual.

   Es el terreno donde más se vende —tests de hormonas, «detox», planes para
   «equilibrar» — y por eso la regla es la misma de los hipopresivos: cada
   afirmación sale de una guía clínica o de una revisión publicada, y lo que
   no se sostiene se dice. El texto vive en lib/ciclo/ciencia.ts, que también
   usa la app. */

const ENLACE = { color: "#e8c878", textDecorationColor: "rgba(200,160,80,0.5)" };

const GRADO_PIEZA = {
  probado: "Bien respaldado",
  prometedor: "Prometedor",
  debil: "Evidencia débil",
  tradicion: "No se confirmó",
} as const;

export default function BibliotecaCiclo() {
  return (
    <PaginaBiblioteca
      id="ciclo-menstrual"
      titulo="El ciclo menstrual"
      fondo={["/fondo_ciclo.webp", "/fondo_ciclo.png", "/fondo_ciclo.jpg"]}
      bajada="Las hormonas mes a mes y a lo largo de la vida, qué es normal, qué ayuda y cuándo consultar"
    >
      <Seccion titulo="Qué es">
        <InfoBox title="En una línea">
          <P>{EN_UNA_LINEA}</P>
        </InfoBox>
        {QUE_ES.map((p) => (
          <P key={p.slice(0, 24)}>{p}</P>
        ))}
      </Seccion>

      <LineDivider />

      <Seccion titulo="Las hormonas, fase por fase">
        <CurvasHormonas />
        {FASES.map((f) => (
          <div key={f.id} style={{ marginBottom: 20 }}>
            <SubLabel>{f.nombre}</SubLabel>
            <P style={{ fontStyle: "italic", opacity: 0.8 }}>{f.cuando}</P>
            <P>
              <Dorado>Las hormonas:</Dorado> {f.hormonas}
            </P>
            <P>
              <Dorado>En el cuerpo:</Dorado> {f.cuerpo}
            </P>
          </div>
        ))}
      </Seccion>

      <LineDivider />

      <Seccion titulo="Qué es normal">
        <MiniTable
          headers={["", "Adulta", "Primeros años"]}
          rows={LO_NORMAL.map((n) => [<Dorado key={n.que}>{n.que}</Dorado>, n.adulta, n.adolescente])}
        />
        <SubLabel>Lo que muestran los números grandes</SubLabel>
        {DATOS_DEL_CICLO.map((d) => (
          <Check key={d.slice(0, 20)} mark="·">
            {d}
          </Check>
        ))}
      </Seccion>

      <LineDivider />

      <Seccion titulo="A lo largo de la vida">
        <P>
          Las hormonas no solo cambian dentro de cada mes: cambian, y mucho, de una etapa de la vida a otra.
          Las etapas siguen el sistema STRAW+10, el que usan los especialistas para ubicar a una mujer en su
          vida reproductiva. Para casi todas, el mejor indicador no es un examen: es el ritmo de la menstruación.
        </P>
        {ETAPAS_DE_LA_VIDA.map((e) => (
          <div key={e.etapa} style={{ marginBottom: 20 }}>
            <SubLabel>{e.etapa}</SubLabel>
            <P style={{ fontStyle: "italic", opacity: 0.8 }}>{e.edad}</P>
            <P>
              <Dorado>Las hormonas:</Dorado> {e.hormonas}
            </P>
            <P>
              <Dorado>Lo que se nota:</Dorado> {e.que_se_nota}
            </P>
          </div>
        ))}
      </Seccion>

      <LineDivider />

      <Seccion titulo="Cuando algo se desordena">
        {SOBRE_EL_DESBALANCE.map((p) => (
          <P key={p.slice(0, 24)}>{p}</P>
        ))}
        <Acordeones
          items={DESORDENES.map((d, i) => ({
            id: `desorden-${i}`,
            title: d.nombre,
            contenido: (
              <>
                <P>
                  <Dorado>Las señales:</Dorado> {d.senales}
                </P>
                <P>
                  <Dorado>Qué es:</Dorado> {d.que_es}
                </P>
                <P>
                  <Dorado>Qué se puede hacer:</Dorado> {d.que_hacer}
                </P>
                <P style={{ fontSize: "0.82rem", opacity: 0.6, margin: 0 }}>{d.fuente}</P>
              </>
            ),
          }))}
        />
      </Seccion>

      <LineDivider />

      <Seccion titulo="Lo que ayuda: comida y hábitos">
        <P>
          Cada ficha dice lo que se puede afirmar, <Dorado>el pero que siempre hay</Dorado>, y de dónde sale.
        </P>
        {AYUDAS.map((e) => (
          <Evidencia key={e.tema} grado={GRADO_PIEZA[e.grado]} fuente={e.fuente}>
            <P style={{ margin: "0 0 8px" }}>
              <Dorado>{e.tema}.</Dorado> {e.dice}
            </P>
            <P style={{ margin: 0 }}>{e.matiz}</P>
          </Evidencia>
        ))}
        <SubLabel>Según la etapa de la vida</SubLabel>
        <MiniTable
          headers={["Etapa", "Lo que más cuenta"]}
          rows={POR_ETAPA.map((e) => [
            <Dorado key={e.etapa}>{e.etapa}</Dorado>,
            <ul key={`${e.etapa}-l`} style={{ margin: 0, paddingLeft: "1.1rem" }}>
              {e.consejos.map((c) => (
                <li key={c.slice(0, 20)} style={{ marginBottom: 4 }}>
                  {c}
                </li>
              ))}
            </ul>,
          ])}
        />
      </Seccion>

      <LineDivider />

      <Seccion titulo="Disruptores endocrinos">
        {DISRUPTORES_QUE_SON.map((p) => (
          <P key={p.slice(0, 24)}>{p}</P>
        ))}
        <MiniTable headers={["Cuáles", "Dónde están"]} rows={DISRUPTORES.map((d) => [<Dorado key={d.nombre}>{d.nombre}</Dorado>, d.donde])} />
        {DISRUPTORES_EVIDENCIA.map((e) => (
          <Evidencia key={e.tema} grado={GRADO_PIEZA[e.grado]} fuente={e.fuente}>
            <P style={{ margin: "0 0 8px" }}>
              <Dorado>{e.tema}.</Dorado> {e.dice}
            </P>
            <P style={{ margin: 0 }}>{e.matiz}</P>
          </Evidencia>
        ))}
        <GreenBox title="Lo que está en tus manos">
          {DISRUPTORES_QUE_HACER.map((d) => (
            <Check key={d.slice(0, 20)}>{d}</Check>
          ))}
          <P style={{ margin: "10px 0 0", fontSize: "0.9rem", opacity: 0.85 }}>
            No hace falta hacerlo todo ni vivir con miedo: la exposición cero no existe. Cada cambio baja un poco
            la carga, y los que más rinden son los de todos los días: cómo guardas y calientas la comida y qué te
            pones en la piel.
          </P>
        </GreenBox>
      </Seccion>

      <LineDivider />

      <Seccion titulo="Cuándo consultar">
        <WarnBox title="Estas señales se conversan con un profesional">
          {CONSULTAR.map((c) => (
            <Check key={c.slice(0, 20)} mark="!">
              {c}
            </Check>
          ))}
        </WarnBox>
      </Seccion>

      <LineDivider />

      <Seccion titulo="Los mitos">
        <Acordeones
          items={MITOS.map((m, i) => ({
            id: `mito-${i}`,
            title: m.mito,
            contenido: <P style={{ margin: 0 }}>{m.realidad}</P>,
          }))}
        />
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

      <Seccion titulo="Las fuentes">
        <P>
          Guías clínicas de sociedades médicas, revisiones sistemáticas y estudios grandes publicados en
          revistas con revisión por pares.
        </P>
        <ul style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.86rem", lineHeight: 1.7, color: "rgba(212,196,160,0.72)" }}>
          {FUENTES.map((f) => (
            <li key={f.slice(0, 30)} style={{ marginBottom: 4 }}>
              {f}
            </li>
          ))}
        </ul>
      </Seccion>

      <Seccion titulo="Y ahora">
        <GreenBox>
          <P style={{ margin: 0 }}>
            En la app puedes anotar tus menstruaciones y cómo te sientes cada día. Te dice en qué fase estás, cuándo
            esperar la próxima menstruación y qué ayuda según tu etapa, y te avisa si algo de tu registro merece una
            consulta. Todo queda guardado solo en tu teléfono.{" "}
            <Link prefetch={false} href="/ciclo" style={ENLACE}>
              Ir a la app
            </Link>
            .
          </P>
        </GreenBox>
        <P style={{ fontSize: "0.85rem", opacity: 0.7, marginTop: 14 }}>
          Esta página es para entender tu cuerpo, no para diagnosticar ni reemplazar una consulta.
        </P>
      </Seccion>
    </PaginaBiblioteca>
  );
}

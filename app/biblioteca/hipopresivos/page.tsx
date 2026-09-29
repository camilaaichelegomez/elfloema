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
  EN_UNA_LINEA,
  LA_DOSIS,
  MITOS,
  PASOS_DE_LA_TECNICA,
  PREGUNTAS,
  PRUEBAS,
  QUE_ES,
  QUE_PASA,
  SEGURIDAD,
} from "@/lib/hipopresivos/ciencia";
import { NIVELES, POSTURAS } from "@/lib/hipopresivos/practica";

/* La teoría de los hipopresivos.

   Es un terreno donde se promete mucho —cintura, diástasis, «suben los
   órganos»— y se estudió menos. Por eso aquí cada afirmación de eficacia
   lleva grado y referencia, y lo que no se sostuvo al medirlo se dice. Las
   fuentes son solo revisiones sistemáticas y ensayos publicados en revistas
   con revisión por pares. */

const ENLACE = { color: "#e8c878", textDecorationColor: "rgba(200,160,80,0.5)" };

const GRADO_PIEZA = {
  probado: "Bien respaldado",
  prometedor: "Prometedor",
  debil: "Evidencia débil",
  tradicion: "No se confirmó",
} as const;

const NOMBRE_NIVEL = Object.fromEntries(NIVELES.map((n) => [n.id, n.label]));

export default function BibliotecaHipopresivos() {
  return (
    <PaginaBiblioteca
      id="hipopresivos"
      titulo="Hipopresivos"
      fondo="/fondo_hipopresivos.webp"
      bajada="Qué son, qué está probado, qué no, y cuándo no se hacen"
    >
      <Seccion titulo="Qué son">
        <InfoBox title="En una línea">
          <P>{EN_UNA_LINEA}</P>
        </InfoBox>
        {QUE_ES.map((p) => (
          <P key={p.slice(0, 24)}>{p}</P>
        ))}
      </Seccion>

      <LineDivider />

      <Seccion titulo="Cómo se hacen">
        <MiniTable headers={["Paso", "Cómo"]} rows={PASOS_DE_LA_TECNICA.map((p) => [<Dorado key={p.paso}>{p.paso}</Dorado>, p.como])} />
        <P>
          Se repite tres veces en cada postura. Las posturas van de las más fáciles (acostada, sentada,
          de pie) a las que piden más equilibrio:
        </P>
        <MiniTable
          headers={["Postura", "Desde el nivel"]}
          rows={POSTURAS.map((p) => [p.nombre, NOMBRE_NIVEL[p.nivel]])}
        />
        <P>
          La práctica guiada, con el ritmo de la respiración y la pausa marcados por la app, está en{" "}
          <Link prefetch={false} href="/hipopresivos" style={ENLACE}>
            la app
          </Link>
          .
        </P>
      </Seccion>

      <LineDivider />

      <Seccion titulo="Qué pasa en el cuerpo">
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
          Cada ficha dice lo que se puede afirmar, <Dorado>el pero que siempre hay</Dorado>, y de dónde
          sale. Solo revisiones sistemáticas y ensayos publicados en revistas científicas: nada de
          páginas de quienes venden cursos de la técnica.
        </P>
        {PRUEBAS.map((e) => (
          <Evidencia key={e.tema} grado={GRADO_PIEZA[e.grado]} fuente={e.fuente}>
            <P style={{ margin: "0 0 8px" }}>
              <Dorado>{e.tema}.</Dorado> {e.dice}
            </P>
            <P style={{ margin: 0 }}>{e.matiz}</P>
          </Evidencia>
        ))}
        <GreenBox title="En resumen">
          <P style={{ margin: 0 }}>
            Sirven para los síntomas del suelo pélvico y para el dolor lumbar, y a mucha gente le
            resultan agradables y fáciles de sostener. Pero para ganar fuerza en el suelo pélvico, los
            ejercicios de suelo pélvico hechos a propósito siguen siendo la primera opción. Lo mejor es
            verlos como un complemento, no como el tratamiento.
          </P>
        </GreenBox>
      </Seccion>

      <LineDivider />

      <Seccion titulo="La dosis, en números">
        <MiniTable
          headers={["Qué", "Cuánto", "Por qué"]}
          rows={LA_DOSIS.map((d) => [d.que, <Dorado key={d.que}>{d.cuanto}</Dorado>, d.porQue])}
        />
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

      <Seccion titulo="Seguridad">
        <P>{SEGURIDAD.intro}</P>
        <SubLabel>Reglas que valen siempre</SubLabel>
        {SEGURIDAD.reglas.map((r) => (
          <P key={r.slice(0, 20)}>{r}</P>
        ))}
        <InfoBox title="Sin la pausa sin aire">
          {SEGURIDAD.sinPausa.map((c) => (
            <P key={c.slice(0, 20)}>{c}</P>
          ))}
        </InfoBox>
        <WarnBox title="Esto se conversa antes">
          {SEGURIDAD.esperar.map((c) => (
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
            La práctica te guía con la voz y un círculo que respira contigo, parte con un chequeo de
            seguridad y sube de nivel cuando la técnica ya te sale.{" "}
            <Link prefetch={false} href="/hipopresivos" style={ENLACE}>
              Ir a la práctica
            </Link>
            .
          </P>
        </GreenBox>
      </Seccion>
    </PaginaBiblioteca>
  );
}

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
import { ColumnaChakras } from "@/components/biblioteca/ColumnaChakras";
import {
  CHAKRAS,
  COMO_USARLO,
  CUIDADO,
  EL_CANAL,
  EN_UNA_LINEA,
  FUENTE_CUIDADO,
  HISTORIA,
  LO_QUE_SI,
  MITOS,
  NADIS,
  QUE_SIGNIFICA_LA_PALABRA,
} from "@/lib/chakras/tradicion";

/* Los chakras, enteros y honestos.

   Es la sección donde más fácil sería mentir, así que es donde más cuidado
   hay que tener: va completa —los siete, con todo lo que la tradición les
   atribuye— pero nombrando en todo momento que es tradición y no anatomía.

   Las dos cosas que todo el mundo repite y son falsas (las glándulas y los
   colores del arcoíris) tienen su propia sección, con fecha y autor. */

const ENLACE = { color: "#e8c878", textDecorationColor: "rgba(200,160,80,0.5)" };

export default function BibliotecaChakras() {
  return (
    <PaginaBiblioteca
      id="chakras"
      titulo="Los chakras"
      fondo="/fondo_chakras.webp"
      bajada="Qué dice la tradición, de dónde viene de verdad y qué le toca a cada uno"
    >
      <Seccion titulo="Qué son, en realidad">
        <InfoBox title="En una línea">
          <P>{EN_UNA_LINEA}</P>
        </InfoBox>
        <P>{QUE_SIGNIFICA_LA_PALABRA}</P>
        <Tradicion>
          Todo lo que sigue es un sistema simbólico con siglos de elaboración, no una descripción del
          cuerpo. Está escrito completo y en serio porque vale la pena conocerlo — pero nada de esto se
          ha observado ni medido, y en esta página no se va a decir lo contrario.
        </Tradicion>
      </Seccion>

      <LineDivider />

      <Seccion titulo="Dónde está cada uno">
        <ColumnaChakras />
        <P>{EL_CANAL}</P>
        <SubLabel>Los tres canales</SubLabel>
        <MiniTable
          headers={["Canal", "Dónde", "Qué se le asocia"]}
          rows={NADIS.map((n) => [<Dorado key={n.nombre}>{n.nombre}</Dorado>, n.donde, n.que])}
        />
      </Seccion>

      <LineDivider />

      <Seccion titulo="Los siete, uno por uno">
        <P>
          De cada uno: dónde lo ubica la tradición, qué elemento y qué sílaba le corresponden, y —lo que
          importa— <Dorado>qué se le atribuye</Dorado>. Fijate que el color clásico casi nunca es el que
          hoy se usa: eso se explica más abajo.
        </P>
        <Acordeones
          items={CHAKRAS.map((c) => ({
            id: c.id,
            title: `${c.nombre} · ${c.sanscrito}`,
            contenido: (
              <>
                <P style={{ margin: "0 0 12px", fontStyle: "italic", color: "rgba(212,196,160,0.7)" }}>
                  {c.significado}
                </P>
                <MiniTable
                  headers={["Dato", "Según la tradición"]}
                  rows={[
                    ["Dónde", c.donde],
                    ["Pétalos", c.petalos],
                    ["Elemento", c.elemento],
                    ["Sílaba (bīja)", c.bija],
                    ["Color en el texto clásico", c.colorClasico],
                    ["Color en el esquema moderno", c.colorModerno],
                  ]}
                />
                <SubLabel>Qué se le atribuye</SubLabel>
                <P>{c.seLeAtribuye}</P>
                <SubLabel>Cómo se nota en el día a día</SubLabel>
                <P>{c.enLaPractica}</P>
                <SubLabel>Cuando cuesta</SubLabel>
                <P style={{ margin: 0 }}>{c.cuandoCuesta}</P>
              </>
            ),
          }))}
        />
      </Seccion>

      <LineDivider />

      <Seccion titulo="De dónde vienen de verdad">
        <P>
          Esta parte casi nunca se cuenta, y es la que más cambia cómo se lee todo lo demás. El sistema
          que hoy circula no es milenario: se armó por capas, y las dos capas más reconocibles son del
          siglo XX.
        </P>
        {HISTORIA.map((h) => (
          <div key={h.cuando} style={{ marginBottom: "16px" }}>
            <SubLabel>
              {h.cuando} · {h.que}
            </SubLabel>
            <P style={{ margin: 0 }}>{h.dice}</P>
          </div>
        ))}
      </Seccion>

      <LineDivider />

      <Seccion titulo="Lo que se repite y no es cierto">
        {MITOS.map((m) => (
          <div key={m.dice} style={{ marginBottom: "16px" }}>
            <P style={{ margin: "0 0 5px", color: "rgba(221,148,100,0.9)" }}>«{m.dice}»</P>
            <P style={{ margin: 0 }}>{m.realidad}</P>
          </div>
        ))}
      </Seccion>

      <LineDivider />

      <Seccion titulo="Qué sí está estudiado">
        <P>
          Alrededor de los chakras se practican cosas que sí se han investigado: respirar lento, sostener
          la atención, cantar. Lo que está probado es eso, no el mapa.
        </P>
        {LO_QUE_SI.map((e) => (
          <Evidencia key={e.tema} grado={e.grado} fuente={e.fuente}>
            <P style={{ margin: "0 0 8px" }}>
              <Dorado>{e.tema}.</Dorado> {e.dice}
            </P>
            <P style={{ margin: 0 }}>{e.matiz}</P>
          </Evidencia>
        ))}
      </Seccion>

      <LineDivider />

      <Seccion titulo="Cómo usarlo sin mentirse">
        <GreenBox title="Un mapa de la atención">
          <P style={{ margin: 0 }}>{COMO_USARLO}</P>
        </GreenBox>
        <P>
          Si querés practicarlo, en{" "}
          <Link href="/meditacion" style={ENLACE}>
            la app de meditación
          </Link>{" "}
          está el recorrido por el cuerpo, que es la misma idea sin el vocabulario: llevar la atención de
          abajo hacia arriba, parte por parte. Y en{" "}
          <Link href="/biblioteca/meditacion" style={ENLACE}>
            la teoría de la meditación
          </Link>{" "}
          está qué pasa cuando una sostiene la atención, con lo que se midió.
        </P>
      </Seccion>

      <LineDivider />

      <Seccion titulo="Cuándo tener cuidado">
        <WarnBox title="Esto sí importa">
          <P style={{ margin: "0 0 8px" }}>{CUIDADO}</P>
          <P style={{ margin: 0, fontSize: "0.82rem", fontStyle: "italic", color: "rgba(212,196,160,0.5)" }}>
            {FUENTE_CUIDADO}
          </P>
        </WarnBox>
      </Seccion>
    </PaginaBiblioteca>
  );
}

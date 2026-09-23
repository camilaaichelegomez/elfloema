"use client";

import Link from "next/link";
import { EsquemaLinfangion } from "@/components/biblioteca/Esquemas";
import { ESTILO_LAMINA, LaminaAnotada } from "@/components/biblioteca/LaminaAnotada";
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
  Tradicion,
  WarnBox,
} from "@/components/biblioteca/Piezas";

/* El sistema linfático y el drenaje manual en todo el cuerpo: cómo funciona,
   por qué la dirección importa, qué dicen los estudios y qué no, y la
   secuencia para hacerlo en casa.

   Regla de la casa: el drenaje no «elimina toxinas». Mueve líquido. Eso es
   suficiente y es verdad. */

const ENLACE = { color: "#e8c878", textDecorationColor: "rgba(200,160,80,0.5)" };

export default function DrenajeLinfatico() {
  return (
    <PaginaBiblioteca
      id="drenaje"
      titulo="Drenaje linfático del cuerpo"
      fondo="/fondo_drenaje.jpg"
      bajada="Un sistema sin bomba: se mueve porque tú te mueves"
    >
      <Seccion titulo="Qué es la linfa">
        <P>
          La sangre llega a los tejidos por los capilares y ahí deja parte de su líquido. Casi todo
          vuelve a la vena, pero cada día quedan afuera entre <Dorado>dos y cuatro litros</Dorado> de
          líquido con proteínas, grasas y desechos celulares que son demasiado grandes para volver por
          donde vinieron. Ese líquido es la <Dorado>linfa</Dorado>, y el sistema linfático es la vía de
          servicio que lo devuelve a la circulación.
        </P>
        <SubLabel>Tres trabajos a la vez</SubLabel>
        <Check>
          <Dorado>Drena</Dorado> el líquido y las proteínas que la vena no puede llevarse. Sin eso, el
          tejido se hincha.
        </Check>
        <Check>
          <Dorado>Defiende</Dorado>: la linfa pasa por los ganglios, donde los linfocitos revisan lo que
          viene. Por eso se te inflaman los ganglios del cuello cuando estás con amigdalitis.
        </Check>
        <Check>
          <Dorado>Transporta grasas</Dorado>: los quilíferos del intestino recogen las grasas de la
          comida y las mandan por esta vía, no por la sangre.
        </Check>
      </Seccion>

      <Seccion titulo="La cañería, de la punta al final">
        <MiniTable
          headers={["Parte", "Cómo es", "Qué hace"]}
          rows={[
            [
              "Capilares linfáticos",
              "Tubitos ciegos, de una sola capa de células, con filamentos que los amarran al tejido de alrededor.",
              "Recogen. Cuando el tejido se hincha, los filamentos tiran y abren las células como persianas: por ahí entra el líquido.",
            ],
            [
              "Precolectores y colectores",
              "Vasos con válvulas cada pocos centímetros. El tramo entre dos válvulas se llama linfangión.",
              "Bombean. Cada linfangión tiene músculo liso propio y se contrae solo, entre 6 y 10 veces por minuto en reposo.",
            ],
            [
              "Ganglios",
              "Unos 600 en el cuerpo, en racimos: cuello, axilas, ingles, abdomen, detrás de la rodilla, codo.",
              "Filtran y activan la respuesta inmune. La linfa se detiene ahí antes de seguir.",
            ],
            [
              "Troncos y conducto torácico",
              "El conducto torácico es el colector grande: sube desde el abdomen (cisterna del quilo) hasta la base del cuello.",
              "Junta la linfa de las piernas, el abdomen, el brazo izquierdo y la mitad izquierda de la cabeza.",
            ],
            [
              "Ángulo venoso",
              "Donde la yugular se junta con la subclavia, detrás de las clavículas.",
              "La salida. Ahí la linfa vuelve a la sangre. Todo el drenaje va hacia ese punto.",
            ],
          ]}
        />
        <InfoBox title="Por qué todo termina en las clavículas">
          Porque ahí está la puerta. Da lo mismo en qué parte del cuerpo estés trabajando: el líquido
          tiene un solo lugar por donde volver a la sangre, y está debajo de las clavículas. Por eso
          cualquier secuencia de drenaje —de la cara, del brazo, de la pierna— empieza abriendo esa zona:
          es despejar la salida antes de empujar la fila.
        </InfoBox>
      </Seccion>

      <Seccion titulo="Por qué se mueve (y por qué se estanca)">
        <P>
          El sistema linfático <Dorado>no tiene un corazón</Dorado>. Se mueve por cuatro fuerzas que
          suman, y todas dependen de que hagas algo:
        </P>
        <Check>
          <Dorado>La contracción del propio vaso.</Dorado> El linfangión se aprieta solo y las válvulas
          impiden que el líquido vuelva atrás. Es la fuerza principal en reposo.
        </Check>
        <Check>
          <Dorado>La bomba muscular.</Dorado> Cada vez que un músculo se contrae, aprieta los vasos que
          pasan por dentro y empuja la linfa. Caminar es drenaje.
        </Check>
        <Check>
          <Dorado>La respiración.</Dorado> Al inspirar baja el diafragma: la presión dentro del tórax se
          hace negativa y la del abdomen positiva. Eso succiona la linfa hacia arriba por el conducto
          torácico.
        </Check>
        <Check>
          <Dorado>El pulso de las arterias vecinas</Dorado> y el movimiento de la piel, que es lo que
          aprovecha el masaje.
        </Check>
        <EsquemaLinfangion />

        <Evidencia
          grado="Bien respaldado"
          fuente="Revisión de la fisiología de la presión y el flujo del conducto torácico: la actividad respiratoria influyó en flujo y/o presión en 5 de 6 estudios humanos y 12 de 17 en animales. Copias y referencias en biblioteca-cientifica/drenaje_linfatico (129 referencias)."
        >
          Que la respiración mueva linfa no es una metáfora: se ha medido. Respirar con el diafragma,
          lento y profundo, acelera el flujo en el conducto torácico. Es la parte del drenaje que puedes
          hacer sin manos, acostada, y la que más gente se salta.
        </Evidencia>
        <GreenBox title="La respiración que sí drena">
          Acostada, una mano en el vientre. Inspira por la nariz cuatro tiempos dejando que el vientre
          suba; exhala seis u ocho tiempos dejándolo bajar. Diez respiraciones. Empieza siempre por aquí:
          estás abriendo la cañería grande antes de tocar nada.
        </GreenBox>
      </Seccion>

      <Seccion titulo="El drenaje manual: qué es de verdad">
        <P>
          El método clásico lo desarrollaron <Dorado>Emil y Estrid Vodder</Dorado> en los años treinta y
          es la base de lo que hoy se enseña. Cuatro cosas lo definen, y todas suelen hacerse mal en los
          videos de internet:
        </P>
        <MiniTable
          headers={["Regla", "Cómo es", "El error típico"]}
          rows={[
            [
              "Presión mínima",
              "Del orden de 30 a 40 mmHg: el peso de la mano, lo justo para mover la piel sobre lo que hay debajo.",
              "Apretar. Con más presión colapsas el capilar que querías llenar y estimulas la circulación de la sangre, no la linfa.",
            ],
            [
              "Piel seca",
              "Sin aceite ni crema: los dedos tienen que agarrar la piel y llevarla, no resbalar.",
              "Hacerlo con aceite. Eso ya no es drenaje: es masaje de deslizamiento, que también sirve, pero para otra cosa.",
            ],
            [
              "Lento y rítmico",
              "Alrededor de un círculo por segundo, y de cinco a siete repeticiones en cada punto.",
              "Ir rápido. El vaso se llena y se vacía a su ritmo; apurarlo no lo apura.",
            ],
            [
              "Primero la salida",
              "Se abre el cuello y las clavículas, después la zona cercana al tronco, y al final la parte lejana.",
              "Empezar por donde está hinchado. Es empujar agua hacia un desagüe tapado.",
            ],
          ]}
        />
        <Tradicion>
          «El drenaje elimina toxinas» es la frase que vende, y no es lo que pasa. Quien filtra y elimina
          son el hígado y los riñones. Lo que hace el drenaje es <Dorado>mover líquido</Dorado> desde
          donde se acumuló hacia donde puede volver a la sangre. Eso baja hinchazón y da sensación de
          liviandad: es suficiente, y es cierto.
        </Tradicion>
      </Seccion>

      <Seccion titulo="El bombeo de los ganglios (eso de «darse golpecitos»)">
        <P>
          Sobre los racimos de ganglios no se hacen círculos: se hace <Dorado>bombeo</Dorado>. La mano
          entera apoyada, se hunde apenas al exhalar y se suelta del todo al inhalar, entre cinco y siete
          veces. Soltar es tan importante como apretar: el vaso se llena cuando aflojas.
        </P>
        <WarnBox title="No son golpes">
          Circula la idea de «darse golpecitos» para activar el drenaje. La maniobra real es un bombeo
          suave y lento, no percusión. Golpetear fuerte sobre un ganglio no lo vacía más rápido y, si hay
          un ganglio inflamado, lo irrita. Si la piel queda roja, te pasaste de presión.
        </WarnBox>
        <LaminaAnotada
          num="I"
          titulo="Dónde están los racimos de ganglios"
          src="/biblioteca/cuerpo/ganglios-cuerpo.jpg"
          prompt={
            "A calm woman standing facing forward, arms relaxed and held slightly away from the body, " +
            "palms open, feet together, simple fitted clothing, full body from head to feet, perfectly " +
            "symmetric and centred, plain dark background. " + ESTILO_LAMINA
          }
          puntos={[
            { x: 44, y: 21, texto: "Supraclaviculares — el hueco sobre la clavícula. Es la salida: por ahí la linfa vuelve a la sangre, y por eso se abre siempre primero." },
            { x: 32, y: 29, texto: "Axilares — reciben el brazo, el pecho y la espalda alta de ese lado." },
            { x: 25, y: 43, texto: "Cubitales — en la cara interna del codo; reciben antebrazo y mano." },
            { x: 42, y: 55, texto: "Inguinales — en el pliegue de la ingle; reciben la pierna entera, el glúteo y el bajo vientre." },
            { x: 43, y: 72, texto: "Poplíteos — detrás de la rodilla; reciben pantorrilla, tobillo y pie." },
            { x: 55, y: 45, texto: "Abdomen y conducto torácico — no se tocan con las manos: se mueven respirando con el diafragma." },
          ]}
          flechas={[
            { d: "M 27 40 Q 30 34 33 31", color: "verde" },
            { d: "M 33 27 Q 39 23 43 22", color: "verde" },
            { d: "M 43 68 Q 42 62 42 57", color: "verde" },
            { d: "M 43 52 Q 45 40 46 25", color: "verde" },
          ]}
          leyenda="Las flechas verdes son el camino de la linfa: siempre hacia la clavícula."
        />

        <SubLabel>Los seis lugares que conviene conocer</SubLabel>
        <MiniTable
          headers={["Racimo", "Dónde está", "A quién sirve"]}
          rows={[
            ["Supraclavicular (el «terminus»)", "El hueco justo arriba de la clavícula", "La salida final de todo. Siempre primero."],
            ["Cervical", "A los lados del cuello, bajo la mandíbula y por delante del músculo largo del cuello", "Cara, cabeza y cuello"],
            ["Axilar", "En el hueco de la axila, con el brazo relajado", "Brazo, pecho y espalda alta de ese lado"],
            ["Cubital", "En la cara interna del codo", "Antebrazo y mano"],
            ["Inguinal", "En el pliegue de la ingle", "Pierna entera, glúteo y bajo vientre"],
            ["Poplíteo", "Detrás de la rodilla", "Pantorrilla, tobillo y pie"],
          ]}
        />
        <InfoBox title="La regla de la mitad">
          El cuerpo se drena por cuadrantes: cada zona va al racimo que le toca, y una línea imaginaria
          por el medio del cuerpo y otra a la altura del ombligo separan los territorios. Por eso el brazo
          derecho va a la axila derecha y la pierna izquierda a la ingle izquierda: no se cruza el líquido
          de lado a lado sin necesidad.
        </InfoBox>
      </Seccion>

      <Seccion titulo="Secuencia para el cuerpo entero, en casa">
        <P>
          Doce a quince minutos, piel seca, sin apuro. El orden no es decorativo: cada paso abre el camino
          del siguiente.
        </P>
        <Acordeones
          items={[
            {
              id: "s1",
              title: "1 · Abrir la salida (2 min)",
              contenido: (
                <>
                  <P>
                    Acostada o sentada. Dedos planos en el hueco de arriba de la clavícula. Bombeo suave
                    hacia adentro y abajo, 7 veces de cada lado. Después, con las dos manos planas a los
                    lados del cuello, círculos lentos hacia abajo, 7 veces.
                  </P>
                  <P style={{ marginBottom: 0 }}>Este paso va siempre. Es abrir la puerta.</P>
                </>
              ),
            },
            {
              id: "s2",
              title: "2 · Respiración diafragmática (2 min)",
              contenido: (
                <P style={{ marginBottom: 0 }}>
                  Diez respiraciones lentas con el vientre, como arriba. Mueve la parte del sistema que las
                  manos no alcanzan: la del abdomen y el tórax.
                </P>
              ),
            },
            {
              id: "s3",
              title: "3 · Axilas y brazos (3 min)",
              contenido: (
                <>
                  <P>Bombeo en la axila, 7 veces. Luego, con la mano plana:</P>
                  <Check mark="·">Del codo al hombro, movimientos lentos hacia la axila, 7 veces.</Check>
                  <Check mark="·">Bombeo en la cara interna del codo, 7 veces.</Check>
                  <Check mark="·">De la muñeca al codo, hacia arriba, 7 veces.</Check>
                  <P style={{ marginBottom: 0 }}>Cambia de brazo. Siempre de lo cercano al tronco hacia lo lejano.</P>
                </>
              ),
            },
            {
              id: "s4",
              title: "4 · Abdomen (2 min)",
              contenido: (
                <P style={{ marginBottom: 0 }}>
                  Acostada con las rodillas dobladas. Mano plana sobre el vientre, círculos amplios en el
                  sentido del reloj, siguiendo el recorrido del intestino, sin hundir. Acompaña con la
                  respiración. Se salta si hay embarazo, menstruación con dolor fuerte, cirugía reciente o
                  molestia.
                </P>
              ),
            },
            {
              id: "s5",
              title: "5 · Ingles y piernas (4 min)",
              contenido: (
                <>
                  <P>Bombeo en el pliegue de la ingle, 7 veces de cada lado. Después:</P>
                  <Check mark="·">Del muslo hacia la ingle, mano plana, 7 veces por cara.</Check>
                  <Check mark="·">Bombeo detrás de la rodilla, 7 veces.</Check>
                  <Check mark="·">De la pantorrilla hacia la rodilla, 7 veces.</Check>
                  <Check mark="·">Del pie al tobillo y del tobillo hacia arriba, 7 veces.</Check>
                </>
              ),
            },
            {
              id: "s6",
              title: "6 · Cerrar (2 min)",
              contenido: (
                <P style={{ marginBottom: 0 }}>
                  Vuelve a las clavículas: bombeo suave, 7 veces. Después, piernas apoyadas en la pared
                  cinco minutos, si puedes. Bebe agua —no porque «arrastre toxinas», sino porque el líquido
                  que movilizaste se elimina por el riñón y conviene estar bien hidratada.
                </P>
              ),
            },
          ]}
        />
      </Seccion>

      <Seccion titulo="¿Y saltar? ¿Y el trampolín?">
        <P>
          La idea circula por todos lados: saltar abre y cierra las válvulas linfáticas y «bombea» el
          sistema. La parte razonable es que <Dorado>cualquier movimiento mueve linfa</Dorado>, porque la
          bomba muscular es real y está medida. La parte exagerada es el trampolín como método privilegiado.
        </P>
        <Evidencia
          grado="Evidencia débil"
          fuente="Revisión de alcance sobre ejercicio en cama elástica en rehabilitación (2024) y literatura sobre bomba muscular y flujo linfático; discusión crítica de la Office for Science and Society, Universidad McGill."
        >
          No hay estudios que muestren que saltar en cama elástica mueva más linfa que otras formas de
          moverse. Lo que sí está respaldado es que el ejercicio —caminar, nadar, mover el tobillo, subir
          escaleras— aumenta el retorno linfático, y que en linfedema el ejercicio bien dosificado forma
          parte del tratamiento y no lo empeora, como se creía antes. Si te gusta saltar, salta: sirve
          porque es ejercicio, no porque sea mágico.
        </Evidencia>
        <GreenBox title="Lo que más mueve linfa, ordenado por lo que rinde">
          Caminar todos los días · respirar con el diafragma · mover tobillos y pantorrillas cada tanto si
          pasas mucho rato sentada · subir las piernas al final del día · dormir bien · y, si hay
          indicación médica, la compresión. El masaje manual viene después de todo eso, no antes.
        </GreenBox>
      </Seccion>

      <Seccion titulo="Qué dicen los estudios, sin adornos">
        <Evidencia
          grado="Prometedor"
          fuente="Revisiones sistemáticas y metaanálisis de drenaje linfático manual en linfedema tras cáncer de mama, y de terapia descongestiva compleja. En biblioteca-cientifica/drenaje_linfatico."
        >
          <Dorado>En linfedema</Dorado>, el tratamiento con respaldo es la terapia descongestiva completa:
          compresión, ejercicio, cuidado de la piel y educación. Agregarle drenaje manual da resultados
          dispares: varias revisiones concluyen que aporta poco sobre la compresión sola, mientras un
          metaanálisis reciente sí encuentra menor incidencia de linfedema con drenaje. Traducido: es un
          complemento razonable, no el tratamiento, y esto se maneja con un equipo de salud.
        </Evidencia>
        <Evidencia
          grado="Prometedor"
          fuente="Ensayos aleatorizados en la carpeta: drenaje manual comparado con masaje de tejido conectivo en migraña (2025); drenaje frente a relajación muscular progresiva en síndrome de piernas inquietas y calidad del sueño en hemodiálisis (2025); drenaje y masaje deportivo tras entrenamiento pliométrico excéntrico (2026)."
        >
          <Dorado>Fuera del linfedema</Dorado> hay ensayos pequeños con resultados favorables en dolor de
          cabeza, piernas inquietas, calidad del sueño y recuperación muscular después de entrenar. Son
          estudios chicos y difíciles de cegar, así que se leen como señales, no como certezas.
        </Evidencia>
        <Evidencia
          grado="No hay evidencia"
          fuente="Ninguna referencia de la biblioteca sostiene estas afirmaciones."
        >
          Que el drenaje «desintoxique», baje de peso, elimine celulitis de forma permanente o refuerce las
          defensas. La hinchazón que baja vuelve si vuelve la causa: sal, calor, estar mucho rato de pie o
          sentada, el ciclo, poco sueño.
        </Evidencia>
      </Seccion>

      <Seccion titulo="Cuándo no hacerlo">
        <WarnBox title="Contraindicaciones reales">
          La vía linfática también es una vía de propagación. Estas no son advertencias de trámite:
        </WarnBox>
        <Check mark="✗">Infección aguda, con o sin fiebre: el drenaje puede difundirla.</Check>
        <Check mark="✗">Insuficiencia cardíaca: devolver líquido de golpe a la circulación sobrecarga el corazón.</Check>
        <Check mark="✗">Trombosis o flebitis: ni encima ni en la zona vecina.</Check>
        <Check mark="✗">Cáncer activo o en tratamiento, sin indicación de tu equipo médico.</Check>
        <Check mark="✗">Alteración de la tiroides: no se trabaja la parte delantera del cuello.</Check>
        <Check mark="✗">Un ganglio abultado, duro o que no se mueve: eso se consulta, no se drena.</Check>
        <Check mark="✗">Presión muy baja: al terminar, levántate despacio.</Check>
        <P>
          Y lo de siempre: esto es cuidado cosmético y de bienestar. Si tienes una hinchazón que no baja,
          asimétrica, con dolor, calor o piel roja, eso se ve con una médica. No se estira ni se masajea.
        </P>
        <LineDivider />
        <P style={{ textAlign: "center", marginBottom: 0 }}>
          Para la cara, con su propio mapa y sus propias presiones:{" "}
          <Link href="/biblioteca/cara-drenaje-yoga-facial" style={ENLACE}>
            drenaje y yoga facial →
          </Link>
        </P>
      </Seccion>
    </PaginaBiblioteca>
  );
}

"use client";

import Link from "next/link";
import { ArcoDeClase } from "@/components/biblioteca/Esquemas";
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

/* La práctica: las familias de posturas, cómo se arma una clase, los tres
   hilos (postura, respiración y mirada) y lo que de verdad se sabe sobre
   lesiones. La mirada es la parte que faltaba explicada en la app. */

const ENLACE = { color: "#e8c878", textDecorationColor: "rgba(200,160,80,0.5)" };

export default function YogaPractica() {
  return (
    <PaginaBiblioteca
      id="yoga-practica"
      titulo="La práctica del yoga"
      fondo="/fondo_yoga_practica.jpg"
      bajada="Las posturas, la clase por dentro, y dónde va la mirada"
    >
      <Seccion titulo="Los tres hilos">
        <P>
          Una clase parece una sucesión de posturas. No lo es: son <Dorado>tres cosas trenzadas</Dorado>{" "}
          que ocurren a la vez. En la escuela de ashtanga se las llama <em>tristhāna</em>, «los tres
          lugares», y sirve como mapa para cualquier estilo.
        </P>
        <MiniTable
          headers={["Hilo", "Qué es", "Qué pasa si falta"]}
          rows={[
            [
              "Āsana — la postura",
              "Dónde van los huesos, qué se apoya, qué se alarga.",
              "Te lesionas, o la postura no hace lo que dice hacer.",
            ],
            [
              "Prāṇāyāma — la respiración",
              "Un ritmo sostenido, casi siempre por la nariz, que marca el movimiento.",
              "La práctica se vuelve gimnasia apurada y el sistema nervioso no baja.",
            ],
            [
              "Dṛṣṭi — la mirada",
              "Un punto fijo donde se posan los ojos en cada postura.",
              "El equilibrio se tambalea y la cabeza se va a otra parte. Es lo que casi nadie enseña.",
            ],
          ]}
        />
      </Seccion>

      <Seccion titulo="La mirada (dṛṣṭi)">
        <P>
          <Dorado>Dṛṣṭi</Dorado> quiere decir «vista» o «punto de mirada». La instrucción es simple:
          en cada postura los ojos se posan en un lugar y se quedan ahí, <Dorado>blandos, sin
          clavarlos</Dorado>. No es mirar fijo con intensidad: es dejar la mirada apoyada, como se apoya
          una mano.
        </P>
        <LaminaAnotada
          num="I"
          titulo="Los nueve puntos de la mirada"
          src="/biblioteca/cuerpo/nueve-drishtis.jpg"
          prompt={
            "A calm woman seated cross-legged on the floor, seen from the front, perfectly symmetric, " +
            "hands resting open on her knees, back long, eyes softly open, simple fitted clothing, full " +
            "figure from the top of the head to the crossed feet, plenty of empty space above the head. "
            + ESTILO_LAMINA
          }
          puntos={[
            { x: 50, y: 33, texto: "La punta de la nariz. Es la más usada: sirve en casi todas las posturas de pie y en el perro boca abajo." },
            { x: 50, y: 27, texto: "El entrecejo, en extensiones y aperturas de pecho." },
            { x: 50, y: 55, texto: "El ombligo, en el perro boca abajo de algunas escuelas." },
            { x: 32, y: 63, texto: "La mano, cuando un brazo está estirado: triángulo, guerrero II, torsiones abiertas." },
            { x: 50, y: 73, texto: "Los dedos de los pies, en pinzas y flexiones hacia adelante." },
            { x: 38, y: 11, texto: "Los pulgares, cuando los brazos van arriba: silla, guerrero I." },
            { x: 62, y: 11, texto: "Arriba, al cielo, en posturas de elevación." },
            { x: 78, y: 30, texto: "Hacia un lado, en la torsión hacia ese lado." },
            { x: 22, y: 30, texto: "Hacia el otro lado, en la torsión contraria." },
          ]}
          flechas={[
            { d: "M 50 28 L 50 16" },
            { d: "M 56 30 L 73 30" },
            { d: "M 44 30 L 27 30" },
          ]}
          leyenda="La mirada se apoya, no se clava: la cara queda blanda."
        />

        <SubLabel>Los nueve puntos clásicos</SubLabel>
        <MiniTable
          headers={["Punto", "Dónde", "Cuándo se usa"]}
          rows={[
            ["Nāsāgra", "La punta de la nariz", "Postura de pie, perro boca abajo, la mayoría del tiempo"],
            ["Bhrūmadhya", "El entrecejo", "Extensiones y posturas de pecho abierto"],
            ["Nābhi", "El ombligo", "Perro boca abajo en algunas escuelas"],
            ["Hastāgra", "La mano que se estira", "Triángulo, guerrero II, torsiones abiertas"],
            ["Pādayoragra", "Los dedos de los pies", "Pinzas y flexiones hacia adelante"],
            ["Aṅguṣṭhamadhya", "Los pulgares", "Brazos arriba: silla, guerrero I"],
            ["Ūrdhva / antara", "Arriba, al cielo", "Posturas de apertura y elevación"],
            ["Pārśva derecha", "Hacia la derecha", "Torsiones hacia ese lado"],
            ["Pārśva izquierda", "Hacia la izquierda", "Torsiones hacia ese lado"],
          ]}
        />
        <GreenBox title="La regla práctica, si no quieres memorizar nueve">
          En equilibrios, un punto <Dorado>fijo, a la altura de los ojos y a unos dos o tres metros</Dorado>,
          en el suelo o la pared, y no lo sueltas. En posturas con un brazo estirado, la mano. En las
          demás, hacia donde apunta el pecho. Y en savasana, los ojos cerrados.
        </GreenBox>
        <Evidencia
          grado="Bien respaldado"
          fuente="Literatura de control postural: cerrar los ojos aumenta el balanceo en ambos ejes, y las fijaciones de mirada sobre un punto estático lo reducen respecto de seguir un objeto en movimiento (estudios de posturografía y seguimiento ocular, revisados en la literatura de interacción visuo-vestibular)."
        >
          Que mirar un punto fijo mejore el equilibrio no es misticismo: es fisiología conocida. La
          postura de pie se sostiene con tres entradas —vista, oído interno y propiocepción—. Si cierras
          los ojos, el balanceo aumenta de inmediato. Y si en vez de fijar la vista la paseas por la
          sala, el sistema tiene que distinguir a cada rato si lo que se mueve es el mundo o tú, y el
          equilibrio se resiente. Un punto quieto le devuelve al cerebro una referencia quieta.
        </Evidencia>
        <Tradicion>
          Lo que la tradición agrega —y que ya no es fisiología— es que la mirada dirige la mente: donde
          se posan los ojos se posa la atención, y por eso dṛṣṭi es concentración (<em>dhāraṇā</em>)
          entrando por los ojos. Esa parte es del linaje, no del laboratorio, aunque cualquiera que lo
          pruebe en el árbol lo nota.
        </Tradicion>
        <InfoBox title="Tres errores comunes con la mirada">
          Mirarse en el espejo todo el rato (el ojo te corrige la postura, pero la cabeza se queda
          afuera). Mirar a la profesora en los equilibrios, que se mueve. Y apretar los ojos: la mirada
          se apoya, no se clava; la cara queda blanda.
        </InfoBox>
      </Seccion>

      <Seccion titulo="La respiración dentro de la postura">
        <P>
          La respiración es el termómetro: mientras puedas respirar largo y parejo, estás en tu rango.
          Cuando la respiración se corta, se agita o la retienes sin querer, <Dorado>te pasaste</Dorado>{" "}
          — no importa lo bonita que se vea la postura.
        </P>
        <SubLabel>La regla general del movimiento</SubLabel>
        <Check>
          <Dorado>Inhalas</Dorado> cuando el cuerpo se abre o se alarga: subir los brazos, abrir el
          pecho, estirar la columna.
        </Check>
        <Check>
          <Dorado>Exhalas</Dorado> cuando el cuerpo se pliega o se tuerce: bajar, doblar hacia adelante,
          entrar en torsión.
        </Check>
        <Check mark="·">
          En las posturas sostenidas: respiración normal por la nariz, cinco a diez ciclos, sin
          bloquearla.
        </Check>
        <SubLabel>Ujjayi, la respiración con sonido</SubLabel>
        <P>
          Se cierra un poco la garganta y el aire suena como el mar en una caracola. Sirve para tres
          cosas muy concretas: alarga la respiración, te da algo que escuchar (o sea, dṛṣṭi para el
          oído) y avisa al instante cuando la postura te está ganando, porque el sonido se quiebra.
        </P>
        <Evidencia
          grado="Prometedor"
          fuente="117 referencias en biblioteca-cientifica/yoga/pranayama, incluidos ensayos aleatorizados de respiración yóguica en hipertensión, estrés y ansiedad."
        >
          Respirar lento y largo (alrededor de seis ciclos por minuto) baja el estrés percibido y la
          ansiedad en ensayos, y hay señales en presión arterial. Lo que no se sostiene es la cascada de
          promesas sobre oxigenación de los tejidos o limpieza de toxinas: no es lo que pasa.
        </Evidencia>
        <WarnBox title="⚠ Retenciones">
          Las retenciones largas (kumbhaka) y las respiraciones muy rápidas (kapālabhāti, bhastrikā) no
          son para cualquiera ni para aprender sola con un video: se evitan en embarazo, presión alta no
          controlada, glaucoma, epilepsia, problemas cardíacos y crisis de pánico. Si te marea, no es
          «energía moviéndose»: es que te faltó o te sobró aire.
        </WarnBox>
      </Seccion>

      <Seccion titulo="Las familias de posturas">
        <P>
          Casi todas las posturas caen en una de estas nueve familias. Reconocer la familia te dice qué
          hace, qué cuidado pide y con qué se equilibra después.
        </P>
        <Acordeones
          items={[
            {
              id: "pie",
              title: "1 · De pie",
              contenido: (
                <>
                  <P>
                    Guerreros, triángulo, silla, media luna. Construyen fuerza de piernas y cadera,
                    despiertan y calientan. Son la columna vertebral de casi toda clase.
                  </P>
                  <SubLabel>Cuidado</SubLabel>
                  <Check mark="·">
                    La rodilla de adelante nunca pasa del tobillo, y apunta hacia el segundo dedo del
                    pie: no se cae hacia adentro.
                  </Check>
                  <Check mark="·">El pie de atrás se apoya entero; no lo dejes «colgado» del borde.</Check>
                  <Check mark="·">Rodilla sana no se bloquea hacia atrás: queda micro-flexionada.</Check>
                </>
              ),
            },
            {
              id: "equilibrio",
              title: "2 · Equilibrio",
              contenido: (
                <>
                  <P>
                    Árbol, guerrero III, bailarina, águila. Entrenan tobillo, cadera, centro y —sobre
                    todo— atención. Son las posturas donde la mirada manda.
                  </P>
                  <SubLabel>Cómo se sostiene</SubLabel>
                  <Check mark="·">Punto fijo primero, postura después. En ese orden.</Check>
                  <Check mark="·">
                    Reparte el peso en el pie: dedo gordo, dedo chico y talón. Los dedos se relajan, no
                    se agarran.
                  </Check>
                  <Check mark="·">
                    En el árbol, el pie va arriba o abajo de la rodilla, nunca encima de ella.
                  </Check>
                  <Check mark="·">Cerca de una pared: es asistencia, no derrota.</Check>
                  <Evidencia
                    grado="Bien respaldado"
                    fuente="Revisiones de yoga y equilibrio en biblioteca-cientifica/yoga/mayores_movilidad (128 referencias)."
                  >
                    El yoga mejora el equilibrio, y en personas mayores forma parte de los programas que
                    reducen caídas. Lo que funciona es el entrenamiento de equilibrio específico y
                    sostenido; el yoga sirve como vehículo para hacerlo.
                  </Evidencia>
                </>
              ),
            },
            {
              id: "flexion",
              title: "3 · Flexiones hacia adelante",
              contenido: (
                <>
                  <P>
                    Pinza de pie o sentada, cabeza a rodilla, pinza abierta. Estiran la cadena de atrás
                    y calman: la cabeza baja del corazón y la respiración se hace lenta.
                  </P>
                  <SubLabel>Cuidado</SubLabel>
                  <Check mark="·">
                    El movimiento sale de la cadera, no de la cintura. Si la espalda se redondea de
                    golpe, dobla las rodillas: <Dorado>siempre</Dorado>.
                  </Check>
                  <Check mark="·">
                    No busques tocar el suelo. Tocarse los pies no es un logro de salud, es una medida
                    de proporciones.
                  </Check>
                  <Check mark="·">
                    Con hernia discal en fase aguda o dolor que baja por la pierna, las flexiones
                    profundas se posponen.
                  </Check>
                </>
              ),
            },
            {
              id: "extension",
              title: "4 · Extensiones (apertura de pecho)",
              contenido: (
                <>
                  <P>
                    Cobra, esfinge, puente, camello, arco. Abren pecho y flexores de cadera, contrarrestan
                    el día entero encorvada y activan.
                  </P>
                  <SubLabel>Cuidado</SubLabel>
                  <Check mark="·">
                    El arco se reparte por toda la columna: si todo se junta en la zona lumbar, baja la
                    altura y alarga primero.
                  </Check>
                  <Check mark="·">
                    La nuca sigue la línea de la columna. Dejar caer la cabeza hacia atrás sin control es
                    de las formas más fáciles de terminar con el cuello resentido.
                  </Check>
                  <Check mark="·">Glúteos firmes pero no apretados a bloque; los pies paralelos.</Check>
                  <Check mark="·">Después de una extensión fuerte, una torsión suave o rodillas al pecho.</Check>
                </>
              ),
            },
            {
              id: "torsion",
              title: "5 · Torsiones",
              contenido: (
                <>
                  <P>
                    Torsión sentada, supina, del guerrero. Movilizan la columna torácica y masajean el
                    abdomen.
                  </P>
                  <Tradicion>
                    Lo de que «exprimen los órganos como una esponja y eliminan toxinas» es una imagen de
                    la tradición, repetida hasta el cansancio. La desintoxicación la hacen hígado y
                    riñones, y no necesitan que te retuerzas para funcionar.
                  </Tradicion>
                  <SubLabel>Cuidado</SubLabel>
                  <Check mark="·">Alarga primero, gira después: la columna se estira y luego rota.</Check>
                  <Check mark="·">
                    La torsión empieza abajo y termina en la cabeza; el cuello es lo último y lo que menos
                    gira.
                  </Check>
                  <Check mark="·">
                    No uses el brazo como palanca para forzar. En embarazo, torsiones abiertas y suaves.
                  </Check>
                </>
              ),
            },
            {
              id: "cadera",
              title: "6 · Aperturas de cadera",
              contenido: (
                <>
                  <P>
                    Paloma, mariposa, guirnalda, zapatero. Trabajan rotadores, aductores y psoas. Son las
                    que más tiempo piden y donde más gente se apura.
                  </P>
                  <SubLabel>Cuidado</SubLabel>
                  <Check mark="·">
                    La rodilla no negocia: si duele la rodilla en paloma o mariposa, sal. El límite suele
                    ser la forma de tu cadera, no la falta de voluntad.
                  </Check>
                  <Check mark="·">
                    Usa mantas debajo del glúteo o de la rodilla. Sentarse arriba de algo cambia la postura
                    entera.
                  </Check>
                  <Check mark="·">Hipermovilidad: menos rango y más fuerza, no al revés.</Check>
                </>
              ),
            },
            {
              id: "invertidas",
              title: "7 · Invertidas",
              contenido: (
                <>
                  <P>
                    Perro boca abajo, piernas en la pared, vela, parada de cabeza. Cambian la relación con
                    la gravedad y, las suaves, descansan de verdad.
                  </P>
                  <WarnBox title="⚠ Las que llevan peso al cuello">
                    Parada de cabeza y vela concentran carga en el cuello y son <Dorado>las posturas más
                    reportadas en eventos adversos agudos</Dorado> del yoga. No son obligatorias, no son
                    una meta y no se aprenden sola con un video. Se evitan con presión alta no controlada,
                    glaucoma, desprendimiento de retina, problemas cervicales, embarazo y menstruación con
                    sangrado abundante (esto último, por comodidad y tradición; no hay evidencia de daño).
                  </WarnBox>
                  <GreenBox title="La invertida que sí es para todas">
                    Piernas arriba en la pared, cinco a diez minutos. Toda la calma y nada del riesgo. Si
                    tienes las piernas pesadas al final del día, es la mejor de la lista.
                  </GreenBox>
                </>
              ),
            },
            {
              id: "centro",
              title: "8 · Centro y brazos",
              contenido: (
                <>
                  <P>
                    Plancha, tabla lateral, bote, chaturanga. Fuerza de tronco, hombro y muñeca; es la parte
                    que sostiene todo lo demás.
                  </P>
                  <SubLabel>Cuidado</SubLabel>
                  <Check mark="·">
                    En chaturanga, los codos rozan las costillas y no pasan atrás de los hombros. Bajar con
                    las rodillas en el suelo es la versión correcta mientras no hay fuerza: no es hacer
                    trampa.
                  </Check>
                  <Check mark="·">
                    Reparte el peso en toda la mano, con la base de los dedos bien apoyada, para que la
                    muñeca no reciba todo.
                  </Check>
                  <Check mark="·">Si la muñeca molesta: puños, antebrazos o soportes inclinados.</Check>
                </>
              ),
            },
            {
              id: "restaurativas",
              title: "9 · Restaurativas y descanso",
              contenido: (
                <>
                  <P>
                    Niño, supta baddha koṇāsana con cojines, savasana. El cuerpo sostenido por soportes para
                    que no tenga que trabajar nada.
                  </P>
                  <P>
                    <Dorado>Savasana no es el premio: es parte del entrenamiento.</Dorado> Es donde el
                    sistema nervioso pasa de activación a reposo y donde se asienta lo que hiciste. Cinco a
                    diez minutos, tapada, porque la temperatura baja.
                  </P>
                </>
              ),
            },
          ]}
        />
      </Seccion>

      <Seccion titulo="Cómo se arma una clase">
        <P>
          Una clase bien armada tiene una <Dorado>curva</Dorado>: sube, llega a un punto alto, y baja
          hasta dejarte más tranquila de lo que llegaste. Si termina arriba, quedas acelerada; si nunca
          sube, quedas con la sensación de no haber hecho nada.
        </P>
        <ArcoDeClase />

        <MiniTable
          headers={["Parte", "Para qué", "20 min", "45 min", "60–75 min"]}
          rows={[
            ["Llegada y centrarse", "Aterrizar, mirar cómo estás hoy", "1–2 min", "3 min", "5 min"],
            ["Respiración", "Poner el ritmo que va a mandar", "1 min", "3 min", "5 min"],
            ["Movilidad y calentamiento", "Articulaciones y columna en todas sus direcciones", "3 min", "6 min", "8 min"],
            ["Calor (saludos o similar)", "Subir temperatura y pulso", "3 min", "7 min", "10 min"],
            ["Posturas de pie", "Fuerza y equilibrio", "4 min", "10 min", "15 min"],
            ["Postura cumbre", "Lo más exigente del día, cuando ya estás preparada", "2 min", "5 min", "8 min"],
            ["Contraposturas", "Deshacer lo que la cumbre dejó", "2 min", "4 min", "6 min"],
            ["Suelo: caderas, torsiones", "Bajar revoluciones", "2 min", "5 min", "10 min"],
            ["Savasana", "Asentar", "3 min", "5 min", "8–10 min"],
          ]}
        />
        <InfoBox title="La regla de las contraposturas">
          Después de una extensión fuerte, algo neutro o una flexión suave. Después de una torsión, una
          postura simétrica. Después de una invertida, quedarse quieta un momento antes de levantarse.
          El cuerpo agradece volver al centro antes de irse a otro lado.
        </InfoBox>
        <P>
          Así está armada la app: elige tu objetivo y el tiempo, y arma la curva completa con la
          respiración y el cierre incluidos.{" "}
          <Link href="/yoga" style={ENLACE}>
            Armar mi práctica →
          </Link>
        </P>
      </Seccion>

      <Seccion titulo="Lesiones: los números reales">
        <P>
          El yoga no es inofensivo por decreto, pero tampoco es la máquina de romper hombros que a
          veces se dice. Lo que muestran las revisiones:
        </P>
        <Evidencia
          grado="Bien respaldado"
          fuente="Revisiones sistemáticas de lesiones y eventos adversos en yoga (JISAKOS 2018; Journal of Science and Medicine in Sport, 2017) y encuesta nacional de efectos adversos (BMC Complementary Medicine and Therapies, 2019). Copias en biblioteca-cientifica/yoga/seguridad_lesiones (177 referencias)."
        >
          La tasa de lesión ronda <Dorado>0,6 a 1,2 lesiones por cada 1.000 horas</Dorado> de práctica,
          comparable o menor a la de otras actividades físicas. Alrededor de <Dorado>dos tercios</Dorado>{" "}
          de las lesiones son de la mitad inferior del cuerpo —cadera, isquiotibiales, rodilla— y el
          resto se reparte entre tronco, hombro y muñeca. Entre los eventos agudos, cerca del{" "}
          <Dorado>30%</Dorado> se asocia a posturas sobre manos, hombros y cabeza. Practicar solo por
          cuenta propia, sin supervisión, se asocia a más riesgo.
        </Evidencia>
        <SubLabel>Cómo se evita la mayoría</SubLabel>
        <Check>Entrar despacio a rango nuevo y sostener, en vez de rebotar.</Check>
        <Check>Dejar las invertidas sobre cuello para cuando haya alguien mirando.</Check>
        <Check>Usar soportes sin culpa: bloques, cintas, mantas, pared.</Check>
        <Check>Distinguir estiramiento de dolor: sordo y repartido, se sostiene; agudo, punzante, eléctrico o dentro de una articulación, se sale.</Check>
        <Check>No competir con la de al lado ni con tu propia práctica de hace tres años.</Check>
      </Seccion>

      <Seccion titulo="Cuánto, cada cuánto, y cómo saber que avanzas">
        <MiniTable
          headers={["Pregunta", "Respuesta honesta"]}
          rows={[
            [
              "¿Cuántas veces por semana?",
              "Dos o tres sesiones sostenidas rinden más que siete en enero y ninguna en febrero. La mayoría de los ensayos con resultados usan de 2 a 3 por semana durante 8 a 12 semanas.",
            ],
            [
              "¿Cuánto rato?",
              "Veinte minutos bien hechos sirven. Los efectos en ánimo y sueño aparecen con sesiones cortas y frecuentes.",
            ],
            [
              "¿Cuándo se nota?",
              "Calma y sueño: en las primeras semanas. Flexibilidad: cuatro a seis semanas. Fuerza: ocho a doce. Dolor lumbar crónico: los ensayos miden a las 12 semanas.",
            ],
            [
              "¿Cómo sé que avanzo?",
              "No por la foto. Porque respiras más largo en la misma postura, porque te recuperas antes, porque duermes mejor, porque te duele menos lo que te dolía.",
            ],
            [
              "¿Y si me salto un día?",
              "No pasa nada. Lo que se pierde de verdad es la constancia, no un día.",
            ],
          ]}
        />
      </Seccion>

      <Seccion titulo="Mitos que se caen">
        <Check mark="✗">
          <Dorado>«Si soy poco flexible, el yoga no es para mí.»</Dorado> Al revés: el rango de
          movimiento es de los efectos más rápidos y consistentes.
        </Check>
        <Check mark="✗">
          <Dorado>«Estirar previene lesiones.»</Dorado> Ganar flexibilidad por sí solo no previene
          lesiones; lo que protege es fuerza y control en todo el rango.
        </Check>
        <Check mark="✗">
          <Dorado>«Las torsiones desintoxican.»</Dorado> Eso lo hacen hígado y riñones.
        </Check>
        <Check mark="✗">
          <Dorado>«El dolor es parte del proceso.»</Dorado> La molestia de un estiramiento sostenido, sí.
          El dolor agudo, no: es información.
        </Check>
        <Check mark="✗">
          <Dorado>«Hay una alineación perfecta, igual para todas.»</Dorado> La forma de la cadera y del
          fémur cambia de persona a persona; hay rangos, no un molde.
        </Check>
        <LineDivider />
        <P style={{ textAlign: "center", marginBottom: 0 }}>
          <Link href="/biblioteca/yoga-origen" style={ENLACE}>
            ← De dónde viene todo esto
          </Link>
        </P>
      </Seccion>
    </PaginaBiblioteca>
  );
}

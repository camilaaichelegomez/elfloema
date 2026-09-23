"use client";

import Link from "next/link";
import {
  Acordeones,
  Check,
  Dorado,
  Evidencia,
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

/* De dónde viene el yoga: los textos, los caminos, los ocho miembros, el
   ayurveda y lo que la investigación puede y no puede decir de todo eso.

   Dos cuidados de la casa:
   · Las fechas de los textos antiguos son aproximadas y discutidas entre
     especialistas. Se escriben como aproximadas, no como dato duro.
   · Lo que viene de la tradición se dice como tradición. Lo que tiene estudios
     detrás lleva el estudio al lado. Nunca se mezclan. */

const ENLACE = { color: "#e8c878", textDecorationColor: "rgba(200,160,80,0.5)" };

export default function YogaOrigen() {
  return (
    <PaginaBiblioteca
      id="yoga-origen"
      titulo="Yoga: de dónde viene"
      bajada="Dos mil años de textos antes de la primera colchoneta"
    >
      <Seccion titulo="Qué quiere decir «yoga»">
        <P>
          La palabra viene del sánscrito <Dorado>yuj</Dorado>, que es la misma raíz de «yugo» en
          castellano: uncir, juntar, poner dos cosas a tirar del mismo carro. De ahí salen las dos
          traducciones que vas a escuchar: <Dorado>unión</Dorado> y <Dorado>disciplina</Dorado>. Las dos
          son correctas y se complementan: unir lo que está disperso, y sostener eso en el tiempo.
        </P>
        <P>
          La definición más famosa está en la segunda línea del <Dorado>Yoga Sūtra</Dorado> de
          Patañjali: <em>yogaś citta-vṛtti-nirodhaḥ</em> — «el yoga es aquietar los remolinos de la
          mente». Fíjate en lo que no dice: no habla del cuerpo, ni de estiramientos, ni de tocarse los
          pies. El yoga nació como un trabajo sobre la mente. El cuerpo llegó después, y llegó como
          herramienta.
        </P>
        <InfoBox title="Lo primero que conviene soltar">
          En Occidente «yoga» pasó a significar «las posturas». En su propia tradición, las posturas
          son <Dorado>una octava parte</Dorado> del asunto. No es un dato de erudición: entender esto
          cambia cómo practicas, porque deja de ser una clase de gimnasia con nombres raros y pasa a
          ser un entrenamiento de atención que además mueve el cuerpo.
        </InfoBox>
      </Seccion>

      <Seccion titulo="La línea de tiempo">
        <P>
          Nadie inventó el yoga un martes. Es una tradición que se fue escribiendo encima de sí misma
          durante milenios, en textos que discuten entre ellos. Las fechas son aproximadas: los
          especialistas todavía las discuten, porque estos textos se transmitieron de memoria mucho
          antes de escribirse.
        </P>
        <MiniTable
          headers={["Cuándo (aprox.)", "Qué aparece", "Qué aporta"]}
          rows={[
            [
              "1500–1200 a. C.",
              "Vedas (Ṛgveda)",
              "Himnos, ritual y sacrificio. La palabra «yoga» aparece, todavía con su sentido de uncir.",
            ],
            [
              "800–400 a. C.",
              "Upaniṣads antiguas",
              "El giro hacia adentro: el ritual se interioriza. Aparecen la respiración, la meditación y la idea del sí mismo (ātman).",
            ],
            [
              "s. II a. C. – II d. C.",
              "Bhagavad Gītā",
              "El yoga como forma de vivir: acción sin apego, devoción, conocimiento. Yoga en medio de la vida, no en una cueva.",
            ],
            [
              "s. II – IV d. C.",
              "Yoga Sūtra de Patañjali",
              "195 aforismos que ordenan la práctica en ocho miembros. El texto de referencia del «rāja yoga».",
            ],
            [
              "s. VI – XII",
              "Corrientes tántricas",
              "El cuerpo deja de ser un estorbo y pasa a ser el lugar de la práctica. Aparecen los mapas de canales y centros.",
            ],
            [
              "s. XI – XVIII",
              "Textos del haṭha yoga",
              "Haṭha(yoga)pradīpikā (s. XV), Gheraṇḍa Saṃhitā y Śiva Saṃhitā (s. XVII–XVIII): posturas, limpiezas, respiración, sellos.",
            ],
            [
              "s. XIX – XX",
              "Yoga moderno",
              "Vivekananda lo lleva a Occidente (1893). Krishnamacharya y sus alumnos —Iyengar, Pattabhi Jois, Desikachar, Indra Devi— arman lo que hoy llamamos clase de yoga.",
            ],
            [
              "s. XX – XXI",
              "Yoga global",
              "Estudios clínicos, yoga terapéutico, mil estilos, y también industria: ropa, retiros y promesas que la tradición nunca hizo.",
            ],
          ]}
        />
        <WarnBox title="El dato incómodo (y honesto)">
          Muchas de las posturas de pie que hacemos hoy —los saludos al sol encadenados, las series de
          guerreros— <Dorado>no aparecen en los textos antiguos</Dorado>. El historiador Mark Singleton
          mostró en <em>Yoga Body</em> (Oxford University Press, 2010) que el yoga postural moderno se
          armó a comienzos del siglo XX en diálogo con la gimnasia europea y la cultura física india de
          la época. Los textos medievales describen sobre todo posturas sentadas y unas pocas más.
          Saberlo no le quita valor a la práctica: se la da, porque deja de venderse como «cinco mil
          años de antigüedad» algo que tiene cien, y lo de cinco mil años —la filosofía— queda donde de
          verdad está.
        </WarnBox>
      </Seccion>

      <Seccion titulo="Los cuatro caminos">
        <P>
          Antes de los ocho miembros hay una división más grande, que viene sobre todo de la Gītā y se
          popularizó con Vivekananda: <Dorado>cuatro caminos</Dorado> según por dónde entra cada
          persona. No compiten; se mezclan.
        </P>
        <MiniTable
          headers={["Camino", "Por dónde entra", "Cómo se ve"]}
          rows={[
            ["Karma yoga", "La acción", "Hacer lo que toca sin estar colgada del resultado. Servicio."],
            ["Bhakti yoga", "El corazón", "Devoción, canto, entrega. Es el más popular en India."],
            ["Jñāna yoga", "El estudio", "Indagación, preguntarse quién es la que mira. El camino del filo."],
            [
              "Rāja yoga",
              "La mente y el cuerpo",
              "El del Yoga Sūtra: meditación, respiración, postura. Es el que heredamos en Occidente.",
            ],
          ]}
        />
        <P>
          Las posturas viven dentro del cuarto camino, y dentro de ese camino son <Dorado>un
          miembro de ocho</Dorado>. Por eso decir «hago yoga» y significar solo «hago posturas» es
          quedarse con una esquina del mapa.
        </P>
      </Seccion>

      <Seccion titulo="Los ocho miembros (aṣṭāṅga)">
        <P>
          Ocho, no siete. Patañjali los llama <Dorado>aṅga</Dorado>, que quiere decir «miembro» del
          cuerpo, no «escalón»: no se suben en fila, se sostienen entre sí como los miembros de un
          cuerpo. Igual hay un orden de dificultad, y el texto los presenta así.
        </P>
        <Acordeones
          items={[
            {
              id: "yama",
              title: "1 · Yama — cómo trato al mundo",
              contenido: (
                <>
                  <P>Cinco acuerdos con lo que está afuera. Son la parte que nadie fotografía.</P>
                  <Check>
                    <Dorado>Ahiṃsā</Dorado> — no dañar. Incluye no dañarte: forzar una postura hasta el
                    dolor es romper el primero de todos.
                  </Check>
                  <Check>
                    <Dorado>Satya</Dorado> — verdad. Decir lo que es, incluido «hoy no puedo».
                  </Check>
                  <Check>
                    <Dorado>Asteya</Dorado> — no tomar lo que no es tuyo. También el tiempo y el crédito
                    ajenos.
                  </Check>
                  <Check>
                    <Dorado>Brahmacarya</Dorado> — usar bien la energía. En los textos monásticos es
                    celibato; en la lectura contemporánea, no dispersarse.
                  </Check>
                  <Check>
                    <Dorado>Aparigraha</Dorado> — no acumular. Ni cosas, ni logros, ni posturas.
                  </Check>
                </>
              ),
            },
            {
              id: "niyama",
              title: "2 · Niyama — cómo me trato a mí",
              contenido: (
                <>
                  <Check>
                    <Dorado>Śauca</Dorado> — limpieza. Del cuerpo, del espacio y de lo que consumes.
                  </Check>
                  <Check>
                    <Dorado>Santoṣa</Dorado> — contento con lo que hay. No es conformismo: es dejar de
                    pelearse con el punto de partida.
                  </Check>
                  <Check>
                    <Dorado>Tapas</Dorado> — el calor de la disciplina. Lo que se sostiene cuando no hay
                    ganas.
                  </Check>
                  <Check>
                    <Dorado>Svādhyāya</Dorado> — estudio de una misma (y de los textos).
                  </Check>
                  <Check>
                    <Dorado>Īśvara-praṇidhāna</Dorado> — entrega a algo más grande. Cada tradición lo
                    llena con lo suyo.
                  </Check>
                </>
              ),
            },
            {
              id: "asana",
              title: "3 · Āsana — la postura",
              contenido: (
                <>
                  <P>
                    Patañjali le dedica <Dorado>tres aforismos</Dorado> de 195, y ni siquiera describe
                    posturas: dice que āsana es <em>sthira sukham</em>, «firme y cómoda» (II.46), que se
                    logra aflojando el esfuerzo (II.47) y que entonces dejan de afectar los pares de
                    opuestos, como frío y calor (II.48).
                  </P>
                  <P>
                    En su origen, la postura era <Dorado>para poder sentarse a meditar sin que el cuerpo
                    moleste</Dorado>. Todo el repertorio de posturas que conocemos viene después, con el
                    haṭha yoga y con el siglo XX.
                  </P>
                  <InfoBox title="Firme y cómoda, a la vez">
                    Es el mejor criterio que existe para saber si una postura está bien para ti hoy: si
                    solo hay firmeza, estás tensando; si solo hay comodidad, estás acostada. El punto es
                    el cruce.
                  </InfoBox>
                </>
              ),
            },
            {
              id: "pranayama",
              title: "4 · Prāṇāyāma — la respiración",
              contenido: (
                <>
                  <P>
                    <Dorado>Prāṇa</Dorado> es el aliento (y, en la tradición, la energía vital);{" "}
                    <Dorado>āyāma</Dorado> es extender o regular. No es «respirar hondo»: es alargar,
                    medir y a veces retener, con técnicas concretas.
                  </P>
                  <P>
                    Es el puente entre el cuerpo y la mente, y es la parte donde la investigación
                    moderna tiene más que decir: la respiración lenta es de lo poco que uno puede hacer
                    voluntariamente para mover el sistema nervioso autónomo.
                  </P>
                  <Evidencia
                    grado="Prometedor"
                    fuente="Ensayos y revisiones de respiración yóguica recopilados en biblioteca-cientifica/yoga/pranayama (117 referencias), incluidos ensayos aleatorizados de respiración lenta en hipertensión y de intervenciones respiratorias en estrés y ansiedad."
                  >
                    Las prácticas de respiración lenta bajan el estrés percibido y la ansiedad en
                    ensayos controlados, y hay señales en presión arterial. Los estudios son casi
                    siempre chicos y no se pueden cegar: quien respira sabe que está respirando
                    distinto, y eso infla el efecto.
                  </Evidencia>
                </>
              ),
            },
            {
              id: "pratyahara",
              title: "5 · Pratyāhāra — recoger los sentidos",
              contenido: (
                <>
                  <P>
                    Soltar el tirón de afuera. La imagen clásica es la tortuga que recoge las patas.
                    Cerrar los ojos en savasana, bajar la luz, dejar de mirar a la vecina de colchoneta:
                    eso es pratyāhāra en su versión cotidiana.
                  </P>
                  <P>
                    Es la bisagra del texto: los cuatro primeros miembros miran hacia afuera, los tres
                    últimos hacia adentro, y este los cose.
                  </P>
                </>
              ),
            },
            {
              id: "dharana",
              title: "6 · Dhāraṇā — concentración",
              contenido: (
                <>
                  <P>
                    Poner la atención en <Dorado>un</Dorado> punto y volver a traerla cada vez que se
                    va. Un punto de la pared, la respiración, una imagen, un sonido.
                  </P>
                  <P>
                    Aquí aparece lo que en la práctica se llama <Dorado>dṛṣṭi</Dorado>: la mirada puesta
                    en un solo lugar. Es dhāraṇā entrando por los ojos, y es lo que hace que una postura
                    de equilibrio deje de ser un forcejeo. Está explicado en{" "}
                    <Link href="/biblioteca/yoga-practica" style={ENLACE}>
                      la práctica del yoga
                    </Link>
                    .
                  </P>
                </>
              ),
            },
            {
              id: "dhyana",
              title: "7 · Dhyāna — meditación",
              contenido: (
                <>
                  <P>
                    Cuando la atención ya no se va y sostenerla deja de costar. La diferencia con el
                    miembro anterior no es de técnica: es de continuidad. Dhāraṇā es volver una y otra
                    vez; dhyāna es no tener que volver.
                  </P>
                  <Evidencia
                    grado="Bien respaldado"
                    fuente="Revisiones y metaanálisis de meditación y mindfulness recopilados en biblioteca-cientifica/yoga/meditacion_mindfulness (131 referencias)."
                  >
                    Los programas de meditación y mindfulness reducen ansiedad, estrés y síntomas
                    depresivos con efectos pequeños a moderados. El matiz de siempre: gran parte de los
                    estudios compara contra no hacer nada, y eso siempre favorece a la práctica.
                  </Evidencia>
                </>
              ),
            },
            {
              id: "samadhi",
              title: "8 · Samādhi — absorción",
              contenido: (
                <>
                  <P>
                    El estado en que se cae la separación entre quien mira y lo mirado. El texto
                    describe varios grados y no promete que llegue por practicar mucho: dice que llega,
                    si llega.
                  </P>
                  <Tradicion>
                    Esto es la meta declarada del yoga clásico y pertenece por completo al terreno de la
                    experiencia y la tradición. No hay forma de medirlo en un laboratorio, y quien te
                    ofrezca llegar en un taller de fin de semana te está vendiendo algo.
                  </Tradicion>
                </>
              ),
            },
          ]}
        />
      </Seccion>

      <Seccion titulo="El haṭha yoga: cuando el cuerpo entra a la cancha">
        <P>
          <Dorado>Haṭha</Dorado> quiere decir «fuerza», y la tradición además lee las sílabas como sol
          (<em>ha</em>) y luna (<em>ṭha</em>): unir los dos. Es la corriente que, entre los siglos XI y
          XVIII, puso el cuerpo en el centro: posturas, limpiezas, respiración, sellos y llaves.
        </P>
        <SubLabel>Lo que aportó, y que seguimos usando</SubLabel>
        <Check>
          <Dorado>Āsana</Dorado> — el repertorio crece. La Haṭhapradīpikā describe alrededor de quince;
          la Gheraṇḍa Saṃhitā, treinta y dos.
        </Check>
        <Check>
          <Dorado>Ṣaṭkarma</Dorado> — seis limpiezas (nariz, lengua, ojos, intestino…). De ahí viene la
          jarrita nasal que hoy se compra en la farmacia.
        </Check>
        <Check>
          <Dorado>Bandha</Dorado> — llaves musculares: raíz, abdomen, garganta.
        </Check>
        <Check>
          <Dorado>Mudrā</Dorado> — sellos, con las manos y con todo el cuerpo.
        </Check>
        <Check>
          <Dorado>Prāṇāyāma</Dorado> — respiraciones con nombre y receta.
        </Check>
        <Tradicion>
          El marco con que el haṭha explica lo que hace —canales (<em>nāḍī</em>), viento vital (
          <em>prāṇa</em>), fuego digestivo, energía enroscada en la base— es un mapa simbólico de la
          experiencia, no anatomía. Sirve como lenguaje de la práctica; no busques esos canales en un
          atlas médico, porque no están.
        </Tradicion>
      </Seccion>

      <Seccion titulo="Yoga y ayurveda: las dos hermanas">
        <P>
          El ayurveda es el sistema médico tradicional de India (<em>āyus</em>, vida; <em>veda</em>,
          conocimiento). Comparte raíz y época con el yoga y se suele decir que son hermanas: una cuida
          la salud del cuerpo y la vida diaria, la otra trabaja la mente. En la práctica se cruzan todo
          el tiempo: la rutina diaria, la alimentación, la estación del año y la hora entran a decidir
          qué yoga te conviene hoy.
        </P>
        <SubLabel>Las ideas que vas a encontrar</SubLabel>
        <MiniTable
          headers={["Idea", "Qué dice la tradición"]}
          rows={[
            [
              "Cinco elementos",
              "Todo está hecho de espacio, aire, fuego, agua y tierra, también el cuerpo.",
            ],
            [
              "Tres doṣas",
              "Vāta (aire y espacio, movimiento), pitta (fuego, transformación) y kapha (agua y tierra, estructura). Cada persona tiene su mezcla.",
            ],
            [
              "Prakṛti",
              "Tu mezcla de nacimiento; vikṛti es el desequilibrio de hoy. La idea es volver a la de nacimiento.",
            ],
            [
              "Agni",
              "El fuego digestivo. Buena parte del ayurveda es cuidar la digestión antes que cualquier otra cosa.",
            ],
            [
              "Dinacharya",
              "La rutina diaria: despertar temprano, limpiar la lengua, comer fuerte al mediodía, acostarse temprano.",
            ],
          ]}
        />
        <Evidencia
          grado="Evidencia débil"
          fuente="158 referencias en biblioteca-cientifica/ayurveda y biblioteca-cientifica/ayurveda_clinica, incluidas revisiones sistemáticas de plantas ayurvédicas en diabetes tipo 2 y en enfermedad inflamatoria intestinal."
        >
          Hay ensayos de plantas y preparados ayurvédicos con resultados favorables, pero la mayoría
          son pequeños, de una sola región y con riesgo alto de sesgo; las revisiones piden estudios
          mejores antes de recomendar. De los doṣas como categorías fisiológicas no hay confirmación:
          son un marco de tradición, útil para hablar de tendencias personales, no un diagnóstico.
        </Evidencia>
        <WarnBox title="⚠ Esto sí importa: metales pesados">
          Análisis de productos ayurvédicos comprados por internet han encontrado plomo, mercurio y
          arsénico en una parte de las muestras, sobre todo en preparados del tipo <em>rasa śāstra</em>,
          que los incorporan a propósito (Saper et al., <em>JAMA</em>, 2008). Las plantas y la rutina son
          una cosa; tragar preparados minerales de origen desconocido es otra. No compres eso por
          internet.
        </WarnBox>
      </Seccion>

      <Seccion titulo="Chakras, nāḍīs y prāṇa">
        <P>
          El mapa que se usa en clase: canales por donde corre la energía (
          <Dorado>nāḍī</Dorado>, con iḍā, piṅgalā y suṣumnā como principales), siete centros en el eje
          del cuerpo (<Dorado>cakra</Dorado>, «rueda») y una energía enroscada en la base (
          <Dorado>kuṇḍalinī</Dorado>) que la práctica invita a subir.
        </P>
        <Tradicion>
          Los chakras no son órganos ni glándulas: son un mapa de la experiencia interior que aparece
          en los textos tántricos y haṭha, y que cambia de un texto a otro —hay listas de cinco, de
          siete, de doce. El «siete» que todo el mundo conoce se popularizó en el siglo XX. No hay
          forma de medirlos, y la revisión que hay en la biblioteca sobre meditación y «balance de
          chakras» trabaja con estudios de calidad muy baja.
        </Tradicion>
        <P>
          En El Floema los usamos como lo que son: un <Dorado>lenguaje</Dorado> para orientar la
          práctica hacia una zona del cuerpo y una cualidad. Cuando la app te deja elegir un chakra,
          está eligiendo posturas para esa zona. Eso es todo lo que hace, y así está escrito en la app.
        </P>
      </Seccion>

      <Seccion titulo="Cómo llegó hasta tu colchoneta">
        <P>
          En 1893 Vivekananda habla en el Parlamento de las Religiones de Chicago y el yoga entra al
          mundo occidental por la puerta de la filosofía. La parte física llega después, y casi toda
          por una misma línea: <Dorado>Krishnamacharya</Dorado> (1888–1989), que enseñó en el palacio
          de Mysore, y sus alumnos.
        </P>
        <MiniTable
          headers={["Quién", "Qué armó"]}
          rows={[
            ["B. K. S. Iyengar", "Precisión en la alineación y uso de soportes: bloques, cintas, mantas."],
            ["K. Pattabhi Jois", "Ashtanga vinyasa: series fijas, respiración ujjayi, dṛṣṭi, mucho calor."],
            ["T. K. V. Desikachar", "Viniyoga: adaptar la práctica a la persona, no la persona a la práctica."],
            ["Indra Devi", "Lo llevó a Hollywood y a América Latina; enseñó en Argentina hasta los 102 años."],
          ]}
        />
        <P>
          De esas cuatro ramas salen casi todos los estilos que hoy se ofrecen —hatha suave, vinyasa,
          power, yin, restaurativo, terapéutico—, más las escuelas de Kundalini y Sivananda por sus
          propias vías.
        </P>
        <LineDivider />
        <InfoBox title="Una nota de respeto">
          Practicar algo que viene de otra cultura pide lo mínimo: nombrar de dónde viene, no vaciarlo
          de contenido para vender, y no convertirlo en decoración. Decir «āsana» y saber que es el
          tercer miembro de ocho ya es parte del respeto.
        </InfoBox>
      </Seccion>

      <Seccion titulo="Y entonces, ¿qué dice la ciencia del yoga?">
        <P>
          Bastante, y no siempre lo que se promete. Está resumido con su grado y su referencia en{" "}
          <Link href="/biblioteca/yoga-practica" style={ENLACE}>
            la página de la práctica
          </Link>{" "}
          y dentro de la app, al lado de cada objetivo. En una línea: <Dorado>el yoga tiene buena
          evidencia en dolor lumbar crónico, ansiedad, sueño, flexibilidad y equilibrio</Dorado>; es
          prometedor en fuerza y dolor menstrual; y no hace nada de lo que se dice sobre desintoxicar
          órganos ni alinear energías.
        </P>
        <p style={{ textAlign: "center", marginTop: 24 }}>
          <Link
            href="/yoga"
            style={{
              ...ENLACE,
              fontFamily: "var(--font-grimoire)",
              fontSize: "0.8rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Armar mi práctica →
          </Link>
        </p>
      </Seccion>
    </PaginaBiblioteca>
  );
}

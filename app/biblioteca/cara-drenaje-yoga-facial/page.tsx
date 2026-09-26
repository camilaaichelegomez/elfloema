"use client";

import Link from "next/link";
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

/* La cara: por dónde se drena, cómo se toca, qué hacen los masajes y los
   ejercicios faciales, y qué se puede esperar de verdad.

   Lo delicado de esta página es separar tres cosas que se venden juntas:
   drenaje (líquido, efecto de horas), masaje (circulación y relajación) y
   ejercicio facial (músculo, efecto de meses y evidencia floja). */

const ENLACE = { color: "#e8c878", textDecorationColor: "rgba(200,160,80,0.5)" };

export default function CaraDrenajeYogaFacial() {
  return (
    <PaginaBiblioteca
      id="cara"
      titulo="La cara: drenaje, masaje y yoga facial"
      fondo="/fondo_cara.jpg"
      bajada="Tres cosas distintas que casi siempre se venden como una sola"
    >
      <Seccion titulo="Tres prácticas, tres efectos">
        <P>
          Antes de cualquier técnica, conviene separar. Se hacen con las mismas manos y en la misma cara,
          pero no hacen lo mismo, no duran lo mismo y no tienen la misma evidencia detrás.
        </P>
        <MiniTable
          headers={["Práctica", "Qué mueve", "Cuánto dura", "Qué tan respaldado está"]}
          rows={[
            [
              "Drenaje linfático facial",
              "Líquido acumulado entre los tejidos",
              "Horas. Se nota el mismo día y vuelve si vuelve la causa.",
              "Fisiología clara; estudios propios en cara, pocos y chicos",
            ],
            [
              "Masaje facial (manos, gua sha, rodillo)",
              "Circulación superficial y tono muscular, tensión de mandíbula y sienes",
              "Horas a días. Efecto inmediato de color y relajación.",
              "Ensayos pequeños con resultados modestos",
            ],
            [
              "Ejercicio o «yoga» facial",
              "Músculo",
              "Meses. Nada se nota en una semana.",
              "Evidencia de baja calidad; lo mejor estudiado es la terapia miofuncional",
            ],
          ]}
        />
      </Seccion>

      <Seccion titulo="Por dónde se drena una cara">
        <P>
          La cara no drena «hacia abajo» porque sí: sigue un mapa de ganglios. Conocerlo es la diferencia
          entre mover líquido y frotarse la cara.
        </P>
        <LaminaAnotada
          num="I"
          titulo="Por dónde drena la cara"
          src="/biblioteca/cuerpo/drenaje-cara.jpg"
          prompt={
            "A serene woman's face seen straight from the front, perfectly symmetric, eyes closed, calm " +
            "neutral expression, hair pulled back away from the face and ears, bare neck and collarbones " +
            "visible, head and shoulders only, centred. " + ESTILO_LAMINA
          }
          puntos={[
            { x: 37, y: 45, texto: "Preauriculares y parotídeos — delante de la oreja. Reciben la sien, el párpado de afuera y la mejilla alta." },
            { x: 42, y: 66, texto: "Submandibulares — bajo el borde de la mandíbula. Reciben la mejilla, la nariz y el labio superior." },
            { x: 50, y: 70, texto: "Submentonianos — bajo el mentón. Reciben el mentón y el centro del labio inferior." },
            { x: 44, y: 77, texto: "Cervicales — a lo largo del cuello. Aquí baja todo lo anterior." },
            { x: 42, y: 83, texto: "Supraclaviculares — sobre la clavícula. La salida: se abre primero y se cierra ahí al terminar." },
          ]}
          flechas={[
            { d: "M 47 47 Q 43 46 40 45", color: "verde" },
            { d: "M 48 67 Q 46 67 44 66", color: "verde" },
            { d: "M 37 49 Q 38 63 43 74", color: "verde" },
            { d: "M 44 79 Q 43 81 42 82", color: "verde" },
          ]}
          leyenda="Nada sube: todo va hacia la oreja o la mandíbula, baja por el cuello y sale bajo la clavícula."
        />

        <MiniTable
          headers={["Grupo de ganglios", "Dónde", "De dónde recibe"]}
          rows={[
            ["Preauriculares y parotídeos", "Delante de la oreja", "Frente lateral, sien, párpado de afuera, mejilla alta"],
            ["Submandibulares", "Bajo el borde de la mandíbula", "Mejilla, nariz, labio superior, parte del labio inferior"],
            ["Submentonianos", "Bajo el mentón", "Mentón, centro del labio inferior, punta de la lengua"],
            ["Occipitales y retroauriculares", "Nuca y detrás de la oreja", "Cuero cabelludo de atrás"],
            ["Cervicales superficiales y profundos", "A lo largo del cuello", "Todo lo anterior, ya recogido"],
            ["Supraclaviculares", "Arriba de la clavícula", "La salida: ahí la linfa vuelve a la sangre"],
          ]}
        />
        <InfoBox title="La consecuencia práctica">
          Todo lo de la cara viaja <Dorado>hacia la oreja o hacia la mandíbula</Dorado>, baja por el cuello
          y sale bajo la clavícula. Por eso se abre primero clavícula y cuello, después se trabaja la cara
          de adentro hacia afuera, y se termina bajando otra vez por el cuello. Si empiezas por la mejilla
          hinchada, empujas líquido contra una fila detenida.
        </InfoBox>
        <SubLabel>Por qué amaneces hinchada</SubLabel>
        <P>
          De noche estás horizontal: el líquido que de día bajaba por gravedad se queda en la cara, y el
          drenaje del cuello trabaja con menos ayuda. Súmale sal, alcohol, poco sueño, llorar, la fase del
          ciclo o alergia, y tienes la cara de la mañana. Es líquido, no grasa, y por eso el drenaje lo
          resuelve en minutos y la vida lo vuelve a traer.
        </P>
      </Seccion>

      <Seccion titulo="Cómo se toca una cara">
        <MiniTable
          headers={["Qué", "La medida", "Cómo saber que te pasaste"]}
          rows={[
            [
              "Presión",
              "Alrededor de 55 g: el peso de un huevo. Lo justo para mover la piel sobre el hueso.",
              "La piel queda roja, o la sientes tirante después.",
            ],
            ["Párpados y contorno de ojo", "La mitad de esa presión.", "Si estiras el párpado, es demasiado."],
            ["Velocidad", "Un círculo por segundo, más lento de lo que crees.", "Si te aburres, vas bien."],
            ["Repeticiones", "5 a 7 en cada punto.", "—"],
            ["Duración", "5 a 10 minutos bastan.", "Media hora no drena el doble."],
            [
              "Piel",
              "Drenaje: piel seca y limpia. Masaje de deslizamiento: unas gotas de aceite.",
              "Si los dedos resbalan cuando querías drenar, no estás drenando.",
            ],
          ]}
        />
        <WarnBox title="Seca o con aceite: no es lo mismo">
          El drenaje necesita que los dedos <Dorado>agarren</Dorado> la piel y la desplacen sobre lo que
          hay debajo; con aceite se deslizan y el efecto se pierde. El masaje de amasado y deslizamiento,
          en cambio, necesita aceite para no arrastrar la piel. Por eso en la app el drenaje va primero, en
          seco, y el aceite entra después, para los masajes y los ejercicios.
        </WarnBox>
      </Seccion>

      <Seccion titulo="Las maniobras, una por una">
        <Acordeones
          items={[
            {
              id: "apertura",
              title: "1 · Abrir la salida",
              contenido: (
                <>
                  <P>
                    Dedos planos en el hueco de arriba de la clavícula. Hundes apenas al exhalar y sueltas
                    al inhalar, 7 veces por lado. Es el paso que casi todos se saltan y el único
                    imprescindible.
                  </P>
                  <P style={{ marginBottom: 0 }}>
                    Después, manos planas a los lados del cuello: círculos lentos hacia abajo, 7 veces.
                  </P>
                </>
              ),
            },
            {
              id: "cadena",
              title: "2 · Cadena del cuello",
              contenido: (
                <P style={{ marginBottom: 0 }}>
                  Con las manos abiertas cubriendo el costado del cuello, círculos que van desde debajo de
                  la oreja hacia la clavícula, 7 veces por lado. Sin presionar la parte de adelante del
                  cuello, donde está la tiroides, ni el latido de la carótida.
                </P>
              ),
            },
            {
              id: "menton",
              title: "3 · Mentón y mandíbula",
              contenido: (
                <P style={{ marginBottom: 0 }}>
                  Nudillos o yemas desde el centro del mentón hacia la oreja, siguiendo el borde de la
                  mandíbula, 7 veces. Es el recorrido que más notan quienes aprietan los dientes.
                </P>
              ),
            },
            {
              id: "mejillas",
              title: "4 · Mejillas",
              contenido: (
                <P style={{ marginBottom: 0 }}>
                  Desde el costado de la nariz hacia la oreja, en tres líneas: alta (bajo el pómulo), media
                  y baja. Círculos fijos, sin resbalar, 5 a 7 por punto. La linfa de la mejilla va a los
                  ganglios de delante de la oreja: por eso el recorrido es horizontal, no hacia arriba.
                </P>
              ),
            },
            {
              id: "ojos",
              title: "5 · Contorno de ojos",
              contenido: (
                <>
                  <P>
                    Con el dedo anular —el que menos fuerza hace— por el hueso de abajo del ojo, desde el
                    lagrimal hacia la sien. Toques suaves, sin estirar el párpado. Luego por la ceja, hacia
                    afuera.
                  </P>
                  <P style={{ marginBottom: 0 }}>
                    Aquí la presión es la mitad. Es la piel más fina de la cara y la que más se resiente del
                    trato brusco.
                  </P>
                </>
              ),
            },
            {
              id: "frente",
              title: "6 · Frente y sienes",
              contenido: (
                <P style={{ marginBottom: 0 }}>
                  Del centro de la frente hacia las sienes, con las yemas o los nudillos, 7 veces. Termina
                  con círculos suaves en la sien y baja por delante de la oreja hacia el cuello.
                </P>
              ),
            },
            {
              id: "cierre",
              title: "7 · Cerrar el circuito",
              contenido: (
                <P style={{ marginBottom: 0 }}>
                  Barridos largos desde la cara hacia la oreja, por el cuello hasta la clavícula, 7 veces. Y
                  bombeo final en la clavícula. Por ahí sale todo.
                </P>
              ),
            },
          ]}
        />
        <P style={{ textAlign: "center", marginTop: 20 }}>
          <Link
            href="/ritual-facial"
            style={{
              ...ENLACE,
              fontFamily: "var(--font-grimoire)",
              fontSize: "0.8rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Hacer la rutina guiada →
          </Link>
        </P>
      </Seccion>

      <Seccion titulo="Gua sha, rodillos y herramientas">
        <P>
          Una piedra plana o un rodillo hacen lo mismo que las manos, con dos diferencias: reparten la
          presión en un borde y están frías, lo que ayuda a la sensación de desinflamar. No hacen nada que
          las manos no puedan.
        </P>
        <Evidencia
          grado="Prometedor"
          fuente="«Comparative Effects of Facial Roller and Gua Sha Massage on Facial Contour, Muscle Tone, and Skin Elasticity: Randomized Controlled Trial», Journal of Cosmetic Dermatology, 2025. En biblioteca-cientifica/masaje_facial (91 referencias)."
        >
          Hay ensayos aleatorizados que comparan rodillo y gua sha y miden contorno, tono muscular y
          elasticidad, con cambios modestos. Son estudios pequeños, de corta duración y sin seguimiento
          largo: sirven para decir «algo se mueve», no para prometer un rostro nuevo.
        </Evidencia>
        <WarnBox title="Cómo no hacerse daño con una piedra">
          Siempre con aceite, nunca en seco: arrastrar la piel es la forma rápida de irritarla y de
          marcarla. Ángulo bajo, presión suave, sin insistir en el mismo surco. Nada de gua sha sobre acné
          inflamado, rosácea activa, cuperosis marcada, herpes o piel lastimada. Si quedan marcas rojas que
          duran, la técnica está mal: en la cara no se busca el «sha» que sí se busca en la espalda.
        </WarnBox>
      </Seccion>

      <Seccion titulo="Yoga facial: qué se sabe de verdad">
        <P>
          La idea es que la cara tiene músculos y que, como cualquier músculo, responden al ejercicio.
          Parte de eso es cierto, y parte no funciona como en el resto del cuerpo.
        </P>
        <SubLabel>Lo que hay que entender primero</SubLabel>
        <P>
          Los músculos de la expresión no se insertan de hueso a hueso: se insertan en la piel. Se usan
          todo el día, cada vez que hablas o sonríes, y no se atrofian por desuso como un cuádriceps que
          pasa un mes enyesado. Lo que envejece la cara es sobre todo la piel (colágeno y elastina), la
          pérdida y el descenso de los paquetes de grasa, y el propio hueso, que se reabsorbe con los años.
          Fortalecer un músculo no revierte eso.
        </P>
        <Evidencia
          grado="Evidencia débil"
          fuente="Alam et al., «Association of Facial Exercise With the Appearance of Aging», JAMA Dermatology, 2018; y revisiones sistemáticas de ejercicio facial: Aesthetic Surgery Journal 2014, The Journal of Korean Physical Therapy 2021. En biblioteca-cientifica/ejercicios_faciales (62 referencias)."
        >
          El estudio más citado siguió a <Dorado>27 mujeres</Dorado> de 40 a 65 años que hicieron 30 minutos
          de ejercicios faciales al día durante 20 semanas; terminaron 16. Evaluadores ciegos estimaron, en
          promedio, unos <Dorado>tres años menos</Dorado> de edad aparente, sobre todo por mejillas más
          llenas. No hubo grupo de comparación, la muestra es diminuta y el efecto se midió con una escala
          de apariencia. Las revisiones sistemáticas que juntaron todo lo publicado concluyen lo mismo:
          puede que sirva, la calidad de los estudios es baja.
        </Evidencia>
        <Evidencia
          grado="Prometedor"
          fuente="«Myofunctional Speech Therapy for Facial Rejuvenation and Orofacial Function Improvement: A Systematic Review», Journal of Functional Morphology and Kinesiology, 2024; y Guimarães et al., ensayo aleatorizado de ejercicios orofaríngeos en apnea obstructiva del sueño moderada, American Journal of Respiratory and Critical Care Medicine, 2009."
        >
          Donde la evidencia es mejor es en los músculos <Dorado>funcionales</Dorado>: lengua, suelo de la
          boca, faringe. Entrenarlos mejora la función orofacial, y en apnea del sueño moderada un programa
          de ejercicios orofaríngeos redujo la gravedad en un ensayo aleatorizado. Esos músculos sí se
          debilitan con la edad y sí responden al entrenamiento.
        </Evidencia>
        <GreenBox title="Entonces, ¿sirve o no?">
          Sirve para lo que sirve: <Dorado>tono y volumen muscular</Dorado> trabajando con constancia
          durante meses, relajación de la mandíbula y la frente, y un rato diario de cuidado que baja el
          estrés. No sirve como reemplazo de nada, no levanta tejido caído ni borra arrugas de expresión —de
          hecho, repetir mucho un gesto marcado puede acentuar la línea que ya tienes—. Por eso conviene
          alternar ejercicios de <Dorado>fortalecer</Dorado> con los de <Dorado>soltar</Dorado>, que es como
          está armada la app.
        </GreenBox>
        <Tradicion>
          Las frases sobre «activar la energía del rostro» o «armonizar los puntos» vienen de tradiciones
          de masaje oriental. Se pueden usar como lenguaje y como intención del momento, pero no describen
          lo que ocurre en el tejido. En El Floema se dicen como lo que son.
        </Tradicion>
      </Seccion>

      <Seccion titulo="Bruxismo: la mandíbula que no descansa">
        <P>
          Apretar o rechinar los dientes es de lo más común que hay, y de lo que más cambia una cara:
          el masetero es un músculo que responde al uso, y usarlo ocho horas cada noche lo engrosa. De
          ahí la mandíbula cuadrada, el dolor de cabeza al despertar y el desgaste del esmalte.
        </P>
        <InfoBox title="Lo primero, que no es un masaje">
          <Dorado>La posición de reposo.</Dorado> Labios juntos, <Dorado>dientes separados</Dorado> y
          lengua apoyada en el paladar, detrás de los dientes de arriba. Los dientes solo deberían
          tocarse al tragar y al masticar: el resto del día, no. Sorprenderte apretando y volver a esa
          posición es el ejercicio completo.
        </InfoBox>
        <SubLabel>Qué se trabaja, y cómo</SubLabel>
        <MiniTable
          headers={["Zona", "Cómo", "Para qué"]}
          rows={[
            [
              "Masetero",
              "Boca entreabierta y arrastre lento de arriba hacia abajo, como planchando la fibra. En el punto que duele sordo, quedarse respirando, sin apretar más.",
              "Es el que más trabaja de noche y el que marca el contorno.",
            ],
            [
              "Temporal (la sien)",
              "Masaje en abanico, hacia arriba y atrás.",
              "Es donde vive el dolor de cabeza tensional.",
            ],
            [
              "Pterigoideos (por dentro)",
              "Solo con profesional. No se trabajan sola en casa.",
              "Participan en el bloqueo y el chasquido.",
            ],
            [
              "Apertura guiada",
              "Lengua en el paladar, abrir y cerrar mirándose al espejo, sin que la mandíbula se desvíe.",
              "Reeduca el movimiento; evita el patrón torcido.",
            ],
          ]}
        />
        <Evidencia
          grado="Prometedor"
          fuente="Ensayo aleatorizado biopsicosocial en personas con bruxismo: el arrastre profundo sobre los músculos masticadores mejoró la calidad de sueño, la movilidad mandibular y el umbral de dolor por presión más que el TENS y que la liberación miofascial (Journal of Bodywork and Movement Therapies, 2022). Revisiones de enfoques de tratamiento en disfunción temporomandibular, 2023."
        >
          La terapia manual sobre los músculos masticadores y del cuello, sumada al ejercicio y a la
          conciencia postural, mejora dolor, movilidad y calidad de sueño. La calidad de la evidencia es
          moderada a baja y los estudios son pequeños, pero apuntan al mismo lado y el riesgo de
          probarlo es mínimo.
        </Evidencia>
        <WarnBox title="Cuándo esto se va con profesional">
          Si te bloqueas al abrir, si el chasquido duele, si la mandíbula se va a un lado, si el dolor
          te despierta o si ya hay desgaste visible de los dientes: eso lo ve una odontóloga
          —probablemente con férula— o una kinesióloga de mandíbula. El masaje ayuda con el músculo, no
          con la articulación ni con el esmalte. Y la toxina botulínica en el masetero, que se ofrece
          mucho, es un procedimiento médico con sus propios riesgos, no un plan B casero.
        </WarnBox>
      </Seccion>

      <Seccion titulo="Los puntos de la medicina china">
        <P>
          La acupresión es acupuntura sin agujas: se sostiene o se masajea un punto concreto con el
          dedo. En la cara, los que aparecen una y otra vez en los estudios son cuatro, y se usan para
          lo mismo que buscamos aquí: la cara congestionada y la nariz tapada.
        </P>
        <MiniTable
          headers={["Punto", "Dónde", "Para qué se usa", "Cómo"]}
          rows={[
            ["Yintang (EX-HN3)", "Justo entre las cejas", "Cabeza pesada, nariz tapada, calmar", "Presión sostenida 30 s, sin círculos"],
            ["Yingxiang (IG20)", "Al lado de la aleta de la nariz, en el pliegue", "Congestión nasal", "Círculos pequeños y firmes, 20 por lado"],
            ["Zanzhu (V2)", "En el nacimiento de la ceja, junto a la nariz", "Ojos pesados, frente apretada", "Empujar hacia arriba contra el hueso, 20 s"],
            ["Fengchi (VB20)", "Los dos huecos de la base del cráneo", "Tensión de cuello y cabeza", "Presión hacia arriba y al centro, 30 s"],
          ]}
        />
        <Evidencia
          grado="Prometedor"
          fuente="Metaanálisis de terapias relacionadas con acupuntura en rinitis alérgica; ensayo controlado de acupresión autoadministrada con Yingxiang, Yintang, Fengchi y otros puntos (BMC Complementary Medicine and Therapies, 2023). Referencias en biblioteca-cientifica/acupuntura_meridianos."
        >
          En rinitis alérgica y congestión nasal, la acupuntura y la acupresión muestran mejoras
          modestas en los síntomas que la gente reporta y en la calidad de vida. En las medidas
          objetivas —flujo de aire, inflamación— la evidencia es más débil y menos consistente. O sea:
          es razonable que te sientas mejor, y no está demostrado que la nariz esté midiendo distinto.
        </Evidencia>
        <Tradicion>
          Los meridianos y el qi que los explica son el marco de la medicina china tradicional, no
          anatomía occidental: no hay canales de energía que un bisturí encuentre. Los puntos, en
          cambio, sí caen en lugares con nervios y vasos concretos, y la hipótesis que se investiga es
          neuromodulación: que estimularlos cambie el tono del sistema nervioso autónomo en esa zona.
        </Tradicion>
      </Seccion>

      <Seccion titulo="Cuero cabelludo: masaje, caída y crecimiento">
        <P>
          El masaje capilar se volvió popular con una promesa grande —«hace crecer el pelo»— a partir de
          un estudio chiquito. Vale la pena mirarlo de cerca, porque lo que muestra es real y es más
          modesto que la promesa.
        </P>
        <Evidencia
          grado="Prometedor"
          fuente="Koyama et al., «Standardized Scalp Massage Results in Increased Hair Thickness by Inducing Stretching Forces to Dermal Papilla Cells in the Subcutaneous Tissue», Eplasty, 2016; encuesta de autoevaluación en alopecia androgenética, Dermatology and Therapy, 2019."
        >
          Nueve hombres sanos, <Dorado>cuatro minutos al día durante 24 semanas</Dorado>: el pelo se
          engrosó de 0,085 a 0,092 mm, y en la biopsia cambió la expresión de genes del folículo (sube
          NOGGIN, BMP4 y SMAD4, asociados a la fase de crecimiento; baja IL6, asociada a caída). La
          <Dorado> cantidad</Dorado> de pelos no aumentó. La explicación propuesta es la
          mecanotransducción: el estiramiento de la piel llega como señal a las células de la papila
          dérmica.
        </Evidencia>
        <SubLabel>Cómo se hace, que es lo que decide si sirve</SubLabel>
        <Check>
          En seco y con las yemas, nunca con las uñas. Si te suena a rasguño, está mal.
        </Check>
        <Check>
          <Dorado>Mover la piel sobre el hueso</Dorado>, no resbalar los dedos por el pelo. Ese
          estiramiento es todo el mecanismo.
        </Check>
        <Check>Por zonas: sienes, encima de las orejas, coronilla y parte de atrás.</Check>
        <Check>Cuatro minutos, todos los días. Menos que eso no es lo que se estudió.</Check>
        <Check mark="·">
          Las tracciones suaves desde la raíz son la misma idea. Tirar fuerte o siempre del mismo lado
          hace lo contrario: la tracción sostenida —moños apretados, trenzas tirantes, extensiones—
          produce alopecia por tracción, y esa sí está bien documentada.
        </Check>
        <WarnBox title="Lo honesto sobre la caída">
          El masaje engrosa el pelo que tienes y se siente bien. <Dorado>No revierte una alopecia
          androgenética</Dorado>, que tiene causa genética y hormonal: para eso lo que tiene evidencia
          sólida es el minoxidil tópico y, con indicación médica, la finasterida. Y si el pelo se te cae
          de golpe, en parches, con picazón, con descamación o con enrojecimiento del cuero cabelludo,
          eso no es un masaje pendiente: es una consulta con dermatóloga.
        </WarnBox>
        <InfoBox title="Lo que sí puedes esperar">
          Pelo más grueso al tacto con meses de constancia, menos tensión en la cabeza, y un rato
          diario que baja el estrés —que, de paso, es uno de los factores que empeora el efluvio
          telógeno, la caída difusa que aparece después de una pena, una enfermedad o un parto.
        </InfoBox>
      </Seccion>

      <Seccion titulo="Qué tener en cuenta antes de empezar">
        <SubLabel>Cuidados básicos</SubLabel>
        <Check>Manos limpias y uñas cortas. La cara se toca con las yemas, no con la punta de la uña.</Check>
        <Check>Cara limpia y seca para el drenaje; unas gotas de aceite vegetal para el masaje y los ejercicios.</Check>
        <Check>Aceite ligero si tienes tendencia acneica; nada de aceites esenciales puros en la cara.</Check>
        <Check>Mejor de mañana para la hinchazón, o de noche para la tensión de mandíbula.</Check>
        <Check>Constancia por sobre intensidad: 5 a 10 minutos casi todos los días rinden más que una hora el domingo.</Check>
        <Check>Si tienes el pelo suelto, recógelo: terminar arrastrando pelo con aceite en la cara no ayuda a nadie.</Check>
        <SubLabel>Cuándo no</SubLabel>
        <Check mark="✗">Acné inflamado, rosácea en brote, dermatitis activa, herpes labial en curso.</Check>
        <Check mark="✗">Infección aguda o fiebre, sinusitis aguda.</Check>
        <Check mark="✗">Alteraciones de tiroides: no se trabaja la parte delantera del cuello.</Check>
        <Check mark="✗">Ganglio abultado, duro o que no se mueve: eso se consulta.</Check>
        <Check mark="✗">Procedimientos estéticos recientes (rellenos, toxina botulínica, láser, peeling): pregunta plazos a quien te los hizo.</Check>
        <Check mark="✗">Piel muy irritada o con retinoides en fase de descamación: espera a que se calme.</Check>
        <WarnBox title="Lo que de verdad cambia una piel a diez años">
          Protector solar a diario, no fumar, dormir, comer bien y —si te interesa— activos con evidencia
          como los retinoides y la vitamina C. El masaje y los ejercicios son un complemento agradable y
          honesto: no compiten con eso, y quien te diga que reemplazan al protector solar te está mintiendo.
        </WarnBox>
        <LineDivider />
        <P style={{ textAlign: "center", marginBottom: 0 }}>
          Cómo funciona el sistema completo:{" "}
          <Link href="/biblioteca/drenaje-linfatico" style={ENLACE}>
            drenaje linfático del cuerpo →
          </Link>
        </P>
      </Seccion>
    </PaginaBiblioteca>
  );
}

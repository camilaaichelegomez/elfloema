/* Por qué la sección está hecha así.

   Cada decisión de esta app sale de un hallazgo publicado, no de un libro de
   autoayuda. Aquí quedan las dos cosas juntas: qué dice el estudio y qué se
   hizo con eso en la pantalla. Si algo es creencia popular sin respaldo, se
   dice que lo es.

   Regla de la casa: nada de «el cerebro tarda 21 días» ni «visualiza y lo
   atraerás». Eso está abajo, en los mitos. */

export type Hallazgo = {
  titulo: string;
  dice: string;
  /** Qué hace la app con ese hallazgo. */
  enLaApp: string;
  fuente: string;
};

export const HALLAZGOS: Hallazgo[] = [
  {
    titulo: "Decir cuándo y dónde, no solo qué",
    dice:
      "Escribir un plan del tipo «cuando pase X, haré Y» hace bastante más probable cumplir una intención que solo proponérselo. Un meta-análisis de 94 estudios encontró un efecto mediano-alto (d = 0,65).",
    enLaApp:
      "Cada hábito tiene un campo «cuándo»: no se guarda como «meditar», sino como «después de dejar la taza del desayuno, meditar tres minutos».",
    fuente:
      "Gollwitzer & Sheeran (2006), Implementation intentions and goal achievement, Advances in Experimental Social Psychology 38:69-119",
  },
  {
    titulo: "Un hábito tarda lo que tarda",
    dice:
      "En el estudio que siguió a 96 personas durante 12 semanas, la conducta se volvió automática en una mediana de 66 días, con un rango enorme: de 18 a 254 días según la persona y la conducta. Los famosos 21 días no salen de ningún estudio.",
    enLaApp:
      "La app muestra los días cumplidos y el porcentaje del mes, no una cuenta regresiva hacia un número mágico. Saltarse un día no reinicia nada.",
    fuente:
      "Lally et al. (2010), How are habits formed: Modelling habit formation in the real world, European Journal of Social Psychology 40(6):998-1009",
  },
  {
    titulo: "Anotar lo que haces cambia lo que haces",
    dice:
      "Un meta-análisis de 138 estudios mostró que hacer seguimiento del propio avance mejora el logro de la meta, y que el efecto es mayor cuando el registro se hace público o queda escrito en algún lado.",
    enLaApp:
      "Marcar el día es un toque, y el calendario y los gráficos dejan el registro a la vista. Ese registro es el que hace el trabajo, no la fuerza de voluntad.",
    fuente:
      "Harkin et al. (2016), Does monitoring goal progress promote goal attainment?, Psychological Bulletin 142(2):198-229",
  },
  {
    titulo: "Metas concretas, no «hacerlo mejor»",
    dice:
      "Treinta y cinco años de investigación sobre fijación de metas muestran que las metas específicas y exigentes llevan a mejor desempeño que las vagas, siempre que la persona las acepte y tenga cómo cumplirlas.",
    enLaApp:
      "Un objetivo pide título, para cuándo y por qué. Y se desarma en tareas, y las tareas grandes en pasos.",
    fuente: "Locke & Latham (2002), Building a practically useful theory of goal setting, American Psychologist 57(9):705-717",
  },
  {
    titulo: "El premio tiene que llegar hoy",
    dice:
      "Lo que predice que sigas con una actividad no es el beneficio futuro, sino lo agradable que te resulte ahora. En varios experimentos, las recompensas inmediatas explicaron la persistencia mejor que las recompensas lejanas.",
    enLaApp:
      "Al marcar un hábito suena un tono y se ve la racha al instante. El beneficio de aquí a un año no motiva; el de ahora sí.",
    fuente:
      "Woolley & Fishbach (2017), Immediate rewards predict adherence to long-term goals, Personality and Social Psychology Bulletin 43(2):151-162",
  },
  {
    titulo: "Avanzar un poco es lo que sostiene el ánimo",
    dice:
      "En un estudio con 238 personas que escribieron un diario de trabajo durante meses, el mejor predictor de un buen día no fue el reconocimiento ni las recompensas, sino haber avanzado algo en algo que importa, aunque fuera poco.",
    enLaApp:
      "Las tareas se parten en pasos y cada paso se marca solo. Ver tres de cinco pasos hechos es avance; ver una tarea enorme sin tocar, no.",
    fuente: "Amabile & Kramer (2011), The Progress Principle, Harvard Business Review Press",
  },
  {
    titulo: "Nombrarte como quien quieres ser",
    dice:
      "En dos experimentos previos a elecciones en Estados Unidos, preguntar «¿qué tan importante es para ti ser un votante?» (sustantivo) aumentó la participación real frente a preguntar «¿qué tan importante es votar?» (verbo). Hablarse en términos de identidad cambió la conducta medida en los registros oficiales.",
    enLaApp:
      "Cada objetivo tiene un campo de identidad: «quiero ser una persona que…». Es lo que aparece arriba cuando abres la sección.",
    fuente:
      "Bryan et al. (2011), Motivating voter turnout by invoking the self, PNAS 108(31):12653-12656",
  },
  {
    titulo: "Perdonarse funciona mejor que retarse",
    dice:
      "Entre estudiantes que postergaron antes de un examen, quienes se perdonaron a sí mismos por haberlo hecho postergaron menos en el examen siguiente. La autocrítica, en cambio, se asocia a más postergación.",
    enLaApp:
      "Un día sin cumplir no aparece en rojo ni rompe nada con un cartel. La app dice lo que dice la evidencia: seguir al día siguiente es lo que importa.",
    fuente:
      "Wohl, Pychyl & Bennett (2010), I forgive myself, now I can study, Personality and Individual Differences 48(7):803-808",
  },
  {
    titulo: "Tres minutos de atención ya hacen algo",
    dice:
      "Cuatro sesiones de veinte minutos de entrenamiento breve en atención plena mejoraron el ánimo y varias medidas de atención sostenida frente a un grupo control. No hace falta una hora sentada para notar un cambio.",
    enLaApp:
      "Las pausas son de uno, tres o cinco minutos, solo con música y una campana al final. Sin locución ni cuentos.",
    fuente:
      "Zeidan et al. (2010), Mindfulness meditation improves cognition: Evidence of brief mental training, Consciousness and Cognition 19(2):597-605",
  },
];

export const MITOS = [
  {
    mito: "Un hábito se forma en 21 días.",
    realidad:
      "El número viene de las observaciones de un cirujano plástico en los años sesenta sobre cuánto tardaban sus pacientes en acostumbrarse a su nueva cara, y se repitió hasta volverse verdad. Cuando se midió de verdad, la mediana fue 66 días y el rango iba de 18 a 254.",
  },
  {
    mito: "Si visualizas el resultado, lo consigues.",
    realidad:
      "Fantasear con el resultado logrado, por sí solo, se asocia a menos esfuerzo y peores resultados: el cuerpo se relaja como si ya hubiera llegado. Lo que sí ayuda es contrastar el deseo con los obstáculos reales y planificar qué hacer con ellos.",
  },
  {
    mito: "Es cosa de fuerza de voluntad.",
    realidad:
      "Las personas que mejor cumplen sus metas no son las que más se resisten a la tentación, sino las que se cruzan con menos tentaciones porque armaron mejor su entorno y sus rutinas.",
  },
];

/* Frases que aparecen al cumplir. Cada una dice algo que se puede sostener,
   sin prometer nada ni hablar de energías. */
export const AL_CUMPLIR = [
  "Hecho. Lo que acabas de hacer cuenta más que la intención de ayer.",
  "Otra vez en el mismo contexto: así es como una conducta se vuelve automática.",
  "Cumpliste lo que dijiste que ibas a hacer. Eso también se practica.",
  "Un día más de evidencia a favor de la persona que quieres ser.",
  "Avanzar poco, pero hoy, es lo que sostiene el ánimo mañana.",
  "Marcado. El registro es la mitad del trabajo.",
];

export const AL_FALLAR = [
  "Un día sin hacerlo no borra lo anterior. Saltarse una vez no rompe el hábito.",
  "Mañana sigue. Perdonarse un tropiezo predice menos postergación que retarse.",
  "La constancia se mide en semanas, no en días sueltos.",
];

/* Lo que aparece en los recordatorios de estar presente. Son invitaciones
   cortas, nada de sermones: se leen de una pasada. */
export const PRESENCIA = [
  "Suelta la mandíbula y los hombros. Tres respiraciones largas, y sigue.",
  "¿Dónde están tus pies ahora mismo? Siente el suelo un momento.",
  "Una respiración por la nariz, más larga al salir que al entrar.",
  "Mira algo lejano por veinte segundos. Los ojos también se cansan de cerca.",
  "Nota cómo estás sentada. Endereza la espalda sin ponerte rígida.",
  "Un momento de silencio antes de lo que sigue. Nada más.",
];

export const SOBRE_LOS_DATOS =
  "Todo lo que escribes aquí se guarda solo en este teléfono o computador, en el navegador. No viaja a ningún servidor, no hay cuenta y nadie más lo ve. Si borras los datos del navegador o cambias de aparato, empiezas de nuevo.";

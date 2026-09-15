/* Los siete chakras.

   Cómo se tratan acá, y por qué: los chakras vienen de la tradición del yoga,
   no de la anatomía. No hay órganos ni estructuras que correspondan a ellos, y
   no se pueden medir. Decirlo no le quita nada a la práctica — le quita el
   disfraz de ciencia, que es distinto.

   Así que cada chakra lleva dos campos separados a propósito:

   · `tradicion`  — lo que se le atribuye. Escrito siempre como atribución,
                    nunca como hecho.
   · `enElCuerpo` — qué se trabaja de verdad cuando haces esas posturas. Esto
                    sí es anatomía, y es lo que hace que la selección tenga
                    sentido aunque uno no crea una palabra de lo otro.

   Trabajar "el corazón" en esta app significa una práctica de apertura de
   pecho y espalda alta. Eso es real, se siente, y no hay que prometer nada
   más para justificarlo. */

export type Chakra =
  | "raiz"
  | "sacro"
  | "plexo"
  | "corazon"
  | "garganta"
  | "entrecejo"
  | "corona";

export type FichaChakra = {
  id: Chakra;
  nombre: string;
  sanscrito: string;
  /** Dónde lo ubica la tradición. */
  donde: string;
  /** Color con que se lo representa, para la interfaz. */
  color: string;
  /** Lo que se le atribuye. Siempre en forma de atribución. */
  tradicion: string;
  /** Lo que la práctica trabaja de verdad. Esto es anatomía. */
  enElCuerpo: string;
  /** Posturas del catálogo asociadas. */
  posturas: string[];
};

export const CHAKRAS: FichaChakra[] = [
  {
    id: "raiz",
    nombre: "Raíz",
    sanscrito: "Muladhara",
    donde: "Base de la columna, entre el coxis y el suelo pélvico",
    color: "#a8443a",
    tradicion:
      "Se le atribuye lo relacionado con la seguridad, el arraigo y la sensación de tener piso.",
    enElCuerpo:
      "Trabajo de piernas y pies sosteniendo peso, y estabilidad de la pelvis. Son las posturas donde importa dónde te apoyas.",
    posturas: ["pie-montana", "pie-silla", "pie-guerrero2", "pie-guirnalda", "eq-arbol", "sue-nino"],
  },
  {
    id: "sacro",
    nombre: "Sacro",
    sanscrito: "Svadhisthana",
    donde: "Bajo vientre, unos dedos bajo el ombligo",
    color: "#c47a3a",
    tradicion:
      "Se le atribuye lo relacionado con el placer, la creatividad y la fluidez emocional.",
    enElCuerpo:
      "Apertura de cadera y movilidad de la pelvis: aductores, psoas y rotadores profundos. Es la zona que más se acorta al estar sentada.",
    posturas: [
      "cal-cadera-circulos",
      "sue-mariposa",
      "sue-paloma",
      "sue-bebe-feliz",
      "pie-estocada-baja",
      "sue-zapatero-apoyado",
    ],
  },
  {
    id: "plexo",
    nombre: "Plexo solar",
    sanscrito: "Manipura",
    donde: "Boca del estómago, sobre el ombligo",
    color: "#c8a050",
    tradicion:
      "Se le atribuye lo relacionado con la voluntad, la decisión y la confianza en una misma.",
    enElCuerpo:
      "Pared abdominal y torsiones: el trabajo de centro que sostiene la columna. Se nota al día siguiente.",
    posturas: ["sue-barco", "pie-plancha", "tor-sentada", "tor-supina", "pie-silla", "res-fuego"],
  },
  {
    id: "corazon",
    nombre: "Corazón",
    sanscrito: "Anahata",
    donde: "Centro del pecho, a la altura del esternón",
    color: "#7a9a5a",
    tradicion:
      "Se le atribuye lo relacionado con el afecto, la compasión y la capacidad de recibir.",
    enElCuerpo:
      "Apertura de pecho y espalda alta: pectorales que se alargan y músculos entre las escápulas que trabajan. Es la contrapostura de vivir encorvada.",
    posturas: [
      "cal-cachorro",
      "ext-esfinge",
      "ext-cobra",
      "ext-puente",
      "ext-camello",
      "ext-brazos-espalda",
      "sue-zapatero-apoyado",
    ],
  },
  {
    id: "garganta",
    nombre: "Garganta",
    sanscrito: "Vishuddha",
    donde: "Base del cuello",
    color: "#5a8a9a",
    tradicion: "Se le atribuye lo relacionado con la expresión y con decir lo que hay que decir.",
    enElCuerpo:
      "Movilidad cervical y de la espalda alta, y trabajo de voz y respiración. Acá el cuidado manda: el cuello no se fuerza nunca.",
    posturas: ["cal-gato-vaca", "cal-cuello", "ext-puente", "fin-bhramari", "cal-aguja"],
  },
  {
    id: "entrecejo",
    nombre: "Entrecejo",
    sanscrito: "Ajna",
    donde: "Entre las cejas",
    color: "#6a6a9a",
    tradicion: "Se le atribuye lo relacionado con la intuición y con ver las cosas con claridad.",
    enElCuerpo:
      "Posturas con la frente apoyada y práctica de atención sostenida. Lo que cambia, y está medido, es el estado de alerta y la calma: eso viene de la respiración lenta.",
    posturas: ["sue-nino", "pie-pinza", "res-nadi", "med-respiracion", "cal-aguja"],
  },
  {
    id: "corona",
    nombre: "Corona",
    sanscrito: "Sahasrara",
    donde: "Coronilla",
    color: "#8a6a9a",
    tradicion:
      "Se le atribuye lo relacionado con la conexión con algo más grande que una misma.",
    enElCuerpo:
      "Quietud larga: meditación, savasana y piernas arriba. En la práctica es lo que más cuesta y lo que más se salta.",
    posturas: ["inv-piernas-pared", "med-respiracion", "med-mantra", "sav-normal", "sav-nidra"],
  },
];

/** Todas las posturas asociadas a los chakras elegidos, sin repetir. */
export function posturasDeChakras(elegidos: Chakra[]): Set<string> {
  const ids = new Set<string>();
  for (const c of CHAKRAS) {
    if (!elegidos.includes(c.id)) continue;
    for (const p of c.posturas) ids.add(p);
  }
  return ids;
}

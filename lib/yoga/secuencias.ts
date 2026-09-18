import type { Cuidado, Estilo, Fase, Momento, Objetivo, Prop } from "./tipos";

/* Secuencias: grupos de posturas que van juntas y se repiten.

   Una clase de yoga no es una lista de posturas sueltas. Hay cadenas que se
   hacen seguidas porque una prepara a la siguiente — la estocada abre la
   cadera antes de la paloma, la plancha sostiene antes del chaturanga — y se
   repiten varias vueltas, que es donde está el trabajo de verdad. El saludo
   al sol es el ejemplo clásico: tres vueltas, no una postura.

   Cada secuencia dice qué pasos la forman (ids del catálogo), cuánto dura cada
   paso dentro de la serie y cuántas vueltas admite. El armado elige las
   vueltas según el tiempo que haya: si no caben tres, hace dos.

   `porLado: true` significa que la serie entera se hace a un lado y después
   al otro, no postura por postura. Así funciona de verdad una serie de
   guerreros. */

export type Secuencia = {
  id: string;
  nombre: string;
  fase: Fase;
  /** Ids de posturas del catálogo, EN ORDEN. El orden es la secuencia. */
  pasos: string[];
  /** Segundos de cada paso dentro de la serie, en el mismo orden. */
  segundos: number[];
  /** Lo que dice la voz en cada paso, con la respiración. En una serie rápida
      como el saludo al sol, la guía ES la respiración: «inhala, manos arriba;
      exhala, manos a los pies». {pierna} y {otra} se cambian por derecha e
      izquierda según la vuelta, así cada vuelta trabaja un lado. */
  guion?: string[];
  /** Vueltas por defecto y el rango que admite. */
  vueltas: number;
  vueltasMin: number;
  vueltasMax: number;
  /** La serie entera se hace primero a un lado y después al otro. */
  porLado?: boolean;
  estilos: Estilo[];
  objetivos: Objetivo[];
  nivel: 1 | 2 | 3;
  carga: 1 | 2 | 3;
  /** Por qué estas posturas van juntas y en este orden. Se muestra. */
  porque: string;
  evita?: Cuidado[];
  necesita?: Prop[];
  soloMomento?: Momento[];
  /** Menor número, entra antes cuando el tiempo no alcanza. */
  prioridad: number;
};

export const SECUENCIAS: Secuencia[] = [
  // ══ Saludos al sol ═════════════════════════════════════════
  {
    id: "sol-clasico",
    nombre: "Saludo al sol",
    fase: "saludos",
    pasos: [
      "sal-brazos-arriba",
      "pie-pinza",
      "sal-media-pinza",
      "pie-estocada-baja",
      "pie-perro",
      "sal-media-pinza",
      "pie-pinza",
      "sal-brazos-arriba",
    ],
    // Un movimiento por respiración: cuatro a cinco segundos cada una.
    segundos: [5, 5, 4, 9, 18, 5, 4, 8],
    guion: [
      "Inhala: sube los brazos y estírate todo lo que puedas.",
      "Exhala: baja las manos a los pies.",
      "Inhala: estira la espalda, mirada adelante.",
      "Exhala: lleva la pierna {pierna} atrás, en estocada. Inhala y abre el pecho.",
      "Exhala: la pierna {otra} atrás, perro mirando hacia abajo. Quédate tres respiraciones.",
      "Inhala: camina los pies hacia las manos y estira la espalda.",
      "Exhala: suelta el tronco sobre las piernas.",
      "Inhala: sube con la espalda larga, brazos arriba. Exhala: manos al pecho.",
    ],
    vueltas: 3,
    vueltasMin: 2,
    vueltasMax: 6,
    estilos: ["hatha", "vinyasa"],
    objetivos: ["energia", "flexibilidad", "postura", "fuerza"],
    nivel: 1,
    carga: 2,
    porque:
      "Es la secuencia que calienta el cuerpo entero: sube los brazos, baja a los pies, abre la cadera en la estocada y vuelve. Cada vuelta cambia la pierna que va atrás, así los dos lados quedan parejos. Tres vueltas es la pauta clásica; con dos ya sirve.",
    evita: ["munecas", "hipertension", "glaucoma", "vertigo", "cirugia", "lumbar"],
    soloMomento: ["manana", "dia"],
    prioridad: 1,
  },
  {
    id: "sol-a",
    nombre: "Saludo al sol A",
    fase: "saludos",
    pasos: [
      "sal-brazos-arriba",
      "pie-pinza",
      "pie-plancha",
      "sal-chaturanga",
      "sal-perro-arriba",
      "pie-perro",
      "sal-media-pinza",
      "pie-pinza",
      "sal-brazos-arriba",
    ],
    segundos: [4, 5, 5, 4, 4, 25, 5, 4, 7],
    guion: [
      "Inhala: manos arriba, estírate lo más que puedas.",
      "Exhala: lleva las manos a los pies y estira la espalda.",
      "Inhala: pierna {pierna} atrás y, en la misma respiración, la {otra}. Plancha.",
      "Exhala: chaturanga. Baja con los codos pegados al cuerpo.",
      "Inhala: perro mirando hacia arriba, abre el pecho.",
      "Exhala: perro mirando hacia abajo. Quédate aquí cinco respiraciones.",
      "Inhala: camina los pies hacia las manos y estira la espalda.",
      "Exhala: suelta el tronco sobre las piernas.",
      "Inhala: sube con la espalda larga, manos arriba. Exhala: manos al pecho.",
    ],
    vueltas: 3,
    vueltasMin: 2,
    vueltasMax: 5,
    estilos: ["vinyasa", "ashtanga"],
    objetivos: ["energia", "fuerza", "flexibilidad"],
    nivel: 2,
    carga: 3,
    porque:
      "La versión con plancha y chaturanga: la misma forma del saludo clásico, pero agregando fuerza de brazos y de centro. Es lo que calienta de verdad en una clase de vinyasa, y por eso se hacen de tres a cinco vueltas seguidas.",
    evita: ["munecas", "hombros", "lumbar", "hipertension", "glaucoma", "embarazo", "cirugia", "vertigo"],
    soloMomento: ["manana", "dia"],
    prioridad: 2,
  },

  // ══ Calentar ═══════════════════════════════════════════════
  {
    id: "serie-despertar",
    nombre: "Despertar la columna",
    fase: "calentamiento",
    pasos: ["cal-gato-vaca", "cal-cadera-circulos", "cal-gato-equilibrio"],
    segundos: [40, 35, 40],
    vueltas: 2,
    vueltasMin: 1,
    vueltasMax: 3,
    estilos: ["hatha", "somatico", "iyengar"],
    objetivos: ["espalda", "postura", "energia", "caderas"],
    nivel: 1,
    carga: 1,
    porque:
      "Tres movimientos que llevan la columna en todas sus direcciones, en el orden que conviene: flexionar y extender, después la cadera, y al final la estabilidad. Cada vuelta llega un poco más lejos que la anterior, sin forzar.",
    evita: ["munecas", "rodillas"],
    prioridad: 2,
  },
  {
    id: "serie-cuello-hombros",
    nombre: "Soltar cuello y hombros",
    fase: "calentamiento",
    pasos: ["cal-hombros-circulos", "cal-cuello", "cal-aguja"],
    segundos: [35, 45, 50],
    vueltas: 2,
    vueltasMin: 1,
    vueltasMax: 2,
    estilos: ["silla", "somatico", "iyengar"],
    objetivos: ["cuello_hombros", "postura", "calma"],
    nivel: 1,
    carga: 1,
    porque:
      "De lo más superficial a lo más profundo: primero el hombro entero, después el músculo del cuello, y al final la rotación de la espalda alta. En ese orden, el último estiramiento entra sin pelear.",
    evita: ["cuello", "hombros", "rodillas", "osteoporosis"],
    prioridad: 2,
  },

  // ══ De pie ═════════════════════════════════════════════════
  {
    id: "serie-guerreros",
    nombre: "Serie de guerreros",
    fase: "de_pie",
    pasos: ["pie-guerrero1", "pie-guerrero2", "pie-angulo-lateral", "pie-triangulo"],
    segundos: [35, 35, 30, 30],
    vueltas: 1,
    vueltasMin: 1,
    vueltasMax: 2,
    porLado: true,
    estilos: ["hatha", "vinyasa", "iyengar", "ashtanga"],
    objetivos: ["fuerza", "caderas", "piernas", "equilibrio", "postura"],
    nivel: 2,
    carga: 2,
    porque:
      "Las cuatro se hacen seguidas sin salir de la posición de los pies: cambia el tronco, no la base. Se hace toda la serie de un lado y después toda del otro, que es como se siente la diferencia entre un lado y el otro.",
    evita: ["rodillas", "hombros", "lumbar"],
    prioridad: 2,
  },
  {
    id: "serie-silla-oficina",
    nombre: "Pausa en la silla",
    fase: "de_pie",
    pasos: ["cal-guerrero-silla", "pie-silla-torsion"],
    segundos: [40, 40],
    vueltas: 2,
    vueltasMin: 1,
    vueltasMax: 3,
    estilos: ["silla"],
    objetivos: ["postura", "espalda", "cuello_hombros", "digestion"],
    nivel: 1,
    carga: 1,
    porque:
      "Abrir el costado y después girar. Es lo mínimo que pide una espalda después de dos horas sentada, y se puede hacer vestida y en la oficina.",
    necesita: ["silla"],
    evita: ["embarazo", "osteoporosis"],
    prioridad: 2,
  },

  // ══ Suelo ══════════════════════════════════════════════════
  {
    id: "serie-caderas",
    nombre: "Abrir cadera, paso a paso",
    fase: "suelo",
    pasos: ["pie-estocada-baja", "sue-paloma", "sue-nino"],
    segundos: [50, 70, 30],
    vueltas: 1,
    vueltasMin: 1,
    vueltasMax: 2,
    porLado: true,
    estilos: ["hatha", "vinyasa", "yin"],
    objetivos: ["caderas", "flexibilidad", "espalda"],
    nivel: 2,
    carga: 2,
    porque:
      "La estocada abre el frente de la cadera y prepara la paloma, que trabaja la parte de atrás. Entrar a la paloma en frío es la forma más común de terminar con la rodilla adolorida. El niño al final descomprime antes de cambiar de lado.",
    evita: ["rodillas", "ciatica"],
    prioridad: 3,
  },

  // ══ Abrir el pecho ═════════════════════════════════════════
  {
    id: "serie-espalda-suelo",
    nombre: "Cobra, vuelta por vuelta",
    fase: "extensiones",
    pasos: ["ext-esfinge", "ext-cobra", "sue-nino"],
    segundos: [35, 30, 25],
    vueltas: 3,
    vueltasMin: 2,
    vueltasMax: 4,
    estilos: ["hatha", "iyengar"],
    objetivos: ["espalda", "postura", "pecho"],
    nivel: 2,
    carga: 2,
    porque:
      "Subir y descansar, varias veces, en vez de sostener una sola extensión larga. La espalda responde mejor a repetir que a aguantar, y el niño entremedio es lo que deja seguir sin que se cargue la zona lumbar.",
    evita: ["embarazo", "lumbar", "rodillas", "cirugia"],
    prioridad: 3,
  },
  {
    id: "serie-puente",
    nombre: "Puente repetido",
    fase: "extensiones",
    pasos: ["ext-puente", "enf-rodillas-pecho"],
    segundos: [35, 20],
    vueltas: 3,
    vueltasMin: 2,
    vueltasMax: 4,
    estilos: ["hatha", "iyengar", "somatico"],
    objetivos: ["espalda", "fuerza", "postura", "piernas", "pecho"],
    nivel: 1,
    carga: 2,
    porque:
      "Subir y bajar la pelvis varias veces trabaja el glúteo mucho más que sostenerlo una sola vez. Entre vuelta y vuelta, las rodillas al pecho descansan la espalda baja.",
    evita: ["cuello", "embarazo"],
    prioridad: 4,
  },

  // ══ Bajar ══════════════════════════════════════════════════
  {
    id: "serie-bajar",
    nombre: "Bajar de a poco",
    fase: "enfriamiento",
    pasos: ["enf-rodillas-pecho", "tor-supina", "enf-banana"],
    segundos: [30, 60, 50],
    vueltas: 1,
    vueltasMin: 1,
    vueltasMax: 2,
    estilos: ["restaurativo", "yin", "hatha"],
    objetivos: ["calma", "dormir", "espalda", "digestion"],
    nivel: 1,
    carga: 1,
    porque:
      "El orden con que se cierra una práctica: primero descomprimir la espalda baja, después girar, y al final abrir el costado. Todo acostada, para que el cuerpo ya no tenga que sostener nada antes del savasana.",
    evita: ["embarazo", "osteoporosis"],
    prioridad: 2,
  },
];

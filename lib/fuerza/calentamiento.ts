import type { Patron } from "./tipos";

/* Los movimientos para calentar.

   Antes el calentamiento era un texto que decía «muévete dos minutos»: nadie
   hace eso. Ahora son movimientos concretos, cronometrados, elegidos según lo
   que va a entrenar la sesión. Si hoy hay flexiones, se calientan muñecas y
   hombros; si hay sentadillas, caderas y rodillas.

   Para qué sirve calentar, con honestidad: sube la temperatura del músculo y
   prepara el movimiento que viene, y eso hace que la primera serie salga
   mejor. Lo que NO hace es prevenir lesiones por sí solo, y estirar fuerte
   antes de entrenar incluso baja un poco la fuerza de ese día. Por eso acá
   todo es movimiento, no estiramiento sostenido. */

export type Movimiento = {
  id: string;
  nombre: string;
  segundos: number;
  /** Qué hacer, en una línea que se lee de un vistazo. */
  que: string;
  /** Para qué patrón prepara. Vacío: sirve para cualquier sesión. */
  prepara: Patron[];
};

export const MOVIMIENTOS: Movimiento[] = [
  {
    id: "marcha",
    nombre: "Marcha en el sitio",
    segundos: 60,
    que: "Camina en el sitio levantando las rodillas, cada vez un poco más alto. Si te acomoda, trota suave.",
    prepara: [],
  },
  {
    id: "circulos-brazos",
    nombre: "Círculos de brazos",
    segundos: 30,
    que: "Diez círculos grandes hacia atrás y diez hacia adelante, lentos y hasta donde llegue el hombro.",
    prepara: ["empuje-horizontal", "empuje-vertical", "escapulas", "traccion-horizontal"],
  },
  {
    id: "munecas-tobillos",
    nombre: "Muñecas y tobillos",
    segundos: 30,
    que: "Diez círculos de muñeca hacia cada lado, y diez de tobillo con cada pie.",
    prepara: ["empuje-horizontal", "empuje-vertical", "core-antiextension", "pantorrilla"],
  },
  {
    id: "gato-vaca",
    nombre: "Gato y vaca",
    segundos: 40,
    que: "En cuatro apoyos: redondea la espalda al soltar el aire y ábrela al tomarlo. Despacio, vértebra a vértebra.",
    prepara: ["core-antiextension", "core-lateral", "bisagra"],
  },
  {
    id: "circulos-cadera",
    nombre: "Círculos de cadera",
    segundos: 30,
    que: "De pie, manos en la cintura: cinco círculos grandes hacia un lado y cinco hacia el otro.",
    prepara: ["sentadilla", "bisagra", "zancada"],
  },
  {
    id: "sentadillas-suaves",
    nombre: "Sentadillas sin peso",
    segundos: 40,
    que: "Diez, bajando solo hasta donde vaya cómodo, y un poco más abajo en cada una.",
    prepara: ["sentadilla", "zancada", "bisagra"],
  },
  {
    id: "puentes-suaves",
    nombre: "Puentes de glúteo",
    segundos: 40,
    que: "Boca arriba, diez puentes despacio, apretando el glúteo un segundo arriba.",
    prepara: ["bisagra", "zancada", "sentadilla"],
  },
  {
    id: "balanceo-pierna",
    nombre: "Balanceo de pierna",
    segundos: 40,
    que: "Apoyada en la pared, balancea una pierna adelante y atrás diez veces. Después la otra.",
    prepara: ["zancada", "bisagra", "sentadilla"],
  },
  {
    id: "omoplatos",
    nombre: "Juntar los omóplatos",
    segundos: 30,
    que: "Brazos al frente: junta los omóplatos atrás como si apretaras un lápiz entre ellos. Diez veces, sin subir los hombros.",
    prepara: ["traccion-horizontal", "escapulas", "empuje-horizontal"],
  },
  {
    id: "abrir-pecho",
    nombre: "Abrir el pecho",
    segundos: 30,
    que: "En el marco de una puerta, antebrazos apoyados, da un paso adelante y abre el pecho. Entra y sale, sin quedarte.",
    prepara: ["empuje-horizontal", "empuje-vertical", "escapulas"],
  },
  {
    id: "rotacion-tronco",
    nombre: "Rotaciones de tronco",
    segundos: 30,
    que: "De pie, pies firmes, gira el tronco a un lado y al otro dejando que los brazos se suelten.",
    prepara: ["core-lateral", "core-antiextension", "traccion-horizontal"],
  },
  {
    id: "talones-puntas",
    nombre: "Talones y puntas",
    segundos: 30,
    que: "Sube a las puntas y baja a los talones, quince veces, sin apurarte.",
    prepara: ["pantorrilla", "sentadilla", "zancada"],
  },
];

/** Cuánto dura el calentamiento, como mucho. */
export const TOPE_CALENTAMIENTO = 210;

/* Arma el calentamiento de hoy: siempre algo que suba la temperatura, y
   después lo que prepare los movimientos que vienen. Se eligen los que más
   patrones de la sesión tocan, para que con tres o cuatro quede cubierto. */
export function armarCalentamiento(patrones: Patron[], vuelta = 0): Movimiento[] {
  const general = MOVIMIENTOS.find((m) => m.prepara.length === 0)!;
  const salida: Movimiento[] = [general];
  let usado = general.segundos;

  const puntuados = MOVIMIENTOS.filter((m) => m.prepara.length > 0)
    .map((m) => ({ m, puntos: m.prepara.filter((p) => patrones.includes(p)).length }))
    .filter((x) => x.puntos > 0)
    /* A igualdad de utilidad, se rota con la vuelta: así el calentamiento no
       es idéntico todas las semanas. */
    .sort((a, b) => b.puntos - a.puntos || ((a.m.id.charCodeAt(0) + vuelta) % 7) - ((b.m.id.charCodeAt(0) + vuelta) % 7));

  for (const { m } of puntuados) {
    if (usado + m.segundos > TOPE_CALENTAMIENTO) continue;
    salida.push(m);
    usado += m.segundos;
  }
  return salida;
}

export function segundosDeCalentamiento(ms: Movimiento[]) {
  return ms.reduce((t, m) => t + m.segundos, 0);
}

import { armarCalentamiento, segundosDeCalentamiento, type Movimiento } from "./calentamiento";
import { EJERCICIOS, escalera } from "./ejercicios";
import {
  PATRONES_DEL_ENFOQUE,
  type Cuidado,
  type Ejercicio,
  type Equipo,
  type Patron,
  type Preferencias,
  type SerieHecha,
  type Guardado,
} from "./tipos";

/* Armar la sesión del día.

   Una rutina completa no es una lista de músculos: es un empuje, una
   tracción, algo de rodilla, algo de cadera y algo de centro. Si eso está,
   está entrenado el cuerpo. Las plantillas de abajo reparten esos patrones
   entre las sesiones de la semana, para que ninguno se quede fuera y ninguno
   se repita dos días seguidos.

   Después, para cada patrón, se elige el peldaño en el que va esa persona
   —de la escalera de ejercicios— ajustado a lo que tiene en casa y a lo que
   hay que cuidar. Eso es todo: no hay magia, hay orden. */

/* ── Las plantillas ──────────────────────────────────────── */

const PLANTILLAS: Record<2 | 3 | 4, { nombre: string; patrones: Patron[] }[]> = {
  2: [
    {
      nombre: "Sesión A",
      patrones: ["sentadilla", "empuje-horizontal", "traccion-horizontal", "bisagra", "core-antiextension", "escapulas"],
    },
    {
      nombre: "Sesión B",
      patrones: ["bisagra", "traccion-horizontal", "empuje-vertical", "zancada", "core-lateral", "pantorrilla"],
    },
  ],
  3: [
    {
      nombre: "Sesión A",
      patrones: ["sentadilla", "empuje-horizontal", "traccion-horizontal", "core-antiextension", "escapulas"],
    },
    {
      nombre: "Sesión B",
      patrones: ["bisagra", "traccion-horizontal", "empuje-vertical", "core-lateral", "pantorrilla"],
    },
    {
      nombre: "Sesión C",
      patrones: ["zancada", "empuje-horizontal", "traccion-horizontal", "bisagra", "core-antiextension"],
    },
  ],
  4: [
    {
      nombre: "Torso A",
      patrones: ["empuje-horizontal", "traccion-horizontal", "empuje-vertical", "escapulas", "core-antiextension"],
    },
    {
      nombre: "Piernas A",
      patrones: ["sentadilla", "bisagra", "zancada", "pantorrilla", "core-lateral"],
    },
    {
      nombre: "Torso B",
      patrones: ["traccion-horizontal", "empuje-vertical", "empuje-horizontal", "escapulas", "core-lateral"],
    },
    {
      nombre: "Piernas B",
      patrones: ["bisagra", "sentadilla", "zancada", "pantorrilla", "core-antiextension"],
    },
  ],
};

/* ── Lo que hay que cuidar ───────────────────────────────── */

/* Qué sale de la rutina en cada caso. Es una lista corta a propósito: sacar
   de más deja a la persona sin entrenar, que es peor que el riesgo que se
   quería evitar. */
const EXCLUIR: Record<Cuidado, string[]> = {
  munecas: ["flexion-completa", "flexion-declinada", "flexion-diamante", "pica-suelo", "pica-pies-altos", "plancha-toque", "rodillo"],
  rodillas: ["pistol-silla", "sentadilla-bulgara", "zancada-estatica", "curl-nordico"],
  hombros: ["pica-pies-altos", "flexion-declinada", "flexion-diamante"],
  espalda: ["rodillo", "curl-nordico", "sentadilla-mochila"],
  "suelo-pelvico": ["rodillo", "plancha-toque", "subida-escalon-peso", "curl-nordico"],
  posparto: ["rodillo", "plancha", "plancha-toque", "curl-nordico", "flexion-declinada"],
  embarazo: ["rodillo", "plancha", "plancha-toque", "curl-nordico", "bicho-muerto", "puente", "puente-una-pierna", "flexion-declinada", "pica-pies-altos"],
};

export const AVISOS_CUIDADO: Record<Cuidado, string> = {
  munecas:
    "Fuera lo que carga la muñeca doblada. Si igual molesta, apoya los puños o unos mangos: el ángulo es el problema, no el ejercicio.",
  rodillas:
    "Fuera lo que dobla mucho la rodilla con carga. La fuerza de cuádriceps es de lo mejor que hay para una rodilla que duele; lo que no sirve es forzar el rango.",
  hombros:
    "Fuera lo que carga el hombro por encima de la cabeza. Se mantienen las aperturas y el Y-T-W, que son los que suelen arreglar el problema.",
  espalda:
    "Fuera lo que carga la columna en flexión. Se mantiene la bisagra de cadera: la espalda que no se entrena es la que duele.",
  "suelo-pelvico":
    "Fuera lo que dispara la presión dentro del abdomen. Suelta el aire al hacer el esfuerzo, nunca lo aguantes. Y esto se conversa con una kinesióloga de suelo pélvico: el entrenamiento del propio suelo pélvico tiene evidencia sólida y no está en esta app.",
  posparto:
    "Fuera las planchas y todo lo que empuja hacia afuera la pared abdominal. Antes de volver a la carga conviene que alguien te revise la línea alba.",
  embarazo:
    "Fuera lo que va boca arriba y lo que aprieta el abdomen. Entrenar fuerza en el embarazo está recomendado, pero la rutina la ajusta quien te controla: esto no reemplaza esa conversación.",
};

/* ── Elegir el peldaño ───────────────────────────────────── */

function tieneEquipo(e: Ejercicio, equipo: Equipo[]) {
  return e.equipo.every((q) => equipo.includes(q));
}

function excluido(e: Ejercicio, cuidados: Cuidado[]) {
  return cuidados.some((c) => EXCLUIR[c].includes(e.id));
}

/** El ejercicio que le toca hoy a este patrón: su peldaño, o el más cercano
    por debajo que se pueda hacer con lo que hay en casa. */
export function elegir(patron: Patron, prefs: Preferencias, niveles: Partial<Record<Patron, number>>) {
  const objetivo = niveles[patron] ?? 1;
  const posibles = escalera(patron).filter(
    (e) => tieneEquipo(e, prefs.equipo) && !excluido(e, prefs.cuidados)
  );
  if (posibles.length === 0) return null;
  // El peldaño pedido, o el más alto por debajo. Si todos están por encima,
  // el más bajo que se pueda hacer.
  const abajo = posibles.filter((e) => e.nivel <= objetivo);
  return abajo.length > 0 ? abajo[abajo.length - 1] : posibles[0];
}

/* ── Cuánto cabe en el rato que hay ──────────────────────── */

/** Minutos que se lleva un ejercicio: el trabajo más los descansos. Se
    calcula con el medio del rango, no con el tope: casi nadie hace el máximo
    en todas las series, y estimar de más deja sesiones a medias. */
function costo(e: Ejercicio, descanso: number, series: number) {
  const medio = (e.repes[0] + e.repes[1]) / 2;
  const trabajo = e.porTiempo ? medio : medio * 3;
  return (series * (trabajo + descanso)) / 60;
}

export type PasoSesion = {
  ejercicio: Ejercicio;
  patron: Patron;
  series: number;
  /** Lo que se apunta como meta de hoy. */
  repes: [number, number];
};

export type Sesion = {
  nombre: string;
  /** Los movimientos para calentar, elegidos según lo que viene. */
  calentamiento: Movimiento[];
  pasos: PasoSesion[];
  minutos: number;
  /** Patrones que se quedaron fuera por falta de equipo. */
  faltantes: { patron: Patron; porQue: string }[];
};

export const AL_TERMINAR = [
  "Estira lo que quedó cargado, sin buscar nada heroico: treinta segundos por sitio.",
  "El músculo crece entre sesión y sesión, no durante. Come proteína y duerme.",
];

export function armarSesion(g: Guardado): Sesion {
  const { prefs, niveles } = g;
  const plantillas = PLANTILLAS[prefs.dias];
  const plantilla = plantillas[g.vuelta % plantillas.length];

  /* Lo elegido va primero y en todas las sesiones: primero porque se entrena
     mejor con el cuerpo fresco, y en todas porque lo que hace crecer un
     músculo son las series de la semana, no las de un día. */
  const delEnfoque = PATRONES_DEL_ENFOQUE[prefs.enfoque ?? "todo"];
  const resto = plantilla.patrones.filter((p) => !delEnfoque.includes(p));

  /* Con enfoque entran dos movimientos más, así que en una sesión corta el
     final de la lista se cae por tiempo. Para que no sea siempre el mismo el
     que se pierde —el centro iba último en las tres plantillas y no aparecía
     nunca—, el resto arranca en un punto distinto cada sesión. */
  const giro = delEnfoque.length > 0 && resto.length > 0 ? g.vuelta % resto.length : 0;
  const patrones = [...delEnfoque, ...resto.slice(giro), ...resto.slice(0, giro)];

  const faltantes: Sesion["faltantes"] = [];
  const elegidos: { e: Ejercicio; patron: Patron }[] = [];
  for (const patron of patrones) {
    const e = elegir(patron, prefs, niveles);
    if (!e) {
      faltantes.push({ patron, porQue: porQueFalta(patron, prefs) });
      continue;
    }
    elegidos.push({ e, patron });
  }

  const tope = prefs.minutos - 4; // cuatro minutos para el calentamiento

  /* Cuando el rato no alcanza, lo primero que se recorta son las series, no
     los movimientos: una sesión con los seis patrones a dos series entrena el
     cuerpo entero, y una con dos movimientos a tres series no. Recortar
     ejercicios es el último recurso, y nunca por debajo de tres. */
  let series = 3;
  let usado = 0;
  for (; series >= 2; series--) {
    usado = elegidos.reduce((t, { e }) => t + costo(e, prefs.descanso, Math.min(series, e.series)), 0);
    if (usado <= tope) break;
  }
  series = Math.max(2, series);

  const pasos: PasoSesion[] = [];
  usado = 0;
  for (const { e, patron } of elegidos) {
    const n = Math.min(series, e.series);
    const c = costo(e, prefs.descanso, n);
    // Lo que se pidió enfocar no se recorta por tiempo: para eso se pidió.
    const esDelEnfoque = delEnfoque.includes(patron);
    if (!esDelEnfoque && pasos.length >= 3 && usado + c > tope) continue;
    usado += c;
    pasos.push({ ejercicio: e, patron, series: n, repes: e.repes });
  }

  /* El calentamiento se arma con los patrones que de verdad quedaron en la
     sesión, no con los que se pidieron: no tiene sentido calentar muñecas
     para una flexión que al final no entró. */
  const calentamiento = armarCalentamiento(
    pasos.map((p) => p.patron),
    g.vuelta
  );

  return {
    nombre: plantilla.nombre,
    calentamiento,
    pasos,
    minutos: Math.round(usado + segundosDeCalentamiento(calentamiento) / 60),
    faltantes,
  };
}

function porQueFalta(patron: Patron, prefs: Preferencias) {
  const todos = escalera(patron);
  const porCuidado = todos.every((e) => excluido(e, prefs.cuidados));
  if (porCuidado) return "Sale por lo que pediste cuidar.";
  const equipos = new Set<Equipo>();
  for (const e of todos) for (const q of e.equipo) if (!prefs.equipo.includes(q)) equipos.add(q);
  return `Hace falta ${[...equipos].join(" o ")}.`;
}

/* ── Subir de peldaño ────────────────────────────────────── */

/* La sobrecarga progresiva, que es lo único que de verdad hace crecer el
   músculo, hecha concreta: si todas las series llegaron al tope del rango,
   el peldaño ya te queda chico y la app te sube al siguiente. */
export function subeDePeldano(e: Ejercicio, series: SerieHecha[], pedidas = e.series) {
  if (series.length < Math.min(pedidas, e.series)) return false;
  return series.every((s) => s.repes >= e.repes[1]);
}

export function siguientePeldano(e: Ejercicio) {
  const chain = escalera(e.patron);
  const i = chain.findIndex((x) => x.id === e.id);
  return i >= 0 && i + 1 < chain.length ? chain[i + 1] : null;
}

/** Cuántos peldaños le quedan a este patrón, para mostrar el progreso. */
export function largoDeEscalera(patron: Patron) {
  return escalera(patron).length;
}

export const TOTAL_EJERCICIOS = EJERCICIOS.length;

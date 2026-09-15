import { POSTURAS } from "./posturas";
import { RESPIRACIONES } from "./respiracion";
import {
  FASES,
  type Cuidado,
  type Estilo,
  type Fase,
  type Nivel,
  type Objetivo,
  type Paso,
  type Preferencias,
  type Prop,
} from "./tipos";

/* Cómo se arma una rutina.

   En tres movimientos:

   1. SE FILTRA. Sale todo lo que no corresponde: contraindicado por un
      cuidado marcado, por encima del nivel, más fuerte que la intensidad
      pedida, o que necesita un prop que no hay. Lo que se saca por un cuidado
      queda anotado: la persona tiene derecho a saber qué le quitamos y por qué.

   2. SE REPARTE EL TIEMPO POR FASE. Cada fase recibe un pedazo del tiempo
      según la hora del día, los objetivos, la intensidad y los estilos
      elegidos. De mañana pesa el saludo al sol; de noche pesan el suelo y el
      savasana. Ese reparto es lo que hace que dos personas con el mismo rato
      disponible reciban prácticas distintas.

   3. SE AJUSTA LA DURACIÓN. Cada postura tiene un mínimo y un máximo propio:
      un yin de treinta segundos no es yin, y un guerrero de cuatro minutos es
      una tortura. El ajuste estira o encoge dentro de esos límites hasta que
      el total calce con el tiempo pedido.

   El ORDEN nunca se toca: es el de FASES y, dentro de cada fase, el del
   catálogo. */

export const CATALOGO: Paso[] = [...RESPIRACIONES, ...POSTURAS];

export type PasoRutina = Paso & {
  /** Duración final, ya ajustada. Si es por lado, este es el tiempo TOTAL. */
  duracion: number;
};

export type Quitada = { nombre: string; motivo: string };

export type Rutina = {
  pasos: PasoRutina[];
  segundos: number;
  prefs: Preferencias;
  /** Lo que se sacó por un cuidado marcado, para poder mostrarlo. */
  quitadas: Quitada[];
  /** Props que aparecen en la rutina y que la persona dijo tener. */
  propsUsados: Prop[];
};

const NIVEL_MAX: Record<Nivel, 1 | 2 | 3> = {
  primera: 1,
  poco: 2,
  regular: 3,
  avanzada: 3,
};

const CARGA_MAX: Record<Preferencias["intensidad"], 1 | 2 | 3> = {
  suave: 2,
  media: 3,
  fuerte: 3,
};

/* La intensidad no corta en seco: inclina la elección. En suave entra algo de
   trabajo, pero primero todo lo blando; en fuerte pasa al revés. Cortar en
   seco dejaba las rutinas suaves con cuatro pasos y mucho relleno. */
const SESGO_CARGA: Record<Preferencias["intensidad"], number> = {
  suave: -1.6,
  media: -0.3,
  fuerte: 0.9,
};

const RITMO: Record<Preferencias["ritmo"], number> = {
  pausado: 1.3,
  normal: 1,
  ligero: 0.78,
};

/* Peso base de cada fase. Es la forma de una clase equilibrada antes de saber
   nada de quién la va a hacer. */
const PESO_BASE: Record<Fase, number> = {
  centrado: 0.5,
  respiracion: 1,
  calentamiento: 1.5,
  saludos: 1.2,
  de_pie: 2,
  equilibrio: 0.8,
  suelo: 2,
  extensiones: 1.4,
  torsiones: 0.9,
  invertidas: 0.9,
  enfriamiento: 1,
  respiracion_final: 0.7,
  savasana: 1.2,
  meditacion: 1,
};

/* La hora del día es lo que más cambia la forma de la práctica. */
const POR_MOMENTO: Record<Preferencias["momento"], Partial<Record<Fase, number>>> = {
  manana: { saludos: 1.9, de_pie: 1.4, calentamiento: 1.2, invertidas: 0.6, savasana: 0.8, meditacion: 0.7 },
  dia: { calentamiento: 1.3, de_pie: 1.2, extensiones: 1.2, savasana: 0.9, saludos: 0.8 },
  noche: {
    saludos: 0.15,
    de_pie: 0.45,
    equilibrio: 0.5,
    suelo: 1.5,
    invertidas: 1.6,
    enfriamiento: 1.5,
    respiracion_final: 1.7,
    savasana: 1.5,
    meditacion: 1.4,
  },
};

const POR_INTENSIDAD: Record<Preferencias["intensidad"], Partial<Record<Fase, number>>> = {
  suave: { saludos: 0.25, de_pie: 0.55, equilibrio: 0.7, suelo: 1.4, enfriamiento: 1.3, savasana: 1.3 },
  media: {},
  fuerte: { saludos: 1.7, de_pie: 1.6, equilibrio: 1.3, extensiones: 1.2, suelo: 0.8, savasana: 0.9 },
};

/* Cuánto suma cada objetivo a cada fase. Esto es el corazón de que la rutina
   responda a lo que se pidió y no sea siempre la misma clase. */
const POR_OBJETIVO: Record<Objetivo, Partial<Record<Fase, number>>> = {
  energia: { saludos: 1.4, de_pie: 0.9, calentamiento: 0.4 },
  calma: { respiracion: 0.9, suelo: 0.5, respiracion_final: 0.7, savasana: 0.7 },
  dormir: { suelo: 0.6, invertidas: 0.6, enfriamiento: 0.9, respiracion_final: 0.9, savasana: 1.1 },
  espalda: { calentamiento: 0.9, suelo: 0.7, extensiones: 0.6, torsiones: 0.4 },
  cuello_hombros: { calentamiento: 1.1, extensiones: 0.7, enfriamiento: 0.5 },
  caderas: { suelo: 1.6, de_pie: 0.5 },
  flexibilidad: { suelo: 1.1, de_pie: 0.5, enfriamiento: 0.3 },
  fuerza: { de_pie: 1.3, saludos: 0.7, extensiones: 0.5, equilibrio: 0.3 },
  equilibrio: { equilibrio: 1.8, de_pie: 0.4 },
  digestion: { torsiones: 1.2, suelo: 0.4, calentamiento: 0.3 },
  menstrual: { suelo: 1.1, enfriamiento: 0.6, invertidas: 0.4, savasana: 0.4 },
  embarazo: { suelo: 0.9, de_pie: 0.5, respiracion: 0.5 },
  foco: { respiracion: 0.9, equilibrio: 0.6, meditacion: 1 },
  postura: { extensiones: 1.2, calentamiento: 0.6, de_pie: 0.3 },
  piernas: { invertidas: 1.4, de_pie: 0.4, enfriamiento: 0.4 },
  pecho: { extensiones: 1.3, calentamiento: 0.4, respiracion: 0.3 },
};

const POR_ESTILO: Record<Estilo, Partial<Record<Fase, number>>> = {
  hatha: {},
  vinyasa: { saludos: 1.7, de_pie: 1.3 },
  ashtanga: { saludos: 1.8, de_pie: 1.4, equilibrio: 1.2 },
  iyengar: { de_pie: 1.3, extensiones: 1.1 },
  yin: { suelo: 1.7, enfriamiento: 1.3, de_pie: 0.5, saludos: 0.3 },
  restaurativo: { suelo: 1.5, enfriamiento: 1.4, savasana: 1.5, de_pie: 0.3, saludos: 0.2 },
  kundalini: { respiracion: 1.8, meditacion: 1.3 },
  nidra: { savasana: 2, respiracion_final: 1.3, de_pie: 0.4, saludos: 0.2 },
  silla: { de_pie: 1.2, calentamiento: 1.3, suelo: 0.4, invertidas: 0.5, saludos: 0.2 },
  somatico: { calentamiento: 1.5, suelo: 1.2, saludos: 0.3 },
};

function pesoDeFase(fase: Fase, p: Preferencias) {
  let peso = PESO_BASE[fase];
  peso *= POR_MOMENTO[p.momento][fase] ?? 1;
  peso *= POR_INTENSIDAD[p.intensidad][fase] ?? 1;
  for (const o of p.objetivos) peso += POR_OBJETIVO[o][fase] ?? 0;
  for (const e of p.estilos) peso *= POR_ESTILO[e][fase] ?? 1;
  if (fase === "respiracion" || fase === "respiracion_final") peso *= p.respiracion ? 1 : 0;
  if (fase === "meditacion") peso *= p.meditacion ? 1 : 0;
  return Math.max(0, peso);
}

/** Motivo por el que un cuidado saca una postura, en palabras de la persona. */
const MOTIVO: Record<Cuidado, string> = {
  rodillas: "carga las rodillas",
  munecas: "pone peso en las muñecas",
  hombros: "exige los hombros",
  cuello: "comprime el cuello",
  lumbar: "tensa la espalda baja",
  ciatica: "puede irritar el nervio",
  hipertension: "sube la presión",
  glaucoma: "sube la presión dentro del ojo",
  embarazo: "no va en el embarazo",
  menstruacion: "mejor dejarla para otro día",
  osteoporosis: "flexiona o tuerce la columna cargada",
  vertigo: "puede marear",
  cirugia: "no va tan pronto después de una cirugía",
  hipermovilidad: "estira pasivo y sin control",
};

/* Dos funciones, no una: `pasaElFiltro` decide si el paso entra, y
   `motivoDeCuidado` explica solo los descartes que la persona merece ver.
   Que una postura no entre por nivel o por falta de un bloque no se avisa —
   sería ruido. Que se saque porque marcaste glaucoma, sí. */
function motivoDeCuidado(paso: Paso, p: Preferencias): string | null {
  if (paso.soloCuidados && !paso.soloCuidados.some((c) => p.cuidados.includes(c))) return null;
  const choque = paso.evita?.find((c) => p.cuidados.includes(c));
  if (choque) return MOTIVO[choque];
  if (
    p.cuidados.includes("cirugia") &&
    paso.familia !== "respiracion" &&
    paso.familia !== "quietud"
  ) {
    return MOTIVO.cirugia;
  }
  return null;
}

/* Cuántos pasos como máximo por fase. Savasana es uno: savasana y yoga nidra
   juntos son dos finales seguidos. Respiración es dos: tres pranayamas antes
   de moverse es una clase de respiración, no de yoga. */
const MAX_POR_FASE: Partial<Record<Fase, number>> = {
  centrado: 2,
  respiracion: 2,
  respiracion_final: 1,
  savasana: 1,
  meditacion: 1,
  saludos: 2,
  invertidas: 1,
};

function pasaElFiltro(paso: Paso, p: Preferencias) {
  if (paso.soloAvanzada && p.nivel !== "avanzada") return false;
  if (paso.soloCuidados && !paso.soloCuidados.some((c) => p.cuidados.includes(c))) return false;
  if (paso.evita?.some((c) => p.cuidados.includes(c))) return false;
  if (paso.necesita?.some((prop) => !p.props.includes(prop))) return false;
  if (paso.nivel > NIVEL_MAX[p.nivel]) return false;
  if (paso.carga > CARGA_MAX[p.intensidad]) return false;
  if (paso.soloPrimeraVez && p.nivel !== "primera") return false;
  if (paso.soloMomento && !paso.soloMomento.includes(p.momento)) return false;
  if (
    p.cuidados.includes("cirugia") &&
    paso.familia !== "respiracion" &&
    paso.familia !== "quietud"
  ) {
    return false;
  }
  return true;
}

function quitadasPorCuidado(p: Preferencias): Quitada[] {
  const quitadas: Quitada[] = [];
  const vistos = new Set<string>();
  for (const paso of CATALOGO) {
    const motivo = motivoDeCuidado(paso, p);
    if (!motivo || vistos.has(paso.nombre)) continue;
    vistos.add(paso.nombre);
    quitadas.push({ nombre: paso.nombre, motivo });
  }
  return quitadas;
}

/** Cuánto responde este paso a lo que se pidió. Más alto, entra antes. */
function puntaje(paso: Paso, p: Preferencias) {
  const objetivos = paso.objetivos.filter((o) => p.objetivos.includes(o)).length;
  const estilo = paso.estilos.some((e) => p.estilos.includes(e)) ? 1 : 0;
  const neutro = paso.estilos.length === 0 ? 0.35 : 0;
  const carga = (paso.carga - 1) * SESGO_CARGA[p.intensidad];
  return objetivos * 3 + estilo * 2.2 + neutro + carga - paso.prioridad * 0.45;
}

function duracionBase(paso: Paso, p: Preferencias) {
  const factor = paso.familia === "quietud" || paso.familia === "respiracion" ? 1 : RITMO[p.ritmo];
  const bruta = Math.round(paso.segundos * factor);
  const min = paso.minimo ?? Math.round(paso.segundos * 0.6);
  const max = paso.maximo ?? Math.round(paso.segundos * 1.8);
  return Math.min(max, Math.max(min, bruta));
}

function total(paso: Paso, segundos: number) {
  return paso.porLado ? segundos * 2 : segundos;
}

export function armarRutina(prefs: Preferencias): Rutina {
  const quitadas = quitadasPorCuidado(prefs);
  const disponibles = CATALOGO.filter((p) => pasaElFiltro(p, prefs));

  const objetivoSegundos = prefs.minutos * 60;

  // Lo que entra sí o sí.
  const base = disponibles.filter((p) => p.base);
  const usados = new Map<string, number>();
  for (const p of base) usados.set(p.id, duracionBase(p, prefs));

  const gastoBase = base.reduce((a, p) => a + total(p, usados.get(p.id) ?? 0), 0);
  const libre = Math.max(0, objetivoSegundos - gastoBase);

  // Reparto del tiempo libre entre las fases.
  const pesos = FASES.map((f) => [f, pesoDeFase(f, prefs)] as const);
  const sumaPesos = pesos.reduce((a, [, w]) => a + w, 0) || 1;

  for (const [fase, peso] of pesos) {
    let cupo = Math.round((peso / sumaPesos) * libre);
    if (cupo <= 0) continue;

    const candidatos = disponibles
      .filter((p) => p.fase === fase && !usados.has(p.id))
      .sort((a, b) => puntaje(b, prefs) - puntaje(a, prefs));

    const tope = MAX_POR_FASE[fase] ?? 99;
    let puestos = 0;
    for (const paso of candidatos) {
      if (puestos >= tope) break;
      const minimo = total(paso, paso.minimo ?? Math.round(paso.segundos * 0.6));
      if (minimo > cupo) continue;
      const quiere = total(paso, duracionBase(paso, prefs));
      const gasta = Math.min(quiere, cupo);
      usados.set(paso.id, paso.porLado ? Math.round(gasta / 2) : gasta);
      puestos++;
      cupo -= gasta;
      if (cupo < 30) break;
    }
  }

  /* Si sobró tiempo, se agregan más posturas antes de estirar las que ya están.
     Una rutina de veinte minutos con seis posturas larguísimas no es lo que
     alguien pidió: es la misma clase corta, inflada. */
  const sumaActual = () =>
    CATALOGO.filter((x) => usados.has(x.id)).reduce((a, x) => a + total(x, usados.get(x.id) ?? 0), 0);

  const porPeso = [...pesos].sort((a, b) => b[1] - a[1]);
  let vueltasRelleno = 0;
  while (objetivoSegundos - sumaActual() > 45 && vueltasRelleno < 4) {
    vueltasRelleno++;
    let agrego = false;
    for (const [fase, peso] of porPeso) {
      if (peso <= 0) continue;
      const resto = objetivoSegundos - sumaActual();
      if (resto <= 45) break;
      const yaPuestos = CATALOGO.filter((x) => x.fase === fase && usados.has(x.id)).length;
      if (yaPuestos >= (MAX_POR_FASE[fase] ?? 99)) continue;
      const siguiente = disponibles
        .filter((x) => x.fase === fase && !usados.has(x.id))
        .sort((a, b) => puntaje(b, prefs) - puntaje(a, prefs))
        .find((x) => total(x, x.minimo ?? Math.round(x.segundos * 0.6)) <= resto);
      if (!siguiente) continue;
      const quiere = total(siguiente, duracionBase(siguiente, prefs));
      const gasta = Math.min(quiere, resto);
      usados.set(siguiente.id, siguiente.porLado ? Math.round(gasta / 2) : gasta);
      agrego = true;
    }
    if (!agrego) break;
  }

  /* Ajuste fino: lo elegido casi nunca suma justo el tiempo pedido. Se estira
     o se encoge todo en proporción, respetando el mínimo y el máximo de cada
     postura. Dos pasadas bastan para quedar cerca. */
  let elegidos = CATALOGO.filter((p) => usados.has(p.id));
  for (let vuelta = 0; vuelta < 2; vuelta++) {
    const suma = elegidos.reduce((a, p) => a + total(p, usados.get(p.id) ?? 0), 0);
    if (suma === 0) break;
    const factor = objetivoSegundos / suma;
    if (factor > 0.97 && factor < 1.03) break;
    for (const p of elegidos) {
      const min = p.minimo ?? Math.round(p.segundos * 0.6);
      /* Tope duro: ninguna postura se lleva más del 15% de la práctica. Sin
         esto el savasana se comía la mitad de una rutina de diez minutos,
         porque su máximo son diez minutos. */
      const techo = Math.max(min, Math.round(objetivoSegundos * 0.15));
      const max = Math.min(p.maximo ?? Math.round(p.segundos * 1.8), techo);
      const ahora = usados.get(p.id) ?? p.segundos;
      usados.set(p.id, Math.round(Math.min(max, Math.max(min, ahora * factor)) / 5) * 5);
    }
  }

  elegidos = CATALOGO.filter((p) => usados.has(p.id));
  const pasos: PasoRutina[] = elegidos.map((p) => ({
    ...p,
    duracion: total(p, usados.get(p.id) ?? p.segundos),
  }));

  const propsUsados = [
    ...new Set(pasos.flatMap((p) => [...(p.necesita ?? []), ...(p.mejoraCon ?? [])])),
  ].filter((prop) => prefs.props.includes(prop));

  return {
    pasos,
    segundos: pasos.reduce((a, p) => a + p.duracion, 0),
    prefs,
    quitadas,
    propsUsados,
  };
}

/** Agrupa la rutina por fase, en el orden de la práctica, sin fases vacías. */
export function porFase(rutina: Rutina) {
  return FASES.map((fase) => ({
    fase,
    pasos: rutina.pasos.filter((p) => p.fase === fase),
  })).filter((g) => g.pasos.length > 0);
}

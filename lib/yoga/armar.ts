import { posturasDeChakras } from "./chakras";
import { POSTURAS } from "./posturas";
import { RESPIRACIONES } from "./respiracion";
import { SECUENCIAS, type Secuencia } from "./secuencias";
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

/* Cómo se arma una práctica.

   Una clase no es una lista de posturas sueltas. Tiene tres capas, y el
   armado las respeta en este orden:

   1. SECUENCIAS. Cadenas que van juntas y se repiten: el saludo al sol tres
      vueltas, la serie de guerreros de un lado y después del otro, tres
      vueltas de cobra. Son el esqueleto de la clase, así que se eligen
      PRIMERO en cada fase y se llevan el mejor pedazo del tiempo.

   2. POSTURAS QUE PREPARAN. Si entra una postura exigente que tiene
      preparación declarada (`prepararCon`), su preparación entra antes. La
      paloma no se hace en frío; el camello tampoco.

   3. POSTURAS SUELTAS. Con lo que queda, se rellena con lo que responda a los
      objetivos, al estilo y a los chakras elegidos.

   Después de eso se ajustan las duraciones: cada postura tiene su mínimo y su
   máximo, y todo se estira o encoge dentro de esos límites hasta calzar con el
   rato disponible.

   El ORDEN nunca se toca: el de FASES, y dentro de cada fase primero las
   secuencias y después lo suelto. */

export const CATALOGO: Paso[] = [...RESPIRACIONES, ...POSTURAS];

const POR_ID = new Map(CATALOGO.map((p) => [p.id, p]));

/** Marca que un paso viene dentro de una serie, y en qué vuelta va. */
export type EnSecuencia = {
  id: string;
  nombre: string;
  vuelta: number;
  vueltas: number;
  lado?: "derecho" | "izquierdo";
  porque: string;
};

export type PasoRutina = Paso & {
  /** Duración final, ya ajustada. Si es por lado, este es el tiempo TOTAL. */
  duracion: number;
  /** Clave única: una misma postura puede repetirse en varias vueltas. */
  clave: string;
  secuencia?: EnSecuencia;
  /** Fase bajo la que se muestra. Para una serie es la fase de la serie, no
      la de cada postura: si no, el saludo al sol aparece partido. */
  faseVisible: Fase;
  /** Lo que dura este paso por diseño de la serie. Manda sobre el mínimo y el
      máximo de la postura suelta: dentro de un saludo al sol, la pinza son
      doce segundos, no cuarenta. */
  disenada?: number;
  /** Lo que dice la voz en este paso de una serie, con la respiración. */
  guion?: string;
  /** Segundos que tarda la voz en decir el guion y el aviso, más un respiro
      para hacer el movimiento. Ningún ajuste baja el paso de aquí. */
  hablar?: number;
  /** Aviso que se dice antes del paso: que empiezan los saludos al sol, que
      desde ahora se respira por la nariz, que se cambia de lado. Sus segundos
      ya están sumados a la duración, para no comerse el tiempo de la postura. */
  aviso?: string;
  avisoSegundos?: number;
  /** En una postura suelta que va por lado: segundos para cambiar de lado.
      También sumados, así el segundo lado recibe su tiempo completo. */
  transicion?: number;
};

export type Quitada = { nombre: string; motivo: string };

export type Rutina = {
  pasos: PasoRutina[];
  segundos: number;
  prefs: Preferencias;
  quitadas: Quitada[];
  propsUsados: Prop[];
  /** Las series que quedaron en la práctica, con sus vueltas. */
  series: { nombre: string; vueltas: number; porque: string; porLado?: boolean }[];
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
   trabajo, pero primero todo lo blando; en fuerte pasa al revés. */
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

/* Peso base de cada fase: la forma de una clase equilibrada antes de saber
   nada de quién la va a hacer. */
const PESO_BASE: Record<Fase, number> = {
  centrado: 0.5,
  respiracion: 1,
  calentamiento: 1.5,
  saludos: 1.6,
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
  dia: { calentamiento: 1.3, de_pie: 1.2, extensiones: 1.2, savasana: 0.9, saludos: 0.9 },
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
  suave: { saludos: 0.4, de_pie: 0.55, equilibrio: 0.7, suelo: 1.4, enfriamiento: 1.3, savasana: 1.3 },
  media: {},
  fuerte: { saludos: 1.7, de_pie: 1.6, equilibrio: 1.3, extensiones: 1.2, suelo: 0.8, savasana: 0.9 },
};

/* Cuánto suma cada objetivo a cada fase. Es el corazón de que la práctica
   responda a lo que se pidió y no sea siempre la misma clase. */
const POR_OBJETIVO: Record<Objetivo, Partial<Record<Fase, number>>> = {
  energia: { saludos: 1.6, de_pie: 0.9, calentamiento: 0.4 },
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
  silla: { de_pie: 1.2, calentamiento: 1.3, suelo: 0.4, extensiones: 0.45, invertidas: 0.5, saludos: 0.2 },
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

function pasaElFiltro(paso: Paso, p: Preferencias) {
  if (paso.soloCuidados && !paso.soloCuidados.some((c) => p.cuidados.includes(c))) return false;
  if (paso.evita?.some((c) => p.cuidados.includes(c))) return false;
  if (paso.necesita?.some((prop) => !p.props.includes(prop))) return false;
  if (paso.nivel > NIVEL_MAX[p.nivel]) return false;
  if (paso.carga > CARGA_MAX[p.intensidad]) return false;
  if (paso.soloPrimeraVez && p.nivel !== "primera") return false;
  if (paso.soloAvanzada && p.nivel !== "avanzada") return false;
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
    if (paso.soloEnSecuencia) continue;
    const motivo = motivoDeCuidado(paso, p);
    if (!motivo || vistos.has(paso.nombre)) continue;
    vistos.add(paso.nombre);
    quitadas.push({ nombre: paso.nombre, motivo });
  }
  return quitadas;
}

/** Una secuencia solo entra si TODOS sus pasos pasan el filtro. */
function secuenciaDisponible(sec: Secuencia, p: Preferencias) {
  if (sec.evita?.some((c) => p.cuidados.includes(c))) return false;
  if (sec.necesita?.some((prop) => !p.props.includes(prop))) return false;
  if (sec.nivel > NIVEL_MAX[p.nivel]) return false;
  if (sec.carga > CARGA_MAX[p.intensidad]) return false;
  if (sec.soloMomento && !sec.soloMomento.includes(p.momento)) return false;
  return sec.pasos.every((id) => {
    const paso = POR_ID.get(id);
    return paso ? pasaElFiltro(paso, p) : false;
  });
}

/** Cuánto responde algo a lo que se pidió. Más alto, entra antes. */
function puntaje(
  cosa: { objetivos: Objetivo[]; estilos: Estilo[]; carga: 1 | 2 | 3; prioridad: number; id: string },
  p: Preferencias,
  deChakras: Set<string>
) {
  const objetivos = cosa.objetivos.filter((o) => p.objetivos.includes(o)).length;
  const estilo = cosa.estilos.some((e) => p.estilos.includes(e)) ? 1 : 0;
  const neutro = cosa.estilos.length === 0 ? 0.35 : 0;
  const carga = (cosa.carga - 1) * SESGO_CARGA[p.intensidad];
  const chakra = deChakras.has(cosa.id) ? 2.6 : 0;
  return objetivos * 3 + estilo * 2.2 + neutro + carga + chakra - cosa.prioridad * 0.45;
}

function duracionBase(paso: Paso, p: Preferencias) {
  const factor = paso.familia === "quietud" || paso.familia === "respiracion" ? 1 : RITMO[p.ritmo];
  const bruta = Math.round(paso.segundos * factor);
  return Math.min(maximoDe(paso), Math.max(minimoDe(paso), bruta));
}

const minimoDe = (paso: Paso) => paso.minimo ?? Math.round(paso.segundos * 0.6);
const maximoDe = (paso: Paso) => paso.maximo ?? Math.round(paso.segundos * 1.8);

const conLado = (paso: Paso, segundos: number) => (paso.porLado ? segundos * 2 : segundos);

/** Lo que cuesta una secuencia entera, con sus vueltas y sus dos lados. */
function costoSecuencia(sec: Secuencia, vueltas: number) {
  const vuelta = sec.segundos.reduce((a, s) => a + s, 0);
  return vuelta * vueltas * (sec.porLado ? 2 : 1);
}

/* Lo elegido, antes de convertirse en pasos con duración. */
type Elegido =
  | { tipo: "paso"; paso: Paso; segundos: number }
  | { tipo: "secuencia"; sec: Secuencia; vueltas: number };

export function armarRutina(prefs: Preferencias): Rutina {
  const quitadas = quitadasPorCuidado(prefs);
  const deChakras = posturasDeChakras(prefs.chakras ?? []);
  const disponibles = CATALOGO.filter((p) => !p.soloEnSecuencia && pasaElFiltro(p, prefs));

  const objetivoSegundos = prefs.minutos * 60;
  const usados = new Set<string>();
  const porFaseElegido = new Map<Fase, Elegido[]>();
  const meter = (fase: Fase, e: Elegido) => {
    const lista = porFaseElegido.get(fase) ?? [];
    lista.push(e);
    porFaseElegido.set(fase, lista);
  };

  // ── Lo que entra sí o sí ──────────────────────────────────
  let gastado = 0;
  const topeBase = Math.max(20, Math.round(objetivoSegundos * 0.08));
  for (const paso of disponibles.filter((p) => p.base && pesoDeFase(p.fase, prefs) > 0)) {
    usados.add(paso.id);
    const s = Math.min(duracionBase(paso, prefs), Math.max(minimoDe(paso), topeBase));
    meter(paso.fase, { tipo: "paso", paso, segundos: Math.min(s, topeBase) });
    gastado += conLado(paso, Math.min(s, topeBase));
  }

  // ── Reparto del tiempo por fase ───────────────────────────
  const pesos = FASES.map((f) => [f, pesoDeFase(f, prefs)] as const);
  const sumaPesos = pesos.reduce((a, [, w]) => a + w, 0) || 1;
  const libre = Math.max(0, objetivoSegundos - gastado);

  for (const [fase, peso] of pesos) {
    let cupo = Math.round((peso / sumaPesos) * libre);
    if (cupo <= 0) continue;

    /* 1. La secuencia primero: es el esqueleto de la fase. */
    const seriesPosibles = SECUENCIAS.filter(
      (s) =>
        s.fase === fase &&
        secuenciaDisponible(s, prefs) &&
        !s.pasos.some((id) => usados.has(id) && !POR_ID.get(id)?.base)
    ).sort((a, b) => puntaje(b, prefs, deChakras) - puntaje(a, prefs, deChakras));

    const cupoSerie = Math.round(cupo * 1.45);
    for (const sec of seriesPosibles) {
      if (costoSecuencia(sec, sec.vueltasMin) > cupoSerie) continue;
      // Cuántas vueltas caben: se parte de las que pide la serie y se sube si
      // sobra tiempo, porque repetir es la gracia.
      let vueltas = sec.vueltasMin;
      for (let v = sec.vueltas; v >= sec.vueltasMin; v--) {
        if (costoSecuencia(sec, v) <= cupoSerie) {
          vueltas = v;
          break;
        }
      }
      // Si después de eso todavía sobra sitio, se suman vueltas: repetir es
      // justamente la gracia de una serie.
      while (vueltas < sec.vueltasMax && costoSecuencia(sec, vueltas + 1) <= cupoSerie) vueltas++;
      meter(fase, { tipo: "secuencia", sec, vueltas });
      for (const id of sec.pasos) {
        const dentro = POR_ID.get(id);
        if (dentro?.base && usados.has(id)) {
          porFaseElegido.set(
            dentro.fase,
            (porFaseElegido.get(dentro.fase) ?? []).filter(
              (e) => !(e.tipo === "paso" && e.paso.id === id)
            )
          );
        }
        usados.add(id);
      }
      cupo -= costoSecuencia(sec, vueltas);
      break; // una serie por fase: dos seguidas ya es otra clase
    }

    /* 2. Con lo que queda, posturas sueltas. */
    const tope = MAX_POR_FASE[fase] ?? 99;
    let puestas = (porFaseElegido.get(fase) ?? []).filter((e) => e.tipo === "paso").length;
    const candidatos = disponibles
      .filter((p) => p.fase === fase && !usados.has(p.id))
      .sort((a, b) => puntaje(b, prefs, deChakras) - puntaje(a, prefs, deChakras));

    for (const paso of candidatos) {
      if (puestas >= tope) break;
      if (cupo < 30) break;
      if (conLado(paso, minimoDe(paso)) > cupo) continue;

      /* La preparación entra antes que la postura que prepara. */
      const previas = (paso.prepararCon ?? [])
        .map((id) => POR_ID.get(id))
        .filter((p): p is Paso => !!p && !usados.has(p.id) && pasaElFiltro(p, prefs));
      const costoPrevias = previas.reduce((a, p) => a + conLado(p, minimoDe(p)), 0);
      if (conLado(paso, minimoDe(paso)) + costoPrevias > cupo) continue;

      for (const previa of previas) {
        usados.add(previa.id);
        const s = Math.min(duracionBase(previa, prefs), maximoDe(previa));
        meter(previa.fase, { tipo: "paso", paso: previa, segundos: s });
        cupo -= conLado(previa, s);
        puestas++;
      }

      const quiere = conLado(paso, duracionBase(paso, prefs));
      const gasta = Math.min(quiere, Math.max(cupo, conLado(paso, minimoDe(paso))));
      usados.add(paso.id);
      meter(paso.fase, { tipo: "paso", paso, segundos: paso.porLado ? Math.round(gasta / 2) : gasta });
      cupo -= gasta;
      puestas++;
    }
  }

  // ── Se aplana en el orden de la práctica ──────────────────
  let pasos = aplanar(porFaseElegido, prefs);

  /* Si sobró tiempo, se agregan más posturas antes de estirar las que ya
     están: una práctica de veinte minutos con seis posturas larguísimas no es
     lo que alguien pidió. */
  const suma = () => pasos.reduce((a, p) => a + p.duracion, 0);
  let vueltasRelleno = 0;
  while (objetivoSegundos - suma() > 45 && vueltasRelleno < 4) {
    vueltasRelleno++;
    let agrego = false;
    for (const [fase, peso] of [...pesos].sort((a, b) => b[1] - a[1])) {
      if (peso <= 0) continue;
      const resto = objetivoSegundos - suma();
      if (resto <= 45) break;
      const yaPuestas = (porFaseElegido.get(fase) ?? []).filter((e) => e.tipo === "paso").length;
      if (yaPuestas >= (MAX_POR_FASE[fase] ?? 99)) continue;
      const siguiente = disponibles
        .filter((p) => p.fase === fase && !usados.has(p.id))
        .sort((a, b) => puntaje(b, prefs, deChakras) - puntaje(a, prefs, deChakras))
        .find((p) => conLado(p, minimoDe(p)) <= resto);
      if (!siguiente) continue;
      usados.add(siguiente.id);
      const quiere = conLado(siguiente, duracionBase(siguiente, prefs));
      const gasta = Math.min(quiere, resto);
      meter(siguiente.fase, {
        tipo: "paso",
        paso: siguiente,
        segundos: siguiente.porLado ? Math.round(gasta / 2) : gasta,
      });
      agrego = true;
    }
    pasos = aplanar(porFaseElegido, prefs);
    if (!agrego) break;
  }

  /* Los avisos y los cambios de lado se suman al final y no le quitan tiempo a
     ninguna postura. Para que el total igual calce con lo pedido, su tiempo se
     descuenta antes de ajustar. */
  const paraPosturas = () => objetivoSegundos - reservaDeAvisos(pasos);
  ajustarDuraciones(pasos, paraPosturas());

  /* Recorte: si aun con todo en su mínimo la práctica se pasa del rato pedido,
     se saca la postura suelta que menos aporta y se vuelve a ajustar. Es
     preferible una práctica más corta que una que miente con el tiempo. */
  for (let intento = 0; intento < 10; intento++) {
    const total = pasos.reduce((a, p) => a + p.duracion, 0);
    if (total <= paraPosturas() * 1.02) break;
    let peorFase: Fase | null = null;
    let peorId: string | null = null;
    let peorPuntaje = Infinity;
    for (const [fase, lista] of porFaseElegido) {
      for (const e of lista) {
        if (e.tipo !== "paso" || e.paso.base) continue;
        const pts = puntaje(e.paso, prefs, deChakras);
        if (pts < peorPuntaje) {
          peorPuntaje = pts;
          peorFase = fase;
          peorId = e.paso.id;
        }
      }
    }
    if (!peorFase || !peorId) break;
    porFaseElegido.set(
      peorFase,
      (porFaseElegido.get(peorFase) ?? []).filter((e) => !(e.tipo === "paso" && e.paso.id === peorId))
    );
    usados.delete(peorId);
    pasos = aplanar(porFaseElegido, prefs);
    ajustarDuraciones(pasos, paraPosturas());
  }

  agregarAvisos(pasos);

  const propsUsados = [
    ...new Set(pasos.flatMap((p) => [...(p.necesita ?? []), ...(p.mejoraCon ?? [])])),
  ].filter((prop) => prefs.props.includes(prop));

  const series: Rutina["series"] = [];
  for (const lista of porFaseElegido.values()) {
    for (const e of lista) {
      if (e.tipo !== "secuencia") continue;
      series.push({
        nombre: e.sec.nombre,
        vueltas: e.vueltas,
        porque: e.sec.porque,
        porLado: e.sec.porLado,
      });
    }
  }

  return {
    pasos,
    segundos: pasos.reduce((a, p) => a + p.duracion, 0),
    prefs,
    quitadas,
    propsUsados,
    series,
  };
}

/* Lo que una profesora diría en voz alta en los momentos de transición. Se
   agrega al final, cuando las duraciones ya están ajustadas: así sus segundos
   se suman y no le quitan tiempo a ninguna postura. */
/* Cuánto tarda la voz en decir un texto. Medido con la voz de Google en
   español a la velocidad de la app: unas 2 palabras por segundo, y cada signo
   de puntuación es una pausa corta. Antes se calculaba a 2,6 palabras por
   segundo y la voz no alcanzaba a terminar la frase en el saludo al sol. */
export function segundosDeVoz(texto: string) {
  const palabras = texto.trim().split(/\s+/).length;
  const pausas = (texto.match(/[.:,;]/g) ?? []).length;
  return palabras / 2 + pausas * 0.3;
}

/* Un paso de serie dura lo que tarda la voz más un respiro para moverse.
   Sin ese respiro, la instrucción siguiente llega apenas termina la anterior
   y no hay tiempo de hacer lo que se dijo. */
const RESPIRO_TRAS_LA_VOZ = 1.5;

const AVISO_NARIZ = "Desde ahora, durante toda la práctica, respira por la nariz.";
const AVISO_SALUDOS =
  "Empezamos con los saludos al sol. Van al ritmo de la respiración: un movimiento por cada una. Sigue mi voz.";
const AVISO_LADO = "Cambia de lado.";
const segundosDeAviso = (texto: string) => Math.ceil(segundosDeVoz(texto) + 0.5);

/** Lo que va a sumar agregarAvisos, calculado con las mismas reglas. */
function reservaDeAvisos(pasos: PasoRutina[]) {
  let total = 0;
  if (pasos.some((p) => !["centrado", "respiracion"].includes(p.faseVisible))) total += segundosDeAviso(AVISO_NARIZ);
  if (pasos.some((p) => p.secuencia && p.faseVisible === "saludos")) total += segundosDeAviso(AVISO_SALUDOS);
  for (let i = 1; i < pasos.length; i++) {
    const a = pasos[i - 1].secuencia;
    const b = pasos[i].secuencia;
    if (a && b && a.id === b.id && a.lado === "derecho" && b.lado === "izquierdo") total += segundosDeAviso(AVISO_LADO);
  }
  total += pasos.filter((p) => p.porLado && !p.secuencia).length * 5;
  return total;
}

function agregarAvisos(pasos: PasoRutina[]) {
  const avisar = (p: PasoRutina, texto: string) => {
    const segundos = segundosDeAviso(texto);
    p.aviso = p.aviso ? `${p.aviso} ${texto}` : texto;
    p.avisoSegundos = (p.avisoSegundos ?? 0) + segundos;
    p.duracion += segundos;
    if (p.hablar) p.hablar += segundos;
  };

  // Terminadas las respiraciones del principio: de aquí en adelante, nariz.
  const primerMovimiento = pasos.find((p) => !["centrado", "respiracion"].includes(p.faseVisible));
  if (primerMovimiento) {
    avisar(primerMovimiento, AVISO_NARIZ);
  }

  // Los saludos al sol van rápido: hay que avisar antes de que empiecen.
  const primerSaludo = pasos.find((p) => p.secuencia && p.faseVisible === "saludos");
  if (primerSaludo) {
    avisar(primerSaludo, AVISO_SALUDOS);
  }

  // Dentro de una serie que va por lado, nombrar el cambio.
  for (let i = 1; i < pasos.length; i++) {
    const antes = pasos[i - 1].secuencia;
    const ahora = pasos[i].secuencia;
    if (antes && ahora && antes.id === ahora.id && antes.lado === "derecho" && ahora.lado === "izquierdo") {
      avisar(pasos[i], AVISO_LADO);
    }
  }

  // Posturas sueltas por lado: cinco segundos para cambiar, aparte.
  for (const p of pasos) {
    if (p.porLado && !p.secuencia) {
      // Duración par: los dos lados iguales y en segundos enteros.
      p.duracion = Math.round(p.duracion / 2) * 2;
      p.transicion = 5;
      p.duracion += 5;
    }
  }
}

/* Ajuste fino: lo elegido casi nunca suma justo el tiempo pedido. Se estira o
   se encoge todo en proporción, respetando los límites de cada postura. */
function ajustarDuraciones(pasos: PasoRutina[], objetivoSegundos: number) {
  for (let vuelta = 0; vuelta < 3; vuelta++) {
    const total = pasos.reduce((a, p) => a + p.duracion, 0);
    if (total === 0) break;
    const factor = objetivoSegundos / total;
    if (factor > 0.97 && factor < 1.03) break;
    /* Tope duro: ninguna postura se lleva más del 15% de la práctica. Sin esto
       el savasana se comía la mitad de una rutina de diez minutos. */
    const techo = Math.round(objetivoSegundos * 0.15);
    for (const p of pasos) {
      const dobla = p.porLado && !p.secuencia ? 2 : 1;
      // Una respiración dura cuatro o cinco segundos: el piso de un paso de
      // serie tiene que dejar respirar, no más.
      const min = p.disenada
        ? Math.max(3, p.hablar ?? 0, Math.round(p.disenada * 0.85))
        : minimoDe(p) * dobla;
      const max = p.disenada
        ? Math.round(p.disenada * 1.6)
        : Math.min(maximoDe(p) * dobla, Math.max(min, techo));
      const ajustada = Math.min(max, Math.max(min, p.duracion * factor));
      // Los pasos cortos de una serie se redondean al segundo; lo demás, a
      // cinco, que se lee mejor en pantalla.
      p.duracion =
        ajustada > 25
          ? Math.round(ajustada / 5) * 5
          : Math.max(p.disenada ? 3 : 5, Math.round(ajustada));
    }
  }
}

/* Cuántas posturas sueltas como máximo por fase. Savasana es una: savasana y
   yoga nidra juntos son dos finales seguidos. */
const MAX_POR_FASE: Partial<Record<Fase, number>> = {
  centrado: 2,
  respiracion: 2,
  respiracion_final: 1,
  savasana: 1,
  meditacion: 1,
  saludos: 1,
  invertidas: 1,
};

/* Convierte lo elegido en la lista de pasos, en el orden de la práctica:
   fase por fase, primero la serie (vuelta por vuelta, lado por lado) y después
   lo suelto en el orden del catálogo. */
function aplanar(porFaseElegido: Map<Fase, Elegido[]>, prefs: Preferencias): PasoRutina[] {
  const salida: PasoRutina[] = [];
  let n = 0;

  for (const fase of FASES) {
    const lista = porFaseElegido.get(fase) ?? [];

    for (const e of lista.filter((x) => x.tipo === "secuencia")) {
      if (e.tipo !== "secuencia") continue;
      const lados: ("derecho" | "izquierdo" | undefined)[] = e.sec.porLado
        ? ["derecho", "izquierdo"]
        : [undefined];
      for (let v = 1; v <= e.vueltas; v++) {
        for (const lado of lados) {
          e.sec.pasos.forEach((id, i) => {
            const paso = POR_ID.get(id);
            if (!paso) return;
            // Cada vuelta trabaja un lado: la impar la derecha, la par la izquierda.
            const pierna = v % 2 === 1 ? "derecha" : "izquierda";
            const otra = pierna === "derecha" ? "izquierda" : "derecha";
            const guion = e.sec.guion?.[i]
              ?.replaceAll("{pierna}", pierna)
              .replaceAll("{otra}", otra);
            /* Un paso no puede durar menos de lo que la voz tarda en decirlo
               más un respiro para hacerlo: si no, el paso siguiente la corta
               a media frase. */
            const hablar = guion ? Math.ceil(segundosDeVoz(guion) + RESPIRO_TRAS_LA_VOZ) : 0;
            const segundos = Math.max(e.sec.segundos[i] ?? minimoDe(paso), hablar);
            salida.push({
              ...paso,
              faseVisible: fase,
              duracion: segundos,
              disenada: segundos,
              guion,
              hablar: hablar || undefined,
              clave: `${id}-${n++}`,
              secuencia: {
                id: e.sec.id,
                nombre: e.sec.nombre,
                vuelta: v,
                vueltas: e.vueltas,
                lado,
                porque: e.sec.porque,
              },
            });
          });
        }
      }
    }

    const sueltas = lista.filter((x) => x.tipo === "paso");
    const orden = new Map(CATALOGO.map((p, i) => [p.id, i]));
    sueltas.sort((a, b) => {
      if (a.tipo !== "paso" || b.tipo !== "paso") return 0;
      return (orden.get(a.paso.id) ?? 0) - (orden.get(b.paso.id) ?? 0);
    });
    for (const e of sueltas) {
      if (e.tipo !== "paso") continue;
      salida.push({
        ...e.paso,
        faseVisible: fase,
        duracion: conLado(e.paso, e.segundos),
        clave: `${e.paso.id}-${n++}`,
      });
    }
  }

  void prefs;
  return salida;
}

/** Agrupa la rutina por fase, en el orden de la práctica, sin fases vacías. */
export function porFase(rutina: Rutina) {
  return FASES.map((fase) => ({
    fase,
    pasos: rutina.pasos.filter((p) => p.faseVisible === fase),
  })).filter((g) => g.pasos.length > 0);
}

/* Para la lista: junta los pasos seguidos de una misma serie en un solo
   bloque, así se lee «Saludo al sol ×3» y no ocho posturas repetidas tres
   veces. */
export type Bloque =
  | { tipo: "paso"; paso: PasoRutina }
  | {
      tipo: "serie";
      nombre: string;
      vueltas: number;
      porque: string;
      porLado?: boolean;
      pasos: PasoRutina[];
      duracion: number;
    };

export function enBloques(pasos: PasoRutina[]): Bloque[] {
  const bloques: Bloque[] = [];
  for (const paso of pasos) {
    if (!paso.secuencia) {
      bloques.push({ tipo: "paso", paso });
      continue;
    }
    const ultimo = bloques[bloques.length - 1];
    if (ultimo && ultimo.tipo === "serie" && ultimo.nombre === paso.secuencia.nombre) {
      ultimo.pasos.push(paso);
      ultimo.duracion += paso.duracion;
      continue;
    }
    bloques.push({
      tipo: "serie",
      nombre: paso.secuencia.nombre,
      vueltas: paso.secuencia.vueltas,
      porque: paso.secuencia.porque,
      porLado: !!paso.secuencia.lado,
      pasos: [paso],
      duracion: paso.duracion,
    });
  }
  return bloques;
}

/* El registro del ciclo: qué se guarda, cómo se calcula la fase y qué se
   aconseja.

   Las reglas de cálculo siguen lo que la evidencia dice que es razonable
   para una app sin mediciones del cuerpo:
   · El largo del ciclo se estima con el promedio de los últimos ciclos, y
     solo se confía desde el tercero (con menos, se parte de 28 y se dice).
   · La ovulación se ubica unos 14 días antes de la regla siguiente, no el
     día 14: la fase lútea es la estable; la folicular es la que varía.
   · Es una estimación, y se dice siempre. No sirve como anticonceptivo.

   Los datos de salud se quedan en el teléfono: esta sección no entra en la
   copia a la cuenta (lib/florecer/sincronizar.ts). */

/* ── Fechas (siempre YYYY-MM-DD, en hora local) ─────────── */

export function hoy(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function aFecha(t: string) {
  const [a, m, d] = t.split("-").map(Number);
  return new Date(a, m - 1, d, 12);
}

export function sumarDias(t: string, n: number) {
  const d = aFecha(t);
  d.setDate(d.getDate() + n);
  return hoy(d);
}

export function diasEntre(desde: string, hasta: string) {
  return Math.round((aFecha(hasta).getTime() - aFecha(desde).getTime()) / 86_400_000);
}

const MESES = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export function fechaCorta(t: string) {
  const d = aFecha(t);
  return `${d.getDate()} ${MESES[d.getMonth()]}`;
}

/* ── Lo que se guarda ──────────────────────────────────── */

export type Flujo = "nada" | "manchado" | "leve" | "medio" | "abundante";

export type Dia = { flujo?: Flujo; sintomas?: string[]; nota?: string };

export type Etapa =
  | "adolescente"
  | "reproductiva"
  | "perimenopausia"
  | "posmenopausia"
  | "anticonceptivo"
  | "embarazo";

export type DatosCiclo = {
  /** Año de nacimiento, si se quiso dar. Solo sirve para sugerir la etapa. */
  nacimiento?: number;
  etapa?: Etapa;
  dias: Record<string, Dia>;
};

export const CLAVE = "floema-ciclo";

export function leerCiclo(): DatosCiclo {
  try {
    const g = JSON.parse(localStorage.getItem(CLAVE) ?? "null") as Partial<DatosCiclo> | null;
    return { ...g, dias: g?.dias ?? {} };
  } catch {
    return { dias: {} };
  }
}

export function guardarCiclo(d: DatosCiclo) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(d));
  } catch {
    /* modo privado: se usa igual, solo no se recuerda */
  }
}

export const FLUJOS: { id: Flujo; label: string }[] = [
  { id: "nada", label: "Sin sangrado" },
  { id: "manchado", label: "Manchado" },
  { id: "leve", label: "Leve" },
  { id: "medio", label: "Medio" },
  { id: "abundante", label: "Abundante" },
];

export const ETAPAS: { id: Etapa; label: string; linea: string }[] = [
  { id: "adolescente", label: "Mis primeros años de regla", linea: "Menos de tres o cuatro años desde la primera regla." },
  { id: "reproductiva", label: "Ciclos regulares", linea: "La regla llega más o menos cada mes." },
  {
    id: "perimenopausia",
    label: "Perimenopausia",
    linea: "Desde los 40 y tantos: la regla empezó a cambiar de ritmo, o hay bochornos.",
  },
  { id: "posmenopausia", label: "Posmenopausia", linea: "Pasó un año o más desde la última regla." },
  { id: "anticonceptivo", label: "Uso anticonceptivo hormonal", linea: "Pastillas, anillo, parche, implante, inyección o DIU hormonal." },
  { id: "embarazo", label: "Embarazo o lactancia", linea: "La regla está en pausa." },
];

/** La etapa que se sugiere por la edad. Es solo un punto de partida: la
    persona elige. */
export function etapaSugerida(nacimiento: number | undefined, ahora = new Date()): Etapa {
  if (!nacimiento) return "reproductiva";
  const edad = ahora.getFullYear() - nacimiento;
  if (edad < 17) return "adolescente";
  if (edad >= 56) return "posmenopausia";
  if (edad >= 45) return "perimenopausia";
  return "reproductiva";
}

export const SINTOMAS: { id: string; label: string }[] = [
  { id: "colicos", label: "Cólicos" },
  { id: "dolor_fuerte", label: "Dolor que me frena" },
  { id: "mamas", label: "Mamas sensibles" },
  { id: "hinchazon", label: "Hinchazón" },
  { id: "cabeza", label: "Dolor de cabeza" },
  { id: "acne", label: "Acné" },
  { id: "cansancio", label: "Cansancio" },
  { id: "irritable", label: "Irritabilidad" },
  { id: "animo", label: "Ánimo bajo" },
  { id: "ansiedad", label: "Ansiedad" },
  { id: "antojos", label: "Antojos" },
  { id: "insomnio", label: "Mal sueño" },
  { id: "digestion", label: "Digestión alterada" },
  { id: "bochornos", label: "Bochornos o sudores" },
  { id: "sequedad", label: "Sequedad vaginal" },
  { id: "energia", label: "Con energía" },
];

const NOMBRE_SINTOMA = Object.fromEntries(SINTOMAS.map((s) => [s.id, s.label]));

/* ── Reglas y ciclos ───────────────────────────────────── */

export const sangra = (d?: Dia) => !!d?.flujo && d.flujo !== "manchado" && d.flujo !== "nada";
export const mancha = (d?: Dia) => !!d?.flujo && d.flujo !== "nada";

export type Regla = { inicio: string; fin: string; dias: number; abundantes: number };

/** Las reglas registradas: días de sangrado seguidos (se perdona un día
    sin anotar en medio). El manchado solo no abre una regla. */
export function reglas(datos: DatosCiclo): Regla[] {
  const dias = Object.keys(datos.dias)
    .filter((t) => sangra(datos.dias[t]))
    .sort();
  const salida: Regla[] = [];
  for (const t of dias) {
    const ultima = salida[salida.length - 1];
    if (ultima && diasEntre(ultima.fin, t) <= 2) {
      ultima.fin = t;
      ultima.dias = diasEntre(ultima.inicio, t) + 1;
      if (datos.dias[t].flujo === "abundante") ultima.abundantes++;
    } else {
      salida.push({ inicio: t, fin: t, dias: 1, abundantes: datos.dias[t].flujo === "abundante" ? 1 : 0 });
    }
  }
  return salida;
}

/** Largo de cada ciclo completo: de un inicio de regla al siguiente. */
export function ciclos(datos: DatosCiclo) {
  const r = reglas(datos);
  return r.slice(1).map((x, i) => ({ inicio: r[i].inicio, largo: diasEntre(r[i].inicio, x.inicio) }));
}

/** Promedio de los últimos seis ciclos razonables (15 a 60 días: lo que
    queda fuera suele ser una regla que no se anotó). Con menos de tres, no
    hay promedio confiable. */
export function largoPromedio(datos: DatosCiclo): number | null {
  const validos = ciclos(datos)
    .map((c) => c.largo)
    .filter((l) => l >= 15 && l <= 60)
    .slice(-6);
  if (validos.length < 3) return null;
  return Math.round(validos.reduce((s, l) => s + l, 0) / validos.length);
}

/* ── La fase de hoy ────────────────────────────────────── */

export type Fase = "menstrual" | "folicular" | "ovulatoria" | "lutea";

export const NOMBRE_FASE: Record<Fase, string> = {
  menstrual: "Regla",
  folicular: "Fase folicular",
  ovulatoria: "Cerca de la ovulación",
  lutea: "Fase lútea",
};

/** Etapas en que la app no calcula fases: no hay ciclo propio, o no hay
    ciclo. */
export function sinFases(etapa?: Etapa) {
  return etapa === "anticonceptivo" || etapa === "embarazo" || etapa === "posmenopausia";
}

export type Estado = {
  /** No hay ninguna regla anotada todavía. */
  sinDatos: boolean;
  diaDelCiclo?: number;
  fase?: Fase;
  /** Días de atraso respecto del largo estimado, si los hay. */
  atraso?: number;
  largo: number;
  /** El largo sale de al menos tres ciclos propios. */
  confiable: boolean;
  ciclosRegistrados: number;
  proximaRegla?: string;
  ovulacion?: string;
  ultimaRegla?: Regla;
};

/** El día del ciclo (1 = primer día de regla) en que se estima la
    ovulación: unos 14 días antes de la regla siguiente. */
export function diaOvulacion(largo: number) {
  return Math.max(8, largo - 13);
}

export function faseDelDia(dia: number, largo: number, sangrando: boolean, diasRegla: number): Fase {
  const ov = diaOvulacion(largo);
  if (sangrando || dia <= Math.min(diasRegla, 8)) return "menstrual";
  if (dia < ov - 2) return "folicular";
  if (dia <= ov + 1) return "ovulatoria";
  return "lutea";
}

export function estadoDe(datos: DatosCiclo, fecha = hoy()): Estado {
  const r = reglas(datos).filter((x) => x.inicio <= fecha);
  const promedio = largoPromedio(datos);
  const largo = promedio ?? 28;
  const base: Estado = { sinDatos: r.length === 0, largo, confiable: promedio !== null, ciclosRegistrados: ciclos(datos).length };
  if (r.length === 0) return base;

  const ultima = r[r.length - 1];
  const dia = diasEntre(ultima.inicio, fecha) + 1;
  const proxima = sumarDias(ultima.inicio, largo);
  const atraso = dia > largo ? dia - largo : 0;
  /* Si solo se anotó el primer día, se supone que la regla sigue hasta el
     quinto, salvo que se haya anotado un día sin sangrado después. */
  const anotadoSinSangre = Object.keys(datos.dias).some((t) => t > ultima.fin && t <= fecha && !sangra(datos.dias[t]));
  const enRegla = ultima.fin >= fecha || (dia <= 5 && !anotadoSinSangre);

  return {
    ...base,
    ultimaRegla: ultima,
    diaDelCiclo: dia,
    fase: atraso > 0 ? "lutea" : faseDelDia(dia, largo, enRegla, ultima.dias),
    atraso: atraso || undefined,
    proximaRegla: atraso > 0 ? undefined : proxima,
    ovulacion: sumarDias(ultima.inicio, diaOvulacion(largo) - 1),
  };
}

/** Para el calendario: qué se espera cada día (regla prevista o ventana
    de ovulación), a partir de la última regla anotada. */
export function previsto(datos: DatosCiclo, fecha: string): "regla" | "ovulacion" | null {
  const est = estadoDe(datos);
  if (!est.ultimaRegla || !est.proximaRegla) return null;
  const dur = Math.min(Math.max(est.ultimaRegla.dias, 4), 7);
  const desde = est.proximaRegla;
  if (fecha >= desde && fecha <= sumarDias(desde, dur - 1)) return "regla";
  if (est.ovulacion && fecha > hoy() && Math.abs(diasEntre(est.ovulacion, fecha)) <= 1) return "ovulacion";
  return null;
}

/* ── Señales para consultar ────────────────────────────── */

export type Senal = { titulo: string; detalle: string };

export function senales(datos: DatosCiclo, fecha = hoy()): Senal[] {
  const etapa = datos.etapa ?? "reproductiva";
  const s: Senal[] = [];
  const r = reglas(datos);
  const c = ciclos(datos).slice(-3);
  const ultima = r[r.length - 1];

  if (etapa === "posmenopausia") {
    const reciente = Object.keys(datos.dias).some(
      (t) => mancha(datos.dias[t]) && diasEntre(t, fecha) <= 60 && diasEntre(t, fecha) >= 0,
    );
    if (reciente)
      s.push({
        titulo: "Anotaste sangrado después de la menopausia",
        detalle: "Cualquier sangrado después de un año sin regla se consulta, aunque sea poco. Casi siempre es algo benigno, pero hay que mirarlo.",
      });
    return s;
  }
  if (etapa === "embarazo") return s;

  if (ultima && etapa !== "anticonceptivo") {
    const sin = diasEntre(ultima.inicio, fecha);
    if (sin >= 90)
      s.push({
        titulo: `Llevas ${sin} días sin regla`,
        detalle:
          etapa === "perimenopausia"
            ? "En la perimenopausia pueden pasar meses sin regla. Igual conviene conversarlo, y descartar un embarazo si es posible."
            : "Tres meses sin regla se consultan, después de descartar un embarazo. Las causas más comunes (estrés, comer poco para lo que gastas, tiroides, SOP) tienen solución.",
      });
  }

  if (etapa !== "perimenopausia" && etapa !== "anticonceptivo" && c.length >= 2) {
    const [min, max] = etapa === "adolescente" ? [21, 45] : [24, 38];
    const fuera = c.filter((x) => x.largo < min || x.largo > max);
    if (fuera.length >= 2)
      s.push({
        titulo: "Tus ciclos salen del rango habitual",
        detalle: `${fuera.length} de tus últimos ${c.length} ciclos duraron ${fuera.map((x) => x.largo).join(" y ")} días. Lo habitual es entre ${min} y ${max}. Vale la pena conversarlo.`,
      });
  }

  if (etapa === "reproductiva") {
    const ult = ciclos(datos).slice(-6).map((x) => x.largo).filter((l) => l <= 60);
    if (ult.length >= 4 && Math.max(...ult) - Math.min(...ult) > 9)
      s.push({
        titulo: "Tus ciclos varían bastante",
        detalle: `Entre el más corto (${Math.min(...ult)} días) y el más largo (${Math.max(...ult)}) hay más de 9 días. Si se mantiene, consúltalo: puede venir del estrés, la tiroides o un SOP.`,
      });
  }

  const ultimas = r.slice(-2);
  const larga = ultimas.find((x) => x.dias > (etapa === "adolescente" ? 7 : 8));
  if (larga)
    s.push({
      titulo: `Una regla duró ${larga.dias} días`,
      detalle: "Una regla de más de 8 días (7 en los primeros años) se consulta, sobre todo si se repite o si es abundante.",
    });
  if (ultimas.some((x) => x.abundantes >= 3))
    s.push({
      titulo: "Varios días de sangrado abundante",
      detalle: "Si sangras mucho, pide que te midan la hemoglobina y la ferritina: la falta de hierro es muy común y da cansancio. El sangrado abundante tiene tratamiento.",
    });

  const ciclosCon = (id: string) => {
    const conSintoma = Object.keys(datos.dias).filter((t) => datos.dias[t].sintomas?.includes(id) && diasEntre(t, fecha) <= 120);
    return new Set(conSintoma.map((t) => r.filter((x) => x.inicio <= t).length)).size;
  };
  if (ciclosCon("dolor_fuerte") >= 2)
    s.push({
      titulo: "El dolor te frena en más de un ciclo",
      detalle: "Una regla que te hace faltar a tus cosas no es lo normal. Puede haber endometriosis u otra causa, y tiene tratamiento: anótalo y consúltalo.",
    });
  if (etapa !== "anticonceptivo" && (ciclosCon("animo") >= 2 || ciclosCon("ansiedad") >= 2))
    s.push({
      titulo: "El ánimo cambia en varios ciclos",
      detalle: "Si el ánimo antes de la regla te cambia la vida, existen tratamientos eficaces. Lleva este registro a la consulta: es justo lo que piden para diagnosticarlo. Si alguna vez piensas en hacerte daño, busca ayuda de inmediato.",
    });

  return s;
}

/* ── Lo que se repite ──────────────────────────────────── */

/** La fase en que cayó un día pasado, mirando la regla anterior y la
    siguiente. Sin regla siguiente, se usa el largo estimado. */
function faseHistorica(t: string, r: Regla[], largo: number): Fase | null {
  const i = r.findIndex((x) => x.inicio > t) - 1;
  const idx = i === -2 ? r.length - 1 : i;
  if (idx < 0) return null;
  const actual = r[idx];
  const siguiente = r[idx + 1];
  const l = siguiente ? diasEntre(actual.inicio, siguiente.inicio) : largo;
  const dia = diasEntre(actual.inicio, t) + 1;
  if (dia > l + 7) return null;
  return faseDelDia(dia, l, t <= actual.fin, actual.dias);
}

export function loQueSeRepite(datos: DatosCiclo): string[] {
  if (sinFases(datos.etapa)) return [];
  const r = reglas(datos);
  if (r.length < 2) return [];
  const largo = largoPromedio(datos) ?? 28;
  const cuenta: Record<string, Partial<Record<Fase, number>>> = {};
  for (const [t, d] of Object.entries(datos.dias)) {
    const f = faseHistorica(t, r, largo);
    if (!f) continue;
    for (const id of d.sintomas ?? []) {
      cuenta[id] ??= {};
      cuenta[id][f] = (cuenta[id][f] ?? 0) + 1;
    }
  }
  const DONDE: Record<Fase, string> = {
    menstrual: "durante la regla",
    folicular: "en la fase folicular",
    ovulatoria: "cerca de la ovulación",
    lutea: "en la fase lútea, antes de la regla",
  };
  return Object.entries(cuenta)
    .map(([id, porFase]) => {
      const total = Object.values(porFase).reduce((a, b) => a + (b ?? 0), 0);
      const [fase, n] = (Object.entries(porFase) as [Fase, number][]).sort((a, b) => b[1] - a[1])[0];
      return { id, total, fase, n };
    })
    .filter((x) => x.total >= 3 && x.n / x.total >= 0.6)
    .sort((a, b) => b.total - a.total)
    .slice(0, 4)
    .map((x) => `${NOMBRE_SINTOMA[x.id] ?? x.id}: ${x.n} de ${x.total} veces ${DONDE[x.fase]}.`);
}

/* ── Consejos ─────────────────────────────────────────── */

export const CONSEJO_SINTOMA: Record<string, string> = {
  colicos:
    "Para los cólicos: calor en el bajo vientre y moverte suave. Si puedes tomarlos, los antiinflamatorios como el ibuprofeno funcionan mejor apenas empieza el dolor. El jengibre también alivió los cólicos en ensayos.",
  dolor_fuerte:
    "Un dolor que te frena no es lo normal. Si se repite, consúltalo: puede haber endometriosis, que tiene tratamiento.",
  mamas: "Un sostén firme ayuda con las mamas sensibles. Si notas un nudo o una zona que duele siempre igual, se consulta.",
  hinchazon: "La hinchazón de los días previos es retención de líquido: caminar, tomar agua y comer menos sal y ultraprocesados suele aliviar.",
  cabeza: "Si el dolor de cabeza te da siempre en los mismos días del ciclo, anótalo: la jaqueca menstrual es frecuente y tiene tratamiento específico.",
  acne: "Antes de la regla la piel produce más sebo. Limpieza suave y sin apretar. Si el acné es fuerte y tus ciclos son irregulares, consulta.",
  cansancio:
    "Si tu regla es abundante, el cansancio puede ser falta de hierro: legumbres, carnes, hojas verdes con algo de vitamina C, y un examen si no se pasa.",
  irritable:
    "Moverte, dormir bien y el calcio de la comida ayudan con los síntomas premenstruales. Si te cambian la vida cada mes, existen tratamientos eficaces.",
  animo:
    "Moverte, dormir bien y el calcio de la comida ayudan con el ánimo premenstrual. Si se repite y te pesa, consúltalo: hay tratamientos eficaces. Si piensas en hacerte daño, busca ayuda de inmediato.",
  ansiedad:
    "Moverte, respirar lento y dormir bien ayudan. Si la ansiedad aparece cada mes antes de la regla y te pesa, consúltalo: tiene tratamiento.",
  antojos:
    "Antes de la regla el cuerpo puede gastar un poco más: comer algo más es normal. Proteína y fibra en cada comida ayudan a que el hambre sea más pareja.",
  insomnio:
    "En la fase lútea la progesterona sube la temperatura: una pieza fresca y un horario fijo ayudan. Menos alcohol y menos café en la tarde.",
  digestion: "Las mismas sustancias que dan los cólicos también mueven el intestino durante la regla: es común. Comidas simples, agua y fibra.",
  bochornos:
    "Para los bochornos: ropa en capas, pieza fresca y menos alcohol. Si te quitan el sueño o la calma, hay tratamientos eficaces, con y sin hormonas.",
  sequedad: "La sequedad vaginal tiene tratamiento: lubricantes, hidratantes vaginales o estrógeno local en dosis muy bajas. No hay que aguantarla.",
  energia: "Aprovecha el día, y anótalo: saber cuándo te sientes mejor también es información.",
};

export function consejoFase(est: Estado): string | null {
  if (est.sinDatos || !est.fase || !est.diaDelCiclo) return null;
  if (est.atraso)
    return `La regla viene ${est.atraso} ${est.atraso === 1 ? "día" : "días"} más tarde que tu promedio. Un ciclo más largo de vez en cuando es normal (estrés, viajes, enfermedad). Si pudieras estar embarazada, haz un test.`;
  switch (est.fase) {
    case "menstrual":
      return "Estás en la regla: las hormonas están en su punto más bajo. Si sangras mucho, suma hierro y vitamina C a tus comidas. Moverte suave y el calor alivian los cólicos.";
    case "folicular":
      return "Fase folicular: el estradiol va subiendo. Muchas se sienten con más energía; si no es tu caso, también es normal.";
    case "ovulatoria":
      return "Se acerca la ovulación, según tus reglas pasadas (puede variar varios días). Es cuando el flujo se vuelve claro y elástico. Este cálculo no sirve como anticonceptivo.";
    case "lutea":
      return est.diaDelCiclo >= est.largo - 5
        ? "Se acerca la regla. Si sueles tener síntomas premenstruales, ayudan moverte, dormir bien y el calcio de la comida (lácteos, tofu, sardinas, almendras)."
        : "Fase lútea: manda la progesterona. Puedes tener algo más de hambre y de calor; es normal.";
  }
}

export const CONSEJO_ETAPA: Record<Etapa, string[]> = {
  adolescente: [
    "En los primeros años es normal que la regla llegue cada 21 a 45 días: el cuerpo todavía está aprendiendo.",
    "Come suficiente para crecer y moverte, con hierro y calcio todos los días.",
    "Anotar tus reglas desde ahora es la mejor forma de saber qué es normal para ti.",
  ],
  reproductiva: [
    "Hierro suficiente mientras tengas regla: 18 mg al día. Si sangras mucho, pide que te midan la ferritina.",
    "Ejercicio regular y buen sueño ayudan con el dolor y los síntomas premenstruales.",
    "Si piensas en un embarazo, el ácido fólico se empieza antes.",
  ],
  perimenopausia: [
    "Fuerza dos o tres veces por semana: es lo que más cuida el músculo y el hueso que empiezan a perderse.",
    "Proteína en cada comida, calcio y vitamina D. Menos alcohol: empeora los bochornos y el sueño.",
    "En esta etapa la regla es impredecible: las fechas que da la app son orientativas. Los cambios de ritmo dicen en qué parte de la transición estás.",
  ],
  posmenopausia: [
    "Fuerza, caminar rápido o subir escaleras, y equilibrio: protegen el hueso y previenen caídas.",
    "Calcio, vitamina D y proteína. Controla presión, colesterol y azúcar.",
    "La sequedad vaginal y las molestias urinarias tienen tratamiento: no hay que aguantarlas.",
  ],
  anticonceptivo: [
    "Con anticonceptivos hormonales no hay fases propias: el sangrado de la semana de descanso no es una regla. Puedes anotar sangrados y síntomas igual.",
    "Si tienes sangrados inesperados que no se pasan en tres meses, o síntomas nuevos, coméntalo con quien te los indicó.",
  ],
  embarazo: [
    "Durante el embarazo y la lactancia la regla se pausa: la app no calcula fases. Puedes anotar cómo te sientes.",
    "Cualquier sangrado en el embarazo se consulta.",
  ],
};

export function consejosDeHoy(datos: DatosCiclo, fecha = hoy()): string[] {
  const salida: string[] = [];
  const delDia = datos.dias[fecha]?.sintomas ?? [];
  for (const id of delDia) {
    const c = CONSEJO_SINTOMA[id];
    if (c && !salida.includes(c)) salida.push(c);
    if (salida.length >= 2) break;
  }
  if (!sinFases(datos.etapa)) {
    const f = consejoFase(estadoDe(datos, fecha));
    if (f) salida.push(f);
  }
  return salida;
}

"use client";

import type { CSSProperties } from "react";

/* El dibujo de cada postura.

   Es SVG hecho a mano, no una foto: lo que importa de una postura es la FORMA
   — dónde va cada articulación y hacia dónde apunta el cuerpo — y eso se lee
   mejor en una figura limpia que en una foto de alguien con calzas.

   Cada postura se guarda como un esqueleto de puntos en un lienzo de 200 × 150,
   con el suelo en y = 132. El componente une los puntos: columna (cabeza,
   cuello, pecho, pelvis), brazos y piernas. El brazo y la pierna del fondo se
   dibujan más tenues, así se entiende que hay dos.

   Cuando la postura necesita un apoyo — pared, silla, bloque, cojín — el apoyo
   se dibuja también. Media postura restaurativa es el apoyo. */

type P = [number, number];

type Esqueleto = {
  /** Centro de la cabeza. */
  cab: P;
  cue: P;
  pec: P;
  pel: P;
  /** Brazo de adelante: hombro, codo, mano. */
  br?: [P, P, P];
  /** Brazo del fondo. */
  br2?: [P, P, P];
  /** Pierna de adelante: cadera, rodilla, pie. */
  pi: [P, P, P];
  /** Pierna del fondo. */
  pi2?: [P, P, P];
  /** Apoyos que se dibujan junto a la figura. */
  pared?: boolean;
  silla?: boolean;
  bloque?: P;
  bolster?: P;
  manta?: P;
  /** Sin línea de suelo (nadie está en el suelo). */
  sinSuelo?: boolean;
  /** Hacia dónde mira la cara. Sin esto la cabeza es un círculo y no se sabe
      si la postura va hacia adelante o hacia atrás. Por defecto, a la derecha. */
  mira?: "der" | "izq" | "arriba" | "abajo";
};

const SUELO = 132;

const FIGURAS: Record<string, Esqueleto> = {
  // ── De pie ──
  montana: {
    cab: [100, 30], cue: [100, 42], pec: [100, 52], pel: [100, 76],
    br: [[100, 44], [102, 60], [104, 77]],
    br2: [[100, 44], [98, 60], [96, 77]],
    pi: [[102, 78], [103, 105], [103, SUELO]],
    pi2: [[98, 78], [97, 105], [97, SUELO]],
  },
  silla_postura: {
    cab: [88, 42], cue: [92, 53], pec: [97, 64], pel: [112, 88],
    mira: "izq",
    br: [[95, 56], [82, 47], [68, 36]],
    br2: [[94, 57], [80, 51], [66, 43]],
    pi: [[112, 90], [110, 110], [94, SUELO]],
    pi2: [[110, 90], [108, 110], [92, SUELO]],
  },
  guerrero1: {
    cab: [100, 32], cue: [100, 44], pec: [100, 54], pel: [100, 78],
    br: [[100, 46], [112, 33], [118, 16]],
    br2: [[100, 46], [88, 33], [82, 16]],
    pi: [[103, 80], [124, 103], [126, SUELO]],
    pi2: [[97, 80], [80, 105], [68, SUELO]],
  },
  guerrero2: {
    cab: [100, 34], cue: [100, 46], pec: [100, 56], pel: [100, 80],
    br: [[100, 48], [118, 48], [138, 48]],
    br2: [[100, 48], [82, 48], [62, 48]],
    pi: [[103, 82], [124, 105], [128, SUELO]],
    pi2: [[97, 82], [80, 105], [68, SUELO]],
  },
  guerrero3: {
    cab: [60, 70], cue: [71, 72], pec: [86, 76], pel: [104, 80],
    mira: "izq",
    br: [[71, 73], [58, 81], [46, 89]],
    pi: [[104, 82], [106, 107], [106, SUELO]],
    pi2: [[104, 79], [124, 75], [144, 71]],
  },
  triangulo: {
    cab: [82, 48], cue: [86, 57], pec: [92, 67], pel: [100, 82],
    mira: "izq",
    br: [[89, 60], [95, 40], [99, 20]],
    br2: [[90, 63], [86, 84], [82, 106]],
    pi: [[100, 84], [78, 108], [62, SUELO]],
    pi2: [[100, 84], [124, 108], [140, SUELO]],
  },
  angulo_lateral: {
    cab: [74, 60], cue: [80, 67], pec: [88, 75], pel: [100, 86],
    mira: "izq",
    br: [[83, 69], [72, 48], [62, 30]],
    br2: [[86, 77], [77, 94], [71, 110]],
    pi: [[100, 88], [76, 110], [62, SUELO]],
    pi2: [[100, 88], [124, 110], [140, SUELO]],
  },
  piernas_abiertas_pie: {
    cab: [100, 116], cue: [100, 105], pec: [100, 92], pel: [100, 72],
    mira: "abajo",
    br: [[100, 96], [100, 113], [100, 129]],
    pi: [[103, 74], [79, 103], [63, SUELO]],
    pi2: [[97, 74], [121, 103], [139, SUELO]],
  },
  pinza_de_pie: {
    cab: [84, 112], cue: [89, 101], pec: [94, 90], pel: [102, 72],
    mira: "abajo",
    br: [[93, 93], [88, 110], [84, 127]],
    pi: [[104, 74], [106, 104], [106, SUELO]],
    pi2: [[100, 74], [102, 104], [102, SUELO]],
  },
  estocada_alta: {
    cab: [98, 48], cue: [98, 58], pec: [98, 67], pel: [100, 87],
    br: [[98, 61], [110, 48], [116, 31]],
    br2: [[98, 61], [86, 48], [80, 31]],
    pi: [[103, 89], [124, 108], [126, SUELO]],
    pi2: [[97, 89], [78, 112], [62, SUELO]],
  },
  estocada_baja: {
    cab: [100, 56], cue: [100, 66], pec: [100, 75], pel: [100, 95],
    br: [[100, 69], [112, 56], [118, 39]],
    br2: [[100, 69], [88, 56], [82, 39]],
    pi: [[103, 97], [124, 111], [126, SUELO]],
    pi2: [[97, 97], [80, 124], [60, 130]],
    manta: [82, 128],
  },
  guirnalda: {
    cab: [100, 70], cue: [100, 80], pec: [100, 89], pel: [100, 109],
    br: [[100, 82], [90, 93], [100, 97]],
    pi: [[104, 111], [126, 116], [112, SUELO]],
    pi2: [[96, 111], [74, 116], [88, SUELO]],
  },
  arbol: {
    cab: [100, 30], cue: [100, 42], pec: [100, 52], pel: [100, 77],
    br: [[100, 44], [90, 56], [100, 61]],
    pi: [[100, 78], [128, 98], [104, 92]],
    pi2: [[100, 79], [99, 105], [99, SUELO]],
  },
  hombros_pared: {
    cab: [66, 88], cue: [77, 88], pec: [92, 88], pel: [112, 89],
    mira: "abajo",
    br: [[78, 87], [108, 85], [140, 84]],
    pi: [[112, 91], [114, 111], [116, SUELO]],
    pi2: [[112, 91], [110, 111], [110, SUELO]],
    pared: true,
  },

  brazos_arriba_pie: {
    cab: [100, 30], cue: [100, 42], pec: [100, 52], pel: [100, 76],
    br: [[100, 44], [113, 31], [120, 15]],
    br2: [[100, 44], [87, 31], [80, 15]],
    pi: [[102, 78], [103, 105], [103, SUELO]],
    pi2: [[98, 78], [97, 105], [97, SUELO]],
  },
  media_pinza: {
    cab: [72, 97], cue: [83, 94], pec: [94, 88], pel: [104, 74],
    mira: "izq",
    br: [[88, 91], [89, 111], [90, 131]],
    pi: [[104, 76], [106, 104], [106, SUELO]],
    pi2: [[100, 76], [102, 104], [102, SUELO]],
  },
  perro_abajo: {
    cab: [80, 104], cue: [86, 96], pec: [93, 86], pel: [112, 62],
    mira: "abajo",
    br: [[89, 92], [79, 112], [70, 131]],
    pi: [[113, 64], [126, 98], [134, 131]],
    pi2: [[111, 64], [122, 98], [130, 131]],
  },
  chaturanga: {
    cab: [66, 104], cue: [77, 106], pec: [90, 110], pel: [110, 116],
    mira: "izq",
    br: [[78, 108], [88, 126], [76, 131]],
    pi: [[110, 118], [124, 124], [138, 129]],
  },
  perro_arriba: {
    cab: [84, 83], cue: [89, 93], pec: [96, 105], pel: [112, 120],
    mira: "izq",
    br: [[93, 97], [93, 114], [93, 131]],
    pi: [[112, 122], [128, 128], [143, 131]],
  },

  // ── Cuadrupedia ──
  cuadrupedia: {
    cab: [76, 84], cue: [85, 88], pec: [98, 90], pel: [122, 90],
    mira: "izq",
    br: [[86, 90], [86, 111], [86, 131]],
    pi: [[122, 92], [124, 112], [126, 131]],
  },
  gato: {
    cab: [78, 100], cue: [84, 90], pec: [96, 83], pel: [122, 92],
    mira: "abajo",
    br: [[85, 92], [85, 112], [85, 131]],
    pi: [[122, 94], [124, 113], [126, 131]],
  },
  gato_equilibrio: {
    cab: [76, 82], cue: [85, 86], pec: [98, 88], pel: [122, 88],
    mira: "izq",
    br: [[85, 87], [70, 80], [54, 73]],
    br2: [[90, 90], [90, 111], [90, 131]],
    pi: [[122, 90], [124, 111], [126, 131]],
    pi2: [[122, 88], [138, 83], [154, 78]],
  },
  cachorro: {
    cab: [80, 126], cue: [89, 122], pec: [100, 116], pel: [122, 98],
    mira: "izq",
    br: [[98, 118], [82, 124], [64, 128]],
    pi: [[122, 100], [128, 120], [118, 131]],
  },
  aguja: {
    cab: [86, 127], cue: [93, 123], pec: [101, 117], pel: [122, 96],
    mira: "izq",
    br: [[97, 120], [80, 126], [60, 130]],
    br2: [[101, 115], [105, 123], [110, 131]],
    pi: [[122, 98], [126, 116], [128, 131]],
  },
  plancha: {
    cab: [70, 88], cue: [80, 92], pec: [92, 98], pel: [112, 108],
    mira: "izq",
    br: [[80, 94], [81, 112], [82, 131]],
    pi: [[112, 110], [126, 119], [140, 129]],
  },
  camello: {
    cab: [111, 67], cue: [103, 74], pec: [99, 85], pel: [104, 105],
    mira: "arriba",
    br: [[100, 77], [108, 92], [113, 106]],
    pi: [[104, 107], [102, 128], [117, 131]],
  },
  nino: {
    cab: [76, 124], cue: [87, 121], pec: [100, 117], pel: [121, 112],
    mira: "izq",
    br: [[98, 119], [84, 124], [68, 128]],
    pi: [[121, 114], [132, 126], [122, 131]],
  },

  // ── Boca abajo ──
  cobra: {
    cab: [85, 91], cue: [90, 101], pec: [97, 112], pel: [113, 126],
    mira: "izq",
    br: [[93, 104], [93, 118], [93, 131]],
    pi: [[113, 128], [129, 130], [144, 131]],
  },
  esfinge: {
    cab: [85, 96], cue: [90, 105], pec: [97, 114], pel: [113, 126],
    mira: "izq",
    br: [[93, 108], [85, 124], [68, 130]],
    pi: [[113, 128], [129, 130], [144, 131]],
  },
  langosta: {
    cab: [85, 101], cue: [90, 109], pec: [97, 116], pel: [113, 122],
    mira: "izq",
    br: [[93, 112], [101, 120], [110, 125]],
    pi: [[113, 124], [127, 120], [142, 113]],
  },

  // ── De espaldas ──
  savasana: {
    cab: [68, 124], cue: [79, 126], pec: [95, 128], pel: [116, 130],
    mira: "arriba",
    br: [[79, 127], [96, 132], [112, 133]],
    pi: [[116, 130], [132, 131], [149, 130]],
  },
  savasana_lateral: {
    cab: [72, 116], cue: [83, 119], pec: [97, 122], pel: [114, 125],
    mira: "izq",
    br: [[83, 118], [96, 114], [110, 113]],
    pi: [[114, 127], [120, 112], [104, 106]],
    bolster: [113, 120],
  },
  nidra: {
    cab: [68, 124], cue: [79, 126], pec: [95, 128], pel: [116, 130],
    mira: "arriba",
    br: [[79, 127], [96, 132], [112, 133]],
    pi: [[116, 130], [130, 122], [146, 128]],
    bolster: [131, 126],
    manta: [96, 126],
  },
  puente: {
    cab: [72, 128], cue: [82, 126], pec: [94, 116], pel: [110, 102],
    mira: "arriba",
    br: [[82, 128], [93, 131], [105, 131]],
    pi: [[110, 104], [126, 113], [126, 131]],
  },
  puente_apoyado: {
    cab: [72, 128], cue: [82, 127], pec: [94, 120], pel: [110, 109],
    mira: "arriba",
    br: [[82, 128], [93, 131], [105, 131]],
    pi: [[110, 111], [127, 117], [127, 131]],
    bloque: [110, 120],
  },
  torsion_supina: {
    cab: [77, 120], cue: [86, 120], pec: [98, 121], pel: [110, 123],
    mira: "izq",
    br: [[86, 118], [73, 112], [60, 107]],
    br2: [[86, 119], [98, 114], [110, 112]],
    pi: [[110, 125], [122, 112], [131, 103]],
  },
  rodillas_pecho: {
    cab: [76, 122], cue: [86, 123], pec: [98, 124], pel: [111, 126],
    mira: "arriba",
    br: [[86, 123], [99, 116], [111, 113]],
    pi: [[111, 126], [107, 107], [92, 113]],
  },
  cuatro_supina: {
    cab: [68, 124], cue: [79, 126], pec: [94, 127], pel: [110, 127],
    mira: "arriba",
    br: [[79, 126], [92, 120], [105, 115]],
    pi: [[110, 127], [112, 101], [98, 95]],
    pi2: [[110, 127], [127, 105], [106, 103]],
  },
  supina_pierna_estirada: {
    cab: [68, 124], cue: [79, 126], pec: [94, 128], pel: [110, 130],
    mira: "arriba",
    br: [[79, 126], [94, 115], [109, 102]],
    pi: [[110, 130], [112, 101], [114, 72]],
    pi2: [[110, 130], [127, 131], [144, 130]],
  },
  bebe_feliz: {
    cab: [68, 126], cue: [79, 128], pec: [94, 128], pel: [110, 128],
    mira: "arriba",
    br: [[79, 128], [95, 116], [110, 103]],
    pi: [[110, 128], [116, 103], [111, 94]],
    pi2: [[110, 128], [131, 110], [126, 99]],
  },
  banana: {
    cab: [60, 116], cue: [71, 120], pec: [88, 126], pel: [108, 130],
    mira: "arriba",
    br: [[71, 118], [61, 109], [52, 102]],
    pi: [[108, 130], [126, 126], [144, 117]],
  },
  zapatero_apoyado: {
    cab: [70, 102], cue: [81, 107], pec: [95, 114], pel: [112, 124],
    mira: "arriba",
    br: [[81, 108], [73, 120], [64, 130]],
    pi: [[112, 126], [130, 121], [116, 131]],
    pi2: [[112, 126], [98, 121], [113, 131]],
    bolster: [92, 119],
  },
  piernas_pared: {
    cab: [60, 124], cue: [71, 126], pec: [90, 128], pel: [112, 130],
    mira: "arriba",
    br: [[71, 126], [85, 133], [99, 134]],
    pi: [[112, 130], [130, 106], [136, 58]],
    pi2: [[112, 130], [126, 106], [130, 58]],
    pared: true,
  },
  vela_hombros: {
    cab: [78, 128], cue: [89, 128], pec: [96, 112], pel: [100, 88],
    mira: "arriba",
    br: [[89, 126], [94, 112], [101, 100]],
    pi: [[100, 86], [100, 62], [100, 36]],
    pi2: [[100, 86], [96, 62], [96, 36]],
    manta: [92, 129],
  },

  // ── Sentada ──
  sentada: {
    cab: [100, 74], cue: [100, 86], pec: [100, 96], pel: [100, 120],
    br: [[100, 88], [107, 104], [113, 117]],
    pi: [[103, 121], [124, 127], [100, 131]],
    pi2: [[97, 121], [78, 127], [104, 131]],
  },
  respirar_sentada: {
    cab: [100, 74], cue: [100, 86], pec: [100, 96], pel: [100, 120],
    br: [[100, 88], [112, 97], [103, 97]],
    br2: [[100, 90], [113, 109], [103, 110]],
    pi: [[103, 121], [124, 127], [100, 131]],
    pi2: [[97, 121], [78, 127], [104, 131]],
  },
  brazos_arriba_sentada: {
    cab: [100, 74], cue: [100, 86], pec: [100, 96], pel: [100, 120],
    br: [[100, 88], [118, 76], [128, 58]],
    br2: [[100, 88], [82, 76], [72, 58]],
    pi: [[103, 121], [124, 127], [100, 131]],
    pi2: [[97, 121], [78, 127], [104, 131]],
  },
  brazos_espalda: {
    cab: [100, 74], cue: [100, 86], pec: [100, 96], pel: [100, 120],
    br: [[100, 88], [105, 70], [97, 86]],
    br2: [[100, 91], [109, 107], [99, 97]],
    pi: [[103, 121], [124, 127], [100, 131]],
    pi2: [[97, 121], [78, 127], [104, 131]],
  },
  cuello_lateral: {
    cab: [91, 76], cue: [99, 86], pec: [100, 96], pel: [100, 120],
    br: [[100, 88], [90, 82], [88, 73]],
    br2: [[100, 88], [111, 104], [119, 116]],
    pi: [[103, 121], [124, 127], [100, 131]],
    pi2: [[97, 121], [78, 127], [104, 131]],
  },
  luna_sentada: {
    cab: [88, 76], cue: [93, 86], pec: [96, 96], pel: [100, 120],
    br: [[93, 88], [80, 78], [68, 66]],
    br2: [[96, 90], [106, 104], [114, 114]],
    pi: [[103, 121], [124, 127], [100, 131]],
    pi2: [[97, 121], [78, 127], [104, 131]],
  },
  mariposa: {
    cab: [100, 72], cue: [100, 84], pec: [100, 94], pel: [100, 118],
    br: [[100, 86], [111, 103], [121, 115]],
    br2: [[100, 86], [89, 103], [79, 115]],
    pi: [[104, 120], [127, 128], [112, 131]],
    pi2: [[96, 120], [73, 128], [88, 131]],
  },
  pinza_sentada: {
    cab: [119, 118], cue: [110, 116], pec: [100, 115], pel: [86, 120],
    mira: "abajo",
    br: [[100, 115], [117, 121], [133, 126]],
    pi: [[88, 122], [113, 126], [141, 128]],
    pi2: [[88, 122], [113, 129], [141, 131]],
  },
  cabeza_rodilla: {
    cab: [119, 114], cue: [110, 112], pec: [100, 114], pel: [88, 120],
    mira: "abajo",
    br: [[100, 114], [117, 118], [133, 122]],
    pi: [[90, 122], [115, 126], [142, 128]],
    pi2: [[90, 122], [72, 130], [97, 131]],
  },
  torsion_sentada: {
    cab: [105, 74], cue: [101, 86], pec: [100, 96], pel: [100, 120],
    br: [[100, 88], [86, 97], [74, 104]],
    br2: [[100, 88], [113, 100], [119, 112]],
    pi: [[104, 121], [121, 113], [104, 131]],
    pi2: [[96, 121], [76, 127], [101, 131]],
  },
  barco: {
    cab: [72, 92], cue: [81, 99], pec: [91, 108], pel: [104, 121],
    mira: "izq",
    br: [[81, 101], [96, 105], [111, 109]],
    pi: [[104, 121], [122, 100], [137, 85]],
    pi2: [[104, 121], [122, 105], [137, 90]],
  },
  paloma: {
    cab: [93, 77], cue: [95, 86], pec: [98, 95], pel: [104, 111],
    mira: "izq",
    br: [[98, 89], [92, 105], [87, 121]],
    pi: [[104, 113], [84, 124], [68, 128]],
    pi2: [[106, 113], [126, 125], [147, 130]],
  },

  // ── Con silla ──
  silla_sentada: {
    cab: [92, 58], cue: [92, 70], pec: [92, 80], pel: [92, 105],
    br: [[92, 72], [98, 89], [104, 103]],
    pi: [[94, 106], [118, 108], [118, 131]],
    pi2: [[90, 106], [114, 108], [114, 131]],
    silla: true,
  },
  sentada_torsion_silla: {
    cab: [98, 59], cue: [93, 70], pec: [92, 80], pel: [92, 105],
    br: [[92, 72], [105, 79], [114, 88]],
    br2: [[92, 72], [80, 80], [73, 90]],
    pi: [[94, 106], [118, 108], [118, 131]],
    pi2: [[90, 106], [114, 108], [114, 131]],
    silla: true,
  },
};

/* Hacia dónde apunta la nariz en cada caso. */
const RUMBO: Record<"der" | "izq" | "arriba" | "abajo", [number, number]> = {
  der: [1, 0],
  izq: [-1, 0],
  arriba: [0, -1],
  abajo: [0, 1],
};

const DORADO = "#c8a050";
const VERDE = "#8aa86a";

function linea(puntos: P[]) {
  return puntos.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
}

/* El pie se dibuja perpendicular a la pierna y apuntando hacia donde mira la
   figura. Es la pista de si está de pie, de rodillas o acostada. */
function Pie({
  rodilla,
  pie,
  mira = "der",
  tenue,
}: {
  rodilla: P;
  pie: P;
  mira?: "der" | "izq" | "arriba" | "abajo";
  tenue?: boolean;
}) {
  const [vx, vy] = [pie[0] - rodilla[0], pie[1] - rodilla[1]];
  const largo = Math.hypot(vx, vy) || 1;
  // Perpendicular a la pierna, en el sentido que coincide con la mirada.
  let [px, py] = [-vy / largo, vx / largo];
  const [mx, my] = RUMBO[mira];
  if (px * mx + py * my < 0) [px, py] = [-px, -py];
  const l = tenue ? 6 : 7.5;
  return (
    <line
      x1={pie[0]}
      y1={pie[1]}
      x2={pie[0] + px * l}
      y2={pie[1] + py * l}
      stroke={DORADO}
      strokeWidth={tenue ? 2 : 2.4}
      strokeLinecap="round"
    />
  );
}

export function FiguraYoga({
  figura,
  tamano = 200,
  estilo,
}: {
  figura: string;
  tamano?: number;
  estilo?: CSSProperties;
}) {
  const f = FIGURAS[figura];
  const alto = Math.round((tamano * 150) / 200);

  if (!f) {
    // Sin dibujo definido: un mat vacío antes que un hueco roto.
    return (
      <svg viewBox="0 0 200 150" width={tamano} height={alto} style={estilo} aria-hidden="true">
        <line x1="30" y1={SUELO} x2="170" y2={SUELO} stroke={DORADO} strokeWidth="1" opacity="0.3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 150" width={tamano} height={alto} style={estilo} aria-hidden="true">
      {/* Apoyos, primero: van detrás del cuerpo */}
      {f.pared && (
        <line x1="163" y1="14" x2="163" y2={SUELO} stroke={DORADO} strokeWidth="2" opacity="0.35" />
      )}
      {f.silla && (
        <g stroke={DORADO} strokeWidth="1.4" opacity="0.4" fill="none" strokeLinecap="round">
          <line x1="76" y1="107" x2="126" y2="107" />
          <line x1="78" y1="107" x2="78" y2="62" />
          <line x1="80" y1="107" x2="80" y2={SUELO} />
          <line x1="124" y1="107" x2="124" y2={SUELO} />
        </g>
      )}
      {f.bolster && (
        <ellipse
          cx={f.bolster[0]}
          cy={f.bolster[1]}
          rx="22"
          ry="6"
          fill={VERDE}
          opacity="0.18"
          stroke={VERDE}
          strokeWidth="0.8"
        />
      )}
      {f.manta && (
        <rect
          x={f.manta[0] - 16}
          y={f.manta[1] - 3}
          width="32"
          height="6"
          rx="2"
          fill={VERDE}
          opacity="0.16"
          stroke={VERDE}
          strokeWidth="0.7"
        />
      )}
      {f.bloque && (
        <rect
          x={f.bloque[0] - 11}
          y={f.bloque[1] - 6}
          width="22"
          height="12"
          rx="2"
          fill={DORADO}
          opacity="0.16"
          stroke={DORADO}
          strokeWidth="0.8"
        />
      )}

      {/* Suelo */}
      {!f.sinSuelo && (
        <line x1="26" y1={SUELO} x2="174" y2={SUELO} stroke={DORADO} strokeWidth="1" opacity="0.32" />
      )}

      {/* Extremidades del fondo, más tenues */}
      <g fill="none" stroke={DORADO} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.32">
        {f.br2 && <path d={linea(f.br2)} />}
        {f.pi2 && <path d={linea(f.pi2)} />}
      </g>

      {/* Columna */}
      <path
        d={linea([f.cab, f.cue, f.pec, f.pel])}
        fill="none"
        stroke={DORADO}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />

      {/* Extremidades de adelante */}
      <g fill="none" stroke={DORADO} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
        {f.br && <path d={linea(f.br)} />}
        <path d={linea(f.pi)} />
      </g>

      {/* Manos y pies. Sin ellos la figura se lee como un palo doblado: son
          dos puntos y dos rayas, y cambian por completo si se entiende o no
          dónde está apoyada la persona. */}
      <g fill={DORADO} opacity="0.32">
        {f.br2 && <circle cx={f.br2[2][0]} cy={f.br2[2][1]} r="2.6" />}
        {f.pi2 && <Pie rodilla={f.pi2[1]} pie={f.pi2[2]} mira={f.mira} tenue />}
      </g>
      <g fill={DORADO} opacity="0.85">
        {f.br && <circle cx={f.br[2][0]} cy={f.br[2][1]} r="2.8" />}
        <Pie rodilla={f.pi[1]} pie={f.pi[2]} mira={f.mira} />
      </g>

      {/* La cabeza va al final y con relleno opaco: así tapa cualquier brazo
          que pase por detrás en vez de cruzarla. */}
      <circle cx={f.cab[0]} cy={f.cab[1]} r="8" fill="#0e1a0e" stroke={DORADO} strokeWidth="2" />
      {/* La cara es un punto en el borde, no una raya: una raya que sale de la
          cabeza parecía un pincho y se confundía con los brazos. */}
      {(() => {
        const [dx, dy] = RUMBO[f.mira ?? "der"];
        return <circle cx={f.cab[0] + dx * 7.2} cy={f.cab[1] + dy * 7.2} r="2.6" fill={DORADO} />;
      })()}
    </svg>
  );
}

/** Para avisar en desarrollo si a una postura le falta su dibujo. */
export function tieneFigura(figura: string) {
  return figura in FIGURAS;
}

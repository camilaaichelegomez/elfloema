"use client";

import type { CSSProperties } from "react";

/* El dibujo de cada postura.

   Es SVG hecho a mano, no una foto: lo que importa de una postura es la FORMA
   — dónde va cada articulación y hacia dónde apunta el cuerpo — y eso se lee
   mejor en una figura limpia que en una foto de alguien con calzas.

   Cada postura se guarda como un esqueleto de puntos en un lienzo de 200 × 150,
   con el suelo en y = 132. El componente le pone cuerpo a esos puntos: un
   tronco ancho, muslos más gruesos que las pantorrillas, pies y manos, como
   los pictogramas de yoga. El brazo y la pierna del fondo van en un dorado
   más oscuro, así se entiende que hay dos. Las posturas acostadas que de
   costado no se entienden (la torsión, la media luna) van vistas desde arriba.

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
  /** Dibujada vista desde arriba, con el mat entero. Para las posturas
      acostadas que de costado no se entienden, como la torsión. */
  desdeArriba?: boolean;
  /** Hacia dónde mira la cara. Sin esto la cabeza es un círculo y no se sabe
      si la postura va hacia adelante o hacia atrás. Por defecto, a la derecha. */
  mira?: Mira;
};

const SUELO = 132;

const FIGURAS: Record<string, Esqueleto> = {
  // ── De pie ──
  montana: {
    cab: [100, 30], cue: [100, 42], pec: [100, 52], pel: [100, 76],
    mira: "frente",
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
  /* Como el triángulo, pero la mano de abajo es la contraria y llega al
     suelo por fuera del pie de adelante; el pecho gira y la mirada sube. */
  triangulo_torsion: {
    cab: [80, 58], cue: [85, 65], pec: [92, 73], pel: [102, 84],
    mira: "arriba",
    br: [[88, 67], [90, 45], [92, 24]],
    br2: [[89, 70], [76, 98], [66, 126]],
    pi: [[102, 86], [82, 108], [66, SUELO]],
    pi2: [[102, 86], [120, 108], [134, SUELO]],
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
    mira: "frente",
    br: [[100, 82], [90, 93], [100, 97]],
    pi: [[104, 111], [126, 116], [112, SUELO]],
    pi2: [[96, 111], [74, 116], [88, SUELO]],
  },
  arbol: {
    cab: [100, 30], cue: [100, 42], pec: [100, 52], pel: [100, 77],
    mira: "frente",
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
    mira: "frente",
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
  /* La otra mitad del gato: al inhalar, la panza baja y el pecho y la
     mirada se abren hacia adelante. */
  vaca: {
    cab: [73, 80], cue: [84, 87], pec: [99, 97], pel: [122, 89],
    mira: "izq",
    br: [[86, 90], [86, 111], [86, 131]],
    pi: [[122, 91], [124, 112], [126, 131]],
  },
  /* Círculos de cadera, el punto más atrás: la pelvis viaja hacia los talones. */
  cadera_atras: {
    cab: [74, 90], cue: [84, 92], pec: [100, 96], pel: [130, 104],
    mira: "izq",
    br: [[86, 93], [82, 112], [78, 131]],
    pi: [[130, 106], [127, 118], [124, 131]],
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
    cab: [133, 71], cue: [122, 72], pec: [111, 84], pel: [108, 101],
    mira: "arriba",
    br: [[121, 74], [131, 98], [137, 124]],
    pi: [[108, 103], [106, 129], [138, 130]],
  },
  nino: {
    cab: [80, 125], cue: [91, 119], pec: [106, 114], pel: [125, 113],
    mira: "abajo",
    br: [[92, 118], [73, 126], [54, 129]],
    pi: [[125, 115], [103, 127], [134, 130]],
  },

  // ── Boca abajo ──
  cobra: {
    cab: [79, 93], cue: [88, 104], pec: [104, 119], pel: [124, 128],
    mira: "izq",
    br: [[90, 106], [94, 119], [89, 131]],
    pi: [[124, 129], [144, 130], [164, 130]],
  },
  esfinge: {
    cab: [79, 101], cue: [89, 111], pec: [105, 122], pel: [124, 128],
    mira: "izq",
    br: [[91, 113], [93, 129], [72, 130]],
    pi: [[124, 129], [144, 130], [164, 130]],
  },
  langosta: {
    cab: [74, 111], cue: [85, 116], pec: [101, 122], pel: [120, 127],
    mira: "izq",
    br: [[87, 117], [103, 116], [119, 113]],
    pi: [[120, 128], [138, 124], [156, 119]],
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
  /* Vista desde arriba: de costado, la torsión era un bulto en el suelo.
     Desde arriba se ve lo que importa: brazos en cruz, las dos rodillas
     caen juntas hacia un lado y la cara mira hacia el otro. */
  torsion_supina: {
    cab: [50, 76], cue: [60, 76], pec: [78, 76], pel: [106, 76],
    mira: "arriba",
    br: [[64, 76], [64, 96], [64, 116]],
    br2: [[64, 76], [64, 56], [64, 36]],
    pi: [[106, 78], [118, 102], [142, 106]],
    pi2: [[104, 76], [114, 98], [138, 101]],
    desdeArriba: true,
  },
  /* Punto de partida del puente: acostada, rodillas dobladas. */
  supina_rodillas: {
    cab: [72, 124], cue: [82, 126], pec: [98, 128], pel: [114, 130],
    mira: "arriba",
    br: [[82, 127], [96, 132], [110, 133]],
    pi: [[114, 130], [128, 110], [132, SUELO]],
  },
  /* Punto de partida de la langosta: boca abajo, todo apoyado. */
  boca_abajo: {
    cab: [66, 124], cue: [76, 127], pec: [94, 129], pel: [114, 130],
    mira: "abajo",
    br: [[80, 128], [96, 131], [112, 131]],
    pi: [[114, 130], [132, 130], [150, 130]],
  },
  /* Acostada con las pantorrillas sobre el asiento de la silla. */
  pantorrillas_silla: {
    cab: [170, 124], cue: [160, 126], pec: [146, 128], pel: [130, 130],
    mira: "arriba",
    br: [[160, 127], [146, 133], [134, 134]],
    pi: [[130, 130], [124, 103], [92, 102]],
    pi2: [[130, 130], [122, 101], [90, 100]],
    silla: true,
  },
  rodillas_pecho: {
    cab: [70, 124], cue: [80, 126], pec: [96, 127], pel: [112, 128],
    mira: "arriba",
    br: [[82, 125], [93, 113], [104, 103]],
    pi: [[112, 127], [101, 104], [119, 99]],
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
    cab: [60, 62], cue: [70, 68], pec: [88, 74], pel: [112, 76],
    mira: "frente",
    br: [[70, 70], [56, 58], [48, 44]],
    br2: [[70, 66], [60, 52], [58, 38]],
    pi: [[112, 78], [134, 86], [152, 100]],
    pi2: [[112, 74], [135, 81], [155, 93]],
    desdeArriba: true,
  },
  zapatero_apoyado: {
    cab: [52, 76], cue: [62, 76], pec: [80, 76], pel: [106, 76],
    mira: "frente",
    br: [[64, 79], [72, 98], [86, 108]],
    br2: [[64, 73], [72, 54], [86, 44]],
    pi: [[108, 80], [128, 106], [144, 80]],
    pi2: [[108, 72], [128, 46], [144, 72]],
    desdeArriba: true,
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
    mira: "frente",
    br: [[100, 88], [107, 104], [113, 117]],
    pi: [[103, 121], [124, 127], [100, 131]],
    pi2: [[97, 121], [78, 127], [104, 131]],
  },
  respirar_sentada: {
    cab: [100, 74], cue: [100, 86], pec: [100, 96], pel: [100, 120],
    mira: "frente",
    br: [[100, 88], [112, 97], [103, 97]],
    br2: [[100, 90], [113, 109], [103, 110]],
    pi: [[103, 121], [124, 127], [100, 131]],
    pi2: [[97, 121], [78, 127], [104, 131]],
  },
  brazos_arriba_sentada: {
    cab: [100, 74], cue: [100, 86], pec: [100, 96], pel: [100, 120],
    mira: "frente",
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
    mira: "frente",
    br: [[100, 88], [90, 82], [88, 73]],
    br2: [[100, 88], [111, 104], [119, 116]],
    pi: [[103, 121], [124, 127], [100, 131]],
    pi2: [[97, 121], [78, 127], [104, 131]],
  },
  luna_sentada: {
    cab: [88, 76], cue: [93, 86], pec: [96, 96], pel: [100, 120],
    mira: "frente",
    br: [[93, 88], [80, 78], [68, 66]],
    br2: [[96, 90], [106, 104], [114, 114]],
    pi: [[103, 121], [124, 127], [100, 131]],
    pi2: [[97, 121], [78, 127], [104, 131]],
  },
  mariposa: {
    cab: [100, 72], cue: [100, 84], pec: [100, 94], pel: [100, 118],
    mira: "frente",
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
  /* De pie detrás de la silla, una mano en el respaldo, un pie apenas
     despegado del suelo. */
  equilibrio_silla: {
    cab: [56, 30], cue: [56, 42], pec: [56, 52], pel: [56, 76],
    br: [[57, 44], [68, 55], [78, 63]],
    br2: [[55, 44], [54, 60], [53, 77]],
    pi: [[57, 78], [58, 105], [58, SUELO]],
    pi2: [[55, 78], [51, 102], [46, 120]],
    silla: true,
  },
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
  // ── Posturas agregadas para completar el catálogo ──
  luna_de_pie: {
    cab: [84, 32], cue: [89, 43], pec: [94, 53], pel: [102, 77],
    mira: "frente",
    br: [[90, 45], [82, 30], [76, 16]],
    br2: [[90, 45], [86, 30], [78, 15]],
    pi: [[104, 79], [103, 105], [102, SUELO]],
    pi2: [[100, 79], [98, 105], [97, SUELO]],
  },
  perro_tres_patas: {
    cab: [80, 104], cue: [86, 96], pec: [93, 86], pel: [112, 62],
    mira: "abajo",
    br: [[89, 92], [79, 112], [70, 131]],
    pi: [[113, 62], [127, 40], [141, 18]],
    pi2: [[111, 64], [122, 98], [130, 131]],
  },
  delfin: {
    cab: [82, 108], cue: [89, 97], pec: [96, 88], pel: [114, 64],
    mira: "abajo",
    br: [[90, 97], [92, 130], [72, 131]],
    pi: [[115, 66], [126, 99], [134, 131]],
    pi2: [[113, 66], [122, 99], [130, 131]],
  },
  plancha_antebrazos: {
    cab: [66, 103], cue: [76, 108], pec: [90, 112], pel: [112, 118],
    mira: "izq",
    br: [[78, 110], [80, 130], [62, 131]],
    pi: [[112, 120], [128, 125], [144, 130]],
  },
  plancha_lateral: {
    cab: [80, 80], cue: [88, 86], pec: [96, 92], pel: [118, 106],
    mira: "frente",
    br: [[88, 86], [88, 62], [88, 40]],
    br2: [[88, 88], [86, 110], [84, 131]],
    pi: [[118, 107], [134, 119], [150, 130]],
    pi2: [[118, 105], [134, 117], [150, 128]],
  },
  silla_giro: {
    cab: [84, 50], cue: [90, 58], pec: [98, 67], pel: [114, 88],
    mira: "izq",
    br: [[92, 60], [102, 78], [92, 70]],
    pi: [[114, 90], [96, 108], [100, SUELO]],
    pi2: [[112, 90], [94, 108], [98, SUELO]],
  },
  guerrero_invertido: {
    cab: [88, 36], cue: [92, 47], pec: [96, 57], pel: [100, 80],
    mira: "arriba",
    br: [[93, 48], [88, 28], [80, 12]],
    br2: [[93, 50], [84, 68], [80, 88]],
    pi: [[103, 82], [124, 105], [128, SUELO]],
    pi2: [[97, 82], [80, 105], [68, SUELO]],
  },
  angulo_torsion: {
    cab: [128, 66], cue: [120, 72], pec: [112, 78], pel: [96, 90],
    mira: "arriba",
    br: [[118, 72], [116, 50], [114, 28]],
    br2: [[118, 74], [124, 100], [130, 128]],
    pi: [[98, 92], [122, 104], [124, SUELO]],
    pi2: [[96, 92], [76, 110], [58, 128]],
  },
  piramide: {
    cab: [84, 112], cue: [88, 100], pec: [94, 90], pel: [106, 74],
    mira: "abajo",
    br: [[89, 98], [86, 114], [82, 130]],
    pi: [[104, 76], [94, 104], [84, SUELO]],
    pi2: [[108, 76], [120, 104], [132, SUELO]],
  },
  estocada_torsion: {
    cab: [125, 67], cue: [118, 74], pec: [112, 82], pel: [100, 95],
    mira: "arriba",
    br: [[116, 74], [112, 52], [110, 30]],
    br2: [[116, 76], [118, 100], [118, 128]],
    pi: [[103, 97], [124, 111], [126, SUELO]],
    pi2: [[97, 97], [80, 124], [60, 130]],
    manta: [82, 128],
  },
  aguila: {
    cab: [100, 32], cue: [100, 45], pec: [100, 56], pel: [100, 80],
    mira: "frente",
    br: [[100, 48], [107, 60], [100, 46]],
    br2: [[100, 48], [93, 60], [101, 46]],
    pi: [[102, 82], [92, 100], [104, 118]],
    pi2: [[98, 82], [102, 106], [98, SUELO]],
  },
  mano_pie: {
    cab: [104, 30], cue: [104, 42], pec: [104, 52], pel: [104, 76],
    mira: "izq",
    br: [[103, 44], [80, 60], [58, 74]],
    br2: [[105, 44], [112, 58], [106, 72]],
    pi: [[103, 78], [80, 77], [56, 76]],
    pi2: [[104, 78], [104, 105], [104, SUELO]],
  },
  media_luna: {
    cab: [62, 80], cue: [74, 80], pec: [84, 80], pel: [104, 82],
    mira: "frente",
    br: [[76, 78], [76, 56], [76, 34]],
    br2: [[76, 82], [76, 102], [76, 119]],
    pi: [[104, 80], [126, 80], [148, 80]],
    pi2: [[104, 84], [106, 108], [108, SUELO]],
    bloque: [76, 126],
  },
  bailarin: {
    cab: [84, 52], cue: [92, 58], pec: [98, 64], pel: [110, 76],
    mira: "izq",
    br: [[92, 60], [76, 50], [60, 40]],
    br2: [[94, 60], [116, 56], [134, 50]],
    pi: [[110, 76], [128, 84], [134, 48]],
    pi2: [[110, 78], [110, 105], [110, SUELO]],
  },
  cuervo: {
    cab: [72, 100], cue: [80, 98], pec: [94, 94], pel: [112, 90],
    mira: "izq",
    br: [[86, 97], [90, 113], [84, 131]],
    pi: [[112, 92], [96, 104], [118, 114]],
    pi2: [[112, 90], [98, 102], [120, 111]],
  },
  talones: {
    cab: [108, 68], cue: [108, 80], pec: [108, 90], pel: [110, 114],
    mira: "izq",
    br: [[108, 82], [104, 98], [94, 116]],
    pi: [[110, 116], [84, 128], [114, 130]],
  },
  heroe: {
    cab: [100, 74], cue: [100, 86], pec: [100, 96], pel: [100, 118],
    mira: "frente",
    br: [[100, 88], [108, 104], [106, 120]],
    br2: [[100, 88], [92, 104], [94, 120]],
    pi: [[104, 120], [106, 128], [122, 130]],
    pi2: [[96, 120], [94, 128], [78, 130]],
  },
  cara_vaca: {
    cab: [100, 74], cue: [100, 86], pec: [100, 96], pel: [100, 118],
    mira: "frente",
    br: [[102, 86], [110, 66], [104, 86]],
    br2: [[98, 88], [88, 102], [100, 96]],
    pi: [[104, 118], [100, 108], [122, 128]],
    pi2: [[96, 120], [100, 114], [78, 128]],
  },
  angulo_abierto: {
    cab: [100, 78], cue: [100, 90], pec: [100, 100], pel: [100, 120],
    mira: "frente",
    br: [[100, 92], [110, 110], [114, 128]],
    br2: [[100, 92], [90, 110], [86, 128]],
    pi: [[104, 122], [136, 126], [168, 129]],
    pi2: [[96, 122], [64, 126], [32, 129]],
  },
  doble_paloma: {
    cab: [100, 74], cue: [100, 86], pec: [100, 96], pel: [100, 118],
    mira: "frente",
    br: [[100, 88], [110, 104], [114, 118]],
    br2: [[100, 88], [90, 104], [86, 120]],
    pi: [[104, 118], [124, 121], [80, 119]],
    pi2: [[96, 121], [76, 129], [122, 129]],
  },
  puerta: {
    cab: [121, 60], cue: [114, 68], pec: [108, 78], pel: [100, 98],
    mira: "frente",
    br: [[111, 66], [112, 44], [126, 30]],
    br2: [[113, 70], [124, 90], [134, 112]],
    pi: [[104, 100], [130, 114], [156, 128]],
    pi2: [[96, 100], [94, 130], [84, 131]],
  },
  nino_apoyado: {
    cab: [80, 118], cue: [92, 114], pec: [106, 112], pel: [125, 112],
    mira: "abajo",
    br: [[93, 114], [76, 124], [60, 128]],
    pi: [[125, 114], [102, 127], [134, 130]],
    bolster: [98, 122],
  },
  lagartija: {
    cab: [72, 120], cue: [84, 118], pec: [94, 114], pel: [112, 108],
    mira: "izq",
    br: [[86, 118], [88, 130], [70, 131]],
    pi: [[112, 108], [92, 112], [88, SUELO]],
    pi2: [[112, 108], [132, 124], [156, 129]],
  },
  media_split: {
    cab: [84, 100], cue: [94, 98], pec: [104, 96], pel: [118, 102],
    mira: "abajo",
    br: [[95, 99], [92, 114], [90, 129]],
    pi: [[118, 104], [92, 118], [66, 128]],
    pi2: [[118, 104], [118, 130], [140, 131]],
  },
  rana: {
    cab: [54, 76], cue: [64, 76], pec: [80, 76], pel: [104, 76],
    mira: "frente",
    br: [[66, 80], [62, 98], [46, 96]],
    br2: [[66, 72], [62, 54], [46, 56]],
    pi: [[106, 80], [110, 108], [132, 110]],
    pi2: [[106, 72], [110, 44], [132, 42]],
    desdeArriba: true,
  },
  arco: {
    cab: [80, 96], cue: [88, 104], pec: [96, 112], pel: [112, 122],
    mira: "izq",
    br: [[90, 106], [104, 98], [118, 92]],
    pi: [[114, 122], [134, 114], [118, 92]],
  },
  pez: {
    cab: [66, 122], cue: [74, 114], pec: [88, 108], pel: [110, 126],
    mira: "izq",
    br: [[82, 110], [90, 130], [108, 130]],
    pi: [[110, 127], [132, 129], [154, 129]],
  },
  pez_apoyado: {
    cab: [66, 120], cue: [76, 118], pec: [92, 114], pel: [112, 122],
    mira: "arriba",
    br: [[80, 116], [78, 126], [72, 131]],
    pi: [[112, 123], [134, 128], [156, 129]],
    bolster: [96, 124],
  },
  mesa_invertida: {
    cab: [128, 90], cue: [118, 92], pec: [104, 94], pel: [86, 96],
    mira: "arriba",
    br: [[116, 94], [118, 112], [120, 131]],
    pi: [[86, 97], [68, 96], [70, SUELO]],
  },
  rueda: {
    cab: [72, 110], cue: [80, 96], pec: [94, 82], pel: [114, 84],
    mira: "abajo",
    br: [[80, 98], [72, 114], [66, 131]],
    pi: [[114, 86], [130, 104], [134, SUELO]],
  },
  arado: {
    cab: [92, 125], cue: [100, 122], pec: [104, 106], pel: [108, 86],
    mira: "arriba",
    br: [[102, 124], [122, 129], [140, 130]],
    pi: [[108, 84], [86, 106], [62, 128]],
    manta: [104, 130],
  },
  cabeza_pared: {
    cab: [146, 124], cue: [146, 112], pec: [146, 100], pel: [148, 76],
    mira: "izq",
    br: [[146, 108], [134, 130], [148, 128]],
    pi: [[148, 74], [152, 48], [156, 22]],
    pi2: [[146, 74], [150, 48], [154, 22]],
    pared: true,
  },
};

/* Hacia dónde apunta la nariz en cada caso. "frente" es la figura dibujada
   de cara a quien mira: dos ojos y sin nariz de perfil. */
type Mira = "der" | "izq" | "arriba" | "abajo" | "frente";
const RUMBO: Record<Mira, [number, number]> = {
  der: [1, 0],
  izq: [-1, 0],
  arriba: [0, -1],
  abajo: [0, 1],
  frente: [0, 0],
};

const DORADO = "#d9b264";
/** El brazo y la pierna del fondo: el mismo cuerpo, en sombra. */
const SOMBRA = "#86692f";
/** Borde que separa lo de adelante de lo de atrás: el color de la tarjeta. */
const BORDE = "#0f1b0f";
const VERDE = "#8aa86a";

/* Anchos al principio y al final de cada tramo, en un lienzo donde la figura
   mide unos cien de alto. El muslo es más grueso que la pantorrilla y el
   brazo que el antebrazo: con eso deja de ser un palito y se lee como una
   persona en el mat. */
const ANCHO = {
  muslo: [9.5, 7],
  pantorrilla: [7, 5],
  brazo: [6.5, 5.2],
  antebrazo: [5.2, 4],
  pecho: [16, 14],
  vientre: [14, 13.5],
  cuello: [6, 6],
  pie: [5, 3.4],
} satisfies Record<string, [number, number]>;
const CABEZA = 9;
const MANO = 3.4;
/** Cuánto sobresale el borde oscuro alrededor de lo que va adelante. */
const CONTORNO = 1.6;

/* Un tramo del cuerpo que se afina de un extremo al otro: un trapecio con las
   puntas redondeadas. `extra` lo engorda parejo, y así se dibuja el borde. */
function Tramo({
  a,
  b,
  ancho,
  color,
  extra = 0,
}: {
  a: P;
  b: P;
  ancho: [number, number];
  color: string;
  extra?: number;
}) {
  const [dx, dy] = [b[0] - a[0], b[1] - a[1]];
  const l = Math.hypot(dx, dy) || 1;
  const [nx, ny] = [-dy / l, dx / l];
  const ra = ancho[0] / 2 + extra;
  const rb = ancho[1] / 2 + extra;
  const puntos = [
    [a[0] + nx * ra, a[1] + ny * ra],
    [b[0] + nx * rb, b[1] + ny * rb],
    [b[0] - nx * rb, b[1] - ny * rb],
    [a[0] - nx * ra, a[1] - ny * ra],
  ]
    .map((p) => p.map((v) => v.toFixed(1)).join(","))
    .join(" ");
  return (
    <>
      <polygon points={puntos} fill={color} />
      <circle cx={a[0]} cy={a[1]} r={ra} fill={color} />
      <circle cx={b[0]} cy={b[1]} r={rb} fill={color} />
    </>
  );
}

/* El pie sale perpendicular a la pierna y apunta hacia donde mira la figura.
   Es la pista de si está de pie, de rodillas o acostada. */
function puntaDelPie(rodilla: P, tobillo: P, mira: Mira): P {
  const [vx, vy] = [tobillo[0] - rodilla[0], tobillo[1] - rodilla[1]];
  const l = Math.hypot(vx, vy) || 1;
  let [px, py] = [-vy / l, vx / l];
  const [mx, my] = RUMBO[mira];
  if (px * mx + py * my < 0) [px, py] = [-px, -py];
  return [tobillo[0] + px * 8.5 + (vx / l) * 1.5, tobillo[1] + py * 8.5 + (vy / l) * 1.5];
}

function Pierna({ p, mira, color, extra }: { p: [P, P, P]; mira: Mira; color: string; extra?: number }) {
  return (
    <>
      <Tramo a={p[0]} b={p[1]} ancho={ANCHO.muslo} color={color} extra={extra} />
      <Tramo a={p[1]} b={p[2]} ancho={ANCHO.pantorrilla} color={color} extra={extra} />
      <Tramo a={p[2]} b={puntaDelPie(p[1], p[2], mira)} ancho={ANCHO.pie} color={color} extra={extra} />
    </>
  );
}

function Brazo({ b, color, extra = 0 }: { b: [P, P, P]; color: string; extra?: number }) {
  return (
    <>
      <Tramo a={b[0]} b={b[1]} ancho={ANCHO.brazo} color={color} extra={extra} />
      <Tramo a={b[1]} b={b[2]} ancho={ANCHO.antebrazo} color={color} extra={extra} />
      <circle cx={b[2][0]} cy={b[2][1]} r={MANO + extra} fill={color} />
    </>
  );
}

function Tronco({ f, color, extra }: { f: Esqueleto; color: string; extra?: number }) {
  return (
    <>
      <Tramo a={f.cue} b={f.pec} ancho={ANCHO.pecho} color={color} extra={extra} />
      <Tramo a={f.pec} b={f.pel} ancho={ANCHO.vientre} color={color} extra={extra} />
    </>
  );
}

/* Las posturas que ya tienen ilustración propia, en public/yoga/posturas/
   con el nombre de la figura (por ejemplo, cobra.webp). Mientras una postura
   no tenga imagen, se sigue viendo su dibujo. Al agregar una imagen nueva,
   se suma su nombre aquí. */
const CON_IMAGEN = new Set<string>([
  "aguila",
  "aguja",
  "angulo_abierto",
  "angulo_lateral",
  "angulo_torsion",
  "arado",
  "arbol",
  "arco",
  "bailarin",
  "banana",
  "barco",
  "bebe_feliz",
  "bharadvaja",
  "boca_abajo",
  "brazos_arriba_pie",
  "brazos_arriba_sentada",
  "brazos_espalda",
  "cabeza_pared",
  "cabeza_rodilla",
  "cabeza_rodilla_torsion",
  "cachorro",
  "cadera_atras",
  "camello",
  "cara_vaca",
  "chaturanga",
  "cobra",
  "cocodrilo",
  "cuadrupedia",
  "cuatro_de_pie",
  "cuatro_supina",
  "cuello_lateral",
  "cuervo",
  "delfin",
  "diosa",
  "doble_paloma",
  "equilibrio_silla",
  "esfinge",
  "estocada_alta",
  "estocada_baja",
  "estocada_lateral",
  "estocada_torsion",
  "foca",
  "gato",
  "gato_equilibrio",
  "guerrero1",
  "guerrero2",
  "guerrero3",
  "guerrero_humilde",
  "guerrero_invertido",
  "guirnalda",
  "heroe",
  "hombros_pared",
  "lagartija",
  "langosta",
  "luna_de_pie",
  "luna_sentada",
  "mano_pie",
  "marichi",
  "mariposa",
  "media_luna",
  "media_luna_torsion",
  "media_pinza",
  "media_rana",
  "media_split",
  "mesa_invertida",
  "montana",
  "nidra",
  "nino",
  "nino_apoyado",
  "paloma",
  "pantorrillas_silla",
  "perro_abajo",
  "perro_arriba",
  "perro_tres_patas",
  "pez",
  "pez_apoyado",
  "pierna_costado",
  "piernas_abiertas_pie",
  "piernas_abiertas_torsion",
  "piernas_pared",
  "pinza_de_pie",
  "pinza_sentada",
  "pinza_silla",
  "piramide",
  "plancha",
  "plancha_antebrazos",
  "plancha_lateral",
  "puente",
  "puente_apoyado",
  "puerta",
  "rana",
  "respirar_sentada",
  "rodillas_pecho",
  "rueda",
  "savasana",
  "savasana_lateral",
  "sentada",
  "sentada_dedos",
  "sentada_torsion_silla",
  "silla_giro",
  "silla_montar",
  "silla_postura",
  "supina_pierna_estirada",
  "supina_rodillas",
  "talones",
  "torsion_apoyada",
  "torsion_cuatro",
  "torsion_facil",
  "torsion_hombros",
  "torsion_sentada",
  "torsion_supina",
  "torsion_supina_piernas",
  "triangulo",
  "triangulo_torsion",
  "vaca",
  "vela_hombros",
  "venado",
  "zapatero_apoyado",
]);

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

  if (CON_IMAGEN.has(figura)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/yoga/posturas/${figura}.webp`}
        width={tamano}
        height={alto}
        alt=""
        loading="lazy"
        style={{ objectFit: "contain", borderRadius: 4, ...estilo }}
      />
    );
  }

  if (!f) {
    // Sin dibujo definido: un mat vacío antes que un hueco roto.
    return (
      <svg viewBox="0 0 200 150" width={tamano} height={alto} style={estilo} aria-hidden="true">
        <rect x="26" y={SUELO + 1} width="148" height="3.5" rx="1.7" fill={VERDE} opacity="0.45" />
      </svg>
    );
  }

  const mira = f.mira ?? "der";
  const [dx, dy] = RUMBO[mira];
  const [cx, cy] = f.cab;

  return (
    <svg viewBox="0 0 200 150" width={tamano} height={alto} style={estilo} aria-hidden="true">
      {/* Apoyos, primero: van detrás del cuerpo */}
      {f.pared && <rect x="162" y="14" width="4" height={SUELO - 14} fill={VERDE} opacity="0.35" />}
      {f.silla && (
        <g stroke={VERDE} strokeWidth="2.4" opacity="0.55" fill="none" strokeLinecap="round">
          <line x1="76" y1="107" x2="126" y2="107" />
          <line x1="78" y1="107" x2="78" y2="62" />
          <line x1="80" y1="107" x2="80" y2={SUELO} />
          <line x1="124" y1="107" x2="124" y2={SUELO} />
        </g>
      )}
      {f.bolster && <ellipse cx={f.bolster[0]} cy={f.bolster[1]} rx="22" ry="6.5" fill={VERDE} opacity="0.45" />}
      {f.manta && (
        <rect x={f.manta[0] - 16} y={f.manta[1] - 3} width="32" height="6" rx="2" fill={VERDE} opacity="0.45" />
      )}
      {f.bloque && (
        <rect x={f.bloque[0] - 11} y={f.bloque[1] - 6} width="22" height="12" rx="2" fill={VERDE} opacity="0.5" />
      )}

      {/* El mat. Visto desde arriba es el rectángulo entero. */}
      {f.desdeArriba ? (
        <>
          <rect x="30" y="26" width="140" height="100" rx="4" fill={VERDE} opacity="0.12" stroke={VERDE} strokeOpacity="0.4" />
          <text x="100" y="143" textAnchor="middle" fontSize="9" fill={VERDE}>
            vista desde arriba
          </text>
        </>
      ) : (
        !f.sinSuelo && <rect x="26" y={SUELO + 1} width="148" height="3.5" rx="1.7" fill={VERDE} opacity="0.45" />
      )}

      {/* Brazo y pierna del fondo: en sombra y detrás de todo. Dos tonos se
          leen mejor que dos transparencias, que al cruzarse se ensucian. */}
      {f.pi2 && <Pierna p={f.pi2} mira={mira} color={SOMBRA} />}
      {f.br2 && <Brazo b={f.br2} color={SOMBRA} />}

      {/* Tronco. Primero un borde del color del fondo, así se despega de lo
          que tiene detrás. */}
      <Tronco f={f} color={BORDE} extra={CONTORNO} />
      <Tramo a={f.cab} b={f.cue} ancho={ANCHO.cuello} color={DORADO} />
      <Tronco f={f} color={DORADO} />

      {/* Pierna y brazo de adelante, con el mismo borde: donde cruzan el
          tronco se ve cuál va por delante. */}
      <Pierna p={f.pi} mira={mira} color={BORDE} extra={CONTORNO} />
      <Pierna p={f.pi} mira={mira} color={DORADO} />
      {f.br && (
        <>
          <Brazo b={f.br} color={BORDE} extra={CONTORNO} />
          <Brazo b={f.br} color={DORADO} />
        </>
      )}

      {/* La cabeza va al final: tapa lo que pase por detrás. De perfil, la
          nariz es un bulto en el borde y el ojo un punto oscuro del mismo
          lado; de frente, dos ojos. Así se sabe hacia dónde mira. */}
      <circle cx={cx} cy={cy} r={CABEZA + CONTORNO} fill={BORDE} />
      <circle cx={cx} cy={cy} r={CABEZA} fill={DORADO} />
      {mira === "frente" ? (
        <>
          <circle cx={cx - 3.2} cy={cy - 0.5} r="1.5" fill={BORDE} />
          <circle cx={cx + 3.2} cy={cy - 0.5} r="1.5" fill={BORDE} />
        </>
      ) : (
        <>
          <circle cx={cx + dx * CABEZA} cy={cy + dy * CABEZA} r="2.7" fill={DORADO} />
          <circle cx={cx + dx * 4.4 - dy * 2.4} cy={cy + dy * 4.4 - dx * 2.4} r="1.6" fill={BORDE} />
        </>
      )}
    </svg>
  );
}

/** Para avisar en desarrollo si a una postura le falta su dibujo. */
export function tieneFigura(figura: string) {
  return figura in FIGURAS;
}


/* Cómo se llama cada ejercicio en inglés, para ir a verlo.

   En la página de taller hay un botón por ejercicio que abre una búsqueda en
   YouTube con este término. No es una lista de videos elegidos a mano a
   propósito: los videos se caen, se borran y se hacen privados, y en seis
   meses la mitad de los enlaces estarían rotos. Una búsqueda no se cae.

   En inglés porque hay muchísimo más material y mejor hecho, y para mirar un
   movimiento no hace falta entender lo que dicen.

   Esto es para el taller, no para la app: lo que se ve ahí sirve para
   aprender el movimiento y para juzgar si el dibujo generado se parece. Las
   imágenes y los videos son de quien los hizo y no se pueden reusar. */

export const TERMINO_EN_INGLES: Record<string, string> = {
  flexion_pared: "wall push up",
  flexion_inclinada_alta: "incline push up counter",
  flexion_inclinada_baja: "incline push up bench",
  flexion_rodillas: "knee push up",
  flexion_completa: "push up proper form",
  flexion_declinada: "decline push up feet elevated",
  flexion_diamante: "diamond push up",

  press_banda: "resistance band overhead press",
  press_mochila: "backpack overhead press",
  pica_elevada: "elevated pike push up",
  pica_suelo: "pike push up",
  pica_pies_altos: "feet elevated pike push up",

  remo_banda: "seated resistance band row",
  remo_mochila: "backpack bent over row",
  remo_mochila_una_mano: "one arm row form",

  sentadilla_silla: "sit to stand chair squat",
  sentadilla: "bodyweight squat form",
  sentadilla_mochila: "goblet squat backpack",
  sentadilla_bulgara: "bulgarian split squat",
  pistol_silla: "assisted pistol squat to box",

  puente: "glute bridge",
  puente_una_pierna: "single leg glute bridge",
  empuje_sofa: "bodyweight hip thrust couch",
  empuje_sofa_peso: "weighted hip thrust at home",
  peso_muerto_una_pierna: "single leg romanian deadlift",
  curl_nordico: "nordic hamstring curl",

  zancada_estatica: "static lunge split squat",
  zancada_atras: "reverse lunge",
  subida_escalon: "step up exercise form",
  subida_escalon_peso: "weighted step up",

  bicho_muerto: "dead bug exercise",
  plancha_rodillas: "plank on knees",
  plancha: "forearm plank form",
  plancha_toque: "plank shoulder taps",
  rodillo: "ab wheel rollout from knees",
  plancha_lateral_rodillas: "side plank on knees",
  plancha_lateral: "side plank",
  maleta: "suitcase carry",

  aperturas_banda: "band pull apart",
  ytw: "prone y t w raises",

  talones: "standing calf raise",
  talones_una_pierna: "single leg calf raise on step",
};

/** La búsqueda de YouTube para un ejercicio, o nada si no tiene término. */
export function enlaceDeVideo(figura: string) {
  const termino = TERMINO_EN_INGLES[figura];
  if (!termino) return null;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(termino)}`;
}

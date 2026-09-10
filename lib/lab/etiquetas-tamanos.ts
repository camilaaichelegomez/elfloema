/* Tamaños de etiqueta para envases de cosmética.

   IMPORTANTE: no existe una medida "oficial" — cada proveedor de envases trae
   diámetros distintos. Estos son puntos de partida habituales; la medida exacta
   se saca midiendo el frasco con `medidaDesdeFrasco()`, que es geometría pura y
   sirve para cualquier envase.
*/

export type TamanoEtiqueta = {
  id: string;
  nombre: string;
  envase: string;
  ancho: number; // mm
  alto: number; // mm
  forma: "rect" | "redonda";
};

export const TAMANOS: TamanoEtiqueta[] = [
  { id: "rollon-10", nombre: "Roll-on 10 ml", envase: "Roll-on pequeño", ancho: 40, alto: 25, forma: "rect" },
  { id: "gotero-30", nombre: "Gotero 30 ml", envase: "Frasco con gotero", ancho: 50, alto: 30, forma: "rect" },
  { id: "frasco-50", nombre: "Frasco 50 ml", envase: "Sérum, aceite", ancho: 60, alto: 40, forma: "rect" },
  { id: "valvula-100", nombre: "Válvula / airless 100 ml", envase: "Crema con dosificador", ancho: 70, alto: 50, forma: "rect" },
  { id: "frasco-100", nombre: "Frasco 100 ml", envase: "Tónico, hidrolato", ancho: 80, alto: 45, forma: "rect" },
  { id: "spray-250", nombre: "Spray 250 ml", envase: "Spray capilar, tónico", ancho: 90, alto: 60, forma: "rect" },
  { id: "botella-500", nombre: "Botella 500 ml", envase: "Shampoo, gel de ducha", ancho: 100, alto: 70, forma: "rect" },
  { id: "tarro-tapa-50", nombre: "Tapa de tarro 50 g", envase: "Crema, ungüento (tapa)", ancho: 50, alto: 50, forma: "redonda" },
  { id: "tarro-tapa-30", nombre: "Tapa de tarro 30 g", envase: "Bálsamo (tapa)", ancho: 40, alto: 40, forma: "redonda" },
  { id: "jabon", nombre: "Jabón en barra", envase: "Faja o etiqueta de jabón", ancho: 70, alto: 40, forma: "rect" },
];

/** Etiqueta a la medida de un frasco cilíndrico.
 *  El ancho es la circunferencia (diámetro × π) menos una holgura para que las
 *  puntas no se monten; el alto deja aire arriba y abajo del cuerpo recto. */
export function medidaDesdeFrasco(diametroMm: number, altoCuerpoMm: number) {
  const circunferencia = diametroMm * Math.PI;
  return {
    ancho: Math.max(20, Math.round(circunferencia - 5)),
    alto: Math.max(15, Math.round(altoCuerpoMm - 10)),
  };
}

export type Hoja = { id: string; nombre: string; ancho: number; alto: number };

export const HOJAS: Hoja[] = [
  { id: "carta", nombre: "Carta (21,6 × 27,9 cm)", ancho: 216, alto: 279 },
  { id: "a4", nombre: "A4 (21 × 29,7 cm)", ancho: 210, alto: 297 },
];

/** Cuántas etiquetas caben en la hoja, considerando margen y separación. */
export function calcularDistribucion(
  hoja: Hoja,
  anchoEtiqueta: number,
  altoEtiqueta: number,
  margen = 10,
  separacion = 3
) {
  const utilAncho = hoja.ancho - margen * 2;
  const utilAlto = hoja.alto - margen * 2;
  const columnas = Math.max(0, Math.floor((utilAncho + separacion) / (anchoEtiqueta + separacion)));
  const filas = Math.max(0, Math.floor((utilAlto + separacion) / (altoEtiqueta + separacion)));
  return { columnas, filas, total: columnas * filas };
}

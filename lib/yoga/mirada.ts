import type { Fase, Familia, Paso } from "./tipos";

/* Dónde se posan los ojos.

   En la tradición se llama dṛṣṭi y es uno de los tres hilos de la práctica,
   junto con la postura y la respiración; en el ashtanga hay nueve puntos con
   nombre. Y no es solo tradición: la postura de pie se sostiene con vista,
   oído interno y propiocepción, así que fijar la mirada en un punto quieto
   reduce el balanceo, y pasearla por la sala lo aumenta.

   Está explicado en /biblioteca/yoga-practica.

   Cada postura puede traer la suya; si no, se usa la de su familia. */

const POR_FAMILIA: Record<Familia, string> = {
  de_pie: "La mirada hacia donde mira el pecho, blanda, sin clavarla.",
  sentada: "La mirada suave hacia adelante y abajo, o los ojos entornados.",
  cuadrupedia: "La mirada al suelo, entre las manos: la nuca sigue la columna.",
  boca_abajo: "La mirada un poco adelante en el suelo, sin echar la cabeza atrás.",
  supina: "Los ojos cerrados, o la mirada quieta en el techo.",
  invertida: "La mirada quieta en un punto, sin girar la cabeza.",
  respiracion: "Los ojos cerrados, o la mirada baja y blanda.",
  quietud: "Los ojos cerrados.",
};

const EQUILIBRIO =
  "Elige un punto fijo en el suelo, a dos o tres metros, y no lo sueltas: la mirada quieta es la que sostiene el equilibrio.";

/** Qué decirle a la persona sobre dónde mirar en este paso. */
export function miradaDe(paso: Paso & { fase?: Fase }): string {
  if (paso.mirada) return paso.mirada;
  if (paso.fase === "equilibrio") return EQUILIBRIO;
  return POR_FAMILIA[paso.familia];
}

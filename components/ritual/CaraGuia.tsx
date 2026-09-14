"use client";

import type { CSSProperties } from "react";

/* Dibujo de la cara con las marcas de cada maniobra.

   Es SVG hecho a mano, no una imagen: en el drenaje lo que importa es la
   DIRECCIÓN del recorrido, y eso tiene que estar exacto.

   Tres decisiones que hacen que se entienda:

   1. LA CARA HACE EL GESTO. En los ejercicios no basta con pintar una mancha
      sobre el músculo: una cara neutra con una mancha encima no muestra una
      acción. Si el ejercicio es «el pez», la cara tiene las mejillas hundidas;
      si es la O, la boca está en O. El dibujo muestra el resultado.
   2. HAY TRES VISTAS. De frente no se ve la nuca, ni la lengua contra el
      paladar, ni el cuello estirado hacia el techo. Esas van de perfil. Y
      calibrar la presión va sobre el antebrazo, que es donde se practica.
   3. LAS FLECHAS LLEVAN CONTORNO OSCURO. Sin él se confunden con las líneas
      de la cara, que son del mismo color.

   Coordenadas: lienzo 220 × 300, cara centrada en x = 110.
   Las marcas se escriben para el lado izquierdo de la pantalla y el componente
   las refleja cuando la maniobra es simétrica.
*/

const ORO = "#c8a050";
const ORO_CLARO = "#e8c878";
const TRAZO = "rgba(217, 203, 170, 0.34)";
const TRAZO_FUERTE = "rgba(217, 203, 170, 0.6)";
const FONDO = "#0b160b";

type Marca =
  /** Recorrido con punta de flecha. `n` numera el orden cuando son varios. */
  | { t: "flecha"; d: string; n?: number }
  /** Dónde se apoyan los dedos y se hacen los círculos fijos, sin avanzar. */
  | { t: "puntos"; p: [number, number][] }
  /** Yemas de los dedos: dónde se pone la mano (resistencia, amasado). */
  | { t: "dedos"; p: [number, number][] }
  /** Músculo que trabaja. Relleno suave, sin borde punteado. */
  | { t: "zona"; d: string }
  /** Aro de atención: párpados, articulación. */
  | { t: "aro"; c: [number, number]; r: number }
  /** Una palabra dentro del dibujo cuando hace falta. */
  | { t: "nota"; xy: [number, number]; texto: string };

type Vista = "frente" | "perfil" | "antebrazo";

type Gesto = {
  cejas?: "neutras" | "arriba" | "fruncidas";
  ojos?: "neutros" | "entrecerrados" | "cerrados";
  boca?: "neutra" | "o" | "sonrisa" | "dentro" | "abierta" | "beso" | "labio-abajo";
  mejillas?: "neutras" | "hundidas" | "elevadas";
};

type Guia = { marcas: Marca[]; simetrico?: boolean; vista?: Vista; gesto?: Gesto };

// ── El rostro, por partes ─────────────────────────────────────────────────────

const esp = (x: number) => 220 - x; // espejo horizontal

function Cejas({ tipo = "neutras" }: { tipo?: Gesto["cejas"] }) {
  const d =
    tipo === "arriba"
      ? "M 70 74 Q 86 65 102 73"
      : tipo === "fruncidas"
        ? "M 72 80 Q 88 76 102 86"
        : "M 70 82 Q 86 74 102 82";
  const dEsp =
    tipo === "arriba"
      ? "M 150 74 Q 134 65 118 73"
      : tipo === "fruncidas"
        ? "M 148 80 Q 132 76 118 86"
        : "M 150 82 Q 134 74 118 82";
  return (
    <>
      <path d={d} />
      <path d={dEsp} />
    </>
  );
}

function Ojos({ tipo = "neutros" }: { tipo?: Gesto["ojos"] }) {
  if (tipo === "cerrados") {
    return (
      <>
        <path d="M 72 101 Q 86 107 100 101" />
        <path d="M 148 101 Q 134 107 120 101" />
      </>
    );
  }
  const alto = tipo === "entrecerrados" ? 4 : 8;
  return (
    <>
      <path d={`M 72 100 Q 86 ${100 - alto} 100 100 Q 86 ${100 + alto} 72 100 Z`} />
      <path d={`M 148 100 Q 134 ${100 - alto} 120 100 Q 134 ${100 + alto} 148 100 Z`} />
    </>
  );
}

function Boca({ tipo = "neutra" }: { tipo?: Gesto["boca"] }) {
  switch (tipo) {
    case "o":
      return <ellipse cx="110" cy="152" rx="9" ry="13" />;
    case "abierta":
      return <ellipse cx="110" cy="154" rx="13" ry="17" />;
    case "beso":
      return (
        <>
          <ellipse cx="110" cy="149" rx="7" ry="9" />
          <path d="M 100 156 Q 110 161 120 156" />
        </>
      );
    case "sonrisa":
      return (
        <>
          <path d="M 88 146 Q 110 165 132 146" />
          <path d="M 88 146 Q 110 152 132 146" />
        </>
      );
    case "dentro":
      return (
        <>
          <path d="M 94 152 L 126 152" strokeWidth="2.4" />
          <path d="M 98 146 Q 110 149 122 146" />
        </>
      );
    case "labio-abajo":
      return (
        <>
          <path d="M 92 148 Q 110 142 128 148" />
          <path d="M 92 148 Q 110 172 128 148 Z" />
          <path d="M 99 153 L 121 153" opacity="0.5" />
        </>
      );
    default:
      return <path d="M 92 150 Q 110 143 128 150 Q 110 162 92 150 Z" />;
  }
}

function Mejillas({ tipo = "neutras" }: { tipo?: Gesto["mejillas"] }) {
  if (tipo === "hundidas") {
    return (
      <>
        <path d="M 74 124 Q 88 140 78 156" opacity="0.8" />
        <path d="M 146 124 Q 132 140 142 156" opacity="0.8" />
      </>
    );
  }
  if (tipo === "elevadas") {
    return (
      <>
        <path d="M 72 118 Q 86 111 100 118" opacity="0.8" />
        <path d="M 148 118 Q 134 111 120 118" opacity="0.8" />
      </>
    );
  }
  return null;
}

function RostroFrente({ gesto = {} }: { gesto?: Gesto }) {
  return (
    <g fill="none" stroke={TRAZO} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* óvalo */}
      <path d="M 110 22 C 152 22 174 50 174 104 C 174 152 150 190 110 198 C 70 190 46 152 46 104 C 46 50 68 22 110 22" />
      {/* nacimiento del pelo: sin esto la cabeza parece un huevo */}
      <path d="M 58 76 C 62 40 88 27 110 27 C 132 27 158 40 162 76" stroke={TRAZO_FUERTE} />
      {/* orejas */}
      <path d="M 46 96 C 35 94 33 120 46 130" />
      <path d="M 174 96 C 185 94 187 120 174 130" />
      <Cejas tipo={gesto.cejas} />
      <Ojos tipo={gesto.ojos} />
      {/* nariz */}
      <path d="M 110 94 L 110 122 Q 103 128 99 124" />
      <path d="M 110 122 Q 117 128 121 124" />
      <Boca tipo={gesto.boca} />
      <Mejillas tipo={gesto.mejillas} />
      {/* cuello y hombros */}
      <path d="M 86 192 Q 84 218 80 242" />
      <path d="M 134 192 Q 136 218 140 242" />
      <path d="M 26 272 Q 56 252 80 243 L 110 251 L 140 243 Q 164 252 194 272" />
      {/* clavículas */}
      <path d="M 62 258 Q 86 251 108 254" />
      <path d="M 158 258 Q 134 251 112 254" />
    </g>
  );
}

/** Perfil mirando a la izquierda. Para nuca, cuello estirado y boca por dentro. */
function RostroPerfil() {
  return (
    <g fill="none" stroke={TRAZO} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Perfil de la cara, de la frente al mentón. Los quiebres son los que
          hacen que se lea como una cara: ceja, puente, punta de nariz, labios. */}
      <path d="M 112 24 C 88 26 70 40 66 60 C 63 74 63 82 65 90 C 66 96 66 99 64 102 L 48 117 C 46 119 47 121 50 122 L 63 126 C 65 127 65 129 63 131 L 60 137 C 59 140 60 142 63 143 L 61 150 C 60 155 62 158 67 160 L 72 166 C 80 178 94 186 112 188" />
      {/* cráneo y nuca */}
      <path d="M 112 24 C 146 26 170 50 171 92 C 172 124 165 146 158 162 C 152 176 150 186 151 198" />
      {/* mandíbula hasta debajo de la oreja */}
      <path d="M 112 188 C 130 186 144 176 150 160" />
      {/* oreja */}
      <path d="M 130 106 C 121 105 118 128 129 132 C 139 133 141 108 130 106 Z" />
      <path d="M 131 114 C 127 115 128 124 132 125" opacity="0.7" />
      {/* nacimiento del pelo */}
      <path d="M 112 24 C 138 30 156 50 160 78" stroke={TRAZO_FUERTE} />
      {/* cuello */}
      <path d="M 96 190 C 92 214 88 234 86 250" />
      <path d="M 151 198 C 153 218 154 236 154 250" />
      {/* hombro */}
      <path d="M 34 280 C 58 260 76 254 86 250 L 122 258 L 154 250 C 168 254 186 266 198 280" />
    </g>
  );
}

/** Antebrazo con dos yemas: donde se practica la presión antes de tocarse la cara. */
function Antebrazo() {
  return (
    <g fill="none" stroke={TRAZO} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* brazo: del codo abajo a la izquierda, a la muñeca arriba a la derecha */}
      <path d="M 34 262 C 50 246 96 190 120 158 L 148 176 C 124 210 76 266 60 282 C 52 292 36 290 30 280 C 26 272 28 268 34 262 Z" />
      {/* muñeca */}
      <path d="M 120 158 L 148 176" opacity="0.55" />
      {/* mano insinuada */}
      <path d="M 120 158 C 126 140 144 130 158 138 C 172 147 168 166 148 176" />
    </g>
  );
}

// ── Las marcas de cada paso ───────────────────────────────────────────────────

const MARCAS: Record<string, Guia> = {
  // ── Preparación ──
  "prep-limpieza": { marcas: [] },
  "prep-deslizante": {
    simetrico: true,
    marcas: [
      { t: "flecha", d: "M 108 118 Q 86 120 64 112" },
      { t: "flecha", d: "M 108 150 Q 86 154 66 144" },
      { t: "flecha", d: "M 104 200 Q 92 214 82 232" },
    ],
  },
  /* Antes esto eran dos puntos y un aro flotando en la mejilla, que no querían
     decir nada. La presión se practica en el antebrazo: eso es lo que se
     dibuja. */
  "prep-presion": {
    vista: "antebrazo",
    marcas: [
      { t: "dedos", p: [[80, 224], [94, 208]] },
      { t: "aro", c: [87, 216], r: 26 },
      { t: "nota", xy: [110, 84], texto: "55 g · como un huevo" },
      { t: "flecha", d: "M 66 168 L 78 198" },
    ],
  },

  // ── Drenaje: cuello ──
  /* La respiración no se ve. Lo que sí se ve es el pecho subiendo: dos flechas
     grandes sobre las costillas, no dos rayitas en la clavícula. */
  "dre-respirar": {
    simetrico: true,
    marcas: [
      { t: "flecha", d: "M 92 292 Q 86 278 92 262" },
      { t: "nota", xy: [110, 232], texto: "5 respiraciones" },
    ],
  },
  "dre-apertura": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[110, 254]] },
      { t: "flecha", d: "M 106 252 Q 84 248 58 252" },
    ],
  },
  "dre-cadena-cuello": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[82, 192], [79, 210], [76, 228], [73, 246]] },
      { t: "flecha", d: "M 88 190 Q 80 218 76 250" },
    ],
  },
  /* La nuca no existe de frente: antes las flechas bajaban por el borde de la
     cara y parecían patillas. De perfil se ve lo que de verdad se hace. */
  "dre-nuca": {
    vista: "perfil",
    marcas: [
      { t: "puntos", p: [[157, 152], [154, 180], [153, 208]] },
      { t: "flecha", d: "M 160 144 Q 152 200 154 246" },
      { t: "nota", xy: [106, 58], texto: "base del cráneo" },
    ],
  },
  "dre-menton": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[104, 190], [88, 184], [70, 168], [56, 146]] },
      { t: "flecha", d: "M 108 192 Q 78 184 52 142", n: 1 },
      { t: "flecha", d: "M 52 146 Q 62 196 74 248", n: 2 },
    ],
  },
  /* El bucle delante/detrás de la oreja era un garabato de 4 px. Ahora son dos
     puntos claros y una sola flecha de bajada. */
  "dre-orejas": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[56, 112], [38, 112]] },
      { t: "nota", xy: [58, 88], texto: "delante y detrás" },
      { t: "flecha", d: "M 44 130 Q 58 190 74 248" },
    ],
  },
  "dre-hombros": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[34, 266], [56, 258], [78, 250]] },
      { t: "flecha", d: "M 32 266 Q 66 254 100 248" },
    ],
  },

  // ── Drenaje: rostro ──
  "dre-roce-rostro": {
    simetrico: true,
    marcas: [
      { t: "flecha", d: "M 106 160 L 72 158" },
      { t: "flecha", d: "M 106 144 L 74 142" },
      { t: "flecha", d: "M 106 124 L 80 122" },
      { t: "flecha", d: "M 106 68 L 68 72" },
    ],
  },
  "dre-labios": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[104, 160], [90, 162], [76, 158]] },
      { t: "flecha", d: "M 106 160 Q 88 166 68 156", n: 1 },
      { t: "flecha", d: "M 68 158 Q 66 204 72 248", n: 2 },
    ],
  },
  "dre-nariz": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[101, 98], [99, 112], [99, 126]] },
      { t: "flecha", d: "M 98 128 Q 90 136 80 138" },
    ],
  },
  /* El viaje largo es un recorrido único de cuatro tramos: van numerados, si no
     se leen como cuatro flechas sueltas cruzándose. */
  "dre-viaje-largo": {
    simetrico: true,
    marcas: [
      { t: "flecha", d: "M 82 116 Q 92 142 100 160", n: 1 },
      { t: "flecha", d: "M 100 162 Q 105 178 107 190", n: 2 },
      { t: "flecha", d: "M 107 192 Q 78 184 54 144", n: 3 },
      { t: "flecha", d: "M 54 148 Q 62 198 74 248", n: 4 },
    ],
  },
  /* El aro de r=20 sobre cada ojo parecía un par de anteojos. Ahora: el hueso
     marcado con puntos, una flecha, y la advertencia escrita. */
  "dre-ojos": {
    simetrico: true,
    gesto: { ojos: "cerrados" },
    marcas: [
      { t: "puntos", p: [[100, 106], [88, 113], [76, 112], [66, 104]] },
      { t: "flecha", d: "M 101 106 Q 84 118 64 102" },
      { t: "nota", xy: [110, 84], texto: "media presión" },
    ],
  },
  "dre-cejas": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[99, 84], [86, 78], [71, 83]] },
      { t: "flecha", d: "M 101 85 Q 86 76 66 83" },
    ],
  },
  "dre-frente": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[104, 62], [88, 64], [70, 74]] },
      { t: "flecha", d: "M 107 62 Q 82 64 54 94" },
    ],
  },
  "dre-cierre": {
    simetrico: true,
    marcas: [
      { t: "puntos", p: [[54, 116], [66, 152], [78, 182]] },
      { t: "flecha", d: "M 54 116 Q 68 152 86 184", n: 1 },
      { t: "flecha", d: "M 86 186 Q 78 216 74 250", n: 2 },
    ],
  },
  "dre-roce-final": {
    simetrico: true,
    marcas: [
      { t: "flecha", d: "M 72 76 Q 68 150 74 226" },
      { t: "flecha", d: "M 100 66 Q 96 160 94 236" },
    ],
  },

  // ── Ejercicios: la cara hace el gesto ──
  "ej-pomulos": {
    simetrico: true,
    gesto: { boca: "sonrisa", mejillas: "elevadas" },
    marcas: [
      { t: "zona", d: "M 60 114 Q 84 106 102 122 Q 92 148 66 142 Z" },
      { t: "dedos", p: [[72, 118], [88, 122]] },
      { t: "flecha", d: "M 80 106 L 80 116" },
    ],
  },
  "ej-pez": {
    simetrico: true,
    gesto: { boca: "o", mejillas: "hundidas" },
    marcas: [
      { t: "flecha", d: "M 58 138 L 84 140" },
      { t: "nota", xy: [110, 196], texto: "sostén 10 s" },
    ],
  },
  "ej-frente": {
    simetrico: true,
    gesto: { cejas: "arriba" },
    marcas: [
      { t: "zona", d: "M 62 46 Q 90 36 110 42 L 110 70 Q 86 64 64 72 Z" },
      { t: "dedos", p: [[78, 76], [96, 72]] },
      { t: "flecha", d: "M 87 70 L 87 54" },
      { t: "nota", xy: [110, 214], texto: "los dedos no dejan subir" },
    ],
  },
  "ej-entrecejo": {
    gesto: { cejas: "fruncidas" },
    marcas: [
      { t: "zona", d: "M 102 76 Q 110 72 118 76 L 118 92 Q 110 88 102 92 Z" },
      { t: "dedos", p: [[96, 82], [124, 82]] },
      { t: "flecha", d: "M 96 82 L 84 80" },
      { t: "flecha", d: "M 124 82 L 136 80" },
      { t: "nota", xy: [110, 214], texto: "separan mientras frunces" },
    ],
  },
  "ej-ojos": {
    simetrico: true,
    gesto: { ojos: "entrecerrados" },
    marcas: [
      { t: "dedos", p: [[64, 100], [102, 102]] },
      { t: "flecha", d: "M 86 116 L 86 106" },
      { t: "nota", xy: [110, 214], texto: "sube solo el párpado de abajo" },
    ],
  },
  "ej-o-sonrisa": {
    gesto: { boca: "o" },
    marcas: [
      { t: "flecha", d: "M 130 134 A 24 24 0 1 1 128 172" },
      { t: "nota", xy: [110, 212], texto: "O · 5 s  →  sonrisa · 5 s" },
    ],
  },
  "ej-labios-dentro": {
    gesto: { boca: "dentro" },
    marcas: [
      { t: "flecha", d: "M 96 168 Q 104 160 108 156" },
      { t: "flecha", d: "M 124 168 Q 116 160 112 156" },
      { t: "nota", xy: [110, 196], texto: "labios sobre los dientes" },
    ],
  },
  /* La lengua contra el paladar no se ve de frente: no se ve nada. De perfil
     se dibuja dentro de la boca. */
  "ej-lengua": {
    vista: "perfil",
    marcas: [
      { t: "zona", d: "M 70 138 Q 86 132 102 136 Q 90 150 70 147 Z" },
      { t: "flecha", d: "M 86 150 L 86 136" },
      { t: "nota", xy: [110, 58], texto: "toda la lengua al paladar" },
    ],
  },
  /* «Beso al techo» es un estiramiento del cuello: de frente es una mancha,
     de perfil se ve el gesto entero. */
  "ej-beso-techo": {
    vista: "perfil",
    marcas: [
      { t: "zona", d: "M 82 188 Q 108 196 140 190 L 144 226 Q 106 230 88 218 Z" },
      { t: "flecha", d: "M 64 150 Q 52 122 58 96" },
      { t: "nota", xy: [110, 272], texto: "estira el frente del cuello" },
    ],
  },
  "ej-platisma": {
    simetrico: true,
    gesto: { boca: "labio-abajo" },
    marcas: [
      { t: "zona", d: "M 84 194 Q 98 188 108 194 L 108 240 Q 94 246 86 240 Z" },
      { t: "nota", xy: [110, 272], texto: "se marcan las cuerdas" },
    ],
  },
  "ej-masetero": {
    simetrico: true,
    marcas: [
      { t: "zona", d: "M 52 116 Q 68 112 74 130 Q 70 158 54 150 Z" },
      { t: "dedos", p: [[62, 132]] },
      { t: "flecha", d: "M 54 126 Q 74 128 72 142 Q 56 146 56 132" },
      { t: "nota", xy: [110, 214], texto: "amasa con los nudillos" },
    ],
  },
  "ej-abrir-cerrar": {
    gesto: { boca: "abierta" },
    marcas: [
      { t: "aro", c: [50, 118], r: 10 },
      { t: "aro", c: [170, 118], r: 10 },
      { t: "flecha", d: "M 110 186 Q 112 200 110 212" },
      { t: "nota", xy: [110, 240], texto: "sin que los dientes se toquen" },
    ],
  },

  // ── Cierre ──
  "cie-percusion": {
    simetrico: true,
    marcas: [
      {
        t: "puntos",
        p: [
          [88, 66], [70, 80], [96, 94], [74, 108], [90, 124],
          [66, 132], [92, 152], [76, 172], [96, 188], [80, 214],
        ],
      },
    ],
  },
  "cie-mandibula": {
    gesto: { boca: "abierta", ojos: "cerrados" },
    marcas: [
      { t: "flecha", d: "M 110 186 L 110 204" },
      { t: "nota", xy: [110, 232], texto: "suelta el peso de la mandíbula" },
    ],
  },
  "cie-agua": { marcas: [] },
};

// ── Dibujo de las marcas ──────────────────────────────────────────────────────

/** Punto medio aproximado de un trazo, para colgarle el número de orden. */
function inicioDe(d: string): [number, number] {
  const m = d.match(/M\s*(-?[\d.]+)[ ,]+(-?[\d.]+)/);
  return m ? [parseFloat(m[1]), parseFloat(m[2])] : [0, 0];
}

function Marcas({ marcas, animar }: { marcas: Marca[]; animar: boolean }) {
  return (
    <>
      {marcas.map((m, i) => {
        if (m.t === "zona") {
          return <path key={i} d={m.d} fill="rgba(200, 160, 80, 0.16)" stroke="none" />;
        }

        if (m.t === "aro") {
          return (
            <circle
              key={i}
              cx={m.c[0]}
              cy={m.c[1]}
              r={m.r}
              fill="none"
              stroke={ORO}
              strokeWidth="1.3"
              strokeDasharray="5 4"
              opacity="0.8"
            />
          );
        }

        if (m.t === "nota") {
          return (
            <text
              key={i}
              x={m.xy[0]}
              y={m.xy[1]}
              textAnchor="middle"
              fill={ORO}
              fontSize="11.5"
              fontStyle="italic"
              fontFamily="Georgia, serif"
              stroke={FONDO}
              strokeWidth="2.6"
              paintOrder="stroke"
            >
              {m.texto}
            </text>
          );
        }

        if (m.t === "dedos") {
          // Yema: una elipse con su uña. Se distingue de los puntos de presión.
          return (
            <g key={i}>
              {m.p.map(([x, y], j) => (
                <g key={j}>
                  <ellipse cx={x} cy={y} rx="5.6" ry="7" fill="rgba(232,200,120,0.3)" stroke={ORO_CLARO} strokeWidth="1.3" />
                  <path d={`M ${x - 2.6} ${y - 2.4} Q ${x} ${y - 4.6} ${x + 2.6} ${y - 2.4}`} fill="none" stroke={ORO_CLARO} strokeWidth="1.1" opacity="0.85" />
                </g>
              ))}
            </g>
          );
        }

        if (m.t === "puntos") {
          // Círculos fijos: se presiona sin avanzar. El aro que late lo dice.
          return (
            <g key={i}>
              {m.p.map(([x, y], j) => (
                <g key={j}>
                  <circle cx={x} cy={y} r="3.2" fill={ORO_CLARO} />
                  <circle cx={x} cy={y} r="5.5" fill="none" stroke={ORO_CLARO} strokeWidth="1.1" opacity="0.55">
                    {animar && (
                      <animate
                        attributeName="r"
                        values="4;8;4"
                        dur="1.8s"
                        begin={`${j * 0.2}s`}
                        repeatCount="indefinite"
                      />
                    )}
                  </circle>
                </g>
              ))}
            </g>
          );
        }

        // Flecha: contorno oscuro debajo para que no se pierda entre las líneas.
        const [ix, iy] = inicioDe(m.d);
        return (
          <g key={i}>
            <path d={m.d} fill="none" stroke={FONDO} strokeWidth="6" strokeLinecap="round" opacity="0.85" />
            <path
              className={animar ? "ritual-flecha" : undefined}
              d={m.d}
              fill="none"
              stroke={ORO_CLARO}
              strokeWidth="2.8"
              strokeLinecap="round"
              markerEnd="url(#ritual-punta)"
              style={animar ? ({ animationDelay: `${i * 0.45}s` } as CSSProperties) : undefined}
            />
            {m.n !== undefined && (
              <g>
                <circle cx={ix} cy={iy} r="7.5" fill={FONDO} stroke={ORO} strokeWidth="1.2" />
                <text
                  x={ix}
                  y={iy + 3.2}
                  textAnchor="middle"
                  fill={ORO_CLARO}
                  fontSize="9"
                  fontFamily="Georgia, serif"
                >
                  {m.n}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </>
  );
}

export function CaraGuia({
  pasoId,
  animar = true,
  tamano = 260,
}: {
  pasoId: string;
  animar?: boolean;
  tamano?: number;
}) {
  const guia = MARCAS[pasoId] ?? { marcas: [] };
  const vista = guia.vista ?? "frente";

  return (
    <svg
      viewBox="0 0 220 300"
      width={tamano}
      height={(tamano * 300) / 220}
      role="img"
      aria-label="Dibujo con el recorrido de la maniobra"
      style={{ display: "block", maxWidth: "100%", height: "auto" }}
    >
      <defs>
        <marker
          id="ritual-punta"
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="4.6"
          markerHeight="4.6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 9 5 L 0 9 z" fill={ORO_CLARO} />
        </marker>
      </defs>

      {vista === "perfil" ? (
        <RostroPerfil />
      ) : vista === "antebrazo" ? (
        <Antebrazo />
      ) : (
        <RostroFrente gesto={guia.gesto} />
      )}

      <Marcas marcas={guia.marcas} animar={animar} />
      {guia.simetrico && (
        <g transform={`translate(${esp(0)},0) scale(-1,1)`}>
          <Marcas marcas={guia.marcas.filter((m) => m.t !== "nota")} animar={animar} />
        </g>
      )}
    </svg>
  );
}

/** Si un paso todavía no tiene dibujo, el modo guiado no muestra el marco vacío. */
export function tieneDibujo(pasoId: string) {
  return (MARCAS[pasoId]?.marcas.length ?? 0) > 0;
}

"use client";

import { useEffect, useState, type CSSProperties } from "react";

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
  /** La mano haciendo la maniobra: `p` es la yema del dedo del medio, `ang`
   *  hacia dónde apuntan los dedos (0 arriba, 90 a la derecha) y `n` cuántos. */
  | { t: "mano"; p: [number, number]; ang: number; n?: number }
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
  boca?: "neutra" | "o" | "sonrisa" | "dentro" | "abierta" | "beso" | "labio-abajo" | "lengua";
  mejillas?: "neutras" | "hundidas" | "elevadas" | "infladas";
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
          {/* las cuerdas que saltan en el cuello al hacer el gesto */}
          <path d="M 94 196 C 92 214 92 228 94 240" opacity="0.65" />
          <path d="M 126 196 C 128 214 128 228 126 240" opacity="0.65" />
        </>
      );
    case "lengua":
      // Boca abierta con la lengua recta hacia afuera, sin torcerla.
      return (
        <>
          <path d="M 94 148 Q 110 142 126 148 Q 124 158 110 160 Q 96 158 94 148 Z" />
          <path d="M 101 152 Q 101 174 110 178 Q 119 174 119 152" fill="rgba(232,200,120,0.14)" />
          <path d="M 110 156 L 110 170" opacity="0.5" />
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
  if (tipo === "infladas") {
    // Mejillas llenas de aire: el contorno se abre hacia afuera.
    return (
      <>
        <path d="M 60 116 Q 44 142 62 168" opacity="0.8" />
        <path d="M 160 116 Q 176 142 158 168" opacity="0.8" />
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
      {/* antebrazo acostado: el codo a la izquierda, la muñeca y la mano a la derecha */}
      <path d="M 30 196 C 26 178 34 166 52 164 L 140 168 L 140 232 L 52 236 C 34 234 26 222 30 204 Z" />
      {/* pliegue de la muñeca */}
      <path d="M 140 172 L 140 228" opacity="0.5" />
      {/* mano cerrada, solo insinuada */}
      <path d="M 140 168 C 164 166 186 176 188 198 C 190 220 166 232 140 232" />
      <path d="M 166 174 C 172 184 172 214 166 226" opacity="0.5" />
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
      { t: "mano", p: [88, 214], ang: 38, n: 2 },
      { t: "aro", c: [87, 216], r: 26 },
      { t: "nota", xy: [110, 84], texto: "55 g · como un huevo" },
      { t: "flecha", d: "M 66 168 L 78 198" },
    ],
  },

  /* El círculo fijo es la maniobra base de todo el drenaje. Se dibuja grande,
     sin espejar, con la mano y la vuelta que da el círculo. */
  "prep-circulo": {
    marcas: [
      { t: "mano", p: [84, 128], ang: 20, n: 2 },
      { t: "aro", c: [84, 128], r: 17 },
      { t: "flecha", d: "M 96 118 A 16 16 0 1 1 74 116" },
      { t: "nota", xy: [110, 214], texto: "la piel gira, el dedo no resbala" },
      { t: "nota", xy: [110, 230], texto: "el giro va hacia el meñique" },
    ],
  },

  // ── Drenaje: cuello ──
  /* La respiración no se ve. Lo que sí se ve es el pecho subiendo: dos flechas
     grandes sobre las costillas, no dos rayitas en la clavícula. */
  "dre-respirar": {
    marcas: [
      { t: "mano", p: [96, 272], ang: 118, n: 3 },
      { t: "flecha", d: "M 132 292 Q 126 276 132 258" },
      { t: "nota", xy: [110, 240], texto: "5 respiraciones lentas" },
    ],
  },
  "dre-apertura": {
    simetrico: true,
    marcas: [
      { t: "mano", p: [104, 250], ang: -18, n: 1 },
      { t: "puntos", p: [[110, 254]] },
      { t: "flecha", d: "M 106 252 Q 84 248 58 252" },
    ],
  },
  "dre-cadena-cuello": {
    simetrico: true,
    marcas: [
      { t: "mano", p: [82, 196], ang: 12, n: 2 },
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
      { t: "mano", p: [104, 192], ang: 10, n: 2 },
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
      { t: "mano", p: [47, 112], ang: 16, n: 2 },
      { t: "puntos", p: [[56, 112], [38, 112]] },
      { t: "nota", xy: [58, 88], texto: "delante y detrás" },
      { t: "flecha", d: "M 44 130 Q 58 190 74 248" },
    ],
  },
  "dre-hombros": {
    simetrico: true,
    marcas: [
      { t: "mano", p: [40, 264], ang: 62, n: 3 },
      { t: "puntos", p: [[34, 266], [56, 258], [78, 250]] },
      { t: "flecha", d: "M 32 266 Q 66 254 100 248" },
    ],
  },

  // ── Drenaje: rostro ──
  "dre-roce-rostro": {
    simetrico: true,
    marcas: [
      { t: "mano", p: [84, 142], ang: -90, n: 3 },
      { t: "flecha", d: "M 106 160 L 72 158" },
      { t: "flecha", d: "M 106 144 L 74 142" },
      { t: "flecha", d: "M 106 124 L 80 122" },
      { t: "flecha", d: "M 106 68 L 68 72" },
    ],
  },
  "dre-labios": {
    simetrico: true,
    marcas: [
      { t: "mano", p: [99, 172], ang: 44, n: 2 },
      { t: "puntos", p: [[104, 160], [90, 162], [76, 158]] },
      { t: "flecha", d: "M 106 160 Q 88 166 68 156", n: 1 },
      { t: "flecha", d: "M 68 158 Q 66 204 72 248", n: 2 },
    ],
  },
  "dre-nariz": {
    simetrico: true,
    marcas: [
      { t: "mano", p: [100, 114], ang: 6, n: 1 },
      { t: "puntos", p: [[101, 98], [99, 112], [99, 126]] },
      { t: "flecha", d: "M 98 128 Q 90 136 80 138" },
    ],
  },
  /* El viaje largo es un recorrido único de cuatro tramos: van numerados, si no
     se leen como cuatro flechas sueltas cruzándose. */
  "dre-viaje-largo": {
    simetrico: true,
    marcas: [
      { t: "mano", p: [82, 118], ang: 12, n: 2 },
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
      { t: "mano", p: [100, 108], ang: 16, n: 1 },
      { t: "puntos", p: [[100, 106], [88, 113], [76, 112], [66, 104]] },
      { t: "flecha", d: "M 101 106 Q 84 118 64 102" },
      { t: "nota", xy: [110, 84], texto: "media presión" },
    ],
  },
  "dre-cejas": {
    simetrico: true,
    marcas: [
      { t: "mano", p: [86, 74], ang: 180, n: 1 },
      { t: "mano", p: [86, 92], ang: 0, n: 1 },
      { t: "nota", xy: [110, 210], texto: "una pinza blanda, sin tirar" },
      { t: "flecha", d: "M 101 85 Q 86 76 66 83" },
    ],
  },
  "dre-frente": {
    simetrico: true,
    marcas: [
      { t: "mano", p: [96, 64], ang: 4, n: 3 },
      { t: "puntos", p: [[104, 62], [88, 64], [70, 74]] },
      { t: "flecha", d: "M 107 62 Q 82 64 54 94" },
    ],
  },
  "dre-cierre": {
    simetrico: true,
    marcas: [
      { t: "mano", p: [54, 118], ang: 14, n: 2 },
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
  /* ── Acupresión ──────────────────────────────────────────────
     Puntos de la medicina china. Se sostiene la presión, no se pasea: por eso
     van con aro y con el dedo apoyado, sin flecha de recorrido. */
  "acu-yintang": {
    marcas: [
      { t: "mano", p: [110, 80], ang: 0, n: 1 },
      { t: "aro", c: [110, 80], r: 10 },
      { t: "nota", xy: [110, 212], texto: "sostén 30 s, sin círculos" },
    ],
  },
  "acu-yingxiang": {
    simetrico: true,
    marcas: [
      { t: "mano", p: [99, 126], ang: 340, n: 1 },
      { t: "puntos", p: [[99, 126]] },
      { t: "nota", xy: [110, 212], texto: "pegado a la aleta · círculos pequeños" },
    ],
  },
  "acu-zanzhu": {
    simetrico: true,
    marcas: [
      { t: "mano", p: [100, 92], ang: 350, n: 1 },
      { t: "puntos", p: [[100, 84]] },
      { t: "flecha", d: "M 100 94 L 100 78" },
      { t: "nota", xy: [110, 212], texto: "empuja hacia arriba, contra el hueso" },
    ],
  },
  "acu-fengchi": {
    vista: "perfil",
    marcas: [
      { t: "puntos", p: [[156, 150]] },
      { t: "aro", c: [156, 150], r: 12 },
      { t: "flecha", d: "M 168 162 Q 160 156 156 150" },
      { t: "nota", xy: [106, 58], texto: "los dos huecos de la nuca" },
    ],
  },

  /* ── Bruxismo ────────────────────────────────────────────────
     El masetero se trabaja arrastrando de arriba abajo, no en círculos: por
     eso la flecha es recta y larga. */
  "bru-masetero-profundo": {
    simetrico: true,
    gesto: { boca: "abierta" },
    marcas: [
      { t: "zona", d: "M 52 116 Q 68 112 74 130 Q 70 158 54 150 Z" },
      { t: "mano", p: [62, 122], ang: 8, n: 2 },
      { t: "flecha", d: "M 62 118 L 62 152" },
      { t: "nota", xy: [110, 212], texto: "arrastra despacio, dientes separados" },
    ],
  },
  "bru-temporal": {
    simetrico: true,
    marcas: [
      { t: "zona", d: "M 54 84 Q 68 74 76 84 Q 70 106 56 104 Z" },
      { t: "mano", p: [64, 92], ang: 300, n: 3 },
      { t: "flecha", d: "M 66 96 Q 56 86 50 74" },
      { t: "nota", xy: [110, 212], texto: "en abanico, hacia arriba y atrás" },
    ],
  },
  "bru-reposo": {
    gesto: { boca: "neutra" },
    marcas: [
      { t: "aro", c: [110, 150], r: 16 },
      { t: "nota", xy: [110, 200], texto: "labios juntos · dientes separados" },
      { t: "nota", xy: [110, 216], texto: "lengua en el paladar" },
    ],
  },
  "bru-apertura-guiada": {
    gesto: { boca: "abierta" },
    marcas: [
      { t: "flecha", d: "M 110 150 L 110 188" },
      { t: "aro", c: [56, 118], r: 10 },
      { t: "nota", xy: [110, 212], texto: "baja recta, sin irse al lado" },
    ],
  },

  /* ── Cuero cabelludo ─────────────────────────────────────────
     Lo importante no es dónde, sino QUÉ se mueve: la piel sobre el hueso. */
  "cap-craneo": {
    simetrico: true,
    marcas: [
      { t: "mano", p: [80, 52], ang: 200, n: 4 },
      { t: "flecha", d: "M 72 44 Q 80 38 90 42" },
      { t: "nota", xy: [110, 212], texto: "mueve la piel, no resbales el pelo" },
    ],
  },
  "cap-tracciones": {
    marcas: [
      { t: "mano", p: [110, 46], ang: 180, n: 4 },
      { t: "flecha", d: "M 110 40 L 110 20" },
      { t: "nota", xy: [110, 212], texto: "desde la raíz, suave, dos segundos" },
    ],
  },
  "cap-nuca": {
    vista: "perfil",
    marcas: [
      { t: "mano", p: [152, 146], ang: 20, n: 3 },
      { t: "flecha", d: "M 156 152 Q 146 120 130 86" },
      { t: "nota", xy: [106, 58], texto: "del borde del pelo hacia la coronilla" },
    ],
  },

  "ej-pomulos": {
    simetrico: true,
    gesto: { boca: "sonrisa", mejillas: "elevadas" },
    marcas: [
      { t: "zona", d: "M 60 114 Q 84 106 102 122 Q 92 148 66 142 Z" },
      { t: "mano", p: [80, 122], ang: 18, n: 2 },
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
  /* Antes mostraba las cejas levantándose contra los dedos: entrenaba el
     músculo que marca la línea. Ahora la frente queda quieta y los dedos
     empujan la piel, no el músculo. */
  "ej-frente": {
    simetrico: true,
    marcas: [
      { t: "mano", p: [88, 70], ang: 4, n: 3 },
      { t: "flecha", d: "M 88 60 L 88 42" },
      { t: "nota", xy: [110, 214], texto: "la frente quieta, sin arrugar" },
    ],
  },
  "ej-entrecejo": {
    gesto: { cejas: "fruncidas" },
    marcas: [
      { t: "zona", d: "M 102 76 Q 110 72 118 76 L 118 92 Q 110 88 102 92 Z" },
      { t: "mano", p: [96, 84], ang: 28 },
      { t: "mano", p: [124, 84], ang: -28 },
      { t: "flecha", d: "M 96 82 L 84 80" },
      { t: "flecha", d: "M 124 82 L 136 80" },
      { t: "nota", xy: [110, 214], texto: "separan mientras frunces" },
    ],
  },
  "ej-ojos": {
    simetrico: true,
    gesto: { ojos: "entrecerrados" },
    marcas: [
      { t: "mano", p: [64, 102], ang: 22, n: 1 },
      { t: "mano", p: [102, 104], ang: 14, n: 1 },
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
  /* Antes mostraba el cuello tenso, que es justo lo contrario: el platisma
     tira hacia abajo y se estira, no se fortalece. */
  "ej-platisma": {
    marcas: [
      { t: "zona", d: "M 128 194 Q 142 198 144 214 L 142 240 Q 130 244 124 238 Z" },
      { t: "flecha", d: "M 76 176 Q 110 214 146 176" },
      { t: "nota", xy: [110, 272], texto: "gira despacio, sin forzar" },
    ],
  },
  "ej-masetero": {
    simetrico: true,
    marcas: [
      { t: "zona", d: "M 52 116 Q 68 112 74 130 Q 70 158 54 150 Z" },
      { t: "mano", p: [62, 134], ang: 20, n: 2 },
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

  // ── Fuerza de verdad ──
  "ej-lengua-mejilla": {
    marcas: [
      { t: "zona", d: "M 70 128 Q 58 142 70 156 Q 82 150 82 142 Q 82 132 70 128 Z" },
      { t: "flecha", d: "M 96 142 L 76 142" },
      { t: "mano", p: [60, 142], ang: 90, n: 1 },
      { t: "nota", xy: [110, 214], texto: "la lengua empuja, el dedo resiste" },
    ],
  },
  "ej-lengua-fuera": {
    gesto: { boca: "lengua" },
    marcas: [
      { t: "flecha", d: "M 110 184 L 110 200" },
      { t: "nota", xy: [110, 222], texto: "recta, sostén 8 segundos" },
    ],
  },
  "ej-deglucion": {
    vista: "perfil",
    marcas: [
      { t: "zona", d: "M 72 172 Q 96 184 124 180 L 128 204 Q 98 206 80 196 Z" },
      { t: "flecha", d: "M 84 150 L 84 134" },
      { t: "nota", xy: [110, 60], texto: "lengua al paladar y traga fuerte" },
    ],
  },
  "ej-abrir-resistencia": {
    gesto: { boca: "abierta" },
    marcas: [
      { t: "mano", p: [110, 204], ang: 0, n: 4 },
      { t: "flecha", d: "M 110 176 L 110 190" },
      { t: "nota", xy: [110, 266], texto: "el puño no deja abrir" },
    ],
  },
  "ej-pomulo-elevador": {
    simetrico: true,
    gesto: { boca: "o", mejillas: "elevadas" },
    marcas: [
      { t: "mano", p: [80, 112], ang: 14, n: 2 },
      { t: "flecha", d: "M 72 140 L 72 124" },
    ],
  },
  "ej-aire-mejillas": {
    gesto: { mejillas: "infladas" },
    marcas: [
      { t: "flecha", d: "M 66 150 Q 110 176 154 150" },
      { t: "nota", xy: [110, 214], texto: "de una mejilla a la otra" },
    ],
  },
  "ej-labios-resistencia": {
    marcas: [
      { t: "mano", p: [88, 153], ang: 90, n: 1 },
      { t: "flecha", d: "M 118 158 L 118 168" },
      { t: "nota", xy: [110, 214], texto: "los labios resisten el dedo" },
    ],
  },
  "ej-masticar": {
    simetrico: true,
    marcas: [
      { t: "zona", d: "M 52 116 Q 68 112 74 130 Q 70 158 54 150 Z" },
      { t: "flecha", d: "M 62 126 L 62 146" },
      { t: "nota", xy: [110, 214], texto: "20 de un lado, 20 del otro" },
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

/* ── Secuencias ──────────────────────────────────────────────────────────────
   Un solo dibujo no alcanza para una maniobra que tiene recorrido: si se
   pinta todo el camino a la vez, no se sabe por dónde empezar ni hacia dónde
   seguir. Estas maniobras se muestran por partes, y el modo guiado las va
   pasando solas cada pocos segundos — las manos están en la cara, nadie va a
   tocar la pantalla. Cada cuadro muestra la mano donde está AHORA y una
   flecha corta hacia donde va después. */

type Cuadro = { texto: string; guia: Guia };

const SECUENCIAS: Record<string, Cuadro[]> = {
  "prep-circulo": [
    { texto: "Apoya dos dedos", guia: { marcas: [{ t: "mano", p: [84, 128], ang: 20, n: 2 }] } },
    {
      texto: "Aprieta mientras giras hacia el meñique",
      guia: { marcas: [{ t: "mano", p: [84, 128], ang: 20, n: 2 }, { t: "flecha", d: "M 98 124 A 16 16 0 0 1 80 146" }, { t: "nota", xy: [110, 214], texto: "aprieta" }] },
    },
    {
      texto: "Suelta en la otra mitad del círculo",
      guia: { marcas: [{ t: "mano", p: [84, 128], ang: 20, n: 2 }, { t: "flecha", d: "M 78 146 A 16 16 0 0 1 96 116" }, { t: "nota", xy: [110, 214], texto: "suelta" }] },
    },
  ],
  "dre-apertura": [
    { texto: "Pulgares en el centro del pecho", guia: { simetrico: true, marcas: [{ t: "puntos", p: [[110, 254]] }, { t: "mano", p: [104, 250], ang: -18, n: 1 }] } },
    { texto: "Abanico hacia los hombros", guia: { simetrico: true, marcas: [{ t: "mano", p: [82, 250], ang: -36, n: 1 }, { t: "flecha", d: "M 106 252 Q 90 248 72 250" }] } },
    { texto: "El último roce, sobre la clavícula", guia: { simetrico: true, marcas: [{ t: "mano", p: [64, 256], ang: -60, n: 1 }, { t: "flecha", d: "M 104 254 Q 84 250 60 256" }] } },
  ],
  "dre-cadena-cuello": [
    { texto: "Justo debajo de la oreja", guia: { simetrico: true, marcas: [{ t: "puntos", p: [[82, 192]] }, { t: "mano", p: [82, 196], ang: 12, n: 2 }] } },
    { texto: "Baja dos dedos y otros cinco círculos", guia: { simetrico: true, marcas: [{ t: "puntos", p: [[82, 192], [79, 212]] }, { t: "mano", p: [79, 216], ang: 12, n: 2 }, { t: "flecha", d: "M 82 196 L 79 210" }] } },
    { texto: "Así hasta encima de la clavícula", guia: { simetrico: true, marcas: [{ t: "puntos", p: [[82, 192], [79, 212], [76, 230], [73, 248]] }, { t: "mano", p: [73, 250], ang: 12, n: 2 }, { t: "flecha", d: "M 78 216 L 74 246" }] } },
  ],
  "dre-menton": [
    { texto: "En el hueco bajo el mentón", guia: { simetrico: true, marcas: [{ t: "puntos", p: [[104, 190]] }, { t: "mano", p: [104, 194], ang: 10, n: 2 }] } },
    { texto: "Avanza por el borde de la mandíbula", guia: { simetrico: true, marcas: [{ t: "mano", p: [82, 180], ang: 30, n: 2 }, { t: "flecha", d: "M 104 190 Q 92 188 80 180" }] } },
    { texto: "Hasta llegar a la oreja", guia: { simetrico: true, marcas: [{ t: "mano", p: [58, 148], ang: 40, n: 2 }, { t: "flecha", d: "M 80 178 Q 64 168 56 146" }] } },
    { texto: "Y baja por el cuello a la clavícula", guia: { simetrico: true, marcas: [{ t: "mano", p: [70, 238], ang: 12, n: 2 }, { t: "flecha", d: "M 56 150 Q 62 198 72 244" }] } },
  ],
  "dre-viaje-largo": [
    { texto: "Bajo el ojo, apoyada en el hueso", guia: { simetrico: true, marcas: [{ t: "mano", p: [82, 118], ang: 12, n: 2 }] } },
    { texto: "En espiral hasta la comisura", guia: { simetrico: true, marcas: [{ t: "mano", p: [98, 162], ang: 12, n: 2 }, { t: "flecha", d: "M 82 118 Q 92 142 98 158" }] } },
    { texto: "Sigue al mentón", guia: { simetrico: true, marcas: [{ t: "mano", p: [106, 194], ang: 10, n: 2 }, { t: "flecha", d: "M 100 162 Q 105 178 106 190" }] } },
    { texto: "Por la mandíbula hasta la oreja", guia: { simetrico: true, marcas: [{ t: "mano", p: [58, 148], ang: 40, n: 2 }, { t: "flecha", d: "M 106 192 Q 78 184 56 146" }] } },
    { texto: "Y abajo, a la clavícula", guia: { simetrico: true, marcas: [{ t: "mano", p: [70, 238], ang: 12, n: 2 }, { t: "flecha", d: "M 56 150 Q 62 198 72 244" }] } },
  ],
  "dre-labios": [
    { texto: "Centro del labio de abajo", guia: { simetrico: true, marcas: [{ t: "puntos", p: [[104, 162]] }, { t: "mano", p: [99, 174], ang: 44, n: 2 }] } },
    { texto: "Avanza hacia la mandíbula", guia: { simetrico: true, marcas: [{ t: "mano", p: [78, 172], ang: 44, n: 2 }, { t: "flecha", d: "M 104 162 Q 88 166 70 158" }] } },
    { texto: "Lo mismo desde el labio de arriba", guia: { simetrico: true, marcas: [{ t: "puntos", p: [[104, 144]] }, { t: "mano", p: [88, 140], ang: 60, n: 2 }, { t: "flecha", d: "M 104 144 Q 88 146 70 152" }] } },
    { texto: "Una espiral hasta la clavícula", guia: { simetrico: true, marcas: [{ t: "mano", p: [70, 238], ang: 12, n: 2 }, { t: "flecha", d: "M 68 158 Q 66 204 72 244" }] } },
  ],
  "dre-cierre": [
    { texto: "Dos dedos delante de la oreja", guia: { simetrico: true, marcas: [{ t: "puntos", p: [[54, 116]] }, { t: "mano", p: [54, 120], ang: 14, n: 2 }] } },
    { texto: "Baja al ganglio de la mandíbula", guia: { simetrico: true, marcas: [{ t: "mano", p: [82, 184], ang: 20, n: 2 }, { t: "flecha", d: "M 56 120 Q 68 154 84 180" }] } },
    { texto: "Y por el cuello a la clavícula", guia: { simetrico: true, marcas: [{ t: "mano", p: [72, 242], ang: 12, n: 2 }, { t: "flecha", d: "M 84 186 Q 78 216 74 246" }] } },
  ],
  "dre-frente": [
    { texto: "Cuatro dedos en el centro de la frente", guia: { simetrico: true, marcas: [{ t: "mano", p: [96, 64], ang: 4, n: 3 }] } },
    { texto: "Avanza hacia la sien", guia: { simetrico: true, marcas: [{ t: "mano", p: [74, 74], ang: 20, n: 3 }, { t: "flecha", d: "M 104 62 Q 88 64 72 76" }] } },
    { texto: "Termina delante de la oreja", guia: { simetrico: true, marcas: [{ t: "mano", p: [56, 100], ang: 30, n: 2 }, { t: "flecha", d: "M 72 78 Q 60 86 54 96" }] } },
  ],
  "dre-ojos": [
    { texto: "El anular en el lagrimal, junto a la nariz", guia: { simetrico: true, gesto: { ojos: "cerrados" }, marcas: [{ t: "mano", p: [100, 108], ang: 16, n: 1 }, { t: "nota", xy: [110, 84], texto: "media presión" }] } },
    { texto: "Por el borde del hueso, bajo el ojo", guia: { simetrico: true, gesto: { ojos: "cerrados" }, marcas: [{ t: "mano", p: [84, 116], ang: 10, n: 1 }, { t: "flecha", d: "M 100 108 Q 92 115 82 115" }] } },
    { texto: "Hasta la sien", guia: { simetrico: true, gesto: { ojos: "cerrados" }, marcas: [{ t: "mano", p: [64, 104], ang: 30, n: 1 }, { t: "flecha", d: "M 82 116 Q 72 114 64 104" }] } },
  ],
};

function prefiereQuieto() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

/* Un dedo: la yema en (x, y) y el resto del dedo saliendo hacia atrás. Se
   dibuja apuntando hacia arriba y después se gira, que es más fácil de ajustar
   que calcular cada curva a mano. */
function Dedo({ x, y, ang, largo = 30 }: { x: number; y: number; ang: number; largo?: number }) {
  return (
    <g transform={`rotate(${ang} ${x} ${y})`}>
      <path
        d={`M ${x - 5} ${y + largo} L ${x - 5} ${y + 5.4} A 5 5 0 0 1 ${x + 5} ${y + 5.4} L ${x + 5} ${y + largo}`}
        fill="rgba(232,200,120,0.18)"
        stroke={ORO_CLARO}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* la uña, que es lo que hace que se lea como un dedo y no como un palo */}
      <path
        d={`M ${x - 2.8} ${y + 4} A 3.2 3.2 0 0 1 ${x + 2.8} ${y + 4}`}
        fill="none"
        stroke={ORO_CLARO}
        strokeWidth="1.2"
        opacity="0.8"
      />
    </g>
  );
}

/** Varios dedos juntos, repartidos a lo ancho de la dirección en que apuntan. */
function Mano({ p, ang, n = 2 }: { p: [number, number]; ang: number; n?: number }) {
  const rad = (ang * Math.PI) / 180;
  // perpendicular a la dirección de los dedos
  const px = Math.cos(rad);
  const py = Math.sin(rad);
  const sep = 10.5;
  return (
    <>
      {Array.from({ length: n }).map((_, i) => {
        const d = (i - (n - 1) / 2) * sep;
        return <Dedo key={i} x={p[0] + px * d} y={p[1] + py * d} ang={ang} largo={n > 2 ? 28 : 30} />;
      })}
    </>
  );
}

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

        if (m.t === "mano") {
          return <Mano key={i} p={m.p} ang={m.ang} n={m.n} />;
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

/** Un dibujo: el rostro y las marcas de una guía. */
function Dibujo({ guia, animar, tamano }: { guia: Guia; animar: boolean; tamano: number }) {
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

const CADA = 2800; // ms que se queda cada posición de una secuencia

export function CaraGuia({
  pasoId,
  animar = true,
  tamano = 260,
}: {
  pasoId: string;
  animar?: boolean;
  tamano?: number;
}) {
  const cuadros = SECUENCIAS[pasoId];
  const [i, setI] = useState(0);
  const [quieto, setQuieto] = useState(false);

  useEffect(() => setQuieto(prefiereQuieto()), []);
  useEffect(() => setI(0), [pasoId]);

  useEffect(() => {
    if (!cuadros || !animar || quieto) return;
    const id = setInterval(() => setI((x) => (x + 1) % cuadros.length), CADA);
    return () => clearInterval(id);
  }, [cuadros, animar, quieto, pasoId]);

  // Sin secuencia: un solo dibujo, como siempre.
  if (!cuadros) {
    return <Dibujo guia={MARCAS[pasoId] ?? { marcas: [] }} animar={animar} tamano={tamano} />;
  }

  // Miniatura en la lista de la rutina: basta la primera posición.
  if (!animar) {
    return <Dibujo guia={cuadros[0].guia} animar={false} tamano={tamano} />;
  }

  // Con «reducir movimiento» no se pasan solas: se ven todas a la vez, en fila.
  if (quieto) {
    const chico = Math.max(96, Math.round(tamano / 2.1));
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
        {cuadros.map((c, n) => (
          <figure key={n} style={{ margin: 0, width: chico, textAlign: "center" }}>
            <Dibujo guia={c.guia} animar={false} tamano={chico} />
            <figcaption style={leyendaChica}>
              {n + 1}. {c.texto}
            </figcaption>
          </figure>
        ))}
      </div>
    );
  }

  const actual = cuadros[i % cuadros.length];
  return (
    <div>
      <Dibujo guia={actual.guia} animar={animar} tamano={tamano} />
      <p style={leyenda} aria-live="polite">
        <span style={{ color: ORO }}>
          {(i % cuadros.length) + 1}/{cuadros.length}
        </span>{" "}
        · {actual.texto}
      </p>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 6 }} aria-hidden="true">
        {cuadros.map((_, n) => (
          <span
            key={n}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: n === i % cuadros.length ? ORO_CLARO : "rgba(200,160,80,0.28)",
              transition: "background 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const leyenda: CSSProperties = {
  margin: "0.6rem 0 0",
  textAlign: "center",
  fontFamily: "var(--font-crimson), Georgia, serif",
  fontSize: "0.98rem",
  color: "#e8d8b0",
  minHeight: "2.6em",
};

const leyendaChica: CSSProperties = {
  margin: "0.25rem 0 0",
  fontFamily: "var(--font-crimson), Georgia, serif",
  fontSize: "0.78rem",
  lineHeight: 1.3,
  color: "rgba(232,216,176,0.8)",
};

/** Si un paso todavía no tiene dibujo, el modo guiado no muestra el marco vacío. */
export function tieneDibujo(pasoId: string) {
  return Boolean(SECUENCIAS[pasoId]) || (MARCAS[pasoId]?.marcas.length ?? 0) > 0;
}

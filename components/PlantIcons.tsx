import React from "react";
import { plantas } from "@/lib/plantas-data";

const S = 56; // shared viewBox width
const T = 64; // shared viewBox height

const GOLD = "#c8a050";
const MOSS = "#3d5228";
const PURPLE = "#7a4a8a";

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <svg width={S} height={T} viewBox={`0 0 ${S} ${T}`} fill="none" aria-hidden="true">
      {children}
    </svg>
  );
}

export function IconMatico() {
  return (
    <Icon>
      <path d="M28 60 C28 60 10 44 10 27 C10 14 18 5 28 5 C38 5 46 14 46 27 C46 44 28 60 28 60Z"
        stroke="#c8a050" strokeWidth="0.8" opacity="0.45" />
      <path d="M28 7 C18 18 18 34 28 56" stroke="#3d5228" strokeWidth="0.85" opacity="0.65" />
      <path d="M28 18 C22 13 16 15 14 20" stroke="#3d5228" strokeWidth="0.7" opacity="0.5" />
      <path d="M28 28 C22 23 16 25 14 30" stroke="#3d5228" strokeWidth="0.68" opacity="0.45" />
      <path d="M28 38 C22 33 17 35 16 40" stroke="#3d5228" strokeWidth="0.6" opacity="0.38" />
      <path d="M28 18 C34 13 40 15 42 20" stroke="#3d5228" strokeWidth="0.7" opacity="0.42" />
      <path d="M28 28 C34 23 40 25 42 30" stroke="#3d5228" strokeWidth="0.65" opacity="0.38" />
    </Icon>
  );
}

export function IconPitra() {
  return (
    <Icon>
      <path d="M28 60 L28 30" stroke="#3d5228" strokeWidth="0.9" opacity="0.6" />
      <path d="M28 30 L14 18" stroke="#3d5228" strokeWidth="0.7" opacity="0.5" />
      <path d="M28 38 L42 27" stroke="#3d5228" strokeWidth="0.68" opacity="0.48" />
      <path d="M28 30 L36 15" stroke="#3d5228" strokeWidth="0.65" opacity="0.42" />
      <circle cx="12" cy="15" r="5.5" stroke="#c8a050" strokeWidth="0.8" opacity="0.5" />
      <circle cx="36" cy="11" r="5" stroke="#c8a050" strokeWidth="0.75" opacity="0.5" />
      <circle cx="43" cy="24" r="4.5" stroke="#c8a050" strokeWidth="0.75" opacity="0.45" />
      <circle cx="12" cy="15" r="2" fill="#c8a050" opacity="0.2" />
      <circle cx="36" cy="11" r="2" fill="#c8a050" opacity="0.2" />
      <path d="M28 38 C24 34 21 36 23 40" stroke="#3d5228" strokeWidth="0.6" opacity="0.4" />
      <path d="M28 46 C32 42 35 44 33 48" stroke="#3d5228" strokeWidth="0.6" opacity="0.38" />
    </Icon>
  );
}

export function IconArrayan() {
  return (
    <Icon>
      {/* 5 petals rotated 72° each, pivot (28,28) */}
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse key={deg} cx="28" cy="16" rx="4" ry="9"
          stroke="#c8a050" strokeWidth="0.8" opacity="0.48"
          transform={`rotate(${deg}, 28, 28)`} />
      ))}
      <circle cx="28" cy="28" r="5.5" stroke="#c8a050" strokeWidth="0.85" opacity="0.6" />
      <circle cx="28" cy="28" r="2.2" fill="#c8a050" opacity="0.3" />
      {/* stamens */}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const x = 28 + Math.cos(rad) * 7;
        const y = 28 + Math.sin(rad) * 7;
        return <circle key={deg} cx={x} cy={y} r="1" fill="#3d5228" opacity="0.45" />;
      })}
      <path d="M28 33 L28 56" stroke="#3d5228" strokeWidth="0.9" opacity="0.5" />
      <path d="M28 44 C22 40 18 42 20 47" stroke="#3d5228" strokeWidth="0.65" fill="none" opacity="0.42" />
      <path d="M28 50 C34 46 38 48 36 52" stroke="#3d5228" strokeWidth="0.65" fill="none" opacity="0.38" />
    </Icon>
  );
}

export function IconMaqui() {
  return (
    <Icon>
      <path d="M28 58 C18 50 8 40 10 26 C12 12 22 6 28 6 C34 6 44 12 46 26 C48 40 38 50 28 58Z"
        stroke="#7a4a8a" strokeWidth="0.8" opacity="0.42" />
      <circle cx="28" cy="20" r="5" stroke="#7a4a8a" strokeWidth="0.72" opacity="0.5" />
      <circle cx="18" cy="32" r="4.5" stroke="#7a4a8a" strokeWidth="0.7" opacity="0.45" />
      <circle cx="38" cy="32" r="4.5" stroke="#7a4a8a" strokeWidth="0.7" opacity="0.45" />
      <circle cx="22" cy="44" r="4" stroke="#7a4a8a" strokeWidth="0.65" opacity="0.4" />
      <circle cx="34" cy="44" r="4" stroke="#7a4a8a" strokeWidth="0.65" opacity="0.4" />
      <path d="M28 6 C26 2 25 0 28 -1 C31 0 30 2 28 6" stroke="#3d5228" strokeWidth="0.7" opacity="0.45" />
      <path d="M28 6 C22 3 20 1 22 4" stroke="#3d5228" strokeWidth="0.6" opacity="0.35" />
      <path d="M28 6 C34 3 36 1 34 4" stroke="#3d5228" strokeWidth="0.6" opacity="0.35" />
    </Icon>
  );
}

export function IconTriwe() {
  return (
    <Icon>
      <path d="M28 3 C16 12 12 28 16 42 C20 52 28 58 28 58 C28 58 36 52 40 42 C44 28 40 12 28 3Z"
        stroke="#c8a050" strokeWidth="0.85" opacity="0.45" />
      <path d="M28 3 L28 58" stroke="#3d5228" strokeWidth="0.85" opacity="0.6" />
      <path d="M28 16 L19 23" stroke="#3d5228" strokeWidth="0.65" opacity="0.42" />
      <path d="M28 16 L37 23" stroke="#3d5228" strokeWidth="0.65" opacity="0.42" />
      <path d="M28 28 L18 36" stroke="#3d5228" strokeWidth="0.6" opacity="0.38" />
      <path d="M28 28 L38 36" stroke="#3d5228" strokeWidth="0.6" opacity="0.38" />
      <path d="M28 40 L21 46" stroke="#3d5228" strokeWidth="0.55" opacity="0.32" />
      <path d="M28 40 L35 46" stroke="#3d5228" strokeWidth="0.55" opacity="0.32" />
      <circle cx="21" cy="26" r="1.2" fill="#c8a050" opacity="0.22" />
      <circle cx="35" cy="20" r="1" fill="#c8a050" opacity="0.2" />
      <circle cx="22" cy="40" r="1" fill="#c8a050" opacity="0.18" />
    </Icon>
  );
}

export function IconChilco() {
  return (
    <Icon>
      <path d="M28 2 L28 18" stroke="#3d5228" strokeWidth="0.8" opacity="0.55" />
      {/* spreading sepals */}
      <path d="M28 18 C20 22 14 30 16 36" stroke="#c8a050" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M28 18 C36 22 42 30 40 36" stroke="#c8a050" strokeWidth="0.8" fill="none" opacity="0.5" />
      <path d="M28 18 C23 22 20 30 22 38" stroke="#c8a050" strokeWidth="0.75" fill="none" opacity="0.45" />
      <path d="M28 18 C33 22 36 30 34 38" stroke="#c8a050" strokeWidth="0.75" fill="none" opacity="0.45" />
      {/* corolla tube */}
      <path d="M21 35 C19 40 20 50 28 54 C36 50 37 40 35 35 C33 32 23 32 21 35Z"
        stroke="#7a4a8a" strokeWidth="0.82" opacity="0.55" />
      {/* stamens */}
      <line x1="24" y1="54" x2="22" y2="63" stroke="#c8a050" strokeWidth="0.6" opacity="0.4" />
      <line x1="28" y1="54" x2="28" y2="64" stroke="#c8a050" strokeWidth="0.65" opacity="0.45" />
      <line x1="32" y1="54" x2="34" y2="63" stroke="#c8a050" strokeWidth="0.6" opacity="0.4" />
      <circle cx="22" cy="63" r="1.4" fill="#c8a050" opacity="0.4" />
      <circle cx="28" cy="64" r="1.5" fill="#c8a050" opacity="0.42" />
      <circle cx="34" cy="63" r="1.4" fill="#c8a050" opacity="0.4" />
    </Icon>
  );
}

export function IconMilenrama() {
  return (
    <Icon>
      <path d="M28 60 L28 28" stroke="#3d5228" strokeWidth="0.9" opacity="0.6" />
      {/* flat-topped flower head */}
      <path d="M6 26 L50 26" stroke="#c8a050" strokeWidth="0.6" opacity="0.35" />
      {[6, 13, 20, 28, 36, 43, 50].map((x, i) => (
        <circle key={x} cx={x} cy={24 - (i === 3 ? 4 : i === 2 || i === 4 ? 2 : 0)}
          r={i === 3 ? 3 : i === 2 || i === 4 ? 2.5 : 2}
          stroke="#c8a050" strokeWidth="0.7" opacity={i === 3 ? 0.6 : 0.45} />
      ))}
      {/* branch stems */}
      <path d="M28 28 L13 27" stroke="#3d5228" strokeWidth="0.55" opacity="0.38" />
      <path d="M28 28 L43 27" stroke="#3d5228" strokeWidth="0.55" opacity="0.38" />
      <path d="M28 28 L20 27" stroke="#3d5228" strokeWidth="0.52" opacity="0.35" />
      <path d="M28 28 L36 27" stroke="#3d5228" strokeWidth="0.52" opacity="0.35" />
      {/* feathery leaves */}
      <path d="M28 40 C23 36 21 38 23 43" stroke="#3d5228" strokeWidth="0.55" fill="none" opacity="0.38" />
      <path d="M28 50 C33 46 35 48 33 52" stroke="#3d5228" strokeWidth="0.55" fill="none" opacity="0.35" />
      <path d="M28 44 C24 41 23 43 25 46" stroke="#3d5228" strokeWidth="0.5" fill="none" opacity="0.3" />
    </Icon>
  );
}

/* ————— Arquetipos: un dibujito por tipo de planta (para las que no tienen uno propio) ————— */

// Flor compuesta tipo margarita (Asteraceae: manzanilla, caléndula, árnica…)
export function IconFlorMargarita() {
  return (
    <Icon>
      <path d="M28 60 L28 30" stroke={MOSS} strokeWidth="0.9" opacity="0.55" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse key={deg} cx="28" cy="14" rx="3" ry="7" stroke={GOLD} strokeWidth="0.75"
          opacity="0.5" transform={`rotate(${deg}, 28, 24)`} />
      ))}
      <circle cx="28" cy="24" r="4.5" stroke={GOLD} strokeWidth="0.85" opacity="0.6" />
      <circle cx="28" cy="24" r="1.8" fill={GOLD} opacity="0.3" />
      <path d="M28 42 C22 38 19 40 21 45" stroke={MOSS} strokeWidth="0.6" fill="none" opacity="0.4" />
      <path d="M28 50 C34 46 37 48 35 52" stroke={MOSS} strokeWidth="0.6" fill="none" opacity="0.38" />
    </Icon>
  );
}

// Ramita aromática con hojas opuestas y flores pequeñas (Lamiaceae: romero, tomillo, orégano…)
export function IconRamitaAromatica() {
  return (
    <Icon>
      <path d="M28 60 L28 6" stroke={MOSS} strokeWidth="0.9" opacity="0.55" />
      {[16, 26, 36, 46].map((y, i) => (
        <g key={y} opacity={0.5 - i * 0.05}>
          <path d={`M28 ${y} C20 ${y - 3} 16 ${y + 1} 15 ${y + 5}`} stroke={MOSS} strokeWidth="0.65" fill="none" />
          <path d={`M28 ${y} C36 ${y - 3} 40 ${y + 1} 41 ${y + 5}`} stroke={MOSS} strokeWidth="0.65" fill="none" />
        </g>
      ))}
      {[8, 11, 14].map((y) => (
        <circle key={y} cx="28" cy={y} r="1.4" fill={PURPLE} opacity="0.4" />
      ))}
      <circle cx="24" cy="10" r="1.1" fill={PURPLE} opacity="0.32" />
      <circle cx="32" cy="10" r="1.1" fill={PURPLE} opacity="0.32" />
    </Icon>
  );
}

// Umbela: radios que terminan en florcitas (Apiaceae: hinojo, anís, apio; saúco)
export function IconUmbela() {
  return (
    <Icon>
      <path d="M28 60 L28 24" stroke={MOSS} strokeWidth="0.9" opacity="0.55" />
      {[-30, -18, -6, 6, 18, 30].map((dx) => (
        <line key={dx} x1="28" y1="24" x2={28 + dx} y2="8" stroke={MOSS} strokeWidth="0.5" opacity="0.4" />
      ))}
      {[-30, -18, -6, 6, 18, 30].map((dx) => (
        <circle key={dx} cx={28 + dx} cy="7" r="1.6" stroke={GOLD} strokeWidth="0.7" opacity="0.5" />
      ))}
      <path d="M28 44 C21 40 18 42 20 47" stroke={MOSS} strokeWidth="0.6" fill="none" opacity="0.4" />
      <path d="M28 50 C35 46 38 48 36 53" stroke={MOSS} strokeWidth="0.6" fill="none" opacity="0.36" />
    </Icon>
  );
}

// Racimo de bayas (Myrtaceae, Berberidaceae: murta, calafate, michay)
export function IconBaya() {
  return (
    <Icon>
      <path d="M28 60 L28 26" stroke={MOSS} strokeWidth="0.9" opacity="0.55" />
      {[[24, 18], [32, 18], [20, 26], [28, 27], [36, 26], [24, 34], [32, 34]].map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3.4" stroke={PURPLE} strokeWidth="0.75" opacity="0.5" />
          <circle cx={x} cy={y} r="1.2" fill={PURPLE} opacity="0.25" />
        </g>
      ))}
      <path d="M28 40 C22 37 19 39 21 43" stroke={MOSS} strokeWidth="0.6" fill="none" opacity="0.4" />
      <path d="M28 48 C34 45 37 47 35 51" stroke={MOSS} strokeWidth="0.6" fill="none" opacity="0.36" />
    </Icon>
  );
}

// Rizoma / raíz nudosa (Zingiberaceae: jengibre, cúrcuma; ginseng)
export function IconRizoma() {
  return (
    <Icon>
      <path d="M10 34 C16 28 22 36 28 32 C34 28 40 36 46 32 C48 40 44 46 38 44 C40 50 34 54 30 48 C26 54 18 52 20 44 C14 46 8 40 10 34Z"
        stroke={GOLD} strokeWidth="0.85" opacity="0.5" />
      <path d="M20 44 L18 56" stroke={MOSS} strokeWidth="0.55" opacity="0.4" />
      <path d="M30 48 L30 58" stroke={MOSS} strokeWidth="0.55" opacity="0.4" />
      <path d="M28 32 C27 22 24 14 28 6" stroke={MOSS} strokeWidth="0.7" fill="none" opacity="0.5" />
      <path d="M28 16 C22 12 19 14 21 18" stroke={MOSS} strokeWidth="0.6" fill="none" opacity="0.4" />
      <path d="M28 12 C34 8 37 10 35 14" stroke={MOSS} strokeWidth="0.6" fill="none" opacity="0.4" />
    </Icon>
  );
}

// Flor de 5 pétalos (Malvaceae, Boraginaceae, Linaceae, Hypericaceae, Rosaceae)
export function IconFlor5() {
  return (
    <Icon>
      <path d="M28 60 L28 30" stroke={MOSS} strokeWidth="0.9" opacity="0.55" />
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse key={deg} cx="28" cy="14" rx="4.5" ry="8" stroke={GOLD} strokeWidth="0.8"
          opacity="0.5" transform={`rotate(${deg}, 28, 22)`} />
      ))}
      <circle cx="28" cy="22" r="3" stroke={GOLD} strokeWidth="0.85" opacity="0.6" />
      <circle cx="28" cy="22" r="1.2" fill={GOLD} opacity="0.3" />
      <path d="M28 44 C21 40 18 42 20 47" stroke={MOSS} strokeWidth="0.6" fill="none" opacity="0.4" />
      <path d="M28 52 C35 48 38 50 36 54" stroke={MOSS} strokeWidth="0.6" fill="none" opacity="0.36" />
    </Icon>
  );
}

// Bulbo con raicillas y brotes (Amaryllidaceae: ajo, cebolla)
export function IconBulbo() {
  return (
    <Icon>
      <path d="M18 40 C18 30 24 26 28 26 C32 26 38 30 38 40 C38 50 33 56 28 56 C23 56 18 50 18 40Z"
        stroke={GOLD} strokeWidth="0.85" opacity="0.5" />
      <path d="M28 26 L28 56" stroke={GOLD} strokeWidth="0.5" opacity="0.3" />
      <path d="M23 28 C22 44 23 52 26 55" stroke={GOLD} strokeWidth="0.45" fill="none" opacity="0.28" />
      <path d="M33 28 C34 44 33 52 30 55" stroke={GOLD} strokeWidth="0.45" fill="none" opacity="0.28" />
      <path d="M28 26 L24 8" stroke={MOSS} strokeWidth="0.7" opacity="0.5" />
      <path d="M28 26 L31 9" stroke={MOSS} strokeWidth="0.65" opacity="0.45" />
      <path d="M28 26 L28 6" stroke={MOSS} strokeWidth="0.6" opacity="0.4" />
      {[22, 26, 30, 34].map((x) => (
        <line key={x} x1={x} y1="55" x2={x - 1} y2="61" stroke={MOSS} strokeWidth="0.4" opacity="0.3" />
      ))}
    </Icon>
  );
}

// Arbolito (árboles/arbustos nativos: canelo, quillay, ulmo, maitén, molle, sauce…)
export function IconArbol() {
  return (
    <Icon>
      <path d="M28 60 L28 34" stroke={MOSS} strokeWidth="1" opacity="0.6" />
      <path d="M28 44 L20 38" stroke={MOSS} strokeWidth="0.6" opacity="0.42" />
      <path d="M28 40 L36 34" stroke={MOSS} strokeWidth="0.6" opacity="0.42" />
      <path d="M28 30 C16 30 12 20 18 13 C20 6 30 4 34 9 C42 8 46 18 40 24 C42 30 33 32 28 30Z"
        stroke={GOLD} strokeWidth="0.85" opacity="0.5" />
      <circle cx="22" cy="17" r="1" fill={MOSS} opacity="0.3" />
      <circle cx="33" cy="14" r="1" fill={MOSS} opacity="0.3" />
      <circle cx="30" cy="23" r="1" fill={MOSS} opacity="0.28" />
    </Icon>
  );
}

// Espiga / cereal (Poaceae: avena)
export function IconEspiga() {
  return (
    <Icon>
      <path d="M28 60 L28 20" stroke={MOSS} strokeWidth="0.85" opacity="0.55" />
      {[10, 16, 22, 28, 34].map((y) => (
        <g key={y}>
          <path d={`M28 ${y} C22 ${y - 2} 20 ${y + 2} 24 ${y + 4}`} stroke={GOLD} strokeWidth="0.7" fill="none" opacity="0.5" />
          <path d={`M28 ${y} C34 ${y - 2} 36 ${y + 2} 32 ${y + 4}`} stroke={GOLD} strokeWidth="0.7" fill="none" opacity="0.5" />
        </g>
      ))}
      <path d="M28 20 L28 6" stroke={GOLD} strokeWidth="0.55" opacity="0.4" />
      <path d="M28 48 C22 46 19 40 22 36" stroke={MOSS} strokeWidth="0.55" fill="none" opacity="0.36" />
    </Icon>
  );
}

// Hoja dentada / aserrada (Urticaceae ortiga, Aquifoliaceae yerba mate)
export function IconHojaDentada() {
  return (
    <Icon>
      <path d="M28 58 C16 46 14 24 28 6 C42 24 40 46 28 58Z" stroke={GOLD} strokeWidth="0.85" opacity="0.5" />
      <path d="M28 8 L28 56" stroke={MOSS} strokeWidth="0.75" opacity="0.55" />
      {[16, 24, 32, 40, 48].map((y, i) => (
        <g key={y}>
          <path d={`M28 ${y} L${18 - (i % 2)} ${y - 3}`} stroke={MOSS} strokeWidth="0.5" opacity="0.4" />
          <path d={`M28 ${y} L${38 + (i % 2)} ${y - 3}`} stroke={MOSS} strokeWidth="0.5" opacity="0.4" />
        </g>
      ))}
    </Icon>
  );
}

// Roseta de hojas puntudas (Asphodelaceae aloe, Plantaginaceae llantén, Gunneraceae nalca)
export function IconRoseta() {
  return (
    <Icon>
      {[-38, -20, 0, 20, 38].map((deg) => (
        <path key={deg} d="M28 54 C25 36 26 20 28 10 C30 20 31 36 28 54Z"
          stroke={GOLD} strokeWidth="0.7" opacity="0.48" transform={`rotate(${deg}, 28, 54)`} />
      ))}
      <path d="M28 54 L28 60" stroke={MOSS} strokeWidth="0.7" opacity="0.5" />
      <circle cx="28" cy="52" r="1.6" fill={GOLD} opacity="0.28" />
    </Icon>
  );
}

// Hoja simple con nervios — arquetipo por defecto
export function IconHoja() {
  return (
    <Icon>
      <path d="M28 58 C15 45 15 22 30 6 C40 20 38 44 28 58Z" stroke={GOLD} strokeWidth="0.85" opacity="0.5" />
      <path d="M29 9 C24 24 26 44 28 56" stroke={MOSS} strokeWidth="0.75" fill="none" opacity="0.55" />
      <path d="M28 20 C24 17 21 18 20 22" stroke={MOSS} strokeWidth="0.55" fill="none" opacity="0.4" />
      <path d="M28 30 C24 27 21 28 21 32" stroke={MOSS} strokeWidth="0.55" fill="none" opacity="0.38" />
      <path d="M28 40 C25 37 23 38 23 42" stroke={MOSS} strokeWidth="0.5" fill="none" opacity="0.34" />
      <path d="M29 24 C33 21 36 22 37 26" stroke={MOSS} strokeWidth="0.5" fill="none" opacity="0.36" />
      <path d="M28 34 C32 31 35 32 35 36" stroke={MOSS} strokeWidth="0.5" fill="none" opacity="0.33" />
    </Icon>
  );
}

/* ————— Asignación: propio > por familia > hoja por defecto ————— */

const iconoPropio: Record<string, () => React.ReactElement> = {
  matico: IconMatico,
  pitra: IconPitra,
  arrayan: IconArrayan,
  maqui: IconMaqui,
  triwe: IconTriwe,
  chilco: IconChilco,
  milenrama: IconMilenrama,
};

const iconoPorFamilia: Record<string, () => React.ReactElement> = {
  Asteraceae: IconFlorMargarita,
  Lamiaceae: IconRamitaAromatica,
  Verbenaceae: IconRamitaAromatica,
  Apiaceae: IconUmbela,
  Adoxaceae: IconUmbela,
  Caprifoliaceae: IconUmbela,
  Myrtaceae: IconBaya,
  Berberidaceae: IconBaya,
  Elaeocarpaceae: IconBaya,
  Zingiberaceae: IconRizoma,
  Araliaceae: IconRizoma,
  Malvaceae: IconFlor5,
  Boraginaceae: IconFlor5,
  Linaceae: IconFlor5,
  Hypericaceae: IconFlor5,
  Rosaceae: IconFlor5,
  Onagraceae: IconFlor5,
  Gentianaceae: IconFlor5,
  Amaryllidaceae: IconBulbo,
  Winteraceae: IconArbol,
  Salicaceae: IconArbol,
  Quillajaceae: IconArbol,
  Cunoniaceae: IconArbol,
  Celastraceae: IconArbol,
  Anacardiaceae: IconArbol,
  Lauraceae: IconArbol,
  Monimiaceae: IconArbol,
  Proteaceae: IconArbol,
  Hamamelidaceae: IconArbol,
  Atherospermataceae: IconArbol,
  Ginkgoaceae: IconArbol,
  Poaceae: IconEspiga,
  Urticaceae: IconHojaDentada,
  Aquifoliaceae: IconHojaDentada,
  Asphodelaceae: IconRoseta,
  Plantaginaceae: IconRoseta,
  Gunneraceae: IconRoseta,
  Amaranthaceae: IconRoseta,
};

export const plantaIcons: Record<string, () => React.ReactElement> = Object.fromEntries(
  plantas.map((p) => [p.slug, iconoPropio[p.slug] ?? iconoPorFamilia[p.familia] ?? IconHoja])
);

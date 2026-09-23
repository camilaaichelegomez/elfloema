/* Las cuatro secciones del cuerpo y sus iconos, en un solo lugar: se usan en
   la Biblioteca y en el inicio, y así no se desincronizan. */

export function IconLoto() {
  return (
    <svg width="38" height="46" viewBox="0 0 38 46" fill="none" aria-hidden="true">
      <circle cx="19" cy="11" r="4" stroke="#c8a050" strokeWidth="0.9" fill="none" opacity="0.6" />
      <line x1="19" y1="16" x2="19" y2="27" stroke="#c8a050" strokeWidth="1" opacity="0.55" strokeLinecap="round" />
      <path d="M19,27 C12,27 7,31 6,36 C11,37 16,33 19,27Z" stroke="#5a7a3a" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M19,27 C26,27 31,31 32,36 C27,37 22,33 19,27Z" stroke="#5a7a3a" strokeWidth="0.8" fill="none" opacity="0.6" />
      <path d="M10,37 C13,33 16,31 19,30 C22,31 25,33 28,37" stroke="#c8a050" strokeWidth="0.8" fill="none" opacity="0.5" />
      <line x1="7" y1="39" x2="31" y2="39" stroke="#c8a050" strokeWidth="0.7" opacity="0.35" strokeLinecap="round" />
      <circle cx="19" cy="11" r="1" fill="#7a4a8a" opacity="0.45" />
    </svg>
  );
}

export function IconYoga() {
  return (
    <svg width="38" height="46" viewBox="0 0 38 46" fill="none" aria-hidden="true">
      <circle cx="19" cy="10" r="4.5" stroke="#c8a050" strokeWidth="0.9" fill="none" opacity="0.6" />
      <line x1="19" y1="15" x2="19" y2="30" stroke="#c8a050" strokeWidth="1" opacity="0.6" strokeLinecap="round" />
      <path d="M19,18 C14,22 11,27 9,32" stroke="#5a7a3a" strokeWidth="0.8" fill="none" opacity="0.6" strokeLinecap="round" />
      <path d="M19,18 C24,22 27,27 29,32" stroke="#5a7a3a" strokeWidth="0.8" fill="none" opacity="0.6" strokeLinecap="round" />
      <path d="M19,30 C13,31 8,34 7,38" stroke="#c8a050" strokeWidth="0.9" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M19,30 C25,31 30,34 31,38" stroke="#c8a050" strokeWidth="0.9" fill="none" opacity="0.5" strokeLinecap="round" />
      <line x1="6" y1="39" x2="32" y2="39" stroke="#c8a050" strokeWidth="0.8" opacity="0.4" strokeLinecap="round" />
      <circle cx="19" cy="10" r="1" fill="#7a4a8a" opacity="0.45" />
    </svg>
  );
}

export function IconLinfa() {
  return (
    <svg width="38" height="46" viewBox="0 0 38 46" fill="none" aria-hidden="true">
      <line x1="19" y1="6" x2="19" y2="42" stroke="#c8a050" strokeWidth="0.9" opacity="0.5" strokeLinecap="round" />
      <path d="M19,12 C13,14 10,18 9,24" stroke="#5a7a3a" strokeWidth="0.8" fill="none" opacity="0.55" strokeLinecap="round" />
      <path d="M19,12 C25,14 28,18 29,24" stroke="#5a7a3a" strokeWidth="0.8" fill="none" opacity="0.55" strokeLinecap="round" />
      <path d="M19,26 C14,28 12,32 11,37" stroke="#5a7a3a" strokeWidth="0.7" fill="none" opacity="0.45" strokeLinecap="round" />
      <path d="M19,26 C24,28 26,32 27,37" stroke="#5a7a3a" strokeWidth="0.7" fill="none" opacity="0.45" strokeLinecap="round" />
      <circle cx="9" cy="24" r="2.2" stroke="#c8a050" strokeWidth="0.8" fill="none" opacity="0.6" />
      <circle cx="29" cy="24" r="2.2" stroke="#c8a050" strokeWidth="0.8" fill="none" opacity="0.6" />
      <circle cx="11" cy="37" r="1.8" stroke="#c8a050" strokeWidth="0.7" fill="none" opacity="0.45" />
      <circle cx="27" cy="37" r="1.8" stroke="#c8a050" strokeWidth="0.7" fill="none" opacity="0.45" />
      <circle cx="19" cy="8" r="2.6" stroke="#c8a050" strokeWidth="0.85" fill="none" opacity="0.6" />
      <circle cx="19" cy="8" r="1" fill="#7a4a8a" opacity="0.4" />
    </svg>
  );
}

export function IconRostro() {
  return (
    <svg width="38" height="46" viewBox="0 0 38 46" fill="none" aria-hidden="true">
      <path d="M12,10 C18,5 27,8 27,17 L26,24 L30,29 C31,31 29,32 27,32 L26,36 C26,39 23,40 20,40 L19,44" stroke="#c8a050" strokeWidth="1" fill="none" opacity="0.65" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12,10 C7,15 7,26 12,33" stroke="#c8a050" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M22,20 C20,21 18,21 17,20" stroke="#5a7a3a" strokeWidth="0.7" fill="none" opacity="0.5" strokeLinecap="round" />
      <path d="M24,33 C20,36 16,37 13,36" stroke="#5a7a3a" strokeWidth="0.7" fill="none" opacity="0.45" strokeLinecap="round" />
      <path d="M11,38 C14,41 18,42 21,41" stroke="#5a7a3a" strokeWidth="0.6" fill="none" opacity="0.35" strokeLinecap="round" />
      <circle cx="22" cy="19" r="0.9" fill="#7a4a8a" opacity="0.45" />
    </svg>
  );
}

export const SECCIONES_CUERPO = [
  {
    key: "yoga-origen",
    label: "Yoga: de dónde viene",
    subtitle: "Textos, caminos y ayurveda",
    desc: "Los textos, los cuatro caminos, los ocho miembros y el ayurveda. Por qué las posturas son solo una parte.",
    href: "/biblioteca/yoga-origen",
    Icon: IconLoto,
  },
  {
    key: "yoga-practica",
    label: "La práctica del yoga",
    subtitle: "Posturas, clase y mirada",
    desc: "Familias de posturas, cómo se arma una clase, la respiración y dónde va la mirada.",
    href: "/biblioteca/yoga-practica",
    Icon: IconYoga,
  },
  {
    key: "drenaje",
    label: "Drenaje linfático",
    subtitle: "Cómo se mueve la linfa",
    desc: "Cómo se mueve la linfa en todo el cuerpo, el bombeo de ganglios, saltar, y qué dicen los estudios.",
    href: "/biblioteca/drenaje-linfatico",
    Icon: IconLinfa,
  },
  {
    key: "cara",
    label: "La cara",
    subtitle: "Drenaje, masaje y yoga facial",
    desc: "Drenaje facial, masaje y yoga facial: qué hace cada uno, cuánto dura y qué tener en cuenta.",
    href: "/biblioteca/cara-drenaje-yoga-facial",
    Icon: IconRostro,
  },
];

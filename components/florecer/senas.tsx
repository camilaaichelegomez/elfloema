import type { ReactNode } from "react";

/* Las señas de Florecer, dibujadas a mano y del mismo grosor: una figura de
   pie, una cara de perfil, alguien meditando, una lista con sus marcas y la flor. Con fotos,
   cada tarjeta tiraba para su lado. Las usan la portada y la barra de abajo,
   y toman el color del texto que las rodea. */
export const SENAS: Record<string, ReactNode> = {
  /* La flor del icono de la app: la portada, «hoy». */
  hoy: (
    <>
      <circle cx="31" cy="30" r="5" />
      <path d="M31 25 q-7 -10 0 -16 q7 6 0 16" />
      <path d="M36 30 q10 -7 16 0 q-6 7 -16 0" />
      <path d="M31 35 q7 10 0 16 q-7 -6 0 -16" />
      <path d="M26 30 q-10 7 -16 0 q6 -7 16 0" />
      <path d="M31 51 L31 60" opacity="0.5" />
    </>
  ),
  yoga: (
    <>
      <circle cx="30" cy="12" r="5" />
      <path d="M30 17 L30 36" />
      <path d="M30 22 L20 15 M30 22 L40 15" />
      <path d="M30 36 L24 52 M30 36 L37 52" />
      <path d="M18 52 L42 52" opacity="0.5" />
    </>
  ),
  cara: (
    <>
      <path d="M22 16 q10 -8 18 2 q5 6 3 16 q-2 12 -12 14 q-9 2 -11 -10" />
      <path d="M26 26 q3 -2 6 0" />
      <path d="M28 38 q4 3 8 0" />
      <path d="M44 24 q6 6 2 14" opacity="0.55" />
      <path d="M49 22 q8 8 3 19" opacity="0.35" />
    </>
  ),
  meditacion: (
    <>
      <circle cx="31" cy="13" r="5" />
      <path d="M31 18 L31 37" />
      <path d="M31 23 q-10 4 -12 14" />
      <path d="M31 23 q10 4 12 14" />
      <path d="M13 45 q18 -11 36 0" />
      <path d="M18 45 q13 9 26 0" opacity="0.55" />
    </>
  ),
  habitos: (
    <>
      <rect x="14" y="12" width="12" height="12" rx="2" />
      <path d="M17 18 l3 3 l5 -6" />
      <rect x="14" y="30" width="12" height="12" rx="2" />
      <path d="M17 36 l3 3 l5 -6" />
      <rect x="14" y="48" width="12" height="10" rx="2" opacity="0.5" />
      <path d="M32 18 L50 18 M32 36 L50 36 M32 53 L46 53" opacity="0.6" />
    </>
  ),
};

export function Sena({ cual, tamano = 52, grosor = 2 }: { cual: string; tamano?: number; grosor?: number }) {
  return (
    <svg
      viewBox="0 0 62 64"
      width={tamano}
      height={Math.round((tamano * 64) / 62)}
      fill="none"
      stroke="currentColor"
      strokeWidth={grosor}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      {SENAS[cual]}
    </svg>
  );
}

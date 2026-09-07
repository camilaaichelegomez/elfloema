/* Polvo dorado suspendido en el aire de la botica.
   CSS puro (sin canvas ni JS por cuadro): son motas con animación propia, así
   que no cuestan nada de rendimiento. Se oculta con `prefers-reduced-motion`. */

const MOTAS = [
  { l: 4, s: 3.0, d: 26, r: -3, o: 0.55, x: 34 },
  { l: 11, s: 2.0, d: 34, r: -14, o: 0.42, x: -22 },
  { l: 17, s: 3.6, d: 22, r: -8, o: 0.62, x: 46 },
  { l: 23, s: 1.6, d: 39, r: -19, o: 0.34, x: -30 },
  { l: 29, s: 2.6, d: 29, r: -1, o: 0.5, x: 26 },
  { l: 35, s: 3.2, d: 24, r: -11, o: 0.58, x: -38 },
  { l: 41, s: 1.8, d: 36, r: -6, o: 0.38, x: 30 },
  { l: 47, s: 4.0, d: 20, r: -16, o: 0.66, x: -18 },
  { l: 53, s: 2.2, d: 32, r: -2, o: 0.46, x: 40 },
  { l: 59, s: 3.4, d: 27, r: -21, o: 0.6, x: -26 },
  { l: 64, s: 1.7, d: 37, r: -9, o: 0.36, x: 22 },
  { l: 70, s: 2.9, d: 23, r: -13, o: 0.54, x: -42 },
  { l: 76, s: 3.8, d: 30, r: -4, o: 0.64, x: 18 },
  { l: 82, s: 2.1, d: 35, r: -17, o: 0.44, x: -34 },
  { l: 88, s: 3.1, d: 25, r: -7, o: 0.56, x: 38 },
  { l: 94, s: 1.9, d: 33, r: -12, o: 0.4, x: -20 },
  { l: 8, s: 2.4, d: 31, r: -23, o: 0.48, x: 28 },
  { l: 26, s: 3.5, d: 21, r: -18, o: 0.61, x: -44 },
  { l: 44, s: 2.0, d: 38, r: -5, o: 0.41, x: 24 },
  { l: 62, s: 3.3, d: 28, r: -10, o: 0.57, x: -28 },
  { l: 79, s: 2.7, d: 24, r: -20, o: 0.52, x: 42 },
  { l: 97, s: 3.7, d: 26, r: -15, o: 0.63, x: -24 },
];

export function PolvoDorado() {
  return (
    <div className="polvo-dorado" aria-hidden="true">
      {MOTAS.map((m, i) => (
        <span
          key={i}
          className="mota"
          style={{
            left: `${m.l}%`,
            width: `${m.s}px`,
            height: `${m.s}px`,
            opacity: m.o,
            animationDuration: `${m.d}s`,
            animationDelay: `${m.r}s`,
            ["--deriva" as string]: `${m.x}px`,
          }}
        />
      ))}
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const BOSQUES = ['/bosque-1.webp', '/bosque-2.webp', '/bosque-3.webp'];

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function getOpacity(index: number, progress: number) {
  if (index === 0) return 1;
  const seg = 1 / (BOSQUES.length - 1);
  const start = (index - 1) * seg;
  const end = index * seg;
  return clamp((progress - start) / (end - start), 0, 1);
}

export function PageBackground() {
  const [progress, setProgress] = useState(0);

  /* Los tres bosques ocupan la pantalla entera y pesan casi un mega entre
     todos, pero al llegar no se ve ninguno: el hero los tapa por completo.
     Bajarlos de entrada era quitarle el ancho de banda a lo unico que la
     visita si esta mirando.

     Asi que el primero se pide cuando la pagina ya termino de cargar, y los
     otros dos apenas se empieza a bajar. Mientras tanto queda el verde de
     fondo, que es el mismo tono del bosque: no se ve ningun hueco. */
  const [primerBosque, setPrimerBosque] = useState(false);
  const [masBosques, setMasBosques] = useState(false);

  useEffect(() => {
    const pedirElPrimero = () => setPrimerBosque(true);
    const idle = (window as { requestIdleCallback?: (cb: () => void) => number })
      .requestIdleCallback;
    const id = idle ? idle(pedirElPrimero) : window.setTimeout(pedirElPrimero, 1200);

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      if (window.scrollY > 0) setPrimerBosque(true);
      if (window.scrollY > heroHeight * 0.25) setMasBosques(true);
      const afterHero = window.scrollY - heroHeight;
      const remaining = document.body.scrollHeight - heroHeight - window.innerHeight;
      if (remaining <= 0 || afterHero < 0) return;
      setProgress(clamp(afterHero / remaining, 0, 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (!idle) window.clearTimeout(id);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        backgroundColor: '#0d2318',
      }}
    >
      {BOSQUES.map((src, i) =>
        (i === 0 && !primerBosque) || (i > 0 && !masBosques) ? null : (
          <div
            key={src}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: getOpacity(i, progress),
              transition: 'opacity 0.3s ease',
            }}
          >
            <Image
              src={src}
              alt=""
              fill
              style={{ objectFit: 'cover' }}
              sizes="100vw"
            />
          </div>
        )
      )}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(13,35,24,0.3)',
        }}
      />
    </div>
  );
}

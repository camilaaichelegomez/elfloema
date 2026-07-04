'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

const BOSQUES = ['/bosque-1.jpg', '/bosque-2.jpg', '/bosque-3.jpg'];

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
  const layersRef = useRef<Array<HTMLDivElement | null>>([]);

  // Cross-fade sin re-render: rAF + escritura directa de opacity.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const heroHeight = window.innerHeight;
      const afterHero = window.scrollY - heroHeight;
      const remaining = document.body.scrollHeight - heroHeight - window.innerHeight;
      if (remaining <= 0 || afterHero < 0) return;
      const progress = clamp(afterHero / remaining, 0, 1);
      layersRef.current.forEach((el, i) => {
        if (el) el.style.opacity = String(getOpacity(i, progress));
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
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
      {BOSQUES.map((src, i) => (
        <div
          key={src}
          ref={(el) => {
            layersRef.current[i] = el;
          }}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: i === 0 ? 1 : 0,
            transition: 'opacity 0.3s ease',
            willChange: 'opacity',
          }}
        >
          <Image
            src={src}
            alt=""
            fill
            style={{ objectFit: 'cover' }}
            priority={i === 0}
            sizes="100vw"
          />
        </div>
      ))}
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

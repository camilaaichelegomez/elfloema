'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const EMBERS = [
  { left: '9%', bottom: '18%', size: '5px', delay: '0s', duration: '4.5s' },
  { left: '14%', bottom: '10%', size: '3px', delay: '1.4s', duration: '5.2s' },
  { left: '47%', bottom: '22%', size: '4px', delay: '0.6s', duration: '4.8s' },
  { left: '52%', bottom: '14%', size: '3px', delay: '2.3s', duration: '5.6s' },
  { left: '63%', bottom: '26%', size: '4px', delay: '1.8s', duration: '4.2s' },
  { left: '87%', bottom: '20%', size: '5px', delay: '0.9s', duration: '5s' },
  { left: '91%', bottom: '30%', size: '3px', delay: '3.1s', duration: '4.6s' },
];

export function ParallaxHero() {
  const capaRef = useRef<HTMLDivElement>(null);

  /* Parallax escribiendo directo al DOM dentro de un rAF: sin estado de React,
     así el scroll no dispara un re-render por píxel. */
  useEffect(() => {
    const capa = capaRef.current;
    if (!capa) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let pendiente = false;
    const aplicar = () => {
      pendiente = false;
      const avance = Math.min(1, window.scrollY / window.innerHeight);
      capa.style.transform = `scale(${1 + avance * 0.12})`;
    };
    const onScroll = () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(aplicar);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: '#0d2318',
      }}
    >
      <div
        ref={capaRef}
        style={{
          position: 'absolute',
          inset: 0,
          transformOrigin: 'center center',
          willChange: 'transform',
        }}
      >
        <Image src="/hero.png" alt="" fill style={{ objectFit: 'cover' }} priority sizes="100vw" />
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(13,35,24,0.5) 0%, rgba(13,35,24,0.2) 45%, rgba(13,35,24,0.82) 100%)',
          zIndex: 10,
        }}
      />

      {/* Brasas que suben desde las velas de la escena. Posiciones fijas (no
          Math.random) para no desajustar la hidratación servidor/cliente. */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 15, pointerEvents: 'none', overflow: 'hidden' }}>
        {EMBERS.map((e, i) => (
          <span
            key={i}
            className="hero-ember"
            style={{
              position: 'absolute',
              left: e.left,
              bottom: e.bottom,
              width: e.size,
              height: e.size,
              animationDelay: e.delay,
              animationDuration: e.duration,
            }}
          />
        ))}
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 1.5rem',
          pointerEvents: 'none', // el fondo no intercepta; los botones sí (abajo)
        }}
      >
        <h1
          className="hero-entra"
          style={{
            fontFamily: '"Cormorant Garamond", var(--font-cormorant), var(--font-cinzel), serif',
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            fontWeight: 300,
            letterSpacing: '0.25em',
            color: '#c8a050',
            textTransform: 'uppercase',
            margin: 0,
            lineHeight: 1,
            textShadow: '0 4px 40px rgba(13,35,24,0.9)',
          }}
        >
          El Floema
        </h1>

        <p
          className="hero-entra"
          style={{
            fontFamily: '"Cormorant Garamond", var(--font-cormorant), var(--font-crimson), serif',
            fontSize: 'clamp(1rem, 2.2vw, 1.6rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'rgba(235, 220, 185, 0.92)',
            marginTop: '1.25rem',
            letterSpacing: '0.12em',
            textShadow: '0 2px 24px rgba(13,35,24,0.95)',
            animationDelay: '160ms',
          }}
        >
          Con ciencia, mi magia despierta
        </p>

        {/* Qué hacer al llegar: antes no había ninguna acción posible. */}
        <div
          className="hero-entra hero-acciones"
          style={{ animationDelay: '320ms', pointerEvents: 'auto' }}
        >
          <Link href="/tienda" className="hero-cta hero-cta--primario">
            Ver la tienda
          </Link>
          <Link href="/biblioteca" className="hero-cta hero-cta--secundario">
            Explorar la biblioteca
          </Link>
        </div>
      </div>

      {/* Señal de que hay más abajo. */}
      <a href="#contenido" className="hero-scroll" aria-label="Bajar al contenido">
        <span className="hero-scroll-texto">Desliza</span>
        <span className="hero-scroll-linea" aria-hidden="true" />
      </a>
    </div>
  );
}

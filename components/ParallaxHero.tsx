'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function ParallaxHero() {
  const imgRef = useRef<HTMLDivElement>(null);

  // Parallax sin re-render: rAF + escritura directa del transform.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = imgRef.current;
      if (!el) return;
      const progress = Math.min(1, window.scrollY / window.innerHeight);
      el.style.transform = `scale(${1 + progress * 0.12}) translateY(${progress * 24}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
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
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.22, 0.61, 0.36, 1] }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <div
          ref={imgRef}
          style={{
            position: 'absolute',
            inset: 0,
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
        >
          <Image
            src="/hero.png"
            alt="El Floema"
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="100vw"
          />
        </div>
      </motion.div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(13,35,24,0.5) 0%, rgba(13,35,24,0.2) 50%, rgba(13,35,24,0.85) 100%)',
          zIndex: 10,
        }}
      />

      {/* Viñeta lateral sutil: enfoca el centro */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 90% 70% at 50% 45%, transparent 55%, rgba(8,17,8,0.5) 100%)',
          zIndex: 10,
        }}
      />

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
          pointerEvents: 'none',
        }}
      >
        {/* Ornamento superior: línea que crece */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.7 }}
          transition={{ duration: 1.4, delay: 0.5, ease: 'easeOut' }}
          style={{
            width: 'min(240px, 40vw)',
            height: 1,
            background: 'linear-gradient(to right, transparent, #c8a050, transparent)',
            marginBottom: '2rem',
          }}
        />

        <motion.h1
          initial={{ opacity: 0, letterSpacing: '0.5em', y: 14 }}
          animate={{ opacity: 1, letterSpacing: '0.25em', y: 0 }}
          transition={{ duration: 1.8, delay: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
          style={{
            fontFamily: '"Cormorant Garamond", var(--font-cormorant), var(--font-cinzel), serif',
            fontSize: 'clamp(3.5rem, 10vw, 9rem)',
            fontWeight: 300,
            color: '#c8a050',
            textTransform: 'uppercase',
            margin: 0,
            lineHeight: 1,
            textShadow: '0 4px 40px rgba(13,35,24,0.9)',
          }}
        >
          El Floema
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.15, ease: 'easeOut' }}
          style={{
            fontFamily: '"Cormorant Garamond", var(--font-cormorant), var(--font-crimson), serif',
            fontSize: 'clamp(1rem, 2.2vw, 1.6rem)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'rgba(235, 220, 185, 0.92)',
            marginTop: '1.25rem',
            letterSpacing: '0.12em',
            textShadow: '0 2px 24px rgba(13,35,24,0.95)',
          }}
        >
          Con ciencia, mi magia despierta
        </motion.p>

        {/* Ornamento inferior */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.7 }}
          transition={{ duration: 1.4, delay: 0.9, ease: 'easeOut' }}
          style={{
            width: 'min(240px, 40vw)',
            height: 1,
            background: 'linear-gradient(to right, transparent, #c8a050, transparent)',
            marginTop: '2rem',
          }}
        />
      </div>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="hero-scroll-cue"
        aria-hidden="true"
      >
        <span className="hero-scroll-cue__label">Desciende al grimorio</span>
        <span className="hero-scroll-cue__line" />
      </motion.div>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { StaggeredHeadline } from '@/components/StaggeredHeadline';
import { StatCounter } from '@/components/StatCounter';
import { STATS } from '@/data/stats';

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const indicatorOpacity = useTransform(scrollY, [0, 120], [1, 0]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const hero = heroRef.current;
    const glow = glowRef.current;
    if (!hero || !glow) return;

    function handleMouseMove(event: MouseEvent) {
      const rect = hero!.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      glow!.style.setProperty('--glow-x', `${x}%`);
      glow!.style.setProperty('--glow-y', `${y}%`);
    }

    hero.addEventListener('mousemove', handleMouseMove);
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion]);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  const glowStyle: CSSProperties = {
    background:
      'radial-gradient(600px circle at var(--glow-x, 33%) var(--glow-y, 33%), rgba(201,153,46,0.18), transparent 70%)',
  };

  return (
    <div ref={heroRef} className="relative h-[85dvh] w-full overflow-hidden bg-navy">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/welcome.mp4"
        poster="/images/events/boat-party.jpg"
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
      />
      <div className="absolute inset-0 bg-navy/60" />
      <div ref={glowRef} aria-hidden="true" className="pointer-events-none absolute inset-0" style={glowStyle} />
      <div className="relative flex h-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-24">
        <StaggeredHeadline
          text="King's College London Dental Society"
          className="font-display text-5xl leading-[0.95] tracking-tight text-cream md:text-8xl"
          as="h1"
        />
        <p className="mt-6 text-lg uppercase tracking-[0.2em] text-gold">
          Community · Careers · Culture
        </p>
        <div className="mt-10 grid grid-cols-2 gap-4 md:flex md:flex-wrap md:gap-6">
          {STATS.map((stat) => (
            <StatCounter key={stat.label} {...stat} />
          ))}
        </div>
      </div>
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{ opacity: indicatorOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="text-cream/70"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </motion.svg>
        </motion.div>
      )}
      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-6 right-6 rounded-full border border-cream/60 px-4 py-2 text-sm text-cream outline-none transition-colors duration-300 ease-expo-out hover:border-gold hover:text-gold focus-visible:border-gold focus-visible:text-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        {muted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
}

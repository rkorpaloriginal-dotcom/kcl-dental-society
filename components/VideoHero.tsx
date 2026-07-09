'use client';

import { useEffect, useRef, useState } from 'react';
import { StaggeredHeadline } from '@/components/StaggeredHeadline';

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <div className="relative h-[85vh] w-full overflow-hidden bg-navy">
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
      <div className="relative flex h-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-24">
        <StaggeredHeadline
          text="King's College London Dental Society"
          className="font-display text-5xl leading-[0.95] tracking-tight text-cream md:text-8xl"
        />
        <p className="mt-6 text-lg uppercase tracking-[0.2em] text-gold">
          Community · Careers · Culture
        </p>
      </div>
      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-6 right-6 rounded-full border border-cream/60 px-4 py-2 text-sm text-cream transition-colors duration-300 ease-expo-out hover:border-gold hover:text-gold"
      >
        {muted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
}

'use client';

import { useRef, useState } from 'react';

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  function toggleMute() {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }

  return (
    <div className="relative h-[70vh] w-full overflow-hidden bg-navy">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src="/video/welcome.mp4"
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
      />
      <div className="absolute inset-0 bg-navy/50" />
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center text-white">
        <h1 className="font-display text-4xl md:text-6xl">King&apos;s College London Dental Society</h1>
        <p className="mt-4 text-xl tracking-wide text-gold">Community · Careers · Culture</p>
      </div>
      <button
        type="button"
        onClick={toggleMute}
        className="absolute bottom-6 right-6 rounded-full border border-white/60 px-4 py-2 text-sm text-white hover:border-gold hover:text-gold"
      >
        {muted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
}

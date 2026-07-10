'use client';

import { useEffect, useRef, useState } from 'react';

export function RevealOnScroll({
  children,
  className = '',
  variant = 'fade',
  id,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: 'fade' | 'clip';
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const fadeClass = visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6';
  const clipClass = visible
    ? '[clip-path:inset(0_0_0%_0)]'
    : '[clip-path:inset(0_0_100%_0)]';
  const visibilityClass = variant === 'clip' ? clipClass : fadeClass;
  const transitionClass =
    variant === 'clip'
      ? 'transition-[clip-path] duration-700 ease-expo-out'
      : 'transition-all duration-700 ease-expo-out';

  return (
    <div id={id} ref={ref} className={`${className} ${transitionClass} ${visibilityClass}`}>
      {children}
    </div>
  );
}

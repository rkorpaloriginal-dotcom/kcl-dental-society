'use client';

import { useEffect, useRef, useState } from 'react';

export function RevealOnScroll({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        } else {
          setAnimate(true);
          setVisible(false);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const visibilityClass = visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6';
  const transitionClass = animate ? 'transition-all duration-700 ease-out' : '';

  return (
    <div ref={ref} className={`${className} ${transitionClass} ${visibilityClass}`}>
      {children}
    </div>
  );
}

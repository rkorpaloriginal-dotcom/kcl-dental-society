import { createElement } from 'react';

export function StaggeredHeadline({
  text,
  className = '',
  as = 'span',
}: {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}) {
  const words = text.split(' ');

  return createElement(
    as,
    { className },
    words.map((word, index) => (
      <span
        key={`${word}-${index}`}
        className="inline-block overflow-hidden pb-[0.12em] align-baseline"
      >
        <span
          className="inline-block animate-[word-reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          {word}&nbsp;
        </span>
      </span>
    ))
  );
}

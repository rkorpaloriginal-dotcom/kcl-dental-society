export function StaggeredHeadline({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <span
            className="inline-block animate-[word-reveal_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards]"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            {word}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}

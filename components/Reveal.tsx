import React from 'react';

type RevealElement = 'div' | 'section' | 'article' | 'header' | 'aside' | 'li';

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: RevealElement;
  delay?: number;
  children: React.ReactNode;
}

/**
 * Fades content in once it scrolls into view. Kept deliberately quiet:
 * a short upward drift, no scaling and no staggered chains.
 */
const Reveal: React.FC<RevealProps> = ({ as = 'div', delay = 0, className = '', children, style, ...props }) => {
  const ref = React.useRef<HTMLElement>(null);
  const [revealed, setRevealed] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node || !('IntersectionObserver' in window)) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setRevealed(true);
        observer.disconnect();
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.04 });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return React.createElement(
    as,
    {
      ref,
      'data-reveal': true,
      'data-revealed': revealed ? 'true' : 'false',
      className,
      style: { ...style, '--reveal-delay': `${Math.min(delay, 240)}ms` } as React.CSSProperties,
      ...props,
    },
    children,
  );
};

export default Reveal;

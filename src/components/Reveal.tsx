import type { ElementType, ReactNode } from 'react';
import { useInView } from '../lib/hooks';

interface LinesProps {
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  id?: string;
  /** Startindex voor de stagger, zodat blokken op elkaar aansluiten. */
  offset?: number;
}

/**
 * Tekst komt binnen per regel, van onder een onzichtbare rand vandaan.
 * Dit bestaat omdat het leest als informatie die binnenkomt over een lijn,
 * niet als een element dat toevallig verschijnt.
 */
export function RevealLines({
  lines,
  as: Tag = 'p',
  className = '',
  id,
  offset = 0,
}: LinesProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag ref={ref} id={id} className={`reveal ${className}${inView ? ' is-in' : ''}`.trim()}>
      {lines.map((line, i) => (
        <span className="reveal__line" key={`${i}-${line.slice(0, 12)}`}>
          <span className="reveal__inner" style={{ ['--i' as string]: i + offset }}>
            {line}
          </span>
          {/* Spatie zodat de toegankelijke naam niet aan elkaar plakt. */}
          {i < lines.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}

interface FadeProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  index?: number;
}

/** Voor blokken die als geheel binnenkomen: dezelfde easing, dezelfde stagger. */
export function Fade({ children, as: Tag = 'div', className = '', index = 0 }: FadeProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={`fade ${className}${inView ? ' is-in' : ''}`.trim()}
      style={{ ['--i' as string]: index }}
    >
      {children}
    </Tag>
  );
}

/** Container die zijn kinderen laat binnenkomen zodra hij in beeld staat. */
export function RevealGroup({ children, as: Tag = 'div', className = '' }: FadeProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag ref={ref} className={`${className}${inView ? ' is-in' : ''}`.trim()}>
      {children}
    </Tag>
  );
}

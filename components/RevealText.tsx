import React from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

interface RevealTextProps {
  lines: React.ReactNode[];
  as?: 'h1' | 'h2' | 'h3' | 'div' | 'p';
  className?: string;
  lineClassName?: string;
  stagger?: number;
  delay?: number;
}

interface RevealLineProps {
  line: React.ReactNode;
  lineClassName: string;
  delay: number;
}

/**
 * A single masked line. Uses the useInView hook (imperative) rather than the
 * whileInView prop — in this framer-motion version whileInView's viewport
 * feature does not reliably fire on nested motion.span elements, while
 * useInView-driven `animate` does.
 */
const RevealLine: React.FC<RevealLineProps> = ({ line, lineClassName, delay }) => {
  // The ref lives on the plain wrapper, not the motion element: useInView's
  // IntersectionObserver needs a ref that resolves synchronously to the DOM
  // node, and motion component ref-forwarding does not reliably provide
  // that in this framer-motion build.
  const wrapperRef = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(wrapperRef, { once: true, amount: 0.35 });

  return (
    <span ref={wrapperRef} className="block overflow-hidden">
      <motion.span
        className={`block ${lineClassName}`}
        initial={{ y: '112%' }}
        animate={inView ? { y: '0%' } : undefined}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {line}
      </motion.span>
    </span>
  );
};

/**
 * Masks each line behind an overflow-hidden wrapper and slides it up into
 * view once. Operates per-line (not per-word) so mixed markup like italics
 * or <br/> inside a heading keeps working untouched.
 */
const RevealText: React.FC<RevealTextProps> = ({
  lines,
  as = 'div',
  className = '',
  lineClassName = '',
  stagger = 0.09,
  delay = 0,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const Tag = as;

  if (prefersReducedMotion) {
    return (
      <Tag className={className}>
        {lines.map((line, i) => (
          <span key={i} className={`block ${lineClassName}`}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <RevealLine key={i} line={line} lineClassName={lineClassName} delay={delay + i * stagger} />
      ))}
    </Tag>
  );
};

export default RevealText;

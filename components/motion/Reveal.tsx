import React from 'react';
import { gsap, EASE } from '../../lib/motion';

type RevealElement = 'div' | 'section' | 'article' | 'header' | 'aside' | 'li' | 'figure' | 'ul' | 'ol' | 'dl';

interface RevealProps extends React.HTMLAttributes<HTMLElement> {
  as?: RevealElement;
  delay?: number;
  /** Animates direct children in sequence instead of the block as a whole. */
  stagger?: number;
  /** Vertical travel in px. Kept small — this is punctuation, not choreography. */
  distance?: number;
  children: React.ReactNode;
}

/**
 * The quiet workhorse: a short rise and fade as a block scrolls into view.
 * Everything renders in its final state until GSAP takes over, so content is
 * never left hidden by a script that failed to load.
 */
const Reveal: React.FC<RevealProps> = ({
  as = 'div',
  delay = 0,
  stagger = 0,
  distance = 22,
  className = '',
  children,
  ...rest
}) => {
  const ref = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const targets = stagger ? Array.from(el.children) : el;

      const tween = gsap.from(targets, {
        y: distance,
        autoAlpha: 0,
        duration: 1,
        delay,
        ease: EASE.out,
        stagger,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        gsap.set(targets, { clearProps: 'transform,opacity,visibility' });
      };
    });

    return () => {
      mm.revert();
    };
  }, [delay, stagger, distance]);

  return React.createElement(
    as,
    { ref, className, 'data-anim': true, ...rest },
    children,
  );
};

export default Reveal;

import React from 'react';
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from '../../lib/motion';

/**
 * The only entrance on the page: a soft fade with a little upward drift.
 *
 * Nothing here is letter-by-letter and nothing waits on a long delay — the
 * point is that a recruiter scrolling fast never arrives at an empty screen.
 * Content renders in its resting state and is only hidden once this has run in
 * a layout effect, so a failed chunk or a thrown error leaves a readable page.
 */

type RevealTag = 'div' | 'section' | 'ul' | 'ol' | 'li' | 'dl' | 'p' | 'header' | 'footer';

interface InkRevealProps {
  children: React.ReactNode;
  as?: RevealTag;
  className?: string;
  /** Stagger the direct children instead of moving the box as one. */
  stagger?: number;
  delay?: number;
  /** Drift distance in px. Kept small — this is a settle, not an entrance. */
  y?: number;
  id?: string;
}

const InkReveal: React.FC<InkRevealProps> = ({
  children,
  as: Tag = 'div',
  className,
  stagger = 0,
  delay = 0,
  y = 18,
  id,
}) => {
  const ref = React.useRef<HTMLElement>(null);

  React.useLayoutEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? Array.from(node.children) : node;
      if (Array.isArray(targets) && targets.length === 0) return;

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay,
          stagger,
          ease: EASE.soft,
          /* `once` matters as much as the easing: things that re-animate every
             time they scroll past are what make a page tiring. */
          scrollTrigger: { trigger: node, start: 'top 88%', once: true },
        },
      );
    }, ref);

    /* The page grows as images settle and fonts swap, so positions measured at
       mount are not the ones that matter. */
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [delay, stagger, y]);

  return (
    <Tag ref={ref as React.Ref<never>} className={className} id={id}>
      {children}
    </Tag>
  );
};

export default InkReveal;

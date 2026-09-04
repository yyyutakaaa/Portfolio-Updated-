import React from 'react';
import { gsap, SplitText, EASE } from '../../lib/motion';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';

interface KineticHeadingProps extends React.HTMLAttributes<HTMLElement> {
  as?: HeadingTag;
  /** 'load' fires immediately, 'scroll' waits until the heading comes into view. */
  trigger?: 'load' | 'scroll';
  delay?: number;
  stagger?: number;
  children: React.ReactNode;
}

/**
 * Type that arrives rather than appears: each line rises out of its own mask
 * while the letterforms expand from tight-and-light into their resting weight
 * and tracking.
 *
 * The tracking always animates from tighter to the resting value, never wider,
 * so a line can never overflow the mask that clips it. Line splitting is
 * recomputed by SplitText on resize and once webfonts land, and the whole
 * effect is skipped outright under prefers-reduced-motion.
 */
const KineticHeading: React.FC<KineticHeadingProps> = ({
  as = 'h2',
  trigger = 'scroll',
  delay = 0,
  stagger = 0.09,
  className = '',
  children,
  ...rest
}) => {
  const ref = React.useRef<HTMLElement>(null);

  /**
   * Switching language replaces the heading's text, which means the split has
   * to be rebuilt. Tracking the rendered string keeps that automatic instead of
   * leaving a stale, un-animated heading behind.
   */
  const textKey = React.useMemo(
    () =>
      React.Children.toArray(children)
        .map((child) => (typeof child === 'string' || typeof child === 'number' ? String(child) : ''))
        .join(''),
    [children],
  );

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const split = SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit(self) {
          const styles = window.getComputedStyle(el);
          const fontSize = parseFloat(styles.fontSize) || 16;
          const resting = parseFloat(styles.letterSpacing) || 0;
          // A touch under 4% of the type size: visible as a settle, never as a jump.
          const tightened = resting - fontSize * 0.038;

          return gsap
            .timeline({
              defaults: { ease: EASE.out },
              delay: trigger === 'load' ? delay : 0,
              scrollTrigger:
                trigger === 'scroll'
                  ? { trigger: el, start: 'top 88%', once: true }
                  : undefined,
              // Composited while the lines are in flight, released afterwards.
              onStart: () => gsap.set(self.lines, { willChange: 'transform, opacity' }),
              onComplete: () => gsap.set(self.lines, { willChange: 'auto' }),
            })
            .from(self.lines, {
              yPercent: 112,
              duration: 1.15,
              stagger,
            })
            .from(
              self.lines,
              {
                letterSpacing: `${tightened}px`,
                fontWeight: 200,
                duration: 1.5,
                ease: EASE.soft,
                stagger,
                // Hand tracking back to the em-based CSS so it stays responsive.
                clearProps: 'letterSpacing,fontWeight',
              },
              0,
            );
        },
      });

      return () => {
        // Skip the revert only when React has already replaced the text (a
        // language change) — reverting then would paste the previous language's
        // markup back over it. In every other case revert, including before the
        // split has materialised, since that also cancels the pending one.
        const swappedByReact = split.lines.length > 0 && !el.contains(split.lines[0] as Node);
        if (!swappedByReact) split.revert();
      };
    });

    return () => {
      mm.revert();
    };
  }, [trigger, delay, stagger, textKey]);

  /**
   * Keyed on the text: SplitText replaces this element's children with its own
   * wrappers, so React can no longer reconcile through them. Changing the key
   * on a language switch throws the old node away and mounts a clean one rather
   * than leaving React updating detached text nodes.
   */
  return React.createElement(
    as,
    { key: textKey, ref, className, 'data-anim': true, ...rest },
    children,
  );
};

export default KineticHeading;

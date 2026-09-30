import React from 'react';
import { gsap, SplitText, EASE, prefersReducedMotion } from '../../lib/motion';

/**
 * A heading that is brushed onto the page rather than faded in.
 *
 * Each line gets its own mask: a wide sheet that is solid on the left, frayed
 * along a turbulent edge, and empty on the right. Sliding it across the line
 * drags that frayed edge over the letters, so the words appear the way the
 * name does in the hero — left to right, with a wet, fibrous leading edge —
 * one line after the next, like a brush working down a column.
 *
 * The letters are always real, selectable text. The masks only exist while a
 * title is waiting or being drawn; once a line is down its mask and the line
 * split are both removed, and the heading is plain type that reflows freely.
 */

type TitleTag = 'h1' | 'h2' | 'h3' | 'p';

interface InkTitleProps {
  children: string;
  as?: TitleTag;
  className?: string;
  id?: string;
  /** `load` for the page's own title; everything else waits to be scrolled to. */
  trigger?: 'load' | 'scroll';
  delay?: number;
}

const InkTitle: React.FC<InkTitleProps> = ({
  children,
  as: Tag = 'h2',
  className,
  id,
  trigger = 'scroll',
  delay = 0,
}) => {
  const textRef = React.useRef<HTMLSpanElement>(null);

  React.useLayoutEffect(() => {
    const node = textRef.current;
    if (!node || prefersReducedMotion()) return;

    /* Hidden under one mask for the whole block straight away — before paint —
       so there is never a frame of finished text that then disappears. */
    node.classList.add('ink-title--armed');

    let split: SplitText | null = null;
    let tween: gsap.core.Tween | null = null;
    let cancelled = false;

    const finish = () => {
      split?.revert();
      split = null;
      node.classList.remove('ink-title--armed');
    };

    const build = () => {
      if (cancelled) return;

      /* Lines can only be found once the face that decides where they break
         is in, which is why this waits on the fonts. */
      split = new SplitText(node, { type: 'lines', linesClass: 'ink-title__line' });
      const lines = split.lines as HTMLElement[];
      node.classList.remove('ink-title--armed');
      gsap.set(lines, { '--ink-reveal': '100%' });

      tween = gsap.to(lines, {
        '--ink-reveal': '0%',
        duration: 1.05,
        delay,
        ease: EASE.soft,
        stagger: 0.16,
        onComplete: finish,
        ...(trigger === 'scroll'
          ? { scrollTrigger: { trigger: node, start: 'top 86%', once: true } }
          : {}),
      });
    };

    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts) {
      Promise.race([fonts.ready, new Promise((resolve) => window.setTimeout(resolve, 1500))]).then(build);
    } else {
      build();
    }

    return () => {
      cancelled = true;
      tween?.scrollTrigger?.kill();
      tween?.kill();
      split?.revert();
      node.classList.remove('ink-title--armed');
    };
  }, [children, delay, trigger]);

  return (
    <Tag className={`ink-title ${className ?? ''}`} id={id}>
      {/* Keyed on the text: a language switch gets a fresh node for SplitText
          to work on, never one React is still patching. */}
      <span key={children} ref={textRef} className="ink-title__text">
        {children}
      </span>
    </Tag>
  );
};

export default InkTitle;

import React from 'react';
import { gsap, EASE, prefersReducedMotion } from '../../lib/motion';

/**
 * The rule between sections, drawn rather than ruled: thick where the brush
 * lands, running dry by the far end. It draws itself as it comes into view.
 *
 * The sweep is a clip rectangle scaled on its own axis — a transform, so the
 * shape is rasterised once and the browser only moves the clip. Animating the
 * rect's `width` would re-raster the path on every frame for the same picture.
 */

/** Long and shallow, so it reads as a stroke and not as a shape. */
const STROKE =
  'M2 4.6C60 1.9 210 1.1 420 2.3 640 3.5 820 5 998 6.9 800 7.6 620 7.4 400 6.9 190 6.4 62 7.2 2 8.4 .9 7.1 .9 5.9 2 4.6Z';

const BrushDivider: React.FC<{ className?: string; flip?: boolean }> = ({ className, flip }) => {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const rootRef = React.useRef<HTMLDivElement>(null);
  const clipRef = React.useRef<SVGRectElement>(null);

  React.useLayoutEffect(() => {
    const node = rootRef.current;
    const clip = clipRef.current;
    if (!node || !clip || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        clip,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.15,
          ease: EASE.soft,
          transformOrigin: flip ? 'right center' : 'left center',
          scrollTrigger: { trigger: node, start: 'top 92%', once: true },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [flip]);

  return (
    <div className={`ink-divider ${className ?? ''}`} ref={rootRef} aria-hidden="true">
      <svg viewBox="0 0 1000 10" preserveAspectRatio="none" focusable="false">
        <defs>
          <clipPath id={`divider-${uid}`}>
            <rect ref={clipRef} x="0" y="0" width="1000" height="10" />
          </clipPath>
        </defs>
        <path d={STROKE} clipPath={`url(#divider-${uid})`} />
      </svg>
    </div>
  );
};

export default BrushDivider;

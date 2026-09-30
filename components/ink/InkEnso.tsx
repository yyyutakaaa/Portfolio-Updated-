import React from 'react';
import { ENSO_SHAPE, ENSO_SPINE } from './enso';
import { gsap, prefersReducedMotion } from '../../lib/motion';
import { renderSvg } from '../../lib/rasterise';

/**
 * The ensō at full size, drawn in one breath when it comes into view.
 *
 * Same brush-and-mask idea as everything else: the ring is a filled, tapered
 * shape, and a wide stroke along its centre line uncovers it from where the
 * brush lands to where it lifts. A light turbulence on the edge makes it read
 * as ink that soaked into the paper rather than a vector ring.
 *
 * Whatever is passed as children sits in the open centre.
 */
const InkEnso: React.FC<{ className?: string; children?: React.ReactNode }> = ({ className, children }) => {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const rootRef = React.useRef<HTMLDivElement>(null);
  const spineRef = React.useRef<SVGPathElement>(null);

  /* The ring with its bled edge, drawn once. The draw-on animation only moves
     a mask across it, and the mask is applied after the filter anyway, so the
     result is identical — but the turbulence is no longer redone on every
     frame of a 1.8s animation that the whole page has to share a thread with. */
  const [bled, setBled] = React.useState<string | null>(null);
  React.useEffect(() => {
    let cancelled = false;
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="700" height="700" viewBox="0 0 44 44">` +
      `<defs><filter id="f" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">` +
      `<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9" result="n"/>` +
      `<feDisplacementMap in="SourceGraphic" in2="n" scale="0.55" xChannelSelector="R" yChannelSelector="G"/></filter></defs>` +
      `<path d="${ENSO_SHAPE}" fill="#1c1b19" filter="url(#f)"/></svg>`;
    renderSvg(svg, 700, 700)
      .then((url) => {
        if (!cancelled && url) setBled(url);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  React.useLayoutEffect(() => {
    const root = rootRef.current;
    const spine = spineRef.current;
    if (!root || !spine || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        spine,
        { strokeDashoffset: 1000 },
        {
          strokeDashoffset: 0,
          duration: 1.8,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: root, start: 'top 80%', once: true },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={`ink-enso-large ${className ?? ''}`} ref={rootRef}>
      <svg viewBox="0 0 44 44" aria-hidden="true" focusable="false">
        <defs>
          <filter id={`enso-bleed-${uid}`} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="0.55" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <mask id={`enso-draw-${uid}`} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="44">
            <path
              ref={spineRef}
              d={ENSO_SPINE}
              fill="none"
              stroke="#fff"
              strokeWidth="6"
              strokeLinecap="round"
              pathLength={1000}
              strokeDasharray={1000}
              strokeDashoffset={0}
            />
          </mask>
        </defs>
        {bled ? (
          <image href={bled} x="0" y="0" width="44" height="44" mask={`url(#enso-draw-${uid})`} />
        ) : (
          <path
            d={ENSO_SHAPE}
            fill="var(--sumi)"
            filter={`url(#enso-bleed-${uid})`}
            mask={`url(#enso-draw-${uid})`}
          />
        )}
      </svg>
      {children && <div className="ink-enso-large__centre">{children}</div>}
    </div>
  );
};

export default InkEnso;

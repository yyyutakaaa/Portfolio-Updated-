import React from 'react';

/**
 * The MOK monogram, brushed instead of printed.
 *
 * The mark itself is the original artwork, used only as a mask — nothing about
 * its drawing changes. What goes through the mask is ink: a fill in the
 * current ink colour, its edges pushed a little by turbulence so they read as
 * absorbed rather than cut, and its density broken up by a streaked noise the
 * way a brush that is running dry leaves paper showing through the stroke.
 * Everything is static, so it rasterises once.
 *
 * Because the fill is `currentColor`, the mark follows the page from paper
 * into night on its own.
 */

/* The cropped artwork, 194 × 240. */
const W = 194;
const H = 240;

const InkLogo: React.FC<{ className?: string }> = ({ className }) => {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');

  return (
    <svg className={className} viewBox={`-6 -6 ${W + 12} ${H + 12}`} aria-hidden="true" focusable="false">
      <defs>
        <mask id={`mok-${uid}`} maskUnits="userSpaceOnUse" x="-6" y="-6" width={W + 12} height={H + 12}>
          {/* White on transparent reads as luminance: the mark, and nothing else. */}
          <rect x="-6" y="-6" width={W + 12} height={H + 12} fill="#000" />
          <image href="/mok-mark.webp" width={W} height={H} />
        </mask>

        <filter id={`mok-ink-${uid}`} x="-8%" y="-8%" width="116%" height="116%" colorInterpolationFilters="sRGB">
          {/* Edges: a small, fine displacement — fibre pull, not wobble. */}
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="5" result="edge" />
          <feDisplacementMap in="SourceGraphic" in2="edge" scale="3.2" xChannelSelector="R" yChannelSelector="G" result="bled" />

          {/* Density: noise stretched along the stroke direction, mapped so
              most of the mark is full ink and only the thinnest streaks lift. */}
          <feTurbulence type="fractalNoise" baseFrequency="0.018 0.34" numOctaves="3" seed="12" result="grain" />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -3.2 2.55"
            result="dry"
          />
          <feComposite in="bled" in2="dry" operator="in" result="inked" />
          <feGaussianBlur in="inked" stdDeviation="0.35" />
        </filter>
      </defs>

      <g filter={`url(#mok-ink-${uid})`}>
        <rect x="-6" y="-6" width={W + 12} height={H + 12} fill="currentColor" mask={`url(#mok-${uid})`} />
      </g>
    </svg>
  );
};

export default InkLogo;

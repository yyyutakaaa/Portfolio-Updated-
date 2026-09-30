import React from 'react';

/**
 * A portrait with no frame and no crop line — the edges are dissolved by a
 * turbulence displacement, so the photograph soaks into the paper the way a
 * wash does instead of sitting on top of it in a box.
 *
 * There is no portrait in the repository yet, so this falls back to a plate
 * carrying the same bled edge. Drop a file at `public/portrait.jpg` and the
 * photograph takes its place with nothing else to change.
 */

const BOX = { w: 420, h: 540 };

interface InkPortraitProps {
  src: string;
  alt: string;
  /** Shown on the plate while there is no photograph to show. */
  pendingLabel: string;
  className?: string;
}

const InkPortrait: React.FC<InkPortraitProps> = ({ src, alt, pendingLabel, className }) => {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const [failed, setFailed] = React.useState(false);

  return (
    <figure className={`ink-portrait ${className ?? ''}`}>
      <svg
        viewBox={`0 0 ${BOX.w} ${BOX.h}`}
        role={failed ? 'presentation' : 'img'}
        aria-label={failed ? undefined : alt}
        focusable="false"
      >
        <defs>
          {/* Coarse turbulence at the edge, then enough blur that the bleed
              never resolves into a boundary anywhere. */}
          <filter
            id={`portrait-bleed-${uid}`}
            x="-15%"
            y="-12%"
            width="130%"
            height="124%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="4" seed="11" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="34" xChannelSelector="R" yChannelSelector="G" result="d" />
            <feGaussianBlur in="d" stdDeviation="5" />
          </filter>

          <mask id={`portrait-mask-${uid}`} maskUnits="userSpaceOnUse" x="-60" y="-60" width={BOX.w + 120} height={BOX.h + 120}>
            <rect
              x="16"
              y="16"
              width={BOX.w - 32}
              height={BOX.h - 32}
              fill="#fff"
              filter={`url(#portrait-bleed-${uid})`}
            />
          </mask>

          <linearGradient id={`portrait-wash-${uid}`} x1="0" y1="0" x2="0.35" y2="1">
            <stop offset="0%" stopColor="#1c1b19" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#1c1b19" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <g mask={`url(#portrait-mask-${uid})`}>
          {failed ? (
            <rect width={BOX.w} height={BOX.h} fill={`url(#portrait-wash-${uid})`} />
          ) : (
            <image
              className="ink-portrait__img"
              href={src}
              width={BOX.w}
              height={BOX.h}
              preserveAspectRatio="xMidYMid slice"
              onError={() => setFailed(true)}
            />
          )}
        </g>
      </svg>

      {failed && <figcaption className="ink-cap ink-portrait__pending">{pendingLabel}</figcaption>}
    </figure>
  );
};

export default InkPortrait;

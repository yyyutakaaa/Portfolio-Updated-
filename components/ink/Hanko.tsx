import React from 'react';

/**
 * A carved seal block with Mehdi's own mark knocked out of it, the way a real
 * hanko carries its owner's initial: red ink everywhere except the mark,
 * which is the paper showing through.
 *
 * The mark is the same artwork the nav brushes onto the page (`/mok-mark.webp`,
 * used as a mask there too), so it is one logo throughout the site rather than
 * a second, invented one. Its white-on-transparent pixels are inverted to
 * black-on-transparent first — a mask hides what is black or absent and
 * shows what is white, so the mark has to go dark to cut a hole rather than
 * add one.
 *
 * It is the only place red appears on the whole site.
 */
const Hanko: React.FC<{ className?: string; uid: string }> = ({ className, uid }) => (
  <svg className={className} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <defs>
      <filter id={`hanko-cut-${uid}`} colorInterpolationFilters="sRGB">
        {/* Keeps alpha, zeroes RGB: white becomes black, transparent stays
            transparent. */}
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
      </filter>
      <mask id={`hanko-${uid}`} maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
        <rect width="40" height="40" fill="#fff" />
        {/* The carved frame every seal has, a hair inside the edge. */}
        <rect x="4.4" y="4.6" width="31.2" height="30.8" rx="2.6" fill="none" stroke="#000" strokeWidth="1.15" />
        <image href="/mok-mark.webp" x="10" y="7.6" width="20" height="24.8" filter={`url(#hanko-cut-${uid})`} />
      </mask>
    </defs>
    {/* Cut by hand, so no two corners agree. */}
    <path
      d="M5.2 1.6C14 .9 27 1 35.2 1.9c3.2.4 3.7 1.5 3.8 4.2.2 8.9.1 20.9-.6 28.5-.3 3-1.2 3.7-4.1 3.9-9.3.6-21.3.5-28.9-.2-3.1-.3-4-1.1-4.2-4.1C.8 25 .9 13 1.5 5.4 1.7 2.6 2.4 1.9 5.2 1.6Z"
      fill="var(--hanko)"
      mask={`url(#hanko-${uid})`}
    />
  </svg>
);

export default Hanko;

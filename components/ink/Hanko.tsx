import React from 'react';

/**
 * A carved seal block with the initial knocked out, the way a real hanko reads:
 * red ink everywhere except the character, which is the paper showing through.
 *
 * It is the only place red appears besides the contact stamp — two uses on the
 * whole site.
 */
const Hanko: React.FC<{ className?: string; uid: string }> = ({ className, uid }) => (
  <svg className={className} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <defs>
      <mask id={`hanko-${uid}`}>
        <rect width="40" height="40" fill="#fff" />
        {/* The carved frame every seal has, a hair inside the edge. */}
        <rect x="4.4" y="4.6" width="31.2" height="30.8" rx="2.6" fill="none" stroke="#000" strokeWidth="1.15" />
        <path d="M10.5 11h4.1v18h-4.1z" fill="#000" />
        <path d="M25.4 11h4.1v18h-4.1z" fill="#000" />
        <path d="M14.6 11h3.6L20 14.6 21.8 11h3.6v5.1L21.9 24.4h-3.8L14.6 16.1z" fill="#000" />
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

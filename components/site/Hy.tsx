import React from 'react';

/**
 * Bodoni Moda draws its hyphen as a hairline that all but disappears at
 * display sizes, so hyphens inside display text are set in the body face.
 */
const Hy: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(-)/g).map((part, i) =>
      part === '-' ? (
        <span key={i} className="hy">
          -
        </span>
      ) : (
        part
      ),
    )}
  </>
);

export default Hy;

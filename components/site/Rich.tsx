import React from 'react';

/** Renders copy where *words between asterisks* are set in the display face. */
const Rich: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/(\*[^*]+\*)/g).map((part, i) =>
      part.startsWith('*') && part.endsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : part,
    )}
  </>
);

export default Rich;

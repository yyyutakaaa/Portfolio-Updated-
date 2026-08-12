import React from 'react';
import Reveal from './Reveal';

interface SectionProps {
  id?: string;
  index?: string;
  label?: string;
  title?: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

/**
 * Editorial section: a hairline rule, a numbered eyebrow and an optional
 * serif heading. No cards, no fills — the whitespace does the work.
 */
const Section: React.FC<SectionProps> = ({ id, index, label, title, intro, className = '', children }) => (
  <Reveal as="section" id={id} className={className}>
    {(index || label) && (
      <div className="flex items-baseline gap-5 border-t border-border pt-5">
        {index && <span className="index-number">{index}</span>}
        {label && <span className="eyebrow">{label}</span>}
      </div>
    )}

    {title && (
      <h2 className="display mt-8 text-4xl md:text-5xl lg:text-6xl">
        {title}
      </h2>
    )}

    {intro && (
      <p className="mt-6 max-w-prose text-textDim">
        {intro}
      </p>
    )}

    <div className={title || intro ? 'mt-12 md:mt-16' : 'mt-10 md:mt-14'}>
      {children}
    </div>
  </Reveal>
);

export default Section;

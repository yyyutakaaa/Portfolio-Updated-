import React from 'react';
import InkReveal from './InkReveal';
import InkTitle from './InkTitle';

/**
 * The opening of every section on every page: a small-caps label, then the
 * heading brushed on beneath it. The label settles in; the heading is painted.
 */
interface InkSectionHeadProps {
  id?: string;
  label: string;
  heading: string;
  /** The page's own title is an h1 and draws on load, not on scroll. */
  level?: 'h1' | 'h2';
  className?: string;
}

const InkSectionHead: React.FC<InkSectionHeadProps> = ({ id, label, heading, level = 'h2', className }) => (
  <div className={`ink-section__head ink-grid ${className ?? ''}`}>
    <InkReveal className="ink-section__label">
      <p className="ink-cap">{label}</p>
    </InkReveal>
    <InkTitle
      as={level}
      id={id}
      className={level === 'h1' ? 'ink-section__heading ink-section__heading--page' : 'ink-section__heading'}
      trigger={level === 'h1' ? 'load' : 'scroll'}
      delay={level === 'h1' ? 0.15 : 0}
    >
      {heading}
    </InkTitle>
  </div>
);

export default InkSectionHead;

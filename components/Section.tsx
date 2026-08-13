import React from 'react';
import KineticHeading from './motion/KineticHeading';

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
 * A numbered rule, a monospace label, and air. Section titles arrive with the
 * kinetic treatment; everything below them is left to the page.
 */
const Section: React.FC<SectionProps> = ({ id, index, label, title, intro, className = '', children }) => (
  <section id={id} className={className}>
    {(index || label) && (
      <div className="flex items-baseline gap-5 border-t border-border pt-5">
        {index && (
          <span className="index-num" aria-hidden="true">
            {index}
          </span>
        )}
        {/* The label is the section's real heading, so it is marked up as one
            even though it is styled as a small monospace rule. */}
        {label && (title ? <span className="label">{label}</span> : <h2 className="label">{label}</h2>)}
      </div>
    )}

    {title && (
      <KineticHeading className="display mt-10 text-[clamp(2.25rem,5.5vw,4.5rem)]">
        {title}
      </KineticHeading>
    )}

    {intro && <p className="lede prose-dim mt-7">{intro}</p>}

    <div className={title || intro ? 'mt-14 md:mt-20' : 'mt-10 md:mt-14'}>{children}</div>
  </section>
);

export default Section;

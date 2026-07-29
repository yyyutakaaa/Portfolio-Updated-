import React from 'react';
import Reveal from './Reveal';

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  delay?: number;
  variant?: 'default' | 'quiet' | 'plain';
  children: React.ReactNode;
}

/**
 * A restrained container: one hairline border, a soft tint, nothing else.
 * Used where content genuinely needs grouping (forms, sidebars).
 */
const Panel: React.FC<PanelProps> = ({ label, delay = 0, variant = 'default', className = '', children, ...props }) => (
  <Reveal
    delay={delay}
    className={`panel ${variant === 'quiet' ? 'panel--quiet' : ''} ${variant === 'plain' ? 'panel--plain' : ''} p-6 md:p-8 ${className}`}
    {...props}
  >
    {label && (
      <div className="mb-7 flex items-center gap-4">
        <span className="eyebrow">{label}</span>
        <span className="h-px flex-grow bg-border" />
      </div>
    )}
    {children}
  </Reveal>
);

export default Panel;

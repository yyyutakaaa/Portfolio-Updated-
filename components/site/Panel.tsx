import React from 'react';

interface PanelProps {
  /** Printed vertically in the strip on the left. */
  number: string;
  id?: string;
  className?: string;
  labelledBy?: string;
  as?: 'section' | 'header' | 'article' | 'div';
  children: React.ReactNode;
}

/** A framed screen: border, faint grid lines and the numbered strip on the left. */
const Panel: React.FC<PanelProps> = ({ number, id, className = '', labelledBy, as: Tag = 'section', children }) => (
  <Tag className={`panel ${className}`} id={id} aria-labelledby={labelledBy}>
    <div className="panel__strip" aria-hidden="true">
      <span className="lbl">{number}</span>
    </div>
    <div className="panel__body">{children}</div>
  </Tag>
);

export default Panel;

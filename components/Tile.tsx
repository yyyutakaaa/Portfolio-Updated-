import React from 'react';

interface TileProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  label?: string;
  highlight?: boolean;
}

const Tile: React.FC<TileProps> = ({ children, className = '', delay = 0, label, highlight = false, ...props }) => {
  const tileRef = React.useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = React.useState(false);

  React.useEffect(() => {
    const tile = tileRef.current;
    if (!tile || !('IntersectionObserver' in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsRevealed(true);
        observer.disconnect();
      }
    }, { rootMargin: '0px 0px 18% 0px', threshold: 0.02 });

    observer.observe(tile);
    return () => observer.disconnect();
  }, []);

  const style = { '--reveal-delay': `${Math.min(delay, 160)}ms` } as React.CSSProperties;

  return (
    <div
      ref={tileRef}
      data-reveal
      data-revealed={isRevealed ? 'true' : 'false'}
      className={`
        tile relative group overflow-hidden p-6 md:p-7 flex flex-col
        ${highlight ? 'tile--highlight' : ''}
        ${className}
      `}
      style={style}
      {...props}
    >
      {/* Decorative scanline effect on hover */}
      {label && (
        <div className="tile-label flex items-center gap-3 mb-6">
          <span className="text-[11px] font-mono text-textDim uppercase tracking-[0.18em]">{label}</span>
          <div className="h-px flex-grow bg-border" />
        </div>
      )}

      {children}
    </div>
  );
};

export default Tile;

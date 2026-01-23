import React from 'react';

interface TileProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  label?: string;
  highlight?: boolean;
}

const Tile: React.FC<TileProps> = ({ children, className = '', delay = 0, label, highlight = false, ...props }) => {
  const style = { animationDelay: `${delay}ms` };

  return (
    <div
      className={`
        relative group overflow-hidden bg-surface border border-border p-6 flex flex-col
        transition-all duration-500 hover:border-borderActive animate-reveal opacity-0
        ${highlight ? 'bg-surfaceHighlight' : ''}
        ${className}
      `}
      style={style}
      {...props}
    >
      {/* Decorative scanline effect on hover */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full transition-transform duration-700 group-hover:translate-x-full" />

      {label && (
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-mono text-textDim uppercase tracking-[0.2em]">{label}</span>
          <div className="h-[1px] flex-grow bg-border" />
        </div>
      )}

      {children}
    </div>
  );
};

export default Tile;
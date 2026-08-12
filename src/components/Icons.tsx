/**
 * Alle iconografie is inline SVG op currentColor. Geen icon font, geen PNG,
 * geen emoji — zo blijft elk icoon dezelfde lijndikte houden als de hairlines.
 */

interface IconProps {
  size?: number;
  className?: string;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 16 16',
  fill: 'none' as const,
  stroke: 'currentColor' as const,
  strokeWidth: 1.25,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
  focusable: false as const,
});

export function ArrowUpRight({ size = 14, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 11 11 5" />
      <path d="M6 5h5v5" />
    </svg>
  );
}

export function ArrowDown({ size = 14, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M8 3v10" />
      <path d="M4 9.5 8 13.5l4-4" />
    </svg>
  );
}

export function ArrowLeft({ size = 14, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M13 8H3" />
      <path d="M6.5 4 3 8l3.5 4" />
    </svg>
  );
}

export function ChevronRight({ size = 12, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  );
}

export function Copy({ size = 13, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.25" />
      <path d="M10.5 5.5v-1a1.25 1.25 0 0 0-1.25-1.25H3.75A1.25 1.25 0 0 0 2.5 4.5v5.5c0 .69.56 1.25 1.25 1.25h1" />
    </svg>
  );
}

export function Check({ size = 13, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}

export function Menu({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M2 5h12" />
      <path d="M2 11h12" />
    </svg>
  );
}

export function Close({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 4l8 8" />
      <path d="M12 4l-8 8" />
    </svg>
  );
}

/** Knooppunt met uitgaande verbinding — het merkteken van de site. */
export function NodeMark({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="4" cy="12" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="4" r="1.6" />
      <path d="M5.2 10.8 10.8 5.2" />
    </svg>
  );
}

import React from 'react';

/**
 * Lab topologies, drawn the way the rest of the site is: ink lines on paper.
 *
 * `home` sits beside the hero copy and says "networks" before a word is read;
 * `paloalto` stands in for the screenshot the Palo Alto project does not have.
 * Every line carries `pathLength="1"` so CSS can brush it in with one dash
 * offset, whatever its real length. Labels are device names, not prose, so
 * they read the same in both languages.
 */

type Variant = 'home' | 'paloalto';

/** One device: a small square for network gear, a dot for hosts. */
const Node: React.FC<{ x: number; y: number; label: string; kind?: 'box' | 'dot'; below?: boolean }> = ({
  x,
  y,
  label,
  kind = 'dot',
  below = true,
}) => (
  <g className="ink-topo__node">
    {kind === 'box' ? (
      <rect x={x - 17} y={y - 10} width="34" height="20" pathLength={1} />
    ) : (
      <circle cx={x} cy={y} r="6.5" pathLength={1} />
    )}
    {kind === 'box' && !below ? (
      <text x={x + 26} y={y + 3} textAnchor="start">
        {label}
      </text>
    ) : (
      <text x={x} y={below ? y + (kind === 'box' ? 26 : 22) : y - 16} textAnchor="middle">
        {label}
      </text>
    )}
  </g>
);

const Home: React.FC = () => (
  <svg viewBox="0 0 240 260" focusable="false">
    {/* The links first, so the nodes sit on top of them. */}
    <g className="ink-topo__links">
      <path d="M120 34V78" pathLength={1} />
      <path d="M120 98V138" pathLength={1} />
      <path d="M120 158C120 182 46 180 44 206" pathLength={1} />
      <path d="M120 158V206" pathLength={1} />
      <path d="M120 158C120 182 194 180 196 206" pathLength={1} />
    </g>
    <g className="ink-topo__wan">
      <path d="M96 30C88 30 86 20 95 18 96 8 112 6 116 14 122 4 140 8 139 17 150 16 152 30 142 30Z" pathLength={1} />
    </g>
    <Node x={120} y={88} label="FW-01" kind="box" below={false} />
    <Node x={120} y={148} label="SW-01" kind="box" below={false} />
    <Node x={44} y={212} label="DC1" />
    <Node x={120} y={212} label="DC2" />
    <Node x={196} y={212} label="SRV" />
  </svg>
);

const PaloAlto: React.FC = () => (
  <svg viewBox="0 0 320 180" focusable="false">
    {/* The LAN zone, loosely brushed. */}
    <path
      className="ink-topo__zone"
      d="M206 40C232 34 290 36 300 46 306 70 306 118 298 136 270 146 226 144 208 138 200 110 200 64 206 40Z"
      pathLength={1}
    />
    <text className="ink-topo__zoneLabel" x="292" y="30" textAnchor="end">
      ZONE LAN
    </text>

    <g className="ink-topo__links">
      <path d="M62 92H132" pathLength={1} />
      <path d="M168 92H232" pathLength={1} />
      <path d="M168 86C200 78 228 68 262 66" pathLength={1} />
    </g>

    {/* DNS and NTP leave from the loopback, out over the WAN: the service route. */}
    <path className="ink-topo__route" d="M258 60C210 22 110 22 46 74" pathLength={1} />
    <text className="ink-topo__note" x="152" y="22" textAnchor="middle">
      DNS · NTP via loopback
    </text>

    <g className="ink-topo__wan">
      <path d="M22 100C10 100 8 86 20 84 20 70 40 68 44 78 50 68 66 72 64 84 76 84 76 100 64 100Z" pathLength={1} />
    </g>
    <text className="ink-topo__note" x="96" y="84" textAnchor="middle">
      WAN · DHCP
    </text>

    <g className="ink-topo__node">
      <rect x="132" y="78" width="36" height="28" pathLength={1} />
      <text x="150" y="124" textAnchor="middle">
        PA-VM
      </text>
    </g>
    <Node x={238} y={92} label="CLIENT" />
    <Node x={266} y={66} label="LOOPBACK" below={false} />

    <text className="ink-topo__note" x="160" y="164" textAnchor="middle">
      LAN-HQ · LAN-BO · DMZ · SERVERS
    </text>
  </svg>
);

const InkTopology: React.FC<{ variant: Variant; className?: string; label?: string }> = ({
  variant,
  className = '',
  label,
}) => (
  <figure
    className={`ink-topo ink-topo--${variant} ${className}`}
    {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
  >
    {variant === 'home' ? <Home /> : <PaloAlto />}
  </figure>
);

export default InkTopology;

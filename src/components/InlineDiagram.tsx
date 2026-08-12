import { useInView } from '../lib/hooks';
import { ARCH } from '../lib/topology';

/** Labelverschuiving in viewBox-eenheden — hetzelfde ritme als de vaste laag. */
const OFFSET = {
  below: { dx: 0, dy: 5.6, anchor: 'middle' },
  above: { dx: 0, dy: -3.4, anchor: 'middle' },
  left: { dx: -3.2, dy: 1.1, anchor: 'end' },
  right: { dx: 3.2, dy: 1.1, anchor: 'start' },
} as const;

interface Props {
  archId: string;
  caption: string;
  description: string;
}

/**
 * Het architectuurdiagram in de documentstroom. Op smalle schermen kan de
 * vaste laag geen leesbaar diagram dragen zonder de tekst te raken, dus tekent
 * de case zijn eigen topologie — dezelfde nodes, dezelfde tekentaal, kleiner.
 */
export default function InlineDiagram({ archId, caption, description }: Props) {
  const spec = ARCH[archId];
  const { ref, inView } = useInView<HTMLElement>('0px 0px -8% 0px');

  if (!spec) return null;

  const nodes = spec.nodes;

  return (
    <figure
      ref={ref}
      className={`case__diagram diagram${inView ? ' is-in' : ''}`}
      aria-describedby={`diagram-desc-${archId}`}
    >
      <figcaption className="mono mono--dim">{caption}</figcaption>

      <svg
        viewBox="-16 -12 132 128"
        role="img"
        aria-label={description}
        focusable="false"
        preserveAspectRatio="xMidYMid meet"
      >
        <g>
          {spec.edges.map(([a, b, kind], i) => (
            <line
              key={`e-${a}-${b}-${i}`}
              className={`diagram__edge${kind === 'accent' ? ' diagram__edge--accent' : ''}${
                kind === 'dashed' ? ' diagram__edge--dashed' : ''
              }`}
              x1={nodes[a].x * 100}
              y1={nodes[a].y * 100}
              x2={nodes[b].x * 100}
              y2={nodes[b].y * 100}
              pathLength={1}
              style={{ ['--i' as string]: i }}
            />
          ))}
        </g>

        <g>
          {nodes.map((n, i) => (
            <circle
              key={`n-${i}`}
              className={`diagram__node${n.accent ? ' diagram__node--accent' : ''}`}
              cx={n.x * 100}
              cy={n.y * 100}
              r={(n.size ?? 1.05) * 1.15}
              style={{ ['--i' as string]: i }}
            />
          ))}
        </g>

        <g>
          {nodes.map((n, i) => {
            const off = OFFSET[n.side ?? 'below'];
            return (
              <text
                key={`l-${i}`}
                className={`diagram__label${n.accent ? ' diagram__label--accent' : ''}`}
                x={n.x * 100 + off.dx}
                y={n.y * 100 + off.dy}
                textAnchor={off.anchor}
                style={{ ['--i' as string]: i }}
              >
                {n.label}
              </text>
            );
          })}
        </g>
      </svg>

      <p id={`diagram-desc-${archId}`} className="sr-only">
        {description}
      </p>
    </figure>
  );
}

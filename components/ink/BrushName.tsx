import React from 'react';

/**
 * The name, painted rather than faded in.
 *
 * The letterforms are real text in Cormorant Garamond — never outlines — so
 * they stay crisp at any size and the type designer's curves survive. What
 * makes them look brushed is the mask: two thick, wandering strokes per line,
 * pushed around by a turbulence displacement so their edges fray like ink
 * soaking into paper fibre. Animating `stroke-dashoffset` on those strokes
 * sweeps the frayed edge across the glyphs left to right, the way a brush
 * actually crosses a word.
 *
 * The strokes overshoot the text on every side, so the moment the sweep
 * finishes the raggedness is entirely outside the glyphs and the name is
 * simply clean, readable type. Brushy while it happens, legible once it has.
 */

export interface BrushLineHandle {
  /** Mask strokes for one line, in the order they should be laid down. */
  strokes: SVGPathElement[];
}

export interface BrushNameHandle {
  drop: SVGCircleElement;
  bloom: SVGGElement;
  wash: SVGEllipseElement;
  lines: BrushLineHandle[];
}

interface BrushNameProps {
  /** Called once the webfont has loaded and the geometry has been measured. */
  onReady: (handle: BrushNameHandle) => void;
  /** Turbulence is the expensive part; callers switch it off where it costs. */
  frayed?: boolean;
}

/* Two display lines, positioned in viewBox units. The second one hangs in from
   the left so the block reads as a scroll rather than a centred title. */
const LINES = [
  { text: 'Mehdi', x: 0, baseline: 150 },
  { text: 'Oulad Khlie', x: 124, baseline: 314 },
];

const FONT_SIZE = 162;

/**
 * Normalised length for the mask strokes, so one dash covers a whole path
 * whatever its real length. It is 1000 rather than 1 because GSAP rounds
 * pixel values to integers — at `pathLength={1}` the sweep has exactly two
 * frames, on and off, and the brush stops being a brush.
 */
export const PATH_UNITS = 1000;

/** Deterministic wobble in −1..1 — the same every load, so the name is stable. */
const wobble = (seed: number, n: number) =>
  0.5 * Math.sin(seed * 78.233 + n * 2.137) + 0.5 * Math.sin(seed * 12.9898 + n * 5.71);

/**
 * A gently wandering horizontal line. Perfectly straight mask strokes read as
 * a wipe; a little drift reads as a hand.
 */
const brushStroke = (x0: number, x1: number, y: number, amp: number, seed: number) => {
  const span = x1 - x0;
  const p = (f: number, n: number) =>
    `${(x0 + span * f).toFixed(1)} ${(y + amp * wobble(seed, n)).toFixed(1)}`;

  return [
    `M ${p(0, 1)}`,
    `C ${p(0.14, 2)}, ${p(0.24, 3)}, ${p(0.36, 4)}`,
    `S ${p(0.54, 5)}, ${p(0.63, 6)}`,
    `S ${p(0.79, 7)}, ${p(0.86, 8)}`,
    `S ${p(0.97, 9)}, ${p(1, 10)}`,
  ].join(' ');
};

interface Geometry {
  viewBox: string;
  drop: { x: number; y: number; r: number; bloom: number };
  wash: { cx: number; cy: number; rx: number; ry: number };
  masks: { strokes: { d: string; width: number }[] }[];
}

const BrushName: React.FC<BrushNameProps> = ({ onReady, frayed = true }) => {
  const uid = React.useId().replace(/[^a-zA-Z0-9]/g, '');
  const textRefs = React.useRef<(SVGTextElement | null)[]>([]);
  const strokeRefs = React.useRef<(SVGPathElement | null)[][]>([[], []]);
  const dropRef = React.useRef<SVGCircleElement>(null);
  const bloomRef = React.useRef<SVGGElement>(null);
  const washRef = React.useRef<SVGEllipseElement>(null);

  const [geometry, setGeometry] = React.useState<Geometry | null>(null);

  /* Everything downstream depends on where the glyphs actually land, and that
     is only knowable once the webfont is in. Measure, then build. */
  React.useLayoutEffect(() => {
    let cancelled = false;

    /**
     * `getBBox` on SVG text reports the em box — full ascent and descent of the
     * face — not the ink. Using it would hang the block off empty space above
     * the caps and below the baseline, and would size the brush strokes to a
     * band far taller than the letters. Canvas reports true ink extents, so the
     * vertical geometry comes from there and only the advance width, which
     * carries the SVG letter-spacing, comes from `getBBox`.
     */
    const inkMetrics = () => {
      const ctx = document.createElement('canvas').getContext('2d');
      if (!ctx) return null;

      ctx.font = `300 ${FONT_SIZE}px "Cormorant Garamond", Georgia, serif`;
      const rows = LINES.map((line) => {
        const m = ctx.measureText(line.text);
        return {
          ascent: m.actualBoundingBoxAscent,
          descent: m.actualBoundingBoxDescent,
          /* Negative when the first glyph's side bearing puts its ink to the
             right of the origin, which for a display `M` is a good 15 units. */
          bearing: m.actualBoundingBoxLeft,
        };
      });

      // Older engines leave these undefined; the em box is then the best we have.
      return rows.every(
        (r) => Number.isFinite(r.ascent) && Number.isFinite(r.descent) && Number.isFinite(r.bearing),
      )
        ? rows
        : null;
    };

    const measure = () => {
      if (cancelled) return;
      const nodes = textRefs.current.filter(Boolean) as SVGTextElement[];
      if (nodes.length !== LINES.length) return;

      const advances = nodes.map((node) => node.getBBox());
      if (advances.some((b) => b.width === 0)) return;

      const ink = inkMetrics();
      const boxes = advances.map((box, i) => {
        const top = ink ? LINES[i].baseline - ink[i].ascent : box.y;
        const bottom = ink ? LINES[i].baseline + ink[i].descent : box.y + box.height;
        return {
          x: box.x,
          width: box.width,
          /* Where the ink starts, as against where the glyph's origin is. The
             column rule the name hangs from should meet the stem of the M, not
             the invisible box around it. */
          inkX: ink ? LINES[i].x - ink[i].bearing : box.x,
          y: top,
          height: bottom - top,
        };
      });

      const masks = boxes.map((box, i) => {
        const band = box.height;
        const over = band * 0.34;
        const x0 = box.x - over;
        const x1 = box.x + box.width + over * 1.25;
        const width = band * 1.02;
        const amp = band * 0.04;

        /* Two passes, each a whole letter-height wide, sitting high and low so
           they overlap through the middle and clear the band by ~0.3 of a
           letter top and bottom. That margin is the budget the fray and the
           soft edge spend: ±7 units of displacement plus 3σ of blur comes to
           about 30, and the margin is 35. So while the sweep is crossing, its
           edge is ragged and wet; the instant it has passed, every glyph is at
           full ink with nothing soft anywhere near it. */
        return {
          strokes: [
            { d: brushStroke(x0, x1, box.y + band * 0.21, amp, i * 3 + 1), width },
            { d: brushStroke(x0, x1, box.y + band * 0.81, amp, i * 3 + 2), width },
          ],
        };
      });

      const left = Math.min(...boxes.map((b) => b.inkX));
      const right = Math.max(...boxes.map((b) => b.x + b.width));
      const top = Math.min(...boxes.map((b) => b.y));
      const bottom = Math.max(...boxes.map((b) => b.y + b.height));

      const first = boxes[0];

      setGeometry({
        /* The box hugs the ink exactly, so the column rule the name hangs from
           runs down its actual left edge and CSS margins mean what they say.
           The bloom spills past it, which `overflow: visible` allows. */
        viewBox: `${left} ${top} ${right - left} ${bottom - top}`,
        /* The drop lands on the first stroke's origin — the name grows out of
           exactly where the brush touched down. Everything about it is a ratio
           of the letter height, so it holds at any size. */
        drop: {
          x: first.x + first.height * 0.1,
          y: first.y + first.height * 0.54,
          r: first.height * 0.085,
          bloom: first.height * 0.62,
        },
        wash: {
          cx: first.x + first.width * 0.3,
          cy: first.y + first.height * 0.5,
          rx: Math.max(first.width * 0.95, first.height * 2),
          ry: first.height * 1.7,
        },
        masks,
      });
    };

    /* `fonts.ready` alone can settle before a face this element needs has been
       requested, so ask for it explicitly first. The timeout is the offline
       path: fallback metrics measure just as well. */
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    if (fonts) {
      Promise.race([
        Promise.all([
          fonts.load(`300 ${FONT_SIZE}px "Cormorant Garamond"`, 'Mehdi Oulad Khlie'),
          fonts.ready,
        ]),
        new Promise((resolve) => window.setTimeout(resolve, 1200)),
      ]).then(measure);
    } else {
      measure();
    }

    return () => {
      cancelled = true;
    };
  }, []);

  /* Geometry is in the DOM — hand the nodes to whoever is driving the intro. */
  React.useLayoutEffect(() => {
    if (!geometry) return;
    if (!dropRef.current || !bloomRef.current || !washRef.current) return;

    onReady({
      drop: dropRef.current,
      bloom: bloomRef.current,
      wash: washRef.current,
      lines: strokeRefs.current.map((group) => ({
        strokes: group.filter(Boolean) as SVGPathElement[],
      })),
    });
  }, [geometry, onReady]);

  /* Hidden from the accessibility tree on purpose: the two SVG lines would
     concatenate into "MehdiOulad Khlie" with no space between them, so the
     heading carries the name as real text instead. */
  return (
    <svg
      viewBox={geometry?.viewBox ?? '0 33 901 281'}
      preserveAspectRatio="xMinYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* What turns a wipe into a brush. Turbulence pulls the mask edge
            apart along the fibre, then a blur lets the ink wick in over about
            20 units instead of arriving at a cut line. */}
        <filter
          id={`fray-${uid}`}
          x="-10%"
          y="-60%"
          width="120%"
          height="220%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.026 0.085" numOctaves="3" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="15" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="7.5" />
        </filter>

        {/* The drop hitting wet paper: far coarser displacement, then a touch
            of blur so the bleed has no hard boundary anywhere. */}
        <filter
          id={`bleed-${uid}`}
          x="-70%"
          y="-70%"
          width="240%"
          height="240%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence type="fractalNoise" baseFrequency="0.013" numOctaves="4" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="30" xChannelSelector="R" yChannelSelector="G" result="d" />
          <feGaussianBlur in="d" stdDeviation="3.4" />
        </filter>

        {/* Dense at the point of contact, nothing at all by the edge — the
            falloff is what makes it read as absorbency rather than as a shape. */}
        <radialGradient id={`bloom-${uid}`}>
          <stop offset="0%" stopColor="#1c1b19" stopOpacity="0.95" />
          <stop offset="30%" stopColor="#1c1b19" stopOpacity="0.72" />
          <stop offset="58%" stopColor="#1c1b19" stopOpacity="0.32" />
          <stop offset="82%" stopColor="#1c1b19" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#1c1b19" stopOpacity="0" />
        </radialGradient>

        <radialGradient id={`wash-${uid}`}>
          <stop offset="0%" stopColor="#1c1b19" stopOpacity="0.15" />
          <stop offset="52%" stopColor="#1c1b19" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#1c1b19" stopOpacity="0" />
        </radialGradient>

        {geometry?.masks.map((mask, i) => (
          <mask
            key={i}
            id={`brush-${uid}-${i}`}
            maskUnits="userSpaceOnUse"
            x="-400"
            y="-200"
            width="2000"
            height="900"
          >
            <g filter={frayed ? `url(#fray-${uid})` : undefined}>
              {mask.strokes.map((stroke, j) => (
                <path
                  key={j}
                  ref={(node) => {
                    strokeRefs.current[i][j] = node;
                  }}
                  d={stroke.d}
                  pathLength={PATH_UNITS}
                  fill="none"
                  stroke="#fff"
                  strokeWidth={stroke.width}
                  strokeLinecap="round"
                  strokeDasharray={PATH_UNITS}
                  strokeDashoffset={PATH_UNITS}
                />
              ))}
            </g>
          </mask>
        ))}
      </defs>

      {/* The stain the drop leaves behind, which never fully disappears. */}
      <ellipse
        ref={washRef}
        cx={geometry?.wash.cx ?? 0}
        cy={geometry?.wash.cy ?? 0}
        rx={geometry?.wash.rx ?? 0}
        ry={geometry?.wash.ry ?? 0}
        fill={`url(#wash-${uid})`}
        opacity={0}
      />

      {/* Concentric on the drop, so GSAP's bbox-centre origin is the drop. */}
      <g ref={bloomRef} opacity={0}>
        <g filter={`url(#bleed-${uid})`} transform={`translate(${geometry?.drop.x ?? 0} ${geometry?.drop.y ?? 0})`}>
          <circle r={geometry?.drop.bloom ?? 0} fill={`url(#bloom-${uid})`} />
          <circle r={(geometry?.drop.bloom ?? 0) * 0.3} fill="#1c1b19" opacity="0.8" />
        </g>
      </g>

      <circle
        ref={dropRef}
        cx={geometry?.drop.x ?? 0}
        cy={geometry?.drop.y ?? 0}
        r={geometry?.drop.r ?? 0}
        fill="#1c1b19"
        opacity={0}
      />

      {LINES.map((line, i) => (
        <g
          key={line.text}
          mask={geometry ? `url(#brush-${uid}-${i})` : undefined}
          opacity={geometry ? 1 : 0}
        >
          <text
            ref={(node) => {
              textRefs.current[i] = node;
            }}
            className="ink-name__glyphs"
            x={line.x}
            y={line.baseline}
            fontSize={FONT_SIZE}
          >
            {line.text}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default BrushName;

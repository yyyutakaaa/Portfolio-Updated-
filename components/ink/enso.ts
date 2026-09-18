/**
 * The ensō, drawn once and shared: the nav's scroll ring and the large circle
 * on the contact page are the same stroke at two sizes. Both live in a 44 × 44
 * box.
 */

/* Centre line of the ring: an open circle with the gap at the top right. */
const ENSO = { cx: 22, cy: 22, start: -32, sweep: 326, steps: 64 };

const ensoPoint = (f: number) => {
  const angle = ((ENSO.start + ENSO.sweep * f) * Math.PI) / 180;
  /* The radius wanders by a fraction of a unit, so the ring is drawn rather
     than compassed. */
  const r = 15.4 + 0.42 * Math.sin(f * 7.1 + 1.3);
  return { angle, r };
};

/**
 * The ensō as a filled shape rather than a stroked one, because a stroke has
 * one width everywhere and a brush does not: this leaves the ink thick where
 * the brush lands and thin where it lifts. Outer edge forward, inner edge
 * back, closed.
 */
const ensoShape = () => {
  const outer: string[] = [];
  const inner: string[] = [];

  for (let i = 0; i <= ENSO.steps; i += 1) {
    const f = i / ENSO.steps;
    const { angle, r } = ensoPoint(f);
    // Loaded at the start, running dry by the end, with a quick touch-down.
    const taper = (1 - f) ** 0.8 * 2 + 0.9;
    const t = taper * (0.55 + 0.45 * Math.min(f / 0.04, 1));
    const co = Math.cos(angle);
    const si = Math.sin(angle);

    outer.push(`${(ENSO.cx + co * (r + t / 2)).toFixed(2)} ${(ENSO.cy + si * (r + t / 2)).toFixed(2)}`);
    inner.unshift(`${(ENSO.cx + co * (r - t / 2)).toFixed(2)} ${(ENSO.cy + si * (r - t / 2)).toFixed(2)}`);
  }

  return `M${outer.join('L')}L${inner.join('L')}Z`;
};

/** Centre line, stroked wide enough in the mask to uncover the whole ring. */
const ensoSpine = () => {
  const points: string[] = [];
  for (let i = 0; i <= ENSO.steps; i += 1) {
    const { angle, r } = ensoPoint(i / ENSO.steps);
    points.push(`${(ENSO.cx + Math.cos(angle) * r).toFixed(2)} ${(ENSO.cy + Math.sin(angle) * r).toFixed(2)}`);
  }
  return `M${points.join('L')}`;
};

export const ENSO_SHAPE = ensoShape();
export const ENSO_SPINE = ensoSpine();

/**
 * The paper grain and the brush and deckle masks are SVGs that lean on
 * `feTurbulence`. Drawn as CSS images, the browser re-runs that filter whenever
 * the layer has to be repainted, which on Safari means during scroll and
 * during every frame of a mask reveal. Here each one is drawn once into a
 * canvas and swapped in as a plain PNG — same artwork, none of the recurring
 * cost, and identical in every browser.
 */

interface Job {
  variable: string;
  width: number;
  height: number;
}

const JOBS: Job[] = [
  { variable: '--ink-brush', width: 2400, height: 200 },
  { variable: '--ink-deckle', width: 800, height: 1000 },
];

const GRAIN: Job[] = [
  { variable: '--ink-grain-a', width: 220, height: 220 },
  { variable: '--ink-grain-b', width: 380, height: 380 },
];

const load = (src: string) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });

const rasterise = async (source: string, width: number, height: number) => {
  const match = source.trim().match(/^url\("(.*)"\)$/s);
  if (!match) return null;

  /* Firefox will not draw an SVG that has no intrinsic size, so it is given
     the pixel size it is about to be drawn at. The viewBox does the scaling. */
  const svg = match[1];
  const rootTag = svg.slice(0, svg.indexOf('%3E'));
  const sized = /width=/.test(rootTag)
    ? svg
    : svg.replace('%3Csvg ', `%3Csvg width='${width}' height='${height}' `);
  const image = await load(sized);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) return null;

  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL('image/png');
};

/** Swaps each SVG-backed custom property on `root` for a pre-rendered PNG. */
export const rasteriseInk = async (root: HTMLElement) => {
  const scale = Math.min(window.devicePixelRatio || 1, 2);
  const style = window.getComputedStyle(root);

  const jobs = [
    ...JOBS,
    ...GRAIN.map((job) => ({ ...job, width: job.width * scale, height: job.height * scale })),
  ];

  await Promise.all(
    jobs.map(async (job) => {
      try {
        const png = await rasterise(style.getPropertyValue(job.variable), job.width, job.height);
        if (png) root.style.setProperty(job.variable, `url("${png}")`);
      } catch {
        // The original SVG stays in place; it just costs more to draw.
      }
    }),
  );
};

interface Turbulence {
  baseFrequency: string;
  numOctaves: number;
  seed: number;
  /** The user-space rectangle the noise has to cover, so it lines up with the shape it displaces. */
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * A field of `feTurbulence`, drawn once. `feDisplacementMap` reads its noise
 * from another filter primitive, and generating turbulence is the expensive
 * part — done live it is redone on every frame of an animation. Read from an
 * image it is a texture lookup. The noise is computed in the same user space
 * it will be used in, so the displacement lands exactly where it did before.
 */
export const renderTurbulence = async (options: Turbulence) => {
  const { baseFrequency, numOctaves, seed, x, y, width, height } = options;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${x} ${y} ${width} ${height}">` +
    `<filter id="n" filterUnits="userSpaceOnUse" x="${x}" y="${y}" width="${width}" height="${height}" color-interpolation-filters="sRGB">` +
    `<feTurbulence type="fractalNoise" baseFrequency="${baseFrequency}" numOctaves="${numOctaves}" seed="${seed}"/></filter>` +
    `<rect x="${x}" y="${y}" width="${width}" height="${height}" filter="url(#n)"/></svg>`;

  const image = await load(`data:image/svg+xml,${encodeURIComponent(svg)}`);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) return null;
  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL('image/png');
};

/**
 * Draws an arbitrary SVG document to a PNG once. For artwork that is static
 * but expensive to filter and is then only moved, scaled or faded: animating
 * a filtered element makes the browser re-run the filter on every frame,
 * animating the picture of it does not.
 */
export const renderSvg = async (svg: string, width: number, height: number) => {
  const image = await load(`data:image/svg+xml,${encodeURIComponent(svg)}`);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) return null;
  context.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL('image/png');
};

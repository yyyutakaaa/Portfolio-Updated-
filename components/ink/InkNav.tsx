import React from 'react';
import { scrollToId } from '../motion/SmoothScroll';

/**
 * Fixed, small, and almost entirely negative space.
 *
 * Two marks hold the top of the page: the hanko at one end — the first of the
 * three times red is allowed to appear anywhere on the site — and an ensō at
 * the other that takes ink as the page is read. Everything between them is
 * set at 11px so the name below has nothing to compete with.
 */

const EMAIL = 'mehdi.ouladkhlie@outlook.be';

/** A carved block with the initial knocked out, the way a real seal reads. */
const Hanko: React.FC = () => (
  <svg className="ink-nav__seal" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
    <defs>
      <mask id="hanko-cut">
        <rect width="40" height="40" fill="#fff" />
        <rect x="4.4" y="4.6" width="31.2" height="30.8" rx="2.6" fill="none" stroke="#000" strokeWidth="1.15" />
        <path d="M10.5 11h4.1v18h-4.1z" fill="#000" />
        <path d="M25.4 11h4.1v18h-4.1z" fill="#000" />
        <path d="M14.6 11h3.6L20 14.6 21.8 11h3.6v5.1L21.9 24.4h-3.8L14.6 16.1z" fill="#000" />
      </mask>
    </defs>
    {/* Cut by hand, so no two corners agree. */}
    <path
      d="M5.2 1.6C14 .9 27 1 35.2 1.9c3.2.4 3.7 1.5 3.8 4.2.2 8.9.1 20.9-.6 28.5-.3 3-1.2 3.7-4.1 3.9-9.3.6-21.3.5-28.9-.2-3.1-.3-4-1.1-4.2-4.1C.8 25 .9 13 1.5 5.4 1.7 2.6 2.4 1.9 5.2 1.6Z"
      fill="var(--hanko)"
      mask="url(#hanko-cut)"
    />
  </svg>
);

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

const ENSO_SHAPE = ensoShape();
const ENSO_SPINE = ensoSpine();

/**
 * Empty at the top of the page and full at the bottom. The pale ring is the
 * circle waiting to be drawn; the mask lets ink into it in step with the
 * scroll, the same brush-and-mask idea the name is built on.
 */
const Enso: React.FC<{ progress: number }> = ({ progress }) => {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, '');

  return (
    <svg className="ink-enso" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
      <defs>
        <mask id={`enso-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="44">
          <path
            d={ENSO_SPINE}
            fill="none"
            stroke="#fff"
            strokeWidth="5"
            strokeLinecap="round"
            pathLength={1000}
            strokeDasharray={1000}
            strokeDashoffset={1000 - Math.round(progress * 1000)}
          />
        </mask>
      </defs>
      <path d={ENSO_SHAPE} fill="rgb(28 27 25 / 0.14)" />
      <path d={ENSO_SHAPE} fill="var(--sumi)" mask={`url(#enso-${id})`} />
    </svg>
  );
};

const InkNav = React.forwardRef<HTMLElement>((_props, ref) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    let frame = 0;
    /* Reading scrollHeight forces layout, so it is measured when it can
       actually change rather than on every scroll frame. */
    let scrollable = 0;

    const measure = () => {
      scrollable = document.documentElement.scrollHeight - window.innerHeight;
    };

    const update = () => {
      frame = 0;
      setProgress(scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav ref={ref} className="ink-nav" aria-label="Primary">
      <a
        className="ink-nav__sealLink"
        href="#/ink"
        aria-label="Mehdi Oulad Khlie — home"
        onClick={(event) => {
          event.preventDefault();
          scrollToId('ink-top');
        }}
      >
        <Hanko />
      </a>

      <div className="ink-nav__right">
        <div className="ink-nav__links">
          <button type="button" className="ink-cap ink-nav__link" onClick={() => scrollToId('ink-about')}>
            About
          </button>
          <button type="button" className="ink-cap ink-nav__link" onClick={() => scrollToId('ink-work')}>
            Work
          </button>
          <a className="ink-cap ink-nav__link" href={`mailto:${EMAIL}`}>
            Contact
          </a>
        </div>

        <Enso progress={progress} />
      </div>
    </nav>
  );
});

InkNav.displayName = 'InkNav';

export default InkNav;

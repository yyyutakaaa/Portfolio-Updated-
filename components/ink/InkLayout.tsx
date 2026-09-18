import React from 'react';
import InkNav from './InkNav';
import InkCursor from './InkCursor';
import { useLanguage } from '../../contexts/LanguageContext';
import { inkContent } from '../../utils/inkContent';
import '../../src/ink.css';

/**
 * The paper every sumi-e page is laid on: ground, grain, nav, cursor, footer —
 * and the dusk that falls as the page is read.
 *
 * The page darkens with scroll the way a sheet does as more ink goes onto it.
 * The ground itself never changes colour; a fixed layer of ink sits over it
 * and only its opacity moves, so the whole effect is one compositor property
 * per frame. The text palette cannot fade continuously without passing
 * through grey-on-grey, so it steps instead — paper, dusk, night — and each
 * step is picked so that everything stays readable against the ground it is
 * paired with.
 */

export type InkTone = 'paper' | 'dusk' | 'night';

interface InkShell {
  /** The fixed nav, for pages whose intro brings it in. */
  navRef: React.RefObject<HTMLElement>;
}

const InkShellContext = React.createContext<InkShell | null>(null);

export const useInkShell = () => {
  const shell = React.useContext(InkShellContext);
  if (!shell) throw new Error('useInkShell must be used inside InkLayout');
  return shell;
};

/**
 * Darkness for a given reading position. Gentle for most of the page — enough
 * to feel the light going — then a short, steep fall into night over the last
 * stretch, so the page never lingers in the mid-greys where neither dark nor
 * light text reads well.
 */
const DUSK_END = 0.7;
const NIGHT_START = 0.9;
const DUSK_DEPTH = 0.15;
const NIGHT_DEPTH = 0.93;

export const darknessAt = (p: number) => {
  if (p <= DUSK_END) return (p / DUSK_END) * DUSK_DEPTH;
  if (p >= NIGHT_START) return NIGHT_DEPTH;
  const t = (p - DUSK_END) / (NIGHT_START - DUSK_END);
  // Eased both ends, so neither the start nor the end of the fall is a corner.
  const eased = t * t * (3 - 2 * t);
  return DUSK_DEPTH + eased * (NIGHT_DEPTH - DUSK_DEPTH);
};

/* The text palette flips at the midpoint of the fall, where the ground is as
   far from both palettes as it is going to get and the flip is shortest. */
const toneAt = (darkness: number): InkTone => {
  if (darkness >= (DUSK_DEPTH + NIGHT_DEPTH) / 2) return 'night';
  if (darkness >= DUSK_DEPTH * 0.45) return 'dusk';
  return 'paper';
};

const InkLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const copy = inkContent[language];

  const rootRef = React.useRef<HTMLDivElement>(null);
  const nightRef = React.useRef<HTMLDivElement>(null);
  const navRef = React.useRef<HTMLElement>(null);
  const shell = React.useMemo(() => ({ navRef }), []);

  /* The previous shell themes <html>; claim the ground while this is mounted. */
  React.useEffect(() => {
    document.documentElement.classList.add('ink-mode');
    return () => document.documentElement.classList.remove('ink-mode');
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;
    const night = nightRef.current;
    if (!root || !night) return;

    let frame = 0;
    let scrollable = 0;
    let tone: InkTone | null = null;

    const measure = () => {
      scrollable = document.documentElement.scrollHeight - window.innerHeight;
    };

    const update = () => {
      frame = 0;
      const progress = scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0;
      const darkness = darknessAt(progress);

      night.style.opacity = darkness.toFixed(3);
      /* The nav is its own sheet laid over the page, so it takes the same ink
         or it would read as a pale band across a dark page. */
      const shade = navRef.current?.querySelector<HTMLElement>('.ink-nav__shade');
      if (shade) shade.style.opacity = darkness.toFixed(3);

      const next = toneAt(darkness);
      if (next !== tone) {
        tone = next;
        root.dataset.tone = next;
        document.documentElement.dataset.inkTone = next;
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    /* Images, webfonts and route content all land after mount and change how
       long the page is, which changes where every tone falls. */
    const observer = new ResizeObserver(onResize);
    observer.observe(document.body);

    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (frame) window.cancelAnimationFrame(frame);
      delete document.documentElement.dataset.inkTone;
    };
  }, []);

  return (
    <InkShellContext.Provider value={shell}>
      <div className="ink-root" id="ink-top" ref={rootRef} data-tone="paper">
        <div className="ink-tone" aria-hidden="true" />
        <div className="ink-night" ref={nightRef} aria-hidden="true" />
        <div className="ink-grain" aria-hidden="true" />

        <InkNav ref={navRef} />
        <InkCursor />

        <main>{children}</main>

        <footer className="ink-pagefoot">
          <div className="ink-shell">
            <p className="ink-cap">
              {copy.footer.name} — {copy.footer.place} · {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </InkShellContext.Provider>
  );
};

export default InkLayout;

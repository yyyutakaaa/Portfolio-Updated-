import React from 'react';
import InkNav from '../components/ink/InkNav';
import InkCursor from '../components/ink/InkCursor';
import BrushName, { BrushNameHandle, PATH_UNITS } from '../components/ink/BrushName';
import { gsap, EASE, prefersReducedMotion } from '../lib/motion';
import '../src/ink.css';

/**
 * Sumi-e direction, first section.
 *
 * The intro is one gesture: a drop of ink lands on the paper, blooms, and the
 * name is brushed out of the stain it leaves. It runs once per session, ends
 * inside 2.1s, and any scroll, click or keypress cuts it short — nobody should
 * ever be made to wait through it twice.
 */

const SEEN_KEY = 'ink-intro-seen';
const RULE_WIDTH = 170;

/* Short enough to read in a glance, and the one italic word carries it. */
const LEDE_HEAD = 'The best infrastructure is the kind nobody ';
const LEDE_EM = 'notices';

const Ink: React.FC = () => {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const navRef = React.useRef<HTMLElement>(null);
  const rulesRef = React.useRef<HTMLDivElement>(null);
  const eyebrowRef = React.useRef<HTMLParagraphElement>(null);
  const tailRef = React.useRef<HTMLDivElement>(null);
  const ruleClipRef = React.useRef<SVGRectElement>(null);
  const footRef = React.useRef<HTMLDivElement>(null);

  const timelineRef = React.useRef<gsap.core.Timeline | null>(null);
  const builtRef = React.useRef(false);

  /* Decided once, before anything paints: a replay on every route change or
     reload would turn the best part of the page into the most tiring one. */
  const introRef = React.useRef<boolean | null>(null);
  if (introRef.current === null) {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(SEEN_KEY) === '1';
    } catch {
      // Private mode: the intro simply plays.
    }
    introRef.current = !seen && !prefersReducedMotion();
  }

  const frayedRef = React.useRef<boolean | null>(null);
  if (frayedRef.current === null) {
    /* Turbulence is re-rasterised on every frame of the sweep, which is a poor
       trade on a phone. Small screens get the same choreography, clean-edged. */
    frayedRef.current =
      !prefersReducedMotion() && window.matchMedia('(min-width: 720px)').matches;
  }

  /* The page is themed by the shell elsewhere; claim the ground while mounted. */
  React.useEffect(() => {
    document.documentElement.classList.add('ink-mode');
    return () => document.documentElement.classList.remove('ink-mode');
  }, []);

  /* Hide the pieces the intro is going to bring in, before first paint, so
     there is never a frame where the finished state shows and then vanishes. */
  React.useLayoutEffect(() => {
    if (!introRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set([eyebrowRef.current, tailRef.current, navRef.current, footRef.current], {
        autoAlpha: 0,
      });
      gsap.set(tailRef.current, { y: 14 });
      gsap.set(eyebrowRef.current, { y: 10 });
      gsap.set(rulesRef.current, { scaleY: 0, autoAlpha: 0, transformOrigin: 'top center' });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleName = React.useCallback((name: BrushNameHandle) => {
    if (builtRef.current) return;
    builtRef.current = true;

    const strokes = name.lines.flatMap((line) => line.strokes);

    /* No intro: land on the finished painting directly. */
    if (!introRef.current) {
      gsap.set(strokes, { strokeDashoffset: 0 });
      gsap.set(name.wash, { opacity: 0.5 });
      gsap.set(ruleClipRef.current, { attr: { width: RULE_WIDTH } });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: EASE.soft } });
    timelineRef.current = tl;

    // The drop falls and lands.
    tl.fromTo(
      name.drop,
      { opacity: 0, scale: 0.15, y: -30 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power2.in' },
      0,
    );

    // It opens into the paper: fast at the moment of contact, then slowing as
    // the fibres take the ink, then spreading itself to nothing.
    tl.fromTo(name.bloom, { opacity: 0, scale: 0.1 }, { opacity: 1, scale: 1, duration: 0.2, ease: 'power2.out' }, 0.22);
    tl.to(name.drop, { opacity: 0, scale: 2.4, duration: 0.34, ease: 'power2.out' }, 0.26);
    tl.to(name.bloom, { scale: 2.4, opacity: 0, duration: 0.66, ease: 'power2.out' }, 0.4);

    // What the bloom leaves behind stays for good — the name sits in its stain.
    tl.fromTo(name.wash, { opacity: 0, scale: 0.5 }, { opacity: 0.55, scale: 1, duration: 1.05 }, 0.3);

    // The brush crosses each line, second pass chasing the first.
    name.lines.forEach((line, i) => {
      tl.fromTo(
        line.strokes,
        { strokeDashoffset: PATH_UNITS },
        { strokeDashoffset: 0, duration: 0.66, ease: 'power2.out', stagger: 0.08 },
        0.46 + i * 0.27,
      );
    });

    // The paper gets its rules, like a scroll unrolling.
    tl.to(rulesRef.current, { scaleY: 1, autoAlpha: 1, duration: 1.1, ease: 'power3.out' }, 0.86);

    // Then the reading matter, in the order it should be read.
    tl.to(ruleClipRef.current, { attr: { width: RULE_WIDTH }, duration: 0.55 }, 0.98);
    tl.to(eyebrowRef.current, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.0);
    tl.to(tailRef.current, { autoAlpha: 1, y: 0, duration: 0.85 }, 1.16);
    tl.to([navRef.current, footRef.current], { autoAlpha: 1, duration: 0.7 }, 1.3);

    try {
      window.sessionStorage.setItem(SEEN_KEY, '1');
    } catch {
      // Nothing to do — it just plays again next time.
    }
  }, []);

  /* Any intent to get on with it ends the intro. Not a hard cut: it runs out
     fast enough to feel like a decision rather than a glitch. */
  React.useEffect(() => {
    if (!introRef.current) return;

    const skip = () => {
      const tl = timelineRef.current;
      if (tl && tl.isActive() && tl.timeScale() < 4) tl.timeScale(4);
    };

    const events: (keyof WindowEventMap)[] = ['wheel', 'touchstart', 'pointerdown', 'keydown'];
    events.forEach((type) => window.addEventListener(type, skip, { passive: true }));

    /* Whatever happens — a failed font, a thrown build — the page is readable
       well before anyone could have finished reading it. */
    const guard = window.setTimeout(() => {
      const tl = timelineRef.current;
      if (tl) {
        tl.progress(1);
      } else if (rootRef.current) {
        gsap.set(
          [eyebrowRef.current, tailRef.current, navRef.current, footRef.current, rulesRef.current],
          { autoAlpha: 1, y: 0, scaleY: 1 },
        );
      }
    }, 3400);

    return () => {
      events.forEach((type) => window.removeEventListener(type, skip));
      window.clearTimeout(guard);
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, []);

  return (
    <div className="ink-root" id="ink-top" ref={rootRef}>
      <div className="ink-tone" aria-hidden="true" />
      <div className="ink-grain" aria-hidden="true" />

      <InkNav ref={navRef} />
      <InkCursor />

      <header className="ink-hero">
        <div className="ink-rules" ref={rulesRef} aria-hidden="true">
          <div className="ink-rules__inner ink-grid">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} />
            ))}
          </div>
        </div>

        <div className="ink-hero__shell">
          <div className="ink-hero__body">
            <div className="ink-grid">
              <p className="ink-cap ink-eyebrow" ref={eyebrowRef}>
                System &amp; network administrator
              </p>

              {/* The painting is the artwork of the heading; the heading's own
                  text is what gets read. */}
              <h1 className="ink-name">
                <span className="ink-sr">Mehdi Oulad Khlie</span>
                <span className="ink-name__art" aria-hidden="true">
                  <BrushName onReady={handleName} frayed={frayedRef.current ?? true} />
                </span>
              </h1>

              <div className="ink-tail" ref={tailRef}>
                {/* One brush stroke doing the work of a horizontal rule. */}
                <svg className="ink-brushrule" viewBox="0 0 170 10" aria-hidden="true" focusable="false">
                  <defs>
                    <clipPath id="ink-rule-clip">
                      <rect ref={ruleClipRef} x="0" y="0" width="0" height="10" />
                    </clipPath>
                  </defs>
                  <path
                    clipPath="url(#ink-rule-clip)"
                    d="M2 3C30 1.4 92 1.9 168 4.3 96 5.6 40 7.2 2 8.6 1.2 7 1.2 4.6 2 3Z"
                  />
                </svg>

                <p className="ink-lede">
                  {LEDE_HEAD}
                  <em>{LEDE_EM}</em>.
                </p>
              </div>
            </div>
          </div>

          <div className="ink-foot" ref={footRef}>
            <div className="ink-foot__meta">
              <span className="ink-cap">Evergem, BE</span>
              <span className="ink-foot__sep" aria-hidden="true" />
              <span className="ink-cap">Open to work</span>
            </div>

            <div className="ink-scroll" aria-hidden="true">
              <span className="ink-scroll__track">
                <span className="ink-scroll__bead" />
              </span>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Ink;

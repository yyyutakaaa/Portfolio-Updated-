import React from 'react';
import InkNav from '../components/ink/InkNav';
import InkCursor from '../components/ink/InkCursor';
import InkReveal from '../components/ink/InkReveal';
import InkPortrait from '../components/ink/InkPortrait';
import BrushDivider from '../components/ink/BrushDivider';
import WorkBlock from '../components/ink/WorkBlock';
import HankoStamp from '../components/ink/HankoStamp';
import BrushName, { BrushNameHandle, PATH_UNITS } from '../components/ink/BrushName';
import { scrollToId } from '../components/motion/SmoothScroll';
import { useLanguage } from '../contexts/LanguageContext';
import { inkContent } from '../utils/inkContent';
import { gsap, ScrollTrigger, EASE, prefersReducedMotion } from '../lib/motion';
import '../src/ink.css';

/**
 * The sumi-e site.
 *
 * The intro is one gesture: a drop of ink lands on the paper, blooms, and the
 * name is brushed out of the stain it leaves. It runs once per session, ends
 * inside 2.1s, and any scroll, click or keypress cuts it short — nobody should
 * ever be made to wait through it twice.
 *
 * Below it the page is ordinary scrolling, deliberately: Lenis smooths the
 * wheel and nothing else. No section holds the scroll and none of them snap, so
 * a recruiter with thirty seconds can get from the name to the email address
 * without the page ever taking the wheel out of their hands.
 */

const SEEN_KEY = 'ink-intro-seen';

/** Section label plus its serif line — the same opening for all three. */
const SectionHead: React.FC<{ id: string; label: string; heading: string }> = ({
  id,
  label,
  heading,
}) => (
  <InkReveal className="ink-section__head ink-grid" stagger={0.09}>
    <p className="ink-cap ink-section__label">{label}</p>
    <h2 className="ink-section__heading" id={id}>
      {heading}
    </h2>
  </InkReveal>
);

const Ink: React.FC = () => {
  const { language } = useLanguage();
  const copy = inkContent[language];

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

  /* The previous shell themes the page; claim the ground while this is mounted. */
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
      gsap.set(ruleClipRef.current, { scaleX: 0, transformOrigin: 'left center' });
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
      gsap.set(ruleClipRef.current, { scaleX: 1 });
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
    tl.to(ruleClipRef.current, { scaleX: 1, duration: 0.55 }, 0.98);
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
        gsap.set(ruleClipRef.current, { scaleX: 1 });
      }
    }, 3400);

    return () => {
      events.forEach((type) => window.removeEventListener(type, skip));
      window.clearTimeout(guard);
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, []);

  /* Switching language rewrites most of the copy, and the Dutch runs longer
     than the English. Triggers measured against the old heights would fire in
     the wrong places. */
  React.useEffect(() => {
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 140);
    return () => window.clearTimeout(id);
  }, [language]);

  return (
    <div className="ink-root" id="ink-top" ref={rootRef}>
      <div className="ink-tone" aria-hidden="true" />
      <div className="ink-grain" aria-hidden="true" />

      <InkNav ref={navRef} />
      <InkCursor />

      <main>
        {/* --------------------------------------------------------- hero -- */}
        <header className="ink-hero">
          <div className="ink-rules" ref={rulesRef} aria-hidden="true">
            <div className="ink-rules__inner ink-grid">
              {Array.from({ length: 12 }, (_, i) => (
                <span key={i} />
              ))}
            </div>
          </div>

          <div className="ink-shell">
            <div className="ink-hero__body">
              <div className="ink-grid">
                <p className="ink-cap ink-eyebrow" ref={eyebrowRef}>
                  {copy.hero.eyebrow}
                </p>

                {/* The painting is the artwork of the heading; the heading's
                    own text is what gets read. */}
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
                        <rect ref={ruleClipRef} x="0" y="0" width="170" height="10" />
                      </clipPath>
                    </defs>
                    <path
                      clipPath="url(#ink-rule-clip)"
                      d="M2 3C30 1.4 92 1.9 168 4.3 96 5.6 40 7.2 2 8.6 1.2 7 1.2 4.6 2 3Z"
                    />
                  </svg>

                  <p className="ink-lede">
                    {copy.hero.ledeHead}
                    <em>{copy.hero.ledeEm}</em>
                    {copy.hero.ledeTail}
                  </p>
                </div>
              </div>
            </div>

            <div className="ink-foot" ref={footRef}>
              <div className="ink-foot__meta">
                <span className="ink-cap">{copy.hero.location}</span>
                <span className="ink-foot__sep" aria-hidden="true" />
                <span className="ink-cap">{copy.hero.status}</span>
              </div>

              <button
                type="button"
                className="ink-scroll"
                onClick={() => scrollToId('ink-about')}
                aria-label={copy.hero.scroll}
              >
                <span className="ink-scroll__track" aria-hidden="true">
                  <span className="ink-scroll__bead" />
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* -------------------------------------------------------- about -- */}
        <section className="ink-section" id="ink-about" aria-labelledby="ink-about-heading">
          <div className="ink-shell">
            <BrushDivider />
            <SectionHead id="ink-about-heading" label={copy.about.label} heading={copy.about.heading} />

            <div className="ink-grid ink-about">
              <InkReveal className="ink-about__portrait">
                <InkPortrait
                  src="/portrait.jpg"
                  alt={copy.about.portraitAlt}
                  pendingLabel={copy.about.portraitPending}
                />
              </InkReveal>

              <div className="ink-about__text">
                <InkReveal stagger={0.1}>
                  {copy.about.body.map((para) => (
                    <p key={para.slice(0, 24)} className="ink-prose">
                      {para}
                    </p>
                  ))}
                </InkReveal>

                <InkReveal as="dl" className="ink-facts" stagger={0.07}>
                  {copy.about.facts.map((fact) => (
                    <div className="ink-facts__row" key={fact.key}>
                      <dt className="ink-cap">{fact.key}</dt>
                      <dd>{fact.value}</dd>
                    </div>
                  ))}
                </InkReveal>
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------------------------------------- work -- */}
        <section className="ink-section" id="ink-work" aria-labelledby="ink-work-heading">
          <div className="ink-shell">
            <BrushDivider />
            <SectionHead id="ink-work-heading" label={copy.work.label} heading={copy.work.heading} />

            <div className="ink-worklist">
              {copy.work.items.map((item) => (
                <InkReveal key={item.title} y={26}>
                  <WorkBlock item={item} />
                </InkReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------ contact -- */}
        <section className="ink-section" id="ink-contact" aria-labelledby="ink-contact-heading">
          <div className="ink-shell">
            <BrushDivider />
            <SectionHead id="ink-contact-heading" label={copy.contact.label} heading={copy.contact.heading} />

            <div className="ink-grid ink-contact">
              <InkReveal className="ink-contact__stamp">
                <HankoStamp
                  email={copy.contact.email}
                  label={copy.contact.stamp}
                  ariaLabel={copy.contact.stampAria}
                />
              </InkReveal>

              <InkReveal className="ink-contact__details" stagger={0.09}>
                <p className="ink-prose">{copy.contact.line}</p>

                <a className="ink-contact__email" href={`mailto:${copy.contact.email}`}>
                  {copy.contact.email}
                </a>

                <ul className="ink-contact__links">
                  {copy.contact.links.map((link) => (
                    <li key={link.label}>
                      <a
                        className="ink-cap ink-nav__link"
                        href={link.href}
                        {...(link.href.startsWith('http')
                          ? { target: '_blank', rel: 'noreferrer noopener' }
                          : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </InkReveal>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- footer -- */}
        <footer className="ink-pagefoot">
          <div className="ink-shell">
            <p className="ink-cap">
              {copy.footer.name} — {copy.footer.place} · {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Ink;

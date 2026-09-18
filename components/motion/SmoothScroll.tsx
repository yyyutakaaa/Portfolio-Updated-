import React from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, REDUCED_MOTION_QUERY, markMotionReady } from '../../lib/motion';

/**
 * Drives page scroll through Lenis and keeps ScrollTrigger in step with it.
 * Under prefers-reduced-motion the whole thing is skipped and the browser's
 * own scrolling takes over untouched.
 */
/**
 * The live instance, or null when Lenis is off (reduced motion). Route changes
 * need it to reset the scroll position without fighting the interpolator.
 */
export const lenisRef: { current: Lenis | null } = { current: null };

/** Jumps to the top in whichever scroll mode is currently active. */
export const scrollToTop = () => {
  if (lenisRef.current) {
    lenisRef.current.scrollTo(0, { immediate: true, force: true });
  } else {
    window.scrollTo(0, 0);
  }
};

/**
 * Scrolls to an element by id. Plain `href="#work"` anchors are off limits here
 * because HashRouter owns the fragment — following one would navigate.
 *
 * The offset clears the fixed nav, measured rather than assumed: the sumi-e
 * header and the previous shell's are different heights, and both grow with
 * the viewport.
 */
export const scrollToId = (id: string, offset?: number) => {
  const target = document.getElementById(id);
  if (!target) return;

  /* Lenis and `scrollIntoView` both honour `scroll-margin-top`, so a section
     that sets one has already said how much room it wants; adding a nav offset
     on top of that lands it a nav-height too low. Sections that set none fall
     back to the measured header. */
  const margin = parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0;
  const nav = document.querySelector('.ink-nav, header[class*="nav"]');
  const clearance =
    offset ?? (margin > 0 ? 0 : -((nav?.getBoundingClientRect().height ?? 80) + 16));

  if (lenisRef.current) {
    lenisRef.current.scrollTo(target, { offset: clearance });
    return;
  }

  /* Native path: reduced motion, or Lenis off. `scroll-margin-top` on the
     section does the same job for the browser's own scrolling. */
  target.scrollIntoView({
    behavior: window.matchMedia(REDUCED_MOTION_QUERY).matches ? 'auto' : 'smooth',
    block: 'start',
  });
};

const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  React.useEffect(() => {
    markMotionReady();

    const media = window.matchMedia(REDUCED_MOTION_QUERY);
    let lenis: Lenis | null = null;

    const start = () => {
      if (lenis || media.matches) return;

      /* `lerp` and `duration` are alternative modes and Lenis takes lerp when
         both are given, so only lerp is set. 0.08 is a long, ink-like settle —
         slow enough to feel weighted, short of the floaty 0.05 range. */
      lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        // Native scrolling on touch feels better than an interpolated one.
        syncTouch: false,
      });

      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      lenisRef.current = lenis;
    };

    const stop = () => {
      if (!lenis) return;
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenis = null;
      lenisRef.current = null;
    };

    function tick(time: number) {
      lenis?.raf(time * 1000);
    }

    const onPreferenceChange = () => (media.matches ? stop() : start());

    start();
    media.addEventListener('change', onPreferenceChange);

    return () => {
      media.removeEventListener('change', onPreferenceChange);
      stop();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;

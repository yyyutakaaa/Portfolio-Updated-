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
 */
export const scrollToId = (id: string) => {
  const target = document.getElementById(id);
  if (!target) return;

  if (lenisRef.current) {
    lenisRef.current.scrollTo(target, { offset: -90 });
    return;
  }

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

      lenis = new Lenis({
        duration: 1.05,
        lerp: 0.1,
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

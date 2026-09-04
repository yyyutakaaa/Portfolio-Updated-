import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * `ignoreMobileResize` keeps the collapsing mobile URL bar from triggering a
 * full refresh of every trigger mid-scroll, and `limitCallbacks` stops
 * enter/leave callbacks from firing twice around a boundary. Both are pure
 * scheduling — no trigger changes position or timing.
 */
ScrollTrigger.config({ ignoreMobileResize: true, limitCallbacks: true });

/**
 * Every animated element renders in its resting state until this class is
 * set, so a JS failure or a slow chunk can never leave content invisible.
 */
export const markMotionReady = () => {
  document.documentElement.classList.add('motion-ready');
};

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia(REDUCED_MOTION_QUERY).matches;

/** Shared easing vocabulary so every surface decelerates the same way. */
export const EASE = {
  out: 'expo.out',
  soft: 'power3.out',
  inOut: 'power2.inOut',
} as const;

export { gsap, ScrollTrigger, SplitText };

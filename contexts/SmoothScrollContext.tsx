import React, { createContext, useContext, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from 'framer-motion';

interface ScrollToOptions {
  offset?: number;
  duration?: number;
  immediate?: boolean;
}

interface SmoothScrollContextType {
  scrollTo: (target: string | HTMLElement | number, options?: ScrollToOptions) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType | undefined>(undefined);

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3.2),
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [prefersReducedMotion]);

  const scrollTo = React.useCallback((target: string | HTMLElement | number, options: ScrollToOptions = {}) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target as any, {
        offset: options.offset ?? 0,
        duration: options.immediate ? 0 : options.duration ?? 1.15,
        immediate: options.immediate,
      });
      return;
    }

    // Reduced motion / no-Lenis fallback.
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: options.immediate ? 'auto' : 'smooth' });
      return;
    }

    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el instanceof HTMLElement) {
      const top = el.getBoundingClientRect().top + window.scrollY + (options.offset ?? 0);
      window.scrollTo({ top, behavior: options.immediate ? 'auto' : 'smooth' });
    }
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

export const useSmoothScroll = () => {
  const context = useContext(SmoothScrollContext);
  if (context === undefined) {
    throw new Error('useSmoothScroll must be used within a SmoothScrollProvider');
  }
  return context;
};

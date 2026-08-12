import { useCallback, useEffect, useRef, useState } from 'react';

/** Respecteert de systeeminstelling én wijzigingen daarin tijdens de sessie. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    setMatches(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/**
 * Zet `is-in` op het element zodra het in beeld komt. Eén keer, geen terugval —
 * tekst die opnieuw verdwijnt bij omhoogscrollen leest als een storing.
 */
export function useInView<T extends HTMLElement>(rootMargin = '0px 0px -12% 0px') {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { rootMargin, threshold: 0.08 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView } as const;
}

/** Welke sectie het meest in beeld staat — voor de navigatie en de statusregel. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (targets.length === 0) return;

    const ratios = new Map<string, number>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best = '';
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best) setActive(best);
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.9] },
    );

    for (const el of targets) io.observe(el);
    return () => io.disconnect();
  }, [ids]);

  return active;
}

export interface Viewport {
  w: number;
  h: number;
}

/** Viewportmaat, ontdaan van ruis: alleen echte wijzigingen triggeren werk. */
export function useViewport(debounce = 160): Viewport {
  const [size, setSize] = useState<Viewport>(() => ({
    w: typeof window === 'undefined' ? 1440 : window.innerWidth,
    h: typeof window === 'undefined' ? 900 : window.innerHeight,
  }));

  useEffect(() => {
    let timer: number | undefined;

    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setSize((prev) => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          // Alleen de hoogte die verandert door de adresbalk op mobiel negeren.
          if (prev.w === w && Math.abs(prev.h - h) < 90) return prev;
          return { w, h };
        });
      }, debounce);
    };

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, [debounce]);

  return size;
}

/** Minimale hash-routing: de privacyverklaring blijft op haar bestaande URL. */
export function useHashRoute(): string {
  const [hash, setHash] = useState(() =>
    typeof window === 'undefined' ? '' : window.location.hash.replace(/^#\/?/, ''),
  );

  useEffect(() => {
    const onHash = () => setHash(window.location.hash.replace(/^#\/?/, ''));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return hash;
}

/** Kopieert naar het klembord en meldt kort dat het gelukt is. */
export function useCopy(resetAfter = 2200) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setCopied(false), resetAfter);
        return true;
      } catch {
        return false;
      }
    },
    [resetAfter],
  );

  return { copied, copy } as const;
}

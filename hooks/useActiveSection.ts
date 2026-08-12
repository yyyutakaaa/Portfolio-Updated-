import { useEffect, useState } from 'react';

/**
 * Tracks which section id is currently most visible in the viewport.
 * Used to drive the nav's active-section indicator on the long-scroll home page.
 */
export const useActiveSection = (ids: string[], rootMargin = '-40% 0px -55% 0px') => {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window) || ids.length === 0) {
      return;
    }

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      return;
    }

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        });

        if (visible.size > 0) {
          const [topId] = [...visible.entries()].sort((a, b) => b[1] - a[1])[0];
          setActiveId(topId);
        }
      },
      { rootMargin, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin]);

  return activeId;
};

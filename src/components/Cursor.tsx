import { useEffect, useRef, useState } from 'react';
import { useMediaQuery, useReducedMotion } from '../lib/hooks';

const MAGNET_SELECTOR = 'a[href], button, summary, [data-magnetic]';

type Mode = 'dot' | 'link' | 'label';

/**
 * De cursor is zelf een knooppunt. Hij wordt aangetrokken door links en
 * groeit bij een case uit tot een label. Dit bestaat omdat de bezoeker
 * daarmee zelf een node in het netwerk wordt in plaats van een toeschouwer.
 */
export default function Cursor() {
  const fine = useMediaQuery('(pointer: fine) and (hover: hover)');
  const reduced = useReducedMotion();
  const enabled = fine && !reduced;

  const elRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<Mode>('dot');
  const [label, setLabel] = useState('');
  // De pagina is voorgerenderd zonder cursor; pas ná hydratatie verschijnt hij.
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!enabled) return;

    const el = elRef.current;
    if (!el) return;

    document.body.dataset.cursor = 'on';

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...mouse };
    let magnet: HTMLElement | null = null;
    let visible = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) {
        visible = true;
        pos.x = e.clientX;
        pos.y = e.clientY;
        el.dataset.hidden = 'false';
      }
    };

    const onLeave = () => {
      visible = false;
      el.dataset.hidden = 'true';
    };

    const onOver = (e: MouseEvent) => {
      const target =
        (e.target as HTMLElement | null)?.closest<HTMLElement>(MAGNET_SELECTOR) ?? null;
      if (target === magnet) return;
      magnet = target;

      if (!target) {
        setMode('dot');
        setLabel('');
        return;
      }

      const custom = target.dataset.cursorLabel;
      if (custom) {
        setLabel(custom);
        setMode('label');
      } else {
        setLabel('');
        setMode('link');
      }
    };

    const loop = () => {
      let tx = mouse.x;
      let ty = mouse.y;

      // Magnetisch: de cursor zoekt het midden van waar hij overheen zweeft.
      if (magnet && magnet.isConnected) {
        const r = magnet.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const pull = r.width > 420 ? 0.18 : 0.42;
        tx += (cx - tx) * pull;
        ty += (cy - ty) * pull;
      }

      pos.x += (tx - pos.x) * 0.19;
      pos.y += (ty - pos.y) * 0.19;

      el.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    window.addEventListener('blur', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onLeave);
      delete document.body.dataset.cursor;
    };
  }, [enabled]);

  if (!enabled || !mounted) return null;

  return (
    <div ref={elRef} className="cursor" data-mode={mode} data-hidden="true" aria-hidden="true">
      <span className="cursor__label">{label}</span>
    </div>
  );
}

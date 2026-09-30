import React from 'react';
import { REDUCED_MOTION_QUERY } from '../../lib/motion';

/**
 * A drop of ink instead of an arrow.
 *
 * The dot tracks the pointer with a touch of lag so it settles rather than
 * snaps. Speed is the only thing that summons the trail: move slowly and
 * nothing is left behind at all, move quickly and the brush lays down a thin
 * tapered line that is gone within 600ms. The point is that the effect is
 * invisible while you are reading and only appears while you are travelling.
 *
 * Off entirely for coarse pointers and for anyone who asked for less motion.
 */

/** How long a sample stays on the paper. */
const LIFE = 600;
/** Below this speed (px per frame) the brush is lifted and leaves no mark. */
const SPEED_FLOOR = 3.5;
const SPEED_CEIL = 26;
const MAX_WIDTH = 2.8;

interface Sample {
  x: number;
  y: number;
  t: number;
  w: number;
}

const InkCursor: React.FC = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const dotRef = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);

  React.useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const calm = window.matchMedia(REDUCED_MOTION_QUERY);

    const sync = () => setEnabled(fine.matches && !calm.matches);

    sync();
    fine.addEventListener('change', sync);
    calm.addEventListener('change', sync);

    return () => {
      fine.removeEventListener('change', sync);
      calm.removeEventListener('change', sync);
    };
  }, []);

  React.useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    const dot = dotRef.current;
    if (!canvas || !dot) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const root = document.documentElement;
    root.classList.add('ink-cursor-on');

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };
    resize();

    const samples: Sample[] = [];
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let dotX = pointerX;
    let dotY = pointerY;
    let lastT = performance.now();
    let seen = false;
    let lastWidth = 0;
    let frame = 0;

    const draw = (now: number) => {
      frame = 0;

      /* The dot lags a little, which is what makes it feel like weight rather
         than a sprite pinned to the pointer. */
      const prevX = dotX;
      const prevY = dotY;
      /* Frame-rate independent, so the lag feels the same at 60 and 120Hz. */
      const dtFrame = Math.min(Math.max(now - lastT, 1), 64);
      const follow = 1 - Math.pow(1 - 0.35, dtFrame / 16.67);
      dotX += (pointerX - dotX) * follow;
      dotY += (pointerY - dotY) * follow;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;

      /* The trail is laid down by the dot, not by the raw pointer, so the line
         always ends exactly where the circle is instead of racing ahead of it. */
      const travelled = Math.hypot(dotX - prevX, dotY - prevY);
      if (seen && travelled > 0.05) {
        const speed = (travelled / dtFrame) * 16.67;
        const target =
          Math.min(Math.max((speed - SPEED_FLOOR) / (SPEED_CEIL - SPEED_FLOOR), 0), 1) * MAX_WIDTH;
        /* Eased toward the target so the stroke swells and thins gradually. */
        lastWidth += (target - lastWidth) * 0.4;
        samples.push({ x: dotX, y: dotY, t: now, w: lastWidth });
        if (samples.length > 160) samples.shift();
      }
      lastT = now;

      while (samples.length && now - samples[0].t > LIFE) samples.shift();

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      /* Each stretch is a quadratic curve from the midpoint of one pair of
         samples to the midpoint of the next, with the sample itself as the
         control point. Joining midpoints keeps the tangent continuous, so the
         line bends through the samples instead of kinking at each one. */
      for (let i = 1; i < samples.length - 1; i += 1) {
        const prev = samples[i - 1];
        const cur = samples[i];
        const next = samples[i + 1];
        const k = 1 - (now - cur.t) / LIFE;
        if (k <= 0) continue;

        /* Squared so the tail disappears rather than dissolving evenly — wet
           ink on paper loses its edge before it loses its centre. */
        const fade = k * k;
        const width = cur.w * fade;
        if (width < 0.06) continue;

        ctx.globalAlpha = 0.62 * fade;
        ctx.lineWidth = width;
        ctx.strokeStyle = '#1c1b19';
        ctx.beginPath();
        ctx.moveTo((prev.x + cur.x) / 2, (prev.y + cur.y) / 2);
        ctx.quadraticCurveTo(cur.x, cur.y, (cur.x + next.x) / 2, (cur.y + next.y) / 2);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      const settled =
        Math.abs(pointerX - dotX) < 0.15 && Math.abs(pointerY - dotY) < 0.15;

      if (samples.length > 1 || !settled) {
        frame = window.requestAnimationFrame(draw);
      }
    };

    const wake = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const onMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!seen) {
        seen = true;
        dotX = pointerX;
        dotY = pointerY;
        dot.style.opacity = '1';
      }

      if (!frame) lastT = performance.now();
      wake();
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      const interactive = Boolean(
        target && typeof target.closest === 'function' && target.closest('a, button, [data-ink-hover]'),
      );
      dot.dataset.over = interactive ? 'true' : 'false';
    };

    const onLeave = () => {
      dot.style.opacity = '0';
    };

    const onEnter = () => {
      if (seen) dot.style.opacity = '1';
    };

    /* rAF is throttled while the tab is hidden, which would otherwise leave
       whatever was mid-fade frozen on the paper until the pointer moves again. */
    const onVisibility = () => {
      if (document.visibilityState === 'visible') return;
      samples.length = 0;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove('ink-cursor-on');
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <canvas ref={canvasRef} className="ink-trail" aria-hidden="true" />
      <div ref={dotRef} className="ink-dot" style={{ opacity: 0 }} aria-hidden="true" />
    </>
  );
};

export default InkCursor;

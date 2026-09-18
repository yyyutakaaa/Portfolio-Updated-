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
    let lastX = pointerX;
    let lastY = pointerY;
    let lastT = performance.now();
    let seen = false;
    let frame = 0;

    const draw = (now: number) => {
      frame = 0;

      /* The dot lags a little, which is what makes it feel like weight rather
         than a sprite pinned to the pointer. */
      dotX += (pointerX - dotX) * 0.35;
      dotY += (pointerY - dotY) * 0.35;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;

      while (samples.length && now - samples[0].t > LIFE) samples.shift();

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 1; i < samples.length; i += 1) {
        const a = samples[i - 1];
        const b = samples[i];
        const k = 1 - (now - b.t) / LIFE;
        if (k <= 0) continue;

        /* Squared so the tail disappears rather than dissolving evenly — wet
           ink on paper loses its edge before it loses its centre. */
        const fade = k * k;
        const width = b.w * fade;
        if (width < 0.06) continue;

        ctx.globalAlpha = 0.62 * fade;
        ctx.lineWidth = width;
        ctx.strokeStyle = '#1c1b19';
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
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
      const now = performance.now();
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (!seen) {
        seen = true;
        dotX = pointerX;
        dotY = pointerY;
        lastX = pointerX;
        lastY = pointerY;
        dot.style.opacity = '1';
      }

      /* Normalise to a 60fps frame so the trail behaves the same on any
         display refresh rate. */
      const dt = Math.max(now - lastT, 1);
      const distance = Math.hypot(pointerX - lastX, pointerY - lastY);
      const speed = (distance / dt) * 16.67;

      const drive = Math.min(
        Math.max((speed - SPEED_FLOOR) / (SPEED_CEIL - SPEED_FLOOR), 0),
        1,
      );

      samples.push({ x: pointerX, y: pointerY, t: now, w: drive * MAX_WIDTH });
      if (samples.length > 90) samples.shift();

      lastX = pointerX;
      lastY = pointerY;
      lastT = now;
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

import React from 'react';
import { prefersReducedMotion } from '../lib/motion';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  live: boolean;
}

/**
 * An abstract topology behind the hero: nodes drifting on a slow current with
 * links drawn between any pair close enough to reach each other. A handful sit
 * on the accent colour, the way a couple of hosts in a rack are always the ones
 * doing the work.
 *
 * Deliberately cheap — capped DPR, no shadows, no gradients per frame. It stops
 * rendering when scrolled out of view or when the tab is hidden, and under
 * prefers-reduced-motion it paints a single still frame and never loops.
 */
const NetworkField: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const still = prefersReducedMotion();

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let frame = 0;
    let visible = true;
    let linkDistance = 160;

    const pointer = { x: -9999, y: -9999, active: false };
    const palette = { ink: 'rgb(21,20,15)', accent: 'rgb(158,74,36)' };

    const readPalette = () => {
      const styles = window.getComputedStyle(document.documentElement);
      const ink = styles.getPropertyValue('--color-text-main-rgb').trim();
      const accent = styles.getPropertyValue('--color-accent-rgb').trim();
      if (ink) palette.ink = `rgb(${ink.replace(/\s+/g, ',')})`;
      if (accent) palette.accent = `rgb(${accent.replace(/\s+/g, ',')})`;
    };

    const seed = () => {
      const density = width < 640 ? 17 : width < 1024 ? 26 : 36;
      linkDistance = Math.min(Math.max(width, height) * 0.19, 220);

      nodes = Array.from({ length: density }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        r: Math.random() * 1.1 + 1.1,
        // Roughly one node in six carries the accent.
        live: i % 6 === 2,
      }));
    };

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;
      if (width === 0 || height === 0) return;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      seed();
      if (still) draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Links first, so nodes sit on top of their own connections.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.hypot(dx, dy);
          if (distance > linkDistance) continue;

          const strength = 1 - distance / linkDistance;
          ctx.globalAlpha = strength * 0.2;
          ctx.strokeStyle = a.live && b.live ? palette.accent : palette.ink;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        // A node lights up as the cursor approaches it.
        const near = pointer.active
          ? Math.max(0, 1 - Math.hypot(node.x - pointer.x, node.y - pointer.y) / 180)
          : 0;

        ctx.globalAlpha = (node.live ? 0.5 : 0.28) + near * 0.4;
        ctx.fillStyle = node.live ? palette.accent : palette.ink;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r + near * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const step = () => {
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Wrap rather than bounce: no visible walls in the field.
        if (node.x < -20) node.x = width + 20;
        if (node.x > width + 20) node.x = -20;
        if (node.y < -20) node.y = height + 20;
        if (node.y > height + 20) node.y = -20;
      }

      draw();
      frame = window.requestAnimationFrame(step);
    };

    const play = () => {
      if (still || frame) return;
      frame = window.requestAnimationFrame(step);
    };

    const pause = () => {
      if (!frame) return;
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const onPointerLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const onVisibility = () => (document.hidden || !visible ? pause() : play());

    readPalette();
    resize();
    play();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible && !document.hidden ? play() : pause();
    });
    intersectionObserver.observe(parent);

    // The palette flips with the theme toggle.
    const themeObserver = new MutationObserver(() => {
      readPalette();
      if (still) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    document.addEventListener('visibilitychange', onVisibility);
    parent.addEventListener('pointermove', onPointerMove);
    parent.addEventListener('pointerleave', onPointerLeave);

    return () => {
      pause();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      parent.removeEventListener('pointermove', onPointerMove);
      parent.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};

export default NetworkField;

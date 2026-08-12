import React from 'react';
import { useReducedMotion } from 'framer-motion';

interface MeshNode {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  phase: number;
  speed: number;
  amp: number;
}

/**
 * Interactive node mesh for the hero background — a nod to network topology
 * diagrams rather than generic "particles". Nodes drift slowly and brighten
 * when the pointer passes near them. Pauses off-screen, skips entirely
 * (replaced by a static dot-grid) under prefers-reduced-motion.
 */
const NetworkMesh: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();

  React.useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let nodes: MeshNode[] = [];
    let neighbors: [number, number][] = [];
    let rafId = 0;
    let time = 0;
    let pointerPos: { x: number; y: number } | null = null;

    const readVar = (name: string, fallback: string) => {
      const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return val || fallback;
    };

    const buildNodes = () => {
      const area = width * height;
      const count = Math.max(20, Math.min(60, Math.round(area / 17000)));
      nodes = Array.from({ length: count }, () => {
        const x = Math.random() * width;
        const y = Math.random() * height;
        return {
          baseX: x,
          baseY: y,
          x,
          y,
          phase: Math.random() * Math.PI * 2,
          speed: 0.5 + Math.random() * 0.6,
          amp: 5 + Math.random() * 9,
        };
      });

      neighbors = [];
      const maxDist = Math.min(width, height) * 0.26;
      for (let i = 0; i < nodes.length; i++) {
        const distances: { j: number; d: number }[] = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j) continue;
          const d = Math.hypot(nodes[i].baseX - nodes[j].baseX, nodes[i].baseY - nodes[j].baseY);
          if (d < maxDist) distances.push({ j, d });
        }
        distances.sort((a, b) => a.d - b.d);
        distances.slice(0, 2).forEach(({ j }) => {
          const pair: [number, number] = i < j ? [i, j] : [j, i];
          if (!neighbors.some(([a, b]) => a === pair[0] && b === pair[1])) {
            neighbors.push(pair);
          }
        });
      }
    };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerPos = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const handlePointerLeave = () => {
      pointerPos = null;
    };

    const draw = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      const ink = readVar('--cursor-ink', '28 26 23');
      const accent = readVar('--color-accent-rgb', '191 76 27');

      nodes.forEach((node) => {
        node.x = node.baseX + Math.sin(time * 0.008 * node.speed + node.phase) * node.amp;
        node.y = node.baseY + Math.cos(time * 0.006 * node.speed + node.phase) * node.amp;
      });

      neighbors.forEach(([a, b]) => {
        const na = nodes[a];
        const nb = nodes[b];
        const d = Math.hypot(na.x - nb.x, na.y - nb.y);
        const opacity = Math.max(0, 0.15 - d / 4200);
        if (opacity <= 0) return;
        ctx.strokeStyle = `rgba(${ink}, ${opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();
      });

      if (pointerPos) {
        const radius = Math.min(width, height) * 0.34;
        const near = nodes
          .map((node) => ({ node, d: Math.hypot(node.x - pointerPos!.x, node.y - pointerPos!.y) }))
          .filter(({ d }) => d < radius)
          .sort((a, b) => a.d - b.d)
          .slice(0, 4);

        near.forEach(({ node, d }) => {
          const strength = 1 - d / radius;
          ctx.strokeStyle = `rgba(${accent}, ${strength * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(pointerPos!.x, pointerPos!.y);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();

          ctx.fillStyle = `rgba(${accent}, ${0.35 + strength * 0.5})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2 + strength * 1.7, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      nodes.forEach((node) => {
        ctx.fillStyle = `rgba(${ink}, 0.3)`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(rafId);
        if (entry.isIntersecting) {
          rafId = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.05 },
    );
    intersectionObserver.observe(container);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      cancelAnimationFrame(rafId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div aria-hidden="true" className={`mesh-canvas mesh-canvas--static ${className}`} />;
  }

  return (
    <div ref={containerRef} aria-hidden="true" className={`mesh-canvas ${className}`}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default NetworkMesh;

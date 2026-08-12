import { useEffect, useRef } from 'react';
import {
  clamp01,
  driftSeeds,
  lerp,
  smootherstep,
  unionEdges,
  unionLabels,
  type EdgeKey,
  type GraphState,
  type LabelKey,
} from '../lib/topology';

const SVG_NS = 'http://www.w3.org/2000/svg';

interface Props {
  states: GraphState[];
  /** Volgorde van de ankers in de DOM; moet overeenkomen met `states`. */
  anchorIds: string[];
  /** Actieve groep uit de expertise-index, of null. */
  highlight: string | null;
  reduced: boolean;
}

/**
 * De vaste topologielaag. Dezelfde nodes lopen door de hele pagina; de
 * scrollpositie is de parameter waarmee ze van de ene rangschikking naar de
 * volgende interpoleren. Dit bestaat omdat het de enige visuele taal van de
 * site is: elke sectie is een andere staat van hetzelfde netwerk.
 */
export default function TopologyLayer({ states, anchorIds, highlight, reduced }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const edgeGroupRef = useRef<SVGGElement | null>(null);
  const nodeGroupRef = useRef<SVGGElement | null>(null);
  const labelGroupRef = useRef<SVGGElement | null>(null);

  const highlightRef = useRef<string | null>(highlight);
  highlightRef.current = highlight;

  useEffect(() => {
    const svg = svgRef.current;
    const edgeGroup = edgeGroupRef.current;
    const nodeGroup = nodeGroupRef.current;
    const labelGroup = labelGroupRef.current;
    if (!svg || !edgeGroup || !nodeGroup || !labelGroup || states.length < 2) return;

    const nodeCount = states[0].nodes.length;
    const seeds = driftSeeds(nodeCount);

    /* ---- pools opbouwen -------------------------------------------------- */

    const pairs: { edges: EdgeKey[]; labels: LabelKey[] }[] = [];
    for (let i = 0; i < states.length - 1; i++) {
      pairs.push({
        edges: unionEdges(states[i], states[i + 1]),
        labels: unionLabels(states[i], states[i + 1]),
      });
    }

    const maxEdges = pairs.reduce((m, p) => Math.max(m, p.edges.length), 0);
    const maxLabels = pairs.reduce((m, p) => Math.max(m, p.labels.length), 0);

    edgeGroup.replaceChildren();
    nodeGroup.replaceChildren();
    labelGroup.replaceChildren();

    const edgeEls: SVGLineElement[] = [];
    for (let i = 0; i < maxEdges; i++) {
      const line = document.createElementNS(SVG_NS, 'line');
      line.setAttribute('class', 'topology__edge');
      line.setAttribute('opacity', '0');
      edgeGroup.appendChild(line);
      edgeEls.push(line);
    }

    const nodeEls: SVGCircleElement[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const circle = document.createElementNS(SVG_NS, 'circle');
      circle.setAttribute('class', 'topology__node');
      circle.setAttribute('r', '2');
      circle.setAttribute('opacity', '0');
      nodeGroup.appendChild(circle);
      nodeEls.push(circle);
    }

    const labelEls: SVGTextElement[] = [];
    for (let i = 0; i < maxLabels; i++) {
      const text = document.createElementNS(SVG_NS, 'text');
      text.setAttribute('class', 'topology__label');
      text.setAttribute('opacity', '0');
      labelGroup.appendChild(text);
      labelEls.push(text);
    }

    /* ---- ankers ---------------------------------------------------------- */

    /**
     * Per staat één scrollvenster waarin de overgang plaatsvindt: van het
     * moment dat de sectie onderaan het scherm binnenkomt tot haar kop op
     * 42% hoogte staat. Daarna staat het diagram stil zolang je die sectie
     * leest — dat is precies wanneer je het nodig hebt.
     */
    let ranges: { start: number; end: number }[] = [];

    const measure = () => {
      const vh = window.innerHeight;
      const next: { start: number; end: number }[] = [{ start: 0, end: 1 }];

      for (let k = 1; k < anchorIds.length; k++) {
        const el = document.querySelector<HTMLElement>(`[data-topo="${anchorIds[k]}"]`);
        if (!el) {
          next.push({ start: next[k - 1].start + 2, end: next[k - 1].start + 3 });
          continue;
        }
        const top = el.getBoundingClientRect().top + window.scrollY;
        next.push({ start: top - vh, end: top - vh * 0.42 });
      }

      // Vensters moeten oplopen en elkaar niet overlappen.
      for (let k = 1; k < next.length; k++) {
        if (k > 1 && next[k].start <= next[k - 1].start) next[k].start = next[k - 1].start + 2;
        if (next[k].end <= next[k].start) next[k].end = next[k].start + 1;
      }
      for (let k = 1; k < next.length - 1; k++) {
        if (next[k].end > next[k + 1].start) {
          next[k].end = Math.max(next[k].start + 1, next[k + 1].start);
        }
      }

      ranges = next;
    };

    measure();

    /* ---- pair-cache ------------------------------------------------------ */

    let currentPair = -1;

    const applyPair = (k: number) => {
      if (k === currentPair) return;
      currentPair = k;
      const { edges, labels } = pairs[k];

      edgeEls.forEach((el, i) => {
        const e = edges[i];
        if (!e) {
          el.setAttribute('opacity', '0');
          el.setAttribute('visibility', 'hidden');
          return;
        }
        el.setAttribute('visibility', 'visible');
        el.setAttribute(
          'class',
          e.accent ? 'topology__edge topology__edge--accent' : 'topology__edge',
        );
        if (e.dashed) el.setAttribute('stroke-dasharray', '3 4');
        else el.removeAttribute('stroke-dasharray');
      });

      labelEls.forEach((el, i) => {
        const l = labels[i];
        if (!l) {
          el.setAttribute('opacity', '0');
          el.setAttribute('visibility', 'hidden');
          return;
        }
        el.setAttribute('visibility', 'visible');
        el.setAttribute(
          'class',
          l.accent ? 'topology__label topology__label--accent' : 'topology__label',
        );
        el.setAttribute('text-anchor', l.anchor);
        if (el.textContent !== l.text) el.textContent = l.text;
      });
    };

    /* ---- tekenen --------------------------------------------------------- */

    const accentBucket = new Int8Array(nodeCount).fill(-1);

    const draw = (k: number, t: number, time: number) => {
      const A = states[k];
      const B = states[k + 1];
      const { edges, labels } = pairs[k];
      const active = highlightRef.current;

      applyPair(k);

      // De contactstaat hangt aan het echte mailadres: dat is de laatste node.
      let mailX = 0;
      let mailY = 0;
      let hasMail = false;
      if (B.id === 'focus' || A.id === 'focus') {
        const target = document.querySelector<HTMLElement>('[data-topo-target="mail"]');
        if (target) {
          const r = target.getBoundingClientRect();
          mailX = r.left + r.width / 2;
          mailY = r.top + r.height / 2;
          hasMail = true;
        }
      }

      // Staten die aan een element in de pagina hangen (de tijdlijn) schuiven
      // mee, zodat ze in de ruimte vallen die de layout ervoor vrijhoudt.
      const offsetY = (state: GraphState) => {
        if (!state.followY) return 0;
        const el = document.querySelector<HTMLElement>(state.followY.selector);
        if (!el) return 0;
        const r = el.getBoundingClientRect();
        return r.top + r.height / 2 - state.followY.baseY;
      };

      const offA = offsetY(A);
      const offB = offsetY(B);

      const driftAmp = lerp(A.drift, B.drift, t) * (reduced ? 0 : 7);
      const dominant = t < 0.5 ? A : B;

      const xs = new Float32Array(nodeCount);
      const ys = new Float32Array(nodeCount);
      const ws = new Float32Array(nodeCount);

      for (let i = 0; i < nodeCount; i++) {
        const a = A.nodes[i];
        const b = B.nodes[i];

        let ax = a.x;
        let ay = a.y + offA;
        let bx = b.x;
        let by = b.y + offB;

        if (hasMail && (i === 0 || i === 1)) {
          const fx = mailX;
          const fy = i === 1 ? mailY : mailY - window.innerHeight * 0.3;
          if (A.id === 'focus') {
            ax = fx;
            ay = fy;
          }
          if (B.id === 'focus') {
            bx = fx;
            by = fy;
          }
        }

        const seed = seeds[i];
        const dx = driftAmp === 0 ? 0 : Math.sin(time * seed.speed + seed.phase) * seed.ax * driftAmp;
        const dy =
          driftAmp === 0 ? 0 : Math.cos(time * seed.speed * 0.82 + seed.phase) * seed.ay * driftAmp;

        const x = lerp(ax, bx, t) + dx;
        const y = lerp(ay, by, t) + dy;
        let w = lerp(a.w, b.w, t);
        let accent = lerp(a.accent, b.accent, t);

        // Hover op de expertise-index licht één tak op en dimt de rest.
        if (active) {
          const group = (t < 0.5 ? a.group : b.group) ?? undefined;
          if (group === active) {
            accent = 1;
            w = Math.min(1, w * 1.35 + 0.1);
          } else if (dominant.id === 'star' && w > 0.2) {
            w *= 0.32;
          }
        }

        xs[i] = x;
        ys[i] = y;
        ws[i] = w;

        const radius = lerp(a.r * A.radius, b.r * B.radius, t);
        const el = nodeEls[i];
        el.setAttribute('cx', x.toFixed(1));
        el.setAttribute('cy', y.toFixed(1));
        el.setAttribute('r', radius.toFixed(2));
        el.setAttribute('opacity', w.toFixed(3));

        const bucket = accent > 0.5 ? 1 : 0;
        if (accentBucket[i] !== bucket) {
          accentBucket[i] = bucket;
          el.setAttribute(
            'class',
            bucket ? 'topology__node topology__node--accent' : 'topology__node',
          );
        }
      }

      // Verbindingen komen ná de nodes op hun plek: eerst punten, dan lijnen.
      const inFade = smootherstep(0.28, 0.8, t);
      const outFade = 1 - smootherstep(0.05, 0.52, t);

      for (let i = 0; i < edgeEls.length; i++) {
        const e = edges[i];
        if (!e) continue;
        const el = edgeEls[i];
        let o = e.inA && e.inB ? 1 : e.inB ? inFade : outFade;
        o *= Math.min(ws[e.a], ws[e.b]);
        if (active && e.group) o *= e.group === active ? 1 : 0.3;

        el.setAttribute('x1', xs[e.a].toFixed(1));
        el.setAttribute('y1', ys[e.a].toFixed(1));
        el.setAttribute('x2', xs[e.b].toFixed(1));
        el.setAttribute('y2', ys[e.b].toFixed(1));
        el.setAttribute('opacity', o.toFixed(3));
      }

      // En de labels als laatste, wanneer het diagram al staat.
      const labelIn = smootherstep(0.62, 1, t);
      const labelOut = 1 - smootherstep(0, 0.3, t);

      for (let i = 0; i < labelEls.length; i++) {
        const l = labels[i];
        if (!l) continue;
        const el = labelEls[i];
        let o = l.inA && l.inB ? 1 : l.inB ? labelIn : labelOut;
        o *= Math.min(1, ws[l.n] * 1.4);
        if (active && l.group) o *= l.group === active ? 1 : 0.25;

        el.setAttribute('x', (xs[l.n] + l.dx).toFixed(1));
        el.setAttribute('y', (ys[l.n] + l.dy).toFixed(1));
        el.setAttribute('opacity', o.toFixed(3));
      }
    };

    /* ---- aandrijving ----------------------------------------------------- */

    const resolve = () => {
      const y = window.scrollY;
      let k = 0;
      for (let i = 1; i < ranges.length; i++) {
        if (y >= ranges[i].start) k = i;
        else break;
      }
      if (k === 0) return { k: 0, t: 0 };

      const { start, end } = ranges[k];
      const raw = clamp01((y - start) / Math.max(1, end - start));
      return { k: k - 1, t: smootherstep(0, 1, raw) };
    };

    let raf = 0;
    let running = true;

    if (reduced) {
      // Statische variant: één diagram per sectie, geen tussenbeelden.
      const paint = () => {
        const { k, t } = resolve();
        draw(k, t > 0.5 ? 1 : 0, 0);
      };
      paint();

      let ticking = false;
      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          paint();
          ticking = false;
        });
      };

      const onResize = () => {
        measure();
        paint();
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize, { passive: true });
      const ro = new ResizeObserver(onResize);
      ro.observe(document.body);

      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
        ro.disconnect();
      };
    }

    const start = performance.now();

    const loop = (now: number) => {
      if (!running) return;
      const { k, t } = resolve();
      draw(k, t, (now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    const onResize = () => measure();
    window.addEventListener('resize', onResize, { passive: true });

    // De paginahoogte verandert als een codeblok opengaat; ankers volgen mee.
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      ro.disconnect();
    };
  }, [states, anchorIds, reduced]);

  return (
    <svg ref={svgRef} className="topology" aria-hidden="true" focusable="false">
      <g ref={edgeGroupRef} />
      <g ref={nodeGroupRef} />
      <g ref={labelGroupRef} />
    </svg>
  );
}

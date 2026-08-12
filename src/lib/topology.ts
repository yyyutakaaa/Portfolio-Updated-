/**
 * Het node-graph-systeem.
 *
 * Eén verzameling nodes loopt door de hele site. Per sectie berekent dit bestand
 * een andere rangschikking van diezelfde nodes: een driftend mesh in de hero,
 * een sterschema bij de expertise-index, het werkelijke architectuurdiagram per
 * case, een tijdlijn bij het traject, en tot slot één enkele verbinding.
 *
 * Alles wordt in pixels berekend zodat diagrammen niet vervormen bij een
 * afwijkende beeldverhouding. Bij resize wordt opnieuw opgebouwd.
 */

export const NODE_COUNT_DESKTOP = 54;
export const NODE_COUNT_MOBILE = 26;

export interface GraphNode {
  x: number;
  y: number;
  /** Zichtbaarheid 0..1. Slapende nodes staan laag maar niet op nul. */
  w: number;
  /** Straalfactor, 1 = basisformaat. */
  r: number;
  /** 0 = neutraal, 1 = accentkleur. Alleen voor actieve/live nodes. */
  accent: number;
  /** Groep voor hover-interactie (expertise-index). */
  group?: string;
}

export interface GraphEdge {
  a: number;
  b: number;
  dashed?: boolean;
  accent?: boolean;
  group?: string;
}

export interface GraphLabel {
  n: number;
  text: string;
  dx: number;
  dy: number;
  anchor: 'start' | 'middle' | 'end';
  accent?: boolean;
  group?: string;
}

export interface GraphState {
  id: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  labels: GraphLabel[];
  /** Driftamplitude in pixels — alleen de hero ademt echt. */
  drift: number;
  /** Basisstraal in pixels voor deze staat. */
  radius: number;
  /**
   * Laat deze staat verticaal meebewegen met een element in de pagina, zodat
   * de tekening op de plek staat die de layout ervoor vrijhoudt.
   */
  followY?: { selector: string; baseY: number };
}

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/* ------------------------------------------------------------------ */
/* Hulpfuncties                                                        */
/* ------------------------------------------------------------------ */

/** Deterministische RNG: dezelfde seed geeft altijd hetzelfde mesh. */
function rng(seed: number) {
  let t = seed >>> 0;
  return () => {
    t = (t + 0x6d2b79f5) >>> 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

/** Grootst mogelijke vierkant binnen een rect, gecentreerd. */
function squareIn(r: Rect): Rect {
  const s = Math.min(r.w, r.h);
  return { x: r.x + (r.w - s) / 2, y: r.y + (r.h - s) / 2, w: s, h: s };
}

/**
 * De horizontale grenzen van de tekstkolom (`.shell` in de CSS).
 * De tijdlijn moet op hetzelfde grid liggen als de tekst eronder, anders
 * verraadt de tekening dat ze los van de layout staat.
 */
function shellBounds(vw: number): { left: number; right: number } {
  const pad = Math.min(Math.max(20, vw * 0.04), 72);
  const shell = Math.min(vw, 1536);
  const left = (vw - shell) / 2 + pad;
  return { left, right: vw - left };
}

/**
 * Het gebied waarin een diagram getekend wordt.
 * Desktop: de rechterhelft — de tekstkolom houdt links vrij baan.
 * Mobiel: de bovenste band; daar draait de graph als achtergrondlaag.
 */
export function panelRect(vw: number, vh: number, mobile: boolean): Rect {
  if (mobile) {
    return squareIn({ x: vw * 0.06, y: vh * 0.08, w: vw * 0.88, h: vh * 0.46 });
  }
  const box: Rect = { x: vw * 0.5, y: vh * 0.1, w: vw * 0.46, h: vh * 0.8 };
  const sq = squareIn(box);
  // Iets naar links zodat labels aan de rechterkant niet tegen de rand lopen.
  return { ...sq, x: sq.x - Math.min(24, vw * 0.015) };
}

/* ------------------------------------------------------------------ */
/* Slapende posities: het mesh waar elke node naar terugvalt            */
/* ------------------------------------------------------------------ */

interface MeshPoint {
  x: number;
  y: number;
  r: number;
  phase: number;
  speed: number;
}

export function buildMeshPoints(n: number, vw: number, vh: number): MeshPoint[] {
  const rand = rng(9182736);
  const cols = Math.max(3, Math.round(Math.sqrt((n * vw) / Math.max(vh, 1))));
  const rows = Math.ceil(n / cols);
  const cw = vw / cols;
  const ch = vh / rows;
  const pts: MeshPoint[] = [];

  for (let i = 0; i < n; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    pts.push({
      x: cw * (c + 0.5) + (rand() - 0.5) * cw * 0.78,
      y: ch * (r + 0.5) + (rand() - 0.5) * ch * 0.78,
      r: 0.55 + rand() * 0.85,
      phase: rand() * Math.PI * 2,
      speed: 0.35 + rand() * 0.5,
    });
  }
  return pts;
}

/** Drift-parameters per node; los van de layout zodat ze stabiel blijven. */
export function driftSeeds(n: number): { phase: number; speed: number; ax: number; ay: number }[] {
  const rand = rng(4471);
  return Array.from({ length: n }, () => ({
    phase: rand() * Math.PI * 2,
    speed: 0.28 + rand() * 0.42,
    ax: 0.5 + rand() * 0.9,
    ay: 0.5 + rand() * 0.9,
  }));
}

function dormant(mesh: MeshPoint[], n: number): GraphNode[] {
  return Array.from({ length: n }, (_, i) => ({
    x: mesh[i].x,
    y: mesh[i].y,
    w: 0.07,
    r: 0.7,
    accent: 0,
  }));
}

/* ------------------------------------------------------------------ */
/* 1. Mesh — hero                                                      */
/* ------------------------------------------------------------------ */

function buildMesh(mesh: MeshPoint[], n: number, vw: number, vh: number): GraphState {
  const nodes: GraphNode[] = mesh.slice(0, n).map((p) => ({
    x: p.x,
    y: p.y,
    w: 0.34 + p.r * 0.3,
    r: p.r,
    accent: 0,
  }));

  // Elke node verbindt met de twee dichtstbijzijnde buren binnen bereik.
  const reach = Math.hypot(vw, vh) * 0.15;
  const seen = new Set<string>();
  const edges: GraphEdge[] = [];

  for (let i = 0; i < n; i++) {
    const near: { j: number; d: number }[] = [];
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d < reach) near.push({ j, d });
    }
    near.sort((a, b) => a.d - b.d);
    for (const { j } of near.slice(0, 2)) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push({ a: i, b: j });
    }
  }

  return { id: 'mesh', nodes, edges, labels: [], drift: 1, radius: 2.1 };
}

/* ------------------------------------------------------------------ */
/* 2. Sterschema — expertise                                           */
/* ------------------------------------------------------------------ */

const STAR_GROUPS = ['identity', 'endpoint', 'm365', 'network', 'virt', 'automation'];

function buildStar(mesh: MeshPoint[], n: number, rect: Rect, mobile: boolean): GraphState {
  const nodes = dormant(mesh, n);
  const edges: GraphEdge[] = [];
  const labels: GraphLabel[] = [];

  const cx = rect.x + rect.w / 2;
  const cy = rect.y + rect.h / 2;
  const hubR = rect.w * 0.33;
  const leafR = rect.w * 0.13;
  const leavesPerHub = mobile ? 2 : 3;

  nodes[0] = { x: cx, y: cy, w: 1, r: 1.9, accent: 1 };
  labels.push({ n: 0, text: 'CORE', dx: 0, dy: 20, anchor: 'middle', accent: true });

  let next = 1 + STAR_GROUPS.length;

  STAR_GROUPS.forEach((group, i) => {
    const angle = (-Math.PI / 2) + (i / STAR_GROUPS.length) * Math.PI * 2;
    const hub = 1 + i;
    nodes[hub] = {
      x: cx + Math.cos(angle) * hubR,
      y: cy + Math.sin(angle) * hubR,
      w: 1,
      r: 1.35,
      accent: 0,
      group,
    };
    edges.push({ a: 0, b: hub, group });

    const onLeft = Math.cos(angle) < -0.25;
    labels.push({
      n: hub,
      text: `D-0${i + 1}`,
      dx: onLeft ? -10 : 10,
      dy: 3.5,
      anchor: onLeft ? 'end' : 'start',
      group,
    });

    for (let k = 0; k < leavesPerHub && next < n; k++) {
      const spread = 0.85;
      const la = angle + (k - (leavesPerHub - 1) / 2) * (spread / leavesPerHub) + Math.PI * 0.02;
      nodes[next] = {
        x: nodes[hub].x + Math.cos(la) * leafR,
        y: nodes[hub].y + Math.sin(la) * leafR,
        w: 0.72,
        r: 0.85,
        accent: 0,
        group,
      };
      edges.push({ a: hub, b: next, group });
      next++;
    }
  });

  return { id: 'star', nodes, edges, labels, drift: 0.14, radius: 2.4 };
}

/* ------------------------------------------------------------------ */
/* 3. Architectuurdiagrammen — per case                                */
/* ------------------------------------------------------------------ */

interface ArchNode {
  x: number;
  y: number;
  label: string;
  /** Labelpositie: onder (standaard), links, rechts of boven. */
  side?: 'below' | 'above' | 'left' | 'right';
  accent?: boolean;
  size?: number;
}

interface ArchSpec {
  id: string;
  nodes: ArchNode[];
  edges: [number, number, ('dashed' | 'accent')?][];
}

/** Coördinaten 0..1 binnen het vierkante tekengebied. */
export const ARCH: Record<string, ArchSpec> = {
  homelab: {
    id: 'homelab',
    nodes: [
      { x: 0.5, y: 0.05, label: 'WAN', side: 'right' },
      { x: 0.5, y: 0.18, label: 'OPNSENSE', side: 'right', size: 1.3 },
      { x: 0.5, y: 0.31, label: 'SW-CORE', side: 'right' },
      { x: 0.15, y: 0.45, label: 'VLAN10', side: 'above' },
      { x: 0.5, y: 0.45, label: 'VLAN20', side: 'right' },
      { x: 0.85, y: 0.45, label: 'VLAN30', side: 'above' },
      { x: 0.5, y: 0.62, label: 'HV01', side: 'left', size: 1.5, accent: true },
      { x: 0.26, y: 0.8, label: 'DC01', side: 'below' },
      { x: 0.44, y: 0.8, label: 'FS01', side: 'below' },
      { x: 0.62, y: 0.8, label: 'WSUS', side: 'below' },
      { x: 0.85, y: 0.62, label: 'WIN11', side: 'right' },
      { x: 0.15, y: 0.62, label: 'NAS', side: 'left' },
      { x: 0.26, y: 0.95, label: 'ENTRA ID', side: 'below', accent: true },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [4, 6],
      [6, 7],
      [6, 8],
      [6, 9],
      [5, 10],
      [3, 11],
      [7, 12, 'accent'],
    ],
  },

  tenant: {
    id: 'tenant',
    nodes: [
      { x: 0.5, y: 0.05, label: 'TENANT', side: 'right' },
      { x: 0.5, y: 0.2, label: 'ENTRA ID', side: 'right', size: 1.6, accent: true },
      { x: 0.11, y: 0.37, label: 'CA-01 MFA', side: 'above' },
      { x: 0.37, y: 0.37, label: 'CA-02 GEO', side: 'above' },
      { x: 0.63, y: 0.37, label: 'CA-03 DEV', side: 'above' },
      { x: 0.89, y: 0.37, label: 'CA-04 LEG', side: 'right' },
      { x: 0.5, y: 0.55, label: 'GRP-ALL', side: 'right', size: 1.3 },
      { x: 0.29, y: 0.73, label: 'DEV-01', side: 'below' },
      { x: 0.5, y: 0.73, label: 'DEV-02', side: 'below' },
      { x: 0.71, y: 0.73, label: 'DEV-03', side: 'below' },
      { x: 0.12, y: 0.6, label: 'INTUNE', side: 'left' },
      { x: 0.88, y: 0.6, label: 'EXO', side: 'right' },
      { x: 0.88, y: 0.78, label: 'SPO', side: 'right' },
      // Hangt bewust naast Entra ID en niet onder de policies: dit account
      // valt buiten élke policy, en dat moet de tekening laten zien.
      { x: 0.17, y: 0.2, label: 'BREAK-GLASS', side: 'above', accent: true },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [2, 6],
      [3, 6],
      [4, 6],
      [5, 6],
      [6, 7],
      [6, 8],
      [6, 9],
      [1, 10],
      [1, 11],
      [1, 12],
      [10, 7, 'dashed'],
      [10, 4, 'dashed'],
      [13, 1, 'accent'],
    ],
  },

  segment: {
    id: 'segment',
    nodes: [
      { x: 0.5, y: 0.05, label: 'ISP', side: 'right' },
      { x: 0.5, y: 0.2, label: 'FW-01', side: 'right', size: 1.5, accent: true },
      { x: 0.5, y: 0.36, label: 'SW-L3', side: 'right', size: 1.3 },
      { x: 0.08, y: 0.55, label: 'MGMT', side: 'above' },
      { x: 0.29, y: 0.55, label: 'CLIENT', side: 'above' },
      { x: 0.5, y: 0.55, label: 'SERVER', side: 'above' },
      { x: 0.71, y: 0.55, label: 'IOT', side: 'above' },
      { x: 0.92, y: 0.55, label: 'GUEST', side: 'above' },
      { x: 0.08, y: 0.74, label: '.10', side: 'below' },
      { x: 0.29, y: 0.74, label: '.20', side: 'below' },
      { x: 0.5, y: 0.74, label: '.30', side: 'below' },
      { x: 0.71, y: 0.74, label: '.40', side: 'below' },
      { x: 0.92, y: 0.74, label: '.99', side: 'below' },
      { x: 0.5, y: 0.93, label: 'DEFAULT DENY', side: 'below', accent: true },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
      [2, 5],
      [2, 6],
      [2, 7],
      [3, 8],
      [4, 9],
      [5, 10],
      [6, 11],
      [7, 12],
      [13, 1, 'accent'],
      [11, 13, 'dashed'],
      [12, 13, 'dashed'],
    ],
  },

  onboarding: {
    id: 'onboarding',
    nodes: [
      { x: 0.08, y: 0.44, label: 'CSV', side: 'above' },
      { x: 0.28, y: 0.44, label: 'VALIDATIE', side: 'above' },
      { x: 0.5, y: 0.44, label: 'PS 7', side: 'above', size: 1.6, accent: true },
      { x: 0.5, y: 0.16, label: 'APP-REG', side: 'right' },
      { x: 0.72, y: 0.44, label: 'GRAPH', side: 'above', size: 1.3 },
      { x: 0.93, y: 0.14, label: 'USER', side: 'right' },
      { x: 0.93, y: 0.34, label: 'LICENTIE', side: 'right' },
      { x: 0.93, y: 0.54, label: 'GROEPEN', side: 'right' },
      { x: 0.93, y: 0.74, label: 'INTUNE', side: 'right' },
      { x: 0.5, y: 0.74, label: 'LOG', side: 'below' },
      { x: 0.22, y: 0.9, label: 'RAPPORT', side: 'below' },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 4],
      [3, 2, 'dashed'],
      [4, 5],
      [4, 6],
      [4, 7],
      [4, 8],
      [2, 9],
      [9, 10],
    ],
  },
};

const LABEL_OFFSET: Record<
  NonNullable<ArchNode['side']>,
  { dx: number; dy: number; anchor: GraphLabel['anchor'] }
> = {
  below: { dx: 0, dy: 19, anchor: 'middle' },
  above: { dx: 0, dy: -13, anchor: 'middle' },
  left: { dx: -12, dy: 3.5, anchor: 'end' },
  right: { dx: 12, dy: 3.5, anchor: 'start' },
};

function buildArch(mesh: MeshPoint[], n: number, rect: Rect, spec: ArchSpec): GraphState {
  const nodes = dormant(mesh, n);
  const labels: GraphLabel[] = [];

  spec.nodes.forEach((a, i) => {
    if (i >= n) return;
    nodes[i] = {
      x: rect.x + a.x * rect.w,
      y: rect.y + a.y * rect.h,
      w: 1,
      r: a.size ?? 1.05,
      accent: a.accent ? 1 : 0,
    };
    const off = LABEL_OFFSET[a.side ?? 'below'];
    labels.push({ n: i, text: a.label, ...off, accent: a.accent });
  });

  const edges: GraphEdge[] = spec.edges
    .filter(([a, b]) => a < n && b < n)
    .map(([a, b, kind]) => ({
      a,
      b,
      dashed: kind === 'dashed',
      accent: kind === 'accent',
    }));

  return { id: spec.id, nodes, edges, labels, drift: 0.1, radius: 2.6 };
}

/* ------------------------------------------------------------------ */
/* 4. Tijdlijn — certificeringen                                       */
/* ------------------------------------------------------------------ */

interface TimelinePoint {
  label: string;
  year: string;
  done: boolean;
}

function buildTimeline(
  mesh: MeshPoint[],
  n: number,
  vw: number,
  vh: number,
  points: TimelinePoint[],
  mobile: boolean,
): GraphState {
  const nodes = dormant(mesh, n);
  const edges: GraphEdge[] = [];
  const labels: GraphLabel[] = [];

  const y = vh * 0.5;
  const { left, right } = shellBounds(vw);
  // Ruimte voor het label onder de eerste en laatste node.
  const inset = mobile ? 26 : 34;
  const from = left + inset;
  const step = (right - inset - from) / (points.length - 1 || 1);

  points.forEach((p, i) => {
    if (i >= n) return;
    nodes[i] = {
      x: from + step * i,
      y,
      w: 1,
      r: p.done ? 1.7 : 1.25,
      accent: p.done ? 1 : 0,
    };
    labels.push({ n: i, text: p.year, dx: 0, dy: -26, anchor: 'middle', accent: p.done });
    labels.push({ n: i, text: p.label, dx: 0, dy: 30, anchor: 'middle' });

    if (i > 0) {
      edges.push({ a: i - 1, b: i, dashed: !p.done, accent: p.done });
    }
  });

  return {
    id: 'timeline',
    nodes,
    edges,
    labels,
    drift: 0.06,
    radius: 2.6,
    followY: { selector: '[data-topo-target="timeline"]', baseY: y },
  };
}

/* ------------------------------------------------------------------ */
/* 5. Eén verbinding — contact                                         */
/* ------------------------------------------------------------------ */

function buildFocus(mesh: MeshPoint[], n: number, vw: number, vh: number): GraphState {
  const nodes = dormant(mesh, n);
  for (const node of nodes) node.w = 0.03;

  // Wordt in de tekenlus verschoven naar het echte mailadres in de DOM.
  nodes[0] = { x: vw * 0.5, y: vh * 0.34, w: 1, r: 1.3, accent: 0 };
  nodes[1] = { x: vw * 0.5, y: vh * 0.72, w: 1, r: 2.2, accent: 1 };

  return {
    id: 'focus',
    nodes,
    edges: [{ a: 0, b: 1, accent: true }],
    labels: [],
    drift: 0.05,
    radius: 2.8,
  };
}

/* ------------------------------------------------------------------ */
/* Opbouw van de volledige reeks                                       */
/* ------------------------------------------------------------------ */

export interface BuildOptions {
  vw: number;
  vh: number;
  mobile: boolean;
  timeline: TimelinePoint[];
  archOrder: string[];
}

export function buildStates(opts: BuildOptions): GraphState[] {
  const { vw, vh, mobile, timeline, archOrder } = opts;
  const n = mobile ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;
  const mesh = buildMeshPoints(n, vw, vh);
  const rect = panelRect(vw, vh, mobile);

  const states = [
    buildMesh(mesh, n, vw, vh),
    buildStar(mesh, n, rect, mobile),
    ...archOrder.map((id) => buildArch(mesh, n, rect, ARCH[id])),
    buildTimeline(mesh, n, vw, vh, timeline, mobile),
    buildFocus(mesh, n, vw, vh),
  ];

  // Op smalle schermen draait de graph als achtergrondlaag: geen labels, want
  // de leesbare versie van het diagram staat inline in de sectie zelf.
  if (mobile) {
    for (const state of states) state.labels = [];
  }

  return states;
}

/* ------------------------------------------------------------------ */
/* Interpolatie                                                        */
/* ------------------------------------------------------------------ */

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Vloeiend in én uit — geen zichtbare knik bij het aanhaken. */
export function smootherstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0 || 1));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

export interface EdgeKey {
  a: number;
  b: number;
  dashed: boolean;
  accent: boolean;
  group?: string;
  inA: boolean;
  inB: boolean;
}

const edgeId = (e: GraphEdge) => `${Math.min(e.a, e.b)}:${Math.max(e.a, e.b)}`;

/** Vereniging van twee edge-sets, zodat gedeelde lijnen niet dubbel tekenen. */
export function unionEdges(a: GraphState, b: GraphState): EdgeKey[] {
  const map = new Map<string, EdgeKey>();

  for (const e of a.edges) {
    map.set(edgeId(e), {
      a: e.a,
      b: e.b,
      dashed: !!e.dashed,
      accent: !!e.accent,
      group: e.group,
      inA: true,
      inB: false,
    });
  }
  for (const e of b.edges) {
    const id = edgeId(e);
    const found = map.get(id);
    if (found) {
      found.inB = true;
      found.dashed = !!e.dashed;
      found.accent = found.accent || !!e.accent;
    } else {
      map.set(id, {
        a: e.a,
        b: e.b,
        dashed: !!e.dashed,
        accent: !!e.accent,
        group: e.group,
        inA: false,
        inB: true,
      });
    }
  }
  return [...map.values()];
}

export interface LabelKey extends GraphLabel {
  inA: boolean;
  inB: boolean;
}

export function unionLabels(a: GraphState, b: GraphState): LabelKey[] {
  const map = new Map<string, LabelKey>();

  for (const l of a.labels) {
    map.set(`${l.n}:${l.text}:${l.dy}`, { ...l, inA: true, inB: false });
  }
  for (const l of b.labels) {
    const id = `${l.n}:${l.text}:${l.dy}`;
    const found = map.get(id);
    if (found) found.inB = true;
    else map.set(id, { ...l, inA: false, inB: true });
  }
  return [...map.values()];
}

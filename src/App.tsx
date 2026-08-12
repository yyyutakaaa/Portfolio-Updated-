import { useEffect, useMemo, useState } from 'react';
import { CASES, CERTS } from './lib/content';
import { buildStates } from './lib/topology';
import {
  useActiveSection,
  useHashRoute,
  useMediaQuery,
  useReducedMotion,
  useViewport,
} from './lib/hooks';
import TopologyLayer from './components/TopologyLayer';
import Cursor from './components/Cursor';
import Chrome from './components/Chrome';
import Hero from './sections/Hero';
import SystemSection from './sections/SystemSection';
import Work from './sections/Work';
import Certs from './sections/Certs';
import Contact from './sections/Contact';
import Privacy from './sections/Privacy';

/** Ankers in scrollvolgorde; moet exact overeenkomen met `buildStates`. */
const ANCHOR_IDS = ['mesh', 'star', ...CASES.map((c) => c.id), 'timeline', 'focus'];

/** DOM-secties in dezelfde volgorde, voor navigatie en statusregel. */
const SECTION_IDS = [
  'top',
  'systeem',
  ...CASES.map((c) => `case-${c.no}`),
  'traject',
  'contact',
] as const;

const PRIVACY_ROUTES = new Set(['visibility-spoofer-privacy', 'privacy']);

export default function App() {
  const route = useHashRoute();
  const isPrivacy = PRIVACY_ROUTES.has(route);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isPrivacy]);

  if (isPrivacy) {
    return (
      <>
        <Privacy />
        <div className="scanlines" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
      </>
    );
  }

  return <Home />;
}

function Home() {
  const reduced = useReducedMotion();
  const mobile = useMediaQuery('(max-width: 63.99rem)');
  const { w, h } = useViewport();
  const [highlight, setHighlight] = useState<string | null>(null);

  const active = useActiveSection(SECTION_IDS);

  const states = useMemo(
    () =>
      buildStates({
        vw: w,
        vh: h,
        mobile,
        archOrder: CASES.map((c) => c.id),
        timeline: CERTS.items.map((cert) => ({
          label: cert.code,
          year: cert.year,
          done: cert.state === 'done',
        })),
      }),
    [w, h, mobile],
  );

  const stateIndex = Math.max(0, SECTION_IDS.indexOf(active as (typeof SECTION_IDS)[number]));
  const navActive = active.startsWith('case-') ? 'werk' : active === 'top' ? '' : active;

  return (
    <>
      <a className="skip-link" href="#main">
        Naar de hoofdinhoud
      </a>

      <div className="grid-lines" aria-hidden="true" />

      <TopologyLayer
        states={states}
        anchorIds={ANCHOR_IDS}
        highlight={highlight}
        reduced={reduced}
      />

      <Chrome active={navActive} stateIndex={stateIndex} stateTotal={SECTION_IDS.length} />

      <main id="main">
        <Hero />
        <SystemSection onHighlight={setHighlight} />
        <Work />
        <Certs />
      </main>

      <Contact />

      <div className="scanlines" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Cursor />
    </>
  );
}

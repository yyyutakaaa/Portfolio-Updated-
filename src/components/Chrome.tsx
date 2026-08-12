import { useCallback, useEffect, useRef, useState } from 'react';
import { NAV_ITEMS, PERSON } from '../lib/content';
import { useReducedMotion } from '../lib/hooks';
import { Close, Menu } from './Icons';

interface Props {
  active: string;
  /** Index van de huidige topologiestaat, voor de statusregel. */
  stateIndex: number;
  stateTotal: number;
}

/**
 * Topbalk, sectienavigatie en de statusregel linksonder.
 *
 * Navigeren loopt via een korte "connecting"-staat: de statusregel meldt de
 * verbinding voordat de pagina beweegt. Dit bestaat omdat elke overgang op
 * deze site een handshake is, geen sprong.
 */
export default function Chrome({ active, stateIndex, stateTotal }: Props) {
  const reduced = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      for (const t of timers.current) window.clearTimeout(t);
    },
    [],
  );

  const go = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;

      for (const t of timers.current) window.clearTimeout(t);
      timers.current = [];

      const jump = () => {
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        // Zonder tabindex slaat de focus over de sectie heen na het scrollen.
        el.focus({ preventScroll: true });
      };

      if (reduced) {
        jump();
        return;
      }

      setBusy(true);
      setStatus(`CONNECTING → /${id}`);

      timers.current.push(
        window.setTimeout(() => {
          jump();
          setStatus(`LINK UP → /${id}`);
          setBusy(false);
        }, 420),
        window.setTimeout(() => setStatus(null), 1500),
      );
    },
    [reduced],
  );

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false);
    go(id);
  };

  /* Toetsenbord in het mobiele menu: Escape sluit, Tab blijft binnen. */
  useEffect(() => {
    if (!menuOpen) return;

    const panel = panelRef.current;
    const focusables = panel
      ? Array.from(panel.querySelectorAll<HTMLElement>('a[href], button'))
      : [];
    focusables[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const idle = `NODE ${String(stateIndex + 1).padStart(2, '0')}/${String(stateTotal).padStart(2, '0')} · ${
    active ? `/${active}` : '/'
  }`;

  return (
    <>
      <header className="topbar">
        <div className="topbar__id mono">
          <a href="#top" className="topbar__name" onClick={(e) => onNavClick(e, 'top')}>
            {PERSON.name}
          </a>
          <span className="topbar__role" aria-hidden="true">
            {PERSON.role}
          </span>
        </div>

        <nav className="topnav mono" aria-label="Secties">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="topnav__link"
              aria-current={active === item.id ? 'true' : undefined}
              onClick={(e) => onNavClick(e, item.id)}
            >
              <span className="topnav__no" aria-hidden="true">
                {item.no}
              </span>
              <span>{item.label}</span>
              <span className="topnav__dot" aria-hidden="true" />
            </a>
          ))}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle mono"
          aria-expanded={menuOpen}
          aria-controls="menu-panel"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <Close /> : <Menu />}
          <span>{menuOpen ? 'SLUIT' : 'INDEX'}</span>
        </button>
      </header>

      {menuOpen && (
        <div className="menu-panel" id="menu-panel" ref={panelRef}>
          <nav aria-label="Secties (mobiel)">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="menu-panel__item"
                onClick={(e) => onNavClick(e, item.id)}
              >
                <span className="menu-panel__no mono">{item.no}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>
      )}

      <div className="statusline mono" data-busy={busy} aria-hidden="true">
        <span className="statusline__dot" />
        <span>{status ?? idle}</span>
      </div>

      <p className="sr-only" role="status">
        {status ?? ''}
      </p>
    </>
  );
}

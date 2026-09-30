import React from 'react';
import InkNav from './InkNav';
import InkCursor from './InkCursor';
import { useLanguage } from '../../contexts/LanguageContext';
import { inkContent } from '../../utils/inkContent';
import '../../src/ink.css';

/**
 * The paper every sumi-e page is laid on: ground, grain, nav, cursor, footer.
 * Pages supply only their own content.
 */

interface InkShell {
  /** The fixed nav, for pages whose intro brings it in. */
  navRef: React.RefObject<HTMLElement>;
}

const InkShellContext = React.createContext<InkShell | null>(null);

export const useInkShell = () => {
  const shell = React.useContext(InkShellContext);
  if (!shell) throw new Error('useInkShell must be used inside InkLayout');
  return shell;
};

const InkLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const copy = inkContent[language];

  const navRef = React.useRef<HTMLElement>(null);
  const shell = React.useMemo(() => ({ navRef }), []);

  /* The page ground is claimed on <html> too, so overscroll shows paper. */
  React.useEffect(() => {
    document.documentElement.classList.add('ink-mode');
    return () => document.documentElement.classList.remove('ink-mode');
  }, []);

  return (
    <InkShellContext.Provider value={shell}>
      <div className="ink-root" id="ink-top">
        <div className="ink-tone" aria-hidden="true" />
        <div className="ink-grain" aria-hidden="true" />

        <InkNav ref={navRef} />
        <InkCursor />

        <main>{children}</main>

        <footer className="ink-pagefoot">
          <div className="ink-shell">
            <p className="ink-cap">
              {copy.footer.name} — {copy.footer.place} · {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>
    </InkShellContext.Provider>
  );
};

export default InkLayout;

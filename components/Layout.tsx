import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import Nav from './Nav';
import MagneticButton from './MagneticButton';
import { useLanguage } from '../contexts/LanguageContext';
import { useSmoothScroll } from '../contexts/SmoothScrollContext';

interface LayoutProps {
  children: React.ReactNode;
}

const GHENT_TIMEZONE = 'Europe/Brussels';

const useLocalTime = () => {
  const [time, setTime] = React.useState<string>('');

  React.useEffect(() => {
    const formatter = new Intl.DateTimeFormat('nl-BE', {
      timeZone: GHENT_TIMEZONE,
      hour: '2-digit',
      minute: '2-digit',
    });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const interval = window.setInterval(tick, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  return time;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language, t } = useLanguage();
  const { scrollTo } = useSmoothScroll();
  const localTime = useLocalTime();
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    try {
      return window.localStorage.getItem('mehdi-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const toggleTheme = () => {
    setTheme((current) => current === 'light' ? 'dark' : 'light');
  };

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try {
      window.localStorage.setItem('mehdi-theme', theme);
    } catch {
      // The theme still works when storage is unavailable.
    }
  }, [theme]);

  return (
    <div className="site-shell min-h-screen bg-bg text-textMain font-sans">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-textMain focus:px-4 focus:py-2 focus:text-sm focus:text-bg">
        {language === 'nl' ? 'Ga naar inhoud' : 'Skip to content'}
      </a>

      <Nav theme={theme} toggleTheme={toggleTheme} />

      <main id="main-content" className="site-main relative z-10 mx-auto max-w-[1180px] px-5 pb-24 pt-32 sm:px-8 md:pt-40">
        {children}
      </main>

      <footer className="relative z-10 mt-24 border-t border-border py-12">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-8 px-5 sm:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-sm text-textDim">
              <span>© {new Date().getFullYear()} Mehdi Oulad Khlie</span>
              {localTime && (
                <span className="font-mono text-xs tracking-[0.06em] text-textDim/80">
                  {t.home.location} · {localTime}
                </span>
              )}
            </div>

            <MagneticButton>
              <button
                type="button"
                onClick={() => scrollTo(0)}
                className="icon-button"
                aria-label={language === 'nl' ? 'Terug naar boven' : 'Back to top'}
              >
                <ArrowUp size={15} strokeWidth={1.4} aria-hidden="true" />
              </button>
            </MagneticButton>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-textDim">
            <a href="https://www.linkedin.com/in/mehdi-oulad-khlie-5a43aa30b/" target="_blank" rel="noopener noreferrer" className="hover:text-textMain">LinkedIn</a>
            <a href="https://github.com/yyyutakaaa" target="_blank" rel="noopener noreferrer" className="hover:text-textMain">GitHub</a>
            <a href="https://www.instagram.com/y.yutaka.a/" target="_blank" rel="noopener noreferrer" className="hover:text-textMain">Instagram</a>
            <a href="mailto:mehdi.ouladkhlie@outlook.be" className="hover:text-textMain">Email</a>
            <NavLink to="/visibility-spoofer-privacy" className="hover:text-textMain">Privacy</NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

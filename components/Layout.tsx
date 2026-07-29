import React from 'react';
import { NavLink } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language, setLanguage, t } = useLanguage();
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    try {
      return window.localStorage.getItem('mehdi-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const toggleLanguage = () => {
    setLanguage(language === 'nl' ? 'en' : 'nl');
  };

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

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? 'active' : ''}`;

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClass} end>{t.nav.portfolio}</NavLink>
      <NavLink to="/resume" className={navLinkClass}>{t.nav.resume}</NavLink>
      <NavLink to="/contact" className={navLinkClass}>{t.nav.contact}</NavLink>
    </>
  );

  return (
    <div className="site-shell min-h-screen bg-bg text-textMain font-sans">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-textMain focus:px-4 focus:py-2 focus:text-sm focus:text-bg">
        Skip to content
      </a>

      <nav className="site-nav fixed top-0 left-0 right-0 z-40 border-b border-border" aria-label="Primary navigation">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
          <div className="flex h-16 items-center justify-between gap-4 sm:h-[72px]">
            <NavLink to="/" className="brand-mark shrink-0 text-textMain" aria-label="Mehdi Oulad Khlie — home">
              Mehdi<span className="hidden sm:inline"> Oulad Khlie</span>
            </NavLink>

            {/* Desktop links sit inline; on mobile they move to their own row. */}
            <div className="hidden items-center gap-8 sm:flex">{navLinks}</div>

            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={`Switch language to ${language === 'nl' ? 'English' : 'Dutch'}`}
                className="flex h-9 items-center gap-1.5 rounded-full px-2 text-[11px] tracking-[0.14em] text-textDim hover:text-textMain"
              >
                <span className={language === 'nl' ? 'text-textMain' : ''}>NL</span>
                <span className="opacity-40">/</span>
                <span className={language === 'en' ? 'text-textMain' : ''}>EN</span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                role="switch"
                aria-checked={theme === 'dark'}
                aria-label={language === 'nl'
                  ? `Schakel naar ${theme === 'light' ? 'donkere' : 'lichte'} modus`
                  : `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                className="icon-button"
              >
                {theme === 'light'
                  ? <Moon size={15} strokeWidth={1.4} aria-hidden="true" />
                  : <Sun size={15} strokeWidth={1.4} aria-hidden="true" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-7 border-t border-border pb-0.5 sm:hidden">{navLinks}</div>
        </div>
      </nav>

      <main id="main-content" className="site-main relative z-10 mx-auto max-w-[1180px] px-5 pb-24 pt-36 sm:px-8 md:pt-44">
        {children}
      </main>

      <footer className="relative z-10 mt-24 border-t border-border py-12">
        <div className="mx-auto flex max-w-[1180px] flex-col items-start gap-6 px-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-textDim">
            © {new Date().getFullYear()} Mehdi Oulad Khlie — {language === 'nl' ? 'Ontworpen in België' : 'Designed in Belgium'}
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

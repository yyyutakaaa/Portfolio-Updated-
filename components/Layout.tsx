import React from 'react';
import { NavLink } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

const SOCIALS = [
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mehdi-oulad-khlie-5a43aa30b/' },
  { label: 'GitHub', url: 'https://github.com/yyyutakaaa' },
  { label: 'Instagram', url: 'https://www.instagram.com/y.yutaka.a/' },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language, setLanguage, t } = useLanguage();
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    try {
      return window.localStorage.getItem('mehdi-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });
  const [scrolled, setScrolled] = React.useState(false);
  const progressRef = React.useRef<HTMLDivElement>(null);

  const toggleLanguage = () => setLanguage(language === 'nl' ? 'en' : 'nl');
  const toggleTheme = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'));

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    try {
      window.localStorage.setItem('mehdi-theme', theme);
    } catch {
      // The theme still works when storage is unavailable.
    }
  }, [theme]);

  /* A hairline that fills as the page is read — the only always-on indicator. */
  React.useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

      setScrolled(window.scrollY > 8);
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const navLinkClass = ({ isActive }: { isActive: boolean }) => `nav-link ${isActive ? 'active' : ''}`;

  const navLinks = (
    <>
      <NavLink to="/" className={navLinkClass} data-index="01" end>
        {t.nav.portfolio}
      </NavLink>
      <NavLink to="/resume" className={navLinkClass} data-index="02">
        {t.nav.resume}
      </NavLink>
      <NavLink to="/contact" className={navLinkClass} data-index="03">
        {t.nav.contact}
      </NavLink>
    </>
  );

  return (
    <div className="shell">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-textMain focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.16em] focus:text-bg"
      >
        Skip to content
      </a>

      <nav className="site-nav" data-scrolled={scrolled} aria-label="Primary navigation">
        <div
          ref={progressRef}
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px origin-left bg-accent"
          style={{ transform: 'scaleX(0)' }}
        />

        <div className="container">
          <div className="flex h-16 items-center justify-between gap-4 sm:h-[74px]">
            <NavLink to="/" className="brand shrink-0" aria-label="Mehdi Oulad Khlie, home">
              MEHDI<span aria-hidden="true">.</span>
              <span className="sr-only"> </span>
              <span className="hidden text-textMain sm:inline">OULAD KHLIE</span>
            </NavLink>

            {/* Inline on desktop; on small screens the links take their own row. */}
            <div className="hidden items-center gap-9 sm:flex">{navLinks}</div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={`Switch language to ${language === 'nl' ? 'English' : 'Dutch'}`}
                className="icon-button"
              >
                <span className={language === 'nl' ? 'text-textMain' : ''}>NL</span>
                <span className="mx-1 opacity-40">/</span>
                <span className={language === 'en' ? 'text-textMain' : ''}>EN</span>
              </button>

              <button
                type="button"
                onClick={toggleTheme}
                role="switch"
                aria-checked={theme === 'dark'}
                aria-label={
                  language === 'nl'
                    ? `Schakel naar ${theme === 'light' ? 'donkere' : 'lichte'} modus`
                    : `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`
                }
                className="icon-button"
              >
                {theme === 'light' ? (
                  <Moon size={14} strokeWidth={1.5} aria-hidden="true" />
                ) : (
                  <Sun size={14} strokeWidth={1.5} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-border sm:hidden">
            {navLinks}
          </div>
        </div>
      </nav>

      <main id="main-content" className="site-main relative z-10 pb-28 pt-32 sm:pt-40">
        {children}
      </main>

      <footer className="site-footer relative z-10 border-t border-border">
        <div className="container py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label hover:text-textMain"
                >
                  {social.label}
                </a>
              ))}
              <a href="mailto:mehdi.ouladkhlie@outlook.be" className="label hover:text-textMain">
                Email
              </a>
              <NavLink to="/visibility-spoofer-privacy" className="label hover:text-textMain">
                Privacy
              </NavLink>
            </div>

            <p className="label">
              © {new Date().getFullYear()} Mehdi Oulad Khlie.{' '}
              {language === 'nl' ? 'Gemaakt in België' : 'Made in Belgium'}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, FileText, MessageSquare, Github, Linkedin, Mail, Globe, Instagram, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import logo from '/inverted-image-96.webp';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language, setLanguage, t } = useLanguage();
  const progressRef = React.useRef<HTMLDivElement>(null);
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

  React.useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
      }
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="site-shell min-h-screen bg-bg text-textMain font-sans selection:bg-accent selection:text-bg">
      <div className="ambient-stage" aria-hidden="true">
        <div className="ambient-grid" />
        <div className="ambient-orbit ambient-orbit-a" />
        <div className="ambient-orbit ambient-orbit-b" />
      </div>
      <div className="noise-overlay" aria-hidden="true" />
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-textMain focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-bold focus:text-bg">
        Skip to content
      </a>

      {/* Top Navigation */}
      <nav className="site-nav fixed top-0 left-0 right-0 z-40 border-b border-border" aria-label="Primary navigation">
        <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <img src={logo} alt="Mehdi.dev logo" width="48" height="48" decoding="async" className="brand-mark w-10 h-10 shrink-0" />
            <span className="hidden sm:inline font-bold tracking-[-0.04em] text-sm">MEHDI.DEV</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <NavLink
              to="/"
              aria-label={t.nav.portfolio}
              className={({ isActive }) =>
                `nav-link flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-mono uppercase tracking-[0.12em] ${isActive ? 'active text-textMain' : 'text-textDim'}`
              }
            >
              <LayoutGrid size={14} aria-hidden="true" />
              <span className="hidden sm:inline">{t.nav.portfolio}</span>
            </NavLink>
            <NavLink
              to="/resume"
              aria-label={t.nav.resume}
              className={({ isActive }) =>
                `nav-link flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-mono uppercase tracking-[0.12em] ${isActive ? 'active text-textMain' : 'text-textDim'}`
              }
            >
              <FileText size={14} aria-hidden="true" />
              <span className="hidden sm:inline">{t.nav.resume}</span>
            </NavLink>
            <NavLink
              to="/contact"
              aria-label={t.nav.contact}
              className={({ isActive }) =>
                `nav-link flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-mono uppercase tracking-[0.12em] ${isActive ? 'active text-textMain' : 'text-textDim'}`
              }
            >
              <MessageSquare size={14} aria-hidden="true" />
              <span className="hidden sm:inline">{t.nav.contact}</span>
            </NavLink>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 border-l border-border pl-3 sm:pl-6">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={`NL | EN — Switch language to ${language === 'nl' ? 'English' : 'Dutch'}`}
              className="language-switch flex items-center gap-1.5 sm:gap-2 rounded-full px-2 sm:px-3 py-2 text-[11px] font-mono text-textDim hover:text-textMain uppercase"
            >
              <Globe size={14} aria-hidden="true" />
              <span className={language === 'nl' ? 'text-textMain font-bold' : ''}>NL</span>
              <span className="text-border">|</span>
              <span className={language === 'en' ? 'text-textMain font-bold' : ''}>EN</span>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              role="switch"
              aria-checked={theme === 'dark'}
              aria-label={language === 'nl'
                ? `Schakel naar ${theme === 'light' ? 'donkere' : 'lichte'} modus`
                : `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              title={language === 'nl'
                ? `${theme === 'light' ? 'Donkere' : 'Lichte'} modus`
                : `${theme === 'light' ? 'Dark' : 'Light'} mode`}
              className="theme-switch flex h-11 w-11 items-center justify-center rounded-full border border-border text-textDim hover:border-accent hover:text-accent"
            >
              {theme === 'light'
                ? <Moon size={16} aria-hidden="true" />
                : <Sun size={16} aria-hidden="true" />}
            </button>

            <div className="hidden md:flex items-center gap-4 border-l border-border pl-4">
              <a href="https://www.linkedin.com/in/mehdi-oulad-khlie-5a43aa30b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="rounded-sm text-textDim hover:text-textMain transition-colors">
                <Linkedin size={18} aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/y.yutaka.a/" target="_blank" rel="noopener noreferrer" aria-label="Instagram profile" className="rounded-sm text-textDim hover:text-textMain transition-colors">
                <Instagram size={18} aria-hidden="true" />
              </a>
              <a href="mailto:mehdi.ouladkhlie@outlook.be" aria-label="Send email to Mehdi" className="rounded-sm text-textDim hover:text-textMain transition-colors">
                <Mail size={18} aria-hidden="true" />
              </a>
              <a href="https://github.com/yyyutakaaa" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="rounded-sm text-textDim hover:text-textMain transition-colors">
                <Github size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main id="main-content" className="site-main relative z-10 pt-28 pb-20 px-4 sm:px-6 max-w-[1440px] mx-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border mt-20 py-10">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs font-mono text-textDim">
            © {new Date().getFullYear()} MEHDI OULAD KHLIE. DESIGNED IN BELGIUM.
          </div>
          <div className="text-xs font-mono text-textDim flex items-center gap-4">
            <NavLink to="/visibility-spoofer-privacy" className="hover:text-textMain transition-colors">PRIVACY</NavLink>
            <div className="w-[1px] h-3 bg-border" />
            <span>STATUS:</span>
            <span className="text-accent status-pulse">●</span>
            <span>{t.nav.status.toUpperCase()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

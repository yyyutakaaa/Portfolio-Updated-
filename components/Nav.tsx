import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useSmoothScroll } from '../contexts/SmoothScrollContext';
import { useActiveSection } from '../hooks/useActiveSection';

const SECTION_IDS = ['work', 'about', 'log'];

interface NavProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Nav: React.FC<NavProps> = ({ theme, toggleTheme }) => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollTo } = useSmoothScroll();
  const isHome = location.pathname === '/';
  const activeSection = useActiveSection(isHome ? SECTION_IDS : []);

  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const toggleRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 48);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  React.useEffect(() => {
    if (mobileOpen) {
      const firstLink = menuRef.current?.querySelector<HTMLElement>('a, button');
      firstLink?.focus();
    } else {
      toggleRef.current?.focus({ preventScroll: true });
    }
  }, [mobileOpen]);

  const handleMenuKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setMobileOpen(false);
      return;
    }
    if (event.key !== 'Tab' || !menuRef.current) return;

    const focusable = Array.from(
      menuRef.current.querySelectorAll<HTMLElement>('a, button, [tabindex]:not([tabindex="-1"])'),
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const goToSection = (id: string) => {
    setMobileOpen(false);
    if (!isHome) {
      navigate('/', { state: { scrollTo: id } });
      return;
    }
    scrollTo(`#${id}`, { offset: -84 });
  };

  const toggleLanguage = () => setLanguage(language === 'nl' ? 'en' : 'nl');

  const sectionLinks = [
    { id: 'work', label: language === 'nl' ? 'Werk' : 'Work' },
    { id: 'about', label: language === 'nl' ? 'Profiel' : 'About' },
    { id: 'log', label: language === 'nl' ? 'Ervaring' : 'Experience' },
  ];

  const routeLinks = [
    { to: '/resume', label: t.nav.resume },
    { to: '/contact', label: t.nav.contact },
  ];

  return (
    <>
      <div className={`nav-shell ${scrolled ? 'is-scrolled' : ''}`} aria-label="Primary navigation">
        <div className="nav-bar">
          <div className="nav-bar-inner">
            <Link to="/" className="brand-chip-link" aria-label="Mehdi Oulad Khlie — home">
              <span className="brand-chip">
                <img src="/inverted-image-96.webp" alt="" width={96} height={96} className="brand-chip-mark" />
              </span>
              <span className="brand-chip-name">Mehdi Oulad Khlie</span>
            </Link>

            <div className="hidden items-center gap-1 lg:flex">
              {sectionLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => goToSection(link.id)}
                  className={`nav-pill-link ${isHome && activeSection === link.id ? 'active' : ''}`}
                >
                  {link.label}
                </button>
              ))}
              <span className="nav-pill-sep" aria-hidden="true" />
              {routeLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `nav-pill-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={`Switch language to ${language === 'nl' ? 'English' : 'Dutch'}`}
                className="hidden h-9 items-center gap-1.5 rounded-full px-2 font-mono text-[11px] tracking-[0.1em] text-textDim hover:text-textMain sm:flex"
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
                className="icon-button hidden sm:inline-flex"
              >
                {theme === 'light'
                  ? <Moon size={15} strokeWidth={1.4} aria-hidden="true" />
                  : <Sun size={15} strokeWidth={1.4} aria-hidden="true" />}
              </button>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setMobileOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={mobileOpen}
                aria-label={language === 'nl' ? 'Open navigatiemenu' : 'Open navigation menu'}
                className="icon-button lg:hidden"
              >
                <Menu size={17} strokeWidth={1.4} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label={language === 'nl' ? 'Navigatiemenu' : 'Navigation menu'}
            className="mobile-menu-overlay"
            onKeyDown={handleMenuKeyDown}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-menu-top">
              <span className="eyebrow eyebrow--plain">{language === 'nl' ? 'Menu' : 'Menu'}</span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label={language === 'nl' ? 'Sluit navigatiemenu' : 'Close navigation menu'}
                className="icon-button"
              >
                <X size={18} strokeWidth={1.4} aria-hidden="true" />
              </button>
            </div>

            <nav className="mobile-menu-links">
              {sectionLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  type="button"
                  onClick={() => goToSection(link.id)}
                  className="mobile-menu-link"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 + i * 0.05 }}
                >
                  {link.label}
                </motion.button>
              ))}
              {routeLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.05 + (sectionLinks.length + i) * 0.05 }}
                >
                  <NavLink to={link.to} className="mobile-menu-link">
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="mobile-menu-bottom">
              <div className="flex items-center gap-5">
                <button type="button" onClick={toggleLanguage} className="link-quiet">
                  {language === 'nl' ? 'EN' : 'NL'}
                </button>
                <button type="button" onClick={toggleTheme} className="link-quiet">
                  {theme === 'light'
                    ? (language === 'nl' ? 'Donker' : 'Dark')
                    : (language === 'nl' ? 'Licht' : 'Light')}
                </button>
              </div>
              <a href="mailto:mehdi.ouladkhlie@outlook.be" className="link-quiet">
                mehdi.ouladkhlie@outlook.be
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;

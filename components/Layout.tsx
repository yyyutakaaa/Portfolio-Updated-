import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, FileText, MessageSquare, Github, Linkedin, Mail, Globe, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import logo from '/inverted-image.png';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'nl' ? 'en' : 'nl');
  };

  return (
    <div className="min-h-screen bg-bg text-textMain font-sans selection:bg-white selection:text-black">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:font-bold focus:text-black">
        Skip to content
      </a>

      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-bg/80 backdrop-blur-md border-b border-border" aria-label="Primary navigation">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <img src={logo} alt="Mehdi.dev logo" className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 shrink-0" />
            <span className="hidden sm:inline font-mono font-bold tracking-tighter text-lg">MEHDI.DEV</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-6">
            <NavLink
              to="/"
              aria-label={t.nav.portfolio}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-sm p-2 text-sm font-mono uppercase tracking-wider transition-colors hover:text-white ${isActive ? 'text-white' : 'text-textDim'}`
              }
            >
              <LayoutGrid size={14} aria-hidden="true" />
              <span className="hidden sm:inline">{t.nav.portfolio}</span>
            </NavLink>
            <NavLink
              to="/resume"
              aria-label={t.nav.resume}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-sm p-2 text-sm font-mono uppercase tracking-wider transition-colors hover:text-white ${isActive ? 'text-white' : 'text-textDim'}`
              }
            >
              <FileText size={14} aria-hidden="true" />
              <span className="hidden sm:inline">{t.nav.resume}</span>
            </NavLink>
            <NavLink
              to="/contact"
              aria-label={t.nav.contact}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-sm p-2 text-sm font-mono uppercase tracking-wider transition-colors hover:text-white ${isActive ? 'text-white' : 'text-textDim'}`
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
              aria-label={`Switch language to ${language === 'nl' ? 'English' : 'Dutch'}`}
              className="flex items-center gap-1.5 sm:gap-2 rounded-sm p-2 text-xs font-mono text-textDim hover:text-white transition-colors uppercase"
            >
              <Globe size={14} aria-hidden="true" />
              <span className={language === 'nl' ? 'text-white font-bold' : ''}>NL</span>
              <span className="text-border">|</span>
              <span className={language === 'en' ? 'text-white font-bold' : ''}>EN</span>
            </button>

            <div className="hidden md:flex items-center gap-4 border-l border-border pl-4">
              <a href="https://www.linkedin.com/in/mehdi-oulad-khlie-5a43aa30b/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="rounded-sm text-textDim hover:text-white transition-colors">
                <Linkedin size={18} aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/y.yutaka.a/" target="_blank" rel="noopener noreferrer" aria-label="Instagram profile" className="rounded-sm text-textDim hover:text-white transition-colors">
                <Instagram size={18} aria-hidden="true" />
              </a>
              <a href="mailto:mehdi.ouladkhlie@outlook.be" aria-label="Send email to Mehdi" className="rounded-sm text-textDim hover:text-white transition-colors">
                <Mail size={18} aria-hidden="true" />
              </a>
              <a href="https://github.com/yyyutakaaa" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="rounded-sm text-textDim hover:text-white transition-colors">
                <Github size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main id="main-content" className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs font-mono text-textDim">
            © {new Date().getFullYear()} MEHDI OULAD KHLIE. DESIGNED IN BELGIUM.
          </div>
          <div className="text-xs font-mono text-textDim flex items-center gap-4">
            <NavLink to="/visibility-spoofer-privacy" className="hover:text-white transition-colors">PRIVACY</NavLink>
            <div className="w-[1px] h-3 bg-border" />
            <span>STATUS:</span>
            <span className="text-green-500">●</span>
            <span>{t.nav.status.toUpperCase()}</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

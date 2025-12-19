import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, FileText, Github, Linkedin, Mail, Globe, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

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
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-bg/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="font-mono font-bold tracking-tighter text-lg">MEHDI.DEV</span>
          </div>
          
          <div className="flex items-center gap-6">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `flex items-center gap-2 text-sm font-mono uppercase tracking-wider transition-colors hover:text-white ${isActive ? 'text-white' : 'text-textDim'}`
              }
            >
              <LayoutGrid size={14} />
              <span className="hidden sm:inline">{t.nav.portfolio}</span>
            </NavLink>
            <NavLink 
              to="/resume" 
              className={({ isActive }) => 
                `flex items-center gap-2 text-sm font-mono uppercase tracking-wider transition-colors hover:text-white ${isActive ? 'text-white' : 'text-textDim'}`
              }
            >
              <FileText size={14} />
              <span className="hidden sm:inline">{t.nav.resume}</span>
            </NavLink>
          </div>

          <div className="flex items-center gap-4 border-l border-border pl-6">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-xs font-mono text-textDim hover:text-white transition-colors uppercase"
            >
              <Globe size={14} />
              <span className={language === 'nl' ? 'text-white font-bold' : ''}>NL</span>
              <span className="text-border">|</span>
              <span className={language === 'en' ? 'text-white font-bold' : ''}>EN</span>
            </button>

            <div className="hidden md:flex items-center gap-4 border-l border-border pl-4">
              <a href="https://www.linkedin.com/in/mehdi-oulad-khlie-5a43aa30b/" target="_blank" rel="noopener noreferrer" className="text-textDim hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://www.instagram.com/y.yutaka.a/" target="_blank" rel="noopener noreferrer" className="text-textDim hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="mailto:mehdi.ouladkhlie@outlook.be" className="text-textDim hover:text-white transition-colors">
                <Mail size={18} />
              </a>
              <a href="https://github.com/yyyutakaaa" target="_blank" rel="noopener noreferrer" className="text-textDim hover:text-white transition-colors">
                <Github size={18} />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-20 px-4 sm:px-6 max-w-7xl mx-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs font-mono text-textDim">
            © {new Date().getFullYear()} MEHDI OULAD KHLIE. DESIGNED IN BELGIUM.
          </div>
          <div className="text-xs font-mono text-textDim flex items-center gap-2">
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
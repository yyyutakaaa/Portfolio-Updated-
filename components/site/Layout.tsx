import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import IndexRows from './IndexRows';
import { useLanguage } from '../../contexts/LanguageContext';
import { EMAIL, SOCIALS } from '../../utils/content';
import { scrollToId } from '../../utils/scroll';

/**
 * The frame every page sits in: a thin fixed header with the language switch
 * and the "Contents" button, the contents overlay itself, and a footer.
 */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, setLanguage, c } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Open: lock the page behind, move focus in, close on Escape. */
  React.useEffect(() => {
    if (!open) return;
    document.body.classList.add('is-locked');
    /* Everything behind the overlay drops out of the tab order. */
    const shell = Array.from(document.querySelectorAll<HTMLElement>('[data-shell]'));
    shell.forEach((el) => el.setAttribute('inert', ''));
    menuRef.current?.querySelector<HTMLElement>('a, button')?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.classList.remove('is-locked');
      shell.forEach((el) => el.removeAttribute('inert'));
      window.removeEventListener('keydown', onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  React.useEffect(() => setOpen(false), [pathname]);

  /* Section links scroll on the home page; from anywhere else they go home
     first and leave the target for the home page to finish the job. */
  const goTo = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    setOpen(false);
    if (pathname === '/') {
      window.setTimeout(() => scrollToId(id), 0);
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  const current = pathname.startsWith('/projects/') ? pathname.split('/')[2] : undefined;

  const header = (isMenu: boolean) => (
    <div className="wrap head__in">
      <Link className="lbl lbl--paper head__home" to="/" aria-label={c.nav.home} onClick={() => setOpen(false)}>
        Mehdi Oulad Khlie
      </Link>
      <div className="head__right">
        <div className="lang" role="group" aria-label={c.nav.language}>
          <button
            type="button"
            className="lbl"
            aria-pressed={language === 'nl'}
            onClick={() => setLanguage('nl')}
          >
            NL
          </button>
          <span className="lbl" aria-hidden="true">
            /
          </span>
          <button
            type="button"
            className="lbl"
            aria-pressed={language === 'en'}
            onClick={() => setLanguage('en')}
          >
            EN
          </button>
        </div>
        <button
          ref={isMenu ? undefined : toggleRef}
          type="button"
          className={`lbl head__index ${isMenu ? '' : 'lbl--accent'}`}
          aria-expanded={open}
          aria-controls="contents"
          onClick={() => setOpen(!isMenu)}
        >
          {isMenu ? c.nav.close : c.nav.index}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <header className="head" data-scrolled={scrolled} data-shell>
        {header(false)}
      </header>

      {open && (
        <div className="menu" id="contents" ref={menuRef} role="dialog" aria-modal="true" aria-label={c.index.title}>
          <div className="head">{header(true)}</div>
          <nav className="wrap menu__body" aria-label={c.index.title}>
            <p className="lbl">{c.index.title}</p>
            <IndexRows current={current} onNavigate={() => setOpen(false)} />
            <div className="menu__pages">
              <a href="#/" onClick={goTo('about')}>
                {c.index.pages.about}
              </a>
              <a href="#/" onClick={goTo('work')}>
                {c.index.pages.work}
              </a>
              <Link to="/resume">{c.index.pages.resume}</Link>
              <a href="#/" onClick={goTo('contact')}>
                {c.index.pages.contact}
              </a>
            </div>
          </nav>
        </div>
      )}

      <main className="wrap" data-shell>
        {children}
      </main>

      <footer className="foot" data-shell>
        <div className="wrap foot__in">
          <p className="lbl">
            {c.footer} · {new Date().getFullYear()}
          </p>
          <ul className="foot__links">
            <li>
              <a className="lbl" href={`mailto:${EMAIL}`}>
                E-mail
              </a>
            </li>
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a className="lbl" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </>
  );
};

export default Layout;

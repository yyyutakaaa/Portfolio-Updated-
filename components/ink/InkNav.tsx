import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToId } from '../motion/SmoothScroll';
import { useLanguage } from '../../contexts/LanguageContext';
import { inkContent } from '../../utils/inkContent';
import InkLogo from './InkLogo';
import { ENSO_SHAPE, ENSO_SPINE } from './enso';

/**
 * Fixed, small, and almost entirely negative space.
 *
 * Two marks hold the top of the page: the MOK monogram at one end, brushed in
 * ink, and an ensō at the other that takes ink as the page is read.
 * Everything between them is set at 11px so the page below has nothing to
 * compete with.
 *
 * It is the same nav on every page. On the home page the section links scroll;
 * anywhere else they go home first and the home page finishes the journey.
 */

/**
 * Empty at the top of the page and full at the bottom. The pale ring is the
 * circle waiting to be drawn; the mask lets ink into it in step with the
 * scroll, the same brush-and-mask idea the name is built on.
 */
const Enso: React.FC<{ progress: number }> = ({ progress }) => {
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, '');

  return (
    <svg className="ink-enso" viewBox="0 0 44 44" aria-hidden="true" focusable="false">
      <defs>
        <mask id={`enso-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width="44" height="44">
          <path
            d={ENSO_SPINE}
            fill="none"
            stroke="#fff"
            strokeWidth="5"
            strokeLinecap="round"
            pathLength={1000}
            strokeDasharray={1000}
            strokeDashoffset={1000 - Math.round(progress * 1000)}
          />
        </mask>
      </defs>
      <path d={ENSO_SHAPE} fill="var(--sumi)" opacity="0.15" />
      <path d={ENSO_SHAPE} fill="var(--sumi)" mask={`url(#enso-${id})`} />
    </svg>
  );
};

const InkNav = React.forwardRef<HTMLElement>((_props, ref) => {
  const { language, setLanguage } = useLanguage();
  const copy = inkContent[language];
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const home = pathname === '/';

  const goTo = (id: string) => {
    if (home) {
      scrollToId(id);
      return;
    }
    navigate('/', { state: { scrollTo: id } });
  };
  const [progress, setProgress] = React.useState(0);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    let frame = 0;
    /* Reading scrollHeight forces layout, so it is measured when it can
       actually change rather than on every scroll frame. */
    let scrollable = 0;

    const measure = () => {
      scrollable = document.documentElement.scrollHeight - window.innerHeight;
    };

    const update = () => {
      frame = 0;
      setProgress(scrollable > 0 ? Math.min(Math.max(window.scrollY / scrollable, 0), 1) : 0);
      setScrolled(window.scrollY > 24);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    /* Images and webfonts land after mount and make the document taller, which
       would otherwise leave the ring reading full at half the page. */
    const settle = window.setTimeout(onResize, 900);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(settle);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const sections: { id: string; label: string }[] = [
    { id: 'about', label: copy.nav.about },
    { id: 'work', label: copy.nav.work },
  ];

  return (
    <nav ref={ref} className="ink-nav" aria-label="Primary" data-scrolled={scrolled}>
      {/* The bar's own sheet of paper, laid over the page once it moves. */}
      <span className="ink-nav__ground" aria-hidden="true" />

      <a
        className="ink-nav__logoLink"
        href="#/"
        aria-label={copy.nav.home}
        onClick={(event) => {
          event.preventDefault();
          if (home) scrollToId('ink-top', 0);
          else navigate('/');
        }}
      >
        <InkLogo className="ink-nav__logo" />
      </a>

      <div className="ink-nav__right">
        <div className="ink-nav__links">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              className="ink-cap ink-nav__link"
              onClick={() => goTo(`ink-${section.id}`)}
            >
              {section.label}
            </button>
          ))}
          <a
            className="ink-cap ink-nav__link"
            href="#/resume"
            aria-current={pathname === '/resume' ? 'page' : undefined}
          >
            {copy.nav.resume}
          </a>
          <button type="button" className="ink-cap ink-nav__link" onClick={() => goTo('ink-contact')}>
            {copy.nav.contact}
          </button>
        </div>

        <div className="ink-nav__lang" role="group" aria-label="Language">
          {(['nl', 'en'] as const).map((code) => (
            <button
              key={code}
              type="button"
              className="ink-cap ink-nav__langBtn"
              aria-pressed={language === code}
              onClick={() => setLanguage(code)}
            >
              {code}
            </button>
          ))}
        </div>

        <Enso progress={progress} />
      </div>
    </nav>
  );
});

InkNav.displayName = 'InkNav';

export default InkNav;

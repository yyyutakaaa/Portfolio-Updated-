import React from 'react';
import InkCaseStudy from '../components/ink/InkCaseStudy';
import InkReveal from '../components/ink/InkReveal';
import { useLanguage } from '../contexts/LanguageContext';

const OPENWRT_URL = 'https://openwrt.org/toh/asus/rt-ax53u';

const SCREENS = ['overview', 'adblock', 'system'];

const ProjectRouter: React.FC = () => {
  const { t } = useLanguage();
  const r = t.routerPage;

  return (
    <InkCaseStudy
      content={r}
      note={r.openNote}
      actions={
        <a href={OPENWRT_URL} target="_blank" rel="noopener noreferrer" className="ink-btn">
          {r.openCta} <span aria-hidden="true">↗</span>
        </a>
      }
      visual={
        <>
          <div className="ink-grid">
            <p className="ink-cap ink-case__kicker">{r.galleryTitle}</p>
          </div>

          <InkReveal as="ul" className="ink-strip" stagger={0.06}>
            {SCREENS.map((screen, i) => (
              <li key={screen} className="ink-strip__item">
                <figure>
                  <div className="ink-plate ink-plate--phone">
                    <img
                      src={`/router/screens/${screen}-640.webp`}
                      srcSet={`/router/screens/${screen}-640.webp 640w, /router/screens/${screen}-780.webp 780w`}
                      sizes="240px"
                      width="780"
                      height="1690"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption>
                    <span className="ink-strip__num">{String(i + 1).padStart(2, '0')}</span>
                    {r.gallery[i]}
                  </figcaption>
                </figure>
              </li>
            ))}
          </InkReveal>
        </>
      }
    />
  );
};

export default ProjectRouter;

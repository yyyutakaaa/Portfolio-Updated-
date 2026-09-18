import React from 'react';
import InkCaseStudy from '../components/ink/InkCaseStudy';
import InkReveal from '../components/ink/InkReveal';
import { useLanguage } from '../contexts/LanguageContext';

const APP_URL = 'https://sets.ink';

const SCREENS = ['dashboard', 'workout', 'nutrition', 'social', 'progression', 'history'];

const ProjectSets: React.FC = () => {
  const { t } = useLanguage();
  const s = t.setsPage;

  return (
    <InkCaseStudy
      content={s}
      note={s.openNote}
      actions={
        <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="ink-btn">
          {s.openCta} <span aria-hidden="true">↗</span>
        </a>
      }
      visual={
        <>
          <div className="ink-grid">
            <p className="ink-cap ink-case__kicker">{s.galleryTitle}</p>
          </div>

          {/* Phone screens read best as a strip you pass along, like frames
              on a hand scroll, not squeezed into a grid. */}
          <InkReveal as="ul" className="ink-strip" stagger={0.06}>
            {SCREENS.map((screen, i) => (
              <li key={screen} className="ink-strip__item">
                <figure>
                  <div className="ink-plate ink-plate--phone">
                    <img
                      src={`/sets/screens/${screen}-640.webp`}
                      srcSet={`/sets/screens/${screen}-640.webp 640w, /sets/screens/${screen}-960.webp 960w`}
                      sizes="240px"
                      width="1290"
                      height="2796"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption>
                    <span className="ink-strip__num">{String(i + 1).padStart(2, '0')}</span>
                    {s.gallery[i]}
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

export default ProjectSets;

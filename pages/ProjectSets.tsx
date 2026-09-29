import React from 'react';
import CaseStudy from '../components/site/CaseStudy';
import { useLanguage } from '../contexts/LanguageContext';

const APP_URL = 'https://sets.ink';

const SCREENS = ['dashboard', 'workout', 'nutrition', 'social', 'progression', 'history'];

const ProjectSets: React.FC = () => {
  const { t } = useLanguage();
  const s = t.setsPage;

  return (
    <CaseStudy
      content={s}
      note={s.openNote}
      actions={
        <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn btn--accent">
          {s.openCta}&nbsp;<span aria-hidden="true">&#8599;</span>
        </a>
      }
      visual={
        <section>
          <h2>{s.galleryTitle}</h2>
          <ul className="gallery">
            {SCREENS.map((screen, i) => (
              <li key={screen}>
                <figure>
                  <div className="shot">
                    <img
                      src={`/sets/screens/${screen}-640.webp`}
                      srcSet={`/sets/screens/${screen}-640.webp 640w, /sets/screens/${screen}-960.webp 960w`}
                      sizes="190px"
                      width="1290"
                      height="2796"
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption className="lbl">
                    {String(i + 1).padStart(2, '0')} · {s.gallery[i]}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      }
    />
  );
};

export default ProjectSets;

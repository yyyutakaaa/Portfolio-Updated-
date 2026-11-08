import React from 'react';
import InkCaseStudy from '../components/ink/InkCaseStudy';
import InkReveal from '../components/ink/InkReveal';
import { useLanguage } from '../contexts/LanguageContext';

const GITHUB_URL = 'https://github.com/yyyutakaaa/Muted';
/* The latest release, so the button never points at an old installer. */
const DOWNLOAD_URL = 'https://github.com/yyyutakaaa/Muted/releases/latest';

const SCREENS = ['home', 'sound', 'finetune', 'processing'];

const ProjectMuted: React.FC = () => {
  const { t } = useLanguage();
  const m = t.mutedPage;

  return (
    <InkCaseStudy
      content={m}
      note={m.downloadNote}
      actions={
        <>
          <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" className="ink-btn">
            {m.downloadCta} <span aria-hidden="true">↗</span>
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="ink-btn ink-btn--quiet">
            {m.githubCta} <span aria-hidden="true">↗</span>
          </a>
        </>
      }
      visual={
        <>
          <div className="ink-grid">
            <p className="ink-cap ink-case__kicker">{m.galleryTitle}</p>
          </div>

          <InkReveal as="ul" className="ink-strip ink-strip--wide" stagger={0.06}>
            {SCREENS.map((screen, i) => (
              <li key={screen} className="ink-strip__item">
                <figure>
                  <div className="ink-plate ink-plate--app">
                    <img
                      src={`/muted/${screen}-992.webp`}
                      srcSet={`/muted/${screen}-640.webp 640w, /muted/${screen}-992.webp 992w`}
                      sizes="(max-width: 899px) 80vw, 340px"
                      width="992"
                      height="1092"
                      alt={m.galleryAlt[i]}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  </div>
                  <figcaption>
                    <span className="ink-strip__num">{String(i + 1).padStart(2, '0')}</span>
                    {m.gallery[i]}
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

export default ProjectMuted;

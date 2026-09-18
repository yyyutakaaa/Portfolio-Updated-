import React from 'react';
import InkCaseStudy from '../components/ink/InkCaseStudy';
import InkReveal from '../components/ink/InkReveal';
import { useLanguage } from '../contexts/LanguageContext';

const GITHUB_URL = 'https://github.com/yyyutakaaa/Muted';
const DOWNLOAD_URL = 'https://github.com/yyyutakaaa/Muted/releases/download/v0.1.0/Muted-Setup-0.1.0.exe';

const ProjectMuted: React.FC = () => {
  const { t } = useLanguage();
  const m = t.mutedPage;

  return (
    <InkCaseStudy
      content={m}
      note={m.downloadNote}
      actions={
        <>
          <a href={DOWNLOAD_URL} className="ink-btn">
            {m.downloadCta}
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="ink-btn ink-btn--quiet">
            {m.githubCta} <span aria-hidden="true">↗</span>
          </a>
        </>
      }
      visual={
        <div className="ink-grid">
          <InkReveal className="ink-case__visual">
            <div className="ink-plate" style={{ aspectRatio: '1573 / 978' }}>
              <picture>
                <source
                  type="image/webp"
                  srcSet="/muted-screenshot-800.webp 800w, /muted-screenshot-1400.webp 1400w"
                  sizes="(max-width: 899px) 92vw, 70vw"
                />
                <img src="/muted-screenshot.png" width="1573" height="978" alt={m.screenshotAlt} decoding="async" />
              </picture>
            </div>
          </InkReveal>
        </div>
      }
    />
  );
};

export default ProjectMuted;

import React from 'react';
import CaseStudy from '../components/site/CaseStudy';
import { useLanguage } from '../contexts/LanguageContext';

const GITHUB_URL = 'https://github.com/yyyutakaaa/Muted';
const DOWNLOAD_URL = 'https://github.com/yyyutakaaa/Muted/releases/download/v0.1.0/Muted-Setup-0.1.0.exe';

const ProjectMuted: React.FC = () => {
  const { t } = useLanguage();
  const m = t.mutedPage;

  return (
    <CaseStudy
      content={m}
      note={m.downloadNote}
      actions={
        <>
          <a href={DOWNLOAD_URL} className="btn btn--accent">
            {m.downloadCta}
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn">
            {m.githubCta}&nbsp;<span aria-hidden="true">&#8599;</span>
          </a>
        </>
      }
      visual={
        <div className="shot">
          <picture>
            <source
              type="image/webp"
              srcSet="/muted-screenshot-800.webp 800w, /muted-screenshot-1400.webp 1400w"
              sizes="(max-width: 859px) 92vw, 640px"
            />
            <img src="/muted-screenshot.png" width="1573" height="978" alt={m.screenshotAlt} decoding="async" />
          </picture>
        </div>
      }
    />
  );
};

export default ProjectMuted;

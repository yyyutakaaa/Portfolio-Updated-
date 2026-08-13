import React from 'react';
import { Download, ArrowUpRight } from 'lucide-react';
import CaseStudy from '../components/CaseStudy';
import Reveal from '../components/motion/Reveal';
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
          <a href={DOWNLOAD_URL} className="btn">
            <Download size={14} strokeWidth={1.6} aria-hidden="true" />
            {m.downloadCta}
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            {m.githubCta}
            <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </>
      }
      visual={
        <Reveal className="plate plate--pad">
          <picture>
            <source
              type="image/webp"
              srcSet="/muted-screenshot-800.webp 800w, /muted-screenshot-1400.webp 1400w"
              sizes="(max-width: 1120px) calc(100vw - 40px), 1024px"
            />
            <img
              src="/muted-screenshot.png"
              width="1573"
              height="978"
              alt={m.screenshotAlt}
              decoding="async"
            />
          </picture>
        </Reveal>
      }
    />
  );
};

export default ProjectMuted;

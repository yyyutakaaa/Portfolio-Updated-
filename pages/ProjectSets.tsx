import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import CaseStudy from '../components/CaseStudy';
import Reveal from '../components/motion/Reveal';
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
        <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="btn">
          {s.openCta}
          <ArrowUpRight size={14} strokeWidth={1.6} aria-hidden="true" />
        </a>
      }
      visual={
        <>
          <div className="flex items-baseline gap-5 border-t border-border pt-5">
            <span className="index-num">00</span>
            <span className="label">{s.galleryTitle}</span>
          </div>

          {/* Phone screens read best as a swipeable strip, not a squeezed grid. */}
          <Reveal
            as="ul"
            stagger={0.06}
            className="hscroll -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-5 sm:mx-0 sm:px-0"
          >
            {SCREENS.map((screen, i) => (
              <li key={screen} className="w-[210px] shrink-0 snap-start sm:w-[240px]">
                <figure>
                  <div className="plate">
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
                  <figcaption className="mt-4 flex items-baseline gap-3">
                    <span className="index-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-sm text-textDim">{s.gallery[i]}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </Reveal>
        </>
      }
    />
  );
};

export default ProjectSets;

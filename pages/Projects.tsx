import React from 'react';
import { Link } from 'react-router-dom';
import InkReveal from '../components/ink/InkReveal';
import InkSectionHead from '../components/ink/InkSectionHead';
import WorkBlock from '../components/ink/WorkBlock';
import { useLanguage } from '../contexts/LanguageContext';
import { inkContent } from '../utils/inkContent';

/** Own projects: the ones with a screenshot get a plate, the rest are set as plain text. */
const Projects: React.FC = () => {
  const { language } = useLanguage();
  const { work } = inkContent[language];

  return (
    <article className="ink-page">
      <header className="ink-section ink-section--page">
        <div className="ink-shell">
          <div className="ink-grid">
            <Link className="ink-cap ink-back" to="/">
              <span aria-hidden="true">←</span> {work.more.back}
            </Link>
          </div>
          <InkSectionHead label={work.more.label} heading={work.more.heading} level="h1" />
        </div>
      </header>

      <section className="ink-section ink-section--compact">
        <div className="ink-shell">
          <div className="ink-worklist">
            {work.items.map((item) => (
              <InkReveal key={item.title} y={26}>
                <WorkBlock item={item} plain={!item.image} />
              </InkReveal>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};

export default Projects;

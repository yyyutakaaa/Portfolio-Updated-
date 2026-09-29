import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Rich from '../components/site/Rich';
import HaDemo from '../components/site/HaDemo';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * A lab write-up as one sheet: on the left the figure, the title and what came
 * out of it; on the right task, obstacle and solution, then the full story.
 */
const LabProject: React.FC = () => {
  const { slug } = useParams();
  const { c } = useLanguage();
  const items = c.projects.items;
  const index = items.findIndex((item) => item.slug === slug);

  if (index === -1) return <Navigate to="/" replace />;

  const p = items[index];
  const next = items[index + 1];

  return (
    <article className="page">
      <div className="side side--sticky">
        <Link className="lbl back" to="/" state={{ scrollTo: 'index' }}>
          <span aria-hidden="true">&larr;</span>&nbsp;{c.index.title}
        </Link>
        <p className={`lbl ${p.featured ? 'lbl--accent' : ''}`}>
          {c.projects.label(index + 1, items.length)}
          {p.featured && ` · ${c.projects.featured}`}
        </p>
        <p className="side__big" aria-hidden="true">
          {p.figure}
        </p>
        <h1 className="side__title">{p.title}</h1>
        <p className="side__result">{p.result}</p>
        <p className="lbl">{p.subject}</p>
        {p.slug === 'proxmox' && <HaDemo />}
      </div>

      <div className="read">
        <div className="brief">
          <div>
            <h3>{c.projects.brief.task}</h3>
            <p>{p.brief.task}</p>
          </div>
          <div>
            <h3>{c.projects.brief.obstacle}</h3>
            <p>{p.brief.obstacle}</p>
          </div>
          <div className="is-solve">
            <h3>{c.projects.brief.solution}</h3>
            <p>{p.brief.solution}</p>
          </div>
        </div>

        <p className="lede">
          <Rich text={p.lede} />
        </p>

        {p.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs?.map((para) => (
              <p key={para}>
                <Rich text={para} />
              </p>
            ))}
            {section.steps && (
              <ol className="steps">
                {section.steps.map((step) => (
                  <li key={step}>
                    <div>
                      <Rich text={step} />
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>
        ))}

        {p.mistake && (
          <section className="note">
            <h2>{p.mistake.title}</h2>
            <p>{p.mistake.body}</p>
          </section>
        )}

        {next ? (
          <Link className="lbl lbl--paper next" to={`/projects/${next.slug}`}>
            {c.projects.next(next.shortTitle)}&nbsp;<span aria-hidden="true">&rarr;</span>
          </Link>
        ) : (
          <Link className="lbl lbl--paper next" to="/" state={{ scrollTo: 'index' }}>
            {c.projects.backToIndex}&nbsp;<span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>
    </article>
  );
};

export default LabProject;

import React from 'react';
import { Link } from 'react-router-dom';
import InkReveal from '../components/ink/InkReveal';
import InkSectionHead from '../components/ink/InkSectionHead';
import BrushDivider from '../components/ink/BrushDivider';
import { useLanguage } from '../contexts/LanguageContext';
import { inkContent, STAGE_EMAIL } from '../utils/inkContent';

/** The school projects, set for someone deciding whether to offer an internship. */
const Stage: React.FC = () => {
  const { language } = useLanguage();
  const { stage, contact } = inkContent[language];
  const socials = contact.socials.filter((social) => social.label !== 'Instagram');

  return (
    <article className="ink-page">
      <header className="ink-section ink-section--page">
        <div className="ink-shell">
          <div className="ink-grid">
            <Link className="ink-cap ink-back" to="/">
              <span aria-hidden="true">←</span> {stage.back}
            </Link>
          </div>
          <InkSectionHead label={stage.label} heading={stage.heading} level="h1" />
          <div className="ink-grid">
            <InkReveal className="ink-stage__lead" delay={0.3}>
              <p className="ink-prose">{stage.intro}</p>
              <div className="ink-actions ink-stage__cv">
                <a
                  className="ink-btn"
                  href={`${import.meta.env.BASE_URL}CV Stage - Mehdi Oulad Khlie.pdf`}
                  target="_blank"
                  rel="noopener"
                >
                  {stage.view}
                </a>
                <a
                  className="ink-btn ink-btn--quiet"
                  href={`${import.meta.env.BASE_URL}CV Stage - Mehdi Oulad Khlie.pdf`}
                  download="CV Stage - Mehdi Oulad Khlie.pdf"
                >
                  {stage.download}
                </a>
              </div>
              <p className="ink-cap ink-stage__skillsLabel">{stage.contactLabel}</p>
              <ul className="ink-stage__contact">
                <li>
                  <a className="ink-inline-link" href={`mailto:${STAGE_EMAIL}`}>
                    {STAGE_EMAIL}
                  </a>
                </li>
                <li>Evergem</li>
                {socials.map((social) => (
                  <li key={social.label}>
                    <a className="ink-inline-link" href={social.href} target="_blank" rel="noreferrer noopener">
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="ink-cap ink-stage__skillsLabel">{stage.skillsLabel}</p>
              <ul className="ink-stage__skills">
                {stage.skills.map((skill) => (
                  <li key={skill} className="ink-cap">
                    {skill}
                  </li>
                ))}
              </ul>
            </InkReveal>
          </div>
        </div>
      </header>

      {stage.groups.map((group, index) => (
        <section className="ink-section ink-section--compact" key={group.title}>
          <div className="ink-shell">
            <BrushDivider flip={index % 2 === 1} />
            <InkSectionHead label={String(index + 1).padStart(2, '0')} heading={group.title} />
            <div className="ink-worklist">
              {group.projects.map((project) => (
                <InkReveal key={project.title} y={26}>
                  <article className="ink-work ink-work--plain ink-stage__project">
                    <div className="ink-work__link">
                      <span className="ink-work__index" aria-hidden="true">
                        {project.index}
                      </span>
                      <div className="ink-work__text">
                        <h3 className="ink-work__title">{project.title}</h3>
                        <span className="ink-cap ink-work__stack">{project.stack}</span>
                        <p className="ink-work__desc">{project.summary}</p>
                        {project.note && <p className="ink-stage__note">{project.note}</p>}
                        {project.document && (
                          <a
                            className="ink-cap ink-work__cta ink-stage__watch"
                            href={`${import.meta.env.BASE_URL}${project.document}`}
                            target="_blank"
                            rel="noopener"
                          >
                            {stage.docLabel}
                            <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                              <path d="M1 11 11 1M4 1h7v7" fill="none" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                          </a>
                        )}
                        {project.video && (
                          <a
                            className="ink-cap ink-work__cta ink-stage__watch"
                            href={project.video}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {stage.watch}
                            <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                              <path d="M1 11 11 1M4 1h7v7" fill="none" stroke="currentColor" strokeWidth="1.2" />
                            </svg>
                          </a>
                        )}
                      </div>
                      {(project.video || project.document) && project.thumb && (
                        <a
                          className="ink-stage__thumb"
                          href={project.video ?? `${import.meta.env.BASE_URL}${project.document}`}
                          target="_blank"
                          rel="noreferrer noopener"
                          aria-label={`${project.video ? stage.watch : stage.docLabel}: ${project.title}`}
                        >
                          <img
                            src={`/stage/${project.thumb}-960.webp`}
                            srcSet={`/stage/${project.thumb}-560.webp 560w, /stage/${project.thumb}-960.webp 960w`}
                            sizes="(max-width: 899px) 92vw, 34vw"
                            alt=""
                            loading="lazy"
                            decoding="async"
                            width={960}
                            height={540}
                          />
                          {project.video && <span className="ink-stage__play" aria-hidden="true" />}
                        </a>
                      )}
                      <details className="ink-stage__details">
                        <summary className="ink-cap">
                          <span className="ink-stage__open">{stage.open}</span>
                          <span className="ink-stage__close">{stage.close}</span>
                        </summary>
                        <div className="ink-stage__more">
                          {project.details.map((paragraph) => (
                            <p key={paragraph.slice(0, 30)} className="ink-prose">
                              {paragraph}
                            </p>
                          ))}

                          {project.evidence && (
                            <>
                              <h4 className="ink-cap ink-stage__subhead">{stage.problemsTitle}</h4>
                              <div className="ink-stage__table" role="table">
                                <div className="ink-stage__tr ink-stage__tr--head" role="row">
                                  <span role="columnheader">{stage.problemCols.problem}</span>
                                  <span role="columnheader">{stage.problemCols.cause}</span>
                                  <span role="columnheader">{stage.problemCols.fix}</span>
                                </div>
                                {project.evidence.problems.map((row) => (
                                  <div className="ink-stage__tr" role="row" key={row.problem}>
                                    <span role="cell" data-label={stage.problemCols.problem}>{row.problem}</span>
                                    <span role="cell" data-label={stage.problemCols.cause}>{row.cause}</span>
                                    <span role="cell" data-label={stage.problemCols.fix}>{row.fix}</span>
                                  </div>
                                ))}
                              </div>

                              <h4 className="ink-cap ink-stage__subhead">{stage.learnedTitle}</h4>
                              <div className="ink-stage__table" role="table">
                                {project.evidence.learned.map((row) => (
                                  <div className="ink-stage__tr ink-stage__tr--two" role="row" key={row.skill}>
                                    <span role="cell" className="ink-stage__skill">{row.skill}</span>
                                    <span role="cell">{row.applied}</span>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </details>
                    </div>
                  </article>
                </InkReveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </article>
  );
};

export default Stage;

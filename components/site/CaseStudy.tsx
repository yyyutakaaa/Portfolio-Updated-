import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

/** The shape of the Sets and Muted write-ups in `translations.ts`. */
export interface CaseStudyContent {
  back: string;
  badge: string;
  title: string;
  tagline: string;
  intro: string;
  howItWorksTitle: string;
  howItWorks: string[];
  deepDive: {
    title: string;
    intro?: string;
    signalPathTitle: string;
    signalPathIntro: string;
    signalPath: string[];
    frameMathTitle: string;
    frameMath: { value: string; label: string }[];
    points: { title: string; body: string }[];
  };
  featuresTitle: string;
  features: string[];
  stackTitle: string;
  stack: string[];
  installTitle: string;
  installSteps: string[];
  limitationsTitle: string;
  limitations: string;
}

interface CaseStudyProps {
  content: CaseStudyContent;
  actions: React.ReactNode;
  note?: string;
  /** The project itself: a screenshot or a gallery. */
  visual: React.ReactNode;
}

/** A side project on the same sheet as the lab write-ups. */
const CaseStudy: React.FC<CaseStudyProps> = ({ content: c, actions, note, visual }) => {
  const { c: site } = useLanguage();

  return (
    <article className="page">
      <div className="side side--sticky">
        <Link className="lbl back" to="/" state={{ scrollTo: 'work' }}>
          <span aria-hidden="true">&larr;</span>&nbsp;{site.work.label}
        </Link>
        <p className="lbl">{c.badge}</p>
        <h1 className="side__title">{c.title}</h1>
        <p className="side__result">{c.tagline}</p>
        <div className="actions">{actions}</div>
        {note && <p className="lbl">{note}</p>}
      </div>

      <div className="read">
        <p className="lede">{c.intro}</p>

        {visual}

        <section>
          <h2>{c.howItWorksTitle}</h2>
          <ol className="steps">
            {c.howItWorks.map((step) => (
              <li key={step}>
                <div>{step}</div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2>{c.deepDive.title}</h2>
          {c.deepDive.intro && <p>{c.deepDive.intro}</p>}
        </section>

        <section>
          <h2>{c.deepDive.signalPathTitle}</h2>
          <p style={{ marginBottom: 16 }}>{c.deepDive.signalPathIntro}</p>
          <ol className="path">
            {c.deepDive.signalPath.map((node) => (
              <li key={node}>{node}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2>{c.deepDive.frameMathTitle}</h2>
          <dl className="stats">
            {c.deepDive.frameMath.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.value}</dt>
                <dd className="lbl">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="points">
          {c.deepDive.points.map((point) => (
            <div key={point.title}>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </div>
          ))}
        </div>

        <section>
          <h2>{c.featuresTitle}</h2>
          <ul className="bullets">
            {c.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{c.stackTitle}</h2>
          <ul className="tags">
            {c.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>{c.installTitle}</h2>
          <ol className="steps">
            {c.installSteps.map((step) => (
              <li key={step}>
                <div>{step}</div>
              </li>
            ))}
          </ol>
        </section>

        <section className="note">
          <h2>{c.limitationsTitle}</h2>
          <p>{c.limitations}</p>
        </section>

        <Link className="lbl lbl--paper next" to="/" state={{ scrollTo: 'work' }}>
          {site.work.label}&nbsp;<span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
};

export default CaseStudy;

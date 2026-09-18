import React from 'react';
import { Link } from 'react-router-dom';
import InkReveal from './InkReveal';
import InkTitle from './InkTitle';
import InkSectionHead from './InkSectionHead';
import BrushDivider from './BrushDivider';
import { useLanguage } from '../../contexts/LanguageContext';

/**
 * A project told down one long sheet, the way a scroll is read: the name and
 * what it is for, the thing itself, then how it works, what is under it, and
 * last the honest part about what it does not do.
 *
 * Every section opens the way the home page's do — a numeral in small caps,
 * then its title brushed on — so moving from the home page into a project
 * never feels like arriving somewhere else.
 */

interface Stat {
  value: string;
  label: string;
}

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
    frameMath: Stat[];
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

interface InkCaseStudyProps {
  content: CaseStudyContent;
  /** The page's call to action: one ink button, at most one quiet link beside it. */
  actions: React.ReactNode;
  note?: string;
  /** The project itself — a screenshot, a gallery, whatever shows it best. */
  visual: React.ReactNode;
}

/** A numbered, ruled list: the walkthrough and the install steps. */
const Steps: React.FC<{ steps: string[] }> = ({ steps }) => (
  <InkReveal as="ul" className="ink-steps" stagger={0.06}>
    {steps.map((step, i) => (
      <li key={step} className="ink-steps__row">
        <span className="ink-steps__num" aria-hidden="true">
          {String(i + 1).padStart(2, '0')}
        </span>
        <span className="ink-steps__text">{step}</span>
      </li>
    ))}
  </InkReveal>
);

/** A section of the case study: rule, numeral and brushed title, then the body. */
const Part: React.FC<{ index: number; title: string; children: React.ReactNode }> = ({
  index,
  title,
  children,
}) => (
  <section className="ink-section">
    <div className="ink-shell">
      <BrushDivider flip={index % 2 === 0} />
      <InkSectionHead label={String(index).padStart(2, '0')} heading={title} />
      <div className="ink-grid">
        <div className="ink-case__body">{children}</div>
      </div>
    </div>
  </section>
);

const InkCaseStudy: React.FC<InkCaseStudyProps> = ({ content: c, actions, note, visual }) => {
  const { language } = useLanguage();

  return (
    <article className="ink-page ink-case">
      {/* ------------------------------------------------------------ head -- */}
      <header className="ink-section ink-section--page">
        <div className="ink-shell">
          <div className="ink-grid">
            <Link className="ink-cap ink-back" to="/" state={{ scrollTo: 'ink-work' }}>
              <span aria-hidden="true">←</span> {c.back}
            </Link>
          </div>

          <InkSectionHead label={c.badge} heading={c.title} level="h1" className="ink-case__head" />

          <div className="ink-grid">
            <InkReveal className="ink-case__lead" stagger={0.1} delay={0.35}>
              <p className="ink-case__tagline">{c.tagline}</p>
              <p className="ink-prose">{c.intro}</p>
              <div className="ink-actions">{actions}</div>
              {note && <p className="ink-cap ink-case__note">{note}</p>}
            </InkReveal>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------- visual -- */}
      <div className="ink-section ink-section--tight">
        <div className="ink-shell">{visual}</div>
      </div>

      {/* ---------------------------------------------------- how it works -- */}
      <Part index={1} title={c.howItWorksTitle}>
        <Steps steps={c.howItWorks} />
      </Part>

      {/* --------------------------------------------------- under the hood -- */}
      <Part index={2} title={c.deepDive.title}>
        {c.deepDive.intro && (
          <InkReveal>
            <p className="ink-prose ink-prose--quiet">{c.deepDive.intro}</p>
          </InkReveal>
        )}

        <div className="ink-case__block">
          <InkTitle as="h3" className="ink-case__subtitle">
            {c.deepDive.signalPathTitle}
          </InkTitle>
          <InkReveal>
            <p className="ink-prose">{c.deepDive.signalPathIntro}</p>
          </InkReveal>

          {/* The path a signal takes, read left to right like a sentence. */}
          <InkReveal as="ul" className="ink-path" stagger={0.07}>
            {c.deepDive.signalPath.map((node, i) => (
              <li key={node} className={`ink-path__node ${i === 1 ? 'is-live' : ''}`}>
                {i === 1 && <span className="ink-path__drop" aria-hidden="true" />}
                {node}
                {i < c.deepDive.signalPath.length - 1 && (
                  <svg className="ink-path__arrow" viewBox="0 0 28 8" aria-hidden="true" focusable="false">
                    <path d="M1 4.3C9 3.6 18 3.7 25 4M21.5 1.2 26.6 4l-5.1 2.9" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                )}
              </li>
            ))}
          </InkReveal>
        </div>

        <div className="ink-case__block">
          <InkTitle as="h3" className="ink-case__subtitle">
            {c.deepDive.frameMathTitle}
          </InkTitle>
          <InkReveal as="dl" className="ink-stats" stagger={0.08}>
            {c.deepDive.frameMath.map((stat) => (
              <div key={stat.label} className="ink-stats__cell">
                <dt className="ink-stats__value">{stat.value}</dt>
                <dd className="ink-cap">{stat.label}</dd>
              </div>
            ))}
          </InkReveal>
        </div>

        <div className="ink-case__block ink-points">
          {c.deepDive.points.map((point) => (
            <InkReveal key={point.title} className="ink-points__row">
              <h3 className="ink-points__title">{point.title}</h3>
              <p className="ink-prose">{point.body}</p>
            </InkReveal>
          ))}
        </div>
      </Part>

      {/* -------------------------------------------------------- features -- */}
      <Part index={3} title={c.featuresTitle}>
        <InkReveal as="ul" className="ink-bullets" stagger={0.05}>
          {c.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </InkReveal>
      </Part>

      {/* ----------------------------------------------------------- stack -- */}
      <Part index={4} title={c.stackTitle}>
        <InkReveal as="ul" className="ink-stack" stagger={0.04}>
          {c.stack.map((tech) => (
            <li key={tech} className="ink-cap">
              {tech}
            </li>
          ))}
        </InkReveal>
      </Part>

      {/* --------------------------------------------------------- install -- */}
      <Part index={5} title={c.installTitle}>
        <Steps steps={c.installSteps} />
      </Part>

      {/* ----------------------------------------------------- limitations -- */}
      <Part index={6} title={c.limitationsTitle}>
        <InkReveal>
          <p className="ink-prose">{c.limitations}</p>
        </InkReveal>
      </Part>

      {/* ------------------------------------------------------- next step -- */}
      <section className="ink-section">
        <div className="ink-shell">
          <BrushDivider />
          <div className="ink-grid ink-next">
            <InkTitle as="p" className="ink-next__title">
              {language === 'nl' ? 'Iets te bespreken?' : 'Something to discuss?'}
            </InkTitle>
            <InkReveal className="ink-next__actions">
              <Link className="ink-btn" to="/" state={{ scrollTo: 'ink-contact' }}>
                {language === 'nl' ? 'Stuur een bericht' : 'Send a message'}
              </Link>
              <Link className="ink-btn ink-btn--quiet" to="/" state={{ scrollTo: 'ink-work' }}>
                {language === 'nl' ? 'Meer werk' : 'More work'}
              </Link>
            </InkReveal>
          </div>
        </div>
      </section>
    </article>
  );
};

export default InkCaseStudy;

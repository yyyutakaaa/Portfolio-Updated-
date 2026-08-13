import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import KineticHeading from './motion/KineticHeading';
import Reveal from './motion/Reveal';
import { useLanguage } from '../contexts/LanguageContext';

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

interface CaseStudyProps {
  content: CaseStudyContent;
  /** Primary action(s) for the header. Keep it to one where possible. */
  actions: React.ReactNode;
  note?: string;
  /** The hero visual: a screenshot plate, a gallery, whatever the project needs. */
  visual: React.ReactNode;
}

/** A numbered, ruled list — used for both the walkthrough and the install steps. */
const StepList: React.FC<{ steps: string[]; small?: boolean }> = ({ steps, small = false }) => (
  <Reveal as="ol" stagger={0.06} className="mt-10 border-t border-border">
    {steps.map((step, i) => (
      <li key={step} className="grid grid-cols-[2.5rem_1fr] gap-2 border-b border-border py-6 md:grid-cols-[5rem_1fr]">
        <span className="index-num pt-1">{String(i + 1).padStart(2, '0')}</span>
        <span className={small ? 'text-sm text-textDim' : 'text-textDim'}>{step}</span>
      </li>
    ))}
  </Reveal>
);

/**
 * A project told as one continuous scroll rather than a stack of cards: the
 * story first, the engineering underneath it, and the caveats last.
 */
const CaseStudy: React.FC<CaseStudyProps> = ({ content, actions, note, visual }) => {
  const { language } = useLanguage();
  const c = content;

  return (
    <div className="container-narrow">
      <Link
        to="/"
        className="group inline-flex items-center gap-2.5 text-textDim hover:text-textMain"
      >
        <ArrowLeft
          size={14}
          strokeWidth={1.6}
          aria-hidden="true"
          className="transition-transform duration-500 ease-soft group-hover:-translate-x-1"
        />
        <span className="label group-hover:text-textMain">{c.back}</span>
      </Link>

      {/* ----------------------------------------------------------- header -- */}
      <header className="mt-16 border-b border-border pb-16">
        {/* A category kicker, not a heading — it sits above the h1. */}
        <span className="label">{c.badge}</span>

        <KineticHeading
          as="h1"
          trigger="load"
          delay={0.1}
          className="display display-tight mt-7 text-[clamp(3.5rem,13vw,10rem)]"
        >
          {c.title}
        </KineticHeading>

        <p className="headline mt-8 text-2xl text-textDim md:text-3xl">{c.tagline}</p>

        <Reveal delay={0.2} stagger={0.08} className="mt-12">
          <p className="lede prose-dim">{c.intro}</p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center">{actions}</div>
          {note && <p className="index-num mt-6 block">{note}</p>}
        </Reveal>
      </header>

      {/* ----------------------------------------------------------- visual -- */}
      <div className="mt-20">{visual}</div>

      {/* --------------------------------------------------- how it works -- */}
      <section className="mt-28 md:mt-40">
        <div className="flex items-baseline gap-5 border-t border-border pt-5">
          <span className="index-num" aria-hidden="true">01</span>
          <h2 className="label">{c.howItWorksTitle}</h2>
        </div>
        <StepList steps={c.howItWorks} />
      </section>

      {/* ------------------------------------------------- under the hood -- */}
      <section className="mt-28 md:mt-40">
        <div className="flex items-baseline gap-5 border-t border-border pt-5">
          <span className="index-num" aria-hidden="true">02</span>
          <h2 className="label">{c.deepDive.title}</h2>
        </div>

        {c.deepDive.intro && <p className="prose-dim mt-8 text-sm italic">{c.deepDive.intro}</p>}

        {/* Signal path — the same node-and-link idea as the hero, made literal. */}
        <div className="mt-16">
          <KineticHeading as="h3" className="headline text-[clamp(1.75rem,3.5vw,2.5rem)]">
            {c.deepDive.signalPathTitle}
          </KineticHeading>
          <p className="prose-dim mt-6">{c.deepDive.signalPathIntro}</p>

          <Reveal as="ol" stagger={0.08} className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-3">
            {c.deepDive.signalPath.map((node, i) => (
              <li key={node} className="flex items-center gap-3">
                <span className={`pill ${i === 1 ? 'pill--live' : ''}`}>
                  {i === 1 && <span className="dot dot--sm" aria-hidden="true" />}
                  {node}
                </span>
                {i < c.deepDive.signalPath.length - 1 && (
                  <ArrowRight size={13} strokeWidth={1.4} className="shrink-0 text-textFaint" aria-hidden="true" />
                )}
              </li>
            ))}
          </Reveal>
        </div>

        {/* Stat band */}
        <div className="mt-20">
          <KineticHeading as="h3" className="headline text-[clamp(1.75rem,3.5vw,2.5rem)]">
            {c.deepDive.frameMathTitle}
          </KineticHeading>

          <Reveal as="dl" stagger={0.08} className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {c.deepDive.frameMath.map((stat) => (
              <div key={stat.label} className="tile">
                <dt className="stat-value text-[clamp(1.75rem,3.4vw,2.75rem)]">{stat.value}</dt>
                <dd className="index-num mt-4">{stat.label}</dd>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Points: heading holds still on the left while the body scrolls past. */}
        <div className="mt-20 space-y-14">
          {c.deepDive.points.map((point) => (
            <Reveal key={point.title} className="grid gap-4 border-t border-border pt-7 md:grid-cols-12 md:gap-10">
              <h3 className="headline text-xl md:col-span-4 md:text-2xl">{point.title}</h3>
              <p className="text-textDim md:col-span-8">{point.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* --------------------------------------------------------- features -- */}
      <section className="mt-28 md:mt-40">
        <div className="flex items-baseline gap-5 border-t border-border pt-5">
          <span className="index-num" aria-hidden="true">03</span>
          <h2 className="label">{c.featuresTitle}</h2>
        </div>

        <Reveal as="ul" stagger={0.05} className="mt-10 grid sm:grid-cols-2 sm:gap-x-12">
          {c.features.map((feature) => (
            <li key={feature} className="flex items-baseline gap-4 border-b border-border py-4">
              <span className="dot dot--sm" aria-hidden="true" />
              <span className="text-sm text-textDim">{feature}</span>
            </li>
          ))}
        </Reveal>
      </section>

      {/* ------------------------------------------------------------ stack -- */}
      <section className="mt-28 md:mt-40">
        <div className="flex items-baseline gap-5 border-t border-border pt-5">
          <span className="index-num" aria-hidden="true">04</span>
          <h2 className="label">{c.stackTitle}</h2>
        </div>

        <Reveal stagger={0.05} className="mt-10 flex flex-wrap gap-2.5">
          {c.stack.map((tech) => (
            <span key={tech} className="pill">
              {tech}
            </span>
          ))}
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- install -- */}
      <section className="mt-28 md:mt-40">
        <div className="flex items-baseline gap-5 border-t border-border pt-5">
          <span className="index-num" aria-hidden="true">05</span>
          <h2 className="label">{c.installTitle}</h2>
        </div>
        <StepList steps={c.installSteps} small />
      </section>

      {/* ------------------------------------------------------ limitations -- */}
      <section className="mt-28 md:mt-40">
        <div className="flex items-baseline gap-5 border-t border-border pt-5">
          <span className="index-num" aria-hidden="true">06</span>
          <h2 className="label">{c.limitationsTitle}</h2>
        </div>
        <Reveal>
          <p className="prose-dim mt-10">{c.limitations}</p>
        </Reveal>
      </section>

      {/* -------------------------------------------------------- next step -- */}
      <section className="mt-28 border-t border-border pt-16 md:mt-40">
        <KineticHeading className="display text-[clamp(2rem,6vw,4.5rem)]">
          {language === 'nl' ? 'Iets te bespreken?' : 'Something to discuss?'}
        </KineticHeading>
        <Reveal className="mt-12">
          <Link to="/contact" className="btn">
            {language === 'nl' ? 'Contact' : 'Contact'}
            <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
          </Link>
        </Reveal>
      </section>
    </div>
  );
};

export default CaseStudy;

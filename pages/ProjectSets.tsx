import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import { useLanguage } from '../contexts/LanguageContext';

const APP_URL = 'https://sets.ink';

const SCREENS = ['dashboard', 'workout', 'nutrition', 'social', 'progression', 'history'];

const ProjectSets: React.FC = () => {
  const { t } = useLanguage();
  const s = t.setsPage;

  return (
    <div className="mx-auto max-w-4xl">

      <Link
        to="/"
        aria-label={s.back}
        className="group mb-14 inline-flex items-center gap-2.5 text-sm text-textDim hover:text-textMain"
      >
        <ArrowLeft size={14} strokeWidth={1.4} aria-hidden="true" className="transition-transform duration-500 group-hover:-translate-x-1" />
        {s.back}
      </Link>

      {/* Header */}
      <header className="border-b border-border pb-12">
        <span className="eyebrow">{s.badge}</span>
        <h1 className="display mt-6 text-[clamp(3rem,10vw,7rem)]">{s.title}</h1>
        <p className="serif mt-4 text-2xl italic text-textDim">{s.tagline}</p>
        <p className="lede mt-10 max-w-prose text-textDim">{s.intro}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href={APP_URL} target="_blank" rel="noopener noreferrer" className="button-solid">
            {s.openCta}
            <ArrowUpRight size={15} strokeWidth={1.4} aria-hidden="true" />
          </a>
        </div>
        <p className="mt-5 text-xs text-textDim">{s.openNote}</p>
      </header>

      {/* Screenshot gallery */}
      <Reveal as="section" className="mt-20">
        <h2 className="eyebrow">{s.galleryTitle}</h2>
        <div className="hscroll -mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-0 sm:px-0">
          {SCREENS.map((screen: string, i: number) => (
            <figure key={screen} className="w-[220px] shrink-0 snap-start sm:w-[248px]">
              <div className="plate">
                <img
                  src={`/sets/screens/${screen}-640.webp`}
                  srcSet={`/sets/screens/${screen}-640.webp 640w, /sets/screens/${screen}-960.webp 960w`}
                  sizes="248px"
                  width="1290"
                  height="2796"
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <figcaption className="mt-3 text-sm text-textDim">
                <span className="index-number mr-2">{String(i + 1).padStart(2, '0')}</span>
                {s.gallery[i]}
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>

      {/* Fast logging */}
      <Reveal as="section" className="mt-24">
        <h2 className="eyebrow">{s.howItWorksTitle}</h2>
        <ol className="mt-8 border-t border-border">
          {s.howItWorks.map((step: string, i: number) => (
            <li key={step} className="flex gap-6 border-b border-border py-6">
              <span className="index-number shrink-0 pt-1">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-textDim">{step}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Under the hood */}
      <Reveal as="section" className="mt-24">
        <h2 className="eyebrow">{s.deepDive.title}</h2>
        <p className="mt-4 max-w-prose text-sm italic text-textDim">{s.deepDive.intro}</p>

        <div className="mt-10">
          <h3 className="serif text-3xl">{s.deepDive.signalPathTitle}</h3>
          <p className="mt-5 max-w-prose text-textDim">{s.deepDive.signalPathIntro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
            {s.deepDive.signalPath.map((node: string, i: number) => (
              <React.Fragment key={node}>
                <span className={`pill ${i === 1 ? 'border-borderActive text-textMain' : ''}`}>
                  {node}
                </span>
                {i < s.deepDive.signalPath.length - 1 && (
                  <ArrowRight size={13} strokeWidth={1.2} className="shrink-0 text-textDim/60" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="serif text-3xl">{s.deepDive.frameMathTitle}</h3>
          <dl className="mt-8 grid grid-cols-2 border-t border-border sm:grid-cols-4">
            {s.deepDive.frameMath.map((stat: { value: string; label: string }) => (
              <div key={stat.label} className="border-b border-border py-6 pr-6">
                <dt className="display text-4xl">{stat.value}</dt>
                <dd className="mt-2 text-xs uppercase tracking-[0.14em] text-textDim">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-16 space-y-10">
          {s.deepDive.points.map((point: { title: string; body: string }) => (
            <div key={point.title} className="border-t border-border pt-6">
              <h3 className="serif text-2xl">{point.title}</h3>
              <p className="mt-3 max-w-prose text-textDim">{point.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Features */}
      <Reveal as="section" className="mt-24">
        <h2 className="eyebrow">{s.featuresTitle}</h2>
        <ul className="mt-8 grid border-t border-border sm:grid-cols-2 sm:gap-x-10">
          {s.features.map((feature: string) => (
            <li key={feature} className="border-b border-border py-4 text-textDim">
              {feature}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Tech stack */}
      <Reveal as="section" className="mt-24">
        <h2 className="eyebrow">{s.stackTitle}</h2>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {s.stack.map((tech: string) => (
            <span key={tech} className="pill">{tech}</span>
          ))}
        </div>
      </Reveal>

      {/* Install */}
      <Reveal as="section" className="mt-24">
        <h2 className="eyebrow">{s.installTitle}</h2>
        <ol className="mt-8 border-t border-border">
          {s.installSteps.map((step: string, i: number) => (
            <li key={step} className="flex gap-6 border-b border-border py-5">
              <span className="index-number shrink-0 pt-1">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-sm text-textDim">{step}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Limitations */}
      <Reveal as="section" className="mt-24">
        <h2 className="eyebrow">{s.limitationsTitle}</h2>
        <p className="mt-6 max-w-prose text-textDim">{s.limitations}</p>
      </Reveal>

    </div>
  );
};

export default ProjectSets;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Download } from 'lucide-react';
import Reveal from '../components/Reveal';
import RevealText from '../components/RevealText';
import ProjectPlate from '../components/ProjectPlate';
import AnimatedCounter from '../components/AnimatedCounter';
import MagneticButton from '../components/MagneticButton';
import { useLanguage } from '../contexts/LanguageContext';

const GITHUB_URL = 'https://github.com/yyyutakaaa/Muted';
const DOWNLOAD_URL = 'https://github.com/yyyutakaaa/Muted/releases/download/v0.1.0/Muted-Setup-0.1.0.exe';

interface FrameStat {
  value: string;
  label: string;
}

/** Splits a stat string like "48 kHz" into a numeric part + unit suffix so it
 * can drive AnimatedCounter. Returns null for non-numeric values (left as
 * plain static text by the caller). */
const parseStatValue = (value: string): { num: number; decimals: number; suffix: string } | null => {
  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, numStr, rest] = match;
  return {
    num: parseFloat(numStr),
    decimals: numStr.includes('.') ? numStr.split('.')[1].length : 0,
    suffix: rest,
  };
};

const ProjectMuted: React.FC = () => {
  const { t } = useLanguage();
  const m = t.mutedPage;

  return (
    <div className="mx-auto max-w-4xl">

      <Link
        to="/"
        aria-label={m.back}
        className="group mb-14 inline-flex items-center gap-2.5 text-sm text-textDim hover:text-textMain"
      >
        <ArrowLeft size={14} strokeWidth={1.4} aria-hidden="true" className="transition-transform duration-500 group-hover:-translate-x-1" />
        {m.back}
      </Link>

      {/* Header */}
      <header className="border-b border-border pb-12">
        <span className="eyebrow">{m.badge}</span>
        <RevealText as="h1" lines={[m.title]} className="display mt-6 text-[clamp(3rem,10vw,7rem)]" />
        <p className="serif mt-4 text-2xl italic text-textDim">{m.tagline}</p>
        <p className="lede mt-10 max-w-prose text-textDim">{m.intro}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <MagneticButton>
            <a href={DOWNLOAD_URL} className="button-solid">
              <Download size={15} strokeWidth={1.4} aria-hidden="true" />
              {m.downloadCta}
            </a>
          </MagneticButton>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="button-outline">
            {m.githubCta}
          </a>
        </div>
        <p className="mt-5 text-xs text-textDim">{m.downloadNote}</p>
      </header>

      {/* Screenshot */}
      <ProjectPlate to="/projects/muted" cursorLabel="Muted" className="mt-16">
        <picture>
          <source
            type="image/webp"
            srcSet="/muted-screenshot-800.webp 800w, /muted-screenshot-1400.webp 1400w"
            sizes="(max-width: 900px) calc(100vw - 40px), 896px"
          />
          <img
            src="/muted-screenshot.png"
            width="1573"
            height="978"
            alt={m.screenshotAlt}
            decoding="async"
          />
        </picture>
      </ProjectPlate>

      {/* How it works */}
      <Reveal as="section" className="mt-24">
        <h2 className="eyebrow">{m.howItWorksTitle}</h2>
        <ol className="mt-8 border-t border-border">
          {m.howItWorks.map((step: string, i: number) => (
            <li key={step} className="flex gap-6 border-b border-border py-6">
              <span className="index-number shrink-0 pt-1">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-textDim">{step}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Under the hood */}
      <Reveal as="section" className="mt-24">
        <h2 className="eyebrow">{m.deepDive.title}</h2>

        <div className="mt-10">
          <h3 className="serif text-3xl">{m.deepDive.signalPathTitle}</h3>
          <p className="mt-5 max-w-prose text-textDim">{m.deepDive.signalPathIntro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-3">
            {m.deepDive.signalPath.map((node: string, i: number) => (
              <React.Fragment key={node}>
                <span className={`pill ${i === 1 ? 'border-borderActive text-textMain' : ''}`}>
                  {node}
                </span>
                {i < m.deepDive.signalPath.length - 1 && (
                  <ArrowRight size={13} strokeWidth={1.2} className="shrink-0 text-textDim/60" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="serif text-3xl">{m.deepDive.frameMathTitle}</h3>
          <dl className="mt-8 grid grid-cols-2 border-t border-border sm:grid-cols-4">
            {m.deepDive.frameMath.map((stat: FrameStat) => {
              const parsed = parseStatValue(stat.value);
              return (
                <div key={stat.label} className="border-b border-border py-6 pr-6">
                  <dt className="display text-4xl">
                    {parsed ? (
                      <AnimatedCounter value={parsed.num} decimals={parsed.decimals} suffix={parsed.suffix} />
                    ) : (
                      stat.value
                    )}
                  </dt>
                  <dd className="mt-2 text-xs uppercase tracking-[0.14em] text-textDim">{stat.label}</dd>
                </div>
              );
            })}
          </dl>
        </div>

        <div className="mt-16 space-y-10">
          {m.deepDive.points.map((point: { title: string; body: string }) => (
            <div key={point.title} className="border-t border-border pt-6">
              <h3 className="serif text-2xl">{point.title}</h3>
              <p className="mt-3 max-w-prose text-textDim">{point.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Features */}
      <Reveal as="section" className="mt-24">
        <h2 className="eyebrow">{m.featuresTitle}</h2>
        <ul className="mt-8 grid border-t border-border sm:grid-cols-2 sm:gap-x-10">
          {m.features.map((feature: string) => (
            <li key={feature} className="border-b border-border py-4 text-textDim">
              {feature}
            </li>
          ))}
        </ul>
      </Reveal>

      {/* Tech stack */}
      <Reveal as="section" className="mt-24">
        <h2 className="eyebrow">{m.stackTitle}</h2>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {m.stack.map((tech: string) => (
            <span key={tech} className="pill">{tech}</span>
          ))}
        </div>
      </Reveal>

      {/* Install */}
      <Reveal as="section" className="mt-24">
        <h2 className="eyebrow">{m.installTitle}</h2>
        <ol className="mt-8 border-t border-border">
          {m.installSteps.map((step: string, i: number) => (
            <li key={step} className="flex gap-6 border-b border-border py-5">
              <span className="index-number shrink-0 pt-1">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-sm text-textDim">{step}</span>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Limitations */}
      <Reveal as="section" className="mt-24">
        <h2 className="eyebrow">{m.limitationsTitle}</h2>
        <p className="mt-6 max-w-prose text-textDim">{m.limitations}</p>
      </Reveal>

    </div>
  );
};

export default ProjectMuted;

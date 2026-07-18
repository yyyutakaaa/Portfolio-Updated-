import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, ArrowRight, Download, Github, Mic, CheckCircle2, AlertTriangle, Terminal, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

const GITHUB_URL = 'https://github.com/yyyutakaaa/Muted';
const DOWNLOAD_URL = 'https://github.com/yyyutakaaa/Muted/releases/download/v0.1.0/Muted-Setup-0.1.0.exe';

const ProjectMuted: React.FC = () => {
  const { t } = useLanguage();
  const m = t.mutedPage;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        to="/"
        aria-label={m.back}
        className="inline-flex items-center gap-2 text-textDim hover:text-textMain transition-colors font-mono text-sm uppercase tracking-wider mb-8 group"
      >
        <ArrowLeft size={14} aria-hidden="true" className="group-hover:-translate-x-1 transition-transform" />
        {m.back}
      </Link>

      {/* Header */}
      <header className="detail-hero mb-14">
        <div className="flex items-start sm:items-center gap-4 mb-4">
          <div className="bg-accent/10 p-4 rounded-2xl border border-accent/20 shrink-0">
            <Mic className="text-accent" size={32} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-textDim border border-border px-1.5 py-0.5 rounded uppercase tracking-wider">
              {m.badge}
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-textMain break-words mt-1">
              {m.title}
            </h1>
            <p className="text-sm font-mono text-accent mt-1">{m.tagline}</p>
          </div>
        </div>
        <p className="text-textDim text-sm md:text-base leading-relaxed mt-4">{m.intro}</p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <a
            href={DOWNLOAD_URL}
            className="inline-flex items-center justify-center gap-2 bg-accent text-bg px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-textMain"
          >
            <Download size={16} aria-hidden="true" />
            {m.downloadCta}
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-borderActive text-textMain px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm hover:border-accent hover:text-accent"
          >
            <Github size={16} aria-hidden="true" />
            {m.githubCta}
          </a>
        </div>
        <p className="text-xs font-mono text-textDim mt-3">{m.downloadNote}</p>
      </header>

      {/* Screenshot */}
      <section className="detail-section mb-14">
        <picture>
          <source
            type="image/webp"
            srcSet="/muted-screenshot-800.webp 800w, /muted-screenshot-1400.webp 1400w"
            sizes="(max-width: 900px) calc(100vw - 32px), 896px"
          />
          <img
            src="/muted-screenshot.png"
            width="1573"
            height="978"
            alt={m.screenshotAlt}
            decoding="async"
            className="w-full rounded-2xl border border-border shadow-[0_28px_80px_rgba(0,0,0,0.38)]"
          />
        </picture>
      </section>

      {/* How it works */}
      <section className="detail-section mb-14">
        <h2 className="text-xl font-bold text-textMain mb-4 border-b border-border pb-2">{m.howItWorksTitle}</h2>
        <ol className="space-y-3">
          {m.howItWorks.map((step: string, i: number) => (
            <li key={i} className="flex gap-4 text-sm text-textDim leading-relaxed">
              <span className="shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-[11px] font-mono text-textMain">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Deep dive - Under the hood */}
      <section className="detail-section mb-16">
        <h2 className="text-xl font-bold text-textMain mb-6 border-b border-border pb-2 flex items-center gap-2">
          <Cpu size={18} className="text-accent" aria-hidden="true" />
          {m.deepDive.title}
        </h2>

        {/* Signal path */}
        <div className="bg-surface border border-border rounded-2xl p-5 md:p-7 mb-8">
          <h3 className="text-sm font-mono uppercase tracking-wider text-textDim mb-3">{m.deepDive.signalPathTitle}</h3>
          <p className="text-sm text-textDim leading-relaxed mb-5">{m.deepDive.signalPathIntro}</p>
          <div className="flex flex-wrap items-center gap-2">
            {m.deepDive.signalPath.map((node: string, i: number) => (
              <React.Fragment key={i}>
                <span
                  className={`text-xs font-mono px-3 py-2 rounded border ${
                    i === 1
                      ? 'bg-accent/10 border-accent/40 text-accent'
                      : 'bg-bg/40 border-border text-textDim'
                  }`}
                >
                  {node}
                </span>
                {i < m.deepDive.signalPath.length - 1 && (
                  <ArrowRight size={14} className="text-textDim/50 shrink-0" aria-hidden="true" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Frame math stat tiles */}
        <h3 className="text-sm font-mono uppercase tracking-wider text-textDim mb-3">{m.deepDive.frameMathTitle}</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {m.deepDive.frameMath.map((stat: { value: string; label: string }, i: number) => (
            <div key={i} className="bg-surface border border-border rounded-2xl p-4 text-center">
              <div className="text-2xl md:text-3xl font-black text-textMain tracking-tight">{stat.value}</div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-textDim mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Deep dive points */}
        <div className="space-y-5">
          {m.deepDive.points.map((point: { title: string; body: string }, i: number) => (
            <div key={i} className="border-l-2 border-accent/40 pl-4">
              <h3 className="text-textMain font-bold text-sm mb-1">{point.title}</h3>
              <p className="text-sm text-textDim leading-relaxed">{point.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="detail-section mb-14">
        <h2 className="text-xl font-bold text-textMain mb-4 border-b border-border pb-2">{m.featuresTitle}</h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {m.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-sm text-textDim">
              <CheckCircle2 size={16} className="text-accent shrink-0 mt-0.5" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {/* Tech stack */}
      <section className="detail-section mb-14">
        <h2 className="text-xl font-bold text-textMain mb-4 border-b border-border pb-2">{m.stackTitle}</h2>
        <div className="flex flex-wrap gap-2">
          {m.stack.map((tech: string, i: number) => (
            <span key={i} className="text-xs font-mono text-textDim bg-surface border border-border px-3 py-1.5 rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Install steps */}
      <section className="detail-section mb-14">
        <h2 className="text-xl font-bold text-textMain mb-4 border-b border-border pb-2 flex items-center gap-2">
          <Terminal size={18} aria-hidden="true" />
          {m.installTitle}
        </h2>
        <ol className="space-y-2 list-decimal pl-5">
          {m.installSteps.map((step: string, i: number) => (
            <li key={i} className="text-sm text-textDim leading-relaxed">{step}</li>
          ))}
        </ol>
      </section>

      {/* Limitations */}
      <section className="detail-section mb-14">
        <h2 className="text-xl font-bold text-textMain mb-4 border-b border-border pb-2 flex items-center gap-2">
          <AlertTriangle size={18} className="text-accent" aria-hidden="true" />
          {m.limitationsTitle}
        </h2>
        <p className="text-sm text-textDim leading-relaxed">{m.limitations}</p>
      </section>

      {/* Footer spacer */}
      <div className="h-16" />
    </div>
  );
};

export default ProjectMuted;

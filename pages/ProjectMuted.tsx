import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeft, Download, Github, Mic, CheckCircle2, AlertTriangle, Terminal } from 'lucide-react';
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
        className="inline-flex items-center gap-2 text-textDim hover:text-white transition-colors font-mono text-sm uppercase tracking-wider mb-8 group"
      >
        <ArrowLeft size={14} aria-hidden="true" className="group-hover:-translate-x-1 transition-transform" />
        {m.back}
      </Link>

      {/* Header */}
      <header className="mb-10 opacity-0 animate-reveal" style={{ animationDelay: '0ms' }}>
        <div className="flex items-start sm:items-center gap-4 mb-4">
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-4 rounded-xl border border-purple-500/20 shrink-0">
            <Mic className="text-purple-400" size={32} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-mono text-textDim border border-border px-1.5 py-0.5 rounded uppercase tracking-wider">
              {m.badge}
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white break-words mt-1">
              {m.title}
            </h1>
            <p className="text-sm font-mono text-purple-400 mt-1">{m.tagline}</p>
          </div>
        </div>
        <p className="text-textDim text-sm md:text-base leading-relaxed mt-4">{m.intro}</p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <a
            href={DOWNLOAD_URL}
            className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-white/90 transition-colors"
          >
            <Download size={16} aria-hidden="true" />
            {m.downloadCta}
          </a>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-white text-white px-6 py-3 rounded-sm font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors"
          >
            <Github size={16} aria-hidden="true" />
            {m.githubCta}
          </a>
        </div>
        <p className="text-xs font-mono text-textDim mt-3">{m.downloadNote}</p>
      </header>

      {/* Screenshot */}
      <section className="mb-10 opacity-0 animate-reveal" style={{ animationDelay: '75ms' }}>
        <img
          src="/muted-screenshot.png"
          alt={m.screenshotAlt}
          className="w-full rounded-lg border border-border shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        />
      </section>

      {/* How it works */}
      <section className="mb-10 opacity-0 animate-reveal" style={{ animationDelay: '100ms' }}>
        <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2">{m.howItWorksTitle}</h2>
        <ol className="space-y-3">
          {m.howItWorks.map((step: string, i: number) => (
            <li key={i} className="flex gap-4 text-sm text-textDim leading-relaxed">
              <span className="shrink-0 w-6 h-6 rounded-full border border-border flex items-center justify-center text-[11px] font-mono text-white">
                {i + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* Features */}
      <section className="mb-10 opacity-0 animate-reveal" style={{ animationDelay: '175ms' }}>
        <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2">{m.featuresTitle}</h2>
        <ul className="grid sm:grid-cols-2 gap-3">
          {m.features.map((feature: string, i: number) => (
            <li key={i} className="flex items-start gap-2 text-sm text-textDim">
              <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {/* Tech stack */}
      <section className="mb-10 opacity-0 animate-reveal" style={{ animationDelay: '250ms' }}>
        <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2">{m.stackTitle}</h2>
        <div className="flex flex-wrap gap-2">
          {m.stack.map((tech: string, i: number) => (
            <span key={i} className="text-xs font-mono text-textDim bg-surface border border-border px-3 py-1.5 rounded">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Install steps */}
      <section className="mb-10 opacity-0 animate-reveal" style={{ animationDelay: '325ms' }}>
        <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2 flex items-center gap-2">
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
      <section className="mb-10 opacity-0 animate-reveal" style={{ animationDelay: '400ms' }}>
        <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2 flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber-400" aria-hidden="true" />
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

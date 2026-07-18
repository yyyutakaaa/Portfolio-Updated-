import React from 'react';
import Tile from '../components/Tile';
import { ArrowRight, Cpu, Network, Server, ShieldCheck, Terminal, GraduationCap, Award, MapPin, ExternalLink, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-16 md:space-y-24">
      {/* Header Section */}
      <header className="portfolio-hero mb-16 mt-8">
        <div className="hero-frame relative flex justify-between items-end border-b border-border pb-7">
          <div>
            <h1 className="portfolio-name text-5xl sm:text-7xl md:text-[clamp(5rem,10vw,9rem)] font-extrabold uppercase tracking-[-0.065em] leading-[0.82] mb-7">
              Mehdi<br />Oulad Khlie
            </h1>
            <h2 className="text-sm md:text-base text-textDim font-mono uppercase tracking-[0.08em]">
              {t.home.role}
            </h2>
          </div>
          <div className="hidden md:block text-right font-mono text-xs text-textDim">
            <div className="flex items-center justify-end gap-2">
              <MapPin size={12} />
              {t.home.location}
            </div>
            <div>UTC+1 // {t.home.localTime.toUpperCase()}</div>
          </div>
          <span className="hero-signal" aria-hidden="true" />
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">

        {/* Featured Project Banner - Muted */}
        <Link
          to="/projects/muted"
          className="md:col-span-4 block z-10 group/banner"
        >
          <Tile
            className="project-panel min-h-[360px] relative overflow-hidden cursor-pointer"
            label={t.home.featuredProject.label}
            delay={0}
            highlight
          >
            {/* Base Background - Dark Stylish Gradient */}
            <div className="project-wash absolute inset-0" />

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center h-full justify-between p-4">
              <div className="flex-1 space-y-6 max-w-2xl">
                <div className="flex flex-wrap gap-2">
                  <span className="project-tag border border-accent/30 text-accent px-3 py-1.5 text-[10px] font-mono rounded-full uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    Windows App
                  </span>
                  <span className="project-tag border border-borderActive text-textDim px-3 py-1.5 text-[10px] font-mono rounded-full uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-textDim"></div>
                    Solo Dev
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-5xl md:text-7xl font-extrabold text-textMain tracking-[-0.055em] leading-none">
                      {t.home.featuredProject.title}
                    </h3>
                    <span className="border border-accent/30 text-accent px-2 py-1 text-[9px] font-mono rounded-full uppercase tracking-wider flex items-center gap-1.5">
                      <span className="status-dot" />
                      NEW
                    </span>
                  </div>
                  <p className="text-textDim text-sm md:text-lg leading-relaxed max-w-xl">
                    {t.home.featuredProject.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {t.home.featuredProject.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-mono text-textDim px-3 py-1.5 rounded-full border border-border">
                      <ShieldCheck size={12} className="text-accent" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 self-end md:self-center">
                <div className="project-cta inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-accent text-accent px-8 py-4 rounded-full font-bold uppercase tracking-wider group-hover/banner:bg-accent group-hover/banner:text-bg">
                  {t.home.featuredProject.cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </div>
              </div>
            </div>
          </Tile>
        </Link>

        {/* Second Project Banner - Grimdelve */}
        <Tile
          className="project-panel md:col-span-4 min-h-[350px] relative overflow-hidden z-10 group/banner"
          label={t.home.secondProject.label}
          delay={50}
          highlight
        >
          {/* Base Background - Dark Stylish Gradient */}
          <div className="project-wash project-wash--muted absolute inset-0" />

          {/* Content Container - Dims and blurs slightly on hover */}
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center h-full justify-between p-4">
            <div className="flex-1 space-y-6 max-w-2xl">
              <div className="flex flex-wrap gap-2">
                <span className="project-tag border border-accent/30 text-accent px-3 py-1.5 text-[10px] font-mono rounded-full uppercase tracking-wider flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                  2D RPG
                </span>
                <span className="project-tag border border-borderActive text-textDim px-3 py-1.5 text-[10px] font-mono rounded-full uppercase tracking-wider flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-textDim"></div>
                  Solo Dev
                </span>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-5xl md:text-7xl font-extrabold text-textMain tracking-[-0.055em] leading-none">
                    {t.home.secondProject.title}
                  </h3>
                </div>
                <p className="text-textDim text-sm md:text-lg leading-relaxed max-w-xl">
                  {t.home.secondProject.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {t.home.secondProject.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono text-textDim px-3 py-1.5 rounded-full border border-border">
                    <ShieldCheck size={12} className="text-accent" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 self-end md:self-center">
              <div
                aria-label="Grimdelve is not public yet"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 border border-dashed border-borderActive text-textDim px-8 py-4 rounded-full font-bold uppercase tracking-wider cursor-default select-none"
              >
                {t.home.secondProject.cta}
                <Lock size={16} aria-hidden="true" />
              </div>
            </div>
          </div>

        </Tile>

        {/* Intro / Bio */}
        <Tile className="md:col-span-3 md:row-span-2 min-h-[300px]" label={t.home.profile.title} delay={100}>
          <div className="flex flex-col justify-between h-full">
            <p className="text-xl md:text-3xl font-medium leading-[1.45] tracking-[-0.025em] text-textMain max-w-3xl">
              {t.home.profile.text}
            </p>
            <div className="mt-8">
              <Link to="/resume" className="inline-flex items-center gap-2 text-accent border border-accent px-6 py-3 rounded-full hover:bg-accent hover:text-bg font-mono text-sm uppercase">
                {t.home.profile.cta} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Tile>

        {/* Location / Status */}
        <Tile className="md:col-span-1 min-h-[140px]" label={t.home.status.label} delay={200}>
          <div className="h-full flex flex-col justify-center">
            <div className="text-3xl font-bold text-textMain mb-1">2027</div>
            <div className="text-xs font-mono text-textDim">{t.home.status.gradYear}</div>
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-accent">
              <span className="status-dot" />
              {t.home.status.available}
            </div>
          </div>
        </Tile>

        {/* Certification */}
        <Tile className="md:col-span-1 min-h-[140px]" label={t.home.certified.label} delay={300} highlight>
          <a
            href="https://www.credly.com/badges/39769716-9d80-4a83-a62f-f642da9e7b40/public_url"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col h-full justify-between cursor-pointer hover:opacity-80 transition-opacity"
          >
            <Award className="text-textMain mb-4" size={32} />
            <div>
              <div className="font-bold text-textMain leading-tight">{t.home.certified.title}</div>
              <div className="text-xs font-mono text-textDim mt-1">{t.home.certified.subtitle}</div>
            </div>
          </a>
        </Tile>

        {/* Skills - Takes up full width on mobile, 2 cols on desktop */}
        <Tile className="md:col-span-2 md:row-span-2" label={t.home.skills.label} delay={400}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-textMain font-mono text-sm border-b border-border pb-2">
                <Server size={16} />
                <span>{t.home.skills.sysAdmin}</span>
              </div>
              <ul className="space-y-2 text-sm text-textDim font-mono">
                {t.home.skills.items.sysAdmin.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-textMain font-mono text-sm border-b border-border pb-2">
                <Network size={16} />
                <span>{t.home.skills.networking}</span>
              </div>
              <ul className="space-y-2 text-sm text-textDim font-mono">
                {t.home.skills.items.networking.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-textMain font-mono text-sm border-b border-border pb-2">
                <ShieldCheck size={16} />
                <span>{t.home.skills.cloudOps}</span>
              </div>
              <ul className="space-y-2 text-sm text-textDim font-mono">
                {t.home.skills.items.cloudOps.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-textMain font-mono text-sm border-b border-border pb-2">
                <Terminal size={16} />
                <span>{t.home.skills.softSkills}</span>
              </div>
              <ul className="space-y-2 text-sm text-textDim font-mono">
                {t.home.skills.items.softSkills.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </Tile>

        {/* Projects Section */}
        <Tile className="md:col-span-2" label={t.home.projects.label} delay={500}>
          <div className="space-y-6">
            {t.home.projects.items.map((project, index) => (
              <div key={index}>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="group/project block cursor-pointer">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <div className="flex items-center gap-2">
                        <h3 className="text-textMain font-bold group-hover/project:text-accent transition-colors">{project.title}</h3>
                      {index === 0 && (
                        <span className="border border-accent/30 text-accent px-2 py-1 text-[9px] font-mono rounded-full uppercase tracking-wider flex items-center gap-1.5">
                          <span className="status-dot" />
                          NEW
                        </span>
                      )}
                      <ExternalLink size={12} aria-hidden="true" className="text-textDim opacity-0 group-hover/project:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[10px] font-mono border border-border px-1 text-textDim text-left sm:text-right sm:ml-2 shrink-0 break-words">{project.stack}</span>
                  </div>
                  <p className="text-sm text-textDim">
                    {project.desc}
                  </p>
                </a>
                {/* Add divider if not last item */}
                {index < t.home.projects.items.length - 1 && (
                  <div className="w-full h-[1px] bg-border my-6" />
                )}
              </div>
            ))}
          </div>
        </Tile>

        {/* Education - Small summary */}
        <Tile className="md:col-span-4" label={t.home.education.label} delay={600}>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex gap-4 items-start">
              <div className="bg-surfaceHighlight p-3 rounded border border-border">
                <GraduationCap className="text-textMain" size={24} />
              </div>
              <div>
                <div className="text-xs font-mono text-accent mb-1">{t.home.education.expected}</div>
                <h3 className="text-xl font-bold text-textMain">{t.home.education.degree1}</h3>
                <p className="text-sm text-textDim mt-1">HOGENT • Gent</p>
              </div>
            </div>

            <div className="hidden md:block w-[1px] bg-border self-stretch" />

            <div className="flex-1 flex gap-4 items-start">
              <div className="bg-surfaceHighlight p-3 rounded border border-border">
                <Cpu className="text-textDim" size={24} />
              </div>
              <div>
                <div className="text-xs font-mono text-textDim mb-1">2018 - 2024</div>
                <h3 className="text-xl font-bold text-textMain">{t.home.education.degree2}</h3>
                <p className="text-sm text-textDim mt-1">Vrij Instituut voor Secundair Onderwijs</p>
                <p className="text-xs text-textDim mt-2">{t.home.education.degree2desc}</p>
              </div>
            </div>
          </div>
        </Tile>

      </div>
    </div>
  );
};

export default Home;

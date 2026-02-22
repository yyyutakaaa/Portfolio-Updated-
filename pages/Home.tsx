import React from 'react';
import Tile from '../components/Tile';
import { ArrowRight, Cpu, Network, Server, ShieldCheck, Terminal, GraduationCap, Award, MapPin, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
  const { t } = useLanguage();

  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  /* Mouse move handler tracks viewport coordinates now for fixed positioning */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <div className="space-y-12">
      {/* Header Section */}
      <header className="mb-16 mt-8">
        <div className="flex justify-between items-end border-b border-border pb-6">
          <div>
            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
              Mehdi<br />Oulad Khlie
            </h1>
            <h2 className="text-lg md:text-xl text-textDim font-mono">
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
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">

        {/* Featured Project Banner - SilentStream */}
        <Tile
          className="md:col-span-4 min-h-[350px] relative overflow-hidden cursor-none z-10 group/banner"
          label={t.home.featuredProject.label}
          delay={0}
          highlight
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Base Background - Dark Stylish Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#0a0f16] to-[#050505]" />

          {/* Content Container - Dims and blurs slightly on hover */}
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center h-full justify-between p-4 transition-all duration-500 group-hover/banner:opacity-10 group-hover/banner:blur-[2px]">
            <div className="flex-1 space-y-6 max-w-2xl">
              <div className="flex flex-wrap gap-2">
                <span className="bg-[#0b1016] border border-orange-500/30 text-orange-400 px-2 py-1 text-[10px] font-mono rounded uppercase tracking-wider flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  Rust
                </span>
                <span className="bg-[#0b1016] border border-blue-500/30 text-blue-400 px-2 py-1 text-[10px] font-mono rounded uppercase tracking-wider flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  Windows
                </span>
              </div>

              <div>
                <h3 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tight drop-shadow-lg">
                  {t.home.featuredProject.title}
                </h3>
                <p className="text-textDim text-sm md:text-lg leading-relaxed max-w-xl">
                  {t.home.featuredProject.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {t.home.featuredProject.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono text-textDim bg-surface/50 px-3 py-1.5 rounded border border-border">
                    <ShieldCheck size={12} className="text-green-400" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 self-end md:self-center">
              <a
                href="https://github.com/yyyutakaaa/SilentStream"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-sm font-bold uppercase tracking-wider hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] pointer-events-auto"
              >
                {t.home.featuredProject.cta}
                <ExternalLink size={18} />
              </a>
            </div>
          </div>

        </Tile>

        {/* Hover Floating Image (Cursor Follower) - Moved OUTSIDE Tile to avoid transform context issues */}
        {isHovering && (
          <div
            className="fixed z-[9999] pointer-events-none"
            style={{
              left: mousePos.x + 20,
              top: mousePos.y + 20,
            }}
          >
            <div className="bg-surfaceHighlight p-2 rounded-xl shadow-[0_30px_60px_rgba(0,0,0,0.8)]">
              <img
                src="/silentstream-preview.png"
                alt="SilentStream Preview"
                className="max-w-[400px] w-auto h-auto rounded-lg shadow-inner bg-black"
              />
            </div>
          </div>
        )}

        {/* Intro / Bio */}
        <Tile className="md:col-span-3 md:row-span-2 min-h-[300px]" label={t.home.profile.title} delay={100}>
          <div className="flex flex-col justify-between h-full">
            <p className="text-lg md:text-2xl font-light leading-relaxed text-textMain max-w-2xl">
              {t.home.profile.text}
            </p>
            <div className="mt-8">
              <Link to="/resume" className="inline-flex items-center gap-2 text-white border border-white px-6 py-3 hover:bg-white hover:text-black transition-colors font-mono text-sm uppercase">
                {t.home.profile.cta} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Tile>

        {/* Location / Status */}
        <Tile className="md:col-span-1 min-h-[140px]" label={t.home.status.label} delay={200}>
          <div className="h-full flex flex-col justify-center">
            <div className="text-3xl font-bold text-white mb-1">2027</div>
            <div className="text-xs font-mono text-textDim">{t.home.status.gradYear}</div>
            <div className="mt-4 flex items-center gap-2 text-xs font-mono text-green-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
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
            <Award className="text-white mb-4" size={32} />
            <div>
              <div className="font-bold text-white leading-tight">{t.home.certified.title}</div>
              <div className="text-xs font-mono text-textDim mt-1">{t.home.certified.subtitle}</div>
            </div>
          </a>
        </Tile>

        {/* Skills - Takes up full width on mobile, 2 cols on desktop */}
        <Tile className="md:col-span-2 md:row-span-2" label={t.home.skills.label} delay={400}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white font-mono text-sm border-b border-border pb-2">
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
              <div className="flex items-center gap-3 text-white font-mono text-sm border-b border-border pb-2">
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
              <div className="flex items-center gap-3 text-white font-mono text-sm border-b border-border pb-2">
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
              <div className="flex items-center gap-3 text-white font-mono text-sm border-b border-border pb-2">
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
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-white font-bold group-hover/project:text-blue-400 transition-colors">{project.title}</h3>
                      {index === 0 && (
                        <span className="bg-green-500/10 border border-green-500/30 text-green-400 px-1.5 py-0.5 text-[9px] font-mono rounded uppercase tracking-wider flex items-center gap-1">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                          </span>
                          NEW
                        </span>
                      )}
                      <ExternalLink size={12} className="text-textDim opacity-0 group-hover/project:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-[10px] font-mono border border-border px-1 text-textDim text-right ml-2 shrink-0">{project.stack}</span>
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
                <GraduationCap className="text-white" size={24} />
              </div>
              <div>
                <div className="text-xs font-mono text-blue-400 mb-1">{t.home.education.expected}</div>
                <h3 className="text-xl font-bold text-white">{t.home.education.degree1}</h3>
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
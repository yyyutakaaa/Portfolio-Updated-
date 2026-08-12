import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import RevealText from '../components/RevealText';
import AnimatedCounter from '../components/AnimatedCounter';
import ProjectPlate from '../components/ProjectPlate';
import SkillsConsole from '../components/SkillsConsole';
import ExperienceLog from '../components/ExperienceLog';
import MagneticButton from '../components/MagneticButton';
import NetworkMesh from '../components/NetworkMesh';
import { useLanguage } from '../contexts/LanguageContext';
import { useSmoothScroll } from '../contexts/SmoothScrollContext';

const CREDLY_URL = 'https://www.credly.com/badges/39769716-9d80-4a83-a62f-f642da9e7b40/public_url';

const Home: React.FC = () => {
  const { t, language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollTo } = useSmoothScroll();

  React.useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    const targetId = state?.scrollTo;
    if (!targetId) return;

    const attempt = (tries = 0) => {
      const el = document.getElementById(targetId);
      if (el) {
        scrollTo(`#${targetId}`, { offset: -84 });
      } else if (tries < 20) {
        requestAnimationFrame(() => attempt(tries + 1));
      }
    };
    requestAnimationFrame(() => attempt());
    navigate(location.pathname, { replace: true, state: {} });
    // Only ever run this once, right after a cross-page nav lands here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skillCategories = [
    { key: 'sysAdmin', title: t.home.skills.sysAdmin, items: t.home.skills.items.sysAdmin },
    { key: 'networking', title: t.home.skills.networking, items: t.home.skills.items.networking },
    { key: 'cloudOps', title: t.home.skills.cloudOps, items: t.home.skills.items.cloudOps },
    { key: 'softSkills', title: t.home.skills.softSkills, items: t.home.skills.items.softSkills },
  ];

  const experienceEntries = t.resume.jobs.map((job, i) => ({
    id: `job-${i}`,
    title: job.role,
    subtitle: job.company,
    period: job.period,
    description: job.description,
  }));

  const educationEntries = t.resume.educationList.map((edu, i) => ({
    id: `edu-${i}`,
    title: edu.degree,
    subtitle: edu.school,
    period: edu.period,
    description: edu.description ? [edu.description] : [],
  }));

  const totalProjects = t.home.projects.items.length + 2;

  return (
    <div>
      {/* Hero */}
      <section
        id="hero"
        className="relative -mt-4 flex min-h-[calc(100svh-9rem)] flex-col justify-center overflow-visible md:-mt-6 md:min-h-[calc(100svh-11rem)]"
      >
        <NetworkMesh className="!absolute !-inset-x-6 !-top-24 !bottom-0 opacity-70 sm:!-inset-x-10" />

        <div className="relative z-10">
          <span className="eyebrow">{t.home.role}</span>

          <RevealText
            as="h1"
            className="display mt-7 text-[clamp(3.25rem,11.5vw,9rem)]"
            lines={['Mehdi', <span className="display-italic">Oulad Khlie</span>]}
          />

          <div className="mt-14 grid gap-8 border-t border-border pt-6 md:grid-cols-12 md:gap-10">
            <Reveal delay={140} className="lede md:col-span-7 lg:col-span-6">
              {language === 'nl'
                ? 'Ik hou de systemen en netwerken draaiende waar mensen dagelijks op rekenen, het liefst zonder dat iemand het merkt.'
                : "I keep the systems and networks people rely on every day running, ideally without anyone noticing."}
            </Reveal>
            <Reveal delay={200} className="flex flex-col gap-3 md:col-span-5 md:items-end lg:col-span-6">
              <span className="meta">{t.home.location}</span>
              <span className="flex items-center gap-2.5 text-sm text-textDim">
                <span className="status-dot" aria-hidden="true" />
                {t.nav.status}
              </span>
            </Reveal>
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollTo('#work', { offset: -84 })}
          className="scroll-cue relative z-10 mt-16 self-start md:mt-24"
        >
          <span className="scroll-cue-line" aria-hidden="true" />
          <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
            {language === 'nl' ? 'Scroll' : 'Scroll'}
          </span>
        </button>
      </section>

      <div className="space-y-28 pt-4 md:space-y-40">

        {/* Selected work */}
        <Section id="work" index="01" label={language === 'nl' ? 'Geselecteerd werk' : 'Selected work'}>
          <div className="space-y-24 md:space-y-32">

            {/* Muted — flagship, dominant */}
            <article className="group/work grid items-center gap-10 md:grid-cols-12 md:gap-14">
              <ProjectPlate to="/projects/muted" cursorLabel={language === 'nl' ? 'Bekijk' : 'View'} className="md:col-span-7">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/muted-screenshot-800.webp 800w, /muted-screenshot-1400.webp 1400w"
                    sizes="(max-width: 767px) calc(100vw - 40px), 640px"
                  />
                  <img
                    src="/muted-screenshot.png"
                    width="1573"
                    height="978"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </ProjectPlate>

              <div className="md:col-span-5">
                <span className="eyebrow">{t.home.featuredProject.label}</span>
                <h3 className="display mt-5 text-5xl md:text-6xl">{t.home.featuredProject.title}</h3>
                <p className="meta mt-3">{t.home.featuredProject.stack}</p>

                <p className="mt-7 text-textDim">{t.home.featuredProject.description}</p>

                <ul className="mt-8 space-y-2.5 border-t border-border pt-6 text-sm text-textDim">
                  {t.home.featuredProject.features.map((feature) => (
                    <li key={feature} className="flex items-baseline gap-3">
                      <span className="text-textDim/60">—</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <MagneticButton>
                  <Link to="/projects/muted" className="link-quiet mt-9">
                    {t.home.featuredProject.cta}
                    <ArrowRight size={15} strokeWidth={1.4} aria-hidden="true" />
                  </Link>
                </MagneticButton>
              </div>
            </article>

            {/* Sets — secondary */}
            <article className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
              <ProjectPlate
                to="/projects/sets"
                cursorLabel={language === 'nl' ? 'Bekijk' : 'View'}
                className="md:order-2 md:col-span-7"
              >
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/sets/preview-800.webp 800w, /sets/preview-1400.webp 1400w"
                    sizes="(max-width: 767px) calc(100vw - 40px), 640px"
                  />
                  <img
                    src="/sets/preview.png"
                    width="1731"
                    height="909"
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </picture>
              </ProjectPlate>

              <div className="md:order-1 md:col-span-5">
                <span className="eyebrow">{t.home.secondProject.label}</span>
                <h3 className="display mt-5 text-5xl md:text-6xl">{t.home.secondProject.title}</h3>
                <p className="meta mt-3">{t.home.secondProject.stack}</p>

                <p className="mt-7 text-textDim">{t.home.secondProject.description}</p>

                <ul className="mt-8 space-y-2.5 border-t border-border pt-6 text-sm text-textDim">
                  {t.home.secondProject.features.map((feature) => (
                    <li key={feature} className="flex items-baseline gap-3">
                      <span className="text-textDim/60">—</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <MagneticButton>
                  <Link to="/projects/sets" className="link-quiet mt-9">
                    {t.home.secondProject.cta}
                    <ArrowRight size={15} strokeWidth={1.4} aria-hidden="true" />
                  </Link>
                </MagneticButton>
              </div>
            </article>

            {/* More projects index */}
            <div>
              <span className="eyebrow">{t.home.projects.label}</span>
              <ul className="mt-8 border-t border-border">
                {t.home.projects.items.map((project) => (
                  <li key={project.title}>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="label"
                      data-cursor-label="GitHub"
                      className="group/row grid gap-3 border-b border-border py-7 md:grid-cols-12 md:gap-8"
                    >
                      <div className="md:col-span-4">
                        <h3 className="serif text-2xl leading-snug group-hover/row:text-textDim">{project.title}</h3>
                        <span className="meta mt-2 block">{project.stack}</span>
                      </div>
                      <p className="text-sm text-textDim md:col-span-7">{project.desc}</p>
                      <span className="text-textDim md:col-span-1 md:flex md:justify-end">
                        <ArrowUpRight
                          size={18}
                          strokeWidth={1.2}
                          aria-hidden="true"
                          className="transition-transform duration-500 group-hover/row:-translate-y-1 group-hover/row:translate-x-1"
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Profile / about */}
        <Section id="about" index="02" label={t.home.profile.title}>
          <div className="grid gap-14 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <div className="lede text-textDim">
                {t.home.profile.text}
              </div>
              <MagneticButton>
                <Link to="/resume" className="link-quiet mt-10">
                  {t.home.profile.cta}
                  <ArrowRight size={15} strokeWidth={1.4} aria-hidden="true" />
                </Link>
              </MagneticButton>
            </div>

            <dl className="divide-y divide-border border-y border-border md:col-span-5 md:self-start">
              <div className="flex items-baseline justify-between gap-6 py-5">
                <dt className="meta">{t.home.status.gradYear}</dt>
                <dd className="stat-figure text-2xl">2027</dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-5">
                <dt className="meta">{t.home.certified.label}</dt>
                <dd className="text-right">
                  <a
                    href={CREDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="serif text-2xl hover:text-textDim"
                  >
                    {t.home.certified.title}
                  </a>
                  <span className="mt-1 block text-xs uppercase tracking-[0.12em] text-textDim">
                    {t.home.certified.subtitle}
                  </span>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-5">
                <dt className="meta">{t.home.status.label}</dt>
                <dd className="flex items-center gap-2.5 text-sm text-textDim">
                  <span className="status-dot" aria-hidden="true" />
                  {t.home.status.available}
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-10 sm:grid-cols-4">
            <div>
              <div className="stat-figure text-4xl md:text-5xl">
                <AnimatedCounter value={totalProjects} suffix="+" />
              </div>
              <p className="meta mt-3">{language === 'nl' ? 'Projecten gebouwd' : 'Projects built'}</p>
            </div>
            <div>
              <div className="stat-figure text-4xl md:text-5xl">
                <AnimatedCounter value={4} />
              </div>
              <p className="meta mt-3">{language === 'nl' ? 'Talen gesproken' : 'Languages spoken'}</p>
            </div>
            <div>
              <div className="stat-figure text-4xl md:text-5xl">1</div>
              <p className="meta mt-3">{language === 'nl' ? 'MS-certificering' : 'MS certification'}</p>
            </div>
            <div>
              <div className="stat-figure text-4xl md:text-5xl">2027</div>
              <p className="meta mt-3">{language === 'nl' ? 'Verwacht diploma' : 'Expected diploma'}</p>
            </div>
          </div>
        </Section>

        {/* Skills */}
        <Section index="03" label={t.home.skills.label}>
          <SkillsConsole categories={skillCategories} />
        </Section>

        {/* Experience & education */}
        <Section id="log" index="04" label={language === 'nl' ? 'Ervaring & opleiding' : 'Experience & education'}>
          <div className="space-y-14">
            <div>
              <h3 className="eyebrow eyebrow--plain text-textDim">{t.resume.experienceTitle}</h3>
              <div className="mt-4">
                <ExperienceLog entries={experienceEntries} defaultOpenIds={['job-0']} />
              </div>
            </div>
            <div>
              <h3 className="eyebrow eyebrow--plain text-textDim">{t.resume.educationTitle}</h3>
              <div className="mt-4">
                <ExperienceLog entries={educationEntries} defaultOpenIds={['edu-0']} />
              </div>
            </div>
          </div>
        </Section>

        {/* Closing call to action */}
        <Reveal as="section" className="border-t border-border pt-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <h2 className="display max-w-xl text-4xl md:text-6xl">
              {language === 'nl' ? 'Iets te bespreken?' : 'Something to discuss?'}
            </h2>
            <MagneticButton>
              <Link to="/contact" className="button-outline self-start md:self-auto">
                {t.nav.contact}
                <ArrowRight size={15} strokeWidth={1.4} aria-hidden="true" />
              </Link>
            </MagneticButton>
          </div>
        </Reveal>

      </div>
    </div>
  );
};

export default Home;

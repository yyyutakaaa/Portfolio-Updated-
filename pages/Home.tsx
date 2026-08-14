import React, { Suspense } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import Section from '../components/Section';
import ProjectScene from '../components/ProjectScene';
import LocalClock from '../components/LocalClock';
import KineticHeading from '../components/motion/KineticHeading';
import Reveal from '../components/motion/Reveal';
import { scrollToId } from '../components/motion/SmoothScroll';
import { useLanguage } from '../contexts/LanguageContext';

const NetworkField = React.lazy(() => import('../components/NetworkField'));

const CREDLY_URL = 'https://www.credly.com/badges/39769716-9d80-4a83-a62f-f642da9e7b40/public_url';

const Home: React.FC = () => {
  const { t, language } = useLanguage();

  /**
   * Bento cells are auto-placed in DOM order, so this order *is* the layout:
   * 5+4+3 fills the first row, the two tall tiles carry into the second, and
   * 5+7 closes it off. Reading order and visual order stay the same thing.
   */
  const skillTile = (title: string, items: string[], span: string, delay: number) => (
    <Reveal key={title} className={`tile ${span}`} delay={delay}>
      <h3 className="label label-ink">{title}</h3>
      <ul className="mt-6 space-y-2.5">
        {items.map((skill) => (
          <li key={skill} className="flex items-baseline gap-3 text-sm text-textDim">
            <span aria-hidden="true" className="index-num">
              ·
            </span>
            {skill}
          </li>
        ))}
      </ul>
    </Reveal>
  );

  return (
    <>
      {/* ------------------------------------------------------------ hero -- */}
      <header className="relative">
        {/* Topology sits behind the type, lazily and only once it can pay for itself. */}
        <div className="pointer-events-none absolute inset-x-0 -top-32 bottom-0 -z-10 overflow-hidden">
          <Suspense fallback={null}>
            <NetworkField className="absolute inset-0 h-full w-full" />
          </Suspense>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg"
          />
        </div>

        <div className="container relative">
          <div className="grid-guides" aria-hidden="true">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} />
            ))}
          </div>

          <div className="relative">
            <Reveal delay={0.1}>
              <span className="label label-ink">{t.home.role}</span>
            </Reveal>

            {/* Second line breaks the grid twice over: it starts where the first
                one ends, and it is drawn as a contour that fills on hover. */}
            <h1 className="hero-name mt-8 md:mt-10">
              <KineticHeading
                as="span"
                trigger="load"
                delay={0.2}
                className="display display-tight block text-[clamp(3.25rem,12vw,10.5rem)]"
              >
                Mehdi
              </KineticHeading>
              {/* Keeps the accessible name "Mehdi Oulad Khlie" rather than running
                  the two display lines together. */}
              <span className="sr-only"> </span>
              <KineticHeading
                as="span"
                trigger="load"
                delay={0.32}
                className="display display-tight text-outline block text-[clamp(3.25rem,12vw,10.5rem)] md:pl-[14%]"
              >
                Oulad Khlie
              </KineticHeading>
            </h1>

            <div className="mt-14 grid gap-10 border-t border-border pt-7 md:mt-20 md:grid-cols-12 md:gap-12">
              <Reveal className="md:col-span-6 lg:col-span-5" delay={0.5}>
                <p className="lede">
                  {language === 'nl'
                    ? 'Ik zorg dat de systemen en netwerken waar mensen elke dag op rekenen gewoon blijven draaien, liefst zonder dat iemand het doorheeft.'
                    : 'I make sure the systems and networks people count on every day just keep running, preferably without anyone noticing.'}
                </p>

                <button type="button" onClick={() => scrollToId('work')} className="link-line mt-10">
                  {language === 'nl' ? 'Geselecteerd werk' : 'Selected work'}
                  <ArrowDown size={14} strokeWidth={1.6} aria-hidden="true" />
                </button>
              </Reveal>

              {/* Status rail — the three facts a recruiter scans for. */}
              <Reveal
                as="dl"
                stagger={0.08}
                delay={0.6}
                className="divide-y divide-border border-y border-border md:col-span-4 md:col-start-9"
              >
                <div className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="label">{language === 'nl' ? 'Locatie' : 'Location'}</dt>
                  <dd className="mono text-xs tracking-[0.1em]">{t.home.location}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="label">{t.home.localTime}</dt>
                  <dd className="mono text-xs tracking-[0.1em]">
                    <LocalClock />
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="label">{t.home.status.label}</dt>
                  <dd className="mono flex items-center gap-2.5 text-xs tracking-[0.1em] text-accent">
                    <span className="dot dot--live" aria-hidden="true" />
                    {t.nav.status}
                  </dd>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------- selected work -- */}
      <div className="container mt-32 space-y-32 md:mt-48 md:space-y-52">
        <Section id="work" index="01" label={language === 'nl' ? 'Geselecteerd werk' : 'Selected work'}>
          <div className="space-y-32 md:space-y-48">
            <ProjectScene
              index="01"
              label={t.home.featuredProject.label}
              title={t.home.featuredProject.title}
              stack={t.home.featuredProject.stack}
              description={t.home.featuredProject.description}
              features={t.home.featuredProject.features}
              cta={t.home.featuredProject.cta}
              to="/projects/sets"
              image={{
                fallback: '/sets/preview.png',
                srcSet: '/sets/preview-800.webp 800w, /sets/preview-1400.webp 1400w',
                width: 1731,
                height: 909,
              }}
              flagship
            />

            <ProjectScene
              index="02"
              label={t.home.secondProject.label}
              title={t.home.secondProject.title}
              stack={t.home.secondProject.stack}
              description={t.home.secondProject.description}
              features={t.home.secondProject.features}
              cta={t.home.secondProject.cta}
              to="/projects/muted"
              image={{
                fallback: '/muted-screenshot.png',
                srcSet: '/muted-screenshot-800.webp 800w, /muted-screenshot-1400.webp 1400w',
                width: 1573,
                height: 978,
              }}
              reversed
            />
          </div>
        </Section>

        {/* --------------------------------------------------------- profile -- */}
        <Section index="02" label={t.home.profile.title}>
          {/* Held to seven columns on purpose — the empty third is the point. */}
          <div className="grid md:grid-cols-12">
            <div className="md:col-span-8 lg:col-span-7">
              <div className="lede text-textDim">{t.home.profile.text}</div>

              <Link to="/resume" className="link-line mt-12">
                {t.home.profile.cta}
                <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Section>

        {/* ---------------------------------------------------- capabilities -- */}
        <Section index="03" label={t.home.skills.label}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-12">
            {skillTile(t.home.skills.sysAdmin, t.home.skills.items.sysAdmin, 'lg:col-span-5 lg:row-span-2', 0)}
            {skillTile(t.home.skills.networking, t.home.skills.items.networking, 'lg:col-span-4', 0.06)}

            {/* Cert tile is set apart: it's the one item with proof behind it. */}
            <Reveal className="md:col-span-2 lg:col-span-3 lg:row-span-2" delay={0.1}>
              <a
                href={CREDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="tile tile--accent group/badge h-full justify-between"
              >
                <span className="label label-ink">{t.home.certified.label}</span>
                <span className="mt-8">
                  <span className="headline block text-3xl">{t.home.certified.title}</span>
                  <span className="index-num mt-3 block">{t.home.certified.subtitle}</span>
                </span>
                <span className="mt-8 flex items-center gap-2">
                  <span className="label !text-accent">Credly</span>
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="text-accent transition-transform duration-500 ease-soft group-hover/badge:-translate-y-0.5 group-hover/badge:translate-x-0.5"
                  />
                </span>
              </a>
            </Reveal>

            {skillTile(t.home.skills.cloudOps, t.home.skills.items.cloudOps, 'lg:col-span-4', 0.12)}
            {skillTile(t.home.skills.softSkills, t.home.skills.items.softSkills, 'lg:col-span-5', 0.18)}

            {/* Live status strip, mirroring the hero rail. */}
            <Reveal className="tile md:col-span-2 lg:col-span-7" delay={0.16}>
              <dl className="grid gap-6 sm:grid-cols-3">
                <div>
                  <dt className="label">{t.home.status.gradYear}</dt>
                  <dd className="headline mt-3 text-4xl">2027</dd>
                </div>
                <div>
                  <dt className="label">{t.home.localTime}</dt>
                  <dd className="headline mt-3 text-4xl">
                    <LocalClock />
                  </dd>
                </div>
                <div>
                  <dt className="label">{t.home.status.label}</dt>
                  <dd className="mt-3 flex items-center gap-2.5">
                    <span className="dot dot--live" aria-hidden="true" />
                    <span className="mono text-xs uppercase tracking-[0.12em] text-accent">
                      {t.home.status.available}
                    </span>
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </Section>

        {/* ------------------------------------------------- project index -- */}
        <Section index="04" label={t.home.projects.label}>
          <ul className="border-t border-border">
            {t.home.projects.items.map((project, index) => (
              <li key={project.title}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/row relative grid gap-3 border-b border-border py-8 transition-colors duration-500 ease-soft md:grid-cols-12 md:items-baseline md:gap-8"
                >
                  {/* Accent hairline sweeps in from the left on hover. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-[-1px] h-px origin-left scale-x-0 bg-accent transition-transform duration-[600ms] ease-soft group-hover/row:scale-x-100 group-focus-visible/row:scale-x-100"
                  />

                  <span className="index-num md:col-span-1">{String(index + 1).padStart(2, '0')}</span>

                  <div className="md:col-span-4">
                    <h3 className="headline text-2xl transition-transform duration-500 ease-soft md:text-[1.75rem] md:group-hover/row:translate-x-1.5">
                      {project.title}
                    </h3>
                    <span className="index-num mt-2 block">{project.stack}</span>
                  </div>

                  <p className="text-sm text-textDim md:col-span-6">{project.desc}</p>

                  <span className="text-textDim md:col-span-1 md:flex md:justify-end">
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.3}
                      aria-hidden="true"
                      className="transition-all duration-500 ease-soft group-hover/row:-translate-y-1 group-hover/row:translate-x-1 group-hover/row:text-accent"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        {/* ------------------------------------------------------ education -- */}
        <Section index="05" label={t.home.education.label}>
          <Reveal className="grid gap-3 md:grid-cols-2" stagger={0.1}>
            <div className="tile">
              <span className="label">{t.home.education.expected}</span>
              <h3 className="headline mt-6 text-2xl md:text-3xl">{t.home.education.degree1}</h3>
              <p className="index-num mt-4">HOGENT · GENT</p>
            </div>
            <div className="tile">
              <span className="label">2018 - 2024</span>
              <h3 className="headline mt-6 text-2xl md:text-3xl">{t.home.education.degree2}</h3>
              <p className="index-num mt-4">VRIJ INSTITUUT VOOR SECUNDAIR ONDERWIJS</p>
              <p className="mt-4 text-sm text-textDim">{t.home.education.degree2desc}</p>
            </div>
          </Reveal>
        </Section>
      </div>

      {/* --------------------------------------------------------- closing -- */}
      <section className="mt-32 border-t border-border pt-20 md:mt-48">
        <div className="container">
          <KineticHeading className="display text-[clamp(2.5rem,8vw,7rem)]">
            {language === 'nl' ? 'Iets te bespreken?' : 'Something to discuss?'}
          </KineticHeading>

          {/* One way out of this section, and it is the contact page. */}
          <Reveal className="mt-14">
            <Link to="/contact" className="btn">
              {t.nav.contact}
              <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        {/* The availability statement, set at display size as a moving contour —
            the one place the site is allowed to raise its voice. */}
        <div className="mt-20 overflow-hidden border-y border-border py-6 md:py-8" aria-hidden="true">
          <div className="marquee">
            {Array.from({ length: 2 }, (_, copy) => (
              <span key={copy} className="flex shrink-0 items-center">
                {Array.from({ length: 3 }, (_, i) => (
                  <span
                    key={i}
                    className="display text-outline flex items-center whitespace-nowrap text-[clamp(2.5rem,6vw,5rem)] text-textMain opacity-60"
                  >
                    {t.nav.status}
                    <span
                      className="mx-8 text-[0.35em] text-accent md:mx-12"
                      style={{ WebkitTextFillColor: 'currentcolor', WebkitTextStroke: '0' }}
                    >
                      ◆
                    </span>
                    {t.home.role}
                    <span
                      className="mx-8 text-[0.35em] text-accent md:mx-12"
                      style={{ WebkitTextFillColor: 'currentcolor', WebkitTextStroke: '0' }}
                    >
                      ◆
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Section from '../components/Section';
import Reveal from '../components/Reveal';
import { useLanguage } from '../contexts/LanguageContext';

const CREDLY_URL = 'https://www.credly.com/badges/39769716-9d80-4a83-a62f-f642da9e7b40/public_url';

const Home: React.FC = () => {
  const { t, language } = useLanguage();

  const skillGroups = [
    { title: t.home.skills.sysAdmin, items: t.home.skills.items.sysAdmin },
    { title: t.home.skills.networking, items: t.home.skills.items.networking },
    { title: t.home.skills.cloudOps, items: t.home.skills.items.cloudOps },
    { title: t.home.skills.softSkills, items: t.home.skills.items.softSkills },
  ];

  return (
    <div className="space-y-28 md:space-y-40">

      {/* Opening */}
      <header>
        <span className="eyebrow">{t.home.role}</span>

        <h1 className="display mt-7 text-[clamp(3.25rem,11.5vw,9rem)]">
          Mehdi
          <br />
          <span className="display-italic">Oulad Khlie</span>
        </h1>

        <div className="mt-14 grid gap-8 border-t border-border pt-6 md:grid-cols-12 md:gap-10">
          <p className="lede md:col-span-7 lg:col-span-6">
            {language === 'nl'
              ? 'Ik hou de systemen en netwerken draaiende waar mensen dagelijks op rekenen, het liefst zonder dat iemand het merkt.'
              : "I keep the systems and networks people rely on every day running, ideally without anyone noticing."}
          </p>
          <div className="flex flex-col gap-3 md:col-span-5 md:items-end lg:col-span-6">
            <span className="meta">{t.home.location}</span>
            <span className="flex items-center gap-2.5 text-sm text-textDim">
              <span className="dot" aria-hidden="true" />
              {t.nav.status}
            </span>
          </div>
        </div>
      </header>

      {/* Selected work */}
      <Section index="01" label={language === 'nl' ? 'Geselecteerd werk' : 'Selected work'}>
        <div className="space-y-24 md:space-y-32">

          {/* Muted */}
          <article className="group/work grid items-center gap-10 md:grid-cols-12 md:gap-14">
            <Link
              to="/projects/muted"
              tabIndex={-1}
              aria-hidden="true"
              className="plate md:col-span-7"
            >
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
            </Link>

            <div className="md:col-span-5">
              <span className="eyebrow">{t.home.featuredProject.label}</span>
              <h3 className="display mt-5 text-5xl md:text-6xl">{t.home.featuredProject.title}</h3>
              <p className="mt-3 text-sm text-textDim">{t.home.featuredProject.stack}</p>

              <p className="mt-7 text-textDim">{t.home.featuredProject.description}</p>

              <ul className="mt-8 space-y-2.5 border-t border-border pt-6 text-sm text-textDim">
                {t.home.featuredProject.features.map((feature) => (
                  <li key={feature} className="flex items-baseline gap-3">
                    <span className="text-textDim/60">—</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to="/projects/muted" className="link-quiet mt-9">
                {t.home.featuredProject.cta}
                <ArrowRight size={15} strokeWidth={1.4} aria-hidden="true" />
              </Link>
            </div>
          </article>

          {/* Grimdelve */}
          <article className="grid items-center gap-10 md:grid-cols-12 md:gap-14">
            <div className="panel panel--quiet flex aspect-[16/10] items-center justify-center md:order-2 md:col-span-7">
              <span className="display text-5xl text-textDim md:text-6xl">
                {t.home.secondProject.title}
              </span>
            </div>

            <div className="md:order-1 md:col-span-5">
              <span className="eyebrow">{t.home.secondProject.label}</span>
              <h3 className="display mt-5 text-5xl md:text-6xl">{t.home.secondProject.title}</h3>
              <p className="mt-3 text-sm text-textDim">{t.home.secondProject.stack}</p>

              <p className="mt-7 text-textDim">{t.home.secondProject.description}</p>

              <ul className="mt-8 space-y-2.5 border-t border-border pt-6 text-sm text-textDim">
                {t.home.secondProject.features.map((feature) => (
                  <li key={feature} className="flex items-baseline gap-3">
                    <span className="text-textDim/60">—</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="serif mt-9 text-lg italic text-textDim">
                {t.home.secondProject.cta}
              </p>
            </div>
          </article>

        </div>
      </Section>

      {/* Profile */}
      <Section index="02" label={t.home.profile.title}>
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <div className="lede text-textDim">
              {t.home.profile.text}
            </div>
            <Link to="/resume" className="link-quiet mt-10">
              {t.home.profile.cta}
              <ArrowRight size={15} strokeWidth={1.4} aria-hidden="true" />
            </Link>
          </div>

          <dl className="divide-y divide-border border-y border-border md:col-span-5 md:self-start">
            <div className="flex items-baseline justify-between gap-6 py-5">
              <dt className="meta">{t.home.status.gradYear}</dt>
              <dd className="serif text-2xl">2027</dd>
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
                <span className="dot" aria-hidden="true" />
                {t.home.status.available}
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      {/* Skills */}
      <Section index="03" label={t.home.skills.label}>
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="eyebrow">{group.title}</h3>
              <ul className="mt-5 space-y-3 border-t border-border pt-5 text-sm text-textDim">
                {group.items.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Other projects */}
      <Section index="04" label={t.home.projects.label}>
        <ul className="border-t border-border">
          {t.home.projects.items.map((project) => (
            <li key={project.title}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group/row grid gap-3 border-b border-border py-7 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-4">
                  <h3 className="serif text-2xl leading-snug group-hover/row:text-textDim">{project.title}</h3>
                  <span className="mt-2 block text-xs uppercase tracking-[0.12em] text-textDim">{project.stack}</span>
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
      </Section>

      {/* Education */}
      <Section index="05" label={t.home.education.label}>
        <div className="grid gap-12 border-t border-border pt-10 md:grid-cols-2 md:gap-16">
          <div>
            <span className="meta">{t.home.education.expected}</span>
            <h3 className="serif mt-3 text-3xl leading-tight">{t.home.education.degree1}</h3>
            <p className="mt-3 text-sm text-textDim">HOGENT — Gent</p>
          </div>
          <div>
            <span className="meta">2018 — 2024</span>
            <h3 className="serif mt-3 text-3xl leading-tight">{t.home.education.degree2}</h3>
            <p className="mt-3 text-sm text-textDim">Vrij Instituut voor Secundair Onderwijs</p>
            <p className="mt-2 text-sm text-textDim">{t.home.education.degree2desc}</p>
          </div>
        </div>
      </Section>

      {/* Closing call to action */}
      <Reveal as="section" className="border-t border-border pt-14">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 className="display max-w-xl text-4xl md:text-6xl">
            {language === 'nl' ? 'Iets te bespreken?' : 'Something to discuss?'}
          </h2>
          <Link to="/contact" className="button-outline self-start md:self-auto">
            {t.nav.contact}
            <ArrowRight size={15} strokeWidth={1.4} aria-hidden="true" />
          </Link>
        </div>
      </Reveal>

    </div>
  );
};

export default Home;

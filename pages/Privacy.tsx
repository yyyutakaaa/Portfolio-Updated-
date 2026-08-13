import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import KineticHeading from '../components/motion/KineticHeading';
import Reveal from '../components/motion/Reveal';
import { useLanguage } from '../contexts/LanguageContext';

const Privacy: React.FC = () => {
  const { t } = useLanguage();
  const p = t.privacy;

  return (
    <div className="container-narrow">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          aria-label={p.backToHome}
          className="group inline-flex items-center gap-2.5 text-textDim hover:text-textMain"
        >
          <ArrowLeft
            size={14}
            strokeWidth={1.6}
            aria-hidden="true"
            className="transition-transform duration-500 ease-soft group-hover:-translate-x-1"
          />
          <span className="label group-hover:text-textMain">{p.backToHome}</span>
        </Link>

        <header className="mt-16 border-b border-border pb-12">
          <span className="label">{p.lastUpdated}</span>
          <KineticHeading
            as="h1"
            trigger="load"
            delay={0.1}
            className="display display-tight mt-7 text-[clamp(2.5rem,8vw,5.5rem)]"
          >
            {p.title}
          </KineticHeading>
          <Reveal delay={0.25}>
            <p className="prose-dim mt-10">{p.introParagraph}</p>
          </Reveal>
        </header>

        <div className="mt-16 space-y-16">
          {p.sections.map((section, index) => (
            <Reveal as="section" key={section.heading}>
              <div className="flex items-baseline gap-5 border-t border-border pt-5">
                <span className="index-num">{String(index + 1).padStart(2, '0')}</span>
                <h2 className="label">{section.heading}</h2>
              </div>

              <div className="mt-8 space-y-4 text-sm text-textDim">
                {section.paragraphs.map((paragraph: string) => (
                  <p key={paragraph} className="max-w-prose break-words">
                    {paragraph}
                  </p>
                ))}
              </div>

              {'items' in section && section.items && (
                <ul className="mt-8 border-t border-border">
                  {section.items.map((item: string) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-4 break-words border-b border-border py-3.5 text-sm text-textDim"
                    >
                      <span className="dot dot--sm" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}

          <Reveal as="section">
            <div className="flex items-baseline gap-5 border-t border-border pt-5">
              <span className="index-num">{String(p.sections.length + 1).padStart(2, '0')}</span>
              <h2 className="label">{p.contact.heading}</h2>
            </div>
            <p className="mt-8 text-sm text-textDim">{p.contact.text}</p>
            <a href={p.contact.url} className="link-line link-line--plain mt-8 break-all">
              {p.contact.url}
            </a>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

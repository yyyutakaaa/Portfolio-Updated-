import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Reveal from '../components/Reveal';
import { useLanguage } from '../contexts/LanguageContext';

const Privacy: React.FC = () => {
  const { t } = useLanguage();
  const p = t.privacy;

  return (
    <div className="mx-auto max-w-3xl">

      <Link
        to="/"
        aria-label={p.backToHome}
        className="group mb-14 inline-flex items-center gap-2.5 text-sm text-textDim hover:text-textMain"
      >
        <ArrowLeft size={14} strokeWidth={1.4} aria-hidden="true" className="transition-transform duration-500 group-hover:-translate-x-1" />
        {p.backToHome}
      </Link>

      <header className="border-b border-border pb-10">
        <h1 className="display text-[clamp(2.5rem,7vw,4.5rem)]">{p.title}</h1>
        <p className="mt-4 text-xs uppercase tracking-[0.14em] text-textDim">{p.lastUpdated}</p>
        <p className="mt-8 max-w-prose text-textDim">{p.introParagraph}</p>
      </header>

      <div className="mt-16 space-y-14">
        {p.sections.map((section) => (
          <Reveal as="section" key={section.heading}>
            <h2 className="serif text-2xl md:text-3xl">{section.heading}</h2>
            <div className="mt-5 space-y-4 text-sm text-textDim">
              {section.paragraphs.map((paragraph: string) => (
                <p key={paragraph} className="break-words">{paragraph}</p>
              ))}
            </div>

            {'items' in section && section.items && (
              <ul className="mt-6 space-y-2.5 border-t border-border pt-6 text-sm text-textDim">
                {section.items.map((item: string) => (
                  <li key={item} className="flex gap-3 break-words">
                    <span className="text-textDim/60">—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}

        <Reveal as="section">
          <h2 className="serif text-2xl md:text-3xl">{p.contact.heading}</h2>
          <p className="mt-5 text-sm text-textDim">{p.contact.text}</p>
          <a href={p.contact.url} className="link-quiet mt-6 break-all">
            {p.contact.url}
          </a>
        </Reveal>
      </div>
    </div>
  );
};

export default Privacy;

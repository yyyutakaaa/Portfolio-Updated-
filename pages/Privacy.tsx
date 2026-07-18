import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
  const { t } = useLanguage();
  const p = t.privacy;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        to="/"
        aria-label={p.backToHome}
        className="inline-flex items-center gap-2 text-textDim hover:text-textMain transition-colors font-mono text-sm uppercase tracking-wider mb-8 group"
      >
        <ArrowLeft size={14} aria-hidden="true" className="group-hover:-translate-x-1 transition-transform" />
        {p.backToHome}
      </Link>

      {/* Header */}
      <header className="detail-hero mb-14">
        <div className="flex items-start sm:items-center gap-4 mb-4">
          <div className="bg-accent/10 p-4 rounded-2xl border border-accent/20 shrink-0">
            <Shield className="text-accent" size={32} aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-textMain break-words">
              {p.title}
            </h1>
            <p className="text-xs font-mono text-textDim mt-1">{p.lastUpdated}</p>
          </div>
        </div>
        <p className="text-textDim text-sm leading-relaxed mt-4">{p.introParagraph}</p>
      </header>

      {/* Sections */}
      <div className="space-y-10 text-gray-300 text-sm leading-relaxed">
        {p.sections.map((section, index) => (
          <section
            key={section.heading}
            className="detail-section"
          >
            <h2 className="text-xl font-bold text-textMain mb-4 border-b border-border pb-2 break-words">
              {section.heading}
            </h2>

            <div className="space-y-3">
              {section.paragraphs.map((paragraph: string) => (
                <p key={paragraph} className="text-textDim break-words">
                  {paragraph}
                </p>
              ))}
            </div>

            {'items' in section && section.items && (
              <ul className="list-disc pl-5 space-y-2 text-textDim mt-4">
                {section.items.map((item: string) => (
                  <li key={item} className="break-words">{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="detail-section">
          <h2 className="text-xl font-bold text-textMain mb-4 border-b border-border pb-2">{p.contact.heading}</h2>
          <p className="text-textDim mb-3">{p.contact.text}</p>
          <a
            href={p.contact.url}
            className="text-accent hover:text-textMain transition-colors break-all"
          >
            {p.contact.url}
          </a>
        </section>
      </div>

      {/* Footer spacer */}
      <div className="h-16" />
    </div>
  );
};

export default Privacy;

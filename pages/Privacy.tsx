import React from 'react';
import { Link } from 'react-router-dom';
import InkReveal from '../components/ink/InkReveal';
import InkSectionHead from '../components/ink/InkSectionHead';
import BrushDivider from '../components/ink/BrushDivider';
import { useLanguage } from '../contexts/LanguageContext';

/** Plain reading: the policy is set like a letter, one ruled section at a time. */
const Privacy: React.FC = () => {
  const { t } = useLanguage();
  const p = t.privacy;

  return (
    <article className="ink-page">
      <header className="ink-section ink-section--page">
        <div className="ink-shell">
          <div className="ink-grid">
            <Link className="ink-cap ink-back" to="/">
              <span aria-hidden="true">←</span> {p.backToHome}
            </Link>
          </div>
          <InkSectionHead label={p.lastUpdated} heading={p.title} level="h1" />
          <div className="ink-grid">
            <InkReveal className="ink-case__lead" delay={0.3}>
              <p className="ink-prose">{p.introParagraph}</p>
            </InkReveal>
          </div>
        </div>
      </header>

      {p.sections.map((section, index) => (
        <section className="ink-section ink-section--compact" key={section.heading}>
          <div className="ink-shell">
            <BrushDivider flip={index % 2 === 1} />
            <InkSectionHead label={String(index + 1).padStart(2, '0')} heading={section.heading} />
            <div className="ink-grid">
              <InkReveal className="ink-case__body" stagger={0.06}>
                {section.paragraphs.map((paragraph: string) => (
                  <p key={paragraph} className="ink-prose">
                    {paragraph}
                  </p>
                ))}
                {'items' in section && section.items && (
                  <ul className="ink-bullets ink-bullets--single">
                    {section.items.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </InkReveal>
            </div>
          </div>
        </section>
      ))}

      <section className="ink-section ink-section--compact">
        <div className="ink-shell">
          <BrushDivider />
          <InkSectionHead label={String(p.sections.length + 1).padStart(2, '0')} heading={p.contact.heading} />
          <div className="ink-grid">
            <InkReveal className="ink-case__body">
              <p className="ink-prose">{p.contact.text}</p>
              <a className="ink-inline-link" href={p.contact.url}>
                {p.contact.url}
              </a>
            </InkReveal>
          </div>
        </div>
      </section>
    </article>
  );
};

export default Privacy;

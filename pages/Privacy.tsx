import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

/** Plain reading: the policy set on one sheet, one ruled section at a time. */
const Privacy: React.FC = () => {
  const { t } = useLanguage();
  const p = t.privacy;

  return (
    <article className="page">
      <div className="side side--sticky">
        <Link className="lbl back" to="/">
          <span aria-hidden="true">&larr;</span>&nbsp;{p.backToHome}
        </Link>
        <p className="lbl">{p.lastUpdated}</p>
        <h1 className="side__title">{p.title}</h1>
      </div>

      <div className="read">
        <p className="lede">{p.introParagraph}</p>

        {p.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph: string) => (
              <p key={paragraph} style={{ marginBottom: 12 }}>
                {paragraph}
              </p>
            ))}
            {'items' in section && section.items && (
              <ul className="bullets">
                {section.items.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section>
          <h2>{p.contact.heading}</h2>
          <p>
            {p.contact.text} <a href={p.contact.url}>{p.contact.url}</a>
          </p>
        </section>
      </div>
    </article>
  );
};

export default Privacy;

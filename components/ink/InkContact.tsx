import React from 'react';
import InkReveal from './InkReveal';
import InkSectionHead from './InkSectionHead';
import BrushDivider from './BrushDivider';
import InkContactForm from './InkContactForm';
import { useLanguage } from '../../contexts/LanguageContext';
import { inkContent } from '../../utils/inkContent';

/**
 * Contact as it was on the previous site — a form to write in, and the direct
 * lines beside it — in the same ink as everything else. It closes the home
 * page and is the whole of /contact, so both say exactly the same thing.
 */
const InkContact: React.FC<{ asPage?: boolean }> = ({ asPage = false }) => {
  const { language } = useLanguage();
  const c = inkContent[language].contact;

  return (
    <section
      className={`ink-section ${asPage ? 'ink-section--page' : ''}`}
      id="ink-contact"
      aria-labelledby="ink-contact-heading"
    >
      <div className="ink-shell">
        {!asPage && <BrushDivider />}
        <InkSectionHead
          id="ink-contact-heading"
          label={c.label}
          heading={c.heading}
          level={asPage ? 'h1' : 'h2'}
        />

        <div className="ink-grid">
          <InkReveal className="ink-contact__intro">
            <p className="ink-prose">{c.line}</p>
          </InkReveal>
        </div>

        <div className="ink-grid ink-contact">
          <InkReveal className="ink-contact__form">
            <p className="ink-cap ink-contact__kicker">{c.formTitle}</p>
            <InkContactForm copy={c.form} />
          </InkReveal>

          <div className="ink-contact__aside">
            <InkReveal>
              <p className="ink-cap ink-contact__kicker">{c.infoTitle}</p>
              <dl className="ink-facts ink-facts--stacked">
                <div className="ink-facts__row">
                  <dt className="ink-cap">{c.emailLabel}</dt>
                  <dd>
                    <a className="ink-inline-link" href={`mailto:${c.email}`}>
                      {c.email}
                    </a>
                  </dd>
                </div>
                <div className="ink-facts__row">
                  <dt className="ink-cap">{c.phoneLabel}</dt>
                  <dd>
                    <a className="ink-inline-link" href={`tel:${c.phone.replace(/\s/g, '')}`}>
                      {c.phone}
                    </a>
                  </dd>
                </div>
                <div className="ink-facts__row">
                  <dt className="ink-cap">{c.locationLabel}</dt>
                  <dd>{c.location}</dd>
                </div>
              </dl>
            </InkReveal>

            <InkReveal>
              <p className="ink-cap ink-contact__kicker">{c.socialTitle}</p>
              <ul className="ink-contact__socials">
                {c.socials.map((social) => (
                  <li key={social.label}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <span>{social.label}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </InkReveal>

            <InkReveal>
              <p className="ink-cap ink-contact__kicker">{c.availability}</p>
              <p className="ink-contact__available">
                <span className="ink-contact__drop" aria-hidden="true" />
                {c.availableText}
              </p>
              <p className="ink-contact__note">{c.responseTime}</p>
            </InkReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InkContact;

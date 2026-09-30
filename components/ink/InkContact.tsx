import React from 'react';
import InkReveal from './InkReveal';
import InkSectionHead from './InkSectionHead';
import BrushDivider from './BrushDivider';
import InkContactForm from './InkContactForm';
import InkEnso from './InkEnso';
import LocalClock from '../LocalClock';
import { useLanguage } from '../../contexts/LanguageContext';
import { inkContent } from '../../utils/inkContent';

/**
 * Contact, set as correspondence.
 *
 * The heading shares its row with a large ensō, brushed on as it comes into
 * view, holding the time in Evergem — the one live detail on the page, and a
 * quiet answer to "will he be awake to read this". Below it, the email address
 * at reading size for anyone who would rather just write; then the form,
 * laid out as a letter on its own sheet, addressed and dated, sealed with the
 * hanko. The direct lines sit beside it.
 *
 * It closes the home page and is the whole of /contact.
 */
const InkContact: React.FC<{ asPage?: boolean }> = ({ asPage = false }) => {
  const { language } = useLanguage();
  const c = inkContent[language].contact;

  return (
    <section
      className={`ink-section ink-letterbox ${asPage ? 'ink-section--page' : ''}`}
      id="ink-contact"
      aria-labelledby="ink-contact-heading"
    >
      <div className="ink-shell">
        {!asPage && <BrushDivider />}

        <div className="ink-letterbox__top">
          <InkSectionHead
            id="ink-contact-heading"
            label={c.label}
            heading={c.heading}
            level={asPage ? 'h1' : 'h2'}
            className="ink-letterbox__head"
          />

          <InkEnso className="ink-letterbox__enso">
            <span className="ink-cap">{c.localTime}</span>
            <LocalClock className="ink-letterbox__clock" />
          </InkEnso>
        </div>

        <div className="ink-grid">
          <InkReveal className="ink-letterbox__intro" stagger={0.1}>
            <p className="ink-prose">{c.line}</p>
            <p className="ink-cap ink-letterbox__direct">{c.direct}</p>
            <a className="ink-letterbox__email" href={`mailto:${c.email}`}>
              {c.email}
            </a>
          </InkReveal>
        </div>

        <div className="ink-grid ink-contact">
          <InkReveal className="ink-contact__form" y={28}>
            <InkContactForm copy={c.form} title={c.formTitle} to={c.letterTo} />
          </InkReveal>

          <div className="ink-contact__aside">
            <InkReveal>
              <p className="ink-cap ink-contact__kicker">{c.infoTitle}</p>
              <dl className="ink-lines">
                <div>
                  <dt className="ink-cap">{c.phoneLabel}</dt>
                  <dd>
                    <a href={`tel:${c.phone.replace(/\s/g, '')}`}>{c.phone}</a>
                  </dd>
                </div>
                <div>
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

            <InkReveal className="ink-contact__status">
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

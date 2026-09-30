import React from 'react';
import { Link } from 'react-router-dom';
import Panel from './Panel';
import { useLanguage } from '../../contexts/LanguageContext';
import { EMAIL, PHONE, SOCIALS } from '../../utils/content';

/** The closing screen: what I'm after, the address large, and the way to copy it. */
const ContactPanel: React.FC<{ number: string; asPage?: boolean; children?: React.ReactNode }> = ({
  number,
  asPage = false,
  children,
}) => {
  const { c } = useLanguage();
  const [copied, setCopied] = React.useState(false);
  const timer = React.useRef<number>();

  React.useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2400);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const Heading = asPage ? 'h1' : 'h2';

  return (
    <Panel number={number} id="contact" labelledBy="contact-heading">
      <div className="panel__top">
        <Heading className="lbl" id="contact-heading">
          {c.contact.label}
        </Heading>
      </div>
      <p className="disp contact__line">{c.contact.line}</p>
      <a className="contact__mail" href={`mailto:${EMAIL}`}>
        {EMAIL}
      </a>
      <div className="contact__actions">
        <button type="button" className="lbl lbl--paper" onClick={copy}>
          <span aria-live="polite">{copied ? c.contact.copied : c.contact.copy}</span>
          &nbsp;<span aria-hidden="true">&rarr;</span>
        </button>
        <a className="lbl" href={`tel:${PHONE.replace(/\s/g, '')}`}>
          {PHONE}
        </a>
        {!asPage && (
          <Link className="lbl" to="/contact">
            {c.contact.formLink} <span aria-hidden="true">&rarr;</span>
          </Link>
        )}
      </div>
      {children}
      <ul className="contact__socials">
        {SOCIALS.map((s) => (
          <li key={s.label}>
            <a className="lbl" href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </Panel>
  );
};

export default ContactPanel;

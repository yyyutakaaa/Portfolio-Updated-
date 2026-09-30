import React from 'react';
import Hanko from './Hanko';
import { gsap, prefersReducedMotion } from '../../lib/motion';
import { useLanguage } from '../../contexts/LanguageContext';
import type { ContactFormCopy } from '../../utils/inkContent';

/**
 * The same form as before — name, email, subject, message, sent through
 * Web3Forms — written as a letter.
 *
 * It sits on its own sheet, a shade lighter than the page with a deckled
 * edge, addressed and dated like correspondence. Each field is a single ruled
 * line; the one being written on gets a brush stroke drawn under it. The
 * submit is the seal: pressing it drives the block into the paper and leaves
 * its impression behind — the only red on the site.
 */

type Field = 'name' | 'email' | 'subject' | 'message';
type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY: Record<Field, string> = { name: '', email: '', subject: '', message: '' };
const FIELDS: Field[] = ['name', 'email', 'subject', 'message'];

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

interface InkContactFormProps {
  copy: ContactFormCopy;
  /** Small-caps kicker at the head of the letter. */
  title: string;
  /** "To" / "Aan". */
  to: string;
}

const InkContactForm: React.FC<InkContactFormProps> = ({ copy, title, to }) => {
  const { language } = useLanguage();
  const today = React.useMemo(
    () =>
      new Intl.DateTimeFormat(language === 'nl' ? 'nl-BE' : 'en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(new Date()),
    [language],
  );

  const [values, setValues] = React.useState(EMPTY);
  const [status, setStatus] = React.useState<Status>('idle');
  const [error, setError] = React.useState('');
  const [invalid, setInvalid] = React.useState<Field | null>(null);

  const blockRef = React.useRef<HTMLSpanElement>(null);
  const markRef = React.useRef<HTMLSpanElement>(null);
  const resetRef = React.useRef<number | null>(null);

  React.useEffect(
    () => () => {
      if (resetRef.current !== null) window.clearTimeout(resetRef.current);
    },
    [],
  );

  /* Down hard and fast, back up slowly — the weight is in the contact. */
  const press = () => {
    const block = blockRef.current;
    const mark = markRef.current;
    if (!block || !mark || prefersReducedMotion()) return;

    gsap.killTweensOf([block, mark]);
    gsap
      .timeline()
      .to(block, { scale: 0.86, y: 5, duration: 0.09, ease: 'power3.in' })
      .to(block, { scale: 1, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.55)' })
      .fromTo(
        mark,
        { autoAlpha: 0, scale: 1.14, rotate: -8 },
        { autoAlpha: 1, scale: 1, rotate: -4, duration: 0.2, ease: 'power2.out' },
        0.09,
      )
      // The impression dries down rather than blinking out.
      .to(mark, { autoAlpha: 0, duration: 1.6, ease: 'power2.in' }, 1.2);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (invalid === name) setInvalid(null);
  };

  const fail = (message: string, field: Field | null) => {
    setStatus('error');
    setError(message);
    setInvalid(field);
    if (field) window.requestAnimationFrame(() => document.getElementById(`ink-${field}`)?.focus());
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    press();

    const empty = FIELDS.find((field) => !values[field].trim());
    if (empty) return fail(copy.required, empty);
    if (!isEmail(values.email)) return fail(copy.invalidEmail, 'email');

    setStatus('submitting');
    setInvalid(null);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          access_key: 'c1a66ebb-b015-4db3-b8e8-96d4d6dc3551',
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
          from_name: values.name,
          replyto: values.email,
        }),
      });
      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setValues(EMPTY);
        resetRef.current = window.setTimeout(() => setStatus('idle'), 6000);
      } else {
        fail(copy.error, null);
      }
    } catch {
      fail(copy.error, null);
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const number = (name: Field) => String(FIELDS.indexOf(name) + 1).padStart(2, '0');

  const field = (name: Field, label: string, placeholder: string, extra: Partial<React.InputHTMLAttributes<HTMLInputElement>> = {}) => (
    <div className="ink-field">
      <label className="ink-cap ink-field__label" htmlFor={`ink-${name}`}>
        <span className="ink-field__num" aria-hidden="true">{number(name)}</span>
        {label}
      </label>
      <input
        id={`ink-${name}`}
        name={name}
        className="ink-field__input"
        value={values[name]}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={invalid === name}
        aria-describedby={invalid === name ? 'ink-form-status' : undefined}
        required
        {...extra}
      />
    </div>
  );

  return (
    <form className="ink-form ink-letter" onSubmit={onSubmit} noValidate>
      <div className="ink-letter__head">
        <span className="ink-cap">{title}</span>
        <time className="ink-letter__date">{today}</time>
      </div>
      <p className="ink-letter__to">
        <span className="ink-cap">{to}</span> Mehdi Oulad Khlie
      </p>

      <div className="ink-form__pair">
        {field('name', copy.name, copy.namePlaceholder, { type: 'text', autoComplete: 'name' })}
        {field('email', copy.email, copy.emailPlaceholder, { type: 'email', autoComplete: 'email' })}
      </div>

      {field('subject', copy.subject, copy.subjectPlaceholder, { type: 'text' })}

      <div className="ink-field">
        <label className="ink-cap ink-field__label" htmlFor="ink-message">
          <span className="ink-field__num" aria-hidden="true">{number('message')}</span>
          {copy.message}
        </label>
        <textarea
          id="ink-message"
          name="message"
          className="ink-field__input ink-field__input--area"
          value={values.message}
          onChange={onChange}
          placeholder={copy.messagePlaceholder}
          aria-invalid={invalid === 'message'}
          aria-describedby={invalid === 'message' ? 'ink-form-status' : undefined}
          rows={5}
          required
        />
      </div>

      <div className="ink-form__foot">
        <button
          type="submit"
          className="ink-send"
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
        >
          <span className="ink-send__seal" aria-hidden="true">
            {/* The block sits first, so the impression paints over it, not
                under it: pressing briefly turns the seal red, exactly where
                it already sits, before that ink dries back to black. */}
            <span className="ink-send__block" ref={blockRef}>
              <Hanko uid="send-block" />
            </span>
            <span className="ink-send__mark" ref={markRef}>
              <Hanko uid="send-mark" color="var(--hanko)" />
            </span>
          </span>
          <span className="ink-cap ink-send__label">{status === 'submitting' ? copy.sending : copy.send}</span>
        </button>

        <p
          id="ink-form-status"
          className="ink-form__status"
          role={status === 'error' ? 'alert' : 'status'}
          aria-live={status === 'error' ? 'assertive' : 'polite'}
        >
          {status === 'success' && copy.success}
          {status === 'error' && error}
        </p>
      </div>
    </form>
  );
};

export default InkContactForm;

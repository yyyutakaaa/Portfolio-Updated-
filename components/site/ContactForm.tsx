import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { EMAIL } from '../../utils/content';

/** Name, email, subject, message, sent through Web3Forms. */

type Field = 'name' | 'email' | 'subject' | 'message';
type Status = 'idle' | 'submitting' | 'success' | 'error';

const EMPTY: Record<Field, string> = { name: '', email: '', subject: '', message: '' };
const FIELDS: Field[] = ['name', 'email', 'subject', 'message'];

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const COPY = {
  nl: {
    name: 'Naam',
    namePlaceholder: 'Je naam',
    email: 'E-mail',
    emailPlaceholder: 'je@email.com',
    subject: 'Onderwerp',
    subjectPlaceholder: 'Waar gaat het over?',
    message: 'Bericht',
    messagePlaceholder: 'Schrijf hier je bericht…',
    send: 'Verstuur',
    sending: 'Verzenden…',
    success: 'Verstuurd. Ik reageer zo snel mogelijk.',
    error: `Er liep iets mis. Probeer het nog eens, of mail me rechtstreeks op ${EMAIL}`,
    required: 'Dit veld mag niet leeg blijven',
    invalidEmail: 'Dit e-mailadres klopt niet',
  },
  en: {
    name: 'Name',
    namePlaceholder: 'Your name',
    email: 'Email',
    emailPlaceholder: 'you@email.com',
    subject: 'Subject',
    subjectPlaceholder: "What's this about?",
    message: 'Message',
    messagePlaceholder: 'Write your message here…',
    send: 'Send',
    sending: 'Sending…',
    success: "It's sent. I'll get back to you soon.",
    error: `Something went wrong there. Try again, or just email me directly at ${EMAIL}`,
    required: "This field can't stay empty",
    invalidEmail: 'Enter a valid email address',
  },
};

const ContactForm: React.FC = () => {
  const { language } = useLanguage();
  const copy = COPY[language];

  const [values, setValues] = React.useState(EMPTY);
  const [status, setStatus] = React.useState<Status>('idle');
  const [error, setError] = React.useState('');
  const [invalid, setInvalid] = React.useState<Field | null>(null);
  const resetRef = React.useRef<number>();

  React.useEffect(() => () => window.clearTimeout(resetRef.current), []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (invalid === name) setInvalid(null);
  };

  const fail = (message: string, field: Field | null) => {
    setStatus('error');
    setError(message);
    setInvalid(field);
    if (field) document.getElementById(`f-${field}`)?.focus();
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

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

  const describedBy = (name: Field) => (invalid === name ? 'form-status' : undefined);

  const input = (name: Exclude<Field, 'message'>, type: string, autoComplete?: string) => (
    <div className="field">
      <label className="lbl" htmlFor={`f-${name}`}>
        {copy[name]}
      </label>
      <input
        id={`f-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={values[name]}
        onChange={onChange}
        placeholder={copy[`${name}Placeholder`]}
        aria-invalid={invalid === name}
        aria-describedby={describedBy(name)}
        required
      />
    </div>
  );

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__pair">
        {input('name', 'text', 'name')}
        {input('email', 'email', 'email')}
      </div>
      {input('subject', 'text')}
      <div className="field">
        <label className="lbl" htmlFor="f-message">
          {copy.message}
        </label>
        <textarea
          id="f-message"
          name="message"
          rows={5}
          value={values.message}
          onChange={onChange}
          placeholder={copy.messagePlaceholder}
          aria-invalid={invalid === 'message'}
          aria-describedby={describedBy('message')}
          required
        />
      </div>
      <div className="form__foot">
        <button type="submit" className="btn btn--accent" disabled={status === 'submitting'}>
          {status === 'submitting' ? copy.sending : copy.send}
        </button>
        <p
          id="form-status"
          className={`form__status ${status === 'error' ? 'is-error' : ''} ${status === 'success' ? 'is-success' : ''}`}
          role="status"
        >
          {status === 'error' ? error : status === 'success' ? copy.success : ''}
        </p>
      </div>
    </form>
  );
};

export default ContactForm;

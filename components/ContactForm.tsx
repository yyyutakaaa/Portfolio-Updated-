import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  language: 'nl' | 'en';
}

const ContactForm: React.FC<ContactFormProps> = ({ language }) => {
  const successTimerRef = React.useRef<number | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const translations = {
    nl: {
      name: 'Naam',
      namePlaceholder: 'Je volledige naam',
      email: 'E-mail',
      emailPlaceholder: 'je@email.com',
      subject: 'Onderwerp',
      subjectPlaceholder: 'Waarover wil je praten?',
      message: 'Bericht',
      messagePlaceholder: 'Schrijf hier je bericht...',
      send: 'Verstuur bericht',
      sending: 'Verzenden...',
      success: 'Bericht succesvol verzonden! Ik neem zo snel mogelijk contact met je op.',
      error: 'Er is iets misgegaan. Probeer het opnieuw of stuur een e-mail naar mehdi.ouladkhlie@outlook.be',
      required: 'Dit veld is verplicht',
      invalidEmail: 'Voer een geldig e-mailadres in'
    },
    en: {
      name: 'Name',
      namePlaceholder: 'Your full name',
      email: 'Email',
      emailPlaceholder: 'you@email.com',
      subject: 'Subject',
      subjectPlaceholder: 'What do you want to talk about?',
      message: 'Message',
      messagePlaceholder: 'Write your message here...',
      send: 'Send message',
      sending: 'Sending...',
      success: 'Message sent successfully! I will get back to you as soon as possible.',
      error: 'Something went wrong. Please try again or send an email to mehdi.ouladkhlie@outlook.be',
      required: 'This field is required',
      invalidEmail: 'Please enter a valid email address'
    }
  };

  const t = translations[language];

  React.useEffect(() => () => {
    if (successTimerRef.current !== null) {
      window.clearTimeout(successTimerRef.current);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      setErrorMessage(t.required);
      const firstEmptyField = (['name', 'email', 'subject', 'message'] as const).find((field) => !formData[field]);
      if (firstEmptyField) {
        window.requestAnimationFrame(() => document.getElementById(firstEmptyField)?.focus());
      }
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus('error');
      setErrorMessage(t.invalidEmail);
      window.requestAnimationFrame(() => document.getElementById('email')?.focus());
      return;
    }

    setStatus('submitting');
    const controller = new AbortController();
    const requestTimeout = window.setTimeout(() => controller.abort(), 12000);

    try {
      // Web3Forms API call
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
        body: JSON.stringify({
          access_key: 'c1a66ebb-b015-4db3-b8e8-96d4d6dc3551',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          from_name: formData.name,
          replyto: formData.email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });

        // Reset success message after 5 seconds
        successTimerRef.current = window.setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(t.error);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(t.error);
    } finally {
      window.clearTimeout(requestTimeout);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-9" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="name" className="field-label">
          {t.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t.namePlaceholder}
          aria-invalid={status === 'error' && !formData.name}
          aria-describedby={status === 'error' && !formData.name ? 'form-error' : undefined}
          className="field"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="field-label">
          {t.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t.emailPlaceholder}
          aria-invalid={status === 'error' && (!formData.email || !validateEmail(formData.email))}
          aria-describedby={status === 'error' && (!formData.email || !validateEmail(formData.email)) ? 'form-error' : undefined}
          className="field"
          required
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="field-label">
          {t.subject}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder={t.subjectPlaceholder}
          aria-invalid={status === 'error' && !formData.subject}
          aria-describedby={status === 'error' && !formData.subject ? 'form-error' : undefined}
          className="field"
          required
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="field-label">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t.messagePlaceholder}
          aria-invalid={status === 'error' && !formData.message}
          aria-describedby={status === 'error' && !formData.message ? 'form-error' : undefined}
          rows={5}
          className="field resize-none"
          required
        />
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <p role="status" aria-live="polite" className="flex items-start gap-3 text-sm text-textDim">
          <CheckCircle size={16} strokeWidth={1.4} aria-hidden="true" className="mt-1 shrink-0 text-accent" />
          <span>{t.success}</span>
        </p>
      )}

      {status === 'error' && (
        <p id="form-error" role="alert" aria-live="assertive" className="flex items-start gap-3 text-sm text-textDim">
          <AlertCircle size={16} strokeWidth={1.4} aria-hidden="true" className="mt-1 shrink-0 text-textMain" />
          <span>{errorMessage}</span>
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        aria-busy={status === 'submitting'}
        className="btn w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {status === 'submitting' ? t.sending : t.send}
        <Send size={15} strokeWidth={1.4} aria-hidden="true" />
      </button>
    </form>
  );
};

export default ContactForm;

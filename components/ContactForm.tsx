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
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatus('error');
      setErrorMessage(t.invalidEmail);
      return;
    }

    setStatus('submitting');

    try {
      // Web3Forms API call
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(t.error);
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(t.error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-mono text-textDim mb-2">
          {t.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t.namePlaceholder}
          className="w-full bg-surface border border-border px-4 py-3 text-textMain placeholder-textDim focus:border-white focus:outline-none transition-colors font-mono text-sm"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-mono text-textDim mb-2">
          {t.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t.emailPlaceholder}
          className="w-full bg-surface border border-border px-4 py-3 text-textMain placeholder-textDim focus:border-white focus:outline-none transition-colors font-mono text-sm"
          required
        />
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-mono text-textDim mb-2">
          {t.subject}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder={t.subjectPlaceholder}
          className="w-full bg-surface border border-border px-4 py-3 text-textMain placeholder-textDim focus:border-white focus:outline-none transition-colors font-mono text-sm"
          required
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-mono text-textDim mb-2">
          {t.message}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t.messagePlaceholder}
          rows={6}
          className="w-full bg-surface border border-border px-4 py-3 text-textMain placeholder-textDim focus:border-white focus:outline-none transition-colors font-mono text-sm resize-none"
          required
        />
      </div>

      {/* Status Messages */}
      {status === 'success' && (
        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/50 px-4 py-3 text-green-400 font-mono text-sm">
          <CheckCircle size={20} />
          <span>{t.success}</span>
        </div>
      )}

      {status === 'error' && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/50 px-4 py-3 text-red-400 font-mono text-sm">
          <AlertCircle size={20} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-white text-black px-6 py-4 font-mono text-sm uppercase tracking-wider hover:bg-textMain transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'submitting' ? t.sending : t.send}
        <Send size={16} />
      </button>
    </form>
  );
};

export default ContactForm;

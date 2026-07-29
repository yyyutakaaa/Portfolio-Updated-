import React from 'react';
import ContactForm from '../components/ContactForm';
import Reveal from '../components/Reveal';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { language } = useLanguage();

  const contactInfo = {
    nl: {
      title: 'Contact',
      subtitle: 'Laten we verbinden',
      description: 'Heb je een vraag, een project in gedachten, of wil je gewoon in contact komen? Ik sta altijd open voor nieuwe kansen en samenwerkingen. Vul het formulier in of neem rechtstreeks contact met me op via onderstaande kanalen.',
      formTitle: 'Stuur een bericht',
      infoTitle: 'Contactgegevens',
      socialTitle: 'Elders',
      location: 'Gent, België',
      phone: '+32 465 13 66 79',
      email: 'mehdi.ouladkhlie@outlook.be',
      availability: 'Beschikbaarheid',
      availableText: 'Beschikbaar voor werk',
      responseTime: 'Ik probeer binnen 24-48 uur te reageren op berichten.'
    },
    en: {
      title: 'Contact',
      subtitle: 'Let\'s connect',
      description: 'Have a question, a project in mind, or just want to get in touch? I\'m always open to new opportunities and collaborations. Fill out the form or reach out directly through the channels below.',
      formTitle: 'Send a message',
      infoTitle: 'Contact details',
      socialTitle: 'Elsewhere',
      location: 'Ghent, Belgium',
      phone: '+32 465 13 66 79',
      email: 'mehdi.ouladkhlie@outlook.be',
      availability: 'Availability',
      availableText: 'Available for work',
      responseTime: 'I try to respond to messages within 24-48 hours.'
    }
  };

  const content = contactInfo[language];

  const socials = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mehdi-oulad-khlie-5a43aa30b/' },
    { label: 'GitHub', url: 'https://github.com/yyyutakaaa' },
    { label: 'Instagram', url: 'https://www.instagram.com/y.yutaka.a/' },
  ];

  return (
    <div className="space-y-20 md:space-y-28">

      <header>
        <span className="eyebrow">{content.subtitle}</span>
        <h1 className="display mt-7 text-[clamp(3.25rem,11vw,8rem)]">{content.title}</h1>
        <p className="lede mt-12 max-w-prose border-t border-border pt-8 text-textDim">
          {content.description}
        </p>
      </header>

      <div className="grid gap-16 md:grid-cols-12 md:gap-14">

        <Reveal className="md:col-span-7">
          <h2 className="eyebrow">{content.formTitle}</h2>
          <div className="mt-8 border-t border-border pt-8">
            <ContactForm language={language} />
          </div>
        </Reveal>

        <Reveal delay={80} className="space-y-12 md:col-span-4 md:col-start-9">
          <div>
            <h2 className="eyebrow">{content.infoTitle}</h2>
            <dl className="mt-8 divide-y divide-border border-t border-border">
              <div className="py-4">
                <dt className="text-xs uppercase tracking-[0.14em] text-textDim">Email</dt>
                <dd className="mt-1">
                  <a href={`mailto:${content.email}`} className="hover:text-textDim">
                    {content.email}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-xs uppercase tracking-[0.14em] text-textDim">{language === 'nl' ? 'Telefoon' : 'Phone'}</dt>
                <dd className="mt-1">
                  <a href="tel:+32465136679" className="hover:text-textDim">{content.phone}</a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-xs uppercase tracking-[0.14em] text-textDim">{language === 'nl' ? 'Locatie' : 'Location'}</dt>
                <dd className="mt-1">{content.location}</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="eyebrow">{content.socialTitle}</h2>
            <ul className="mt-8 divide-y divide-border border-t border-border">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-4 hover:text-textDim"
                  >
                    {social.label}
                    <span aria-hidden="true" className="text-textDim">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border pt-8">
            <h2 className="eyebrow">{content.availability}</h2>
            <p className="mt-5 flex items-center gap-2.5 text-sm">
              <span className="dot" aria-hidden="true" />
              {content.availableText}
            </p>
            <p className="mt-3 text-sm text-textDim">{content.responseTime}</p>
          </div>
        </Reveal>

      </div>
    </div>
  );
};

export default Contact;

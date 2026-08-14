import React from 'react';
import ContactForm from '../components/ContactForm';
import KineticHeading from '../components/motion/KineticHeading';
import Reveal from '../components/motion/Reveal';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { language } = useLanguage();

  const contactInfo = {
    nl: {
      title: 'Contact',
      subtitle: 'Zeg gerust hallo',
      description:
        'Heb je een vraag of wil je gewoon eens babbelen? Vul het formulier hieronder in, of pak me rechtstreeks via een van de kanalen hiernaast.',
      formTitle: 'Stuur een bericht',
      infoTitle: 'Contactgegevens',
      socialTitle: 'Elders',
      location: 'Evergem, België',
      phone: '+32 468 54 94 78',
      email: 'mehdi.ouladkhlie@outlook.be',
      availability: 'Beschikbaarheid',
      availableText: 'Beschikbaar voor werk',
      responseTime: 'Ik antwoord meestal binnen een dag of twee.',
    },
    en: {
      title: 'Contact',
      subtitle: 'Say hi',
      description:
        'Got a question, or do you just want to chat? Fill in the form below, or reach me directly through one of the channels on the side.',
      formTitle: 'Send a message',
      infoTitle: 'Contact details',
      socialTitle: 'Elsewhere',
      location: 'Evergem, Belgium',
      phone: '+32 468 54 94 78',
      email: 'mehdi.ouladkhlie@outlook.be',
      availability: 'Availability',
      availableText: 'Available for work',
      responseTime: 'I usually get back to you within a day or two.',
    },
  };

  const content = contactInfo[language];

  const socials = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/mehdi-oulad-khlie-5a43aa30b/' },
    { label: 'GitHub', url: 'https://github.com/yyyutakaaa' },
    { label: 'Instagram', url: 'https://www.instagram.com/y.yutaka.a/' },
  ];

  return (
    <div className="container">
      <header className="border-b border-border pb-16">
        <span className="label">{content.subtitle}</span>

        <KineticHeading
          as="h1"
          trigger="load"
          delay={0.1}
          className="display display-tight mt-7 text-[clamp(3.5rem,13vw,10rem)]"
        >
          {content.title}
        </KineticHeading>

        <Reveal delay={0.25}>
          <p className="lede prose-dim mt-12">{content.description}</p>
        </Reveal>
      </header>

      <div className="mt-20 grid gap-16 md:grid-cols-12 md:gap-14">
        <Reveal className="md:col-span-7">
          <div className="flex items-baseline gap-5 border-t border-border pt-5">
            <span className="index-num">01</span>
            <h2 className="label">{content.formTitle}</h2>
          </div>
          <div className="mt-12">
            <ContactForm language={language} />
          </div>
        </Reveal>

        <div className="space-y-12 md:col-span-4 md:col-start-9">
          <Reveal delay={0.08}>
            <div className="flex items-baseline gap-5 border-t border-border pt-5">
              <span className="index-num">02</span>
              <h2 className="label">{content.infoTitle}</h2>
            </div>
            <dl className="mt-8 divide-y divide-border border-t border-border">
              <div className="py-4">
                <dt className="label">Email</dt>
                <dd className="mt-2">
                  <a href={`mailto:${content.email}`} className="text-sm hover:text-accent">
                    {content.email}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="label">{language === 'nl' ? 'Telefoon' : 'Phone'}</dt>
                <dd className="mt-2">
                  <a href="tel:+32468549478" className="text-sm hover:text-accent">
                    {content.phone}
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="label">{language === 'nl' ? 'Locatie' : 'Location'}</dt>
                <dd className="mt-2 text-sm text-textDim">{content.location}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="flex items-baseline gap-5 border-t border-border pt-5">
              <span className="index-num">03</span>
              <h2 className="label">{content.socialTitle}</h2>
            </div>
            <ul className="mt-8 divide-y divide-border border-t border-border">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social flex items-center justify-between py-4 text-sm hover:text-accent"
                  >
                    {social.label}
                    <span
                      aria-hidden="true"
                      className="text-textFaint transition-transform duration-500 ease-soft group-hover/social:-translate-y-0.5 group-hover/social:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2} className="tile">
            <h2 className="label label-ink">{content.availability}</h2>
            <p className="mt-6 flex items-center gap-2.5">
              <span className="dot dot--live" aria-hidden="true" />
              <span className="mono text-xs uppercase tracking-[0.12em] text-accent">
                {content.availableText}
              </span>
            </p>
            <p className="mt-4 text-sm text-textDim">{content.responseTime}</p>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;

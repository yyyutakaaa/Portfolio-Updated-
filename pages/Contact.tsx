import React from 'react';
import Tile from '../components/Tile';
import ContactForm from '../components/ContactForm';
import { Mail, Linkedin, Github, MapPin, Phone, Instagram } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact: React.FC = () => {
  const { language, t } = useLanguage();

  const contactInfo = {
    nl: {
      title: 'Contact',
      subtitle: 'Laten we verbinden',
      description: 'Heb je een vraag, een project in gedachten, of wil je gewoon in contact komen? Ik sta altijd open voor nieuwe kansen en samenwerkingen. Vul het formulier in of neem rechtstreeks contact met me op via onderstaande kanalen.',
      formTitle: 'Stuur een bericht',
      infoTitle: 'Contact informatie',
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
      infoTitle: 'Contact information',
      location: 'Ghent, Belgium',
      phone: '+32 465 13 66 79',
      email: 'mehdi.ouladkhlie@outlook.be',
      availability: 'Availability',
      availableText: 'Available for work',
      responseTime: 'I try to respond to messages within 24-48 hours.'
    }
  };

  const content = contactInfo[language];

  return (
    <div className="space-y-14 md:space-y-20">
      {/* Header Section */}
      <header className="page-header mb-16 mt-8">
        <div className="border-b border-border pb-6">
          <h1 className="text-5xl md:text-8xl font-extrabold uppercase tracking-[-0.055em] leading-[0.86] mb-5">
            {content.title}
          </h1>
          <h2 className="text-lg md:text-xl text-textDim font-mono">
            {content.subtitle}
          </h2>
        </div>
      </header>

      {/* Intro Text */}
      <div className="max-w-2xl">
        <p className="text-lg md:text-xl font-light leading-relaxed text-textMain">
          {content.description}
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Form - Takes 2 columns on desktop */}
        <Tile className="md:col-span-2" label={content.formTitle} delay={100}>
          <ContactForm language={language} />
        </Tile>

        {/* Contact Info Sidebar */}
        <div className="space-y-6">
          <Tile label={content.infoTitle} delay={200}>
            <div className="space-y-6">
              {/* Email */}
              <a
                href="mailto:mehdi.ouladkhlie@outlook.be"
                aria-label={`Email ${content.email}`}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <div className="bg-accent/5 p-2.5 rounded-xl border border-border group-hover:border-accent transition-colors">
                  <Mail size={20} aria-hidden="true" className="text-accent" />
                </div>
                <div>
                  <div className="text-xs font-mono text-textDim mb-1">Email</div>
                  <div className="text-sm text-textMain group-hover:text-accent transition-colors break-all">
                    {content.email}
                  </div>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+32465136679"
                aria-label={`Call ${content.phone}`}
                className="flex items-start gap-3 group cursor-pointer"
              >
                <div className="bg-accent/5 p-2.5 rounded-xl border border-border group-hover:border-accent transition-colors">
                  <Phone size={20} aria-hidden="true" className="text-accent" />
                </div>
                <div>
                  <div className="text-xs font-mono text-textDim mb-1">Phone</div>
                  <div className="text-sm text-textMain group-hover:text-accent transition-colors">
                    {content.phone}
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="bg-accent/5 p-2.5 rounded-xl border border-border">
                  <MapPin size={20} aria-hidden="true" className="text-accent" />
                </div>
                <div>
                  <div className="text-xs font-mono text-textDim mb-1">Location</div>
                  <div className="text-sm text-textMain">
                    {content.location}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-[1px] bg-border my-4" />

              {/* Social Links */}
              <div>
                <div className="text-xs font-mono text-textDim mb-3">Social</div>
                <div className="flex gap-3">
                  <a
                    href="https://www.linkedin.com/in/mehdi-oulad-khlie-5a43aa30b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="bg-surfaceHighlight p-2.5 rounded-xl border border-border hover:border-accent hover:text-accent transition-colors"
                  >
                    <Linkedin size={20} aria-hidden="true" className="text-textMain" />
                  </a>
                  <a
                    href="https://github.com/yyyutakaaa"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="bg-surfaceHighlight p-2.5 rounded-xl border border-border hover:border-accent hover:text-accent transition-colors"
                  >
                    <Github size={20} aria-hidden="true" className="text-textMain" />
                  </a>
                  <a
                    href="https://www.instagram.com/y.yutaka.a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram profile"
                    className="bg-surfaceHighlight p-2.5 rounded-xl border border-border hover:border-accent hover:text-accent transition-colors"
                  >
                    <Instagram size={20} aria-hidden="true" className="text-textMain" />
                  </a>
                </div>
              </div>
            </div>
          </Tile>

          {/* Availability */}
          <Tile label={content.availability} delay={300} highlight>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-mono text-accent">
                <span className="status-dot" />
                {content.availableText}
              </div>
              <p className="text-xs text-textDim leading-relaxed">
                {content.responseTime}
              </p>
            </div>
          </Tile>
        </div>
      </div>
    </div>
  );
};

export default Contact;

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
  const { t } = useLanguage();
  const p = t.privacy;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-textDim hover:text-white transition-colors font-mono text-sm uppercase tracking-wider mb-8 group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        {p.backToHome}
      </Link>

      {/* Header */}
      <header className="mb-10 opacity-0 animate-reveal" style={{ animationDelay: '0ms' }}>
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-gradient-to-br from-emerald-500/20 to-sky-500/20 p-4 rounded-xl border border-emerald-500/20">
            <Shield className="text-emerald-400" size={32} />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
              {p.title}
            </h1>
            <p className="text-xs font-mono text-textDim mt-1">{p.lastUpdated}</p>
          </div>
        </div>
        <p className="text-textDim text-sm leading-relaxed mt-4">{p.introParagraph}</p>
      </header>

      {/* Sections */}
      <div className="space-y-10 text-gray-300 text-sm leading-relaxed">

        {/* Interpretation and Definitions */}
        <section className="opacity-0 animate-reveal" style={{ animationDelay: '100ms' }}>
          <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2">{p.interpretation.heading}</h2>
          <h3 className="text-base font-semibold text-white mt-4 mb-2">{p.interpretation.subHeading1}</h3>
          <p className="text-textDim">{p.interpretation.text1}</p>
          <h3 className="text-base font-semibold text-white mt-6 mb-2">{p.interpretation.subHeading2}</h3>
          <ul className="list-disc pl-5 space-y-2 text-textDim">
            {p.interpretation.definitions.map((def: { term: string; meaning: string }, i: number) => (
              <li key={i}><strong className="text-white">{def.term}</strong> {def.meaning}</li>
            ))}
          </ul>
        </section>

        {/* No Collection of Personal Data */}
        <section className="opacity-0 animate-reveal" style={{ animationDelay: '200ms' }}>
          <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2">{p.noCollection.heading}</h2>
          <p className="text-textDim mb-3">{p.noCollection.text1}</p>
          <p className="text-textDim mb-3">{p.noCollection.text2}</p>
          <ul className="list-disc pl-5 space-y-1 text-textDim">
            {p.noCollection.items.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        {/* How the Extension Works */}
        <section className="opacity-0 animate-reveal" style={{ animationDelay: '300ms' }}>
          <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2">{p.howItWorks.heading}</h2>
          <p className="text-textDim">{p.howItWorks.text}</p>
        </section>

        {/* No Use of Tracking Technologies */}
        <section className="opacity-0 animate-reveal" style={{ animationDelay: '350ms' }}>
          <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2">{p.noTracking.heading}</h2>
          <p className="text-textDim">{p.noTracking.text}</p>
        </section>

        {/* No Third-Party Sharing */}
        <section className="opacity-0 animate-reveal" style={{ animationDelay: '400ms' }}>
          <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2">{p.noThirdParty.heading}</h2>
          <p className="text-textDim">{p.noThirdParty.text}</p>
        </section>

        {/* GDPR */}
        <section className="opacity-0 animate-reveal" style={{ animationDelay: '450ms' }}>
          <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2">{p.gdpr.heading}</h2>
          <p className="text-textDim mb-3">{p.gdpr.text1}</p>
          <p className="text-textDim mb-3">{p.gdpr.text2}</p>
          <ul className="list-disc pl-5 space-y-2 text-textDim">
            {p.gdpr.rights.map((right: { name: string; desc: string }, i: number) => (
              <li key={i}><strong className="text-white">{right.name}</strong> – {right.desc}</li>
            ))}
          </ul>
          <p className="text-textDim mt-3">{p.gdpr.text3}</p>
        </section>

        {/* Children's Privacy */}
        <section className="opacity-0 animate-reveal" style={{ animationDelay: '500ms' }}>
          <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2">{p.children.heading}</h2>
          <p className="text-textDim">{p.children.text}</p>
        </section>

        {/* Security */}
        <section className="opacity-0 animate-reveal" style={{ animationDelay: '550ms' }}>
          <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2">{p.security.heading}</h2>
          <p className="text-textDim">{p.security.text}</p>
        </section>

        {/* Links to Other Websites */}
        <section className="opacity-0 animate-reveal" style={{ animationDelay: '600ms' }}>
          <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2">{p.links.heading}</h2>
          <p className="text-textDim">{p.links.text}</p>
        </section>

        {/* Changes to This Privacy Policy */}
        <section className="opacity-0 animate-reveal" style={{ animationDelay: '650ms' }}>
          <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2">{p.changes.heading}</h2>
          <p className="text-textDim">{p.changes.text}</p>
        </section>

        {/* Contact Us */}
        <section className="opacity-0 animate-reveal" style={{ animationDelay: '700ms' }}>
          <h2 className="text-xl font-bold text-white mb-4 border-b border-border pb-2">{p.contact.heading}</h2>
          <p className="text-textDim mb-3">{p.contact.text}</p>
          <ul className="list-disc pl-5 text-textDim">
            <li>
              <a
                href="https://www.mehdioul.dev/#/contact"
                className="text-sky-400 hover:text-sky-300 transition-colors"
              >
                https://www.mehdioul.dev/#/contact
              </a>
            </li>
          </ul>
        </section>
      </div>

      {/* Footer spacer */}
      <div className="h-16" />
    </div>
  );
};

export default Privacy;

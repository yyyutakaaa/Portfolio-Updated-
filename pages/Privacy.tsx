import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Privacy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900/50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-white mb-4">{t.privacy.title}</h1>
      <p className="text-sm text-gray-400 mb-6">{t.privacy.lastUpdated}</p>

      <div className="space-y-6 text-gray-300">
        <p>{t.privacy.p1}</p>
        <p>{t.privacy.p2}</p>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6">
        <h2 className="text-xl font-semibold text-white mb-3">{t.privacy.contactTitle}</h2>
        <p className="text-gray-300">{t.privacy.contactText}</p>
        <p className="mt-2">
          <a href="mailto:mehdi.ouladkhlie@outlook.be" className="text-sky-400 hover:text-sky-300 transition-colors">
            {t.privacy.byEmail}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Privacy;

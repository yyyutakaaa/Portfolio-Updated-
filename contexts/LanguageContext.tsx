import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { translations } from '../utils/translations';
import { content, Lang, SiteCopy } from '../utils/content';

interface LanguageContextType {
  language: Lang;
  setLanguage: (lang: Lang) => void;
  /** Long-form pages: Sets, Muted, CV, privacy. */
  t: typeof translations['nl'];
  /** Home page, contents and the lab write-ups. */
  c: SiteCopy;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Lang>('nl');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t: translations[language],
    c: content[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

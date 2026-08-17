import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher({ className = '' }) {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith('en') ? 'en' : 'fr';

  const setLang = (lang) => {
    if (lang !== current) i18n.changeLanguage(lang);
  };

  return (
    <div className={`inline-flex items-center rounded-full border border-white/10 p-0.5 text-xs ${className}`}>
      {['fr', 'en'].map((lang) => (
        <button
          key={lang}
          onClick={() => setLang(lang)}
          aria-pressed={current === lang}
          className={`px-2.5 py-1 rounded-full font-medium uppercase transition-colors ${
            current === lang ? 'bg-accent text-white' : 'text-white/40 hover:text-white'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}

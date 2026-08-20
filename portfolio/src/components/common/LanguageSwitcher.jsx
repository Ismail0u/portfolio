import React from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher({ className = '' }) {
  const { i18n } = useTranslation();
  const current = i18n.language?.startsWith('en') ? 'en' : 'fr';

  const setLang = (lang) => {
    if (lang !== current) i18n.changeLanguage(lang);
  };

  return (
    <div className={`inline-flex items-center rounded-full border border-fg p-0.5 text-xs ${className}`}>
      {['fr', 'en'].map((lang) => (
        <button
          key={lang}
          onClick={() => setLang(lang)}
          aria-pressed={current === lang}
          className={`px-2.5 py-1 rounded-full font-medium uppercase transition-colors 
            hover:cursor-pointer ${
            current === lang ? 'bg-accent text-fg' : 'text-fg/40 hover:text-fg'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}

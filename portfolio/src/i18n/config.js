import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import fr from './locales/fr.json';

const STORAGE_KEY = 'portfolio_lang';

function detectInitialLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'fr') return stored;
  } catch (e) {
    /* localStorage indisponible (SSR, navigation privée stricte) */
  }
  const browserLang = (navigator.language || 'fr').slice(0, 2);
  return browserLang === 'en' ? 'en' : 'fr';
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: detectInitialLanguage(),
  fallbackLng: 'fr',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch (e) {
    /* silencieux si localStorage indisponible */
  }
  document.documentElement.lang = lng;
});

export default i18n;

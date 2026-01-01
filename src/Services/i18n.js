import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslation from '../Assets/lang/en/translation.json';
import arTranslation from '../Assets/lang/ar/translation.json';

// Initialize i18next
i18n
  .use(initReactI18next) // Passes i18n instance to react-i18next
  .init({
    resources: {
      en: { translation: enTranslation },
      ar: { translation: arTranslation },
    },
    fallbackLng: 'ar', // Default language
    interpolation: {
      escapeValue: false, // React already escapes values by default
    },
    lng: 'ar', // Default language to start with
  });

export default i18n;

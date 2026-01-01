// src/Services/TranslationService.js

import i18n from 'i18next'; // Import i18n instance

// Function to get the translation string
export const translate = (key, options = {}) => {
  return i18n.t(key, options); // Use i18n's `t` function to retrieve translations
};

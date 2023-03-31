import * as Localization from 'react-native-localize';

import en from "./en.json";
import de from "./de.json";
import es from "./es.json";
import th from "./th.json";

type TranslationObject = typeof en;

// Create a method to get the translation for a given key
const translate = (key: keyof TranslationObject) => {
  // Use the `Localization.getLocales()` method to get the device's language and use it to look up the appropriate translation
  const [locale] = Localization.getLocales();
  if (locale.languageCode === "en") {
    return en[key];
  } else if (locale.languageCode === "de" && key in de) {
    return de[key];
  } else if (locale.languageCode === "es" && es[key]) {
    return es[key];
  } else if (locale.languageCode === "th" && th[key]) {
    return th[key];
  }
  // Return the English translation as a default if the device's language is not supported
  return en[key];
};

// Export the `getTranslation` method
export { translate };

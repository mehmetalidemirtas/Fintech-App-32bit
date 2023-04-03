import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import english from './en.json';
import turkish from './tr.json';

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: async (callback) => {
    const selectedLanguage = await AsyncStorage.getItem('selectedLanguage');
    if (selectedLanguage) {
      callback(selectedLanguage);
    } else {
      const deviceLanguage =
        Platform.OS === 'ios'
          ? NativeModules.SettingsManager.settings.AppleLocale
          : NativeModules.I18nManager.localeIdentifier;
      callback(deviceLanguage);
    }
  },
  init: () => {},
  cacheUserLanguage: () => {},
}; () => {},
  i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    resources: {
      en: english,
      tr: turkish,
    },    
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
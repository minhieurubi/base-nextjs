'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../../locales/en/common.json';
import vi from '../../../locales/vi/common.json';
import cn from '../../../locales/cn/common.json';

const resources = {
  en: { common: en },
  vi: { common: vi },
  cn: { common: cn },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });
}

export default i18n;

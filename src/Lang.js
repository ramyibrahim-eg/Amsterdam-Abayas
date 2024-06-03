import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import DataAr from "./components/translation/ar";
import DataEn from "./components/translation/en";

const resources = {
  ar: {
    translation: DataAr,
  },
  en: {
    translation: DataEn,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ar",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

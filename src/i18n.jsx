import i18n from "i18next";
import {  initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) 
  .init({

    resources: {
      en: {
        translation: {
          "Home": "Home",
           "WLC": "Wellcome",
           "Categories": "Categories",
           "Products" : "Products",
           "Login": "Login",
           "Register":"Register",
           "Logout":"Logout",
           "Cart": "Cart"
        }
      },
       ar: {
        translation: {
          "Home": "الرئيسية",
           "WLC": "مرحبا",
           "Categories": "التصنيفات",
           "Products" : "المنتجات",
           "Login": "تسجيل الدخول",
           "Register":"تسجيل",
           "Logout":"تسجيل الخروج",
           "Cart": "السلة"
        }
      }
    },
    lng: "er", 
    fallbackLng: "en",


  });
  export default i18n;
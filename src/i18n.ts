import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      profile: {
        title: 'User Profile',
        name: 'Name',
        age: 'Age',
        address: 'Address',
        edit: 'Edit',
        save: 'Save',
        cancel: 'Cancel',
        notset: 'Not set',
        likes: 'Liked Products',
        nolikes: 'No liked products yet.'
      }
    }
  },
  fa: {
    translation: {
      profile: {
        title: 'پروفایل کاربر',
        name: 'نام',
        age: 'سن',
        address: 'آدرس',
        edit: 'ویرایش',
        save: 'ذخیره',
        cancel: 'انصراف',
        notset: 'وارد نشده',
        likes: 'محصولات مورد علاقه',
        nolikes: 'هنوز محصول مورد علاقه‌ای ندارید.'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 
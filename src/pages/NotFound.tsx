import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center p-8" lang={lang} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <h1 className="text-5xl font-bold text-primary-600 mb-6">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{t('not_found.title')}</h2>
      <p className="text-gray-600 mb-8">{t('not_found.desc')}</p>
      <button
        onClick={() => navigate('/')}
        className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
      >
        {t('not_found.home')}
      </button>
    </div>
  );
};

export default NotFound; 
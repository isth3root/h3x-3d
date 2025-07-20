import React, { useState, useEffect } from 'react';
import { getLikedProducts } from '../utils/likes';
import { products } from '../data/products';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';

const USER_PROFILE_KEY = 'user_profile';

interface UserProfileData {
  name: string;
  age: string;
  address: string;
}

const UserProfile: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [profile, setProfile] = useState<UserProfileData>({ name: '', age: '', address: '' });
  const [editMode, setEditMode] = useState(false);
  const [likes, setLikes] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(USER_PROFILE_KEY);
    if (stored) setProfile(JSON.parse(stored));
    setLikes(getLikedProducts());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    setEditMode(false);
  };

  const handleLangChange = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
  };

  // Set direction on mount
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white pt-16 transition-colors duration-500">
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-primary-700 drop-shadow-sm">{t('profile.title')}</h1>
          <div className="flex gap-2">
            <button onClick={() => handleLangChange('en')} className={`px-3 py-1 rounded font-bold transition-colors duration-200 ${i18n.language === 'en' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}>EN</button>
            <button onClick={() => handleLangChange('fa')} className={`px-3 py-1 rounded font-bold transition-colors duration-200 ${i18n.language === 'fa' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}>FA</button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-8 mb-8 border border-primary-100"
        >
          <AnimatePresence mode="wait">
            {editMode ? (
              <motion.form
                key="edit"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                onSubmit={e => { e.preventDefault(); handleSave(); }}
              >
                <div className="mb-4">
                  <label className="block mb-1 font-semibold text-primary-700">{t('profile.name')}</label>
                  <input name="name" value={profile.name} onChange={handleChange} className="w-full border border-primary-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-primary-400 transition-all" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold text-primary-700">{t('profile.age')}</label>
                  <input name="age" value={profile.age} onChange={handleChange} className="w-full border border-primary-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-primary-400 transition-all" />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 font-semibold text-primary-700">{t('profile.address')}</label>
                  <input name="address" value={profile.address} onChange={handleChange} className="w-full border border-primary-200 px-3 py-2 rounded-lg focus:ring-2 focus:ring-primary-400 transition-all" />
                </div>
                <div className="flex gap-2 mt-6">
                  <button type="submit" className="btn-primary flex-1 shadow-md">{t('profile.save')}</button>
                  <button type="button" onClick={() => setEditMode(false)} className="btn-secondary flex-1">{t('profile.cancel')}</button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="view"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-2 text-lg"><b>{t('profile.name')}:</b> <span className="text-primary-700">{profile.name || t('profile.notset')}</span></div>
                <div className="mb-2 text-lg"><b>{t('profile.age')}:</b> <span className="text-primary-700">{profile.age || t('profile.notset')}</span></div>
                <div className="mb-2 text-lg"><b>{t('profile.address')}:</b> <span className="text-primary-700">{profile.address || t('profile.notset')}</span></div>
                <button onClick={() => setEditMode(true)} className="btn-primary mt-6 w-full shadow-md">{t('profile.edit')}</button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-8 border border-primary-100"
        >
          <h2 className="text-xl font-bold mb-4 text-primary-700">{t('profile.likes')}</h2>
          <AnimatePresence mode="wait">
            {likes.length === 0 ? (
              <motion.div key="nolikes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="text-gray-500 text-center">{t('profile.nolikes')}</div>
              </motion.div>
            ) : (
              <motion.ul key="likes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                {likes.map(id => {
                  const product = products.find(p => p.id === id);
                  return product ? (
                    <li key={id} className="border-b pb-2 flex items-center gap-2">
                      <span className="font-semibold text-primary-700">{product.name}</span>
                      <span className="text-gray-400">({product.id})</span>
                    </li>
                  ) : null;
                })}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default UserProfile; 
import React, { useState, useEffect, useRef } from 'react';
import { getLikedProducts } from '../utils/likes';
import { products } from '../data/products';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { getUser, logout as doLogout } from '../utils/auth';
import { clearLikes } from '../utils/likes';
import { clearCart } from '../utils/cart';
import { useNavigate } from 'react-router-dom';

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
  const profileCardRef = useRef<HTMLDivElement>(null);
  const likesCardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    const stored = localStorage.getItem(USER_PROFILE_KEY);
    if (stored) setProfile(JSON.parse(stored));
    setLikes(getLikedProducts());
    setUser(getUser());
    if (!getUser()) {
      navigate('/');
    }
  }, [navigate]);

  useEffect(() => {
    if (profileCardRef.current) {
      gsap.fromTo(
        profileCardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
    if (likesCardRef.current) {
      gsap.fromTo(
        likesCardRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power2.out' }
      );
    }
  }, [editMode, likes.length, i18n.language]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    setEditMode(false);
  };

  const handleLogout = () => {
    doLogout();
    clearLikes();
    clearCart();
    navigate('/');
  };

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'fa' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white pt-16 transition-colors duration-500">
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-primary-700 drop-shadow-sm">{t('profile.title')}</h1>
          {user && (
            <button onClick={handleLogout} className="btn-secondary text-sm px-4 py-2 rounded-lg shadow-md">{t('profile.logout')}</button>
          )}
        </div>
        <div ref={profileCardRef} className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-8 mb-8 border border-primary-100">
          {editMode ? (
            <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
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
            </form>
          ) : (
            <div>
              <div className="mb-2 text-lg"><b>{t('profile.name')}:</b> <span className="text-primary-700">{profile.name || t('profile.notset')}</span></div>
              <div className="mb-2 text-lg"><b>{t('profile.age')}:</b> <span className="text-primary-700">{profile.age || t('profile.notset')}</span></div>
              <div className="mb-2 text-lg"><b>{t('profile.address')}:</b> <span className="text-primary-700">{profile.address || t('profile.notset')}</span></div>
              {user && (
                <div className="mb-2 text-lg"><b>{t('profile.phone')}:</b> <span className="text-primary-700">{user.phone}</span></div>
              )}
              <button onClick={() => setEditMode(true)} className="btn-primary mt-6 w-full shadow-md">{t('profile.edit')}</button>
            </div>
          )}
        </div>
        <div ref={likesCardRef} className="bg-white/80 backdrop-blur rounded-2xl shadow-2xl p-8 border border-primary-100">
          <h2 className="text-xl font-bold mb-4 text-primary-700">{t('profile.likes')}</h2>
          {likes.length === 0 ? (
            <div className="text-gray-500 text-center">{t('profile.nolikes')}</div>
          ) : (
            <ul className="space-y-2">
              {likes.map(id => {
                const product = products.find(p => p.id === id);
                return product ? (
                  <li key={id} className="border-b pb-2 flex items-center gap-2">
                    <a href={`/h3x-3d/product/${product.id}`} className="font-semibold text-primary-700 hover:underline">{product.name[i18n.language as 'fa' | 'en']}</a>
                    <span className="text-gray-400">({product.id})</span>
                  </li>
                ) : null;
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 
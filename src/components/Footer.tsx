import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, Home, GraduationCap, Package, Gamepad2 } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary-400">{t('footer.company')}</h3>
            <p className="text-gray-300 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.quick_links')}</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">{t('footer.home')}</Link></li>
              <li><Link to="/search" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">{t('footer.products')}</Link></li>
              <li><Link to="/search" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">{t('footer.categories')}</Link></li>
              <li><Link to="/custom" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">{t('footer.custom')}</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">{t('footer.about')}</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.categories')}</h4>
            <ul className="space-y-2">
              <li><Link to="/search?category=Figurines" className="flex items-center text-gray-300 hover:text-primary-400 transition-colors duration-200"><Star className="w-4 h-4 mr-2" />{t('footer.figurines')}</Link></li>
              <li><Link to="/search?category=Home%20Decor" className="flex items-center text-gray-300 hover:text-primary-400 transition-colors duration-200"><Home className="w-4 h-4 mr-2" />{t('footer.home_decor')}</Link></li>
              <li><Link to="/search?category=Educational" className="flex items-center text-gray-300 hover:text-primary-400 transition-colors duration-200"><GraduationCap className="w-4 h-4 mr-2" />{t('footer.educational')}</Link></li>
              <li><Link to="/search?category=Accessories" className="flex items-center text-gray-300 hover:text-primary-400 transition-colors duration-200"><Package className="w-4 h-4 mr-2" />{t('footer.accessories')}</Link></li>
              <li><Link to="/search?category=Games" className="flex items-center text-gray-300 hover:text-primary-400 transition-colors duration-200"><Gamepad2 className="w-4 h-4 mr-2" />{t('footer.games')}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{t('footer.contact_us')}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">{t('footer.email')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">{t('footer.phone')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">{t('footer.address')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-4">{t('footer.newsletter_title')}</h4>
            <p className="text-gray-300 mb-4">{t('footer.newsletter_desc')}</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
              <input
                type="email"
                placeholder={t('footer.email_placeholder')}
                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-primary-400 min-w-0"
              />
              <button className="bg-primary-600 hover:bg-primary-700 px-6 py-2 rounded-r-lg transition-colors duration-200 w-full sm:w-auto">
                {t('footer.subscribe')}
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
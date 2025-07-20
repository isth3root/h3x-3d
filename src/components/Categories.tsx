import React from 'react';
import { Package, Home, Gamepad2, Lightbulb, GraduationCap, Briefcase, Star } from 'lucide-react';
import { useGSAP } from '../hooks/useGSAP';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const categoryIcons = {
  'Figurines': Star,
  'Accessories': Package,
  'Educational': GraduationCap,
  'Home Decor': Home,
  'Office': Briefcase,
  'Games': Gamepad2,
  'Lighting': Lightbulb,
};

const categoryNames = {
  en: {
    'Figurines': 'Figurines',
    'Accessories': 'Accessories',
    'Educational': 'Educational',
    'Home Decor': 'Home Decor',
    'Office': 'Office',
    'Games': 'Games',
    'Lighting': 'Lighting',
  },
  fa: {
    'Figurines': 'فیگورین',
    'Accessories': 'لوازم جانبی',
    'Educational': 'آموزشی',
    'Home Decor': 'دکوراسیون منزل',
    'Office': 'اداری',
    'Games': 'بازی‌ها',
    'Lighting': 'روشنایی',
  }
};

const categories = [
  { name: 'Figurines', count: 45, color: 'bg-purple-500' },
  { name: 'Accessories', count: 32, color: 'bg-blue-500' },
  { name: 'Educational', count: 28, color: 'bg-green-500' },
  { name: 'Home Decor', count: 38, color: 'bg-pink-500' },
  { name: 'Office', count: 24, color: 'bg-yellow-500' },
  { name: 'Games', count: 19, color: 'bg-red-500' },
  { name: 'Lighting', count: 15, color: 'bg-indigo-500' },
];

const Categories: React.FC = () => {
  const ref = useGSAP<HTMLDivElement>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'fa' | 'en';

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('landing.categories_title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('landing.categories_desc')}
          </p>
        </div>
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
          {categories.map((category) => {
            const IconComponent = categoryIcons[category.name as keyof typeof categoryIcons];
            const displayName = categoryNames[lang][category.name as keyof typeof categoryNames['en']];
            return (
              <div
                key={category.name}
                className="category-card group cursor-pointer"
                onClick={() => navigate(`/search?category=${encodeURIComponent(category.name)}`)}
              >
                <div className={`bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
                  <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {IconComponent && <IconComponent className="w-8 h-8 text-white" />}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors duration-200">
                    {displayName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.count} {t('nav.products')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
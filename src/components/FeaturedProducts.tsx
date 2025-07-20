import React from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';
import { useGSAP } from '../hooks/useGSAP';
import { useTranslation } from 'react-i18next';

const FeaturedProducts: React.FC = () => {
  const featuredProducts = products.filter(product => product.featured);
  const ref = useGSAP<HTMLDivElement>();
  const { t } = useTranslation();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('landing.featured_title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('landing.featured_desc')}
          </p>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="product-card"
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 transform hover:scale-105">
            {t('landing.view_all')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';
import { useTranslation } from 'react-i18next';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = "" }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'fa' | 'en';
  return (
    <div className={`group cursor-pointer ${className}`}>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name[lang]}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay */}
          {/* Removed overlay with eye and like icons */}

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-4 left-4 bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {t('search.featured')}
            </div>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
            {product.category[lang]}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-lg text-gray-800 group-hover:text-primary-600 transition-colors duration-200 line-clamp-1">
              <Link to={`/product/${product.id}`} className="hover:underline">{product.name[lang]}</Link>
            </h3>
            <span className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
              {product.id}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description[lang]}
          </p>

          {/* Materials */}
          {product.materials && (
            <div className="flex flex-wrap gap-1 mb-4">
              {product.materials.slice(0, 2).map((material, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                >
                  {material}
                </span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Link
              to={`/product/${product.id}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-center py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
            >
              {t('product.view_details')}
            </Link>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors duration-200 font-medium">
              {t('product.contact')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import SearchBox from '../components/SearchBox';
//import { useStaggerAnimation } from '../hooks/useGSAP';
import gsap from 'gsap';
import { useTranslation } from 'react-i18next';

const ITEMS_PER_PAGE = 10;

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [pendingCategory, setPendingCategory] = useState(selectedCategory);
  const [pendingSortBy, setPendingSortBy] = useState(sortBy);

  const query = searchParams.get('q') || '';
  let categoryParam = searchParams.get('category');
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'fa' | 'en';
  const defaultCategory = lang === 'fa' ? 'همه' : 'All';

  // If the category param is missing or matches the default, treat as no filter
  // if (!categoryParam || categoryParam === defaultCategory) {
  //   categoryParam = undefined;
  // }

  // const ref = useStaggerAnimation<HTMLDivElement>('.search-product-card', 0.1);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedCategory(categoryParam || defaultCategory);
    setCurrentPage(1);
  }, [categoryParam, lang]);

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [query, selectedCategory]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (query) {
      filtered = filtered.filter(product =>
        product.id.toLowerCase().includes(query.toLowerCase()) ||
        product.name[lang].toLowerCase().includes(query.toLowerCase()) ||
        product.description[lang].toLowerCase().includes(query.toLowerCase()) ||
        product.category[lang].toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== defaultCategory) {
      filtered = filtered.filter(product => product.category[lang] === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name[lang].localeCompare(b.name[lang]);
        case 'category':
          return a.category[lang].localeCompare(b.category[lang]);
        case 'featured':
          return b.featured ? 1 : -1;
        default:
          return 0;
      }
    });

    return filtered;
  }, [query, selectedCategory, sortBy, lang]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(gridRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
    }
  }, [paginatedProducts]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const newParams = new URLSearchParams(searchParams);
    if (category === defaultCategory) {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16" lang={i18n.language} dir={i18n.language === 'fa' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              {query ? t('search.results', { query }) : t('search.browse')}
            </h1>
            <SearchBox className="mb-6" placeholder={t('search.browse')} />
            
            {/* Results Summary */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                {t('search.showing', { from: startIndex + 1, to: Math.min(startIndex + ITEMS_PER_PAGE, filteredProducts.length), total: filteredProducts.length })}
              </span>
              <div className="flex items-center space-x-4">
                {/* Filters Toggle */}
                <button
                  className="lg:hidden flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  onClick={() => {
                    setPendingCategory(selectedCategory);
                    setPendingSortBy(sortBy);
                    setMobileFiltersOpen(true);
                  }}
                >
                  {t('search.filters')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (desktop only) */}
          <div className={`lg:w-64 space-y-6 hidden lg:block`}>
            {/* Categories */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">{t('nav.categories')}</h3>
              <div className="space-y-2">
                {categories.map((categoryObj) => {
                  const category = categoryObj[lang];
                  return (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                        selectedCategory === category
                          ? 'bg-primary-100 text-primary-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                      {category !== defaultCategory && (
                        <span className="float-right text-sm text-gray-400">
                          {products.filter(p => p.category[lang] === category).length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sort Options */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">{t('search.sort')}</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="name">{t('search.sort_name')}</option>
                <option value="category">{t('search.sort_category')}</option>
                <option value="featured">{t('search.sort_featured')}</option>
              </select>
            </div>

            {/* Featured Filter */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">{t('search.featured')}</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="ml-2 text-gray-600">{t('search.featured')}</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="ml-2 text-gray-600">{t('search.new')}</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="ml-2 text-gray-600">{t('search.custom')}</span>
                </label>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('search.no_results')}</h3>
                <p className="text-gray-600 mb-6">
                  {t('search.clear')}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory(defaultCategory);
                    setSearchParams({});
                  }}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  {t('search.clear')}
                </button>
              </div>
            ) : (
              <>
                <div
                  ref={gridRef}
                  className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                >
                  {paginatedProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      className="search-product-card"
                    />
                  ))}
                </div>

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Sidebar */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" onClick={() => setMobileFiltersOpen(false)} />
          <div className="relative w-80 max-w-full bg-white h-full shadow-xl p-6 overflow-y-auto ml-auto animate-slide-in-right">
            <h2 className="text-xl font-bold mb-4">{t('search.filters')}</h2>
            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">{t('nav.categories')}</h3>
              <div className="space-y-2">
                {categories.map((categoryObj) => {
                  const category = categoryObj[lang];
                  return (
                    <button
                      key={category}
                      onClick={() => setPendingCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                        pendingCategory === category
                          ? 'bg-primary-100 text-primary-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                      {category !== defaultCategory && (
                        <span className="float-right text-sm text-gray-400">
                          {products.filter(p => p.category[lang] === category).length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            {/* Sort Options */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">{t('search.sort')}</h3>
              <select
                value={pendingSortBy}
                onChange={(e) => setPendingSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="name">{t('search.sort_name')}</option>
                <option value="category">{t('search.sort_category')}</option>
                <option value="featured">{t('search.sort_featured')}</option>
              </select>
            </div>
            {/* Featured Filter (not implemented, just UI) */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">{t('search.featured')}</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" disabled />
                  <span className="ml-2 text-gray-600">{t('search.featured')}</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" disabled />
                  <span className="ml-2 text-gray-600">{t('search.new')}</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" disabled />
                  <span className="ml-2 text-gray-600">{t('search.custom')}</span>
                </label>
              </div>
            </div>
            <button
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 mt-4"
              onClick={() => {
                setSelectedCategory(pendingCategory);
                setSortBy(pendingSortBy);
                setMobileFiltersOpen(false);
              }}
            >
              {t('search.apply') || 'Apply'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
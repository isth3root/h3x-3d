import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ 
  placeholder = "Search by product ID or description...", 
  className = "" 
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isFa = i18n.language === 'fa';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`} dir={isFa ? 'rtl' : 'ltr'}>
      <div className="relative flex items-center">
        {/* Magnifier */}
        <span className={`absolute ${isFa ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none`}>
          <Search className="w-5 h-5" />
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full ${isFa ? 'pr-12 pl-4 text-right' : 'pl-12 pr-4 text-left'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 bg-white text-black shadow-sm`}
        />
        <button
          type="submit"
          className={`absolute ${isFa ? 'left-2' : 'right-2'} top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-md transition-colors duration-200 text-sm font-medium`}
        >
          {isFa ? t('search.search_btn', 'جستجو') : t('search.search_btn', 'Search')}
        </button>
      </div>
    </form>
  );
};

export default SearchBox;
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all duration-200 bg-white text-black shadow-sm"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
      <button
        type="submit"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-1.5 rounded-md transition-colors duration-200 text-sm font-medium"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
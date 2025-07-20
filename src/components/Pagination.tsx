import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'fa' | 'en';
  const isRTL = lang === 'fa';

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={`flex items-center justify-center mt-12 ${isRTL ? 'flex-row-reverse space-x-reverse' : 'space-x-2'}`}
      dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Previous Button (LTR: prev, RTL: next) */}
      <button
        onClick={() => isRTL ? onPageChange(currentPage + 1) : onPageChange(currentPage - 1)}
        disabled={isRTL ? currentPage === totalPages : currentPage === 1}
        className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
          (isRTL ? currentPage === totalPages : currentPage === 1)
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
        }`}
      >
        {isRTL ? (
          <>
            <ChevronRight className="w-4 h-4 ml-1" />
            {t('pagination.next')}
          </>
        ) : (
          <>
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t('pagination.previous')}
          </>
        )}
      </button>

      {/* Page Numbers */}
      <div className={`flex items-center ${isRTL ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
        {getPageNumbers().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-gray-400">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`px-3 py-2 rounded-lg transition-colors duration-200 ${
                  currentPage === page
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Button (LTR: next, RTL: prev) */}
      <button
        onClick={() => isRTL ? onPageChange(currentPage - 1) : onPageChange(currentPage + 1)}
        disabled={isRTL ? currentPage === 1 : currentPage === totalPages}
        className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
          (isRTL ? currentPage === 1 : currentPage === totalPages)
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
        }`}
      >
        {isRTL ? (
          <>
            {t('pagination.previous')}
            <ChevronLeft className="w-4 h-4 mr-1" />
          </>
        ) : (
          <>
            {t('pagination.next')}
            <ChevronRight className="w-4 h-4 ml-1" />
          </>
        )}
      </button>
    </div>
  );
};

export default Pagination;
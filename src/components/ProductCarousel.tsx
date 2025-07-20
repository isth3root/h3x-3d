import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';

interface ProductCarouselProps {
  images: string[];
  productName: string;
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ images, productName }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    // Animate image change
    gsap.fromTo('.carousel-image',
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [currentImage]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden group">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        )}
        
        <img
          src={images[currentImage]}
          alt={`${productName} - Image ${currentImage + 1}`}
          className="carousel-image w-full h-full object-cover"
          onLoad={() => setIsLoading(false)}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {currentImage + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentImage
                  ? 'border-primary-600 ring-2 ring-primary-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Indicator */}
      <p className="text-sm text-gray-500 text-center">
        Click and drag to zoom • {images.length} image{images.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
};

export default ProductCarousel;
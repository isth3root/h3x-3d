import React, { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import SearchBox from './SearchBox';

const heroSlides = [
  {
    id: 1,
    title: "Premium 3D Printed Products",
    subtitle: "Bringing Your Ideas to Life",
    description: "Discover our collection of high-quality 3D printed items, from decorative pieces to functional accessories.",
    image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg",
    cta: "Explore Collection"
  },
  {
    id: 2,
    title: "Custom Design Solutions",
    subtitle: "Your Vision, Our Precision",
    description: "Get custom 3D printed products tailored to your specific needs with professional quality and attention to detail.",
    image: "https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg",
    cta: "Start Custom Order"
  },
  {
    id: 3,
    title: "Educational & Functional",
    subtitle: "Learn Through Innovation",
    description: "Explore our educational models and functional prints that combine learning with practical applications.",
    image: "https://images.pexels.com/photos/159298/gears-cogs-machine-machinery-159298.jpeg",
    cta: "View Educational Items"
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  // const slideRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Animate content when slide changes
    const tl = gsap.timeline();
    
    tl.fromTo([titleRef.current, subtitleRef.current, descriptionRef.current, ctaRef.current],
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1,
        ease: "power2.out" 
      }
    );
  }, [currentSlide]);

  const currentSlideData = heroSlides[currentSlide];

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url(${currentSlideData.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <p 
              ref={subtitleRef}
              className="text-lg md:text-xl mb-4 text-primary-300 font-medium"
            >
              {currentSlideData.subtitle}
            </p>
            <h1 
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              {currentSlideData.title}
            </h1>
            <p 
              ref={descriptionRef}
              className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed"
            >
              {currentSlideData.description}
            </p>
            
            {/* Search Box */}
            <div className="mb-8 max-w-2xl mx-auto">
              <SearchBox placeholder="Search for products..." />
            </div>

            <button 
              ref={ctaRef}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {currentSlideData.cta}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
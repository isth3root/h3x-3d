import React, { useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';

const LandingPage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' });
    }
    if (categoriesRef.current) {
      gsap.fromTo(categoriesRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power2.out' });
    }
    if (featuredRef.current) {
      gsap.fromTo(featuredRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power2.out' });
    }
  }, []);

  return (
    <div
      className="min-h-screen"
      lang={i18n.language}
      dir={i18n.language === 'fa' ? 'rtl' : 'ltr'}
    >
      <div ref={heroRef}><Hero /></div>
      <div ref={categoriesRef}><Categories /></div>
      <div ref={featuredRef}><FeaturedProducts /></div>
    </div>
  );
};

export default LandingPage;
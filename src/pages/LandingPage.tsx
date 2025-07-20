import React from 'react';
import Hero from '../components/Hero';
import Categories from '../components/Categories';
import FeaturedProducts from '../components/FeaturedProducts';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Categories />
      <FeaturedProducts />
    </div>
  );
};

export default LandingPage;
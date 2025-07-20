import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-primary-400">3D Print Store</h3>
            <p className="text-gray-300 leading-relaxed">
              Your premier destination for high-quality 3D printed products. 
              We bring innovation and creativity to life through precision manufacturing.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors duration-200">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Home</Link></li>
              <li><Link to="/search" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Products</Link></li>
              <li><Link to="/search" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Categories</Link></li>
              <li><Link to="/custom" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Custom Orders</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">About Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/search?category=Figurines" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Figurines</Link></li>
              <li><Link to="/search?category=Home%20Decor" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Home Decor</Link></li>
              <li><Link to="/search?category=Educational" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Educational</Link></li>
              <li><Link to="/search?category=Accessories" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Accessories</Link></li>
              <li><Link to="/search?category=Games" className="text-gray-300 hover:text-primary-400 transition-colors duration-200">Games</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">itssheesh0@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">+98 910 405 6429</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary-400" />
                <span className="text-gray-300">Iran, Behbahan City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-4">Subscribe to get updates on new products and special offers</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-primary-400 min-w-0"
              />
              <button className="bg-primary-600 hover:bg-primary-700 px-6 py-2 rounded-r-lg transition-colors duration-200 w-full sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 3D Print Store. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
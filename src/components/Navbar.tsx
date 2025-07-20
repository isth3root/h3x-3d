import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, ChevronDown, LogOut } from "lucide-react";
import { gsap } from "gsap";
import { categories } from "../data/products";
import { isLoggedIn, logout, getUser } from "../utils/auth";
import { getCartItemCount } from "../utils/cart";
import LoginModal from "./LoginModal";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  // const [showToast, setShowToast] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setUserLoggedIn(isLoggedIn());
    setCartCount(getCartItemCount());

    // Listen for cart updates
    const handleCartUpdate = () => {
      setCartCount(getCartItemCount());
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, []);

  const handleLogin = () => {
    setUserLoggedIn(true);
    setCartCount(getCartItemCount());
  };

  const handleLogout = () => {
    logout();
    setUserLoggedIn(false);
    setCartCount(0);
    window.dispatchEvent(new Event("cartUpdated"));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Animate navbar on mount
    gsap.fromTo(
      ".navbar",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Custom Orders", path: "/custom" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg"
          : "bg-white bg-opacity-95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">3D</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Print Store</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              to="/search"
              className={`font-medium transition-colors duration-200 hover:text-primary-600 ${
                location.pathname === "/search"
                  ? "text-primary-600"
                  : "text-gray-700"
              }`}
            >
              Products
            </Link>

            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="flex items-center font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
              >
                Categories
                <ChevronDown
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    isCategoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isCategoriesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {categories
                    .filter((cat) => cat !== "All")
                    .map((category) => (
                      <Link
                        key={category}
                        to={`/search?category=${encodeURIComponent(category)}`}
                        onClick={() => setIsCategoriesOpen(false)}
                        className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                      >
                        {category}
                      </Link>
                    ))}
                </div>
              )}
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors duration-200 hover:text-primary-600 ${
                  location.pathname === link.path
                    ? "text-primary-600"
                    : "text-gray-700"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => {
                if (userLoggedIn) {
                  navigate('/profile');
                } else {
                  setIsLoginModalOpen(true);
                }
              }}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
              title="Profile"
            >
              <User className="w-5 h-5" />
            </button>

            {userLoggedIn && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  {getUser()?.phone}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors duration-200"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/search"
                onClick={() => setIsOpen(false)}
                className={`font-medium transition-colors duration-200 hover:text-primary-600 ${
                  location.pathname === "/search"
                    ? "text-primary-600"
                    : "text-gray-700"
                }`}
              >
                Products
              </Link>

              {/* Mobile Categories */}
              <div className="space-y-2">
                <span className="font-medium text-gray-700">Categories</span>
                <div className="pl-4 space-y-2">
                  {categories
                    .filter((cat) => cat !== "All")
                    .map((category) => (
                      <Link
                        key={category}
                        to={`/search?category=${encodeURIComponent(category)}`}
                        onClick={() => setIsOpen(false)}
                        className="block text-gray-600 hover:text-primary-600 transition-colors duration-200"
                      >
                        {category}
                      </Link>
                    ))}
                </div>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium transition-colors duration-200 hover:text-primary-600 ${
                    location.pathname === link.path
                      ? "text-primary-600"
                      : "text-gray-700"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </nav>
  );
};

export default Navbar;

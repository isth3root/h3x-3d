import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, ChevronDown, Globe } from "lucide-react";
import { gsap } from "gsap";
import { categories } from "../data/products";
import { isLoggedIn } from "../utils/auth";
import { useCart } from "../hooks/useCart";
import LoginModal from "./LoginModal";
import { useTranslation } from 'react-i18next';

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCategoriesMobileOpen, setIsCategoriesMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const { getCartItemCount } = useCart();
  const cartCount = getCartItemCount();
  const location = useLocation();
  const navigate = useNavigate();
  const categoriesDropdownRef = useRef<HTMLDivElement>(null);
  const lang = i18n.language as 'fa' | 'en';

  useEffect(() => {
    setUserLoggedIn(isLoggedIn());
  }, []);

  const handleLogin = () => {
    setUserLoggedIn(true);
  };

  // const handleLogout = () => {
  //   logout();
  //   setUserLoggedIn(false);
  //   setCartCount(0);
  //   window.dispatchEvent(new Event("cartUpdated"));
  // };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".navbar",
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  // Handle hover for categories on large screens
  const handleCategoriesMouseEnter = () => {
    if (window.innerWidth >= 1024) setIsCategoriesOpen(true);
  };
  const handleCategoriesMouseLeave = () => {
    if (window.innerWidth >= 1024) setIsCategoriesOpen(false);
  };

  const navLinks = [
    { name: t('nav.home'), path: "/" },
    { name: t('nav.custom'), path: "/custom" },
    { name: t('nav.about'), path: "/about" },
    { name: t('nav.contact'), path: "/contact" },
  ];

  // Language dropdown
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langOptions = [
    { code: 'fa', label: 'فارسی' },
    { code: 'en', label: 'English' },
  ];

  return (
    <nav
      className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg"
          : "bg-white bg-opacity-95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span
                className="text-white font-bold text-sm"
                style={{ fontFamily: "Inter, Arial, sans-serif" }}
              >
                3D
              </span>
            </div>
            <span
              className="text-xl font-bold text-gray-800"
              style={{ fontFamily: "Inter, Arial, sans-serif" }}
            >
              H3X3D
            </span>
          </Link>

          {/* Mobile: Cart, User, Lang, Hamburger */}
          <div className="flex items-center space-x-2 lg:hidden">
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
                  navigate("/profile");
                } else {
                  setIsLoginModalOpen(true);
                }
              }}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
              title={t("nav.profile")}
            >
              <User className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsLangOpen((v) => !v)}
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
                title={t("nav.language", "Language")}
              >
                <Globe className="w-5 h-5" />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {langOptions.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        i18n.changeLanguage(opt.code);
                        setIsLangOpen(false);
                      }}
                      className={`block w-full text-right px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 ${
                        i18n.language === opt.code ? "font-bold" : ""
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link
              to="/search"
              className={`font-medium transition-colors duration-200 hover:text-primary-600 ${
                location.pathname === "/search"
                  ? "text-primary-600"
                  : "text-gray-700"
              }`}
            >
              {t("nav.products")}
            </Link>
            {/* Categories Dropdown (hover on large screens) */}
            <div
              className="relative px-3"
              onMouseEnter={handleCategoriesMouseEnter}
              onMouseLeave={handleCategoriesMouseLeave}
            >
              <button
                onClick={() => {
                  if (window.innerWidth < 1024)
                    setIsCategoriesOpen(!isCategoriesOpen);
                }}
                className="flex items-center font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200"
                type="button"
              >
                {t("nav.categories")}
                <ChevronDown
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    isCategoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isCategoriesOpen && (
                <div
                  ref={categoriesDropdownRef}
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                >
                  {categories
                    .filter(
                      (cat) => cat[lang] !== (lang === "fa" ? "همه" : "All")
                    )
                    .map((categoryObj) => {
                      const category = categoryObj[lang];
                      return (
                        <Link
                          key={category}
                          to={`/search?category=${encodeURIComponent(
                            category
                          )}`}
                          onClick={() => setIsCategoriesOpen(false)}
                          className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
                        >
                          {category}
                        </Link>
                      );
                    })}
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
            {/* Desktop Cart, User, Lang */}
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
                  navigate("/profile");
                } else {
                  setIsLoginModalOpen(true);
                }
              }}
              className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
              title={t("nav.profile")}
            >
              <User className="w-5 h-5" />
            </button>
            <div className="relative">
              <button
                onClick={() => setIsLangOpen((v) => !v)}
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
                title={t("nav.language", "Language")}
              >
                <Globe className="w-5 h-5" />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  {langOptions.map((opt) => (
                    <button
                      key={opt.code}
                      onClick={() => {
                        i18n.changeLanguage(opt.code);
                        setIsLangOpen(false);
                      }}
                      className={`block w-full text-right px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 ${
                        i18n.language === opt.code ? "font-bold" : ""
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
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
                {t("nav.products")}
              </Link>
              {/* Mobile Categories Collapsible */}
              <div>
                <button
                  onClick={() => setIsCategoriesMobileOpen((v) => !v)}
                  className="flex items-center font-medium text-gray-700 hover:text-primary-600 transition-colors duration-200 w-full"
                >
                  {t("nav.categories")}
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                      isCategoriesMobileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isCategoriesMobileOpen && (
                  <div className="pl-4 mt-2 space-y-2">
                    {categories
                      .filter(
                        (cat) => cat[lang] !== (lang === "fa" ? "همه" : "All")
                      )
                      .map((categoryObj) => {
                        const category = categoryObj[lang];
                        return (
                          <Link
                            key={category}
                            to={`/search?category=${encodeURIComponent(
                              category
                            )}`}
                            onClick={() => setIsOpen(false)}
                            className="block text-gray-600 hover:text-primary-600 transition-colors duration-200"
                          >
                            {category}
                          </Link>
                        );
                      })}
                  </div>
                )}
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

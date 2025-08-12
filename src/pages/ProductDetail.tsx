import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Share2,
  Heart,
  Package,
  Truck,
  Shield,
  Award,
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import { products } from "../data/products";
import ProductCarousel from "../components/ProductCarousel";
import { useGSAP, useStaggerAnimation } from "../hooks/useGSAP";
import { isLoggedIn } from "../utils/auth";
import {
  addToCart,
  getCartItemCount,
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from "../utils/cart";
import { toggleLike, isProductLiked } from "../utils/likes";
import { setPendingAction, getPendingAction, clearPendingAction } from "../store/pendingAction";
import LoginModal from "../components/LoginModal";
import { useTranslation } from 'react-i18next';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const [isLoginModalOpen, setIsLoginModalOpen] = React.useState(false);
  const [userLoggedIn, setUserLoggedIn] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const [selectedMaterial, setSelectedMaterial] = React.useState("");
  const [, setCartCount] = React.useState(0);
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [productInCart, setProductInCart] = React.useState(0);

  const heroRef = useGSAP<HTMLDivElement>();
  const detailsRef = useStaggerAnimation<HTMLDivElement>(".detail-item", 0.1);

  const { t, i18n } = useTranslation();
  const lang = i18n.language as 'fa' | 'en';

  React.useEffect(() => {
    setUserLoggedIn(isLoggedIn());
    setCartCount(getCartItemCount());
    if (product) {
      setIsLiked(isProductLiked(product.id));
      setSelectedMaterial(product.materials?.[0] || "");
      updateProductInCart();
    }
  }, [product]);

  React.useEffect(() => {
    const handleCartUpdate = () => {
      setCartCount(getCartItemCount());
      updateProductInCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [product, selectedMaterial]);

  const updateProductInCart = () => {
    if (product) {
      const cartItems = getCartItems();
      const item = cartItems.find(
        (item) => item.id === product.id && item.material === selectedMaterial
      );
      setProductInCart(item ? item.quantity : 0);
    }
  };

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  const handleLogin = () => {
    setUserLoggedIn(true);
    setCartCount(getCartItemCount());
    updateProductInCart();

    const pendingAction = getPendingAction();
    if (pendingAction && pendingAction.type === 'like' && product && pendingAction.payload === product.id) {
      handleLike(true);
      clearPendingAction();
    }
  };

  const handleLike = (force = false) => {
    if (!userLoggedIn && !force) {
      if (product) {
        setPendingAction({ type: 'like', payload: product.id });
      }
      setIsLoginModalOpen(true);
      return;
    }

    if (product) {
      const newLikedState = toggleLike(product.id);
      setIsLiked(newLikedState);
      showToastMessage(
        newLikedState ? "Added to favorites!" : "Removed from favorites"
      );
    }
  };

  const handleAddToCart = () => {
    if (!userLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    if (product) {
      addToCart(
        product.id,
        product.name[lang],
        product.images[0],
        product.category[lang],
        selectedMaterial
      );
      setCartCount(getCartItemCount());
      updateProductInCart();
      showToastMessage("Added to cart!");
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (!userLoggedIn) {
      setIsLoginModalOpen(true);
      return;
    }

    if (product) {
      if (newQuantity > 5) {
        showToastMessage("For orders of more than 5, please contact us.");
        return;
      }

      if (newQuantity === 0) {
        removeFromCart(product.id, selectedMaterial);
        showToastMessage("Removed from cart");
      } else {
        updateCartQuantity(product.id, newQuantity, selectedMaterial);
        showToastMessage("Cart updated");
      }
      updateProductInCart();
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };
  const handleShare = async () => {
    const url = window.location.href;
    const title = product?.name[lang] || "Check out this product";
    const text = `${title} - ${product?.description[lang]}`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  const handleEmailOrder = () => {
    const subject = `Order Inquiry - ${product?.name[lang]} (${product?.id})`;
    const body = `Hi,\n\nI'm interested in ordering the following product:\n\nProduct: ${product?.name[lang]}\nID: ${product?.id}\nMaterial: ${selectedMaterial}\n\nPlease provide pricing and availability information.\n\nThank you!`;
    window.location.href = `mailto:orders@3dprintstore.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handlePhoneOrder = () => {
    window.location.href = "tel:+15551234567";
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {t('not_found.title', { ns: 'translation' })}
          </h1>
          <p className="text-gray-600 mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/search"
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16" lang={i18n.language} dir={i18n.language === 'fa' ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link
              to="/"
              className="text-gray-500 hover:text-primary-600 transition-colors duration-200"
            >
              {t('nav.home')}
            </Link>
            <span className="text-gray-300">/</span>
            <Link
              to="/search"
              className="text-gray-500 hover:text-primary-600 transition-colors duration-200"
            >
              {t('nav.products')}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-800 font-medium">{product.name[lang]}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          to="/search"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('product.back')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div ref={heroRef} className="space-y-6">
            <ProductCarousel
              images={product.images}
              productName={product.name[lang]}
            />
          </div>

          {/* Product Information */}
          <div ref={detailsRef} className="space-y-8">
            {/* Header */}
            <div className="detail-item">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {product.name[lang]}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <span className="text-lg font-mono text-primary-600 bg-primary-50 px-3 py-1 rounded-lg">
                      {product.id}
                    </span>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {product.category[lang]}
                    </span>
                    {product.featured && (
                      <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleLike}
                    className={`p-2 transition-colors duration-200 ${
                      isLiked
                        ? "text-red-500"
                        : "text-gray-600 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                    />
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="detail-item">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {t('product.description')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description[lang]}
              </p>
            </div>

            {/* Specifications */}
            {product.specifications && (
              <div className="detail-item">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {t('product.specifications')}
                </h2>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <ul className="space-y-3">
                    {product.specifications.map((spec, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                        <span className="text-gray-700">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Materials */}
            {product.materials && (
              <div className="detail-item">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  {t('product.materials')}
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.materials.map((material, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedMaterial(material)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                        selectedMaterial === material
                          ? "bg-primary-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            <div className="detail-item">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                  <Package className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {t('product.feature_custom_sizing')}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t('product.feature_custom_sizing_desc')}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                  <Truck className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {t('product.feature_fast_delivery')}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t('product.feature_fast_delivery_desc')}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                  <Shield className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {t('product.feature_quality_guarantee')}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t('product.feature_quality_guarantee_desc')}
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                  <Award className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-800 mb-1">
                    {t('product.feature_premium_quality')}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t('product.feature_premium_quality_desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="detail-item">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex flex-row gap-4 items-center w-full">
                  {productInCart === 0 ? (
                    <button
                      onClick={handleAddToCart}
                      className="flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-all duration-300 font-medium flex-1 transform hover:scale-105"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      {t('product.add_to_cart')}
                    </button>
                  ) : (
                    <div className="flex items-center space-x-4 flex-1">
                      <button
                        onClick={() => handleUpdateQuantity(productInCart - 1)}
                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors duration-200"
                        aria-label="minus"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-lg font-semibold min-w-[2rem] text-center">
                        {productInCart}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(productInCart + 1)}
                        disabled={productInCart >= 5}
                        className="w-10 h-10 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors duration-200"
                        aria-label="plus"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <span className="text-sm text-gray-600">{t('product.in_cart')}</span>
                    </div>
                  )}
                  <button
                    onClick={handleLike}
                    className={`flex items-center justify-center border-2 rounded-lg transition-all duration-300 font-medium transform hover:scale-105 ${
                      isLiked
                        ? "border-red-500 text-red-500 bg-red-50"
                        : "border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-500"
                    } w-12 h-12 sm:w-auto sm:h-auto sm:px-6 sm:py-3`}
                  >
                    <Heart
                      className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`}
                    />
                    <span className="hidden sm:inline ml-2">{isLiked ? t('product.liked') : t('product.like')}</span>
                  </button>
                </div>
                {productInCart >= 5 && (
                  <p className="text-sm text-center text-gray-600 mt-4">
                    {t('product.max_quantity_contact')}
                  </p>
                )}
              </div>
            </div>

            {/* Contact for Orders */}
            <div className="detail-item">
              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  {t('product.order')}
                </h2>
                <p className="text-gray-600 mb-6 font-bold text-lg">
                  {t('product.order_desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleEmailOrder}
                    className="flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-bold"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    {t('product.email')}
                  </button>
                  <button
                    onClick={handlePhoneOrder}
                    className="flex items-center font-bold justify-center bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 px-6 py-3 rounded-lg transition-colors duration-200"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    {t('product.call')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-up">
          {toastMessage}
        </div>
      )}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

export default ProductDetail;

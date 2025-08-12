import React from "react";
import { useGSAP } from "../hooks/useGSAP";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { products } from "../data/products";

const Cart: React.FC = () => {
  const ref = useGSAP<HTMLDivElement>();
  const {
    cartItems,
    updateCartQuantity,
    removeFromCart,
    getCartItemCount,
  } = useCart();

  const getProductSpecs = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    return product?.specifications || [];
  };

  const totalItems = getCartItemCount();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div ref={ref} className="container mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Shopping Cart
          </h1>
          <p className="text-gray-600">
            {totalItems > 0
              ? `${totalItems} item${totalItems !== 1 ? "s" : ""} in your cart`
              : "Your cart is empty"}
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/search"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 inline-flex items-center"
            >
              Browse Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.material}`}
                  className="bg-white rounded-xl p-6 shadow-lg"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Product Image */}
                    <div className="w-full md:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            Product ID: {item.id}
                          </p>
                          {item.material && (
                            <p className="text-sm text-primary-600 font-medium">
                              Material: {item.material}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.material)}
                          className="text-red-500 hover:text-red-700 transition-colors duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Specifications */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          Specifications:
                        </p>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {getProductSpecs(item.id)
                            .slice(0, 3)
                            .map((spec, index) => (
                              <li key={index}>• {spec}</li>
                            ))}
                        </ul>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-700">
                            Quantity:
                          </span>
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.id,
                                  item.quantity - 1,
                                  item.material
                                )
                              }
                              className="p-2 hover:bg-gray-100 transition-colors duration-200"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(
                                  item.id,
                                  item.quantity + 1,
                                  item.material
                                )
                              }
                              className="p-2 hover:bg-gray-100 transition-colors duration-200"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <Link
                          to={`/product/${item.id}`}
                          className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Items ({totalItems})</span>
                    <span>Contact for pricing</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-semibold text-gray-800">
                      <span>Total</span>
                      <span>Quote Required</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      const subject = "Cart Order Inquiry";
                      const itemsList = cartItems
                        .map(
                          (item) =>
                            `- ${item.name} (${item.id}) x${item.quantity}${
                              item.material ? ` - ${item.material}` : ""
                            }`
                        )
                        .join("\n");
                      const body = `Hi,\n\nI would like to order the following items from my cart:\n\n${itemsList}\n\nPlease provide pricing and availability information.\n\nThank you!`;
                      window.location.href = `mailto:orders@3dprintstore.com?subject=${encodeURIComponent(
                        subject
                      )}&body=${encodeURIComponent(body)}`;
                    }}
                    className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Email Cart for Quote
                  </button>
                  <Link
                    to="/search"
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 text-center block"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-primary-50 border border-primary-200 rounded-xl p-6">
                <h3 className="font-semibold text-gray-800 mb-3">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Our team is here to help you with custom specifications,
                  material selection, and pricing.
                </p>
                <Link
                  to="/contact"
                  className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
                >
                  Contact Support →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

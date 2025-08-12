import { useAppStore } from '../store/store';

export const useCart = () => {
  const cartItems = useAppStore((state) => state.cartItems);
  const addToCart = useAppStore((state) => state.addToCart);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const updateCartQuantity = useAppStore((state) => state.updateCartQuantity);
  const getCartItemCount = useAppStore((state) => state.getCartItemCount);
  const clearCart = useAppStore((state) => state.clearCart);

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCartItemCount,
    clearCart,
  };
};

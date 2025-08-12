import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  image: string;
  category: string;
  material?: string;
  quantity: number;
  addedAt: string;
}

interface AppState {
  // Likes
  likedProducts: string[];
  toggleLike: (productId: string) => void;
  isLiked: (productId: string) => boolean;
  clearLikes: () => void;

  // Cart
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity' | 'addedAt'>) => void;
  removeFromCart: (productId: string, material?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, material?: string) => void;
  getCartItemCount: () => number;
  clearCart: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Likes State and Actions
      likedProducts: [],
      toggleLike: (productId) =>
        set((state) => {
          const isLiked = state.likedProducts.includes(productId);
          if (isLiked) {
            return {
              likedProducts: state.likedProducts.filter((id) => id !== productId),
            };
          } else {
            return {
              likedProducts: [...state.likedProducts, productId],
            };
          }
        }),
      isLiked: (productId) => get().likedProducts.includes(productId),
      clearLikes: () => set({ likedProducts: [] }),

      // Cart State and Actions
      cartItems: [],
      addToCart: (product) =>
        set((state) => {
          const existingItem = state.cartItems.find(
            (item) => item.id === product.id && item.material === product.material
          );
          if (existingItem) {
            return {
              cartItems: state.cartItems.map((item) =>
                item.id === product.id && item.material === product.material
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              cartItems: [
                ...state.cartItems,
                { ...product, quantity: 1, addedAt: new Date().toISOString() },
              ],
            };
          }
        }),
      removeFromCart: (productId, material) =>
        set((state) => ({
          cartItems: state.cartItems.filter(
            (item) => !(item.id === productId && item.material === material)
          ),
        })),
      updateCartQuantity: (productId, quantity, material) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              cartItems: state.cartItems.filter(
                (item) => !(item.id === productId && item.material === material)
              ),
            };
          }
          return {
            cartItems: state.cartItems.map((item) =>
              item.id === productId && item.material === material
                ? { ...item, quantity }
                : item
            ),
          };
        }),
      getCartItemCount: () =>
        get().cartItems.reduce((total, item) => total + item.quantity, 0),
      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: 'app-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

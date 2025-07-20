export interface CartItem {
  id: string;
  name: string;
  image: string;
  category: string;
  material?: string;
  quantity: number;
  addedAt: string;
}

const CART_STORAGE_KEY = "shopping_cart";

export const getCartItems = (): CartItem[] => {
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const addToCart = (
  productId: string,
  productName: string,
  productImage: string,
  productCategory: string,
  material?: string
): void => {
  const items = getCartItems();
  const existingItem = items.find(
    (item) => item.id === productId && item.material === material
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    items.push({
      id: productId,
      name: productName,
      image: productImage,
      category: productCategory,
      material,
      quantity: 1,
      addedAt: new Date().toISOString(),
    });
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const removeFromCart = (productId: string, material?: string): void => {
  const items = getCartItems();
  const filtered = items.filter(
    (item) => !(item.id === productId && item.material === material)
  );
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(filtered));
};

export const updateCartQuantity = (
  productId: string,
  quantity: number,
  material?: string
): void => {
  const items = getCartItems();
  const item = items.find(
    (item) => item.id === productId && item.material === material
  );

  if (item) {
    if (quantity <= 0) {
      removeFromCart(productId, material);
    } else {
      item.quantity = quantity;
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }
};

export const getCartItemCount = (): number => {
  return getCartItems().reduce((total, item) => total + item.quantity, 0);
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_STORAGE_KEY);
};

const LIKES_STORAGE_KEY = "liked_products";

export const getLikedProducts = (): string[] => {
  const stored = localStorage.getItem(LIKES_STORAGE_KEY);
  if (!stored) return [];

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const toggleLike = (productId: string): boolean => {
  const liked = getLikedProducts();
  const isLiked = liked.includes(productId);

  if (isLiked) {
    const filtered = liked.filter((id) => id !== productId);
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(filtered));
    return false;
  } else {
    liked.push(productId);
    localStorage.setItem(LIKES_STORAGE_KEY, JSON.stringify(liked));
    return true;
  }
};

export const isProductLiked = (productId: string): boolean => {
  return getLikedProducts().includes(productId);
};

export const clearLikes = (): void => {
  localStorage.removeItem(LIKES_STORAGE_KEY);
};

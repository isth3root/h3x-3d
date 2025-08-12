import { useAppStore } from '../store/store';

export const useLikes = (productId?: string) => {
  const isLiked = useAppStore((state) => (productId ? state.isLiked(productId) : false));
  const toggleLike = useAppStore((state) => state.toggleLike);
  const likedProducts = useAppStore((state) => state.likedProducts);
  const clearLikes = useAppStore((state) => state.clearLikes);

  return { isLiked, toggleLike, likedProducts, clearLikes };
};

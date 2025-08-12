import { renderHook, act } from '@testing-library/react';
import { useLikes } from './useLikes';
import { useAppStore } from '../store/store';

const originalState = useAppStore.getState();

describe('useLikes hook', () => {
  beforeEach(() => {
    act(() => {
      useAppStore.setState(originalState);
    });
  });

  it('should return false for isLiked initially for a given product ID', () => {
    const { result } = renderHook(() => useLikes('product-1'));
    expect(result.current.isLiked).toBe(false);
  });

  it('should toggle like status', () => {
    const { result } = renderHook(() => useLikes('product-1'));

    act(() => {
      result.current.toggleLike('product-1');
    });

    expect(result.current.isLiked).toBe(true);

    act(() => {
      result.current.toggleLike('product-1');
    });

    expect(result.current.isLiked).toBe(false);
  });

  it('should correctly report liked status from the store', () => {
    act(() => {
      useAppStore.setState({ likedProducts: ['product-1'] });
    });

    const { result } = renderHook(() => useLikes('product-1'));
    expect(result.current.isLiked).toBe(true);
  });

  it('should handle multiple product IDs', () => {
    const { result: result1 } = renderHook(() => useLikes('product-1'));
    const { result: result2 } = renderHook(() => useLikes('product-2'));

    act(() => {
      result1.current.toggleLike('product-1');
    });

    expect(result1.current.isLiked).toBe(true);
    expect(result2.current.isLiked).toBe(false);

    act(() => {
      result2.current.toggleLike('product-2');
    });

    expect(result1.current.isLiked).toBe(true);
    expect(result2.current.isLiked).toBe(true);
  });
});

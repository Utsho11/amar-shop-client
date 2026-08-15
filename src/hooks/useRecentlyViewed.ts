import { useState, useEffect, useCallback } from "react";
import { TProduct } from "../types";

const STORAGE_KEY = "amar_shop_recently_viewed";
const MAX_ITEMS = 10;

export const useRecentlyViewed = () => {
  const [recentlyViewed, setRecentlyViewed] = useState<TProduct[]>([]);

  const loadFromStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentlyViewed(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load recently viewed products:", e);
    }
  }, []);

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  const addProduct = useCallback((product: TProduct) => {
    if (!product || !product.id) return;

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let items: TProduct[] = stored ? JSON.parse(stored) : [];

      // Filter out duplicate if already present
      items = items.filter((item) => item.id !== product.id);

      // Prepend current product to front
      items.unshift(product);

      // Limit to MAX_ITEMS
      if (items.length > MAX_ITEMS) {
        items = items.slice(0, MAX_ITEMS);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      setRecentlyViewed(items);
    } catch (e) {
      console.error("Failed to save product to recently viewed:", e);
    }
  }, []);

  const clearAll = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setRecentlyViewed([]);
    } catch (e) {
      console.error("Failed to clear recently viewed:", e);
    }
  }, []);

  return {
    recentlyViewed,
    addProduct,
    clearAll,
  };
};

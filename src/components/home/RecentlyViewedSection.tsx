import React from "react";
import { useRecentlyViewed } from "../../hooks/useRecentlyViewed";
import ProductCard from "../product/ProductCard";
import { useTheme } from "../../context/ThemeContext";
import { Clock, Trash2 } from "lucide-react";

interface RecentlyViewedSectionProps {
  currentProductId?: string;
  showEmptyState?: boolean;
}

const RecentlyViewedSection: React.FC<RecentlyViewedSectionProps> = ({
  currentProductId,
  showEmptyState = false,
}) => {
  const { recentlyViewed, clearAll } = useRecentlyViewed();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // Filter out current product if on product detail page
  const filteredProducts = currentProductId
    ? recentlyViewed.filter((p) => p.id !== currentProductId)
    : recentlyViewed;

  if (filteredProducts.length === 0) {
    if (!showEmptyState) return null;

    return (
      <div className="py-12 text-center bg-base-100 rounded-3xl border border-base-200 p-8 my-8">
        <Clock className="mx-auto text-gray-400 mb-3" size={40} />
        <h3 className="text-lg font-bold">No recently viewed items</h3>
        <p className="text-sm text-gray-500 mt-1">
          Explore products around the shop and they will appear here for easy reference.
        </p>
      </div>
    );
  }

  return (
    <section className="my-16">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] flex items-center gap-1.5 ${
              isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
            }`}
          >
            <Clock size={14} /> History
          </p>
          <h2
            className={`text-2xl sm:text-3xl font-bold mt-1 ${
              isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
            }`}
          >
            Recently Viewed Products
          </h2>
        </div>

        <button
          onClick={clearAll}
          className="btn btn-ghost btn-sm text-xs text-gray-500 hover:text-error gap-1.5"
          title="Clear browsing history"
        >
          <Trash2 size={14} /> Clear History
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.slice(0, 8).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewedSection;

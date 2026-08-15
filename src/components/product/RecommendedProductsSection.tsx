import React from "react";
import { useGetRecommendedProductsQuery } from "../../redux/services/productApi";
import ProductCard from "./ProductCard";
import { useTheme } from "../../context/ThemeContext";
import { Sparkles } from "lucide-react";
import { TProduct } from "../../types";

interface RecommendedProductsSectionProps {
  productId: string;
}

const RecommendedProductsSection: React.FC<RecommendedProductsSectionProps> = ({ productId }) => {
  const { data, isLoading } = useGetRecommendedProductsQuery(productId, { skip: !productId });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const recommendations: TProduct[] = data?.data || [];

  if (isLoading || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="my-14 pt-8 border-t border-base-200">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-primary/10 text-primary">
            <Sparkles size={18} />
          </span>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] ${
              isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
            }`}
          >
            Curated Recommendations
          </p>
        </div>
        <h2
          className={`text-2xl sm:text-3xl font-bold mt-1 ${
            isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
          }`}
        >
          You May Also Like
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Handpicked based on category, price range, and customer interest
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedProductsSection;

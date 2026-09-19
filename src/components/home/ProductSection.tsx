import React from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../redux/services/productApi";
import { TProduct } from "../../types";
import ProductCard from "../product/ProductCard";
import { ProductGridSkeleton } from "../shared/ProductCardSkeleton";
import { Sparkles, ArrowRight } from "lucide-react";

export type PaginatedProducts = {
  products: TProduct[];
  hasMore: boolean;
};

type ProductSectionProps = {
  cateParam?: string;
};

const ProductSection: React.FC<ProductSectionProps> = () => {
  const { data, isLoading } = useGetProductsQuery({
    page: 1,
    limit: 8,
  });

  const products: TProduct[] = data?.data?.products?.slice(0, 8) || [];

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3">
          <Sparkles size={14} />
          <span>Curated Selection</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-base-content">
          Featured Marketplace Products
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-3">
          Handpicked top-rated products from verified independent boutique merchants.
        </p>
      </div>

      {isLoading ? (
        <ProductGridSkeleton count={8} />
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          <p>No featured products available at this moment.</p>
        </div>
      )}

      {/* Prominent Hick's Law CTA */}
      <div className="mt-12 text-center">
        <Link
          to="/products"
          className="btn btn-primary rounded-full px-8 btn-md text-sm font-semibold shadow-lg shadow-primary/25 inline-flex items-center gap-2 hover:scale-[1.03] transition-transform"
        >
          <span>Explore All Products</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
};

export default ProductSection;

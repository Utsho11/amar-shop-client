import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetCategoriesQuery } from "../redux/services/categoryApi";
import { useGetProductsQuery } from "../redux/services/productApi";
import { TProduct } from "../types";
import Loading from "../components/shared/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../components/product/ProductCard";
import { ProductGridSkeleton } from "../components/shared/ProductCardSkeleton";
import EmptyState from "../components/shared/EmptyState";
import { useTheme } from "../context/ThemeContext";
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Tag,
  DollarSign,
  ArrowUpDown,
  CheckCircle2,
} from "lucide-react";

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // URL query params as single source of truth
  const queryCategory = searchParams.get("category") || "";
  const queryKeyword = searchParams.get("keyword") || "";
  const querySort = searchParams.get("sortBy") || "newest";
  const queryMinPrice = searchParams.get("minPrice") || "";
  const queryMaxPrice = searchParams.get("maxPrice") || "";
  const queryInStock = searchParams.get("inStock") === "true";

  // Local state
  const [searchInput, setSearchInput] = useState(queryKeyword);
  const [minPriceInput, setMinPriceInput] = useState(queryMinPrice);
  const [maxPriceInput, setMaxPriceInput] = useState(queryMaxPrice);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Pagination & infinite scroll state
  const [productList, setProductList] = useState<TProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const { data: categoriesData } = useGetCategoriesQuery(null);
  const categories = categoriesData?.data || [];

  const { data, isFetching, isLoading } = useGetProductsQuery({
    page,
    limit: 12,
    category: queryCategory,
    keyword: queryKeyword,
    sortBy: querySort,
    minPrice: queryMinPrice,
    maxPrice: queryMaxPrice,
    inStock: queryInStock ? "true" : undefined,
  });

  // Keep local search input synced with URL
  useEffect(() => {
    setSearchInput(queryKeyword);
  }, [queryKeyword]);

  // Reset pagination and list when filters change
  useEffect(() => {
    setPage(1);
    setProductList([]);
  }, [queryCategory, queryKeyword, querySort, queryMinPrice, queryMaxPrice, queryInStock]);

  // Accumulate products for infinite scrolling
  useEffect(() => {
    const products = data?.data?.products;
    if (products) {
      if (page === 1) {
        setProductList(products);
      } else {
        setProductList((prev) => [...prev, ...products]);
      }
      setHasMore(Boolean(data?.data?.hasMore));
    }
  }, [data, page]);

  const updateFilters = (newParams: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(newParams).forEach(([key, val]) => {
      if (val === null || val === "" || val === undefined) {
        next.delete(key);
      } else {
        next.set(key, val);
      }
    });
    setSearchParams(next);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ keyword: searchInput.trim() || null });
  };

  const handlePriceFilterApply = () => {
    updateFilters({
      minPrice: minPriceInput ? minPriceInput : null,
      maxPrice: maxPriceInput ? maxPriceInput : null,
    });
  };

  const clearAllFilters = () => {
    setSearchInput("");
    setMinPriceInput("");
    setMaxPriceInput("");
    setSearchParams(new URLSearchParams());
  };

  const loadMoreProducts = () => {
    if (!hasMore || isFetching) return;
    setPage((prev) => prev + 1);
  };

  const hasActiveFilters = Boolean(
    queryCategory || queryKeyword || queryMinPrice || queryMaxPrice || queryInStock || querySort !== "newest"
  );

  return (
    <section
      className={`min-h-screen px-4 py-10 md:px-8 ${
        isDark ? "bg-[#1A1716]" : "bg-[#F9F5F0]"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] ${
              isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
            }`}
          >
            Curated Catalog
          </p>

          <h1
            className={`mt-2 text-3xl font-bold md:text-4xl ${
              isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
            }`}
          >
            Explore All Products
          </h1>
          <p className="text-xs text-gray-500 mt-2">
            Discover verified products from top shops with instant filtering and side-by-side comparison
          </p>
        </div>

        {/* Top Control Bar: Search + Sort + Filter Toggle */}
        <div
          className={`mb-8 rounded-3xl border p-4 md:p-6 shadow-sm ${
            isDark ? "border-white/10 bg-[#211E1D]" : "border-[#E8DED2] bg-white"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-md">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products by title, tag, or description..."
                className="input input-bordered w-full rounded-full pl-11 pr-20 text-sm"
              />
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    updateFilters({ keyword: null });
                  }}
                  className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={15} />
                </button>
              )}
              <button
                type="submit"
                className="btn btn-primary btn-sm rounded-full absolute right-1.5 top-1/2 -translate-y-1/2 px-4 text-xs font-semibold"
              >
                Search
              </button>
            </form>

            {/* Quick Sort & Mobile Filter Toggle */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <div className="flex items-center gap-2">
                <ArrowUpDown size={15} className="text-gray-400 hidden sm:block" />
                <select
                  value={querySort}
                  onChange={(e) => updateFilters({ sortBy: e.target.value })}
                  className="select select-bordered select-sm rounded-full text-xs"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                </select>
              </div>

              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="btn btn-outline btn-sm rounded-full md:hidden gap-1.5 text-xs"
              >
                <SlidersHorizontal size={14} />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                )}
              </button>
            </div>
          </div>

          {/* Active Filter Pills */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-base-200 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-gray-400 mr-1">Active Filters:</span>

              {queryCategory && (
                <span className="badge badge-primary badge-outline gap-1.5 py-3 text-xs">
                  Category: {queryCategory}
                  <button onClick={() => updateFilters({ category: null })}>
                    <X size={12} />
                  </button>
                </span>
              )}

              {queryKeyword && (
                <span className="badge badge-primary badge-outline gap-1.5 py-3 text-xs">
                  Keyword: "{queryKeyword}"
                  <button onClick={() => updateFilters({ keyword: null })}>
                    <X size={12} />
                  </button>
                </span>
              )}

              {(queryMinPrice || queryMaxPrice) && (
                <span className="badge badge-primary badge-outline gap-1.5 py-3 text-xs">
                  Price: ${queryMinPrice || 0} - ${queryMaxPrice || "∞"}
                  <button onClick={() => {
                    setMinPriceInput("");
                    setMaxPriceInput("");
                    updateFilters({ minPrice: null, maxPrice: null });
                  }}>
                    <X size={12} />
                  </button>
                </span>
              )}

              {queryInStock && (
                <span className="badge badge-primary badge-outline gap-1.5 py-3 text-xs">
                  In Stock Only
                  <button onClick={() => updateFilters({ inStock: null })}>
                    <X size={12} />
                  </button>
                </span>
              )}

              <button
                onClick={clearAllFilters}
                className="btn btn-ghost btn-xs text-error gap-1 text-xs hover:bg-error/10"
              >
                <RotateCcw size={12} /> Clear All
              </button>
            </div>
          )}
        </div>

        {/* Main Grid: Sidebar + Product Grid */}
        <div className="grid gap-8 md:grid-cols-[260px_1fr]">
          {/* Desktop Filter Sidebar */}
          <aside
            className={`sticky top-20 hidden h-fit rounded-3xl border p-6 shadow-sm md:block ${
              isDark ? "border-white/10 bg-[#211E1D]" : "border-[#E8DED2] bg-white"
            }`}
          >
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-base-200">
              <div className="flex items-center gap-2 font-bold text-sm">
                <SlidersHorizontal size={16} className="text-primary" />
                <span>Filter Products</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-gray-400 hover:text-error transition flex items-center gap-1"
                >
                  <RotateCcw size={11} /> Reset
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                  <Tag size={13} /> Categories
                </h3>
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
                  <button
                    onClick={() => updateFilters({ category: null })}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition ${
                      !queryCategory
                        ? "bg-primary text-white font-semibold"
                        : "hover:bg-base-200 text-gray-600 dark:text-zinc-300"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => updateFilters({ category: cat.name })}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                        queryCategory.toLowerCase() === cat.name.toLowerCase()
                          ? "bg-primary text-white font-semibold"
                          : "hover:bg-base-200 text-gray-600 dark:text-zinc-300"
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="pt-4 border-t border-base-200">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                  <DollarSign size={13} /> Price Range ($)
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    placeholder="Min"
                    value={minPriceInput}
                    onChange={(e) => setMinPriceInput(e.target.value)}
                    className="input input-bordered input-sm w-full rounded-xl text-xs"
                  />
                  <span className="text-gray-400 text-xs">-</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Max"
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value)}
                    className="input input-bordered input-sm w-full rounded-xl text-xs"
                  />
                </div>
                <button
                  onClick={handlePriceFilterApply}
                  className="btn btn-outline btn-primary btn-xs w-full rounded-xl mt-3"
                >
                  Apply Price
                </button>
              </div>

              {/* In Stock Toggle */}
              <div className="pt-4 border-t border-base-200">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-medium flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-success" />
                    In-Stock Only
                  </span>
                  <input
                    type="checkbox"
                    checked={queryInStock}
                    onChange={(e) => updateFilters({ inStock: e.target.checked ? "true" : null })}
                    className="checkbox checkbox-primary checkbox-sm rounded-lg"
                  />
                </label>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Modal/Collapsible */}
          {isMobileFilterOpen && (
            <div className="md:hidden rounded-3xl border p-5 bg-base-100 shadow-lg mb-6 animate-in fade-in">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-base-200">
                <h3 className="font-bold text-sm">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="btn btn-ghost btn-xs btn-circle"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Category</label>
                  <select
                    value={queryCategory}
                    onChange={(e) => updateFilters({ category: e.target.value || null })}
                    className="select select-bordered select-sm w-full rounded-xl text-xs"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 block mb-1">Price Range ($)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPriceInput}
                      onChange={(e) => setMinPriceInput(e.target.value)}
                      className="input input-bordered input-sm w-full rounded-xl text-xs"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPriceInput}
                      onChange={(e) => setMaxPriceInput(e.target.value)}
                      className="input input-bordered input-sm w-full rounded-xl text-xs"
                    />
                  </div>
                  <button
                    onClick={() => {
                      handlePriceFilterApply();
                      setIsMobileFilterOpen(false);
                    }}
                    className="btn btn-primary btn-xs w-full rounded-xl mt-2"
                  >
                    Apply Price
                  </button>
                </div>

                <div className="pt-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-medium">In-Stock Only</span>
                    <input
                      type="checkbox"
                      checked={queryInStock}
                      onChange={(e) =>
                        updateFilters({ inStock: e.target.checked ? "true" : null })
                      }
                      className="checkbox checkbox-primary checkbox-sm"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid & Infinite Scroll */}
          <div>
            {(isLoading || isFetching) && productList.length === 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 py-4 text-xs font-semibold text-primary animate-pulse">
                  <span className="loading loading-spinner loading-xs"></span>
                  <span>Filtering products...</span>
                </div>
                <ProductGridSkeleton count={6} />
              </div>
            ) : productList.length === 0 ? (
              <EmptyState
                icon={Search}
                title="No Matching Products Found"
                description="We couldn't find any products matching your active filters. Try adjusting your search term, category, or price range."
                actionText="Clear All Filters"
                onActionClick={clearAllFilters}
              />
            ) : (
              <InfiniteScroll
                dataLength={productList.length}
                next={loadMoreProducts}
                hasMore={hasMore}
                loader={
                  <div className="py-6 flex justify-center">
                    <Loading />
                  </div>
                }
                endMessage={
                  <p
                    className={`mt-10 mb-4 text-center text-xs tracking-wider uppercase ${
                      isDark ? "text-[#B8AAA3]" : "text-[#6B5E57]"
                    }`}
                  >
                    ✓ You have viewed all available products
                  </p>
                }
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {productList.map((product) => (
                    <ProductCard product={product} key={product.id} />
                  ))}
                </div>
              </InfiniteScroll>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;

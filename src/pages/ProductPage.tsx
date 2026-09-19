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
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  Tag,
  DollarSign,
  ArrowUpDown,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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
    <section className="min-h-screen bg-base-200/40 text-base-content px-4 py-8 md:px-8 pb-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles size={14} />
            <span>Curated Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-base-content">
            Explore All Products
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-2">
            Discover verified products from top vendor shops with instant search, category filtering, and side-by-side comparison.
          </p>
        </div>

        {/* Top Control Bar: Search + Sort + Filter Toggle */}
        <div className="mb-8 rounded-3xl border border-base-200 bg-base-100 p-4 md:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full md:max-w-md">
              <input
                type="text"
                aria-label="Search products"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search products by title, tag, or description..."
                className="input input-bordered w-full rounded-full pl-11 pr-24 text-sm bg-base-100 border-base-300 focus:border-primary"
              />
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    updateFilters({ keyword: null });
                  }}
                  aria-label="Clear search query"
                  className="absolute right-16 top-1/2 -translate-y-1/2 text-gray-400 hover:text-base-content transition p-1"
                >
                  <X size={15} />
                </button>
              )}
              <button
                type="submit"
                aria-label="Execute search"
                className="btn btn-primary btn-sm rounded-full absolute right-1.5 top-1/2 -translate-y-1/2 px-4 text-xs font-semibold shadow-xs"
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
                  aria-label="Sort catalog by"
                  className="select select-bordered select-sm rounded-full text-xs bg-base-100"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                aria-label="Toggle mobile filters"
                aria-expanded={isMobileFilterOpen}
                className="btn btn-outline btn-sm rounded-full md:hidden gap-1.5 text-xs border-base-300"
              >
                <SlidersHorizontal size={14} />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                )}
              </button>
            </div>
          </div>

          {/* Active Filter Pills (Fitts's Law: Accessible touch targets) */}
          {hasActiveFilters && (
            <div className="mt-4 pt-4 border-t border-base-200 flex flex-wrap items-center gap-2.5">
              <span className="text-xs font-semibold text-gray-400 mr-1">Active Filters:</span>

              {queryCategory && (
                <span className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 shadow-xs">
                  <span>Category: {queryCategory}</span>
                  <button
                    type="button"
                    onClick={() => updateFilters({ category: null })}
                    aria-label={`Remove ${queryCategory} category filter`}
                    className="w-5 h-5 rounded-full hover:bg-primary/25 flex items-center justify-center transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {queryKeyword && (
                <span className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 shadow-xs">
                  <span>Keyword: "{queryKeyword}"</span>
                  <button
                    type="button"
                    onClick={() => updateFilters({ keyword: null })}
                    aria-label={`Remove keyword "${queryKeyword}" filter`}
                    className="w-5 h-5 rounded-full hover:bg-primary/25 flex items-center justify-center transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {(queryMinPrice || queryMaxPrice) && (
                <span className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 shadow-xs">
                  <span>Price: ${queryMinPrice || 0} - ${queryMaxPrice || "∞"}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setMinPriceInput("");
                      setMaxPriceInput("");
                      updateFilters({ minPrice: null, maxPrice: null });
                    }}
                    aria-label="Remove price range filter"
                    className="w-5 h-5 rounded-full hover:bg-primary/25 flex items-center justify-center transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              {queryInStock && (
                <span className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 shadow-xs">
                  <span>In Stock Only</span>
                  <button
                    type="button"
                    onClick={() => updateFilters({ inStock: null })}
                    aria-label="Remove in-stock filter"
                    className="w-5 h-5 rounded-full hover:bg-primary/25 flex items-center justify-center transition-colors"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={clearAllFilters}
                className="btn btn-ghost btn-xs text-error gap-1 text-xs hover:bg-error/10 rounded-full px-3"
              >
                <RotateCcw size={12} /> Clear All
              </button>
            </div>
          )}
        </div>

        {/* Main Grid: Sidebar + Product Grid */}
        <div className="grid gap-8 md:grid-cols-[260px_1fr] items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="sticky top-20 hidden h-fit rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm md:block">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-base-200">
              <div className="flex items-center gap-2 font-bold text-sm">
                <SlidersHorizontal size={16} className="text-primary" />
                <span>Filter Catalog</span>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
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
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 scrollbar-thin">
                  <button
                    type="button"
                    onClick={() => updateFilters({ category: null })}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition ${
                      !queryCategory
                        ? "bg-primary text-white font-bold shadow-xs"
                        : "hover:bg-base-200 text-base-content/80"
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => updateFilters({ category: cat.name })}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                        queryCategory.toLowerCase() === cat.name.toLowerCase()
                          ? "bg-primary text-white font-bold shadow-xs"
                          : "hover:bg-base-200 text-base-content/80"
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter (Hick's Law: Enter key support & comfortable button target) */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePriceFilterApply();
                }}
                className="pt-4 border-t border-base-200"
              >
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                  <DollarSign size={13} /> Price Range ($)
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    aria-label="Minimum price"
                    placeholder="Min"
                    value={minPriceInput}
                    onChange={(e) => setMinPriceInput(e.target.value)}
                    className="input input-bordered input-sm w-full rounded-xl text-xs bg-base-100"
                  />
                  <span className="text-gray-400 text-xs">-</span>
                  <input
                    type="number"
                    min="0"
                    aria-label="Maximum price"
                    placeholder="Max"
                    value={maxPriceInput}
                    onChange={(e) => setMaxPriceInput(e.target.value)}
                    className="input input-bordered input-sm w-full rounded-xl text-xs bg-base-100"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-outline btn-primary btn-sm w-full rounded-xl mt-3 font-semibold text-xs shadow-xs"
                >
                  Apply Price
                </button>
              </form>

              {/* In Stock Toggle */}
              <div className="pt-4 border-t border-base-200">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-xs font-medium flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-success" />
                    In-Stock Only
                  </span>
                  <input
                    type="checkbox"
                    aria-label="Show in-stock items only"
                    checked={queryInStock}
                    onChange={(e) => updateFilters({ inStock: e.target.checked ? "true" : null })}
                    className="checkbox checkbox-primary checkbox-sm rounded-lg"
                  />
                </label>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Collapsible */}
          {isMobileFilterOpen && (
            <div className="md:hidden rounded-3xl border border-base-200 p-5 bg-base-100 shadow-lg mb-6 animate-in fade-in">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-base-200">
                <h3 className="font-bold text-sm">Filter Products</h3>
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(false)}
                  aria-label="Close mobile filters"
                  className="btn btn-ghost btn-xs btn-circle"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="mobile-category-select" className="text-xs font-bold text-gray-400 block mb-1">Category</label>
                  <select
                    id="mobile-category-select"
                    value={queryCategory}
                    onChange={(e) => updateFilters({ category: e.target.value || null })}
                    className="select select-bordered select-sm w-full rounded-xl text-xs bg-base-100"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlePriceFilterApply();
                    setIsMobileFilterOpen(false);
                  }}
                >
                  <label className="text-xs font-bold text-gray-400 block mb-1">Price Range ($)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      aria-label="Minimum price"
                      placeholder="Min"
                      value={minPriceInput}
                      onChange={(e) => setMinPriceInput(e.target.value)}
                      className="input input-bordered input-sm w-full rounded-xl text-xs bg-base-100"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      aria-label="Maximum price"
                      placeholder="Max"
                      value={maxPriceInput}
                      onChange={(e) => setMaxPriceInput(e.target.value)}
                      className="input input-bordered input-sm w-full rounded-xl text-xs bg-base-100"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-sm w-full rounded-xl mt-3 font-semibold text-xs shadow-xs"
                  >
                    Apply Price
                  </button>
                </form>

                <div className="pt-2 border-t border-base-200">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-medium">In-Stock Only</span>
                    <input
                      type="checkbox"
                      aria-label="Show in-stock items only"
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
            {/* Live Result Count Bar */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4 px-1">
              <span>
                {productList.length > 0 ? (
                  <>
                    Showing <strong className="text-base-content font-bold">{productList.length}</strong> {productList.length === 1 ? "product" : "products"}
                  </>
                ) : (
                  "0 products found"
                )}
              </span>
            </div>

            {(isLoading || isFetching) && productList.length === 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2 py-4 text-xs font-semibold text-primary animate-pulse">
                  <span className="loading loading-spinner loading-xs" />
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
                  <div className="py-8 flex justify-center">
                    <Loading />
                  </div>
                }
                endMessage={
                  <p className="mt-12 mb-4 text-center text-xs tracking-wider uppercase text-gray-400 font-semibold">
                    ✓ You have reached the end of the catalog
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

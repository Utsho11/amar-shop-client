import { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../redux/services/categoryApi";
import { useGetProductsQuery } from "../redux/services/productApi";
import { TProduct } from "../types";
import Loading from "../components/shared/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../components/product/ProductCard";
import ASForm from "../components/form/ASForm";
import { FieldValues } from "react-hook-form";
import { useTheme } from "../context/ThemeContext";
import { Search, SlidersHorizontal } from "lucide-react";
import ASInput from "../components/form/ASInput";

const ProductPage = () => {
  const [productList, setProductList] = useState<TProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceSort, setPriceSort] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const { data: categories } = useGetCategoriesQuery(null);
  const category = categories?.data || [];
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { data, isFetching, isLoading } = useGetProductsQuery({
    page,
    limit: 12,
    category: selectedCategory,
    sortByPrice: priceSort,
    keyword,
  });

  useEffect(() => {
    if (data?.data) {
      setProductList((prev = []) => [...prev, ...(data?.data?.products || [])]);
      setHasMore(data?.data?.hasMore);
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
    setProductList([]);
  }, [selectedCategory, priceSort, keyword]);

  const loadMoreProducts = () => {
    if (!hasMore || isFetching) return;
    setPage((prevPage) => prevPage + 1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceSortChange = (sort: string) => {
    setPriceSort(sort);
  };

  const handlePriceSortChange2 = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceSort(e.target.value);
  };

  const onSubmit = async (data: FieldValues) => {
    const keyword = data.keyword;
    setKeyword(keyword);
  };

  if (isLoading) {
    return <Loading />;
  }

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
            className={`text-xs font-medium uppercase tracking-[0.3em] ${
              isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
            }`}
          >
            Products
          </p>

          <h1
            className={`mt-3 text-3xl font-semibold md:text-4xl ${
              isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
            }`}
          >
            All Products
          </h1>
        </div>

        {/* Search + Mobile Filters */}
        <div
          className={`mb-8 rounded-3xl border p-4 md:p-6 ${
            isDark
              ? "border-white/10 bg-[#211E1D]"
              : "border-[#E8DED2] bg-white"
          }`}
        >
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-3 ">
              <ASForm onSubmit={onSubmit} className="flex justify-center gap-3">
                <ASInput name="keyword" placeholder="Search Your Product" />
                <div className="">
                  <button
                    type="submit"
                    className={`w-full rounded-full px-4 py-2 text-left text-sm transition ${
                      isDark
                        ? "bg-[#2D2927] text-[#B8AAA3] hover:text-white"
                        : "bg-[#A66B55] text-white hover:text-[#3D352F]"
                    }`}
                  >
                    <Search size={16} />
                  </button>
                </div>
              </ASForm>
            </div>

            <select
              aria-label="Category"
              className={`select select-bordered w-full rounded-full md:hidden ${
                isDark ? "bg-[#2D2927] text-[#F9F5F0]" : "bg-[#F9F5F0]"
              }`}
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {category.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <select
              className={`select select-bordered w-full rounded-full md:hidden ${
                isDark ? "bg-[#2D2927] text-[#F9F5F0]" : "bg-[#F9F5F0]"
              }`}
              value={priceSort}
              onChange={handlePriceSortChange2}
            >
              <option value="">Sort by Price</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid gap-8 md:grid-cols-[280px_1fr]">
          {/* Desktop Filter */}
          <aside
            className={`sticky top-6 hidden h-fit rounded-3xl border p-5 md:block ${
              isDark
                ? "border-white/10 bg-[#211E1D]"
                : "border-[#E8DED2] bg-white"
            }`}
          >
            <div className="mb-6 flex items-center gap-2">
              <SlidersHorizontal
                size={18}
                className={isDark ? "text-[#C9A68F]" : "text-[#A66B55]"}
              />
              <h2
                className={`font-semibold ${
                  isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
                }`}
              >
                Filters
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <h3
                  className={`mb-3 text-sm font-medium ${
                    isDark ? "text-[#B8AAA3]" : "text-[#6B5E57]"
                  }`}
                >
                  Categories
                </h3>

                <div className="space-y-2">
                  <button
                    className={`w-full rounded-full px-4 py-2 text-left text-sm transition ${
                      selectedCategory === ""
                        ? "bg-[#A66B55] text-white"
                        : isDark
                          ? "bg-[#2D2927] text-[#B8AAA3] hover:text-white"
                          : "bg-[#F9F5F0] text-[#6B5E57] hover:text-[#3D352F]"
                    }`}
                    onClick={() => setSelectedCategory("")}
                  >
                    All
                  </button>

                  {category.map((cat, index) => (
                    <button
                      key={index}
                      className={`w-full rounded-full px-4 py-2 text-left text-sm transition ${
                        selectedCategory === cat.name
                          ? "bg-[#A66B55] text-white"
                          : isDark
                            ? "bg-[#2D2927] text-[#B8AAA3] hover:text-white"
                            : "bg-[#F9F5F0] text-[#6B5E57] hover:text-[#3D352F]"
                      }`}
                      onClick={() => setSelectedCategory(cat.name)}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3
                  className={`mb-3 text-sm font-medium ${
                    isDark ? "text-[#B8AAA3]" : "text-[#6B5E57]"
                  }`}
                >
                  Sort by Price
                </h3>

                <div className="space-y-2">
                  {[
                    { label: "Low to High", value: "lowToHigh" },
                    { label: "High to Low", value: "highToLow" },
                  ].map((item) => (
                    <button
                      key={item.value}
                      className={`w-full rounded-full px-4 py-2 text-left text-sm transition ${
                        priceSort === item.value
                          ? "bg-[#A66B55] text-white"
                          : isDark
                            ? "bg-[#2D2927] text-[#B8AAA3] hover:text-white"
                            : "bg-[#F9F5F0] text-[#6B5E57] hover:text-[#3D352F]"
                      }`}
                      onClick={() =>
                        handlePriceSortChange(
                          priceSort === item.value ? "" : item.value,
                        )
                      }
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div>
            {isFetching && productList.length === 0 ? (
              <Loading />
            ) : (
              <InfiniteScroll
                dataLength={productList.length}
                next={loadMoreProducts}
                hasMore={hasMore}
                loader={<Loading />}
                endMessage={
                  <p
                    className={`mt-8 text-center text-sm ${
                      isDark ? "text-[#B8AAA3]" : "text-[#6B5E57]"
                    }`}
                  >
                    Nothing is available to display.
                  </p>
                }
              >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
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

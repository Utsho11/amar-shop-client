import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetProductsQuery } from "../../redux/services/productApi";
import { TProduct } from "../../types";
import { useGetCategoriesQuery } from "../../redux/services/categoryApi";
import { useTheme } from "../../context/ThemeContext";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export type PaginatedProducts = {
  products: TProduct[];
  hasMore: boolean;
};

type ProductSectionProps = {
  cateParam?: string;
};

const ProductSection: React.FC<ProductSectionProps> = ({ cateParam }) => {
  const [productList, setProductList] = useState<TProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // For category filter
  const [priceSort, setPriceSort] = useState<string>("");
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { data: categories } = useGetCategoriesQuery(null);
  const category = categories?.data || [];
  const [searchParams] = useSearchParams(); // Get the search parameters

  const categoryParams = searchParams.get("category") || cateParam || null;

  const location = useLocation();

  useEffect(() => {
    if (categoryParams) {
      setSelectedCategory(categoryParams);
    }
  }, [categoryParams]);

  const { data, isFetching } = useGetProductsQuery({
    page,
    limit: 8,
    category: selectedCategory,
    sortByPrice: priceSort,
  });

  useEffect(() => {
    if (data?.data) {
      setProductList((prev = []) => [...prev, ...(data?.data?.products || [])]);
      setHasMore(data?.data?.hasMore);
    }
  }, [data, categoryParams]);

  useEffect(() => {
    setPage(1); // Reset page to 1 when filters change
    setProductList([]); // Clear previous products
  }, [selectedCategory, priceSort]);

  const loadMoreProducts = () => {
    if (!hasMore || isFetching) return;
    setPage((prevPage) => prevPage + 1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriceSort(e.target.value);
  };

  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="py-10">
      {(location.pathname === "/products" || location.pathname === "/") && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
          <h1 className="text-start text-3xl font-semibold mb-8">Products</h1>

          {/* Category Filter */}
          <div className="">
            <select
              aria-label="Category"
              className="select select-bordered select-sm w-full max-w-xs"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Filter by Categories</option>
              {category.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price Sort Filter */}
          <div className="">
            <select
              className="select select-bordered select-sm w-full max-w-xs"
              value={priceSort}
              onChange={handlePriceSortChange}
            >
              <option value="">Sort by Price</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>
      )}

      {isFetching && productList.length === 0 ? (
        <div className="text-center">Loading...</div>
      ) : (
        <InfiniteScroll
          dataLength={productList.length}
          next={loadMoreProducts}
          hasMore={hasMore}
          loader={<h4 className="text-center">Loading more products...</h4>}
          endMessage={
            <p className="text-center mt-4 text-gray-500">
              Nothing is available to display.
            </p>
          }
        >
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productList.map((product, index) => (
              <div
                onClick={() => handleProductClick(product.id)}
                key={index}
                className={`flex flex-col items-start ${
                  theme === "dark"
                    ? "bg-slate-700 hover:bg-slate-500"
                    : "bg-white hover:bg-gray-200"
                } p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="w-full h-40 bg-gray-100 rounded-md overflow-hidden mb-3">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2
                  className={`text-lg font-medium ${
                    theme === "dark" ? "text-zinc-200" : "text-gray-700"
                  } mb-2 hover:text-primary transition-colors`}
                >
                  {product.name}
                </h2>
                <div className="text-gray-600 mb-1">
                  <span className="text-xl font-semibold text-[#ed8f60]">
                    ${product.price}
                  </span>
                  {product.discount > 0 && (
                    <span className="ml-2 text-sm text-red-500">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ProductSection;

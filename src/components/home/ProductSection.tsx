import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetProductsQuery } from "../../redux/services/productApi";
import { TProduct } from "../../types";
import { useGetCategoriesQuery } from "../../redux/services/categoryApi";
import { useLocation, useSearchParams } from "react-router-dom";
import Loading from "../shared/Loading";
import ProductCard from "../product/ProductCard";

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

  const { data: categories } = useGetCategoriesQuery(null);
  const category = categories?.data || [];
  const [searchParams] = useSearchParams();

  const categoryParams = searchParams.get("category") || cateParam || null;

  const location = useLocation();

  useEffect(() => {
    if (categoryParams) {
      setSelectedCategory(categoryParams);
    }
  }, [categoryParams]);

  const { data, isFetching } = useGetProductsQuery({
    page,
    limit: 12,
    category: selectedCategory,
    sortByPrice: priceSort,
  });

  console.log(data?.data);

  useEffect(() => {
    if (data?.data) {
      setProductList((prev = []) => [...prev, ...(data?.data?.products || [])]);
      setHasMore(data?.data?.hasMore);
    }
  }, [data, selectedCategory, location.pathname]);

  useEffect(() => {
    setPage(1);
    setProductList([]);
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
        <div className="text-center">
          <Loading />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={productList.length}
          next={loadMoreProducts}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={
            <p className="text-center mt-4 text-gray-500">
              Nothing is available to display.
            </p>
          }
        >
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productList.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ProductSection;

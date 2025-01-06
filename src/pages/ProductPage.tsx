import { useEffect, useState } from "react";
import { useGetCategoriesQuery } from "../redux/services/categoryApi";
import { useGetProductsQuery } from "../redux/services/productApi";
import { TProduct } from "../types";
import Loading from "../components/shared/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "../components/product/ProductCard";
import ASForm from "../components/form/ASForm";
import ASInput from "../components/form/ASInput";
import { FieldValues } from "react-hook-form";

const ProductPage = () => {
  const [productList, setProductList] = useState<TProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceSort, setPriceSort] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  const { data: categories } = useGetCategoriesQuery(null);
  const category = categories?.data || [];

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
    <div className="my-4">
      <div className="grid grid-cols-1 gap-5 my-8">
        <div className="">
          <h1 className="text-center text-3xl font-semibold mb-8">
            All Products
          </h1>
          <div className="md:flex justify-center my-4 py-8 border-b-2">
            <ASForm
              label="Search"
              onSubmit={onSubmit}
              className="text-center md:w-1/2 flex gap-3"
            >
              <ASInput name="keyword" placeholder="Search Your Product" />
            </ASForm>
          </div>
          <div className="sm:hidden">
            <select
              className="select select-bordered select-sm w-full max-w-sm"
              value={priceSort}
              onChange={handlePriceSortChange2}
            >
              <option value="">Sort by Price</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Filter */}
        <div className="sm:hidden">
          <select
            aria-label="Category"
            className="select select-bordered select-sm w-full max-w-sm"
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
      </div>
      <div className="flex gap-10">
        {/* Sidebar Filter */}
        <div className="hidden w-[22rem] sm:flex sm:flex-col top-4 sticky z-10 border-2 border-gray-200 p-4 rounded-lg h-[37rem] overflow-y-auto">
          <h2 className="text-2xl text-center font-semibold mb-4 border-b-2 py-2">
            Filter by Categories
          </h2>
          <div className="flex flex-col mb-6">
            <button
              className={`px-4 py-2 text-center text-sm font-medium rounded-md ${
                selectedCategory === ""
                  ? "bg-gray-800 text-white"
                  : "text-gray-500"
              } hover:bg-gray-900 hover:text-white`}
              onClick={() => setSelectedCategory("")}
            >
              All
            </button>
            {category.map((cat, index) => (
              <button
                key={index}
                className={`px-4 py-2 text-center text-sm font-medium rounded-md ${
                  selectedCategory === cat.name
                    ? "bg-gray-800 text-white"
                    : "text-gray-500"
                } hover:bg-gray-900 hover:text-white`}
                onClick={() => setSelectedCategory(cat.name)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <h2 className="text-2xl text-center font-semibold mb-4 border-b-2 py-2">
            Sort by Price
          </h2>
          <div className="flex flex-col ">
            <label className="flex items-center justify-center space-x-2 mb-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={priceSort === "lowToHigh"}
                onChange={() =>
                  handlePriceSortChange(
                    priceSort === "lowToHigh" ? "" : "lowToHigh"
                  )
                }
              />
              <span>Price: Low to High</span>
            </label>
            <label className="flex items-center space-x-2 justify-center">
              <input
                type="checkbox"
                className="checkbox"
                checked={priceSort === "highToLow"}
                onChange={() =>
                  handlePriceSortChange(
                    priceSort === "highToLow" ? "" : "highToLow"
                  )
                }
              />
              <span>Price: High to Low</span>
            </label>
          </div>
        </div>
        <div>
          {isFetching && productList.length === 0 ? (
            <div className="w-[50rem]">
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
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productList.map((product, index) => (
                  <ProductCard product={product} key={index} />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

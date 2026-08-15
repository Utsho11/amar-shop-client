import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetProductsQuery } from "../../redux/services/productApi";
import { TProduct } from "../../types";
import Loading from "../shared/Loading";
import ProductCard from "../product/ProductCard";
import { useTheme } from "../../context/ThemeContext";

export type PaginatedProducts = {
  products: TProduct[];
  hasMore: boolean;
};

type ProductSectionProps = {
  cateParam?: string;
};

const ProductSection: React.FC<ProductSectionProps> = () => {
  const [productList, setProductList] = useState<TProduct[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const { data, isFetching } = useGetProductsQuery({
    page,
    limit: 12,
  });

  // console.log(data?.data);

  useEffect(() => {
    if (data?.data) {
      setProductList((prev = []) => [...prev, ...(data?.data?.products || [])]);
      setHasMore(data?.data?.hasMore);
    }
  }, [data]);

  const loadMoreProducts = () => {
    if (!hasMore || isFetching) return;
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="px-4 py-16 md:px-8">
      {(location.pathname === "/products" || location.pathname === "/") && (
        <div className="mx-auto max-w-5xl text-center">
          <p
            className={
              isDark ? "text-sm text-[#777]" : "text-sm text-[#6B5E57]"
            }
          >
            All Products
          </p>

          <div className="mx-auto mt-3 mb-10 h-[3px] w-12 rounded-full bg-[#6f7f3f]" />
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
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6">
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

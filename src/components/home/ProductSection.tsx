import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useGetProductsQuery } from "../../redux/services/productApi";
import { TProduct } from "../../types";
import Loading from "../shared/Loading";
import ProductCard from "../product/ProductCard";

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

  const { data, isFetching } = useGetProductsQuery({
    page,
    limit: 12,
  });

  console.log(data?.data);

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
    <div className="my-10">
      {(location.pathname === "/products" || location.pathname === "/") && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-8">
          <h1 className="text-start text-3xl font-semibold mb-8">Products</h1>
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

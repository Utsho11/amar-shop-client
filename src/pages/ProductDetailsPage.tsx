import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductsQuery,
  useGetReviewsSingleProductQuery,
  useGetSingleProductQuery,
} from "../redux/services/productApi";
import Loading from "../components/shared/Loading";
import { useTheme } from "../context/ThemeContext";
import { useDispatch } from "react-redux";
import { addProduct, clearCart } from "../redux/features/cartSlice";
import ReviewSection from "../components/home/ReviewSection";
import { TReview } from "../types";
import { addRecentProduct } from "../redux/features/recentProductsSlice";
import StarRating from "../components/StarRating";
import ProductCard from "../components/product/ProductCard";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetSingleProductQuery(id as string);
  const { data: reviews } = useGetReviewsSingleProductQuery(id as string);
  const category = data?.data?.category?.name;

  console.log(category);

  const { data: prod, isFetching } = useGetProductsQuery({
    category: category,
  });

  const { theme } = useTheme();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const products = prod?.data?.products || [];

  const product = data?.data;

  // Move useEffect to ensure it's not called conditionally
  useEffect(() => {
    if (product) {
      dispatch(
        addRecentProduct({
          id: product.id,
          name: product.name,
          price: Number(product.price),
          imageUrl: product.imageUrl,
          link: `/products/${product.id}`,
        })
      );
    }
  }, [product, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  const reviewData: TReview[] = (reviews?.data || []) as TReview[];
  const totalRating = reviewData.reduce(
    (acc, review) => acc + review.rating,
    0
  );

  const averageRating = totalRating / reviewData.length;

  const handleShop = () => {
    navigate(`/shop/${product?.shop?.id}`);
  };

  const handleAddToCart = () => {
    try {
      dispatch(addProduct(product!));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.message === "DIFFERENT_VENDOR_DETECTED") {
        if (
          window.confirm(
            "Your cart contains items from a different vendor. Do you want to replace the cart with this product?"
          )
        ) {
          dispatch(clearCart());
          dispatch(addProduct(product!));
          alert("Cart replaced with the new product!");
        } else {
          alert("Product addition cancelled.");
        }
      }
    }
  };

  return (
    <div
      className={`container mx-auto px-4 py-8 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-white text-gray-900"
      }`}
    >
      <div
        className={`rounded-lg overflow-hidden ${
          theme === "dark" ? "bg-gray-800" : "bg-base-100"
        }`}
      >
        <div className="hero-content grid grid-cols-1 lg:grid-cols-7 lg:gap-20">
          <img
            src={product?.imageUrl}
            alt={product?.name}
            className="col-span-3 min-w-full rounded-lg shadow-md"
          />
          <div className="col-span-4">
            <h1
              className={`text-3xl lg:text-5xl font-bold mb-4 ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {product?.name}
            </h1>

            <p
              className={`leading-relaxed mb-6 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {product?.description}
            </p>

            <div className="mb-6 space-y-2">
              <p>
                <span className="font-medium">Category:</span>{" "}
                {product?.category?.name}
              </p>
              <p>
                <span className="font-medium">Shop:</span>{" "}
                <span
                  onClick={handleShop}
                  className="hover:text-blue-600 hover:underline cursor-pointer"
                >
                  {product?.shop?.name}
                </span>
              </p>
            </div>
            <div className="my-4">
              <p className="flex gap-3 items-center">
                <span className="font-medium">Ratings:</span>{" "}
                <span>
                  <StarRating rating={averageRating} />
                </span>
              </p>
            </div>

            <div className="mb-6">
              <p
                className={`text-2xl font-semibold ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}
              >
                ${product?.price}
              </p>
              {product!.discount > 0 && (
                <p className="text-sm text-red-500">
                  Discount: {product?.discount}%
                </p>
              )}
            </div>

            <div className="">
              <button
                onClick={handleAddToCart}
                className={`btn btn-primary btn-sm  ${
                  theme === "dark"
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-blue-500 hover:bg-blue-400 text-white"
                }`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <ReviewSection reviews={reviewData} />
      <div className="divider"></div>
      <h1 className="text-start text-3xl font-semibold mb-8">
        Related Products
      </h1>
      <div className="">
        {isFetching ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, idx) => (
              <ProductCard key={idx} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;

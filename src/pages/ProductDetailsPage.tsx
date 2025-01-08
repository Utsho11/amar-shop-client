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
import { FaStar, FaShoppingCart, FaTags, FaStore } from "react-icons/fa";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetSingleProductQuery(id as string);
  const { data: reviews } = useGetReviewsSingleProductQuery(id as string);
  const category = data?.data?.category?.name;

  // console.log(category);

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
      dispatch(addRecentProduct(product));
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
        className={`rounded-lg overflow-hidden shadow-lg ${
          theme === "dark" ? "bg-gray-800" : "bg-base-100"
        }`}
      >
        <div className="hero-content grid grid-cols-1 md:grid-cols-7 md:gap-8 p-6">
          {/* Product Image */}
          <img
            src={product?.imageUrl}
            alt={product?.name}
            className="col-span-3 rounded-lg shadow-lg object-cover w-full"
          />

          {/* Product Information */}
          <div className="col-span-4">
            <h1
              className={`text-3xl lg:text-4xl font-bold mb-4 ${
                theme === "dark" ? "text-gray-100" : "text-gray-800"
              }`}
            >
              {product?.name}
            </h1>

            <p
              className={`leading-relaxed mb-4 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {product?.description}
            </p>

            {/* Category and Shop */}
            <div className="mb-6">
              <p className="flex items-center gap-2">
                <FaTags className="text-blue-500" />
                <span className="font-medium">Category:</span>{" "}
                {product?.category?.name}
              </p>
              <p className="flex items-center gap-2 mt-2">
                <FaStore className="text-green-500" />
                <span className="font-medium">Shop:</span>
                <span
                  onClick={handleShop}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  {product?.shop?.name}
                </span>
              </p>
            </div>

            {/* Ratings */}
            <div className="my-4">
              <div className="flex gap-3 items-center">
                <span className="font-medium flex items-center gap-2">
                  <FaStar className="text-yellow-500" />
                  Ratings:
                </span>
                <span>
                  <StarRating rating={averageRating} />
                </span>
              </div>
            </div>

            {/* Price and Discount */}
            <div className="mb-6">
              <p
                className={`text-2xl font-semibold ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}
              >
                ${product?.price}
              </p>
              {(product?.discount ?? 0) > 0 && (
                <p className="text-sm text-red-500">
                  <FaTags className="inline mr-1" />
                  Discount: {product?.discount}%
                </p>
              )}
            </div>

            {/* Add to Cart Button */}
            <div className="mt-4">
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 px-4 py-2 bg-[#e9c46a] hover:bg-[#d4ab58] text-black rounded-lg shadow-lg transition duration-300 ease-in-out hover:text-white"
              >
                <FaShoppingCart />
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

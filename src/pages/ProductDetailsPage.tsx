import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../redux/services/productApi";
import Loading from "../components/shared/Loading";
import { useTheme } from "../context/ThemeContext";
import ProductSection from "../components/home/ProductSection";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/features/cartSlice";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetSingleProductQuery(id as string);
  const { theme } = useTheme();
  const dispatch = useDispatch(); // Hook to dispatch actions

  if (isLoading) {
    return <Loading />;
  }

  const product = data?.data;

  const handleAddToCart = () => {
    if (product && product.shop) {
      dispatch(addProduct(product));
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
                <span className="font-medium">Shop:</span> {product?.shop?.name}
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
              {product?.discount && (
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
      <h1 className="text-start text-3xl font-semibold mb-8">
        Related Products
      </h1>
      <div className="">
        <ProductSection cateParam={product?.category?.name || ""} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;

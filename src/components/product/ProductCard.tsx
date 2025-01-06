import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { TProduct, TReview } from "../../types";
import { useGetReviewsSingleProductQuery } from "../../redux/services/productApi";
import StarRating from "../StarRating";

const ProductCard = ({ product }: { product: TProduct }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  const { data: reviews } = useGetReviewsSingleProductQuery(
    product.id as string
  );

  const reviewData: TReview[] = (reviews?.data || []) as TReview[];
  const totalRating = reviewData.reduce(
    (acc, review) => acc + review.rating,
    0
  );

  const averageRating = totalRating / reviewData.length;

  return (
    <div
      onClick={() => handleProductClick(product.id)}
      className={`items-start ${
        theme === "dark"
          ? "bg-slate-700 hover:bg-slate-500"
          : "bg-white hover:bg-gray-200"
      } p-4 rounded-md shadow-md border-2 border-gray-100 hover:shadow-lg transition-shadow duration-300 sm:w-[22rem]`}
    >
      <div className="w-full sm:h-40 bg-gray-100 rounded-md overflow-hidden mb-3">
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
        {product.name.length > 20 ? product.name.slice(0, 20) : product.name}
      </h2>
      <div className="text-gray-600 my-3 sm:flex justify-between items-center">
        <div>
          <span className="text-xl font-semibold text-[#ed8f60]">
            ${product.price}
          </span>
          {product.discount > 0 && (
            <span className="ml-2 text-sm text-red-500">
              -{product.discount}%
            </span>
          )}
        </div>
        <div>
          <span>
            <StarRating rating={averageRating} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import { Star, Tag, Scale } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useGetReviewsSingleProductQuery } from "../../redux/services/productApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCompare, removeFromCompare } from "../../redux/features/comparisonSlice";
import { RootState } from "../../redux/store/store";
import type { TProduct, TReview } from "../../types";

const ProductCard = ({ product }: { product: TProduct }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDark = theme === "dark";

  const compareItems = useSelector((state: RootState) => state.comparison.items);
  const isCompared = compareItems.some((item) => item.id === product.id);

  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  const { data: reviews } = useGetReviewsSingleProductQuery(product.id);

  const rawReviews = reviews?.data;
  const reviewData: TReview[] = Array.isArray(rawReviews)
    ? (rawReviews as TReview[])
    : Array.isArray((rawReviews as any)?.reviews)
    ? ((rawReviews as any).reviews as TReview[])
    : [];

  const totalRating = reviewData.reduce(
    (acc, review) => acc + (review.rating || 0),
    0,
  );

  const averageRating =
    reviewData.length > 0 ? totalRating / reviewData.length : 0;

  return (
    <article
      className={`group flex h-full min-h-[430px] w-full flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1 relative ${
        isDark ? "border-white/10 bg-[#211E1D]" : "border-[#E8DED2] bg-white"
      }`}
    >
      <div className="h-52 w-full overflow-hidden relative">
        <img
          src={product.imageUrl[0] || "/placeholder.png"}
          alt={product.name || "Product"}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isDark ? "brightness-90" : ""
          }`}
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isCompared) {
              dispatch(removeFromCompare(product.id));
            } else {
              dispatch(addToCompare(product));
            }
          }}
          className={`absolute top-3 right-3 btn btn-circle btn-xs shadow-md transition-all ${
            isCompared
              ? "bg-[#A66B55] text-white border-none"
              : "bg-white/90 dark:bg-zinc-800/90 text-gray-700 dark:text-zinc-200 hover:bg-white border-none"
          }`}
          title={isCompared ? "Remove from comparison" : "Add to comparison"}
        >
          <Scale size={13} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-2 lg:p-5">
        <div className="flex-1">
          <h3
            className={`line-clamp-1 text-lg font-semibold ${
              isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
            }`}
          >
            {product.name}
          </h3>

          <p
            className={`mt-2 line-clamp-2 text-sm leading-6 ${
              isDark ? "text-[#B8AAA3]" : "text-[#6B5E57]"
            }`}
          >
            {product.description || "No description available."}
          </p>

          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center lg:justify-between gap-3">
              <span className={isDark ? "text-[#B8AAA3]" : "text-[#6B5E57]"}>
                Price
              </span>
              <span
                className={`font-semibold ${
                  isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
                }`}
              >
                ${product.price ?? 0}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span
                className={`hidden lg:flex items-center gap-2 ${
                  isDark ? "text-[#B8AAA3]" : "text-[#6B5E57]"
                }`}
              >
                <Tag size={15} />
                Category
              </span>
              <span
                className={`line-clamp-1 rounded-full px-3 py-1 text-xs ${
                  isDark
                    ? "bg-[#2D2927] text-[#F9F5F0]"
                    : "bg-[#F1EAE0] text-[#3D352F]"
                }`}
              >
                {product.category?.name}
              </span>
            </div>

            <div className="flex items-center lg:justify-between gap-3">
              <span
                className={`flex items-center gap-2 ${
                  isDark ? "text-[#B8AAA3]" : "text-[#6B5E57]"
                }`}
              >
                <Star size={15} className="fill-[#A66B55] text-[#A66B55]" />
                Rating
              </span>
              <span className={isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"}>
                {averageRating.toFixed(1)} / 5 ({reviewData.length})
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleProductClick(product.id)}
          className="btn btn-sm lg:btn-md mt-5 w-full rounded-full border-none bg-[#A66B55] text-white hover:bg-[#8d5947]"
        >
          View Details
        </button>
      </div>
    </article>
  );
};

export default ProductCard;

import { Star, Tag, Scale, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useGetReviewsSingleProductQuery } from "../../redux/services/productApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCompare, removeFromCompare } from "../../redux/features/comparisonSlice";
import { RootState } from "../../redux/store/store";
import { useGetMyWishlistQuery, useToggleWishlistMutation } from "../../redux/services/orderApi";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "sonner";
import type { TProduct, TReview } from "../../types";

const ProductCard = ({ product }: { product: TProduct }) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isDark = theme === "dark";

  const user = useSelector(selectCurrentUser);
  const compareItems = useSelector((state: RootState) => state.comparison.items);
  const isCompared = compareItems.some((item) => item.id === product.id);

  const { data: wishlistData } = useGetMyWishlistQuery(undefined, {
    skip: !user || user.role !== "CUSTOMER",
  });
  const [toggleWishlist] = useToggleWishlistMutation();

  const isWishlisted = Array.isArray(wishlistData?.data)
    ? wishlistData.data.some((item: any) => item.id === product.id)
    : false;

  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast.info("Please log in to add items to your wishlist.");
      navigate("/auth/login");
      return;
    }
    if (user.role !== "CUSTOMER") {
      toast.info("Only customers can maintain a wishlist.");
      return;
    }
    try {
      const res: any = await toggleWishlist({ productId: product.id }).unwrap();
      toast.success(res.message || "Wishlist updated");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update wishlist");
    }
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
      className={`group flex h-full min-h-[430px] w-full flex-col overflow-hidden rounded-3xl border border-base-200 bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 relative ${
        isDark ? "shadow-black/40" : "shadow-sm"
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

        {/* Wishlist Button - Fitts's Law 40px touch target */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 left-3 btn btn-circle btn-sm shadow-md transition-all duration-200 hover:scale-110 active:scale-95 ${
            isWishlisted
              ? "bg-rose-500 text-white border-none hover:bg-rose-600"
              : "bg-base-100/90 backdrop-blur-xs text-base-content hover:bg-base-100 border border-base-200"
          }`}
          title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={15} className={isWishlisted ? "fill-current" : ""} />
        </button>

        {/* Compare Button - Fitts's Law 40px touch target */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isCompared) {
              dispatch(removeFromCompare(product.id));
            } else {
              dispatch(addToCompare(product));
            }
          }}
          aria-label={isCompared ? "Remove from comparison" : "Add to comparison"}
          className={`absolute top-3 right-3 btn btn-circle btn-sm shadow-md transition-all duration-200 hover:scale-110 active:scale-95 ${
            isCompared
              ? "bg-primary text-white border-none"
              : "bg-base-100/90 backdrop-blur-xs text-base-content hover:bg-base-100 border border-base-200"
          }`}
          title={isCompared ? "Remove from comparison" : "Add to comparison"}
        >
          <Scale size={15} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4 lg:p-5">
        <div className="flex-1">
          <h3 className="line-clamp-1 text-base lg:text-lg font-bold text-base-content group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <p className="mt-1.5 line-clamp-2 text-xs sm:text-sm leading-relaxed text-gray-500">
            {product.description || "No description available."}
          </p>

          <div className="mt-4 grid gap-2.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-medium">Price</span>
              <span className="font-extrabold text-base text-primary">
                ${product.price ?? 0}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-gray-400 font-medium">
                <Tag size={13} />
                Category
              </span>
              <span className="line-clamp-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-secondary/15 text-secondary-focus dark:text-secondary">
                {product.category?.name || "General"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-gray-400 font-medium">
                <Star size={13} className="fill-amber-500 text-amber-500" />
                Rating
              </span>
              <span className="text-base-content font-bold text-xs">
                {averageRating.toFixed(1)} / 5 ({reviewData.length})
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleProductClick(product.id)}
          className="btn btn-sm lg:btn-md mt-5 w-full rounded-full btn-primary text-white font-semibold shadow-md shadow-primary/25 hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          View Details
        </button>
      </div>
    </article>
  );
};

export default ProductCard;

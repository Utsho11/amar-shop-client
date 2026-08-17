import { useState } from "react";
import {
  useAddReviewMutation,
  useGetOrderItemQuery,
} from "../../redux/services/orderApi";
import { toast } from "sonner";
import Loading from "../../components/shared/Loading";
import { useTheme } from "../../context/ThemeContext";
import {
  Star,
  Sparkles,
  ShoppingBag,
  Send,
  CheckCircle,
} from "lucide-react";
import EmptyState from "../../components/shared/EmptyState";
import { Link } from "react-router-dom";
import { TOrderItem } from "../../types";

const ReviewPage = () => {
  const { data, isLoading } = useGetOrderItemQuery(null);
  const [addReview] = useAddReviewMutation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const rawProducts: TOrderItem[] = data?.data || [];

  // Deduplicate products by productId
  const products = rawProducts.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.productId === item.productId)
  );

  // State to hold reviews form values per productId
  const [reviewStates, setReviewStates] = useState<
    Record<string, { rating: number; hoverRating: number; comment: string; isSubmitted?: boolean }>
  >({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const getProductState = (productId: string) => {
    return (
      reviewStates[productId] || {
        rating: 5,
        hoverRating: 0,
        comment: "",
        isSubmitted: false,
      }
    );
  };

  const updateProductState = (
    productId: string,
    updates: Partial<{ rating: number; hoverRating: number; comment: string; isSubmitted: boolean }>
  ) => {
    setReviewStates((prev) => ({
      ...prev,
      [productId]: { ...getProductState(productId), ...updates },
    }));
  };

  const handleSubmit = async (productId: string) => {
    const currentState = getProductState(productId);
    if (!currentState.comment.trim()) {
      toast.error("Please provide a short comment with your review.");
      return;
    }

    setSubmittingId(productId);
    try {
      await addReview({
        productId,
        rating: currentState.rating,
        comment: currentState.comment.trim(),
      }).unwrap();

      toast.success("Review posted successfully! Thank you for your feedback.");
      updateProductState(productId, { isSubmitted: true });
    } catch {
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setSubmittingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-10 px-4 max-w-5xl mx-auto space-y-8 ${isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"}`}>
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
          <Sparkles size={13} />
          <span>Verified Shopper Reviews</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold">Rate Your Purchases</h1>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400">
          Share your authentic experience with the community and help fellow shoppers make informed decisions.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="py-12">
          <EmptyState
            icon={ShoppingBag}
            title="No Items to Review Yet"
            description="You haven't ordered any products yet, or all your recent orders have been reviewed. Explore our catalog to find items you love!"
            actionText="Start Shopping"
            actionLink="/products"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {products.map((item) => {
            const p = item.product;
            if (!p) return null;

            const state = getProductState(item.productId);
            const firstImg = Array.isArray(p.imageUrl) ? p.imageUrl[0] : p.imageUrl;

            return (
              <div
                key={item.productId}
                className={`p-6 sm:p-8 rounded-3xl border shadow-sm transition-all duration-200 ${
                  isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
                }`}
              >
                {state.isSubmitted ? (
                  <div className="text-center py-8 space-y-3">
                    <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-lg font-bold">Review Submitted for {p.name}!</h3>
                    <p className="text-xs text-gray-500">Your feedback has been verified and published to the product page.</p>
                    <Link to={`/product/${item.productId}`} className="btn btn-sm btn-ghost text-primary text-xs font-semibold">
                      View on Product Page →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Product Summary Header */}
                    <div className="flex items-center gap-4 pb-4 border-b border-base-200">
                      <img
                        src={
                          firstImg ||
                          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=150&q=80"
                        }
                        alt={p.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-base-200 shrink-0"
                      />
                      <div>
                        <span className="badge badge-primary badge-xs font-semibold mb-1">
                          Verified Purchase
                        </span>
                        <h2 className="text-base sm:text-lg font-bold leading-snug">
                          <Link to={`/product/${item.productId}`} className="hover:text-primary transition-colors">
                            {p.name}
                          </Link>
                        </h2>
                      </div>
                    </div>

                    {/* Interactive Star Rating Picker */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
                        Overall Rating ({state.hoverRating || state.rating} of 5 Stars)
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((starValue) => {
                          const isFilled =
                            starValue <= (state.hoverRating || state.rating);

                          return (
                            <button
                              key={starValue}
                              type="button"
                              onClick={() => updateProductState(item.productId, { rating: starValue })}
                              onMouseEnter={() => updateProductState(item.productId, { hoverRating: starValue })}
                              onMouseLeave={() => updateProductState(item.productId, { hoverRating: 0 })}
                              className="p-1.5 hover:scale-125 transition-transform"
                              aria-label={`Rate ${starValue} stars`}
                            >
                              <Star
                                size={28}
                                className={
                                  isFilled
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-gray-300 dark:text-zinc-600"
                                }
                              />
                            </button>
                          );
                        })}
                        <span className="text-xs font-bold text-amber-500 ml-2">
                          {state.rating === 5
                            ? "Excellent! (5/5)"
                            : state.rating === 4
                            ? "Good (4/5)"
                            : state.rating === 3
                            ? "Average (3/5)"
                            : state.rating === 2
                            ? "Poor (2/5)"
                            : "Terrible (1/5)"}
                        </span>
                      </div>
                    </div>

                    {/* Review Text Input */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center justify-between">
                        <span>Your Feedback & Review</span>
                        <span className="text-[11px] font-normal text-gray-400">
                          {state.comment.length}/500 chars
                        </span>
                      </label>
                      <textarea
                        rows={3}
                        maxLength={500}
                        placeholder="What did you like or dislike about this product? How was the build quality and packaging?"
                        value={state.comment}
                        onChange={(e) => updateProductState(item.productId, { comment: e.target.value })}
                        className="textarea textarea-bordered w-full rounded-2xl text-xs sm:text-sm focus:border-primary"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-2">
                      <button
                        type="button"
                        onClick={() => handleSubmit(item.productId)}
                        disabled={submittingId === item.productId}
                        className="btn btn-primary rounded-full px-6 font-bold shadow-md shadow-primary/25 gap-2 text-xs sm:text-sm"
                      >
                        {submittingId === item.productId ? (
                          <span className="loading loading-spinner loading-xs" />
                        ) : (
                          <>
                            <Send size={15} />
                            <span>Post Review</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ReviewPage;

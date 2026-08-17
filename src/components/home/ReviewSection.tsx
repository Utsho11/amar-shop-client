import React from "react";
import { TReview } from "../../types";
import { Star, CheckCircle, MessageSquare, Quote } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export type ReviewSectionProps = {
  reviews: TReview[];
};

const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? reviews.reduce((acc, r) => acc + (r.rating || 5), 0) / totalReviews
      : 5.0;

  // Calculate rating distribution
  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => Math.round(r.rating) === stars).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { stars, count, percentage };
  });

  return (
    <div className="space-y-8">
      {/* Overview Analytics Bar */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border flex flex-col md:flex-row items-center justify-between gap-8 ${
          isDark ? "bg-[#141312] border-white/10" : "bg-[#F9F5F0] border-base-200"
        }`}
      >
        {/* Rating Score */}
        <div className="text-center md:text-left space-y-1">
          <div className="text-4xl sm:text-5xl font-extrabold text-primary">
            {totalReviews > 0 ? averageRating.toFixed(1) : "5.0"}
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1 py-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={18}
                className={
                  i < Math.round(averageRating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>
          <p className="text-xs text-gray-500 font-medium">
            Based on {totalReviews} {totalReviews === 1 ? "verified review" : "verified reviews"}
          </p>
        </div>

        {/* Rating Progress Bars */}
        <div className="w-full md:w-72 space-y-2 text-xs">
          {distribution.map(({ stars, count, percentage }) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="w-4 font-bold text-gray-500">{stars}★</span>
              <div className="flex-1 bg-base-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-400 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="w-6 text-right text-gray-400 font-mono text-[10px]">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-12 space-y-3">
          <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <MessageSquare size={24} />
          </div>
          <h4 className="text-base font-bold">No Reviews Yet</h4>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Be the first verified buyer to share your feedback about this product!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`p-5 sm:p-6 rounded-3xl border shadow-xs relative flex flex-col justify-between ${
                isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
              }`}
            >
              <Quote className="absolute top-5 right-5 text-primary/10" size={32} />

              <div>
                {/* User & Rating */}
                <div className="flex items-center gap-3 mb-3">
                  <img
                    className="w-10 h-10 rounded-2xl object-cover border border-base-200"
                    src={
                      review.image ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    }
                    alt={review.username}
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <span>{review.username}</span>
                      <CheckCircle size={12} className="text-emerald-500 fill-emerald-500/20" />
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < review.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-300 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-base-200 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                Verified Purchase
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewSection;

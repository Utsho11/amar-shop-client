import { Star, CheckCircle, Quote } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const CustomerTestimonials = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const reviews = [
    {
      name: "Tanzim Hasan",
      role: "Verified Buyer • Dhaka",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      comment:
        "The side-by-side comparison engine saved me so much time when deciding between two headphones. Order arrived in 24 hours with exact real-time tracking.",
      product: "Sony WH-1000XM5",
    },
    {
      name: "Ayesha Siddiqua",
      role: "Verified Buyer • Chittagong",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      comment:
        "Amazing multi-vendor shopping experience! Love how easy it is to save favorite items to wishlist and check vendor credibility before checking out.",
      product: "Organic Ceramic Vase",
    },
    {
      name: "Rafiqul Islam",
      role: "Merchant & Shopper • Sylhet",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      rating: 5,
      comment:
        "As a vendor, managing products and seeing customer delivery statuses transition smoothly is unmatched. The platform design is world-class.",
      product: "Minimalist Leather Backpack",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <p
          className={`text-xs font-semibold uppercase tracking-[0.3em] ${
            isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
          }`}
        >
          Customer Experiences
        </p>
        <h2
          className={`mt-2 text-2xl sm:text-4xl font-extrabold ${
            isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
          }`}
        >
          Loved by Thousands of Shoppers
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev, index) => (
          <div
            key={index}
            className={`p-7 rounded-3xl border shadow-sm flex flex-col justify-between relative ${
              isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
            }`}
          >
            <Quote className="absolute top-6 right-6 text-primary/15" size={40} />

            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={15} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-300 leading-relaxed italic mb-6">
                "{rev.comment}"
              </p>
            </div>

            <div className="pt-4 border-t border-base-200 flex items-center gap-3.5">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-11 h-11 rounded-2xl object-cover border border-base-300"
              />
              <div>
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <span>{rev.name}</span>
                  <CheckCircle size={13} className="text-emerald-500 fill-emerald-500/20" />
                </div>
                <div className="text-[11px] text-gray-400 font-medium">{rev.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerTestimonials;

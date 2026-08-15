import { Link } from "react-router-dom";
import cartImg from "../../../assets/banner.png";
import { useTheme } from "../../../context/ThemeContext";
import {
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Zap,
  Store,
  Scale,
} from "lucide-react";

export default function Banner1() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className={`relative min-h-[90vh] flex items-center px-6 md:px-16 overflow-hidden ${
        isDark ? "bg-[#141312]" : "bg-[#F9F5F0]"
      }`}
    >
      {/* Background Decorative Gradient Blobs */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#A66B55]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#E9C46A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center py-12 relative z-10">
        {/* LEFT CONTENT */}
        <div className="order-2 lg:order-1 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest animate-in fade-in slide-in-from-top-2">
            <Sparkles size={14} />
            <span>Next-Generation Multi-Vendor Marketplace</span>
          </div>

          <h1
            className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight ${
              isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
            }`}
          >
            Curated Quality. <br />
            <span className="text-primary">Verified Stores.</span>
          </h1>

          <p
            className={`max-w-lg text-sm sm:text-base leading-relaxed ${
              isDark ? "text-[#B8AFA8]" : "text-[#6B5E57]"
            }`}
          >
            Discover handpicked products from verified merchant boutiques. Compare specs side-by-side, unlock personalized recommendations, and track packages in real time.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/products"
              className="btn btn-primary rounded-full px-8 btn-md text-sm font-semibold shadow-lg shadow-primary/25 gap-2 hover:scale-[1.03] transition-transform"
            >
              <ShoppingBag size={18} />
              <span>Explore Catalog</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/compare"
              className="btn btn-outline rounded-full px-6 btn-md text-sm font-semibold gap-2 hover:bg-base-200"
            >
              <Scale size={16} />
              <span>Compare Items</span>
            </Link>
          </div>

          {/* Micro Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-base-200/80">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <ShieldCheck size={16} className="text-emerald-500" />
              <span>100% Vetted Shops</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <Zap size={16} className="text-amber-500" />
              <span>Instant Dispatch</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
              <Store size={16} className="text-primary" />
              <span>Direct Vendor Cart</span>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE & FLOATING CARDS */}
        <div className="order-1 lg:order-2 flex justify-center relative">
          <div className="relative group">
            <img
              src={cartImg}
              alt="Amar Shop Showcase"
              className={`w-[300px] md:w-[420px] lg:w-[480px] rounded-3xl shadow-2xl object-cover transition duration-500 group-hover:scale-105 ${
                isDark ? "shadow-black/60" : "shadow-amber-900/10"
              }`}
            />

            {/* Floating Live Badge 1 */}
            <div className="absolute -top-4 -left-4 sm:top-6 sm:-left-8 bg-base-100/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-base-200 flex items-center gap-3 animate-bounce duration-1000">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold">
                ⭐
              </div>
              <div>
                <div className="font-bold text-xs">4.9 / 5.0 Rating</div>
                <div className="text-[10px] text-gray-400">Verified Shopper Reviews</div>
              </div>
            </div>

            {/* Floating Live Badge 2 */}
            <div className="absolute -bottom-4 -right-4 sm:bottom-6 sm:-right-6 bg-base-100/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-base-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                ⚡
              </div>
              <div>
                <div className="font-bold text-xs">Real-Time Delivery</div>
                <div className="text-[10px] text-gray-400">4-Stage Pipeline Tracker</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

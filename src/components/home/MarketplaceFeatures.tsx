import {
  Scale,
  Sparkles,
  Truck,
  ShieldCheck,
  Zap,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const MarketplaceFeatures = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const features = [
    {
      icon: Scale,
      badge: "Side-by-Side",
      title: "Interactive Product Comparison",
      description:
        "Evaluate up to 3 products across specifications, price, vendor credibility, customer ratings, and inventory with our real-time comparison engine.",
      link: "/compare",
      linkText: "Launch Comparator",
      color: "from-amber-500/20 to-orange-500/10",
      iconColor: "text-amber-500",
    },
    {
      icon: Sparkles,
      badge: "Intelligent Algorithm",
      title: "Proximity Recommendations",
      description:
        "Our dynamic recommendation algorithm matches categories and price proximities to curate tailor-made suggestions that match your shopping taste.",
      link: "/products",
      linkText: "Explore Catalog",
      color: "from-purple-500/20 to-indigo-500/10",
      iconColor: "text-purple-500",
    },
    {
      icon: Truck,
      badge: "Live Telemetry",
      title: "4-Stage Order Fulfillment",
      description:
        "Real-time visual tracking pipeline for every purchase (Placed → Processing → Shipped → Delivered) with direct merchant updates.",
      link: "/customerDashboard/myOrders",
      linkText: "Track Shipments",
      color: "from-blue-500/20 to-cyan-500/10",
      iconColor: "text-blue-500",
    },
    {
      icon: ShieldCheck,
      badge: "Tamper-Proof",
      title: "Zero-Trust Server Checkout",
      description:
        "Sub-totals, inventory locks, and discount coupons are recalculated server-side against Postgres DB to guarantee 100% data integrity.",
      link: "/products",
      linkText: "Shop Securely",
      color: "from-emerald-500/20 to-teal-500/10",
      iconColor: "text-emerald-500",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3">
          <Zap size={14} />
          <span>Engineered for Modern Commerce</span>
        </div>
        <h2
          className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
          }`}
        >
          Why Discerning Shoppers Choose Amar Shop
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-3">
          Built from the ground up with enterprise-grade state synchronization, fast page transitions, and unmatched shopper transparency.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 sm:p-7 rounded-3xl border shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group relative overflow-hidden ${
              isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
            }`}
          >
            {/* Background Glow */}
            <div
              className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.color} rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:scale-150 transition-transform duration-500`}
            />

            <div>
              <div className="flex items-center justify-between mb-5">
                <div
                  className={`w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center ${item.iconColor} shadow-xs`}
                >
                  <item.icon size={24} />
                </div>
                <span className="badge badge-sm font-semibold uppercase text-[10px] bg-base-200">
                  {item.badge}
                </span>
              </div>

              <h3 className="text-base font-bold mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-base-200">
              <Link
                to={item.link}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary group-hover:gap-2.5 transition-all"
              >
                <span>{item.linkText}</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MarketplaceFeatures;

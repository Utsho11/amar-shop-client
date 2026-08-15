import { Store, Zap, Sparkles, Award } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const LiveMarketMetrics = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const metrics = [
    {
      label: "Verified Merchants",
      value: "500+",
      sub: "100% Identity Vetted",
      icon: Store,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      label: "Curated Catalog",
      value: "12,000+",
      sub: "Premium Quality Items",
      icon: Sparkles,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Average Rating",
      value: "4.9 ★",
      sub: "From 45K+ Reviews",
      icon: Award,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Rapid Dispatch",
      value: "< 24h",
      sub: "Direct Express Shipping",
      icon: Zap,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-8">
      <div
        className={`rounded-3xl border p-6 sm:p-8 shadow-sm ${
          isDark
            ? "bg-[#171514] border-white/10"
            : "bg-white border-base-200"
        }`}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-base-200">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                idx > 0 ? "pt-6 sm:pt-0 sm:pl-6 lg:pl-8" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-2xl ${item.bg} ${item.color}`}>
                  <item.icon size={20} />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {item.value}
                  </div>
                  <div className="text-xs font-bold text-base-content mt-0.5">
                    {item.label}
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 dark:text-zinc-400 mt-2 font-medium">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveMarketMetrics;

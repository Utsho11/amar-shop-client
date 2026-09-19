import { Link } from "react-router-dom";
import { Flame, ArrowRight, Clock } from "lucide-react";
import Timer from "./Timer";

const getSeason = () => {
  const month = new Date().getMonth() + 1;

  if (month >= 4 && month <= 10) {
    return {
      name: "Summer",
      title: "Summer Flash Deals",
      subtitle: "Hot seasonal savings across electronics, apparel, and lifestyle.",
      discount: "Up to 50% OFF",
    };
  }

  return {
    name: "Winter",
    title: "Winter Flash Deals",
    subtitle: "Cozy artisan picks and verified essentials at exclusive discounts.",
    discount: "Up to 60% OFF",
  };
};

const FlashSaleSection = () => {
  const season = getSeason();

  return (
    <section className="container mx-auto px-4 py-14">
      <div className="overflow-hidden rounded-[2.5rem] border border-base-200 bg-base-100 shadow-md">
        <div className="grid items-center gap-8 p-6 sm:p-10 lg:p-14 md:grid-cols-2">
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
              <Flame size={15} />
              <span>{season.name} Limited Event</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-base-content leading-tight">
              {season.title}
            </h2>

            <p className="max-w-md text-xs sm:text-sm text-gray-500 dark:text-zinc-400 leading-relaxed mx-auto md:mx-0">
              {season.subtitle}
            </p>

            <div className="text-3xl sm:text-4xl font-black text-primary">
              {season.discount}
            </div>

            <div className="pt-2">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-gray-500 mb-4">
                <Clock size={16} className="text-primary" />
                <span>Offers Refresh Every 24 Hours:</span>
                <Timer />
              </div>

              <Link
                to="/flash-sale"
                className="btn btn-primary rounded-full px-8 shadow-lg shadow-primary/25 inline-flex items-center gap-2 hover:scale-[1.03] transition-transform"
              >
                <span>Browse Flash Sale</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Visual Banner */}
          <div className="relative flex min-h-[260px] sm:min-h-[300px] items-center justify-center rounded-3xl bg-gradient-to-br from-primary/15 via-base-200 to-primary/5 p-8 border border-base-200/60 overflow-hidden">
            <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-primary/20 blur-2xl" />
            <div className="absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-amber-500/15 blur-3xl" />

            <div className="relative text-center z-10">
              <span className="text-xs uppercase font-extrabold tracking-[0.3em] text-primary">
                Flash Deals Live
              </span>

              <h3 className="mt-3 text-6xl sm:text-7xl font-black tracking-tight text-base-content/90">
                SALE
              </h3>

              <p className="mt-3 text-xs sm:text-sm font-semibold text-base-content/70">
                {season.name} Exclusive Verified Catalog
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleSection;

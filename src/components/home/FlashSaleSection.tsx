import { Link } from "react-router-dom";
import { Flame } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Timer from "./Timer";

const getSeason = () => {
  const month = new Date().getMonth() + 1;

  if (month >= 4 && month <= 10) {
    return {
      name: "Summer",
      title: "Summer Flash Sale",
      subtitle: "Hot deals for your summer essentials.",
      discount: "Up to 50% OFF",
    };
  }

  return {
    name: "Winter",
    title: "Winter Flash Sale",
    subtitle: "Cozy picks and warm deals for winter.",
    discount: "Up to 60% OFF",
  };
};

const FlashSaleSection = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const season = getSeason();

  return (
    <section
      className={`px-4 py-16 md:px-8 ${
        isDark ? "bg-[#1A1716]" : "bg-[#F9F5F0]"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl overflow-hidden rounded-[2rem] border ${
          isDark ? "border-white/10 bg-[#211E1D]" : "border-[#E8DED2] bg-white"
        }`}
      >
        <div className="grid items-center gap-8 p-6 md:grid-cols-2 md:p-10 lg:p-14">
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-5 text-center md:text-left">
            <div
              className={`mx-auto flex w-fit items-center gap-2 rounded-full px-4 py-2 text-xs font-medium md:mx-0 ${
                isDark
                  ? "bg-[#2D2927] text-[#C9A68F]"
                  : "bg-[#F1EAE0] text-[#A66B55]"
              }`}
            >
              <Flame size={15} />
              {season.name} Deal
            </div>

            <h2
              className={`text-3xl font-semibold tracking-tight md:text-5xl ${
                isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
              }`}
            >
              {season.title}
            </h2>

            <p
              className={`mx-auto max-w-md text-sm md:mx-0 md:text-base ${
                isDark ? "text-[#B8AAA3]" : "text-[#6B5E57]"
              }`}
            >
              {season.subtitle}
            </p>

            <h3
              className={`text-2xl font-bold ${
                isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
              }`}
            >
              {season.discount}
            </h3>

            <div className="flex-row md:justify-start">
              <div
                className={`flex items-center gap-2 text-sm mb-4 ${
                  isDark ? "text-[#B8AAA3]" : "text-[#6B5E57]"
                }`}
              >
                <Timer />
                Limited time offer
              </div>
              <Link
                to="/products"
                className="btn rounded-full border-none bg-[#A66B55] px-8 text-white hover:bg-[#8d5947]"
              >
                Shop Now
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <div
            className={`relative flex min-h-[260px] items-center justify-center rounded-[1.5rem] ${
              isDark ? "bg-[#2D2927]" : "bg-[#F1EAE0]"
            }`}
          >
            <div className="absolute left-6 top-6 h-16 w-16 rounded-full bg-[#A66B55]/20" />
            <div className="absolute bottom-8 right-8 h-24 w-24 rounded-full bg-[#A66B55]/20" />

            <div className="relative text-center">
              <p
                className={`text-sm uppercase tracking-[0.3em] ${
                  isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
                }`}
              >
                Flash Sale
              </p>

              <h4
                className={`mt-3 text-6xl font-black ${
                  isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
                }`}
              >
                SALE
              </h4>

              <p
                className={`mt-3 text-sm ${
                  isDark ? "text-[#B8AAA3]" : "text-[#6B5E57]"
                }`}
              >
                {season.name} Collection
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleSection;

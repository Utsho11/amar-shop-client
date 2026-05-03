import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useGetCategoriesQuery } from "../../redux/services/categoryApi";
import Loading from "../shared/Loading";

import {
  Shirt,
  MonitorSmartphone,
  Sofa,
  CookingPot,
  Sparkles,
  ShoppingCart,
  Dumbbell,
  GraduationCap,
} from "lucide-react";

// eslint-disable-next-line react-refresh/only-export-components
export const iconMap: Record<string, typeof Shirt> = {
  clothes: Shirt,
  electronics: MonitorSmartphone,
  furniture: Sofa,
  kitchen: CookingPot,
  cosmetics: Sparkles,
  grocery: ShoppingCart,
  sports: Dumbbell,
  education: GraduationCap,
};

export default function CategorySection() {
  const { theme } = useTheme();
  const { data, isFetching } = useGetCategoriesQuery(null);

  const categories = data?.data || [];
  const isDark = theme === "dark";

  if (isFetching) {
    return <Loading />;
  }

  return (
    <section
      className={`py-16 px-6 transition-colors duration-300 ${
        isDark ? "bg-[#050505]" : "bg-[#F5F3EE]"
      }`}
    >
      <div className="mx-auto max-w-5xl text-center">
        <p
          className={isDark ? "text-sm text-[#777]" : "text-sm text-[#6B5E57]"}
        >
          Shop by Category
        </p>

        <div className="mx-auto mt-3 mb-10 h-[3px] w-12 rounded-full bg-[#6f7f3f]" />

        <div className="grid grid-cols-3 gap-6 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
          {categories.map((category) => {
            const name = category?.name || "Category";
            const Icon =
              (iconMap[name.toLowerCase()] as unknown as string) || ShoppingCart;

            return (
              <button
                key={category?.id || name}
                className="group flex flex-col items-center gap-3"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-[#A66B55] group-hover:text-white ${
                    isDark
                      ? "bg-[#a2a09d] text-[#1A1716]"
                      : "bg-white text-[#3D352F]"
                  }`}
                >
                  <Icon size={22} strokeWidth={2} />
                </div>

                <span
                  className={`text-xs transition-colors ${
                    isDark
                      ? "text-[#666] group-hover:text-[#F9F5F0]"
                      : "text-[#6B5E57] group-hover:text-[#A66B55]"
                  }`}
                >
                  <Link
                    to={`/products?category=${encodeURIComponent(category.name)}`}
                  >
                    {name}
                  </Link>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

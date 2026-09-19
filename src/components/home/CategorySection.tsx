import { Link } from "react-router-dom";
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
  LayoutGrid,
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
  const { data, isFetching } = useGetCategoriesQuery(null);
  const categories = data?.data || [];

  if (isFetching) {
    return <Loading />;
  }

  return (
    <section className="container mx-auto px-4 py-14">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-3">
          <LayoutGrid size={14} />
          <span>Curated Collections</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-base-content">
          Shop by Category
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-2">
          Explore handcrafted, verified products organized across our top marketplace departments.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 sm:gap-5">
        {categories.map((category) => {
          const name = category?.name || "Category";
          const Icon =
            (iconMap[name.toLowerCase()] as unknown as typeof Shirt) || ShoppingCart;

          return (
            <Link
              key={category?.id || name}
              to={`/products?category=${encodeURIComponent(category.name)}`}
              aria-label={`Browse ${name} products`}
              className="group flex flex-col items-center gap-3 p-3.5 rounded-2xl border border-transparent hover:border-base-200 hover:bg-base-100/80 transition-all duration-300 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-base-100 border border-base-200 shadow-sm text-primary transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:shadow-md">
                <Icon size={24} strokeWidth={1.8} />
              </div>

              <span className="text-xs sm:text-sm font-medium text-base-content group-hover:text-primary transition-colors line-clamp-1">
                {name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

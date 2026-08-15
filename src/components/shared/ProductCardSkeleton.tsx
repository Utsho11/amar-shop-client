import { useTheme } from "../../context/ThemeContext";

interface ProductCardSkeletonProps {
  count?: number;
}

export const ProductCardSkeleton = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`flex flex-col h-[430px] rounded-3xl border overflow-hidden animate-pulse ${
        isDark ? "border-white/10 bg-[#211E1D]" : "border-[#E8DED2] bg-white"
      }`}
    >
      {/* Thumbnail placeholder */}
      <div className={`h-52 w-full ${isDark ? "bg-zinc-800/60" : "bg-gray-200"}`} />

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Title line */}
          <div className={`h-4 w-3/4 rounded-full ${isDark ? "bg-zinc-800" : "bg-gray-200"}`} />
          {/* Subtitle / desc line */}
          <div className={`h-3 w-full rounded-full ${isDark ? "bg-zinc-800/60" : "bg-gray-200/80"}`} />
          <div className={`h-3 w-1/2 rounded-full ${isDark ? "bg-zinc-800/60" : "bg-gray-200/80"}`} />
        </div>

        {/* Specs lines */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center">
            <div className={`h-3 w-12 rounded ${isDark ? "bg-zinc-800" : "bg-gray-200"}`} />
            <div className={`h-4 w-16 rounded ${isDark ? "bg-zinc-800" : "bg-gray-200"}`} />
          </div>
          <div className="flex justify-between items-center">
            <div className={`h-3 w-16 rounded ${isDark ? "bg-zinc-800" : "bg-gray-200"}`} />
            <div className={`h-3 w-20 rounded-full ${isDark ? "bg-zinc-800" : "bg-gray-200"}`} />
          </div>
        </div>

        {/* Button placeholder */}
        <div className={`h-9 w-full rounded-full ${isDark ? "bg-zinc-800" : "bg-gray-200"} mt-2`} />
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 6 }: ProductCardSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <ProductCardSkeleton key={idx} />
      ))}
    </div>
  );
};

export default ProductCardSkeleton;

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store/store";
import ProductCard from "../components/product/ProductCard";
import { useTheme } from "../context/ThemeContext";
import type { TProduct } from "../types";

const RecentProductPage = () => {
  const recentProducts = useSelector(
    (state: RootState) => state.recentProducts.products,
  );

  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="px-4 py-8 md:px-8">
      <div className="mb-10 text-center">
        <p
          className={`text-xs font-medium uppercase tracking-[0.3em] ${
            isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
          }`}
        >
          Recent Products
        </p>

        <h1
          className={`mt-3 text-3xl font-semibold md:text-4xl ${
            isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
          }`}
        >
          Recent Viewed Products
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentProducts.map((product: TProduct) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {recentProducts.length > 0 ? (
        <div className="text-center my-8">
          <Link to="/products" className="text-blue-600 hover:underline">
            <button className="btn btn-sm text-black bg-[#e9c46a] hover:text-white">
              View All Products
            </button>
          </Link>
        </div>
      ) : (
        <p
          className={`text-xs text-center font-medium uppercase tracking-[0.3em] ${
            isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
          }`}
        >
          No Recent Products
        </p>
      )}
    </div>
  );
};

export default RecentProductPage;

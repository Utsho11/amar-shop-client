import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store/store";
import ProductCard from "../components/product/ProductCard";

const RecentProductPage = () => {
  const recentProducts = useSelector(
    (state: RootState) => state.recentProducts.products
  );

  return (
    <div className="recent-products">
      <h2 className="text-2xl font-bold mb-4">Recently Viewed Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentProducts.map((product) => (
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
        ""
      )}
    </div>
  );
};

export default RecentProductPage;

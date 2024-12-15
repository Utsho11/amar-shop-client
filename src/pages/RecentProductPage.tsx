import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store/store";

const RecentProductPage = () => {
  const recentProducts = useSelector(
    (state: RootState) => state.recentProducts.products
  );

  return (
    <div className="recent-products">
      <h2 className="text-2xl font-bold mb-4">Recently Viewed Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {recentProducts.map((product) => (
          <div key={product.id} className="card border-2 p-2">
            <Link to={product.link}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center my-8">
        <Link to="/products" className="text-blue-600 hover:underline">
          <button className="btn btn-sm btn-primary">View All Products</button>
        </Link>
      </div>
    </div>
  );
};

export default RecentProductPage;

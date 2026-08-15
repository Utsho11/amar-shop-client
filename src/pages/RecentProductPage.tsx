import RecentlyViewedSection from "../components/home/RecentlyViewedSection";
import { Link } from "react-router-dom";

const RecentProductPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl min-h-[60vh]">
      <RecentlyViewedSection showEmptyState={true} />

      <div className="text-center my-8">
        <Link to="/products" className="btn btn-outline btn-primary rounded-full px-8">
          Explore All Products
        </Link>
      </div>
    </div>
  );
};

export default RecentProductPage;

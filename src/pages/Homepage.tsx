import Banner1 from "../components/home/banner/Banner1";
import CategorySection from "../components/home/CategorySection";
import ProductSection from "../components/home/ProductSection";
import SearchSection from "../components/home/SearchSection";

const Homepage = () => {
  return (
    <div className="space-y-5">
      <Banner1 />
      <SearchSection />
      <CategorySection />
      <ProductSection />
    </div>
  );
};

export default Homepage;

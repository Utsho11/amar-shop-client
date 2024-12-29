import { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import Banner1 from "../components/home/banner/Banner1";
import CategorySection from "../components/home/CategorySection";
import FlashSaleSection from "../components/home/FlashSaleSection";
import ProductSection from "../components/home/ProductSection";
import SearchSection from "../components/home/SearchSection";
import ShopSection from "../components/home/ShopSection";

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle button visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 500,
      smooth: "easeInOutQuad",
    });
  };

  return (
    <div className="space-y-5">
      <Banner1 />
      <SearchSection />
      <CategorySection />
      <ShopSection />
      <FlashSaleSection />
      <ProductSection />

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Homepage;

import { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import Banner1 from "../components/home/banner/Banner1";
import CategorySection from "../components/home/CategorySection";
import FlashSaleSection from "../components/home/FlashSaleSection";
import ProductSection from "../components/home/ProductSection";
// import SearchSection from "../components/home/SearchSection";
import ShopSection from "../components/home/ShopSection";
import PromotionalSec from "../components/home/PromotionalSec";
import CTASection from "../components/home/CTAsection";
import { useTheme } from "../context/ThemeContext";

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

  const { theme } = useTheme();

  return (
    <div className="">
      <Banner1 />
      <CategorySection />
      <ShopSection />
      <FlashSaleSection />
      <PromotionalSec />
      <ProductSection />

      <CTASection theme={theme} />

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 bg-[#A66B55] text-white p-3 rounded-full shadow-lg hover:bg-[#A66B55]"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Homepage;

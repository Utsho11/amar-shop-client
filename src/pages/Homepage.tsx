import { useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import Banner1 from "../components/home/banner/Banner1";
import LiveMarketMetrics from "../components/home/LiveMarketMetrics";
import CategorySection from "../components/home/CategorySection";
import MarketplaceFeatures from "../components/home/MarketplaceFeatures";
import FlashSaleSection from "../components/home/FlashSaleSection";
import ProductSection from "../components/home/ProductSection";
import ShopSection from "../components/home/ShopSection";
import PromotionalSec from "../components/home/PromotionalSec";
import CustomerTestimonials from "../components/home/CustomerTestimonials";
import CTASection from "../components/home/CTAsection";
import RecentlyViewedSection from "../components/home/RecentlyViewedSection";
import { useTheme } from "../context/ThemeContext";
import { ArrowUp } from "lucide-react";

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);

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
    <div className="space-y-4 sm:space-y-8">
      <Banner1 />
      <LiveMarketMetrics />
      <CategorySection />
      <MarketplaceFeatures />
      <ShopSection />
      <FlashSaleSection />
      <PromotionalSec />
      <ProductSection />
      <div className="container mx-auto px-4">
        <RecentlyViewedSection />
      </div>
      <CustomerTestimonials />
      <CTASection theme={theme} />

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 btn btn-circle btn-primary shadow-xl hover:scale-110 transition-transform"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Homepage;

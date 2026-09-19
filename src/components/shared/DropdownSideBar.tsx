import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Info,
  Mail,
  Scale,
  History,
  Menu,
  X,
  Layers,
  Store,
  Search,
  ChevronDown,
} from "lucide-react";
import { useGetCategoriesQuery } from "../../redux/services/categoryApi";
import { useGetAllShopQuery, type TShop } from "../../redux/services/shopApi";

interface DropdownSideBarProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const DropdownSideBar: React.FC<DropdownSideBarProps> = ({
  toggleMenu,
  isMenuOpen,
}) => {
  const navigate = useNavigate();
  const [mobileSearch, setMobileSearch] = useState("");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isShopsOpen, setIsShopsOpen] = useState(false);

  const { data: catData } = useGetCategoriesQuery(null);
  const { data: shopData } = useGetAllShopQuery(null);

  const categories = catData?.data || [];
  const shops = shopData?.data || [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileSearch.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(mobileSearch.trim())}`);
      setMobileSearch("");
      toggleMenu();
    }
  };

  return (
    <div className="dropdown">
      <button
        onClick={toggleMenu}
        className="btn btn-ghost btn-circle btn-md"
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {isMenuOpen && (
        <div
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-3xl z-50 w-72 p-4 shadow-2xl border border-base-200 mt-2 space-y-2 animate-in fade-in max-h-[80vh] overflow-y-auto"
        >
          {/* Mobile Search Bar */}
          <form onSubmit={handleSearchSubmit} className="relative mb-2">
            <input
              type="text"
              placeholder="Search products..."
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              className="input input-bordered input-sm w-full rounded-2xl pl-8 pr-3 text-xs focus:border-primary"
            />
            <Search
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </form>

          {/* Primary Nav Links */}
          <div className="space-y-1">
            <NavLink
              to="/products"
              onClick={toggleMenu}
              className="flex items-center gap-2.5 p-2.5 rounded-xl font-semibold text-xs hover:bg-base-200 transition-colors"
            >
              <ShoppingBag size={16} className="text-primary" />
              <span>All Products</span>
            </NavLink>

            {/* Categories Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl font-semibold text-xs hover:bg-base-200 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Layers size={16} className="text-primary" />
                  <span>Categories</span>
                </div>
                <ChevronDown
                  size={14}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isCategoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isCategoriesOpen && (
                <div className="pl-6 pr-2 py-1 space-y-1">
                  {categories.map((cat: any, idx: number) => (
                    <NavLink
                      key={idx}
                      to={`/products?category=${encodeURIComponent(cat.name)}`}
                      onClick={toggleMenu}
                      className="block p-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-primary hover:bg-base-200 transition-colors truncate"
                    >
                      {cat.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            {/* Shops Accordion */}
            <div>
              <button
                type="button"
                onClick={() => setIsShopsOpen(!isShopsOpen)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl font-semibold text-xs hover:bg-base-200 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5">
                  <Store size={16} className="text-primary" />
                  <span>Partner Boutiques</span>
                </div>
                <ChevronDown
                  size={14}
                  className={`text-gray-400 transition-transform duration-200 ${
                    isShopsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isShopsOpen && (
                <div className="pl-6 pr-2 py-1 space-y-1">
                  {shops.slice(0, 8).map((shop: TShop, idx: number) => (
                    <NavLink
                      key={idx}
                      to={`/shop/${shop.id}`}
                      onClick={toggleMenu}
                      className="flex items-center gap-2 p-1.5 rounded-lg text-xs font-medium text-gray-500 hover:text-primary hover:bg-base-200 transition-colors truncate"
                    >
                      <img
                        src={
                          shop.logoUrl ||
                          "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=60&q=80"
                        }
                        className="w-4 h-4 rounded-md object-cover"
                        alt={shop.name}
                      />
                      <span>{shop.name}</span>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/compare"
              onClick={toggleMenu}
              className="flex items-center gap-2.5 p-2.5 rounded-xl font-semibold text-xs hover:bg-base-200 transition-colors"
            >
              <Scale size={16} className="text-primary" />
              <span>Compare Items</span>
            </NavLink>

            <NavLink
              to="/recent"
              onClick={toggleMenu}
              className="flex items-center gap-2.5 p-2.5 rounded-xl font-semibold text-xs hover:bg-base-200 transition-colors"
            >
              <History size={16} className="text-primary" />
              <span>Recently Viewed</span>
            </NavLink>

            <NavLink
              to="/about"
              onClick={toggleMenu}
              className="flex items-center gap-2.5 p-2.5 rounded-xl font-semibold text-xs hover:bg-base-200 transition-colors"
            >
              <Info size={16} className="text-primary" />
              <span>About Us</span>
            </NavLink>

            <NavLink
              to="/contact"
              onClick={toggleMenu}
              className="flex items-center gap-2.5 p-2.5 rounded-xl font-semibold text-xs hover:bg-base-200 transition-colors"
            >
              <Mail size={16} className="text-primary" />
              <span>Contact Us</span>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownSideBar;

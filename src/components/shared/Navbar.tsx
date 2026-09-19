import { useEffect, useState } from "react";
import { CartIcon, Logo, MoonIcon, SunIcon } from "../icons/icon";
import { Link, NavLink, useNavigate } from "react-router-dom";
import DropdownSideBar from "./DropdownSideBar";
import { useTheme } from "../../context/ThemeContext";
import {
  logout,
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { toast } from "sonner";
import { useGetMeQuery } from "../../redux/services/authApi";
import { clearCart } from "../../redux/features/cartSlice";
import Loading from "./Loading";
import { useGetCategoriesQuery } from "../../redux/services/categoryApi";
import { useGetAllShopQuery, type TShop } from "../../redux/services/shopApi";
import { useGetMyWishlistQuery } from "../../redux/services/orderApi";
import {
  ChevronDown,
  ShoppingCart,
  Heart,
  LayoutDashboard,
  Package,
  Store,
  KeyRound,
  LogOut,
  ShieldCheck,
  User,
  ShoppingBag,
  Layers,
  History,
  Info,
  Scale,
  Search,
} from "lucide-react";
import { iconMap } from "../home/CategorySection";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);

  const handleNavSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch("");
    }
  };

  // Get user details (optional, to show updated avatar)
  const { data, isFetching, refetch } = useGetMeQuery(null, { skip: !token });
  const { data: wishlistData } = useGetMyWishlistQuery(undefined, {
    skip: !user || user.role !== "CUSTOMER",
  });

  const { data: cate } = useGetCategoriesQuery(null);
  const { data: shopData } = useGetAllShopQuery(null);

  const categories = cate?.data || [];
  const shops = shopData?.data || [];
  const wishlistCount = Array.isArray(wishlistData?.data) ? wishlistData.data.length : 0;

  // Trigger a refetch when the token changes
  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(clearCart());
    dispatch(logout());
    localStorage.removeItem("recentProducts");
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <div className={`${theme === "dark" ? "bg-[#141312]" : "bg-[#F9F5F0]"}`}>
      <div className="navbar">
        {/* Dropdown for small screens */}
        <div className="flex md:hidden">
          <DropdownSideBar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
        </div>

        {/* Logo and Brand */}
        <div className="flex-none flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 border-none bg-transparent">
            <Logo />
            <p className="font-extrabold text-base sm:text-lg text-inherit tracking-tight">AmarShop</p>
          </Link>
        </div>

        {/* Global Search Bar (Desktop & Tablet) */}
        <div className="hidden md:flex flex-1 max-w-xs xl:max-w-sm mx-3">
          <form onSubmit={handleNavSearch} className="relative w-full">
            <input
              type="text"
              placeholder="Search products by keyword..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              className="input input-sm rounded-full pl-9 pr-3 w-full bg-base-100 border border-base-200 text-xs focus:border-primary focus:outline-none transition-all shadow-2xs"
            />
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </form>
        </div>

        {/* Links (visible on medium screens and above) */}
        <div className="hidden lg:flex lg:flex-auto items-center gap-1.5 xl:gap-3 text-xs sm:text-sm">
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-2 rounded-full font-semibold transition ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-base-200 hover:text-primary"
              }`
            }
          >
            <ShoppingBag size={15} />
            <span>All Products</span>
          </NavLink>

          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full font-semibold hover:bg-base-200 hover:text-primary cursor-pointer transition"
            >
              <Layers size={15} />
              <span>Categories</span>
              <ChevronDown size={14} className="opacity-70" />
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-base-100 rounded-2xl z-50 w-56 p-2 shadow-xl border border-base-200 top-11"
            >
              {categories?.map((category, idx) => {
                const name = category?.name || "Category";
                const Icon =
                  (iconMap[name.toLowerCase()] as unknown as string) ||
                  ShoppingCart;

                return (
                  <li key={idx}>
                    <Link
                      to={`/products?category=${encodeURIComponent(
                        category.name,
                      )}`}
                      className="font-semibold text-xs py-2 gap-2.5"
                    >
                      <Icon size={15} className="text-primary" />
                      <span>{category.name ? category.name : "No Category"}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center gap-1.5 px-3 py-2 rounded-full font-semibold hover:bg-base-200 hover:text-primary cursor-pointer transition"
            >
              <Store size={15} />
              <span>Shops</span>
              <ChevronDown size={14} className="opacity-70" />
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-base-100 rounded-2xl z-50 w-56 p-2 shadow-xl border border-base-200 top-11"
            >
              {shops?.map((shop: TShop, idx: number) => (
                <li key={idx}>
                  <Link to={`/shop/${shop.id}`} className="font-semibold text-xs py-2 gap-2.5">
                    <img
                      src={shop.logoUrl || "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=60&q=80"}
                      className="w-5 h-5 rounded-md object-cover"
                      alt={shop.name}
                    />
                    <span>{shop.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <NavLink
            to="/compare"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-2 rounded-full font-semibold transition ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-base-200 hover:text-primary"
              }`
            }
          >
            <Scale size={15} />
            <span>Compare</span>
          </NavLink>

          <NavLink
            to="/recent"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-2 rounded-full font-semibold transition ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-base-200 hover:text-primary"
              }`
            }
          >
            <History size={15} />
            <span>Recent</span>
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex items-center gap-1.5 px-3 py-2 rounded-full font-semibold transition ${
                isActive
                  ? "bg-primary text-white"
                  : "hover:bg-base-200 hover:text-primary"
              }`
            }
          >
            <Info size={15} />
            <span>About</span>
          </NavLink>
        </div>

        {/* Theme Toggle and Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center space-x-1.5 sm:space-x-2">
            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-circle btn-sm text-base-content hover:bg-base-200"
              title="Toggle Theme"
              aria-label="Toggle Theme"
            >
              {theme === "light" ? (
                <MoonIcon size={18} />
              ) : (
                <SunIcon size={18} />
              )}
            </button>

            {user?.role === "CUSTOMER" && (
              <button
                className="btn btn-ghost btn-circle btn-sm relative text-rose-500 hover:bg-rose-500/10"
                onClick={() => navigate("/customerDashboard/wishlist")}
                title="My Wishlist"
                aria-label="View Wishlist"
              >
                <Heart size={18} className={wishlistCount > 0 ? "fill-rose-500" : ""} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </button>
            )}

            <Link
              to="/cart"
              className="btn btn-ghost btn-circle btn-sm relative text-base-content hover:bg-base-200"
              title="Shopping Bag"
              aria-label="View Shopping Bag"
            >
              <CartIcon size={18} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-xs">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ring-2 ring-primary/40 hover:ring-primary transition-all"
              >
                {isFetching ? (
                  <Loading />
                ) : (
                  <div className="w-10 rounded-full">
                    <img
                      alt={user.email || "User Avatar"}
                      src={
                        data?.data?.image ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                      }
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <div
                tabIndex={0}
                className="dropdown-content z-50 mt-3 w-72 rounded-3xl bg-base-100 p-4 shadow-2xl border border-base-200 animate-in fade-in slide-in-from-top-2"
              >
                {/* User Header Profile Card */}
                <div className="flex items-center gap-3 pb-3 mb-2 border-b border-base-200">
                  <div className="w-11 h-11 rounded-2xl overflow-hidden bg-primary/10 border border-primary/20 shrink-0">
                    <img
                      src={
                        data?.data?.image ||
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                      }
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs truncate">
                        {data?.data?.name || user.email?.split("@")[0]}
                      </span>
                      <ShieldCheck size={13} className="text-primary shrink-0" />
                    </div>
                    <p className="text-[11px] text-gray-400 truncate font-mono">
                      {user.email}
                    </p>
                    <span className="badge badge-primary badge-xs font-bold uppercase mt-1">
                      {user.role}
                    </span>
                  </div>
                </div>

                {/* Role-Specific Navigation Links */}
                <ul className="space-y-1 text-xs font-bold text-base-content">
                  {user.role === "ADMIN" && (
                    <>
                      <li>
                        <NavLink
                          to="/adminDashboard/profile"
                          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-base-200 hover:text-primary transition"
                        >
                          <LayoutDashboard size={16} className="text-primary" />
                          <span>Admin Control Center</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/adminDashboard/manageUser"
                          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-base-200 hover:text-primary transition"
                        >
                          <User size={16} className="text-primary" />
                          <span>Manage Users</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/adminDashboard/manageShop"
                          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-base-200 hover:text-primary transition"
                        >
                          <Store size={16} className="text-primary" />
                          <span>Manage Shops</span>
                        </NavLink>
                      </li>
                    </>
                  )}

                  {user.role === "VENDOR" && (
                    <>
                      <li>
                        <NavLink
                          to="/vendorDashboard/profile"
                          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-base-200 hover:text-primary transition"
                        >
                          <LayoutDashboard size={16} className="text-primary" />
                          <span>Vendor Dashboard</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/vendorDashboard/myShop"
                          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-base-200 hover:text-primary transition"
                        >
                          <Store size={16} className="text-primary" />
                          <span>My Shop Hub</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/vendorDashboard/manageProducts"
                          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-base-200 hover:text-primary transition"
                        >
                          <Package size={16} className="text-primary" />
                          <span>Manage Products</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/vendorDashboard/orderHistory"
                          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-base-200 hover:text-primary transition"
                        >
                          <ShoppingBag size={16} className="text-primary" />
                          <span>Fulfillment Orders</span>
                        </NavLink>
                      </li>
                    </>
                  )}

                  {user.role === "CUSTOMER" && (
                    <>
                      <li>
                        <NavLink
                          to="/customerDashboard/profile"
                          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-base-200 hover:text-primary transition"
                        >
                          <LayoutDashboard size={16} className="text-primary" />
                          <span>Customer Dashboard</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/customerDashboard/myOrder"
                          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-base-200 hover:text-primary transition"
                        >
                          <Package size={16} className="text-primary" />
                          <span>My Purchases</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/customerDashboard/wishlist"
                          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-base-200 hover:text-primary transition"
                        >
                          <Heart size={16} className="text-rose-500" />
                          <span>My Wishlist ({wishlistCount})</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/customerDashboard/toReview"
                          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-base-200 hover:text-primary transition"
                        >
                          <ShoppingBag size={16} className="text-amber-500" />
                          <span>Review Products</span>
                        </NavLink>
                      </li>
                    </>
                  )}

                  <div className="my-1.5 border-t border-base-200" />

                  <li>
                    <NavLink
                      to="/change-password"
                      className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-base-200 hover:text-primary transition"
                    >
                      <KeyRound size={16} className="text-gray-400" />
                      <span>Security & Password</span>
                    </NavLink>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl text-error hover:bg-error/10 w-full transition"
                    >
                      <LogOut size={16} />
                      <span>Log Out</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div>
              <button
                className={`btn ${
                  theme === "dark" ? "text-white" : ""
                } bg-[#A66B55] text-white hover:bg-[#8d5947] btn-sm`}
              >
                <NavLink to="/auth/login">Login</NavLink>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

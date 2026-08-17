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
} from "lucide-react";
import { iconMap } from "../home/CategorySection";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);

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

        {/* Logo and Shop Section */}
        <div className="flex-auto sm:flex">
          <Link to="/" className="flex border-none bg-transparent">
            <Logo />
            <p className="font-bold text-inherit">AmarShop</p>
          </Link>
        </div>

        {/* Links (visible on medium screens and above) */}
        <div className="hidden lg:flex lg:flex-auto gap-4">
          <NavLink to="/products" className="font-semibold">
            All Products
          </NavLink>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="font-semibold">
              <p className="font-semibold flex items-center">
                Category <ChevronDown size={18} />
              </p>
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm top-10"
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
                      className="font-semibold"
                    >
                      <Icon size={16} />
                      {category.name ? category.name : "No Category"}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="font-semibold">
              <p className="font-semibold flex items-center">
                Shops <ChevronDown size={18} />
              </p>
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm top-10"
            >
              {shops?.map((shop: TShop, idx: number) => (
                <li key={idx} className="">
                  <Link to={`/shop/${shop.id}`} className="font-semibold">
                    <img src={shop.logoUrl} width={30} height={10} />
                    {shop.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <NavLink to="/recent" className="font-semibold">
            Recently Viewed
          </NavLink>
          <NavLink to="/about" className="font-semibold">
            About us
          </NavLink>
        </div>

        {/* Theme Toggle and Profile Dropdown */}
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-3">
            <button onClick={toggleTheme} className="p-1 hover:opacity-80 transition" title="Toggle Theme">
              {theme === "light" ? (
                <MoonIcon size={16} />
              ) : (
                <SunIcon size={16} />
              )}
            </button>

            {user?.role === "CUSTOMER" && (
              <button
                className="relative p-1 hover:opacity-80 transition text-rose-500"
                onClick={() => navigate("/customerDashboard/wishlist")}
                title="My Wishlist"
              >
                <Heart size={18} className={wishlistCount > 0 ? "fill-rose-500" : ""} />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-rose-500 text-xs font-bold text-white w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </button>
            )}

            <button
              className="relative p-1 hover:opacity-80 transition"
              onClick={() => navigate("/customerDashboard/cart")}
              title="My Cart"
            >
              <CartIcon size={16} />
              <span
                className={`${
                  cartItems.length > 0 ? "" : "hidden"
                } absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-xs font-bold text-white w-4 h-4 flex items-center justify-center rounded-full`}
              >
                {cartItems.length}
              </span>
            </button>
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
                          to="/adminDashboard/manage-users"
                          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-base-200 hover:text-primary transition"
                        >
                          <User size={16} className="text-primary" />
                          <span>Manage Users</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/adminDashboard/manage-shops"
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
                          to="/vendorDashboard/my-shop"
                          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-base-200 hover:text-primary transition"
                        >
                          <Store size={16} className="text-primary" />
                          <span>My Shop Hub</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/vendorDashboard/manage-products"
                          className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-base-200 hover:text-primary transition"
                        >
                          <Package size={16} className="text-primary" />
                          <span>Manage Products</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/vendorDashboard/order-history"
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
                          to="/customerDashboard/my-orders"
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
                          to="/customerDashboard/review"
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

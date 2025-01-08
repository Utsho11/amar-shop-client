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

  const { data: cate } = useGetCategoriesQuery(null);

  const categories = cate?.data || [];

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
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <div className="sm:mx-[12rem]">
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
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <details>
                  <summary className="font-semibold text-base">
                    Category
                  </summary>
                  <ul className="">
                    {categories?.map((category, idx) => (
                      <li key={idx}>
                        <Link
                          to={`/products?category=${encodeURIComponent(
                            category.name
                          )}`}
                          className="font-semibold"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
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
          <div className="space-x-3">
            <button onClick={toggleTheme}>
              {theme === "light" ? (
                <MoonIcon size={16} />
              ) : (
                <SunIcon size={16} />
              )}
            </button>
            <button
              className="relative"
              onClick={() => navigate("/customerDashboard/cart")}
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
                className="btn btn-ghost btn-circle avatar"
              >
                {isFetching ? (
                  <Loading />
                ) : (
                  <div className="w-10 rounded-full ring ring-offset-2">
                    <img
                      alt="User Avatar"
                      src={data?.data?.image || "https://tinyurl.com/cwrva2uh"}
                    />
                  </div>
                )}
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {user.role === "ADMIN" ? (
                  <li>
                    <NavLink
                      to="/adminDashboard/profile"
                      className="justify-between"
                    >
                      My dashboard
                      <span className="badge">New</span>
                    </NavLink>
                  </li>
                ) : user.role === "VENDOR" ? (
                  <li>
                    <NavLink
                      to="/vendorDashboard/profile"
                      className="justify-between"
                    >
                      My dashboard
                      <span className="badge">New</span>
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to="/customerDashboard/profile"
                      className="justify-between"
                    >
                      My dashboard
                      <span className="badge">New</span>
                    </NavLink>
                  </li>
                )}
                <li>
                  <NavLink to="change-password">Change Password</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <button
                className={`btn ${
                  theme === "dark" ? "text-white" : ""
                } bg-[#e9c46a] btn-sm`}
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

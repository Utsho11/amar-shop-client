import { useEffect, useState } from "react";
import { CartIcon, Logo, MoonIcon, SunIcon } from "../icons/icon";
import { NavLink, useNavigate } from "react-router-dom";
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

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const navigate = useNavigate();

  // Get user details (optional, to show updated avatar)
  const { data, isFetching, refetch } = useGetMeQuery(null, { skip: !token });

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

  if (isFetching) return <p>Loading...</p>;

  return (
    <div className="">
      <div className="navbar bg-base-100">
        {/* Dropdown for small screens */}
        <div className="flex md:hidden">
          <DropdownSideBar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
        </div>

        {/* Logo and Shop Section */}
        <div className="flex-1 lg:flex-auto">
          <NavLink to="/" className="flex border-none bg-transparent">
            <Logo />
            <p className="font-bold text-inherit">AmarShop</p>
          </NavLink>
        </div>

        {/* Links (visible on medium screens and above) */}
        <div className="hidden md:flex md:flex-1 gap-4">
          <NavLink to="/products" className="font-semibold">
            All Products
          </NavLink>
          <NavLink to="/about" className="font-semibold">
            About us
          </NavLink>
          <NavLink to="/contact" className="font-semibold">
            Contact us
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
              onClick={() => {
                navigate("/cart");
              }}
            >
              <CartIcon size={16} />
            </button>
          </div>
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-offset-2">
                  <img
                    alt="User Avatar"
                    src={data?.data?.image || "https://tinyurl.com/cwrva2uh"}
                  />
                </div>
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
                <NavLink to="auth/login">Login</NavLink>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

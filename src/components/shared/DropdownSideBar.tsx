import React from "react";
import { NavLink } from "react-router-dom";
import {
  ShoppingBag,
  Info,
  Mail,
  Scale,
  History,
  Menu,
  X,
} from "lucide-react";

interface DropdownSideBarProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const DropdownSideBar: React.FC<DropdownSideBarProps> = ({
  toggleMenu,
  isMenuOpen,
}) => {
  return (
    <div className="dropdown">
      <button
        onClick={toggleMenu}
        className="btn btn-ghost btn-circle btn-sm"
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isMenuOpen && (
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-3xl z-50 w-56 p-3 shadow-2xl border border-base-200 mt-2 space-y-1 animate-in fade-in"
        >
          <li>
            <NavLink
              to="/products"
              onClick={toggleMenu}
              className="flex items-center gap-2.5 p-2.5 rounded-xl font-semibold text-xs"
            >
              <ShoppingBag size={16} className="text-primary" />
              <span>All Products</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/compare"
              onClick={toggleMenu}
              className="flex items-center gap-2.5 p-2.5 rounded-xl font-semibold text-xs"
            >
              <Scale size={16} className="text-primary" />
              <span>Compare Items</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recent"
              onClick={toggleMenu}
              className="flex items-center gap-2.5 p-2.5 rounded-xl font-semibold text-xs"
            >
              <History size={16} className="text-primary" />
              <span>Recently Viewed</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={toggleMenu}
              className="flex items-center gap-2.5 p-2.5 rounded-xl font-semibold text-xs"
            >
              <Info size={16} className="text-primary" />
              <span>About Us</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              onClick={toggleMenu}
              className="flex items-center gap-2.5 p-2.5 rounded-xl font-semibold text-xs"
            >
              <Mail size={16} className="text-primary" />
              <span>Contact Us</span>
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DropdownSideBar;

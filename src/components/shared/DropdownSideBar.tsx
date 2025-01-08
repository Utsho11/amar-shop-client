// DropdownSideBar.tsx

import { NavLink } from "react-router-dom";
import { AboutIcon, ContactIcon, ShopIcon } from "../icons/icon";

// Define types for the props
interface DropdownSideBarProps {
  toggleMenu: () => void; // Function that toggles the menu
  isMenuOpen: boolean; // Boolean indicating if the menu is open
}

const DropdownSideBar: React.FC<DropdownSideBarProps> = ({
  toggleMenu,
  isMenuOpen,
}) => {
  return (
    <div className="dropdown">
      {/* Hamburger Menu (for small screens) */}
      <div tabIndex={0} role="button" className="m-1 flex items-center">
        <label className="swap">
          {/* This hidden checkbox controls the state */}
          <input
            type="checkbox"
            onChange={toggleMenu} // Toggle menu visibility when clicked
            checked={isMenuOpen} // Bind state to the checkbox
          />

          {/* Hamburger Icon (visible when menu is closed) */}
          <svg
            className="fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
        </label>
      </div>
      {/* Menu (Dropdown) */}
      <ul
        tabIndex={0}
        className={`dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex flex-col z-20">
          <NavLink to="/products" className="p-2 flex items-center gap-3">
            <ShopIcon size={16} />
            All Products
          </NavLink>
          <NavLink to="/about" className="p-2 flex items-center gap-3">
            <AboutIcon size={16} />
            About us
          </NavLink>
          <NavLink to="/contact" className="p-2 flex items-center gap-3">
            <ContactIcon size={16} />
            Contact us
          </NavLink>
        </div>
      </ul>
    </div>
  );
};

export default DropdownSideBar;

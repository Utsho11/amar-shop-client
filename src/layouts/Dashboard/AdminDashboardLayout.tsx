import { NavLink, Outlet } from "react-router-dom";
import { adminSideLink } from "../../config/admin.site";
import Navbar from "../../components/shared/Navbar";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useTheme } from "../../context/ThemeContext";

const AdminDashboardLayout = () => {
  const { theme } = useTheme();
  return (
    <div className={`${theme === "dark" ? "bg-[#141312]" : "bg-[#F9F5F0]"}`}>
      <header className="sticky top-0 z-20 shadow-md bg-base-100">
        <Navbar />
      </header>
      <div className="grid grid-cols-12">
        <div className="hidden md:block md:col-span-3 lg:col-span-3 border sticky top-12 h-fit">
          <div className="flex gap-1 items-center p-4 sm:p-8">
            <MdOutlineSpaceDashboard size={24} />
            <NavLink
              to="/adminDashboard/profile"
              className="flex border-none bg-transparent"
            >
              <p className="font-bold">Dashboard</p>
            </NavLink>
          </div>
          <div className="divider m-0"></div>
          <ul className="menu text-end text-base-content min-h-[100vh] p-4 sm:p-8 space-y-4">
            {adminSideLink.map((route, index) => (
              <li key={index + 1}>
                <NavLink to={route.path} className="menu-link">
                  {route.icon} {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className={`drawer sm:hidden z-10`}>
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content ">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="flex gap-2 drawer-button items-center fixed top-20 left-4 
               rounded"
            >
              <MdOutlineSpaceDashboard size={24} />
              <NavLink to="/" className="flex border-none bg-transparent">
                <p className="font-bold text-inherit">Dashboard</p>
              </NavLink>
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu bg-base-200 text-base-content min-h-[100vh] pt-[4rem] w-60">
              <div className="divider m-0"></div>
              {adminSideLink.map((route, index) => (
                <li key={index + 1}>
                  <NavLink to={route.path} className="menu-link">
                    {route.icon} {route.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={`col-span-10 md:col-span-9 ${theme === "dark" ? "bg-[#141312]" : "bg-[#F9F5F0]"}`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;

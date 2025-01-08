import { NavLink, Outlet } from "react-router-dom";
import { customerSideLink } from "../../config/customer.site";
import Navbar from "../../components/shared/Navbar";
import { MdOutlineSpaceDashboard } from "react-icons/md";

const CustomerDashboardLayout = () => {
  return (
    <div className="">
      <header className="sticky top-0 z-10 shadow-md bg-base-100">
        <Navbar />
      </header>
      <div className="grid grid-cols-12">
        <div className="hidden sm:block sm:col-span-1"></div>
        <div className="hidden md:block md:col-span-2 lg:col-span-2 border sticky left-0">
          <div className="">
            <div className="flex-1 lg:flex-auto mt-4 ml-16">
              <NavLink
                to="/adminDashboard/profile"
                className="flex border-none bg-transparent"
              >
                <p className="font-bold">Dashboard</p>
              </NavLink>
            </div>
          </div>
          <div className="divider m-0"></div>
          <div className="">
            <ul className="menu text-end text-base-content min-h-[100vh] p-4 ml-8">
              {customerSideLink.map((route, index) => (
                <li key={index + 1}>
                  <NavLink to={route.path} className="menu-link text-end">
                    {route.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="drawer sm:hidden z-0">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label
              htmlFor="my-drawer"
              className="flex gap-2 drawer-button items-center fixed top-20 left-4"
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
              {customerSideLink.map((route, index) => (
                <li key={index + 1}>
                  <NavLink to={route.path} className="menu-link">
                    {route.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-span-10 md:col-span-8">
          <Outlet />
        </div>
        <div className="hidden sm:block sm:col-span-1"></div>
      </div>
    </div>
  );
};

export default CustomerDashboardLayout;

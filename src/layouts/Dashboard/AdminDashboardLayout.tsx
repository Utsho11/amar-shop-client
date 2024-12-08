import { NavLink, Outlet } from "react-router-dom";
import { Logo } from "../../components/icons/icon";
import { adminSideLink } from "../../config/admin.site";

const AdminDashboardLayout = () => {
  return (
    <div className="grid grid-cols-12 min-h-screen">
      <div className="hidden md:block md:col-span-2 lg:col-span-2 col-span-2 sticky top-0 left-0 z-50 border border-red-500">
        <div className="">
          <div className="flex-1 lg:flex-auto mt-4 ml-16">
            <NavLink to="/" className="flex border-none bg-transparent">
              <Logo />
              <p className="font-bold text-inherit">AmarShop</p>
            </NavLink>
          </div>
        </div>
        <div className="divider m-0"></div>
        <div className="bg-base-200">
          <ul className="menu text-base-content min-h-screen p-4 ml-8">
            {adminSideLink.map((route, index) => (
              <li key={index + 1}>
                <NavLink to={route.path} className="menu-link">
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="drawer sm:hidden">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className="flex gap-3 drawer-button items-center fixed top-4 left-4 z-50"
          >
            <svg
              className="fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
            <NavLink to="/" className="flex border-none bg-transparent">
              <Logo />
              <p className="font-bold text-inherit">AmarShop</p>
            </NavLink>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-screen pt-[4rem] w-60">
            <div className="divider m-0"></div>
            {adminSideLink.map((route, index) => (
              <li key={index + 1}>
                <NavLink to={route.path} className="menu-link">
                  {route.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="col-span-10 mx-auto my-24">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;

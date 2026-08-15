import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { customerSideLink } from "../../config/customer.site";
import Navbar from "../../components/shared/Navbar";
import { useTheme } from "../../context/ThemeContext";
import { User, Menu, X, ChevronRight } from "lucide-react";

const CustomerDashboardLayout = () => {
  const { theme } = useTheme();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#141312] text-[#F9F5F0]" : "bg-[#F9F5F0] text-[#3D352F]"}`}>
      <header className="sticky top-0 z-30 shadow-sm backdrop-blur-md bg-base-100/90 border-b border-base-200">
        <Navbar />
      </header>

      {/* Mobile Top Navigation Sub-Bar */}
      <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-base-100 border-b border-base-200 sticky top-16 z-20">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="btn btn-ghost btn-sm gap-2 text-xs font-semibold rounded-xl"
        >
          <Menu size={18} />
          <span>My Account Menu</span>
        </button>
        <span className="badge badge-primary badge-sm font-semibold">CUSTOMER</span>
      </div>

      <div className="flex w-full">
        {/* Desktop Sticky Sidebar */}
        <aside
          className={`hidden lg:flex flex-col w-72 shrink-0 border-r border-base-200 min-h-[calc(100vh-4rem)] sticky top-16 p-6 ${
            isDark ? "bg-[#171514]" : "bg-white"
          }`}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-3 py-3 mb-6 rounded-2xl bg-primary/10 text-primary">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
              <User size={20} />
            </div>
            <div>
              <h3 className="font-bold text-sm leading-tight text-base-content">Customer Portal</h3>
              <p className="text-[11px] text-gray-500 font-medium">Orders & Preferences</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2 flex-1">
            {customerSideLink.map((route, index) => (
              <NavLink
                key={index}
                to={route.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold tracking-wide transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-lg shadow-primary/30 scale-[1.02]"
                      : "text-gray-700 dark:text-zinc-200 hover:bg-base-200 hover:text-primary"
                  }`
                }
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-lg">{route.icon}</span>
                  <span className="leading-none">{route.label}</span>
                </div>
                <ChevronRight size={16} className="opacity-70" />
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Mobile Drawer */}
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-in fade-in"
              onClick={() => setIsMobileOpen(false)}
            />
            <div
              className={`relative flex flex-col w-72 max-w-[85%] h-full p-6 shadow-2xl z-10 animate-in slide-in-from-left duration-300 ${
                isDark ? "bg-[#171514] text-[#F9F5F0]" : "bg-white text-[#3D352F]"
              }`}
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-base-200">
                <div className="flex items-center gap-2">
                  <User size={20} className="text-primary" />
                  <span className="font-bold text-base">Customer Navigation</span>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="btn btn-ghost btn-circle btn-xs"
                >
                  <X size={18} />
                </button>
              </div>

              <nav className="space-y-2 flex-1 overflow-y-auto">
                {customerSideLink.map((route, index) => (
                  <NavLink
                    key={index}
                    to={route.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-bold transition ${
                        isActive
                          ? "bg-primary text-white shadow-md"
                          : "text-gray-700 dark:text-zinc-200 hover:bg-base-200 hover:text-primary"
                      }`
                    }
                  >
                    <span className="text-lg">{route.icon}</span>
                    <span>{route.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CustomerDashboardLayout;

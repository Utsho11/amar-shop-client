import { useGetAdminDashboardStatsQuery } from "../../redux/services/userApi";
import { useTheme } from "../../context/ThemeContext";
import Loading from "../../components/shared/Loading";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Store,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  Tag,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import { useGetMeQuery } from "../../redux/services/authApi";

const AdminProfile = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { data: statsResponse, isLoading } = useGetAdminDashboardStatsQuery(null);
  const { data: userData } = useGetMeQuery(null);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  const stats = statsResponse?.data || {
    totalRevenue: 0,
    totalUsers: 0,
    totalShops: 0,
    totalOrders: 0,
    monthlyRevenue: [],
    recentOrders: [],
    topCategories: [],
  };

  const user = userData?.data;

  const statCards = [
    {
      title: "Platform Revenue",
      value: `$${Number(stats.totalRevenue).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: DollarSign,
      change: "+14.8% vs last month",
      bg: "from-amber-500/10 to-[#A66B55]/10",
      iconBg: "bg-[#A66B55] text-white",
    },
    {
      title: "Completed Orders",
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingBag,
      change: "All-time paid",
      bg: "from-emerald-500/10 to-teal-500/10",
      iconBg: "bg-emerald-600 text-white",
    },
    {
      title: "Active Accounts",
      value: stats.totalUsers.toLocaleString(),
      icon: Users,
      change: "Customers & Vendors",
      bg: "from-blue-500/10 to-indigo-500/10",
      iconBg: "bg-blue-600 text-white",
    },
    {
      title: "Verified Shops",
      value: stats.totalShops.toLocaleString(),
      icon: Store,
      change: "Active merchant stores",
      bg: "from-purple-500/10 to-pink-500/10",
      iconBg: "bg-purple-600 text-white",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden ${
          isDark
            ? "bg-gradient-to-r from-[#211E1D] to-[#171514] border-white/10"
            : "bg-gradient-to-r from-white to-[#F9F5F0] border-base-200"
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
              alt="Admin"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-primary shadow-md"
            />
            <div className="absolute -bottom-1 -right-1 bg-primary text-white p-1 rounded-full text-[10px]">
              <ShieldCheck size={12} />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold">
                Welcome back, {user?.name || "System Admin"}!
              </h1>
              <span className="badge badge-primary badge-xs uppercase font-bold">Root</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
              Here's what's happening across Amar Shop platform today.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link to="/adminDashboard/manageShop" className="btn btn-sm btn-primary rounded-xl font-semibold gap-1.5 shadow-sm">
            <Store size={14} />
            Manage Shops
          </Link>
          <Link to="/adminDashboard/manageUser" className="btn btn-sm btn-outline rounded-xl font-semibold gap-1.5">
            <Users size={14} />
            Manage Users
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`p-6 rounded-3xl border shadow-sm transition hover:shadow-md ${
              isDark
                ? "bg-[#171514] border-white/10"
                : "bg-white border-base-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {card.title}
              </span>
              <div className={`p-2.5 rounded-2xl ${card.iconBg}`}>
                <card.icon size={18} />
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {card.value}
              </h2>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] text-gray-500 dark:text-zinc-400">
                <TrendingUp size={12} className="text-emerald-500" />
                <span>{card.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Performance Area Chart */}
        <div
          className={`lg:col-span-8 p-6 sm:p-8 rounded-3xl border shadow-sm ${
            isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold">Revenue Performance Trend</h2>
              <p className="text-xs text-gray-500">Monthly gross sales volume for current fiscal year</p>
            </div>
            <span className="badge badge-secondary badge-sm font-semibold">
              Live DB Telemetry
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.monthlyRevenue} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#A66B55" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#A66B55" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={isDark ? 0.1 : 0.4} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke={isDark ? "#71717A" : "#A1A1AA"} />
                <YAxis tick={{ fontSize: 12 }} stroke={isDark ? "#71717A" : "#A1A1AA"} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid #e5e7eb",
                    backgroundColor: isDark ? "#171514" : "#ffffff",
                    color: isDark ? "#ffffff" : "#000000",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                  formatter={(value: any) => [`$${Number(value).toFixed(2)}`, "Revenue"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#A66B55"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Admin Actions & Category Distribution */}
        <div
          className={`lg:col-span-4 p-6 sm:p-8 rounded-3xl border shadow-sm flex flex-col justify-between ${
            isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
          }`}
        >
          <div>
            <h2 className="text-lg font-bold mb-1">Catalog Categories</h2>
            <p className="text-xs text-gray-500 mb-4">Product density by category</p>
            <div className="space-y-3">
              {stats.topCategories.slice(0, 5).map((cat: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-base-200 text-xs font-medium">
                  <div className="flex items-center gap-2.5">
                    <Tag size={14} className="text-primary" />
                    <span>{cat.name}</span>
                  </div>
                  <span className="badge badge-primary badge-sm font-semibold">{cat.productCount} Items</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-base-200">
            <h3 className="text-xs font-bold text-gray-500 uppercase mb-3">Quick Navigation</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/adminDashboard/addCategory" className="btn btn-xs btn-outline rounded-xl">
                + Category
              </Link>
              <Link to="/adminDashboard/createCoupon" className="btn btn-xs btn-outline rounded-xl">
                + Coupon
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Platform Orders Table */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border shadow-sm ${
          isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold">Recent Platform Orders</h2>
            <p className="text-xs text-gray-500">Latest completed customer orders across all stores</p>
          </div>
          <Link
            to="/adminDashboard/viewTransaction"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>All Transactions</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-xs">
            <thead>
              <tr className="text-gray-500 dark:text-zinc-400">
                <th>Order ID</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Fulfillment</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No recent orders found.
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover">
                    <td className="font-mono font-medium text-[11px] text-gray-500">
                      #{order.id.slice(-8)}
                    </td>
                    <td>
                      <div className="font-semibold">{order.customer?.name || "Customer"}</div>
                      <div className="text-[10px] text-gray-500">{order.customerEmail}</div>
                    </td>
                    <td className="font-bold text-primary">
                      ${Number(order.totalAmount).toFixed(2)}
                    </td>
                    <td>
                      <span
                        className={`badge badge-xs font-semibold uppercase ${
                          order.status === "DELIVERED"
                            ? "badge-success"
                            : order.status === "PROCESSING"
                            ? "badge-warning"
                            : order.status === "SHIPPED"
                            ? "badge-info"
                            : "badge-ghost"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;

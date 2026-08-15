import { useGetVendorDashboardStatsQuery, useUpdateOrderStatusMutation } from "../../redux/services/vendorApi";
import { useTheme } from "../../context/ThemeContext";
import Loading from "../../components/shared/Loading";
import {
  DollarSign,
  Package,
  Clock,
  Star,
  Store,
  PlusCircle,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const VendorProfile = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { data: statsResponse, isLoading } = useGetVendorDashboardStatsQuery(null);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  const stats = statsResponse?.data || {
    shop: null,
    shopRevenue: 0,
    totalProducts: 0,
    pendingOrdersCount: 0,
    completedOrdersCount: 0,
    averageRating: 0,
    totalReviews: 0,
    monthlySales: [],
    recentOrders: [],
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus({ orderId, status: newStatus }).unwrap();
      toast.success(`Order status updated to ${newStatus}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update order status");
    }
  };

  const statCards = [
    {
      title: "Store Earnings",
      value: `$${Number(stats.shopRevenue).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: DollarSign,
      change: "Net item revenue",
      iconBg: "bg-[#A66B55] text-white",
    },
    {
      title: "Active Products",
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      change: "Items in catalog",
      iconBg: "bg-emerald-600 text-white",
    },
    {
      title: "Orders to Fulfill",
      value: stats.pendingOrdersCount.toLocaleString(),
      icon: Clock,
      change: "Pending & Processing",
      iconBg: "bg-amber-600 text-white",
    },
    {
      title: "Store Reputation",
      value: `${stats.averageRating ? stats.averageRating.toFixed(1) : "5.0"} ★`,
      icon: Star,
      change: `Based on ${stats.totalReviews} reviews`,
      iconBg: "bg-purple-600 text-white",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Shop Header Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden ${
          isDark
            ? "bg-gradient-to-r from-[#211E1D] to-[#171514] border-white/10"
            : "bg-gradient-to-r from-white to-[#F9F5F0] border-base-200"
        }`}
      >
        <div className="flex items-center gap-4">
          <img
            src={stats.shop?.logoUrl || "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=200&q=80"}
            alt={stats.shop?.name || "Shop Logo"}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-secondary shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold">
                {stats.shop?.name || "My Store"}
              </h1>
              {stats.shop?.isBlacklisted ? (
                <span className="badge badge-error badge-xs font-semibold gap-1">
                  <AlertTriangle size={10} /> Blacklisted
                </span>
              ) : (
                <span className="badge badge-secondary badge-xs font-semibold gap-1">
                  <ShieldCheck size={10} /> Verified Merchant
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
              Store performance overview & fulfillment pipeline.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link to="/vendorDashboard/addProduct" className="btn btn-sm btn-primary rounded-xl font-semibold gap-1.5 shadow-sm">
            <PlusCircle size={14} />
            Add Product
          </Link>
          <Link to="/vendorDashboard/manageProducts" className="btn btn-sm btn-outline rounded-xl font-semibold gap-1.5">
            <Package size={14} />
            My Catalog
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

      {/* Monthly Sales Chart & Fulfillment Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Trend Bar Chart */}
        <div
          className={`lg:col-span-8 p-6 sm:p-8 rounded-3xl border shadow-sm ${
            isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold">Store Sales Performance</h2>
              <p className="text-xs text-gray-500">Monthly revenue earned from your catalog products</p>
            </div>
            <span className="badge badge-primary badge-sm font-semibold">
              Fiscal Year
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.monthlySales} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                  formatter={(value: any) => [`$${Number(value).toFixed(2)}`, "Sales"]}
                />
                <Bar dataKey="revenue" fill="#A66B55" radius={[8, 8, 0, 0]}>
                  {stats.monthlySales.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#A66B55" : "#E9C46A"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Merchant Controls */}
        <div
          className={`lg:col-span-4 p-6 sm:p-8 rounded-3xl border shadow-sm flex flex-col justify-between ${
            isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
          }`}
        >
          <div>
            <h2 className="text-lg font-bold mb-1">Store Actions</h2>
            <p className="text-xs text-gray-500 mb-6">Quick merchant management shortcuts</p>

            <div className="space-y-3">
              <Link
                to="/vendorDashboard/addProduct"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-base-200 hover:bg-primary hover:text-white transition group text-xs font-semibold"
              >
                <div className="flex items-center gap-3">
                  <PlusCircle size={16} className="text-primary group-hover:text-white" />
                  <span>List New Product</span>
                </div>
                <ArrowUpRight size={14} className="opacity-60" />
              </Link>

              <Link
                to="/vendorDashboard/orderHistory"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-base-200 hover:bg-primary hover:text-white transition group text-xs font-semibold"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag size={16} className="text-primary group-hover:text-white" />
                  <span>Fulfillment History</span>
                </div>
                <ArrowUpRight size={14} className="opacity-60" />
              </Link>

              <Link
                to="/vendorDashboard/myShop"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-base-200 hover:bg-primary hover:text-white transition group text-xs font-semibold"
              >
                <div className="flex items-center gap-3">
                  <Store size={16} className="text-primary group-hover:text-white" />
                  <span>Edit Shop Profile</span>
                </div>
                <ArrowUpRight size={14} className="opacity-60" />
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-base-200 text-center">
            <p className="text-[11px] text-gray-500">
              Need assistance? Check the merchant guidelines in the help center.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders / Fulfillment Pipeline */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border shadow-sm ${
          isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold">Recent Store Orders</h2>
            <p className="text-xs text-gray-500">Items ordered by customers requiring fulfillment</p>
          </div>
          <Link
            to="/vendorDashboard/orderHistory"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            <span>Full Order Pipeline</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-xs">
            <thead>
              <tr className="text-gray-500 dark:text-zinc-400">
                <th>Product</th>
                <th>Price & Qty</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No recent store orders yet.
                  </td>
                </tr>
              ) : (
                stats.recentOrders.map((item: any) => (
                  <tr key={item.id} className="hover">
                    <td>
                      <div className="flex items-center gap-3">
                        <img
                          src={item.productImage?.[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=100&q=80"}
                          alt={item.productName}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <div>
                          <div className="font-semibold">{item.productName}</div>
                          <div className="font-mono text-[10px] text-gray-500">Order #{item.orderId.slice(-6)}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="font-bold text-primary">${Number(item.productPrice).toFixed(2)}</div>
                      <div className="text-[10px] text-gray-500">Qty: {item.quantity}</div>
                    </td>
                    <td className="text-gray-500">{item.customerEmail}</td>
                    <td>
                      <span
                        className={`badge badge-xs font-semibold uppercase ${
                          item.orderStatus === "DELIVERED"
                            ? "badge-success"
                            : item.orderStatus === "PROCESSING"
                            ? "badge-warning"
                            : item.orderStatus === "SHIPPED"
                            ? "badge-info"
                            : "badge-ghost"
                        }`}
                      >
                        {item.orderStatus}
                      </span>
                    </td>
                    <td>
                      <select
                        value={item.orderStatus}
                        onChange={(e) => handleStatusChange(item.orderId, e.target.value)}
                        className="select select-bordered select-xs rounded-xl font-medium"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="PROCESSING">PROCESSING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                      </select>
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

export default VendorProfile;

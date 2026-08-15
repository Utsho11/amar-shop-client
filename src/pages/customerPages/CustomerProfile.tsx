import { useGetCustomerDashboardStatsQuery } from "../../redux/services/orderApi";
import { useGetMeQuery } from "../../redux/services/authApi";
import { useTheme } from "../../context/ThemeContext";
import Loading from "../../components/shared/Loading";
import {
  DollarSign,
  ShoppingBag,
  Truck,
  Heart,
  Star,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import OrderTimeline from "../../components/customer/OrderTimeline";

const CustomerProfile = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { data: statsResponse, isLoading } = useGetCustomerDashboardStatsQuery(null);
  const { data: userData } = useGetMeQuery(null);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  const stats = statsResponse?.data || {
    lifetimeSpend: 0,
    totalOrders: 0,
    inTransitOrdersCount: 0,
    wishlistCount: 0,
    reviewsGiven: 0,
    activeDeliveries: [],
    recentOrders: [],
  };

  const user = userData?.data;

  const statCards = [
    {
      title: "Lifetime Spend",
      value: `$${Number(stats.lifetimeSpend).toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`,
      icon: DollarSign,
      change: "All completed orders",
      iconBg: "bg-[#A66B55] text-white",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      icon: ShoppingBag,
      change: "Lifetime purchases",
      iconBg: "bg-emerald-600 text-white",
    },
    {
      title: "Orders in Transit",
      value: stats.inTransitOrdersCount.toLocaleString(),
      icon: Truck,
      change: "Actively progressing",
      iconBg: "bg-blue-600 text-white",
    },
    {
      title: "Saved to Wishlist",
      value: stats.wishlistCount.toLocaleString(),
      icon: Heart,
      change: "Favorite products",
      iconBg: "bg-pink-600 text-white",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Customer Header Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden ${
          isDark
            ? "bg-gradient-to-r from-[#211E1D] to-[#171514] border-white/10"
            : "bg-gradient-to-r from-white to-[#F9F5F0] border-base-200"
        }`}
      >
        <div className="flex items-center gap-4">
          <img
            src={user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"}
            alt={user?.name || "Customer"}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-primary shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold">
                Hello, {user?.name || "Valued Customer"}!
              </h1>
              <span className="badge badge-primary badge-xs font-semibold gap-1">
                <Sparkles size={10} /> Member
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">
              Track active package shipments, purchase history, and saved wishlist items.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link to="/products" className="btn btn-sm btn-primary rounded-xl font-semibold gap-1.5 shadow-sm">
            <ShoppingBag size={14} />
            Continue Shopping
          </Link>
          <Link to="/customerDashboard/wishlist" className="btn btn-sm btn-outline rounded-xl font-semibold gap-1.5">
            <Heart size={14} />
            View Wishlist
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
              <p className="text-[11px] text-gray-500 dark:text-zinc-400 mt-1">
                {card.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Live Order Tracking Hub */}
      {stats.activeDeliveries.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Active Deliveries</h2>
              <p className="text-xs text-gray-500">Live order status progression for items currently in transit</p>
            </div>
            <Link
              to="/customerDashboard/myOrders"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>View All Orders</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {stats.activeDeliveries.map((delivery: any) => (
              <div
                key={delivery.id}
                className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
                  isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-base-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-gray-500">
                        Order #{delivery.id.slice(-8)}
                      </span>
                      <span className="badge badge-primary badge-sm font-semibold uppercase">
                        {delivery.orderStatus}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <Clock size={12} />
                      <span>Placed on {new Date(delivery.createdAt).toLocaleDateString()}</span>
                      {delivery.shippingCity && (
                        <>
                          <span>•</span>
                          <MapPin size={12} />
                          <span>Delivering to {delivery.shippingCity}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="font-bold text-lg text-primary">
                    ${Number(delivery.totalAmount).toFixed(2)}
                  </div>
                </div>

                {/* 4-Stage Visual Tracker */}
                <div className="py-2">
                  <OrderTimeline status={delivery.orderStatus} />
                </div>

                {/* Order Items Preview */}
                <div className="flex flex-wrap gap-3 pt-2">
                  {delivery.items.map((item: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-base-200 text-xs font-medium"
                    >
                      <img
                        src={item.productImage || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=100&q=80"}
                        alt={item.productName}
                        className="w-6 h-6 rounded-md object-cover"
                      />
                      <span>{item.productName}</span>
                      <span className="text-gray-400">×{item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Navigation Cards & Recent Purchases */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quick Customer Shortcuts */}
        <div
          className={`lg:col-span-4 p-6 sm:p-8 rounded-3xl border shadow-sm flex flex-col justify-between ${
            isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
          }`}
        >
          <div>
            <h2 className="text-lg font-bold mb-1">My Account Hub</h2>
            <p className="text-xs text-gray-500 mb-6">Quick shortcuts to manage your activity</p>

            <div className="space-y-3">
              <Link
                to="/customerDashboard/myOrders"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-base-200 hover:bg-primary hover:text-white transition group text-xs font-semibold"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag size={16} className="text-primary group-hover:text-white" />
                  <span>My Purchase History</span>
                </div>
                <ArrowUpRight size={14} className="opacity-60" />
              </Link>

              <Link
                to="/customerDashboard/wishlist"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-base-200 hover:bg-primary hover:text-white transition group text-xs font-semibold"
              >
                <div className="flex items-center gap-3">
                  <Heart size={16} className="text-primary group-hover:text-white" />
                  <span>Saved Wishlist ({stats.wishlistCount})</span>
                </div>
                <ArrowUpRight size={14} className="opacity-60" />
              </Link>

              <Link
                to="/customerDashboard/review"
                className="flex items-center justify-between p-3.5 rounded-2xl bg-base-200 hover:bg-primary hover:text-white transition group text-xs font-semibold"
              >
                <div className="flex items-center gap-3">
                  <Star size={16} className="text-primary group-hover:text-white" />
                  <span>Product Review Center</span>
                </div>
                <ArrowUpRight size={14} className="opacity-60" />
              </Link>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-base-200 text-center">
            <p className="text-[11px] text-gray-500">
              Need help with a return or refund? Check our 24/7 customer support.
            </p>
          </div>
        </div>

        {/* Recent Purchases Table */}
        <div
          className={`lg:col-span-8 p-6 sm:p-8 rounded-3xl border shadow-sm ${
            isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold">Recent Purchases</h2>
              <p className="text-xs text-gray-500">History of your completed and delivered orders</p>
            </div>
            <Link
              to="/customerDashboard/myOrders"
              className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
            >
              <span>All Orders</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-xs">
              <thead>
                <tr className="text-gray-500 dark:text-zinc-400">
                  <th>Order</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-6 text-gray-500">
                      No orders placed yet.
                    </td>
                  </tr>
                ) : (
                  stats.recentOrders.map((order: any) => (
                    <tr key={order.id} className="hover">
                      <td className="font-mono font-medium text-[11px] text-gray-500">
                        #{order.id.slice(-8)}
                      </td>
                      <td>
                        <div className="font-semibold">
                          {order.items?.[0]?.productName || "Product"}
                          {order.itemCount > 1 && ` +${order.itemCount - 1} more`}
                        </div>
                      </td>
                      <td className="font-bold text-primary">
                        ${Number(order.totalAmount).toFixed(2)}
                      </td>
                      <td>
                        <span
                          className={`badge badge-xs font-semibold uppercase ${
                            order.orderStatus === "DELIVERED"
                              ? "badge-success"
                              : order.orderStatus === "PROCESSING"
                              ? "badge-warning"
                              : order.orderStatus === "SHIPPED"
                              ? "badge-info"
                              : "badge-ghost"
                          }`}
                        >
                          {order.orderStatus}
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
    </div>
  );
};

export default CustomerProfile;

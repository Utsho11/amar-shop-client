import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { TOrderHistory, TOrderStatus } from "../../types";
import { useGetOrderHistoryForCustomerQuery } from "../../redux/services/orderApi";
import { useTheme } from "../../context/ThemeContext";
import { useSearchParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";
import { toast } from "sonner";
import OrderTimeline from "../../components/customer/OrderTimeline";
import { Package, MapPin, CreditCard, ShoppingBag } from "lucide-react";

const ITEMS_PER_PAGE = 4;

const getStatusBadge = (status?: TOrderStatus) => {
  switch (status) {
    case "PENDING":
      return <span className="badge badge-warning text-xs font-semibold">Order Placed</span>;
    case "PROCESSING":
      return <span className="badge badge-info text-xs font-semibold">Processing</span>;
    case "SHIPPED":
      return <span className="badge badge-primary text-xs font-semibold">Shipped</span>;
    case "DELIVERED":
    case "COMPLETED":
      return <span className="badge badge-success text-xs font-semibold text-white">Delivered</span>;
    case "CANCELLED":
      return <span className="badge badge-error text-xs font-semibold text-white">Cancelled</span>;
    default:
      return <span className="badge badge-ghost text-xs font-semibold">Paid</span>;
  }
};

const MyOrders = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading } = useGetOrderHistoryForCustomerQuery(null);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      dispatch(clearCart());
      toast.success("Payment completed successfully! Your order has been placed.", {
        duration: 4000,
      });
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [searchParams, dispatch]);

  const orders: TOrderHistory[] = data?.data || [];
  const pageCount = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const paginatedOrders = orders.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <p
          className={`text-xs font-semibold uppercase tracking-[0.3em] ${
            isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
          }`}
        >
          Order Tracking
        </p>

        <h1
          className={`mt-2 text-3xl font-bold md:text-4xl ${
            isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
          }`}
        >
          My Orders & Delivery Status
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Track the live delivery progress of all your purchases
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 bg-base-100 rounded-3xl border border-base-200 p-8 shadow-sm">
          <ShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-xl font-bold mb-2">No orders placed yet</h3>
          <p className="text-sm text-gray-500 mb-6">
            When you purchase items, you will be able to track their delivery stages right here.
          </p>
          <Link to="/products" className="btn btn-primary btn-sm rounded-full px-6">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {paginatedOrders.map((order, idx) => (
            <div
              key={order.id || idx}
              className={`rounded-3xl border p-6 transition-shadow duration-300 hover:shadow-md ${
                isDark
                  ? "bg-[#211E1D] border-white/10"
                  : "bg-white border-[#E8DED2]"
              }`}
            >
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-base-200">
                <div className="flex items-center gap-3">
                  <Package className="text-[#A66B55]" size={22} />
                  <div>
                    <span className="text-xs text-gray-400 font-mono">
                      TRX: {order.transactionId || "N/A"}
                    </span>
                    <h3 className="text-base font-semibold leading-tight line-clamp-1">
                      {order.productName}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {getStatusBadge(order.orderStatus)}
                </div>
              </div>

              {/* Visual Step Timeline Tracker */}
              <div className="my-2">
                <OrderTimeline
                  status={order.orderStatus || "PENDING"}
                  date={order.createdAt}
                  shippingCity={order.shippingCity}
                />
              </div>

              {/* Order Info Footer */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-base-200 text-xs text-gray-600 dark:text-zinc-400">
                <div className="flex items-center gap-3">
                  <img
                    src={order.productImage || "/placeholder.png"}
                    alt={order.productName}
                    className="w-12 h-12 object-cover rounded-xl border"
                  />
                  <div>
                    <p className="font-semibold text-sm text-base-content">
                      ${(Number(order.productPrice) * order.quantity).toFixed(2)}
                    </p>
                    <p>Qty: {order.quantity} × ${Number(order.productPrice).toFixed(2)}</p>
                  </div>
                </div>

                {order.shippingAddress ? (
                  <div className="flex items-start gap-2">
                    <MapPin size={16} className="text-[#A66B55] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-base-content block">Shipping Address:</span>
                      <p className="line-clamp-2">{order.shippingAddress}, {order.shippingCity}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span>Standard Express Delivery</span>
                  </div>
                )}

                <div className="flex items-center md:justify-end gap-2">
                  <CreditCard size={16} className="text-green-600" />
                  <span className="font-medium text-green-700 dark:text-green-400">
                    Payment Verified (PAID)
                  </span>
                </div>
              </div>
            </div>
          ))}

          {pageCount > 1 && (
            <div className="pt-6">
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                breakLabel={"..."}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName="flex justify-center items-center gap-2 my-4"
                pageClassName="inline-block"
                pageLinkClassName="px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-[#A66B55] hover:text-white transition text-sm"
                previousClassName="px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-[#A66B55] hover:text-white transition text-sm"
                nextClassName="px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-lg hover:bg-[#A66B55] hover:text-white transition text-sm"
                disabledClassName="opacity-40 cursor-not-allowed"
                activeClassName="bg-[#A66B55] text-white font-bold"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyOrders;

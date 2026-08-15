import { useState } from "react";
import ReactPaginate from "react-paginate";
import Loading from "../../components/shared/Loading";
import {
  useGetOrderHistoryForVendorQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/services/vendorApi";
import { TOrderHistory, TOrderStatus } from "../../types";
import { useTheme } from "../../context/ThemeContext";
import { toast } from "sonner";
import { MapPin, User, Package } from "lucide-react";

const ITEMS_PER_PAGE = 6;

const STATUS_OPTIONS: { value: TOrderStatus; label: string }[] = [
  { value: "PENDING", label: "Order Placed" },
  { value: "PROCESSING", label: "Processing" },
  { value: "SHIPPED", label: "Shipped" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];

const getStatusBadgeClass = (status?: TOrderStatus) => {
  switch (status) {
    case "PENDING":
      return "badge-warning";
    case "PROCESSING":
      return "badge-info";
    case "SHIPPED":
      return "badge-primary";
    case "DELIVERED":
    case "COMPLETED":
      return "badge-success text-white";
    case "CANCELLED":
      return "badge-error text-white";
    default:
      return "badge-ghost";
  }
};

const OrderHistory = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { data, isLoading } = useGetOrderHistoryForVendorQuery(null);
  const [updateOrderStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (isLoading) {
    return <Loading />;
  }

  const orders: TOrderHistory[] = data?.data || [];
  const pageCount = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const paginatedOrders = orders.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus({ orderId, status: newStatus }).unwrap();
      toast.success(`Order status updated to ${newStatus}`);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update order status");
    }
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="mb-8 text-center sm:text-left">
        <p
          className={`text-xs font-semibold uppercase tracking-[0.3em] ${
            isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
          }`}
        >
          Vendor Management
        </p>

        <h1
          className={`mt-2 text-3xl font-bold ${
            isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
          }`}
        >
          Customer Orders & Fulfillment
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage incoming orders and update delivery pipeline stages
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 bg-base-100 rounded-3xl border border-base-200 p-8 shadow-sm">
          <Package className="mx-auto text-gray-400 mb-3" size={40} />
          <h3 className="text-lg font-bold">No orders received yet</h3>
          <p className="text-sm text-gray-500">
            Orders placed for your shop products will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-base-200 shadow-sm bg-base-100">
          <table className="table w-full">
            <thead className="bg-base-200/60 text-xs uppercase tracking-wider">
              <tr>
                <th>Product</th>
                <th>Customer & Address</th>
                <th>Qty / Total</th>
                <th>Current Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200 text-sm">
              {paginatedOrders.map((item, idx) => (
                <tr key={item.id || idx} className="hover:bg-base-200/30 transition">
                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={item.productImage || "/placeholder.png"}
                        alt={item.productName}
                        className="w-12 h-12 rounded-xl object-cover border"
                      />
                      <div>
                        <p className="font-semibold line-clamp-1">{item.productName}</p>
                        <span className="text-xs font-mono text-gray-400 block">
                          TRX: {item.transactionId || "N/A"}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-base-content font-medium">
                        <User size={13} className="text-[#A66B55]" />
                        <span>{item.customerEmail}</span>
                      </div>
                      {item.shippingAddress ? (
                        <div className="flex items-start gap-1.5 text-xs text-gray-500">
                          <MapPin size={13} className="shrink-0 mt-0.5" />
                          <span className="line-clamp-1">
                            {item.shippingAddress}, {item.shippingCity} ({item.shippingPhone})
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">Standard Delivery</span>
                      )}
                    </div>
                  </td>

                  <td>
                    <p className="font-semibold text-base-content">
                      ${(Number(item.productPrice) * item.quantity).toFixed(2)}
                    </p>
                    <span className="text-xs text-gray-500">
                      {item.quantity} × ${Number(item.productPrice).toFixed(2)}
                    </span>
                  </td>

                  <td>
                    <span className={`badge ${getStatusBadgeClass(item.orderStatus)} text-xs font-semibold`}>
                      {item.orderStatus || "PAID"}
                    </span>
                  </td>

                  <td>
                    {item.orderId ? (
                      <select
                        disabled={isUpdating}
                        value={item.orderStatus || "PENDING"}
                        onChange={(e) => handleStatusChange(item.orderId!, e.target.value)}
                        className="select select-bordered select-xs w-full max-w-[140px] font-medium"
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-xs text-gray-400">N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {pageCount > 1 && (
        <div className="mt-8">
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
  );
};

export default OrderHistory;

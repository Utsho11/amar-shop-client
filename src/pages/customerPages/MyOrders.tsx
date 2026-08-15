import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import ASOrderTable from "../../components/table/ASOrderTable";
import { TOrderHistory } from "../../types";
import { useGetOrderHistoryForCustomerQuery } from "../../redux/services/orderApi";
import { useTheme } from "../../context/ThemeContext";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";
import { toast } from "sonner";

interface Column<T> {
  key: keyof T;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T) => React.ReactNode;
}

const ITEMS_PER_PAGE = 5;

const MyOrders = () => {
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const { data, isLoading } = useGetOrderHistoryForCustomerQuery(null);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams.get("payment") === "success") {
      dispatch(clearCart());
      toast.success("Payment completed successfully! Your order has been placed.", {
        duration: 4000,
      });
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [searchParams, dispatch]);

  // Paginated Data
  const pageCount = Math.ceil((data?.data?.length || 0) / ITEMS_PER_PAGE);
  const paginatedOrderHistorys =
    data?.data?.slice(
      currentPage * ITEMS_PER_PAGE,
      (currentPage + 1) * ITEMS_PER_PAGE,
    ) || [];
  const columns: Column<TOrderHistory>[] = [
    { key: "productImage", label: "Image" },
    { key: "productName", label: "Name" },
    { key: "quantity", label: "Quantity" },
    { key: "productPrice", label: "Price per Item" },
    { key: "transactionId", label: "TransactionId" },
  ];

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="sm:mx-12 my-16">
      <div className="mb-10 text-center">
        <p
          className={`text-xs font-medium uppercase tracking-[0.3em] ${
            isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
          }`}
        >
        Orders
        </p>

        <h1
          className={`mt-3 text-3xl font-semibold md:text-4xl ${
            isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
          }`}
        >
          My Purchased Orders
        </h1>
      </div>
      <ASOrderTable<TOrderHistory>
        columns={columns}
        data={paginatedOrderHistorys || []}
        isLoading={isLoading}
      />
      <div className="mt-16">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName="flex justify-center items-center gap-2 my-4"
          pageClassName="inline-block"
          pageLinkClassName="px-4 py-2 border border-gray-300 rounded hover:bg-blue-500 hover:text-white transition"
          previousClassName="px-4 py-2 border border-gray-300 rounded hover:bg-blue-500 hover:text-white transition"
          nextClassName="px-4 py-2 border border-gray-300 rounded hover:bg-blue-500 hover:text-white transition"
          disabledClassName="opacity-50 cursor-not-allowed"
          activeClassName="text-blue-600"
        />
      </div>
    </div>
  );
};

export default MyOrders;

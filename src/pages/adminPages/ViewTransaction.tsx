import { useState } from "react";
import { useGetTNXDetailsQuery } from "../../redux/services/userApi";
import { TTNXHistory } from "../../types";
import ASOrderTable from "../../components/table/ASOrderTable";
import ReactPaginate from "react-paginate";
import { useTheme } from "../../context/ThemeContext";

interface Column<T> {
  key: keyof T;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T) => React.ReactNode;
}

const ITEMS_PER_PAGE = 5;

const ViewTransaction = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading } = useGetTNXDetailsQuery(null);

  const pageCount = Math.ceil((data?.data?.length || 0) / ITEMS_PER_PAGE);
  const paginatedOrderHistorys =
    data?.data?.slice(
      currentPage * ITEMS_PER_PAGE,
      (currentPage + 1) * ITEMS_PER_PAGE,
    ) || [];

  const columns: Column<TTNXHistory>[] = [
    { key: "orderId", label: "orderId" },
    { key: "transactionId", label: "transactionId" },
    { key: "amount", label: "amount" },
    { key: "paymentStatus", label: "paymentStatus" },
  ];

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // console.log(paginatedOrderHistorys);

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
          Transactions
        </p>

        <h1
          className={`mt-3 text-3xl font-semibold md:text-4xl ${
            isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
          }`}
        >
          Manage All Transactions
        </h1>
      </div>
      <ASOrderTable<TTNXHistory>
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
          pageLinkClassName="px-4 py-2 border border-gray-300 rounded hover:bg-[#A66B55] hover:text-white transition"
          previousClassName="px-4 py-2 border border-gray-300 rounded hover:bg-[#A66B55] hover:text-white transition"
          nextClassName="px-4 py-2 border border-gray-300 rounded hover:bg-[#A66B55] hover:text-white transition"
          disabledClassName="opacity-50 cursor-not-allowed"
          activeClassName="bg-[#A66B55] hover:text-white"
        />
      </div>
    </div>
  );
};

export default ViewTransaction;

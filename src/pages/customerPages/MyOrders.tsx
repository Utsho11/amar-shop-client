/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import ReactPaginate from "react-paginate";
import ASOrderTable from "../../components/table/ASOrderTable";
import { TOrderHistory } from "../../types";
import { useGetOrderHistoryForCustomerQuery } from "../../redux/services/orderApi";

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

  // console.log(data?.data);

  // Paginated Data
  const pageCount = Math.ceil((data?.data?.length || 0) / ITEMS_PER_PAGE);
  const paginatedOrderHistorys =
    data?.data?.slice(
      currentPage * ITEMS_PER_PAGE,
      (currentPage + 1) * ITEMS_PER_PAGE
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

  return (
    <div className="sm:mx-12 my-16">
      <div className="text-end my-8">
        <h2 className="text-2xl text-center font-semibold mb-8">My Orders</h2>{" "}
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

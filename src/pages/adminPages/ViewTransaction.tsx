import { useState } from "react";
import { useGetTNXDetailsQuery } from "../../redux/services/userApi";
import { TTNXHistory } from "../../types";
import Loading from "../../components/shared/Loading";
import ASOrderTable from "../../components/table/ASOrderTable";
import ReactPaginate from "react-paginate";

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

  if (isLoading) {
    return <Loading />;
  }
  // console.log(data?.data);

  const pageCount = Math.ceil((data?.data?.length || 0) / ITEMS_PER_PAGE);
  const paginatedOrderHistorys =
    data?.data?.slice(
      currentPage * ITEMS_PER_PAGE,
      (currentPage + 1) * ITEMS_PER_PAGE
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

  return (
    <div>
      <ASOrderTable<TTNXHistory>
        columns={columns}
        data={paginatedOrderHistorys || []}
        isLoading={false}
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

export default ViewTransaction;

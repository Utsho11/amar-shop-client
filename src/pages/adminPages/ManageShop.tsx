import { toast } from "sonner";
import ASShopTable from "../../components/table/ASShopTable";
import {
  TShop,
  useBlockShopMutation,
  useGetAllShopQuery,
} from "../../redux/services/shopApi";
import { useState } from "react";
import ReactPaginate from "react-paginate";

interface Column<T> {
  key: keyof T;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T) => React.ReactNode;
}

const columns: Column<TShop>[] = [
  { key: "logoUrl", label: "Image" },
  { key: "name", label: "Shop Name" },
  { key: "vendorEmail", label: "Vendor Mail" },
  { key: "description", label: "Description" },
];

const ManageShop = () => {
  const { data } = useGetAllShopQuery(null);
  const [blockShop] = useBlockShopMutation();

  const handleBlock = async (id: string) => {
    try {
      const toastId = toast.loading("Blocking...");
      await blockShop(id);
      toast.success("Shop blocked successfully", {
        id: toastId,
        duration: 2000,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to block shop");
    }
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Number of items per page

  const paginatedData = data?.data?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const totalPages = Math.ceil((data?.data?.length || 0) / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // console.log(data?.data);

  return (
    <div className="sm:mx-12 my-16">
      <div className="mb-4">
        <h1 className="text-2xl text-center font-semibold">Manage Shops</h1>
      </div>
      <div className="my-8">
        <ASShopTable
          columns={columns}
          data={paginatedData || []}
          isLoading={false}
          onBlock={handleBlock}
        />
      </div>
      <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center items-center gap-2 mt-4 my-4"
        pageClassName="px-4 py-2 border rounded hover:bg-gray-200"
        activeClassName="bg-blue-500 text-white"
        previousClassName={`px-4 py-2 border rounded ${
          currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        nextClassName={`px-4 py-2 border rounded ${
          currentPage === totalPages - 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        previousLabel="Previous"
        nextLabel="Next"
        disabledClassName="opacity-50 cursor-not-allowed"
      />
    </div>
  );
};

export default ManageShop;

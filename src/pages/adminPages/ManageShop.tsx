import { toast } from "sonner";
import ASShopTable from "../../components/table/ASShopTable";
import {
  TShop,
  useBlockShopMutation,
  useGetAllShopQuery,
} from "../../redux/services/shopApi";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useTheme } from "../../context/ThemeContext";

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
  const { data, isLoading } = useGetAllShopQuery(null);
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
    (currentPage + 1) * itemsPerPage,
  );

  const totalPages = Math.ceil((data?.data?.length || 0) / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  // console.log(data?.data);
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
          Recent Products
        </p>

        <h1
          className={`mt-3 text-3xl font-semibold md:text-4xl ${
            isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
          }`}
        >
          Recent Viewed Products
        </h1>
      </div>
      <div className="my-8">
        <ASShopTable
          columns={columns}
          data={paginatedData || []}
          isLoading={isLoading}
          onBlock={handleBlock}
        />
      </div>
      <ReactPaginate
        pageCount={totalPages}
        onPageChange={handlePageClick}
        containerClassName="flex justify-center items-center gap-2 mt-4 my-4"
        pageClassName="px-4 py-2 border rounded hover:bg-gray-200"
        activeClassName="bg-[#A66B55] hover:text-white"
        previousClassName={`px-4 py-2 border rounded hover:bg-[#A66B55] hover:text-white ${
          currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        nextClassName={`px-4 py-2 border rounded hover:bg-[#A66B55] hover:text-white ${
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

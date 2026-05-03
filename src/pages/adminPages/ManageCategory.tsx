import { NavLink } from "react-router-dom";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../redux/services/categoryApi";
import ASCategoryTable from "../../components/table/ASCategoryTable";
import { TCategory } from "../../types";
import { useState } from "react";
import EditCategoryModal from "../../components/modals/EditCategory";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import ReactPaginate from "react-paginate";
import { useTheme } from "../../context/ThemeContext";

interface Column<T> {
  key: keyof T;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T) => React.ReactNode;
}

const columns: Column<TCategory>[] = [
  { key: "logoUrl", label: "Image" },
  { key: "name", label: "Category Name" },
  { key: "description", label: "Description" },
];

const ManageCategory = () => {
  const { data, isLoading } = useGetCategoriesQuery(null);
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null
  );

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Number of items per page

  // Calculate paginated data
  const paginatedData = data?.data?.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const totalPages = Math.ceil((data?.data?.length || 0) / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleDelete = (id: string) => {
    const toastId = toast.loading("Deleting category...");
    deleteCategory(id);
    toast.success("Category deleted.", {
      id: toastId,
      duration: 2000,
    });
  };

  const handleEdit = (id: string) => {
    const productToEdit = data?.data?.find((product) => product.id === id);
    if (productToEdit) {
      setSelectedCategory(productToEdit);
    }
  };

  const handleSave = async (updatedCategory: FieldValues) => {
    try {
      await updateCategory(updatedCategory);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to edit product");
    }
  };

    const { theme } = useTheme();
    const isDark = theme === "dark";

  return (
    <div className="p-4 sm:p-8">
      <div className="text-end my-8">
        <div className="mb-10 text-center">
        <p
          className={`text-xs font-medium uppercase tracking-[0.3em] ${
            isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
          }`}
        >
          Categories
        </p>

        <h1
          className={`mt-3 text-3xl font-semibold md:text-4xl ${
            isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
          }`}
        >
          Manage All Category
        </h1>
      </div>
        <button className="btn bg-[#A66B55] text-white hover:bg-[#915944] btn-sm">
          <NavLink to="/adminDashboard/addCategory">+ADD CATEGORY</NavLink>
        </button>
      </div>
      <div className="">
        <ASCategoryTable
          columns={columns}
          data={paginatedData || []}
          isLoading={isLoading}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        {selectedCategory && (
          <EditCategoryModal
            category={selectedCategory}
            onClose={() => setSelectedCategory(null)}
            onSave={handleSave}
          />
        )}
      </div>
      {/* Pagination Controls */}
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

export default ManageCategory;

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
  const { data } = useGetCategoriesQuery(null);
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

  return (
    <div className="sm:mx-12 my-16">
      <div className="text-end my-8">
        <h2 className="text-2xl text-center font-semibold mb-8">
          Manage Categories
        </h2>
        <button className="btn btn-success btn-sm">
          <NavLink to="/adminDashboard/addCategory">+ADD CATEGORY</NavLink>
        </button>
      </div>
      <div className="">
        <ASCategoryTable
          columns={columns}
          data={paginatedData || []}
          isLoading={false}
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

export default ManageCategory;

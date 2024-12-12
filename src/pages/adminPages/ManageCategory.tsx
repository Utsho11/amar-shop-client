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
    <div className="">
      <div className="text-end my-8">
        <button className="btn btn-success btn-sm">
          <NavLink to="/adminDashboard/addCategory">+ADD CATEGORY</NavLink>
        </button>
      </div>
      <div className="">
        <ASCategoryTable
          columns={columns}
          data={data?.data || []}
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
    </div>
  );
};

export default ManageCategory;

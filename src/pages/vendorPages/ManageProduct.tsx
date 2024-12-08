/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import ASTable from "../../components/table/ASTable";
import {
  useDeleteProductMutation,
  useDuplicateProductMutation,
  useEditProductMutation,
  useGetProductsQuery,
} from "../../redux/services/productApi";
import { TProduct } from "../../types";
import EditProductModal from "../../components/modals/EditProductModal";
import { toast } from "sonner";
import { NavLink } from "react-router-dom";

interface Column<T> {
  key: keyof T; // The key should match a field in the data
  label: string; // The display name for the column
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T) => React.ReactNode;
}
const ManageProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const { data, isLoading } = useGetProductsQuery(null);
  const [deleteProduct] = useDeleteProductMutation();
  const [duplicateProduct] = useDuplicateProductMutation();
  const [editProduct] = useEditProductMutation();

  if (isLoading) {
    return <div className="loading loading-spinner">Loading...</div>;
  }

  const columns: Column<TProduct>[] = [
    { key: "id", label: "ID" },
    { key: "imageUrls", label: "Image" },
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "discount", label: "Discount" },
    { key: "inventoryCount", label: "Inventory Count" },
  ];

  const handleDelete = (id: string) => {
    deleteProduct(id);
  };

  const handleEdit = (id: string) => {
    const productToEdit = data?.data?.find((product) => product.id === id);
    if (productToEdit) {
      setSelectedProduct(productToEdit);
    }
  };

  const handleSave = (updatedProduct: TProduct) => {
    try {
      const { id, ...data } = updatedProduct;

      // Call the editProduct mutation to update the product
      editProduct({ id: id!, data }).unwrap();
      toast.success("Product edited successfully");
    } catch (error) {
      toast.error("Failed to edit product");
    }
  };

  const handleView = (id: string) => {
    // Handle view logic here
    console.log(`View product with ID: ${id}`);
  };

  const handleDuplicate = (id: string) => {
    duplicateProduct(id);
  };

  return (
    <div className="">
      <div className="text-end my-8">
        <button className="btn btn-success btn-sm">
          <NavLink to="/vendorDashboard/addProduct">+ADD YOUR PRODUCT</NavLink>
        </button>
      </div>
      <ASTable<TProduct>
        columns={columns}
        data={data?.data || []}
        isLoading={false}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
        onDuplicate={handleDuplicate}
      />
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ManageProduct;

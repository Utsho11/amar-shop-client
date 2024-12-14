/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import ASTable from "../../components/table/ASTable";
import {
  useDeleteProductMutation,
  useDuplicateProductMutation,
  useEditProductMutation,
} from "../../redux/services/productApi";
import EditProductModal from "../../components/modals/EditProductModal";
import { toast } from "sonner";
import { NavLink } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import { useGetProductsByVendorQuery } from "../../redux/services/vendorApi";
import Loading from "../../components/shared/Loading";

type TProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
  discount: string;
  inventoryCount: string;
  imageUrl: string;
  shopName?: string | undefined;
  categoryName?: string | undefined;
};

interface Column<T> {
  key: keyof T;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T) => React.ReactNode;
}
const ManageProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const { data, isLoading } = useGetProductsByVendorQuery(null);
  const [deleteProduct] = useDeleteProductMutation();
  const [duplicateProduct] = useDuplicateProductMutation();
  const [editProduct] = useEditProductMutation();

  if (isLoading) {
    return <Loading />;
  }

  const flatProducts = data?.data?.map((product) => ({
    ...product,
    shopName: product?.shop?.name,
    categoryName: product?.category?.name,
  }));

  const columns: Column<TProduct>[] = [
    { key: "imageUrl", label: "Image" },
    { key: "name", label: "Name" },
    { key: "shopName", label: "Shop" },
    { key: "categoryName", label: "Category" },
    { key: "price", label: "Price" },
    { key: "discount", label: "Discount" },
    { key: "inventoryCount", label: "Inventory Count" },
  ];

  const handleDelete = (id: string) => {
    deleteProduct(id);
  };

  const handleEdit = (id: string) => {
    const productToEdit = flatProducts?.find((product) => product.id === id);
    if (productToEdit) {
      setSelectedProduct(productToEdit);
    }
  };

  const handleSave = async (updatedProduct: FieldValues) => {
    try {
      await editProduct(updatedProduct).unwrap();
    } catch (error) {
      toast.error("Failed to edit product");
    }
  };

  const handleView = (id: string) => {
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
        data={flatProducts || []}
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

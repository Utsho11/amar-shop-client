/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import ReactPaginate from "react-paginate";
import ASTable from "../../components/table/ASTable";
import {
  useDeleteProductMutation,
  useDuplicateProductMutation,
  useEditProductMutation,
} from "../../redux/services/productApi";
import EditProductModal from "../../components/modals/EditProductModal";
import { toast } from "sonner";
import { NavLink, useNavigate } from "react-router-dom";
import { FieldValues } from "react-hook-form";
import { useGetProductsByVendorQuery } from "../../redux/services/vendorApi";
import Loading from "../../components/shared/Loading";

type TProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
  discount: number;
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

const ITEMS_PER_PAGE = 5;

const ManageProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [currentPage, setCurrentPage] = useState(0); // Track current page
  const { data, isLoading } = useGetProductsByVendorQuery(null);
  const [deleteProduct] = useDeleteProductMutation();
  const [duplicateProduct] = useDuplicateProductMutation();
  const [editProduct] = useEditProductMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  const flatProducts = data?.data?.map((product) => ({
    ...product,
    shopName: product?.shop?.name,
    categoryName: product?.category?.name,
  }));

  // Paginated Data
  const pageCount = Math.ceil((flatProducts?.length || 0) / ITEMS_PER_PAGE);
  const paginatedProducts =
    flatProducts?.slice(
      currentPage * ITEMS_PER_PAGE,
      (currentPage + 1) * ITEMS_PER_PAGE
    ) || [];

  const columns: Column<TProduct>[] = [
    { key: "imageUrl", label: "Image" },
    { key: "name", label: "Name" },
    { key: "shopName", label: "Shop" },
    { key: "categoryName", label: "Category" },
    { key: "price", label: "Price" },
    { key: "discount", label: "Discount" },
    { key: "inventoryCount", label: "Inventory Count" },
  ];

  const handlePageClick = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

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
    // console.log(`View product with ID: ${id}`);
    navigate(`/products/${id}`);
  };

  const handleDuplicate = (id: string) => {
    duplicateProduct(id);
  };

  return (
    <div>
      <div className="text-end my-8">
        <button className="btn btn-success btn-sm">
          <NavLink to="/vendorDashboard/addProduct">+ADD YOUR PRODUCT</NavLink>
        </button>
      </div>
      <ASTable<TProduct>
        columns={columns}
        data={paginatedProducts || []}
        isLoading={false}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onView={handleView}
        onDuplicate={handleDuplicate}
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

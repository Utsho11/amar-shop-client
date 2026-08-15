/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { TProduct } from "../../types";
import ASFileInput from "../form/ASFileInput";
import ASForm from "../form/ASForm";
import ASInput from "../form/ASInput";
import ASTextarea from "../form/ASTextarea";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

interface EditProductModalProps {
  product: TProduct;
  onClose: () => void;
  onSave: (updatedProduct: FormData) => void;
}

const EditProductModal = ({
  product,
  onClose,
  onSave,
}: EditProductModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };
  const handleSubmit = async (updatedProduct: FieldValues) => {
    const toastId = toast.loading("Updating product...");
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      const { shop, category, shopName, categoryName, ...rest } =
        updatedProduct;

      formData.append("data", JSON.stringify(rest));
      await onSave(formData);
      toast.success("Product updated successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
      console.log(error);
    }

    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-center ">Edit Product</h2>
        <ASForm<TProduct> onSubmit={handleSubmit} defaultValues={product}>
          <ASInput
            name="name"
            label="Product Name"
            placeholder="Enter product name"
          />
          <ASInput
            name="price"
            label="Price"
            type="number"
            placeholder="Enter product price"
          />
          <ASInput
            name="inventoryCount"
            label="Inventory Count"
            type="number"
            placeholder="Enter inventory count"
          />
          <ASInput
            name="discount"
            label="Discount"
            type="number"
            placeholder="Enter discount percentage"
          />
          <ASTextarea
            name="description"
            label="Description"
            placeholder="Enter product description"
          />
          <ASFileInput
            name="file"
            label="Update Product Photo/Logo"
            accept="image/*"
            onFileChange={handleFileChange}
          />
          <div className="modal-action">
            <button onClick={onClose} className="btn btn-secondary">
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </ASForm>
      </div>
    </div>
  );
};

export default EditProductModal;

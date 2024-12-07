/* eslint-disable @typescript-eslint/no-unused-vars */
import { TProduct } from "../../types";
import ASForm from "../form/ASForm";
import ASInput from "../form/ASInput";

interface EditProductModalProps {
  product: TProduct;
  onClose: () => void;
  onSave: (updatedProduct: TProduct) => void;
}

const EditProductModal = ({
  product,
  onClose,
  onSave,
}: EditProductModalProps) => {
  // Create a new object that excludes the unwanted fields
  const { imageUrls, createdAt, isDeleted, updatedAt, ...filteredProduct } =
    product;

  const handleSubmit = (updatedProduct: TProduct) => {
    onSave(updatedProduct); // Save the updated product
    onClose(); // Close the modal
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h2 className="text-center ">Edit Product</h2>
        <ASForm<TProduct>
          onSubmit={handleSubmit}
          defaultValues={filteredProduct}
        >
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

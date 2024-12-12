/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import ASFileInput from "../form/ASFileInput";
import ASForm from "../form/ASForm";
import ASInput from "../form/ASInput";
import ASTextarea from "../form/ASTextarea";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { TCategory } from "../../types";

interface EditCategoryModalProps {
  category: TCategory;
  onClose: () => void;
  onSave: (updatedProduct: FormData) => void;
}

const EditCategoryModal = ({
  category,
  onClose,
  onSave,
}: EditCategoryModalProps) => {
  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleSubmit = async (updatedData: FieldValues) => {
    const toastId = toast.loading("Updating Category...");
    try {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      formData.append("data", JSON.stringify(updatedData));
      await onSave(formData);
      toast.success("Category updated successfully", {
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
        <h2 className="text-center ">Edit Category</h2>
        <ASForm<TCategory> onSubmit={handleSubmit} defaultValues={category}>
          <ASInput
            name="name"
            label="Product Name"
            placeholder="Enter product name"
          />
          <ASTextarea
            name="description"
            label="Description"
            placeholder="Enter discount percentage"
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

export default EditCategoryModal;

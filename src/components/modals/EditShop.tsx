import { toast } from "sonner";
import ASFileInput from "../form/ASFileInput";
import ASForm from "../form/ASForm";
import ASInput from "../form/ASInput";
import ASTextarea from "../form/ASTextarea";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import { TShop } from "../../redux/services/shopApi";

interface EditShopModalProps {
  shop: TShop;
  onClose: () => void;
  onSave: (updatedProduct: FormData) => void;
}

const EditShop = ({ shop, onClose, onSave }: EditShopModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();

    try {
      formData.append("data", JSON.stringify(data));
      if (selectedFile) {
        formData.append("file", selectedFile);
      }
      onSave(formData);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="text-3xl text-center font-semibold">Edit Your Shop</h3>
        <h5 className="text-sm text-center text-slate-400">
          Best Platform for your business.
        </h5>
        <ASForm<TShop> onSubmit={onSubmit} className="" defaultValues={shop}>
          <div className="">
            <ASInput name="name" label="Shop Name" type="textArea" />
          </div>
          <div className="">
            <ASTextarea name="description" label="Shop Description" />
          </div>
          <div className="">
            <ASFileInput
              name="file"
              label="Insert Shop Photo/Logo"
              accept="image/*" // Example: restrict to image files
              onFileChange={handleFileChange}
            />
          </div>
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

export default EditShop;

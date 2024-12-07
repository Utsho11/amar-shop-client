import { useState } from "react";
import ASFileInput from "../../components/form/ASFileInput";
import ASForm from "../../components/form/ASForm";
import ASInput from "../../components/form/ASInput";
import ASTextarea from "../../components/form/ASTextarea";
import { toast } from "sonner";
import { useCreateShopMutation } from "../../redux/services/shopApi";
import { useNavigate } from "react-router-dom";

type CreateShopFormValue = {
  name?: string;
  description?: string;
};
const CreateShopPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createShop] = useCreateShopMutation();
  const navigate = useNavigate();

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const onSubmit = async (data: CreateShopFormValue) => {
    const toastId = toast.loading("Registration....");

    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();

    try {
      formData.append("data", JSON.stringify(data));
      formData.append("file", selectedFile);

      await createShop(formData).unwrap();
      toast.success("Successfully Shop Registered.", {
        id: toastId,
        duration: 2000,
      });

      navigate("/");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-4">
      <div className="text-center">
        <h3 className="text-3xl font-semibold">Create Your Shop</h3>
        <h5 className="text-sm text-slate-400">
          Best Platform for your business.
        </h5>
      </div>
      <ASForm onSubmit={onSubmit} label="Create Shop" className="card-body">
        <div className="form-control">
          <ASInput name="name" label="Shop Name" type="textArea" />
        </div>
        <div className="form-control">
          <ASTextarea name="description" label="Shop Description" />
        </div>
        <div className="form-control">
          <ASFileInput
            name="file"
            label="Insert Shop Photo/Logo"
            accept="image/*" // Example: restrict to image files
            onFileChange={handleFileChange}
          />
        </div>
      </ASForm>
    </div>
  );
};

export default CreateShopPage;

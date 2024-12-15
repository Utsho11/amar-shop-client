import { useState } from "react";
import ASFileInput from "../../components/form/ASFileInput";
import ASForm from "../../components/form/ASForm";
import ASInput from "../../components/form/ASInput";
import ASTextarea from "../../components/form/ASTextarea";
import { toast } from "sonner";
import { useAddCategoryMutation } from "../../redux/services/categoryApi";
import { useNavigate } from "react-router-dom";

export interface CategoryFormValue {
  name: string;
  description: string;
}
const CreateCategory = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [createCategory] = useAddCategoryMutation();
  const navigate = useNavigate();

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const onSubmit = async (data: CategoryFormValue) => {
    const toastId = toast.loading("Adding category...");
    // console.log(data);
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    const formdata = new FormData();
    try {
      formdata.append("data", JSON.stringify(data));
      formdata.append("file", selectedFile);

      await createCategory(formdata).unwrap();

      toast.success("Successfully Registered.", {
        id: toastId,
        duration: 2000,
      });

      navigate("/adminDashboard/manageCategory");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to add category.");
    }
  };
  return (
    <div className="">
      <div className="text-center text-3xl font-semibold font-serif my-5">
        <h1>Add Category</h1>
      </div>
      <div className="">
        <ASForm onSubmit={onSubmit} label="Add Category">
          <ASInput name="name" label="Category Name" />
          <ASTextarea name="description" label="Category Description" />
          <ASFileInput
            name="file"
            label="Choose a logo"
            onFileChange={handleFileChange}
          />
        </ASForm>
      </div>
    </div>
  );
};

export default CreateCategory;

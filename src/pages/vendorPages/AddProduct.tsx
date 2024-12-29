/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import ASFileInput from "../../components/form/ASFileInput";
import ASForm from "../../components/form/ASForm";
import ASInput from "../../components/form/ASInput";
import ASTextarea from "../../components/form/ASTextarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ASSelectField, { TOption } from "../../components/form/ASSelect";
import { useGetCategoriesQuery } from "../../redux/services/categoryApi";
import { useAddProductMutation } from "../../redux/services/productApi";

type CreateProductFormValue = {
  shopId: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  discount: number;
  inventoryCount: number;
};

const AddProduct = () => {
  const { data, isLoading } = useGetCategoriesQuery(null);
  const navigate = useNavigate();
  const [addProduct] = useAddProductMutation();

  const options: TOption[] = [];

  data?.data?.map((category) =>
    options.push({
      value: category.id,
      label: category.name,
    })
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const onSubmit = async (data: CreateProductFormValue) => {
    const toastId = toast.loading("Product adding....");
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();

    try {
      formData.append("data", JSON.stringify(data));
      formData.append("file", selectedFile);
      await addProduct(formData).unwrap();
      toast.success("Successfully Registered.", {
        id: toastId,
        duration: 2000,
      });
      navigate("/vendorDashboard/manageProducts");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl p-4">
      <div className="text-center">
        <h3 className="text-3xl font-semibold">Add Your Product</h3>
        <h5 className="text-sm text-slate-400">
          Best Platform for your business.
        </h5>
      </div>
      <ASForm onSubmit={onSubmit} label="Add Product" className="card-body">
        <div className="form-control">
          <ASInput name="name" label="Product Name" type="textArea" />
        </div>
        <div className="form-control">
          <ASSelectField
            isLoading={isLoading}
            name="categoryId"
            label="Product Category"
            options={options}
          />
        </div>
        <div className="form-control">
          <ASInput name="price" label="Product price" type="textArea" />
        </div>
        <div className="flex gap-3">
          <div className="form-control">
            <ASInput name="discount" label="Product discount" type="textArea" />
          </div>
          <div className="form-control">
            <ASInput
              name="inventoryCount"
              label="Product Quantity"
              type="textArea"
            />
          </div>
        </div>
        <div className="form-control">
          <ASTextarea name="description" label="Product Description" />
        </div>
        <div className="form-control">
          <ASFileInput
            name="file"
            label="Insert Product Photo/Logo"
            accept="image/*" // Example: restrict to image files
            onFileChange={handleFileChange}
          />
        </div>
      </ASForm>
    </div>
  );
};

export default AddProduct;

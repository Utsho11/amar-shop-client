/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import ASForm from "../../components/form/ASForm";
import ASInput from "../../components/form/ASInput";
import ASTextarea from "../../components/form/ASTextarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ASSelectField, { TOption } from "../../components/form/ASSelect";
import { useGetCategoriesQuery } from "../../redux/services/categoryApi";
import { useAddProductMutation } from "../../redux/services/productApi";
import { useGenerateAiProductMutation } from "../../redux/services/vendorApi";

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
  const [addProduct, { isLoading: isProductLoading }] = useAddProductMutation();
  const [generateAi, { isLoading: isAiGenerating }] = useGenerateAiProductMutation();
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGeneratedInfo, setAiGeneratedInfo] = useState<{
    name: string;
    description: string;
    suggestedPrice: number;
    suggestedDiscount: number;
  } | null>(null);

  const handleAiGenerate = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Please enter a short product name or keyword hint.");
      return;
    }

    const toastId = toast.loading("Generating AI product specifications...");
    try {
      const res = await generateAi({ titleHint: aiPrompt.trim() }).unwrap();
      if (res?.data) {
        setAiGeneratedInfo(res.data);
        toast.success("AI generated product details ready! Copy or use them below.", { id: toastId });
      }
    } catch (err: any) {
      toast.error("AI Generation failed. Please try again.", { id: toastId });
    }
  };

  const options: TOption[] = [];

  data?.data?.map((category) =>
    options.push({
      value: category.id,
      label: category.name,
    }),
  );

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);

    const newUrls = newFiles.map((file) => URL.createObjectURL(file));

    setSelectedFiles((prev) => [...prev, ...newFiles]);
    setPreviewUrls((prev) => [...prev, ...newUrls]);
  };

  const removeImage = (index: number) => {
    const newFiles = [...selectedFiles];
    const newUrls = [...previewUrls];

    URL.revokeObjectURL(newUrls[index]);

    newFiles.splice(index, 1);
    newUrls.splice(index, 1);

    setSelectedFiles(newFiles);
    setPreviewUrls(newUrls);
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const onSubmit = async (data: CreateProductFormValue) => {
    const toastId = toast.loading("Product adding....");

    if (selectedFiles.length === 0) {
      toast.error("Please select at least one image.", { id: toastId });
      return;
    }

    const formData = new FormData();

    try {
      formData.append("data", JSON.stringify(data));

      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });

      await addProduct(formData).unwrap();

      toast.success("Product added successfully.", {
        id: toastId,
        duration: 2000,
      });

      navigate("/vendorDashboard/manageProducts");
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="my-10 sm:w-1/2 flex flex-col justify-center mx-auto">
      <div className="text-center">
        <h3 className="text-3xl font-semibold">Add Your Product</h3>
        <h5 className="text-sm text-slate-400">
          Best Platform for your business.
        </h5>
      </div>
      <ASForm
        onSubmit={onSubmit}
        label="Add Product"
        className="card-body"
        isLoading={isProductLoading}
      >
        {/* 1-Click AI Studio Copilot */}
        <div className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-purple-500/10 to-indigo-500/10 border border-primary/25 shadow-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-base">✨</span>
            <h4 className="font-bold text-xs text-base-content">
              1-Click AI Product Studio
            </h4>
            <span className="badge badge-primary badge-xs font-semibold">AI Powered</span>
          </div>
          <p className="text-[11px] text-gray-500 mb-2.5">
            Enter a keyword hint and generate SEO-optimized copy, specifications, and care instructions in seconds.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. Slim fit cotton linen shirt"
              className="input input-bordered input-sm flex-1 rounded-xl text-xs bg-base-100"
            />
            <button
              type="button"
              disabled={isAiGenerating}
              onClick={handleAiGenerate}
              className="btn btn-sm btn-primary rounded-xl font-bold text-xs px-3"
            >
              {isAiGenerating ? (
                <span className="loading loading-spinner loading-xs" />
              ) : (
                "Generate"
              )}
            </button>
          </div>

          {aiGeneratedInfo && (
            <div className="mt-3 p-3 bg-base-100 rounded-xl border border-base-200 text-xs space-y-2">
              <div className="flex justify-between items-center pb-1 border-b border-base-200">
                <span className="font-bold text-primary">Generated Listing Preview</span>
                <span className="text-[10px] text-gray-400">
                  Suggested Price: ${aiGeneratedInfo.suggestedPrice} (${aiGeneratedInfo.suggestedDiscount}% OFF)
                </span>
              </div>
              <p className="font-semibold text-base-content">{aiGeneratedInfo.name}</p>
              <div className="max-h-24 overflow-y-auto whitespace-pre-line text-gray-500 bg-base-200/50 p-2 rounded-lg font-mono text-[11px]">
                {aiGeneratedInfo.description}
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `Name: ${aiGeneratedInfo.name}\n\nDescription:\n${aiGeneratedInfo.description}\n\nSuggested Price: ${aiGeneratedInfo.suggestedPrice}`
                  );
                  toast.success("AI text copied to clipboard! Paste into Name & Description fields below.");
                }}
                className="btn btn-xs btn-outline rounded-lg text-[10px]"
              >
                📋 Copy All Generated Details
              </button>
            </div>
          )}
        </div>

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
          <label className="label">
            <span className="label-text">Insert Product Images</span>
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => handleFileChange(e.target.files)}
            className="file-input file-input-bordered w-full"
          />

          {previewUrls.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`preview-${index}`}
                    className="h-28 w-full rounded-xl object-cover"
                  />

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </ASForm>
    </div>
  );
};

export default AddProduct;

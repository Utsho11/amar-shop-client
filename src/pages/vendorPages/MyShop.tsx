import { useState } from "react";
import { EditIcon } from "../../components/icons/icon";
import {
  TShop,
  useEditShopMutation,
  useGetMyShopQuery,
} from "../../redux/services/shopApi";
import CreateShopPage from "./CreateShopPage";
import EditShop from "../../components/modals/EditShop";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";

const MyShop = () => {
  const { data: shop, isLoading, isError } = useGetMyShopQuery(null);
  const [editShop] = useEditShopMutation();
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);

  console.log(shop);

  if (isLoading) {
    return <div className="loading-spinner loading-lg">Loading...</div>; // Handle loading state
  }

  if (isError || !shop) {
    return <div>Error loading shops. Please try again later.</div>; // Handle error state
  }

  const handleSelect = (id: string) => {
    setSelectedShopId(id);
  };

  const handleSave = async (updatedData: FieldValues) => {
    try {
      const toastId = toast.loading("Updating...");
      await editShop(updatedData);
      toast.success("Shop updated successfully", {
        id: toastId,
        duration: 2000,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update shop");
    }
  };

  return (
    <div className="container mx-auto">
      {shop.data && shop.data.length > 0 ? (
        shop.data.map((shop: TShop, index: number) => (
          <div
            key={shop.id || index}
            className="mx-auto mb-8 rounded border-2 border-blue-400"
          >
            <div className="hero-content flex-col lg:flex-row">
              <div className="h-50 w-50">
                <img
                  src={shop.logoUrl}
                  alt={shop.name}
                  className="max-w-sm rounded-lg shadow-2xl"
                />
              </div>
              <div className="space-y-5">
                <h1 className="text-5xl font-bold">{shop.name}</h1>
                <p className="">{shop.description}</p>
                <div>
                  <button
                    onClick={() => handleSelect(shop.id as string)}
                    className="text-white flex items-center gap-3 justify-center btn btn-sm bg-[#0077b6]"
                  >
                    <EditIcon size={16} />
                    Edit Shop
                  </button>
                </div>
                {selectedShopId && (
                  <EditShop
                    shop={shop}
                    onClose={() => setSelectedShopId(null)}
                    onSave={handleSave}
                  />
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <CreateShopPage />
      )}
    </div>
  );
};

export default MyShop;

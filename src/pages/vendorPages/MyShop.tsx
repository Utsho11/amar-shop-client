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
import Loading from "../../components/shared/Loading";

const MyShop = () => {
  const { data: shop, isLoading, isError } = useGetMyShopQuery(null);
  const [editShop] = useEditShopMutation();
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);

  if (isLoading) {
    return <Loading />;
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
    <div className="sm:mx-12 my-16">
      <div className="text-end my-8  border-b-2">
        <h2 className="text-2xl text-center font-semibold mb-8">Manage Shop</h2>
      </div>
      {shop.data && shop.data.length > 0 ? (
        shop.data.map((shop: TShop, index: number) => (
          <div
            key={shop.id || index}
            className="sm:flex justify-center gap-16 mb-8 p-8"
          >
            <div className="">
              <img src={shop.logoUrl} alt={shop.name} className="" />
            </div>
            <div className="space-y-5 text-center">
              <h1 className="text-5xl font-bold">{shop.name}</h1>
              <p className="">{shop.description}</p>
              <div className="flex justify-center">
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
        ))
      ) : (
        <CreateShopPage />
      )}
    </div>
  );
};

export default MyShop;

import { useState } from "react";
import { FaUsers, FaEdit } from "react-icons/fa";
import {
  useEditShopMutation,
  useGetFollowersQuery,
  useGetMyShopQuery,
} from "../../redux/services/shopApi";
import EditShop from "../../components/modals/EditShop";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import Loading from "../../components/shared/Loading";
import { useTheme } from "../../context/ThemeContext";

const MyShop = () => {
  const [editShop] = useEditShopMutation();
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const { data: shop, isLoading, isError } = useGetMyShopQuery(null);
  const shopData = shop?.data?.[0];
  const shopId = shopData?.id;
  const { data: followers } = useGetFollowersQuery(shopId);
  const { theme } = useTheme();

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !shopData) {
    return (
      <div className="text-center text-red-500 my-16">
        <h2 className="text-2xl font-semibold">Error Loading Shop</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  const handleSave = async (updatedData: FieldValues) => {
    try {
      const toastId = toast.loading("Updating...");
      await editShop(updatedData);
      toast.success("Shop updated successfully", {
        id: toastId,
        duration: 2000,
      });
      setEditModalOpen(false);
    } catch {
      toast.error("Failed to update shop");
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-16 px-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Manage Your Shop</h1>
        <p className="text-gray-500">
          View and update your shop details below.
        </p>
      </div>
      <div
        className={`${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg rounded-lg p-6`}
      >
        <div className="flex flex-col items-center text-center">
          <img
            src={shopData.logoUrl}
            alt={shopData.name}
            className="w-28 h-28 rounded-full shadow-md mb-4"
          />
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {shopData.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {shopData.description}
          </p>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div
            className={`flex items-center gap-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }  `}
          >
            <FaUsers className="text-blue-500" size={20} />
            <span>{followers?.data?.length || 0} Followers</span>
          </div>
          <button
            onClick={() => setEditModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition-colors"
          >
            <FaEdit size={16} />
            Edit Shop
          </button>
        </div>
        {isEditModalOpen && (
          <EditShop
            shop={shopData}
            onClose={() => setEditModalOpen(false)}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
};

export default MyShop;

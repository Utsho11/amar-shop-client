import CountUp from "react-countup";
import { FaShoppingCart, FaStore, FaUsers } from "react-icons/fa";
import {
  useGetFollowersQuery,
  useGetMyShopQuery,
} from "../../redux/services/shopApi";
import { useGetOrderHistoryForVendorQuery } from "../../redux/services/vendorApi";
import Loading from "../shared/Loading";

interface VendorOverviewCardProps {
  theme: string;
}

const VendorOverviewCard = ({ theme }: VendorOverviewCardProps) => {
  const { data: shop, isLoading } = useGetMyShopQuery(null);
  const { data: orders } = useGetOrderHistoryForVendorQuery(null);
  const shopData = shop?.data?.[0];
  const shopId = shopData?.id;
  const { data: followers } = useGetFollowersQuery(shopId);
  const totalFollowers = followers?.data?.length;
  const totalOrders = Number(orders?.data?.length);

  // console.log(orders?.data);

  return (
    <div className="my-16 sm:mx-6">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Orders Card */}
          <div
            className={` ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "border-gray-200"
            } shadow-md rounded-lg p-6 flex flex-col justify-center items-center text-center border space-y-3`}
          >
            <div className="text-blue-500 text-5xl mb-4">
              <FaShoppingCart />
            </div>
            <h4 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
              Total Orders
            </h4>
            <p
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              <CountUp end={totalOrders} duration={1.5} separator="," />
            </p>
          </div>

          {/* Followers Card */}
          <div
            className={` ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "border-gray-200"
            } shadow-md rounded-lg p-6 flex flex-col justify-center items-center text-center border space-y-3`}
          >
            <div className="text-green-500 text-5xl mb-4">
              <FaUsers />
            </div>
            <h4 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
              Total Followers
            </h4>
            <p
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              <CountUp end={totalFollowers} duration={1.5} separator="," />
            </p>
          </div>

          {/* Shop Info Card */}
          <div
            className={` ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "border-gray-200"
            } shadow-md rounded-lg p-6 flex flex-col justify-center items-center text-center border space-y-3`}
          >
            <div className="mb-4">
              <img
                src={shopData.logoUrl}
                alt={shopData.name}
                className="w-20 h-20 rounded-full shadow-md"
              />
            </div>
            <h4 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
              Shop Name
            </h4>
            <p
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              {shopData.name}
            </p>
            <div className="text-yellow-500 text-3xl mt-4">
              <FaStore />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorOverviewCard;

import CountUp from "react-countup";
import { FaStore, FaStoreAlt, FaTimesCircle } from "react-icons/fa";
import { TShop, useGetAllShopQuery } from "../../redux/services/shopApi";

interface TotalShopCardProps {
  theme: string;
}

const TotalShopCard = ({ theme }: TotalShopCardProps) => {
  const isDarkMode = theme === "dark";
  const { data } = useGetAllShopQuery(null);

  const totalShops = data?.data?.length;
  const activeShops = data?.data?.filter(
    (shop: TShop) => shop.isBlacklisted === false
  ).length;
  const inactiveShops = data?.data?.filter(
    (shop: TShop) => shop.isBlacklisted === true
  ).length;

  return (
    <div className="my-16 sm:mx-6">
      <div
        className={`shadow-lg rounded-lg p-6 flex flex-col items-center text-center ${
          isDarkMode
            ? "bg-gray-800 text-gray-200 border border-gray-700"
            : "bg-white text-gray-800"
        }`}
      >
        {/* Header */}
        <div className="flex items-center space-x-2">
          <FaStore className="text-blue-600 text-3xl" />
          <h3 className="text-3xl font-medium">Total Shops</h3>
        </div>

        {/* Total Shops */}
        <p className="text-5xl font-bold text-blue-600 mt-2">
          <CountUp start={0} end={totalShops} duration={2.5} separator="," />
        </p>

        {/* Breakdown */}
        <div className="flex mt-6 space-x-8 my-5">
          {/* Active Shops */}
          <div className="flex flex-col items-center">
            <FaStoreAlt className="text-green-500 text-2xl mb-2" />
            <p className="text-sm">Active</p>
            <p className="text-xl font-bold text-green-500">
              <CountUp
                start={0}
                end={activeShops}
                duration={2.5}
                separator=","
              />
            </p>
          </div>

          {/* Inactive Shops */}
          <div className="flex flex-col items-center">
            <FaTimesCircle className="text-red-500 text-2xl mb-2" />
            <p className="text-sm">Inactive</p>
            <p className="text-xl font-bold text-red-500">
              <CountUp
                start={0}
                end={inactiveShops}
                duration={2.5}
                separator=","
              />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalShopCard;

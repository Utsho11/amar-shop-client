import CountUp from "react-countup";
import { FaShoppingCart, FaStore, FaUsers } from "react-icons/fa";
import {
  useGetFollowersQuery,
  useGetMyShopQuery,
} from "../../redux/services/shopApi";
import {
  useGetOrderHistoryForVendorQuery,
  useGetProductsByVendorQuery,
} from "../../redux/services/vendorApi";
import Loading from "../shared/Loading";
import { Package } from "lucide-react";

interface VendorOverviewCardProps {
  theme: string;
}

const VendorOverviewCard = ({ theme }: VendorOverviewCardProps) => {
  const { data: shop, isLoading } = useGetMyShopQuery(null);
  const { data: orders } = useGetOrderHistoryForVendorQuery(null);
  const { data: products } = useGetProductsByVendorQuery(null);
  const shopData = shop?.data?.[0];
  const shopId = shopData?.id;
  const { data: followers } = useGetFollowersQuery(shopId);
  const totalFollowers = followers?.data?.length;
  const totalOrders = Number(orders?.data?.length);
  const toatalProducts = Number(products?.data?.length);

  // console.log(orders?.data);

  return (
    <div className="my-10 px-4 sm:px-6">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div
            className={`rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
              theme === "dark"
                ? "border-white/10 bg-[#171a21] text-white"
                : "border-gray-200 bg-white text-gray-900"
            }`}
          >
            <div className="flex items-center gap-4">
              <img
                src={shopData.logoUrl || "/placeholder.png"}
                alt={shopData.name}
                className="h-16 w-16 rounded-2xl object-cover"
              />

              <div className="min-w-0">
                <p className="text-sm opacity-60">Shop Name</p>
                <h3 className="truncate text-2xl font-bold">
                  {shopData.name || "My Shop"}
                </h3>
              </div>
            </div>

            <div
              className={`mt-6 flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${
                theme === "dark"
                  ? "bg-[#e9c46a]/15 text-[#e9c46a]"
                  : "bg-[#e9c46a]/25 text-[#b88219]"
              }`}
            >
              <FaStore />
            </div>
          </div>
          <DashboardCard
            theme={theme}
            icon={<FaShoppingCart />}
            label="Total Orders"
            value={<CountUp end={totalOrders} duration={1.5} separator="," />}
          />

          <DashboardCard
            theme={theme}
            icon={<Package />}
            label="Total Products"
            value={
              <CountUp end={toatalProducts} duration={1.5} separator="," />
            }
          />

          <DashboardCard
            theme={theme}
            icon={<FaUsers />}
            label="Total Followers"
            value={
              <CountUp end={totalFollowers} duration={1.5} separator="," />
            }
          />
        </div>
      )}
    </div>
  );
};

export default VendorOverviewCard;

const DashboardCard = ({
  theme,
  icon,
  label,
  value,
}: {
  theme: string;
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => {
  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
        isDark
          ? "border-white/10 bg-[#171a21] text-white"
          : "border-gray-200 bg-white text-gray-900"
      }`}
    >
      <div
        className={`mb-8 flex h-12 w-12 items-center justify-center rounded-2xl text-xl ${
          isDark
            ? "bg-[#e9c46a]/15 text-[#e9c46a]"
            : "bg-[#e9c46a]/25 text-[#b88219]"
        }`}
      >
        {icon}
      </div>

      <p className="text-sm opacity-60">{label}</p>

      <h3 className="mt-2 text-4xl font-bold tracking-tight">{value}</h3>
    </div>
  );
};

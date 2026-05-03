import MyProfile from "../../components/profile/MyProfile";
import VendorOverviewCard from "../../components/vendor/VendorOverviewCard";
import VendorRevenueChart from "../../components/vendor/VendorRevenueChart";
import { useTheme } from "../../context/ThemeContext";

const VendorProfile = () => {
  const { theme } = useTheme();

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row">
        <MyProfile theme={theme} />
        <VendorOverviewCard theme={theme} />
      </div>
      <div className="sm:ml-12">
        <VendorRevenueChart />
      </div>
    </div>
  );
};

export default VendorProfile;

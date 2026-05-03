import RevenueChart from "../../components/admin/RevenueChart";
import TotalShopCard from "../../components/admin/TotalShopCard";
import TotalUserCard from "../../components/admin/TotalUserCard";
import MyProfile from "../../components/profile/MyProfile";
import { useTheme } from "../../context/ThemeContext";

const AdminProfile = () => {
  const { theme } = useTheme();

  return (
    <div className="p-4 sm:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="col-span-2">
          <MyProfile theme={theme} />
        </div>
        <div className="col-span-2 space-y-4">
          <TotalUserCard theme={theme} />
          <TotalShopCard theme={theme} />
        </div> 
      </div>
      <div className="sm:ml-12">
        <RevenueChart />
      </div>
    </div>
  );
};

export default AdminProfile;

import RevenueChart from "../../components/admin/RevenueChart";
import TotalShopCard from "../../components/admin/TotalShopCard";
import TotalUserCard from "../../components/admin/TotalUserCard";
import MyProfile from "../../components/profile/MyProfile";
import { useTheme } from "../../context/ThemeContext";

const AdminProfile = () => {
  const { theme } = useTheme();

  return (
    <div className="">
      <div className="sm:ml-12 sm:flex gap-3">
        <MyProfile theme={theme} />
        <TotalUserCard theme={theme} />
        <TotalShopCard theme={theme} />
      </div>
      <div className="sm:ml-12">
        <RevenueChart />
      </div>
    </div>
  );
};

export default AdminProfile;

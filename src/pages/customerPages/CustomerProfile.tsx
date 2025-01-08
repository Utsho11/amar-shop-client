import OrderViewCard from "../../components/customer/OrderViewCard";
import MyProfile from "../../components/profile/MyProfile";
import { useTheme } from "../../context/ThemeContext";

const CustomerProfile = () => {
  const { theme } = useTheme();
  return (
    <div className="">
      <div className="sm:ml-12 sm:flex gap-5">
        <MyProfile theme={theme} />
        <OrderViewCard theme={theme} />
      </div>
    </div>
  );
};

export default CustomerProfile;

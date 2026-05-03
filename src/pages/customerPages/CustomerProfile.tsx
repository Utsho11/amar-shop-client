import OrderViewCard from "../../components/customer/OrderViewCard";
import MyProfile from "../../components/profile/MyProfile";
import { useTheme } from "../../context/ThemeContext";

const CustomerProfile = () => {
  const { theme } = useTheme();
  return (
    <div className="">
      <div className="">
        <MyProfile theme={theme} />
        <OrderViewCard theme={theme} />
      </div>
    </div>
  );
};

export default CustomerProfile;

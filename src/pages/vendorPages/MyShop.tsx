import { useGetMyShopQuery } from "../../redux/services/shopApi";
import CreateShopPage from "./CreateShopPage";

const MyShop = () => {
  const { data: shop } = useGetMyShopQuery(null);

  console.log(shop?.data?.name);

  return (
    <div className="">
      {shop ? <div>hello {shop?.data?.name}</div> : <CreateShopPage />}
    </div>
  );
};

export default MyShop;

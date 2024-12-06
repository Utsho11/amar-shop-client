import MyProfile from "../pages/MyProfile";
import CreateShopPage from "../pages/vendorPages/CreateShopPage";
import MyShop from "../pages/vendorPages/MyShop";

export const vendorPaths = [
  {
    path: "profile",
    element: <MyProfile />,
  },
  {
    path: "myShop",
    element: <MyShop />,
  },
  {
    path: "myProducts",
    element: <MyShop />,
  },
  {
    path: "createShop",
    element: <CreateShopPage />,
  },
];

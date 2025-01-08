import AddProduct from "../pages/vendorPages/AddProduct";
import CreateShopPage from "../pages/vendorPages/CreateShopPage";
import ManageProduct from "../pages/vendorPages/ManageProduct";
import MyShop from "../pages/vendorPages/MyShop";
import OrderHistory from "../pages/vendorPages/OrderHistory";
import VendorProfile from "../pages/vendorPages/VendorProfile";

export const vendorPaths = [
  {
    path: "profile",
    element: <VendorProfile />,
  },
  {
    path: "myShop",
    element: <MyShop />,
  },
  {
    path: "manageProducts",
    element: <ManageProduct />,
  },
  {
    path: "addProduct",
    element: <AddProduct />,
  },
  {
    path: "createShop",
    element: <CreateShopPage />,
  },
  {
    path: "orderHistory",
    element: <OrderHistory />,
  },
];

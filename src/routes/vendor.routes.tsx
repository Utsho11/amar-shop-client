import MyProfile from "../pages/MyProfile";
import AddProduct from "../pages/vendorPages/AddProduct";
import ManageProduct from "../pages/vendorPages/ManageProduct";
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
    path: "manageProducts",
    element: <ManageProduct />,
  },
  {
    path: "addProduct",
    element: <AddProduct />,
  },
];

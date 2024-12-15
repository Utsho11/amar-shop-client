import CreateCategory from "../pages/adminPages/CreateCategory";
import CreateCoupon from "../pages/adminPages/CreateCoupon";
import ManageCategory from "../pages/adminPages/ManageCategory";
import ManageShop from "../pages/adminPages/ManageShop";
import ManageUser from "../pages/adminPages/ManageUser";
import ViewTransaction from "../pages/adminPages/ViewTransaction";
import MyProfile from "../pages/MyProfile";

export const adminPaths = [
  {
    path: "profile",
    element: <MyProfile />,
  },
  {
    path: "manageUser",
    element: <ManageUser />,
  },
  {
    path: "manageCategory",
    element: <ManageCategory />,
  },
  {
    path: "manageShop",
    element: <ManageShop />,
  },
  {
    path: "viewTransaction",
    element: <ViewTransaction />,
  },
  {
    path: "addCategory",
    element: <CreateCategory />,
  },
  {
    path: "createCoupon",
    element: <CreateCoupon />,
  },
];

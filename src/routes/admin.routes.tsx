import CreateCategory from "../pages/adminPages/CreateCategory";
import ManageCategory from "../pages/adminPages/ManageCategory";
import ManageUser from "../pages/adminPages/ManageUser";
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
    path: "addCategory",
    element: <CreateCategory />,
  },
];

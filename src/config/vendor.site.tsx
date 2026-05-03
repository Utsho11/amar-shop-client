import { User, Store, Package, History, Home } from "lucide-react";
import { ReactNode } from "react";

type TSidebarLink = {
  label: string;
  path: string;
  icon: ReactNode;
};

export const vendorSideLink: TSidebarLink[] = [
  {
    label: "My Profile",
    path: "profile",
    icon: <User size={18} />,
  },
  {
    label: "My Shop",
    path: "myShop",
    icon: <Store size={18} />,
  },
  {
    label: "Manage Products",
    path: "manageProducts",
    icon: <Package size={18} />,
  },
  {
    label: "Order History",
    path: "orderHistory",
    icon: <History size={18} />,
  },
  {
    label: "Back to Home",
    path: "/",
    icon: <Home size={18} />,
  },
];
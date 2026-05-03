import {
  User,
  Users,
  Layers,
  Store,
  CreditCard,
  Ticket,
  Home,
} from "lucide-react";
import type { ReactNode } from "react";


type TAdminSidebarLink = {
  label: string;
  path: string;
  icon: ReactNode;
};

export const adminSideLink: TAdminSidebarLink[] = [
  {
    label: "My Profile",
    path: "profile",
    icon: <User size={18}/>,
  },
  {
    label: "Manage Users",
    path: "manageUser",
    icon: <Users size={18}/>,
  },
  {
    label: "Manage Categories",
    path: "manageCategory",
    icon: <Layers size={18}/>,
  },
  {
    label: "Manage Shop",
    path: "manageShop",
    icon: <Store size={18}/>,
  },
  {
    label: "View Transactions",
    path: "viewTransaction",
    icon: <CreditCard size={18}/>,
  },
  {
    label: "Create Coupon",
    path: "createCoupon",
    icon: <Ticket size={18}/>,
  },
  {
    label: "Back to Home",
    path: "/",
    icon: <Home size={18}/>,
  },
];
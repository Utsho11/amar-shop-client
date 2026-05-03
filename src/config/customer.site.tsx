import {
  User,
  ShoppingCart,
  Package,
  Star,
  Home,
} from "lucide-react";

export const customerSideLink = [
  {
    label: "My Profile",
    path: "profile",
    icon: <User size={18} />,
  },
  {
    label: "My Cart",
    path: "cart",
    icon: <ShoppingCart size={18} />,
  },
  {
    label: "My Order",
    path: "myOrder",
    icon: <Package size={18} />,
  },
  {
    label: "To Review",
    path: "toReview",
    icon: <Star size={18} />,
  },
  {
    label: "Back to Home",
    path: "/",
    icon: <Home size={18} />,
  },
];
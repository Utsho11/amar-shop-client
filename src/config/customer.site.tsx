import {
  User,
  ShoppingCart,
  Package,
  Star,
  Home,
  Heart,
} from "lucide-react";

export const customerSideLink = [
  {
    label: "My Profile",
    path: "profile",
    icon: <User size={18} />,
  },
  {
    label: "My Wishlist",
    path: "wishlist",
    icon: <Heart size={18} />,
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
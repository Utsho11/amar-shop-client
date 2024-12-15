import CartPage from "../pages/customerPages/CartPage";
import MyOrders from "../pages/customerPages/MyOrders";
import ReviewPage from "../pages/customerPages/ReviewPage";
import MyProfile from "../pages/MyProfile";

export const customerPaths = [
  {
    path: "profile",
    element: <MyProfile />,
  },
  {
    path: "cart",
    element: <CartPage />,
  },
  {
    path: "myOrder",
    element: <MyOrders />,
  },
  {
    path: "toReview",
    element: <ReviewPage />,
  },
];

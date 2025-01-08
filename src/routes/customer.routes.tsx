import CartPage from "../pages/customerPages/CartPage";
import CustomerProfile from "../pages/customerPages/CustomerProfile";
import MyOrders from "../pages/customerPages/MyOrders";
import ReviewPage from "../pages/customerPages/ReviewPage";

export const customerPaths = [
  {
    path: "profile",
    element: <CustomerProfile />,
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

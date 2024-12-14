import { useState } from "react";
import { useAppSelector } from "../hooks/hook";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import { useCreateOrderMutation } from "../redux/services/orderApi";
import { toast } from "sonner";

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface OrderData {
  customerEmail: string;
  totalAmount: number;
  paymentMethod: string;
  OrderItem: {
    data: OrderItem[];
  };
}

const CheckoutPage = () => {
  const [createOrder] = useCreateOrderMutation();
  const user = useAppSelector(selectCurrentUser);
  const cartItems = useAppSelector((state) => state.cart.items);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const handleCheckout = async () => {
    if (!user || !user.email) {
      alert("Please log in to proceed with checkout.");
      return;
    }

    const order = {
      customerEmail: user.email,
      totalAmount: cartItems.reduce(
        (total, product) =>
          total + parseFloat(product.price) * product.quantity,
        0
      ),
      paymentMethod: "AmarPay",
      OrderItem: {
        data: cartItems.map((product) => ({
          productId: product.id,
          quantity: product.quantity,
          price: parseFloat(product.price),
        })),
      },
    };

    setOrderData(order);
    const res = await createOrder(order).unwrap();

    // console.log(res.data.data);

    if (res) {
      window.location.href = res.data.payment_url;
    } else {
      toast.error("Payment Failed");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="bg-white p-6 rounded-lg">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            {cartItems.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center my-2"
              >
                <div>
                  <p>{product.name}</p>
                  <p>
                    Quantity:{" "}
                    <span className="font-bold">{product.quantity}</span>
                  </p>
                </div>
                <p>
                  ${(parseFloat(product.price) * product.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center border-t pt-4">
            <h3 className="text-xl font-bold">Total:</h3>
            <p className="text-xl">
              $
              {orderData?.totalAmount?.toFixed(2) ??
                cartItems
                  .reduce(
                    (total, product) =>
                      total + parseFloat(product.price) * product.quantity,
                    0
                  )
                  .toFixed(2)}
            </p>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            Confirm & Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

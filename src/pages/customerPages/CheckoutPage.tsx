import { useState } from "react";
import { toast } from "sonner";
import { useCreateOrderMutation } from "../../redux/services/orderApi";
import { useAppSelector } from "../../hooks/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import ASForm from "../../components/form/ASForm";
import ASInput from "../../components/form/ASInput";
import { FieldValues } from "react-hook-form";
import { useCheckCouponMutation } from "../../redux/services/authApi";

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
  const [checkCoupon] = useCheckCouponMutation();
  const [discount, setDiscount] = useState<number | null>(null);

  const handleCheckout = async () => {
    if (!user || !user.email) {
      alert("Please log in to proceed with checkout.");
      return;
    }

    // Calculate the total amount before discount
    const totalAmount = cartItems.reduce(
      (total, product) => total + parseFloat(product.price) * product.quantity,
      0
    );

    // Apply discount if any
    const finalAmount = discount
      ? totalAmount - (totalAmount * discount) / 100
      : totalAmount;

    const order = {
      customerEmail: user.email,
      totalAmount: finalAmount,
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

    if (res) {
      window.location.href = res.data.payment_url;
    } else {
      toast.error("Payment Failed");
    }
  };

  const handleSubmit = async (data: FieldValues) => {
    // console.log(data);
    const result = await checkCoupon(data).unwrap();
    // console.log(result.data);

    // Assuming the result contains the discount percentage
    setDiscount(result.data); // Store the discount in the state
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="divider"></div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className=" p-6 rounded-lg">
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

          {/* Show the discount applied */}
          {discount && (
            <div className="flex justify-between items-center mt-2">
              <h3 className="text-xl font-bold">Discount Applied:</h3>
              <p className="text-xl">
                - $
                {(
                  (discount / 100) *
                  cartItems.reduce(
                    (total, product) =>
                      total + parseFloat(product.price) * product.quantity,
                    0
                  )
                ).toFixed(2)}
              </p>
            </div>
          )}

          <div className="max-w-60">
            <ASForm label="Apply code" onSubmit={handleSubmit}>
              <span className="text-gray-500 text-sm">Apply NEWYEAR2025</span>
              <ASInput label="Coupon Code" name="code" />
            </ASForm>
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

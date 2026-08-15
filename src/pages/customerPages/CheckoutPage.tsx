import { useState } from "react";
import { toast } from "sonner";
import { useCreateOrderMutation } from "../../redux/services/orderApi";
import { useAppSelector } from "../../hooks/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useCheckCouponMutation } from "../../redux/services/authApi";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const user = useAppSelector(selectCurrentUser);
  const cartItems = useAppSelector((state) => state.cart.items);
  const [checkCoupon, { isLoading: isCouponChecking }] = useCheckCouponMutation();
  const [discountPercent, setDiscountPercent] = useState<number | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<string>("");
  const [couponInput, setCouponInput] = useState<string>("");

  const [shippingAddress, setShippingAddress] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingZipCode, setShippingZipCode] = useState("");
  const [shippingPhone, setShippingPhone] = useState("");

  const subtotal = cartItems.reduce(
    (total, product) => total + parseFloat(product.price) * product.quantity,
    0
  );

  const discountAmount = discountPercent ? (subtotal * discountPercent) / 100 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) {
      toast.error("Please enter a coupon code.");
      return;
    }

    try {
      const result = await checkCoupon({ code: couponInput.trim() }).unwrap();
      if (result?.data) {
        setDiscountPercent(result.data);
        setAppliedCoupon(couponInput.trim());
        toast.success(`Coupon applied! ${result.data}% discount.`);
      } else {
        toast.error("Invalid coupon code.");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid or expired coupon code.");
    }
  };

  const handleCheckout = async () => {
    if (!user || !user.email) {
      toast.error("Please log in to proceed with checkout.");
      return;
    }

    if (!shippingAddress.trim() || !shippingCity.trim() || !shippingPhone.trim()) {
      toast.error("Please fill in all required shipping address fields.");
      return;
    }

    const orderPayload = {
      customerEmail: user.email,
      totalAmount: finalTotal,
      couponCode: appliedCoupon || undefined,
      paymentMethod: "SSLCommerz",
      shippingAddress: shippingAddress.trim(),
      shippingCity: shippingCity.trim(),
      shippingZipCode: shippingZipCode.trim() || undefined,
      shippingPhone: shippingPhone.trim(),
      OrderItem: {
        data: cartItems.map((product) => ({
          productId: product.id,
          quantity: product.quantity,
          price: parseFloat(product.price),
        })),
      },
    };

    try {
      const res = await createOrder(orderPayload).unwrap();

      const gatewayUrl =
        res?.data?.GatewayPageURL || res?.data?.redirectGatewayURL;

      if (gatewayUrl) {
        window.location.href = gatewayUrl;
      } else {
        const errorMsg =
          res?.data?.failedreason ||
          res?.message ||
          "Failed to initiate payment gateway. Please try again.";
        toast.error(errorMsg);
      }
    } catch (err: any) {
      console.error(err);
      toast.error(
        err?.data?.message || err?.message || "Failed to create order."
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2 text-center">Checkout & Shipping</h1>
      <p className="text-center text-gray-500 mb-6">Complete your order details</p>
      <div className="divider"></div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl font-medium mb-4">Your cart is empty.</p>
          <Link to="/products" className="btn btn-primary">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form (2 cols) */}
          <div className="lg:col-span-2 space-y-6 bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span>📍</span> Delivery Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Delivery Street Address *</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="House, road, area details..."
                  className="textarea textarea-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">City / District *</span>
                </label>
                <input
                  type="text"
                  required
                  value={shippingCity}
                  onChange={(e) => setShippingCity(e.target.value)}
                  placeholder="e.g. Dhaka"
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text font-medium">Zip / Postal Code</span>
                </label>
                <input
                  type="text"
                  value={shippingZipCode}
                  onChange={(e) => setShippingZipCode(e.target.value)}
                  placeholder="e.g. 1212"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="md:col-span-2">
                <label className="label">
                  <span className="label-text font-medium">Recipient Contact Phone *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={shippingPhone}
                  onChange={(e) => setShippingPhone(e.target.value)}
                  placeholder="e.g. 01700000000"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Coupon Box */}
            <div className="pt-4 border-t border-base-200">
              <h3 className="text-sm font-semibold mb-2 text-gray-600">Have a coupon code?</h3>
              <form onSubmit={handleApplyCoupon} className="flex gap-2 max-w-md">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Try NEWYEAR2025"
                  className="input input-bordered input-sm flex-1 uppercase"
                />
                <button
                  type="submit"
                  disabled={isCouponChecking}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  {isCouponChecking ? "Checking..." : "Apply"}
                </button>
              </form>
              {appliedCoupon && (
                <span className="text-xs text-success mt-1 block">
                  ✓ Code <strong>{appliedCoupon}</strong> active ({discountPercent}% off)
                </span>
              )}
            </div>
          </div>

          {/* Order Summary (1 col) */}
          <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200 h-fit space-y-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <div className="divide-y divide-base-200 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((product) => (
                <div key={product.id} className="py-2.5 flex justify-between items-center text-sm">
                  <div>
                    <p className="font-medium line-clamp-1">{product.name}</p>
                    <p className="text-xs text-gray-500">Qty: {product.quantity}</p>
                  </div>
                  <p className="font-semibold">
                    ${(parseFloat(product.price) * product.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-base-200 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {discountPercent ? (
                <div className="flex justify-between text-success font-medium">
                  <span>Discount ({discountPercent}%):</span>
                  <span>- ${discountAmount.toFixed(2)}</span>
                </div>
              ) : null}

              <div className="flex justify-between text-gray-600">
                <span>Payment:</span>
                <span className="font-medium">SSLCommerz (Online)</span>
              </div>

              <div className="flex justify-between text-lg font-bold pt-2 border-t border-base-200">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              disabled={isLoading}
              onClick={handleCheckout}
              className="btn btn-success w-full text-white mt-4"
            >
              {isLoading ? "Processing..." : "Pay with SSLCommerz"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;

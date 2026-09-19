import { useState } from "react";
import { toast } from "sonner";
import { useCreateOrderMutation } from "../../redux/services/orderApi";
import { useAppSelector } from "../../hooks/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useCheckCouponMutation } from "../../redux/services/authApi";
import CheckoutFunnelSteps from "../../components/customer/CheckoutFunnelSteps";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Building,
  ShieldCheck,
  Lock,
  ArrowLeft,
  Check,
  Store,
  CreditCard,
} from "lucide-react";

const CheckoutPage = () => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const user = useAppSelector(selectCurrentUser);
  const cartItems = useAppSelector((state) => state.cart.items);
  const reduxAppliedCoupon = useAppSelector((state) => state.cart.appliedCoupon);

  const [checkCoupon, { isLoading: isCouponChecking }] = useCheckCouponMutation();
  const [discountPercent, setDiscountPercent] = useState<number | null>(
    reduxAppliedCoupon ? reduxAppliedCoupon.discountPercent : null
  );
  const [appliedCoupon, setAppliedCoupon] = useState<string>(
    reduxAppliedCoupon ? reduxAppliedCoupon.code : ""
  );
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
  const isFreeShipping = subtotal >= 100;
  const shippingFee = cartItems.length === 0 || isFreeShipping ? 0 : 15;
  const estimatedTax = (subtotal - discountAmount) * 0.05; // 5% VAT
  const finalTotal = Math.max(
    0,
    subtotal - discountAmount + shippingFee + estimatedTax
  );

  const vendorName = cartItems[0]?.shop?.name || "Verified Partner Boutique";

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) {
      toast.error("Please enter a coupon code.");
      return;
    }

    try {
      const result = await checkCoupon({ code }).unwrap();
      if (result?.data) {
        setDiscountPercent(Number(result.data));
        setAppliedCoupon(code);
        toast.success(`Coupon "${code}" applied! ${result.data}% discount.`);
        setCouponInput("");
        return;
      }
    } catch {
      if (code === "WELCOME10" || code === "AMAR10") {
        setDiscountPercent(10);
        setAppliedCoupon(code);
        toast.success(`Coupon "${code}" applied! 10% discount.`);
        setCouponInput("");
        return;
      } else if (code === "SAVE20") {
        setDiscountPercent(20);
        setAppliedCoupon(code);
        toast.success(`Special Promo "${code}" applied! 20% discount.`);
        setCouponInput("");
        return;
      }
      toast.error("Invalid or expired coupon code. Try 'WELCOME10' or 'SAVE20'");
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
    <div className="min-h-screen bg-base-200/40 text-base-content py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Step Indicator Funnel */}
        <CheckoutFunnelSteps currentStep={2} />

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              to="/cart"
              className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-primary transition mb-1"
            >
              <ArrowLeft size={14} /> Back to Bag
            </Link>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-base-content">
              Shipping & Checkout
            </h1>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-2xl bg-base-100 border border-base-200 shadow-xs">
            <Store size={14} className="text-primary" />
            <span>Fulfilling Boutique: <strong>{vendorName}</strong></span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16 bg-base-100 rounded-3xl border border-base-200 p-8">
            <p className="text-lg font-bold mb-3">Your shopping bag is empty.</p>
            <p className="text-xs text-gray-400 mb-6">Add products from our catalog before checking out.</p>
            <Link to="/products" className="btn btn-primary rounded-full px-7">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Delivery Information Form (7 cols) */}
            <div className="lg:col-span-7 space-y-6 bg-base-100 p-6 sm:p-8 rounded-3xl border border-base-200 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-base-200">
                <h2 className="text-lg font-bold flex items-center gap-2 text-base-content">
                  <MapPin size={18} className="text-primary" />
                  <span>Delivery Address</span>
                </h2>
                <span className="text-[11px] font-semibold text-gray-400">* Required Fields</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Street Address */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-base-content flex items-center gap-1.5">
                    <span>Street & House Address *</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    placeholder="House number, road number, apartment / building details..."
                    className="textarea textarea-bordered w-full rounded-2xl text-xs leading-relaxed focus:border-primary"
                  />
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content flex items-center gap-1.5">
                    <Building size={13} className="text-gray-400" />
                    <span>City / District *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    placeholder="e.g. Dhaka, Chittagong..."
                    className="input input-bordered w-full rounded-2xl text-xs focus:border-primary"
                  />
                </div>

                {/* Postal Code */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-base-content flex items-center gap-1.5">
                    <span>Postal / Zip Code</span>
                  </label>
                  <input
                    type="text"
                    value={shippingZipCode}
                    onChange={(e) => setShippingZipCode(e.target.value)}
                    placeholder="e.g. 1212"
                    className="input input-bordered w-full rounded-2xl text-xs focus:border-primary"
                  />
                </div>

                {/* Phone */}
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-base-content flex items-center gap-1.5">
                    <Phone size={13} className="text-gray-400" />
                    <span>Recipient Contact Phone *</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={shippingPhone}
                    onChange={(e) => setShippingPhone(e.target.value)}
                    placeholder="e.g. 017XXXXXXXX"
                    className="input input-bordered w-full rounded-2xl text-xs focus:border-primary"
                  />
                  <p className="text-[10px] text-gray-400">
                    Used by the delivery agent to contact you upon arrival.
                  </p>
                </div>
              </div>

              {/* Coupon Box */}
              <div className="pt-5 border-t border-base-200 space-y-2">
                <h3 className="text-xs font-bold text-base-content">
                  Promotional Coupon
                </h3>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-500" />
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        Code "{appliedCoupon}" Active
                      </span>
                      <span className="text-gray-400">({discountPercent}% savings)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setAppliedCoupon("");
                        setDiscountPercent(null);
                        toast.info("Coupon removed.");
                      }}
                      className="btn btn-ghost btn-xs text-error"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2 max-w-md">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Enter promo code (e.g. SAVE20)"
                      className="input input-bordered input-sm rounded-xl flex-1 text-xs uppercase font-mono focus:border-primary"
                    />
                    <button
                      type="submit"
                      disabled={isCouponChecking}
                      className="btn btn-sm btn-primary rounded-xl font-semibold text-xs px-4"
                    >
                      {isCouponChecking ? "..." : "Apply"}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Order Summary Column (5 cols) */}
            <div className="lg:col-span-5 bg-base-100 p-6 sm:p-7 rounded-3xl border border-base-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-base-200">
                <h2 className="text-lg font-bold text-base-content">Order Summary</h2>
                <span className="text-xs text-gray-400">{cartItems.length} unique item(s)</span>
              </div>

              {/* Itemized list with thumbnails */}
              <div className="divide-y divide-base-200 max-h-72 overflow-y-auto pr-1">
                {cartItems.map((product) => {
                  const img = Array.isArray(product.imageUrl)
                    ? product.imageUrl[0]
                    : product.imageUrl;

                  return (
                    <div
                      key={product.id}
                      className="py-3 flex items-center justify-between gap-3 text-xs sm:text-sm"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={img || "/placeholder.png"}
                          alt={product.name}
                          className="w-12 h-12 rounded-xl object-cover border border-base-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold truncate text-base-content">
                            {product.name}
                          </p>
                          <p className="text-[11px] text-gray-400">
                            Qty: {product.quantity} × ${parseFloat(product.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-base-content shrink-0">
                        ${(parseFloat(product.price) * product.quantity).toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Price Calculation Breakdown */}
              <div className="space-y-2.5 pt-4 border-t border-base-200 text-xs">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-base-content">${subtotal.toFixed(2)}</span>
                </div>

                {discountPercent ? (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>Coupon Discount ({discountPercent}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                ) : null}

                <div className="flex justify-between text-gray-500">
                  <span>Express Delivery</span>
                  <span className="font-bold text-base-content">
                    {isFreeShipping ? (
                      <span className="text-emerald-500 uppercase">FREE</span>
                    ) : (
                      `$${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-gray-500">
                  <span>Estimated VAT (5%)</span>
                  <span className="font-bold text-base-content">${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-base sm:text-lg font-extrabold pt-3 border-t border-base-200 text-base-content">
                  <span>Grand Total</span>
                  <span className="text-primary text-xl sm:text-2xl">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Primary Payment CTA: Branded with SSLCommerz trust badge */}
              <button
                disabled={isLoading}
                onClick={handleCheckout}
                className="btn btn-primary w-full rounded-full font-bold shadow-lg shadow-primary/25 text-sm gap-2 hover:scale-[1.02] transition-transform"
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <>
                    <Lock size={15} />
                    <span>Pay ${finalTotal.toFixed(2)} with SSLCommerz</span>
                  </>
                )}
              </button>

              {/* Security Badges */}
              <div className="pt-2 border-t border-base-200/80 space-y-2 text-[11px] text-gray-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                  <span>Verified 256-bit SSL Transaction Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard size={14} className="text-primary shrink-0" />
                  <span>Supports Visa, Mastercard, bKash, Nagad</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;

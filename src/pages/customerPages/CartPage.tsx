import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  CartItem,
  clearCart,
  removeProduct,
  updateQuantity,
  setAppliedCoupon,
  removeCoupon,
} from "../../redux/features/cartSlice";
import { useAppSelector } from "../../hooks/hook";
import { useCheckCouponMutation } from "../../redux/services/authApi";
import CheckoutFunnelSteps from "../../components/customer/CheckoutFunnelSteps";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Store,
  Check,
  X,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import EmptyState from "../../components/shared/EmptyState";

const FREE_SHIPPING_THRESHOLD = 100;

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const appliedCoupon = useAppSelector((state) => state.cart.appliedCoupon);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState("");
  const [isConfirmClearOpen, setIsConfirmClearOpen] = useState(false);
  const [checkCoupon, { isLoading: isCheckingCoupon }] = useCheckCouponMutation();

  const handleIncrease = (product: CartItem) => {
    const maxStock = Number(product.inventoryCount ?? 99);
    if (maxStock > product.quantity) {
      dispatch(
        updateQuantity({
          productId: product.id,
          quantity: product.quantity + 1,
        })
      );
    } else {
      toast.error(`Only ${maxStock} items available in stock.`);
    }
  };

  const handleDecrease = (product: CartItem) => {
    if (product.quantity > 1) {
      dispatch(
        updateQuantity({
          productId: product.id,
          quantity: product.quantity - 1,
        })
      );
    } else {
      handleRemove(product.id, product.name);
    }
  };

  const handleRemove = (productId: string, name?: string) => {
    dispatch(removeProduct(productId));
    toast.info(`"${name || "Product"}" removed from cart.`);
  };

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
        const discountVal = Number(result.data);
        dispatch(setAppliedCoupon({ code, discountPercent: discountVal }));
        toast.success(`Coupon "${code}" applied! ${discountVal}% discount.`);
        setCouponInput("");
        return;
      }
    } catch {
      // Sandbox / fallback promos
      if (code === "WELCOME10" || code === "AMAR10") {
        dispatch(setAppliedCoupon({ code, discountPercent: 10 }));
        toast.success(`Coupon "${code}" applied! 10% discount.`);
        setCouponInput("");
        return;
      } else if (code === "SAVE20") {
        dispatch(setAppliedCoupon({ code, discountPercent: 20 }));
        toast.success(`Special Promo "${code}" applied! 20% discount.`);
        setCouponInput("");
        return;
      }
      toast.error("Invalid or expired coupon code. Try 'WELCOME10' or 'SAVE20'");
    }
  };

  const handleRemoveCoupon = () => {
    dispatch(removeCoupon());
    toast.info("Coupon code removed.");
  };

  // Subtotal Calculation
  const subtotal = cartItems.reduce(
    (total, product) => total + parseFloat(product.price) * product.quantity,
    0
  );

  // Discount & Shipping
  const couponDiscountPercent = appliedCoupon?.discountPercent || 0;
  const discountAmount = couponDiscountPercent
    ? (subtotal * couponDiscountPercent) / 100
    : 0;

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = cartItems.length === 0 || isFreeShipping ? 0 : 15;
  const estimatedTax = (subtotal - discountAmount) * 0.05; // 5% tax
  const finalGrandTotal = Math.max(
    0,
    subtotal - discountAmount + shippingFee + estimatedTax
  );

  const amountNeededForFreeShipping = Math.max(
    0,
    FREE_SHIPPING_THRESHOLD - subtotal
  );
  const freeShippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100
  );

  const vendorName = cartItems[0]?.shop?.name || "Verified Partner Boutique";

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex items-center justify-center">
        <EmptyState
          icon={ShoppingBag}
          title="Your Shopping Bag is Empty"
          description="Looks like you haven't added any items to your bag yet. Explore our curated catalog of unique boutique products."
          actionText="Explore All Products"
          actionLink="/products"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200/40 text-base-content py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Step Indicator Funnel */}
        <CheckoutFunnelSteps currentStep={1} />

        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Order Review
            </p>
            <h1 className="mt-1 text-2xl sm:text-4xl font-extrabold text-base-content">
              Your Shopping Bag
            </h1>
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)} total item(s) from 1 boutique
          </span>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="p-4 sm:p-5 rounded-3xl border border-base-200 bg-base-100 shadow-sm mb-8">
          <div className="flex items-center justify-between text-xs font-bold mb-2.5">
            <div className="flex items-center gap-2">
              <Truck size={16} className="text-primary" />
              <span>
                {isFreeShipping
                  ? "🎉 You've unlocked FREE Express Shipping!"
                  : `Add $${amountNeededForFreeShipping.toFixed(2)} more to unlock FREE Express Shipping!`}
              </span>
            </div>
            <span className="text-primary font-mono">{freeShippingProgress.toFixed(0)}%</span>
          </div>

          <div className="w-full bg-base-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-8 space-y-4">
            {/* Vendor Identification Card */}
            <div className="flex items-center justify-between px-5 py-3.5 rounded-2xl bg-base-100 border border-base-200 shadow-xs text-xs font-semibold">
              <div className="flex items-center gap-2">
                <Store size={16} className="text-primary" />
                <span>
                  Boutique: <strong className="text-base-content">{vendorName}</strong>
                </span>
              </div>
              <span className="badge badge-primary badge-sm font-bold uppercase tracking-wider">
                Direct Merchant Cart
              </span>
            </div>

            {/* Cart Items List */}
            <div className="rounded-3xl border border-base-200 bg-base-100 shadow-sm divide-y divide-base-200 overflow-hidden">
              {cartItems.map((product) => {
                const itemPrice = parseFloat(product.price);
                const lineTotal = itemPrice * product.quantity;
                const firstImg = Array.isArray(product.imageUrl)
                  ? product.imageUrl[0]
                  : product.imageUrl;

                return (
                  <div
                    key={product.id}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-base-200/30 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={
                          firstImg ||
                          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=150&q=80"
                        }
                        alt={product.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-base-200 shrink-0"
                      />
                      <div className="space-y-1">
                        {product.category?.name && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                            {product.category.name}
                          </span>
                        )}
                        <h3 className="text-sm sm:text-base font-bold leading-snug">
                          <Link
                            to={`/products/${product.id}`}
                            className="hover:text-primary transition-colors line-clamp-1"
                          >
                            {product.name}
                          </Link>
                        </h3>
                        <div className="text-xs font-semibold text-gray-400">
                          ${itemPrice.toFixed(2)} each
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Action Controls */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 self-stretch sm:self-center">
                      <div className="flex items-center gap-2 border border-base-300 rounded-2xl p-1 bg-base-100 shadow-inner">
                        <button
                          onClick={() => handleDecrease(product)}
                          className="btn btn-ghost btn-circle btn-xs text-base-content hover:bg-base-200"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-bold text-xs">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrease(product)}
                          className="btn btn-ghost btn-circle btn-xs text-base-content hover:bg-base-200"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-right min-w-[70px]">
                        <div className="text-base font-extrabold text-primary">
                          ${lineTotal.toFixed(2)}
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemove(product.id, product.name)}
                        className="btn btn-ghost btn-circle btn-sm text-gray-400 hover:text-error hover:bg-error/10"
                        title="Remove item"
                        aria-label={`Remove ${product.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Navigation & Actions */}
            <div className="flex items-center justify-between pt-2">
              <Link
                to="/products"
                className="btn btn-ghost btn-sm text-xs font-semibold gap-1.5"
              >
                ← Continue Shopping
              </Link>
              <button
                onClick={() => setIsConfirmClearOpen(true)}
                className="btn btn-ghost btn-sm text-xs font-semibold text-error hover:bg-error/10"
              >
                Clear Entire Bag
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & Promo Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 sm:p-7 rounded-3xl border border-base-200 bg-base-100 shadow-sm space-y-6">
              <h2 className="text-lg font-bold">Order Summary</h2>

              {/* Promo / Coupon Box */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500">
                  Have a Promo Code?
                </label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs">
                    <div className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-500" />
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {appliedCoupon.code}
                      </span>
                      <span className="text-gray-400">
                        ({appliedCoupon.discountPercent}% off)
                      </span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="btn btn-ghost btn-circle btn-xs text-gray-400 hover:text-error"
                      title="Remove promo"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Try 'WELCOME10' or 'SAVE20'"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="input input-bordered input-sm rounded-xl flex-1 text-xs uppercase font-mono"
                    />
                    <button
                      type="submit"
                      disabled={isCheckingCoupon}
                      className="btn btn-sm btn-primary rounded-xl font-semibold text-xs px-4"
                    >
                      {isCheckingCoupon ? (
                        <span className="loading loading-spinner loading-xs" />
                      ) : (
                        "Apply"
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t border-base-200 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Items Subtotal</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount ({appliedCoupon.discountPercent}%)</span>
                    <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-500">Express Delivery</span>
                  <span className="font-bold">
                    {isFreeShipping ? (
                      <span className="text-emerald-500 font-bold uppercase">FREE</span>
                    ) : (
                      `$${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated VAT (5%)</span>
                  <span className="font-bold">${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-base-200 flex justify-between items-end">
                  <div>
                    <div className="text-sm font-bold">Total Amount</div>
                    <div className="text-[10px] text-gray-400">
                      Calculated before payment
                    </div>
                  </div>
                  <div className="text-2xl font-extrabold text-primary">
                    ${finalGrandTotal.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigate("/checkout")}
                className="btn btn-primary btn-block rounded-full font-bold shadow-lg shadow-primary/25 gap-2 text-sm hover:scale-[1.02] transition-transform"
              >
                <span>Proceed to Delivery & Checkout</span>
                <ArrowRight size={16} />
              </button>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-base-200 space-y-2.5 text-[11px] text-gray-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span>SSLCommerz Encrypted Gateway</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={14} className="text-primary" />
                  <span>7-Day Return Policy on Damaged Goods</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-amber-500" />
                  <span>Direct Partner Boutique Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Clear Cart Confirmation Modal (Replacing window.confirm) */}
        {isConfirmClearOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
            <div className="bg-base-100 rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-base-200 space-y-4">
              <div className="flex items-center gap-3 text-error">
                <AlertCircle size={24} />
                <h3 className="font-bold text-base text-base-content">Clear Shopping Bag?</h3>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                This will remove all items currently in your bag. Are you sure you want to proceed?
              </p>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsConfirmClearOpen(false)}
                  className="btn btn-ghost btn-sm rounded-full text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    dispatch(clearCart());
                    setIsConfirmClearOpen(false);
                    toast.info("Shopping bag cleared.");
                  }}
                  className="btn btn-error btn-sm rounded-full text-xs font-semibold text-white"
                >
                  Yes, Clear Bag
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;

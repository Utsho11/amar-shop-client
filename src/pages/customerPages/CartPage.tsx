import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  CartItem,
  clearCart,
  removeProduct,
  updateQuantity,
} from "../../redux/features/cartSlice";
import { useAppSelector } from "../../hooks/hook";
import { useTheme } from "../../context/ThemeContext";
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
} from "lucide-react";
import { toast } from "sonner";
import EmptyState from "../../components/shared/EmptyState";

const FREE_SHIPPING_THRESHOLD = 100;

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState<number | null>(null);
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

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

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) {
      toast.error("Please enter a valid coupon code.");
      return;
    }

    setIsApplyingCoupon(true);
    // Simulate coupon check or accept standard promos
    setTimeout(() => {
      setIsApplyingCoupon(false);
      const code = couponCode.trim().toUpperCase();
      if (code === "WELCOME10" || code === "AMAR10") {
        setCouponDiscount(10);
        toast.success("Coupon applied! 10% discount applied to your order.");
      } else if (code === "SAVE20") {
        setCouponDiscount(20);
        toast.success("Special Promo applied! 20% discount applied.");
      } else {
        toast.error("Invalid or expired coupon code. Try 'WELCOME10'");
      }
    }, 600);
  };

  // Subtotal Calculation
  const subtotal = cartItems.reduce(
    (total, product) => total + parseFloat(product.price) * product.quantity,
    0
  );

  // Discount Calculation
  const discountAmount = couponDiscount ? (subtotal * couponDiscount) / 100 : 0;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee = cartItems.length === 0 || isFreeShipping ? 0 : 15;
  const estimatedTax = (subtotal - discountAmount) * 0.05; // 5% tax
  const finalGrandTotal = Math.max(0, subtotal - discountAmount + shippingFee + estimatedTax);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const vendorName = cartItems[0]?.shop?.name || "Verified Partner Store";

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your Shopping Cart is Empty"
          description="Looks like you haven't added any items to your cart yet. Explore our curated collections and discover great deals."
          actionText="Explore All Products"
          actionLink="/products"
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#141312] text-[#F9F5F0]" : "bg-[#F9F5F0] text-[#3D352F]"}`}>
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] ${
              isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
            }`}
          >
            Shopping Bag
          </p>
          <h1 className="mt-2 text-2xl sm:text-4xl font-extrabold">Review Your Cart</h1>
        </div>

        {/* Free Shipping Progress Bar */}
        <div
          className={`p-4 sm:p-5 rounded-3xl border shadow-xs mb-8 ${
            isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold mb-2">
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
            {/* Vendor Notification Card */}
            <div className="flex items-center justify-between px-5 py-3 rounded-2xl bg-base-200 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <Store size={15} className="text-primary" />
                <span>Shopping from: <strong>{vendorName}</strong></span>
              </div>
              <span className="badge badge-primary badge-xs font-bold uppercase">Single-Vendor Cart</span>
            </div>

            {/* Cart Items */}
            <div
              className={`rounded-3xl border shadow-xs divide-y divide-base-200 overflow-hidden ${
                isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
              }`}
            >
              {cartItems.map((product) => {
                const itemPrice = parseFloat(product.price);
                const lineTotal = itemPrice * product.quantity;
                const firstImg = Array.isArray(product.imageUrl) ? product.imageUrl[0] : product.imageUrl;

                return (
                  <div key={product.id} className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={firstImg || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=150&q=80"}
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
                          <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
                            {product.name}
                          </Link>
                        </h3>
                        <div className="text-xs font-semibold text-gray-500">
                          ${itemPrice.toFixed(2)} each
                        </div>
                      </div>
                    </div>

                    {/* Quantity & Action Controls */}
                    <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-6 self-stretch sm:self-center">
                      <div className="flex items-center gap-2 border border-base-300 rounded-2xl p-1 bg-base-100">
                        <button
                          onClick={() => handleDecrease(product)}
                          className="btn btn-ghost btn-circle btn-xs text-gray-600 hover:bg-base-200"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-bold text-xs">{product.quantity}</span>
                        <button
                          onClick={() => handleIncrease(product)}
                          className="btn btn-ghost btn-circle btn-xs text-gray-600 hover:bg-base-200"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-extrabold text-primary">
                          ${lineTotal.toFixed(2)}
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemove(product.id, product.name)}
                        className="btn btn-ghost btn-circle btn-sm text-gray-400 hover:text-error hover:bg-error/10"
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2">
              <Link to="/products" className="btn btn-ghost btn-sm text-xs font-semibold">
                ← Continue Shopping
              </Link>
              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to clear your cart?")) {
                    dispatch(clearCart());
                    toast.info("Shopping cart cleared.");
                  }
                }}
                className="btn btn-ghost btn-sm text-xs font-semibold text-error hover:bg-error/10"
              >
                Clear Entire Cart
              </button>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div className="lg:col-span-4 space-y-6">
            <div
              className={`p-6 sm:p-7 rounded-3xl border shadow-sm space-y-6 ${
                isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
              }`}
            >
              <h2 className="text-lg font-bold">Order Summary</h2>

              {/* Promo / Coupon Box */}
              <form onSubmit={handleApplyCoupon} className="space-y-2">
                <label className="text-xs font-semibold text-gray-500">Apply Promo / Coupon Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. WELCOME10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="input input-bordered input-sm rounded-xl flex-1 text-xs uppercase font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isApplyingCoupon}
                    className="btn btn-sm btn-primary rounded-xl font-semibold text-xs"
                  >
                    {isApplyingCoupon ? <span className="loading loading-spinner loading-xs" /> : "Apply"}
                  </button>
                </div>
                {couponDiscount && (
                  <p className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
                    <Check size={12} /> {couponDiscount}% Promo Applied!
                  </p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-3 pt-4 border-t border-base-200 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Items Subtotal</span>
                  <span className="font-bold">${subtotal.toFixed(2)}</span>
                </div>

                {couponDiscount && (
                  <div className="flex justify-between text-emerald-500">
                    <span>Discount ({couponDiscount}%)</span>
                    <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Shipping</span>
                  <span className="font-bold">
                    {isFreeShipping ? <span className="text-emerald-500 uppercase">FREE</span> : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Tax (5% VAT)</span>
                  <span className="font-bold">${estimatedTax.toFixed(2)}</span>
                </div>

                <div className="pt-3 border-t border-base-200 flex justify-between items-end">
                  <div>
                    <div className="text-sm font-bold">Estimated Total</div>
                    <div className="text-[10px] text-gray-400">Includes applicable taxes & fees</div>
                  </div>
                  <div className="text-2xl font-extrabold text-primary">
                    ${finalGrandTotal.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigate("/checkout")}
                className="btn btn-primary btn-block rounded-2xl font-bold shadow-md shadow-primary/25 gap-2 text-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-base-200 space-y-2.5 text-[11px] text-gray-500">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span>256-bit SSL Encrypted Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw size={14} className="text-primary" />
                  <span>30-Day Easy Replacement Policy</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={14} className="text-amber-500" />
                  <span>Direct Express Dispatch to Address</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

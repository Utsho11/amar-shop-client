import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store/store";
import { removeFromCompare, clearCompare } from "../redux/features/comparisonSlice";
import { addProduct, replaceCart } from "../redux/features/cartSlice";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import {
  Scale,
  Trash2,
  ShoppingCart,
  CheckCircle,
  XCircle,
  Store,
  Layers,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import { TProduct } from "../types";

const ComparisonPage = () => {
  const compareItems = useSelector((state: RootState) => state.comparison.items);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleAddToCart = (product: TProduct) => {
    try {
      dispatch(addProduct(product));
      toast.success(`"${product.name}" added to your cart!`);
    } catch (err: any) {
      if (err?.message?.includes("VENDOR") || err?.message?.includes("vendor")) {
        const replace = window.confirm(
          "Your cart contains items from a different shop. Would you like to clear your cart and add this product?"
        );
        if (replace) {
          dispatch(replaceCart([product]));
          toast.success(`Cart updated with "${product.name}"!`);
        }
      } else {
        toast.error("Failed to add to cart.");
      }
    }
  };

  if (compareItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-4xl text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
          <Scale size={40} />
        </div>
        <h1 className="text-3xl font-bold mb-3">No Products to Compare</h1>
        <p className="text-gray-500 max-w-md mb-8">
          Add up to 3 products to compare features, specs, pricing, and ratings side-by-side to make the best purchasing decision.
        </p>
        <Link to="/products" className="btn btn-primary rounded-full px-8">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-base-200">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] flex items-center gap-1.5 ${
              isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
            }`}
          >
            <Scale size={14} /> Side-by-Side Analysis
          </p>
          <h1 className="text-3xl font-bold mt-1">Product Comparison</h1>
          <p className="text-sm text-gray-500">
            Comparing {compareItems.length} of 3 maximum products
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/products" className="btn btn-outline btn-sm rounded-xl">
            Add More Products
          </Link>
          <button
            onClick={() => dispatch(clearCompare())}
            className="btn btn-ghost btn-sm text-error gap-1.5"
          >
            <Trash2 size={15} /> Clear All
          </button>
        </div>
      </div>

      {/* Comparison Grid Table */}
      <div className="overflow-x-auto rounded-3xl border border-base-200 bg-base-100 shadow-sm">
        <table className="table w-full border-collapse">
          <tbody>
            {/* 1. Product Image & Action Header */}
            <tr className="border-b border-base-200">
              <td className="w-48 font-semibold bg-base-200/40 text-sm align-top p-6">
                Product Details
              </td>
              {compareItems.map((product) => (
                <td key={product.id} className="min-w-[260px] p-6 align-top">
                  <div className="relative group">
                    <button
                      onClick={() => dispatch(removeFromCompare(product.id))}
                      className="btn btn-circle btn-xs btn-ghost text-error absolute -top-2 -right-2 bg-base-100 shadow-sm"
                      title="Remove from comparison"
                    >
                      ✕
                    </button>
                    <img
                      src={product.imageUrl?.[0] || "/placeholder.png"}
                      alt={product.name}
                      className="w-full h-48 object-cover rounded-2xl border border-base-200 mb-4"
                    />
                    <Link
                      to={`/products/${product.id}`}
                      className="font-bold text-base hover:text-primary transition line-clamp-2 flex items-center gap-1 group-hover:underline"
                    >
                      {product.name}
                      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 shrink-0" />
                    </Link>
                  </div>
                </td>
              ))}
            </tr>

            {/* 2. Price & Discount */}
            <tr className="border-b border-base-200">
              <td className="font-semibold bg-base-200/40 text-sm p-6">Price & Offer</td>
              {compareItems.map((product) => {
                const originalPrice = parseFloat(product.price);
                const discount = product.discount || 0;
                const finalPrice = discount > 0 ? originalPrice - (originalPrice * discount) / 100 : originalPrice;

                return (
                  <td key={product.id} className="p-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        ${finalPrice.toFixed(2)}
                      </span>
                      {discount > 0 && (
                        <>
                          <span className="text-sm text-gray-400 line-through">
                            ${originalPrice.toFixed(2)}
                          </span>
                          <span className="badge badge-secondary badge-sm">
                            {discount}% OFF
                          </span>
                        </>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* 3. Category */}
            <tr className="border-b border-base-200">
              <td className="font-semibold bg-base-200/40 text-sm p-6 flex items-center gap-2">
                <Layers size={16} /> Category
              </td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-6">
                  <span className="badge badge-ghost font-medium">
                    {product.category?.name || product.categoryName || "General"}
                  </span>
                </td>
              ))}
            </tr>

            {/* 4. Vendor / Shop */}
            <tr className="border-b border-base-200">
              <td className="font-semibold bg-base-200/40 text-sm p-6 flex items-center gap-2">
                <Store size={16} /> Shop / Vendor
              </td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-6 font-medium text-sm">
                  {product.shop?.name || product.shopName || "Verified Shop"}
                </td>
              ))}
            </tr>

            {/* 5. Inventory & Stock Status */}
            <tr className="border-b border-base-200">
              <td className="font-semibold bg-base-200/40 text-sm p-6">Availability</td>
              {compareItems.map((product) => {
                const count = Number(product.inventoryCount) || 0;
                const inStock = count > 0;

                return (
                  <td key={product.id} className="p-6">
                    {inStock ? (
                      <div className="flex items-center gap-2 text-success text-sm font-medium">
                        <CheckCircle size={16} />
                        <span>In Stock ({count} available)</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-error text-sm font-medium">
                        <XCircle size={16} />
                        <span>Out of Stock</span>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>

            {/* 6. Overview Description */}
            <tr className="border-b border-base-200">
              <td className="font-semibold bg-base-200/40 text-sm p-6 align-top">Description</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-6 align-top">
                  <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed max-h-40 overflow-y-auto">
                    {product.description || "No description provided for this product."}
                  </p>
                </td>
              ))}
            </tr>

            {/* 7. Action / Add to Cart */}
            <tr>
              <td className="font-semibold bg-base-200/40 text-sm p-6">Order Decision</td>
              {compareItems.map((product) => (
                <td key={product.id} className="p-6">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="btn btn-primary w-full rounded-2xl gap-2 font-semibold shadow-sm text-sm"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonPage;

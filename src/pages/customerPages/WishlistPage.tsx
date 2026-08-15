import { useGetMyWishlistQuery, useToggleWishlistMutation } from "../../redux/services/orderApi";
import { useDispatch } from "react-redux";
import { addProduct, replaceCart } from "../../redux/features/cartSlice";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, ExternalLink } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { toast } from "sonner";
import Loading from "../../components/shared/Loading";
import { TProduct } from "../../types";

const WishlistPage = () => {
  const { data, isLoading, refetch } = useGetMyWishlistQuery(undefined);
  const [toggleWishlist] = useToggleWishlistMutation();
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const wishlistProducts: TProduct[] = data?.data || [];

  const handleAddToCart = (product: TProduct) => {
    try {
      dispatch(addProduct(product));
      toast.success(`"${product.name}" added to cart!`);
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

  const handleRemove = async (productId: string) => {
    try {
      await toggleWishlist({ productId }).unwrap();
      toast.info("Product removed from wishlist.");
      refetch();
    } catch (err) {
      toast.error("Failed to remove item.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (wishlistProducts.length === 0) {
    return (
      <div className="py-16 text-center max-w-lg mx-auto">
        <div className="w-20 h-20 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-6">
          <Heart size={36} />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h2>
        <p className="text-gray-500 text-sm mb-6">
          Explore our collection, find items you love, and tap the heart icon to save them for later!
        </p>
        <Link to="/products" className="btn btn-primary rounded-full px-8">
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-base-200">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] flex items-center gap-1.5 ${
              isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
            }`}
          >
            <Heart size={14} className="fill-current text-rose-500" /> Saved Items
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold mt-1">My Wishlist</h1>
        </div>
        <span className="badge badge-primary badge-lg font-semibold">
          {wishlistProducts.length} {wishlistProducts.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {/* Wishlist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistProducts.map((product) => {
          const originalPrice = parseFloat(product.price);
          const discount = product.discount || 0;
          const finalPrice = discount > 0 ? originalPrice - (originalPrice * discount) / 100 : originalPrice;

          return (
            <div
              key={product.id}
              className={`group flex flex-col justify-between rounded-3xl border overflow-hidden transition-all duration-300 hover:shadow-lg ${
                isDark ? "bg-[#211E1D] border-white/10" : "bg-white border-[#E8DED2]"
              }`}
            >
              {/* Product Thumbnail */}
              <div className="relative h-48 w-full overflow-hidden bg-base-200">
                <img
                  src={product.imageUrl?.[0] || "/placeholder.png"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <button
                  onClick={() => handleRemove(product.id)}
                  className="absolute top-3 right-3 btn btn-circle btn-xs btn-ghost bg-base-100/90 text-error hover:bg-base-100 shadow"
                  title="Remove from wishlist"
                >
                  <Trash2 size={13} />
                </button>
              </div>

              {/* Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge badge-ghost badge-sm">
                      {product.category?.name || "General"}
                    </span>
                    {discount > 0 && (
                      <span className="badge badge-secondary badge-sm font-semibold">
                        {discount}% OFF
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/products/${product.id}`}
                    className="font-bold text-base line-clamp-1 hover:text-primary transition flex items-center gap-1"
                  >
                    {product.name}
                    <ExternalLink size={13} className="opacity-0 group-hover:opacity-100 shrink-0" />
                  </Link>

                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {product.description || "High-quality product from verified shop."}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-base-200">
                  <div className="flex items-baseline justify-between mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-primary">
                        ${finalPrice.toFixed(2)}
                      </span>
                      {discount > 0 && (
                        <span className="text-xs text-gray-400 line-through">
                          ${originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {product.shop?.name}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="btn btn-primary btn-sm w-full rounded-2xl gap-2 font-semibold shadow-sm"
                  >
                    <ShoppingCart size={15} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistPage;

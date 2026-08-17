import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFollowShopMutation,
  useGetFollowersQuery,
  useGetProductsBySingleShopQuery,
  useGetSingleShopQuery,
  useUnfollowShopMutation,
} from "../redux/services/shopApi";
import { TProduct } from "../types";
import { useAppSelector } from "../hooks/hook";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import ProductCard from "../components/product/ProductCard";
import { useTheme } from "../context/ThemeContext";
import {
  Store,
  Users,
  ShieldCheck,
  Star,
  Package,
  Search,
  Share2,
  Check,
  Truck,
  RotateCcw,
  ArrowUpDown,
  UserCheck,
  UserPlus,
} from "lucide-react";
import { toast } from "sonner";
import { ProductGridSkeleton } from "../components/shared/ProductCardSkeleton";
import EmptyState from "../components/shared/EmptyState";

type TFollow = {
  id: string;
  customerEmail: string;
  shopId: string;
  createdAt: Date;
};

const ShopPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const user = useAppSelector(selectCurrentUser);

  const { data: shopResponse, isLoading: isShopLoading } = useGetSingleShopQuery(id);
  const { data: productsResponse, isLoading: isProductsLoading } = useGetProductsBySingleShopQuery(id);
  const { data: followersResponse } = useGetFollowersQuery(id as string, { skip: !id });

  const [followShop, { isLoading: isFollowing }] = useFollowShopMutation();
  const [unfollowShop, { isLoading: isUnfollowing }] = useUnfollowShopMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"newest" | "lowToHigh" | "highToLow" | "discount">("newest");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [copied, setCopied] = useState(false);

  const shop = shopResponse?.data;
  const products: TProduct[] = productsResponse?.data || [];
  const followers: TFollow[] = followersResponse?.data || [];

  const isFollowedByMe = useMemo(() => {
    if (!user?.email || !followers.length) return false;
    return followers.some((f) => f.customerEmail === user.email);
  }, [followers, user]);

  const handleToggleFollow = async () => {
    if (!user) {
      toast.info("Please sign in to follow this merchant.");
      navigate("/auth/login");
      return;
    }

    try {
      if (isFollowedByMe) {
        await unfollowShop(id as string).unwrap();
        toast.info(`Unfollowed ${shop?.name || "shop"}.`);
      } else {
        await followShop(id as string).unwrap();
        toast.success(`You are now following ${shop?.name || "this shop"}!`);
      }
    } catch {
      toast.error("Failed to update follow status.");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Storefront link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Distinct categories in this shop
  const shopCategories = useMemo(() => {
    const cats = new Set<string>();
    products.forEach((p) => {
      if (p.category?.name) cats.add(p.category.name);
    });
    return Array.from(cats);
  }, [products]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(term));
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category?.name === selectedCategory);
    }

    if (inStockOnly) {
      result = result.filter((p) => Number(p.inventoryCount ?? 0) > 0);
    }

    if (sortBy === "lowToHigh") {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === "highToLow") {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === "discount") {
      result.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    }

    return result;
  }, [products, searchTerm, selectedCategory, inStockOnly, sortBy]);

  if (isShopLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="container mx-auto px-4 py-20">
        <EmptyState
          icon={Store}
          title="Storefront Not Found"
          description="The merchant shop you are looking for does not exist or has been deactivated."
          actionText="Browse All Shops"
          actionLink="/"
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#141312] text-[#F9F5F0]" : "bg-[#F9F5F0] text-[#3D352F]"}`}>
      <div className="container mx-auto px-4 py-8 max-w-7xl space-y-8">
        {/* Storefront Hero Card */}
        <div
          className={`rounded-3xl border shadow-sm overflow-hidden relative ${
            isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
          }`}
        >
          {/* Cover Header */}
          <div
            className={`h-40 sm:h-56 w-full relative ${
              isDark
                ? "bg-gradient-to-r from-[#2A2421] via-[#1E1B1A] to-[#141312]"
                : "bg-gradient-to-r from-[#F1EAE0] via-[#E8DED2] to-[#D4C3B3]"
            }`}
          >
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="btn btn-sm btn-circle bg-base-100/80 backdrop-blur-md border-none shadow-md hover:bg-base-100"
                title="Share Storefront"
              >
                {copied ? <Check size={16} className="text-emerald-500" /> : <Share2 size={16} />}
              </button>
            </div>
          </div>

          {/* Store Info Content */}
          <div className="px-6 sm:px-10 pb-8 pt-0 relative">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 -mt-16 sm:-mt-20 mb-6">
              {/* Logo & Store Title */}
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
                <img
                  src={shop.logoUrl || "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=200&q=80"}
                  alt={shop.name}
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-4 border-base-100 shadow-xl bg-base-100 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-extrabold">{shop.name}</h1>
                    <span className="badge badge-secondary badge-sm font-semibold gap-1">
                      <ShieldCheck size={12} /> Verified Merchant
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-zinc-400 font-mono">
                    {shop.vendorEmail}
                  </p>
                </div>
              </div>

              {/* Follow Button */}
              <button
                onClick={handleToggleFollow}
                disabled={isFollowing || isUnfollowing}
                className={`btn btn-sm sm:btn-md rounded-full px-6 font-bold shadow-md transition-all self-stretch sm:self-auto gap-2 ${
                  isFollowedByMe
                    ? "btn-outline border-primary text-primary hover:bg-primary hover:text-white"
                    : "btn-primary shadow-primary/25"
                }`}
              >
                {isFollowedByMe ? (
                  <>
                    <UserCheck size={16} />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus size={16} />
                    <span>Follow Shop</span>
                  </>
                )}
              </button>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-300 max-w-3xl leading-relaxed">
              {shop.description || "Welcome to our verified merchant boutique on Amar Shop. Browse through our handpicked quality catalog."}
            </p>

            {/* Store Telemetry Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-base-200">
              <div className="p-4 rounded-2xl bg-base-200 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-gray-500">
                  <Users size={14} className="text-primary" />
                  <span>Followers</span>
                </div>
                <div className="text-xl font-bold mt-1">{followers.length}</div>
              </div>

              <div className="p-4 rounded-2xl bg-base-200 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-gray-500">
                  <Package size={14} className="text-emerald-500" />
                  <span>Total Products</span>
                </div>
                <div className="text-xl font-bold mt-1">{products.length} Items</div>
              </div>

              <div className="p-4 rounded-2xl bg-base-200 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-gray-500">
                  <Truck size={14} className="text-blue-500" />
                  <span>Dispatch Window</span>
                </div>
                <div className="text-xl font-bold mt-1">&lt; 24h</div>
              </div>

              <div className="p-4 rounded-2xl bg-base-200 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-gray-500">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  <span>Store Rating</span>
                </div>
                <div className="text-xl font-bold mt-1">4.9 ★</div>
              </div>
            </div>
          </div>
        </div>

        {/* Store Catalog Section */}
        <div className="space-y-6">
          {/* Filter & Search Header */}
          <div
            className={`p-5 sm:p-6 rounded-3xl border shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 ${
              isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
            }`}
          >
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search products in this store..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered input-sm rounded-full pl-10 w-full text-xs"
              />
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Category Pills */}
              {shopCategories.length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`btn btn-xs rounded-full ${
                      selectedCategory === null ? "btn-primary" : "btn-ghost"
                    }`}
                  >
                    All
                  </button>
                  {shopCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                      className={`btn btn-xs rounded-full ${
                        selectedCategory === cat ? "btn-primary" : "btn-ghost"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {/* In-Stock Toggle */}
              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer border border-base-200 px-3 py-1.5 rounded-full bg-base-200/50">
                <span>In Stock Only</span>
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-xs"
                />
              </label>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-1.5">
                <ArrowUpDown size={14} className="text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="select select-bordered select-xs rounded-full font-semibold"
                >
                  <option value="newest">Newest</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                  <option value="discount">Highest Discount</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {isProductsLoading ? (
            <ProductGridSkeleton count={8} />
          ) : filteredProducts.length === 0 ? (
            <div className="py-16">
              <EmptyState
                icon={Package}
                title="No Products Found in this Store"
                description="Try clearing your search term or category filters to view available items."
                actionText="Reset Filters"
                onActionClick={() => {
                  setSearchTerm("");
                  setSelectedCategory(null);
                  setInStockOnly(false);
                }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          )}
        </div>

        {/* Merchant Confidence Banner */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border shadow-sm text-center ${
            isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <div className="text-left">
                <div className="font-bold text-xs">Direct Merchant Dispatch</div>
                <div className="text-[10px] text-gray-400">Products ship directly from {shop.name}</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <RotateCcw size={20} />
              </div>
              <div className="text-left">
                <div className="font-bold text-xs">30-Day Free Returns</div>
                <div className="text-[10px] text-gray-400">Hassle-free replacement policy</div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <Star size={20} />
              </div>
              <div className="text-left">
                <div className="font-bold text-xs">Verified Customer Reviews</div>
                <div className="text-[10px] text-gray-400">100% authentic purchase feedback</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

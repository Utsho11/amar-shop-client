import { useState } from "react";
import {
  Users,
  Edit,
  ExternalLink,
  Copy,
  Check,
  Package,
  ShieldCheck,
  AlertTriangle,
  PlusCircle,
  ShoppingBag,
  Star,
  Search,
} from "lucide-react";
import {
  useEditShopMutation,
  useGetFollowersQuery,
  useGetMyShopQuery,
} from "../../redux/services/shopApi";
import { useGetProductsByVendorQuery } from "../../redux/services/vendorApi";
import EditShop from "../../components/modals/EditShop";
import { toast } from "sonner";
import { FieldValues } from "react-hook-form";
import Loading from "../../components/shared/Loading";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { TProduct } from "../../types";

const MyShop = () => {
  const [editShop] = useEditShopMutation();
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState<"all" | "inStock" | "outOfStock">("all");

  const { data: shop, isLoading, isError } = useGetMyShopQuery(null);
  const { data: productsData, isLoading: isProductsLoading } = useGetProductsByVendorQuery(null);
  const shopData = shop?.data?.[0];
  const shopId = shopData?.id;
  const { data: followers } = useGetFollowersQuery(shopId, { skip: !shopId });
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError || !shopData) {
    return (
      <div className="text-center py-20 bg-base-100 rounded-3xl border border-base-200 p-8 shadow-sm">
        <AlertTriangle className="mx-auto text-amber-500 mb-3" size={40} />
        <h2 className="text-xl font-bold">No Shop Found</h2>
        <p className="text-xs text-gray-500 mt-1 mb-6">
          You haven't set up your vendor shop yet.
        </p>
        <Link to="/vendorDashboard/createShop" className="btn btn-primary btn-sm rounded-xl">
          Create My Shop
        </Link>
      </div>
    );
  }

  const handleSave = async (updatedData: FieldValues) => {
    try {
      const toastId = toast.loading("Updating shop details...");
      await editShop(updatedData).unwrap();
      toast.success("Shop updated successfully!", { id: toastId });
      setEditModalOpen(false);
    } catch {
      toast.error("Failed to update shop.");
    }
  };

  const copyStoreUrl = () => {
    const url = `${window.location.origin}/shop/${shopId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Public storefront link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const products: TProduct[] = productsData?.data || [];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const count = Number(p.inventoryCount ?? 0);
    const matchesStock =
      stockFilter === "all"
        ? true
        : stockFilter === "inStock"
        ? count > 0
        : count <= 0;
    return matchesSearch && matchesStock;
  });

  const inStockCount = products.filter((p) => Number(p.inventoryCount ?? 0) > 0).length;

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p
            className={`text-xs font-semibold uppercase tracking-[0.3em] ${
              isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
            }`}
          >
            Storefront Hub
          </p>
          <h1
            className={`mt-2 text-2xl sm:text-3xl font-bold ${
              isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
            }`}
          >
            My Shop Profile & Inventory
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={copyStoreUrl}
            className="btn btn-sm btn-outline rounded-xl font-semibold gap-1.5"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            <span>{copied ? "Copied" : "Copy Link"}</span>
          </button>

          <Link
            to={`/shop/${shopId}`}
            target="_blank"
            className="btn btn-sm btn-primary rounded-xl font-semibold gap-1.5 shadow-sm"
          >
            <span>Live Storefront</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </div>

      {/* Hero Storefront Banner */}
      <div
        className={`rounded-3xl border shadow-sm overflow-hidden relative ${
          isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
        }`}
      >
        {/* Cover Gradient Background */}
        <div
          className={`h-36 sm:h-48 w-full ${
            isDark
              ? "bg-gradient-to-r from-[#2A2421] via-[#1E1B1A] to-[#141312]"
              : "bg-gradient-to-r from-[#F1EAE0] via-[#E8DED2] to-[#D4C3B3]"
          }`}
        />

        {/* Store Info Content */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 -mt-14 sm:-mt-16 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <img
                src={shopData.logoUrl || "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=200&q=80"}
                alt={shopData.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-base-100 shadow-xl bg-base-100"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-bold">{shopData.name}</h2>
                  {shopData.isBlacklisted ? (
                    <span className="badge badge-error badge-xs font-semibold gap-1">
                      <AlertTriangle size={10} /> Blacklisted
                    </span>
                  ) : (
                    <span className="badge badge-secondary badge-xs font-semibold gap-1">
                      <ShieldCheck size={10} /> Active Merchant
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-zinc-400 font-mono">
                  {shopData.vendorEmail}
                </p>
              </div>
            </div>

            <button
              onClick={() => setEditModalOpen(true)}
              className="btn btn-sm btn-primary rounded-xl font-semibold gap-1.5 shadow-sm self-stretch sm:self-auto"
            >
              <Edit size={14} />
              Edit Shop Details
            </button>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-300 max-w-3xl leading-relaxed">
            {shopData.description || "No description provided for this store."}
          </p>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-base-200">
            <div className="p-4 rounded-2xl bg-base-200 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-gray-500">
                <Users size={14} className="text-primary" />
                <span>Followers</span>
              </div>
              <div className="text-xl font-bold mt-1">{followers?.data?.length || 0}</div>
            </div>

            <div className="p-4 rounded-2xl bg-base-200 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-gray-500">
                <Package size={14} className="text-emerald-500" />
                <span>Total Listed</span>
              </div>
              <div className="text-xl font-bold mt-1">{products.length} Products</div>
            </div>

            <div className="p-4 rounded-2xl bg-base-200 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-gray-500">
                <Check size={14} className="text-blue-500" />
                <span>Ready in Stock</span>
              </div>
              <div className="text-xl font-bold mt-1">{inStockCount} Items</div>
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

      {/* Shop Products Inventory Section */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
          isDark ? "bg-[#171514] border-white/10" : "bg-white border-base-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">Store Catalog Inventory</h2>
            <p className="text-xs text-gray-500">
              Browse, monitor inventory counts, and manage products listed under this shop
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered input-sm rounded-xl pl-9 w-48 sm:w-60 text-xs"
              />
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Filter Pills */}
            <div className="join">
              <button
                onClick={() => setStockFilter("all")}
                className={`btn btn-xs join-item ${stockFilter === "all" ? "btn-primary" : "btn-ghost"}`}
              >
                All
              </button>
              <button
                onClick={() => setStockFilter("inStock")}
                className={`btn btn-xs join-item ${stockFilter === "inStock" ? "btn-primary" : "btn-ghost"}`}
              >
                In Stock
              </button>
              <button
                onClick={() => setStockFilter("outOfStock")}
                className={`btn btn-xs join-item ${stockFilter === "outOfStock" ? "btn-primary" : "btn-ghost"}`}
              >
                Out of Stock
              </button>
            </div>

            <Link
              to="/vendorDashboard/addProduct"
              className="btn btn-sm btn-primary rounded-xl font-semibold gap-1.5 shadow-sm"
            >
              <PlusCircle size={14} />
              Add Product
            </Link>
          </div>
        </div>

        {/* Product Table */}
        {isProductsLoading ? (
          <div className="py-12 flex justify-center">
            <Loading />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-base-200/50 rounded-2xl p-6">
            <ShoppingBag className="mx-auto text-gray-400 mb-2" size={32} />
            <p className="text-xs font-semibold text-gray-500">No matching products found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-xs">
              <thead>
                <tr className="text-gray-500 dark:text-zinc-400">
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Stock Count</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover">
                    <td>
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.imageUrl?.[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=100&q=80"}
                          alt={prod.name}
                          className="w-10 h-10 rounded-xl object-cover"
                        />
                        <span className="font-semibold">{prod.name}</span>
                      </div>
                    </td>
                    <td>{prod.category?.name || "General"}</td>
                    <td className="font-bold text-primary">${Number(prod.price).toFixed(2)}</td>
                    <td>
                      {prod.discount ? (
                        <span className="badge badge-error badge-xs font-semibold text-white">
                          {prod.discount}% OFF
                        </span>
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </td>
                    <td className="font-mono font-bold">{prod.inventoryCount ?? 0}</td>
                    <td>
                      {Number(prod.inventoryCount ?? 0) > 0 ? (
                        <span className="badge badge-success badge-xs font-semibold text-white">
                          In Stock
                        </span>
                      ) : (
                        <span className="badge badge-error badge-xs font-semibold text-white">
                          Out of Stock
                        </span>
                      )}
                    </td>
                    <td>
                      <Link
                        to={`/product/${prod.id}`}
                        target="_blank"
                        className="btn btn-ghost btn-xs text-primary gap-1"
                      >
                        <span>View</span>
                        <ExternalLink size={10} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Shop Modal */}
      {isEditModalOpen && (
        <EditShop
          shop={shopData}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default MyShop;

import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetProductsQuery,
  useGetReviewsSingleProductQuery,
  useGetSingleProductQuery,
} from "../redux/services/productApi";
import Loading from "../components/shared/Loading";
import { useTheme } from "../context/ThemeContext";
import {
  addWithQuantity,
  replaceCartWithProduct,
} from "../redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hook";
import ReviewSection from "../components/home/ReviewSection";
import { TReview, type TProduct } from "../types";
import { addRecentProduct } from "../redux/features/recentProductsSlice";
import StarRating from "../components/StarRating";
import ProductCard from "../components/product/ProductCard";
import VendorConflictModal from "../components/modals/VendorConflictModal";
import {
  FaShoppingCart,
  FaTags,
  FaStore,
  FaBoxOpen,
  FaLayerGroup,
  FaBolt,
} from "react-icons/fa";
import {
  ChevronRight,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/swiper-bundle.css";
import { useRecentlyViewed } from "../hooks/useRecentlyViewed";
import RecentlyViewedSection from "../components/home/RecentlyViewedSection";
import RecommendedProductsSection from "../components/product/RecommendedProductsSection";
import EmptyState from "../components/shared/EmptyState";
import { toast } from "sonner";

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetSingleProductQuery(id as string);
  const { data: reviews } = useGetReviewsSingleProductQuery(id as string);

  const product = data?.data;
  const category = product?.category?.name;

  const { data: prod, isFetching } = useGetProductsQuery(
    { category },
    { skip: !category },
  );

  const { theme } = useTheme();
  const isDark = theme === "dark";
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addProduct: addToRecentlyViewed } = useRecentlyViewed();

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [zoomImage, setZoomImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isConflictModalOpen, setIsConflictModalOpen] = useState<boolean>(false);

  const cartItems = useAppSelector((state) => state.cart.items);
  const currentVendorName = cartItems[0]?.shop?.name || "Another Boutique";

  useEffect(() => {
    if (product) {
      dispatch(addRecentProduct(product));
      addToRecentlyViewed(product);
      setActiveImageIndex(0);
      if (mainSwiper && !mainSwiper.destroyed) {
        mainSwiper.slideTo(0);
      }
    }
  }, [product, dispatch, addToRecentlyViewed, mainSwiper]);

  const reviewData: TReview[] = useMemo(() => {
    const rawReviews = reviews?.data;
    if (Array.isArray(rawReviews)) {
      return rawReviews as TReview[];
    }
    if (Array.isArray((rawReviews as any)?.reviews)) {
      return (rawReviews as any).reviews as TReview[];
    }
    return [];
  }, [reviews?.data]);

  const averageRating = useMemo(() => {
    if (!reviewData.length) return 0;

    const totalRating = reviewData.reduce(
      (acc, review) => acc + (review.rating || 0),
      0,
    );

    return totalRating / reviewData.length;
  }, [reviewData]);

  const images: string[] = useMemo(() => {
    const rawUrl = product?.imageUrl as unknown;
    if (Array.isArray(rawUrl) && rawUrl.length > 0) {
      return rawUrl.filter((img): img is string => typeof img === "string" && img.trim() !== "");
    }
    if (typeof rawUrl === "string" && rawUrl.trim() !== "") {
      return [rawUrl];
    }
    return ["/placeholder.png"];
  }, [product?.imageUrl]);

  const relatedProducts =
    prod?.data?.products?.filter((item: TProduct) => item.id !== product?.id) ||
    [];

  if (isLoading) return <Loading />;

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center p-6">
        <EmptyState
          title="Product Not Found"
          description="The product you are looking for does not exist or has been removed."
          actionText="Browse All Products"
          actionLink="/products"
        />
      </div>
    );
  }

  const finalPrice =
    Number(product.price) -
    (Number(product.price) * Number(product.discount || 0)) / 100;

  const handleShop = () => {
    navigate(`/shop/${product?.shop?.id}`);
  };

  const handleAddToCart = () => {
    try {
      dispatch(addWithQuantity({ product, quantity }));
      toast.success(
        quantity > 1
          ? `${quantity} × "${product.name}" added to cart!`
          : `"${product.name}" added to cart!`
      );
    } catch (error: any) {
      if (error.message === "DIFFERENT_VENDOR_DETECTED") {
        setIsConflictModalOpen(true);
      }
    }
  };

  const handleBuyNow = () => {
    try {
      dispatch(addWithQuantity({ product, quantity }));
      navigate("/checkout");
    } catch (error: any) {
      if (error.message === "DIFFERENT_VENDOR_DETECTED") {
        setIsConflictModalOpen(true);
      }
    }
  };

  const handleConfirmVendorReplace = () => {
    dispatch(replaceCartWithProduct({ product, quantity }));
    toast.success(`Cart updated with "${product.name}"!`);
  };

  return (
    <main className="min-h-screen bg-base-200/40 text-base-content pb-24 lg:pb-16">
      <section className="container mx-auto px-4 py-6 lg:py-10 max-w-7xl">
        {/* Breadcrumb Navigation (WCAG & Information Architecture) */}
        <nav
          className="mb-6 flex items-center gap-2 text-xs text-gray-500 flex-wrap"
          aria-label="Breadcrumb"
        >
          <Link to="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <ChevronRight size={13} className="text-gray-400" />
          <Link
            to="/products"
            className="hover:text-primary transition-colors font-medium"
          >
            All Products
          </Link>
          {product.category?.name && (
            <>
              <ChevronRight size={13} className="text-gray-400" />
              <Link
                to={`/products?category=${encodeURIComponent(product.category.name)}`}
                className="hover:text-primary transition-colors font-medium"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight size={13} className="text-gray-400" />
          <span className="font-semibold text-base-content line-clamp-1 max-w-[240px]">
            {product.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Image Gallery */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-base-200 bg-base-100 p-3 sm:p-4 shadow-sm">
              {/* Main Image Slider */}
              <div className="relative rounded-2xl overflow-hidden bg-base-200/40">
                <Swiper
                  modules={[Navigation, Pagination]}
                  onSwiper={setMainSwiper}
                  onSlideChange={(swiper) => setActiveImageIndex(swiper.activeIndex)}
                  className="rounded-2xl"
                >
                  {images.map((img: string, index: number) => (
                    <SwiperSlide key={index}>
                      <div
                        onClick={() => setZoomImage(img)}
                        className="h-[320px] sm:h-[420px] lg:h-[480px] w-full flex items-center justify-center p-4 relative group cursor-zoom-in select-none"
                      >
                        <img
                          src={img}
                          alt={`${product.name} - view ${index + 1}`}
                          className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.png";
                          }}
                        />
                        <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm pointer-events-none">
                          <span>🔍 Tap to Zoom</span>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Previous / Next Arrows */}
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        if (mainSwiper && !mainSwiper.destroyed) {
                          mainSwiper.slidePrev();
                        }
                      }}
                      disabled={activeImageIndex === 0}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-base-100/90 hover:bg-base-100 text-base-content disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center shadow-md backdrop-blur-sm transition-transform active:scale-95"
                    >
                      <ChevronRight size={20} className="rotate-180" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (mainSwiper && !mainSwiper.destroyed) {
                          mainSwiper.slideNext();
                        }
                      }}
                      disabled={activeImageIndex === images.length - 1}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-base-100/90 hover:bg-base-100 text-base-content disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center shadow-md backdrop-blur-sm transition-transform active:scale-95"
                    >
                      <ChevronRight size={20} />
                    </button>

                    {/* Counter Pill */}
                    <div className="absolute top-3 right-3 z-10 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {activeImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnails strip */}
              {images.length > 1 && (
                <div className="mt-3 flex items-center gap-3 overflow-x-auto pb-1 pt-1 px-1 scrollbar-thin">
                  {images.map((img: string, index: number) => {
                    const isActive = activeImageIndex === index;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setActiveImageIndex(index);
                          if (mainSwiper && !mainSwiper.destroyed) {
                            mainSwiper.slideTo(index);
                          }
                        }}
                        aria-label={`Select photo ${index + 1} of ${images.length}`}
                        className={`relative h-18 w-18 sm:h-20 sm:w-20 shrink-0 rounded-xl overflow-hidden border-2 bg-base-200/60 p-1 transition-all duration-200 focus:outline-none ${
                          isActive
                            ? "border-primary ring-2 ring-primary/40 scale-105 shadow-sm"
                            : "border-base-300 hover:border-primary/50 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/placeholder.png";
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Product Info Card */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm lg:p-8 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-secondary/15 px-3.5 py-1 text-xs font-bold text-secondary-content">
                  {product.category?.name || "General"}
                </span>

                {(product.discount ?? 0) > 0 && (
                  <span className="rounded-full bg-rose-500/10 px-3.5 py-1 text-xs font-bold text-rose-500">
                    {product.discount}% OFF
                  </span>
                )}

                <div className="ml-auto flex items-center gap-1.5 text-xs text-amber-500">
                  <StarRating rating={averageRating} />
                  <span className="font-bold text-base-content">
                    {averageRating.toFixed(1)}
                  </span>
                  <span className="text-gray-400">({reviewData.length})</span>
                </div>
              </div>

              {/* Title & Price */}
              <div>
                <h1 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl text-base-content leading-tight">
                  {product.name}
                </h1>

                <div className="mt-4 flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black text-primary">
                    ${finalPrice.toFixed(2)}
                  </span>

                  {(product.discount ?? 0) > 0 && (
                    <span className="text-base sm:text-lg text-gray-400 line-through">
                      ${Number(product.price).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick specs grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <InfoCard
                  icon={<FaLayerGroup />}
                  title="Inventory"
                  value={`${product.inventoryCount ?? 0} In Stock`}
                  isDark={isDark}
                />
                <InfoCard
                  icon={<FaBoxOpen />}
                  title="Authenticity"
                  value="100% Genuine"
                  isDark={isDark}
                />
                <InfoCard
                  icon={<FaStore />}
                  title="Boutique"
                  value={product.shop?.name || "Verified Store"}
                  isDark={isDark}
                  onClick={handleShop}
                />
                <InfoCard
                  icon={<FaTags />}
                  title="Discount Tag"
                  value={`${product.discount || 0}% Savings`}
                  isDark={isDark}
                />
              </div>

              {/* Quantity Stepper & Stock Check (Hick's & Fitts's Law) */}
              <div className="pt-4 border-t border-base-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Quantity
                  </span>
                  {Number(product.inventoryCount) > 0 ? (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Available ({product.inventoryCount} in stock)
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-error">
                      Currently Out of Stock
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center border border-base-300 rounded-2xl p-1 bg-base-100 shadow-xs">
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      disabled={quantity <= 1 || Number(product.inventoryCount) <= 0}
                      className="btn btn-ghost btn-circle btn-sm text-base-content hover:bg-base-200"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center font-bold text-sm">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        const maxStock = Number(product.inventoryCount ?? 99);
                        if (quantity < maxStock) {
                          setQuantity((prev) => prev + 1);
                        } else {
                          toast.error(`Only ${maxStock} items available in stock.`);
                        }
                      }}
                      disabled={quantity >= Number(product.inventoryCount) || Number(product.inventoryCount) <= 0}
                      className="btn btn-ghost btn-circle btn-sm text-base-content hover:bg-base-200"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="text-xs text-gray-500">
                    Subtotal:{" "}
                    <strong className="text-sm font-extrabold text-primary">
                      ${(finalPrice * quantity).toFixed(2)}
                    </strong>
                  </div>
                </div>

                {/* Primary Actions: Isolation Effect (Clear distinction between Add to Cart and Buy Now) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={Number(product.inventoryCount) <= 0}
                    className="btn btn-primary rounded-full w-full shadow-lg shadow-primary/25 text-sm font-semibold gap-2 hover:scale-[1.02] transition-transform"
                  >
                    <FaShoppingCart />
                    <span>
                      {Number(product.inventoryCount) > 0
                        ? "Add to Cart"
                        : "Out of Stock"}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBuyNow}
                    disabled={Number(product.inventoryCount) <= 0}
                    className="btn btn-outline rounded-full w-full border-primary text-primary hover:bg-primary hover:text-white text-sm font-semibold gap-2 transition"
                  >
                    <FaBolt />
                    <span>Buy Now</span>
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-base-200 text-[11px] text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck size={15} className="text-emerald-500 shrink-0" />
                    <span>Verified Store</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck size={15} className="text-primary shrink-0" />
                    <span>Direct Dispatch</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RotateCcw size={15} className="text-amber-500 shrink-0" />
                    <span>7-Day Return</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lightbox Zoom Modal */}
        {zoomImage && (
          <div
            onClick={() => setZoomImage(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh]"
            >
              <img
                src={zoomImage}
                alt="Zoomed product"
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setZoomImage(null)}
                className="absolute top-2 right-2 btn btn-circle btn-sm bg-black/50 text-white border-none hover:bg-black"
                aria-label="Close zoom modal"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Overview / Description */}
        <section className="mt-10 rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm lg:p-8">
          <h2 className="text-xl sm:text-2xl font-bold">Product Description</h2>
          <div className="divider my-3"></div>
          <p className="mt-3 leading-relaxed text-sm sm:text-base opacity-85">
            {product.description || "No overview available for this product."}
          </p>
        </section>

        {/* Reviews Section */}
        <section className="mt-10 rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm lg:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold">Customer Reviews & Ratings</h2>
              <p className="mt-1 text-xs sm:text-sm opacity-70">
                Average score: {averageRating ? averageRating.toFixed(1) : 0} out of 5 ({reviewData.length} verified ratings)
              </p>
            </div>

            <StarRating rating={averageRating} />
          </div>

          <ReviewSection reviews={reviewData} />
        </section>

        {/* Related Products */}
        <section className="mt-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold">Related In This Category</h2>
            {category && (
              <Link
                to={`/products?category=${encodeURIComponent(category)}`}
                className="text-xs font-bold text-primary hover:underline"
              >
                View More →
              </Link>
            )}
          </div>

          {isFetching ? (
            <Loading />
          ) : relatedProducts.length ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {relatedProducts.slice(0, 4).map((item: TProduct) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          ) : (
            <p className="text-sm opacity-60">No related products found in this category.</p>
          )}
        </section>

        {/* AI & Proximity Recommendations */}
        {id && <RecommendedProductsSection productId={id} />}

        {/* Recently Viewed Products */}
        <RecentlyViewedSection currentProductId={id} />

        {/* Mobile Sticky Thumb-Zone Action Bar (Fitts's Law) */}
        <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden p-3 bg-base-100/95 backdrop-blur-md border-t border-base-200 shadow-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={images[0]}
              alt={product.name}
              className="w-12 h-12 rounded-xl object-cover border border-base-200 shrink-0"
            />
            <div className="min-w-0">
              <div className="text-xs font-bold truncate">{product.name}</div>
              <div className="text-sm font-extrabold text-primary">
                ${finalPrice.toFixed(2)}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={Number(product.inventoryCount) <= 0}
            className="btn btn-primary btn-sm rounded-full px-5 text-xs font-bold shadow-lg shadow-primary/25 shrink-0 gap-1.5"
          >
            <FaShoppingCart size={13} />
            <span>{Number(product.inventoryCount) > 0 ? "Add to Cart" : "Sold Out"}</span>
          </button>
        </div>

        {/* Vendor Conflict Modal */}
        <VendorConflictModal
          isOpen={isConflictModalOpen}
          onClose={() => setIsConflictModalOpen(false)}
          onConfirmReplace={handleConfirmVendorReplace}
          currentVendorName={currentVendorName}
          newProduct={product}
          quantity={quantity}
        />
      </section>
    </main>
  );
};

const InfoCard = ({
  icon,
  title,
  value,
  isDark,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  isDark: boolean;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border p-4 transition ${
        onClick ? "cursor-pointer hover:-translate-y-0.5" : ""
      } ${
        isDark
          ? "border-white/10 bg-white/5 hover:bg-white/10"
          : "border-base-200 bg-base-100 hover:bg-base-200/50"
      }`}
    >
      <div className="mb-2 text-lg text-primary">{icon}</div>
      <p className="text-xs text-gray-400">{title}</p>
      <h4 className="mt-1 text-xs sm:text-sm font-bold truncate">{value}</h4>
    </div>
  );
};

export default ProductDetailsPage;

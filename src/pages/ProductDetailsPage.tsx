import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProductsQuery,
  useGetReviewsSingleProductQuery,
  useGetSingleProductQuery,
} from "../redux/services/productApi";
import Loading from "../components/shared/Loading";
import { useTheme } from "../context/ThemeContext";
import { useDispatch } from "react-redux";
import { addProduct, clearCart } from "../redux/features/cartSlice";
import ReviewSection from "../components/home/ReviewSection";
import { TReview, type TProduct } from "../types";
import { addRecentProduct } from "../redux/features/recentProductsSlice";
import StarRating from "../components/StarRating";
import ProductCard from "../components/product/ProductCard";
import {
  FaShoppingCart,
  FaTags,
  FaStore,
  FaBoxOpen,
  FaLayerGroup,
} from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { addProduct: addToRecentlyViewed } = useRecentlyViewed();

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  useEffect(() => {
    if (product) {
      dispatch(addRecentProduct(product));
      addToRecentlyViewed(product);
    }
  }, [product, dispatch, addToRecentlyViewed]);

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

  const images =
    Array.isArray(product?.imageUrl) && product?.imageUrl.length
      ? product.imageUrl
      : ["/placeholder.png"];

  const relatedProducts =
    prod?.data?.products?.filter((item: TProduct) => item.id !== product?.id) ||
    [];

  const [zoomImage, setZoomImage] = useState<string | null>(null);

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
      dispatch(addProduct(product));
      toast.success(`"${product.name}" added to cart!`);
    } catch (error: any) {
      if (error.message === "DIFFERENT_VENDOR_DETECTED") {
        if (
          window.confirm(
            "Your cart contains items from a different vendor. Do you want to replace the cart with this product?",
          )
        ) {
          dispatch(clearCart());
          dispatch(addProduct(product));
          toast.success("Cart replaced with the new product!");
        }
      }
    }
  };

  return (
    <main
      className={`min-h-screen ${
        isDark ? "bg-[#0f1115] text-gray-100" : "bg-[#f8f5f0] text-gray-900"
      }`}
    >
      <section className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Image Gallery */}
          <div className="lg:col-span-6">
            <div
              className={`rounded-3xl border p-3 shadow-xl relative ${
                isDark
                  ? "border-white/10 bg-[#171a21]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <Swiper
                modules={[Navigation, Pagination, Thumbs]}
                navigation
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                className="rounded-2xl"
              >
                {images.map((img: string, index: number) => (
                  <SwiperSlide key={index}>
                    <div
                      onClick={() => setZoomImage(img)}
                      className="h-[320px] sm:h-[430px] lg:h-[520px] overflow-hidden rounded-2xl relative group cursor-zoom-in"
                    >
                      <img
                        src={img}
                        alt={`${product.name}-${index + 1}`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm pointer-events-none">
                        <span>🔍 Tap to Zoom</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {images.length > 1 && (
                <Swiper
                  modules={[FreeMode, Thumbs]}
                  onSwiper={setThumbsSwiper}
                  spaceBetween={12}
                  slidesPerView={4}
                  freeMode
                  watchSlidesProgress
                  className="mt-4"
                  breakpoints={{
                    320: { slidesPerView: 3 },
                    640: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                  }}
                >
                  {images.map((img: string, index: number) => (
                    <SwiperSlide key={index}>
                      <div className="h-20 cursor-pointer overflow-hidden rounded-xl border border-gray-300/40">
                        <img
                          src={img}
                          alt={`thumbnail-${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-6">
            <div
              className={`h-full rounded-3xl border p-6 shadow-xl lg:p-8 ${
                isDark
                  ? "border-white/10 bg-[#171a21]"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="mb-4 flex flex-wrap gap-3">
                <span className="rounded-full bg-[#e9c46a]/20 px-4 py-1 text-sm font-medium text-[#c28b20]">
                  {product.category?.name}
                </span>

                {(product.discount ?? 0) > 0 && (
                  <span className="rounded-full bg-red-500/10 px-4 py-1 text-sm font-medium text-red-500">
                    {product.discount}% OFF
                  </span>
                )}
              </div>

              <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                {product.name}
              </h1>

              <div className="mt-4 flex items-center gap-3">
                <span className="text-3xl font-extrabold text-primary">
                  ${finalPrice.toFixed(2)}
                </span>

                {(product.discount ?? 0) > 0 && (
                  <span className="text-lg text-gray-400 line-through">
                    ${Number(product.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Quick specs grid */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <InfoCard
                  icon={<FaLayerGroup />}
                  title="Inventory"
                  value={`${product.inventoryCount ?? 0} In Stock`}
                  isDark={isDark}
                />
                <InfoCard
                  icon={<FaBoxOpen />}
                  title="Total Sold"
                  value="Verified Item"
                  isDark={isDark}
                />
                <InfoCard
                  icon={<FaStore />}
                  title="Shop"
                  value={product.shop?.name || "N/A"}
                  isDark={isDark}
                  onClick={handleShop}
                />
                <InfoCard
                  icon={<FaTags />}
                  title="Discount"
                  value={`${product.discount || 0}%`}
                  isDark={isDark}
                />
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={Number(product.inventoryCount) <= 0}
                  className="btn w-full rounded-full border-none bg-[#A66B55] text-white hover:bg-[#8d5947] text-base font-semibold shadow-md gap-2"
                >
                  <FaShoppingCart />
                  {Number(product.inventoryCount) > 0
                    ? "Add to Cart"
                    : "Out of Stock"}
                </button>
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
            <div className="relative max-w-4xl max-h-[90vh]">
              <img
                src={zoomImage}
                alt="Zoomed product"
                className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setZoomImage(null)}
                className="absolute top-2 right-2 btn btn-circle btn-sm bg-black/50 text-white border-none hover:bg-black"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Overview */}
        <section
          className={`mt-8 rounded-3xl border p-6 shadow-lg lg:p-8 ${
            isDark ? "border-white/10 bg-[#171a21]" : "border-gray-200 bg-white"
          }`}
        >
          <h2 className="text-2xl font-bold">Description / Overview</h2>
          <p className="mt-4 leading-8 opacity-80">
            {product.description || "No overview available for this product."}
          </p>
        </section>

        {/* Reviews */}
        <section
          className={`mt-8 rounded-3xl border p-6 shadow-lg lg:p-8 ${
            isDark ? "border-white/10 bg-[#171a21]" : "border-gray-200 bg-white"
          }`}
        >
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold">Reviews & Ratings</h2>
              <p className="mt-1 text-sm opacity-70">
                Average rating: {averageRating ? averageRating.toFixed(1) : 0}/5
              </p>
            </div>

            <StarRating rating={averageRating} />
          </div>

          <ReviewSection reviews={reviewData} />
        </section>

        {/* Related Products */}
        <section className="mt-10">
          <h2 className="mb-6 text-2xl font-bold">Related Products</h2>

          {isFetching ? (
            <Loading />
          ) : relatedProducts.length ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {relatedProducts.map((item: TProduct) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          ) : (
            <p className="opacity-70">No related products found.</p>
          )}
        </section>

        {/* AI & Smart Recommendations */}
        {id && <RecommendedProductsSection productId={id} />}

        {/* Recently Viewed Products */}
        <RecentlyViewedSection currentProductId={id} />
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
        onClick ? "cursor-pointer hover:-translate-y-1" : ""
      } ${
        isDark
          ? "border-white/10 bg-white/5 hover:bg-white/10"
          : "border-gray-200 bg-[#f8f5f0] hover:bg-[#f2eadf]"
      }`}
    >
      <div className="mb-3 text-xl text-[#d4a23a]">{icon}</div>
      <p className="text-sm opacity-60">{title}</p>
      <h4 className="mt-1 font-semibold">{value}</h4>
    </div>
  );
};

export default ProductDetailsPage;

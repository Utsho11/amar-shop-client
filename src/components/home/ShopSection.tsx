import { useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Store, ArrowUpRight } from "lucide-react";
import "swiper/swiper-bundle.css";

import { TShop, useGetAllShopQuery } from "../../redux/services/shopApi";
import Loading from "../shared/Loading";

const ShopSection = () => {
  const { data, isFetching } = useGetAllShopQuery(null);
  const shops: TShop[] = data?.data || [];
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  if (isFetching) return <Loading />;
  if (!shops.length) return null;

  return (
    <section className="container mx-auto px-4 py-14">
      {/* SECTION HEADER WITH ACCESSIBLE NAV BUTTONS */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-2">
            <Store size={14} />
            <span>Verified Merchants</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-base-content">
            Featured Boutique Stores
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-zinc-400 mt-1">
            Shop directly from independent vendors with verified customer satisfaction.
          </p>
        </div>

        {/* Previous / Next Controls (Fitts's Law) */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous stores"
            className="w-10 h-10 rounded-full border border-base-200 bg-base-100 hover:bg-base-200 text-base-content flex items-center justify-center shadow-xs transition hover:scale-105 active:scale-95"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next stores"
            className="w-10 h-10 rounded-full border border-base-200 bg-base-100 hover:bg-base-200 text-base-content flex items-center justify-center shadow-xs transition hover:scale-105 active:scale-95"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* SLIDER */}
      <Swiper
        onSwiper={setSwiperInstance}
        spaceBetween={20}
        slidesPerView={4}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Navigation]}
        breakpoints={{
          320: { slidesPerView: 1.2, spaceBetween: 12 },
          480: { slidesPerView: 1.8, spaceBetween: 14 },
          640: { slidesPerView: 2.3, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 18 },
          1024: { slidesPerView: 4, spaceBetween: 20 },
        }}
        className="py-2"
      >
        {shops.map((shop) => (
          <SwiperSlide key={shop.id}>
            <Link
              to={`/shop/${shop.id}`}
              className="group block rounded-3xl overflow-hidden border border-base-200 bg-base-100 shadow-sm hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              {/* IMAGE */}
              <div className="relative w-full h-40 overflow-hidden bg-base-200">
                <img
                  src={shop.logoUrl || "/placeholder.png"}
                  alt={shop.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* CONTENT */}
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="line-clamp-1 text-sm font-bold text-base-content group-hover:text-primary transition-colors">
                    {shop.name}
                  </h3>
                  <span className="text-[11px] text-gray-500">Verified Boutique</span>
                </div>

                <div className="w-8 h-8 rounded-full bg-base-200 group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ShopSection;

import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/swiper-bundle.css";

import { TShop, useGetAllShopQuery } from "../../redux/services/shopApi";
import Loading from "../shared/Loading";
import { useTheme } from "../../context/ThemeContext";

const ShopSection = () => {
  const { data, isFetching } = useGetAllShopQuery(null);
  const shops: TShop[] = data?.data || [];
  const { theme } = useTheme();

  const isDark = theme === "dark";

  if (isFetching) return <Loading />;

  return (
    <section
      className={`py-14 px-4 md:px-8 ${
        isDark ? "bg-[#1A1716]" : "bg-[#F9F5F0]"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        {/* CENTER TITLE */}
        <div className="mb-10 text-center">
          <span
            className={`text-xs font-medium uppercase tracking-[0.3em] ${
              isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
            }`}
          >
            Stores
          </span>
        </div>

        {/* SLIDER */}
        <Swiper
          spaceBetween={16}
          slidesPerView={4}
          autoplay={{
            delay: 3200,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            320: { slidesPerView: 1.25 },
            480: { slidesPerView: 1.8 },
            640: { slidesPerView: 2.4 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {shops.map((shop) => (
            <SwiperSlide key={shop.id} className="py-4">
              <Link to={`/shop/${shop.id}`} className="block">
                <article
                  className={`group rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 ${
                    isDark
                      ? "border-white/10 bg-[#211E1D] hover:border-[#A66B55]/40"
                      : "border-[#E8DED2] bg-white hover:border-[#A66B55]/40"
                  }`}
                >
                  {/* FULL WIDTH IMAGE */}
                  <div className="relative w-full h-36 overflow-hidden">
                    <img
                      src={shop.logoUrl}
                      alt={shop.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Dark overlay */}
                    <div
                      className={`absolute inset-0 transition-all duration-500 ${
                        isDark
                          ? "bg-black/40 group-hover:bg-black/20"
                          : "bg-transparent"
                      }`}
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-4 flex items-center justify-between">
                    <h3
                      className={`line-clamp-1 text-sm font-medium ${
                        isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
                      }`}
                    >
                      {shop.name}
                    </h3>

                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-[11px] ${
                        isDark
                          ? "bg-[#2D2927] text-[#C9A68F]"
                          : "bg-[#F1EAE0] text-[#A66B55]"
                      }`}
                    >
                      Visit
                    </span>
                  </div>
                </article>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ShopSection;

import { Autoplay, Navigation } from "swiper/modules";
import { TShop, useGetAllShopQuery } from "../../redux/services/shopApi";
import Loading from "../shared/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
const ShopSection = () => {
  const { data, isFetching } = useGetAllShopQuery(null);
  const shops: TShop[] = data?.data || [];
  const { theme } = useTheme();

  if (isFetching) {
    return <Loading />;
  }

  //   console.log(shops);

  return (
    <div className="my-10">
      <h1 className="text-start text-3xl font-semibold mb-8">
        Top Related Shop
      </h1>
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        navigation={{
          prevEl: ".custom-prev",
          nextEl: ".custom-next",
        }}
        autoplay={{ delay: 3000 }}
        modules={[Autoplay, Navigation]}
        breakpoints={{
          375: { slidesPerView: 2 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {shops?.map((shop) => (
          <SwiperSlide key={shop.id} className="py-4">
            <Link to={`/shop/${shop.id}`}>
              <div
                className={`flex flex-col items-center ${
                  theme === "dark"
                    ? "bg-slate-300 hover:bg-slate-100 text-slate-700"
                    : "bg-white hover:bg-gray-200"
                }  p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="border-b h-[5rem]">
                  <img
                    src={shop.logoUrl}
                    alt={shop.name}
                    className="h-full object-cover mix-blend-multiply"
                  />
                </div>
                <h3 className="text-center p-2">{shop.name}</h3>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShopSection;

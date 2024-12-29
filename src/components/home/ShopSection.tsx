import { Autoplay, Navigation } from "swiper/modules";
import { TShop, useGetAllShopQuery } from "../../redux/services/shopApi";
import Loading from "../shared/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Link } from "react-router-dom";
const ShopSection = () => {
  const { data, isFetching } = useGetAllShopQuery(null);
  const shops: TShop[] = data?.data || [];

  if (isFetching) {
    return <Loading />;
  }

  //   console.log(shops);

  return (
    <div className="py-10 border-y">
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
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {shops?.map((shop) => (
          <SwiperSlide key={shop.id}>
            <Link to={`/shop/${shop.id}`}>
              <div className="border sm:w-[20rem]">
                <div className="border-b sm:h-[20rem]">
                  <img
                    src={shop.logoUrl}
                    alt={shop.name}
                    className="w-full h-full object-cover mix-blend-multiply"
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

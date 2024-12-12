import banner from "../../../assets/banner-1.avif";
import { ShopIcon } from "../../icons/icon";
const Banner1 = () => {
  return (
    <div
      className="hero sm:min-h-full lg:min-h-screen"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-lg text-gray-100">
          <h1 className="mb-5 text-5xl font-bold">Welcome to Amar Shop</h1>
          <p className="mb-5">
            Discover the best deals on your favorite products. Shop now and
            enjoy unbeatable discounts and premium quality!
          </p>
          <button className="btn bg-[#ffb703] text-white text-lg font-bold hover:text-black hover:bg-transparent">
            <ShopIcon /> Start Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner1;

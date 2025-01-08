import { Link } from "react-router-dom";
import banner from "../../../assets/shop.png";
import { ShopIcon } from "../../icons/icon";
const Banner1 = () => {
  return (
    <div
      className="hero sm:min-h-[70vh] mb-10"
      style={{
        backgroundImage: `url(${banner})`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md sm:max-w-2xl text-gray-100 space-y-16">
          <h1 className="mb-5 text-5xl sm:text-7xl font-bold">
            Welcome to Amar Shop
          </h1>
          <p className="mb-5 text-xl sm:text-3xl">
            Discover the best deals on your favorite products. Shop now and
            enjoy unbeatable discounts and premium quality!
          </p>
          <div className="">
            <Link to="products">
              <button className="btn bg-[#ffb703] text-white text-lg font-bold hover:text-black hover:bg-[#ffbc03]">
                <ShopIcon /> Start Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner1;

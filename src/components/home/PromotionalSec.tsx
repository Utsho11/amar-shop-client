import { Link } from "react-router-dom";

const PromotionalSec = () => {
  return (
    <div className="my-10">
      <h1 className="text-start text-2xl md:text-3xl font-semibold mb-6 md:mb-8">
        Promotional Products
      </h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-5 text-black">
        {/* Left Promotional Product */}
        <div className="col-span-3 bg-[#b8e6e2] flex flex-col-reverse sm:flex-row sm:h-[60vh]">
          <div className="sm:w-1/2 flex flex-col justify-center items-center p-4">
            <div className="my-6 md:my-8 text-center">
              <h3 className="text-2xl md:text-4xl">The Westmire</h3>
              <h1 className="text-3xl md:text-5xl font-bold">A56 Headset</h1>
            </div>
            <div className="my-4 md:my-8 flex gap-4 md:gap-10">
              <Link to="/products/d3d0cc6c-11e0-4ed6-b374-6ece5f14e2c2">
                <button className="flex justify-center gap-2 items-center text-sm md:text-lg bg-gray-50 backdrop-blur-md font-medium md:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#ffb703] hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-3 py-2 md:px-4 md:py-2.5 overflow-hidden border-2 rounded-full group">
                  Buy Now
                </button>
              </Link>
              <Link to="/products">
                <button className="flex justify-center gap-2 items-center text-sm md:text-lg bg-gray-200 backdrop-blur-md font-medium md:font-semibold isolation-auto border-gray-200 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#ffb703] hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-3 py-2 md:px-4 md:py-2.5 overflow-hidden border-2 rounded-full group">
                  Shop All
                </button>
              </Link>
            </div>
          </div>
          <div className="sm:w-1/2 flex justify-center items-center p-4">
            <img
              src="/Headphone.webp"
              alt="Headphone"
              className="h-[20vh] md:h-[30vh]"
            />
          </div>
        </div>

        {/* Right Promotional Product */}
        <div
          style={{
            backgroundImage: `url(/shoe.png)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="col-span-2 flex flex-col justify-end p-4 h-[60vh]"
        >
          <div className="my-4 flex items-center sm:items-end justify-between gap-4 md:gap-10">
            <Link to="/products/e6c024db-dc6e-49a8-ba82-de1144388415">
              <button className="flex justify-center gap-2 items-center text-sm md:text-lg bg-gray-50 backdrop-blur-md font-medium md:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#ffb703] hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-3 py-2 md:px-4 md:py-2.5 overflow-hidden border-2 rounded-full group">
                Buy Now
              </button>
            </Link>
            <Link to="/products">
              <button className="flex justify-center gap-2 items-center text-sm md:text-lg bg-gray-200 backdrop-blur-md font-medium md:font-semibold isolation-auto border-gray-200 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#ffb703] hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-3 py-2 md:px-4 md:py-2.5 overflow-hidden border-2 rounded-full group">
                Shop All
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionalSec;

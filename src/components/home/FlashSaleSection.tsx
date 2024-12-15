import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { useGetFlashSaleProductsQuery } from "../../redux/services/productApi";
import Timer from "./Timer";
import Loading from "../shared/Loading";

const FlashSaleSection = () => {
  const { data, isFetching } = useGetFlashSaleProductsQuery(null);
  const { theme } = useTheme();
  const navigate = useNavigate();

  const product = data?.data;

  const slicedProducts = product?.slice(0, 4);

  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="">
      <Timer />
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        {slicedProducts?.map((product, index) => (
          <div
            onClick={() => handleProductClick(product.id)}
            key={index}
            className={`flex flex-col items-start ${
              theme === "dark"
                ? "bg-slate-700 hover:bg-slate-500"
                : "bg-white hover:bg-gray-200"
            } p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300`}
          >
            <div className="w-full h-40 bg-gray-100 rounded-md overflow-hidden mb-3">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2
              className={`text-lg font-medium ${
                theme === "dark" ? "text-zinc-200" : "text-gray-700"
              } mb-2 hover:text-primary transition-colors`}
            >
              {product.name}
            </h2>
            <div className="text-gray-600 mb-1">
              <span className="text-xl font-semibold text-[#ed8f60]">
                ${product.price}
              </span>
              {product.discount > 0 && (
                <span className="ml-2 text-sm text-red-500">
                  -{product.discount}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={() => navigate("/flash-sale")}
          className="btn btn-sm btn-primary"
        >
          Show all
        </button>
      </div>
    </div>
  );
};

export default FlashSaleSection;

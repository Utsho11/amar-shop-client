import { useNavigate } from "react-router-dom";
import { useGetFlashSaleProductsQuery } from "../../redux/services/productApi";
import Timer from "./Timer";
import Loading from "../shared/Loading";
import ProductCard from "../product/ProductCard";

const FlashSaleSection = () => {
  const { data, isFetching } = useGetFlashSaleProductsQuery(null);
  const navigate = useNavigate();

  const product = data?.data;

  const slicedProducts = product?.slice(0, 4);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="my-10">
      <Timer />
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 my-8">
        {slicedProducts?.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
      <div className="text-center">
        <button
          onClick={() => navigate("/flash-sale")}
          className="btn btn-md text-black bg-[#e9c46a] hover:text-white"
        >
          Show more discount products
        </button>
      </div>
    </div>
  );
};

export default FlashSaleSection;

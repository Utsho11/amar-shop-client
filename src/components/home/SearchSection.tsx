import { FieldValues } from "react-hook-form";
import ASForm from "../form/ASForm";
import ASInput from "../form/ASInput";
import { useState } from "react";
import { useGetProductsQuery } from "../../redux/services/productApi";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import Loading from "../shared/Loading";

const SearchSection = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { theme } = useTheme();
  const navigate = useNavigate();

  const { data, isFetching } = useGetProductsQuery({
    keyword,
  });

  const onSubmit = async (data: FieldValues) => {
    const keyword = data.keyword;
    setKeyword(keyword);
  };

  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Search Your Favourite Product
      </h1>
      <div className="flex justify-center">
        <ASForm
          label="Search"
          onSubmit={onSubmit}
          className="text-center w-1/2"
        >
          <ASInput name="keyword" placeholder="Search Your Product" />
        </ASForm>
      </div>

      {/* Show the search results */}
      <div className="mt-6">
        {isFetching && <p className="text-center">Loading...</p>}
        {data?.data && keyword && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data?.data?.products?.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product.id)}
                className={`flex flex-col items-start ${
                  theme === "dark"
                    ? "bg-slate-700 hover:bg-slate-500"
                    : "bg-white hover:bg-gray-200"
                } p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="w-full h-40  rounded-md overflow-hidden mb-3">
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
                  {product.discount && (
                    <span className="ml-2 text-sm text-red-500">
                      -{product.discount}%
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {data?.data?.products.length === 0 && keyword && !isFetching && (
          <p
            className={`text-center mt-4  ${
              theme === "dark" ? "text-zinc-200" : "text-gray-500"
            } `}
          >
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchSection;

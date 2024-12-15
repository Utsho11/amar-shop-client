import { useNavigate, useParams } from "react-router-dom";
import {
  useFollowShopMutation,
  useGetFollowersQuery,
  useGetProductsBySingleShopQuery,
  useGetSingleShopQuery,
  useUnfollowShopMutation,
} from "../redux/services/shopApi";
import { TProduct } from "../types";
import { useTheme } from "../context/ThemeContext";
import { useAppSelector } from "../hooks/hook";
import { selectCurrentUser } from "../redux/features/auth/authSlice";

type TFollow = {
  id: string;
  customerEmail: string;
  shopId: string;
  createdAt: Date;
};

const ShopPage = () => {
  const { id } = useParams();
  const { data: shop } = useGetSingleShopQuery(id);
  const { data: products } = useGetProductsBySingleShopQuery(id);
  const { data } = useGetFollowersQuery(id as string);
  const [followShop] = useFollowShopMutation();
  const [unfollowShop] = useUnfollowShopMutation();

  const user = useAppSelector(selectCurrentUser);

  const handleFollowShop = () => {
    followShop(id as string);
  };

  const handleUnfollowShop = () => {
    unfollowShop(id as string);
  };

  console.log(data?.data);

  const isExistFollowShop = data?.data?.filter(
    (follow: TFollow) => follow.customerEmail === user?.email
  );

  console.log(isExistFollowShop);

  const navigate = useNavigate();
  const { theme } = useTheme();

  // console.log(data?.data);
  console.log(products?.data);
  console.log(id);

  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Shop Information Section */}
      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Logo Section */}
        <div className="flex justify-center lg:w-1/4 mb-6 lg:mb-0">
          <img
            src={shop?.data?.logoUrl}
            alt="Shop Logo"
            className="w-32 h-32 object-cover rounded-full border-2 border-gray-300 shadow-md"
          />
        </div>

        {/* Shop Details Section */}
        <div className="flex flex-col gap-4 lg:w-3/4">
          <h1 className="text-3xl font-bold">{shop?.data?.name}</h1>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Owner:</span>{" "}
            {shop?.data?.vendorEmail}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Description:</span>{" "}
            {shop?.data?.description}
          </p>
          <p className="text-lg text-gray-600">
            <span className="font-semibold">Followers:</span>{" "}
            {data?.data?.length}
          </p>
        </div>
        <div className="">
          {isExistFollowShop?.length > 0 ? (
            <button
              onClick={handleUnfollowShop}
              className="btn btn-sm btn-primary"
            >
              Unfllow
            </button>
          ) : (
            <button
              onClick={handleFollowShop}
              className="btn btn-sm btn-primary"
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div className="divider"></div>

      {/* Products Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6">Products List:</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.data?.map((product: TProduct, index: number) => (
            <div
              onClick={() => handleProductClick(product.id)}
              key={index + 1}
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
      </div>
    </div>
  );
};

export default ShopPage;

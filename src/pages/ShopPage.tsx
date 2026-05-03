import { useNavigate, useParams } from "react-router-dom";
import {
  useFollowShopMutation,
  useGetFollowersQuery,
  useGetProductsBySingleShopQuery,
  useGetSingleShopQuery,
  useUnfollowShopMutation,
} from "../redux/services/shopApi";
import { TProduct } from "../types";
import { useAppSelector } from "../hooks/hook";
import { selectCurrentUser } from "../redux/features/auth/authSlice";
import ProductCard from "../components/product/ProductCard";
import { useTheme } from "../context/ThemeContext";

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
    if (!user) {
      navigate("/auth/login");
    }
    followShop(id as string);
  };

  const handleUnfollowShop = () => {
    unfollowShop(id as string);
  };

  // console.log(data?.data);

  const isExistFollowShop = data?.data?.filter(
    (follow: TFollow) => follow.customerEmail === user?.email,
  );

  // console.log(isExistFollowShop);

  const navigate = useNavigate();

  // console.log(data?.data);
  // console.log(products?.data);
  // console.log(id);

  const { theme } = useTheme();
  const isDark = theme === "dark";

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
              className="btn btn-sm bg-[#A66B55] text-white hover:bg-[#8d5947]"
            >
              Follow
            </button>
          )}
        </div>
      </div>
      <div className="divider"></div>

      {/* Products Section */}
      <div className="mt-12">
        <div className="mb-10 text-center">
          <p
            className={`text-xs font-medium uppercase tracking-[0.3em] ${
              isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
            }`}
          >
            Products
          </p>

          <h1
            className={`mt-3 text-3xl font-semibold md:text-4xl ${
              isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
            }`}
          >
            All Products
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.data?.map((product: TProduct, index: number) => (
            <ProductCard product={product} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopPage;

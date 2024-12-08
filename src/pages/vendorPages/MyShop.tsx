import { NavLink } from "react-router-dom";
import { useGetMyShopQuery } from "../../redux/services/shopApi";
import CreateShopPage from "./CreateShopPage";

const MyShop = () => {
  const { data: shops, isLoading, isError } = useGetMyShopQuery(null);

  console.log(shops);

  if (isLoading) {
    return <div className="loading-spinner loading-lg">Loading...</div>; // Handle loading state
  }

  if (isError || !shops) {
    return <div>Error loading shops. Please try again later.</div>; // Handle error state
  }

  return (
    <div className="container mx-auto">
      {shops.data && shops.data.length > 0 ? (
        shops.data.map(
          (
            shop: {
              id: string | number;
              name: string;
              description: string;
              logoUrl: string;
            },
            index: number
          ) => (
            <div key={shop.id || index} className="hero w-2/3 mx-auto mb-8">
              <div className="hero-content flex-col lg:flex-row space-x-4">
                <img
                  src={shop.logoUrl}
                  alt={shop.name}
                  className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                  <h1 className="text-5xl font-bold">{shop.name}</h1>
                  <p className="py-6">{shop.description}</p>
                  <NavLink to="/">
                    <button className="btn btn-sm btn-primary">
                      Go to Home
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>
          )
        )
      ) : (
        <CreateShopPage />
      )}
    </div>
  );
};

export default MyShop;

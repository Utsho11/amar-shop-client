import { NavLink } from "react-router-dom";
import { useGetMyShopQuery } from "../../redux/services/shopApi";
import CreateShopPage from "./CreateShopPage";

const MyShop = () => {
  const { data: shop } = useGetMyShopQuery(null);

  console.log(shop?.data);

  return (
    <div className="">
      {shop ? (
        <div>
          {" "}
          <div className="hero w-2/3 mx-auto">
            <div className="hero-content flex-col lg:flex-row space-x-4">
              <img
                src={shop?.data?.logoUrl}
                className="max-w-sm rounded-lg shadow-2xl"
              />
              <div>
                <h1 className="text-5xl font-bold">{shop?.data?.name}</h1>
                <p className="py-6">
                  {shop?.data?.description}
                  Provident cupiditate voluptatem et in. Quaerat fugiat ut
                  assumenda excepturi exercitationem quasi. In deleniti eaque
                  aut repudiandae et a id nisi.
                </p>
                <NavLink to="/">
                  <button className="btn btn-sm btn-primary">Go to home</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CreateShopPage />
      )}
    </div>
  );
};

export default MyShop;

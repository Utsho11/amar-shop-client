import { FaShoppingCart, FaDollarSign, FaStar } from "react-icons/fa";
import {
  useGetOrderHistoryForCustomerQuery,
  useGetOrderItemQuery,
} from "../../redux/services/orderApi";
import Loading from "../shared/Loading";
import CountUp from "react-countup";
import { MdReviews } from "react-icons/md";

interface OrderViewProps {
  theme: string;
}

const OrderViewCard = ({ theme }: OrderViewProps) => {
  const { data, isLoading } = useGetOrderHistoryForCustomerQuery(null);
  const { data: reviews } = useGetOrderItemQuery(null);
  const totalOrders = data?.data || [];
  const totalSpent = totalOrders.reduce((acc: number, order) => {
    return acc + Number(order.quantity) * Number(order.productPrice);
  }, 0);

  const loyaltyPoints = totalSpent / 10;

  const reviewCount = reviews?.data?.length;

  return (
    <div className="my-16 sm:mx-6">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Total Orders Card */}
          <div
            className={` ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "border-gray-200"
            } shadow-md rounded-lg p-6 flex flex-col justify-center items-center text-center border`}
          >
            <div className="text-blue-500 text-3xl mb-4">
              <FaShoppingCart />
            </div>
            <h4 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
              Total Orders
            </h4>
            <p
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              <CountUp
                start={0}
                end={totalOrders.length}
                duration={2.5}
                separator=","
              />
            </p>
          </div>

          {/* Total Spent Card */}
          <div
            className={` ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "border-gray-200"
            } shadow-md rounded-lg p-6 flex flex-col justify-center items-center text-center border`}
          >
            <div className="text-green-500 text-3xl mb-4">
              <FaDollarSign />
            </div>
            <h4 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
              Total Spent
            </h4>
            <p
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              <CountUp
                start={0}
                end={Number(totalSpent.toFixed(2))}
                duration={2.5}
                separator=","
              />
            </p>
          </div>

          {/* Loyalty Points Card */}
          <div
            className={` ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "border-gray-200"
            } shadow-md rounded-lg p-6 flex flex-col justify-center items-center text-center border`}
          >
            <div className="text-yellow-500 text-3xl mb-4">
              <FaStar />
            </div>
            <h4 className="text-lg font-semibold text-gray-500 dark:text-gray-400">
              Loyalty Points
            </h4>
            <p
              className={`text-3xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              <CountUp
                start={0}
                end={Number(loyaltyPoints.toFixed(2))}
                duration={2.5}
                separator=","
              />
            </p>
          </div>
        </div>
      )}
      <div
        className={` ${
          theme === "dark" ? "bg-gray-800 border-gray-700" : "border-gray-200"
        } mt-5 shadow-md rounded-lg p-6 border`}
      >
        <h1
          className={`text-lg sm:text-3xl flex items-center justify-center gap-3 font-bold ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          <MdReviews />
          Product to be Revieweed: {reviewCount || 0}
        </h1>
      </div>
    </div>
  );
};

export default OrderViewCard;

import CountUp from "react-countup";
import { useGetUsersQuery } from "../../redux/services/userApi";
import { TUser } from "../../redux/features/auth/authSlice";
import { FaUsers, FaUserTie, FaUserShield, FaUserAlt } from "react-icons/fa";

interface TotalUserCardProps {
  theme: string;
}

const TotalUserCard = ({ theme }: TotalUserCardProps) => {
  const { data } = useGetUsersQuery(null);

  const users = data?.data?.length;
  const vendors = data?.data?.filter(
    (user: TUser) => user.role === "VENDOR"
  ).length;
  const admins = data?.data?.filter(
    (user: TUser) => user.role === "ADMIN"
  ).length;
  const customers = data?.data?.filter(
    (user: TUser) => user.role === "CUSTOMER"
  ).length;

  const isDarkMode = theme === "dark";

  return (
    <div className="my-16 sm:mx-6">
      <div
        className={`shadow-lg rounded-lg p-6 flex flex-col items-center text-center ${
          isDarkMode
            ? "bg-gray-800 text-gray-200 border border-gray-700"
            : "bg-white text-gray-800"
        }`}
      >
        {/* Header */}
        <div className="flex items-center space-x-2">
          <FaUsers className="text-blue-600 text-3xl" />
          <h3 className="text-3xl font-bold">Total Users</h3>
        </div>

        {/* Total Users */}
        <p className="text-5xl font-bold text-blue-600 mt-3">
          <CountUp start={0} end={users} duration={2.5} separator="," />
        </p>

        {/* Breakdown */}
        <div className="flex my-5 space-x-8">
          {/* Customers */}
          <div className="flex flex-col items-center">
            <FaUserAlt className="text-green-500 text-2xl mb-2" />
            <p className="text-sm">Customers</p>
            <p className="text-2xl font-bold text-green-500">
              <CountUp start={0} end={customers} duration={2.5} separator="," />
            </p>
          </div>

          {/* Vendors */}
          <div className="flex flex-col items-center">
            <FaUserTie className="text-yellow-500 text-2xl mb-2" />
            <p className="text-sm">Vendors</p>
            <p className="text-2xl font-bold text-yellow-500">
              <CountUp start={0} end={vendors} duration={2.5} separator="," />
            </p>
          </div>

          {/* Admins */}
          <div className="flex flex-col items-center">
            <FaUserShield className="text-red-500 text-2xl mb-2" />
            <p className="text-sm">Admins</p>
            <p className="text-2xl font-bold text-red-500">
              <CountUp start={0} end={admins} duration={2.5} separator="," />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalUserCard;

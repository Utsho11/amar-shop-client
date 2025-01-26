import { useGetMeQuery } from "../../redux/services/authApi";
import { FaUser, FaEnvelope, FaPhone, FaUserShield } from "react-icons/fa";
import Loading from "../shared/Loading";

interface MyProfileProps {
  theme: string;
}

const MyProfile = ({ theme }: MyProfileProps) => {
  const { data, isLoading } = useGetMeQuery(null);

  if (isLoading) {
    return <Loading />;
  }

  const isDarkMode = theme === "dark";

  return (
    <div className="flex justify-center items-center sm:mr-6 my-16">
      <div
        className={`w-full max-w-2xl shadow-lg rounded-lg border ${
          isDarkMode
            ? "bg-gray-800 text-gray-200 border-gray-700"
            : "bg-white text-gray-800"
        }`}
      >
        {/* Card Header */}
        <div
          className={`rounded-t-lg px-6 py-4 flex items-center justify-between ${
            isDarkMode
              ? "bg-gradient-to-r from-gray-700 to-gray-900 text-gray-200"
              : "bg-gradient-to-r from-blue-500 to-indigo-900 text-white"
          }`}
        >
          <h1 className="text-2xl font-bold">My Profile</h1>
          <FaUser size={28} />
        </div>

        {/* Card Content */}
        <div className="flex flex-col md:flex-row items-center p-6 space-y-4 md:space-y-0 md:space-x-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              className="w-40 h-40 rounded-full shadow-md border-2 border-blue-500"
              src={data?.data?.image || "/default-profile.png"}
              alt="Profile"
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1 space-y-4">
            <p className="flex items-center text-lg">
              <FaUserShield className="mr-2 text-blue-500" />
              <span className="font-semibold">Name: </span>
              <span className="ml-1">{data?.data?.name}</span>
            </p>
            <p className="flex items-center text-lg">
              <FaEnvelope className="mr-2 text-blue-500" />
              <span className="font-semibold">Email: </span>
              <span className="ml-1">{data?.data?.email}</span>
            </p>
            <p className="flex items-center text-lg">
              <FaUserShield className="mr-2 text-blue-500" />
              <span className="font-semibold">Role: </span>
              <span className="ml-1">{data?.data?.role}</span>
            </p>
            <p className="flex items-center text-lg">
              <FaPhone className="mr-2 text-blue-500" />
              <span className="font-semibold">Phone: </span>
              <span className="ml-1">{data?.data?.phone}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

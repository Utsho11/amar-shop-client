import { useGetMeQuery } from "../redux/services/authApi";

const MyProfile = () => {
  const { data, isLoading } = useGetMeQuery(null);

  if (isLoading) {
    return <div className="loading loading-spinner">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg">
        {/* Card Header */}
        <div className="bg-blue-500 text-white rounded-t-lg px-6 py-4">
          <h1 className="text-2xl font-bold text-center">My Profile</h1>
        </div>

        {/* Card Content */}
        <div className="flex flex-col md:flex-row items-center p-6 space-y-4 md:space-y-0 md:space-x-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <img
              className="w-36 h-36 rounded-full border-2 border-blue-500"
              src={data?.data?.image || "/default-profile.png"}
              alt="Profile"
            />
          </div>

          {/* Profile Details */}
          <div className="flex-1">
            <p className="text-lg font-semibold">
              Name: <span className="font-normal">{data?.data?.name}</span>
            </p>
            <p className="text-lg font-semibold">
              Email: <span className="font-normal">{data?.data?.email}</span>
            </p>
            <p className="text-lg font-semibold">
              Phone Number:{" "}
              <span className="font-normal">{data?.data?.phone}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

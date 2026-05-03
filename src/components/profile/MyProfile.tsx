import { useGetMeQuery } from "../../redux/services/authApi";
import { Mail, Phone, ShieldCheck, UserRound } from "lucide-react";
import Loading from "../shared/Loading";

interface MyProfileProps {
  theme: string;
}

const MyProfile = ({ theme }: MyProfileProps) => {
  const { data, isLoading } = useGetMeQuery(null);

  if (isLoading) return <Loading />;

  const isDarkMode = theme === "dark";
  const user = data?.data;

  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <div
        className={`w-full max-w-3xl overflow-hidden rounded-3xl border shadow-xl ${
          isDarkMode
            ? "border-white/10 bg-[#171a21] text-gray-100"
            : "border-gray-200 bg-white text-gray-900"
        }`}
      >
        {/* Top Banner */}
        <div
          className={`h-32 ${
            isDarkMode
              ? "bg-gradient-to-r from-[#1f2937] to-[#111827]"
              : "bg-gradient-to-r from-[#f7d774] to-[#e9c46a]"
          }`}
        />

        {/* Profile Header */}
        <div className="relative px-6 pb-6">
          <img
            src={user?.image || "/default-profile.png"}
            alt={user?.name || "Profile"}
            className={`-mt-16 h-32 w-32 rounded-3xl border-4 object-cover shadow-lg ${
              isDarkMode ? "border-[#171a21]" : "border-white"
            }`}
          />

          <div className="mt-4">
            <h1 className="text-2xl font-bold">
              {user?.name || "Unknown User"}
            </h1>
            <p className="mt-1 text-sm opacity-70">
              {user?.email || "No email"}
            </p>
          </div>
        </div>

        {/* Info */}
        <div className="grid gap-4 px-6 pb-8 sm:grid-cols-2">
          <InfoItem
            icon={<UserRound size={20} />}
            label="Name"
            value={user?.name}
            isDarkMode={isDarkMode}
          />

          <InfoItem
            icon={<Mail size={20} />}
            label="Email"
            value={user?.email}
            isDarkMode={isDarkMode}
          />

          <InfoItem
            icon={<ShieldCheck size={20} />}
            label="Role"
            value={user?.role}
            isDarkMode={isDarkMode}
          />

          <InfoItem
            icon={<Phone size={20} />}
            label="Phone"
            value={user?.phone || "Not added"}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </section>
  );
};

const InfoItem = ({
  icon,
  label,
  value,
  isDarkMode,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  isDarkMode: boolean;
}) => {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border p-4 ${
        isDarkMode
          ? "border-white/10 bg-white/5"
          : "border-gray-100 bg-[#f8f5f0]"
      }`}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e9c46a]/20 text-[#d4a23a]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm opacity-60">{label}</p>
        <p className="truncate font-medium">{value || "N/A"}</p>
      </div>
    </div>
  );
};

export default MyProfile;

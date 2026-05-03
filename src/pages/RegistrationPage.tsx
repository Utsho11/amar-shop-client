import { Logo } from "../components/icons/icon";
import ASForm from "../components/form/ASForm";
import ASInput from "../components/form/ASInput";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import ASSelectField from "../components/form/ASSelect";
import { useRegisterMutation } from "../redux/services/authApi";
import { toast } from "sonner";
import ASFileInput from "../components/form/ASFileInput";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../hooks/hook";
import { Eye, EyeOff } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export interface RegisterFormValue {
  password: string;
  role: string;
  name: string;
  email: string;
  phone: string;
}

const optionRoles = [
  {
    label: "Vendor",
    value: "VENDOR",
  },
  {
    label: "Customer",
    value: "CUSTOMER",
  },
];

const RegistrationPage = () => {
  const { theme } = useTheme();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: RegisterFormValue) => {
    const toastId = toast.loading("Registration....");

    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    const userInfo = {
      password: data.password,
      role: data.role,
      user: {
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
    };
    try {
      formData.append("data", JSON.stringify(userInfo));
      formData.append("file", selectedFile);

      const res = await register(formData).unwrap();

      const user = verifyToken(res.data.accessToken);

      // console.log(user.role);

      toast.success("Successfully Registered.", {
        id: toastId,
        duration: 2000,
      });

      if (!user) {
        throw new Error("User is not valid.");
      }

      dispatch(setUser({ user: user, token: res.data.accessToken }));

      if (user?.role === "VENDOR") {
        navigate("/vendorDashboard/createShop");
      } else navigate("/");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div
      className={`flex min-h-screen items-center justify-center px-4 py-10 `}
      style={{
        backgroundImage: "url('/bg-auth.png')",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className={`w-full max-w-lg rounded-3xl border p-8 shadow-xl ${
          theme === "dark" ? "bg-black" : "bg-[#F9F5F0]"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <Logo size={36} />
            <p className="text-xl font-bold">AmarShop</p>
          </div>

          <h3 className="mt-6 text-center text-xl font-semibold">
            Registration
          </h3>

          <p className="mt-2 text-center text-sm opacity-70">
            Seamless Access, Secure Connection: Your Gateway to a Personalized
            Experience.
          </p>
        </div>

        <div className="mt-6">
          <ASForm
            onSubmit={onSubmit}
            defaultValues={{ email: "", password: "" }}
            className="space-y-4"
            label="Register User"
          >
            <ASInput
              name="email"
              label="Email Address"
              type="email"
              placeholder="Enter your email"
            />

            <ASInput
              name="name"
              label="Enter Name"
              type="text"
              placeholder="Enter your full name"
            />

            <ASInput
              name="phone"
              label="Phone Number"
              type="text"
              placeholder="Enter your phone number"
            />

            <ASSelectField
              name="role"
              label="Select Your Role"
              options={optionRoles}
            />

            <ASFileInput
              name="file"
              label="Insert Profile Photo"
              accept="image/*"
              onFileChange={handleFileChange}
              required={true}
            />

            {/* Password with eye icon */}
            <div className="relative">
              <ASInput
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className={`absolute right-3 top-[42px] transition `}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <input
                type="checkbox"
                name="terms"
                required
                className="checkbox checkbox-xs mt-1"
              />

              <p className="text-sm opacity-70">
                I agree to the{" "}
                <NavLink to="/terms" className="text-blue-500 hover:underline">
                  Terms & Conditions
                </NavLink>{" "}
                and{" "}
                <NavLink
                  to="/privacy"
                  className="text-blue-500 hover:underline"
                >
                  Privacy Policy
                </NavLink>
              </p>
            </div>
          </ASForm>

          <p className="mt-6 text-center text-sm opacity-70">
            Already have an account?
            <NavLink
              to="/auth/login"
              className="ml-2 text-blue-500 hover:underline"
            >
              Login now
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;

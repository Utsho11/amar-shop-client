import { useTheme } from "../context/ThemeContext";
import logoBanner from "../assets/login.png";
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
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { theme } = useTheme();
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
    <div className="grid min-h-screen grid-cols-12 overflow-auto">
      <div
        className={`relative hidden  ${
          theme === "dark" ? "bg-[#14181c]" : "bg-[#FFE9D1]"
        } lg:col-span-7 lg:block xl:col-span-8 2xl:col-span-9`}
      >
        <div className="">
          <img src={logoBanner} alt="" />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-5 xl:col-span-4 2xl:col-span-3">
        <div className="flex flex-col items-stretch p-8 lg:p-16">
          <div className="flex flex-col items-center justify-between">
            <div className="flex border-none bg-transparent">
              <Logo size={36} />
              <p className="font-bold text-inherit text-xl">AmarShop</p>
            </div>
            <h3 className="mt-4 text-center text-xl font-semibold lg:mt-16">
              Regitration
            </h3>
            <h3 className="mt-2 text-center text-sm text-base-content/70">
              Seamless Access, Secure Connection: Your Gateway to a Personalized
              Experience.
            </h3>
          </div>
          <div className="mt-3">
            <ASForm
              onSubmit={onSubmit}
              defaultValues={{ email: "", password: "" }}
              className="p-4 text-center"
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
                label="Insert ProfilePhoto"
                accept="image/*" // Example: restrict to image files
                onFileChange={handleFileChange}
              />
              <ASInput
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <div className="form-control">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    onClick={togglePasswordVisibility}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span className="label-text">Show Password</span>
                </label>
              </div>
            </ASForm>
            <div>
              <p className="text-center text-sm text-base-content/70">
                Already have an account?
                <NavLink to="/auth/login" className="text-blue-500 ml-2">
                  Login now
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;

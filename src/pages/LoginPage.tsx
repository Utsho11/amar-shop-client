import { useState } from "react";
import { Logo } from "../components/icons/icon";
import { useTheme } from "../context/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/services/authApi";
import { useAppDispatch } from "../hooks/hook";
import { verifyToken } from "../utils/verifyToken";
import { setUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { theme } = useTheme();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        email: email,
        password: password,
      };

      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken);

      toast.success("Successfully Logged in", { id: toastId, duration: 2000 });

      dispatch(setUser({ user: user, token: res.data.accessToken }));

      navigate("/");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleDemoLogin = (role: "admin" | "customer" | "vendor") => {
    const credentials = {
      admin: { email: "admin@amarShop.com", password: "admin@12345" },
      customer: { email: "user@gmail.com", password: "123456" },
      vendor: { email: "hossain@gmail.com", password: "123456" },
    };
    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
  };

  // console.log(defaultCredentials);

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4`}
      style={{
        backgroundImage: "url('/bg-auth.png')",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className={`w-full max-w-md rounded-3xl border shadow-xl p-8 ${
          theme === "dark" ? "bg-black" : "bg-[#F9F5F0]"
        }`}
      >
        {/* Logo */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2">
            <Logo size={36} />
            <p className="text-xl font-bold">AmarShop</p>
          </div>

          <h3 className="mt-6 text-xl font-semibold">Login</h3>
          <p className="mt-2 text-center text-sm opacity-70">
            Seamless Access, Secure Connection
          </p>
        </div>

        {/* Demo Users */}
        <div className="mt-4 flex justify-center gap-2 flex-wrap">
          <button
            onClick={() => handleDemoLogin("admin")}
            className="btn btn-sm bg-[#A66B55] text-white hover:bg-[#8d5947]"
          >
            Admin
          </button>
          <button
            onClick={() => handleDemoLogin("customer")}
            className="btn btn-sm bg-[#A66B55] text-white hover:bg-[#8d5947]"
          >
            Customer
          </button>
          <button
            onClick={() => handleDemoLogin("vendor")}
            className="btn btn-sm bg-[#A66B55] text-white hover:bg-[#8d5947]"
          >
            Vendor
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="input input-bordered w-full mt-1"
              required
            />
          </div>

          <div className="relative">
            <div className="flex items-center justify-between">
              <label className="text-sm">Password</label>
              <label htmlFor="">
                <NavLink to="/forgot-password" className="">
                  <p className="text-sm text-base-content/70 text-blue-500 ml-2 hover:underline">
                    Forgot your password?
                  </p>
                </NavLink>
              </label>
            </div>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="input input-bordered w-full mt-1 pr-10"
              required
            />

            {/* Eye Icon */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={`absolute right-3 top-[38px] text-gray-500  ${theme == "dark" ? "hover:text-white" : "hover:text-black"}`}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="btn btm-sm w-full bg-[#A66B55] text-white hover:bg-[#8d5947]"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm opacity-70">
          Don't have an account?
          <NavLink to="/auth/register" className="text-blue-500 ml-2">
            Sign up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

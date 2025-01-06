import { useState } from "react";
import logoBanner from "../assets/login.png";
import { Logo } from "../components/icons/icon";
import { useTheme } from "../context/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/services/authApi";
import { useAppDispatch } from "../hooks/hook";
import { verifyToken } from "../utils/verifyToken";
import { setUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";

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
              Login
            </h3>
            <h3 className="mt-2 text-center text-sm text-base-content/70">
              Seamless Access, Secure Connection: Your Gateway to a Personalized
              Experience.
            </h3>
          </div>
          <div className="mt-4">
            <div className="flex gap-2 justify-center">
              <h1 className="text-sm text-gray-400">Choose any demo user:</h1>
              <button
                onClick={() => handleDemoLogin("admin")}
                className="btn btn-sm bg-[#e9c46a]"
              >
                Admin
              </button>
              <button
                onClick={() => handleDemoLogin("customer")}
                className="btn btn-sm bg-[#e9c46a]"
              >
                Customer
              </button>
              <button
                onClick={() => handleDemoLogin("vendor")}
                className="btn btn-sm bg-[#e9c46a]"
              >
                {" "}
                Vendor
              </button>
            </div>
          </div>
          <div className="mt-3">
            <form onSubmit={onSubmit} className="p-4 text-center">
              <div className="form-control">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control mt-4">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="sm:flex justify-between mt-4">
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
                <div className="">
                  <NavLink to="/forgot-password" className="">
                    <p className="text-sm text-base-content/70 text-blue-500 ml-2 hover:underline">
                      Forgot your password?
                    </p>
                  </NavLink>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-sm mt-6 bg-[#e9c46a] w-full"
              >
                Login
              </button>
            </form>
            <div>
              <p className="text-center text-sm text-base-content/70 my-4">
                Don't have an account?
                <NavLink to="/auth/register" className="text-blue-500 ml-2">
                  Sign up now
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

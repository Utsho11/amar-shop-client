import { useState } from "react";
import ASForm from "../components/form/ASForm";
import ASInput from "../components/form/ASInput";
import logoBanner from "../assets/login.png";
import { Logo } from "../components/icons/icon";
import { useTheme } from "../context/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/services/authApi";
import { useAppDispatch } from "../hooks/hook";
import { verifyToken } from "../utils/verifyToken";
import { setUser } from "../redux/features/auth/authSlice";
import { toast } from "sonner";

interface LoginFormValues {
  email: string;
  password: string;
}
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { theme } = useTheme();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: LoginFormValues) => {
    const toastId = toast.loading("Logging in");
    try {
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken);

      console.log(user);

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
          <div className="mt-3">
            <ASForm
              onSubmit={onSubmit}
              defaultValues={{ email: "", password: "" }}
              className="p-4 text-center"
              label="Login"
            >
              <ASInput
                name="email"
                label="Email Address"
                type="email"
                placeholder="Enter your email"
              />

              <ASInput
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
              />
              <div className="form-control">
                <label className="label cursor-pointer">
                  <input
                    type="checkbox"
                    onClick={togglePasswordVisibility}
                    className="checkbox checkbox-primary checkbox-sm"
                  />
                  <span className="label-text">Show Password</span>
                </label>
              </div>
              <p className="text-center text-sm text-base-content/70">
                Forgot your password?
                <NavLink to="/forgot-password" className="text-blue-500 ml-2">
                  Reset it
                </NavLink>
              </p>
            </ASForm>
            <div>
              <p className="text-center text-sm text-base-content/70">
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

import { FieldValues } from "react-hook-form";
import ASForm from "../components/form/ASForm";
import ASInput from "../components/form/ASInput";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useResetPasswordMutation } from "../redux/services/authApi";

const ResetPass = () => {
  const [searchParams] = useSearchParams();
  const [resetPassword] = useResetPasswordMutation();
  const navigate = useNavigate();
  const userId = searchParams.get("userId") || "";
  const token = searchParams.get("token") || "";

  const handleSubmit = async (data: FieldValues) => {
    const password = data.password;
    resetPassword({ token, userId, password });
    navigate("/auth/login");
  };

  return (
    <div className="my-8 space-y-3">
      <h1 className="text-center text-3xl font-semibold">Give a Password</h1>

      <ASForm
        label="Enter Password"
        className="border-2 p-8 mx-auto max-w-96 rounded-lg"
        onSubmit={handleSubmit}
      >
        <ASInput name="password" label="Enter new password" />
      </ASForm>
    </div>
  );
};

export default ResetPass;

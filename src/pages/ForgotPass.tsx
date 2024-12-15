import { FieldValues } from "react-hook-form";
import ASForm from "../components/form/ASForm";
import ASInput from "../components/form/ASInput";
import { useForgetPassMutation } from "../redux/services/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgotPass = () => {
  const [forgetPass] = useForgetPassMutation();

  const navigate = useNavigate();

  const handleSubmit = async (data: FieldValues) => {
    forgetPass(data);
    toast.success("Password reset link sent to your email.");
    navigate("/");
  };

  return (
    <div className="my-8 space-y-3">
      <h1 className="text-center text-3xl font-semibold">
        Forgot Password Page
      </h1>
      <p className="text-center text-sm text-slate-600">
        Please enter your email address to receive a password reset link.
      </p>
      <ASForm
        label="enter"
        className="border-2 p-8 mx-auto max-w-96 rounded-lg"
        onSubmit={handleSubmit}
      >
        <ASInput name="email" label="Enter your email" />
      </ASForm>
    </div>
  );
};

export default ForgotPass;

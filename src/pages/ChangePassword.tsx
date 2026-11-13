import { FieldValues } from "react-hook-form";
import ASForm from "../components/form/ASForm";
import ASInput from "../components/form/ASInput";
import { useChangePasswordMutation } from "../redux/services/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "../hooks/hook";
import { logout } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating password...");
    try {
      const res = await changePassword(data).unwrap();
      if (res?.success) {
        toast.success("Password changed successfully", { id: toastId });
        dispatch(logout());
        navigate("/auth/login");
      } else {
        toast.error(res?.message || "Failed to change password", { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to change password. Please check your credentials.", { id: toastId });
    }
  };

  return (
    <div className="p-4 lg:p-8 ">
      <div className="max-w-96 mx-auto border-2 rounded-lg p-4 lg:p-8">
      <h1 className="text-center text-3xl font-semibold">Change Password</h1>
        <ASForm label="Change Password" onSubmit={handleSubmit}>
          <ASInput name="oldPassword" label="Old Password" />
          <ASInput name="newPassword" label="New Password" />
        </ASForm>
      </div>
    </div>
  );
};

export default ChangePassword;

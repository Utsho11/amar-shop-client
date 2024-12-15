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

  const handleSubmit = (data: FieldValues) => {
    changePassword(data);
    toast.success("Password changed Successfully");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="my-8">
      <h1 className="text-center text-3xl font-semibold">Change Password</h1>
      <div className="max-w-96 mx-auto">
        <ASForm label="Change Password" onSubmit={handleSubmit}>
          <ASInput name="oldPassword" label="Old Password" />
          <ASInput name="newPassword" label="New Password" />
        </ASForm>
      </div>
    </div>
  );
};

export default ChangePassword;

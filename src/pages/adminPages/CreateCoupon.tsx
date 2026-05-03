import { FieldValues } from "react-hook-form";
import ASForm from "../../components/form/ASForm";
import ASInput from "../../components/form/ASInput";
import { useCreateCouponMutation } from "../../redux/services/authApi";
import { toast } from "sonner";
import { useTheme } from "../../context/ThemeContext";

const CreateCoupon = () => {
  const [createCoupon] = useCreateCouponMutation();

  const handleSubmit = (data: FieldValues) => {
    createCoupon(data);
    toast.success("Coupon created successfully.");
  };

  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="my-10 sm:w-1/2 flex flex-col justify-center mx-auto">
      <div className="mb-10 text-center">
        <p
          className={`text-xs font-medium uppercase tracking-[0.3em] ${
            isDark ? "text-[#C9A68F]" : "text-[#A66B55]"
          }`}
        >
          Coupon
        </p>

        <h1
          className={`mt-3 text-3xl font-semibold md:text-4xl ${
            isDark ? "text-[#F9F5F0]" : "text-[#3D352F]"
          }`}
        >
        Create Coupon
        </h1>
      </div>
      <div className="border-2 rounded-3xl p-4 lg:p-8">
        <ASForm label="Create coupon" onSubmit={handleSubmit}>
          <ASInput name="code" label="Code" />
          <ASInput name="discount" label="Discount%" type="number" />
        </ASForm>
      </div>
    </div>
  );
};

export default CreateCoupon;

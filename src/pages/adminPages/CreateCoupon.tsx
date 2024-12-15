import { FieldValues } from "react-hook-form";
import ASForm from "../../components/form/ASForm";
import ASInput from "../../components/form/ASInput";
import { useCreateCouponMutation } from "../../redux/services/authApi";
import { toast } from "sonner";

const CreateCoupon = () => {
  const [createCoupon] = useCreateCouponMutation();

  const handleSubmit = (data: FieldValues) => {
    createCoupon(data);
    toast.success("Coupon created successfully.");
  };

  return (
    <div className="">
      <h1 className="text-3xl font-semibold text-center">Create Coupon</h1>
      <div className="">
        <ASForm label="Create coupon" onSubmit={handleSubmit}>
          <ASInput name="code" label="Code" />
          <ASInput name="discount" label="discount" type="number" />
        </ASForm>
      </div>
    </div>
  );
};

export default CreateCoupon;

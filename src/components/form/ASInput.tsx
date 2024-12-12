import React from "react";
import { useFormContext } from "react-hook-form";

interface ASInputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
}

const ASInput: React.FC<ASInputProps> = ({
  name,
  label,
  type = "text",
  placeholder = "",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <input
        {...register(name, { required: `${label} is required` })}
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full input-sm"
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default ASInput;

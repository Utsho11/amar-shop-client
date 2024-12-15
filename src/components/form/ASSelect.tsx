import React from "react";
import { useFormContext } from "react-hook-form";

export type TOption = {
  value: string | number;
  label: string;
};

interface ASSelectFieldProps {
  name: string;
  label: string;
  options: TOption[];
  isLoading?: boolean;
}

const ASSelectField: React.FC<ASSelectFieldProps> = ({
  name,
  label,
  options,
  isLoading,
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
      <select
        disabled={isLoading}
        {...register(name, { required: `${label} is required` })}
        className="select select-bordered w-full"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default ASSelectField;

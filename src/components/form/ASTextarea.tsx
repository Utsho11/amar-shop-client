import React from "react";
import { useFormContext } from "react-hook-form";

interface ASTextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
}

const ASTextarea: React.FC<ASTextareaProps> = ({
  name,
  label,
  placeholder = "",
  rows = 4,
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
      <textarea
        {...register(name, { required: `${label} is required` })}
        placeholder={placeholder}
        rows={rows}
        className="textarea textarea-bordered w-full"
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default ASTextarea;

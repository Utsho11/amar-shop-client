import React from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
  DefaultValues,
} from "react-hook-form";

interface ASFormProps<T extends FieldValues> {
  onSubmit: SubmitHandler<T>;
  defaultValues?: Partial<T>;
  children: React.ReactNode;
  className?: string;
  label?: string;
  isLoading?: boolean;
}

const ASForm = <T extends FieldValues>({
  onSubmit,
  defaultValues = {},
  children,
  className = "",
  label,
  isLoading,
}: ASFormProps<T>): JSX.Element => {
  const methods = useForm<T>({
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmitAndReset = async (data: T) => {
    // Call the onSubmit handler
    await onSubmit(data);

    // Reset the form after submission
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmitAndReset)}
        className={`space-y-4 ${className}`}
      >
        {children}
        <button
          disabled={isLoading}
          type="submit"
          className={`btn btn-sm ${label ? "" : "hidden"} bg-[#A66B55] text-white hover:bg-[#8d5947]`}
        >
          {label}
        </button>
      </form>
    </FormProvider>
  );
};

export default ASForm;

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
}

const ASForm = <T extends FieldValues>({
  onSubmit,
  defaultValues = {},
  children,
  className = "",
  label,
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
          type="submit"
          className={`btn btn-sm ${label ? "" : "hidden"} bg-[#e9c46a]`}
        >
          {label}
        </button>
      </form>
    </FormProvider>
  );
};

export default ASForm;

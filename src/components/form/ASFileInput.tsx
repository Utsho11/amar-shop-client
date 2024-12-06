import React, { useState, ChangeEvent } from "react";

interface ASFileInputProps {
  name: string;
  label?: string;
  required?: boolean;
  accept?: string;
  onFileChange: (file: File | null) => void;
}

const ASFileInput: React.FC<ASFileInputProps> = ({
  name,
  label,
  required = false,
  accept,
  onFileChange,
}) => {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      setFileName(file.name);
      onFileChange(file);
    } else {
      setFileName("");
      onFileChange(null);
    }
  };

  return (
    <div className="form-control">
      {label && (
        <label htmlFor={name} className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <div className="flex items-center gap-3">
        <input
          id={name}
          type="file"
          accept={accept}
          required={required}
          onChange={handleFileChange}
          className="file-input file-input-bordered file-input-sm w-full"
        />
        {fileName && (
          <span className="text-sm text-gray-500 truncate">{fileName}</span>
        )}
      </div>
    </div>
  );
};

export default ASFileInput;

import React, { useState, ChangeEvent } from "react";

interface Props {
  id: string;
  name: string;
  type?: string;
  autoComplete?: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  onChange?: (value: string) => void;
  onChangeEvent?: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  className?: string;
}

const TextInput: React.FC<Props> = ({
  id,
  name,
  type = "text",
  autoComplete,
  value,
  required,
  placeholder,
  onChange,
  label,
  className,
  onChangeEvent,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!!onChangeEvent) {
      onChangeEvent(e);
    }

    if (!!onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={handleChange}
        className={`peer h-10 w-full border-b-2 border-gray-500 bg-inherit text-gray-900 placeholder-transparent
          focus:border-pink-600 focus:outline-none sm:text-sm sm:leading-6 ${className}`}
      />
      <label
        htmlFor={id}
        className="absolute -top-6 left-0 justify-self-start text-sm text-gray-600 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base
                   peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600"
      >
        {label}
      </label>
    </div>
  );
};

export default TextInput;

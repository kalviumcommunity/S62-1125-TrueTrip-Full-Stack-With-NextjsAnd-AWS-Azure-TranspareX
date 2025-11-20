"use client";

import React from "react";
import { UseFormRegister } from "react-hook-form";

interface FormInputProps {
  label: string;
  type?: string;
  register: UseFormRegister<any>;
  name: string;
  error?: string | undefined | null;
  placeholder?: string;
  required?: boolean;
}

export default function FormInput({
  label,
  type = "text",
  register,
  name,
  error,
  placeholder,
  required = false,
}: FormInputProps) {
  const errorId = `${name}-error`;

  return (
    <div className="mb-3">
      <label htmlFor={name} className="block mb-1 font-medium">
        {label} {required ? <span aria-hidden="true">*</span> : null}
      </label>

      <input
        id={name}
        type={type}
        {...register(name)}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className="w-full border p-2 rounded focus:outline-none focus:ring focus:ring-offset-1"
      />

      {error && (
        <p id={errorId} className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

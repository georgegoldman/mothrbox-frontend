"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showPasswordToggle?: boolean;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      showPasswordToggle = false,
      containerClassName = "",
      labelClassName = "",
      inputClassName = "",
      errorClassName = "",
      type = "text",
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    // Handle toggling password visibility
    const inputType =
      showPasswordToggle && type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type;

    return (
      <div className={`space-y-2 ${containerClassName}`}>
        <label
          htmlFor={props.id}
          className={`block font-bold lg:text-lg ${labelClassName}`}
        >
          {label}
          {/* Don't rely on native "required" attribute for validation */}
        </label>

        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            className={`w-full rounded-md border border-black px-3 py-2 placeholder:text-sm focus:outline-none ${
              error ? "border-red-500" : ""
            } ${inputClassName}`}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? `${props.id}-error` : undefined}
            {...props}
          />

          {showPasswordToggle && type === "password" && (
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          )}
        </div>

        {error && (
          <p
            id={`${props.id}-error`}
            className={`text-xs text-red-500 ${errorClassName}`}
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";

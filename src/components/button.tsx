import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  // variant?: "primary" | "secondary" | "tertiary";
}

export default function Button({
  children,
  onClick,
  disabled,
  className,
  type = "button",
  // variant = "primary",
}: ButtonProps) {
  return (
    <button
      className={`${className} rounded-md px-4 py-2 transition duration-200 ease-in-out`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
}

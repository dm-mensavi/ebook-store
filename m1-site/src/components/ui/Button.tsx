"use client";

import React from "react";
import "../../styles/globals.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "outline";
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  isLoading = false,
  disabled,
  className = "",
  ...props
}) => {
  // Base Tailwind styles
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2";

  // Variant styles
  let variantStyles = "";
  switch (variant) {
    case "primary":
      variantStyles =
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";
      break;
    case "secondary":
      variantStyles =
        "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500";
      break;
    case "danger":
      variantStyles =
        "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500";
      break;
    case "outline":
      variantStyles =
        "border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300";
      break;
    default:
      variantStyles =
        "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";
  }

  // Combine all class names manually
  const combinedClasses = `${baseStyles} ${variantStyles} ${className}`;

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;

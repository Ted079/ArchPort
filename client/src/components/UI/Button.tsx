import React from "react";

type ButtonSizes = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "outline";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: ButtonSizes;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
}

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs sm:px-4 sm:py-2",
  md: "px-4 py-2 text-sm sm:text-base sm:px-6",
  lg: "px-6 py-3 text-lg sm:px-10 sm:py-4",
};

const variantClasses = {
  primary:
    "bg-blue-600 text-white border-transparent rounded-4xl hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600",
  outline:
    "bg-transparent border-gray-200  rounded-4xl text-gray-600 hover:bg-gray-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800",
};

const Button = ({
  children,
  onClick,
  size = "md",
  variant = "outline",
  icon,
}: ButtonProps) => {
  return (
    <div className="flex overflow-hidden rounded-lg  w-fit">
      <button
        //  gap-x-3
        className={`flex items-center font-medium  border font-medium text-gray-600 transition-colors duration-200 gap-x-2  ${variantClasses[variant]} ${sizeClasses[size]}`}
        onClick={onClick}
      >
        {icon}
        <span>{children}</span>
      </button>
    </div>
  );
};

export default Button;


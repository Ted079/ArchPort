import React from "react";

type ButtonSizes = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "outline" | "secondary" | "upload";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: ButtonSizes;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const sizeClasses = {
  sm: "px-3 py-1.5 text-xs sm:px-4 sm:py-2",
  md: "px-4 py-2 text-sm sm:text-base sm:px-6",
  lg: "px-6 py-3 text-lg sm:px-10 sm:py-4",
};

const variantClasses = {
  primary:
    "bg-[#252525] text-white border-transparent rounded-4xl hover:opacity-80 ",
  outline:
    "bg-transparent border border-gray-200  rounded-4xl hover:bg-gray-50 ",
  secondary:
    "bg-gray-100  border border-gray-200 rounded-4xl hover:bg-gray-200 ",
  upload:
    "bg-transparent  border-2  border-[#d9caf1] rounded-4xl hover:bg-gray-50 ",
};

const Button = ({
  children,
  onClick,
  size = "md",
  variant = "outline",
  icon,
  className = "",
  disabled = false,
}: ButtonProps) => {
  return (
    <div className="flex overflow-hidden rounded-lg  w-fit">
      <button
        className={`flex items-center  transition-colors duration-200 gap-x-2  ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        }`}
        onClick={onClick}
      >
        {icon}
        <span>{children}</span>
      </button>
    </div>
  );
};

export default Button;

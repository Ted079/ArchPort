import React from "react";
import { cn } from "../../utils/twMerge";

type ButtonSizes = "sm" | "md" | "lg";
type ButtonVariant =
  | "primary"
  | "outline"
  | "secondary"
  | "upload"
  | "forIcons";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  size?: ButtonSizes;
  variant?: ButtonVariant;
  icon?: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const sizeClasses = {
  sm: "px-3 py- text-xs sm:px-4 sm:py-2",
  md: "px-4 py-2 text-sm sm:text-base sm:px-6",
  lg: "px-6 py-3 text-lg sm:px-10 sm:py-4",
};

const variantClasses = {
  primary:
    "bg-[#252525] text-white border-transparent rounded-4xl hover:opacity-80 gap-x-2",
  outline:
    "bg-transparent border border-gray-200  rounded-4xl hover:bg-gray-50 gap-x-2",
  secondary:
    "bg-gray-100  border border-gray-200 rounded-4xl hover:bg-gray-200 gap-x-2",
  upload:
    "bg-transparent  border-2  border-[#d9caf1] rounded-4xl hover:bg-gray-50 gap-x-2",
  forIcons: "bg-gray-100 border border-gray-200 rounded-2xl hover:bg-gray-200 ",
};

const Button = ({
  children,
  onClick,
  size = "md",
  variant = "outline",
  icon,
  className = "",
  disabled = false,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex items-center transition-colors duration-200 justify-center",
        variantClasses[variant],
        sizeClasses[size],
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      {icon}
      {children && <span>{children}</span>}
    </button>
  );
};

export default Button;

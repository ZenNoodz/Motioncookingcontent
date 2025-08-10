import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "glass";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  disabled = false,
  className = ""
}: ButtonProps) {
  const baseClasses = "font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden cursor-pointer";
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-sm rounded-xl",
    lg: "px-6 py-3 text-base rounded-xl"
  };

  const variantClasses = {
    primary: "btn-primary",
    secondary: "bg-white/60 backdrop-blur-sm border border-white/20 text-gray-900 hover:bg-white/80 hover:shadow-lg hover:-translate-y-0.5 focus:ring-blue-500",
    ghost: "bg-transparent hover:bg-white/20 text-gray-700 hover:text-gray-900 focus:ring-gray-500",
    glass: "glass text-gray-900 hover:bg-white/40 hover:shadow-xl hover:-translate-y-1 focus:ring-blue-500"
  };

  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed transform-none hover:transform-none" 
    : "";

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

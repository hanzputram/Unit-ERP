"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "left",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "h-8 px-3.5 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-5 text-base gap-2.5",
    };

    const variantClasses = {
      primary:
        "bg-[var(--ink)] text-[var(--bg)] hover:opacity-90 shadow-sm active:scale-[0.98]",
      secondary:
        "bg-[var(--surface-solid)] text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--surface-2)] shadow-xs active:scale-[0.98]",
      outline:
        "bg-transparent text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--surface-2)] active:scale-[0.98]",
      ghost:
        "bg-transparent text-[var(--ink)] hover:bg-[var(--surface-2)] active:scale-[0.98]",
      danger:
        "bg-[var(--red-soft)] text-[var(--red)] border border-[var(--red)]/20 hover:bg-[var(--red-soft)]/80 active:scale-[0.98]",
      success:
        "bg-[var(--green-soft)] text-[var(--green)] border border-[var(--green)]/20 hover:bg-[var(--green-soft)]/80 active:scale-[0.98]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-[var(--r-pill)] transition-all duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-45 outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)]",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span className="shrink-0">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "solid" | "ghost";
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, size = "md", variant = "default", children, disabled, ...props },
    ref
  ) => {
    const sizeClasses = {
      sm: "h-7 w-7 text-xs",
      md: "h-9 w-9 text-sm",
      lg: "h-11 w-11 text-base",
    };

    const variantClasses = {
      default:
        "bg-[var(--surface-2)] text-[var(--ink)] hover:bg-[var(--line)] border border-[var(--line)] shadow-xs",
      solid:
        "bg-[var(--surface-solid)] text-[var(--ink)] hover:bg-[var(--surface-2)] border border-[var(--line)] shadow-sm",
      ghost:
        "bg-transparent text-[var(--ink)] hover:bg-[var(--surface-2)]",
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-all duration-150 cursor-pointer disabled:cursor-not-allowed disabled:opacity-45 active:scale-[0.96] outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)]",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
IconButton.displayName = "IconButton";

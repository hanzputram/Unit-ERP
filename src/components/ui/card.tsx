"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "default" | "ink" | "blue" | "accent-top";
  accentColor?: string; // used when tone="accent-top"
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, tone = "default", accentColor, children, style, ...props }, ref) => {
    const toneClasses = {
      default:
        "bg-[var(--surface)] text-[var(--ink)] border-[var(--line)] backdrop-blur-md shadow-[var(--shadow-card)]",
      ink:
        "bg-[var(--kpi1-bg)] text-[var(--kpi1-fg)] border-transparent shadow-[var(--shadow-card)] transition-colors duration-200",
      blue:
        "bg-[var(--kpi2-bg)] text-[var(--kpi2-fg)] border-transparent shadow-[var(--shadow-card)] transition-colors duration-200",
      "accent-top":
        "bg-[var(--surface)] text-[var(--ink)] border-[var(--line)] backdrop-blur-md shadow-[var(--shadow-card)]",
    };

    return (
      <div
        ref={ref}
        style={{
          borderTopColor: tone === "accent-top" ? accentColor || "var(--blue)" : undefined,
          borderTopWidth: tone === "accent-top" ? "3px" : undefined,
          ...style,
        }}
        className={cn(
          "relative rounded-[var(--r-lg)] border p-5 md:p-6 transition-all duration-200",
          toneClasses[tone],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export interface CardHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
}

export function CardHeader({
  icon,
  title,
  subtitle,
  action,
  className,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 mb-4",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2.5">
        {icon && (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--ink)] shrink-0">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-sm font-medium tracking-tight text-inherit">
            {title}
          </h3>
          {subtitle && (
            <p className="text-xs text-[var(--muted)]">{subtitle}</p>
          )}
        </div>
      </div>
      {action && <div className="flex items-center gap-1.5">{action}</div>}
    </div>
  );
}

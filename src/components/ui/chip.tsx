"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "blue" | "green" | "orange" | "amber" | "red" | "lime";
  size?: "sm" | "md";
  dot?: boolean;
}

export function Chip({
  className,
  variant = "default",
  size = "sm",
  dot = false,
  children,
  ...props
}: ChipProps) {
  const variantClasses = {
    default:
      "bg-[var(--surface-2)] text-[var(--ink-2)] border-[var(--line)]",
    blue:
      "bg-[var(--blue-soft)] text-[var(--blue)] border-[var(--blue)]/15",
    green:
      "bg-[var(--green-soft)] text-[var(--green)] border-[var(--green)]/15",
    orange:
      "bg-[var(--orange-soft)] text-[var(--orange)] border-[var(--orange)]/15",
    amber:
      "bg-[var(--amber-soft)] text-[var(--amber)] border-[var(--amber)]/20",
    red:
      "bg-[var(--red-soft)] text-[var(--red)] border-[var(--red)]/15",
    lime:
      "bg-[var(--lime)]/15 text-[var(--lime)] border-[var(--lime)]/25",
  };

  const dotClasses = {
    default: "bg-[var(--muted)]",
    blue: "bg-[var(--blue)]",
    green: "bg-[var(--green)]",
    orange: "bg-[var(--orange)]",
    amber: "bg-[var(--amber)]",
    red: "bg-[var(--red)]",
    lime: "bg-[var(--lime)]",
  };

  const sizeClasses = {
    sm: "px-2.5 py-0.5 text-[11px] gap-1.5",
    md: "px-3 py-1 text-xs gap-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-[var(--r-pill)] border tracking-tight",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            dotClasses[variant]
          )}
        />
      )}
      {children}
    </span>
  );
}

export interface DeltaChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: string | number;
  direction?: "up" | "down" | "neutral";
  prefix?: string;
  suffix?: string;
}

export function DeltaChip({
  value,
  direction = "up",
  prefix,
  suffix,
  className,
  ...props
}: DeltaChipProps) {
  const isUp = direction === "up";
  const isDown = direction === "down";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 px-2 py-0.5 rounded-[var(--r-pill)] text-[11px] font-medium border",
        isUp && "bg-[var(--green-soft)] text-[var(--green)] border-[var(--green)]/15",
        isDown && "bg-[var(--red-soft)] text-[var(--red)] border-[var(--red)]/15",
        !isUp && !isDown && "bg-[var(--surface-2)] text-[var(--muted)] border-[var(--line)]",
        className
      )}
      {...props}
    >
      {prefix}
      {isUp && "+"}
      {isDown && "-"}
      {value}
      {suffix && ` ${suffix}`}
    </span>
  );
}

export interface NavBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  count: number | string;
}

export function NavBadge({ count, className, ...props }: NavBadgeProps) {
  if (Number(count) === 0) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--orange)] text-white text-[10px] font-bold leading-none shrink-0 shadow-xs",
        className
      )}
      {...props}
    >
      {count}
    </span>
  );
}

"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

export interface SegmentedOption<T extends string = string> {
  value: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
}

export interface SegmentedProps<T extends string = string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: "sm" | "md";
  idPrefix?: string;
}

export function Segmented<T extends string = string>({
  options,
  value,
  onChange,
  className,
  size = "md",
  idPrefix = "seg",
}: SegmentedProps<T>) {
  const sizeClasses = {
    sm: "h-8 p-0.5 text-xs",
    md: "h-10 p-1 text-sm",
  };

  const itemSizeClasses = {
    sm: "px-3 py-1",
    md: "px-4 py-1.5",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[var(--r-pill)] bg-[var(--surface-2)] border border-[var(--line)] shadow-inner max-w-full overflow-x-auto whitespace-nowrap scrollbar-none shrink-0",
        sizeClasses[size],
        className
      )}
      role="tablist"
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative inline-flex items-center justify-center font-medium rounded-[var(--r-pill)] transition-colors duration-150 z-10 gap-1.5 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] shrink-0 whitespace-nowrap",
              itemSizeClasses[size],
              isActive
                ? "text-[var(--ink)]"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            )}
          >
            {isActive && (
              <motion.div
                layoutId={`${idPrefix}-active-indicator`}
                transition={spring}
                className="absolute inset-0 rounded-[var(--r-pill)] bg-[var(--surface-solid)] shadow-[0_1px_3px_rgba(0,0,0,0.08)] z-[-1]"
              />
            )}
            {opt.icon && <span className="shrink-0">{opt.icon}</span>}
            <span>{opt.label}</span>
            {opt.badge && <span className="ml-1">{opt.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}

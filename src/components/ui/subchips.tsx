"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

export interface SubChipItem<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

export interface SubChipsProps<T extends string = string> {
  items: SubChipItem<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  idPrefix?: string;
}

export function SubChips<T extends string = string>({
  items,
  value,
  onChange,
  className,
  idPrefix = "subchip",
}: SubChipsProps<T>) {
  return (
    <div className={cn("inline-flex items-center gap-1.5 max-w-full overflow-x-auto whitespace-nowrap scrollbar-none py-1 shrink-0", className)}>
      {items.map((item) => {
        const isActive = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={cn(
              "relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--r-pill)] text-[13px] font-medium transition-all duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--blue)] shrink-0 whitespace-nowrap",
              isActive
                ? "text-[var(--ink)]"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            )}
          >
            {isActive && (
              <motion.div
                layoutId={`${idPrefix}-indicator`}
                transition={spring}
                className="absolute inset-0 rounded-[var(--r-pill)] bg-[var(--surface-solid)] border border-[var(--line)] shadow-xs z-[-1]"
              />
            )}
            {item.icon && (
              <span
                className={cn(
                  "shrink-0",
                  isActive ? "text-[var(--ink)]" : "text-[var(--muted)]"
                )}
              >
                {item.icon}
              </span>
            )}
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

"use client";

import * as React from "react";
import { cn } from "@/lib/cn";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 md:p-12 text-center rounded-[var(--r-lg)] bg-[var(--surface)] border border-[var(--line)] shadow-xs",
        className
      )}
      {...props}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--muted)] mb-4 shadow-inner">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-[var(--ink)] mb-1">
        {title}
      </h3>
      <p className="text-sm text-[var(--muted)] max-w-sm mb-5">
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
}
